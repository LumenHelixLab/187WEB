/**
 * App RGYB cycle — agent primary hues used by hive nodes and UI accents.
 * Order: Red (NATASHA) → Green (KALI) → Yellow (YELENA) → Blue (CHARLOTTE).
 * Xavier purple is optional 5th for extended cycles.
 */
export const RGYB = ["#f43f5e", "#39FF14", "#facc15", "#3b82f6"] as const;

export const CREW_PALETTE = [...RGYB, "#a855f7"] as const;

/** Slow hue phase for background node cycling (radians-ish speed factor). */
export const HIVE_COLOR_CYCLE_SPEED = 0.08;
