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
import { PrideCta, PrideUnityRail } from "@/components/access/PrideSpectrum";

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
              {/* Official web shield / badge — hero mark (mascot lives in 187VIBE companions) */}
              {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
              <img
                data-hero-badge
                src={brandAssets.heroBadge}
                alt="187WEB shield badge"
                width={800}
                height={800}
                decoding="async"
                fetchPriority="high"
                className="h-auto w-full max-w-[14rem] object-contain drop-shadow-[0_0_48px_rgba(57,255,20,0.35)] sm:max-w-[17rem] md:max-w-[20rem] lg:max-w-[22rem]"
              />
              {/* Official wordmark */}
              {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
              <img
                data-hero-word
                src={brandAssets.wordmark}
                alt="187WEB"
                width={800}
                height={200}
                decoding="async"
                className="mt-5 h-auto w-full max-w-sm object-contain sm:mt-7 sm:max-w-md md:max-w-lg"
              />
              <p data-hero-tag className="brand-hero-tagline mt-5 max-w-xl text-center sm:mt-6">
                a Killer{" "}
                <span className="sc-grad-text">AI-Powered</span>{" "}
                <span className="text-[#39FF14]">WEB</span> Toolkit Suite
              </p>
              {/* Lab mark — subtle brand pepper */}
              {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
              <img
                src={brandAssets.bulb}
                alt="LumenHelix Lab"
                width={64}
                height={64}
                className="mt-6 h-10 w-10 object-contain opacity-80 sm:h-12 sm:w-12"
              />
            </div>

            <KineticHeadline
              as="h1"
              text="Access is the product."
              accent="Inclusion is the system."
              className="mt-10 text-[clamp(2.4rem,1.15rem+5.5vw,5.25rem)] font-bold leading-[0.95] tracking-tight text-white sm:mt-12"
            />

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
              187WEB is the AI web suite that treats{" "}
              <strong className="text-white">Access+</strong> and{" "}
              <strong className="text-white">Include+</strong> as premier, first-class skill systems — disability
              access, ADHD/neurodivergent usability, LGBTQ+ and identity safety — engineered into craft, test, and
              publish chains. Not a compliance sticker. Core engineering. Run the full sweep with{" "}
              <code className="text-[#39FF14]">/187++</code>.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span data-hero-pill>
                <OutcomePill>Disability access as a skill system</OutcomePill>
              </span>
              <span data-hero-pill>
                <OutcomePill>ADHD / neurodivergent UX by design</OutcomePill>
              </span>
              <span data-hero-pill>
                <OutcomePill>LGBTQ+ & identity-safe forms</OutcomePill>
              </span>
              <span data-hero-pill>
                <OutcomePill>/187++ full access &amp; inclusion sweep</OutcomePill>
              </span>
            </div>

            <PrideUnityRail className="mx-auto mt-8 max-w-sm" />

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PrideCta data-hero-cta href="/187plusplus" spectrum="full">
                Explore /187++
              </PrideCta>
              <PrideCta data-hero-cta href="/187access" spectrum="access">
                187ACCESS+
              </PrideCta>
              <PrideCta data-hero-cta href="/187include" spectrum="include">
                187INCLUDE+
              </PrideCta>
              <PrideCta data-hero-cta href="/#access-include" spectrum="full" variant="outline">
                Spectrum map
              </PrideCta>
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
    "187ACCESS+",
    "187INCLUDE+",
    "/187++",
    "DISABILITY ACCESS",
    "ADHD UX",
    "NEURODIVERGENT",
    "LGBTQ+ SAFETY",
    "WCAG+",
    "187CRAFT",
    "187CREATE",
    "187TEST",
    "187PUBLISH",
  ];
  const [paused, setPaused] = useState(false);
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#050608] py-3">
      <div className="container-x mb-2 flex justify-end">
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
          className="min-h-[44px] rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF14]"
        >
          {paused ? "Play marquee" : "Pause marquee"}
        </button>
      </div>
      <div className="sc-mask-x">
        <div
          className={`sc-marquee flex w-max items-center gap-8 whitespace-nowrap ${paused ? "[animation-play-state:paused]" : ""}`}
        >
          {[...items, ...items].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-8 text-sm font-semibold uppercase tracking-wider text-white/55"
            >
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
        "Launch checklists & asset plans",
        "Channel + measurement framing",
        "Gate handoffs to Access+ / Include+",
        "Status: Prompt Skill (not multi-cloud ops)",
      ],
    },
  ];

  return (
    <section className="relative px-6 py-16 sm:py-20">
      <div className="container-x">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
            Capability honesty
          </p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3rem)] font-bold tracking-tight text-white">
            What the suite ships today
          </h2>
          <p className="mt-3 text-sm text-white/50">
            Labels: <strong className="text-white/70">Prompt Skill</strong> = skill definitions & agent kits;{" "}
            <strong className="text-white/70">Interactive Demo</strong> = this site;{" "}
            <strong className="text-white/70">Roadmap</strong> = not claimed as runtime.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {intel.map((item, i) => (
            <Reveal key={item.skill} delay={i * 80}>
              <div
                className="h-full rounded-2xl border border-white/10 bg-[#0A0C14] p-5"
                style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${item.color}22` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-white">{item.skill}</h3>
                  <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/55">
                    Prompt Skill
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-white/70">
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
  "/187++",
  "/187access",
  "/187include",
  "/187 craft",
  "/187 create",
  "/187 test",
  "/187 publish",
  "/187 write",
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

/** Growth hook — primary path into /187create (187webdesign conversion narrative). */
function CreateGrowthHook() {
  const hooks = [
    {
      title: "Landing in one afternoon",
      body: "One offer, one audience, one CTA — ship a conversion surface with access checks baked in, not bolted on.",
      cmd: "/187create → /187access",
    },
    {
      title: "Ad creatives that hand off",
      body: "Three variants with hook, visual direction, and CTA — then route winners into craft + inclusion review.",
      cmd: "/187create · /187include",
    },
    {
      title: "Growth MVP → access gate",
      body: "Validate fast, systemize with craft, then /187++ before publish so access and inclusion are engineering gates.",
      cmd: "/187create → /187++ → /187publish",
    },
  ];

  return (
    <section id="create" className="relative border-y border-white/10 bg-[#080808]/90 px-6 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(57,255,20,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />
      <div className="container-x relative">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#39FF14]">
            Growth path · 187CREATE
          </p>
          <KineticHeadline
            text="Need a page that converts?"
            accent="Start here."
            as="h2"
            className="mt-4 font-display text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-white"
          />
          <p className="mt-4 text-lg text-white/60">
            Skip the blank canvas. Hook → offer → proof → CTA — then Access+/Include+ skillchains before publish.
            Growth without access is incomplete product work.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {hooks.map((h, i) => (
            <Reveal key={h.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                  HOOK {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{h.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{h.body}</p>
                <code className="mt-4 block truncate rounded-lg border border-[#39FF14]/15 bg-[#39FF14]/5 px-3 py-2 font-mono text-xs text-[#39FF14]">
                  {h.cmd}
                </code>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/187create"
            className="sc-glow inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-7 text-sm font-semibold text-[#050608]"
          >
            Open 187CREATE
          </Link>
          <Link
            href="/influencer-kit"
            className="inline-flex h-12 items-center justify-center rounded border border-[#39FF14]/35 bg-[#39FF14]/10 px-6 text-sm font-semibold text-[#39FF14] transition hover:bg-[#39FF14]/15"
          >
            Influencer kit
          </Link>
          <Link
            href="/187craft"
            className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-white/25"
          >
            Then systemize with 187CRAFT
          </Link>
          <Link
            href="/#skills"
            className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-white/25"
          >
            Full skill registry
          </Link>
        </div>
      </div>
    </section>
  );
}

function InstallSection() {
  const [tab, setTab] = useState<keyof typeof installSnippets>("macos");
  const skillHosts = [
    { name: "Claude Code", path: ".claude/skills/", note: "Canonical skill tree" },
    { name: "Grok", path: ".grok/skills/", note: "Adapter mirror" },
    { name: "ChatGPT / Codex", path: ".chatgpt/ · .codex/", note: "Generated adapters" },
    { name: "Gemini / Kimi / Ollama / Hermes", path: ".gemini/ · .kimi/ · .ollama/ · .herme/", note: "npm run adapters:generate" },
  ];
  return (
    <section id="install" className="relative px-6 py-20 sm:py-28">
      <DrawingAccent />
      <div className="container-x">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Install · two paths</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Skills for agents. Showcase for demos.
          </h2>
          <p className="mt-4 text-white/65">
            This site is an <strong className="text-white/85">Interactive Demo</strong>. 187SKILLS install into your
            agent host. The commands below only run the Next.js showcase locally.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal delay={80}>
            <div className="h-full rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39FF14]">Path A · 187SKILLS</p>
              <h3 className="mt-2 font-display text-xl font-bold text-white">Install skills into your agent</h3>
              <p className="mt-2 text-sm text-white/60">
                Clone the repo and load skills from the host folders (or regenerate adapters). Status:{" "}
                <span className="text-white/80">Prompt Skill</span> definitions — not a hosted runtime.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-white/70">
                {skillHosts.map((h) => (
                  <li key={h.name} className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">
                    <strong className="text-white">{h.name}</strong>
                    <span className="mt-0.5 block font-mono text-xs text-[#39FF14]">{h.path}</span>
                    <span className="text-xs text-white/45">{h.note}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://github.com/LumenHelixLab/187WEB"
                className="mt-6 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#39FF14] underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer noopener"
              >
                Clone on GitHub →
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Path B · showcase site</p>
              <h3 className="mt-2 font-display text-xl font-bold text-white">Run this demo locally</h3>
              <p className="mt-2 text-sm text-white/60">
                Interactive Demo of ProductShell, Access+/Include+ surfaces, and the /187 command explorer.
              </p>
              <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Local demo install OS">
                {(Object.keys(installSnippets) as Array<keyof typeof installSnippets>).map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={tab === key}
                    onClick={() => setTab(key)}
                    className={`min-h-[44px] rounded-full px-4 py-2 text-xs font-semibold transition ${
                      tab === key
                        ? "bg-[#39FF14] text-[#050608]"
                        : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {key === "macos" ? "macOS / Linux" : key === "windows" ? "Windows" : "Git Bash / WSL"}
                  </button>
                ))}
              </div>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-[#050608] p-4">
                <pre className="font-mono text-sm leading-7 text-[#39FF14]">
                  <code>{installSnippets[tab]}</code>
                </pre>
              </div>
              <p className="mt-3 text-xs text-white/45">
                Source-available under custom noncommercial license (not OSI open-source).
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function LaunchPage() {
  return (
    <ProductShell>
      <Hero />
      <AccessIncludeCTA />
      <StatsStrip />
      <MarqueeStrip />
      <CreateGrowthHook />
      <BrandIntelligence />
      <SkillCardsGrid compact />
      <AgentDepartments />
      <CharlotteModules />
      <ResearchLab />
      <CommandSurface />
      <InstallSection />
    </ProductShell>
  );
}
