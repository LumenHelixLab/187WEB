"use client";

import { useEffect, useRef, useState } from "react";
import {
  gsap,
  Draggable,
  CustomEase,
  registerGsap,
  registerAdvancedGsapPlugins,
} from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const SHAPE_BLOB = "M50,10 C75,10 90,30 90,50 C90,75 70,90 50,90 C25,90 10,70 10,50 C10,25 30,10 50,10 Z";
const SHAPE_SPARK = "M50,5 C55,35 65,45 95,50 C65,55 55,65 50,95 C45,65 35,55 5,50 C35,45 45,35 50,5 Z";

/**
 * 187GSAP toolkit sampler — the advanced plugin trio registerAdvancedGsapPlugins()
 * wires up but no other motion-lab scene exercises: DrawSVGPlugin (stroke draw-in),
 * MorphSVGPlugin (shape swap on click), and Draggable + InertiaPlugin (momentum chip).
 */
export function GsapToolkit() {
  const reducedMotion = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<HTMLDivElement>(null);
  const [morphed, setMorphed] = useState(false);

  useEffect(() => {
    registerGsap();
    registerAdvancedGsapPlugins();
    if (!CustomEase.get("gsapToolkitDraw")) {
      CustomEase.create("gsapToolkitDraw", "M0,0 C0.3,0 0.2,1 1,1");
    }
    const path = pathRef.current;
    if (!path) return;

    if (reducedMotion) {
      gsap.set(path, { drawSVG: "0% 100%" });
      return;
    }

    const tween = gsap.fromTo(
      path,
      { drawSVG: "0% 0%" },
      { drawSVG: "0% 100%", duration: 1.4, ease: "gsapToolkitDraw" },
    );
    return () => {
      tween.kill();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const chip = chipRef.current;
    const bounds = boundsRef.current;
    if (!chip || !bounds) return;

    registerGsap();
    const [draggable] = Draggable.create(chip, {
      type: "x,y",
      bounds,
      inertia: !reducedMotion,
      edgeResistance: 0.65,
    });
    return () => {
      draggable?.kill();
    };
  }, [reducedMotion]);

  const toggleMorph = () => {
    const path = pathRef.current;
    if (!path) return;
    const next = !morphed;
    setMorphed(next);
    const shape = next ? SHAPE_SPARK : SHAPE_BLOB;
    if (reducedMotion) {
      gsap.set(path, { morphSVG: shape });
      return;
    }
    gsap.to(path, { morphSVG: shape, duration: 0.6, ease: "power2.inOut" });
  };

  return (
    <div className="relative flex h-full min-h-[18rem] w-full flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-to-b from-sc-panel to-sc-void p-4">
      <button type="button" onClick={toggleMorph} aria-label="Morph the shape" className="h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-28 w-28">
          <path
            ref={pathRef}
            d={SHAPE_BLOB}
            fill="none"
            strokeWidth={3}
            strokeLinecap="round"
            className="text-sc-primary stroke-current"
          />
        </svg>
      </button>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Click to morph · DrawSVG + MorphSVG</p>
      <div ref={boundsRef} className="relative h-16 w-full max-w-[14rem] rounded-full border border-white/10 bg-white/5">
        <div
          ref={chipRef}
          className="absolute left-1 top-1 flex h-10 w-10 cursor-grab items-center justify-center rounded-full bg-sc-secondary text-[10px] font-bold text-white active:cursor-grabbing"
        >
          drag
        </div>
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Draggable + Inertia</p>
    </div>
  );
}
