import type { ReactNode } from "react";

/** Empty/no-data state (RESILIENCE.md #4) — always offers the next action so a
 *  dead end becomes a door. */
export function EmptyState({
  title,
  message,
  action,
  icon = "∅",
  className = "",
}: {
  title: string;
  message: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/15 p-8 text-center ${className}`}
    >
      <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full bg-white/5 text-xl text-white/50">
        {icon}
      </span>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="max-w-sm text-sm text-white/55">{message}</p>
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}
