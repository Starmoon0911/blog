import Link from "next/link";

import { buildBlogHref } from "../../_lib/format";
import { getAdjacentPosts } from "../../_lib/repository";

type ArticlePagerProps = {
  slug: string;
};

export default function ArticlePager({ slug }: ArticlePagerProps) {
  const { previous, next } = getAdjacentPosts(slug);

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
