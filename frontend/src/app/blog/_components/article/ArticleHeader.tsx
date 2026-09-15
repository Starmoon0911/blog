import { Clock } from "lucide-react";

import { formatPublishedDate, formatReadingTime } from "../../_lib/format";
import type { BlogPost } from "../../_lib/types";

type ArticleHeaderProps = {
  post: BlogPost;
};

export default function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <header className="border-b border-white/10 px-5 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-400">
          <span className="text-cyan-300">{post.category}</span>
          <time dateTime={post.publishedAt}>
            {formatPublishedDate(post.publishedAt)}
          </time>
          <span className="flex items-center gap-1.5">
            <Clock size={13} aria-hidden="true" />
            {formatReadingTime(post.readingMinutes)}
          </span>
        </div>
        <h1 className="mt-8 max-w-4xl font-serif text-4xl leading-[1.08] font-medium tracking-[-0.025em] text-balance text-white sm:text-6xl lg:text-7xl">
          {post.title}
        </h1>
        <p className="mt-8 max-w-3xl border-l border-cyan-300/50 pl-5 text-lg leading-8 text-zinc-300 sm:text-xl sm:leading-9">
          {post.summary}
        </p>
        <div className="mt-9 flex flex-wrap gap-2 font-mono text-xs text-zinc-400">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1.5"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
