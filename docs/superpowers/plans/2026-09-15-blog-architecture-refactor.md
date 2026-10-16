# Blog Architecture Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the existing public Blog into a route-colocated, server-first feature whose list sends only post metadata, whose tag state is represented by the URL, and whose current editorial/glass presentation remains intact.

**Architecture:** Keep App Router files as thin composition boundaries and colocate private Blog content, repository functions, formatting utilities, and components under `frontend/src/app/blog`. Separate `PostMeta` from full `BlogPost`, render the index with Server Components, and use Next.js links plus `searchParams` instead of local React filter state.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Bun test, Lucide React, existing shadcn-style `Card` and `Badge` primitives

**Spec:** `docs/superpowers/specs/2026-09-15-blog-architecture-refactor-design.md`

## Global Constraints

- Preserve the current Blog editorial/glass visual direction, six Traditional Chinese articles, article order, slugs, summaries, images, categories, tags, publication dates, reading times, sections, bullets, and code samples.
- Keep Blog implementation route-colocated under `frontend/src/app/blog`; do not move it to a global feature directory.
- The final architecture uses Server Components by default; no final Blog presentation component may require `useState`, `useMemo`, `useEffect`, or Framer Motion. Task 1 may retain the existing unchanged Client Component temporarily through its compatibility facade until Task 2 removes it.
- Tag filtering is represented as `/blog?tag=<encoded tag>` and unknown tags render the recoverable empty state.
- Introduce no new runtime dependency and do not change Header, Footer, background, authentication, Dashboard, backend, Supabase, global image optimization, or the article authoring format beyond splitting the existing TypeScript data.
- Preserve visible focus, semantic headings and links, a minimum 44px tag target, mobile-first layout, and the current readable article measure.
- Use test-driven development: every behavior change begins with a failing test whose failure is observed before production code changes.
- Preserve unrelated user changes, especially the pre-existing `bun.lock` modifications; stage and commit only task-owned paths.

---

### Task 1: Split the Blog domain, content, repository, and formatting boundaries

**Files:**

- Create: `frontend/src/app/blog/_lib/types.ts`
- Create: `frontend/src/app/blog/_lib/format.ts`
- Create: `frontend/src/app/blog/_lib/repository.ts`
- Create: `frontend/src/app/blog/_content/posts.ts`
- Create: `frontend/src/app/blog/_content/post-index.ts`
- Modify: `frontend/src/app/blog/blog-data.test.ts`
- Modify: `frontend/src/app/blog/blog-data.ts`
- Modify: `frontend/src/app/blog/components/EditorialArticle.tsx`
- Modify: `frontend/src/app/blog/components/ArticleParts.tsx`
- Modify: `frontend/src/app/blog/[slug]/page.tsx`

**Interfaces:**

- Produces: `PostMeta`, `BlogPost`, `BlogSection`, and `BlogCodeBlock` from `_lib/types.ts`.
- Produces: `formatPublishedDate(publishedAt: string): string`, `formatReadingTime(minutes: number): string`, `buildBlogHref(slug: string): string`, and `buildTagHref(tag: string): string` from `_lib/format.ts`.
- Produces: `listPostMeta()`, `listTags()`, `filterPostMeta(posts, tag)`, `getPostBySlug(slug)`, and `getAdjacentPosts(slug)` from `_lib/repository.ts`.
- Produces: `blogPosts: readonly BlogPost[]` from `_content/posts.ts` and `postIndex: readonly PostMeta[]` from `_content/post-index.ts`.
- Keeps `blog-data.ts` as a temporary compatibility facade for the still-unmigrated index components; Task 2 removes that facade.

- [ ] **Step 1: Add failing domain-boundary tests**

Replace the imports in `blog-data.test.ts` with the new desired modules and add focused tests for metadata isolation, deterministic formatting, encoded tag links, tag ordering, and unknown tags:

```ts
import { postIndex } from "./_content/post-index";
import { blogPosts } from "./_content/posts";
import {
  buildBlogHref,
  buildTagHref,
  formatPublishedDate,
  formatReadingTime,
} from "./_lib/format";
import {
  filterPostMeta,
  getAdjacentPosts,
  getPostBySlug,
  listPostMeta,
  listTags,
} from "./_lib/repository";

test("keeps full article sections out of list metadata", () => {
  expect(listPostMeta()).toEqual(postIndex);
  expect(listPostMeta().every((post) => !("sections" in post))).toBe(true);
});

test("formats publication and reading labels from canonical values", () => {
  expect(formatPublishedDate("2026-08-28")).toBe("2026.08.28");
  expect(formatReadingTime(8)).toBe("8 分鐘閱讀");
});

test("builds canonical and encoded Blog links", () => {
  expect(buildBlogHref("nextjs-app-router-notes")).toBe(
    "/blog/nextjs-app-router-notes",
  );
  expect(buildTagHref("Next.js & React")).toBe(
    "/blog?tag=Next.js%20%26%20React",
  );
});

test("returns stable first-seen tag ordering", () => {
  expect(listTags().slice(0, 4)).toEqual([
    "Next.js",
    "React",
    "TypeScript",
    "Accessibility",
  ]);
});

test("returns no metadata for an unknown tag", () => {
  expect(filterPostMeta(listPostMeta(), "missing-tag")).toEqual([]);
});
```

Retain and adapt the existing unique-slug, known/unknown lookup, content completeness, unique-anchor, code-content, and adjacent-post assertions. Remove category-filter and editorial-lead tests because those behaviors are not part of the approved interface.

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
bun test frontend/src/app/blog/blog-data.test.ts
```

Expected: FAIL because `_content/post-index`, `_content/posts`, `_lib/format`, and `_lib/repository` do not exist.

- [ ] **Step 3: Define the separated data types**

Create `_lib/types.ts` with this exact shape:

```ts
export const blogCategories = ["Frontend", "Backend", "DevOps"] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogCodeBlock = {
  language: string;
  filename: string;
  code: string;
};

export type BlogSection = {
  id: string;
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  code?: BlogCodeBlock;
};

export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  category: BlogCategory;
  tags: readonly string[];
  publishedAt: string;
  readingMinutes: number;
};

export type BlogPost = PostMeta & {
  sections: readonly BlogSection[];
};
```

- [ ] **Step 4: Move the six existing articles into `_content/posts.ts`**

Move the complete array currently exported from `blog-data.ts` lines 43–316 into `_content/posts.ts`. Add `import type { BlogPost } from "../_lib/types";`, name the export `blogPosts`, and terminate it with `as const satisfies readonly BlogPost[]`. Preserve the six objects in their current order. From every object remove exactly `kicker`, `author`, `publishedLabel`, and `featured`; retain every `slug`, `title`, `summary`, `image`, `category`, `tags`, `publishedAt`, `readingMinutes`, `sections`, `paragraphs`, `bullets`, and `code` value byte-for-byte except for Prettier formatting.

- [ ] **Step 5: Create the metadata index and formatting helpers**

Create `_content/post-index.ts` without `sections`:

```ts
import { blogPosts } from "./posts";
import type { PostMeta } from "../_lib/types";

export const postIndex: readonly PostMeta[] = blogPosts.map(
  ({ sections: _sections, ...meta }) => meta,
);
```

Create `_lib/format.ts`:

```ts
const publishedDateFormatter = new Intl.DateTimeFormat("zh-TW", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "UTC",
});

export function formatPublishedDate(publishedAt: string) {
  return publishedDateFormatter
    .format(new Date(`${publishedAt}T00:00:00Z`))
    .replaceAll("/", ".");
}

export function formatReadingTime(minutes: number) {
  return `${minutes} 分鐘閱讀`;
}

export function buildBlogHref(slug: string) {
  return `/blog/${slug}`;
}

export function buildTagHref(tag: string) {
  return `/blog?tag=${encodeURIComponent(tag)}`;
}
```

- [ ] **Step 6: Implement repository operations**

Create `_lib/repository.ts`:

```ts
import { postIndex } from "../_content/post-index";
import { blogPosts } from "../_content/posts";
import type { PostMeta } from "./types";

export function listPostMeta() {
  return postIndex;
}

export function listTags() {
  return Array.from(new Set(postIndex.flatMap((post) => post.tags)));
}

