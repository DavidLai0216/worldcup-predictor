'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const SOURCE_URL = 'https://blob3rd.sportslottery.com.tw/apidata/Pre/WC-Games.zh.json';
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'data', 'taiwan-odds.json');

async function main() {
  const response = await fetch(SOURCE_URL, { headers: { 'User-Agent': 'worldcup-predictor/0.1' } });
  if (!response.ok) throw new Error(`Taiwan Sports Lottery HTTP ${response.status}`);
  const games = await response.json();
  if (!Array.isArray(games)) throw new Error('Taiwan Sports Lottery payload is not an array');

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify({
    source: '台灣運彩',
    sourceUrl: SOURCE_URL,
    updatedAt: new Date().toISOString(),
    games,
  }, null, 2)}\n`);
  console.log(`Updated ${OUTPUT_PATH} with ${games.length} games`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
