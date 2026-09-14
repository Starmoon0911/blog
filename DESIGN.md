# Frontend Design Reference

> 本文件由 `frontend/src` 與 `frontend/public` 現有程式碼萃取，描述「目前實作」而非尚未確認的品牌規範。最後更新：2026-09-12。

## 設計方向

個人技術作品集／Blog 採用深色終端機（terminal）與低對比玻璃擬態（glassmorphism）語彙：全螢幕模糊影片作為背景，前景以白色低透明度的邊框與面板建立層次。整體感受偏安靜、實驗性與開發者文化，而非高飽和或商業化介面。

終端機辨識元素包含：等寬字、`wei0911@blog:~$` 提示符、指令逐字輸入動畫、樹狀選單符號（`├─`／`└─`）、編號章節及游標閃爍。

## 色彩

### 基底與文字

| 用途                 | 現行 Token / 實作               | 色值／透明度          |
| -------------------- | ------------------------------- | --------------------- |
| 預設淺色背景、前景   | `--background` / `--foreground` | `#ffffff` / `#171717` |
| 系統深色背景、前景   | `prefers-color-scheme: dark`    | `#0a0a0a` / `#ededed` |
| 實際介面主要文字     | `white`                         | `#ffffff`             |
| 主要正文             | `zinc-200`、`zinc-300`          | `#e4e4e7`、`#d4d4d8`  |
| 次要文字／導覽       | `zinc-400`                      | `#a1a1aa`             |
| 輔助資訊／編號       | `zinc-500`、`zinc-600`          | `#71717a`、`#52525b`  |
| 強調標題、時間軸節點 | `zinc-100`                      | `#f4f4f5`             |

### 表面、邊框與層次

| 用途         | 實作                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------- |
| 全頁背景遮罩 | 影片上加 `bg-black/30`，使影像退居背景。                                                            |
| 玻璃面板     | `bg-white/[0.02]`，搭配 `backdrop-blur-2xl` 與 `shadow-2xl`。用於登入卡、Dashboard 側欄與內容面板。 |
| 卡片         | `bg-white/[0.015]`；懸停提高至 `bg-white/[0.04]`。                                                  |
| 輸入欄位     | `bg-white/[0.03]`；hover / focus 依序至 `0.05` / `0.06`。登入頁則採 `bg-black/20`。                 |
| 預設邊框     | `border-white/10`；較明顯分隔使用 `white/15`，hover / focus 至 `white/20`。                         |
| 頁面裝飾字   | `text-white/[0.035]`，只做背景層次，不承擔內容。                                                    |

### 功能性點綴色

| 語意               | Token                              | 使用位置                             |
| ------------------ | ---------------------------------- | ------------------------------------ |
| 主要互動／登入焦點 | `cyan-500`、`cyan-400`、`cyan-300` | Login 標題符號、按鈕、輸入框 focus。 |
| 終端機使用者名稱   | `green-400`                        | `TerminalLogo`。                     |
| 終端機主機名稱     | `blue-400`                         | `TerminalLogo`。                     |
| 危險操作           | `red-400`（背景 `red-500/10`）     | Logout hover。                       |

除登入表單外，大多數元件以中性色維持一致；cyan 是局部、功能導向的主色，不是全站普遍 CTA 色。

## 字體與排版

- 全域 `body` 指定 `Arial, Helvetica, sans-serif`。同時載入 `Geist`、`Geist Mono`，並提供 `--font-geist-sans`、`--font-geist-mono` 給 Tailwind theme；實際的 `font-sans` / `font-mono` 使用前者兩個變數。
- `font-mono` 用於導覽、metadata、表單、終端機與小型 UI，強化技術感；常用 `12–16px`（`text-xs`、`text-sm`）。
- `font-serif` 用於內容標題、時間軸標題與興趣項目；大標的斜體副句營造較有人味的反差。程式碼沒有指定 serif 字型家族，因此目前落到 Tailwind／瀏覽器預設 serif stack。
- Hero 標題為 `text-3xl`（30px）；About 主標題為 `text-5xl`、`md:text-7xl`、`lg:text-8xl`（48 / 72 / 96px），並採緊行高 `0.95` 與負字距。
- 章節標題採 20px serif medium italic；章節編號為 10px mono、寬字距 `0.18em`。
- 內文普遍 14px、行高 28px（`leading-7`）；在中型螢幕以上部分升到 16px，符合長文閱讀需求。

