"use client";

import { useMemo, useState } from "react";

import BlogTags from "./components/BlogTags";
import EditorialList from "./components/EditorialList";
import { filterPosts, type BlogPost } from "./blog-data";

type BlogExplorerProps = {
  posts: readonly BlogPost[];
};

export default function BlogExplorer({ posts }: BlogExplorerProps) {
  const [tag, setTag] = useState<string | null>(null);
  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))),
    [posts],
  );
  const filteredPosts = useMemo(
    () => filterPosts(posts, null, tag),
    [posts, tag],
  );
  const resetFilters = () => setTag(null);

  return (
    <main id="main-content" className="min-h-screen pt-28 pb-10 sm:pt-32">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-x-4 gap-y-6 px-4 sm:px-6 xl:max-w-none xl:grid-cols-[minmax(10rem,1fr)_minmax(0,72rem)_minmax(10rem,1fr)]">
        <section
          aria-labelledby="blog-heading"
          className="mb-2 sm:mb-4 xl:col-start-2"
        >
          <h1
            id="blog-heading"
            className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl"
          >
            文章
          </h1>
        </section>

        <div
          data-slot="blog-tags-rail"
          className="xl:col-start-3 xl:row-start-2 xl:mr-1 xl:w-full xl:max-w-60 xl:justify-self-end"
        >
          <div className="xl:sticky xl:top-28">
            <BlogTags tags={tags} selectedTag={tag} onTagChange={setTag} />
          </div>
        </div>

        <div
          data-slot="blog-post-grid"
          className="xl:col-start-2 xl:row-start-2"
        >
          <EditorialList posts={filteredPosts} onReset={resetFilters} />
        </div>
      </div>
    </main>
  );
}
