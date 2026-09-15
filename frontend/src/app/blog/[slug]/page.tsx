import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogPosts } from "../_content/posts";
import { getPostBySlug } from "../_lib/repository";
import ArticleShell from "../_components/article/ArticleShell";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "找不到文章" };

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return <ArticleShell post={post} />;
}
