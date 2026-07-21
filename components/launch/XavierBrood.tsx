"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import type { AgentKit } from "@/lib/agents/agent-kit";
import { BROOD_CONCURRENCY_CAP, type XavierAuditKind } from "@/lib/agents/xavier-audit";

type BroodAgent = {
  id: string;
  name: string;
  parent: string;
  task: string;
  status: "idle" | "running" | "paused" | "killed";
  startedAt: string;
};

const PARENT_AGENTS = ["NATASHA", "YELENA", "CHARLOTTE", "KALI", "XAVIER"];

export function XavierBrood({
  agent,
  onAudit,
}: {
  agent: AgentKit;
  onAudit?: (kind: XavierAuditKind, summary: string, detail?: string) => void;
}) {
  const [brood, setBrood] = useState<BroodAgent[]>([]);
  const [parent, setParent] = useState("NATASHA");
  const [task, setTask] = useState("");
  const [capError, setCapError] = useState<string | null>(null);
  const [confirmKillAll, setConfirmKillAll] = useState(false);

  const runningCount = brood.filter((b) => b.status === "running" || b.status === "paused").length;

  const spawn = () => {
    const trimmed = task.trim();
    if (!trimmed) return;
    if (runningCount >= BROOD_CONCURRENCY_CAP) {
      setCapError(
        `Concurrency cap reached (${BROOD_CONCURRENCY_CAP}). Pause or kill a clone before spawning another.`
      );
      return;
    }
    setCapError(null);
    const startedAt = new Date().toISOString();
    const id = `${parent.toLowerCase()}-${Date.now()}`;
    const clone: BroodAgent = {
      id,
      name: id,
      parent,
      task: trimmed,
      status: "running",
      startedAt,
    };
    setBrood((prev) => [...prev, clone]);
    setTask("");
    onAudit?.(
      "brood_spawn",
      `Spawned ${id} from ${parent}`,
      `Task: ${trimmed}\nStarted: ${startedAt}\nActive: ${runningCount + 1}/${BROOD_CONCURRENCY_CAP}`
    );
  };

  const setStatus = (id: string, status: BroodAgent["status"]) => {
    const target = brood.find((b) => b.id === id);
    if (!target || target.status === "killed") return;
    setBrood((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    const kind: XavierAuditKind =
      status === "paused" ? "brood_pause" : status === "running" ? "brood_resume" : "brood_kill";
    onAudit?.(kind, `${status} · ${id}`, `Parent: ${target.parent}\nTask: ${target.task}`);
    setCapError(null);
    setConfirmKillAll(false);
  };

  const killAll = () => {
    if (!confirmKillAll) {
      setConfirmKillAll(true);
      return;
    }
    const active = brood.filter((b) => b.status !== "killed");
    setBrood((prev) => prev.map((b) => (b.status === "killed" ? b : { ...b, status: "killed" })));
    onAudit?.(
      "brood_kill_all",
      `Kill all brood (${active.length} agents)`,
      active.map((b) => `${b.id} · ${b.parent} · ${b.task}`).join("\n") || "No active clones"
    );
    setConfirmKillAll(false);
    setCapError(null);
  };

  return (
    <section id="brood" className="relative px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: agent.color }}>
            Xavier Brood
          </p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Subagent lifecycle
          </h2>
          <p className="mt-4 text-white/60">
            Spawn scoped clones of any agent, pause or resume them, and kill the entire brood if needed.
            Default concurrency cap: {BROOD_CONCURRENCY_CAP} active clones. Runtime dispatch wires up later;
            this surface is the control-plane UI.
          </p>
        </Reveal>

        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row">
            <label htmlFor="brood-parent" className="sr-only">
              Parent agent
            </label>
            <select
              id="brood-parent"
              value={parent}
              onChange={(e) => setParent(e.target.value)}
              className="rounded border border-white/10 bg-black/40 px-4 py-2 text-sm text-white focus:border-[#a855f7] focus:outline-none"
            >
              {PARENT_AGENTS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="brood-task" className="sr-only">
              Task
            </label>
            <input
              id="brood-task"
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Scoped task for the clone..."
              className="flex-1 rounded border border-white/10 bg-black/40 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#a855f7] focus:outline-none"
            />
            <button
              type="button"
              onClick={spawn}
              disabled={!task.trim() || runningCount >= BROOD_CONCURRENCY_CAP}
              className="inline-flex h-10 items-center justify-center rounded px-5 text-sm font-semibold text-[#050608] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: agent.color }}
            >
              Spawn
            </button>
          </div>

          <p className="mt-3 text-xs text-white/40">
            Active {runningCount}/{BROOD_CONCURRENCY_CAP}
            {runningCount >= BROOD_CONCURRENCY_CAP ? " · cap reached" : ""}
          </p>
          {capError && (
            <p className="mt-2 rounded border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200" role="alert">
              {capError}
            </p>
          )}

          {brood.length > 0 && (
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/50">
                {brood.filter((b) => b.status === "running").length} running ·{" "}
                {brood.filter((b) => b.status === "paused").length} paused ·{" "}
                {brood.filter((b) => b.status === "killed").length} killed
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {confirmKillAll && (
                  <button
                    type="button"
                    onClick={() => setConfirmKillAll(false)}
                    className="rounded border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70 transition hover:bg-white/10"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="button"
                  onClick={killAll}
                  className={`rounded border px-3 py-1 text-xs font-semibold transition ${
                    confirmKillAll
                      ? "border-red-400 bg-red-500 text-white"
                      : "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  }`}
                >
                  {confirmKillAll ? "Confirm kill all" : "Kill all brood"}
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 space-y-3">
            {brood.length === 0 && (
              <p className="rounded border border-dashed border-white/10 bg-black/30 p-6 text-center text-sm text-white/50">
                No clones yet. Pick a parent agent, describe a scoped task, then Spawn.
              </p>
            )}
            {brood.map((b) => (
              <div
                key={b.id}
                className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/40 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{b.name}</p>
                  <p className="text-xs text-white/50">
                    Parent: {b.parent} · Status: <span className="capitalize">{b.status}</span>
                    {" · "}
                    <time dateTime={b.startedAt}>{b.startedAt}</time>
                  </p>
                  <p className="mt-1 text-xs text-white/70">{b.task}</p>
                </div>
                <div className="flex gap-2">
                  {b.status === "running" && (
                    <button
                      type="button"
                      aria-label={`Pause ${b.name}`}
                      onClick={() => setStatus(b.id, "paused")}
                      className="rounded border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10"
                    >
                      Pause
                    </button>
                  )}
                  {b.status === "paused" && (
                    <button
                      type="button"
                      aria-label={`Resume ${b.name}`}
                      onClick={() => setStatus(b.id, "running")}
                      className="rounded border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10"
                    >
                      Resume
                    </button>
                  )}
                  {b.status !== "killed" && (
                    <button
                      type="button"
                      aria-label={`Kill ${b.name}`}
                      onClick={() => setStatus(b.id, "killed")}
                      className="rounded border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
                    >
                      Kill
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
