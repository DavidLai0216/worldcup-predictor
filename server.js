'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');
const { parsePolymarketMarkets, deriveRecordFromEvents, normalizeText } = require('./src/parsers');
const { buildKalshiHeaders, kalshiEnabled, parseKalshiMarkets } = require('./src/kalshi');

loadEnvFile(path.join(__dirname, '.env'));

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_DIR = path.join(__dirname, 'public');
const SPORTSDB_KEY = process.env.SPORTSDB_API_KEY || '3';
const POLYMARKET_BASE = process.env.POLYMARKET_GAMMA_BASE || 'https://gamma-api.polymarket.com';
const KALSHI_BASE = process.env.KALSHI_API_BASE || 'https://api.elections.kalshi.com';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    const value = rawValue.replace(/^['"]|['"]$/g, '');
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

function jsonResponse(res, statusCode, data) {
  const body = JSON.stringify(data, null, 2);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(body);
}

function textResponse(res, statusCode, text, contentType = 'text/plain; charset=utf-8') {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(text);
}

async function fetchJson(url, options = {}) {
  const timeoutMs = options.timeoutMs || 8500;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'User-Agent': 'worldcup-predictor/0.1',
        ...(options.headers || {}),
      },
    });
    const text = await response.text();
    let json;
    try {
      json = text ? JSON.parse(text) : null;
    } catch (_error) {
      json = { raw: text };
    }
    if (!response.ok) {
      return { ok: false, status: response.status, data: json, error: `HTTP ${response.status}` };
    }
    return { ok: true, status: response.status, data: json };
  } catch (error) {
    return { ok: false, status: 0, data: null, error: error.name === 'AbortError' ? 'Request timed out' : error.message };
  } finally {
    clearTimeout(timeout);
  }
}

function requireParam(searchParams, name) {
  const value = searchParams.get(name);
  if (!value || !value.trim()) throw new Error(`Missing query parameter: ${name}`);
  return value.trim();
}

function pickBestTeam(teams, query) {
  const list = Array.isArray(teams) ? teams : [];
  if (!list.length) return null;
  const q = normalizeText(query);
  return list.find((team) => normalizeText(team.strTeam) === q)
    || list.find((team) => normalizeText(team.strTeam).includes(q) || q.includes(normalizeText(team.strTeam)))
    || list[0];
}

async function fetchTeamRecord(teamName) {
  const searchUrl = `https://www.thesportsdb.com/api/v1/json/${SPORTSDB_KEY}/searchteams.php?t=${encodeURIComponent(teamName)}`;
  const search = await fetchJson(searchUrl);
  if (!search.ok) return { ok: false, teamName, error: search.error, source: 'TheSportsDB' };

  const team = pickBestTeam(search.data?.teams, teamName);
  if (!team?.idTeam) return { ok: false, teamName, error: 'Team not found on TheSportsDB', source: 'TheSportsDB' };

  const eventsUrl = `https://www.thesportsdb.com/api/v1/json/${SPORTSDB_KEY}/eventslast.php?id=${encodeURIComponent(team.idTeam)}`;
  const events = await fetchJson(eventsUrl);
  if (!events.ok) return { ok: false, teamName, team, error: events.error, source: 'TheSportsDB' };

  const record = deriveRecordFromEvents(events.data?.results || events.data?.events, team.idTeam);
  return {
    ok: true,
    source: 'TheSportsDB',
    team: {
      id: team.idTeam,
      name: team.strTeam,
      country: team.strCountry || null,
      badge: team.strBadge || null,
    },
    record,
    caveat: 'TheSportsDB 免費資料通常只回最近數場，且可能混入友誼賽；重要比賽前請人工校對。',
  };
}

async function fetchPolymarket(home, away) {
  const search = `${home} ${away}`;
  const url = `${POLYMARKET_BASE}/markets?active=true&closed=false&limit=100&search=${encodeURIComponent(search)}`;
  const result = await fetchJson(url);
  if (!result.ok) {
    return { ok: false, source: 'Polymarket Gamma', error: result.error, markets: [] };
  }
  const rawMarkets = Array.isArray(result.data) ? result.data : (result.data?.markets || []);
  const parsed = parsePolymarketMarkets(rawMarkets, home, away);
  return {
    ok: true,
    source: 'Polymarket Gamma',
    query: search,
    best: parsed[0] || null,
    markets: parsed.slice(0, 5),
    rawCount: rawMarkets.length,
    caveat: 'Polymarket 盤名與 outcome 命名不固定；本平台以隊名與 Draw/Tie 做盡力解析。',
  };
}

