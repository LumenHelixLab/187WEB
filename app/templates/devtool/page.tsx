import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";

export const metadata: Metadata = { title: "Forge API — Developer tool template" };

const api = [
  ["forge.set(key, value)", "Write a value. Returns a versioned receipt."],
  ["forge.get(key)", "Read the latest value, edge-cached."],
  ["forge.subscribe(key, cb)", "Stream changes over a live socket."],
  ["forge.tx(fn)", "Run an atomic, reversible transaction."],
];

export default function DevToolTemplate() {
  return (
    <div className="min-h-screen bg-[#05060A] font-mono text-[#d6deeb]">
      <TemplateBar name="Forge API — Developer tool" tone="dark" />

      <header className="mx-auto max-w-5xl px-6 pb-10 pt-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#3DDC84]">edge data, reversible by default</p>
        <h1 className="mt-4 font-sans text-[clamp(2.2rem,1.4rem+4vw,4rem)] font-bold leading-[1.02] tracking-tight text-white">
          A database you talk to in <span className="text-[#3DDC84]">four lines.</span>
        </h1>
        <p className="mt-4 max-w-lg font-sans text-[#d6deeb]/60">
          Strongly-typed, edge-replicated, and reversible. No connection strings, no cold starts.
        </p>

        <div className="mt-7 flex max-w-md items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
          <span><span className="text-[#7C3AED]">$</span> npm i @forge/api</span>
          <span className="rounded bg-white/10 px-2 py-1 text-xs text-white/60">copy</span>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0A0C14]">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 text-xs text-white/40">index.ts</span>
          </div>
          <pre className="overflow-x-auto p-5 text-sm leading-relaxed">
            <code>
              <span className="text-[#7C3AED]">import</span> {"{ forge }"} <span className="text-[#7C3AED]">from</span> <span className="text-[#3DDC84]">&quot;@forge/api&quot;</span>;{"\n\n"}
              <span className="text-[#7C3AED]">const</span> db = <span className="text-[#56b6f7]">forge</span>({"{ region: "}<span className="text-[#3DDC84]">&quot;auto&quot;</span>{" }"});{"\n"}
              <span className="text-[#7C3AED]">await</span> db.<span className="text-[#56b6f7]">set</span>(<span className="text-[#3DDC84]">&quot;user:1&quot;</span>, {"{ name: "}<span className="text-[#3DDC84]">&quot;Ada&quot;</span>{" }"});{"\n"}
              <span className="text-[#7C3AED]">const</span> user = <span className="text-[#7C3AED]">await</span> db.<span className="text-[#56b6f7]">get</span>(<span className="text-[#3DDC84]">&quot;user:1&quot;</span>);
            </code>
          </pre>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-8">
        <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-[#3DDC84]">API reference</h2>
        <div className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
          {api.map(([sig, desc]) => (
            <div key={sig} className="grid gap-1 px-5 py-4 sm:grid-cols-[auto,1fr] sm:gap-6">
              <code className="text-sm text-[#3DDC84]">{sig}</code>
              <span className="font-sans text-sm text-[#d6deeb]/60">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center font-sans text-sm text-white/40">
        Forge API — a 187webDESIGN template. <a href="/templates" className="underline">All templates</a>
      </footer>
    </div>
  );
}
