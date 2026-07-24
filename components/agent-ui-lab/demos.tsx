"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { DemoCard, useCanvas2D, useInView, useReducedMotion } from "@/components/demo-lab/kit";
import { gsap, registerGsap } from "@/lib/motion/gsap";

const ACCENT = "#60a5fa";

/* ---------------------------------------------------------------------- */
/* 1. Agent status chip — guarded state table + GSAP-spun ring            */
/* ---------------------------------------------------------------------- */

type AgentState = "idle" | "thinking" | "acting" | "error";

const TRANSITIONS: Record<AgentState, AgentState[]> = {
  idle: ["thinking"],
  thinking: ["acting", "error"],
  acting: ["idle", "error"],
  error: ["idle"],
};

const STATE_META: Record<AgentState, { label: string; color: string }> = {
  idle: { label: "Idle", color: "#60a5fa" },
  thinking: { label: "Thinking…", color: "#a78bfa" },
  acting: { label: "Acting — tool: web.search", color: "#39FF14" },
  error: { label: "Error", color: "#f87171" },
};

const HAPPY_PATH: AgentState[] = ["idle", "thinking", "acting", "idle"];

export function AgentStatusChip() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const spinTl = useRef<ReturnType<typeof gsap.timeline> | null>(null);
  const [state, setState] = useState<AgentState>("idle");
  const [step, setStep] = useState(0);

  useEffect(() => {
    registerGsap();
    if (!ringRef.current) return;
    spinTl.current = gsap.timeline({ paused: true }).to(ringRef.current, {
      rotate: 360,
      duration: 1.6,
      repeat: -1,
      ease: "none",
    });
    return () => {
      spinTl.current?.kill();
    };
  }, []);

  useEffect(() => {
    const tl = spinTl.current;
    if (!tl) return;
    if (state === "thinking" && inView && !reduced) tl.play();
    else tl.pause();
  }, [state, inView, reduced]);

  const advance = () => {
    const next = (step + 1) % HAPPY_PATH.length;
    setStep(next);
    setState(HAPPY_PATH[next]);
  };

  const forceError = (e: ReactPointerEvent) => {
    e.stopPropagation();
    if (!TRANSITIONS[state].includes("error")) return;
    setState("error");
    setStep(0);
  };

  const meta = STATE_META[state];

  return (
    <DemoCard
      name="Agent Status Chip"
      command="/187agent-ui"
      how="A guarded transition table (idle→thinking→acting→error) drives a GSAP-spun ring — only listed transitions are reachable; the table rejects the rest."
      mode="click"
      accent={ACCENT}
    >
      <div ref={ref} className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={advance}
          className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 transition-colors"
          style={{ borderColor: `color-mix(in srgb, ${meta.color} 40%, transparent)` }}
        >
          <div
            ref={ringRef}
            className="absolute inset-[-3px] rounded-full border-2 border-transparent"
            style={{ borderTopColor: meta.color, opacity: state === "thinking" ? 1 : 0 }}
          />
          <span
            className="h-3 w-3 rounded-full transition-all duration-300"
            style={{ background: meta.color, boxShadow: state === "acting" ? `0 0 16px ${meta.color}` : "none" }}
          />
        </button>
        <div className="text-center">
          <p className="text-[11px] font-semibold" style={{ color: meta.color }}>
            {meta.label}
          </p>
          <button
            type="button"
            onPointerDown={forceError}
            disabled={!TRANSITIONS[state].includes("error")}
            className="mt-1 text-[10px] text-white/30 underline decoration-dotted underline-offset-2 hover:text-white/60 disabled:opacity-30 disabled:hover:text-white/30"
          >
            force error
          </button>
        </div>
      </div>
    </DemoCard>
  );
}

/* ---------------------------------------------------------------------- */
/* 2. Streaming token renderer — rAF batching + real mid-stream stop      */
/* ---------------------------------------------------------------------- */

const SAMPLE_TOKENS =
  "Scanning the repository for the auth module, cross-referencing recent commits, and drafting a summary of what changed."
    .split(" ")
    .map((w) => `${w} `);

function createTokenBatcher(target: HTMLElement) {
  let queue: string[] = [];
  let scheduled = false;
  let raf = 0;
  function flush() {
    scheduled = false;
    if (queue.length === 0) return;
    target.append(document.createTextNode(queue.join("")));
    queue = [];
  }
  return {
    push(token: string) {
      queue.push(token);
      if (!scheduled) {
        scheduled = true;
        raf = requestAnimationFrame(flush);
      }
    },
    dispose() {
      queue = [];
      scheduled = false;
      cancelAnimationFrame(raf);
    },
  };
}

