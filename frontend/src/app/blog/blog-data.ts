export { blogPosts } from "./_content/posts";
export { buildBlogHref } from "./_lib/format";
export { getAdjacentPosts, getPostBySlug } from "./_lib/repository";
export { blogCategories } from "./_lib/types";
export type {
  BlogCategory,
  BlogCodeBlock,
  BlogPost,
  BlogSection,
  PostMeta,
} from "./_lib/types";

import type { BlogCategory, BlogPost } from "./_lib/types";

export function filterPosts(
  posts: readonly BlogPost[],
  category: BlogCategory | null,
  tag: string | null,
) {
  return posts.filter(
    (post) =>
      (!category || post.category === category) &&
      (!tag || post.tags.includes(tag)),
  );
}
