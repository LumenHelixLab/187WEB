"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { skillChains } from "./skillchains-data";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

export function KrishnaSkillChains() {
  return (
    <section id="skillchains" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3b82f6]">
            KRISHNA SkillChains
          </p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Real chains. Real artifacts.
          </h2>
          <p className="mt-4 text-white/60">
            End-to-end combinations of 1st, 2nd, and 3rd class skills that KRISHNA
            can hold, run, and distribute. Each chain links to the skill pages that
            produce its artifact.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillChains.map((chain, i) => (
            <Reveal key={chain.id} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-[#3b82f6]/40">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white">{chain.name}</h3>
                    <p className="text-sm text-[#3b82f6]">{chain.tagline}</p>
                  </div>
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-[#3b82f6]/10 text-xs font-bold text-[#3b82f6]">
                    {i + 1}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-white/60">{chain.description}</p>
                <p className="mt-2 text-xs text-white/40">{chain.classMix}</p>

                <ol className="mt-5 space-y-2">
                  {chain.steps.map((step, idx) => {
                    const meta = skillShowcaseIndex.get(step.skillId);
                    return (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3b82f6]" />
                        <span className="text-white/70">
                          {meta ? (
                            <Link
                              href={`/187${step.skillId}`}
                              className="font-semibold text-[#3b82f6] underline-offset-2 hover:underline"
                            >
                              {meta.name}
                            </Link>
                          ) : (
                            <span className="font-semibold text-white">{step.skillId}</span>
                          )}
                          <span className="text-white/50"> — {step.action}</span>
                        </span>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-auto border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Artifact</p>
                  <p className="mt-1 text-sm text-white/80">{chain.artifact}</p>
                  <Link
                    href={chain.artifactExample}
                    target={chain.artifactExample.startsWith("http") ? "_blank" : undefined}
                    rel={chain.artifactExample.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#3b82f6] transition hover:text-[#60a5fa]"
                  >
                    View example
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
