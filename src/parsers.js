'use strict';

function parseMaybeJsonArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function tokenize(value) {
  const normalized = normalizeText(value);
  return normalized ? normalized.split(/\s+/) : [];
}

function includesTeamName(outcome, team) {
  const out = normalizeText(outcome);
  const name = normalizeText(team);
  if (!out || !name) return false;
  if (out.includes(name) || name.includes(out)) return true;

  const outTokens = new Set(tokenize(out));
  const teamTokens = tokenize(name).filter((token) => token.length > 2);
  if (!teamTokens.length) return false;
  return teamTokens.some((token) => outTokens.has(token));
}

function normalizeProbabilities(probabilities) {
  const home = Number(probabilities?.home) || 0;
  const draw = Number(probabilities?.draw) || 0;
  const away = Number(probabilities?.away) || 0;
  const total = home + draw + away;
  if (total <= 0) return null;
  return { home: home / total, draw: draw / total, away: away / total };
}

function marketLooksLikeThreeWayResult(market, homeTeam, awayTeam) {
  const title = market.question || market.title || market.slug || market.conditionId || '';
  const text = normalizeText(`${title} ${market.description || ''}`);
  if (!includesTeamName(text, homeTeam) || !includesTeamName(text, awayTeam)) return false;

  const positivePatterns = [
    /\bmatch winner\b/,
    /\bmatch result\b/,
    /\b90 minutes?\b/,
    /\b90 min\b/,
    /\bfull time\b/,
    /\bregulation\b/,
    /\b3 way\b/,
    /\bthree way\b/,
    /\bwho will win\b/,
    /\bto win\b/,
    /\bresult\b/,
    /\bwinner\b/,
  ];
  const negativePatterns = [
    /\badvance\b/,
    /\bqualify\b/,
    /\bto qualify\b/,
    /\bwin group\b/,
    /\bgroup winner\b/,
    /\bchampion\b/,
    /\bwin the world cup\b/,
    /\btournament\b/,
    /\bpenalt/,
    /\bovertime\b/,
    /\bextra time\b/,
    /\bexact score\b/,
    /\bcorrect score\b/,
    /\btotal goals\b/,
    /\bover under\b/,
    /\bclean sheet\b/,
  ];

  return positivePatterns.some((pattern) => pattern.test(text))
    && !negativePatterns.some((pattern) => pattern.test(text));
}

function classifyThreeWayOutcome(label, homeTeam, awayTeam) {
  if (/\b(draw|tie|x)\b/i.test(label)) return 'draw';
  if (includesTeamName(label, homeTeam)) return 'home';
  if (includesTeamName(label, awayTeam)) return 'away';
  return null;
}

function parsePolymarketMarket(market, homeTeam, awayTeam) {
  const outcomes = parseMaybeJsonArray(market.outcomes || market.outcomeNames);
  const prices = parseMaybeJsonArray(market.outcomePrices || market.prices).map(Number);
  if (!outcomes.length || outcomes.length !== prices.length) return null;
  if (outcomes.length !== 3) return null;
  if (!marketLooksLikeThreeWayResult(market, homeTeam, awayTeam)) return null;

  const probabilities = { home: 0, draw: 0, away: 0 };
  const matchedOutcomes = [];
  const matchedSides = new Set();

  outcomes.forEach((outcome, index) => {
    const label = String(outcome || '');
    const price = Number(prices[index]);
    if (!Number.isFinite(price) || price <= 0) return;

    const side = classifyThreeWayOutcome(label, homeTeam, awayTeam);
    if (!side || matchedSides.has(side)) return;
    probabilities[side] += price;
    matchedSides.add(side);
    matchedOutcomes.push({ side, label, price });
  });

  if (!matchedSides.has('home') || !matchedSides.has('draw') || !matchedSides.has('away')) return null;

  const normalized = normalizeProbabilities(probabilities);
  if (!normalized) return null;

  const title = market.question || market.title || market.slug || market.conditionId || 'Untitled market';
  const marketText = normalizeText(`${title} ${market.description || ''}`);
  const textScore = (includesTeamName(marketText, homeTeam) ? 1 : 0) + (includesTeamName(marketText, awayTeam) ? 1 : 0);

  return {
    title,
    slug: market.slug || null,
    url: market.slug ? `https://polymarket.com/event/${market.slug}` : null,
    probabilities: normalized,
    rawProbabilities: probabilities,
    matchedOutcomes,
    confidence: 0.8 + textScore * 0.1,
    source: 'polymarket',
  };
}

function parsePolymarketMarkets(markets, homeTeam, awayTeam) {
  const list = Array.isArray(markets) ? markets : [];
  return list
    .map((market) => parsePolymarketMarket(market, homeTeam, awayTeam))
    .filter(Boolean)
    .sort((a, b) => b.confidence - a.confidence);
}

function scoreEventForTeam(event, teamId) {
  const homeScore = Number(event.intHomeScore);
  const awayScore = Number(event.intAwayScore);
  if (!Number.isFinite(homeScore) || !Number.isFinite(awayScore)) return null;

  const isHome = String(event.idHomeTeam) === String(teamId);
  const isAway = String(event.idAwayTeam) === String(teamId);
  if (!isHome && !isAway) return null;

  const goalsFor = isHome ? homeScore : awayScore;
  const goalsAgainst = isHome ? awayScore : homeScore;
  const result = goalsFor > goalsAgainst ? 'W' : goalsFor < goalsAgainst ? 'L' : 'D';

  return {
    eventId: event.idEvent,
    date: event.dateEvent || event.strTimestamp || null,
    opponent: isHome ? event.strAwayTeam : event.strHomeTeam,
    venue: isHome ? 'home' : 'away',
    goalsFor,
    goalsAgainst,
    result,
  };
}

function deriveRecordFromEvents(events, teamId) {
  const matches = (Array.isArray(events) ? events : [])
    .map((event) => scoreEventForTeam(event, teamId))
    .filter(Boolean);

  const record = {
    games: matches.length,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    matches,
  };

  for (const match of matches) {
    if (match.result === 'W') record.wins += 1;
    if (match.result === 'D') record.draws += 1;
    if (match.result === 'L') record.losses += 1;
    record.goalsFor += match.goalsFor;
    record.goalsAgainst += match.goalsAgainst;
  }

  return record;
}

module.exports = {
  parseMaybeJsonArray,
  normalizeText,
  tokenize,
  includesTeamName,
  normalizeProbabilities,
  marketLooksLikeThreeWayResult,
  parsePolymarketMarket,
  parsePolymarketMarkets,
  scoreEventForTeam,
  deriveRecordFromEvents,
};
