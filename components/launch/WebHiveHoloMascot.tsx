"use client";

import { useEffect, useRef } from "react";
import { brandAssets } from "@/lib/brand-assets";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useClientMounted } from "@/lib/motion/useClientMounted";

/**
 * CORE mascot as a quiet ambient layer behind content.
 * Low opacity only — no glow, no blend, no filter — so it never dominates the UI.
 */
export function WebHiveHoloMascot() {
  const mounted = useClientMounted();
  const reduced = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);
  const src = brandAssets.mascotCore;

  useEffect(() => {
    if (!mounted || reduced || !imgRef.current) return;
    registerGsap();
    const el = imgRef.current;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: -10,
        duration: 9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, [mounted, reduced]);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
      <img
        ref={imgRef}
        src={src}
        alt=""
        width={800}
        height={800}
        decoding="async"
        className="max-h-[min(78vh,42rem)] w-auto max-w-[min(80vw,36rem)] object-contain opacity-[0.14]"
      />
    </div>
  );
}