export function StreamRenderer() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const transcriptRef = useRef<HTMLDivElement>(null);
  const stopRef = useRef(false);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const run = async () => {
    const el = transcriptRef.current;
    if (!el) return;
    el.textContent = "";
    stopRef.current = false;
    setRunning(true);
    setDone(false);
    const batcher = createTokenBatcher(el);
    for (const token of SAMPLE_TOKENS) {
      if (stopRef.current) break; // checked every iteration — a stop lands within one token
      batcher.push(token);
      await new Promise((r) => setTimeout(r, reduced ? 4 : 55));
    }
    batcher.dispose();
    setRunning(false);
    setDone(!stopRef.current);
  };

  const stop = () => {
    stopRef.current = true;
  };

  return (
    <DemoCard
      name="Streaming Token Renderer"
      command="/187agent-ui"
      how="Tokens queue and flush once per animation frame instead of once per token — the Stop control is checked every loop iteration, so it lands within one token, not one batch."
      mode="click"
      accent={ACCENT}
    >
      <div ref={ref} className="flex w-full flex-col gap-3">
        <div
          ref={transcriptRef}
          className="h-20 w-full overflow-hidden rounded-lg border border-white/10 bg-black/30 p-2.5 text-left text-[11px] leading-relaxed text-white/70"
        />
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={running ? stop : run}
            disabled={!inView}
            className="rounded-full px-3 py-1 text-[11px] font-semibold transition-colors"
            style={
              running
                ? { background: "transparent", color: "#f87171", border: "1px solid #f87171" }
                : { background: ACCENT, color: "#06070c", border: "1px solid transparent" }
            }
          >
            {running ? "Stop" : done ? "Replay" : "Run stream"}
          </button>
          <span className="text-[10px] text-white/30">{running ? "streaming…" : done ? "complete" : "idle"}</span>
        </div>
      </div>
    </DemoCard>
  );
}

/* ---------------------------------------------------------------------- */
/* 3. HITL constraint canvas — pointer-captured drag-to-constrain          */
/* ---------------------------------------------------------------------- */

type Pt = { x: number; y: number };

export function ConstraintCanvas() {
  const { ref } = useInView<HTMLDivElement>();
  const areaRef = useRef<HTMLDivElement>(null);
  const anchor = useRef<Pt | null>(null);
  const [rect, setRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [committed, setCommitted] = useState(false);
  const dots = useRef(
    Array.from({ length: 9 }, (_, i) => ({ x: 12 + (i % 3) * 38, y: 18 + Math.floor(i / 3) * 32 })),
  ).current;

  const toLocal = (e: ReactPointerEvent): Pt => {
    const r = areaRef.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 };
  };

  const onDown = (e: ReactPointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    anchor.current = toLocal(e);
    setCommitted(false);
    setRect({ x: anchor.current.x, y: anchor.current.y, w: 0, h: 0 });
  };
  const onMove = (e: ReactPointerEvent) => {
    if (!anchor.current) return;
    const p = toLocal(e);
    setRect({
      x: Math.min(anchor.current.x, p.x),
      y: Math.min(anchor.current.y, p.y),
      w: Math.abs(p.x - anchor.current.x),
      h: Math.abs(p.y - anchor.current.y),
    });
  };
  const onUp = () => {
    if (anchor.current) setCommitted(true); // one REGION_CONSTRAINED event, not one per pointermove
    anchor.current = null;
  };
  const onCancel = () => {
    anchor.current = null;
    setRect(null);
    setCommitted(false);
  };

  const inRect = (d: Pt) => !!rect && d.x >= rect.x && d.x <= rect.x + rect.w && d.y >= rect.y && d.y <= rect.y + rect.h;

  return (
    <DemoCard
      name="HITL Constraint Canvas"
      command="/187agent-ui"
      how="A pointer-captured drag defines a region; release fires one REGION_CONSTRAINED event — dots outside the box drop out of the agent's reach."
      mode="drag"
      accent={ACCENT}
    >
      <div ref={ref} className="w-full">
        <div
          ref={areaRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onCancel}
          className="relative h-28 w-full touch-none overflow-hidden rounded-lg border border-white/10 bg-black/30"
        >
          {dots.map((d, i) => (
            <span
              key={i}
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150"
              style={{
                left: `${d.x}%`,
                top: `${d.y}%`,
                background: !rect ? "rgba(255,255,255,0.35)" : inRect(d) ? ACCENT : "rgba(255,255,255,0.12)",
                boxShadow: rect && inRect(d) ? `0 0 8px ${ACCENT}` : "none",
              }}
            />
          ))}
          {rect ? (
            <div
              className="absolute rounded-sm border"
              style={{
                left: `${rect.x}%`,
                top: `${rect.y}%`,
                width: `${rect.w}%`,
                height: `${rect.h}%`,
                borderColor: ACCENT,
                background: `color-mix(in srgb, ${ACCENT} 12%, transparent)`,
              }}
            />
          ) : null}
        </div>
        <p className="mt-2 text-center text-[10px] text-white/30">
          {committed ? "REGION_CONSTRAINED published — agent limited to lit dots" : "drag to define the agent's allowed region"}
        </p>
      </div>
    </DemoCard>
  );
}

/* ---------------------------------------------------------------------- */
/* 4. Agent event bus — one publish(), three disconnected subscribers     */
/* ---------------------------------------------------------------------- */

