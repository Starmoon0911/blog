import { Clock } from "lucide-react";

import { formatPublishedDate, formatReadingTime } from "../_lib/format";
import type { BlogPost } from "../_lib/types";
import { ArticleCode, ArticlePager } from "./ArticleParts";

type EditorialArticleProps = {
  post: BlogPost;
};

export default function EditorialArticle({ post }: EditorialArticleProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl backdrop-blur-2xl">
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

      <div className="px-5 py-10 sm:px-10 sm:py-14 lg:px-16">
        <div className="mx-auto max-w-[72ch]">
          {post.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 [&+&]:mt-14"
            >
              <h2 className="font-serif text-3xl leading-tight font-medium text-white sm:text-4xl">
                {section.heading}
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-6 space-y-3 border-l border-white/15 pl-5 text-base leading-7 text-zinc-300">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.code && <ArticleCode block={section.code} />}
            </section>
          ))}
          <ArticlePager post={post} />
        </div>
      </div>
    </article>
  );
}
