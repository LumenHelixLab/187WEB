import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { EcosystemFooter, EcosystemHeader } from "@/components/ecosystem/Chrome";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "187REPO — slash-command reference for the 187 suite",
  description:
    "Complete /command reference for 187REPO, 187CRAFT, 187VIBE, and 187LAUNCH. Generate repositories, design UIs, add delight, and launch products.",
};

const nav = [
  { href: "#commands", label: "Commands" },
  { href: "#archetypes", label: "Archetypes" },
  { href: "#install", label: "Install" },
];

const suites = [
  {
    id: "repo",
    name: "187REPO",
    tagline: "Orchestrate, scaffold, deploy",
    color: "#39FF14",
    commands: [
      { cmd: "/187 help", desc: "Show the full command reference" },
      { cmd: "/187 init", desc: "Start scaffold generation" },
      { cmd: "/187 cli", desc: "Generate a Go single-file binary" },
      { cmd: "/187 agent", desc: "Generate a Python FastAPI + RAG agent" },
      { cmd: "/187 kv", desc: "Generate a ~150-line Node.js DB engine" },
      { cmd: "/187 edge", desc: "Generate a Fastify middleware router" },
      { cmd: "/187 ui", desc: "Generate headless React primitives" },
      { cmd: "/187 full", desc: "Generate a Next.js + tRPC + Prisma monorepo" },
      { cmd: "/187 web", desc: "Generate a Next.js 15 + Tailwind award site" },
      { cmd: "/187 power", desc: "Deploy to GitHub with the surgical-strike script" },
      { cmd: "/187 installer", desc: "Open the cross-platform installer page" },
      { cmd: "/187 docs", desc: "Generate GitHub Pages documentation" },
    ],
  },
  {
    id: "craft",
    name: "187CRAFT",
    tagline: "Design, UX, frontend",
    color: "#3b82f6",
    commands: [
      { cmd: "/187craft design", desc: "Generate or update the design system" },
      { cmd: "/187craft ui", desc: "Generate UI components" },
      { cmd: "/187craft a11y", desc: "Run an accessibility audit" },
      { cmd: "/187craft palette", desc: "Suggest a color palette" },
      { cmd: "/187craft fonts", desc: "Suggest font pairings" },
      { cmd: "/187craft polish", desc: "Run baseline UI polish" },
      { cmd: "/187craft motion", desc: "Fix motion performance" },
    ],
  },
  {
    id: "vibe",
    name: "187VIBE",
    tagline: "Delight, community, execution",
    color: "#f59e0b",
    commands: [
      { cmd: "/187vibe delight", desc: "Add Spark Joy to a component" },
      { cmd: "/187vibe whimsy", desc: "Add playful micro-interactions" },
      { cmd: "/187vibe onboard", desc: "Generate an onboarding flow" },
      { cmd: "/187vibe community", desc: "Build community tools" },
      { cmd: "/187vibe retention", desc: "Create a retention strategy" },
      { cmd: "/187vibe polish", desc: "Add finishing touches" },
    ],
  },
  {
    id: "launch",
    name: "187LAUNCH",
    tagline: "Go-to-market intelligence",
    color: "#FF2D2D",
    commands: [
      { cmd: "/187launch plan", desc: "Full go-to-market plan" },
      { cmd: "/187launch platforms", desc: "Launch platform recommendations" },
      { cmd: "/187launch ph", desc: "Product Hunt strategy" },
      { cmd: "/187launch social", desc: "Build in public playbook" },
      { cmd: "/187launch sales", desc: "Cold outreach + ICP builder" },
      { cmd: "/187launch icp", desc: "Generate an ideal customer profile" },
      { cmd: "/187launch outreach", desc: "Generate a cold sequence" },
      { cmd: "/187launch seo", desc: "SEO + AI search strategy" },
      { cmd: "/187launch content", desc: "Content strategy" },
      { cmd: "/187launch ads", desc: "Paid ads + influencer strategy" },
      { cmd: "/187launch pricing", desc: "Pricing + CRO recommendations" },
      { cmd: "/187launch validate", desc: "Idea validation framework" },
      { cmd: "/187launch checklist", desc: "Launch day checklist" },
      { cmd: "/187launch timeline", desc: "4–6 week launch timeline" },
    ],
  },
];

const archetypes = [
  { flag: "--cli", stack: "Go single-file binary", owner: "187REPO" },
  { flag: "--agent", stack: "Python FastAPI + RAG", owner: "187VIBE + 187CRAFT" },
  { flag: "--kv", stack: "~150-line Node.js DB engine", owner: "187REPO" },
  { flag: "--edge", stack: "Node.js / Fastify middleware", owner: "187REPO" },
  { flag: "--ui", stack: "Headless React primitives", owner: "187CRAFT" },
  { flag: "--full", stack: "Next.js + tRPC + Prisma monorepo", owner: "187REPO + 187CRAFT" },
  { flag: "--web", stack: "Next.js 15 + Tailwind award site", owner: "187CRAFT + 187webdesign" },
];

