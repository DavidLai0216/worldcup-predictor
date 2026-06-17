const $ = (id) => document.getElementById(id);

const FIXTURES = [
  {
    id: 'mex-rsa',
    group: 'Group A',
    kickoff: '2026-06-11 19:00',
    venue: 'Mexico City Stadium',
    home: 'Mexico',
    away: 'South Africa',
    seedMarket: { home: 0.55, draw: 0.27, away: 0.18 },
    homeRecord: { games: 5, goalsFor: 9, goalsAgainst: 4 },
    awayRecord: { games: 5, goalsFor: 5, goalsAgainst: 6 },
  },
  {
    id: 'kor-cze',
    group: 'Group A',
    kickoff: '2026-06-11 22:00',
    venue: 'Guadalajara Stadium',
    home: 'Korea Republic',
    away: 'Czechia',
    seedMarket: { home: 0.34, draw: 0.29, away: 0.37 },
    homeRecord: { games: 5, goalsFor: 8, goalsAgainst: 5 },
    awayRecord: { games: 5, goalsFor: 7, goalsAgainst: 5 },
  },
  {
    id: 'can-bih',
    group: 'Group B',
    kickoff: '2026-06-12 19:00',
    venue: 'Toronto Stadium',
    home: 'Canada',
    away: 'Bosnia and Herzegovina',
    seedMarket: { home: 0.42, draw: 0.28, away: 0.30 },
    homeRecord: { games: 5, goalsFor: 8, goalsAgainst: 6 },
    awayRecord: { games: 5, goalsFor: 7, goalsAgainst: 6 },
  },
  {
    id: 'usa-par',
    group: 'Group D',
    kickoff: '2026-06-12 22:00',
    venue: 'Los Angeles Stadium',
    home: 'United States',
    away: 'Paraguay',
    seedMarket: { home: 0.50, draw: 0.27, away: 0.23 },
    homeRecord: { games: 5, goalsFor: 10, goalsAgainst: 5 },
    awayRecord: { games: 5, goalsFor: 5, goalsAgainst: 6 },
  },
  {
    id: 'ger-cur',
    group: 'Group E',
    kickoff: '2026-06-14 12:00',
    venue: 'Houston Stadium',
    home: 'Germany',
    away: 'Curacao',
    seedMarket: { home: 0.74, draw: 0.17, away: 0.09 },
    homeRecord: { games: 5, goalsFor: 12, goalsAgainst: 5 },
    awayRecord: { games: 5, goalsFor: 5, goalsAgainst: 9 },
  },
  {
    id: 'esp-cpv',
    group: 'Group G',
    kickoff: '2026-06-15 12:00',
    venue: 'Atlanta Stadium',
    home: 'Spain',
    away: 'Cabo Verde',
    seedMarket: { home: 0.70, draw: 0.19, away: 0.11 },
    homeRecord: { games: 5, goalsFor: 11, goalsAgainst: 3 },
    awayRecord: { games: 5, goalsFor: 5, goalsAgainst: 6 },
  },
  {
    id: 'ksa-uru',
    group: 'Group H',
    kickoff: '2026-06-15 19:00',
    venue: 'Miami Stadium',
    home: 'Saudi Arabia',
    away: 'Uruguay',
    seedMarket: { home: 0.16, draw: 0.24, away: 0.60 },
    homeRecord: { games: 5, goalsFor: 4, goalsAgainst: 7 },
    awayRecord: { games: 5, goalsFor: 8, goalsAgainst: 4 },
  },
  {
    id: 'por-cod',
    group: 'Group K',
    kickoff: '2026-06-17 12:00',
    venue: 'Houston Stadium',
    home: 'Portugal',
    away: 'Congo DR',
    seedMarket: { home: 0.68, draw: 0.20, away: 0.12 },
    homeRecord: { games: 5, goalsFor: 12, goalsAgainst: 4 },
    awayRecord: { games: 5, goalsFor: 6, goalsAgainst: 6 },
  },
];

const state = {
  backendAvailable: false,
  fixtures: FIXTURES.map((fixture) => ({
    ...fixture,
    market: fixture.seedMarket,
    marketSource: 'Seed market',
    marketTitle: 'Seed market baseline',
    marketLoading: true,
  })),
};

function pct(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i += 1) result *= i;
  return result;
}

function poissonProbability(k, lambda) {
  return Math.exp(-lambda) * Math.pow(lambda, k) / factorial(k);
}

function dixonColesAdjustment(homeGoals, awayGoals, lambdaHome, lambdaAway, rho = -0.08) {
  if (homeGoals === 0 && awayGoals === 0) return Math.max(0.01, 1 - lambdaHome * lambdaAway * rho);
  if (homeGoals === 0 && awayGoals === 1) return Math.max(0.01, 1 + lambdaHome * rho);
  if (homeGoals === 1 && awayGoals === 0) return Math.max(0.01, 1 + lambdaAway * rho);
  if (homeGoals === 1 && awayGoals === 1) return Math.max(0.01, 1 - rho);
  return 1;
}

