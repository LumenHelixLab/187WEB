"use client";

import { useEffect, useRef } from "react";
import { brandAssets } from "@/lib/brand-assets";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useClientMounted } from "@/lib/motion/useClientMounted";

/**
 * Soft hologram mascot drifting in the animated background layer.
 * Official asset is wireframe spider on white — multiply drops the white plate
 * on the dark hive so only the line art remains. Transform/opacity only.
 */
export function WebHiveHoloMascot() {
  const mounted = useClientMounted();
  const reduced = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);
  // Cache-bust when asset bytes change (Pages + browser max-age=600).
  const src = `${brandAssets.mascotHoloBg}?v=holo-185k`;

  useEffect(() => {
    if (!mounted || reduced || !imgRef.current) return;
    registerGsap();
    const el = imgRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.9 },
        { opacity: 0.38, scale: 1, duration: 2.2, ease: "power2.out" }
      );
      gsap.to(el, {
        y: -16,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(el, {
        rotate: 2,
        duration: 11,
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
        width={900}
        height={900}
        decoding="async"
        className={`max-h-[min(90vh,56rem)] w-auto max-w-[min(96vw,48rem)] object-contain ${
          reduced ? "opacity-[0.28]" : "opacity-0"
        }`}
        style={{
          // White plate disappears; green/red wireframe stays on the dark hive.
          mixBlendMode: "multiply",
          filter: "contrast(1.15) saturate(1.2) brightness(1.35)",
        }}
      />
    </div>
  );
}
