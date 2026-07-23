"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";
import { useGsapTimeline } from "@/lib/motion/useGsapTimeline";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import {
  MOTION_LAB_VOID,
  MOTION_LAB_PRIMARY,
  MOTION_LAB_SECONDARY,
  MOTION_LAB_CYAN,
  MOTION_LAB_ROSE,
} from "@/lib/motion/palette";

function DemoBox({ color, label }: { color: string; label: string }) {
  return (
    <div
      className="flex h-16 w-16 items-center justify-center rounded-lg text-[0.6rem] font-bold uppercase tracking-wide"
      style={{ backgroundColor: color, color: MOTION_LAB_VOID }}
    >
      {label}
    </div>
  );
}

export function MotionHooksDemo() {
  const reducedMotion = useReducedMotion();
  const springRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<HTMLDivElement>(null);
  const staggerRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);

  useGsapTimeline(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    if (springRef.current) {
      tl.fromTo(
        springRef.current,
        { y: 0, scale: 1 },
        { y: -20, scale: 1.15, duration: 0.8, ease: "elastic.out(1, 0.4)" },
        0,
      );
    }
    return tl;
  }, []);

  useGsapTimeline(() => {
    const tl = gsap.timeline({ repeat: -1 });
    if (loopRef.current) {
      tl.to(loopRef.current, { rotation: 360, duration: 3, ease: "none" });
    }
    return tl;
  }, []);

  useGsapTimeline(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    const children = staggerRef.current?.children;
    if (children && children.length > 0) {
      tl.fromTo(
        Array.from(children),
        { y: 0, opacity: 0.3 },
        { y: -12, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" },
      );
      tl.to(Array.from(children), { y: 0, opacity: 0.3, duration: 0.4, stagger: 0.08, ease: "power2.in" });
    }
    return tl;
  }, []);

  useGsapTimeline(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrubRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
    });
    if (scrubRef.current) {
      tl.fromTo(scrubRef.current, { x: -60, opacity: 0.3 }, { x: 60, opacity: 1, duration: 1, ease: "none" });
    }
    return tl;
  }, []);

  useEffect(() => {
    if (!reducedMotion) return;
    [springRef, loopRef, staggerRef, scrubRef].forEach((ref) => {
      if (ref.current) {
        gsap.set(ref.current, { clearProps: "all" });
      }
    });
  }, [reducedMotion]);

  return (
    <div className="grid min-h-[18rem] grid-cols-2 gap-4 rounded-2xl bg-gradient-to-b from-sc-panel to-sc-void p-5 sm:grid-cols-4">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-white/5 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Spring</p>
        <div ref={springRef}>
          <DemoBox color={MOTION_LAB_PRIMARY} label="Spring" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-white/5 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Loop</p>
        <div ref={loopRef}>
          <DemoBox color={MOTION_LAB_SECONDARY} label="Loop" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-white/5 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Stagger</p>
        <div ref={staggerRef} className="flex gap-1">
          <DemoBox color={MOTION_LAB_CYAN} label="A" />
          <DemoBox color={MOTION_LAB_CYAN} label="B" />
          <DemoBox color={MOTION_LAB_CYAN} label="C" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-white/5 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Scrub</p>
        <div ref={scrubRef}>
          <DemoBox color={MOTION_LAB_ROSE} label="Scrub" />
        </div>
      </div>
    </div>
  );
}
