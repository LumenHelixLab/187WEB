"use client";

import { useEffect, useRef, useState } from "react";
import { DemoCard, useCanvas2D, useInView, useReducedMotion } from "@/components/demo-lab/kit";

const ACCENT = "#39FF14";

export function SplashLoader() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const running = inView && !reduced;
  return (
    <DemoCard name="Mascot Splash Loader" command="/187willemloader" how="A walking mascot whose stride maps to load progress; the bar fills, then the loader fades out." mode="auto" accent={ACCENT}>
      <div ref={ref} className="flex w-2/3 flex-col items-center gap-4">
        <div className="tp-walk relative h-10 w-10" style={{ animationPlayState: running ? "running" : "paused" }}>
          <span className="absolute inset-0 rounded-full border-2 border-[#39FF14]" />
          <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39FF14]" />
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="tp-loadbar h-full rounded-full bg-[#39FF14]" style={{ animationPlayState: running ? "running" : "paused" }} />
        </div>
      </div>
    </DemoCard>
  );
}

export function LogoMorph() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const running = inView && !reduced;
  return (
    <DemoCard name="Morphing Logo Splash" command="/187logoload" how="A logo mark scales up and settles with a MorphSVG shape shift and power4 ease before the splash clears." mode="auto" accent={ACCENT}>
      <div ref={ref} className="grid place-items-center">
        <svg viewBox="0 0 80 80" className="tp-logopop h-20 w-20" style={{ animationPlayState: running ? "running" : "paused" }}>
          <polygon points="40,8 68,24 68,56 40,72 12,56 12,24" fill="none" stroke="#39FF14" strokeWidth={3} strokeLinejoin="round" />
          <text x="40" y="48" textAnchor="middle" fontSize="20" fontWeight="800" fill="#39FF14">187</text>
        </svg>
      </div>
    </DemoCard>
  );
}

export function FaceTracker() {
  const reduced = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);
  const lpRef = useRef<SVGCircleElement>(null);
  const rpRef = useRef<SVGCircleElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 150);
    }, 3800);
    return () => window.clearInterval(id);
  }, [reduced]);
  const onMove = (e: React.PointerEvent) => {
    const area = areaRef.current;
    if (!area) return;
    const r = area.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
    lpRef.current?.setAttribute("transform", `translate(${clamp(dx * 12, 4)}, ${clamp(dy * 12, 4)})`);
    rpRef.current?.setAttribute("transform", `translate(${clamp(dx * 12, 4)}, ${clamp(dy * 12, 4)})`);
    headRef.current?.setAttribute("transform", `rotate(${clamp(dx * 12, 6)} 40 40)`);
  };
  return (
    <DemoCard name="Mascot Face Tracker" command="/187mascotface" how="SVG pupils track the pointer (clamped), the head tilts toward it, and a blink timeline fires every few seconds." mode="hover" accent={ACCENT}>
      <div ref={areaRef} onPointerMove={onMove} className="grid h-32 w-full place-items-center">
        <svg viewBox="0 0 80 80" className="h-28 w-28">
          <g ref={headRef}>
            <rect x="14" y="14" width="52" height="52" rx="16" fill="#0a0c14" stroke="#39FF14" strokeWidth={2.5} />
            {[30, 50].map((cx, i) => (
              <g key={cx}>
                <circle cx={cx} cy="38" r="8" fill="#06070c" stroke="#39FF14" strokeWidth={1.5} />
                <circle ref={i === 0 ? lpRef : rpRef} cx={cx} cy="38" r="3.5" fill="#39FF14" style={{ opacity: blink ? 0 : 1 }} />
              </g>
            ))}
            <path d="M32 56 Q40 62 48 56" fill="none" stroke="#39FF14" strokeWidth={2} strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </DemoCard>
  );
}

const PX = 24; // player x
const GRAVITY = 1300; // px/s²
const JUMP_V = 330; // px/s

type Obstacle = { x: number; scored: boolean };

