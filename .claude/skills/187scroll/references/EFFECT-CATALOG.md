# 187SCROLL effect catalog

Generated from [`docs/handoffs/187-motion-gsap-skill-registry-v3.md`](../../../../docs/handoffs/187-motion-gsap-skill-registry-v3.md) by `scripts/parse-motion-registry.py`. Do not hand-edit — re-run the script after changing the source registry or the classification rules in the script.

**44 patterns** classified to this skill (of 207 total in the registry). Full machine-readable registry: [`EFFECT-REGISTRY.json`](../../187gsap/references/EFFECT-REGISTRY.json).

| # | Command | Name | Logic | Trigger | Hybrid (Three.js) |
|---|---|---|---|---|---|
| 6 | `/187steptime` | Pinned Scroll-Journey Timeline | Pin wrapper; `ScrollTrigger` with `scrub:1` drives master timeline; connector line morphs (`scaleY`); content staggers in. | *"step timeline"*, *"scroll journey"* |  |
| 16 | `/187parallaxhoriz` | Multi-Plane Horizontal Parallax | Pin container; `ScrollTrigger` scrubs `xPercent`; layers with `data-speed`; backgrounds move at fraction of foreground. | *"horizontal parallax"*, *"scroll slides"* |  |
| 17 | `/187depthtiles` | Perspective Tile Scroll Loop | Tile grid shifts via timeline; offscreen tiles wrap; center tiles scale up (1.2) vs edges (0.8) via distance clamping. | *"depth tiles"*, *"perspective grid loop"* |  |
| 20 | `/187tocarticle` | Sticky Scroll-Spy TOC | Parse `h2/h3`; build TOC; `ScrollTrigger` highlights active section; click triggers Lenis smooth scroll. | *"table of contents"*, *"scroll spy"* |  |
| 23 | `/187undernav` | Z-Index Underlay Fixed Nav | Fixed nav `z-index:1`; hero `z-index:2`; `ScrollTrigger` toggles class for solid background; `pointer-events` auto. | *"underlay nav"*, *"fixed under nav"* |  |
| 24 | `/187orbittiles` | Elliptical Orbital Tile Loop | Positions via `Math.sin/cos`; increment angle; wrap at 2PI; simulate depth with `translateZ`. | *"orbit tiles"*, *"circular loop"* |  |
| 25 | `/187comparetable` | Sticky Header/Col Matrix | Table with sticky header/first column; `ScrollTrigger` for horizontal pin; hover row highlights via `gsap.to`. | *"comparison table"*, *"feature matrix"* |  |
| 29 | `/187scrollsnap` | Full-Section Scroll Snapper | `ScrollTrigger` `onEnter` with `toggleActions`; `window.scrollTo` smooth; debounced to prevent queue-jumping. | *"scroll snap"*, *"fullpage sections"* |  |
| 31 | `/187shutterscroll` | Scroll-Driven Shutter Reveal | Same as shutter but driven by `ScrollTrigger` `scrub:2`; panels open/close with scroll progress. | *"shutter scroll"*, *"scroll wipe"* |  |
| 33 | `/187pixelscroll` | Retro Pixel-Disintegration Scroll | Clip-path stepping + blur; `steps(10)` for pixel feel; outgoing pixelates, incoming sharpens. | *"pixelated scroll"*, *"retro pixel transition"* |  |
| 36 | `/187stackbounce` | Elastic-Stack Sticky Cards | Pin each card; `y` tweens `0→-20` with `back.out(0.5)`; `scale` `0.95→1`; reverse on scroll back. | *"stacking cards"*, *"bounce sticky"* |  |
| 37 | `/187globe3d` | Mapbox Projection Globe | Mapbox GL with `projection:{name:'globe'}`; `pitch`/`bearing` tweened via `gsap.to`; markers with popups. | *"interactive globe"*, *"3d mapbox globe"* |  |
| 40 | `/187sticksteps` | Stepped Sticky Progress Indicator | Horizontal/vertical steps; `ScrollTrigger` pins each; connector line fills via `scaleX`/`scaleY`; step dots scale. | *"sticky steps"*, *"step indicator"* |  |
| 50 | `/187overlapfix` | Overlapping Parallax Stack | Old scales down (`0.9`) & fades; new zooms in (`1.1→1`) & fades; overlap in middle; `power2.inOut`. | *"overlapping parallax"*, *"stack transition"* |  |
| 54 | `/187linetestimonial` | Line-Draw Testimonial Revealer | SVG line draws with `DrawSVGPlugin`; text fades with stagger; `ScrollTrigger` triggers each. | *"line reveal testimonials"*, *"quote with line"* |  |
| 56 | `/187twostepnav` | Dual-Phase Scaling Header | Phase 1: logo shrinks; Phase 2: background solidifies; `ScrollTrigger` with markers. | *"two step nav"*, *"phased header shrink"* |  |
| 61 | `/187zoomtobg` | Thumbnail-to-Background Zoom | Thumbnail `scale`/`position` interpolated to fullscreen; `ScrollTrigger` scrub; `transform-origin` from click. | *"zoom to background"*, *"thumbnail hero"* |  |
| 62 | `/187seqscroll` | Canvas Frame-Sequence Scrub | Preload 120 frames; `ScrollTrigger` scrubs `currentFrame`; `onUpdate` draws to canvas. | *"image sequence"*, *"frame scrub"* |  |
| 70 | `/187pathscroll` | Scroll-Driven Path Follower | `MotionPathPlugin` positions dot; `stroke-dashoffset` draws path; both scrubbed by `ScrollTrigger`; `autoRotate`. | *"draw path scroll"*, *"motion path"* |  |
| 80 | `/187horizscroll` | Horizontally Pinned Scroller | Container pinned; `ScrollTrigger` scrubs `x`; optional snap for section alignment. | *"horizontal scroll"*, *"side scroll sections"* |  |
| 83 | `/187footerparallax` | Bottom-Reveal Parallax Footer | Footer `position:sticky`; as content scrolls up, footer accelerates via `translateY`. | *"footer parallax"*, *"sticky footer"* |  |
| 94 | `/187stickfeat` | Sticky Feature Stack Carousel | Features pin and stack vertically; each pushes previous up; `ScrollTrigger` with `pinSpacing`. | *"sticky features"*, *"scroll stacking"* |  |
| 95 | `/187globeaccel` | Scroll-Accelerated 3D Globe | Globe rotation speed mapped to scroll depth via `mapRange`; `scrub:2`; smooth deceleration. | *"accelerating globe"*, *"speed globe"* |  |
| 98 | `/187stackparallax` | Internal Parallax in Stacked Cards | Each card has background layer; `ScrollTrigger` moves background at different speed; creates depth. | *"stack parallax"*, *"card depth"* |  |
| 101 | `/187revealbatch` | Staggered Viewport-Reveal Engine | `ScrollTrigger.batch()` on `.reveal`; `from` opacity/y; `stagger:0.05`; auto threshold. | *"elements reveal"*, *"batch scroll"* |  |
| 109 | `/187backtop` | Smart Back-to-Top Button | Appears after 400px via `ScrollTrigger`; click tweens `window.scrollTo` with `power2.inOut`; hides at bottom. | *"back to top"*, *"scroll up"* |  |
| 114 | `/187motionpathscroll` | SVG Path Element Scrubber | Element follows path via `MotionPathPlugin`; `ScrollTrigger` drives `progress`; `autoRotate`. | *"follow path"*, *"path follower"* |  |
| 115 | `/187locomotive` | Locomotive + ScrollTrigger Proxy | Integrates `locomotive-scroll` with `ScrollTrigger.scrollerProxy`; syncs GSAP with smooth scroll. | *"locomotive"*, *"smooth scroll setup"* |  |
| 121 | `/187globalparallax` | Data-Attribute Global Parallax | Select `[data-speed]`; scroll maps `data-speed` to `yPercent`; `will-change` optimization. | *"global parallax"*, *"data-speed layers"* |  |
| 133 | `/187stickytitle` | Pinned Section Title Overlay | Title pins to top via `pin`; content scrolls underneath; fades at section end. | *"sticky title"*, *"pinned title"* |  |
| 134 | `/187flipscroll` | Scroll-Triggered Flip State Change | `Flip.getState` before tween; `Flip.from` animates state; `ScrollTrigger` drives. | *"flip scroll"*, *"gsap flip"* |  |
| 138 | `/187progressnav` | Vertical Scroll-Progress Sidebar | Side dots; connecting line `scaleY`; `ScrollTrigger` highlights; click scrolls to section. | *"progress nav"*, *"side dots"* |  |
| 140 | `/187parallaxthumb` | Thumbnail-Driven Main Parallax | Hover thumbnail triggers main image transition with `x`/`scale` parallax; `power3.out`. | *"parallax thumb"*, *"thumbnail swap"* |  |
| 143 | `/187videoscroll` | Scroll-Progress Video Scrubber | Tween `video.currentTime` via `ScrollTrigger` scrub; duration mapped to video length. | *"video scroll"*, *"scrub video"* |  |
| 165 | `/187sectiontheme` | Scroll-Activated Section Theming | Detect active section via `ScrollTrigger`; change nav/page theme color dynamically. | *"section theme"*, *"scroll theme"* |  |
| 171 | `/187dirmarq` | Scroll-Direction Reversing Marquee | Detects scroll direction; changes `translateX` direction accordingly. | *"directional marquee"*, *"scroll direction ticker"* |  |
| 172 | `/187scrolldir` | Scroll Direction Detector | Compare `window.scrollY` with previous; output 'up'/'down' via event. | *"scroll direction"*, *"up down detector"* |  |
| 174 | `/187lenisanchor` | Lenis Smooth Anchor Scroll | `lenis.scrollTo` with offset; click nav links; smooth easing. | *"lenis anchor"*, *"smooth scroll to"* |  |
| 175 | `/187lenis` | Lenis Smooth Scroll Engine | Initialize Lenis with easing/wheel; integrate with GSAP. | *"lenis setup"*, *"smooth scroll lenis"* |  |
| 179 | `/187progressnum` | Scroll Percentage Number | `ScrollTrigger` updates 0-100%; `onUpdate` sets `innerText`. | *"scroll progress"*, *"percentage scroll"* |  |
| 180 | `/187progressbar` | Top Scroll Progress Bar | Horizontal bar; `ScrollTrigger` updates `scaleX` from 0→1. | *"progress bar"*, *"scroll bar"* |  |
| 194 | `/187parallaxlayers` | Multi-Layer Image Parallax | Foreground/middle/background layers; `ScrollTrigger` moves each at different speeds. | *"parallax layers"*, *"image depth"* |  |
| 199 | `/187morphsphere` | Scroll-Driven 3D Topological Morph | A Three.js mesh with 500 vertices morphs between a Cube, Sphere, and TorusKnot. GSAP listens to `ScrollTrigger` and maps progress to the `morphTargetInfluences` array. Uses `onUpdate` to recalculate normals. | *"morph 3d"*, *"topology change"* | yes |
| 206 | `/187noiseterrain` | Scroll-Activated Simplex Terrain | Generates a flat `PlaneGeometry`. Using `simplex-noise` inside a custom shader, GSAP scrolls a `uTime` uniform that moves the vertices up/down (mountains/valleys) in real-time. A Three.js `DirectionalLight` highlights the terrain as it morphs. | *"3d terrain"*, *"scroll landscape"* | yes |
