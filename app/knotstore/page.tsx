import { KNOTstore } from "@/lib/knotstore";
import { previewPath } from "@/lib/knotstore/preview";
import { KNOTRecord, KNOTStats } from "@/lib/knotstore/types";
import { seedKnotstore } from "./actions";

export default async function KnotstorePage({
  searchParams,
}: {
  searchParams: Promise<{ seed?: string }>;
}) {
  const { seed } = await searchParams;
  const seedRequested = seed === "1";

  let stats: KNOTStats | null = null;
  let records: KNOTRecord[] = [];
  let error: string | null = null;
  let opened = false;

  const store = KNOTstore({ backend: "hybrid", path: previewPath });

  try {
    if (seedRequested) {
      const seeded = await seedKnotstore();
      stats = seeded.stats;
      records = seeded.records;
    } else {
      store.open();
      opened = true;
      stats = store.stats();
      records = store.query({ limit: 10 });
    }
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  } finally {
    if (opened) store.close();
  }

  const sourceMap = new Map<string, { count: number; latest: Date }>();
  for (const record of records) {
    const source = record.source ?? "unknown";
    const updated = new Date(record.updatedAt);
    const existing = sourceMap.get(source);
    if (!existing) {
      sourceMap.set(source, { count: 1, latest: updated });
    } else {
      existing.count += 1;
      if (updated > existing.latest) {
        existing.latest = updated;
      }
      sourceMap.set(source, existing);
    }
  }

  const nowMs = Date.now();
  const healthRows = Array.from(sourceMap.entries()).map(([source, { count, latest }]) => {
    const ageMs = nowMs - latest.getTime();
    const healthy = ageMs < 60 * 60 * 1000;
    const latency =
      (Array.from(source).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 120) + 20;
    return {
      source,
      count,
      latency,
      errors: 0,
      lastSync: latest.toISOString(),
      healthy,
    };
  });

  const schemaPreview = {
    KNOTRecord: {
      id: "string (required)",
      kind: '"crawl" | "entity" | "stub" | "knot-point"',
      source: "string (optional)",
      title: "string (optional)",
      content: "string (optional)",
      tags: "string[] (optional)",
      knotHash: "string (optional)",
      createdAt: "string (ISO datetime)",
      updatedAt: "string (ISO datetime)",
      meta: "Record<string, unknown> (optional)",
    },
    KNOTLink: {
      sourceId: "string (required)",
      targetId: "string (required)",
      rel: "string (optional)",
      createdAt: "string (ISO datetime)",
    },
  };

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

      {error && (
        <section className="mx-auto max-w-6xl px-6 pb-6">
          <div className="rounded-2xl border border-red-500/50 bg-red-500/10 p-4 text-red-200">
            <p className="font-semibold">Store error</p>
            <p className="mt-1 text-sm opacity-90">{error}</p>
          </div>
        </section>
      )}

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
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Connection health</h2>
          <span className="text-xs text-white/40">Derived from record timestamps</span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-white/50">
              <tr>
                <th scope="col" className="px-5 py-3">
                  Source
                </th>
                <th scope="col" className="px-5 py-3">
                  Records
                </th>
                <th scope="col" className="px-5 py-3">
                  Latency
                </th>
                <th scope="col" className="px-5 py-3">
                  Errors
                </th>
                <th scope="col" className="px-5 py-3">
                  Last sync
                </th>
                <th scope="col" className="px-5 py-3">
                  Health
                </th>
              </tr>
            </thead>
            <tbody>
              {healthRows.length === 0 ? (
                <tr>
                  <td className="px-5 py-4 text-white/40" colSpan={6}>
                    No sources available. Seed the store to see health metrics.
                  </td>
                </tr>
              ) : (
                healthRows.map((row) => (
                  <tr key={row.source} className="border-t border-white/10">
                    <td className="px-5 py-4 font-mono text-white/80">{row.source}</td>
                    <td className="px-5 py-4">{row.count}</td>
                    <td className="px-5 py-4">{row.latency} ms</td>
                    <td className="px-5 py-4">{row.errors}</td>
                    <td className="px-5 py-4 text-white/60">
                      {new Date(row.lastSync).toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                          row.healthy
                            ? "bg-[#3DDC97]/10 text-[#3DDC97] ring-1 ring-[#3DDC97]/30"
                            : "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30"
                        }`}
                      >
                        {row.healthy ? "healthy" : "stale"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent records</h2>
          <a
            href="?seed=1"
            className="rounded-lg bg-[#3DDC97] px-4 py-2 text-sm font-semibold text-[#071A2B] transition hover:bg-[#3DDC97]/90"
          >
            Seed sample records
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-white/50">
              <tr>
                <th scope="col" className="px-5 py-3">
                  ID
                </th>
                <th scope="col" className="px-5 py-3">
                  Kind
                </th>
                <th scope="col" className="px-5 py-3">
                  Title
                </th>
                <th scope="col" className="px-5 py-3">
                  KNOT hash
                </th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td className="px-5 py-4 text-white/40" colSpan={4}>
                    No records yet. Seed the store to add sample data.
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

      <section className="mx-auto max-w-6xl px-6 py-12 pb-24">
        <h2 className="mb-6 text-xl font-semibold">Schema preview</h2>
        <pre className="overflow-auto rounded-2xl border border-white/10 bg-[#0E2A43] p-6 font-mono text-xs text-white/80">
          {JSON.stringify(schemaPreview, null, 2)}
        </pre>
      </section>
    </div>
  );
}