export default function RepoCommandPage() {
  return (
    <div className="relative min-h-screen bg-[#05060A] font-sans text-[#d6deeb]">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(57,255,20,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(120% 100% at 50% 0%, #000 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(120% 100% at 50% 0%, #000 40%, transparent 85%)",
        }}
        aria-hidden="true"
      />

      <EcosystemHeader navLabel="187REPO" nav={nav} cta={{ href: "/install", label: "Install" }} />

      <section
        id="hero"
        className="relative overflow-hidden border-b border-white/10 px-6 pb-16 pt-12 sm:pb-24 sm:pt-20"
      >
        <div className="container-x relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              187REPO command center
            </p>
            <h1 className="mt-6 text-[clamp(2.5rem,1.5rem+5vw,5rem)] font-bold leading-[0.98] tracking-tight text-white">
              One slash for every layer of the <span className="text-[#39FF14]">187 suite.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              187REPO orchestrates, 187CRAFT designs, 187VIBE delights, and 187LAUNCH ships. Use the
              reference below to route any request to the right skill.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="#commands"
                className="inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#05060A] transition hover:brightness-110"
              >
                Browse commands
              </a>
              <Link
                href="/install"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Install the CLI
              </Link>
            </div>
          </div>

          <Reveal className="mx-auto mt-12 max-w-5xl">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0C14]">
              <Image
                src="/images/187suite-hero.jpg"
                alt="187SUITE — the four layers: 187REPO, 187CRAFT, 187VIBE, and 187LAUNCH"
                className="w-full"
                width={1024}
                height={595}
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="commands" className="px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Slash-command reference
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              Every /command in the 187 suite
            </h2>
          </Reveal>

          <div className="mx-auto max-w-4xl space-y-12">
            {suites.map((suite, i) => (
              <Reveal key={suite.id} delay={i * 80}>
                <div
                  className="rounded-2xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8"
                  style={{
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -24px ${suite.color}22`,
                  }}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <span
                      className="inline-flex h-3 w-3 rounded-full"
                      style={{ backgroundColor: suite.color, boxShadow: `0 0 12px ${suite.color}` }}
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-bold text-white">{suite.name}</h3>
                    <span className="text-sm text-white/50">— {suite.tagline}</span>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-white/10">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-white/5 text-[#d6deeb]">
                        <tr>
                          <th className="px-4 py-3 font-semibold sm:px-5">Command</th>
                          <th className="px-4 py-3 font-semibold sm:px-5">What it does</th>
                          <th className="px-4 py-3 sm:px-5" aria-label="Copy" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {suite.commands.map((command) => (
                          <tr key={command.cmd} className="group text-[#d6deeb]/80">
                            <td className="px-4 py-3 font-mono text-white sm:px-5">
                              {command.cmd}
                            </td>
                            <td className="px-4 py-3 sm:px-5">{command.desc}</td>
                            <td className="px-4 py-3 text-right sm:px-5">
                              <CopyButton text={command.cmd} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="archetypes"
        className="border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28"
      >
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Repository archetypes
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              Seven scaffolds, one strike
            </h2>
          </Reveal>

          <Reveal>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-[#d6deeb]">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Flag</th>
                    <th className="px-5 py-3 font-semibold">Stack</th>
                    <th className="px-5 py-3 font-semibold">Owned by</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {archetypes.map((a) => (
                    <tr key={a.flag} className="text-[#d6deeb]/80">
                      <td className="px-5 py-4 font-mono text-[#39FF14]">{a.flag}</td>
                      <td className="px-5 py-4">{a.stack}</td>
                      <td className="px-5 py-4">{a.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="install" className="px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl rounded-2xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-8 text-center sm:p-12">
            <h2 className="text-[clamp(1.5rem,1rem+2vw,2.25rem)] font-semibold tracking-tight text-white">
              Install the 187web CLI
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">
              Get the manifest, compiler, shell hook, and the new short-name scripts on PATH in one
              step.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/install"
                className="inline-flex h-14 items-center justify-center rounded bg-[#39FF14] px-8 text-base font-semibold text-[#05060A] transition hover:brightness-110"
              >
                Go to installer
              </Link>
              <a
                href="https://github.com/lumenhelixsolutions/187webDESIGN"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-14 items-center justify-center rounded border border-white/10 bg-white/5 px-8 text-base font-semibold text-white transition hover:bg-white/10"
              >
                View on GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <EcosystemFooter secondary={{ href: "/install", label: "Install 187web" }} />
    </div>
  );
}
