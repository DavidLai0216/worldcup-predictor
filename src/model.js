'use strict';

const DEFAULT_MAX_GOALS = 7;
const DEFAULT_GLOBAL_MEAN_GOALS = 1.35;
const DEFAULT_HOME_ADVANTAGE = 1.06;
const DEFAULT_RHO = -0.08;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function factorial(n) {
  if (!Number.isInteger(n) || n < 0) throw new Error('factorial expects a non-negative integer');
  let result = 1;
  for (let i = 2; i <= n; i += 1) result *= i;
  return result;
}

function poissonProbability(k, lambda) {
  if (!Number.isFinite(lambda) || lambda <= 0) throw new Error('lambda must be positive');
  if (!Number.isInteger(k) || k < 0) throw new Error('k must be a non-negative integer');
  return Math.exp(-lambda) * Math.pow(lambda, k) / factorial(k);
}

function dixonColesAdjustment(homeGoals, awayGoals, lambdaHome, lambdaAway, rho = DEFAULT_RHO) {
  if (homeGoals === 0 && awayGoals === 0) return Math.max(0.01, 1 - lambdaHome * lambdaAway * rho);
  if (homeGoals === 0 && awayGoals === 1) return Math.max(0.01, 1 + lambdaHome * rho);
  if (homeGoals === 1 && awayGoals === 0) return Math.max(0.01, 1 + lambdaAway * rho);
  if (homeGoals === 1 && awayGoals === 1) return Math.max(0.01, 1 - rho);
  return 1;
}

function normalizeMatrix(matrix) {
  const total = matrix.flat().reduce((sum, cell) => sum + cell.probability, 0);
  if (total <= 0) throw new Error('matrix total probability must be positive');
  return matrix.map((row) => row.map((cell) => ({ ...cell, probability: cell.probability / total })));
}

