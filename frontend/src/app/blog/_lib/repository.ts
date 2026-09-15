import { postIndex } from "../_content/post-index";
import { blogPosts } from "../_content/posts";
import type { PostMeta } from "./types";

export function listPostMeta() {
  return postIndex;
}

export function listTags() {
  return Array.from(new Set(postIndex.flatMap((post) => post.tags)));
}

export function filterPostMeta(posts: readonly PostMeta[], tag: string | null) {
  return tag !== null
    ? posts.filter((post) => post.tags.includes(tag))
    : posts;
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const index = postIndex.findIndex((post) => post.slug === slug);

  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: index > 0 ? postIndex[index - 1] : undefined,
    next: index < postIndex.length - 1 ? postIndex[index + 1] : undefined,
  };
}
