"use client";

import { useEffect, useRef } from "react";
import { DemoCard, useInView, useReducedMotion } from "@/components/demo-lab/kit";

const ACCENT = "#22d3ee";

/** Pointer-drag-to-rotate a preserve-3d stage; falls back to auto-spin when idle/untouched. */
function useDragSpin(auto: boolean) {
  const stage = useRef<HTMLDivElement>(null);
  const rot = useRef(0);
  const vel = useRef(0.25);
  const dragging = useRef(false);
  const last = useRef(0);
  const raf = useRef(0);
  const active = useRef(true);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (!auto) {
      el.style.transform = "rotateX(-12deg) rotateY(0deg)";
      return;
    }
    const loop = () => {
      if (!dragging.current) rot.current += vel.current;
      el.style.transform = `rotateX(-12deg) rotateY(${rot.current}deg)`;
      if (active.current) raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    const down = (e: PointerEvent) => {
      dragging.current = true;
      last.current = e.clientX;
      el.setPointerCapture?.(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - last.current;
      last.current = e.clientX;
      rot.current += dx * 0.6;
      vel.current = dx * 0.15 || vel.current;
    };
    const up = () => {
      dragging.current = false;
      vel.current = Math.max(-2, Math.min(2, vel.current)) || 0.25;
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      active.current = false;
      cancelAnimationFrame(raf.current);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [auto]);
  return stage;
}

function Panel({ i, total, radius, label, tall = false }: { i: number; total: number; radius: number; label: string; tall?: boolean }) {
  const angle = (360 / total) * i;
  return (
    <div
      className={`absolute grid place-items-center rounded-lg border text-sm font-bold text-white/90 backdrop-blur-sm ${tall ? "h-24 w-16" : "h-16 w-20"}`}
      style={{
        left: "50%",
        top: "50%",
        marginLeft: tall ? "-2rem" : "-2.5rem",
        marginTop: tall ? "-3rem" : "-2rem",
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        background: "color-mix(in srgb, #22d3ee 14%, #0a0c14)",
        borderColor: "color-mix(in srgb, #22d3ee 40%, transparent)",
        boxShadow: "0 0 24px -8px #22d3ee",
      }}
    >
      {label}
    </div>
  );
}

export function RadialCarousel() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const stage = useDragSpin(inView && !reduced);
  return (
    <DemoCard name="Inertia-Orbital Carousel" command="/187radial3d" how="Cards placed on a rotateY+translateZ ring; Draggable spins it with inertia, auto-rotates at rest." mode="drag" accent={ACCENT}>
      <div ref={ref} className="h-40 w-full touch-none" style={{ perspective: "700px" }}>
        <div ref={stage} className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          {["01", "02", "03", "04", "05", "06"].map((l, i) => (
            <Panel key={l} i={i} total={6} radius={110} label={l} />
          ))}
        </div>
      </div>
    </DemoCard>
  );
}

export function CylCarousel() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const stage = useDragSpin(inView && !reduced);
  return (
    <DemoCard name="Cylindrical Carousel" command="/187cylcarousel" how="Image panels wrapped on a cylinder via rotateY increments; drag to rotate, inertia snaps to the nearest." mode="drag" accent={ACCENT}>
      <div ref={ref} className="h-40 w-full touch-none" style={{ perspective: "760px" }}>
        <div ref={stage} className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          {["A", "B", "C", "D", "E", "F", "G", "H"].map((l, i) => (
            <Panel key={l} i={i} total={8} radius={130} label={l} tall />
          ))}
        </div>
      </div>
    </DemoCard>
  );
}

