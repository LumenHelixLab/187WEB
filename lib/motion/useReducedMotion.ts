"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe reduced-motion flag.
 * Always starts `false` on server + first client paint, then syncs in useEffect
 * so markup never hydrates with a media-query mismatch.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
