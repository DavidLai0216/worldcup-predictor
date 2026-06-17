'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const DATA_PATH = path.join(__dirname, '..', 'public', 'data', 'fan-portraits.json');
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
const ACCEPTED_TERMS = /\b(female|women|woman|women's)\b/i;
const SPORTS_TERMS = /\b(football|soccer|sport|sports|fan|fans|supporter|supporters|spectator|spectators|match|game|cup|basketball|baseball|volleyball|rugby|tennis|hockey|cricket|olympic)\b/i;

const CURATED_COMMONS_FILES = {
  ALG: { title: 'File:Algerian football clubs seek female fans.jpg', sport: 'football' },
  AUT: { title: 'File:Österreich vs. Deutschland (2026-04-18 WM-Qualifikation Europa Frauen) 07.jpg', sport: 'football' },
  GER: { title: 'File:Österreich vs. Deutschland (2026-04-18 WM-Qualifikation Europa Frauen) 08.jpg', sport: 'football' },
  IRN: { title: 'File:Iranian female football fan.jpg', sport: 'football' },
  JPN: { title: 'File:World cup - japanese girl.jpg', sport: 'football' },
  NED: { title: 'File:Dutch Fans 20190611.jpg', sport: 'football' },
  RSA: { title: 'File:FIFA World Cup Fans 3.jpg', sport: 'football' },
  USA: { title: 'File:Fans painted with Equal Pay and rainbow flags (48675274007).jpg', sport: 'football' },
};

const PLAYER_FALLBACKS = {
  AUS: 'Mathew Ryan',
  BEL: 'Kevin De Bruyne',
  BIH: 'Edin Džeko',
  BRA: 'Vinícius Júnior',
  CAN: 'Alphonso Davies',
  CIV: 'Franck Kessié',
  COD: 'Chancel Mbemba',
  COL: 'Luis Díaz (footballer, born 1997)',
  CPV: 'Ryan Mendes',
  CRO: 'Luka Modrić',
  CUW: 'Leandro Bacuna',
  CZE: 'Patrik Schick',
  ECU: 'Moisés Caicedo',
  EGY: 'Mohamed Salah',
  ENG: 'Jude Bellingham',
  ESP: 'Lamine Yamal',
  FRA: 'Kylian Mbappé',
  GHA: 'Mohammed Kudus',
  HAI: 'Duckens Nazon',
  IRQ: 'Aymen Hussein',
  JOR: 'Mousa Al-Tamari',
  KOR: 'Son Heung-min',
  KSA: 'Salem Al-Dawsari',
  MAR: 'Achraf Hakimi',
  MEX: 'Santiago Giménez',
  ARG: 'Lionel Messi',
  NOR: 'Erling Haaland',
  NZL: 'Chris Wood (footballer, born 1991)',
  PAN: 'Adalberto Carrasquilla',
  PAR: 'Miguel Almirón',
  POR: 'Cristiano Ronaldo',
  QAT: 'Akram Afif',
  SCO: 'Scott McTominay',
  SEN: 'Sadio Mané',
  SUI: 'Granit Xhaka',
  SWE: 'Alexander Isak',
  TUN: 'Hannibal Mejbri',
  TUR: 'Hakan Çalhanoğlu',
  URU: 'Federico Valverde',
  UZB: 'Eldor Shomurodov',
};

function isImageUrl(url) {
  return /\.(jpe?g|png|webp)(\?|$)/i.test(url || '');
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function searchQueries(entry) {
  const country = (entry.searchQuery || '').replace(/\s+adult woman football.*$/i, '').trim() || entry.team;
  return [
    entry.searchQuery,
    `${country} adult woman football fan`,
    `${country} women football supporters`,
    `${country} adult woman sports fan`,
    `${country} women sports fans`,
    `${country} female sports supporters`,
    `${country} women sports spectators`,
  ].filter(Boolean);
}

async function findCommonsImage(queries) {
  for (const query of queries) {
    const result = await findCommonsImageForQuery(query);
    if (result) return result;
    await sleep(250);
  }
  return null;
}

async function findCommonsImageForQuery(query) {
  const url = new URL(COMMONS_API);
  url.searchParams.set('action', 'query');
  url.searchParams.set('format', 'json');
  url.searchParams.set('origin', '*');
  url.searchParams.set('generator', 'search');
  url.searchParams.set('gsrnamespace', '6');
  url.searchParams.set('gsrlimit', '8');
  url.searchParams.set('gsrsearch', query);
  url.searchParams.set('prop', 'imageinfo');
  url.searchParams.set('iiprop', 'url|extmetadata');

  const response = await fetch(url, { headers: { 'User-Agent': 'worldcup-predictor/0.1' } });
  if (!response.ok) return null;
  const payload = await response.json();
  const pages = Object.values(payload.query?.pages || {});
  const page = pages.find((item) => {
    const info = item.imageinfo?.[0];
    const haystack = `${item.title} ${info?.extmetadata?.ImageDescription?.value || ''}`;
    return isImageUrl(info?.url) && ACCEPTED_TERMS.test(haystack) && SPORTS_TERMS.test(haystack);
  });
  if (!page) return null;
  return commonsResult(page);
}

function commonsResult(page) {
  const info = page.imageinfo?.[0] || {};
  return {
    kind: 'real',
    source: 'Wikimedia Commons',
    sourceUrl: `https://commons.wikimedia.org/wiki/${page.title.replaceAll(' ', '_')}`,
    imageUrl: info.url,
    description: (info.extmetadata?.ImageDescription?.value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || null,
    license: info.extmetadata?.LicenseShortName?.value || null,
    sport: /football|soccer|fifa/i.test(`${page.title} ${info.extmetadata?.ImageDescription?.value || ''}`) ? 'football' : 'sports',
  };
}

async function getCommonsFile(title) {
  const url = new URL(COMMONS_API);
  url.searchParams.set('action', 'query');
  url.searchParams.set('format', 'json');
  url.searchParams.set('origin', '*');
  url.searchParams.set('titles', title);
  url.searchParams.set('prop', 'imageinfo');
  url.searchParams.set('iiprop', 'url|extmetadata');

  const response = await fetch(url, { headers: { 'User-Agent': 'worldcup-predictor/0.1' } });
  if (!response.ok) return null;
  const payload = await response.json();
  const page = Object.values(payload.query?.pages || {})[0];
  if (!page || !isImageUrl(page.imageinfo?.[0]?.url)) return null;
  return commonsResult(page);
}

async function getPlayerFallback(code) {
  const playerName = PLAYER_FALLBACKS[code];
  if (!playerName) return null;
  const url = new URL(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(playerName.replaceAll(' ', '_'))}`);
  const response = await fetch(url, { headers: { 'User-Agent': 'worldcup-predictor/0.1' } });
  if (!response.ok) return null;
  const payload = await response.json();
  const imageUrl = payload.originalimage?.source || payload.thumbnail?.source;
  if (!isImageUrl(imageUrl)) return null;
  return {
    kind: 'player',
    source: 'Wikimedia projects',
    sourceUrl: payload.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(playerName.replaceAll(' ', '_'))}`,
    imageUrl,
    playerName: payload.title || playerName,
    description: payload.description || payload.extract || `${playerName} footballer`,
    license: null,
    sport: 'football',
  };
}

async function main() {
  const data = JSON.parse(await fs.readFile(DATA_PATH, 'utf8'));
  let updated = 0;

  for (const [code, entry] of Object.entries(data.teams || {})) {
    const curated = CURATED_COMMONS_FILES[code];
    let result = curated
      ? await getCommonsFile(curated.title)
      : null;
    if (!result) result = await getPlayerFallback(code);
    if (!result) continue;
    data.teams[code] = {
      ...entry,
      ...result,
      sport: curated?.sport || result.sport,
    };
    updated += 1;
    await sleep(800);
  }

  if (updated > 0) {
    data.updatedAt = new Date().toISOString();
    await fs.writeFile(DATA_PATH, `${JSON.stringify(data, null, 2)}\n`);
  }
  console.log(`Updated fan portraits: ${updated}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
