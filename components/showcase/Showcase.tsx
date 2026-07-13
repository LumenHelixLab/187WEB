import Link from "next/link";
import { BrandOrb, HeaderLockup, LabWordmark } from "@/components/BrandMark";
import { Reveal } from "@/components/Reveal";
import { CommandPalette } from "@/components/187/CommandPalette";
import { AbilityTabs } from "./AbilityTabs";
import { ScenarioDemo } from "./ScenarioDemo";
import { CommandTeaser } from "./CommandTeaser";
import { MiniAbilityCard } from "./AbilityCard";
import { COMMANDS, type CommandEntry } from "@/components/187/command-data";
const FIRST_CLASS_ROSTER = "187REPO 187CRAFT 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187QUANTUM 187CHAIN";
void FIRST_CLASS_ROSTER;


const REPO = "https://github.com/LumenHelixLab/187WEB";

function uniqueByStatus(status: CommandEntry["status"]) {
  const seen = new Set<string>();
  return COMMANDS.filter((c) => {
    if (c.status !== status) return false;
    const key = c.id.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const modules = uniqueByStatus("module").map((c, i) => ({
  id: c.id.toLowerCase(),
  name: c.id,
  alias: c.alias,
  purpose: c.purpose,
  color: ["#f43f5e", "#8b5cf6", "#06b6d4", "#f59e0b", "#10b981"][i % 5],
}));

const research = uniqueByStatus("research").map((c, i) => ({
  id: c.id.toLowerCase(),
  name: c.id,
  alias: c.alias,
  purpose: c.purpose,
  color: ["#3b82f6", "#a855f7", "#0ea5e9", "#14b8a6", "#eab308", "#f97316", "#ec4899", "#84cc16", "#6366f1", "#64748b", "#d946ef", "#22c55e"][i % 12],
}));

const packs = [
  { name: "core-lite", contents: "cmd · rpt · scan · flow · docs · ver · pub", for: "Lightweight control plane for any project" },
  { name: "web-build", contents: "repo · craft · kit · lab · docs · test · ax", for: "Landing pages, sites, and component work" },
  { name: "research-lab", contents: "res · sci · labs · data · api · bench · meta · prov · crate", for: "Reproducible computational research" },
  { name: "colab-lab", contents: "nb · colab · labs · data · bench", for: "Notebook-first experiments and Colab" },
  { name: "gap-math", contents: "gap · sci · bench · meta · prov · crate", for: "GAP algebra and proof workflows" },
  { name: "local-brain", contents: "vault · docs · rpt · res · ch · co", for: "Obsidian + Claudian local knowledge base" },
];

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="sc-glass mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5">
        <a href="#top" className="flex items-center gap-2.5 font-bold tracking-tight text-white">
          <BrandOrb size="xs" alt="" className="h-8 w-8 drop-shadow-[0_0_12px_rgba(57,255,20,0.45)]" />
          <span className="hidden sm:inline">187WEB</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-white/60 md:flex">
          <a href="#abilities" className="transition hover:text-white">Abilities</a>
          <a href="#scenarios" className="transition hover:text-white">Scenarios</a>
          <a href="#commands" className="transition hover:text-white">Commands</a>
          <Link href="/187" className="transition hover:text-white">/187</Link>
          <Link href="/install" className="transition hover:text-white">Install</Link>
        </div>
        <a href={REPO} target="_blank" rel="noreferrer noopener" className="inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white transition hover:bg-white/10">GitHub</a>
      </nav>
    </header>
  );
}

function OutcomePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70">
      <span className="h-1.5 w-1.5 rounded-full bg-[#39FF14]" />
      {children}
    </span>
  );
}

