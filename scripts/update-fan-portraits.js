'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const DATA_PATH = path.join(__dirname, '..', 'public', 'data', 'fan-portraits.json');
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
const ACCEPTED_TERMS = /\b(female|women|woman|women's)\b/i;

const CURATED_COMMONS_FILES = {
  ALG: 'File:Algerian football clubs seek female fans.jpg',
  AUT: 'File:Österreich vs. Deutschland (2026-04-18 WM-Qualifikation Europa Frauen) 07.jpg',
  GER: 'File:Österreich vs. Deutschland (2026-04-18 WM-Qualifikation Europa Frauen) 08.jpg',
  IRN: 'File:Iranian female football fan.jpg',
  NED: 'File:Dutch Fans 20190611.jpg',
  USA: 'File:Fans painted with Equal Pay and rainbow flags (48675274007).jpg',
};

function isImageUrl(url) {
  return /\.(jpe?g|png|webp)(\?|$)/i.test(url || '');
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function findCommonsImage(query) {
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
    return isImageUrl(info?.url) && ACCEPTED_TERMS.test(haystack);
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

async function main() {
  const data = JSON.parse(await fs.readFile(DATA_PATH, 'utf8'));
  let updated = 0;

  for (const [code, entry] of Object.entries(data.teams || {})) {
    const result = CURATED_COMMONS_FILES[code]
      ? await getCommonsFile(CURATED_COMMONS_FILES[code])
      : await findCommonsImage(entry.searchQuery);
    if (!result) continue;
    data.teams[code] = {
      ...entry,
      ...result,
    };
    updated += 1;
    await sleep(250);
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