export function filterPostMeta(posts: readonly PostMeta[], tag: string | null) {
  return tag ? posts.filter((post) => post.tags.includes(tag)) : posts;
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const index = postIndex.findIndex((post) => post.slug === slug);

  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: index > 0 ? postIndex[index - 1] : undefined,
    next: index < postIndex.length - 1 ? postIndex[index + 1] : undefined,
  };
}
```

- [ ] **Step 7: Migrate article consumers and add a temporary facade**

Update the article route and components to import types, repository operations, and formatting helpers from their new modules. Render `formatPublishedDate(post.publishedAt)` and `formatReadingTime(post.readingMinutes)` instead of removed display fields.

Replace `blog-data.ts` with a compatibility facade that re-exports the new domain while preserving only the old `filterPosts(posts, category, tag)` signature needed by `BlogExplorer` until Task 2:

```ts
export { blogPosts } from "./_content/posts";
export { buildBlogHref } from "./_lib/format";
export { getAdjacentPosts, getPostBySlug } from "./_lib/repository";
export { blogCategories } from "./_lib/types";
export type {
  BlogCategory,
  BlogCodeBlock,
  BlogPost,
  BlogSection,
  PostMeta,
} from "./_lib/types";

import type { BlogCategory, BlogPost } from "./_lib/types";

export function filterPosts(
  posts: readonly BlogPost[],
  category: BlogCategory | null,
  tag: string | null,
) {
  return posts.filter(
    (post) =>
      (!category || post.category === category) &&
      (!tag || post.tags.includes(tag)),
  );
}
```

- [ ] **Step 8: Verify GREEN and commit**

Run:

```bash
bun test frontend/src/app/blog/blog-data.test.ts
bun test frontend/src/app/blog
bun run lint
```

Expected: all Blog tests pass; ESLint exits 0, with no new Blog warning.

Commit only Task 1 paths:

```bash
git add frontend/src/app/blog/_content frontend/src/app/blog/_lib frontend/src/app/blog/blog-data.ts frontend/src/app/blog/blog-data.test.ts frontend/src/app/blog/components/EditorialArticle.tsx frontend/src/app/blog/components/ArticleParts.tsx 'frontend/src/app/blog/[slug]/page.tsx'
git commit -m "refactor: separate blog content and domain"
```

---

### Task 2: Make the Blog index server-rendered and URL-driven

**Files:**

- Create: `frontend/src/app/blog/_components/BlogHeader.tsx`
- Create: `frontend/src/app/blog/_components/TagFilter.tsx`
- Create: `frontend/src/app/blog/_components/PostGrid.tsx`
- Create: `frontend/src/app/blog/_components/PostCard.tsx`
- Create: `frontend/src/app/blog/_components/EmptyState.tsx`
- Modify: `frontend/src/app/blog/page.tsx`
- Create: `frontend/src/app/blog/_components/blog-components.test.tsx`
- Delete: `frontend/src/app/blog/BlogExplorer.tsx`
- Delete: `frontend/src/app/blog/components/BlogTags.tsx`
- Delete: `frontend/src/app/blog/components/EditorialList.tsx`
- Delete: `frontend/src/app/blog/components/ListStates.tsx`
- Delete: `frontend/src/app/blog/components/BlogControls.tsx`
- Delete: `frontend/src/app/blog/components/blog-components.test.tsx`
- Delete: `frontend/src/app/blog/blog-data.ts`
- Delete: `frontend/src/components/ui/glass-blog-card-shadcnui.tsx`

**Interfaces:**

- Consumes: Task 1 `PostMeta`, repository operations, formatting helpers, `Card`, `Badge`, and `cn`.
- Produces: `TagFilter({ tags, selectedTag })`, `PostCard({ post })`, `PostGrid({ posts })`, and URL-query tag rendering with no Blog Client Component.
- Produces: `BlogPage({ searchParams }: { searchParams: Promise<{ tag?: string | string[] }> })`.

- [ ] **Step 1: Replace list-component tests with failing server-first behavior tests**

Move `components/blog-components.test.tsx` to `_components/blog-components.test.tsx`, update it to import the new components and repository, and add these assertions while retaining card content coverage:

```tsx
test("renders tag filters as deep links with selected state", () => {
  const markup = renderToStaticMarkup(
    <TagFilter tags={["React", "Next.js & React"]} selectedTag="React" />,
  );

  expect(markup).toContain('href="/blog"');
  expect(markup).toContain('href="/blog?tag=React"');
  expect(markup).toContain('href="/blog?tag=Next.js%20%26%20React"');
  expect(markup).toContain('aria-current="page"');
});