export function MiniGame() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [score, setScore] = useState(0);
  const game = useRef({ y: 0, vy: 0, obstacles: [] as Obstacle[], last: -1, spawn: 0.6, score: 0, manual: false });
  const jump = () => {
    const g = game.current;
    g.manual = true; // hand control to the player on first input
    if (g.y <= 0.5) g.vy = JUMP_V;
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && ref.current?.matches(":hover")) {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const canvasRef = useCanvas2D((ctx, t, w, h) => {
    const g = game.current;
    const dt = g.last < 0 ? 0.016 : Math.min(0.05, t - g.last);
    g.last = t;
    const ground = h - 14;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath();
    ctx.moveTo(0, ground);
    ctx.lineTo(w, ground);
    ctx.stroke();

    if (!reduced) {
      // physics (px units)
      g.vy -= GRAVITY * dt;
      g.y = g.y + g.vy * dt;
      if (g.y <= 0) {
        g.y = 0;
        g.vy = 0;
      }
      // spawn + advance obstacles
      g.spawn -= dt;
      if (g.spawn <= 0) {
        g.obstacles.push({ x: w + 12, scored: false });
        g.spawn = 1.0 + Math.random() * 0.8;
      }
      g.obstacles.forEach((o) => (o.x -= 165 * dt));
      g.obstacles = g.obstacles.filter((o) => o.x > -16);
      // auto-hop until the player takes over; never dies
      if (g.y <= 0.5) {
        for (const o of g.obstacles) {
          if (o.x - PX > 4 && o.x - PX < 52) {
            g.vy = JUMP_V;
            break;
          }
        }
      }
      // score when an obstacle passes the player
      for (const o of g.obstacles) {
        if (!o.scored && o.x + 8 < PX) {
          o.scored = true;
          g.score += 1;
          setScore(g.score);
        }
      }
    }

    // obstacles
    ctx.fillStyle = "#f472b6";
    for (const o of g.obstacles) ctx.fillRect(o.x, ground - 14, 8, 14);
    // player
    const py = ground - 12 - Math.min(g.y, h - 26);
    ctx.fillStyle = ACCENT;
    ctx.fillRect(PX - 6, py, 12, 12);
    // eye for character
    ctx.fillStyle = "#06070c";
    ctx.fillRect(PX, py + 2, 3, 3);
  }, inView && !reduced);
  return (
    <DemoCard name="404 Distractor Game" command="/187minigame" how="A canvas endless-runner (rAF game loop) — it plays itself, but tap or press Space to take the controls and jump." mode="click" accent={ACCENT}>
      <div ref={ref} className="relative h-full w-full" onPointerDown={jump} role="button" tabIndex={0} aria-label="Jump">
        <canvas ref={canvasRef} className="h-32 w-full cursor-pointer" />
        <span className="pointer-events-none absolute right-3 top-3 font-mono text-xs font-bold text-[#39FF14]">{score}</span>
      </div>
    </DemoCard>
  );
}

export function CenterNav() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const running = inView && !reduced;
  return (
    <DemoCard name="Hero-to-Header Nav" command="/187centernav" how="On scroll the wordmark scales and travels from hero-centre to its docked header-top-left position." mode="auto" accent={ACCENT}>
      <div ref={ref} className="relative h-32 w-full rounded-lg border border-white/10">
        <div className="absolute inset-x-0 top-0 h-6 border-b border-white/10 bg-white/[0.03]" />
        <span className="tp-centernav absolute font-black tracking-tight text-[#39FF14]" style={{ animationPlayState: running ? "running" : "paused" }}>
          187WEB
        </span>
      </div>
    </DemoCard>
  );
}