## 版面與間距

- 內容最大寬：主內容 `max-w-5xl`（約 1024px），Header / Footer / Dashboard `max-w-6xl`（約 1152px）。
- 水平 gutter：大多使用 `px-6`（24px）；Header 在最小螢幕為 `px-4`（16px）。
- Hero 佔滿至少一個視窗高度並置中；頭像固定 160px 圓形，名稱與位置資訊垂直堆疊。
- About 使用六段式敘事（About、Education、Experience、Stack、Interests、Posts）。非減少動態模式下，其外層高度為 `650svh`，內部 sticky 鎖定一個視窗並隨捲動轉場；`prefers-reduced-motion` 時轉為一般垂直內容，段落間距為 96px / 128px。
- Stack 以 2 / 3 / 5 欄網格在預設、`sm`、`md` 斷點擴展；Experience 在 `md` 以上改為時間軸三欄（24px / 160px / 內容）。
- Dashboard 預設單欄，`md` 以上成側欄（224px）＋內容面板的橫向編排。

## 元件形狀與狀態

- 面板與主要表單圓角為 `rounded-2xl`（16px）；輸入、按鈕、側欄項目通常為 `rounded-xl`（12px）；登入欄位為 `rounded-lg`（8px）。
- Header 固定於頂部。滑動超過 10px 後，轉成較緊湊的半透明黑色玻璃膠囊；向下滑隱藏、向上滑顯示。
- 桌面導覽以白色 1px 底線表示 active / hover；行動版用展開的玻璃選單與逐項 40ms 延遲。
- 卡片與文字 hover 以「稍提高亮度／邊框可見度」為主，不使用強烈換色。Stack 卡 icon 會放大，文章箭頭會右移。
- 登入按鈕為 cyan 邊框與低透明背景；一般儲存按鈕則是中性白色玻璃按鈕，帶向上位移、縮放與掃光效果。
- 動畫由 Motion 實作：登入淡入上移 12px（0.5s）、內容區淡入上移 10px（0.35s）、按鈕使用高剛性 spring（stiffness 400）。一般 CSS 轉場多為 200–300ms，Header 與捲動提示最長 500–700ms。
- 已尊重 `prefers-reduced-motion`：About 的 scroll-driven 故事轉場會切換為靜態長頁；其他 motion 動畫目前未見統一的 reduced-motion fallback。

## 圖像、圖示與背景

- `avatar.jpg` 是 Hero 的唯一人物視覺，圓形裁切、1px 低對比白色 ring。
- `videos/background.mp4` 為全站固定背景，`object-cover`、放大 5%、`blur-md`，再疊黑色 30% 遮罩；因此文字與玻璃面板不依賴影片內容本身的可讀性。
- 圖示來自 Lucide，常用 1.5px stroke、18–28px；社群圖示則為 inline SVG，與文字同色（`currentColor`）。

## 響應式與可及性既況

- 主要斷點使用 Tailwind 預設 `sm`（640px）、`md`（768px）、`lg`（1024px）。
- 小螢幕隱藏桌面導覽、顯示有 `aria-label` 和 `aria-expanded` 的 menu button；行動版選單保留完整導覽項目。
- 外連結均有 `target="_blank"` 與 `rel="noopener noreferrer"`；裝飾背景與進度條以 `aria-hidden` 排除。
- About 在動畫版另外提供 sr-only 的章節 heading，避免純視覺層切換損害文件結構。

## 已知實作差異與待確認事項

以下問題無法僅由程式碼判定，建議確認後把結論回填本文件：

1. 網站是否應該支援淺色主題？`globals.css` 有系統淺／深色 token，且存在 `ThemeContext`，但它沒有被掛入 root layout，畫面元件也全面假設深色背景；目前應視為深色優先實作。
2. `font-serif` 是否有指定的品牌字型？目前沒有載入對應字體，跨作業系統的外觀會不同。
3. cyan 是否要成為全站唯一的 primary action 色？目前它只在登入流程出現，Dashboard 的儲存操作使用中性白色。
4. 背景影片是否為品牌體驗的必要條件？若是，應定義靜態 fallback、壓縮預算與影片載入失敗時的背景色；現有程式碼未提供 fallback。
5. `/blog` 與 `/projects` 已在導覽中，但此程式碼庫目前沒有對應 routes；它們的頁面設計規則尚無法提取。
