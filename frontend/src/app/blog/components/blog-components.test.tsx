import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import BlogExplorer from "../BlogExplorer";
import { blogCategories, blogPosts, buildBlogHref } from "../blog-data";
import BlogControls from "./BlogControls";
import BlogTags from "./BlogTags";
import EditorialList from "./EditorialList";

describe("blog list interactions", () => {
  test("keeps the tag panel but removes the top index controls", () => {
    const markup = renderToStaticMarkup(<BlogExplorer posts={blogPosts} />);

    expect(markup).toContain(">Tags</h2>");
    expect(markup).toContain('data-slot="blog-post-grid"');
    expect(markup).toContain('data-slot="blog-tags-rail"');
    expect(markup).not.toContain('aria-label="文章篩選"');
    expect(markup).not.toContain("篇文章");
  });

  test("makes every complete article row a link to that article", () => {
    const markup = renderToStaticMarkup(
      <EditorialList posts={blogPosts} onReset={() => undefined} />,
    );

    for (const post of blogPosts) {
      const href = buildBlogHref(post.slug);
      expect(markup).toContain(`href="${href}"`);
      expect(markup).toContain(`alt="${post.title}"`);
      for (const tag of post.tags) {
        expect(markup).toContain(`>${tag}</`);
      }
      expect(markup).toContain(`${post.readingMinutes} 分鐘閱讀`);
      expect(markup).toContain(`dateTime="${post.publishedAt}"`);
    }

    for (const publishedLabel of [
      "2026.08.28",
      "2026.08.14",
      "2026.07.30",
      "2026.07.12",
      "2026.06.24",
      "2026.06.05",
    ]) {
      expect(markup).toContain(`>${publishedLabel}</time>`);
    }

    expect(markup.match(/data-slot="glass-blog-card"/g)?.length).toBe(
      blogPosts.length,
    );
    expect(markup).not.toContain('tabindex="0"');
  });

  test("does not render an unavailable search control", () => {
    const markup = renderToStaticMarkup(
      <BlogControls
        categories={blogCategories}
        selectedCategory={null}
        selectedTag={null}
        resultCount={blogPosts.length}
        onCategoryChange={() => undefined}
        onReset={() => undefined}
      />,
    );

    expect(markup).not.toContain('type="search"');
  });

  test("renders tags in a labelled filter panel", () => {
    const markup = renderToStaticMarkup(
      <BlogTags
        tags={["React", "TypeScript"]}
        selectedTag="React"
        onTagChange={() => undefined}
      />,
    );

    expect(markup).toContain(">Tags</h2>");
    expect(markup).toContain(">React</button>");
    expect(markup).toContain(">TypeScript</button>");
    expect(markup).toContain('aria-pressed="true"');
    expect(markup).toContain('aria-label="依標籤篩選"');
  });
});
