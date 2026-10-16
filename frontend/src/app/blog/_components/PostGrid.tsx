import type { PostMeta } from "../_lib/types";
import EmptyState from "./EmptyState";
import PostCard from "./PostCard";

type PostGridProps = {
  posts: readonly PostMeta[];
};

export default function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) return <EmptyState />;

  return (
    <section
      aria-label="文章列表"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </section>
  );
}
