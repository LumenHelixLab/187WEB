"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import type { AgentKit } from "@/lib/agents/agent-kit";
import {
  formatAuditExport,
  type XavierAuditEvent,
  type XavierAuditKind,
} from "@/lib/agents/xavier-audit";

const FILTERS: Array<{ id: "all" | XavierAuditKind; label: string }> = [
  { id: "all", label: "All" },
  { id: "council", label: "Council" },
  { id: "brood_spawn", label: "Spawn" },
  { id: "brood_pause", label: "Pause" },
  { id: "brood_resume", label: "Resume" },
  { id: "brood_kill", label: "Kill" },
  { id: "brood_kill_all", label: "Kill all" },
  { id: "dispatch", label: "Dispatch" },
];

export function XavierAuditLedger({
  agent,
  events,
}: {
  agent: AgentKit;
  events: XavierAuditEvent[];
}) {
  const [filter, setFilter] = useState<"all" | XavierAuditKind>("all");
  const [copied, setCopied] = useState(false);

  const visible = useMemo(
    () => (filter === "all" ? events : events.filter((e) => e.kind === filter)),
    [events, filter]
  );

  const exportMd = () => {
    const body = formatAuditExport(events);
    void navigator.clipboard?.writeText(body).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadMd = () => {
    const body = formatAuditExport(events);
    const blob = new Blob([body], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `xavier-audit-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="audit" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: agent.color }}>
            Xavier Audit Ledger
          </p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Append-only session log
          </h2>
          <p className="mt-4 text-white/60">
            Councils, brood spawns, kills, and dispatches land here for this browser session. Export as Markdown
            when you need a ship record. Persistence across reloads is a Phase 4 follow-up.
          </p>
        </Reveal>

        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <fieldset>
              <legend className="sr-only">Filter events</legend>
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={filter === f.id}
                    onClick={() => setFilter(f.id)}
                    className={`rounded border px-3 py-1 text-xs font-semibold transition ${
                      filter === f.id
                        ? "border-[#a855f7] bg-[#a855f7]/20 text-[#a855f7]"
                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={exportMd}
                disabled={events.length === 0}
                className="rounded border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copied ? "Copied" : "Copy MD"}
              </button>
              <button
                type="button"
                onClick={downloadMd}
                disabled={events.length === 0}
                className="rounded border px-3 py-1 text-xs font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ borderColor: agent.color, color: agent.color }}
              >
                Download
              </button>
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="mt-8 rounded border border-dashed border-white/10 bg-black/30 p-6 text-center text-sm text-white/50">
              {events.length === 0
                ? "No events yet. Call a council or spawn a brood clone to seed the ledger."
                : "No events match this filter."}
            </p>
          ) : (
            <ol className="mt-6 space-y-3">
              {visible.map((e) => (
                <li
                  key={e.id}
                  className="rounded-xl border border-white/10 bg-black/40 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: `${agent.color}22`, color: agent.color }}
                    >
                      {e.kind.replace(/_/g, " ")}
                    </span>
                    <time className="text-xs text-white/40" dateTime={e.timestamp}>
                      {e.timestamp}
                    </time>
                  </div>
                  <p className="mt-2 text-sm text-white/80">{e.summary}</p>
                  {e.detail && (
                    <pre className="mt-2 whitespace-pre-wrap text-xs text-white/50">{e.detail}</pre>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
