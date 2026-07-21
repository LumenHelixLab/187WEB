import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Tooltip } from "@/components/Tooltip";
import { CommandPalette } from "@/components/187/CommandPalette";
import { AbilityTabs } from "./AbilityTabs";
import { ScenarioDemo } from "./ScenarioDemo";
import { CommandTeaser } from "./CommandTeaser";
import { DesignMotionLab } from "./DesignMotionLab";
import { MotionLabSection } from "@/components/motion-lab/MotionLabSection";
import { ProductShell } from "@/components/launch/ProductShell";
import { AccessIncludeCTA } from "@/components/launch/AccessIncludeCTA";
import { skillShowcaseIndex, skillColorValue, skillIsRainbow, skillRainbowTextClass } from "@/lib/skill-showcase-data";
import { PUBLIC_SKILLS, type SuiteSkill } from "@/lib/first-class-skills";

const FIRST_CLASS_ROSTER = "187REPO 187CRAFT 187CREATE 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187CHAIN 187GSAP 187TYPE 187MODEL 187SCROLL 187AUDIO 187VIZ 187MOTION 187HERO 187WRITE 187INCLUDE+";
void FIRST_CLASS_ROSTER;

function skillColor(skill: SuiteSkill): string {
  const found = skillShowcaseIndex.get(skill.id);
  if (found && found.name === "187NATASHA") return "#f43f5e";
  return skillColorValue(found?.color ?? "#39FF14");
}

function skillTrigger(skill: SuiteSkill): string {
  const found = skillShowcaseIndex.get(skill.id);
  return found?.triggers[0] ?? `/187 ${skill.id}`;
}

function skillTagline(skill: SuiteSkill): string {
  const found = skillShowcaseIndex.get(skill.id);
  return found?.tagline ?? skill.name;
}

function skillExample(skill: SuiteSkill): string {
  const found = skillShowcaseIndex.get(skill.id);
  const useCase = found?.useCases[0] ?? "";
  const output = found?.outputs[0] ?? "";
  return useCase || output ? `${useCase} → ${output}` : skillTagline(skill);
}

