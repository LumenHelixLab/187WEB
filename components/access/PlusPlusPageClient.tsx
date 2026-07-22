"use client";

import Link from "next/link";
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
} from "@/components/access/PrideSpectrum";

const CHAIN = [
  { label: "ACCESS+", spectrum: "access" as const, href: "/187access" },
  { label: "INCLUDE+", spectrum: "include" as const, href: "/187include" },
  { label: "FULL SWEEP", spectrum: "full" as const, href: "/187plusplus" },
  { label: "CRAFT", spectrum: "full" as const, href: "/187craft" },
  { label: "WRITE", spectrum: "full" as const, href: "/187write" },
  { label: "TEST", spectrum: "full" as const, href: "/187test" },
  { label: "PUBLISH", spectrum: "full" as const, href: "/187publish" },
];

export function PlusPlusPageClient() {
  return (
    <div className="px-6 pb-24 pt-28">
      <div className="container-x">
        <section className="mx-auto max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <InfinityMark spectrum="access" className="h-10 w-10" decorative />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">
              Unified command · full pride spectrum
            </p>
            <InfinityMark spectrum="include" className="h-10 w-10" decorative />
          </div>

          <h1 className="font-display text-[clamp(2.5rem,1.4rem+5vw,5rem)] font-bold leading-[0.95] tracking-tight text-white">
            <code className="pride-text-full">/187++</code>
            <span className="text-white"> — </span>
            <span className="pride-text-full">the full access &amp; inclusion sweep.</span>
          </h1>

          <PrideUnityRail className="mx-auto mt-8 max-w-md" />

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
            When a public surface, form, course, or publish gate needs both disability-access review and broad
            inclusion review, run <code className="pride-text-full font-semibold">/187++</code>. It coordinates{" "}
            <strong className="pride-text-access">187ACCESS+</strong>
            <span className="text-white/40"> (red → green)</span> and{" "}
            <strong className="pride-text-include">187INCLUDE+</strong>
            <span className="text-white/40"> (green → purple)</span> — united by{" "}
            <strong className="text-[#39FF14]">green</strong> — into one engineering pass with a single artifact set.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrideCta href="/187access" spectrum="access">
              Open 187ACCESS+
            </PrideCta>
            <PrideCta href="/187include" spectrum="include">
              Open 187INCLUDE+
            </PrideCta>
            <PrideCta href="/#access-include" spectrum="full" variant="outline">
              Spectrum map on home
            </PrideCta>
          </div>
        </section>

        <Reveal delay={100}>
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
            {/* ACCESS+ card — red→green */}
            <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0A0C14]">
              <div className="h-2 w-full" style={{ backgroundImage: GRAD_ACCESS }} aria-hidden />
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] pride-text-access">
                      Warm half · red → green
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-bold pride-text-access">187ACCESS+</h2>
                    <p className="mt-1 text-white/60">Disability access and assistive-technology coverage.</p>
                  </div>
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
                    style={{ backgroundImage: GRAD_ACCESS }}
                    aria-hidden
                  >
                    <InfinityMark spectrum="access" className="h-9 w-9" decorative />
                  </span>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  {[
                    "Blind/low-vision and screen-reader audits",
                    "Deaf/HoH captions, transcripts, audio description",
                    "Motor/switch/keyboard navigation maps",
                    "WCAG, ARIA, contrast, focus-order, and vestibular reviews",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: PRIDE.orange }}
                        aria-hidden
                      />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <PrideCta href="/187access" spectrum="access" className="w-full sm:w-auto">
                    Open 187ACCESS+
                  </PrideCta>
                </div>
              </div>
            </article>

            {/* INCLUDE+ card — green→purple */}
            <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0A0C14]">
              <div className="h-2 w-full" style={{ backgroundImage: GRAD_INCLUDE }} aria-hidden />
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] pride-text-include">
                      Cool half · green → purple
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-bold pride-text-include">187INCLUDE+</h2>
                    <p className="mt-1 text-white/60">
                      Neurodivergence, identity safety, LGBTQ+, and anti-bias coverage.
                    </p>
                  </div>
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
                    style={{ backgroundImage: GRAD_INCLUDE }}
                    aria-hidden
                  >
                    <InfinityMark spectrum="include" className="h-9 w-9" decorative />
                  </span>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  {[
                    "Autism/ADHD/OCD-friendly UX and sensory safety",
                    "Plain-language and cognitive-load reduction",
                    "Pronouns, identity fields, deadname/misgendering risk",
                    "Anti-bias copy review and community safety",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: PRIDE.indigo }}
                        aria-hidden
                      />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <PrideCta href="/187include" spectrum="include" className="w-full sm:w-auto">
                    Open 187INCLUDE+
                  </PrideCta>
                </div>
              </div>
            </article>
          </div>
        </Reveal>

        {/* Full pride skillchain */}
        <Reveal delay={160}>
          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0A0C14]">
            <div className="h-1.5 w-full" style={{ backgroundImage: GRAD_PRIDE_FULL }} aria-hidden />
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <InfinityMark spectrum="full" className="h-8 w-8" decorative />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] pride-text-full">
                  Engineering skillchain · not a checklist
                </p>
              </div>
              <KineticHeadline
                text="Access+ meets Include+"
                accent="at green."
                as="h2"
                className="mt-3 text-left font-display text-[clamp(1.5rem,1rem+2vw,2.25rem)] font-bold tracking-tight text-white"
                align="left"
              />
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
                The full pride spectrum is the visual contract: warm half for disability access systems, cool half for
                inclusion systems, green as the shared engineering bridge into craft → write → test → publish.
              </p>
              <ol
                className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider"
                aria-label="/187++ skillchain"
              >
                {CHAIN.map((step, i) => {
                  const g =
                    step.spectrum === "access"
                      ? GRAD_ACCESS
                      : step.spectrum === "include"
                        ? GRAD_INCLUDE
                        : GRAD_PRIDE_FULL;
                  return (
                    <li key={step.label} className="flex items-center gap-2">
                      <Link
                        href={step.href}
                        className="rounded-full border border-white/10 px-1 py-1 text-white/90 transition hover:brightness-110"
                        style={{ backgroundImage: g }}
                      >
                        <span className="inline-block rounded-full bg-[#0A0C14]/90 px-3 py-1">
                          <span className="text-white/40">{String(i + 1).padStart(2, "0")} · </span>
                          {step.label}
                        </span>
                      </Link>
                      {i < CHAIN.length - 1 ? (
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
        </Reveal>

        <Reveal delay={220}>
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0A0C14] text-center">
            <div className="h-1.5 w-full" style={{ backgroundImage: GRAD_PRIDE_FULL }} aria-hidden />
            <div className="p-8 sm:p-12">
              <InfinityMark spectrum="full" className="mx-auto h-12 w-12" decorative />
              <h2 className="mt-4 font-display text-[clamp(1.5rem,1rem+2vw,2.25rem)] font-semibold tracking-tight text-white">
                Run the full sweep
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-white/70">
                Use <code className="pride-text-full font-semibold">/187++</code> whenever a public page, form, course,
                or publish gate needs both access and inclusion review in one pass — pride colors are the system map,
                not decoration.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <PrideCta href="/187access" spectrum="access">
                  Start with 187ACCESS+
                </PrideCta>
                <PrideCta href="/187include" spectrum="include">
                  Start with 187INCLUDE+
                </PrideCta>
                <PrideCta href="/#access-include" spectrum="full" variant="outline">
                  Back to launch thesis
                </PrideCta>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
