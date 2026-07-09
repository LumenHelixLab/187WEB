import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const REPO = "https://github.com/lumenhelixsolutions/187webDESIGN";

const suites = [
  {
    id: "repo",
    name: "187REPO",
    tagline: "Orchestrate · scaffold · deploy",
    color: "#39FF14",
    items: [
      "Systematized codebase structure",
      "Git-flow workflow",
      "Component versioning",
      "7 archetype scaffolds",
    ],
  },
  {
    id: "craft",
    name: "187CRAFT",
    tagline: "Design · UX · frontend",
    color: "#3b82f6",
    items: [
      "Atomic design system",
      "Pixel-perfect components",
      "Scalable grid modules",
      "Accessibility-first tokens",
    ],
  },
  {
    id: "vibe",
    name: "187VIBE",
    tagline: "Delight · community · execution",
    color: "#f59e0b",
    items: [
      "UX flow mapping v2.0",
      "Interaction state library",
      "User behavior data",
      "Micro-interactions",
    ],
  },
  {
    id: "launch",
    name: "187LAUNCH",
    tagline: "Ship · launch · grow",
    color: "#FF2D2D",
    items: [
      "CI/CD build pipelines",
      "Multi-environment deploy",
      "Instant rollbacks",
      "Go-to-market intelligence",
    ],
  },
];

const nav = [
  { href: "#suites", label: "Suites" },
  { href: "/187repo", label: "Commands" },
  { href: "/install", label: "Install" },
  { href: "/templates", label: "Templates" },
];

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="sc-glass mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5">
        <a href="#top" className="flex items-center gap-2 font-bold tracking-tight text-white">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[#39FF14] text-xs text-[#05060A]">
            187
          </span>
          <span className="hidden sm:inline">SUITE</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-white/60 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
        <a
          href={REPO}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white transition hover:bg-white/10"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0C14]">
      <div className="container-x py-12">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Lumen Helix Solutions · MIT License
          </p>
          <div className="flex items-center gap-6">
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-white/50 transition hover:text-white"
            >
              GitHub
            </a>
            <Link href="/install" className="text-sm text-white/50 transition hover:text-white">
              Install
            </Link>
            <Link href="/187repo" className="text-sm text-white/50 transition hover:text-white">
              /commands
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Showcase() {
  return (
    <div
      className="showcase relative overflow-x-clip"
      style={{ background: "#05060A", color: "#ECEDF7" }}
    >
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

      <Header />

      <section id="top" className="relative px-6 pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div className="container-x relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Killer web design solutions
            </p>
            <h1 className="mt-6 text-[clamp(2.5rem,1.5rem+5vw,5rem)] font-bold leading-[0.98] tracking-tight text-white">
              One slash for every layer of the <span className="text-[#39FF14]">187 suite.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              187REPO orchestrates, 187CRAFT designs, 187VIBE delights, and 187LAUNCH ships. A
              short-name command surface for the mature 187web ecosystem.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/187repo"
                className="inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#05060A] transition hover:brightness-110"
              >
                Browse /commands
              </Link>
              <Link
                href="/install"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Install the CLI
              </Link>
            </div>
          </div>

          <Reveal className="mx-auto mt-16 max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0C14]">
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

      <section id="suites" className="relative px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              The 187SUITE
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              Four layers. One strike.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/55">
              Each short-name skill delegates back to the mature 187web skills, so you get speed
              without sacrificing depth.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {suites.map((suite, i) => (
              <Reveal key={suite.id} delay={i * 80}>
                <div
                  className="h-full rounded-2xl border border-white/10 bg-[#0A0C14] p-6 transition hover:-translate-y-1 sm:p-8"
                  style={{
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -24px ${suite.color}22`,
                  }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="inline-flex h-3 w-3 rounded-full"
                      style={{ backgroundColor: suite.color, boxShadow: `0 0 12px ${suite.color}` }}
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-bold text-white">{suite.name}</h3>
                    <span className="text-sm text-white/50">— {suite.tagline}</span>
                  </div>
                  <ul className="space-y-2 text-white/70">
                    {suite.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span style={{ color: suite.color }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl rounded-2xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-8 text-center sm:p-12">
            <h2 className="text-[clamp(1.5rem,1rem+2vw,2.25rem)] font-semibold tracking-tight text-white">
              Ready to wire up the suite?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">
              Install the CLI, get the manifest and short-name scripts on PATH, and deploy your
              first archetype in one command.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/install"
                className="inline-flex h-14 items-center justify-center rounded bg-[#39FF14] px-8 text-base font-semibold text-[#05060A] transition hover:brightness-110"
              >
                Go to installer
              </Link>
              <a
                href={REPO}
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

      <Footer />
    </div>
  );
}
