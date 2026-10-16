import type { BlogCodeBlock } from "../../_lib/types";

type ArticleCodeProps = {
  block: BlogCodeBlock;
};

export default function ArticleCode({ block }: ArticleCodeProps) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-white/10 bg-[#07090b]/90">
      <figcaption className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 font-mono text-[11px] text-zinc-500">
        <span>{block.filename}</span>
        <span>{block.language}</span>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-sm leading-7 text-zinc-300 sm:p-5">
        <code>{block.code}</code>
      </pre>
    </figure>
  );
}
