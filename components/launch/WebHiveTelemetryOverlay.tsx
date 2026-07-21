"use client";

import { useMemo } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useClientMounted } from "@/lib/motion/useClientMounted";
import { RGYB } from "@/lib/brand-palette";

const CODE_SNIPPETS = [
  'import { hive } from "@/lib/webhive";',
  "const signal = telemetry.read(0x4A);",
  "if (signal > threshold) { hive.lock(); }",
  'natasha.sweep({ surface: "public", depth: 3 });',
  'yelena.gate({ ci: true, iam: true });',
  'xavier.council({ topic: "ship", urgency: "high" });',
  'brood.spawn({ parent: "natasha", task: "scan" });',
  "0x7F 0xA2 0x11 0xD4 0xE8 0x00",
  "SYS.HIVE.NODE :: ONLINE",
  "TELEMETRY_STREAM_OK",
  "checksum(artifact) === 0x9f3b",
  "while (alive) { route(pulse); }",
] as const;

const LABELS = [
  "HIVE.NODE",
  "SYS.OK",
  "TELEMETRY",
  "BROOD.IDLE",
  "COUNCIL.STBY",
  "NATASHA.LINK",
  "YELENA.GATE",
  "XAVIER.SHIP",
] as const;

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Round to fixed decimals so SSR and client serialize identical style strings. */
function r2(n: number) {
  return Math.round(n * 100) / 100;
}

function randHexByte(rand: () => number) {
  const n = Math.floor(rand() * 256);
  return `0x${n.toString(16).padStart(2, "0").toUpperCase()}`;
}

/** Deterministic Fisher–Yates (never use Array.sort with a random comparator). */
function shuffleInPlace<T>(arr: T[], rand: () => number): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

type MatrixColumn = {
  id: number;
  left: number;
  width: number;
  duration: number;
  delay: number;
  fontSize: number;
  opacity: number;
  chars: string[];
};

function buildColumns(seed: number, count: number): MatrixColumn[] {
  const rand = mulberry32(seed);
  const cols: MatrixColumn[] = [];
  const band = 100 / count;
  for (let i = 0; i < count; i++) {
    const left = r2(i * band + rand() * band * 0.7);
    const chars = Array.from({ length: 14 }, () => randHexByte(rand));
    cols.push({
      id: i,
      left,
      width: r2(1.5 + rand() * 1.5),
      duration: r2(7 + rand() * 8),
      delay: r2(-(rand() * 20)),
      fontSize: r2(10 + rand() * 6),
      opacity: r2(0.08 + rand() * 0.2),
      chars,
    });
  }
  return cols;
}

type CodeStrip = {
  id: number;
  fontSize: number;
  opacity: number;
  duration: number;
  blur: number;
  content: string;
};

function buildStrips(seed: number, count: number): CodeStrip[] {
  const rand = mulberry32(seed);
  const shuffled = shuffleInPlace([...CODE_SNIPPETS], rand);
  const strips: CodeStrip[] = [];
  for (let i = 0; i < count; i++) {
    const chunk = shuffled.slice(i * 2, i * 2 + 3).join("  //  ");
    strips.push({
      id: i,
      fontSize: r2(10 + rand() * 4),
      opacity: r2(0.06 + rand() * 0.12),
      duration: r2(22 + rand() * 20),
      blur: rand() > 0.6 ? 1 : 0,
      content: `${chunk}  //  ${chunk}`,
    });
  }
  return strips;
}

type TelemetryLabel = {
  id: number;
  left: number;
  top: number;
  text: string;
  delay: number;
};

function buildLabels(seed: number, count: number): TelemetryLabel[] {
  const rand = mulberry32(seed);
  const labels: TelemetryLabel[] = [];
  for (let i = 0; i < count; i++) {
    labels.push({
      id: i,
      left: r2(4 + rand() * 88),
      top: r2(6 + rand() * 84),
      text: LABELS[i % LABELS.length],
      delay: r2(rand() * 4),
    });
  }
  return labels;
}

export function WebHiveTelemetryOverlay() {
  const mounted = useClientMounted();
  const reducedMotion = useReducedMotion();
  const columns = useMemo(() => buildColumns(0x9e3779b9, 18), []);
  const strips = useMemo(() => buildStrips(0x6d2b79f5, 6), []);
  const labels = useMemo(() => buildLabels(0x7f4a7c13, 8), []);

  if (!mounted || reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden opacity-40 brightness-[0.75]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, transparent 0%, transparent 35%, rgba(5,6,8,0.8) 100%)",
        }}
      />

      {columns.map((col) => {
        const hue = RGYB[col.id % RGYB.length];
        return (
          <div
            key={col.id}
            className="absolute top-0 h-full overflow-hidden font-mono leading-tight"
            style={{
              left: `${col.left}%`,
              width: `${col.width}rem`,
              fontSize: col.fontSize,
              color: hue,
              opacity: r2(Math.min(0.35, col.opacity * 0.55)),
            }}
          >
            <div
              className="absolute left-0 top-0 flex flex-col gap-2"
              style={{
                animation: `wh-matrix-fall ${r2(col.duration * 1.75)}s linear infinite`,
                animationDelay: `${col.delay}s`,
              }}
            >
              {Array.from({ length: 3 }).flatMap((_, copy) =>
                col.chars.map((c, idx) => (
                  <span key={`${copy}-${idx}`} className="block">
                    {c}
                  </span>
                ))
              )}
            </div>
          </div>
        );
      })}

      <div className="absolute inset-0 flex flex-col justify-around py-16">
        {strips.map((strip) => {
          const hue = RGYB[strip.id % RGYB.length];
          return (
            <div
              key={strip.id}
              className="sc-mask-x overflow-hidden font-mono whitespace-nowrap"
              style={{
                opacity: r2(strip.opacity * 0.45),
                filter: strip.blur ? `blur(${strip.blur}px)` : undefined,
              }}
            >
              <div
                className="inline-flex"
                style={{
                  animation: `wh-code-drift ${r2(strip.duration * 1.6)}s linear infinite`,
                  fontSize: strip.fontSize,
                  color: hue,
                }}
              >
                <span className="px-8">{strip.content}</span>
                <span className="px-8">{strip.content}</span>
              </div>
            </div>
          );
        })}
      </div>

      {labels.map((label) => {
        const hue = RGYB[label.id % RGYB.length];
        return (
          <span
            key={label.id}
            className="absolute font-mono text-[10px] font-semibold uppercase tracking-widest"
            style={{
              left: `${label.left}%`,
              top: `${label.top}%`,
              color: hue,
              opacity: 0.45,
              animation: "wh-pulse-glow 7s ease-in-out infinite",
              animationDelay: `${label.delay}s`,
            }}
          >
            {label.text}
          </span>
        );
      })}
    </div>
  );
}