export function CubeFlip() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const running = inView && !reduced;
  const faces = [
    { t: "rotateY(0deg) translateZ(40px)", l: "1" },
    { t: "rotateY(90deg) translateZ(40px)", l: "2" },
    { t: "rotateY(180deg) translateZ(40px)", l: "3" },
    { t: "rotateY(270deg) translateZ(40px)", l: "4" },
    { t: "rotateX(90deg) translateZ(40px)", l: "5" },
    { t: "rotateX(-90deg) translateZ(40px)", l: "6" },
  ];
  return (
    <DemoCard name="Hardware Cube Flip" command="/187cube3d" how="Six faces on a preserve-3d cube, backface-visibility hidden; tweens rotateY/X by 90° steps." mode="auto" accent={ACCENT}>
      <div ref={ref} style={{ perspective: "600px" }}>
        <div className="tp-cube relative h-20 w-20" style={{ transformStyle: "preserve-3d", animationPlayState: running ? "running" : "paused" }}>
          {faces.map((f) => (
            <span
              key={f.l}
              className="absolute inset-0 grid h-20 w-20 place-items-center rounded-md text-lg font-black text-white"
              style={{ transform: f.t, background: "color-mix(in srgb, #22d3ee 18%, #0a0c14)", border: "1px solid color-mix(in srgb, #22d3ee 45%, transparent)", backfaceVisibility: "hidden" }}
            >
              {f.l}
            </span>
          ))}
        </div>
      </div>
    </DemoCard>
  );
}

export function Tornado() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const running = inView && !reduced;
  const count = 10;
  return (
    <DemoCard name="Helical Card Tornado" command="/187tornado3d" how="Cards arranged on a helix (rotateY + translateZ + rising translateY); the whole funnel spins." mode="auto" accent={ACCENT}>
      <div ref={ref} className="h-44 w-full" style={{ perspective: "800px" }}>
        <div className="tp-tornado relative mx-auto h-full w-full" style={{ transformStyle: "preserve-3d", animationPlayState: running ? "running" : "paused" }}>
          {Array.from({ length: count }, (_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 h-8 w-12 rounded border"
              style={{
                marginLeft: "-1.5rem",
                marginTop: "-1rem",
                transform: `rotateY(${(360 / count) * i * 1.5}deg) translateZ(70px) translateY(${(i - count / 2) * 12}px)`,
                background: "color-mix(in srgb, #22d3ee 16%, #0a0c14)",
                borderColor: "color-mix(in srgb, #22d3ee 40%, transparent)",
              }}
            />
          ))}
        </div>
      </div>
    </DemoCard>
  );
}

export function TiltCard() {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const area = areaRef.current;
    const card = cardRef.current;
    if (!area || !card || reduced) return;
    const move = (e: PointerEvent) => {
      const r = area.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${px * 30}deg) rotateX(${-py * 30}deg)`;
    };
    const leave = () => {
      card.style.transform = "rotateY(0deg) rotateX(0deg)";
    };
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    return () => {
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
    };
  }, [reduced]);
  return (
    <DemoCard name="Mouse-Tilt 3D Card" command="/187perspective3d" how="Pointer position maps to clamped rotateX/Y (±15°) with a quickTo lag and a specular sheen." mode="hover" accent={ACCENT}>
      <div ref={areaRef} className="grid h-40 w-full place-items-center" style={{ perspective: "700px" }}>
        <div
          ref={cardRef}
          className="relative grid h-28 w-40 place-items-center rounded-xl border text-lg font-black text-white transition-transform duration-200 ease-out"
          style={{ transformStyle: "preserve-3d", background: "linear-gradient(135deg, color-mix(in srgb, #22d3ee 30%, #0a0c14), #0a0c14)", borderColor: "color-mix(in srgb, #22d3ee 45%, transparent)", boxShadow: "0 20px 50px -20px #22d3ee" }}
        >
          187MODEL
        </div>
      </div>
    </DemoCard>
  );
}

export function PhysicsCascade() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const running = inView && !reduced;
  return (
    <DemoCard name="Physics Cascade" command="/187physicscascade" how="A 2D physics engine (Matter.js) drives collisions and gravity, mapped onto stacked 3D objects." mode="auto" accent={ACCENT}>
      <div ref={ref} className="relative flex h-40 w-full items-end justify-center gap-2 pb-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="tp-drop h-8 w-8 rounded-md"
            style={{
              background: "color-mix(in srgb, #22d3ee 22%, #0a0c14)",
              border: "1px solid color-mix(in srgb, #22d3ee 45%, transparent)",
              animationDelay: `${i * 0.22}s`,
              animationPlayState: running ? "running" : "paused",
            }}
          />
        ))}
        <div className="absolute inset-x-6 bottom-2 h-px bg-white/15" />
      </div>
    </DemoCard>
  );
}
