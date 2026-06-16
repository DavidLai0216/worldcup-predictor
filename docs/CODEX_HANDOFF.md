# Codex 接手說明

## 目前完成狀態

這個 repo 是「世界盃比分預測平台」MVP，可以本機啟動、手動計算、嘗試抓三個資料源，並有基本測試。

完成項目：

1. 靜態前端：`public/index.html`、`public/styles.css`、`public/app.js`
2. 後端：`server.js`
3. 模型核心：`src/model.js`
4. 資料源 parser：`src/parsers.js`
5. Kalshi RSA-PSS 簽章：`src/kalshi.js`
6. 測試：`test.js`
7. Docker / GitHub 推送腳本 / CI

## 啟動方式

```bash
npm install
npm test
npm start
```

開：<http://localhost:3000>

## 核心產品邏輯

使用者輸入兩隊 → 後端嘗試抓 TheSportsDB / Polymarket / Kalshi → 前端套用近況與市場勝平負 → 計算兩隊 λ → 建立 Poisson 比分矩陣 → Dixon-Coles 修正低比分 → 用市場勝平負校準矩陣 → 顯示 top score。

## 優先開發任務

### P0：讓資料源更可靠

- [ ] TheSportsDB team search 加上 alias 對照表，例如 USA / United States、South Korea / Korea Republic。
- [ ] TheSportsDB 只納入正式國際賽或提供賽事類型篩選，避免友誼賽污染。
- [ ] Polymarket parser 加入更嚴格的市場分類：只吃 match winner / result / 90 minutes 三路盤，排除晉級、冠軍、單隊 yes/no。
- [ ] Kalshi 市場需要實測世界盃相關盤口，再決定是否能自動轉成勝平負。

### P1：把模型設定產品化

- [ ] 新增「中立場 / 主場」切換。
- [ ] 加入 Elo / FIFA ranking / xG 或 betting odds 作為 λ 的外生修正。
- [ ] 加入「保守 / 平衡 / 市場優先」三種 preset。
- [ ] 讓 max goals、ρ、μ 可在 UI 說明與儲存。

### P2：比賽平台功能

目前這個 repo 是「比分預測引擎」，還不是完整「預測比賽平台」。下一步若要辦內部比賽，需要補：

- [ ] 使用者登入：Google OAuth 或 magic link。
- [ ] 賽程管理：匯入比賽、開放預測截止時間。
- [ ] 使用者提交比分：每場只能提交一次或可在截止前修改。
- [ ] 計分規則：猜中勝平負、猜中淨勝球、猜中精確比分分別得分。
- [ ] 排行榜：總分、日榜、小組榜。
- [ ] 後台：管理賽程、鎖盤、匯入實際賽果。
- [ ] 資料庫：SQLite / PostgreSQL / Supabase。

## 建議技術路線

若只是內部活動，建議下一版改成：

- Frontend：Next.js 或保持目前原生前端。
- Backend：Next.js API routes 或 Express/Fastify。
- DB：Supabase PostgreSQL，省去自架登入與後台。
- Auth：Google OAuth。
- Deploy：Vercel + Supabase。

若要快速給 Codex 擴充，第一步可以先做 SQLite：

```text
matches(id, kickoff_at, home_team, away_team, status, home_score, away_score)
predictions(id, match_id, user_name, predicted_home_score, predicted_away_score, created_at, updated_at)
scores(id, prediction_id, points, reason)
```

## 計分規則建議

簡單好懂版：

- 猜中精確比分：5 分
- 猜中勝平負但非比分：2 分
- 猜中淨勝球但非比分：1 分加成
- 提交截止：開賽前 5 分鐘

## 注意事項

1. 不要把 `.env`、Kalshi private key、任何 API key commit 到 GitHub。
2. Polymarket / Kalshi 的盤口規則會變，parser 要保守，不要把不同市場誤當勝平負。
3. 比分模型輸出要明確標示限制，不要包裝成保證預測。
4. 若要真正辦比賽，資料庫與截止時間鎖定比模型本身更重要。
