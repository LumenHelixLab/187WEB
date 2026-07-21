"use client";

import { useEffect, useRef } from "react";

export type ScrollProgress = {
  progress: number;
  velocity: number;
  direction: number;
};

export function useScrollProgress() {
  const ref = useRef<ScrollProgress>({
    progress: 0,
    velocity: 0,
    direction: 0,
  });

  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let lastTime =
      typeof window !== "undefined" ? performance.now() : Date.now();

    const handler = () => {
      if (typeof window === "undefined") return;
      const h = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const velocity = (y - lastY) / dt;
      ref.current = {
        progress: y / h,
        velocity,
        direction: velocity === 0 ? 0 : velocity > 0 ? 1 : -1,
      };
      lastY = y;
      lastTime = now;
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();

    return () => window.removeEventListener("scroll", handler);
  }, []);

  return ref;
}