export function Showcase() {
  return (
    <div className="showcase relative overflow-x-clip bg-[#05060A] text-[#ECEDF7]">
      <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(57,255,20,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.15) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(120% 100% at 50% 0%, #000 40%, transparent 85%)", WebkitMaskImage: "radial-gradient(120% 100% at 50% 0%, #000 40%, transparent 85%)" }} aria-hidden="true" />
      <Header />

      <section id="top" className="relative px-6 pb-20 pt-28 sm:pb-28 sm:pt-36">
        <div className="container-x relative">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center gap-5">
              <BrandOrb
                size="xl"
                alt="187WEB primary brand mark"
                priority
                className="h-28 w-28 drop-shadow-[0_0_40px_rgba(57,255,20,0.35)] sm:h-36 sm:w-36"
              />
              <HeaderLockup priority className="max-w-3xl drop-shadow-[0_0_24px_rgba(0,0,0,0.65)]" />
            </div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]"><span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />187WEB</p>
            <h1 className="mt-6 text-[clamp(2.75rem,1.4rem+6vw,6rem)] font-bold leading-[0.92] tracking-tight text-white">
              Type one command. <span className="text-[#39FF14]">Ship the whole surface.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
              187WEB is a command-driven web suite that turns intent into design, code, docs, research labs, launch plans, and publish gates — each skill usable alone or chained through the 187 command surface.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <OutcomePill>Launch a landing page this afternoon</OutcomePill>
              <OutcomePill>Find a free stack for any MVP</OutcomePill>
              <OutcomePill>Ship a reproducible research lab</OutcomePill>
              <OutcomePill>Audit before you publish</OutcomePill>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/187" className="inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#05060A] transition hover:brightness-110">Explore /187 Commands</Link>
              <Link href="/install" className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Install / Select Skills</Link>
              <a href={REPO} target="_blank" rel="noreferrer noopener" className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10">GitHub Repo</a>
            </div>
          </div>
          <Reveal className="mx-auto mt-16 max-w-5xl"><CommandPalette /></Reveal>
        </div>
      </section>

      <section id="abilities" className="relative px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">187 Abilities</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">What 187WEB actually does</h2>
            <p className="mt-4 text-white/60">Every card is a skill you can invoke, inspect, and compose. Click through to see triggers, outputs, routing, and templates.</p>
          </Reveal>
          <AbilityTabs />
        </div>
      </section>

      <section id="scenarios" className="relative border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Scenario demos</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">Real chains, real artifacts</h2>
            <p className="mt-4 text-white/60">Four end-to-end examples showing how 187 skills chain into outcomes.</p>
          </Reveal>
          <ScenarioDemo />
        </div>
      </section>

      <section className="relative px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Charlotte module array</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">THREAD · TUNE · CORD · CHAR · LAB</h2>
            <p className="mt-4 text-white/60">Cross-cutting modules that sharpen prompts, tune output profiles, dispatch experts, run local actions, and assist research.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, i) => (
              <MiniAbilityCard key={m.id} id={m.id} name={m.name} alias={m.alias} purpose={m.purpose} color={m.color} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>

      <section id="research" className="relative border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Research Lab Stack</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">Scientific standards, public data, notebooks, and release packets</h2>
            <p className="mt-4 text-white/60">From claim discipline to RO-Crate packaging, the research stack turns findings into reproducible, citable artifacts.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {research.map((r, i) => (
              <MiniAbilityCard key={r.id} id={r.id} name={r.name} alias={r.alias} purpose={r.purpose} color={r.color} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>

      <section id="commands" className="relative px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Command surface</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">Browse by category, click a skill page</h2>
            <p className="mt-4 text-white/60">Commands that have dedicated skill pages link through to full trigger, output, and template documentation.</p>
          </Reveal>
          <CommandTeaser />
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Preflight / install / onboarding</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">Install one thing, a curated pack, or the full suite</h2>
            <p className="mt-4 text-white/60">The selector separates requirements from optional improvements and detects what the current agentic runtime can support.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packs.map((pack, i) => (
              <Reveal key={pack.name} delay={i * 60}>
                <Link href="/install" className="group block h-full rounded-2xl border border-white/10 bg-[#05060A] p-5 transition hover:-translate-y-1 hover:border-[#39FF14]/30">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-white">{pack.name}</h3>
                    <span className="text-xs font-semibold text-[#39FF14]">pack</span>
                  </div>
                  <p className="mt-2 text-sm text-white/60">{pack.for}</p>
                  <p className="mt-3 font-mono text-sm leading-6 text-[#39FF14]/80">{pack.contents}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#05060A] px-6 py-12">
        <div className="container-x flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <LabWordmark height={18} className="opacity-90" />
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} LumenHelix Lab · 187WEB · Custom Noncommercial License with Reserved Knotstore IP
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/187" className="text-sm text-white/50 transition hover:text-white">/187 Reference</Link>
            <Link href="/install" className="text-sm text-white/50 transition hover:text-white">Install</Link>
            <a href={REPO} target="_blank" rel="noreferrer noopener" className="text-sm text-white/50 transition hover:text-white">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
