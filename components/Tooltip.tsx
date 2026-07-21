"use client";

import { type ReactNode } from "react";

/**
 * Informative tooltip for non-redundant help (command categories, dense UI).
 * Prefer visible body copy on cards; use this for short “what / when / try” blurbs.
 */
export function Tooltip({
  content,
  children,
  wide = false,
}: {
  content: ReactNode;
  children: ReactNode;
  /** Wider panel for multi-line explanations */
  wide?: boolean;
}) {
  return (
    <span className="group/tooltip relative inline-flex max-w-full">
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-xl border border-white/12 bg-[#0A0C14]/98 p-3 text-left text-xs leading-relaxed text-white/80 opacity-0 shadow-2xl shadow-black/50 backdrop-blur-md transition-opacity motion-reduce:transition-none group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 ${
          wide ? "w-[min(20rem,calc(100vw-2rem))]" : "w-64"
        }`}
      >
        {content}
      </span>
    </span>
  );
}
