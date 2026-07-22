"use client";

import Link from "next/link";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";
import { Reveal } from "@/components/Reveal";
import { KineticHeadline } from "@/components/type/KineticHeadline";

const access = skillShowcaseIndex.get("access")!;
const include = skillShowcaseIndex.get("include")!;

const ENGINEERING_PILLARS = [
  {
    id: "disability",
    title: "Disability access",
    body: "Screen readers, keyboard/switch paths, captions, contrast, focus order, motor targets — WCAG+ as product quality, not a pre-ship scramble.",
    href: "/187access",
    color: "#ec4899",
  },
  {
    id: "adhd",
    title: "ADHD & neurodivergent UX",
    body: "Predictable structure, reduced cognitive load, clear next actions, sensory-safe motion, plain language — usable for brains that are not “default.”",
    href: "/187include",
    color: "#a855f7",
  },
  {
    id: "lgbtq",
    title: "LGBTQ+ & identity safety",
    body: "Pronoun-safe systems, inclusive fields, anti-bias copy, community safety language — identity is data architecture, not a rainbow badge.",
    href: "/187include",
    color: "#22d3ee",
  },
  {
    id: "chain",
    title: "Skillchains, not checklists",
    body: "Access+ and Include+ route into craft, write, test, docs, scan, standard, and publish — the same pipeline that ships features.",
    href: "/187plusplus",
    color: "#39FF14",
  },
] as const;

const SKILLCHAIN = [
  { cmd: "/187access", label: "ACCESS+" },
  { cmd: "/187include", label: "INCLUDE+" },
  { cmd: "/187++", label: "FULL SWEEP" },
  { cmd: "/187craft", label: "FIX UI" },
  { cmd: "/187write", label: "FIX COPY" },
  { cmd: "/187test", label: "VALIDATE" },
  { cmd: "/187publish", label: "GATE" },
] as const;

function PillarCard({
  title,
  body,
  href,
  color,
  index,
}: {
  title: string;
  body: string;
  href: string;
  color: string;
  index: number;
}) {
  return (
    <Reveal delay={index * 70}>
      <Link
        href={href}
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF14]"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 50px -28px ${color}33` }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
          CORE · {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-white">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{body}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color }}>
          Open path
          <svg className="h-4 w-4 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </Link>
    </Reveal>
  );
}

/**
 * Premier launch thesis: Access+ and Include+ as first-class engineering systems.
 * Not a compliance footer — the differentiator of 187WEB.
 */
