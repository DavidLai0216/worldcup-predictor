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

const PLAYER_NAME_ZH = {
  'Lionel Messi': '里奧・梅西',
  'Rodrigo De Paul': '羅德里戈・德保羅',
  'Cristiano Ronaldo': '克里斯蒂亞諾・羅納度',
  'Bruno Fernandes': '布魯諾・費南德斯',
  'Harry Kane': '哈里・凱恩',
  'Bukayo Saka': '布卡約・薩卡',
  'Luka Modric': '盧卡・莫德里奇',
  'Mohamed Kudus': '穆罕默德・庫杜斯',
  'Luis Díaz': '路易斯・迪亞斯',
};

const TAIWAN_TEAM_ALIASES = {
  MEX: ['墨西哥'],
  RSA: ['南非'],
  KOR: ['韓國', '南韓'],
  CZE: ['捷克'],
  CAN: ['加拿大'],
  BIH: ['波士尼亞與赫塞哥維納', '波赫'],
  QAT: ['卡達'],
  SUI: ['瑞士'],
  BRA: ['巴西'],
  MAR: ['摩洛哥'],
  SCO: ['蘇格蘭'],
  HAI: ['海地'],
  USA: ['美國'],
  PAR: ['巴拉圭'],
  AUS: ['澳洲'],
  TUR: ['土耳其'],
  GER: ['德國'],
  CUW: ['庫拉索', '古拉索'],
  CIV: ['象牙海岸'],
  ECU: ['厄瓜多'],
  NED: ['荷蘭'],
  JPN: ['日本'],
  SWE: ['瑞典'],
  TUN: ['突尼西亞'],
  BEL: ['比利時'],
  EGY: ['埃及'],
  IRN: ['伊朗'],
  NZL: ['紐西蘭'],
  ESP: ['西班牙'],
  CPV: ['維德角'],
  KSA: ['沙烏地阿拉伯'],
  URU: ['烏拉圭'],
  FRA: ['法國'],
  SEN: ['塞內加爾'],
  IRQ: ['伊拉克'],
  NOR: ['挪威'],
  ARG: ['阿根廷'],
  ALG: ['阿爾及利亞'],
  AUT: ['奧地利'],
  JOR: ['約旦'],
  POR: ['葡萄牙'],
  COD: ['剛果民主共和國', '民主剛果'],
  UZB: ['烏茲別克'],
  COL: ['哥倫比亞'],
  ENG: ['英格蘭'],
  CRO: ['克羅埃西亞'],
  GHA: ['迦納'],
  PAN: ['巴拿馬'],
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
      ['ARG', 1, 1, 0, 0, 3, 0, 3, 3],
      ['AUT', 0, 0, 0, 0, 0, 0, 0, 0],
      ['JOR', 0, 0, 0, 0, 0, 0, 0, 0],
      ['ALG', 1, 0, 0, 1, 0, 3, -3, 0],
    ],
    fixtures: [
      ['2026-06-17', '堪薩斯城', 'ARG', 'ALG', '完賽', 3, 0, [['ARG', '17', '里奧・梅西'], ['ARG', '60', '里奧・梅西'], ['ARG', '76', '里奧・梅西']]],
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

const LIVE_REFRESH_MS = 30000;
const ESPN_SCOREBOARD_URL = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';
const TAIWAN_LOTTERY_WC_URL = 'data/taiwan-odds.json';
const FAN_PORTRAITS_URL = 'data/fan-portraits.json';
const state = {
  activeTab: 'home',
  liveOverrides: new Map(),
  taiwanOdds: new Map(),
  taiwanOddsUpdatedAt: null,
  taiwanOddsError: null,
  fanPortraits: {},
  fanPortraitsUpdatedAt: null,
  fanPortraitsError: null,
  lastLiveUpdate: null,
  liveError: null,
};

function team(code) {
  return TEAM[code] || { name: code, flag: '🏳️' };
}

function teamLabel(code) {
  const t = team(code);
  return `<span class="flag" aria-hidden="true">${t.flag}</span><span>${t.name}</span>`;
}

function playerLabel(name) {
  return PLAYER_NAME_ZH[name] || name || '進球者待確認';
}

function normalizeTaiwanName(value) {
  return String(value || '').replace(/\s+/g, '').trim();
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));
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
  const all = GROUPS.flatMap((group) => currentStandings(group));
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
  return allFixtures()
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

function applyRegressionCalibration(raw) {
  const regressionModel = buildRegressionModel();
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
  const tabs = [
    { id: 'home', label: '今日看板' },
    { id: 'groups', label: '賠率預測' },
    { id: 'schedule', label: '完整賽程' },
    ...KNOCKOUT_TABS
  ];
  $('tabs').innerHTML = tabs.map((tab) => `
    <button class="tab ${state.activeTab === tab.id ? 'active' : ''} ${KNOCKOUT_TABS.some((item) => item.id === tab.id) ? 'muted-tab' : ''}" data-tab="${tab.id}">
      ${tab.label}
    </button>
  `).join('');
}

function teamGroupName(code) {
  const group = GROUPS.find((item) => item.standings.some(([teamCode]) => teamCode === code));
  return group?.name || '';
}

function groupTeamNames(group) {
  return group.standings.map(([code]) => `${team(code).flag} ${team(code).name}`).join('、');
}