function normalizeMatrix(matrix) {
  const total = matrix.flat().reduce((sum, cell) => sum + cell.probability, 0);
  return matrix.map((row) => row.map((cell) => ({ ...cell, probability: cell.probability / total })));
}

function buildScoreMatrix(lambdaHome, lambdaAway, maxGoals = 7) {
  const matrix = [];
  for (let h = 0; h <= maxGoals; h += 1) {
    const row = [];
    for (let a = 0; a <= maxGoals; a += 1) {
      const base = poissonProbability(h, lambdaHome) * poissonProbability(a, lambdaAway);
      row.push({ homeGoals: h, awayGoals: a, probability: base * dixonColesAdjustment(h, a, lambdaHome, lambdaAway) });
    }
    matrix.push(row);
  }
  return normalizeMatrix(matrix);
}

function outcomeOf(homeGoals, awayGoals) {
  if (homeGoals > awayGoals) return 'home';
  if (homeGoals < awayGoals) return 'away';
  return 'draw';
}

function outcomeTotals(matrix) {
  const totals = { home: 0, draw: 0, away: 0 };
  for (const row of matrix) {
    for (const cell of row) totals[outcomeOf(cell.homeGoals, cell.awayGoals)] += cell.probability;
  }
  return totals;
}

function normalizeOutcomeProbabilities(probabilities) {
  const home = Number(probabilities?.home) || 0;
  const draw = Number(probabilities?.draw) || 0;
  const away = Number(probabilities?.away) || 0;
  const total = home + draw + away;
  if (total <= 0) return { home: 1 / 3, draw: 1 / 3, away: 1 / 3 };
  return { home: home / total, draw: draw / total, away: away / total };
}

function blendOutcomeProbabilities(modelTotals, marketProbabilities, marketWeight = 0.55) {
  const model = normalizeOutcomeProbabilities(modelTotals);
  const market = normalizeOutcomeProbabilities(marketProbabilities);
  return normalizeOutcomeProbabilities({
    home: model.home * (1 - marketWeight) + market.home * marketWeight,
    draw: model.draw * (1 - marketWeight) + market.draw * marketWeight,
    away: model.away * (1 - marketWeight) + market.away * marketWeight,
  });
}

function reweightMatrixToOutcomeTargets(matrix, targets) {
  const current = outcomeTotals(matrix);
  const factors = {
    home: current.home > 0 ? targets.home / current.home : 0,
    draw: current.draw > 0 ? targets.draw / current.draw : 0,
    away: current.away > 0 ? targets.away / current.away : 0,
  };
  return normalizeMatrix(matrix.map((row) => row.map((cell) => ({
    ...cell,
    probability: cell.probability * factors[outcomeOf(cell.homeGoals, cell.awayGoals)],
  }))));
}

function topScores(matrix, limit = 3) {
  return matrix.flat().sort((a, b) => b.probability - a.probability).slice(0, limit);
}

function deriveLambdas(homeRecord, awayRecord) {
  const mu = 1.35;
  const homeAdvantage = 1.06;
  const hGames = Math.max(1, homeRecord.games);
  const aGames = Math.max(1, awayRecord.games);
  const homeAttack = clamp((homeRecord.goalsFor / hGames) / mu, 0.35, 2.8);
  const homeDefenseWeakness = clamp((homeRecord.goalsAgainst / hGames) / mu, 0.35, 2.8);
  const awayAttack = clamp((awayRecord.goalsFor / aGames) / mu, 0.35, 2.8);
  const awayDefenseWeakness = clamp((awayRecord.goalsAgainst / aGames) / mu, 0.35, 2.8);

  return {
    lambdaHome: clamp(mu * homeAdvantage * homeAttack * awayDefenseWeakness, 0.15, 4.5),
    lambdaAway: clamp(mu * awayAttack * homeDefenseWeakness, 0.15, 4.5),
  };
}

function predictFixture(fixture) {
  const { lambdaHome, lambdaAway } = deriveLambdas(fixture.homeRecord, fixture.awayRecord);
  const rawMatrix = buildScoreMatrix(lambdaHome, lambdaAway);
  const modelTotals = outcomeTotals(rawMatrix);
  const targets = blendOutcomeProbabilities(modelTotals, fixture.market);
  const calibratedMatrix = reweightMatrixToOutcomeTargets(rawMatrix, targets);
  const scores = topScores(calibratedMatrix);
  return { scores, totals: outcomeTotals(calibratedMatrix), lambdaHome, lambdaAway };
}

function sourceClass(source) {
  if (source === 'Polymarket') return 'source-polymarket';
  if (source === 'Kalshi') return 'source-kalshi';
  return 'source-seed';
}

