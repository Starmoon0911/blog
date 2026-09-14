import { describe, expect, test } from "bun:test";

import {
  blogPosts,
  buildBlogHref,
  getAdjacentPosts,
  getEditorialLead,
  filterPosts,
  getPostBySlug,
} from "./blog-data";

describe("blog data", () => {
  test("uses unique slugs so every post has one stable route", () => {
    const slugs = blogPosts.map((post) => post.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("finds a known post and returns undefined for an unknown slug", () => {
    expect(getPostBySlug("nextjs-app-router-notes")?.title).toBe(
      "我如何整理 Next.js App Router 的專案邊界",
    );
    expect(getPostBySlug("missing-post")).toBeUndefined();
  });

  test("filters posts by category", () => {
    const result = filterPosts(blogPosts, "Frontend", null);

    expect(result.map((post) => post.slug)).toEqual([
      "nextjs-app-router-notes",
      "accessible-interface-checklist",
    ]);
  });

  test("filters posts by tag", () => {
    const result = filterPosts(blogPosts, null, "TypeScript");

    expect(result.map((post) => post.slug)).toEqual([
      "nextjs-app-router-notes",
      "express-service-boundaries",
    ]);
  });

  test("combines category and tag filters", () => {
    const result = filterPosts(blogPosts, "Backend", "TypeScript");

    expect(result.map((post) => post.slug)).toEqual([
      "express-service-boundaries",
    ]);
  });
});

describe("blog navigation", () => {
  test("builds the canonical article link", () => {
    expect(buildBlogHref("nextjs-app-router-notes")).toBe(
      "/blog/nextjs-app-router-notes",
    );
  });
});

describe("blog presentation data", () => {
  test("uses the first remaining post as the editorial lead after filtering", () => {
    const backendPosts = filterPosts(blogPosts, "Backend", null);

    expect(getEditorialLead(backendPosts)?.slug).toBe(
      "express-service-boundaries",
    );
    expect(getEditorialLead([])).toBeUndefined();
  });

  test("provides all content required by the editorial presentation", () => {
    for (const post of blogPosts) {
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.summary.length).toBeGreaterThan(0);
      expect(post.image).toMatch(/^https:\/\/images\.unsplash\.com\//);
      expect(post.author.name.length).toBeGreaterThan(0);
      expect(post.author.avatar.length).toBeGreaterThan(0);
      expect(post.tags.length).toBeGreaterThan(0);
      expect(post.readingMinutes).toBeGreaterThan(0);
      expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("article reading data", () => {
  test("keeps section anchors unique within each article", () => {
    for (const post of blogPosts) {
      const ids = post.sections.map((section) => section.id);

      expect(post.sections.length).toBeGreaterThan(0);
      expect(new Set(ids).size).toBe(ids.length);
      expect(
        post.sections.every((section) => section.paragraphs.length > 0),
      ).toBe(true);
    }
  });

  test("includes realistic code content for code-aware reading layouts", () => {
    const codeBlocks = blogPosts.flatMap((post) =>
      post.sections.flatMap((section) => (section.code ? [section.code] : [])),
    );

    expect(codeBlocks.length).toBeGreaterThanOrEqual(4);
    expect(codeBlocks.every((block) => block.code.trim().length > 0)).toBe(
      true,
    );
  });

  test("returns adjacent posts without wrapping at collection edges", () => {
    expect(getAdjacentPosts("nextjs-app-router-notes")).toEqual({
      previous: undefined,
      next: blogPosts[1],
    });
    expect(getAdjacentPosts("logs-that-answer-questions")).toEqual({
      previous: blogPosts[4],
      next: undefined,
    });
  });
});
