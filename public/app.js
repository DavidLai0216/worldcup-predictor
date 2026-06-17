const $ = (id) => document.getElementById(id);

const TEAM = {
  MEX: { name: '墨西哥', flag: '🇲🇽' },
  RSA: { name: '南非', flag: '🇿🇦' },
  KOR: { name: '韓國', flag: '🇰🇷' },
  CZE: { name: '捷克', flag: '🇨🇿' },
  CAN: { name: '加拿大', flag: '🇨🇦' },
  BIH: { name: '波士尼亞與赫塞哥維納', flag: '🇧🇦' },
  QAT: { name: '卡達', flag: '🇶🇦' },
  SUI: { name: '瑞士', flag: '🇨🇭' },
  BRA: { name: '巴西', flag: '🇧🇷' },
  MAR: { name: '摩洛哥', flag: '🇲🇦' },
  SCO: { name: '蘇格蘭', flag: '🏴' },
  HAI: { name: '海地', flag: '🇭🇹' },
  USA: { name: '美國', flag: '🇺🇸' },
  PAR: { name: '巴拉圭', flag: '🇵🇾' },
  AUS: { name: '澳洲', flag: '🇦🇺' },
  TUR: { name: '土耳其', flag: '🇹🇷' },
  GER: { name: '德國', flag: '🇩🇪' },
  CUW: { name: '庫拉索', flag: '🇨🇼' },
  CIV: { name: '象牙海岸', flag: '🇨🇮' },
  ECU: { name: '厄瓜多', flag: '🇪🇨' },
  NED: { name: '荷蘭', flag: '🇳🇱' },
  JPN: { name: '日本', flag: '🇯🇵' },
  SWE: { name: '瑞典', flag: '🇸🇪' },
  TUN: { name: '突尼西亞', flag: '🇹🇳' },
  BEL: { name: '比利時', flag: '🇧🇪' },
  EGY: { name: '埃及', flag: '🇪🇬' },
  IRN: { name: '伊朗', flag: '🇮🇷' },
  NZL: { name: '紐西蘭', flag: '🇳🇿' },
  ESP: { name: '西班牙', flag: '🇪🇸' },
  CPV: { name: '維德角', flag: '🇨🇻' },
  KSA: { name: '沙烏地阿拉伯', flag: '🇸🇦' },
  URU: { name: '烏拉圭', flag: '🇺🇾' },
  FRA: { name: '法國', flag: '🇫🇷' },
  SEN: { name: '塞內加爾', flag: '🇸🇳' },
  IRQ: { name: '伊拉克', flag: '🇮🇶' },
  NOR: { name: '挪威', flag: '🇳🇴' },
  ARG: { name: '阿根廷', flag: '🇦🇷' },
  ALG: { name: '阿爾及利亞', flag: '🇩🇿' },
  AUT: { name: '奧地利', flag: '🇦🇹' },
  JOR: { name: '約旦', flag: '🇯🇴' },
  POR: { name: '葡萄牙', flag: '🇵🇹' },
  COD: { name: '剛果民主共和國', flag: '🇨🇩' },
  UZB: { name: '烏茲別克', flag: '🇺🇿' },
  COL: { name: '哥倫比亞', flag: '🇨🇴' },
  ENG: { name: '英格蘭', flag: '🏴' },
  CRO: { name: '克羅埃西亞', flag: '🇭🇷' },
  GHA: { name: '迦納', flag: '🇬🇭' },
  PAN: { name: '巴拿馬', flag: '🇵🇦' },
};

