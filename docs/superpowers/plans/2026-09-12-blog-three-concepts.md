# Blog Three Concepts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build three selectable static Blog list and article-detail designs that share hardcoded Traditional Chinese content and the site's existing terminal/glass identity.

**Architecture:** Keep content and filter logic in a small Blog feature module, then render it through three isolated presentation components selected by a `design` query parameter. Use App Router server pages for metadata and slug validation, with a focused client component only for version/filter state.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Bun test, Lucide React

**Spec:** `docs/superpowers/specs/2026-09-12-blog-three-concepts-design.md`

## Global Constraints

- All visible content is hardcoded Traditional Chinese data; no API, Supabase, backend, loading state, or persistence.
- Preserve the current dark terminal/glass brand, global Header, Footer, and video background.
- Add no entrance, scroll, or page-transition animation.
- Support 375px, 768px, 1024px, and 1440px layouts without horizontal scrolling.
- Use semantic controls, visible focus, 44px targets, and readable long-form line length.

---

### Task 1: Blog domain data and filters

**Files:**

- Create: `frontend/src/app/blog/blog-data.ts`
- Create: `frontend/src/app/blog/blog-data.test.ts`

**Interfaces:**

- Produces: `BlogPost`, `BlogSection`, `BlogDesign`, `blogPosts`, `blogDesigns`, `getPostBySlug(slug)`, and `filterPosts(posts, category, tag)`.

- [ ] **Step 1: Write failing tests** for unique slugs, known/unknown slug lookup, category filtering, tag filtering, and combined filtering using `bun:test`.
- [ ] **Step 2: Run `bun test frontend/src/app/blog/blog-data.test.ts`** and confirm failure because `blog-data.ts` is missing.
- [ ] **Step 3: Implement typed hardcoded data** with six posts, three categories, multiple tags, content sections, and deterministic filter helpers.
- [ ] **Step 4: Re-run the focused test** and confirm all cases pass.

### Task 2: Shared prototype navigation and list route

**Files:**

- Create: `frontend/src/app/blog/page.tsx`
- Create: `frontend/src/app/blog/BlogExplorer.tsx`
- Create: `frontend/src/app/blog/components/DesignSwitcher.tsx`
- Create: `frontend/src/app/blog/components/BlogControls.tsx`

**Interfaces:**

- Consumes: Task 1 data and filters.
- Produces: `/blog?design=editorial|terminal|archive`, URL-preserving article links, and accessible client-side category/tag filters.

- [ ] **Step 1: Add a failing test** proving every supported design key maps to a valid label and every generated article href contains its slug and selected design.
- [ ] **Step 2: Run the focused test** and confirm the missing href helper causes the expected failure.
- [ ] **Step 3: Implement static page metadata, the design switcher, filter controls, and state orchestration**; unsupported design values fall back to `editorial`.
- [ ] **Step 4: Re-run Blog tests** and confirm they pass.

### Task 3: Three Blog list presentations

**Files:**

- Create: `frontend/src/app/blog/components/EditorialList.tsx`
- Create: `frontend/src/app/blog/components/TerminalList.tsx`
- Create: `frontend/src/app/blog/components/ArchiveList.tsx`

**Interfaces:**

- Consumes: filtered `BlogPost[]`, selected `BlogDesign`, and the shared href helper.
- Produces: three responsive, visually distinct lists with the same semantic heading and article-link structure.

- [ ] **Step 1: Extend the Blog tests** to assert all six posts have the title, summary, category, tag, date, and reading-time fields required by every view.
- [ ] **Step 2: Run tests** and confirm the new completeness assertions fail until all fixtures are complete.
- [ ] **Step 3: Implement Editorial, Terminal Index, and Knowledge Archive layouts** with static search/pagination preview states and a shared empty-state reset.
- [ ] **Step 4: Run Blog tests and ESLint**; resolve only errors introduced by these components.

### Task 4: Three article reading presentations

**Files:**

- Create: `frontend/src/app/blog/[slug]/page.tsx`
- Create: `frontend/src/app/blog/components/ArticleShell.tsx`
- Create: `frontend/src/app/blog/components/EditorialArticle.tsx`
- Create: `frontend/src/app/blog/components/TerminalArticle.tsx`
- Create: `frontend/src/app/blog/components/ArchiveArticle.tsx`

**Interfaces:**

- Consumes: slug lookup, selected design, and structured hardcoded article sections.
- Produces: static metadata via `generateMetadata`, `notFound()` for unknown slugs, same-design back navigation, and three accessible long-form layouts.

- [ ] **Step 1: Add failing content tests** for non-empty article sections, unique heading IDs, and at least one code block fixture.
- [ ] **Step 2: Run the focused test** and confirm incomplete content is reported.
- [ ] **Step 3: Implement the dynamic route and three article layouts** including breadcrumbs/back link, metadata, article prose, code blocks, tags, and related-post navigation.
- [ ] **Step 4: Re-run Blog tests and ESLint** and fix route typing or semantic issues.

### Task 5: Visual tokens and full verification

**Files:**

- Modify: `frontend/src/app/globals.css`

**Interfaces:**

- Produces: Blog-specific semantic surface, border, focus, and typography utilities without changing existing page appearance.

- [ ] **Step 1: Add scoped Blog CSS** only where Tailwind utilities cannot express prose rhythm, terminal grid decoration, or focus-visible consistency cleanly.
- [ ] **Step 2: Run `bun test frontend/src/app/blog/blog-data.test.ts` and `bun run lint`** and confirm zero failures/errors.
- [ ] **Step 3: Run `bun run build:frontend`** and confirm all Blog routes compile and prerender as expected.
- [ ] **Step 4: Inspect the final diff** for backend/API changes, unintended global design changes, animation additions, and user-owned-file overlap; remove any out-of-scope edits.
