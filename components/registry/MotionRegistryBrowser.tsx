"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  MOTION_REGISTRY,
  MOTION_REGISTRY_OWNERS,
  motionRegistryCountByOwner,
  type MotionSkillId,
} from "@/lib/motion-registry";
import { skillShowcaseIndex, skillColorValue } from "@/lib/skill-showcase-data";

const OWNER_COUNTS = motionRegistryCountByOwner();
const HYBRID_COUNT = MOTION_REGISTRY.filter((e) => e.hybrid).length;

function ownerMeta(owner: MotionSkillId) {
  const skill = skillShowcaseIndex.get(owner.replace("187", ""));
  return {
    name: skill?.name ?? owner.toUpperCase(),
    color: skill ? skillColorValue(skill.color) : "rgb(var(--sc-primary))",
    href: `/${owner}`,
  };
}

function FilterPill({
  active,
  color,
  onClick,
  children,
}: {
  active: boolean;
  color: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        borderColor: active ? color : "rgba(255,255,255,0.12)",
        backgroundColor: active ? `${color}1f` : "transparent",
        color: active ? color : "rgba(255,255,255,0.55)",
      }}
    >
      {children}
    </button>
  );
}

function EntryCard({ entry }: { entry: (typeof MOTION_REGISTRY)[number] }) {
  const owner = ownerMeta(entry.owner);
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-sc-panel p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={owner.href}
          className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
          style={{ borderColor: `${owner.color}55`, color: owner.color }}
        >
          {owner.name}
        </Link>
        {entry.hybrid && (
          <span className="rounded-full border border-sc-cyan/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-sc-cyan">
            Three.js hybrid
          </span>
        )}
        <code className="ml-auto rounded bg-sc-primary/10 px-2 py-0.5 font-mono text-xs text-sc-primary">
          {entry.command}
        </code>
      </div>

      <h3 className="text-base font-bold leading-snug text-white">{entry.name}</h3>
      <p className="text-sm leading-relaxed text-white/60">{entry.logic}</p>

      {entry.triggers.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {entry.triggers.map((trigger) => (
            <span key={trigger} className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-white/45">
              &ldquo;{trigger}&rdquo;
            </span>
          ))}
        </div>
      )}

      {entry.sourceResource && (
        <p className="mt-auto text-[11px] uppercase tracking-[0.1em] text-white/30">Based on: {entry.sourceResource}</p>
      )}
    </article>
  );
}

export function MotionRegistryBrowser() {
  const [query, setQuery] = useState("");
  const [owner, setOwner] = useState<MotionSkillId | "all">("all");
  const [hybridOnly, setHybridOnly] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOTION_REGISTRY.filter((entry) => {
      if (owner !== "all" && entry.owner !== owner) return false;
      if (hybridOnly && !entry.hybrid) return false;
      if (!q) return true;
      const haystack = [entry.name, entry.command, entry.logic, entry.sourceResource ?? "", ...entry.triggers]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, owner, hybridOnly]);

  return (
    <section className="relative border-t border-white/10 px-6 py-16 sm:py-20">
      <div className="container-x">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sc-primary">Effect registry</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            {MOTION_REGISTRY.length} catalogued motion patterns
          </h2>
          <p className="mt-3 text-sm text-white/55">
            Every entry behind the 8 motion-lab skills — DOM/GSAP techniques plus {HYBRID_COUNT} Three.js
            &ldquo;hybrid expansion&rdquo; patterns. Parsed from{" "}
            <code className="text-sc-primary">docs/handoffs/187-motion-gsap-skill-registry-v3.md</code> into{" "}
            <code className="text-sc-primary">EFFECT-REGISTRY.json</code>.
          </p>
        </div>

        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/80">Search patterns</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search the motion effect registry by name, command, logic, or trigger phrase"
              placeholder="Search by name, command, logic, or trigger phrase…"
              className="h-14 w-full rounded-2xl border border-sc-primary/30 bg-sc-void px-4 text-base text-white outline-none transition placeholder:text-white/40 focus:border-sc-primary focus-visible:ring-2 focus-visible:ring-sc-primary/50"
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-2">
            <FilterPill active={owner === "all"} color="rgb(236 237 247)" onClick={() => setOwner("all")}>
              All · {MOTION_REGISTRY.length}
            </FilterPill>
            {MOTION_REGISTRY_OWNERS.map((id) => {
              const meta = ownerMeta(id);
              return (
                <FilterPill key={id} active={owner === id} color={meta.color} onClick={() => setOwner(id)}>
                  {meta.name} · {OWNER_COUNTS[id]}
                </FilterPill>
              );
            })}
            <label className="ml-auto flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/60">
              <input
                type="checkbox"
                checked={hybridOnly}
                onChange={(event) => setHybridOnly(event.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-sc-void text-sc-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sc-primary"
              />
              Three.js hybrid only · {HYBRID_COUNT}
            </label>
          </div>

          <p className="mt-4 text-sm text-white/45">
            {results.length} of {MOTION_REGISTRY.length} patterns
          </p>
        </div>

        {results.length > 0 ? (
          <div className="mx-auto mt-6 grid max-w-5xl gap-4 sm:grid-cols-2">
            {results.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <p className="mx-auto mt-10 max-w-5xl text-center text-sm text-white/45">
            No patterns match &ldquo;{query}&rdquo;. Try a different search term or clear the filters.
          </p>
        )}
      </div>
    </section>
  );
}
