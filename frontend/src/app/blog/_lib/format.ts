const publishedDateFormatter = new Intl.DateTimeFormat("zh-TW", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "UTC",
});

export function formatPublishedDate(publishedAt: string) {
  return publishedDateFormatter
    .format(new Date(`${publishedAt}T00:00:00Z`))
    .replaceAll("/", ".");
}

export function formatReadingTime(minutes: number) {
  return `${minutes} 分鐘閱讀`;
}

export function buildBlogHref(slug: string) {
  return `/blog/${slug}`;
}

export function buildTagHref(tag: string) {
  return `/blog?tag=${encodeURIComponent(tag)}`;
}
