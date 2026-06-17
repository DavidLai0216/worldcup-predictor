'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const DATA_PATH = path.join(__dirname, '..', 'public', 'data', 'fan-portraits.json');
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';

function isImageUrl(url) {
  return /\.(jpe?g|png|webp)(\?|$)/i.test(url || '');
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
  const page = pages.find((item) => isImageUrl(item.imageinfo?.[0]?.url));
  if (!page) return null;
  return {
    source: 'Wikimedia Commons',
    sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title.replaceAll(' ', '_'))}`,
    imageUrl: page.imageinfo[0].url,
  };
}

async function main() {
  const data = JSON.parse(await fs.readFile(DATA_PATH, 'utf8'));
  let updated = 0;

  for (const [code, entry] of Object.entries(data.teams || {})) {
    const result = await findCommonsImage(entry.searchQuery);
    if (!result) continue;
    data.teams[code] = {
      ...entry,
      ...result,
    };
    updated += 1;
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
