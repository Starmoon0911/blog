export const blogCategories = ["Frontend", "Backend", "DevOps"] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogCodeBlock = {
  language: string;
  filename: string;
  code: string;
};

export type BlogSection = {
  id: string;
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  code?: BlogCodeBlock;
};

export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  category: BlogCategory;
  tags: readonly string[];
  publishedAt: string;
  readingMinutes: number;
};

export type BlogPost = PostMeta & {
  sections: readonly BlogSection[];
};
