import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import {
  buildBlogHref,
  formatPublishedDate,
  formatReadingTime,
} from "../_lib/format";
import { listPostMeta } from "../_lib/repository";
import PostGrid from "./PostGrid";
import TagFilter from "./TagFilter";

describe("blog list components", () => {
  test("renders tag filters as deep links with selected state", () => {
    const markup = renderToStaticMarkup(
      <TagFilter tags={["React", "Next.js & React"]} selectedTag="React" />,
    );

    expect(markup).toContain('href="/blog"');
    expect(markup).toContain('href="/blog?tag=React"');
    expect(markup).toContain('href="/blog?tag=Next.js%20%26%20React"');
    expect(markup).toContain('aria-current="page"');
  });

  test("renders an empty result with a recoverable all-posts link", () => {
    const markup = renderToStaticMarkup(<PostGrid posts={[]} />);

    expect(markup).toContain("沒有符合的文章");
    expect(markup).toContain('href="/blog"');
  });

  test("renders required post data without client-only motion markup", () => {
    const markup = renderToStaticMarkup(<PostGrid posts={listPostMeta()} />);

    for (const post of listPostMeta()) {
      expect(markup).toContain(`href="${buildBlogHref(post.slug)}"`);
      expect(markup).toContain(`alt="${post.title}"`);
      expect(markup).toContain(post.summary);
      expect(markup).toContain(formatPublishedDate(post.publishedAt));
      expect(markup).toContain(formatReadingTime(post.readingMinutes));
      expect(markup).toContain(`dateTime="${post.publishedAt}"`);

      for (const tag of post.tags) {
        expect(markup).toContain(`>${tag}</`);
      }
    }

    expect(markup.match(/data-slot="glass-blog-card"/g)?.length).toBe(
      listPostMeta().length,
    );
    expect(markup).not.toContain("The Future of UI Design");
    expect(markup).not.toContain("transform:translateY");
  });
});
