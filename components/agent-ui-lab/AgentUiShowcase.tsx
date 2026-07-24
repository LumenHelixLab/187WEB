"use client";

import type { ComponentType } from "react";
import { Reveal } from "@/components/Reveal";
import {
  AgentStatusChip,
  StreamRenderer,
  ConfidenceHeatmap,
  ConstraintCanvas,
  EventBusFanout,
  ThrottleDebounceRace,
} from "./demos";

type Group = { id: string; label: string; blurb: string; demos: ComponentType[] };

const GROUPS: Group[] = [
  {
    id: "state-and-streaming",
    label: "Agent state & streaming",
    blurb: "The status model and the render pipeline underneath it — a guarded state table, an rAF-batched token stream with a real mid-flight stop, and a confidence-to-color mapping.",
    demos: [AgentStatusChip, StreamRenderer, ConfidenceHeatmap],
  },
  {
    id: "hitl",
    label: "Human-in-the-loop",
    blurb: "The override layer — a drag-to-constrain region, a typed pub/sub event bus fanning out to disconnected UI, and a live throttle demo protecting the agent from a click flood.",
    demos: [ConstraintCanvas, EventBusFanout, ThrottleDebounceRace],
  },
];

const TOTAL = GROUPS.reduce((n, g) => n + g.demos.length, 0);

export function AgentUiShowcase() {
  return (
    <section id="agent-ui-lab" className="relative border-t border-white/10 bg-[#050608] px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#60a5fa]">
            <span className="h-px w-6 bg-[#60a5fa]" aria-hidden />
            Agent UI lab
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
            {TOTAL} live agent-cockpit systems
          </h2>
          <p className="mt-4 leading-relaxed text-white/60">
            Every 187AGENT-UI pattern as a real, working mechanism — click through a guarded state table, watch a
            token stream actually stop mid-flight, drag a real constraint region, and fire a real pub/sub event.
            Each honours <code className="text-[#93c5fd]">prefers-reduced-motion</code> and only runs while visible.
          </p>
        </Reveal>

        {GROUPS.map((group) => (
          <div key={group.id} className="mb-14 last:mb-0">
            <div className="mb-6 flex flex-col gap-1">
              <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-white/80">
                {group.label}
                <span className="h-px flex-1 bg-white/10" />
                <span className="tabular-nums text-white/40">{group.demos.length}</span>
              </h3>
              <p className="max-w-2xl text-sm text-white/45">{group.blurb}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.demos.map((Demo, i) => (
                <Reveal key={i} delay={(i % 3) * 60}>
                  <Demo />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
