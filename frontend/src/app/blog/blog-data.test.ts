import { describe, expect, test } from "bun:test";

import { postIndex } from "./_content/post-index";
import { blogPosts } from "./_content/posts";
import {
  buildBlogHref,
  buildTagHref,
  formatPublishedDate,
  formatReadingTime,
} from "./_lib/format";
import {
  filterPostMeta,
  getAdjacentPosts,
  getPostBySlug,
  listPostMeta,
  listTags,
} from "./_lib/repository";

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

  test("keeps full article sections out of list metadata", () => {
    expect(listPostMeta()).toEqual(postIndex);
    expect(listPostMeta().every((post) => !("sections" in post))).toBe(true);
  });

  test("returns stable first-seen tag ordering", () => {
    expect(listTags().slice(0, 4)).toEqual([
      "Next.js",
      "React",
      "TypeScript",
      "Accessibility",
    ]);
  });

  test("returns no metadata for an unknown tag", () => {
    expect(filterPostMeta(listPostMeta(), "missing-tag")).toEqual([]);
  });
});

describe("blog navigation", () => {
  test("builds canonical and encoded Blog links", () => {
    expect(buildBlogHref("nextjs-app-router-notes")).toBe(
      "/blog/nextjs-app-router-notes",
    );
    expect(buildTagHref("Next.js & React")).toBe(
      "/blog?tag=Next.js%20%26%20React",
    );
  });

  test("returns adjacent posts without wrapping at collection edges", () => {
    expect(getAdjacentPosts("nextjs-app-router-notes")).toEqual({
      previous: undefined,
      next: postIndex[1],
    });
    expect(getAdjacentPosts("logs-that-answer-questions")).toEqual({
      previous: postIndex[4],
      next: undefined,
    });
  });
});

describe("blog presentation data", () => {
  test("formats publication and reading labels from canonical values", () => {
    expect(formatPublishedDate("2026-08-28")).toBe("2026.08.28");
    expect(formatReadingTime(8)).toBe("8 分鐘閱讀");
  });

  test("provides all content required by the editorial presentation", () => {
    for (const post of blogPosts) {
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.summary.length).toBeGreaterThan(0);
      expect(post.image).toMatch(/^https:\/\/images\.unsplash\.com\//);
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
});
