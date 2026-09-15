import Link from "next/link";

import type { BlogPost } from "../_lib/types";
import EditorialArticle from "./EditorialArticle";

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

        <EditorialArticle post={post} />
      </div>
    </main>
  );
}