function buildScoreMatrix(lambdaHome, lambdaAway, options = {}) {
  const maxGoals = options.maxGoals ?? DEFAULT_MAX_GOALS;
  const rho = options.rho ?? DEFAULT_RHO;
  const matrix = [];

  for (let h = 0; h <= maxGoals; h += 1) {
    const row = [];
    for (let a = 0; a <= maxGoals; a += 1) {
      const base = poissonProbability(h, lambdaHome) * poissonProbability(a, lambdaAway);
      const adjusted = base * dixonColesAdjustment(h, a, lambdaHome, lambdaAway, rho);
      row.push({ homeGoals: h, awayGoals: a, probability: adjusted });
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
    for (const cell of row) {
      totals[outcomeOf(cell.homeGoals, cell.awayGoals)] += cell.probability;
    }
  }
  return totals;
}

function normalizeOutcomeProbabilities(probabilities) {
  const raw = {
    home: Number(probabilities?.home) || 0,
    draw: Number(probabilities?.draw) || 0,
    away: Number(probabilities?.away) || 0,
  };
  const total = raw.home + raw.draw + raw.away;
  if (total <= 0) return null;
  return {
    home: raw.home / total,
    draw: raw.draw / total,
    away: raw.away / total,
  };
}

function blendOutcomeProbabilities(modelTotals, marketProbabilities, marketWeight = 0.55) {
  const market = normalizeOutcomeProbabilities(marketProbabilities);
  const model = normalizeOutcomeProbabilities(modelTotals);
  if (!market) return model;
  const weight = clamp(Number(marketWeight), 0, 1);
  return normalizeOutcomeProbabilities({
    home: model.home * (1 - weight) + market.home * weight,
    draw: model.draw * (1 - weight) + market.draw * weight,
    away: model.away * (1 - weight) + market.away * weight,
  });
}

function reweightMatrixToOutcomeTargets(matrix, targetOutcomeProbabilities) {
  const targets = normalizeOutcomeProbabilities(targetOutcomeProbabilities);
  if (!targets) return normalizeMatrix(matrix);
  const current = outcomeTotals(matrix);

  const factors = {
    home: current.home > 0 ? targets.home / current.home : 0,
    draw: current.draw > 0 ? targets.draw / current.draw : 0,
    away: current.away > 0 ? targets.away / current.away : 0,
  };

  const adjusted = matrix.map((row) => row.map((cell) => ({
    ...cell,
    probability: cell.probability * factors[outcomeOf(cell.homeGoals, cell.awayGoals)],
  })));

  return normalizeMatrix(adjusted);
}

function topScores(matrix, limit = 10) {
  return matrix
    .flat()
    .slice()
    .sort((a, b) => b.probability - a.probability)
    .slice(0, limit)
    .map((cell) => ({
      score: `${cell.homeGoals}-${cell.awayGoals}`,
      homeGoals: cell.homeGoals,
      awayGoals: cell.awayGoals,
      probability: cell.probability,
      outcome: outcomeOf(cell.homeGoals, cell.awayGoals),
    }));
}

function safeGames(record) {
  return Math.max(1, Number(record?.games) || ((Number(record?.wins) || 0) + (Number(record?.draws) || 0) + (Number(record?.losses) || 0)) || 1);
}

function deriveLambdas(homeRecord, awayRecord, options = {}) {
  const mu = Number(options.globalMeanGoals) || DEFAULT_GLOBAL_MEAN_GOALS;
  const homeAdvantage = Number(options.homeAdvantage) || DEFAULT_HOME_ADVANTAGE;

  const hGames = safeGames(homeRecord);
  const aGames = safeGames(awayRecord);

  const hGf = Number(homeRecord?.goalsFor) || mu * hGames;
  const hGa = Number(homeRecord?.goalsAgainst) || mu * hGames;
  const aGf = Number(awayRecord?.goalsFor) || mu * aGames;
  const aGa = Number(awayRecord?.goalsAgainst) || mu * aGames;

  const homeAttack = clamp((hGf / hGames) / mu, 0.35, 2.8);
  const homeDefenseWeakness = clamp((hGa / hGames) / mu, 0.35, 2.8);
  const awayAttack = clamp((aGf / aGames) / mu, 0.35, 2.8);
  const awayDefenseWeakness = clamp((aGa / aGames) / mu, 0.35, 2.8);

  const lambdaHome = clamp(mu * homeAdvantage * homeAttack * awayDefenseWeakness, 0.15, 4.5);
  const lambdaAway = clamp(mu * awayAttack * homeDefenseWeakness, 0.15, 4.5);

  return {
    lambdaHome,
    lambdaAway,
    diagnostics: {
      mu,
      homeAdvantage,
      homeAttack,
      homeDefenseWeakness,
      awayAttack,
      awayDefenseWeakness,
      homeGoalsForPerGame: hGf / hGames,
      homeGoalsAgainstPerGame: hGa / hGames,
      awayGoalsForPerGame: aGf / aGames,
      awayGoalsAgainstPerGame: aGa / aGames,
    },
  };
}

function predictScore(homeRecord, awayRecord, marketProbabilities, options = {}) {
  const { lambdaHome, lambdaAway, diagnostics } = deriveLambdas(homeRecord, awayRecord, options);
  const rawMatrix = buildScoreMatrix(lambdaHome, lambdaAway, options);
  const modelOutcome = outcomeTotals(rawMatrix);
  const blendedOutcome = blendOutcomeProbabilities(modelOutcome, marketProbabilities, options.marketWeight ?? 0.55);
  const calibratedMatrix = reweightMatrixToOutcomeTargets(rawMatrix, blendedOutcome);
  return {
    lambdaHome,
    lambdaAway,
    diagnostics,
    modelOutcome,
    blendedOutcome: outcomeTotals(calibratedMatrix),
    topScores: topScores(calibratedMatrix, options.limit ?? 10),
    matrix: calibratedMatrix,
  };
}

module.exports = {
  DEFAULT_MAX_GOALS,
  DEFAULT_GLOBAL_MEAN_GOALS,
  DEFAULT_HOME_ADVANTAGE,
  DEFAULT_RHO,
  clamp,
  factorial,
  poissonProbability,
  dixonColesAdjustment,
  buildScoreMatrix,
  normalizeMatrix,
  outcomeOf,
  outcomeTotals,
  normalizeOutcomeProbabilities,
  blendOutcomeProbabilities,
  reweightMatrixToOutcomeTargets,
  topScores,
  deriveLambdas,
  predictScore,
};
