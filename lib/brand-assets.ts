/**
 * Canonical brand media paths (files live under public/images/).
 *
 * GitHub Pages serves the site under /187WEB (basePath). next/image unoptimized
 * export was emitting bare /images/... URLs (404 on Pages). Always prefix with
 * the public base path when set.
 */
function withBase(path: string): string {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export const brandAssets = {
  /** 187WEB badge / spider orb — primary product mark */
  orb: withBase("/images/187web_badge_icon.png"),
  /** Horizontal 187WEB lockup — agent hero / README header */
  headerLockup: withBase("/images/187web_lockup_horizontal.png"),
  /** Wordmark + tagline strip for hero / sampler surfaces */
  wordmarkTagline: withBase("/images/187web_wordmark_tagline.png"),
  /** Clean 187WEB wordmark (hero primary) */
  wordmark: withBase("/images/187web_wordmark.png"),
  /** Red blueprint mascot — large hero figure */
  mascotBlueprint: withBase("/images/187web_mascot_blueprint.png"),
  /** NATASHA technical blueprint — mascot geometry / vibe board */
  blueprint: withBase("/images/187web_technical_blueprint_coordinate_grid.png"),
  /** LumenHelix DNA lightbulb — org mark */
  bulb: withBase("/images/lumenhelix-logo-bulb.png"),
  /** LUMENhelix /lab wordmark */
  labWordmark: withBase("/images/lumenhelixlab-text-logo.png"),
  /** Full-figure mascot — hero reveals and Flip detail panel */
  mascotReference: withBase("/images/187web_mascot_full_figure.png"),
  /** Hologram / wireframe mascot for scroll and magnetic samplers */
  mascotWireframe: withBase("/images/187web_mascot_wireframe.png"),
  /** Triangle icon for Flip sampler grid */
  triangleIcon: withBase("/images/187web_triangle_icon.png"),
  /** KNOTstore agent-memory layer logo */
  knotstoreLogo: withBase("/images/KNOTSTORELOGO.png"),
} as const;

export type BrandAssetKey = keyof typeof brandAssets;

/** Docs-tree mirrors for README and GitHub rendering (relative from repo root). */
export const brandAssetsDocs = {
  orb: "docs/assets/187orblogo.png",
  headerLockup: "docs/assets/header.png",
  blueprint: "docs/assets/natasha-tech-blueprint.png",
  bulb: "docs/assets/lumenhelix-logo-bulb.png",
  labWordmark: "docs/assets/lumenhelixlab-text-logo.png",
  mascotReference: "docs/assets/natasha187mascot.png",
} as const;