test("renders an empty result with a recoverable all-posts link", () => {
  const markup = renderToStaticMarkup(<PostGrid posts={[]} />);

  expect(markup).toContain("沒有符合的文章");
  expect(markup).toContain('href="/blog"');
});

test("renders required post data without client-only motion markup", () => {
  const markup = renderToStaticMarkup(<PostGrid posts={listPostMeta()} />);

  for (const post of listPostMeta()) {
    expect(markup).toContain(`href="${buildBlogHref(post.slug)}"`);
    expect(markup).toContain(`alt="${post.title}"`);
    expect(markup).toContain(formatPublishedDate(post.publishedAt));
    expect(markup).toContain(formatReadingTime(post.readingMinutes));
  }

  expect(markup).not.toContain("The Future of UI Design");
  expect(markup).not.toContain("transform:translateY");
});
```

- [ ] **Step 2: Run the component test and verify RED**

Run:

```bash
bun test frontend/src/app/blog/_components/blog-components.test.tsx
```

Expected: FAIL because the `_components` modules do not exist.

- [ ] **Step 3: Build the route-private Server Components**

Move the existing visual markup into the new files without changing the card/grid/rail visual direction. Apply these required structural changes:

- `BlogHeader` owns only the labelled “文章” heading section.
- `TagFilter` uses `Link`, `buildTagHref`, `aria-current`, and `min-h-11`; its all-posts link points to `/blog`.
- `PostCard` accepts one required `post: PostMeta`, uses existing `Card`, `Badge`, `cn`, `Image`, `Link`, `BookOpen`, and `Clock`, and contains no defaults, hooks, `motion`, or `"use client"`.
- `PostGrid` maps `PostMeta[]` to `PostCard`; an empty array renders `EmptyState`.
- `EmptyState` uses a semantic `Link href="/blog"` instead of an event callback.

- [ ] **Step 4: Replace `BlogExplorer` with server route composition**

Implement `page.tsx` with this data flow:

```tsx
import type { Metadata } from "next";

import BlogHeader from "./_components/BlogHeader";
import PostGrid from "./_components/PostGrid";
import TagFilter from "./_components/TagFilter";
import { filterPostMeta, listPostMeta, listTags } from "./_lib/repository";

export const metadata: Metadata = {
  title: "Blog",
  description: "wei0911 的技術文章與工程筆記。",
};

