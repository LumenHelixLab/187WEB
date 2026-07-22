"use client";

import { useRef } from "react";
import Link from "next/link";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";
import { Reveal } from "@/components/Reveal";
import { KineticHeadline } from "@/components/type/KineticHeadline";
import {
  InfinityMark,
  GRAD_ACCESS,
  GRAD_INCLUDE,
  GRAD_PRIDE_FULL,
  PRIDE,
  PrideCta,
  PrideUnityRail,
  usePrideCtaEntrance,
} from "@/components/access/PrideSpectrum";

const access = skillShowcaseIndex.get("access")!;
const include = skillShowcaseIndex.get("include")!;

/** Canonical split: Access+ = disability + neurodivergent access; Include+ = LGBTQ+/identity. */
const ENGINEERING_PILLARS = [
  {
    id: "disability",
    title: "Disability access",
    body: "Screen readers, keyboard/switch paths, captions, contrast, focus order, motor targets — WCAG+ as product quality, not a pre-ship scramble.",
    href: "/187access",
    spectrum: "access" as const,
  },
  {
    id: "adhd",
    title: "ADHD & neurodivergent UX",
    body: "Predictable structure, reduced cognitive load, clear next actions, sensory-safe motion — owned by 187ACCESS+, not a marketing reassignment.",
    href: "/187access",
    spectrum: "access" as const,
  },
  {
    id: "lgbtq",
    title: "LGBTQ+ & identity safety",
    body: "Pronoun-safe systems, inclusive fields, anti-bias copy, community safety — 187INCLUDE+ identity architecture, not a sticker.",
    href: "/187include",
    spectrum: "include" as const,
  },
  {
    id: "chain",
    title: "Skillchains, not checklists",
    body: "Access+ and Include+ route into craft, write, test, docs, and publish — the same pipeline that ships features. Explore /187++ for the combined sweep.",
    href: "/187plusplus",
    spectrum: "full" as const,
  },
] as const;

const SKILLCHAIN = [
  { cmd: "/187access", label: "ACCESS+", spectrum: "access" as const },
  { cmd: "/187include", label: "INCLUDE+", spectrum: "include" as const },
  { cmd: "/187++", label: "FULL SWEEP", spectrum: "full" as const },
  { cmd: "/187craft", label: "FIX UI", spectrum: "full" as const },
  { cmd: "/187write", label: "FIX COPY", spectrum: "full" as const },
  { cmd: "/187test", label: "VALIDATE", spectrum: "full" as const },
  { cmd: "/187publish", label: "GATE", spectrum: "full" as const },
] as const;

