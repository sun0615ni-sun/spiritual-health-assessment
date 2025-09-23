# 靈性健康檢測系統

一個基於 React + Vite + TailwindCSS 的靈性健康檢測系統，提供完整的問卷評估、報告生成和後台管理功能。

## 功能特色

### 🏠 首頁
- 美觀的漸層背景設計
- 四領域介紹卡片（與自己、他人、自然、超越者的關係）
- 資料使用同意條款
- 響應式設計支援各種裝置

### 📝 問卷系統
- 卡片式問卷介面，支援上下滑動
- 動態進度條顯示完成狀況
- 宗教信仰者/非宗教信仰者題目切換
- 6點量表評分系統
- 流暢的動畫效果

### 👤 基本資料收集
- 完整的個人資訊表單
- 日曆選擇器支援生日和檢測日期
- 下拉選單和單選按鈕
- 即時表單驗證和錯誤提示

### 📊 檢測報告
- **多標籤頁設計**：總覽、四領域、七面向、建議
- **視覺化圖表**：
  - 長條圖顯示四領域分數
  - 雷達圖展示七面向評估
  - 使用 Recharts 圖表庫
- **分數分級**：綠色（高分）、黃色（中分）、紅色（低分）
- **個人化建議**：根據分數提供具體改善建議
- **靈修七原則**：提供靈性成長指導
- **日常實踐建議**：晨間、日間、晚間、週間實踐

### 🔧 後台管理
- 問卷回應資料表格
- 搜尋和篩選功能（姓名、性別、宗教信仰）
- 排序功能（日期、姓名、分數、年齡）
- CSV 匯出功能
- 統計資訊儀表板

### 🎨 設計特色
- **現代化 UI**：使用 shadcn/ui 組件庫
- **動畫效果**：Framer Motion 提供流暢動畫
- **響應式設計**：支援手機、平板、電腦
- **無障礙設計**：符合 WCAG 標準
- **深色模式支援**：自動適應系統主題

## 技術架構

### 前端技術棧
- **React 19** - 現代化前端框架
- **Vite** - 快速建置工具
- **TailwindCSS** - 實用優先的 CSS 框架
- **shadcn/ui** - 高品質 React 組件庫
- **Framer Motion** - 動畫庫
- **Recharts** - React 圖表庫
- **Lucide React** - 圖標庫
- **date-fns** - 日期處理庫

### 開發工具
- **ESLint** - 程式碼品質檢查
- **pnpm** - 高效能套件管理器
- **GitHub Actions** - 自動化部署

## 快速開始

### 環境需求
- Node.js 18+
- pnpm 8+

### 安裝步驟

1. **複製專案**
```bash
git clone https://github.com/your-username/spiritual-health-assessment.git
cd spiritual-health-assessment
```

2. **安裝依賴**
```bash
pnpm install
```

3. **啟動開發伺服器**
```bash
pnpm run dev
```

4. **開啟瀏覽器**
訪問 `http://localhost:5173`

### 建置部署

1. **建置專案**
```bash
pnpm run build
```

2. **預覽建置結果**
```bash
pnpm run preview
```

## GitHub Pages 部署

### 自動部署
專案已配置 GitHub Actions，推送到 `main` 分支時會自動部署到 GitHub Pages。

### 手動部署步驟

1. **啟用 GitHub Pages**
   - 進入 GitHub 專案設定
   - 找到 "Pages" 設定
   - 選擇 "GitHub Actions" 作為來源

2. **推送程式碼**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

3. **訪問網站**
部署完成後可在 `https://your-username.github.io/spiritual-health-assessment/` 訪問

## 專案結構

```
spiritual-health-assessment/
├── public/                 # 靜態資源
├── src/
│   ├── components/        # React 組件
│   │   ├── Home.jsx      # 首頁組件
│   │   ├── Questionnaire.jsx  # 問卷組件
│   │   ├── Profile.jsx   # 基本資料組件
│   │   ├── Report.jsx    # 檢測報告組件
│   │   ├── Admin.jsx     # 後台管理組件
│   │   └── Navigation.jsx # 導航組件
│   ├── components/ui/     # UI 組件庫
│   ├── questions.js       # 問卷題目資料
│   ├── scoring.js         # 評分邏輯
│   ├── App.jsx           # 主應用組件
│   ├── App.css           # 樣式檔案
│   └── main.jsx          # 應用入口
├── .github/workflows/     # GitHub Actions
├── package.json          # 專案配置
├── vite.config.js        # Vite 配置
└── README.md            # 專案說明
```

## 評分系統

### 四領域評估
1. **與自己的關係** - 自我覺察、生命意義、內在平靜
2. **與他人的關係** - 感恩寬恕、愛與同理
3. **與自然的關係** - 謙卑敬畏
4. **與超越者的關係** - 盼望信心

### 七面向分析
- 自我覺察
- 生命意義
- 內在平靜
- 感恩與寬恕
- 愛與同理
- 謙卑與敬畏
- 盼望與信心

### 分數計算
- 使用 6 點量表（1-6 分）
- 自動計算各領域和面向平均分
- 提供百分比和等級評估
- 生成個人化改善建議

## 貢獻指南

歡迎提交 Issue 和 Pull Request 來改善這個專案。

### 開發規範
- 使用 ESLint 進行程式碼檢查
- 遵循 React Hooks 最佳實踐
- 保持組件的單一職責原則
- 編寫清晰的註解和文件

## 授權條款

本專案採用 MIT 授權條款。

## 編制資訊

- **編制者**：孫效智教授
- **編制單位**：臺大生命教育研發育成中心暨為愛前行基金會
- **技術實現**：Manus AI

## 聯絡資訊

如有任何問題或建議，請透過 GitHub Issues 聯絡我們。
