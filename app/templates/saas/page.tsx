import type { Metadata } from "next";
import Link from "next/link";
import { TemplateBar } from "@/components/templates/TemplateBar";
import { FaqAccordion } from "@/components/templates/FaqAccordion";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Nimbus — SaaS template" };

const NAV = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Compare", href: "#compare" },
  { label: "FAQ", href: "#faq" },
];

const features = [
  { t: "Realtime", d: "Sub-second sync across every connected client.", icon: "◎" },
  { t: "Edge-native", d: "Deploys to 300+ locations by default.", icon: "◈" },
  { t: "Type-safe", d: "End-to-end types from database to UI.", icon: "◇" },
  { t: "Observable", d: "Traces, logs, and metrics built in.", icon: "▣" },
  { t: "Zero-config CI", d: "Push to main, ship to production in under a minute.", icon: "▲" },
  { t: "Role-based access", d: "Fine-grained permissions down to the field.", icon: "◆" },
];

const bento = [
  { t: "One dashboard, every environment", d: "Staging, preview, and production side by side — diff config, promote a release, or roll back in two clicks.", tag: "Deploys" },
  { t: "Query plans you can actually read", d: "Every slow query gets a flame graph, not a wall of JSON. Fix the N+1 before it ships.", tag: "Observability" },
  { t: "Branch databases", d: "Every PR gets a full data branch — test migrations against real data, throw it away on merge.", tag: "Data" },
];

const stats = [
  { v: "99.99%", l: "uptime SLA" },
  { v: "40ms", l: "median edge latency" },
  { v: "12k+", l: "teams shipping" },
  { v: "2.1B", l: "requests / day" },
];

const testimonials = [
  { q: "We moved off three separate vendors onto Nimbus in a week. Query latency dropped by half and nobody misses the old dashboards.", n: "Priya Raman", r: "Staff Eng, fintech scale-up" },
  { q: "Branch databases alone paid for the migration. Our PR review time for schema changes went from days to an afternoon.", n: "Dev Okafor", r: "CTO, seed-stage startup" },
  { q: "Support actually knows the product. First ticket, we had a staff engineer in a call within twenty minutes.", n: "Lin Chen", r: "Platform Lead, mid-market SaaS" },
];

const compareRows = [
  { f: "Setup time", us: "Minutes", them: "Days of IaC" },
  { f: "Preview environments", us: "Automatic, per PR", them: "Manual, shared staging" },
  { f: "Schema migrations", us: "Branch + diff + promote", them: "Hand-rolled scripts" },
  { f: "Observability", us: "Included", them: "Third-party bolt-on" },
  { f: "Pricing model", us: "Usage-based, no seat tax", them: "Per-seat + overages" },
];

const faqs = [
  { q: "Can I self-host?", a: "Yes — the Scale tier ships a self-hosted deployment with the same control plane, or we run it for you on your cloud account." },
  { q: "What happens if I exceed my plan's events?", a: "We never hard-cut you off mid-incident. You get a grace window and an email; overage is billed at the metered rate, no surprise suspensions." },
  { q: "How does migration from our current stack work?", a: "Point our importer at your existing database — schema and data both migrate, and branch databases let you validate against production data before cutting over." },
  { q: "Is there a long-term contract?", a: "No. Starter and Pro are month-to-month. Scale can be annual for a discount, but nothing locks you in beyond that." },
];

