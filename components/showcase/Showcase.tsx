import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { principles, rubric, checklistTotal } from "@/lib/content";
import { Hero } from "./Hero";
import {
  CountUp,
  CursorGlow,
  MagneticButton,
  Marquee,
  OrbitCanvas,
  RippleButton,
  ScrambleText,
  ScrollProgress,
  SpotlightCard,
  TiltCard,
  Toggle,
} from "./primitives";

const REPO = "https://github.com/lumenhelixsolutions/187webDESIGN";

/* A scramble-in section header with an accent eyebrow. */
function Head({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7C3AED]">
        <span className="h-px w-6 bg-[#7C3AED]" />
        {eyebrow}
      </span>
      <h2 className="text-balance text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
        <ScrambleText text={title} />
      </h2>
      {sub ? <p className="mx-auto mt-4 max-w-xl text-pretty text-white/55">{sub}</p> : null}
    </div>
  );
}

const edges = [
  [50, 210, 130, 80],
  [130, 80, 210, 190],
  [210, 190, 300, 70],
  [300, 70, 375, 170],
  [50, 210, 110, 250],
  [110, 250, 210, 190],
  [210, 190, 270, 245],
  [270, 245, 375, 170],
  [130, 80, 300, 70],
];
const nodes = [
  [50, 210],
  [130, 80],
  [210, 190],
  [300, 70],
  [375, 170],
  [110, 250],
  [270, 245],
];

