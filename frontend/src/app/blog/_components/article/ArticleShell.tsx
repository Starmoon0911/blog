import Link from "next/link";

import type { BlogPost } from "../../_lib/types";
import ArticleBody from "./ArticleBody";
import ArticleHeader from "./ArticleHeader";
import ArticlePager from "./ArticlePager";

type ArticleShellProps = {
  post: BlogPost;
};

export default function ArticleShell({ post }: ArticleShellProps) {
  return (
    <main id="main-content" className="min-h-screen pt-28 pb-10 sm:pt-32">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-5">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center rounded-lg font-mono text-xs text-zinc-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            ← 返回 Blog
          </Link>
        </div>

        <article className="overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl backdrop-blur-2xl">
          <ArticleHeader post={post} />

          <div className="px-5 py-10 sm:px-10 sm:py-14 lg:px-16">
            <div className="mx-auto max-w-[72ch]">
              <ArticleBody sections={post.sections} />
              <ArticlePager slug={post.slug} />
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
