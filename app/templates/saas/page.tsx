import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";

export const metadata: Metadata = { title: "Nimbus — SaaS template" };

const features = [
  { t: "Realtime", d: "Sub-second sync across every connected client." },
  { t: "Edge-native", d: "Deploys to 300+ locations by default." },
  { t: "Type-safe", d: "End-to-end types from database to UI." },
  { t: "Observable", d: "Traces, logs, and metrics built in." },
];
const tiers = [
  { name: "Starter", price: "$0", tagline: "For side projects", hot: false, features: ["1 project", "Community support", "1k events / mo"], cta: "Start free" },
  { name: "Pro", price: "$24", tagline: "For growing teams", hot: true, features: ["Unlimited projects", "Priority support", "1M events / mo", "SSO"], cta: "Start trial" },
  { name: "Scale", price: "Custom", tagline: "For enterprises", hot: false, features: ["SLA + SSO", "Dedicated support", "Unlimited events", "Audit logs"], cta: "Contact sales" },
];

export default function SaasTemplate() {
  return (
    <div className="min-h-screen bg-[#080a16] text-white">
      <TemplateBar name="Nimbus — SaaS / Startup" tone="dark" />

      <header className="relative overflow-hidden px-6 pb-16 pt-20 text-center">
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
            <a className="rounded-full bg-gradient-to-r from-[#2440E6] to-[#7C3AED] px-6 py-3 text-sm font-semibold">Start free</a>
            <a className="rounded-full px-6 py-3 text-sm font-semibold ring-1 ring-white/20">Book a demo</a>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-50">
            {["Acme", "Globex", "Umbra", "Initech", "Hooli"].map((l) => (
              <span key={l} className="text-lg font-semibold tracking-tight">{l}</span>
            ))}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-3 h-9 w-9 rounded-lg bg-gradient-to-br from-[#2440E6] to-[#22D3EE]" />
              <h3 className="font-semibold">{f.t}</h3>
              <p className="mt-1 text-sm text-white/55">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">Simple, scaling pricing</h2>
        <div className="grid gap-5 lg:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.name} className={`rounded-2xl p-7 ${t.hot ? "bg-gradient-to-b from-[#2440E6]/20 to-transparent ring-2 ring-[#7C3AED]" : "border border-white/10"}`}>
              {t.hot ? <span className="mb-3 inline-block rounded-full bg-[#7C3AED] px-3 py-1 text-xs font-semibold">Most popular</span> : null}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="text-sm text-white/50">{t.tagline}</p>
              <p className="mt-4 text-4xl font-bold">
                {t.price}
                <span className="text-base font-normal text-white/40">{t.price.startsWith("$") && t.price !== "$0" ? " / mo" : ""}</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2"><span className="text-[#22D3EE]">✓</span>{f}</li>
                ))}
              </ul>
              <a className={`mt-6 block rounded-full py-3 text-center text-sm font-semibold ${t.hot ? "bg-white text-[#080a16]" : "ring-1 ring-white/20"}`}>{t.cta}</a>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/40">
        Nimbus — a 187webDESIGN template. <a href="/templates" className="underline">All templates</a>
      </footer>
    </div>
  );
}
