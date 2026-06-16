const $ = (id) => document.getElementById(id);

const state = {
  lastSources: null,
};

function pct(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function numberValue(id, fallback = 0) {
  const value = Number($(id).value);
  return Number.isFinite(value) ? value : fallback;
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

function dixonColesAdjustment(homeGoals, awayGoals, lambdaHome, lambdaAway, rho) {
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

function buildScoreMatrix(lambdaHome, lambdaAway, maxGoals, rho) {
  const matrix = [];
  for (let h = 0; h <= maxGoals; h += 1) {
    const row = [];
    for (let a = 0; a <= maxGoals; a += 1) {
      const base = poissonProbability(h, lambdaHome) * poissonProbability(a, lambdaAway);
      row.push({
        homeGoals: h,
        awayGoals: a,
        probability: base * dixonColesAdjustment(h, a, lambdaHome, lambdaAway, rho),
      });
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
  const home = Number(probabilities.home) || 0;
  const draw = Number(probabilities.draw) || 0;
  const away = Number(probabilities.away) || 0;
  const total = home + draw + away;
  if (total <= 0) return { home: 1 / 3, draw: 1 / 3, away: 1 / 3 };
  return { home: home / total, draw: draw / total, away: away / total };
}

function blendOutcomeProbabilities(modelTotals, marketProbabilities, marketWeight) {
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

function topScores(matrix, limit = 10) {
  return matrix.flat().sort((a, b) => b.probability - a.probability).slice(0, limit);
}

function getRecord(prefix) {
  return {
    games: Math.max(1, numberValue(`${prefix}Games`, 5)),
    goalsFor: Math.max(0, numberValue(`${prefix}GF`, 0)),
    goalsAgainst: Math.max(0, numberValue(`${prefix}GA`, 0)),
  };
}

function deriveLambdas(homeRecord, awayRecord) {
  const mu = numberValue('globalMean', 1.35);
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
    diagnostics: {
      'λ 主隊': null,
      'λ 客隊': null,
      '主隊場均進球': homeRecord.goalsFor / hGames,
      '主隊場均失球': homeRecord.goalsAgainst / hGames,
      '客隊場均進球': awayRecord.goalsFor / aGames,
      '客隊場均失球': awayRecord.goalsAgainst / aGames,
      '主隊攻擊力': homeAttack,
      '客隊攻擊力': awayAttack,
    },
  };
}

function getMarketProbabilities() {
  return normalizeOutcomeProbabilities({
    home: numberValue('marketHome', 0) / 100,
    draw: numberValue('marketDraw', 0) / 100,
    away: numberValue('marketAway', 0) / 100,
  });
}

function renderOutcome(totals) {
  $('outHome').textContent = pct(totals.home);
  $('outDraw').textContent = pct(totals.draw);
  $('outAway').textContent = pct(totals.away);
}

function renderTopScores(scores) {
  $('topScores').innerHTML = scores.map((cell, index) => {
    const result = cell.homeGoals > cell.awayGoals ? '主勝' : cell.homeGoals < cell.awayGoals ? '客勝' : '和局';
    return `<tr><td>${index + 1}</td><td>${cell.homeGoals}-${cell.awayGoals}</td><td>${result}</td><td>${pct(cell.probability)}</td></tr>`;
  }).join('');
}

function renderDiagnostics(lambdaHome, lambdaAway, diagnostics, modelTotals, marketWeight) {
  const items = {
    'λ 主隊': lambdaHome,
    'λ 客隊': lambdaAway,
    ...diagnostics,
    '模型主勝': modelTotals.home,
    '模型和局': modelTotals.draw,
    '模型客勝': modelTotals.away,
    '市場權重': marketWeight,
  };
  $('diagnostics').innerHTML = Object.entries(items)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([label, value]) => `<div class="diagnostic-item"><span>${label}</span><span>${Number(value).toFixed(3)}</span></div>`)
    .join('');
}

function renderMatrix(matrix) {
  const maxProb = Math.max(...matrix.flat().map((cell) => cell.probability));
  $('scoreMatrix').innerHTML = matrix.flat().map((cell) => {
    const hot = cell.probability >= maxProb * 0.75 ? ' hot' : '';
    return `<div class="cell${hot}"><strong>${cell.homeGoals}-${cell.awayGoals}</strong><small>${pct(cell.probability)}</small></div>`;
  }).join('');
}

function predict() {
  const homeTeam = $('homeTeam').value.trim() || 'Home';
  const awayTeam = $('awayTeam').value.trim() || 'Away';
  $('homeLabel').textContent = homeTeam;
  $('awayLabel').textContent = awayTeam;

  const homeRecord = getRecord('home');
  const awayRecord = getRecord('away');
  const market = getMarketProbabilities();
  const marketWeight = numberValue('marketWeight', 55) / 100;
  const rho = numberValue('rho', -0.08);

  const { lambdaHome, lambdaAway, diagnostics } = deriveLambdas(homeRecord, awayRecord);
  const rawMatrix = buildScoreMatrix(lambdaHome, lambdaAway, 7, rho);
  const modelTotals = outcomeTotals(rawMatrix);
  const blendedTargets = blendOutcomeProbabilities(modelTotals, market, marketWeight);
  const calibratedMatrix = reweightMatrixToOutcomeTargets(rawMatrix, blendedTargets);
  const totals = outcomeTotals(calibratedMatrix);
  const scores = topScores(calibratedMatrix, 10);
  const best = scores[0];

  $('bestScore').textContent = `${best.homeGoals}-${best.awayGoals}`;
  $('bestScoreProb').textContent = `${homeTeam} vs ${awayTeam}｜單一最可能比分機率 ${pct(best.probability)}`;

  renderOutcome(totals);
  renderTopScores(scores);
  renderDiagnostics(lambdaHome, lambdaAway, diagnostics, modelTotals, marketWeight);
  renderMatrix(calibratedMatrix);
}

function recordSummary(record) {
  if (!record || !record.games) return '未取得可用戰績。';
  return `${record.games} 場｜${record.wins ?? 0}勝 ${record.draws ?? 0}和 ${record.losses ?? 0}負｜進 ${record.goalsFor} / 失 ${record.goalsAgainst}`;
}

function applyRecord(prefix, payload) {
  const record = payload?.record;
  if (!payload?.ok || !record?.games) return false;
  $(`${prefix}Games`).value = record.games;
  $(`${prefix}GF`).value = record.goalsFor;
  $(`${prefix}GA`).value = record.goalsAgainst;
  $(`${prefix}RecordText`).textContent = recordSummary(record);
  return true;
}

function applyMarket(payload) {
  const probabilities = payload?.polymarket?.best?.probabilities || payload?.best?.probabilities;
  const title = payload?.polymarket?.best?.title || payload?.best?.title;
  if (!probabilities) return false;
  $('marketHome').value = (probabilities.home * 100).toFixed(1);
  $('marketDraw').value = (probabilities.draw * 100).toFixed(1);
  $('marketAway').value = (probabilities.away * 100).toFixed(1);
  $('marketSource').textContent = `目前使用 Polymarket 解析：${title}`;
  return true;
}

async function fetchSources() {
  const home = $('homeTeam').value.trim();
  const away = $('awayTeam').value.trim();
  if (!home || !away) return;

  $('fetchSources').disabled = true;
  $('sourceNotes').innerHTML = '正在抓 TheSportsDB / Polymarket / Kalshi…';

  try {
    const response = await fetch(`/api/sources?home=${encodeURIComponent(home)}&away=${encodeURIComponent(away)}`);
    const payload = await response.json();
    state.lastSources = payload;

    const homeApplied = applyRecord('home', payload.homeRecord);
    const awayApplied = applyRecord('away', payload.awayRecord);
    const marketApplied = applyMarket(payload);

    const notes = [];
    notes.push(homeApplied ? `主隊已套用：${recordSummary(payload.homeRecord.record)}` : `主隊資料未套用：${payload.homeRecord?.error || 'unknown error'}`);
    notes.push(awayApplied ? `客隊已套用：${recordSummary(payload.awayRecord.record)}` : `客隊資料未套用：${payload.awayRecord?.error || 'unknown error'}`);
    notes.push(marketApplied ? '已套用 Polymarket 勝平負機率。' : `Polymarket 未解析到完整勝平負盤：${payload.polymarket?.error || '請手動填機率'}`);
    notes.push(payload.kalshi?.enabled ? `Kalshi：${payload.kalshi.ok ? `找到 ${payload.kalshi.markets.length} 個市場摘要` : payload.kalshi.error}` : 'Kalshi：未設定金鑰，已略過。');
    $('sourceNotes').innerHTML = notes.map((note) => `<div>• ${note}</div>`).join('');

    predict();
  } catch (error) {
    $('sourceNotes').innerHTML = `資料源請求失敗：${error.message}`;
  } finally {
    $('fetchSources').disabled = false;
  }
}

async function checkHealth() {
  try {
    const response = await fetch('/api/health');
    const payload = await response.json();
    if (payload.ok) {
      $('health').className = 'status status-ok';
      $('health').textContent = payload.kalshiEnabled ? '後端已連線｜Kalshi 已啟用' : '後端已連線｜Kalshi 未啟用';
      return;
    }
    throw new Error('health not ok');
  } catch (_error) {
    $('health').className = 'status status-bad';
    $('health').textContent = '後端未連線';
  }
}

$('fetchSources').addEventListener('click', fetchSources);
$('predict').addEventListener('click', predict);
['homeTeam','awayTeam','homeGames','homeGF','homeGA','awayGames','awayGF','awayGA','marketHome','marketDraw','marketAway','marketWeight','globalMean','rho']
  .forEach((id) => $(id).addEventListener('input', predict));

checkHealth();
predict();
