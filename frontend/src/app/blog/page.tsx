import type { Metadata } from "next";

import BlogExplorer from "./BlogExplorer";
import { blogPosts } from "./blog-data";

export const metadata: Metadata = {
  title: "Blog",
  description: "wei0911 的技術文章與工程筆記。",
};

export default function BlogPage() {
  return <BlogExplorer posts={blogPosts} />;
}