export default function SaasTemplate() {
  return (
    <div className="min-h-screen bg-[#080a16] text-white">
      <TemplateBar name="Nimbus — SaaS / Startup" tone="dark" />

      {/* product nav */}
      <div className="sticky top-[49px] z-30 border-b border-white/10 bg-[#080a16]/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3" aria-label="Product">
          <span className="flex items-center gap-2 text-sm font-bold tracking-tight">
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-[#2440E6] to-[#22D3EE]" aria-hidden />
            Nimbus
          </span>
          <div className="hidden items-center gap-6 text-sm text-white/60 sm:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition hover:text-white">
                {n.label}
              </a>
            ))}
          </div>
          <a href="#pricing" className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#080a16] transition hover:bg-white/90">
            Start free
          </a>
        </nav>
      </div>

      <header id="product" className="relative overflow-hidden px-6 pb-16 pt-20 text-center">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[40vw] w-[60vw] -translate-x-1/2 rounded-full bg-[#2440E6]/25 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70 ring-1 ring-white/15">
            New · v2 is live
          </span>
          <h1 className="mt-6 text-[clamp(2.4rem,1.4rem+5vw,4.5rem)] font-bold leading-[0.98] tracking-tight">
            Ship features,{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#7C3AED] to-[#2440E6] bg-clip-text text-transparent">
              not infrastructure.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-white/60">
            The backend platform that scales from your first user to your ten-millionth — without a
            migration.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#pricing" className="rounded-full bg-gradient-to-r from-[#2440E6] to-[#7C3AED] px-6 py-3 text-sm font-semibold transition hover:brightness-110">
              Start free
            </a>
            <button type="button" className="rounded-full px-6 py-3 text-sm font-semibold ring-1 ring-white/20 transition hover:bg-white/5">
              Book a demo
            </button>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-50">
            {["Acme", "Globex", "Umbra", "Initech", "Hooli"].map((l) => (
              <span key={l} className="text-lg font-semibold tracking-tight">
                {l}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* stats band */}
      <Reveal>
        <section className="border-y border-white/10 bg-white/[0.02] px-6 py-10">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="text-center">
                <p className="bg-gradient-to-r from-[#22D3EE] to-[#7C3AED] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">{s.v}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/45">{s.l}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* feature grid */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mx-auto mb-10 max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Everything you&apos;d otherwise stitch together</h2>
          <p className="mt-3 text-white/55">Six primitives, one platform.</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.t} delay={(i % 3) * 60}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-white/20">
                <div className="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[#2440E6] to-[#22D3EE] text-sm">{f.icon}</div>
                <h3 className="font-semibold">{f.t}</h3>
                <p className="mt-1 text-sm text-white/55">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* bento feature deep-dive */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-10 max-w-xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Built for how teams actually ship</h2>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            {bento.map((b, i) => (
              <Reveal key={b.t} delay={i * 80}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent">
                  <div className="flex h-32 items-center justify-center border-b border-white/10 bg-black/20">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/60">{b.tag}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold">{b.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{b.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="border-t border-white/10 bg-white/[0.02] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-10 max-w-xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Teams that switched, and stayed</h2>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.n} delay={i * 80}>
                <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#080a16] p-6">
                  <blockquote className="flex-1 text-sm leading-relaxed text-white/75">&ldquo;{t.q}&rdquo;</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#2440E6] to-[#7C3AED] text-xs font-bold">
                      {t.n.split(" ").map((w) => w[0]).join("")}
                    </span>
                    <span className="text-sm">
                      <span className="block font-semibold">{t.n}</span>
                      <span className="block text-white/45">{t.r}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-20 scroll-mt-16">
        <Reveal className="mx-auto mb-10 max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Simple, scaling pricing</h2>
          <p className="mt-3 text-white/55">No seat tax. Pay for what you actually use.</p>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            { name: "Starter", price: "$0", tagline: "For side projects", hot: false, features: ["1 project", "Community support", "1k events / mo"], cta: "Start free" },
            { name: "Pro", price: "$24", tagline: "For growing teams", hot: true, features: ["Unlimited projects", "Priority support", "1M events / mo", "SSO"], cta: "Start trial" },
            { name: "Scale", price: "Custom", tagline: "For enterprises", hot: false, features: ["SLA + SSO", "Dedicated support", "Unlimited events", "Audit logs"], cta: "Contact sales" },
          ].map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <div className={`h-full rounded-2xl p-7 ${t.hot ? "bg-gradient-to-b from-[#2440E6]/20 to-transparent ring-2 ring-[#7C3AED]" : "border border-white/10"}`}>
                {t.hot ? <span className="mb-3 inline-block rounded-full bg-[#7C3AED] px-3 py-1 text-xs font-semibold">Most popular</span> : null}
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <p className="text-sm text-white/50">{t.tagline}</p>
                <p className="mt-4 text-4xl font-bold">
                  {t.price}
                  <span className="text-base font-normal text-white/40">{t.price.startsWith("$") && t.price !== "$0" ? " / mo" : ""}</span>
                </p>
                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-[#22D3EE]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button type="button" className={`mt-6 block w-full rounded-full py-3 text-center text-sm font-semibold transition ${t.hot ? "bg-white text-[#080a16] hover:bg-white/90" : "ring-1 ring-white/20 hover:bg-white/5"}`}>
                  {t.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* comparison table */}
      <section id="compare" className="border-t border-white/10 bg-white/[0.02] px-6 py-20 scroll-mt-16">
        <div className="mx-auto max-w-4xl">
          <Reveal className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Nimbus vs. the DIY stack</h2>
          </Reveal>
          <Reveal>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-white/45">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Capability</th>
                    <th className="px-5 py-3 font-semibold text-[#22D3EE]">Nimbus</th>
                    <th className="px-5 py-3 font-semibold">Piecing it together</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {compareRows.map((r) => (
                    <tr key={r.f}>
                      <td className="px-5 py-3.5 font-medium text-white/85">{r.f}</td>
                      <td className="px-5 py-3.5 text-white">{r.us}</td>
                      <td className="px-5 py-3.5 text-white/45">{r.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-20 scroll-mt-16">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Questions, answered</h2>
        </Reveal>
        <Reveal>
          <FaqAccordion items={faqs} accent="#22D3EE" tone="dark" />
        </Reveal>
      </section>

      {/* final CTA */}
      <Reveal>
        <section className="border-t border-white/10 px-6 py-20 text-center">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#2440E6]/15 to-transparent px-8 py-14">
            <h2 className="text-3xl font-bold tracking-tight">Ready to stop babysitting infrastructure?</h2>
            <p className="mx-auto mt-3 max-w-md text-white/60">Free tier, no credit card. Upgrade when you outgrow it, not before.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#pricing" className="rounded-full bg-gradient-to-r from-[#2440E6] to-[#7C3AED] px-6 py-3 text-sm font-semibold transition hover:brightness-110">
                Start free
              </a>
              <button type="button" className="rounded-full px-6 py-3 text-sm font-semibold ring-1 ring-white/20 transition hover:bg-white/5">
                Talk to sales
              </button>
            </div>
          </div>
        </section>
      </Reveal>

      {/* footer */}
      <footer className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="flex items-center gap-2 text-sm font-bold tracking-tight">
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-[#2440E6] to-[#22D3EE]" aria-hidden />
              Nimbus
            </span>
            <p className="mt-3 max-w-[20ch] text-sm text-white/45">Backend platform for teams that ship daily.</p>
          </div>
          {[
            { h: "Product", items: ["Overview", "Pricing", "Changelog", "Status"] },
            { h: "Company", items: ["About", "Blog", "Careers", "Contact"] },
            { h: "Resources", items: ["Docs", "API reference", "Community", "Support"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{col.h}</p>
              <ul className="mt-3 space-y-2 text-sm text-white/60">
                {col.items.map((it) => (
                  <li key={it}>
                    <a href="#" className="transition hover:text-white">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <span>Nimbus — a 187webDESIGN template.</span>
          <Link href="/templates" className="underline underline-offset-2 hover:text-white/70">
            All templates
          </Link>
        </div>
      </footer>
    </div>
  );
}
