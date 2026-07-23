"use client";

import { useEffect, useRef } from "react";
import { brandAssets } from "@/lib/brand-assets";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Cursor / hover sampler: badge + wireframe lean toward the pointer.
 */
export function MagneticMascot() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLImageElement>(null);
  const wireRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    const orb = orbRef.current;
    const wire = wireRef.current;
    const glow = glowRef.current;
    if (!root || !orb || !wire || reducedMotion) return;

    const orbX = gsap.quickTo(orb, "x", { duration: 0.45, ease: "power3.out" });
    const orbY = gsap.quickTo(orb, "y", { duration: 0.45, ease: "power3.out" });
    const wireX = gsap.quickTo(wire, "x", { duration: 0.55, ease: "power3.out" });
    const wireY = gsap.quickTo(wire, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const dist = Math.min(1, Math.hypot(dx, dy) * 1.4);
      orbX(dx * 28);
      orbY(dy * 22);
      wireX(dx * 18);
      wireY(dy * 14);
      if (glow) {
        gsap.to(glow, {
          opacity: 0.25 + dist * 0.55,
          duration: 0.25,
          overwrite: true,
        });
      }
    };

    const onLeave = () => {
      orbX(0);
      orbY(0);
      wireX(0);
      wireY(0);
      if (glow) {
        gsap.to(glow, { opacity: 0.2, duration: 0.4, overwrite: true });
      }
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf([orb, wire, glow]);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="relative flex h-full min-h-[18rem] w-full items-center justify-center overflow-hidden bg-sc-void"
      aria-label="Magnetic mascot sampler — move pointer to pull the brand marks"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(57,255,20,0.35),transparent_55%)]"
        style={{ opacity: 0.2 }}
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
      <img
        ref={wireRef}
        src={brandAssets.mascotWireframe}
        alt=""
        width={220}
        height={220}
        className="pointer-events-none absolute h-40 w-40 object-contain opacity-70 sm:h-48 sm:w-48"
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
      <img
        ref={orbRef}
        src={brandAssets.orb}
        alt="187WEB badge"
        width={96}
        height={96}
        className="pointer-events-none relative z-10 h-20 w-20 object-contain drop-shadow-[0_0_24px_rgba(57,255,20,0.45)] sm:h-24 sm:w-24"
        decoding="async"
      />
      <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[10px] uppercase tracking-[0.2em] text-white/40">
        {reducedMotion ? "Static brand pair" : "Move cursor · magnetic pull"}
      </p>
    </div>
  );
}
