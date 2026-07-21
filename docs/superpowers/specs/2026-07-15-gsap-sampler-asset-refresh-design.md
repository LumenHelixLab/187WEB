# GSAP Sampler + Brand Asset Refresh

**Date:** 2026-07-15  
**Status:** Implemented on `feat/xavier-phase2` (assets + motion-lab samplers + 187GSAP templates)  
**Owner:** 187WEB core team

## 1. Goals

- Deepen GSAP integration in the 187WEB showcase by adding a sampler of reusable motion patterns across three families: cursor/hover, page transitions, and scroll-driven effects.
- Replace the existing brand asset set with the new clean PNGs: badge icon, full mascot, wordmark+tagline, horizontal lockup, mascot wireframe, and triangle icon.
- Equip the `187GSAP` canonical skill with templates that CHARLOTTE can invoke for each pattern family.
- Keep the implementation reviewable and CI-green.

## 2. Non-goals

- No new top-level routes or dedicated sampler pages; everything lives inside the existing `/showcase` motion-lab grid.
- No backend changes; all motion is client-side GSAP.
- No replacement of the R3F-based WebHive background; the new assets are used in UI surfaces and demo cards.

## 3. Design decisions

### 3.1 Motion-lab sampler approach

Expand the existing `components/motion-lab/index.ts` `demos` array with three new self-contained cards. This reuses the lazy-loaded `MotionLabSection` grid and keeps routing simple.

### 3.2 Brand asset strategy

Replace canonical asset files under `public/images/` and update `lib/brand-assets.ts`. Docs mirrors under `docs/assets/` are refreshed so README/GitHub rendering stays consistent.

### 3.3 GSAP plugin choices

- **Flip plugin** for the page-transition layout morph.
- **ScrollTrigger** for the scroll-driven reveal card.
- **Core `gsap.quickTo`** for the cursor/hover magnetic effect.

All plugins are free and available from the public `gsap` npm package.

## 4. Brand asset refresh

### 4.1 Asset mapping

| Source file (Downloads) | Destination in `public/images/` | `brandAssets` key | Usage |
|---|---|---|---|
| `187web-badge-icon.png` | `187web_badge_icon.png` | `orb` | Header, agent hero, favicon-like mark |
| `187web-lockup-horizontal.png` | `187web_lockup_horizontal.png` | `headerLockup` | Agent hero lockup, README header |
| `187web-wordmark-tagline (1).png` | `187web_wordmark_tagline.png` | `wordmarkTagline` | Hero text, showcase eyebrow |
| `Gemini_Generated_Image_21r2be21r2be21r2.png` | `187web_mascot_full_figure.png` | `mascotReference` | Full mascot reveal surfaces |
| `187web-mascot-hologram-black.png` | `187web_mascot_wireframe.png` | `mascotWireframe` | Scroll sampler, blueprint overlays |
| `187web-triangle-icon.png` | `187web_triangle_icon.png` | `triangleIcon` | Flip sampler grid items |

### 4.2 Brand-assets type updates

Add new keys to `BrandAssetKey`:

- `wordmarkTagline`
- `mascotWireframe`
- `triangleIcon`

Update `brandAssetsDocs` mirrors for `orb` and `headerLockup`.

## 5. New motion-lab demos

### 5.1 `MagneticMascot`

**Family:** cursor / hover micro-interactions  
**What it does:** The badge icon and wireframe mascot lean toward the cursor with a magnetic pull; proximity triggers a glow pulse.  
**GSAP surface:** `gsap.quickTo` for pointer tracking; `gsap.to` for glow opacity.  
**Assets used:** `orb`, `mascotWireframe`.  
**Accessibility:** Motion pauses when pointer is absent; respects `prefers-reduced-motion`.

### 5.2 `FlipPageSampler`

**Family:** page transitions / layout morphs  
**What it does:** Toggle between a grid of triangle icons and a detail panel that shows the lockup + full mascot. The clicked triangle morphs into the detail panel using Flip.  
**GSAP surface:** `Flip.getState()`, `Flip.from()`, timeline sequencing.  
**Assets used:** `triangleIcon`, `headerLockup`, `mascotReference`.  
**Accessibility:** Reduced-motion state cross-fades instead of morphs.

### 5.3 `ScrollRevealSampler`

**Family:** scroll-driven effects  
**What it does:** A scrollable card where the hologram wireframe, wordmark, and badge slide/fade in as the user scrolls the card viewport.  
**GSAP surface:** `ScrollTrigger` with a custom `scroller` targeting the card container.  
**Assets used:** `mascotWireframe`, `wordmarkTagline`, `orb`.  
**Accessibility:** Static fallback renders all elements if reduced motion is preferred.

## 6. 187GSAP skill templates

Add three template files under `.claude/skills/187gsap/templates/`:

- `gsap-cursor-effects.md` — magnetic buttons, proximity grids, cursor trails.
- `gsap-page-transitions.md` — Flip plugin layout morphs and route-level timeline patterns.
- `gsap-scroll-effects.md` — ScrollTrigger pinning, scrub, parallax, and reduced-motion fallback.

Update `.claude/skills/187gsap/SKILL.md` and `docs/187GSAP.md` to:

- List the new templates in the **Templates** section.
- Reference the motion-lab demos as living examples.
- Mention that CHARLOTTE can invoke these patterns through her `gsap-motion-system` skill chain.

## 7. Files changed

### Brand assets
- `public/images/187web_badge_icon.png`
- `public/images/187web_lockup_horizontal.png`
- `public/images/187web_wordmark_tagline.png`
- `public/images/187web_mascot_full_figure.png`
- `public/images/187web_mascot_wireframe.png`
- `public/images/187web_triangle_icon.png`
- `docs/assets/187orblogo.png`
- `docs/assets/header.png`
- `lib/brand-assets.ts`

### Motion-lab demos
- `components/motion-lab/MagneticMascot.tsx`
- `components/motion-lab/FlipPageSampler.tsx`
- `components/motion-lab/ScrollRevealSampler.tsx`
- `components/motion-lab/index.ts`
- `components/motion-lab/MotionLabSection.tsx`

### Skill/docs
- `.claude/skills/187gsap/SKILL.md`
- `.claude/skills/187gsap/templates/gsap-cursor-effects.md`
- `.claude/skills/187gsap/templates/gsap-page-transitions.md`
- `.claude/skills/187gsap/templates/gsap-scroll-effects.md`
- `docs/187GSAP.md`

## 8. Validation criteria

After implementation:

- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm test` passes.
- `npm run build` succeeds (static export).
- `npm run adapters:generate && npm run adapters:drift` passes after skill file changes.
- Motion-lab grid renders ten demos (existing seven + three new).
- Brand assets display correctly on agent pages, header, and README.
- Reduced-motion fallbacks work for all three new demos.
