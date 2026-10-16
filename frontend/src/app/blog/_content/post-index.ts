import { blogPosts } from "./posts";
import type { PostMeta } from "../_lib/types";

export const postIndex: readonly PostMeta[] = blogPosts.map((post) => ({
  slug: post.slug,
  title: post.title,
  summary: post.summary,
  image: post.image,
  category: post.category,
  tags: post.tags,
  publishedAt: post.publishedAt,
  readingMinutes: post.readingMinutes,
}));
