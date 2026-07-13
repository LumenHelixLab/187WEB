/**
 * Canonical brand media paths (files live under public/images/).
 * Prefer these constants over hard-coded strings so headers, README, and
 * skill pages stay aligned with the approved LumenHelixLab / 187WEB kit.
 */
export const brandAssets = {
  /** 187WEB spider orb — primary product mark */
  orb: "/images/187web_primary_brand_mark_iconic_mascot_logo.png",
  /** Metallic 187WEB wordmark + taglines — hero / README header */
  headerLockup: "/images/187web_header_text_lockup.png",
  /** NATASHA technical blueprint — mascot geometry / vibe board */
  blueprint: "/images/187web_technical_blueprint_coordinate_grid.png",
  /** LumenHelix DNA lightbulb — org mark */
  bulb: "/images/lumenhelix-logo-bulb.png",
  /** LUMENhelix /lab wordmark */
  labWordmark: "/images/lumenhelixlab-text-logo.png",
} as const;

export type BrandAssetKey = keyof typeof brandAssets;

/** Docs-tree mirrors for README and GitHub rendering (relative from repo root). */
export const brandAssetsDocs = {
  orb: "docs/assets/187orblogo.png",
  headerLockup: "docs/assets/header.png",
  blueprint: "docs/assets/natasha-tech-blueprint.png",
  bulb: "docs/assets/lumenhelix-logo-bulb.png",
  labWordmark: "docs/assets/lumenhelixlab-text-logo.png",
} as const;
