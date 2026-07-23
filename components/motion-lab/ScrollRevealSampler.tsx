"use client";

import { useEffect, useRef } from "react";
import { brandAssets } from "@/lib/brand-assets";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Scroll-driven reveal inside a fixed-height card scroller.
 */
export function ScrollRevealSampler() {
  const reducedMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const wireRef = useRef<HTMLImageElement>(null);
  const wordRef = useRef<HTMLImageElement>(null);
  const orbRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    registerGsap();
    const scroller = scrollerRef.current;
    if (!scroller || reducedMotion) return;

    const ctx = gsap.context(() => {
      const items = [
        { el: wireRef.current, y: 48 },
        { el: wordRef.current, y: 36 },
        { el: orbRef.current, y: 24 },
      ];

      items.forEach(({ el, y }, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              scroller,
              trigger: el,
              start: "top 90%",
              end: "top 45%",
              scrub: 0.6,
            },
            delay: i * 0.05,
          }
        );
      });
    }, scroller);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.scroller === scroller) st.kill();
      });
    };
  }, [reducedMotion]);

  return (
    <div className="relative flex h-full min-h-[18rem] w-full flex-col overflow-hidden bg-sc-void">
      <div
        ref={scrollerRef}
        className="flex-1 overflow-y-auto overscroll-contain px-4 py-6"
        style={{ maxHeight: "18rem" }}
        tabIndex={0}
        aria-label="Scroll reveal sampler — scroll inside this card"
      >
        <div className="flex min-h-[28rem] flex-col items-center justify-start gap-8 pb-10 pt-4">
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-white/40">
            Scroll inside · brand stack
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
          <img
            ref={wireRef}
            src={brandAssets.mascotWireframe}
            alt="Wireframe mascot"
            width={180}
            height={180}
            className="h-36 w-36 object-contain opacity-90"
            decoding="async"
            style={reducedMotion ? undefined : { opacity: 0 }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
          <img
            ref={wordRef}
            src={brandAssets.wordmarkTagline}
            alt="187WEB wordmark and tagline"
            width={320}
            height={80}
            className="h-14 w-auto max-w-[90%] object-contain"
            decoding="async"
            style={reducedMotion ? undefined : { opacity: 0 }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
          <img
            ref={orbRef}
            src={brandAssets.orb}
            alt="187WEB badge"
            width={72}
            height={72}
            className="h-16 w-16 object-contain drop-shadow-[0_0_18px_rgba(57,255,20,0.4)]"
            decoding="async"
            style={reducedMotion ? undefined : { opacity: 0 }}
          />
          <div className="h-16" aria-hidden />
        </div>
      </div>
      <p className="border-t border-white/5 py-2 text-center text-[10px] uppercase tracking-[0.2em] text-white/35">
        {reducedMotion ? "Static stack (reduced motion)" : "ScrollTrigger · card scroller"}
      </p>
    </div>
  );
}
