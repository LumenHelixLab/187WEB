"use client";

import { COMMANDS, COMMAND_CATEGORIES, COMMAND_GRAMMAR } from "./command-data";
import { Tooltip } from "@/components/Tooltip";

/** Category tooltips — what / when / try (not a restatement of the table). */
export const COMMAND_CATEGORY_HELP: Record<
  string,
  { blurb: string; when: string; try: string }
> = {
  "Front Door": {
    blurb: "Entry commands that open the suite, pick skills/packs, and check if your machine can run them.",
    when: "You are installing, selecting a pack, or deciding what to run first.",
    try: "/187 · /187 menu · /187 doctor",
  },
  "Control Plane": {
    blurb: "Routing, reporting, scanning, and workflow sequencing — the operator layer above individual skills.",
    when: "You need a status report, health scan, standard gate, or multi-step flow.",
    try: "/187 cmd · /187 rpt · /187 scan · /187 flow",
  },
  "Core Suite": {
    blurb: "First-class product skills: craft, launch, research, docs, publish, motion lab, and security.",
    when: "You know the job (design, SEO, ship, animate) and want the matching skill.",
    try: "/187 craft · /187 hero · /187 theme · /187 publish",
  },
  Modules: {
    blurb: "NATASHA / Charlotte module aliases (THREAD, COMPRESS, SCOUT, LAB…) for agentic sub-routines.",
    when: "You are shaping prompts, compressing context, or running a local lab action.",
    try: "/187 th · /187 compress · /187 scout · /187 lab",
  },
  Research: {
    blurb: "Scholarly and lab-oriented profiles for sources, notebooks, and reproducible artifacts.",
    when: "You need evidence-backed research or a publishable lab surface.",
    try: "/187 research · /187 labs · /187 prov",
  },
  "Optional Packs": {
    blurb: "Curated install packs and optional add-ons that are not required for the core suite.",
    when: "You want a pre-bundled set of skills for a domain (research, access, etc.).",
    try: "/187 pack <name>",
  },
  Legacy: {
    blurb: "Older aliases kept for compatibility. Prefer Core Suite names when writing new flows.",
    when: "You are migrating notes or scripts that still use old short names.",
    try: "Map legacy → current via docs/ROUTING.md",
  },
};

function CategoryHelp({ category }: { category: string }) {
  const help = COMMAND_CATEGORY_HELP[category] ?? {
    blurb: `Commands grouped under ${category}.`,
    when: "Browse the table for purpose and status.",
    try: "/187",
  };

  return (
    <Tooltip
      wide
      content={
        <div className="space-y-2">
          <p className="font-semibold text-white">{category}</p>
          <p>{help.blurb}</p>
          <p>
            <span className="text-white/50">When: </span>
            {help.when}
          </p>
          <p className="font-mono text-[11px] text-[#39FF14]">
            <span className="text-white/50">Try: </span>
            {help.try}
          </p>
        </div>
      }
    >
      <button
        type="button"
        className="inline-flex items-center gap-2 text-left text-2xl font-bold text-white transition hover:text-[#39FF14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF14]"
        aria-label={`${category}. ${help.blurb}`}
      >
        {category}
        <span
          className="grid h-5 w-5 place-items-center rounded-full border border-white/20 text-[10px] font-semibold text-white/50"
          aria-hidden
        >
          ?
        </span>
      </button>
    </Tooltip>
  );
}

export function CommandReference() {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Canonical grammar</p>
        <code className="mt-4 block overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-[#39FF14]">
          {COMMAND_GRAMMAR}
        </code>
        <p className="mt-4 text-sm leading-6 text-white/60">
          Default is standalone-first: a named command runs solo and brief. Use assist, flow, release, report, or deep
          only when needed. Hover a category title for what it covers and what to try.
        </p>
        <p className="mt-3 text-sm text-white/50">
          Local brain &amp; Obsidian operators:{" "}
          <a href="/brain" className="font-medium text-[#39FF14] underline-offset-2 hover:underline">
            /brain
          </a>
        </p>
      </div>

      {COMMAND_CATEGORIES.map((category) => (
        <div key={category} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <CategoryHelp category={category} />
          {COMMAND_CATEGORY_HELP[category] && (
            <p className="mt-2 max-w-3xl text-sm text-white/50">{COMMAND_CATEGORY_HELP[category].blurb}</p>
          )}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.16em] text-white/40">
                <tr>
                  <th className="border-b border-white/10 py-3 pr-4">Command</th>
                  <th className="border-b border-white/10 py-3 pr-4">Alias</th>
                  <th className="border-b border-white/10 py-3 pr-4">ID</th>
                  <th className="border-b border-white/10 py-3 pr-4">Status</th>
                  <th className="border-b border-white/10 py-3">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {COMMANDS.filter((command) => command.category === category).map((command) => (
                  <tr key={`${command.cmd}-${command.id}`} className="text-white/70">
                    <td className="border-b border-white/5 py-3 pr-4 font-mono text-[#39FF14]">{command.cmd}</td>
                    <td className="border-b border-white/5 py-3 pr-4 font-mono">{command.alias}</td>
                    <td className="border-b border-white/5 py-3 pr-4 font-semibold text-white">{command.id}</td>
                    <td className="border-b border-white/5 py-3 pr-4">{command.status}</td>
                    <td className="border-b border-white/5 py-3">{command.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </section>
  );
}
