/**
 * Wordmark: a precise crosshair (the "187" attitude — every element is a kill
 * shot, lined up on target) next to the name. Uses currentColor so it inherits
 * ink/accent context. Decorative mark is aria-hidden; the text carries meaning.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="text-accent"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2.25" fill="currentColor" />
        <path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
        187<span className="text-muted">WEB</span>design
      </span>
    </span>
  );
}
