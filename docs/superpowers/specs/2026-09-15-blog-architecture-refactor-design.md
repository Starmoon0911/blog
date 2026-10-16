# Blog Architecture Refactor Design

## Goal

Refactor the existing public Blog pages into a route-colocated, server-first feature without changing their established editorial/glass visual direction or static article content. The result should send only list metadata to the Blog index, preserve filter state in the URL, and leave clear seams for a future MDX or CMS-backed content repository.

## Scope

This change covers `frontend/src/app/blog`, the Blog-specific card currently under `frontend/src/components/ui`, Blog tests, and dependency entries that become unused as a direct result of the Blog refactor.

It does not redesign the global Header, Footer, background, authentication, Dashboard, backend, Supabase schema, or article authoring workflow. It does not introduce MDX, a CMS, full-text search, pagination, syntax highlighting, TanStack Query, or a new URL-state package.

## Architecture

The App Router route files remain the composition boundary. `/blog/page.tsx` parses an optional `tag` search parameter, asks a Blog repository for list metadata, and renders the filtered list as Server Components. `/blog/[slug]/page.tsx` keeps static parameter generation, metadata generation, unknown-slug handling, and article composition.

Blog implementation remains colocated under `app/blog` because it currently has no consumer outside the public Blog routes. Route-private folders separate components, content, and library code:

```text
frontend/src/app/blog/
├── page.tsx
├── [slug]/page.tsx
├── _components/
│   ├── BlogHeader.tsx
│   ├── TagFilter.tsx
│   ├── PostGrid.tsx
│   ├── PostCard.tsx
│   ├── EmptyState.tsx
│   └── article/
│       ├── ArticleHeader.tsx
│       ├── ArticleBody.tsx
│       ├── ArticleCode.tsx
│       └── ArticlePager.tsx
├── _content/
│   ├── post-index.ts
│   └── posts.ts
└── _lib/
    ├── types.ts
    ├── repository.ts
    └── format.ts
```

If the future Dashboard begins reading or editing Blog data, `_content` and `_lib` can move to `src/features/blog` without changing the route-facing repository interface.

## Data Model and Repository

`PostMeta` contains only fields required by list cards, route metadata, and adjacent-post navigation:

- `slug`
- `title`
- `summary`
- `image`
- `category`
- `tags`
- `publishedAt`
- `readingMinutes`

`BlogPost` extends `PostMeta` with `sections`. `BlogSection` and `BlogCodeBlock` retain the current structured article representation.

The current unused `kicker`, `author`, `featured`, and duplicated `publishedLabel` fields are removed. Dates are formatted from `publishedAt` with a deterministic `Intl.DateTimeFormat("zh-TW", { timeZone: "UTC" })` helper.

The repository exports explicit read operations:

- `listPostMeta(): readonly PostMeta[]`
- `listTags(): readonly string[]`
- `filterPostMeta(posts, tag): readonly PostMeta[]`
- `getPostBySlug(slug): BlogPost | undefined`
- `getAdjacentPosts(slug): { previous?: PostMeta; next?: PostMeta }`
- `buildBlogHref(slug): string`
- `buildTagHref(tag): string`

The metadata index and full article content are separate exports so the list route never passes article sections or code blocks through a Client Component boundary.

## Rendering and URL State

Tag filtering uses `/blog?tag=<encoded tag>`. Tag controls are Next.js links, including an “all posts” link back to `/blog`. The selected tag is derived from `searchParams`; unknown tags return an empty result rather than silently changing the URL.

Because filtering is URL-driven, the index requires no `useState`, `useMemo`, router mutation hook, or general-purpose URL-state dependency. Next.js client navigation still provides an app-like transition while preserving deep links, browser history, reload behavior, and shareability.

The existing `BlogExplorer` orchestration component is removed. Static Blog presentation components remain Server Components.

## Components and Styling

The current `GlassBlogCard` becomes the required-prop Blog-specific `PostCard`. Demo fallback content is removed so missing production data fails at compile time. It continues composing the existing `Card`, `Badge`, `cn`, `next/link`, `next/image`, and Lucide primitives.

The simple mount animation is removed. Hover, focus, and reduced-motion behavior use the existing Tailwind CSS utilities, keeping the Blog card server-rendered and matching the earlier Blog requirement that new Blog content not use Motion.

Tag links expose the active state with `aria-current="page"`, visible border/text treatment, and a minimum 44px target. The list and article layouts retain the current breakpoints, readable article measure, focus styles, semantic headings, and empty-state recovery link.

Article presentation is split by responsibility, but the rendered visual hierarchy remains unchanged: metadata and title in the header, structured sections in the body, semantic code figures, and newer/older links in the pager.

## Existing Platform and Package Reuse

- Next.js `searchParams` and `Link` replace local React filter state.
- Native `Intl.DateTimeFormat` replaces duplicated display-date fields.
- Tailwind transitions and `motion-reduce` replace the Blog card's Framer Motion entrance.
- Existing `Card`, `Badge`, `cn`, Lucide, and `next/image` remain the UI primitives.
- No new runtime dependency is introduced.

After the Blog no longer imports `framer-motion`, remove that direct dependency only if a repository-wide import scan confirms no remaining consumer. The separate `motion` package, `react-device-detect`, `@arayui/rainy-day`, Radix Avatar, and Lenis are repository-wide cleanup candidates but remain outside this Blog-scoped change unless they are independently verified and approved in a later cleanup.

Image optimization configuration is also outside the first refactor commit because changing `images.unoptimized` affects every route. It should be evaluated as a separate follow-up with deployment compatibility confirmed.

## Error and Edge Behavior

- Unknown article slugs continue to call `notFound()`.
- Unknown tag values render the existing empty state with a link to `/blog`.
- Empty metadata collections render the same recoverable empty state.
- Article metadata generation returns the existing “找不到文章” title when lookup fails.
- Date formatting is deterministic between server environments by fixing the locale and time zone.

## Testing

Tests continue using `bun:test` and server-rendered markup. They cover:

- unique stable slugs and unique section anchors;
- metadata/content completeness;
- known and unknown slug lookup;
- tag filtering and unknown-tag empty results;
- deterministic date and href formatting;
- adjacent posts without wrapping;
- no article sections or code strings in list metadata;
- filter links with encoded query values and selected-state semantics;
- required card links, image attributes, dates, tags, and reading times;
- removal of Client-only behavior from the Blog presentation.

Verification commands are:

```bash
bun test frontend/src/app/blog
bun run lint
bun run build:frontend
```

The production build currently requires network access to download Geist through `next/font/google`. If the environment cannot reach Google Fonts, the build result must be reported as an environmental failure rather than treated as successful verification.

## Delivery Sequence

1. Characterize the existing public Blog behavior with focused tests.
2. Split types, metadata, content, formatting, and repository operations.
3. Move tag filtering to server-rendered URL state.
4. Relocate and simplify the Blog-specific card and presentation components.
5. Split the article presentation while preserving rendered output.
6. Remove Blog-specific dead code and any dependency made unused solely by this work.
7. Run focused tests, lint, and production build; inspect the final diff for unrelated changes.

Each delivery task must remain independently reviewable and use test-driven development. Existing user changes, including the current `bun.lock` modification, must not be overwritten.
