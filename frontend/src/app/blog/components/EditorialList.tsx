import { GlassBlogCard } from "@/components/ui/glass-blog-card-shadcnui";

import { formatPublishedDate } from "../_lib/format";
import { buildBlogHref, type BlogPost } from "../blog-data";
import { EmptyState } from "./ListStates";

type EditorialListProps = {
  posts: readonly BlogPost[];
  onReset: () => void;
};

export default function EditorialList({ posts, onReset }: EditorialListProps) {
  if (posts.length === 0) return <EmptyState onReset={onReset} />;

  return (
    <section
      aria-label="文章列表"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {posts.map((post) => (
        <GlassBlogCard
          key={post.slug}
          title={post.title}
          excerpt={post.summary}
          image={post.image}
          date={formatPublishedDate(post.publishedAt)}
          dateTime={post.publishedAt}
          readTime={`${post.readingMinutes} 分鐘閱讀`}
          tags={post.tags}
          href={buildBlogHref(post.slug)}
          className="max-w-none"
        />
      ))}
    </section>
  );
}
