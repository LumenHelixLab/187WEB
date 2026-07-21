"use client";

import Link from "next/link";
import { KineticHeadline } from "@/components/type/KineticHeadline";
import { COMMAND_CATEGORY_HELP } from "@/components/187/CommandReference";

const MODULES = [
  { id: "THREAD", alias: "th", purpose: "Shape prompts, extract intent, rewrite and refactor text." },
  { id: "COMPRESS", alias: "cmp", purpose: "Loss-bounded context compression into packets for local models." },
  { id: "TENSION", alias: "tu", purpose: "Inference profiles (exact, brainstorm, critic, local-npu)." },
  { id: "SPARK", alias: "spark", purpose: "Bounded divergent ideation with critic convergence." },
  { id: "CORD", alias: "co", purpose: "Route work to specialist personas (ML, UI, security, DevOps)." },
  { id: "SCOUT", alias: "scout", purpose: "Compliant research with attribution and rate limits." },
  { id: "LAB", alias: "lb", purpose: "Isolated execution sandbox for generated code." },
  { id: "FUSE", alias: "fuse", purpose: "Evidence-weighted synthesis and conflict resolution." },
];

const TRIGGER_LAYERS = [
  {
    title: "Manual slash",
    body: "You type `/187 <skill>` or a short alias (`craft`, `hero`, `theme`). Best when you already know the tool.",
    example: "/187 theme list · /187 hero · /187 craft",
  },
  {
    title: "Intent phrases",
    body: "Natural language that the skill lists as automatic triggers (“scroll narrative”, “plain language”, “security audit”).",
    example: "“Build a scroll-driven hero with reduced motion.”",
  },
  {
    title: "Agent kit triggers",
    body: "Crew agents (NATASHA, CHARLOTTE, XAVIER…) fire when conditions match — release-ready, dispute, parallel work.",
    example: "XAVIER → council when crews disagree.",
  },
  {
    title: "Obsidian / vault hooks",
    body: "Notes, templates, and dashboards under docs/187suite-vault and skill templates. Claudian/Obsidian weave results back into the vault.",
    example: "templates/design-direction.md · _system dashboards",
  },
];

export function LocalBrainPage() {
  return (
    <div className="px-6 pb-20 pt-28">
      <div className="container-x">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Operators · local-first</p>
          <KineticHeadline
            text="Local brain."
            accent="Obsidian weave."
            as="h1"
            className="mt-4 text-[clamp(2.4rem,1.3rem+4vw,4.5rem)] font-bold leading-[0.95] tracking-tight text-white"
          />
          <p className="mt-6 text-lg leading-8 text-white/65">
            187WEB is built to run as a <strong className="text-white/90">local command center</strong>: skills on disk,
            optional local models, and a knowledge vault — not a black-box cloud-only suite.
          </p>
        </section>

        <section className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white">What “local brain” means</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/65">
              <li>
                <strong className="text-white/90">Skills live in the repo</strong> —{" "}
                <code className="text-[#39FF14]">.claude/skills/</code> and mirrored adapters. No mystery remote skill
                store required to start.
              </li>
              <li>
                <strong className="text-white/90">NATASHA modules</strong> (THREAD → FUSE) shape prompts, compress
                context, and route specialists for agentic work. See{" "}
                <code className="text-[#39FF14]">docs/NATASHA-ARCHITECTURE.md</code>
                .
              </li>
              <li>
                <strong className="text-white/90">Optional local inference</strong> — Ollama / NPU paths when configured;
                the suite still works for design and docs without a GPU.
              </li>
              <li>
                <strong className="text-white/90">Claim discipline</strong> — research and security skills label
                evidence; the brain does not invent “guaranteed” outcomes.
              </li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white">Obsidian in the loop</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/65">
              <li>
                Vault templates and system notes ship under{" "}
                <code className="text-[#39FF14]">docs/187suite-vault/</code> for offline knowledge work.
              </li>
              <li>
                Skill <strong className="text-white/90">templates/</strong> folders produce notes you can drop into
                Obsidian (design directions, audits, research packets).
              </li>
              <li>
                Claudian / agent-charlotte-style flows (SCOUT, weave) are designed to write back into a vault without
                requiring a SaaS wiki.
              </li>
              <li>
                Prefer vault links and pack notes over pasting long runbooks into chat — keeps the local brain
                searchable.
              </li>
            </ul>
          </article>
        </section>

        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-white">NATASHA module array</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/55">
            Short aliases you can invoke through the control plane. Full detail:{" "}
            <code className="text-[#39FF14]">docs/187-MODULES.md</code>
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map((m) => (
              <div key={m.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="font-mono text-xs text-[#39FF14]">
                  {m.id} · /187 {m.alias}
                </p>
                <p className="mt-2 text-sm text-white/65">{m.purpose}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-white">How triggers work</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/55">
            Triggers are not magic — they are explicit lists on each skill card and SKILL.md. Four layers stack:
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {TRIGGER_LAYERS.map((layer) => (
              <article key={layer.title} className="rounded-2xl border border-white/10 bg-[#0A0C14] p-5">
                <h3 className="font-semibold text-white">{layer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{layer.body}</p>
                <p className="mt-3 font-mono text-xs text-[#39FF14]">{layer.example}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-white">Command surface categories</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/55">
            Same groupings as{" "}
            <Link href="/187" className="text-[#39FF14] underline-offset-2 hover:underline">
              /187
            </Link>
            . Hover category titles there for the same help.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {Object.entries(COMMAND_CATEGORY_HELP).map(([name, help]) => (
              <article key={name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-bold text-white">{name}</h3>
                <p className="mt-2 text-sm text-white/65">{help.blurb}</p>
                <p className="mt-2 text-xs text-white/45">
                  <span className="text-white/60">When:</span> {help.when}
                </p>
                <p className="mt-1 font-mono text-xs text-[#39FF14]">Try: {help.try}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-3xl rounded-3xl border border-[#39FF14]/25 bg-[#39FF14]/5 p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold text-white">Start operating</h2>
          <p className="mt-3 text-sm text-white/65">
            Open the command reference, pick a front-door command, then drill into a skill page for full triggers.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/187"
              className="inline-flex h-11 items-center rounded bg-[#39FF14] px-5 text-sm font-semibold text-[#050608]"
            >
              /187 reference
            </Link>
            <Link
              href="/install"
              className="inline-flex h-11 items-center rounded border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white"
            >
              Install CLI
            </Link>
            <Link
              href="/187theme"
              className="inline-flex h-11 items-center rounded border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white"
            >
              187THEME
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
