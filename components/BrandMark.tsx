import Image from "next/image";
import { brandAssets } from "@/lib/brand-assets";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

const ORB_PX: Record<Size, number> = {
  xs: 28,
  sm: 36,
  md: 48,
  lg: 96,
  xl: 160,
};

/**
 * Primary 187WEB orb (spider / hourglass brand mark).
 * Decorative by default; pass alt when the image is the sole label.
 */
export function BrandOrb({
  size = "sm",
  className = "",
  alt = "",
  priority = false,
}: {
  size?: Size;
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  const px = ORB_PX[size];
  return (
    <Image
      src={brandAssets.orb}
      alt={alt}
      width={px}
      height={px}
      priority={priority}
      className={`shrink-0 object-contain ${className}`.trim()}
    />
  );
}

/** LumenHelix DNA lightbulb org mark */
export function LumenHelixBulb({
  size = 28,
  className = "",
  alt = "LumenHelix",
}: {
  size?: number;
  className?: string;
  alt?: string;
}) {
  return (
    <Image
      src={brandAssets.bulb}
      alt={alt}
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`.trim()}
    />
  );
}

/** LUMENhelix /lab text lockup */
export function LabWordmark({
  height = 22,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  // Source art is wide; width scales from a ~6.5:1 aspect.
  const width = Math.round(height * 6.5);
  return (
    <Image
      src={brandAssets.labWordmark}
      alt="LumenHelix Lab"
      width={width}
      height={height}
      className={`object-contain object-left ${className}`.trim()}
    />
  );
}

/** Full 187WEB header text lockup (hero / README) */
export function HeaderLockup({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={brandAssets.headerLockup}
      alt="187WEB — A killer AI-powered web suite. Spin sharper sites, ship smarter systems."
      width={1600}
      height={480}
      priority={priority}
      className={`h-auto w-full object-contain ${className}`.trim()}
    />
  );
}

/** NATASHA / 187WEB technical blueprint */
export function NatashaBlueprint({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={brandAssets.blueprint}
      alt="187WEB NATASHA technical blueprint — coordinate grid map of the mascot geometry"
      width={1600}
      height={2000}
      priority={priority}
      className={`h-auto w-full object-contain ${className}`.trim()}
    />
  );
}
