import { BrandOrb } from "@/components/BrandMark";

/**
 * Product wordmark for warm-blueprint surfaces: primary 187WEB orb + name.
 * Parent supplies the link (e.g. SiteHeader).
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <BrandOrb size="xs" alt="" className="h-[22px] w-[22px]" />
      <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
        187<span className="text-muted">WEB</span>
      </span>
    </span>
  );
}