function navigationItems() {
  const groupItems = GROUPS.map((group) => ({
    type: 'group',
    label: group.name,
    meta: groupTeamNames(group),
    target: groupAnchor(group),
    tokens: `${group.name} ${group.id}組 group ${group.id} ${groupTeamNames(group)}`,
  }));
  const teamItems = Object.keys(TEAM).map((code) => ({
    type: 'team',
    label: `${team(code).flag} ${team(code).name}`,
    meta: `${teamGroupName(code)}｜${code}`,
    target: teamAnchor(code),
    tokens: `${code} ${team(code).name} ${teamGroupName(code)} ${(TAIWAN_TEAM_ALIASES[code] || []).join(' ')}`,
  }));
  const fixtureItems = allFixtures().map((fixture) => ({
    type: 'fixture',
    label: `${team(fixture.home).name} vs ${team(fixture.away).name}`,
    meta: `${fixture.group}｜${formatFixtureDateTime(fixture.date)}｜${fixture.venue}`,
    target: fixtureAnchor(fixture),
    tokens: `${fixture.home} ${fixture.away} ${team(fixture.home).name} ${team(fixture.away).name} ${fixture.group} ${fixture.date} ${formatFixtureDateTime(fixture.date)} ${fixture.venue} ${fixture.status}`,
  }));
  return [...groupItems, ...teamItems, ...fixtureItems];
}

function jumpToTarget(targetId) {
  if (!targetId) return;
  if (state.activeTab !== 'groups') {
    state.activeTab = 'groups';
    render();
  }
  requestAnimationFrame(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const highlightTarget = target.classList.contains('anchor-marker') ? target.closest('.fixture-card') : target;
    (highlightTarget || target).scrollIntoView({ behavior: 'smooth', block: 'start' });
    highlightTarget?.classList.add('jump-highlight');
    window.setTimeout(() => highlightTarget?.classList.remove('jump-highlight'), 1400);
  });
}

function renderJumpControls() {
  const teamSelect = $('teamJump');
  if (!teamSelect) return;

  teamSelect.innerHTML = '<option value="">選擇國家</option>' + Object.keys(TEAM)
    .sort((a, b) => team(a).name.localeCompare(team(b).name, 'zh-Hant'))
    .map((code) => `<option value="${teamAnchor(code)}">${team(code).flag} ${team(code).name}｜${teamGroupName(code)}</option>`)
    .join('');
  renderJumpResults($('jumpSearch')?.value || '');
}

function renderJumpResults(query) {
  const container = $('jumpResults');
  if (!container) return;
  const normalized = normalizeTaiwanName(query).toLowerCase();
  const items = normalized
    ? navigationItems()
      .filter((item) => normalizeTaiwanName(`${item.label} ${item.meta} ${item.tokens}`).toLowerCase().includes(normalized))
      .slice(0, 10)
    : GROUPS.map((group) => ({
      type: 'group',
      label: group.name,
      meta: groupTeamNames(group),
      target: groupAnchor(group),
    }));
  container.innerHTML = items.map((item) => `
    <button type="button" class="jump-chip ${item.type === 'group' ? 'jump-chip--group' : ''}" data-jump-target="${item.target}">
      <strong>${item.label}</strong>
      <span>${item.meta}</span>
    </button>
  `).join('');
}

function renderStandingTable(group) {
  const standings = currentStandings(group);
  return `
    <table class="standings-table">
      <thead><tr><th>隊伍</th><th>賽</th><th>勝</th><th>平</th><th>負</th><th>進</th><th>失</th><th>淨</th><th>積分</th></tr></thead>
      <tbody>
        ${standings.map(([code, played, wins, draws, losses, gf, ga, gd, points]) => `
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
  const [date, venue, home, away, status = '未賽', homeScore = null, awayScore = null, events = [], meta = {}] = item;
  const fixture = { id: `${group.id}-${home}-${away}`.toLowerCase(), groupId: group.id, group: group.name, date, venue, home, away, status, homeScore, awayScore, events, meta };
  return { ...fixture, ...(state.liveOverrides.get(fixture.id) || {}) };
}

function isLiveFixture(fixture) {
  return fixture.status === '進行中';
}

function hasScore(fixture) {
  return Number.isFinite(fixture.homeScore) && Number.isFinite(fixture.awayScore);
}

function allFixtures() {
  return GROUPS.flatMap((group) => group.fixtures.map((item) => normalizeFixture(item, group)));
}

function currentFixturesForGroup(group) {
  return group.fixtures.map((item) => normalizeFixture(item, group));
}

function fixtureKey(home, away) {
  return [home, away].sort().join('-');
}

function groupAnchor(group) {
  return `group-${group.id.toLowerCase()}`;
}

function teamAnchor(code) {
  return `team-${code.toLowerCase()}`;
}

function fixtureAnchor(fixture) {
  return `fixture-${fixture.id}`;
}

function taiwanNameMatches(code, name) {
  const normalized = normalizeTaiwanName(name);
  return (TAIWAN_TEAM_ALIASES[code] || [team(code).name]).some((alias) => normalizeTaiwanName(alias) === normalized);
}

function codeForTaiwanName(name) {
  return Object.keys(TEAM).find((code) => taiwanNameMatches(code, name)) || null;
}

function taiwanFixtureKey(homeName, awayName) {
  const home = codeForTaiwanName(homeName);
  const away = codeForTaiwanName(awayName);
  if (!home || !away) return null;
  return fixtureKey(home, away);
}

