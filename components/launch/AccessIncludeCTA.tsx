"use client";

import Link from "next/link";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";
import { Reveal } from "@/components/Reveal";
import { Tooltip } from "@/components/Tooltip";

const access = skillShowcaseIndex.get("access")!;
const include = skillShowcaseIndex.get("include")!;

function Capability({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span className="mt-1.5 h-1 w-1 rounded-full bg-[#39FF14]" aria-hidden="true" />
      {children}
    </li>
  );
}

export function AccessIncludeCTA() {
  return (
    <section className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Access &amp; inclusion</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Ship for <span className="sc-grad-text">everyone.</span>
          </h2>
          <p className="mt-4 text-white/60">
            Two dedicated skills handle disability access and broad inclusion — or run them together with{" "}
            <code className="text-[#39FF14]">/187++</code>.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal delay={80}>
            <Tooltip
              content={
                <>
                  <strong className="text-white">{access.name}</strong> — {access.description}{" "}
                  <Link href="/187access" className="mt-2 block text-[#39FF14] underline">
                    Open {access.name} →
                  </Link>
                </>
              }
            >
              <Link
                href="/187access"
                className="group block h-full rounded-3xl border border-white/10 bg-[#0A0C14] p-6 transition hover:-translate-y-1 hover:border-[#ec4899]/40 sm:p-8"
                style={{
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px rgba(236,72,153,0.18)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{access.name}</h3>
                    <p className="text-[#ec4899]">{access.tagline}</p>
                  </div>
                  <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-[#ec4899] text-xs font-bold text-[#050608]">
                    AX
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{access.description}</p>
                <ul className="mt-5 space-y-2">
                  <Capability>Blind / screen-reader audits</Capability>
                  <Capability>Keyboard, switch, and motor navigation</Capability>
                  <Capability>Captions, transcripts, audio description</Capability>
                  <Capability>WCAG + ARIA findings with severity</Capability>
                </ul>
                <div className="mt-6 inline-flex h-11 items-center justify-center rounded bg-[#ec4899] px-5 text-sm font-semibold text-[#050608] transition hover:brightness-110">
                  Run {access.name}
                </div>
              </Link>
            </Tooltip>
          </Reveal>

          <Reveal delay={160}>
            <Tooltip
              content={
                <>
                  <strong className="text-white">{include.name}</strong> — {include.description}{" "}
                  <Link href="/187include" className="mt-2 block text-[#39FF14] underline">
                    Open {include.name} →
                  </Link>
                </>
              }
            >
              <Link
                href="/187include"
                className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0A0C14] p-6 transition hover:-translate-y-1 hover:border-white/30 sm:p-8"
              >
                <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500" aria-hidden="true" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
                        {include.name}
                      </h3>
                      <p className="text-sm text-white/70">{include.tagline}</p>
                    </div>
                    <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-xs font-bold text-white">
                      IN
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">{include.description}</p>
                  <ul className="mt-5 space-y-2">
                    <Capability>Autism/ADHD/OCD-friendly UX</Capability>
                    <Capability>Sensory-safe and predictable design</Capability>
                    <Capability>Plain-language and cognitive-load review</Capability>
                    <Capability>Pronouns, identity fields, anti-bias copy</Capability>
                  </ul>
                  <div className="mt-6 inline-flex h-11 items-center justify-center rounded bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 px-5 text-sm font-semibold text-white transition hover:brightness-110">
                    Run {include.name}
                  </div>
                </div>
              </Link>
            </Tooltip>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <Link
              href="/187plusplus"
              className="sc-glow sc-glow-pulse inline-flex h-12 items-center justify-center rounded border border-[#39FF14]/30 bg-[#39FF14]/5 px-6 text-sm font-semibold text-[#39FF14] transition hover:bg-[#39FF14]/10"
            >
              Run both with /187++
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
