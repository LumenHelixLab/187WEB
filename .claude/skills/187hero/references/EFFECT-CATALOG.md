# 187HERO effect catalog

Generated from [`docs/handoffs/187-motion-gsap-skill-registry-v3.md`](../../../../docs/handoffs/187-motion-gsap-skill-registry-v3.md) by `scripts/parse-motion-registry.py`. Do not hand-edit — re-run the script after changing the source registry or the classification rules in the script.

**8 patterns** classified to this skill (of 207 total in the registry). Full machine-readable registry: [`EFFECT-REGISTRY.json`](../../187gsap/references/EFFECT-REGISTRY.json).

| # | Command | Name | Logic | Trigger | Hybrid (Three.js) |
|---|---|---|---|---|---|
| 73 | `/187willemloader` | Mascot-Walking Splash Loader | SVG character walks (sprite/morph); loader progress mapped to walk cycle; fades on complete. | *"willem loader"*, *"mascot loading"* |  |
| 92 | `/187logoload` | Morphing Logo Splash Loader | Logo SVG morphs via `MorphSVGPlugin`; scales up then settles; `power4.out`; fades loader. | *"logo reveal"*, *"splash loader"* |  |
| 110 | `/187mascotface` | Cognizant Mascot Face Tracker | SVG pupils track mouse via `clamp`; blink timeline every 4s; head tilts slightly. | *"mascot eyes"*, *"face follow"* |  |
| 126 | `/187minigame` | 404 Interactive Distractor | Canvas game (dino jump/snake); `rAF`; keyboard controls; high score in sessionStorage. | *"404 minigame"*, *"error game"* |  |
| 129 | `/187centernav` | Hero-to-Header Scale Nav | Nav scales from hero-center to header-top-left; `ScrollTrigger` maps scale/y/x; `transform-origin` adapts. | *"centered nav"*, *"hero shrink"* |  |
| 198 | `/187shaderwipe` | GLSL Disintegration Page Transition | Replaces CSS clip-paths with a Three.js `ShaderPass`. On scroll/click, GSAP scrubs a `uniform uProgress` (0→1). The fragment shader displaces the old page using a water ripple or glitch matrix effect while assembling the new page. | *"shader transition"*, *"glsl wipe"* | yes |
| 201 | `/187volumefog` | Volumetric Light Ray Cursor | Combines Three.js `FogExp2` with a custom `Mesh` (cone) that follows the mouse. GSAP animates the `opacity` and `scale` of the volumetric cone. As the cursor moves, it dynamically "illuminates" floating dust particles (Points). | *"volumetric light"*, *"god rays cursor"* | yes |
| 205 | `/187holointeract` | Holographic Image Deconstruction | An image is mapped onto a Three.js `PlaneGeometry` with 100x100 subdivisions. On hover, GSAP triggers a shader where the vertices scale outward from the center (breaking apart like hologram shards) while applying a scanline fragment effect. | *"hologram shatter"*, *"3d image break"* | yes |