function VisualSkillCard({ skill, index }: { skill: SuiteSkill; index: number }) {
  const color = skillColor(skill);
  const trigger = skillTrigger(skill);
  const example = skillExample(skill);
  const alias = skill.id.slice(0, 2).toUpperCase();
  const meta = skillShowcaseIndex.get(skill.id);

  return (
    <Reveal delay={index * 40}>
      <Tooltip
        content={
          <>
            <strong className="text-white">{skill.name}</strong> — {meta?.description ?? example}{" "}
            <Link href={`/187${skill.id}`} className="mt-2 block text-[#39FF14] underline">
              Open {skill.name} →
            </Link>
          </>
        }
      >
        <Link
          href={`/187${skill.id}`}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-white/20"
          style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px -24px ${color}22` }}
        >
          <div className="flex items-start justify-between gap-3">
            <div
              className={`grid h-11 w-11 place-items-center rounded-xl text-sm font-bold ${
                skillIsRainbow(meta?.color ?? "") ? "text-white" : "text-[#050608]"
              }`}
              style={skillIsRainbow(meta?.color ?? "") ? {} : { backgroundColor: color }}
            >
              {skillIsRainbow(meta?.color ?? "") ? (
                <span className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {alias}
                </span>
              ) : (
                alias
              )}
            </div>
            <code className="rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">{trigger}</code>
          </div>
          <h3 className="mt-4 font-bold text-white">{skill.name}</h3>
          <p className={`text-sm ${skillIsRainbow(meta?.color ?? "") ? skillRainbowTextClass() : ""}`} style={skillIsRainbow(meta?.color ?? "") ? undefined : { color }}>
            {skillTagline(skill)}
          </p>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/60">{example}</p>
          <div className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium" style={{ color }}>
            <span>Explore {skill.name}</span>
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
      </Tooltip>
    </Reveal>
  );
}

function VisualSkillGrid() {
  return (
    <section id="docs-grid" className="relative px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Visual skill gallery</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Every skill, one card away
          </h2>
          <p className="mt-4 text-white/60">
            First-class skills plus subskills. Each card links to a dedicated page with triggers, outputs, routing, and templates.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PUBLIC_SKILLS.map((skill, i) => (
            <VisualSkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScreenshotCard({
  title,
  color,
  lines,
  index,
}: {
  title: string;
  color: string;
  lines: string[];
  index: number;
}) {
  return (
    <Reveal delay={index * 100}>
      <div
        className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-1 transition hover:-translate-y-1"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px -24px ${color}22` }}
      >
        <div className="flex items-center gap-2 rounded-t-xl bg-[#05060A] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-xs font-semibold text-white/70">{title}</span>
        </div>
        <div className="flex-1 space-y-2 rounded-b-xl bg-black/40 p-4">
          {lines.map((line) => (
            <div
              key={line}
              className="rounded-lg px-3 py-2 text-xs font-mono text-[#39FF14]"
              style={{ backgroundColor: `${color}10` }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function MotionExamplesStrip() {
  const examples = [
    {
      title: "187SEO Audit",
      color: "#a855f7",
      lines: ["/187seo audit /pricing", "→ 0 critical, 2 warnings", "→ schema plan generated", "→ quick wins prioritized"],
    },
    {
      title: "187RESEARCH Lab",
      color: "#6366f1",
      lines: ["/187research climate-models", "→ source routes mapped", "→ evidence ladder built", "→ ro-crate ready"],
    },
    {
      title: "187LAUNCH Checklist",
      color: "#f59e0b",
      lines: ["/187launch plan ph", "→ ICP + timeline", "→ asset plan drafted", "→ PH post scheduled"],
    },
    {
      title: "187PUBLISH Gate",
      color: "#14b8a6",
      lines: ["/187publish gate", "→ surface inventory clean", "→ drift repair list", "→ GO with 2 fixes"],
    },
  ];

  return (
    <section id="motion-examples" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Motion + examples</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Sample outputs
          </h2>
          <p className="mt-4 text-white/60">
            Stylized previews of what each skill returns when invoked through the /187 surface.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {examples.map((example, i) => (
            <ScreenshotCard key={example.title} {...example} index={i} />
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
            187WEB <span className="sc-grad-text">Ability Showcase.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
            A visual gallery of the 187WEB command surface: real triggers, output contracts, scenario chains, and
            end-to-end demos for every first-class skill and subskill.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="#docs-grid"
              className="sc-glow sc-glow-pulse inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#050608] transition hover:brightness-110"
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

      <AccessIncludeCTA />

      <section id="abilities" className="relative border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">187 Abilities</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
              What 187WEB actually does
            </h2>
            <p className="mt-4 text-white/60">
              Every card is a skill you can invoke, inspect, and compose. Click through to see triggers, outputs,
              routing, and templates.
            </p>
          </Reveal>
          <AbilityTabs />
        </div>
      </section>

      <MotionExamplesStrip />

      <DesignMotionLab />

      <MotionLabSection />

      <VisualSkillGrid />

      <section id="scenarios" className="relative border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Scenario demos</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
              Real chains, real artifacts
            </h2>
            <p className="mt-4 text-white/60">Four end-to-end examples showing how 187 skills chain into outcomes.</p>
          </Reveal>
          <ScenarioDemo />
        </div>
      </section>

      <section id="commands" className="relative px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Command surface</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
              Browse by category, click a skill page
            </h2>
            <p className="mt-4 text-white/60">
              Commands that have dedicated skill pages link through to full trigger, output, and template documentation.
            </p>
          </Reveal>
          <CommandTeaser />
        </div>
      </section>
    </ProductShell>
  );
}
