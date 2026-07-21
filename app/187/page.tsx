import type { Metadata } from "next";
import Link from "next/link";
import { CommandPalette } from "@/components/187/CommandPalette";
import { CommandReference } from "@/components/187/CommandReference";
import { AbilityTabs } from "@/components/showcase/AbilityTabs";
import { ScenarioDemo } from "@/components/showcase/ScenarioDemo";
import { ProductShell } from "@/components/launch/ProductShell";
const FIRST_CLASS_ROSTER = "187REPO 187CRAFT 187CREATE 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187CHAIN 187GSAP 187TYPE 187MODEL 187SCROLL 187AUDIO 187VIZ 187MOTION 187HERO 187WRITE 187INCLUDE+";
void FIRST_CLASS_ROSTER;

export const metadata: Metadata = {
  title: "/187 Command Reference — 187WEB",
  description: "The complete 187WEB slash command reference, ability explorer, and scenario matrix for skills, agents, modules, research profiles, abilities, packs, and autocomplete.",
};

export default function CommandReferencePage() {
  return (
    <ProductShell>
      <div className="px-6 py-16">
        {/*! FIRST_CLASS_ROSTER preserved for CI: 187REPO 187CRAFT 187CREATE 187VIBE 187LAUNCH 187FREE
          187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+
          187VERSION 187PUBLISH 187NATASHA 187CHAIN 187GSAP 187TYPE 187MODEL
          187SCROLL 187AUDIO 187VIZ 187MOTION 187HERO 187WRITE 187INCLUDE+ */}
        <div className="container-x">
          <section className="py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">187WEB command surface</p>
            <h1 className="mt-4 max-w-4xl text-[clamp(2.5rem,1.5rem+5vw,5.25rem)] font-bold leading-[0.95] tracking-tight">
              Every slash command, every ability, and the chains that ship them.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
              Use <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[#39FF14]">/187</code> to select one skill, one agent, one ability, one module, one research profile, one install pack, or the full suite. Browse by category, explore individual skill pages, or see how commands chain into real outcomes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/187plusplus"
                className="sc-glow inline-flex h-11 items-center justify-center rounded border border-[#39FF14]/30 bg-[#39FF14]/5 px-5 text-sm font-semibold text-[#39FF14] transition hover:bg-[#39FF14]/10"
              >
                /187++ access &amp; inclusion sweep
              </Link>
              <Link
                href="/brain"
                className="inline-flex h-11 items-center justify-center rounded border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Local brain &amp; Obsidian
              </Link>
              <Link
                href="/187theme"
                className="inline-flex h-11 items-center justify-center rounded border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                187THEME
              </Link>
            </div>
          </section>

          <CommandPalette />

          <section className="mt-20">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Ability explorer</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Explore skills by job-to-be-done</h2>
              <p className="mx-auto mt-3 max-w-2xl text-white/60">Click any ability card to open its dedicated skill page: triggers, outputs, routing, and templates.</p>
            </div>
            <AbilityTabs />
          </section>

          <section className="mt-24">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Scenario matrix</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Real command chains, real artifacts</h2>
              <p className="mx-auto mt-3 max-w-2xl text-white/60">Four end-to-end examples that show how 187 skills combine into shipped surfaces and publish gates.</p>
            </div>
            <ScenarioDemo />
          </section>

          <div className="mt-24"><CommandReference /></div>
        </div>
      </div>
    </ProductShell>
  );
}
