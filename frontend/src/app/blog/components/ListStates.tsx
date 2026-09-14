type EmptyStateProps = {
  onReset: () => void;
};

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-white/20 bg-black/20 px-6 py-16 text-center backdrop-blur-xl">
      <h2 className="text-2xl font-medium text-white">沒有符合的文章</h2>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 min-h-11 rounded-xl border border-cyan-300/50 bg-cyan-300/10 px-5 font-mono text-sm text-cyan-100 hover:bg-cyan-300/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
      >
        清除篩選
      </button>
    </div>
  );
}