export function ShaderWipe() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const canvasRef = useCanvas2D((ctx, t, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const cell = 9;
    const cols = Math.ceil(w / cell);
    const rows = Math.ceil(h / cell);
    const phase = (t * 0.35) % 2; // 0..2 loop
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // deterministic per-cell threshold (hash) → disintegration order
        const n = ((c * 73856093) ^ (r * 19349663)) >>> 0;
        const thr = (n % 1000) / 1000;
        const p = phase < 1 ? phase : 2 - phase; // in then out
        const on = thr < p;
        if (!on) continue;
        const jitter = Math.sin(t * 3 + n) * (1 - Math.abs(p - thr) * 6);
        ctx.fillStyle = `rgba(57,255,20,${0.25 + (1 - thr) * 0.5})`;
        ctx.fillRect(c * cell + 1, r * cell + 1 + Math.max(0, jitter), cell - 2, cell - 2);
      }
    }
  }, inView && !reduced);
  return (
    <DemoCard name="GLSL Disintegration" command="/187shaderwipe" how="A cell-dissolve page transition — the WebGL shader's per-fragment threshold, ported to a canvas grid that assembles and scatters." mode="auto" accent={ACCENT}>
      <div ref={ref} className="h-full w-full">
        <canvas ref={canvasRef} className="h-32 w-full" />
      </div>
    </DemoCard>
  );
}

export function VolumeFog() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const mouse = useRef({ x: 0.5, y: 0.4 });
  const canvasRef = useCanvas2D((ctx, t, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const mx = mouse.current.x * w;
    const my = mouse.current.y * h;
    // volumetric cone from top toward the cursor
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 5; i++) {
      const spread = 20 + i * 14;
      const g = ctx.createLinearGradient(mx, 0, mx, h);
      g.addColorStop(0, `rgba(57,255,20,${0.12 - i * 0.015})`);
      g.addColorStop(1, "rgba(57,255,20,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(mx - 4, 0);
      ctx.lineTo(mx + 4, 0);
      ctx.lineTo(mx + spread + Math.sin(t + i) * 6, h);
      ctx.lineTo(mx - spread + Math.sin(t + i) * 6, h);
      ctx.closePath();
      ctx.fill();
    }
    // glowing orb at cursor
    const orb = ctx.createRadialGradient(mx, my, 0, mx, my, 22);
    orb.addColorStop(0, "rgba(57,255,20,0.9)");
    orb.addColorStop(1, "rgba(57,255,20,0)");
    ctx.fillStyle = orb;
    ctx.beginPath();
    ctx.arc(mx, my, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }, inView && !reduced);
  const onMove = (e: React.PointerEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouse.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  };
  return (
    <DemoCard name="Volumetric Fog Cursor" command="/187volumefog" how="Light rays and a glowing orb follow the pointer through additive fog — the FogExp2 + cone-mesh cursor, in 2D." mode="hover" accent={ACCENT}>
      <div ref={ref} className="h-full w-full" onPointerMove={onMove}>
        <canvas ref={canvasRef} className="h-32 w-full" />
      </div>
    </DemoCard>
  );
}

export function HoloDeconstruct() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const mouse = useRef({ x: -1, y: -1 });
  const canvasRef = useCanvas2D((ctx, t, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const cols = 22;
    const rows = 11;
    const gx = w / cols;
    const gy = h / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const bx = (c + 0.5) * gx;
        const by = (r + 0.5) * gy;
        const dx = mouse.current.x - bx;
        const dy = mouse.current.y - by;
        const dist = Math.hypot(dx, dy);
        const push = mouse.current.x < 0 ? 0 : Math.max(0, 1 - dist / 70);
        const ox = bx - (dx / (dist || 1)) * push * 16 + Math.sin(t * 2 + c) * push * 4;
        const oy = by - (dy / (dist || 1)) * push * 16;
        const scale = 1 + push * 1.4;
        const alpha = 0.28 + push * 0.7;
        ctx.fillStyle = `rgba(57,255,20,${alpha})`;
        const s = Math.max(1.2, 2.4 * scale);
        ctx.fillRect(ox - s / 2, oy - s / 2, s, s);
      }
    }
  }, inView && !reduced);
  const onMove = (e: React.PointerEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const leave = () => {
    mouse.current = { x: -1, y: -1 };
  };
  return (
    <DemoCard name="Holographic Deconstruction" command="/187holointeract" how="An image sampled onto a point grid; the pointer displaces and scatters nearby points — the 100×100 PlaneGeometry, in canvas." mode="hover" accent={ACCENT}>
      <div ref={ref} className="h-full w-full" onPointerMove={onMove} onPointerLeave={leave}>
        <canvas ref={canvasRef} className="h-32 w-full" />
      </div>
    </DemoCard>
  );
}
