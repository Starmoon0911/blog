import { Tags } from "lucide-react";

type BlogTagsProps = {
  tags: readonly string[];
  selectedTag: string | null;
  onTagChange: (tag: string | null) => void;
};

export default function BlogTags({
  tags,
  selectedTag,
  onTagChange,
}: BlogTagsProps) {
  return (
    <aside
      aria-labelledby="tags-heading"
      className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl"
    >
      <h2
        id="tags-heading"
        className="mb-4 flex items-center gap-2 text-base font-semibold text-zinc-100"
      >
        <Tags className="size-4 text-cyan-300" aria-hidden="true" />
        Tags
      </h2>

      <div
        className="flex flex-wrap gap-1.5"
        role="group"
        aria-label="依標籤篩選"
      >
        {tags.map((tag) => {
          const active = selectedTag === tag;

          return (
            <button
              key={tag}
              type="button"
              aria-pressed={active}
              onClick={() => onTagChange(active ? null : tag)}
              className={`inline-flex min-h-8 cursor-pointer items-center rounded-lg border px-2 py-1 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
                active
                  ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100"
                  : "border-white/10 bg-white/[0.035] text-zinc-400 hover:border-white/20 hover:bg-white/[0.07] hover:text-zinc-100"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
