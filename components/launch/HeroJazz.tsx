"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useClientMounted } from "@/lib/motion/useClientMounted";

/**
 * GSAP polish for landing hero media + CTAs.
 * Transform/opacity only — no layout stretch.
 */
export function HeroJazz({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mounted = useClientMounted();

  useEffect(() => {
    if (!mounted || reduced || !rootRef.current) return;
    registerGsap();
    const root = rootRef.current;
    const badge = root.querySelector<HTMLElement>("[data-hero-badge]");
    const word = root.querySelector<HTMLElement>("[data-hero-word]");
    const tag = root.querySelector<HTMLElement>("[data-hero-tag]");
    const pills = root.querySelectorAll<HTMLElement>("[data-hero-pill]");
    const ctas = root.querySelectorAll<HTMLElement>("[data-hero-cta]");

    const ctx = gsap.context(() => {
      if (badge) {
        gsap.fromTo(
          badge,
          { y: 28, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
        );
        gsap.to(badge, {
          y: -8,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1,
        });
      }
      if (word) {
        gsap.fromTo(
          word,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
        );
      }
      if (tag) {
        gsap.fromTo(
          tag,
          { opacity: 0 },
          { opacity: 1, duration: 0.7, delay: 0.4, ease: "power2.out" }
        );
      }
      if (pills.length) {
        gsap.fromTo(
          pills,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, delay: 0.55, ease: "power2.out" }
        );
      }
      if (ctas.length) {
        gsap.fromTo(
          ctas,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, delay: 0.7, ease: "power2.out" }
        );
      }

      // Soft magnetic hover on CTAs
      ctas.forEach((el) => {
        const onEnter = () =>
          gsap.to(el, { scale: 1.04, y: -2, duration: 0.28, ease: "power2.out", overwrite: "auto" });
        const onLeave = () =>
          gsap.to(el, { scale: 1, y: 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);
        el.dataset.gsapHover = "1";
        (el as HTMLElement & { _gsapClean?: () => void })._gsapClean = () => {
          el.removeEventListener("pointerenter", onEnter);
          el.removeEventListener("pointerleave", onLeave);
        };
      });
    }, root);

    return () => {
      ctas.forEach((el) => {
        const c = (el as HTMLElement & { _gsapClean?: () => void })._gsapClean;
        c?.();
      });
      ctx.revert();
    };
  }, [mounted, reduced]);

  return (
    <div ref={rootRef} className="contents">
      {children}
    </div>
  );
}
