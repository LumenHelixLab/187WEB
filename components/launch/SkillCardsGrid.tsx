"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  skillShowcases,
  type SkillShowcaseData,
  skillColorValue,
  skillIsRainbow,
  skillRainbowTextClass,
} from "@/lib/skill-showcase-data";
import { KineticHeadline } from "@/components/type/KineticHeadline";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/** Group skills for filter chips — keeps the grid manageable. */
const FILTERS: { id: string; label: string; match: (s: SkillShowcaseData) => boolean }[] = [
  { id: "all", label: "All", match: () => true },
  {
    id: "access",
    label: "Access+",
    match: (s) => ["access", "include", "test", "write", "scan", "standard", "publish"].includes(s.id),
  },
  {
    id: "build",
    label: "Build",
    match: (s) => ["repo", "craft", "create", "kit", "vibe", "command", "flow", "theme"].includes(s.id),
  },
  {
    id: "motion",
    label: "Motion",
    match: (s) => ["gsap", "type", "model", "scroll", "audio", "viz", "motion", "hero"].includes(s.id),
  },
  {
    id: "ship",
    label: "Ship",
    match: (s) => ["launch", "seo", "revenue", "publish", "version", "docs", "write"].includes(s.id),
  },
  {
    id: "trust",
    label: "Trust",
    match: (s) => ["natasha", "chain", "test", "scan", "standard", "report"].includes(s.id),
  },
  {
    id: "lab",
    label: "Lab",
    match: (s) => ["research", "free", "learn"].includes(s.id),
  },
];

