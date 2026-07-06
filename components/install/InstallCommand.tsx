"use client";

import { useState } from "react";

type Platform = "linux" | "windows";

const commands: Record<Platform, { label: string; prefix: string; lines: string[] }> = {
  linux: {
    label: "Linux / macOS",
    prefix: "$",
    lines: [
      "git clone https://github.com/lumenhelixsolutions/187webDESIGN.git",
      "cd 187webDESIGN",
      "./install.sh",
    ],
  },
  windows: {
    label: "Windows",
    prefix: ">",
    lines: [
      "git clone https://github.com/lumenhelixsolutions/187webDESIGN.git",
      "cd 187webDESIGN",
      ".\\install.ps1",
    ],
  },
};

export function InstallCommand() {
  const [platform, setPlatform] = useState<Platform>("linux");
  const [copied, setCopied] = useState(false);

  const active = commands[platform];
  const snippet = active.lines.join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: do nothing on failure.
    }
  };

  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-[#0A0C14] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex gap-2" role="tablist" aria-label="Choose your platform">
          {(Object.keys(commands) as Platform[]).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={platform === key}
              onClick={() => setPlatform(key)}
              className={`rounded px-3 py-1.5 text-sm font-medium transition ${
                platform === key
                  ? "bg-[#39FF14]/10 text-[#39FF14]"
                  : "text-[#d6deeb]/60 hover:bg-white/5 hover:text-[#d6deeb]"
              }`}
            >
              {commands[key].label}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium text-[#d6deeb]/70 transition hover:bg-white/5 hover:text-[#d6deeb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50"
          aria-label="Copy install command"
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[#39FF14]">Copied</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.75" />
                <path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
        <code className="block">
          {active.lines.map((line, i) => (
            <span key={i} className="block">
              <span className="select-none text-[#39FF14]/60">{active.prefix} </span>
              <span className="text-[#d6deeb]">{line}</span>
            </span>
          ))}
        </code>
      </div>
    </div>
  );
}
