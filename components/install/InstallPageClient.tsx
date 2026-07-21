"use client";

import Link from "next/link";
import { KineticHeadline } from "@/components/type/KineticHeadline";
import { InstallCommand } from "@/components/install/InstallCommand";
import { Reveal } from "@/components/Reveal";

const packs: { name: string; blurb: string; contents: string; command: string }[] = [
  {
    name: "core-lite",
    blurb: "Command surface + docs + version/publish gates.",
    contents: "cmd, rpt, scan, flow, docs, ver, pub",
    command: "187 install core-lite",
  },
  {
    name: "web-build",
    blurb: "Repo craft, kits, lab, and access baseline.",
    contents: "repo, craft, kit, lab, docs, test, ax",
    command: "187 install web-build",
  },
  {
    name: "research-lab",
    blurb: "Source routing, labs, data, provenance, crates.",
    contents: "res, sci, labs, data, api, bench, meta, prov, crate",
    command: "187 install research-lab",
  },
  {
    name: "colab-lab",
    blurb: "Notebook-oriented lab profiles.",
    contents: "nb, colab, labs, data, bench",
    command: "187 install colab-lab",
  },
  {
    name: "gap-math",
    blurb: "Math/GAP-oriented research stack.",
    contents: "gap, sci, bench, meta, prov, crate",
    command: "187 install gap-math",
  },
  {
    name: "local-brain",
    blurb: "Vault, docs, research, and scout for Obsidian-first ops.",
    contents: "vault, docs, rpt, res, ch, co",
    command: "187 install local-brain",
  },
];

const steps = [
  {
    title: "Preflight",
    body: "Confirm the machine and repo can run the suite before writing files.",
    cmds: ["187 pre", "187 cap", "187 doctor"],
  },
  {
    title: "Clone & install",
    body: "Use the platform snippet below, then open the local site.",
    cmds: ["git clone …", "install.sh / install.ps1", "npm run dev"],
  },
  {
    title: "Pick a pack or skill",
    body: "Install one alias, a curated pack, or the full suite after a plan.",
    cmds: ["187 install seo", "187 install core-lite", "187 pack <name>"],
  },
  {
    title: "Operate",
    body: "Use /187 for the command surface; /brain for local brain + Obsidian context.",
    cmds: ["/187", "/brain", "/187theme"],
  },
];

export function InstallPageClient() {
  return (
    <div className="px-6 pb-24 pt-28">
      <div className="container-x">
        {/* Hero */}
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
            Preflight · install · onboard
          </p>
          <KineticHeadline
            text="Install what you need."
            accent="Skip the rest."
            as="h1"
            className="mt-4 text-[clamp(2.4rem,1.3rem+4vw,4.75rem)] font-bold leading-[0.95] tracking-tight text-white"
          />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Same shell as the rest of 187WEB. Install one skill, a curated pack, or the full suite — then run{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[#39FF14]">/187</code> or open the local
            brain.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/187"
              className="inline-flex h-11 items-center justify-center rounded bg-[#39FF14] px-5 text-sm font-semibold text-[#050608] transition hover:brightness-110"
            >
              Open /187 reference
            </Link>
            <Link
              href="/brain"
              className="inline-flex h-11 items-center justify-center rounded border border-[#39FF14]/30 bg-[#39FF14]/10 px-5 text-sm font-semibold text-[#39FF14] transition hover:bg-[#39FF14]/15"
            >
              Local brain / Obsidian
            </Link>
            <Link
              href="/#skills"
              className="inline-flex h-11 items-center justify-center rounded border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Browse skills
            </Link>
          </div>
        </section>

        {/* Steps */}
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
            Golden path
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 60}>
                <article className="h-full rounded-2xl border border-white/10 bg-[#0A0C14] p-5">
                  <p className="font-mono text-xs text-[#39FF14]">0{i + 1}</p>
                  <h3 className="mt-2 text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{step.body}</p>
                  <ul className="mt-4 space-y-1 font-mono text-[11px] text-[#39FF14]/90">
                    {step.cmds.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Clone command */}
        <section className="mx-auto mt-16 max-w-3xl">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold text-white">Clone the suite</h2>
            <p className="mt-2 text-sm text-white/55">Pick your shell — copy runs the clone + installer entrypoint.</p>
          </div>
          <InstallCommand />
        </section>

        {/* Preflight + individual */}
        <section className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">Preflight</h2>
              <p className="mt-2 text-sm text-white/55">Run before install to catch missing tools and repo drift.</p>
              <pre className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-sm leading-7 text-[#39FF14]">
                {`187 pre
187 cap
187 doctor`}
              </pre>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">Individual install</h2>
              <p className="mt-2 text-sm text-white/55">One skill, agent, module, or pack alias after a plan.</p>
              <pre className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-sm leading-7 text-[#39FF14]">
                {`187 install seo
187 install craft
187 install theme
187 install local-brain`}
              </pre>
            </div>
          </Reveal>
        </section>

        {/* Packs */}
        <section className="mx-auto mt-16 max-w-5xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Curated packs</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Install a bundle</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/55">
              Packs group aliases for common jobs. Expand later with more skills — the control plane stays the same.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packs.map((pack, i) => (
              <Reveal key={pack.name} delay={i * 40}>
                <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:border-[#39FF14]/25">
                  <h3 className="font-bold text-white">{pack.name}</h3>
                  <p className="mt-2 text-sm text-white/60">{pack.blurb}</p>
                  <p className="mt-3 flex-1 font-mono text-xs leading-relaxed text-[#39FF14]/85">{pack.contents}</p>
                  <code className="mt-4 block rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-white/80">
                    {pack.command}
                  </code>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Next */}
        <section className="mx-auto mt-16 max-w-3xl rounded-3xl border border-[#39FF14]/25 bg-[#39FF14]/5 p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold text-white">After install</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Open the command reference, wire the local brain for Obsidian notes, and theme the shell when you want a
            different palette.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/187"
              className="inline-flex h-11 items-center rounded bg-[#39FF14] px-5 text-sm font-semibold text-[#050608]"
            >
              /187 commands
            </Link>
            <Link
              href="/brain"
              className="inline-flex h-11 items-center rounded border border-white/15 bg-black/20 px-5 text-sm font-semibold text-white"
            >
              Brain
            </Link>
            <Link
              href="/187theme"
              className="inline-flex h-11 items-center rounded border border-white/15 bg-black/20 px-5 text-sm font-semibold text-white"
            >
              187THEME
            </Link>
            <Link
              href="/187motion"
              className="inline-flex h-11 items-center rounded border border-white/15 bg-black/20 px-5 text-sm font-semibold text-white"
            >
              187MOTION
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