function decimalOdds(choice) {
  const numerator = Number(choice?.pu);
  const denominator = Number(choice?.pd);
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0) return null;
  return 1 + numerator / denominator;
}

function parseTaiwanChoices(market, officialHome, officialAway) {
  return (market?.cs || []).map((choice) => ({
    name: choice.name,
    shortName: choice.sn || choice.name,
    side: choice.v,
    teamCode: choice.v === 'H' ? officialHome : choice.v === 'A' ? officialAway : null,
    handicap: choice.hv ?? null,
    odds: decimalOdds(choice),
  })).filter((choice) => Number.isFinite(choice.odds));
}

function parseTaiwanOddsGame(game) {
  const officialHome = codeForTaiwanName(game.hn);
  const officialAway = codeForTaiwanName(game.an);
  const moneyline = game.ms?.find((market) => market.name === '不讓分');
  const handicap = game.ms?.find((market) => market.name.startsWith('讓分'));
  return {
    gameNo: game.no,
    title: game.bn,
    kickoff: game.kt,
    officialHome,
    officialAway,
    source: '台灣運彩',
    moneyline: moneyline ? { name: moneyline.name, choices: parseTaiwanChoices(moneyline, officialHome, officialAway) } : null,
    handicap: handicap ? { name: handicap.name, line: handicap.mv, choices: parseTaiwanChoices(handicap, officialHome, officialAway) } : null,
  };
}

async function refreshTaiwanOdds() {
  try {
    const payload = await fetchEspnJson(TAIWAN_LOTTERY_WC_URL);
    const games = Array.isArray(payload) ? payload : payload.games;
    const next = new Map();
    for (const game of Array.isArray(games) ? games : []) {
      const key = taiwanFixtureKey(game.hn, game.an);
      if (key) next.set(key, parseTaiwanOddsGame(game));
    }
    state.taiwanOdds = next;
    state.taiwanOddsUpdatedAt = payload.updatedAt ? new Date(payload.updatedAt) : new Date();
    state.taiwanOddsError = null;
    render();
  } catch (error) {
    state.taiwanOddsError = error.message;
    renderSourceNote();
  }
}

function startTaiwanOddsPolling() {
  refreshTaiwanOdds();
  window.setInterval(refreshTaiwanOdds, 5 * 60 * 1000);
}

async function refreshFanPortraits() {
  try {
    const payload = await fetchEspnJson(FAN_PORTRAITS_URL);
    state.fanPortraits = payload.teams || {};
    state.fanPortraitsUpdatedAt = payload.updatedAt ? new Date(payload.updatedAt) : new Date();
    state.fanPortraitsError = null;
    render();
  } catch (error) {
    state.fanPortraitsError = error.message;
    renderSourceNote();
  }
}

function startFanPortraitsPolling() {
  refreshFanPortraits();
  window.setInterval(refreshFanPortraits, 30 * 60 * 1000);
}

function formatEspnDate(date) {
  return date.toISOString().slice(0, 10).replaceAll('-', '');
}

function liveScoreboardDates() {
  const now = new Date();
  return [-1, 0, 1].map((offset) => {
    const date = new Date(now);
    date.setUTCDate(date.getUTCDate() + offset);
    return formatEspnDate(date);
  });
}

function fixtureByTeams() {
  return new Map(allFixtures().map((fixture) => [fixtureKey(fixture.home, fixture.away), fixture]));
}

function scoreForCompetition(competition, code) {
  const competitor = competition?.competitors?.find((item) => item.team?.abbreviation === code);
  const score = Number(competitor?.score);
  return Number.isFinite(score) ? score : null;
}

function eventMinute(detail) {
  const raw = detail?.clock?.displayValue || detail?.displayClock || '';
  return raw.replace("'", '') || '時間待確認';
}

function scoringEventsFromDetails(details = []) {
  return details
    .filter((detail) => detail.scoringPlay)
    .map((detail) => {
      const code = detail.team?.abbreviation;
      const scorer = detail.participants?.[0]?.athlete?.displayName || detail.athletes?.[0]?.displayName;
      const suffix = detail.ownGoal ? '（烏龍球）' : detail.penaltyKick ? '（十二碼）' : '';
      return [code, eventMinute(detail), `${playerLabel(scorer)}${suffix}`];
    })
    .filter(([code]) => TEAM[code]);
}

async function fetchEspnJson(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`ESPN HTTP ${response.status}`);
  return response.json();
}

async function fetchScoreboardEvents() {
  const urls = liveScoreboardDates().map((date) => `${ESPN_SCOREBOARD_URL}?dates=${date}`);
  const results = await Promise.allSettled(urls.map(fetchEspnJson));
  const events = [];
  for (const result of results) {
    if (result.status === 'fulfilled') events.push(...(result.value.events || []));
  }
  return events;
}