const CHANNELS = ["Transcript", "Sidebar", "Tab title"];

export function EventBusFanout() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [pulse, setPulse] = useState(0);
  const [flashed, setFlashed] = useState([false, false, false]);

  const publish = () => {
    setPulse((p) => p + 1);
    setFlashed([true, true, true]);
    window.setTimeout(() => setFlashed([false, false, false]), reduced ? 0 : 550);
  };

  return (
    <DemoCard
      name="Agent Event Bus"
      command="/187agent-ui"
      how="One publish(AGENT_THINKING) call fans out to three disconnected subscribers — no shared component tree, each just calls subscribe() and cleans up on unmount."
      mode="click"
      accent={ACCENT}
    >
      <div ref={ref} className="flex w-full flex-col items-center gap-4">
        <button
          type="button"
          onClick={publish}
          disabled={!inView}
          className="rounded-full px-4 py-1.5 text-[11px] font-semibold"
          style={{ background: ACCENT, color: "#06070c" }}
        >
          publish(AGENT_THINKING)
        </button>
        <div className="flex gap-4">
          {CHANNELS.map((c, i) => (
            <div key={c} className="flex flex-col items-center gap-1.5">
              <span
                className="h-8 w-8 rounded-full border transition-all duration-300"
                style={{
                  borderColor: ACCENT,
                  background: flashed[i] ? ACCENT : "transparent",
                  boxShadow: flashed[i] ? `0 0 14px ${ACCENT}` : "none",
                  transform: flashed[i] && !reduced ? "scale(1.15)" : "scale(1)",
                }}
              />
              <span className="text-[9px] text-white/40">{c}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-white/25">
          {pulse} event{pulse === 1 ? "" : "s"} published
        </p>
      </div>
    </DemoCard>
  );
}

/* ---------------------------------------------------------------------- */
/* 5. Throttle vs. raw input — protecting the agent from a click flood    */
/* ---------------------------------------------------------------------- */

export function ThrottleDebounceRace() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const lastAccepted = useRef(0);
  const [raw, setRaw] = useState(0);
  const [throttled, setThrottled] = useState(0);

  const click = () => {
    setRaw((r) => r + 1);
    const now = performance.now();
    if (now - lastAccepted.current >= 140) {
      lastAccepted.current = now;
      setThrottled((t) => t + 1);
    }
  };

  return (
    <DemoCard
      name="Throttle vs. Raw Input"
      command="/187agent-ui"
      how="Mash the button — the raw counter fires every click; the throttled counter (140ms floor) is what actually reaches the agent, protecting it from a click flood."
      mode="click"
      accent={ACCENT}
    >
      <div ref={ref} className="flex w-full flex-col items-center gap-4">
        <button
          type="button"
          onClick={click}
          disabled={!inView}
          className="rounded-full px-5 py-2 text-xs font-semibold"
          style={{ background: ACCENT, color: "#06070c" }}
        >
          mash me
        </button>
        <div className="flex gap-6 text-center">
          <div>
            <p className="text-lg font-bold tabular-nums text-white/70">{raw}</p>
            <p className="text-[9px] uppercase tracking-wider text-white/30">raw clicks</p>
          </div>
          <div>
            <p className="text-lg font-bold tabular-nums" style={{ color: ACCENT }}>
              {throttled}
            </p>
            <p className="text-[9px] uppercase tracking-wider text-white/30">reach the agent</p>
          </div>
        </div>
      </div>
    </DemoCard>
  );
}

/* ---------------------------------------------------------------------- */
/* 6. Confidence heatmap — agent data mapped to color without reflow      */
/* ---------------------------------------------------------------------- */

function confidenceColor(conf: number) {
  const hue = conf * 217; // 0 (red, low confidence) → 217 (blue, high confidence)
  const light = 48 + conf * 14;
  return `hsl(${hue.toFixed(0)} 82% ${light.toFixed(0)}%)`;
}

export function ConfidenceHeatmap() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const canvasRef = useCanvas2D((ctx, t, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const cols = 18;
    const rows = 8;
    const gx = w / cols;
    const gy = h / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const phase = c * 0.37 + r * 0.61;
        const conf = 0.5 + 0.5 * Math.sin(t * 0.8 + phase);
        const x = gx * c + gx / 2;
        const y = gy * r + gy / 2;
        const size = Math.max(1.4, gx * 0.3 * (0.4 + conf * 0.6));
        ctx.fillStyle = confidenceColor(conf);
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, inView && !reduced);

  return (
    <DemoCard
      name="Confidence Heatmap"
      command="/187agent-ui"
      how="Per-token confidence maps to HSL hue + lightness, not a raw RGB channel lerp — the ambiguous mid-confidence band stays readable instead of muddying out."
      mode="auto"
      accent={ACCENT}
    >
      <div ref={ref} className="h-full w-full">
        <canvas ref={canvasRef} className="h-32 w-full" />
      </div>
    </DemoCard>
  );
}
