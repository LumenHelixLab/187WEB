"use client";

import { useState } from "react";
import Link from "next/link";
import { brandAssets } from "@/lib/brand-assets";
import { COMMANDS } from "@/components/187/command-data";
import { CommandPalette } from "@/components/187/CommandPalette";
import { Reveal } from "@/components/Reveal";
import { KineticHeadline } from "@/components/type/KineticHeadline";
import { ProductShell } from "./ProductShell";
import { AgentDepartments } from "./AgentDepartments";
import { AccessIncludeCTA } from "./AccessIncludeCTA";
import { SkillCardsGrid } from "./SkillCardsGrid";
import { HeroJazz } from "./HeroJazz";
import { charlotteModules, quickStats, installSnippets } from "./launch-data";

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
        <HeroJazz>
          <div className="mx-auto max-w-5xl text-center">
            <div className="relative mx-auto flex max-w-3xl flex-col items-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
              <img
                data-hero-badge
                src={brandAssets.heroBadge}
                alt="187WEB"
                width={1024}
                height={1024}
                decoding="async"
                fetchPriority="high"
                className="h-auto w-full max-w-[16rem] object-contain drop-shadow-[0_0_48px_rgba(57,255,20,0.22)] sm:max-w-[20rem] md:max-w-[24rem] lg:max-w-[28rem]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
              <img
                data-hero-word
                src={brandAssets.wordmark}
                alt="187WEB wordmark"
                width={800}
                height={200}
                decoding="async"
                className="mt-5 h-auto w-full max-w-md object-contain sm:mt-7 sm:max-w-lg md:max-w-xl"
              />
              <p data-hero-tag className="brand-hero-tagline mt-5 max-w-xl text-center sm:mt-6">
                a Killer{" "}
                <span className="sc-grad-text">AI-Powered</span>{" "}
                <span className="text-[#39FF14]">WEB</span> Toolkit Suite
              </p>
            </div>

            <KineticHeadline
              as="h1"
              text="Type one command."
              accent="Ship the whole surface."
              className="mt-10 text-[clamp(2.5rem,1.2rem+6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white sm:mt-12"
            />

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
              187WEB is a command-driven AI web suite that turns intent into research-grade pages, design systems, docs,
              launch plans, and publish gates — each skill usable alone or chained through the{" "}
              <code className="text-[#39FF14]">/187</code> command surface.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span data-hero-pill>
                <OutcomePill>Launch a landing page this afternoon</OutcomePill>
              </span>
              <span data-hero-pill>
                <OutcomePill>Find a free stack for any MVP</OutcomePill>
              </span>
              <span data-hero-pill>
                <OutcomePill>Ship a reproducible research lab</OutcomePill>
              </span>
              <span data-hero-pill>
                <OutcomePill>Audit before you publish</OutcomePill>
              </span>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                data-hero-cta
                href="/187"
                className="sc-glow sc-glow-pulse inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#050608] will-change-transform"
              >
                Explore /187 Commands
              </Link>
              <Link
                data-hero-cta
                href="/brain"
                className="inline-flex h-12 items-center justify-center rounded border border-[#39FF14]/30 bg-[#39FF14]/5 px-6 text-sm font-semibold text-[#39FF14] will-change-transform"
              >
                Local brain / Obsidian
              </Link>
              <Link
                data-hero-cta
                href="/showcase"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white will-change-transform"
              >
                Motion showcase
              </Link>
              <Link
                data-hero-cta
                href="/187motion"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white will-change-transform"
              >
                187MOTION
              </Link>
              <Link
                data-hero-cta
                href="/install"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white will-change-transform"
              >
                Install
              </Link>
            </div>
          </div>
        </HeroJazz>
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
    "187CHAIN",
    "187GSAP",
    "187TYPE",
    "187MODEL",
    "187SCROLL",
    "187AUDIO",
    "187VIZ",
    "187MOTION",
    "187HERO",
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

function CharlotteModules() {
  return (
    <section id="charlotte" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">CHARLOTTE module array</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            THREAD · COMPRESS · TENSION · SPARK · CORD · SCOUT · LAB · FUSE
          </h2>
          <p className="mt-4 text-white/60">
            Cross-cutting modules that thread intent, retrieve info, recycle solutions, dispatch experts, run isolated
            actions, and resolve conflicts into decision-ready artifacts.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {charlotteModules.map((module, i) => (
            <Reveal key={module.id} delay={i * 60}>
              <Link
                href="/charlotte"
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
                  <span>Open CHARLOTTE</span>
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
              {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
              <img
                src={brandAssets.knotstoreLogo}
                alt="KNOTstore"
                className="mb-4 h-12 w-auto"
              />
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
    `Loads the ${chip} skill into the palette.`
  );
}

function CommandSurface() {
  const [commandInput, setCommandInput] = useState("/187 ");
  const [hint, setHint] = useState("Pick a chip or type — purpose appears here.");
  return (
    <section id="command" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Interactive command surface</p>
          <KineticHeadline
            text="Try a slash"
            accent="command."
            as="h2"
            className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-white"
          />
          <p className="mt-4 text-white/60">
            Tap a chip or type your own. The same registry powers the CLI, docs, and this page.
          </p>
        </div>

        <Reveal delay={100}>
          <div className="mx-auto max-w-4xl">
            <div className="mb-3 flex flex-wrap justify-center gap-2">
              {COMMAND_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setCommandInput(chip);
                    setHint(commandPurpose(chip));
                  }}
                  onFocus={() => setHint(commandPurpose(chip))}
                  onMouseEnter={() => setHint(commandPurpose(chip))}
                  aria-label={`${chip}. ${commandPurpose(chip)}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition hover:border-[#39FF14]/40 hover:text-[#39FF14]"
                >
                  {chip}
                </button>
              ))}
            </div>
            <p className="mb-4 min-h-[1.25rem] text-center text-xs text-white/45" aria-live="polite">
              {hint}
            </p>
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
      <SkillCardsGrid />
      <AgentDepartments />
      <AccessIncludeCTA />
      <CharlotteModules />
      <ResearchLab />
      <CommandSurface />
      <InstallSection />
    </ProductShell>
  );
}
