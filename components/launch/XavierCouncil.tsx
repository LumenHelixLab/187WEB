"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import type { AgentKit } from "@/lib/agents/agent-kit";
import type { XavierAuditKind } from "@/lib/agents/xavier-audit";

const AGENT_OPTIONS = ["NATASHA", "YELENA", "CHARLOTTE", "KALI", "XAVIER"];

export function XavierCouncil({
  agent,
  onAudit,
}: {
  agent: AgentKit;
  onAudit?: (kind: XavierAuditKind, summary: string, detail?: string) => void;
}) {
  const [topic, setTopic] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [urgency, setUrgency] = useState<"normal" | "high">("normal");
  const [log, setLog] = useState<string | null>(null);

  const toggleAgent = (name: string) => {
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  };

  const callCouncil = () => {
    if (!topic.trim() || selected.length === 0) return;
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${urgency.toUpperCase()} council called by XAVIER\nTopic: ${topic.trim()}\nAgents: ${selected.join(", ")}\nResolution: pending runtime dispatch`;
    setLog(entry);
    onAudit?.(
      "council",
      `Council · ${urgency} · ${selected.length} agents · ${topic.trim()}`,
      entry
    );
  };

  return (
    <section id="council" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: agent.color }}>
            Xavier Council
          </p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Call a huddle
          </h2>
          <p className="mt-4 text-white/60">
            Convene any agents for a Q&amp;A or decision log. This surface records the council request;
            execution is routed through the agentic runtime. Defaults: pick agents → topic → Call council.
          </p>
        </Reveal>

        <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
          <label htmlFor="council-topic" className="block text-sm font-medium text-white/80">
            Topic
          </label>
          <input
            id="council-topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., final ship decision on motion-lab hero"
            className="mt-2 w-full rounded border border-white/10 bg-black/40 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#a855f7] focus:outline-none"
          />

          <fieldset className="mt-6">
            <legend className="text-sm font-medium text-white/80">Agents to convene</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {AGENT_OPTIONS.map((name) => (
                <button
                  key={name}
                  type="button"
                  aria-pressed={selected.includes(name)}
                  onClick={() => toggleAgent(name)}
                  className={`rounded border px-3 py-1 text-xs font-semibold transition ${
                    selected.includes(name)
                      ? "border-[#a855f7] bg-[#a855f7]/20 text-[#a855f7]"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-medium text-white/80">Urgency</legend>
            <div className="mt-2 flex gap-3">
              {(["normal", "high"] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  aria-pressed={urgency === level}
                  onClick={() => setUrgency(level)}
                  className={`rounded border px-4 py-1 text-xs font-semibold capitalize transition ${
                    urgency === level
                      ? "border-[#a855f7] bg-[#a855f7]/20 text-[#a855f7]"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={callCouncil}
            disabled={!topic.trim() || selected.length === 0}
            className="mt-8 inline-flex h-11 items-center justify-center rounded px-6 text-sm font-semibold text-[#050608] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: agent.color }}
          >
            Call council
          </button>

          {log && (
            <pre className="mt-6 whitespace-pre-wrap rounded border border-white/10 bg-black/40 p-4 text-xs text-white/70">
              {log}
            </pre>
          )}
        </div>
      </div>
    </section>
  );
}
