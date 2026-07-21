import type { Metadata } from "next";
import Link from "next/link";
import { ProductShell } from "@/components/launch/ProductShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "/187++ — Full Access & Inclusion Sweep — 187WEB",
  description:
    "Run 187ACCESS+ and 187INCLUDE+ together for a complete accessibility, neurodivergence, identity-safety, and inclusion review.",
};

export default function PlusPlusPage() {
  return (
    <ProductShell>
      <div className="px-6 py-16">
        <div className="container-x">
          <section className="py-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Unified command</p>
            <h1 className="mx-auto mt-4 max-w-4xl text-[clamp(2.5rem,1.5rem+5vw,5.25rem)] font-bold leading-[0.95] tracking-tight text-white">
              <code className="text-[#39FF14]">/187++</code> —{" "}
              <span className="sc-grad-text">the full access &amp; inclusion sweep.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
              When a public surface, form, course, or publish gate needs both disability-access review and broad
              inclusion review, run <code className="text-[#39FF14]">/187++</code>. It coordinates{" "}
              <strong className="text-white">187ACCESS+</strong> and{" "}
              <strong className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                187INCLUDE+
              </strong>{" "}
              into one combined sweep with a single artifact set.
            </p>
          </section>

          <Reveal delay={100}>
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-[#ec4899] shadow-[0_0_12px_#ec4899]" aria-hidden="true" />
                  <h2 className="text-2xl font-bold text-white">187ACCESS+</h2>
                </div>
                <p className="mt-3 text-white/60">Disability access and assistive-technology coverage.</p>
                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-[#ec4899]" />
                    Blind/low-vision and screen-reader audits
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-[#ec4899]" />
                    Deaf/HoH captions, transcripts, audio description
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-[#ec4899]" />
                    Motor/switch/keyboard navigation maps
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-[#ec4899]" />
                    WCAG, ARIA, contrast, focus-order, and vestibular reviews
                  </li>
                </ul>
                <Link
                  href="/187access"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded bg-[#ec4899] px-5 text-sm font-semibold text-[#050608] transition hover:brightness-110"
                >
                  Open 187ACCESS+
                </Link>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
                <div
                  className="absolute inset-0 opacity-10 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(236,72,153,0.6)]"
                      aria-hidden="true"
                    />
                    <h2 className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
                      187INCLUDE+
                    </h2>
                  </div>
                  <p className="relative mt-3 text-white/60">Neurodivergence, identity safety, and anti-bias coverage.</p>
                  <ul className="relative mt-5 space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-white/70" />
                      Autism/ADHD/OCD-friendly UX and sensory safety
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-white/70" />
                      Plain-language and cognitive-load reduction
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-white/70" />
                      Pronouns, identity fields, deadname/misgendering risk
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-white/70" />
                      Anti-bias copy review and community safety
                    </li>
                  </ul>
                  <Link
                    href="/187include"
                    className="mt-6 inline-flex h-11 items-center justify-center rounded bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 px-5 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    Open 187INCLUDE+
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-8 text-center sm:p-12">
              <h2 className="text-[clamp(1.5rem,1rem+2vw,2.25rem)] font-semibold tracking-tight text-white">
                Run the full sweep
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-white/70">
                Use <code className="text-[#39FF14]">/187++</code> whenever a public page, form, course, or publish
                gate needs both access and inclusion review in one pass.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/187access"
                  className="sc-glow sc-glow-pulse inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#050608] transition hover:brightness-110"
                >
                  Start with 187ACCESS+
                </Link>
                <Link
                  href="/187include"
                  className="inline-flex h-12 items-center justify-center rounded bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 px-6 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Start with 187INCLUDE+
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </ProductShell>
  );
}
