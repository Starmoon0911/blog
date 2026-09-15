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
