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

function parsePolymarketMarket(market, homeTeam, awayTeam) {
  const outcomes = parseMaybeJsonArray(market.outcomes || market.outcomeNames);
  const prices = parseMaybeJsonArray(market.outcomePrices || market.prices).map(Number);
  if (!outcomes.length || outcomes.length !== prices.length) return null;

  const probabilities = { home: 0, draw: 0, away: 0 };
  const matchedOutcomes = [];

  outcomes.forEach((outcome, index) => {
    const label = String(outcome || '');
    const price = Number(prices[index]);
    if (!Number.isFinite(price) || price <= 0) return;

    if (/\b(draw|tie)\b/i.test(label)) {
      probabilities.draw += price;
      matchedOutcomes.push({ side: 'draw', label, price });
    } else if (includesTeamName(label, homeTeam)) {
      probabilities.home += price;
      matchedOutcomes.push({ side: 'home', label, price });
    } else if (includesTeamName(label, awayTeam)) {
      probabilities.away += price;
      matchedOutcomes.push({ side: 'away', label, price });
    }
  });

  const normalized = normalizeProbabilities(probabilities);
  if (!normalized) return null;

  const hasBothTeams = matchedOutcomes.some((m) => m.side === 'home') && matchedOutcomes.some((m) => m.side === 'away');
  const hasDraw = matchedOutcomes.some((m) => m.side === 'draw');
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
    confidence: (hasBothTeams ? 0.5 : 0.2) + (hasDraw ? 0.2 : 0) + textScore * 0.15,
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
  parsePolymarketMarket,
  parsePolymarketMarkets,
  scoreEventForTeam,
  deriveRecordFromEvents,
};
