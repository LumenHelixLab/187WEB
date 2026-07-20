import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CommandPalette } from "@/components/187/CommandPalette";
import { AbilityTabs } from "./AbilityTabs";
import { ScenarioDemo } from "./ScenarioDemo";
import { CommandTeaser } from "./CommandTeaser";
import { ProductShell } from "@/components/launch/ProductShell";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";
import { PUBLIC_SKILLS, type SuiteSkill } from "@/lib/first-class-skills";

const FIRST_CLASS_ROSTER = "187REPO 187CRAFT 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187QUANTUM 187CHAIN 187WRITE 187INCLUDE";
void FIRST_CLASS_ROSTER;

function skillColor(skill: SuiteSkill): string {
  const found = skillShowcaseIndex.get(skill.id);
  if (found && found.name === "187NATASHA") return "#f43f5e";
  return found?.color ?? "#39FF14";
}

function skillTrigger(skill: SuiteSkill): string {
  const found = skillShowcaseIndex.get(skill.id);
  return found?.triggers[0] ?? `/187 ${skill.id}`;
}

function skillTagline(skill: SuiteSkill): string {
  const found = skillShowcaseIndex.get(skill.id);
  return found?.tagline ?? skill.name;
}

function skillBullets(skill: SuiteSkill): string[] {
  const found = skillShowcaseIndex.get(skill.id);
  if (!found) return [];
  return [...found.useCases.slice(0, 1), ...found.outputs.slice(0, 2)].slice(0, 3);
}

function skillTemplates(skill: SuiteSkill): string[] {
  const found = skillShowcaseIndex.get(skill.id);
  return found?.templates?.map((t) => t.name).slice(0, 3) ?? [];
}

function SkillDocsCard({ skill, index }: { skill: SuiteSkill; index: number }) {
  const color = skillColor(skill);
  const trigger = skillTrigger(skill);
  const tagline = skillTagline(skill);
  const bullets = skillBullets(skill);
  const templates = skillTemplates(skill);

  return (
    <Reveal delay={index * 40}>
      <Link
        href={`/187${skill.id}`}
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-[#39FF14]/30"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px -24px ${color}22` }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-white">{skill.name}</h3>
            <p className="text-sm" style={{ color }}>{tagline}</p>
          </div>
          <span
            className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg text-xs font-bold text-[#050608]"
            style={{ backgroundColor: color }}
          >
            {skill.id.slice(0, 2).toUpperCase()}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Trigger</p>
            <code className="mt-1 block rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">{trigger}</code>
          </div>
          {bullets.length > 0 && (
            <ul className="space-y-1.5">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm text-white/70">
                  <span style={{ color }}>›</span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
          {templates.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Templates</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {templates.map((name) => (
                  <code key={name} className="rounded bg-white/5 px-2 py-0.5 text-xs text-white/70">{name}</code>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium" style={{ color }}>
          <span>Open {skill.name}</span>
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
  );
}

function SkillDocsGrid() {
  return (
    <section id="docs-grid" className="relative px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Skill docs</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Every skill, documented
          </h2>
          <p className="mt-4 text-white/60">
            First-class skills plus subskills. Each card links to a dedicated page with triggers, outputs, routing, and templates.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PUBLIC_SKILLS.map((skill, i) => (
            <SkillDocsCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseHero() {
  return (
    <section id="top" className="relative px-6 pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="container-x relative">
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
            <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
            187WEB
          </p>
          <h1 className="mt-6 text-[clamp(2.75rem,1.4rem+6vw,6rem)] font-bold leading-[0.92] tracking-tight text-white">
            Examples + docs for <span className="text-[#39FF14]">every skill.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
            Showcase is the documentation surface for the 187WEB ecosystem: real command triggers, output contracts, templates, and end-to-end scenarios for every first-class skill and subskill.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="#docs-grid"
              className="inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#05060A] transition hover:brightness-110"
            >
              Browse all skills
            </Link>
            <Link
              href="/187"
              className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              /187 reference
            </Link>
          </div>
          <Reveal className="mx-auto mt-16 max-w-5xl">
            <CommandPalette />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Showcase() {
  return (
    <ProductShell>
      <ShowcaseHero />

      <section id="abilities" className="relative border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">187 Abilities</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">What 187WEB actually does</h2>
            <p className="mt-4 text-white/60">Every card is a skill you can invoke, inspect, and compose. Click through to see triggers, outputs, routing, and templates.</p>
          </Reveal>
          <AbilityTabs />
        </div>
      </section>

      <SkillDocsGrid />

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
    </ProductShell>
  );
}