function renderFixtureCard(fixture) {
  const prediction = predictFixture(fixture);
  const best = prediction.scores[0];
  const market = normalizeOutcomeProbabilities(fixture.market);
  const sourceLabel = fixture.marketLoading ? 'Checking markets...' : fixture.marketSource;
  const topScores = prediction.scores.map((score) => `
    <span>${score.homeGoals}-${score.awayGoals} <b>${pct(score.probability)}</b></span>
  `).join('');

  return `
    <article class="fixture-card">
      <div class="fixture-card__top">
        <div>
          <p class="eyebrow">${fixture.group}</p>
          <h2>${escapeHtml(fixture.home)} <span>vs</span> ${escapeHtml(fixture.away)}</h2>
          <p class="muted">${escapeHtml(fixture.kickoff)} · ${escapeHtml(fixture.venue)}</p>
        </div>
        <span class="source-pill ${sourceClass(fixture.marketSource)}">${escapeHtml(sourceLabel)}</span>
      </div>

      <div class="prediction-row">
        <div>
          <p class="label">最可能比分</p>
          <strong class="best-score">${best.homeGoals}-${best.awayGoals}</strong>
          <small>${pct(best.probability)}</small>
        </div>
        <div class="market-grid">
          <span><b>${pct(market.home)}</b><small>${escapeHtml(fixture.home)} 勝</small></span>
          <span><b>${pct(market.draw)}</b><small>和局</small></span>
          <span><b>${pct(market.away)}</b><small>${escapeHtml(fixture.away)} 勝</small></span>
        </div>
      </div>

      <div class="top-scores">${topScores}</div>
      <p class="market-title">${escapeHtml(fixture.marketTitle)}</p>
    </article>
  `;
}

function renderFixtures() {
  $('fixtures').innerHTML = state.fixtures.map(renderFixtureCard).join('');
  const counts = state.fixtures.reduce((acc, fixture) => {
    acc[fixture.marketSource] = (acc[fixture.marketSource] || 0) + 1;
    return acc;
  }, {});
  $('marketSummary').textContent = `Polymarket ${counts.Polymarket || 0} · Kalshi ${counts.Kalshi || 0} · Seed market ${counts['Seed market'] || 0}`;
}

function hasCompleteMarket(probabilities) {
  return probabilities
    && Number.isFinite(probabilities.home)
    && Number.isFinite(probabilities.draw)
    && Number.isFinite(probabilities.away)
    && probabilities.home > 0
    && probabilities.draw > 0
    && probabilities.away > 0;
}

async function refreshFixtureMarket(fixture) {
  if (!state.backendAvailable) {
    fixture.market = fixture.seedMarket;
    fixture.marketSource = 'Seed market';
    fixture.marketTitle = '公開展示模式：使用 Seed market baseline';
    fixture.marketLoading = false;
    renderFixtures();
    return;
  }

  try {
    const response = await fetch(`/api/fixture-market?home=${encodeURIComponent(fixture.home)}&away=${encodeURIComponent(fixture.away)}`);
    const payload = await response.json();
    const probabilities = payload?.market?.probabilities;
    if (payload.source === 'Polymarket' && hasCompleteMarket(probabilities)) {
      fixture.market = probabilities;
      fixture.marketSource = 'Polymarket';
      fixture.marketTitle = payload.market.title || 'Polymarket match winner';
    } else if (payload.source === 'Kalshi' && hasCompleteMarket(probabilities)) {
      fixture.market = probabilities;
      fixture.marketSource = 'Kalshi';
      fixture.marketTitle = payload.market.title || 'Kalshi market';
    } else {
      fixture.market = fixture.seedMarket;
      fixture.marketSource = 'Seed market';
      fixture.marketTitle = 'Seed market baseline';
    }
  } catch (error) {
    fixture.market = fixture.seedMarket;
    fixture.marketSource = 'Seed market';
    fixture.marketTitle = `Seed market baseline (${error.message})`;
  } finally {
    fixture.marketLoading = false;
    renderFixtures();
  }
}

async function refreshAllMarkets() {
  $('refreshMarkets').disabled = true;
  state.fixtures = state.fixtures.map((fixture) => ({
    ...fixture,
    market: fixture.seedMarket,
    marketSource: 'Seed market',
    marketTitle: 'Seed market baseline',
    marketLoading: true,
  }));
  renderFixtures();
  if (!state.backendAvailable) {
    state.fixtures.forEach((fixture) => {
      fixture.marketLoading = false;
      fixture.marketTitle = '公開展示模式：使用 Seed market baseline';
    });
    renderFixtures();
    $('refreshMarkets').disabled = false;
    return;
  }

  await Promise.all(state.fixtures.map(refreshFixtureMarket));
  $('refreshMarkets').disabled = false;
}

async function checkHealth() {
  try {
    const response = await fetch('/api/health');
    const payload = await response.json();
    if (!payload.ok) throw new Error('health not ok');
    $('health').className = 'status status-ok';
    $('health').textContent = payload.kalshiEnabled ? '後端已連線｜Kalshi 已啟用' : '後端已連線｜Kalshi 未啟用';
    state.backendAvailable = true;
    return true;
  } catch (_error) {
    $('health').className = 'status status-ok';
    $('health').textContent = '公開展示模式｜Seed market';
    state.backendAvailable = false;
    return false;
  }
}

$('refreshMarkets').addEventListener('click', refreshAllMarkets);

async function init() {
  renderFixtures();
  await checkHealth();
  await refreshAllMarkets();
}

init();
