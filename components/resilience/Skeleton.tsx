/** Content-shaped loading placeholders (RESILIENCE.md #1). Pure CSS shimmer
 *  that stops under prefers-reduced-motion via the global rule in globals.css. */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`sc-skeleton rounded-md ${className}`} />;
}

export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div aria-hidden className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="sc-skeleton h-3 rounded" style={{ width: `${92 - i * 14}%` }} />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/10 p-5">
      <Skeleton className="mb-4 h-32 w-full" />
      <SkeletonText lines={3} />
    </div>
  );
}