async function fetchEspnSummary(eventId) {
  const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary?event=${encodeURIComponent(eventId)}`;
  try {
    return await fetchEspnJson(url);
  } catch (_error) {
    return null;
  }
}

function buildOverrideFromEspnEvent(event, fixture, summary) {
  const competition = event.competitions?.[0];
  const type = event.status?.type || competition?.status?.type || {};
  const homeScore = scoreForCompetition(competition, fixture.home);
  const awayScore = scoreForCompetition(competition, fixture.away);
  const detailEvents = scoringEventsFromDetails(summary?.header?.competitions?.[0]?.details || competition?.details || []);
  const completed = Boolean(type.completed);
  const inProgress = type.state === 'in';
  const status = completed ? '完賽' : inProgress ? '進行中' : fixture.status;
  const minute = inProgress ? (event.status?.displayClock || competition?.status?.displayClock || type.shortDetail || '進行中') : null;
  const sourceLink = event.links?.find((link) => link.rel?.includes('summary'))?.href || `https://www.espn.com/soccer/match/_/gameId/${event.id}`;

  if (!completed && !inProgress) return null;

  return {
    status,
    homeScore,
    awayScore,
    events: detailEvents.length ? detailEvents : fixture.events,
    meta: {
      ...fixture.meta,
      minute,
      source: 'ESPN 即時比分',
      sourceUrl: sourceLink,
      updatedAt: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, hourCycle: 'h23' }),
      note: completed ? 'ESPN 已標記本場完賽，今日賽程顯示最終比數。' : 'ESPN 即時資料更新中；主體賽程卡仍保留賽前預測。',
    },
  };
}

async function refreshLiveScores() {
  try {
    const fixtures = fixtureByTeams();
    const events = await fetchScoreboardEvents();
    const matched = [];
    for (const event of events) {
      const competition = event.competitions?.[0];
      const codes = (competition?.competitors || []).map((item) => item.team?.abbreviation).filter(Boolean);
      if (codes.length < 2) continue;
      const fixture = fixtures.get(fixtureKey(codes[0], codes[1]));
      if (!fixture) continue;
      const type = event.status?.type || competition?.status?.type || {};
      if (type.state !== 'in' && !type.completed) continue;
      matched.push({ event, fixture });
    }

    const summaries = await Promise.all(matched.map(({ event }) => fetchEspnSummary(event.id)));
    for (let index = 0; index < matched.length; index += 1) {
      const { event, fixture } = matched[index];
      const override = buildOverrideFromEspnEvent(event, fixture, summaries[index]);
      if (override) state.liveOverrides.set(fixture.id, override);
    }

    state.lastLiveUpdate = new Date();
    state.liveError = null;
    render();
  } catch (error) {
    state.liveError = error.message;
    renderSourceNote();
  }
}

function startLivePolling() {
  refreshLiveScores();
  window.setInterval(refreshLiveScores, LIVE_REFRESH_MS);
}

function currentStandings(group) {
  const seedOrder = new Map(group.standings.map(([code], index) => [code, index]));
  const rows = new Map(group.standings.map(([code]) => [code, { code, played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 }]));
  for (const fixture of currentFixturesForGroup(group)) {
    if (fixture.status !== '完賽' || !hasScore(fixture)) continue;
    const home = rows.get(fixture.home);
    const away = rows.get(fixture.away);
    if (!home || !away) continue;
    home.played += 1;
    away.played += 1;
    home.gf += fixture.homeScore;
    home.ga += fixture.awayScore;
    away.gf += fixture.awayScore;
    away.ga += fixture.homeScore;
    if (fixture.homeScore > fixture.awayScore) {
      home.wins += 1;
      home.points += 3;
      away.losses += 1;
    } else if (fixture.homeScore < fixture.awayScore) {
      away.wins += 1;
      away.points += 3;
      home.losses += 1;
    } else {
      home.draws += 1;
      away.draws += 1;
      home.points += 1;
      away.points += 1;
    }
  }

  return [...rows.values()]
    .map((row) => ({ ...row, gd: row.gf - row.ga }))
    .sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf || seedOrder.get(a.code) - seedOrder.get(b.code))
    .map((row) => [row.code, row.played, row.wins, row.draws, row.losses, row.gf, row.ga, row.gd, row.points]);
}

function renderSummary(fixture) {
  if (fixture.status !== '完賽' && !isLiveFixture(fixture)) return '';
  const rows = fixture.events.length
    ? fixture.events.map(([code, minute, scorer]) => `<li><strong>${minute}'</strong> ${teamLabel(code)} ${scorer}</li>`).join('')
    : `<li>${fixture.status === '完賽' ? '本場 0-0，沒有進球。' : '目前尚未有進球事件。'}</li>`;
  const liveNote = isLiveFixture(fixture) && fixture.meta.note
    ? `<p class="live-note">${fixture.meta.note}</p>`
    : '';
  const sourceLabel = fixture.meta.sourceUrl
    ? `<a href="${fixture.meta.sourceUrl}" target="_blank" rel="noreferrer">${fixture.meta.source}</a>`
    : fixture.meta.source;
  const source = (isLiveFixture(fixture) || fixture.meta.sourceUrl) && fixture.meta.source
    ? `<p class="small-text">資料來源：${sourceLabel}｜更新：${fixture.meta.updatedAt || '載入時'}</p>`
    : '';
  const title = hasScore(fixture)
    ? `${team(fixture.home).name} ${fixture.homeScore}-${fixture.awayScore} ${team(fixture.away).name}`
    : `${team(fixture.home).name} 對 ${team(fixture.away).name}`;
  return `
    <a class="summary-link" href="#${fixture.id}">${isLiveFixture(fixture) ? '即時比賽摘要' : '比賽摘要'}</a>
    <div class="match-detail ${isLiveFixture(fixture) ? 'open live-detail' : ''}" id="${fixture.id}">
      <h4>${title}</h4>
      ${liveNote}
      <ul>${rows}</ul>
      ${source}
    </div>
  `;
}