async function fetchKalshi(home, away) {
  if (!kalshiEnabled()) {
    return {
      ok: false,
      enabled: false,
      source: 'Kalshi',
      error: 'Kalshi disabled: set KALSHI_KEY_ID and KALSHI_PRIVATE_KEY in .env',
      markets: [],
    };
  }

  const search = `${home} ${away}`;
  const pathWithQuery = `/trade-api/v2/markets?limit=50&search=${encodeURIComponent(search)}`;
  const headers = buildKalshiHeaders({
    keyId: process.env.KALSHI_KEY_ID,
    privateKey: process.env.KALSHI_PRIVATE_KEY,
    method: 'GET',
    pathWithQuery,
  });
  const result = await fetchJson(`${KALSHI_BASE}${pathWithQuery}`, { headers });
  if (!result.ok) {
    return { ok: false, enabled: true, source: 'Kalshi', error: result.error, markets: [], status: result.status };
  }

  return {
    ok: true,
    enabled: true,
    source: 'Kalshi',
    query: search,
    markets: parseKalshiMarkets(result.data).slice(0, 10),
    caveat: 'Kalshi 是否有逐場世界盃盤需實測；目前僅回傳市場摘要，尚未自動轉成勝平負。',
  };
}

async function fetchFixtureMarket(home, away) {
  const polymarket = await fetchPolymarket(home, away);
  if (polymarket.best?.probabilities) {
    return {
      ok: true,
      source: 'Polymarket',
      market: polymarket.best,
      polymarket,
      kalshi: null,
    };
  }

  const kalshi = await fetchKalshi(home, away);
  return {
    ok: false,
    source: 'Seed market',
    market: null,
    polymarket,
    kalshi,
    error: polymarket.error || kalshi.error || 'No complete 3-way market parsed',
  };
}

async function handleApi(req, res, url) {
  try {
    if (url.pathname === '/api/health') {
      return jsonResponse(res, 200, {
        ok: true,
        service: 'worldcup-predictor',
        timestamp: new Date().toISOString(),
        kalshiEnabled: kalshiEnabled(),
      });
    }

    if (url.pathname === '/api/team-record') {
      const team = requireParam(url.searchParams, 'team');
      return jsonResponse(res, 200, await fetchTeamRecord(team));
    }

    if (url.pathname === '/api/polymarket') {
      const home = requireParam(url.searchParams, 'home');
      const away = requireParam(url.searchParams, 'away');
      return jsonResponse(res, 200, await fetchPolymarket(home, away));
    }

    if (url.pathname === '/api/kalshi') {
      const home = requireParam(url.searchParams, 'home');
      const away = requireParam(url.searchParams, 'away');
      return jsonResponse(res, 200, await fetchKalshi(home, away));
    }

    if (url.pathname === '/api/fixture-market') {
      const home = requireParam(url.searchParams, 'home');
      const away = requireParam(url.searchParams, 'away');
      return jsonResponse(res, 200, await fetchFixtureMarket(home, away));
    }

    if (url.pathname === '/api/sources') {
      const home = requireParam(url.searchParams, 'home');
      const away = requireParam(url.searchParams, 'away');
      const [homeRecord, awayRecord, polymarket, kalshi] = await Promise.all([
        fetchTeamRecord(home),
        fetchTeamRecord(away),
        fetchPolymarket(home, away),
        fetchKalshi(home, away),
      ]);
      return jsonResponse(res, 200, { ok: true, homeRecord, awayRecord, polymarket, kalshi });
    }

    return jsonResponse(res, 404, { ok: false, error: 'API route not found' });
  } catch (error) {
    return jsonResponse(res, 400, { ok: false, error: error.message });
  }
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
  };
  return types[ext] || 'application/octet-stream';
}

async function serveStatic(req, res, url) {
  const requestedPath = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(PUBLIC_DIR, requestedPath));
  if (!filePath.startsWith(PUBLIC_DIR)) return textResponse(res, 403, 'Forbidden');

  fs.readFile(filePath, (error, data) => {
    if (error) return textResponse(res, 404, 'Not found');
    res.writeHead(200, { 'Content-Type': contentTypeFor(filePath) });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname.startsWith('/api/')) return handleApi(req, res, url);
  return serveStatic(req, res, url);
});

server.listen(PORT, () => {
  console.log(`World Cup predictor running at http://localhost:${PORT}`);
});
