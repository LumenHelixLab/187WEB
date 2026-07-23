/**
 * Motion-lab dark palette — single JS-side source of truth for the same
 * colors exposed as Tailwind tokens (bg-sc-void, text-sc-primary, ...) via
 * the --sc-* custom properties in app/globals.css. Three.js material props
 * need literal hex strings, not CSS custom properties, so components that
 * pass color to R3F/Three.js import these instead of redeclaring locals.
 * Mirrors the "Abyssal Killer" 187THEME catalog entry (public/themes/catalog.json).
 */
export const MOTION_LAB_VOID = "#050608";
export const MOTION_LAB_PANEL = "#0a0c14";
export const MOTION_LAB_PRIMARY = "#39ff14";
export const MOTION_LAB_SECONDARY = "#7c3aed";
export const MOTION_LAB_CYAN = "#22d3ee";
export const MOTION_LAB_ROSE = "#f43f5e";