const GROUPS = [
  {
    id: 'A',
    name: 'A 組',
    standings: [
      ['MEX', 1, 1, 0, 0, 2, 0, 2, 3],
      ['KOR', 1, 1, 0, 0, 2, 1, 1, 3],
      ['CZE', 1, 0, 0, 1, 1, 2, -1, 0],
      ['RSA', 1, 0, 0, 1, 0, 2, -2, 0],
    ],
    fixtures: [
      ['2026-06-11', '墨西哥城', 'MEX', 'RSA', '完賽', 2, 0, [['MEX', '9', '朱利安・奎尼奧內斯'], ['MEX', '67', '勞爾・希門尼斯']]],
      ['2026-06-11', '瓜達拉哈拉', 'KOR', 'CZE', '完賽', 2, 1, [['CZE', '59', '拉迪斯拉夫・克雷伊奇'], ['KOR', '67', '黃仁範'], ['KOR', '80', '吳賢揆']]],
      ['2026-06-18 12:00', '亞特蘭大', 'CZE', 'RSA'],
      ['2026-06-18 21:00', '墨西哥城', 'MEX', 'KOR'],
      ['2026-06-24 21:00', '墨西哥城', 'CZE', 'MEX'],
      ['2026-06-24 21:00', '瓜達拉哈拉', 'RSA', 'KOR'],
    ],
  },
  {
    id: 'B',
    name: 'B 組',
    standings: [
      ['CAN', 1, 0, 1, 0, 1, 1, 0, 1],
      ['BIH', 1, 0, 1, 0, 1, 1, 0, 1],
      ['QAT', 1, 0, 1, 0, 1, 1, 0, 1],
      ['SUI', 1, 0, 1, 0, 1, 1, 0, 1],
    ],
    fixtures: [
      ['2026-06-12', '多倫多', 'CAN', 'BIH', '完賽', 1, 1, [['BIH', '21', '約沃・盧基奇'], ['CAN', '78', '塞爾・拉林']]],
      ['2026-06-13', '舊金山灣區', 'QAT', 'SUI', '完賽', 1, 1, [['SUI', '17', '布雷爾・恩博洛（十二碼）'], ['QAT', '90+4', '米羅・穆海姆烏龍球／布阿萊姆・胡希頭球製造']]],
      ['2026-06-18 15:00', '舊金山灣區', 'SUI', 'BIH'],
      ['2026-06-18 18:00', '多倫多', 'CAN', 'QAT'],
      ['2026-06-24 15:00', '溫哥華', 'SUI', 'CAN'],
      ['2026-06-24 15:00', '西雅圖', 'BIH', 'QAT'],
    ],
  },
  {
    id: 'C',
    name: 'C 組',
    standings: [
      ['SCO', 1, 1, 0, 0, 1, 0, 1, 3],
      ['MAR', 1, 0, 1, 0, 1, 1, 0, 1],
      ['BRA', 1, 0, 1, 0, 1, 1, 0, 1],
      ['HAI', 1, 0, 0, 1, 0, 1, -1, 0],
    ],
    fixtures: [
      ['2026-06-13', '費城', 'BRA', 'MAR', '完賽', 1, 1, [['MAR', '21', '伊斯梅爾・塞巴里'], ['BRA', '32', '維尼修斯・儒尼奧爾']]],
      ['2026-06-13', '波士頓', 'SCO', 'HAI', '完賽', 1, 0, [['SCO', '28', '約翰・麥金']]],
      ['2026-06-19 18:00', '波士頓', 'SCO', 'MAR'],
      ['2026-06-19 21:00', '邁阿密', 'BRA', 'HAI'],
      ['2026-06-24 18:00', '邁阿密', 'SCO', 'BRA'],
      ['2026-06-24 18:00', '費城', 'MAR', 'HAI'],
    ],
  },
  {
    id: 'D',
    name: 'D 組',
    standings: [
      ['USA', 1, 1, 0, 0, 4, 1, 3, 3],
      ['AUS', 1, 1, 0, 0, 2, 0, 2, 3],
      ['TUR', 1, 0, 0, 1, 0, 2, -2, 0],
      ['PAR', 1, 0, 0, 1, 1, 4, -3, 0],
    ],
    fixtures: [
      ['2026-06-12', '洛杉磯', 'USA', 'PAR', '完賽', 4, 1, [['USA', '7', '達米安・博巴迪利亞烏龍球'], ['USA', '31', '佛拉林・巴洛根'], ['USA', '45+5', '佛拉林・巴洛根'], ['PAR', '73', '毛里西奧'], ['USA', '90+8', '喬瓦尼・雷納']]],
      ['2026-06-13', '溫哥華', 'AUS', 'TUR', '完賽', 2, 0, [['AUS', '27', '內斯托里・伊蘭昆達'], ['AUS', '75', '康納・梅特卡夫']]],
      ['2026-06-19 15:00', '西雅圖', 'USA', 'AUS'],
      ['2026-06-19 24:00', '堪薩斯城', 'TUR', 'PAR'],
      ['2026-06-25 22:00', '洛杉磯', 'TUR', 'USA'],
      ['2026-06-25 22:00', '溫哥華', 'PAR', 'AUS'],
    ],
  },
  {
    id: 'E',
    name: 'E 組',
    standings: [
      ['GER', 1, 1, 0, 0, 7, 1, 6, 3],
      ['CIV', 1, 1, 0, 0, 1, 0, 1, 3],
      ['ECU', 1, 0, 0, 1, 0, 1, -1, 0],
      ['CUW', 1, 0, 0, 1, 1, 7, -6, 0],
    ],
    fixtures: [
      ['2026-06-14', '休士頓', 'GER', 'CUW', '完賽', 7, 1, [['GER', '6', '菲利克斯・恩梅查'], ['CUW', '21', '利瓦諾・科門恩西亞'], ['GER', '38', '尼科・施洛特貝克'], ['GER', '45+5', '凱・哈弗茨（十二碼）'], ['GER', '47', '賈馬爾・穆西亞拉'], ['GER', '68', '納撒尼爾・布朗'], ['GER', '78', '德尼茲・翁達夫'], ['GER', '88', '凱・哈弗茨']]],
      ['2026-06-14', '費城', 'CIV', 'ECU', '完賽', 1, 0, [['CIV', '90', '阿瑪德・迪亞洛']]],
      ['2026-06-20 16:00', '堪薩斯城', 'GER', 'CIV'],
      ['2026-06-20 20:00', '邁阿密', 'ECU', 'CUW'],
      ['2026-06-25 16:00', '紐約/紐澤西', 'ECU', 'GER'],
      ['2026-06-25 16:00', '休士頓', 'CUW', 'CIV'],
    ],
  },
  {
    id: 'F',
    name: 'F 組',
    standings: [
      ['SWE', 1, 1, 0, 0, 5, 1, 4, 3],
      ['JPN', 1, 0, 1, 0, 2, 2, 0, 1],
      ['NED', 1, 0, 1, 0, 2, 2, 0, 1],
      ['TUN', 1, 0, 0, 1, 1, 5, -4, 0],
    ],
    fixtures: [
      ['2026-06-14', '達拉斯', 'NED', 'JPN', '完賽', 2, 2, [['NED', '51', '維吉爾・范戴克'], ['JPN', '57', '中村敬斗'], ['NED', '64', '克里森西奧・薩默維爾'], ['JPN', '89', '鎌田大地']]],
      ['2026-06-14', '西雅圖', 'SWE', 'TUN', '完賽', 5, 1, [['SWE', '7', '亞辛・阿亞里'], ['SWE', '30', '亞歷山大・伊薩克'], ['TUN', '43', '卡里姆・雷基克'], ['SWE', '60', '維克托・哲凱賴什'], ['SWE', '86', '馬蒂亞斯・斯萬貝里'], ['SWE', '90+6', '亞辛・阿亞里']]],
      ['2026-06-20 13:00', '休士頓', 'NED', 'SWE'],
      ['2026-06-20 24:00', '西雅圖', 'TUN', 'JPN'],
      ['2026-06-25 19:00', '達拉斯', 'JPN', 'SWE'],
      ['2026-06-25 19:00', '舊金山灣區', 'TUN', 'NED'],
    ],
  },
  {
    id: 'G',
    name: 'G 組',
    standings: [
      ['NZL', 1, 0, 1, 0, 2, 2, 0, 1],
      ['IRN', 1, 0, 1, 0, 2, 2, 0, 1],
      ['EGY', 1, 0, 1, 0, 1, 1, 0, 1],
      ['BEL', 1, 0, 1, 0, 1, 1, 0, 1],
    ],
    fixtures: [
      ['2026-06-15', '紐約/紐澤西', 'BEL', 'EGY', '完賽', 1, 1, [['EGY', '20', '埃馬姆・阿舒爾'], ['BEL', '66', '穆罕默德・哈尼烏龍球']]],
      ['2026-06-15', '多倫多', 'IRN', 'NZL', '完賽', 2, 2, [['NZL', '7', '伊萊賈・賈斯特'], ['IRN', '33', '拉明・雷扎伊安'], ['NZL', '54', '伊萊賈・賈斯特'], ['IRN', '64', '穆罕默德・莫赫比']]],
      ['2026-06-21 15:00', '洛杉磯', 'BEL', 'IRN'],
      ['2026-06-21 21:00', '多倫多', 'NZL', 'EGY'],
      ['2026-06-26 23:00', '西雅圖', 'EGY', 'IRN'],
      ['2026-06-26 23:00', '溫哥華', 'NZL', 'BEL'],
    ],
  },
  {
    id: 'H',
    name: 'H 組',
    standings: [
      ['KSA', 1, 0, 1, 0, 1, 1, 0, 1],
      ['URU', 1, 0, 1, 0, 1, 1, 0, 1],
      ['ESP', 1, 0, 1, 0, 0, 0, 0, 1],
      ['CPV', 1, 0, 1, 0, 0, 0, 0, 1],
    ],
    fixtures: [
      ['2026-06-15', '亞特蘭大', 'ESP', 'CPV', '完賽', 0, 0, []],
      ['2026-06-15', '邁阿密', 'KSA', 'URU', '完賽', 1, 1, [['KSA', '41', '阿卜杜勒拉・阿姆里'], ['URU', '80', '馬克西米利亞諾・阿勞霍']]],
      ['2026-06-21 12:00', '亞特蘭大', 'ESP', 'KSA'],
      ['2026-06-21 18:00', '邁阿密', 'URU', 'CPV'],
      ['2026-06-26 20:00', '休士頓', 'CPV', 'KSA'],
      ['2026-06-26 20:00', '堪薩斯城', 'URU', 'ESP'],
    ],
  },
  {
    id: 'I',
    name: 'I 組',
    standings: [
      ['NOR', 1, 1, 0, 0, 4, 1, 3, 3],
      ['FRA', 1, 1, 0, 0, 3, 1, 2, 3],
      ['SEN', 1, 0, 0, 1, 1, 3, -2, 0],
      ['IRQ', 1, 0, 0, 1, 1, 4, -3, 0],
    ],
    fixtures: [
      ['2026-06-16', '紐約/紐澤西', 'FRA', 'SEN', '完賽', 3, 1, [['FRA', '66', '基利安・姆巴佩'], ['FRA', '82', '布拉德利・巴爾科拉'], ['SEN', '90+5', '易卜拉欣・姆巴耶'], ['FRA', '90+6', '基利安・姆巴佩']]],
      ['2026-06-16', '波士頓', 'IRQ', 'NOR', '完賽', 1, 4, [['NOR', '29', '厄林・哈蘭德'], ['IRQ', '39', '艾曼・海珊'], ['NOR', '43', '厄林・哈蘭德'], ['NOR', '76', '萊奧・厄斯蒂高'], ['NOR', '90+6', '伊拉克烏龍球']]],
      ['2026-06-22 17:00', '費城', 'FRA', 'IRQ'],
      ['2026-06-22 20:00', '達拉斯', 'NOR', 'SEN'],
      ['2026-06-26 15:00', '波士頓', 'NOR', 'FRA'],
      ['2026-06-26 15:00', '多倫多', 'SEN', 'IRQ'],
    ],
  },
  {
    id: 'J',
    name: 'J 組',
    standings: [
      ['ARG', 0, 0, 0, 0, 0, 0, 0, 0],
      ['AUT', 0, 0, 0, 0, 0, 0, 0, 0],
      ['ALG', 0, 0, 0, 0, 0, 0, 0, 0],
      ['JOR', 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    fixtures: [
      ['2026-06-17 01:00', '堪薩斯城', 'ARG', 'ALG', '進行中'],
      ['2026-06-17 04:00', '印第安納波利斯', 'AUT', 'JOR'],
      ['2026-06-22 13:00', '達拉斯', 'ARG', 'AUT'],
      ['2026-06-22 23:00', '堪薩斯城', 'JOR', 'ALG'],
      ['2026-06-27 22:00', '印第安納波利斯', 'ALG', 'AUT'],
      ['2026-06-27 22:00', '達拉斯', 'JOR', 'ARG'],
    ],
  },
  {
    id: 'K',
    name: 'K 組',
    standings: [
      ['POR', 0, 0, 0, 0, 0, 0, 0, 0],
      ['COL', 0, 0, 0, 0, 0, 0, 0, 0],
      ['COD', 0, 0, 0, 0, 0, 0, 0, 0],
      ['UZB', 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    fixtures: [
      ['2026-06-17 13:00', '休士頓', 'POR', 'COD'],
      ['2026-06-17 22:00', '蒙特雷', 'UZB', 'COL'],
      ['2026-06-23 13:00', '休士頓', 'POR', 'UZB'],
      ['2026-06-23 22:00', '邁阿密', 'COL', 'COD'],
      ['2026-06-27 19:30', '邁阿密', 'COL', 'POR'],
      ['2026-06-27 19:30', '蒙特雷', 'COD', 'UZB'],
    ],
  },
  {
    id: 'L',
    name: 'L 組',
    standings: [
      ['ENG', 0, 0, 0, 0, 0, 0, 0, 0],
      ['CRO', 0, 0, 0, 0, 0, 0, 0, 0],
      ['GHA', 0, 0, 0, 0, 0, 0, 0, 0],
      ['PAN', 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    fixtures: [
      ['2026-06-17 16:00', '達拉斯', 'ENG', 'CRO'],
      ['2026-06-17 19:00', '多倫多', 'GHA', 'PAN'],
      ['2026-06-23 16:00', '紐約/紐澤西', 'ENG', 'GHA'],
      ['2026-06-23 19:00', '多倫多', 'PAN', 'CRO'],
      ['2026-06-27 17:00', '達拉斯', 'PAN', 'ENG'],
      ['2026-06-27 17:00', '費城', 'CRO', 'GHA'],
    ],
  },
];

const KNOCKOUT_TABS = [
  { id: 'r32', label: '32 強', slots: 16 },
  { id: 'r16', label: '16 強', slots: 8 },
  { id: 'qf', label: '8 強', slots: 4 },
  { id: 'sf', label: '4 強', slots: 2 },
  { id: 'third', label: '季軍戰', slots: 1 },
  { id: 'final', label: '決賽', slots: 1 },
];

const state = { activeTab: 'groups' };

function team(code) {
  return TEAM[code] || { name: code, flag: '🏳️' };
}

function teamLabel(code) {
  const t = team(code);
  return `<span class="flag" aria-hidden="true">${t.flag}</span><span>${t.name}</span>`;
}

function pct(value) {
  return `${(value * 100).toFixed(1)}%`;
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

function buildScoreMatrix(lambdaHome, lambdaAway, maxGoals = 7) {
  const cells = [];
  for (let h = 0; h <= maxGoals; h += 1) {
    for (let a = 0; a <= maxGoals; a += 1) {
      cells.push({ homeGoals: h, awayGoals: a, probability: poissonProbability(h, lambdaHome) * poissonProbability(a, lambdaAway) });
    }
  }
  const total = cells.reduce((sum, cell) => sum + cell.probability, 0);
  return cells.map((cell) => ({ ...cell, probability: cell.probability / total }));
}

function teamStrength(code) {
  const all = GROUPS.flatMap((group) => group.standings);
  const row = all.find(([teamCode]) => teamCode === code);
  if (!row) return { gf: 1.2, ga: 1.2 };
  const [, played, wins, draws, losses, gf, ga] = row;
  if (!played) return { gf: 1.25, ga: 1.25 };
  return {
    gf: clamp(gf / played + wins * 0.15 + draws * 0.05, 0.6, 2.8),
    ga: clamp(ga / played + losses * 0.12, 0.5, 2.8),
  };
}

function estimateRawLambdas(homeCode, awayCode) {
  const home = teamStrength(homeCode);
  const away = teamStrength(awayCode);
  return {
    lambdaHome: clamp(1.18 * home.gf * away.ga, 0.25, 4.2),
    lambdaAway: clamp(1.08 * away.gf * home.ga, 0.25, 4.2),
  };
}

function completedFixtures() {
  return GROUPS.flatMap((group) => group.fixtures.map((item) => normalizeFixture(item, group)))
    .filter((fixture) => fixture.status === '完賽' && Number.isFinite(fixture.homeScore) && Number.isFinite(fixture.awayScore));
}

function fitGoalFactor(samples, predictedKey, actualKey) {
  const numerator = samples.reduce((sum, sample) => sum + sample[predictedKey] * sample[actualKey], 0);
  const denominator = samples.reduce((sum, sample) => sum + sample[predictedKey] * sample[predictedKey], 0);
  if (denominator <= 0) return 1;
  return clamp(numerator / denominator, 0.65, 1.45);
}

function meanAbsoluteError(samples, homeFactor = 1, awayFactor = 1) {
  if (!samples.length) return null;
  const total = samples.reduce((sum, sample) => {
    const homeError = Math.abs(sample.predictedHome * homeFactor - sample.actualHome);
    const awayError = Math.abs(sample.predictedAway * awayFactor - sample.actualAway);
    return sum + homeError + awayError;
  }, 0);
  return total / (samples.length * 2);
}

function buildRegressionModel() {
  const samples = completedFixtures().map((fixture) => {
    const raw = estimateRawLambdas(fixture.home, fixture.away);
    return {
      fixture,
      predictedHome: raw.lambdaHome,
      predictedAway: raw.lambdaAway,
      actualHome: fixture.homeScore,
      actualAway: fixture.awayScore,
    };
  });

  if (!samples.length) {
    return {
      sampleCount: 0,
      credibility: 0,
      homeFactor: 1,
      awayFactor: 1,
      totalFactor: 1,
      maeBefore: null,
      maeAfter: null,
    };
  }

  const fittedHomeFactor = fitGoalFactor(samples, 'predictedHome', 'actualHome');
  const fittedAwayFactor = fitGoalFactor(samples, 'predictedAway', 'actualAway');
  const predictedTotal = samples.reduce((sum, sample) => sum + sample.predictedHome + sample.predictedAway, 0);
  const actualTotal = samples.reduce((sum, sample) => sum + sample.actualHome + sample.actualAway, 0);
  const fittedTotalFactor = predictedTotal > 0 ? clamp(actualTotal / predictedTotal, 0.65, 1.45) : 1;
  const credibility = clamp(samples.length / 24, 0, 1);
  const homeFactor = 1 + (fittedHomeFactor - 1) * credibility;
  const awayFactor = 1 + (fittedAwayFactor - 1) * credibility;
  const totalFactor = 1 + (fittedTotalFactor - 1) * credibility;

  return {
    sampleCount: samples.length,
    credibility,
    homeFactor,
    awayFactor,
    totalFactor,
    maeBefore: meanAbsoluteError(samples),
    maeAfter: meanAbsoluteError(samples, homeFactor * totalFactor, awayFactor * totalFactor),
  };
}

const regressionModel = buildRegressionModel();

function applyRegressionCalibration(raw) {
  const lambdaHome = clamp(raw.lambdaHome * regressionModel.homeFactor * regressionModel.totalFactor, 0.15, 4.8);
  const lambdaAway = clamp(raw.lambdaAway * regressionModel.awayFactor * regressionModel.totalFactor, 0.15, 4.8);
  return { lambdaHome, lambdaAway };
}

function predictMatch(homeCode, awayCode) {
  const raw = estimateRawLambdas(homeCode, awayCode);
  const { lambdaHome, lambdaAway } = applyRegressionCalibration(raw);
  const matrix = buildScoreMatrix(lambdaHome, lambdaAway);
  const outcome = matrix.reduce((totals, cell) => {
    if (cell.homeGoals > cell.awayGoals) totals.home += cell.probability;
    else if (cell.homeGoals < cell.awayGoals) totals.away += cell.probability;
    else totals.draw += cell.probability;
    return totals;
  }, { home: 0, draw: 0, away: 0 });
  const scores = matrix
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 10);
  return { scores, outcome, lambdaHome, lambdaAway, rawLambdaHome: raw.lambdaHome, rawLambdaAway: raw.lambdaAway };
}

function renderTabs() {
  const tabs = [{ id: 'groups', label: '第一輪' }, ...KNOCKOUT_TABS];
  $('tabs').innerHTML = tabs.map((tab) => `
    <button class="tab ${state.activeTab === tab.id ? 'active' : ''} ${tab.id === 'groups' ? '' : 'muted-tab'}" data-tab="${tab.id}">
      ${tab.label}
    </button>
  `).join('');
}

function renderStandingTable(group) {
  return `
    <table class="standings-table">
      <thead><tr><th>隊伍</th><th>賽</th><th>勝</th><th>平</th><th>負</th><th>進</th><th>失</th><th>淨</th><th>積分</th></tr></thead>
      <tbody>
        ${group.standings.map(([code, played, wins, draws, losses, gf, ga, gd, points]) => `
          <tr>
            <td class="team-cell">${teamLabel(code)}</td>
            <td>${played}</td><td>${wins}</td><td>${draws}</td><td>${losses}</td><td>${gf}</td><td>${ga}</td><td>${gd > 0 ? `+${gd}` : gd}</td><td><strong>${points}</strong></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function normalizeFixture(item, group) {
  const [date, venue, home, away, status = '未賽', homeScore = null, awayScore = null, events = []] = item;
  return { id: `${group.id}-${home}-${away}`.toLowerCase(), group: group.name, date, venue, home, away, status, homeScore, awayScore, events };
}

function renderSummary(fixture) {
  if (fixture.status !== '完賽') return '';
  const rows = fixture.events.length
    ? fixture.events.map(([code, minute, scorer]) => `<li><strong>${minute}'</strong> ${teamLabel(code)} ${scorer}</li>`).join('')
    : '<li>本場 0-0，沒有進球。</li>';
  return `
    <a class="summary-link" href="#${fixture.id}">比賽摘要</a>
    <div class="match-detail" id="${fixture.id}">
      <h4>${team(fixture.home).name} ${fixture.homeScore}-${fixture.awayScore} ${team(fixture.away).name}</h4>
      <ul>${rows}</ul>
    </div>
  `;
}

function renderPrediction(fixture) {
  if (fixture.status === '完賽') return `<div class="scoreline">${fixture.homeScore}-${fixture.awayScore}</div><p class="small-text">已完賽</p>`;
  if (fixture.status === '進行中') return '<div class="scoreline live-text">進行中</div><p class="small-text">等待完賽後更新摘要</p>';
  const prediction = predictMatch(fixture.home, fixture.away);
  const best = prediction.scores[0];
  return `
    <div class="prediction-summary">
      <div>
        <p class="label">最可能比分</p>
        <strong>${best.homeGoals}-${best.awayGoals}</strong>
        <small>${pct(best.probability)}</small>
      </div>
      <div class="outcome-grid">
        <span><b>${pct(prediction.outcome.home)}</b><small>${team(fixture.home).name}勝</small></span>
        <span><b>${pct(prediction.outcome.draw)}</b><small>平手</small></span>
        <span><b>${pct(prediction.outcome.away)}</b><small>${team(fixture.away).name}勝</small></span>
      </div>
    </div>
    <p class="small-text">Top 10 比分候選</p>
    <div class="prediction-list">
      ${prediction.scores.map((score, index) => `<span class="${index === 0 ? 'best-pick' : ''}">${score.homeGoals}-${score.awayGoals} <b>${pct(score.probability)}</b></span>`).join('')}
    </div>
    <p class="small-text">模型預測｜校正後 λ：${prediction.lambdaHome.toFixed(2)} / ${prediction.lambdaAway.toFixed(2)}｜原始 λ：${prediction.rawLambdaHome.toFixed(2)} / ${prediction.rawLambdaAway.toFixed(2)}</p>
  `;
}

function renderFixtureCard(fixture) {
  return `
    <article class="fixture-card">
      <div class="fixture-card__top">
        <div>
          <p class="eyebrow">${fixture.group}｜${fixture.date}</p>
          <h3><span class="team-name">${teamLabel(fixture.home)}</span><em>對</em><span class="team-name">${teamLabel(fixture.away)}</span></h3>
          <p class="muted">${fixture.venue}</p>
        </div>
        <span class="source-pill">${fixture.status}</span>
      </div>
      ${renderPrediction(fixture)}
      ${renderSummary(fixture)}
    </article>
  `;
}

function renderGroups() {
  $('content').innerHTML = `${renderRegressionPanel()}${GROUPS.map((group) => {
    const fixtures = group.fixtures.map((item) => normalizeFixture(item, group));
    return `
      <section class="group-section">
        <div class="group-header">
          <h2>${group.name}</h2>
          <p>四隊積分與完整小組賽賽程</p>
        </div>
        ${renderStandingTable(group)}
        <div class="fixtures">${fixtures.map(renderFixtureCard).join('')}</div>
      </section>
    `;
  }).join('')}`;
}

function renderRegressionPanel() {
  const confidence = pct(regressionModel.credibility);
  const before = regressionModel.maeBefore === null ? '尚無資料' : regressionModel.maeBefore.toFixed(2);
  const after = regressionModel.maeAfter === null ? '尚無資料' : regressionModel.maeAfter.toFixed(2);
  return `
    <section class="regression-panel">
      <div>
        <p class="eyebrow">賽後迴歸校正</p>
        <h2>每場完賽後自動重算預測偏差</h2>
        <p>系統會比對原始賽前 λ 與實際比分，估計目前模型是否高估或低估主隊、客隊與總進球，並套用到所有未賽場次。</p>
      </div>
      <div class="regression-grid">
        <span><b>${regressionModel.sampleCount}</b><small>已完賽樣本</small></span>
        <span><b>${regressionModel.homeFactor.toFixed(2)}</b><small>主隊校正</small></span>
        <span><b>${regressionModel.awayFactor.toFixed(2)}</b><small>客隊校正</small></span>
        <span><b>${regressionModel.totalFactor.toFixed(2)}</b><small>總進球校正</small></span>
        <span><b>${confidence}</b><small>校正權重</small></span>
        <span><b>${before} → ${after}</b><small>平均進球誤差</small></span>
      </div>
    </section>
  `;
}

function renderEmptyKnockout(tabId) {
  const tab = KNOCKOUT_TABS.find((item) => item.id === tabId);
  const rows = Array.from({ length: tab.slots }, (_, index) => `
    <tr><td>第 ${index + 1} 場</td><td class="empty-slot">待第一輪晉級隊伍產生</td><td class="empty-slot">待排定</td><td class="empty-slot">待更新</td></tr>
  `).join('');
  $('content').innerHTML = `
    <section class="group-section inactive-stage">
      <div class="group-header">
        <h2>${tab.label}</h2>
        <p>尚未開賽。第一輪晉級名單確認後，這裡會立即寫入下一輪表格。</p>
      </div>
      <table class="standings-table">
        <thead><tr><th>場次</th><th>對戰</th><th>時間</th><th>摘要</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>
  `;
}

function renderSourceNote() {
  $('sourceNote').textContent = '資料更新：2026-06-17。賽程與 A-H/J-L 組積分依 CBS Sports；I 組完賽比分與摘要依 Guardian、FOX Sports、AP 相關報導人工校對。每新增一場完賽資料，頁面載入時會重新回歸校正未賽預測。';
}

function render() {
  renderTabs();
  renderSourceNote();
  if (state.activeTab === 'groups') renderGroups();
  else renderEmptyKnockout(state.activeTab);
}

$('tabs').addEventListener('click', (event) => {
  const button = event.target.closest('[data-tab]');
  if (!button) return;
  state.activeTab = button.dataset.tab;
  render();
});

document.addEventListener('click', (event) => {
  const link = event.target.closest('.summary-link');
  if (!link) return;
  event.preventDefault();
  const detail = document.querySelector(link.getAttribute('href'));
  if (detail) detail.classList.toggle('open');
});

render();
