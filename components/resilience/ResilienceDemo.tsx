"use client";

import { useState } from "react";
import { SkeletonCard } from "./Skeleton";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { ErrorBoundary } from "./ErrorBoundary";
import { ImageWithFallback } from "./ImageWithFallback";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/50">{title}</h3>
      {children}
    </div>
  );
}

export function ResilienceDemo() {
  const [loading, setLoading] = useState(false);
  const [boom, setBoom] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const simulate = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1300);
  };

  function Bomb() {
    if (boom) throw new Error("Demo render error");
    return (
      <p className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
        ✅ Island rendered fine. Trigger an error to watch the boundary catch it — the rest of the
        page keeps working.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* 1 — slow network → skeleton */}
      <Card title="Slow network → skeleton">
        {loading ? (
          <SkeletonCard />
        ) : (
          <div className="rounded-2xl border border-white/10 p-5">
            <div className="mb-3 h-32 rounded-lg bg-gradient-to-br from-[#2440E6] to-[#7C3AED]" />
            <p className="text-sm text-white/70">Loaded content. No blank screen, no layout jump.</p>
          </div>
        )}
        <button
          type="button"
          onClick={simulate}
          className="mt-4 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
        >
          Simulate slow load
        </button>
      </Card>

      {/* 2 — render crash → boundary */}
      <Card title="Render crash → error boundary">
        <ErrorBoundary
          key={attempt}
          fallback={
            <ErrorState
              title="Caught by the boundary"
              message="The island crashed; the page didn't. Retry remounts just this part."
              onRetry={() => {
                setBoom(false);
                setAttempt((a) => a + 1);
              }}
            />
          }
        >
          <Bomb />
        </ErrorBoundary>
        {!boom ? (
          <button
            type="button"
            onClick={() => setBoom(true)}
            className="mt-4 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
          >
            Trigger render error
          </button>
        ) : null}
      </Card>

      {/* 3 — broken image → fallback */}
      <Card title="Broken image → graceful fallback">
        <ImageWithFallback
          src="https://invalid.example/never-loads.png"
          alt="A product photo that fails to load"
          width={520}
          height={150}
          className="h-[150px] w-full rounded-lg object-cover"
        />
        <p className="mt-4 text-sm text-white/55">
          The source 404s, so it degrades to a labeled placeholder instead of a broken-image icon.
        </p>
      </Card>

      {/* 4 — empty result → next action */}
      <Card title="No data → empty state">
        <EmptyState
          title="No results yet"
          message="Nothing matched that filter. Try a broader search or reset."
          action={
            <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#060713]">
              Reset filters
            </button>
          }
        />
      </Card>
    </div>
  );
}
