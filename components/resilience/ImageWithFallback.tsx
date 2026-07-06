"use client";

import { useState } from "react";

/** Image that degrades instead of showing a broken icon (RESILIENCE.md #7).
 *  Swaps to a fallback src on error, then to a labeled placeholder. Reserve
 *  space with width/height to avoid CLS. */
export function ImageWithFallback({
  src,
  alt,
  fallback,
  className = "",
  width,
  height,
}: {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{ width, height }}
        className={`grid place-items-center bg-white/5 text-2xl text-white/30 ${className}`}
      >
        <span aria-hidden>🖼️</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => (fallback && current !== fallback ? setCurrent(fallback) : setFailed(true))}
    />
  );
}
