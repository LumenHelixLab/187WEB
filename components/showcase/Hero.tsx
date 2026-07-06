"use client";

import { useEffect, useRef } from "react";
import { MagneticButton } from "./primitives";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type P = { x: number; y: number; vx: number; vy: number };

/**
 * Immersive hero: a mouse-reactive particle constellation on canvas, behind a
 * staggered, gradient kinetic headline. The whole thing is the demo's thesis —
 * "this page is the proof." Honors reduced-motion (static frame, no loop).
 */
export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let pts: P[] = [];
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const count = Math.min(92, Math.floor((w * h) / 14000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };
    const resize = () => {
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    const links = () => {
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.strokeStyle = `rgba(124,58,237,${(1 - d / 120) * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = "rgba(184,202,255,0.85)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let active = false;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14400) {
          const d = Math.sqrt(d2) || 1;
          const f = ((120 - d) / 120) * 1.3;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }
      }
      links();
      if (active) raf = requestAnimationFrame(draw);
    };
    const start = () => {
      if (active || reduced()) return;
      active = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      active = false;
      cancelAnimationFrame(raf);
    };

    // CODE-REVIEW.md: pause the loop when the hero is offscreen so it never
    // burns the main thread / raises INP on long scrolls.
    let io: IntersectionObserver | null = null;
    if (reduced()) {
      links();
    } else if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) (e.isIntersecting ? start : stop)();
        },
        { threshold: 0 },
      );
      io.observe(cv);
    } else {
      start();
    }
    return () => {
      stop();
      io?.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const words = [
    { t: "Killer", grad: false },
    { t: "design,", grad: false },
    { t: "in", grad: false },
    { t: "motion.", grad: true },
  ];

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

      {/* Ambient aurora blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="sc-float absolute -left-24 top-10 h-[42vw] w-[42vw] rounded-full bg-[#2440E6]/25 blur-[110px]" />
        <div
          className="sc-float absolute -right-20 bottom-0 h-[40vw] w-[40vw] rounded-full bg-[#7C3AED]/25 blur-[120px]"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="sc-float absolute left-1/3 top-1/2 h-[26vw] w-[26vw] rounded-full bg-[#22D3EE]/15 blur-[100px]"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <span className="sc-rise mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/80 sc-glass">
          <span className="h-2 w-2 rounded-full bg-[#22D3EE] sc-pulse" />
          Live demo · built with the 187webDESIGN skill
        </span>

        <h1 className="text-[clamp(2.8rem,1.2rem+8vw,7rem)] font-bold leading-[0.95] tracking-[-0.03em]">
          {words.map((word, i) => (
            <span
              key={word.t}
              className={`sc-rise mr-[0.25em] ${word.grad ? "sc-grad-text" : "text-white"}`}
              style={{ animationDelay: `${0.15 + i * 0.09}s` }}
            >
              {word.t}
            </span>
          ))}
        </h1>

        <p
          className="sc-rise mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg"
          style={{ animationDelay: "0.6s" }}
        >
          Every section below is a working example of a principle from the skill — kinetic type,
          generative canvas, self-drawing SVG, 3D tilt, and magnetic micro-interactions. Scroll to
          watch it flex.
        </p>

        <div
          className="sc-rise mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "0.75s" }}
        >
          <MagneticButton href="#gallery">Explore the demo ↓</MagneticButton>
          <MagneticButton href="https://github.com/lumenhelixsolutions/187webDESIGN" variant="ghost">
            Get the skill ↗
          </MagneticButton>
        </div>
      </div>

      <a
        href="#gallery"
        aria-label="Scroll to the demo"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-white/40 transition-colors hover:text-white"
      >
        <svg className="sc-cue" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
