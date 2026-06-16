# 世界盃比分預測平台

市場隱含機率（Polymarket / Kalshi）為錨點，Poisson／Dixon-Coles 進球模型產生比分分佈，融合輸出最可能的「幾比幾」。

這版已補成可執行的最小完整產品（MVP）：

- Node.js 原生 HTTP 後端，不依賴 Express，`npm install` 後即可跑。
- 後端提供 TheSportsDB、Polymarket Gamma、Kalshi 三個資料源 proxy。
- 前端可手動輸入兩隊近況與市場勝平負機率，也可一鍵嘗試自動抓資料源。
- 內建 Poisson + Dixon-Coles + 市場機率校準。
- 內建 `npm test`，可驗證核心模型、Polymarket 解析、Kalshi RSA-PSS 簽章。

---

## 啟動（三步）

```bash
cd worldcup-predictor
npm install
npm start
```

打開瀏覽器進 <http://localhost:3000>。右上角顯示「後端已連線」即代表後端可用。

選用：要抓 Kalshi 才需要設金鑰。

```bash
cp .env.example .env
# 編輯 .env 填入 KALSHI_KEY_ID 與 KALSHI_PRIVATE_KEY
```

> 沒有 `.env` 也能跑：TheSportsDB 使用預設 public test key，Polymarket Gamma 免金鑰，Kalshi 自動停用。

---

## 一鍵啟動（Docker）

```bash
docker compose up -d        # → http://localhost:3000
docker compose logs -f      # 看日誌
docker compose down         # 停止
```

---

## 推到你的 GitHub（用你自己的帳號）

### 方法 A：使用內建腳本

```bash
gh auth login                              # 第一次先登入
bash push-to-github.sh worldcup-predictor private
#                       ↑repo名稱          ↑private 或 public
```

腳本會 `git init` → commit → 用 gh CLI 建 repo 並推送。`.gitignore` 已排除 `node_modules` 與 `.env`，金鑰不會外洩。

### 方法 B：手動建立 repo

到 GitHub 建一個空 repo，例如：`worldcup-predictor`，然後在本機專案根目錄執行：

```bash
git init
git add .
git commit -m "Initial worldcup predictor platform"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/worldcup-predictor.git
git push -u origin main
```

---

## 等你到辦公室用 Codex 接手

建議流程：

```bash
git clone https://github.com/YOUR_ACCOUNT/worldcup-predictor.git
cd worldcup-predictor
npm install
npm test
npm start
```

接著請 Codex 先讀：

1. `README.md`
2. `docs/CODEX_HANDOFF.md`
3. `AGENTS.md`
4. `src/model.js`
5. `server.js`
6. `public/app.js`

---

## 驗證程式邏輯（不需外部網路）

```bash
npm test
```

會驗證八件事：戰績計算、JSON/逗號陣列解析、Polymarket 勝平負解析、機率正規化、比分矩陣總和、勝平負校準、λ 與 top score、Kalshi RSA-PSS 簽章。成功時會顯示：

```text
8 passed / 0 failed
```

---

## 三個資料源各自的真實狀況

| 來源 | 用途 | 狀態 |
|---|---|---|
| TheSportsDB | 自動帶兩隊近況 | 免費金鑰可用，但通常只回最近數場、可能含友誼賽，國家隊覆蓋不一定齊全，請人工校對。 |
| Polymarket Gamma | 勝平負隱含機率 | 公開免金鑰；後端 fetch 可繞過瀏覽器 CORS。盤口命名多變，目前解析為盡力而為。 |
| Kalshi | 第二市場來源 | 需自備 API 金鑰＋RSA 私鑰；是否有逐場世界盃盤需實測。此 MVP 先回傳市場摘要，尚未完整轉成勝平負。 |

---

## 方法論

- `λ_A = μ × A攻擊力 × B防守弱點 × 主場修正`
- `λ_B = μ × B攻擊力 × A防守弱點`
- 攻擊力 = 該隊場均進球 ÷ `μ`
- 防守弱點 = 該隊場均失球 ÷ `μ`
- 比分矩陣 = `Poisson(λ_A) ⊗ Poisson(λ_B)`
- 低比分以 Dixon-Coles 修正。
- 先計算模型勝平負，再與市場勝平負依權重融合。
- 最後依融合後的勝平負，對比分矩陣的主勝 / 和局 / 客勝區塊重新配重。
- 讀出 top score 作為最可能比分。

---

## 重要限制（誠實）

精確比分本質難測，最可能比分的機率通常只有 8–14% 左右。請把輸出當「比分機率分佈 + 校準後的勝平負」當決策參考，不要當單一定論。資料即時性完全取決於三個來源當下是否有對應盤口與賽果。

---

## 檔案結構

```text
worldcup-predictor/
├── server.js                 # 後端 proxy + 靜態服務
├── public/
│   ├── index.html             # 前端畫面
│   ├── styles.css             # 視覺樣式
│   └── app.js                 # 前端模型與互動
├── src/
│   ├── model.js               # Poisson / Dixon-Coles / 市場校準核心
│   ├── parsers.js             # TheSportsDB / Polymarket 解析
│   └── kalshi.js              # Kalshi RSA-PSS 簽章與 parser
├── test.js                    # 自我測試
├── docs/CODEX_HANDOFF.md      # Codex 接手任務說明
├── AGENTS.md                  # Codex / coding agent 工作規範
├── package.json
├── .env.example
├── Dockerfile
├── docker-compose.yml
└── push-to-github.sh
```
