/** Slim sticky bar atop every template / sub-page — back link + name. Adapts to
 *  a light or dark host theme so it sits on any template. */
export function TemplateBar({
  name,
  tone = "dark",
  backHref = "/templates",
  backLabel = "All templates",
}: {
  name: string;
  tone?: "light" | "dark";
  backHref?: string;
  backLabel?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`sticky top-0 z-40 border-b backdrop-blur ${
        dark ? "border-white/10 bg-[#060713]/80 text-white" : "border-black/10 bg-white/80 text-[#11131A]"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 text-sm">
        <a href={backHref} className="inline-flex items-center gap-1.5 font-medium opacity-75 transition-opacity hover:opacity-100">
          <span aria-hidden>←</span> {backLabel}
        </a>
        <span className="truncate font-semibold tracking-tight">{name}</span>
        <a
          href="https://github.com/lumenhelixsolutions/187webDESIGN"
          className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  );
}
