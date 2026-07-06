import type { ReactNode } from "react";

/** Centered page gutter — one max-width and one set of paddings, everywhere. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container-x ${className}`.trim()}>{children}</div>;
}
