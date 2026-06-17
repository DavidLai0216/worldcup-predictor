'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const SOURCE_URL = 'https://blob3rd.sportslottery.com.tw/apidata/Pre/WC-Games.zh.json';
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'data', 'taiwan-odds.json');

async function main() {
  const response = await fetch(SOURCE_URL, {
    headers: {
      Accept: 'application/json,text/plain,*/*',
      Origin: 'https://www.sportslottery.com.tw',
      Referer: 'https://www.sportslottery.com.tw/',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
    },
  });
  if (!response.ok) {
    try {
      await fs.access(OUTPUT_PATH);
      console.warn(`Taiwan Sports Lottery HTTP ${response.status}; keeping existing odds snapshot.`);
      return;
    } catch (_error) {
      throw new Error(`Taiwan Sports Lottery HTTP ${response.status}`);
    }
  }
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
