"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import {
  skillShowcases,
  type SkillShowcaseData,
  skillColorValue,
  skillIsRainbow,
  skillRainbowTextClass,
} from "@/lib/skill-showcase-data";
import { KineticHeadline } from "@/components/type/KineticHeadline";

/** Group skills for filter chips — keeps the grid manageable. */
const FILTERS: { id: string; label: string; match: (s: SkillShowcaseData) => boolean }[] = [
  { id: "all", label: "All", match: () => true },
  {
    id: "build",
    label: "Build",
    match: (s) => ["repo", "craft", "create", "kit", "vibe", "command", "flow"].includes(s.id),
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
    match: (s) =>
      ["natasha", "chain", "test", "access", "include", "scan", "standard", "report"].includes(s.id),
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

  return (
    <Reveal delay={Math.min(index, 12) * 35}>
      <Link
        href={`/187${skill.id}`}
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-[#39FF14]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF14]"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${solidColor}22` }}
        aria-label={`${skill.name}: ${skill.tagline}. Open skill page.`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-bold text-white">{skill.name}</h3>
            <p
              className={`text-sm ${taglineClass}`}
              style={skillIsRainbow(skill.color) ? undefined : { color: solidColor }}
            >
              {skill.tagline}
            </p>
          </div>
          <span
            className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-xs font-bold ${
              skillIsRainbow(skill.color) ? "text-white" : "text-[#050608]"
            }`}
            style={skillIsRainbow(skill.color) ? undefined : { backgroundColor: solidColor }}
            aria-hidden
          >
            {skillIsRainbow(skill.color) ? (
              <span className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {alias.slice(0, 2).toUpperCase()}
              </span>
            ) : (
              alias.slice(0, 2).toUpperCase()
            )}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/60">{skill.description}</p>

        <div className="mt-4 space-y-2">
          <code className="block truncate rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">
            {skill.triggers[0] ?? `/187 ${skill.id}`}
          </code>
          {useCase ? (
            <p className="line-clamp-2 text-xs text-white/45">
              <span className="text-white/65">Try:</span> {useCase}
            </p>
          ) : null}
        </div>

        <div
          className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium"
          style={{ color: solidColor }}
        >
          <span>Open skill</span>
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
        </div>
      </Link>
    </Reveal>
  );
}

/**
 * Filterable, searchable skill gallery — no redundant tooltips.
 * Cards carry description + primary trigger + one “try” line; full detail on the skill page.
 */
export function SkillCardsGrid() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

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

  return (
    <section id="skills" className="relative px-6 py-20 sm:py-28">
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">First-class skills</p>
          <KineticHeadline
            text="Every skill."
            accent="One surface."
            as="h2"
            className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-white"
          />
          <p className="mt-4 text-white/60">
            Filter or search, then open a card for triggers, outputs, and templates. No hover fluff — the card is the
            preview.
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
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
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

        <p className="mb-4 text-center text-xs text-white/40" aria-live="polite">
          {visible.length} skill{visible.length === 1 ? "" : "s"}
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
