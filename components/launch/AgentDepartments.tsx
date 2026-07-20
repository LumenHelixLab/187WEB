"use client";

import Link from "next/link";
import { NatashaBlueprint } from "@/components/BrandMark";
import { Reveal } from "@/components/Reveal";
import { skillShowcaseIndex, type SkillShowcaseData } from "@/lib/skill-showcase-data";
import { FIRST_CLASS_SKILLS, type SuiteSkill } from "@/lib/first-class-skills";

const DEPARTMENT_COLORS: Record<string, string> = {
  repo: "#f43f5e",
  craft: "#22d3ee",
  vibe: "#a855f7",
  launch: "#f59e0b",
  free: "#10b981",
  research: "#6366f1",
  seo: "#a855f7",
  revenue: "#f97316",
  docs: "#06b6d4",
  learn: "#3b82f6",
  test: "#ec4899",
  "access-plus": "#84cc16",
  version: "#64748b",
  publish: "#eab308",
  natasha: "#f43f5e",
  quantum: "#a78bfa",
  chain: "#f59e0b",
};

function skillColor(skill: SuiteSkill): string {
  const found = skillShowcaseIndex.get(skill.id);
  if (found && found.name === "187NATASHA") return "#f43f5e";
  if (DEPARTMENT_COLORS[skill.id]) return DEPARTMENT_COLORS[skill.id];
  if (found) return found.color;
  return "#39FF14";
}

function skillBullets(skill: SuiteSkill): string[] {
  const found = skillShowcaseIndex.get(skill.id);
  if (!found) return [];
  return [...found.useCases.slice(0, 2), ...found.outputs.slice(0, 1)].slice(0, 3);
}

function skillTagline(skill: SuiteSkill): string {
  const found = skillShowcaseIndex.get(skill.id);
  return found?.tagline ?? skill.name;
}

function DepartmentCard({ skill, index }: { skill: SuiteSkill & { metadata?: SkillShowcaseData }; index: number }) {
  const color = skillColor(skill);
  const tagline = skillTagline(skill);
  const bullets = skillBullets(skill);

  return (
    <Reveal delay={index * 50}>
      <Link
        href={`/187${skill.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0C14] transition hover:-translate-y-1 hover:border-white/20"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${color}22` }}
      >
        <div className="relative overflow-hidden bg-black/40">
          <NatashaBlueprint className="h-40 w-full object-cover opacity-80 grayscale-[0.3]" />
          <div
            className="absolute inset-0 opacity-60"
            style={{ backgroundColor: color, mixBlendMode: "color" }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{ backgroundColor: color, mixBlendMode: "overlay" }}
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-white">{skill.name}</h3>
              <p className="text-sm" style={{ color }}>{tagline}</p>
            </div>
            <span
              className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-xs font-bold text-[#050608]"
              style={{ backgroundColor: color }}
            >
              {skill.id.slice(0, 2).toUpperCase()}
            </span>
          </div>

          {bullets.length > 0 && (
            <ul className="mt-4 space-y-2">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm text-white/60">
                  <span style={{ color }}>›</span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}

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
        </div>
      </Link>
    </Reveal>
  );
}

export function AgentDepartments() {
  const skills = FIRST_CLASS_SKILLS.map((skill) => ({
    ...skill,
    metadata: skillShowcaseIndex.get(skill.id),
  }));

  return (
    <section id="departments" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">First-class agents</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Ecosystem departments
          </h2>
          <p className="mt-4 text-white/60">
            Each department is a routable skill with its own triggers, outputs, templates, and handoff rules.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill, i) => (
            <DepartmentCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
