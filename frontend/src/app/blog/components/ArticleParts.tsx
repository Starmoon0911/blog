import Link from "next/link";

import {
  buildBlogHref,
  getAdjacentPosts,
  type BlogCodeBlock,
  type BlogPost,
} from "../blog-data";

export function ArticleCode({ block }: { block: BlogCodeBlock }) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-white/10 bg-[#07090b]/90">
      <figcaption className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 font-mono text-[11px] text-zinc-500">
        <span>{block.filename}</span>
        <span>{block.language}</span>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-sm leading-7 text-zinc-300 sm:p-5">
        <code>{block.code}</code>
      </pre>
    </figure>
  );
}

export function ArticlePager({ post }: { post: BlogPost }) {
  const { previous, next } = getAdjacentPosts(post.slug);

  return (
    <nav
      aria-label="相鄰文章"
      className="mt-16 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={buildBlogHref(previous.slug)}
          className="min-h-24 rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-white/20 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          <span className="font-mono text-[11px] text-zinc-600">
            ← 較新一篇
          </span>
          <span className="mt-2 block text-sm leading-6 text-zinc-300">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next && (
        <Link
          href={buildBlogHref(next.slug)}
          className="min-h-24 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-right hover:border-white/20 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          <span className="font-mono text-[11px] text-zinc-600">
            較舊一篇 →
          </span>
          <span className="mt-2 block text-sm leading-6 text-zinc-300">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