function renderPrediction(fixture) {
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
    ${renderTaiwanOdds(fixture)}
  `;
}

function orderedTaiwanChoices(market, fixture) {
  if (!market?.choices?.length) return [];
  const homeChoice = market.choices.find((choice) => choice.teamCode === fixture.home);
  const drawChoice = market.choices.find((choice) => choice.side === 'D');
  const awayChoice = market.choices.find((choice) => choice.teamCode === fixture.away);
  return [homeChoice, drawChoice, awayChoice].filter(Boolean);
}

function renderOddsChoices(market, fixture) {
  const choices = orderedTaiwanChoices(market, fixture);
  if (!market?.choices?.length) return '<p class="small-text">目前未開</p>';
  if (!choices.length) return '<p class="small-text">盤口隊伍無法對應此場 fixture</p>';
  return `
    <div class="odds-choice-grid">
      ${choices.map((choice) => `
        <span>
          <small>${choice.name}</small>
          <b>${choice.odds.toFixed(2)}</b>
        </span>
      `).join('')}
    </div>
  `;
}

function renderTaiwanOdds(fixture) {
  const odds = state.taiwanOdds.get(fixtureKey(fixture.home, fixture.away));
  const updated = state.taiwanOddsUpdatedAt
    ? state.taiwanOddsUpdatedAt.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false, hourCycle: 'h23' })
    : '讀取中';
  if (!odds) {
    const message = state.taiwanOddsError ? `讀取失敗：${state.taiwanOddsError}` : '待台灣運彩開盤或資料同步';
    return `
      <div class="taiwan-odds">
        <div class="taiwan-odds__header">
          <strong>台灣運彩</strong>
          <a href="https://www.sportslottery.com.tw/" target="_blank" rel="noreferrer">官網</a>
        </div>
        <p class="small-text">${message}</p>
      </div>
    `;
  }

  return `
    <div class="taiwan-odds">
      <div class="taiwan-odds__header">
        <strong>台灣運彩</strong>
        <span>場次 ${odds.gameNo}｜${updated}</span>
      </div>
      <p class="small-text">官方場次：${odds.title}；下方已依本卡片隊伍順序排列。</p>
      <div class="taiwan-odds__market">
        <p class="label">不讓分賠率</p>
        ${renderOddsChoices(odds.moneyline, fixture)}
      </div>
      <div class="taiwan-odds__market">
        <p class="label">${odds.handicap?.name || '讓分賠率'}</p>
        ${renderOddsChoices(odds.handicap, fixture)}
      </div>
    </div>
  `;
}

function fanPortrait(code, fixture) {
  const entry = state.fanPortraits[code] || {};
  const imageUrl = fixture.status === '完賽' && entry.completedImageUrl ? entry.completedImageUrl : entry.imageUrl;
  const isDisplayable = ['real', 'player', 'landmark'].includes(entry.kind) && Boolean(imageUrl);
  const source = entry.kind === 'player'
    ? `${entry.source}｜明星球員：${entry.playerName || team(code).name}`
    : entry.kind === 'landmark'
      ? `${entry.source}｜代表景物：${entry.landmarkName || team(code).name}`
      : `${entry.source}${entry.sport === 'football' ? '｜足球球迷' : '｜運動球迷'}`;
  return {
    imageUrl: isDisplayable ? imageUrl : null,
    isDisplayable,
    source: isDisplayable ? source : '真實授權照片待補',
    sourceUrl: isDisplayable ? entry.sourceUrl || null : null,
    kind: entry.kind || 'pending',
    searchQuery: entry.searchQuery || `${team(code).name} adult woman football fan portrait`,
  };
}

function renderFanPortrait(code, fixture) {
  const portrait = fanPortrait(code, fixture);
  const t = team(code);
  const source = portrait.sourceUrl
    ? `<a href="${portrait.sourceUrl}" target="_blank" rel="noreferrer">${escapeHtml(portrait.source)}</a>`
    : escapeHtml(portrait.source);
  const altText = portrait.kind === 'player'
    ? `${t.name}2026世足明星球員肖像`
    : portrait.kind === 'landmark'
      ? `${t.name}代表景物或建築照片`
      : `${t.name}成年女性球迷真實照片`;
  const media = portrait.imageUrl
    ? `<img src="${escapeHtml(portrait.imageUrl)}" alt="${escapeHtml(altText)}" loading="lazy" />`
    : `<div class="fan-card__missing" role="img" aria-label="${escapeHtml(t.name)}真實授權球迷照片待補">
        <strong>${t.flag}</strong>
        <span>待補真實照片</span>
      </div>`;
  return `
    <figure class="fan-card ${portrait.isDisplayable ? 'fan-card--real' : 'fan-card--missing'} ${portrait.kind === 'player' ? 'fan-card--player' : ''} ${portrait.kind === 'landmark' ? 'fan-card--landmark' : ''}">
      ${media}
      <figcaption>
        <strong>${teamLabel(code)}</strong>
        <span>${source}</span>
      </figcaption>
    </figure>
  `;
}

function renderFanPortraits(fixture) {
  return `
    <div class="fan-strip" aria-label="雙方球迷肖像">
      ${renderFanPortrait(fixture.home, fixture)}
      ${renderFanPortrait(fixture.away, fixture)}
    </div>
  `;
}

function firstFixtureForTeam(code) {
  return allFixtures().find((fixture) => fixture.home === code || fixture.away === code);
}

function teamAnchorMarker(fixture) {
  const markers = [];
  for (const code of [fixture.home, fixture.away]) {
    const first = firstFixtureForTeam(code);
    if (first?.id === fixture.id) markers.push(`<span id="${teamAnchor(code)}" class="anchor-marker"></span>`);
  }
  return markers.join('');
}

function renderFixtureCard(fixture) {
  return `
    <article id="${fixtureAnchor(fixture)}" class="fixture-card ${isLiveFixture(fixture) ? 'fixture-card--live' : ''}" data-home="${fixture.home}" data-away="${fixture.away}">
      ${teamAnchorMarker(fixture)}
      <div class="fixture-card__top">
        <div>
          <p class="eyebrow">${fixture.group}｜${formatFixtureDateTime(fixture.date)}</p>
          <h3><span class="team-name">${teamLabel(fixture.home)}</span><em>對</em><span class="team-name">${teamLabel(fixture.away)}</span></h3>
          <p class="muted">${fixture.venue}</p>
        </div>
        <span class="source-pill">${fixture.status}</span>
      </div>
      ${renderFanPortraits(fixture)}
      ${renderPrediction(fixture)}
    </article>
  `;
}

function renderGroups() {
  $('content').innerHTML = `${renderRegressionPanel()}${GROUPS.map((group) => {
    const fixtures = currentFixturesForGroup(group);
    return `
      <section id="${groupAnchor(group)}" class="group-section">
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

function fixtureSort(a, b) {
  return Number(isLiveFixture(b)) - Number(isLiveFixture(a)) || formatFixtureDateTime(a.date).localeCompare(formatFixtureDateTime(b.date));
}

function todayDateKey() {
  return formatTaipeiDateTime(new Date()).slice(0, 10);
}

function tomorrowDateKey() {
  return formatTaipeiDateTime(new Date(Date.now() + 24 * 60 * 60 * 1000)).slice(0, 10);
}

const FIXTURE_SOURCE_OFFSET = '-04:00';
const TAIPEI_DATE_TIME_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Taipei',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23'
});

function formatTime24(rawTime) {
  const source = String(rawTime || '').trim();
  if (!source) return '';
  const period = source.match(/凌晨|清晨|早上|上午|中午|下午|晚上|晚間|AM|PM/i)?.[0]?.toLowerCase() || '';
  const normalized = source.replace(/[點时時]/g, ':00');
  const match = normalized.match(/(\d{1,2})(?:[:：](\d{1,2}))?/);
  if (!match) return source;

  let hour = Number(match[1]);
  const minute = Number(match[2] || 0);
  if (period === 'pm' || period === '下午' || period === '晚上' || period === '晚間') {
    if (hour < 12) hour += 12;
  } else if (period === 'am' || period === '凌晨' || period === '清晨' || period === '早上' || period === '上午') {
    if (hour === 12) hour = 0;
  } else if (period === '中午') {
    if (hour === 12) hour = 12;
  }

  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function formatTaipeiDateTime(date) {
  const parts = Object.fromEntries(
    TAIPEI_DATE_TIME_FORMATTER
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value])
  );
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`;
}

function fixtureDisplayDateTime(dateText) {
  const source = String(dateText || '');
  const match = source.match(/^(\d{4}-\d{2}-\d{2})(?:\s+(.+))?$/);
  if (!match) return { dateTime: source, date: source.slice(0, 10), time: '' };
  if (!match[2]) return { dateTime: match[1], date: match[1], time: '' };

  const sourceTime = formatTime24(match[2]);
  const taipeiDateTime = formatTaipeiDateTime(new Date(`${match[1]}T${sourceTime}:00${FIXTURE_SOURCE_OFFSET}`));
  return {
    dateTime: taipeiDateTime,
    date: taipeiDateTime.slice(0, 10),
    time: taipeiDateTime.slice(11, 16)
  };
}

function formatFixtureDateTime(dateText) {
  return fixtureDisplayDateTime(dateText).dateTime;
}

function fixtureDateKey(fixture) {
  return fixtureDisplayDateTime(fixture.date).date;
}

function fixtureTimeLabel(fixture) {
  return fixtureDisplayDateTime(fixture.date).time || '時間待定';
}

function renderTodayMatchStatus(fixture) {
  if (fixture.status === '完賽') {
    const score = hasScore(fixture) ? `${fixture.homeScore}-${fixture.awayScore}` : '已完賽';
    return `<div class="scoreline">${score}</div><p class="small-text">最終比數</p>`;
  }
  if (isLiveFixture(fixture)) {
    const score = hasScore(fixture) ? `${fixture.homeScore}-${fixture.awayScore}` : '進行中';
    const minute = fixture.meta.minute ? `目前 ${fixture.meta.minute}'` : '即時更新中';
    return `<div class="scoreline live-text">${score}</div><p class="small-text">${minute}</p>`;
  }
  const prediction = predictMatch(fixture.home, fixture.away);
  const best = prediction.scores[0];
  return `<div class="scoreline">${best.homeGoals}-${best.awayGoals}</div><p class="small-text">${fixtureTimeLabel(fixture)}｜賽前預測最高比分</p>`;
}

function renderTodayFixture(fixture, options = {}) {
  const { compact = false } = options;
  const displayTime = fixtureDisplayDateTime(fixture.date);
  return `
    <article class="fixture-card today-fixture ${compact ? 'fixture-card--compact' : ''} ${isLiveFixture(fixture) ? 'fixture-card--live' : ''}">
      <div class="fixture-card__top">
        <div>
          <p class="eyebrow">${fixture.group}｜台灣時間 ${displayTime.date} ${displayTime.time || '時間待定'}｜${fixture.venue}</p>
          <h3><span class="team-name">${teamLabel(fixture.home)}</span><em>對</em><span class="team-name">${teamLabel(fixture.away)}</span></h3>
        </div>
        <span class="source-pill">${fixture.status}</span>
      </div>
      ${renderTodayMatchStatus(fixture)}
      ${renderSummary(fixture)}
    </article>
  `;
}

function renderDateSchedule(dateKey, options = {}) {
  const { eyebrow = '賽程', title = dateKey, description = '', emptyText = '目前沒有排定賽事', compact = false } = options;
  const fixtures = allFixtures()
    .filter((fixture) => fixtureDateKey(fixture) === dateKey)
    .sort(fixtureSort);
  const body = fixtures.length
    ? `<div class="fixtures fixtures--today">${fixtures.map((fixture) => renderTodayFixture(fixture, { compact })).join('')}</div>`
    : `<p class="empty-slot">${emptyText}</p>`;
  return `
    <section class="today-section">
      <div class="group-header">
        <div>
          <p class="eyebrow">${eyebrow}</p>
          <h2>${title}</h2>
        </div>
        <p>${description}</p>
      </div>
      ${body}
    </section>
  `;
}

function fixtureOddsSummary(fixture) {
  const odds = state.taiwanOdds.get(fixtureKey(fixture.home, fixture.away));
  if (!odds) return null;
  const moneyline = orderedTaiwanChoices(odds.moneyline, fixture);
  const handicap = orderedTaiwanChoices(odds.handicap, fixture);
  return { odds, moneyline, handicap };
}

function renderOddsMiniRow(label, choices) {
  if (!choices?.length) return `<p class="small-text">${label}：目前未開</p>`;
  return `
    <div class="market-mini">
      <span>${label}</span>
      ${choices.map((choice) => `<b>${choice.name} ${choice.odds.toFixed(2)}</b>`).join('')}
    </div>
  `;
}

function renderBettingOverview(fixtures) {
  const updated = state.taiwanOddsUpdatedAt
    ? state.taiwanOddsUpdatedAt.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false, hourCycle: 'h23' })
    : '同步中';
  const cards = fixtures.slice(0, 6).map((fixture) => {
    const displayTime = fixtureDisplayDateTime(fixture.date);
    const oddsSummary = fixtureOddsSummary(fixture);
    const prediction = predictMatch(fixture.home, fixture.away);
    return `
      <article class="odds-board-card">
        <div>
          <p class="eyebrow">${fixture.group}｜${displayTime.date} ${displayTime.time || '時間待定'}</p>
          <h3>${team(fixture.home).flag} ${team(fixture.home).name} <span>vs</span> ${team(fixture.away).flag} ${team(fixture.away).name}</h3>
        </div>
        ${oddsSummary ? `
          <p class="small-text">台灣運彩場次 ${oddsSummary.odds.gameNo}｜${updated}</p>
          ${renderOddsMiniRow('不讓分', oddsSummary.moneyline)}
          ${renderOddsMiniRow(oddsSummary.odds.handicap?.name || '讓分', oddsSummary.handicap)}
        ` : `
          <p class="small-text">${state.taiwanOddsError ? `台灣運彩讀取失敗：${state.taiwanOddsError}` : '台灣運彩待開盤，先顯示模型機率'}</p>
          <div class="market-mini">
            <span>模型</span>
            <b>${team(fixture.home).name} ${pct(prediction.outcome.home)}</b>
            <b>和 ${pct(prediction.outcome.draw)}</b>
            <b>${team(fixture.away).name} ${pct(prediction.outcome.away)}</b>
          </div>
        `}
      </article>
    `;
  }).join('');

  return `
    <aside class="bettor-panel" aria-label="賠率摘要">
      <div class="panel-heading">
        <p class="eyebrow">盤口摘要</p>
        <h2>先看可下注資訊</h2>
        <p>列出今日與明日賽事的台灣運彩盤口；未開盤時以模型勝平負機率補位。</p>
      </div>
      <div class="odds-board">${cards || '<p class="empty-slot">今日與明日目前沒有可顯示的盤口</p>'}</div>
    </aside>
  `;
}

function renderHome() {
  const today = todayDateKey();
  const tomorrow = tomorrowDateKey();
  const homeFixtures = allFixtures()
    .filter((fixture) => [today, tomorrow].includes(fixtureDateKey(fixture)))
    .sort(fixtureSort);
  $('content').innerHTML = `
    <section class="home-command">
      <div class="fan-panel">
        <div class="panel-heading">
          <p class="eyebrow">球迷入口</p>
          <h2>比分、摘要、下一場</h2>
          <p>首頁只放最需要立刻知道的賽事狀態；完整分組與模型請切到上方分頁。</p>
        </div>
        ${renderDateSchedule(today, {
          eyebrow: '今日賽程',
          title: `${today} 賽事狀態`,
          description: '進行中比賽顯示即時動態；完賽顯示最終比數與摘要。',
          emptyText: '今日目前沒有排定賽事',
          compact: true
        })}
        ${renderDateSchedule(tomorrow, {
          eyebrow: '明日賽程',
          title: `${tomorrow} 即將舉辦`,
          description: '以下時間皆為台灣時間，採 24 小時制。',
          emptyText: '明日目前沒有排定賽事',
          compact: true
        })}
      </div>
      ${renderBettingOverview(homeFixtures)}
    </section>
  `;
}

function fixtureStatusLabel(fixture) {
  if (fixture.status === '完賽' && hasScore(fixture)) return `完賽 ${fixture.homeScore}-${fixture.awayScore}`;
  if (isLiveFixture(fixture) && hasScore(fixture)) return `進行中 ${fixture.homeScore}-${fixture.awayScore}`;
  return fixture.status;
}

function renderFullSchedule() {
  const rows = allFixtures()
    .sort((a, b) => formatFixtureDateTime(a.date).localeCompare(formatFixtureDateTime(b.date)) || a.group.localeCompare(b.group, 'zh-Hant'))
    .map((fixture, index) => {
      const displayTime = fixtureDisplayDateTime(fixture.date);
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${fixture.group}</td>
          <td>${displayTime.date}</td>
          <td>${displayTime.time || '時間待定'}</td>
          <td>
            <div class="schedule-matchup">${teamLabel(fixture.home)} <span class="muted">對</span> ${teamLabel(fixture.away)}</div>
            <div class="schedule-time-note">台灣時間 ${displayTime.date} ${displayTime.time || '時間待定'}</div>
          </td>
          <td>${fixture.venue}</td>
          <td><span class="source-pill">${fixtureStatusLabel(fixture)}</span></td>
        </tr>
      `;
    }).join('');

  $('content').innerHTML = `
    <section class="group-section">
      <div class="group-header">
        <div>
          <p class="eyebrow">完整賽程</p>
          <h2>所有賽程表</h2>
        </div>
        <p>以下時間皆為台灣時間，採 24 小時制。</p>
      </div>
      <div class="schedule-table-wrap">
        <table class="standings-table schedule-table">
          <thead>
            <tr><th>#</th><th>組別</th><th>台灣日期</th><th>台灣時間</th><th>對戰組合</th><th>場地</th><th>狀態</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderRegressionPanel() {
  const regressionModel = buildRegressionModel();
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
  const liveStatus = state.lastLiveUpdate
    ? `即時比分最近同步：${state.lastLiveUpdate.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, hourCycle: 'h23' })}。`
    : '即時比分同步中。';
  const oddsStatus = state.taiwanOddsUpdatedAt
    ? `台灣運彩賠率最近同步：${state.taiwanOddsUpdatedAt.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false, hourCycle: 'h23' })}。`
    : '台灣運彩賠率同步中。';
  const fanStatus = state.fanPortraitsUpdatedAt
    ? `球迷肖像最近同步：${state.fanPortraitsUpdatedAt.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false, hourCycle: 'h23' })}。`
    : '球迷肖像同步中。';
  const error = state.liveError ? ` ESPN 同步暫時失敗：${state.liveError}。` : '';
  const oddsError = state.taiwanOddsError ? ` 台灣運彩同步暫時失敗：${state.taiwanOddsError}。` : '';
  const fanError = state.fanPortraitsError ? ` 球迷肖像同步暫時失敗：${state.fanPortraitsError}。` : '';
  $('sourceNote').textContent = `資料更新：${todayDateKey()}。今日看板服務兩種使用者：球迷看比分與摘要，投注者看盤口與模型；完整賽程、賠率預測與各組積分集中在分頁。進行中與完賽狀態每 ${LIVE_REFRESH_MS / 1000} 秒向 ESPN 即時比分同步；台灣運彩欄位讀取站內同步檔，來源為官方世界盃賽事資料。${liveStatus}${oddsStatus}${fanStatus}${error}${oddsError}${fanError}`;
}

function render() {
  renderTabs();
  renderJumpControls();
  renderSourceNote();
  if (state.activeTab === 'home') renderHome();
  else if (state.activeTab === 'groups') renderGroups();
  else if (state.activeTab === 'schedule') renderFullSchedule();
  else renderEmptyKnockout(state.activeTab);
}

$('tabs').addEventListener('click', (event) => {
  const button = event.target.closest('[data-tab]');
  if (!button) return;
  state.activeTab = button.dataset.tab;
  render();
});

$('jumpSearch').addEventListener('input', (event) => {
  renderJumpResults(event.target.value);
});

$('jumpSearch').addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  const first = document.querySelector('.jump-chip[data-jump-target]');
  if (first) jumpToTarget(first.dataset.jumpTarget);
});

$('teamJump').addEventListener('change', (event) => {
  jumpToTarget(event.target.value);
  event.target.value = '';
});

$('jumpResults').addEventListener('click', (event) => {
  const button = event.target.closest('[data-jump-target]');
  if (!button) return;
  jumpToTarget(button.dataset.jumpTarget);
});

document.addEventListener('click', (event) => {
  const link = event.target.closest('.summary-link');
  if (!link) return;
  event.preventDefault();
  const detail = document.querySelector(link.getAttribute('href'));
  if (detail) detail.classList.toggle('open');
});

render();
startLivePolling();
startTaiwanOddsPolling();
startFanPortraitsPolling();
