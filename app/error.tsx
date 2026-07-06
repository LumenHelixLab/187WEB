"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/resilience/ErrorState";

/** Route-level error boundary (RESILIENCE.md #6). A render crash anywhere in the
 *  tree lands here instead of a blank page, with a reset path. */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-[70vh] place-items-center px-6">
      <ErrorState
        title="This page hit a snag"
        message="An unexpected error occurred while rendering. Your navigation still works — try again or head back home."
        onRetry={reset}
      />
    </main>
  );
}
