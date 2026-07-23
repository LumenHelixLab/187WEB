# 187TYPE effect catalog

Generated from [`docs/handoffs/187-motion-gsap-skill-registry-v3.md`](../../../../docs/handoffs/187-motion-gsap-skill-registry-v3.md) by `scripts/parse-motion-registry.py`. Do not hand-edit — re-run the script after changing the source registry or the classification rules in the script.

**23 patterns** classified to this skill (of 207 total in the registry). Full machine-readable registry: [`EFFECT-REGISTRY.json`](../../187gsap/references/EFFECT-REGISTRY.json).

| # | Command | Name | Logic | Trigger | Hybrid (Three.js) |
|---|---|---|---|---|---|
| 2 | `/187gradwave` | Staggered Chromatic Scroll Wave | Split text into `<span>`s; apply conic gradients; `ScrollTrigger` with `scrub:1.5` animates `background-position` sinusoidally (delay = index * 0.02). | *"rainbow scroll text"*, *"gradient wave"* |  |
| 12 | `/187fittext` | Binary-Search Text Squeeze | Uses `canvas.measureText` or `scrollWidth`; binary search between min/max font-size; debounced on resize. | *"fit text"*, *"auto scale text"* |  |
| 22 | `/187readtime` | Reading Duration Estimator | Count text nodes via `TreeWalker`; divide by 200; inject "X min read"; `MutationObserver` for dynamic content. | *"read time"*, *"reading estimate"* |  |
| 30 | `/187scrrambletxt` | Entropy Text Scrambler | On hover, split chars; `setInterval` cycles random chars; final frame decodes; reduced-motion skips scramble. | *"scramble text"*, *"glitch hover"* |  |
| 45 | `/187highlighter` | Marker-Pen Scroll Reveal | SplitText lines; tween `background-size:0%→100%`; color `rgba(255,255,0,0.4)`; `ScrollTrigger` batch. | *"highlight text"*, *"marker reveal"* |  |
| 49 | `/187titlewipe` | Typographic Wipe Title | Title `clip-path:inset(0 100% 0 0)`→`inset(0 0 0 0)`; overlaps incoming; `ease:"power4.out"`. | *"title wipe"*, *"page name transition"* |  |
| 60 | `/187varfont` | Variable Weight Typography | Tween `font-weight` via CSS custom property `--wght`; `power1.out`; requires variable font. | *"variable font"*, *"weight hover"* |  |
| 65 | `/187radialtxt` | CSS Circular Text Rotator | Text arcs via `transform`; parent rotates continuously; pause on hover. | *"radial text"*, *"circular ticker"* |  |
| 67 | `/187bigtypo` | Infinite Wrapping Type Ticker | Clone text nodes; `ScrollTrigger` drives `xPercent`; `gsap.utils.wrap` for infinite loop. | *"big typo scroll"*, *"infinite text ticker"* |  |
| 68 | `/187rotatetext` | Rotating Word Carousel | Word array; timeline loops: fade out, slide next in (`y:20→0`); `repeat:-1`; `power2.inOut`. | *"rotating text"*, *"word cycle"* |  |
| 77 | `/187fullnav` | Oversized Typography Full Nav | Overlay menu; links scale `0.8→1`; stagger in with `y:-30`; `backdrop-filter` blur. | *"bold fullscreen nav"*, *"big type menu"* |  |
| 97 | `/187cursormarq` | Marquee-Text Embedded Cursor | Custom cursor div contains scrolling text; `translateX` loop; size adapts to text length. | *"cursor marquee"*, *"text cursor"* |  |
| 122 | `/187gravitytxt` | Physics-Based Falling Text | `Physics2DPlugin` with `gravity:500`; chars fall; `bounce:0.7`; recycle on complete. | *"falling text"*, *"gravity drop"* |  |
| 123 | `/187scrollhighlight` | Scroll-Activated Word Highlighter | `SplitText` words; `ScrollTrigger` toggles `active`; background sweep; `stagger:0.02`. | *"scroll highlight"*, *"word highlight"* |  |
| 124 | `/187randunderline` | Squiggly Random Underline Draw | SVG path with random `d` curve; `drawSVG` 0→100% on hover; regenerates each hover. | *"random underline"*, *"squiggly line"* |  |
| 125 | `/187welcomewords` | Typing-Intro Loader Sequence | `SplitText` chars; stagger opacity/y from bottom; `power2.out`; fades loader on complete. | *"welcome loader"*, *"typing splash"* |  |
| 127 | `/187maskreveal` | Clip-Path Text Reveal | `SplitText` lines; `clip-path:inset(0 100% 0 0)`→`inset(0 0 0 0)`; `power3.out`. | *"masked reveal"*, *"clip text"* |  |
| 144 | `/187skeleton` | Shimmering Skeleton Text Loader | CSS `linear-gradient` shimmer at 45°; `background-size:200%`; infinite animation. | *"skeleton"*, *"shimmer loader"* |  |
| 154 | `/187scrambletri` | Unified Text Scramble Engine | Triggers on load/scroll/hover; char loop; `setInterval` random; decodes to target. | *"scramble tri"*, *"multi-trigger scramble"* |  |
| 161 | `/187charstagger` | CSS Character-Stagger Button | Text split into spans; each animated with CSS `animation-delay` stagger. | *"char stagger"*, *"css stagger btn"* |  |
| 186 | `/187underline` | Draw-In Underline on Hover | `::after` with `scaleX` 0→1; `transform-origin:left`; `power2.out`. | *"underline link"*, *"draw underline"* |  |
| 189 | `/187textcursor` | Context-Aware Text Cursor | Cursor text changes based on hovered element (`data-cursor` attribute); `quickTo`. | *"text cursor"*, *"dynamic cursor text"* |  |
| 196 | `/187loopselector` | Rotating Word Selector with Highlight | Word array; current word highlighted via underline/background; cycles with timeline. | *"looping words"*, *"selector highlight"* |  |
