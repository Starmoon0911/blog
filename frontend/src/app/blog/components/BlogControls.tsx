import type { BlogCategory } from "../blog-data";

type BlogControlsProps = {
  categories: readonly BlogCategory[];
  selectedCategory: BlogCategory | null;
  selectedTag: string | null;
  resultCount: number;
  onCategoryChange: (category: BlogCategory | null) => void;
  onReset: () => void;
};

export default function BlogControls({
  categories,
  selectedCategory,
  selectedTag,
  resultCount,
  onCategoryChange,
  onReset,
}: BlogControlsProps) {
  return (
    <section
      aria-label="文章篩選"
      className="mb-8 rounded-2xl border border-white/10 bg-white/[0.025] p-4 backdrop-blur-xl sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs text-zinc-400" aria-live="polite">
          {resultCount} 篇文章
        </span>
        {(selectedCategory || selectedTag) && (
          <button
            type="button"
            onClick={onReset}
            className="min-h-11 rounded-xl border border-white/15 px-4 font-mono text-xs text-zinc-300 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            清除篩選
          </button>
        )}
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="依分類篩選"
      >
        <FilterButton
          active={selectedCategory === null}
          onClick={() => onCategoryChange(null)}
        >
          全部
        </FilterButton>
        {categories.map((category) => (
          <FilterButton
            key={category}
            active={selectedCategory === category}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </FilterButton>
        ))}
      </div>
    </section>
  );
}

type FilterButtonProps = {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

function FilterButton({ active, children, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-full border px-4 font-mono text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
        active
          ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100"
          : "border-white/10 bg-black/10 text-zinc-400 hover:border-white/20 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
