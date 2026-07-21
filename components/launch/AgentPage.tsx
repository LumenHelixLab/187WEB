"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { NatashaBlueprint } from "@/components/BrandMark";
import { Reveal } from "@/components/Reveal";
import { ProductShell } from "./ProductShell";
import { brandAssets } from "@/lib/brand-assets";
import { skillShowcaseIndex, type SkillShowcaseData } from "@/lib/skill-showcase-data";
import { FIRST_CLASS_SKILLS, SUBSKILLS, type SuiteSkill } from "@/lib/first-class-skills";
import { charlotteModules } from "./launch-data";
import type { AgentKit, Command, Prompt, SkillChain, Task, Trigger } from "@/lib/agents/agent-kit";

const skillById = new Map([...FIRST_CLASS_SKILLS, ...SUBSKILLS].map((s) => [s.id, s]));

function skillMeta(id: string): SkillShowcaseData | undefined {
  return skillShowcaseIndex.get(id);
}

function hexWithAlpha(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function AgentHero({ agent }: { agent: AgentKit }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 px-6 pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="container-x relative">
        <div className="mx-auto max-w-5xl">
          <div
            className="relative mx-auto mb-10 max-w-3xl overflow-hidden rounded-2xl border p-2"
            style={{ borderColor: hexWithAlpha(agent.color, 0.25), boxShadow: `0 0 60px ${hexWithAlpha(agent.color, 0.12)}` }}
          >
            <div className="relative overflow-hidden rounded-xl bg-black/40">
              <NatashaBlueprint priority className="rounded-xl opacity-90" />
              <div
                className="absolute inset-0 opacity-60"
                style={{ backgroundColor: agent.color, mixBlendMode: "color" }}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundColor: agent.color, mixBlendMode: "overlay" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
              <img
                src={brandAssets.headerLockup}
                alt="187WEB"
                className="absolute bottom-4 left-4 h-8 w-auto opacity-90 sm:h-10"
              />
            </div>
          </div>

          <div className="text-center">
            <p
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: agent.color }}
            >
              <span className="h-px w-6" style={{ backgroundColor: agent.color }} aria-hidden="true" />
              187WEB Agent
            </p>
            <h1 className="mt-6 text-[clamp(2.75rem,1.4rem+6vw,6rem)] font-bold leading-[0.92] tracking-tight text-white">
              {agent.name} —{" "}
              <span style={{ color: agent.color }}>{agent.tagline}.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">{agent.overview}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/showcase"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                ← Back to showcase
              </Link>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Agent ecosystem
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, meta, agentColor, index }: { skill: SuiteSkill; meta: SkillShowcaseData | undefined; agentColor: string; index: number }) {
  const trigger = meta?.triggers[0] ?? `/187 ${skill.id}`;
  const tagline = meta?.tagline ?? skill.name;
  return (
    <Reveal delay={index * 60}>
      <Link
        href={`/187${skill.id}`}
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-white/20"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${hexWithAlpha(agentColor, 0.13)}` }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-white">{skill.name}</h3>
            <p className="text-sm" style={{ color: agentColor }}>
              {tagline}
            </p>
          </div>
          <span
            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-xs font-bold text-[#050608]"
            style={{ backgroundColor: agentColor }}
          >
            {skill.id.slice(0, 2).toUpperCase()}
          </span>
        </div>
        {meta && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/60">{meta.description}</p>
        )}
        <code className="mt-4 block rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">{trigger}</code>
        <div className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium" style={{ color: agentColor }}>
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

function AgentSkills({ agent }: { agent: AgentKit }) {
  const skills = agent.skills
    .map((id) => ({ skill: skillById.get(id), meta: skillMeta(id) }))
    .filter((item): item is { skill: SuiteSkill; meta: SkillShowcaseData | undefined } => Boolean(item.skill));

  return (
    <section id="skills" className="relative px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: agent.color }}>
            {agent.name} skills
          </p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Routed skills
          </h2>
          <p className="mt-4 text-white/60">
            Each card links to a dedicated skill page with triggers, outputs, routing, and templates.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map(({ skill, meta }, i) => (
            <SkillCard key={skill.id} skill={skill} meta={meta} agentColor={agent.color} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="rounded border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 transition hover:bg-white/10"
      aria-label="Copy prompt body"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function PromptCard({ prompt, agentColor, index }: { prompt: Prompt; agentColor: string; index: number }) {
  return (
    <Reveal delay={index * 60}>
      <div
        className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-white/20"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${hexWithAlpha(agentColor, 0.13)}` }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-white">{prompt.title}</h3>
            <p className="mt-1 text-sm" style={{ color: agentColor }}>
              {prompt.whenToUse}
            </p>
          </div>
          <CopyButton text={prompt.body} />
        </div>
        <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/70">{prompt.body}</p>
      </div>
    </Reveal>
  );
}

function AgentPrompts({ agent }: { agent: AgentKit }) {
  if (agent.prompts.length === 0) return null;
  return (
    <section id="prompts" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: agent.color }}>
            Prompts
          </p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Ready-to-run prompts
          </h2>
          <p className="mt-4 text-white/60">Copy a prompt and drop it into the agent channel.</p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agent.prompts.map((prompt, i) => (
            <PromptCard key={prompt.id} prompt={prompt} agentColor={agent.color} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TaskCard({ task, agentColor, index }: { task: Task; agentColor: string; index: number }) {
  return (
    <Reveal delay={index * 60}>
      <div
        className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-white/20"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${hexWithAlpha(agentColor, 0.13)}` }}
      >
        <h3 className="font-bold text-white">{task.title}</h3>
        <ol className="mt-4 space-y-3">
          {task.steps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-white/70">
              <span
                className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-[#050608]"
                style={{ backgroundColor: agentColor }}
              >
                {idx + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-auto border-t border-white/10 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Expected output</p>
          <p className="mt-1 text-sm text-white/80">{task.output}</p>
        </div>
      </div>
    </Reveal>
  );
}

function AgentTasks({ agent }: { agent: AgentKit }) {
  if (agent.tasks.length === 0) return null;
  return (
    <section id="tasks" className="relative px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: agent.color }}>
            Tasks
          </p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Runnable task chains
          </h2>
          <p className="mt-4 text-white/60">Step-by-step flows with a clear expected artifact.</p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agent.tasks.map((task, i) => (
            <TaskCard key={task.id} task={task} agentColor={agent.color} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TriggerCard({ trigger, agentColor, index }: { trigger: Trigger; agentColor: string; index: number }) {
  return (
    <Reveal delay={index * 60}>
      <div
        className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-white/20"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${hexWithAlpha(agentColor, 0.13)}` }}
      >
        <h3 className="font-bold text-white">{trigger.condition}</h3>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/40">→ Action</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{trigger.action}</p>
      </div>
    </Reveal>
  );
}

function AgentTriggers({ agent }: { agent: AgentKit }) {
  if (agent.triggers.length === 0) return null;
  return (
    <section id="triggers" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: agent.color }}>
            Triggers
          </p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Condition → action
          </h2>
          <p className="mt-4 text-white/60">When the agent should jump in automatically.</p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agent.triggers.map((trigger, i) => (
            <TriggerCard key={trigger.id} trigger={trigger} agentColor={agent.color} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CommandCard({ command, agentColor, index }: { command: Command; agentColor: string; index: number }) {
  return (
    <Reveal delay={index * 60}>
      <div
        className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-white/20"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${hexWithAlpha(agentColor, 0.13)}` }}
      >
        <div className="flex items-start justify-between gap-3">
          <code className="rounded bg-white/5 px-2 py-1 text-sm font-semibold text-white">{command.name}</code>
          {command.premium && (
            <span
              className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#050608]"
              style={{ backgroundColor: agentColor }}
            >
              Premium
            </span>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{command.description}</p>
        {command.args && (
          <p className="mt-2 text-xs text-white/40">
            Args: <span className="text-white/60">{command.args}</span>
          </p>
        )}
      </div>
    </Reveal>
  );
}

function AgentCommands({ agent }: { agent: AgentKit }) {
  if (agent.commands.length === 0) return null;
  return (
    <section id="commands" className="relative px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: agent.color }}>
            Commands
          </p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            CLI-style verbs
          </h2>
          <p className="mt-4 text-white/60">Direct commands that dispatch the agent.</p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agent.commands.map((command, i) => (
            <CommandCard key={command.id} command={command} agentColor={agent.color} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillChainCard({ chain, agentColor, index }: { chain: SkillChain; agentColor: string; index: number }) {
  return (
    <Reveal delay={index * 80}>
      <div
        className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-white/20"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${hexWithAlpha(agentColor, 0.13)}` }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-white">{chain.name}</h3>
            <p className="text-sm" style={{ color: agentColor }}>
              {chain.tagline}
            </p>
          </div>
          <span
            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-xs font-bold"
            style={{ backgroundColor: hexWithAlpha(agentColor, 0.1), color: agentColor }}
          >
            {index + 1}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/60">{chain.description}</p>
        <p className="mt-2 text-xs text-white/40">{chain.classMix}</p>

        <ol className="mt-5 space-y-2">
          {chain.steps.map((step, idx) => {
            const meta = skillShowcaseIndex.get(step.skillId);
            return (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: agentColor }} />
                <span className="text-white/70">
                  {meta ? (
                    <Link
                      href={`/187${step.skillId}`}
                      className="font-semibold underline-offset-2 hover:underline"
                      style={{ color: agentColor }}
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
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium transition hover:brightness-125"
            style={{ color: agentColor }}
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
  );
}

function AgentSkillChains({ agent }: { agent: AgentKit }) {
  if (agent.skillChains.length === 0) return null;
  return (
    <section id="skillchains" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: agent.color }}>
            {agent.name} SkillChains
          </p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Real chains. Real artifacts.
          </h2>
          <p className="mt-4 text-white/60">
            End-to-end combinations of 1st, 2nd, and 3rd class skills that {agent.name} can hold, run, and distribute.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {agent.skillChains.map((chain, i) => (
            <SkillChainCard key={chain.id} chain={chain} agentColor={agent.color} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentModules({ agent }: { agent: AgentKit }) {
  if (agent.slug !== "charlotte") return null;

  return (
    <section id="modules" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">CHARLOTTE module array</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            THREAD · COMPRESS · TENSION · SPARK · CORD · SCOUT · LAB · FUSE
          </h2>
          <p className="mt-4 text-white/60">
            Cross-cutting modules that thread intent, retrieve info, recycle solutions, dispatch experts, run isolated
            actions, and resolve conflicts into decision-ready artifacts.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {charlotteModules.map((module, i) => (
            <Reveal key={module.id} delay={i * 60}>
              <Link
                href={`/${agent.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-white/20"
                style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${hexWithAlpha(module.color, 0.13)}` }}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-white">{module.id}</h3>
                  <code className="rounded bg-[#39FF14]/10 px-2 py-1 text-xs text-[#39FF14]">/187 {module.alias}</code>
                </div>
                {module.legacy && <p className="mt-1 text-xs text-white/30">legacy: {module.legacy}</p>}
                <p className="mt-3 text-sm leading-relaxed text-white/60">{module.purpose}</p>
                <div
                  className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium"
                  style={{ color: module.color }}
                >
                  <span>Open CHARLOTTE</span>
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
          ))}
        </div>
      </div>
    </section>
  );
}

export function AgentPage({ agent }: { agent: AgentKit }) {
  return (
    <ProductShell>
      <AgentHero agent={agent} />
      <AgentSkills agent={agent} />
      <AgentPrompts agent={agent} />
      <AgentTasks agent={agent} />
      <AgentTriggers agent={agent} />
      <AgentCommands agent={agent} />
      <AgentModules agent={agent} />
      <AgentSkillChains agent={agent} />
    </ProductShell>
  );
}
