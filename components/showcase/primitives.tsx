"use client";

/**
 * Showcase primitives — the interactive building blocks of the immersive demo.
 * Every effect is dependency-free (canvas, IntersectionObserver, pointer events,
 * Web Animations) and yields to `prefers-reduced-motion`. Kept small and typed.
 */

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as RMouseEvent,
  type PointerEvent as RPointerEvent,
  type ReactNode,
} from "react";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const noHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

/* ----------------------------------------------------------- scroll bar --- */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? el.scrollTop / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div
      aria-hidden
      ref={ref}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#2440E6] via-[#7C3AED] to-[#22D3EE]"
    />
  );
}

/* --------------------------------------------------------- cursor glow ---- */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced() || noHover()) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = innerWidth / 2;
    let ty = innerHeight / 2;
    let cx = tx;
    let cy = ty;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
    };
    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.transform = `translate(${cx - 180}px, ${cy - 180}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);
  return (
    <div
      aria-hidden
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-20 h-[360px] w-[360px] opacity-0 mix-blend-screen transition-opacity duration-700"
      style={{ background: "radial-gradient(circle, rgba(124,58,237,0.16), transparent 62%)" }}
    />
  );
}

/* ------------------------------------------------------------- marquee ---- */
export function Marquee({
  items,
  reverse = false,
  speed = 34,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={`sc-mask-x overflow-hidden ${className}`}>
      <div
        className="flex w-max items-center gap-10 [animation-play-state:running] hover:[animation-play-state:paused]"
        style={{
          animation: `sc-marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-medium tracking-tight">
            <span className="sc-vweight text-white/55">{t}</span>
            <span aria-hidden className="text-[#7C3AED]">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------- scramble-in heading ---- */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*<>/\\{}[]0123456789";

export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(text);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || typeof IntersectionObserver === "undefined") {
      setOut(text);
      return;
    }
    let raf = 0;
    let revealed = 0;
    let tick = 0;
    const run = () => {
      tick += 1;
      if (tick % 2 === 0) revealed += 1;
      setOut(
        text
          .split("")
          .map((c, i) => (c === " " ? " " : i < revealed ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join(""),
      );
      if (revealed <= text.length) raf = requestAnimationFrame(run);
      else setOut(text);
    };
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            raf = requestAnimationFrame(run);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [text]);
  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}

/* ----------------------------------------------------- magnetic button ---- */
export function MagneticButton({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || noHover()) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.25}px, ${
        (e.clientY - (r.top + r.height / 2)) * 0.4
      }px)`;
    };
    const leave = () => (el.style.transform = "");
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  const styles =
    variant === "solid"
      ? "bg-gradient-to-r from-[#2440E6] to-[#7C3AED] text-white shadow-[0_12px_44px_-12px_rgba(124,58,237,0.9)] hover:shadow-[0_18px_56px_-12px_rgba(124,58,237,1)]"
      : "text-white/90 ring-1 ring-white/20 hover:bg-white/5";
  return (
    <a
      ref={ref}
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-[transform,box-shadow] duration-200 ease-out will-change-transform ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------- ripple button ---- */
export function RippleButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const onClick = (e: RMouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el || reduced()) return;
    const r = el.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const span = document.createElement("span");
    span.style.cssText = `position:absolute;border-radius:9999px;pointer-events:none;width:${size}px;height:${size}px;left:${
      e.clientX - r.left - size / 2
    }px;top:${e.clientY - r.top - size / 2}px;background:rgba(255,255,255,0.4);`;
    span.animate(
      [
        { transform: "scale(0)", opacity: 0.5 },
        { transform: "scale(2.4)", opacity: 0 },
      ],
      { duration: 620, easing: "ease-out" },
    );
    el.appendChild(span);
    window.setTimeout(() => span.remove(), 640);
  };
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`relative overflow-hidden rounded-full ${className}`}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------- toggle ---- */
export function Toggle({ label }: { label: string }) {
  const [on, setOn] = useState(true);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => setOn((v) => !v)}
      className={`relative h-8 w-14 shrink-0 rounded-full transition-colors duration-300 ${
        on ? "bg-gradient-to-r from-[#2440E6] to-[#7C3AED]" : "bg-white/15"
      }`}
    >
      <span
        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all duration-300 ${
          on ? "left-7" : "left-1"
        }`}
      />
    </button>
  );
}

/* ----------------------------------------------------------- tilt card ---- */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || noHover()) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateY(${px * 11}deg) rotateX(${-py * 11}deg)`;
    };
    const leave = () => (el.style.transform = "");
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div className={`sc-perspective ${className}`}>
      <div
        ref={ref}
        className="h-full transition-transform duration-200 ease-out will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------- spotlight card --- */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={onMove} className={`group relative overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(300px circle at var(--mx) var(--my), rgba(124,58,237,0.22), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- count ---- */
export function CountUp({
  to,
  suffix = "",
  duration = 1700,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || typeof IntersectionObserver === "undefined") {
      setVal(to);
      return;
    }
    let raf = 0;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            raf = requestAnimationFrame(step);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [to, duration]);
  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
}

/* --------------------------------------------------------- orbit canvas --- */
export function OrbitCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    const colors = ["#22D3EE", "#7C3AED", "#2440E6"];
    let raf = 0;
    let t = 0;
    let active = false;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      for (let i = 0; i < 3; i++) {
        const rr = (Math.min(w, h) / 2) * (0.34 + i * 0.22);
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
        const a = t * (0.7 - i * 0.18) + i * 2;
        const px = cx + Math.cos(a) * rr;
        const py = cy + Math.sin(a) * rr;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 9);
        g.addColorStop(0, colors[i]);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, 9, 0, Math.PI * 2);
        ctx.fill();
      }
      t += 0.02;
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
    // CODE-REVIEW.md: only animate while visible.
    let io: IntersectionObserver | null = null;
    if (reduced() || typeof IntersectionObserver === "undefined") {
      draw();
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) (e.isIntersecting ? start : stop)();
        },
        { threshold: 0 },
      );
      io.observe(cv);
    }
    return () => {
      stop();
      io?.disconnect();
      ro.disconnect();
    };
  }, []);
  return <canvas ref={ref} aria-hidden className={className} />;
}