function SkillCard({ skill, index }: { skill: SkillShowcaseData; index: number }) {
  const alias = skill.triggers[0]?.replace(/^\/187\s*/i, "").trim() || skill.id;
  const useCase = skill.useCases[0] ?? "";
  const solidColor = skillColorValue(skill.color);
  const taglineClass = skillIsRainbow(skill.color) ? skillRainbowTextClass() : "";
  const outCount = skill.outputs?.length ?? 0;
  const trigCount = skill.triggers?.length ?? 0;
  const code = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/187${skill.id}`}
      data-skill-card
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0C14] transition will-change-transform hover:-translate-y-1 hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF14]"
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -28px ${solidColor}33` }}
      aria-label={`${skill.name}: ${skill.tagline}. Open skill page.`}
    >
      {/* Infographic top rail */}
      <div
        className="h-1 w-full"
        style={
          skillIsRainbow(skill.color)
            ? {
                background:
                  "linear-gradient(90deg,#ef4444,#f59e0b,#22c55e,#3b82f6,#a855f7)",
              }
            : { backgroundColor: solidColor }
        }
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col p-5">
        {/* Corner ticks */}
        <span className="pointer-events-none absolute left-3 top-3 h-2 w-2 border-l border-t border-white/25" aria-hidden />
        <span className="pointer-events-none absolute right-3 top-3 h-2 w-2 border-r border-t border-white/25" aria-hidden />

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              <span>SKL-{code}</span>
              <span className="h-px w-4 bg-white/15" aria-hidden />
              <span style={{ color: solidColor }}>{alias.slice(0, 8)}</span>
            </div>
            <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-white">{skill.name}</h3>
            <p
              className={`mt-0.5 text-sm font-medium ${taglineClass}`}
              style={skillIsRainbow(skill.color) ? undefined : { color: solidColor }}
            >
              {skill.tagline}
            </p>
          </div>
          <span
            className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl border border-white/10 font-mono text-xs font-bold ${
              skillIsRainbow(skill.color) ? "text-white" : "text-[#050608]"
            }`}
            style={
              skillIsRainbow(skill.color)
                ? { background: "linear-gradient(135deg,#ef4444,#3b82f6,#a855f7)" }
                : { backgroundColor: solidColor }
            }
            aria-hidden
          >
            {alias.slice(0, 2).toUpperCase()}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/55">{skill.description}</p>

        {/* Metric strip */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-white/8 py-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-wider text-white/35">Triggers</p>
            <p className="mt-0.5 font-mono text-sm font-semibold text-white/85">{trigCount}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-wider text-white/35">Outputs</p>
            <p className="mt-0.5 font-mono text-sm font-semibold text-white/85">{outCount}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-wider text-white/35">Route</p>
            <p className="mt-0.5 truncate font-mono text-sm font-semibold" style={{ color: solidColor }}>
              /{skill.id}
            </p>
          </div>
        </div>

        {/* Signal bar (visual weight by outputs) */}
        <div className="mt-3" aria-hidden>
          <div className="mb-1 flex justify-between font-mono text-[9px] uppercase tracking-wider text-white/30">
            <span>Signal</span>
            <span>{Math.min(100, 35 + outCount * 8 + trigCount * 2)}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full transition group-hover:brightness-125"
              style={{
                width: `${Math.min(100, 35 + outCount * 8 + trigCount * 2)}%`,
                backgroundColor: solidColor,
              }}
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <code className="block truncate rounded-lg border border-white/5 bg-black/40 px-2.5 py-1.5 font-mono text-xs text-[#39FF14]">
            {skill.triggers[0] ?? `/187 ${skill.id}`}
          </code>
          {useCase ? (
            <p className="line-clamp-2 text-xs leading-relaxed text-white/40">
              <span className="font-mono text-white/55">TRY · </span>
              {useCase}
            </p>
          ) : null}
        </div>

        <div
          className="mt-auto flex items-center justify-between gap-2 pt-4 text-sm font-semibold"
          style={{ color: solidColor }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">Open dossier</span>
          <span className="inline-flex items-center gap-1">
            Launch
            <svg
              className="h-4 w-4 transition group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Filterable, searchable skill gallery — infographic cards + GSAP stagger.
 */
export function SkillCardsGrid() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skillShowcases.filter((s) => {
      const cat = FILTERS.find((f) => f.id === filter) ?? FILTERS[0];
      if (!cat.match(s)) return false;
      if (!q) return true;
      const hay = [s.name, s.tagline, s.description, s.id, ...s.triggers, ...s.useCases]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, filter]);

  useEffect(() => {
    if (reduced || !gridRef.current) return;
    registerGsap();
    const cards = gridRef.current.querySelectorAll("[data-skill-card]");
    if (!cards.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 28, opacity: 0, rotateX: 6 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.5,
          stagger: { each: 0.035, from: "start" },
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [visible, reduced]);

  return (
    <section id="skills" className="relative px-6 py-20 sm:py-28">
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#39FF14]">
            First-class skills · registry
          </p>
          <KineticHeadline
            text="Every skill."
            accent="One surface."
            as="h2"
            className="mt-4 font-display text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-white"
          />
          <p className="mt-4 text-white/60">
            Infographic dossiers with triggers, outputs, and signal strength. Filter, search, open.
          </p>
        </div>

        <div className="mx-auto mb-8 flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block min-w-0 flex-1">
            <span className="sr-only">Search skills</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills, triggers, jobs…"
              className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-4 pr-4 text-sm text-white placeholder:text-white/35 focus:border-[#39FF14]/40 focus:outline-none focus:ring-1 focus:ring-[#39FF14]/40"
            />
          </label>
          <div className="flex flex-wrap gap-2 sm:justify-end" role="group" aria-label="Skill categories">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={active}
                  className={`rounded-full border px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider transition ${
                    active
                      ? "border-[#39FF14]/50 bg-[#39FF14]/15 text-[#39FF14]"
                      : "border-white/10 bg-white/5 text-white/65 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-wider text-white/40" aria-live="polite">
          {visible.length} dossier{visible.length === 1 ? "" : "s"}
          {filter !== "all" ? ` · ${FILTERS.find((f) => f.id === filter)?.label}` : ""}
          {query.trim() ? ` · “${query.trim()}”` : ""}
        </p>

        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
            <p className="text-white/70">No skills match that filter.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="mt-4 text-sm font-semibold text-[#39FF14] underline-offset-2 hover:underline"
            >
              Clear search & filters
            </button>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{ perspective: "1200px" }}
          >
            {visible.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
