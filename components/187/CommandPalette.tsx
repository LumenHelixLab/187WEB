"use client";

import { useMemo, useState } from "react";
import { COMMANDS, COMMAND_GRAMMAR, findCommandSuggestions } from "./command-data";

export function CommandPalette({
  className = "",
  value: controlledValue,
  defaultValue = "/187 s",
  onChange,
}: {
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const setValue = (next: string) => {
    setInternalValue(next);
    onChange?.(next);
  };
  const suggestions = useMemo(() => findCommandSuggestions(value), [value]);

  return (
    <section className={`rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 sm:p-7 ${className}`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">/187 command palette</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">Autocomplete before it explains.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            Type a slash command and the selector suggests skills, agents, modules, abilities, research profiles, and packs from the same registry used by the docs and CLI.
          </p>
        </div>
        <p className="text-sm text-white/45">{COMMANDS.length} registered commands</p>
      </div>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm font-medium text-white/80">Command input</span>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-label="Type a /187 slash command"
          className="h-14 w-full rounded-2xl border border-[#39FF14]/30 bg-[#05060A] px-4 font-mono text-base text-white outline-none transition placeholder:text-white/40 focus:border-[#39FF14] focus-visible:ring-2 focus-visible:ring-[#39FF14]/50"
          placeholder={COMMAND_GRAMMAR}
        />
      </label>

      <div className="mt-4 grid gap-3">
        {suggestions.map((command) => (
          <div key={`${command.cmd}-${command.id}`} className="rounded-2xl border border-white/10 bg-[#0A0C14] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <code className="rounded bg-[#39FF14]/10 px-2 py-1 text-sm text-[#39FF14]">{command.cmd}</code>
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/50">{command.status}</span>
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/50">{command.category}</span>
            </div>
            <p className="mt-2 text-sm text-white/70"><strong className="text-white">{command.id}</strong> — {command.purpose}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
