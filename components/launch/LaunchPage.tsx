"use client";

import { useState } from "react";
import Link from "next/link";
import { brandAssets } from "@/lib/brand-assets";
import { skillShowcases, type SkillShowcaseData, skillColorValue, skillIsRainbow, skillRainbowTextClass } from "@/lib/skill-showcase-data";
import { COMMANDS } from "@/components/187/command-data";
import { CommandPalette } from "@/components/187/CommandPalette";
import { Reveal } from "@/components/Reveal";
import { Tooltip } from "@/components/Tooltip";
import { ProductShell } from "./ProductShell";
import { AgentDepartments } from "./AgentDepartments";
import { AccessIncludeCTA } from "./AccessIncludeCTA";
import { natashaModules, quickStats, installSnippets } from "./launch-data";

const REPO = "https://github.com/LumenHelixLab/187WEB";
const RESEARCH_LAB_COMMANDS = [
  "/187 research",
  "/187 labs",
  "/187 data",
  "/187 crate",
  "/187 bench",
  "/187 prov",
];

function OutcomePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70">
      <span className="h-1.5 w-1.5 rounded-full bg-[#39FF14] shadow-[0_0_6px_#39FF14]" />
      {children}
    </span>
  );
}

function HeroOrbs() {
  return (
    <>
      <div
        className="sc-float sc-pulse pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-[#39FF14]/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="sc-float pointer-events-none absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-[#a855f7]/15 blur-3xl"
        style={{ animationDelay: "1.5s" }}
        aria-hidden="true"
      />
      <div
        className="sc-pulse pointer-events-none absolute left-1/3 top-0 h-40 w-40 rounded-full bg-[#22d3ee]/10 blur-3xl"
        style={{ animationDelay: "0.75s" }}
        aria-hidden="true"
      />
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="relative px-6 pb-16 pt-28 sm:pb-24 sm:pt-36">
      <HeroOrbs />
      <div className="container-x relative">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <div className="mx-auto mb-6 flex max-w-3xl flex-col items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
              <img
                src={brandAssets.headerLockup}
                alt="187WEB — A killer AI-powered web suite"
                className="w-full max-w-2xl drop-shadow-[0_0_40px_rgba(57,255,20,0.25)]"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute -inset-4 rounded-full bg-[#39FF14]/10 blur-3xl" />
              {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
              <img
                src={brandAssets.headerInfographic}
                alt="187WEB killer web design solutions: 187REPO, 187CRAFT, 187VIBE, 187LAUNCH"
                className="relative w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
              />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="mt-8 text-[clamp(2.5rem,1.2rem+6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white">
              Type one command. <span className="sc-grad-text">Ship the whole surface.</span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
              187WEB is a command-driven AI web suite that turns intent into research-grade pages, design systems, docs,
              launch plans, and publish gates — each skill usable alone or chained through the{" "}
              <code className="text-[#39FF14]">/187</code> command surface.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <OutcomePill>Launch a landing page this afternoon</OutcomePill>
              <OutcomePill>Find a free stack for any MVP</OutcomePill>
              <OutcomePill>Ship a reproducible research lab</OutcomePill>
              <OutcomePill>Audit before you publish</OutcomePill>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/187"
                className="sc-glow sc-glow-pulse inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#050608] transition hover:brightness-110"
              >
                Explore /187 Commands
              </Link>
              <Link
                href="/showcase"
                className="inline-flex h-12 items-center justify-center rounded border border-[#39FF14]/30 bg-[#39FF14]/5 px-6 text-sm font-semibold text-[#39FF14] transition hover:bg-[#39FF14]/10"
              >
                Open Showcase
              </Link>
              <Link
                href="/install"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Install / Select Skills
              </Link>
              <a
                href={REPO}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                GitHub Repo
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-10 backdrop-blur-sm">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {quickStats.map((stat) => (
            <Reveal key={stat.label}>
              <div className="text-center">
                <div className="text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] font-bold text-[#39FF14]">{stat.value}</div>
                <div className="mt-1 text-sm font-medium uppercase tracking-wider text-white/50">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const items = [
    "187REPO",
    "187CRAFT",
    "187VIBE",
    "187LAUNCH",
    "187FREE",
    "187RESEARCH",
    "187SEO",
    "187REVENUE",
    "187DOCS",
    "187LEARN",
    "187TEST",
    "187ACCESS+",
    "187INCLUDE+",
    "187VERSION",
    "187PUBLISH",
    "187NATASHA",
    "187QUANTUM",
    "187CHAIN",
  ];
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#050608] py-4">
      <div className="sc-mask-x">
        <div className="sc-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-8 text-sm font-semibold uppercase tracking-wider text-white/40">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-[#39FF14]/60" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandIntelligence() {
  const intel = [
    {
      skill: "187REPO",
      color: "#f43f5e",
      bullets: ["Systematized Codebase Structure", "Git Flow Workflow", "Component Versioning"],
    },
    {
      skill: "187CRAFT",
      color: "#22d3ee",
      bullets: ["Atomic Design System", "Pixel-Perfect Components", "Scalable Grid Modules"],
    },
    {
      skill: "187VIBE",
      color: "#a855f7",
      bullets: ["UX Flow Mapping v2.0", "Interaction State Library", "User Behavior Data"],
    },
    {
      skill: "187LAUNCH",
      color: "#f59e0b",
      bullets: [
        "CI/CD Build Pipelines",
        "Multi-Cloud Kubernetes",
        "Multi-Environment Deployment Engines",
        "Instant Zero-Downtime Rollbacks",
      ],
    },
  ];

  return (
    <section className="relative px-6 py-16 sm:py-20">
      <div className="container-x">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
            Extracted from the brand header
          </p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3rem)] font-bold tracking-tight text-white">
            What the spider orb is built to ship
          </h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {intel.map((item, i) => (
            <Reveal key={item.skill} delay={i * 80}>
              <div
                className="h-full rounded-2xl border border-white/10 bg-[#0A0C14] p-5"
                style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${item.color}22` }}
              >
                <h3 className="font-bold text-white">{item.skill}</h3>
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-white/60">
                      <span style={{ color: item.color }}>›</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <div className="mt-8 text-center">
            <code className="rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 px-4 py-2 text-xs text-[#39FF14]">
              STATUS: REPO UPDATES DETECTED — 8 NEW FEATURES INTEGRATED — PLATFORM OPTIMIZED
            </code>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: SkillShowcaseData; index: number }) {
  const alias = skill.triggers[0]?.replace("/187", "").trim() ?? skill.id;
  const useCase = skill.useCases[0] ?? "";
  const output = skill.outputs[0] ?? "";
  const solidColor = skillColorValue(skill.color);
  const taglineClass = skillIsRainbow(skill.color) ? skillRainbowTextClass() : "";

  return (
    <Reveal delay={index * 40}>
      <Tooltip
        content={
          <>
            <strong className="text-white">{skill.name}</strong> — {skill.description}{" "}
            <Link href={`/187${skill.id}`} className="mt-2 block text-[#39FF14] underline">
              Open {skill.name} →
            </Link>
          </>
        }
      >
        <Link
          href={`/187${skill.id}`}
          className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-[#39FF14]/30"
          style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${solidColor}22` }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-white">{skill.name}</h3>
              <p className={`text-sm ${taglineClass}`} style={skillIsRainbow(skill.color) ? undefined : { color: solidColor }}>
                {skill.tagline}
              </p>
            </div>
            <span
              className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-xs font-bold ${
                skillIsRainbow(skill.color) ? "text-white" : "text-[#050608]"
              }`}
              style={skillIsRainbow(skill.color) ? {} : { backgroundColor: solidColor }}
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
            <code className="block rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">/187 {alias}</code>
            <p className="text-xs text-white/40">
              <span className="text-white/60">Use case:</span> {useCase}
            </p>
            <p className="text-xs text-white/40">
              <span className="text-white/60">Delivers:</span> {output}
            </p>
          </div>
          <div
            className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium"
            style={{ color: solidColor }}
          >
            <span>Explore {skill.name}</span>
            <svg
              className="h-4 w-4 transition group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </Link>
      </Tooltip>
    </Reveal>
  );
}

function SkillsGrid() {
  return (
    <section id="skills" className="relative px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">First-class skills</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            27 commands. One surface.
          </h2>
          <p className="mt-4 text-white/60">
            Every card is a routable skill page. Click through to see triggers, outputs, templates, and routing.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skillShowcases.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NatashaModules() {
  return (
    <section id="natasha" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">NATASHA module array</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            THREAD · COMPRESS · TENSION · SPARK · CORD · SCOUT · LAB · FUSE
          </h2>
          <p className="mt-4 text-white/60">
            Cross-cutting modules that sharpen prompts, tune output profiles, dispatch experts, run local actions, and
            synthesize evidence.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {natashaModules.map((module, i) => (
            <Reveal key={module.id} delay={i * 60}>
              <Link
                href="/187natasha"
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-[#39FF14]/30"
                style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${module.color}22` }}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-white">{module.id}</h3>
                  <code className="rounded bg-[#39FF14]/10 px-2 py-1 text-xs text-[#39FF14]">/187 {module.alias}</code>
                </div>
                {module.legacy && <p className="mt-1 text-xs text-white/30">legacy: {module.legacy}</p>}
                <p className="mt-3 text-sm leading-relaxed text-white/60">{module.purpose}</p>
                <div
                  className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium"
                  style={{ color: module.color }}
                >
                  <span>Open NATASHA</span>
                  <svg
                    className="h-4 w-4 transition group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchLab() {
  return (
    <section className="relative px-6 py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Research lab stack</p>
              <h3 className="mt-3 text-2xl font-bold text-white">Reproducible, citable, source-backed</h3>
              <p className="mt-3 text-white/60">
                From claim discipline to RO-Crate packaging, the research stack turns findings into reproducible,
                citable artifacts.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {RESEARCH_LAB_COMMANDS.map((cmd) => (
                  <code key={cmd} className="rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">
                    {cmd}
                  </code>
                ))}
              </div>
              <Link
                href="/187research"
                className="mt-6 inline-flex h-11 items-center justify-center rounded border border-[#39FF14]/30 bg-[#39FF14]/5 px-5 text-sm font-semibold text-[#39FF14] transition hover:bg-[#39FF14]/10"
              >
                Explore 187RESEARCH
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">KNOTstore memory layer</p>
              <h3 className="mt-3 text-2xl font-bold text-white">Agentic memory, local-first</h3>
              <p className="mt-3 text-white/60">
                Pluggable agentic memory with SQLite, KNOT-point, and hybrid backends. Preview the vault-style surface
                at /knotstore.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <code className="rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">/187 vault</code>
                <code className="rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">/187 vault init</code>
                <code className="rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">/187 vault sync</code>
              </div>
              <Link
                href="/knotstore"
                className="mt-6 inline-flex h-11 items-center justify-center rounded border border-[#39FF14]/30 bg-[#39FF14]/5 px-5 text-sm font-semibold text-[#39FF14] transition hover:bg-[#39FF14]/10"
              >
                Open KNOTstore
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const COMMAND_CHIPS = [
  "/187 craft",
  "/187 seo",
  "/187 launch",
  "/187 research",
  "/187 free",
  "/187 scan",
  "/187 publish",
  "/187 th",
];

function commandPurpose(chip: string): string {
  const cmd = chip.replace("/187 ", "").trim();
  return (
    COMMANDS.find((c) => c.cmd === chip || c.alias === cmd)?.purpose ??
    `Run ${chip}`
  );
}

function CommandSurface() {
  const [commandInput, setCommandInput] = useState("/187 ");
  return (
    <section id="command" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Interactive command surface</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Try a slash command
          </h2>
          <p className="mt-4 text-white/60">
            Tap a chip or type your own. The same registry powers the CLI, docs, and this page.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {COMMAND_CHIPS.map((chip) => (
                <Tooltip key={chip} content={commandPurpose(chip)}>
                  <button
                    type="button"
                    onClick={() => setCommandInput(chip)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition hover:border-[#39FF14]/40 hover:text-[#39FF14]"
                  >
                    {chip}
                  </button>
                </Tooltip>
              ))}
            </div>
            <CommandPalette value={commandInput} onChange={setCommandInput} className="border-[#39FF14]/20" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DrawingAccent() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center" aria-hidden="true">
      <Reveal>
        <svg width="200" height="40" viewBox="0 0 200 40" fill="none" className="opacity-40">
          <path
            className="sc-draw-path"
            d="M0 20 C 40 0, 80 40, 120 20 S 180 0, 200 20"
            stroke="#39FF14"
            strokeWidth="1.5"
            pathLength="1"
          />
        </svg>
      </Reveal>
    </div>
  );
}

function InstallSection() {
  const [tab, setTab] = useState<keyof typeof installSnippets>("macos");
  return (
    <section id="install" className="relative px-6 py-20 sm:py-28">
      <DrawingAccent />
      <div className="container-x">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Install</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Spin up the web suite in seconds
          </h2>
          <p className="mt-4 text-white/60">
            Clone, install, seed the SQLite layer, and start the Next.js dev server.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Install commands">
              {(Object.keys(installSnippets) as Array<keyof typeof installSnippets>).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    tab === key
                      ? "bg-[#39FF14] text-[#050608]"
                      : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {key === "macos" ? "macOS / Linux" : key === "windows" ? "Windows" : "Git Bash / WSL"}
                </button>
              ))}
            </div>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-[#050608] p-5">
              <pre className="font-mono text-sm leading-7 text-[#39FF14]">
                <code>{installSnippets[tab]}</code>
              </pre>
            </div>
            <p className="mt-4 text-center text-xs text-white/40">
              Tested on Windows 11, macOS Sonoma, Ubuntu 22.04/24.04, and modern mobile browsers.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function LaunchPage() {
  return (
    <ProductShell>
      <Hero />
      <StatsStrip />
      <MarqueeStrip />
      <BrandIntelligence />
      <SkillsGrid />
      <AgentDepartments />
      <AccessIncludeCTA />
      <NatashaModules />
      <ResearchLab />
      <CommandSurface />
      <InstallSection />
    </ProductShell>
  );
}
