import type { BlogPost } from "../_lib/types";

export const blogPosts = [
  {
    slug: "nextjs-app-router-notes",
    title: "我如何整理 Next.js App Router 的專案邊界",
    summary:
      "從 route、feature 到 shared layer，記錄一套讓小型專案不會太早抽象、長大後也不至於失控的目錄策略。",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    category: "Frontend",
    tags: ["Next.js", "React", "TypeScript"],
    publishedAt: "2026-08-28",
    readingMinutes: 8,
    sections: [
      {
        id: "start-from-boundaries",
        heading: "先從邊界，而不是資料夾名稱開始",
        paragraphs: [
          "App Router 很容易讓人把每個元件都放進 route 目錄，直到某個功能開始跨頁共用，才發現依賴方向已經變得模糊。我的做法是先問：這段程式碼屬於頁面、功能，還是整個產品？",
          "頁面負責組合，feature 負責一段可描述的使用者能力，shared 則只留下沒有產品語意的基礎工具。這三個答案通常已足以決定位置。",
        ],
      },
      {
        id: "keep-routes-thin",
        heading: "讓 route 保持薄而清楚",
        paragraphs: [
          "route 檔案應該讓讀者在短時間內看見資料從哪裡來、主要區塊如何組合，以及頁面 metadata 如何產生。真正的篩選與呈現規則則留在 feature 內。",
        ],
        code: {
          language: "tsx",
          filename: "app/blog/page.tsx",
          code: `export default function BlogPage() {
  return <BlogExplorer posts={blogPosts} />;
}`,
        },
      },
      {
        id: "wait-for-repetition",
        heading: "等重複真的發生再抽象",
        paragraphs: [
          "相似不等於相同。兩張看起來接近的卡片，如果服務不同閱讀情境，太早共用往往會堆出大量條件。先保留清楚的重複，等共同介面自然浮現，再抽出真正穩定的部分。",
        ],
      },
    ],
  },
  {
    slug: "accessible-interface-checklist",
    title: "把可及性變成前端交付前的固定檢查",
    summary:
      "不用等到正式稽核，從語意、鍵盤、焦點到對比，先建立一份每次都能重複執行的前端檢查清單。",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    category: "Frontend",
    tags: ["Accessibility", "CSS", "UX"],
    publishedAt: "2026-08-14",
    readingMinutes: 6,
    sections: [
      {
        id: "semantics-first",
        heading: "先使用正確的 HTML",
        paragraphs: [
          "可點擊的行為應由 button 或 link 承擔，標題層級也要反映內容結構。語意正確時，鍵盤操作與螢幕閱讀器通常已經完成了一大半。",
        ],
      },
      {
        id: "keyboard-pass",
        heading: "做一次完全不碰滑鼠的巡覽",
        paragraphs: [
          "從網址列開始按 Tab，確認每個操作都能到達、焦點順序符合閱讀順序，而且固定導覽不會遮住目前的焦點。",
        ],
        bullets: [
          "焦點樣式清楚可見",
          "互動不只依賴 hover",
          "選取狀態有文字或語意提示",
        ],
      },
      {
        id: "contrast-and-scale",
        heading: "把低對比美學留給非必要裝飾",
        paragraphs: [
          "深色介面可以安靜，但正文與控制標籤仍要保持足夠對比。放大到 200% 時，資訊也不應被截斷或被迫水平捲動。",
        ],
      },
    ],
  },
  {
    slug: "express-service-boundaries",
    title: "Express API 的薄 Controller 與 Service 邊界",
    summary:
      "以文章發布流程為例，拆解驗證、授權、商業規則與資料存取應該各自放在哪一層。",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    category: "Backend",
    tags: ["Express", "TypeScript", "API"],
    publishedAt: "2026-07-30",
    readingMinutes: 9,
    sections: [
      {
        id: "controller-contract",
        heading: "Controller 只翻譯 HTTP 世界",
        paragraphs: [
          "Controller 接受請求、呼叫服務，再把結果映射成狀態碼與回應格式。它不應知道資料表欄位，也不負責決定草稿是否能被公開。",
        ],
      },
      {
        id: "service-rules",
        heading: "Service 表達產品規則",
        paragraphs: [
          "發布文章需要完整標題、唯一 slug 與有效內容，這些規則即使未來換成背景工作或 CLI 入口也不會消失，因此屬於 service。",
        ],
        code: {
          language: "ts",
          filename: "postService.ts",
          code: `export async function publishPost(input: PublishInput) {
  const post = validatePublishInput(input);
  return postRepository.publish(post);
}`,
        },
      },
      {
        id: "test-public-behavior",
        heading: "從公開行為寫測試",
        paragraphs: [
          "測試應確認草稿無法從公開端點取得、無效 slug 會被拒絕，以及管理者發布後能得到一致回應，而不是綁死內部呼叫次數。",
        ],
      },
    ],
  },
  {
    slug: "supabase-rls-first",
    title: "先寫 RLS，再開始串 Supabase 資料",
    summary:
      "把 Row Level Security 當成資料模型的一部分，避免前端便利性在不知不覺間變成公開權限。",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    category: "Backend",
    tags: ["Supabase", "PostgreSQL", "Security"],
    publishedAt: "2026-07-12",
    readingMinutes: 7,
    sections: [
      {
        id: "deny-by-default",
        heading: "從預設拒絕開始",
        paragraphs: [
          "啟用 RLS 後，先確認匿名與登入使用者都無法讀寫，再逐條加入產品真正需要的政策。這比先全面開放、最後再補權限更容易驗證。",
        ],
      },
      {
        id: "public-post-policy",
        heading: "公開端只看得到已發布文章",
        paragraphs: [
          "公開讀取條件應直接落在資料層。即使 API 某次重構漏掉狀態判斷，草稿仍不會因單一應用程式錯誤而外洩。",
        ],
        code: {
          language: "sql",
          filename: "posts_select_policy.sql",
          code: `create policy "published posts are public"
on public.posts for select
using (status = 'published');`,
        },
      },
      {
        id: "verify-with-roles",
        heading: "用不同角色實際驗證",
        paragraphs: [
          "至少分別以匿名、一般登入者與伺服器端角色測試讀寫結果，並把預期拒絕也視為成功案例的一部分。",
        ],
      },
    ],
  },
  {
    slug: "container-deploy-checklist",
    title: "小型服務的 Container 部署前清單",
    summary:
      "從映像檔大小、環境變數到健康檢查，整理一份個人專案也值得遵守的部署前確認流程。",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=80",
    category: "DevOps",
    tags: ["Docker", "Deployment", "CI"],
    publishedAt: "2026-06-24",
    readingMinutes: 5,
    sections: [
      {
        id: "repeatable-build",
        heading: "先確保建置可重現",
        paragraphs: [
          "鎖定套件版本、固定基底映像版本，並讓正式建置不依賴開發機上的隱藏檔案。容器的價值首先是提供可重現的邊界。",
        ],
      },
      {
        id: "runtime-contract",
        heading: "把執行條件寫成契約",
        paragraphs: [
          "列出必要環境變數、暴露連接埠、啟動指令與健康檢查。缺少必要值時應在啟動階段明確失敗，而不是等第一個請求才發現。",
        ],
        bullets: [
          "非 root 使用者執行",
          "健康檢查反映實際依賴",
          "敏感值不寫入 image layer",
        ],
      },
      {
        id: "rollback",
        heading: "在部署前先知道怎麼退回",
        paragraphs: [
          "保留可識別的映像標籤與上一個穩定版本，並把回滾步驟寫進部署流程。能部署不等於能安全發布。",
        ],
      },
    ],
  },
  {
    slug: "logs-that-answer-questions",
    title: "讓 Log 回答問題，而不只是留下文字",
    summary:
      "從請求識別碼、結構化欄位與事件命名開始，讓小型 API 的紀錄也能支援真正的除錯。",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
    category: "DevOps",
    tags: ["Observability", "Logging", "API"],
    publishedAt: "2026-06-05",
    readingMinutes: 6,
    sections: [
      {
        id: "questions-first",
        heading: "先列出出事時會問的問題",
        paragraphs: [
          "某次請求經過哪些服務、花了多久、由誰發起、最後在哪一步失敗？Log 欄位應該從這些問題反推，而不是把整個物件隨手印出來。",
        ],
      },
      {
        id: "structured-events",
        heading: "使用穩定的結構化事件",
        paragraphs: [
          "每筆事件保留一致的 event name、request id、duration 與結果，動態內容放在欄位值而不是訊息字串裡，搜尋與聚合才不會依賴模糊比對。",
        ],
        code: {
          language: "json",
          filename: "request.completed.json",
          code: `{
  "event": "request.completed",
  "requestId": "req_01J...",
  "durationMs": 84,
  "status": 200
}`,
        },
      },
      {
        id: "privacy-boundary",
        heading: "紀錄之前先定義隱私邊界",
        paragraphs: [
          "密碼、token、完整 cookie 與個人資料不應進入 Log。可觀測性必須幫助除錯，但不能創造新的敏感資料副本。",
        ],
      },
    ],
  },
] as const satisfies readonly BlogPost[];
