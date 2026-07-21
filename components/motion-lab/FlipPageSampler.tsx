"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { brandAssets } from "@/lib/brand-assets";
import { Flip, gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const TILES = ["craft", "gsap", "ship", "hive"] as const;

/**
 * Page-transition / layout morph sampler using GSAP Flip.
 */
export function FlipPageSampler() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<(typeof TILES)[number]>("craft");

  useLayoutEffect(() => {
    registerGsap();
    if (reducedMotion || !flipStateRef.current) {
      flipStateRef.current = null;
      return;
    }
    const state = flipStateRef.current;
    flipStateRef.current = null;
    Flip.from(state, {
      duration: 0.55,
      ease: "power2.inOut",
      absolute: true,
      nested: true,
      onEnter: (elements) => gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, duration: 0.35 }),
      onLeave: (elements) => gsap.to(elements, { opacity: 0, duration: 0.2 }),
    });
  }, [open, active, reducedMotion]);

  const captureAndToggle = (id?: (typeof TILES)[number]) => {
    registerGsap();
    const root = rootRef.current;
    if (root && !reducedMotion) {
      flipStateRef.current = Flip.getState(root.querySelectorAll("[data-flip-id]"));
    }
    if (id) setActive(id);
    setOpen((v) => !v);
  };

  return (
    <div
      ref={rootRef}
      className="relative flex h-full min-h-[18rem] w-full flex-col overflow-hidden bg-[#050608] p-4"
      aria-label="Flip layout sampler"
    >
      {!open ? (
        <div className="grid flex-1 grid-cols-2 gap-3" data-flip-id="grid">
          {TILES.map((id) => (
            <button
              key={id}
              type="button"
              data-flip-id={`tile-${id}`}
              onClick={() => captureAndToggle(id)}
              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-[#39FF14]/40 hover:bg-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
              <img
                src={brandAssets.triangleIcon}
                alt=""
                width={56}
                height={56}
                className="h-12 w-12 object-contain transition group-hover:scale-105"
                decoding="async"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                {id}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div
          data-flip-id="detail"
          className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
          <img
            data-flip-id={`tile-${active}`}
            src={brandAssets.headerLockup}
            alt="187WEB lockup"
            width={320}
            height={96}
            className="h-12 w-auto max-w-full object-contain"
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
          <img
            src={brandAssets.mascotReference}
            alt="187WEB mascot"
            width={160}
            height={160}
            className="h-28 w-28 object-contain"
            decoding="async"
          />
          <p className="text-xs text-white/50">
            Detail · <span className="uppercase tracking-wider text-[#39FF14]">{active}</span>
          </p>
          <button
            type="button"
            onClick={() => captureAndToggle()}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/80 transition hover:border-[#39FF14]/40 hover:text-[#39FF14]"
          >
            Back to grid
          </button>
        </div>
      )}
      <p className="mt-2 text-center text-[10px] uppercase tracking-[0.2em] text-white/35">
        {reducedMotion ? "Cross-fade (reduced motion)" : "Click a tile · Flip morph"}
      </p>
    </div>
  );
}
