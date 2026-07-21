"use client";

import Link from "next/link";
import { brandAssets } from "@/lib/brand-assets";

type Size = "sm" | "md" | "lg" | "hero" | "card";

/**
 * Size classes for the mascot frame.
 * "card" matches the reference agent department columns (large spider, full card width).
 */
const MASCOT_FRAME: Record<Size, string> = {
  sm: "h-36 w-full max-w-[9rem]",
  md: "h-48 w-full max-w-[12rem]",
  lg: "h-56 w-full max-w-[14rem]",
  card: "h-[13.5rem] w-full max-w-[15rem] sm:h-[15rem]",
  hero: "h-72 w-full max-w-[20rem] sm:h-[22rem] sm:max-w-[22rem]",
};

/**
 * Transparent / monochrome wireframe mascot, recolored with agent color only.
 * Uses the real PNG (line detail + 187 mark) + mix-blend color — no glow, no plate.
 */
export function AgentMascot({
  color,
  name,
  size = "md",
  className = "",
  priority = false,
}: {
  color: string;
  name: string;
  size?: Size;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative mx-auto ${MASCOT_FRAME[size]} ${className}`.trim()}
      role="img"
      aria-label={`${name} mascot`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
      <img
        src={brandAssets.mascotWireframe}
        alt=""
        width={562}
        height={591}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="absolute inset-0 m-auto h-full w-full object-contain"
        aria-hidden
      />
      {/* Colorize line art only — preserves wireframe detail */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: color, mixBlendMode: "color" }}
        aria-hidden
      />
    </div>
  );
}

/**
 * Vertical stack: large centered mascot, then optional wordmark below — never merged.
 */
export function AgentMascotStack({
  color,
  name,
  size = "md",
  showWordmark = true,
  showName = false,
  className = "",
  priority = false,
}: {
  color: string;
  name: string;
  size?: Size;
  showWordmark?: boolean;
  showName?: boolean;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`flex w-full flex-col items-center gap-4 ${className}`.trim()}>
      <AgentMascot color={color} name={name} size={size} priority={priority} />
      {showWordmark && (
        // eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export
        <img
          src={brandAssets.wordmarkTagline}
          alt="187WEB"
          width={480}
          height={120}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          className="h-9 w-auto max-w-[90%] object-contain sm:h-10"
        />
      )}
      {showName && (
        <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color }}>
          {name}
        </span>
      )}
    </div>
  );
}

/** Home-hero roster: mascot + name label (ghost outline sits behind the figure). */
export function AgentMascotRoster({
  agents,
}: {
  agents: Array<{ slug: string; name: string; color: string }>;
}) {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-6 sm:grid-cols-5 sm:gap-4">
      {agents.map((agent) => (
        <Link
          key={agent.slug}
          href={`/${agent.slug}`}
          className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#0A0C14]/50 px-2 py-4 transition hover:-translate-y-0.5 hover:border-white/25"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[38%] -translate-y-1/2 select-none text-center font-black uppercase leading-none tracking-tighter"
            style={{
              color: "transparent",
              WebkitTextStroke: `1px ${agent.color}40`,
              fontSize: "1.35rem",
            }}
          >
            {agent.name}
          </span>
          <div className="relative z-10 w-full">
            <AgentMascot color={agent.color} name={agent.name} size="md" />
          </div>
          <span
            className="relative z-10 text-center text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: agent.color }}
          >
            {agent.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
