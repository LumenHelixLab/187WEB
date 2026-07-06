import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";
import { CountUp } from "@/components/showcase/primitives";

export const metadata: Metadata = { title: "Vault — Fintech template" };

const rates = [
  ["High-yield savings", "4.30% APY", "No minimum"],
  ["12-month CD", "4.85% APY", "$500 minimum"],
  ["Checking", "0.50% APY", "No fees"],
];

export default function FintechTemplate() {
  return (
    <div className="min-h-screen bg-[#071A2B] text-white">
      <TemplateBar name="Vault — Fintech / Banking" tone="dark" />

      <header className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-12 pt-16 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#3DDC97]/10 px-3 py-1 text-xs font-semibold text-[#3DDC97] ring-1 ring-[#3DDC97]/30">
            FDIC insured · SOC 2 Type II
          </span>
          <h1 className="mt-5 text-[clamp(2.2rem,1.4rem+4vw,4rem)] font-bold leading-[1.02] tracking-tight">
            Banking that pays you to wait.
          </h1>
          <p className="mt-4 max-w-md text-white/60">
            A high-yield account with zero fees, instant transfers, and security that never sleeps.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a className="rounded-full bg-[#3DDC97] px-6 py-3 text-sm font-semibold text-[#071A2B]">Open an account</a>
            <a className="rounded-full px-6 py-3 text-sm font-semibold ring-1 ring-white/20">See rates</a>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
            <div><div className="text-3xl font-bold text-[#3DDC97]"><CountUp to={430} />k</div><p className="text-xs text-white/45">customers</p></div>
            <div><div className="text-3xl font-bold text-[#3DDC97]">$<CountUp to={9} />B</div><p className="text-xs text-white/45">deposits</p></div>
            <div><div className="text-3xl font-bold text-[#3DDC97]"><CountUp to={4} />.3%</div><p className="text-xs text-white/45">APY</p></div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-xs">
          <div className="rounded-[2rem] border border-white/10 bg-[#0E2A43] p-4 shadow-2xl">
            <div className="rounded-2xl bg-gradient-to-br from-[#3DDC97] to-[#22d3ee] p-5 text-[#071A2B]">
              <p className="text-xs font-semibold uppercase tracking-widest">Balance</p>
              <p className="mt-1 text-3xl font-bold">$24,318.40</p>
            </div>
            <div className="mt-4 space-y-3">
              {["Payroll +$3,200", "Coffee −$4.80", "Transfer +$500"].map((r) => (
                <div key={r} className="flex justify-between rounded-xl bg-white/5 px-4 py-3 text-sm">
                  <span className="text-white/70">{r.split(" ").slice(0, -1).join(" ")}</span>
                  <span className="font-mono text-white/90">{r.split(" ").slice(-1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-white/50"><tr><th className="px-5 py-3">Product</th><th className="px-5 py-3">Rate</th><th className="px-5 py-3">Terms</th></tr></thead>
            <tbody>
              {rates.map((r, i) => (
                <tr key={r[0]} className={i % 2 ? "bg-white/[0.02]" : ""}>
                  <td className="px-5 py-4 font-medium">{r[0]}</td>
                  <td className="px-5 py-4 font-bold text-[#3DDC97]">{r[1]}</td>
                  <td className="px-5 py-4 text-white/60">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/50">
          <span>🔒 256-bit encryption</span><span>🛡️ Biometric login</span><span>📵 No selling your data</span><span>⏱️ 24/7 fraud monitoring</span>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/40">
        Vault — a 187webDESIGN template. <a href="/templates" className="underline">All templates</a>
      </footer>
    </div>
  );
}