export function Showcase() {
  return (
    <div className="showcase relative overflow-x-clip">
      <ScrollProgress />
      <CursorGlow />

      {/* ---------------------------------------------------------------- nav */}
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 sc-glass">
          <a href="#top" className="flex items-center gap-2 font-bold tracking-tight text-white">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-[#2440E6] to-[#7C3AED] text-xs">
              187
            </span>
            <span className="hidden sm:inline">webDESIGN</span>
          </a>
          <div className="hidden items-center gap-7 text-sm text-white/60 md:flex">
            <a href="#motion" className="transition-colors hover:text-white">Motion</a>
            <a href="#bento" className="transition-colors hover:text-white">Bento</a>
            <a href="/templates" className="transition-colors hover:text-white">Templates</a>
            <a href="/resilience" className="transition-colors hover:text-white">Resilience</a>
          </div>
          <a
            href={REPO}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#060713] transition-transform hover:-translate-y-0.5"
          >
            GitHub ↗
          </a>
        </nav>
      </header>

      <span id="top" />
      <Hero />

      {/* ------------------------------------------------------- marquee band */}
      <div id="gallery" className="border-y border-white/10 bg-white/[0.02] py-5">
        <Marquee
          items={[
            "KINETIC TYPE",
            "GENERATIVE CANVAS",
            "SELF-DRAWING SVG",
            "3D TILT",
            "SPOTLIGHT",
            "MAGNETIC UI",
            "SCROLL REVEAL",
            "WCAG 2.2 AA",
            "CORE WEB VITALS",
          ]}
        />
      </div>

      {/* ---------------------------------------------------------- 1. motion */}
      <section id="motion" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <Head
          eyebrow="01 — Kinetic typography"
          title="Type that performs"
          sub="Text decodes as it scrolls into view, gradients pan, and weight responds to your cursor. Words are design material, not just labels."
        />
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-[clamp(1.6rem,1rem+3vw,3.4rem)] font-semibold leading-[1.1] tracking-tight text-white">
            We make the{" "}
            <span className="sc-grad-text">first five seconds</span> impossible to scroll past, then{" "}
            <span className="sc-vweight cursor-default text-white/70">hover</span> any{" "}
            <span className="sc-vweight cursor-default text-white/70">single</span>{" "}
            <span className="sc-vweight cursor-default text-white/70">word</span> to feel the weight
            shift.
          </p>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------- 2. svg */}
      <section id="svg" className="border-y border-white/10 bg-white/[0.02] py-24 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#22D3EE]">
              <span className="h-px w-6 bg-[#22D3EE]" />
              02 — Animated SVG
            </span>
            <h2 className="text-balance text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              Vectors that <span className="sc-grad-text">draw themselves</span>
            </h2>
            <p className="mt-4 max-w-md text-pretty text-white/55">
              The blueprint to the right strokes itself in on scroll (normalized{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-[0.85em] text-white/80">pathLength</code>{" "}
              + dash-offset). Beside it: a conic ring in perpetual rotation and a gradient blob that
              morphs forever — all pure CSS/SVG, zero images.
            </p>
            <div className="mt-9 flex items-center gap-8">
              <div className="relative h-24 w-24">
                <div className="sc-spin-slow absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#2440E6,#7C3AED,#22D3EE,#FF4D8D,#2440E6)]" />
                <div className="absolute inset-[3px] grid place-items-center rounded-full bg-[#060713] text-xs font-medium text-white/70">
                  ∞ spin
                </div>
              </div>
              <div className="sc-blob sc-float h-24 w-24 bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] opacity-90" />
            </div>
          </div>

          <Reveal className="rounded-2xl p-6 sc-glass">
            <svg viewBox="0 0 420 280" className="h-auto w-full" role="img" aria-label="A self-drawing node graph">
              <defs>
                <linearGradient id="scg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#22D3EE" />
                  <stop offset="0.5" stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#2440E6" />
                </linearGradient>
              </defs>
              {edges.map(([x1, y1, x2, y2], i) => (
                <path
                  key={i}
                  className="sc-draw-path"
                  pathLength={1}
                  d={`M ${x1} ${y1} L ${x2} ${y2}`}
                  fill="none"
                  stroke="url(#scg)"
                  strokeWidth={1.6}
                  style={{ animationDelay: `${i * 0.12}s` }}
                />
              ))}
              {nodes.map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r={4} fill="#fff" stroke="url(#scg)" strokeWidth={2}>
                  <animate attributeName="r" values="4;6;4" dur="3s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </svg>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- 3. bento */}
      <section id="bento" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <Head
          eyebrow="03 — Contemporary UI"
          title="A bento of interactions"
          sub="Generative canvas, 3D tilt, pointer spotlight, and count-ups — the modern component vocabulary, each one live."
        />
        <div className="grid auto-rows-[180px] grid-cols-2 gap-4 lg:grid-cols-4">
          {/* big canvas + tilt */}
          <TiltCard className="col-span-2 row-span-2">
            <div className="relative h-full w-full overflow-hidden rounded-2xl sc-glass">
              <OrbitCanvas className="absolute inset-0 h-full w-full" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-sm font-semibold text-white">Generative canvas · 3D tilt</p>
                <p className="text-xs text-white/50">requestAnimationFrame · move your cursor</p>
              </div>
            </div>
          </TiltCard>

          <SpotlightCard className="col-span-2 rounded-2xl p-6 sc-glass">
            <p className="text-sm font-semibold text-white">Pointer spotlight</p>
            <p className="mt-1 text-xs text-white/50">A radial glow tracks the cursor across the card.</p>
            <p className="mt-4 text-3xl font-bold tracking-tight text-white/90">Hover me →</p>
          </SpotlightCard>

          <div className="rounded-2xl p-5 sc-glass">
            <div className="text-4xl font-bold sc-grad-text">
              <CountUp to={12} />
            </div>
            <p className="mt-1 text-xs text-white/50">core principles</p>
          </div>
          <div className="rounded-2xl p-5 sc-glass">
            <div className="text-4xl font-bold text-white">
              <CountUp to={checklistTotal} />
            </div>
            <p className="mt-1 text-xs text-white/50">point pre-ship audit</p>
          </div>

          {/* palette */}
          <div className="col-span-2 rounded-2xl p-5 sc-glass">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Palette</p>
            <div className="flex h-[64%] gap-2">
              {["#2440E6", "#7C3AED", "#22D3EE", "#FF4D8D", "#ECEDF7"].map((c) => (
                <div
                  key={c}
                  className="flex-1 rounded-lg transition-transform duration-300 hover:-translate-y-1.5"
                  style={{ background: c }}
                  title={c}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- 4. micro-interact */}
      <section className="border-y border-white/10 bg-white/[0.02] py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Head
            eyebrow="04 — Micro-interactions"
            title="Details you can feel"
            sub="Magnetic pull, ink-ripple feedback, and a spring toggle. The last 10% — every state designed."
          />
          <Reveal className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-5 rounded-2xl p-10 sc-glass">
            <MagneticButton href="#top">Magnetic button</MagneticButton>
            <RippleButton className="bg-white/10 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15">
              Click for ripple
            </RippleButton>
            <div className="flex items-center gap-3 rounded-full bg-white/5 px-5 py-3 ring-1 ring-white/10">
              <Toggle label="Toggle demo" />
              <span className="text-sm text-white/60">Spring toggle</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- 5. the lens */}
      <section className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
        <Head
          eyebrow="05 — The scoring lens"
          title="Designed to the weights"
          sub="How awards are actually judged — the rubric this whole page is built around. Bars grow on reveal."
        />
        <Reveal className="space-y-6">
          {rubric.map((axis) => (
            <div key={axis.key} className="grid grid-cols-[auto,1fr] items-center gap-x-5 gap-y-1 sm:grid-cols-[160px,1fr,auto]">
              <span className="text-sm font-semibold text-white">{axis.label}</span>
              <div className="order-3 h-3 overflow-hidden rounded-full bg-white/10 sm:order-none">
                <div
                  className="lens-bar h-full rounded-full bg-gradient-to-r from-[#2440E6] via-[#7C3AED] to-[#22D3EE]"
                  style={{ "--w": `${axis.weight}%` } as CSSProperties}
                />
              </div>
              <span className="text-right font-display text-sm tabular-nums text-white/60">{axis.weight}%</span>
              <p className="col-span-full text-xs text-white/40 sm:col-start-2">{axis.blurb}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ----------------------------------------------------- 6. principles */}
      <section id="principles" className="border-t border-white/10 bg-white/[0.02] py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Head eyebrow="06 — The kill shots" title="Twelve principles, on display" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={(i % 3) * 90} className="h-full">
                <SpotlightCard className="h-full rounded-2xl p-6 sc-glass">
                  <div className="font-display text-sm font-bold tabular-nums sc-grad-text">
                    {String(p.n).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{p.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------- more: templates */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          <a href="/templates" className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:bg-white/[0.06]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">14 templates</p>
            <h3 className="mt-2 text-2xl font-bold text-white">A gallery across industries →</h3>
            <p className="mt-2 text-sm text-white/55">SaaS, commerce, scientific, agency, fintech, healthcare, events… each a different design language and component set.</p>
          </a>
          <a href="/resilience" className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:bg-white/[0.06]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#22D3EE]">Resilience</p>
            <h3 className="mt-2 text-2xl font-bold text-white">The unhappy path, prebuilt →</h3>
            <p className="mt-2 text-sm text-white/55">Skeletons, error boundaries, offline + empty states — live failure demos and the redundancy baked in.</p>
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------- cta */}
      <section className="relative overflow-hidden px-6 py-28 text-center sm:py-36">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="sc-pulse absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/20 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="text-balance text-[clamp(2.2rem,1.4rem+4vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-white">
            Now go make something <span className="sc-grad-text">unignorable.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-white/60">
            This entire page is the static export of the starter in this repo. Clone it, or drop the
            skill into any Claude Code project and design to the same bar.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={REPO}>Star the repo ★</MagneticButton>
            <MagneticButton href={`${REPO}/blob/main/.claude/skills/187webdesign/SKILL.md`} variant="ghost">
              Read the skill ↗
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- footer */}
      <footer className="border-t border-white/10 py-10">
        <Marquee
          className="mb-8 opacity-60"
          reverse
          items={["Next.js", "React 19", "TypeScript", "Tailwind", "Canvas", "SVG", "WCAG 2.2 AA", "Core Web Vitals"]}
        />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p className="text-sm text-white/40">187webDESIGN — make killer websites.</p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href={REPO} className="transition-colors hover:text-white">GitHub</a>
            <a href={`${REPO}#readme`} className="transition-colors hover:text-white">README</a>
            <a href="#top" className="transition-colors hover:text-white">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