type BlogPageProps = {
  searchParams: Promise<{ tag?: string | string[] }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag: rawTag } = await searchParams;
  const selectedTag = typeof rawTag === "string" ? rawTag : null;
  const posts = filterPostMeta(listPostMeta(), selectedTag);
  const tags = listTags();

  return (
    <main id="main-content" className="min-h-screen pt-28 pb-10 sm:pt-32">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-x-4 gap-y-6 px-4 sm:px-6 xl:max-w-none xl:grid-cols-[minmax(10rem,1fr)_minmax(0,72rem)_minmax(10rem,1fr)]">
        <BlogHeader />
        <div
          data-slot="blog-tags-rail"
          className="xl:col-start-3 xl:row-start-2 xl:mr-1 xl:w-full xl:max-w-60 xl:justify-self-end"
        >
          <div className="xl:sticky xl:top-28">
            <TagFilter tags={tags} selectedTag={selectedTag} />
          </div>
        </div>
        <div
          data-slot="blog-post-grid"
          className="xl:col-start-2 xl:row-start-2"
        >
          <PostGrid posts={posts} />
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Remove superseded list files and the compatibility facade**

Delete the listed old list components and global composite card. Confirm no source import references `BlogExplorer`, `BlogTags`, `EditorialList`, `ListStates`, `BlogControls`, `glass-blog-card-shadcnui`, `filterPosts`, or `blog-data`, then delete `blog-data.ts`.

Run:

```bash
rg -n "BlogExplorer|BlogTags|EditorialList|ListStates|BlogControls|glass-blog-card-shadcnui|filterPosts|blog-data" frontend/src
```

Expected: only historical test names are permitted; there are no imports or runtime references.

- [ ] **Step 6: Verify GREEN and commit**

Run:

```bash
bun test frontend/src/app/blog
bun run lint
```

Expected: all Blog tests pass; ESLint exits 0 with no new Blog warning.

Commit only Task 2 paths:

```bash
git add frontend/src/app/blog frontend/src/components/ui/glass-blog-card-shadcnui.tsx
git commit -m "refactor: render blog filters on the server"
```

---

### Task 3: Split the article presentation into focused route-private components

**Files:**

- Create: `frontend/src/app/blog/_components/article/ArticleHeader.tsx`
- Create: `frontend/src/app/blog/_components/article/ArticleBody.tsx`
- Create: `frontend/src/app/blog/_components/article/ArticleCode.tsx`
- Create: `frontend/src/app/blog/_components/article/ArticlePager.tsx`
- Create: `frontend/src/app/blog/_components/article/ArticleShell.tsx`
- Modify: `frontend/src/app/blog/[slug]/page.tsx`
- Modify: `frontend/src/app/blog/_components/blog-components.test.tsx`
- Delete: `frontend/src/app/blog/components/ArticleParts.tsx`
- Delete: `frontend/src/app/blog/components/ArticleShell.tsx`
- Delete: `frontend/src/app/blog/components/EditorialArticle.tsx`

**Interfaces:**

- Consumes: Task 1 `BlogPost`, `BlogSection`, `BlogCodeBlock`, repository operations, and formatting helpers.
- Produces: `ArticleShell({ post })`, `ArticleHeader({ post })`, `ArticleBody({ sections })`, `ArticleCode({ block })`, and `ArticlePager({ slug })`.
- Preserves the current `/blog/[slug]` metadata, static params, unknown-slug handling, DOM hierarchy, prose width, and newer/older navigation semantics.

- [ ] **Step 1: Add failing focused article-component tests**

Add imports for the desired components and these assertions:

```tsx
test("renders article header metadata from canonical values", () => {
  const post = blogPosts[0];
  const markup = renderToStaticMarkup(<ArticleHeader post={post} />);

  expect(markup).toContain(post.title);
  expect(markup).toContain(post.summary);
  expect(markup).toContain(formatPublishedDate(post.publishedAt));
  expect(markup).toContain(formatReadingTime(post.readingMinutes));
  expect(markup).toContain(`dateTime="${post.publishedAt}"`);
});

test("renders semantic article sections and code figures", () => {
  const post = blogPosts[0];
  const markup = renderToStaticMarkup(<ArticleBody sections={post.sections} />);

  expect(markup).toContain(`id="${post.sections[0].id}"`);
  expect(markup).toContain("<figure");
  expect(markup).toContain("<figcaption");
  expect(markup).toContain("<pre");
  expect(markup).toContain("<code");
});

test("renders adjacent article links from a slug", () => {
  const markup = renderToStaticMarkup(
    <ArticlePager slug={blogPosts[1].slug} />,
  );

  expect(markup).toContain(buildBlogHref(blogPosts[0].slug));
  expect(markup).toContain(buildBlogHref(blogPosts[2].slug));
  expect(markup).toContain('aria-label="相鄰文章"');
});
```

- [ ] **Step 2: Run the component test and verify RED**

Run:

```bash
bun test frontend/src/app/blog/_components/blog-components.test.tsx
```

Expected: FAIL because `_components/article/ArticleHeader`, `ArticleBody`, and `ArticlePager` do not exist.

- [ ] **Step 3: Extract the article units without redesigning them**

Move existing markup by responsibility:

- `ArticleHeader` renders category, canonical date, reading time, title, summary, and tags.
- `ArticleBody` renders the `BlogSection[]` sequence and delegates each optional code block to `ArticleCode`.
- `ArticleCode` retains the current `figure`/`figcaption`/`pre`/`code` semantics and overflow behavior.
- `ArticlePager` accepts a slug, resolves adjacent metadata through the repository, and renders the current newer/older links.
- `ArticleShell` renders the back link, article surface, header, body, and pager with the current classes and readable width.

Do not add a table of contents, syntax highlighting, copy button, animation, or new article metadata.

- [ ] **Step 4: Point the dynamic route at the new shell and delete old files**

Update `[slug]/page.tsx` to import `ArticleShell` from `../_components/article/ArticleShell`; keep `generateStaticParams`, `generateMetadata`, `notFound()`, title, and description behavior intact. Delete the three superseded files under `components` and remove the empty directory if no files remain except tests.

- [ ] **Step 5: Verify GREEN and commit**

Run:

```bash
bun test frontend/src/app/blog
bun run lint
```

Expected: all Blog tests pass; ESLint exits 0 with no new Blog warning.

Commit only Task 3 paths:

```bash
git add frontend/src/app/blog/_components/article 'frontend/src/app/blog/[slug]/page.tsx' frontend/src/app/blog/components
git commit -m "refactor: split blog article presentation"
```

---

### Task 4: Remove the Blog-only direct animation dependency and verify the complete refactor

**Files:**

- Modify: `frontend/package.json`
- Modify: `bun.lock`
- Modify only if verification exposes a Blog regression: files under `frontend/src/app/blog/`

**Interfaces:**

- Consumes: Tasks 1–3 completed Server Component architecture.
- Produces: no `framer-motion` source import and no direct `framer-motion` workspace dependency.
- Preserves: the independent `motion` dependency and every unrelated existing dependency.

- [ ] **Step 1: Prove the direct dependency is no longer consumed**

Run:

```bash
rg -n "from ['\"]framer-motion['\"]|require\(['\"]framer-motion['\"]\)" frontend/src
```

Expected: no matches. If a non-Blog consumer exists, record the finding and do not remove the dependency in this task.

- [ ] **Step 2: Remove only the direct workspace dependency**

Remove this exact line from `frontend/package.json`:

```json
"framer-motion": "^13.2.0",
```

Because `motion` remains a dependency and itself supplies the animation runtime, do not manually delete transitive `framer-motion`, `motion-dom`, or `motion-utils` package records from `bun.lock`. Remove only `workspaces.frontend.dependencies["framer-motion"]` from the isolated worktree's clean `bun.lock`.

- [ ] **Step 3: Run complete verification**

Run:

```bash
bun test frontend/src/app/blog
bun run lint
bun run build:frontend
git diff --check
git status --short
```

Expected:

- Blog tests report zero failures.
- ESLint exits 0 and introduces no Blog warning; existing unrelated warnings may remain and must be reported exactly.
- The production build exits 0. If it fails only because `next/font/google` cannot reach Google Fonts, report the environment blocker explicitly and retain successful test/lint evidence without claiming the build passed.
- `git diff --check` reports no whitespace errors.
- `git status --short` contains only task-owned work; the original checkout's user-owned `bun.lock` changes remain isolated outside this worktree.

- [ ] **Step 4: Inspect the final architecture and commit**

Run:

```bash
rg -n '"use client"|useState|useMemo|framer-motion' frontend/src/app/blog
rg -n "kicker|publishedLabel|featured|blogAuthor|getEditorialLead|filterPosts" frontend/src/app/blog
rg -n "BlogExplorer|BlogControls|glass-blog-card-shadcnui" frontend/src
```

Expected: no runtime source matches. Test descriptions may use historical names only when documenting removed behavior; delete stale tests rather than retaining obsolete component contracts.

Commit the dependency cleanup and any narrowly required Blog verification fixes. The implementation runs in an isolated clean worktree, so update only the `workspaces.frontend.dependencies` declaration for `framer-motion` in `bun.lock`; do not regenerate or rewrite unrelated lockfile records:

```bash
git add frontend/package.json bun.lock frontend/src/app/blog
git commit -m "chore: remove blog animation dependency"
```

Do not stage unrelated files. Confirm the staged lockfile diff contains only removal of the frontend workspace's direct `framer-motion` declaration; retain its transitive package record because `motion` still depends on it.