export function AccessIncludeCTA() {
  return (
    <section
      id="access-include"
      className="relative border-y border-white/10 bg-[#080808]/95 px-6 py-20 sm:py-28"
      aria-labelledby="access-include-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(236,72,153,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.45) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden
      />

      <div className="container-x relative">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#39FF14]">
            Premier systems · not decorative compliance
          </p>
          <KineticHeadline
            id="access-include-heading"
            text="Access+ and Include+"
            accent="are first-class skills."
            as="h2"
            className="mt-4 font-display text-[clamp(2.1rem,1.2rem+3.5vw,3.75rem)] font-bold leading-[0.95] tracking-tight text-white"
          />
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/65">
            Most suites bolt accessibility on at the end. 187WEB ships{" "}
            <strong className="text-white">187ACCESS+</strong> and{" "}
            <strong className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              187INCLUDE+
            </strong>{" "}
            as premier, command-driven skill systems — disability access, ADHD/neurodivergent usability, LGBTQ+ and
            identity safety, sensory and cognitive load — engineered into the same skillchains that craft, test, and
            publish. Run them alone, or as one sweep with{" "}
            <code className="text-[#39FF14]">/187++</code>.
          </p>
        </div>

        {/* Engineering pillars */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {ENGINEERING_PILLARS.map((p, i) => (
            <PillarCard key={p.id} {...p} index={i} />
          ))}
        </div>

        {/* Dual skill dossiers */}
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal delay={80}>
            <Link
              href="/187access"
              className="group block h-full rounded-3xl border border-white/10 bg-[#0A0C14] p-6 transition hover:-translate-y-1 hover:border-[#ec4899]/45 sm:p-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ec4899]"
              style={{
                boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px rgba(236,72,153,0.22)",
              }}
              aria-label={`${access.name}: ${access.tagline}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ec4899]">First-class skill</p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-white">{access.name}</h3>
                  <p className="text-[#ec4899]">{access.tagline}</p>
                </div>
                <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-[#ec4899] text-xs font-bold text-[#050608]">
                  AX
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/60">{access.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {[
                  "Blind / screen-reader + keyboard / switch paths",
                  "Captions, transcripts, audio description",
                  "Contrast, zoom, reflow, focus order",
                  "Motion & photosensitive safety",
                  "WCAG / ARIA findings with severity",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#ec4899]" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
              <code className="mt-5 block rounded-lg border border-[#ec4899]/20 bg-[#ec4899]/10 px-3 py-2 font-mono text-xs text-[#ec4899]">
                /187access · /187access-plus
              </code>
              <div className="mt-6 inline-flex h-11 min-h-[44px] items-center justify-center rounded bg-[#ec4899] px-5 text-sm font-semibold text-[#050608] transition group-hover:brightness-110">
                Open Access+ dossier
              </div>
            </Link>
          </Reveal>

          <Reveal delay={140}>
            <Link
              href="/187include"
              className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0A0C14] p-6 transition hover:-translate-y-1 hover:border-white/30 sm:p-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={`${include.name}: ${include.tagline}`}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 opacity-[0.08]"
                aria-hidden
              />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">First-class skill</p>
                    <h3 className="mt-1 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text font-display text-2xl font-bold text-transparent">
                      {include.name}
                    </h3>
                    <p className="text-sm text-white/70">{include.tagline}</p>
                  </div>
                  <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-xs font-bold text-white">
                    IN
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{include.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  {[
                    "Autism / ADHD / OCD / dyslexia-friendly UX",
                    "Sensory-safe, predictable interfaces",
                    "Plain language & cognitive-load reduction",
                    "Pronouns, identity fields, anti-bias copy",
                    "Community & emotional safety language",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-white/70" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
                <code className="mt-5 block rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-white/80">
                  /187include · 187INCLUDE+
                </code>
                <div className="mt-6 inline-flex h-11 min-h-[44px] items-center justify-center rounded bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 px-5 text-sm font-semibold text-white transition group-hover:brightness-110">
                  Open Include+ dossier
                </div>
              </div>
            </Link>
          </Reveal>
        </div>

        {/* Skillchain rail + /187++ */}
        <Reveal delay={200}>
          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-[#39FF14]/25 bg-[#0A0C14] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#39FF14]">
                  Unified command · /187++
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white">
                  One sweep. Two premier systems. One publish gate.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  <code className="text-[#39FF14]">/187++</code> coordinates Access+ and Include+ into a single
                  access-and-inclusion engineering pass — then hands findings into craft, write, test, and publish.
                  Core pipeline, not a side quest.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/187plusplus"
                  className="inline-flex h-12 min-h-[44px] items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#050608] transition hover:brightness-110"
                >
                  Run /187++
                </Link>
                <Link
                  href="/187access"
                  className="inline-flex h-12 min-h-[44px] items-center justify-center rounded border border-[#ec4899]/40 bg-[#ec4899]/10 px-5 text-sm font-semibold text-[#ec4899] transition hover:bg-[#ec4899]/15"
                >
                  Access+ only
                </Link>
                <Link
                  href="/187include"
                  className="inline-flex h-12 min-h-[44px] items-center justify-center rounded border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Include+ only
                </Link>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto">
              <ol className="flex min-w-max items-center gap-2 font-mono text-[11px] uppercase tracking-wider" aria-label="Access and inclusion skillchain">
                {SKILLCHAIN.map((step, i) => (
                  <li key={step.cmd} className="flex items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/80">
                      <span className="text-white/40">{String(i + 1).padStart(2, "0")} · </span>
                      {step.label}
                    </span>
                    {i < SKILLCHAIN.length - 1 ? (
                      <span className="text-[#39FF14]/70" aria-hidden>
                        →
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