function PillarCard({
  title,
  body,
  href,
  spectrum,
  index,
}: {
  title: string;
  body: string;
  href: string;
  spectrum: "access" | "include" | "full";
  index: number;
}) {
  const grad = spectrum === "access" ? GRAD_ACCESS : spectrum === "include" ? GRAD_INCLUDE : GRAD_PRIDE_FULL;
  return (
    <Reveal delay={index * 70}>
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0C14] transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <div className="h-1.5 w-full" style={{ backgroundImage: grad }} aria-hidden />
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2">
            <InfinityMark spectrum={spectrum} className="h-7 w-7" decorative />
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
              CORE · {String(index + 1).padStart(2, "0")}
            </p>
          </div>
          <h3 className="font-display text-lg font-bold tracking-tight text-white">{title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{body}</p>
          <span
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
            style={
              spectrum === "access"
                ? { color: PRIDE.orange }
                : spectrum === "include"
                  ? { color: "#8b9cf7" }
                  : { color: PRIDE.brandGreen }
            }
          >
            Open path
            <svg className="h-4 w-4 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/**
 * Premier launch thesis: Access+ and Include+ as first-class engineering systems.
 * Pride spectrum CTAs: Access = red→green, Include = green→purple, united by green.
 */
export function AccessIncludeCTA() {
  const ctaRef = useRef<HTMLDivElement>(null);
  usePrideCtaEntrance(ctaRef);

  return (
    <section
      id="access-include"
      className="relative border-y border-white/10 bg-[#080808]/95 px-6 py-20 sm:py-28"
      aria-labelledby="access-include-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `${GRAD_PRIDE_FULL}`,
          backgroundSize: "200% 200%",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent)",
          opacity: 0.12,
        }}
        aria-hidden
      />

      <div className="container-x relative">
        <div className="mx-auto mb-6 max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <InfinityMark spectrum="access" className="h-9 w-9" decorative />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">
              Premier systems · pride spectrum · autism-aware
            </p>
            <InfinityMark spectrum="include" className="h-9 w-9" decorative />
          </div>
          <KineticHeadline
            id="access-include-heading"
            text="Access+ and Include+"
            accent="are first-class skills."
            as="h2"
            className="mt-2 font-display text-[clamp(2.1rem,1.2rem+3.5vw,3.75rem)] font-bold leading-[0.95] tracking-tight text-white"
          />
          <PrideUnityRail className="mx-auto mt-6 max-w-md" />
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/65">
            Most suites bolt accessibility on at the end. 187WEB ships{" "}
            <strong className="pride-text-access">187ACCESS+</strong>
            <span className="text-white/40"> (red → green)</span> and{" "}
            <strong className="pride-text-include">187INCLUDE+</strong>
            <span className="text-white/40"> (green → purple)</span> as premier skill systems — disability access,
            ADHD/neurodivergent usability, LGBTQ+ and identity safety — united by{" "}
            <strong className="text-[#39FF14]">green</strong>. Full pride sweep:{" "}
            <code className="pride-text-full font-semibold">/187++</code>.
          </p>
        </div>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {ENGINEERING_PILLARS.map((p, i) => (
            <PillarCard key={p.id} {...p} index={i} />
          ))}
        </div>

        {/* Dual skill dossiers — cards are not links (PrideCta is the CTA) */}
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal delay={80}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0A0C14] transition hover:-translate-y-0.5">
              <div className="h-2 w-full" style={{ backgroundImage: GRAD_ACCESS }} aria-hidden />
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] pride-text-access">
                      First-class · red → green
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold pride-text-access">{access.name}</h3>
                    <p className="text-white/70">{access.tagline}</p>
                  </div>
                  <span
                    className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl shadow-lg"
                    style={{ backgroundImage: GRAD_ACCESS }}
                    aria-hidden
                  >
                    <InfinityMark spectrum="access" className="h-9 w-9" decorative />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{access.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  {[
                    "Blind / screen-reader + keyboard / switch paths",
                    "ADHD / autism / cognitive structure & load",
                    "Captions, transcripts, audio description",
                    "Contrast, zoom, reflow, sensory & motion safety",
                    "WCAG / ARIA findings with severity",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: PRIDE.orange }} aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
                <code
                  className="mt-5 block rounded-lg border border-white/10 px-3 py-2 font-mono text-xs text-white/90"
                  style={{ backgroundImage: "linear-gradient(90deg, rgba(228,3,3,0.12), rgba(0,128,38,0.12))" }}
                >
                  /187access · /187access-plus
                </code>
                <div className="mt-6">
                  <PrideCta href="/187access" spectrum="access" className="w-full sm:w-auto">
                    Open Access+ dossier
                  </PrideCta>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={140}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0A0C14] transition hover:-translate-y-0.5">
              <div className="h-2 w-full" style={{ backgroundImage: GRAD_INCLUDE }} aria-hidden />
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] pride-text-include">
                      First-class · green → purple
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold pride-text-include">{include.name}</h3>
                    <p className="text-sm text-white/70">{include.tagline}</p>
                  </div>
                  <span
                    className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl shadow-lg"
                    style={{ backgroundImage: GRAD_INCLUDE }}
                    aria-hidden
                  >
                    <InfinityMark spectrum="include" className="h-9 w-9" decorative />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{include.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  {[
                    "LGBTQ+ inclusive language and UI patterns",
                    "Pronouns, names, and identity field design",
                    "Anti-bias copy and privacy-aware collection",
                    "Community safety and support-response language",
                    "Pairs with Access+ for disability / ND access",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: PRIDE.indigo }} aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
                <code
                  className="mt-5 block rounded-lg border border-white/10 px-3 py-2 font-mono text-xs text-white/90"
                  style={{ backgroundImage: "linear-gradient(90deg, rgba(0,128,38,0.12), rgba(115,41,130,0.18))" }}
                >
                  /187include · 187INCLUDE+
                </code>
                <div className="mt-6">
                  <PrideCta href="/187include" spectrum="include" className="w-full sm:w-auto">
                    Open Include+ dossier
                  </PrideCta>
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Skillchain + /187++ full pride */}
        <Reveal delay={200}>
          <div
            className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0A0C14]"
            ref={ctaRef}
          >
            <div className="h-1.5 w-full" style={{ backgroundImage: GRAD_PRIDE_FULL }} aria-hidden />
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <div className="flex items-center gap-2">
                    <InfinityMark spectrum="full" className="h-8 w-8" decorative />
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] pride-text-full">
                      Unified command · /187++ · full pride
                    </p>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">
                    One sweep. Two halves of the rainbow. One publish gate.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    <code className="text-[#39FF14]">/187++</code> joins Access+ (red→green) and Include+
                    (green→purple) at green — full pride spectrum as an engineering pass into craft, write, test, and
                    publish.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <PrideCta href="/187plusplus" spectrum="full">
                    Explore /187++
                  </PrideCta>
                  <PrideCta href="/187access" spectrum="access" variant="outline">
                    Access+ only
                  </PrideCta>
                  <PrideCta href="/187include" spectrum="include" variant="outline">
                    Include+ only
                  </PrideCta>
                </div>
              </div>

              <div className="mt-8 overflow-x-auto">
                <ol
                  className="flex min-w-max items-center gap-2 font-mono text-[11px] uppercase tracking-wider"
                  aria-label="Access and inclusion skillchain"
                >
                  {SKILLCHAIN.map((step, i) => {
                    const g =
                      step.spectrum === "access"
                        ? GRAD_ACCESS
                        : step.spectrum === "include"
                          ? GRAD_INCLUDE
                          : GRAD_PRIDE_FULL;
                    return (
                      <li key={step.cmd} className="flex items-center gap-2">
                        <span
                          className="rounded-full border border-white/10 px-3 py-1.5 text-white/90"
                          style={{ backgroundImage: `${g}`, backgroundSize: "100%", backgroundBlendMode: "multiply" }}
                        >
                          <span
                            className="inline-block rounded-full bg-[#0A0C14]/85 px-2 py-0.5"
                          >
                            <span className="text-white/40">{String(i + 1).padStart(2, "0")} · </span>
                            {step.label}
                          </span>
                        </span>
                        {i < SKILLCHAIN.length - 1 ? (
                          <span className="text-[#39FF14]" aria-hidden>
                            →
                          </span>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
