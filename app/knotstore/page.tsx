"use client";

import { useEffect, useState } from "react";
import { KNOTstore } from "@/lib/knotstore";
import { KNOTRecord, KNOTStats } from "@/lib/knotstore/types";

export default function KnotstorePage() {
  const [stats, setStats] = useState<KNOTStats | null>(null);
  const [records, setRecords] = useState<KNOTRecord[]>([]);

  useEffect(() => {
    const store = KNOTstore({ backend: "hybrid", path: "/tmp/knotstore-preview" });
    store.open();
    setStats(store.stats());
    setRecords(store.query({ limit: 10 }));
    store.close();
  }, []);

  return (
    <div className="min-h-screen bg-[#071A2B] text-white">
      <header className="mx-auto max-w-6xl px-6 pb-12 pt-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#3DDC97]/10 px-3 py-1 text-xs font-semibold text-[#3DDC97] ring-1 ring-[#3DDC97]/30">
          Agentic memory layer
        </span>
        <h1 className="mt-5 text-[clamp(2.2rem,1.4rem+4vw,4rem)] font-bold leading-[1.02] tracking-tight">
          KNOTstore
        </h1>
        <p className="mt-4 max-w-md text-white/60">
          Local crawl storage, bidirectional wikilinks, connection health, and KNOT point anchors.
        </p>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats &&
            Object.entries(stats).map(([key, value]) => (
              <div key={key} className="rounded-2xl border border-white/10 bg-[#0E2A43] p-6">
                <p className="text-sm uppercase tracking-wider text-white/50">{key}</p>
                <p className="mt-2 text-3xl font-bold text-[#3DDC97]">{value}</p>
              </div>
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-6 text-xl font-semibold">Recent records</h2>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-white/50">
              <tr>
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Kind</th>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">KNOT hash</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td className="px-5 py-4 text-white/40" colSpan={4}>
                    No records yet. Seed the store from the CLI or tests.
                  </td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r.id} className="border-t border-white/10">
                    <td className="px-5 py-4 font-mono text-white/80">{r.id}</td>
                    <td className="px-5 py-4">{r.kind}</td>
                    <td className="px-5 py-4">{r.title ?? "—"}</td>
                    <td className="px-5 py-4 font-mono text-[#3DDC97]">{r.knotHash ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
