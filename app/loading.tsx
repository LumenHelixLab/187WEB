import { Skeleton, SkeletonCard, SkeletonText } from "@/components/resilience/Skeleton";

/** Route-level loading skeleton (RESILIENCE.md #1) — reserved-space placeholders
 *  during navigation so there's never a blank screen or layout jump. */
export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24" aria-busy="true" aria-label="Loading">
      <Skeleton className="mb-6 h-10 w-2/3 max-w-md" />
      <SkeletonText lines={3} className="mb-12 max-w-xl" />
      <div className="grid gap-4 sm:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </main>
  );
}
