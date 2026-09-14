import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticleShell from "../components/ArticleShell";
import { blogPosts, getPostBySlug } from "../blog-data";

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
