'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const {
  buildScoreMatrix,
  outcomeTotals,
  reweightMatrixToOutcomeTargets,
  topScores,
  deriveLambdas,
  predictScore,
} = require('./src/model');
const {
  parseMaybeJsonArray,
  parsePolymarketMarkets,
  deriveRecordFromEvents,
  normalizeProbabilities,
  marketLooksLikeThreeWayResult,
} = require('./src/parsers');
const { buildKalshiSignaturePayload, signKalshiRequest } = require('./src/kalshi');

const tests = [];
function test(name, fn) { tests.push({ name, fn }); }
function approx(actual, expected, tolerance = 1e-6) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} not within ${tolerance} of ${expected}`);
}

test('deriveRecordFromEvents calculates wins/draws/losses and goals', () => {
  const events = [
    { idEvent: '1', idHomeTeam: 'A', idAwayTeam: 'B', strHomeTeam: 'Alpha', strAwayTeam: 'Beta', intHomeScore: '2', intAwayScore: '1' },
    { idEvent: '2', idHomeTeam: 'C', idAwayTeam: 'A', strHomeTeam: 'Gamma', strAwayTeam: 'Alpha', intHomeScore: '1', intAwayScore: '1' },
    { idEvent: '3', idHomeTeam: 'A', idAwayTeam: 'D', strHomeTeam: 'Alpha', strAwayTeam: 'Delta', intHomeScore: '0', intAwayScore: '3' },
  ];
  const record = deriveRecordFromEvents(events, 'A');
  assert.equal(record.games, 3);
  assert.equal(record.wins, 1);
  assert.equal(record.draws, 1);
  assert.equal(record.losses, 1);
  assert.equal(record.goalsFor, 3);
  assert.equal(record.goalsAgainst, 5);
});

test('parseMaybeJsonArray accepts JSON and comma lists', () => {
  assert.deepEqual(parseMaybeJsonArray('["A","B"]'), ['A', 'B']);
  assert.deepEqual(parseMaybeJsonArray('A, B'), ['A', 'B']);
});

test('parsePolymarketMarkets reads team/draw outcome prices', () => {
  const markets = [{
    question: 'France vs Argentina match winner',
    outcomes: '["France","Draw","Argentina"]',
    outcomePrices: '["0.40","0.25","0.35"]',
    slug: 'france-argentina-winner',
  }];
  const parsed = parsePolymarketMarkets(markets, 'France', 'Argentina');
  assert.equal(parsed.length, 1);
  approx(parsed[0].probabilities.home, 0.40);
  approx(parsed[0].probabilities.draw, 0.25);
  approx(parsed[0].probabilities.away, 0.35);
});

test('parsePolymarketMarkets reads 90 minutes result markets', () => {
  const markets = [{
    question: 'Brazil vs Morocco 90 minutes result',
    outcomes: '["Brazil","Draw","Morocco"]',
    outcomePrices: '["0.58","0.24","0.18"]',
    slug: 'brazil-morocco-90-minutes-result',
  }];
  const parsed = parsePolymarketMarkets(markets, 'Brazil', 'Morocco');
  assert.equal(parsed.length, 1);
  approx(parsed[0].probabilities.home, 0.58);
  approx(parsed[0].probabilities.draw, 0.24);
  approx(parsed[0].probabilities.away, 0.18);
});

test('parsePolymarketMarkets rejects qualify and yes-no markets', () => {
  const markets = [
    {
      question: 'Will France qualify over Argentina?',
      outcomes: '["Yes","No"]',
      outcomePrices: '["0.52","0.48"]',
    },
    {
      question: 'France vs Argentina to qualify',
      outcomes: '["France","Argentina","Draw"]',
      outcomePrices: '["0.45","0.55","0.01"]',
    },
  ];
  assert.equal(marketLooksLikeThreeWayResult(markets[1], 'France', 'Argentina'), false);
  assert.equal(parsePolymarketMarkets(markets, 'France', 'Argentina').length, 0);
});

test('normalizeProbabilities rescales overround-like input', () => {
  const p = normalizeProbabilities({ home: 0.44, draw: 0.30, away: 0.36 });
  approx(p.home + p.draw + p.away, 1);
  approx(p.home, 0.4);
});

test('buildScoreMatrix returns normalized probability grid', () => {
  const matrix = buildScoreMatrix(1.45, 1.1, { maxGoals: 7, rho: -0.08 });
  const total = matrix.flat().reduce((sum, cell) => sum + cell.probability, 0);
  approx(total, 1);
});

test('reweightMatrixToOutcomeTargets matches target outcome probabilities', () => {
  const matrix = buildScoreMatrix(1.2, 1.2, { maxGoals: 7 });
  const adjusted = reweightMatrixToOutcomeTargets(matrix, { home: 0.5, draw: 0.25, away: 0.25 });
  const totals = outcomeTotals(adjusted);
  approx(totals.home, 0.5);
  approx(totals.draw, 0.25);
  approx(totals.away, 0.25);
});

test('deriveLambdas and predictScore return top score candidates', () => {
  const home = { games: 5, goalsFor: 8, goalsAgainst: 4 };
  const away = { games: 5, goalsFor: 7, goalsAgainst: 5 };
  const lambdas = deriveLambdas(home, away);
  assert.ok(lambdas.lambdaHome > 0);
  assert.ok(lambdas.lambdaAway > 0);
  const prediction = predictScore(home, away, { home: 0.42, draw: 0.27, away: 0.31 });
  assert.ok(prediction.topScores.length > 0);
  assert.match(prediction.topScores[0].score, /^\d+-\d+$/);
});

test('Kalshi RSA-PSS signature can be verified with public key', () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
  const privatePem = privateKey.export({ type: 'pkcs8', format: 'pem' });
  const publicPem = publicKey.export({ type: 'spki', format: 'pem' });
  const timestampMs = 1710000000000;
  const method = 'GET';
  const pathWithQuery = '/trade-api/v2/markets?limit=1';
  const signature = signKalshiRequest({ timestampMs, method, pathWithQuery, privateKey: privatePem });
  const payload = buildKalshiSignaturePayload(timestampMs, method, pathWithQuery);
  const ok = crypto.verify('sha256', Buffer.from(payload), {
    key: publicPem,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
  }, Buffer.from(signature, 'base64'));
  assert.equal(ok, true);
});

(async () => {
  let passed = 0;
  for (const { name, fn } of tests) {
    try {
      await fn();
      passed += 1;
      console.log(`✓ ${name}`);
    } catch (error) {
      console.error(`✗ ${name}`);
      console.error(error);
      process.exitCode = 1;
      break;
    }
  }
  if (process.exitCode) return;
  console.log(`\n${passed} passed / 0 failed`);
})();
