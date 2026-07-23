# 187GSAP effect catalog

Generated from [`docs/handoffs/187-motion-gsap-skill-registry-v3.md`](../../../../docs/handoffs/187-motion-gsap-skill-registry-v3.md) by `scripts/parse-motion-registry.py`. Do not hand-edit — re-run the script after changing the source registry or the classification rules in the script.

**120 patterns** classified to this skill (of 207 total in the registry). Full machine-readable registry: [`EFFECT-REGISTRY.json`](../../187gsap/references/EFFECT-REGISTRY.json).

| # | Command | Name | Logic | Trigger | Hybrid (Three.js) |
|---|---|---|---|---|---|
| 1 | `/187locator` | Adaptive Proximity Store Finder | Mapbox GL with `projection:mercator`; `watchPosition` for live geolocation; cluster markers via `supercluster`; auto-flyTo on load. | *"store map"*, *"mapbox pins"*, *"find nearest store"* |  |
| 3 | `/187spotlight` | Aperture-Based Dynamic Spotlight | Radial gradient overlay with `mix-blend-mode:screen`; `gsap.quickTo()` with 0.2s lag; scales on hover over interactive targets. | *"torch cursor"*, *"spotlight effect"* |  |
| 4 | `/187graineff` | Canvas Noise Overlay Engine | Offscreen canvas generates monochromatic noise (`fillRect`); capped at 30fps via frame-skipping; opacity tied to scroll/hover via `gsap.to`. | *"film grain"*, *"noise texture"* |  |
| 8 | `/187expandnav` | Full-Screen Bottom Drawer | Height from `60px`→`100dvh`; stagger links with `y:50`; `backdrop-filter:blur(20px)`; focus trap inside drawer. | *"expanding bottom nav"*, *"fullscreen drawer"* |  |
| 9 | `/187dropcards` | Bounce-Physics Loader Stack | Cards fall from `y:-200` with `ease:"bounce.out"`; `stagger:0.08`; onComplete emits `loaded` event; loader fades out. | *"dropping cards loader"*, *"bounce stack"* |  |
| 10 | `/187layerslider` | Deck-Style Swipe Slider | Stack images with `x:20`/`scale:0.95`; `Draggable`; on release, top card flings off (`x:500`) and recycles to bottom. | *"layered slider"*, *"deck swiper"* |  |
| 11 | `/187radialmarq` | CSS-Perpetual Radial Ticker | Pure CSS `@keyframes` rotating parent; child items counter-rotate; `animation-play-state:paused` on hover. | *"css radial marquee"*, *"circular ticker"* |  |
| 14 | `/187toggleswitch` | Accessible Animated Pill | Hidden `input[type=checkbox]`; styled pill with `::after`; `prefers-reduced-motion` disables animation; emits `change` event. | *"toggle switch"*, *"pill toggle"* |  |
| 15 | `/187infgridmason` | Infinite Masonry Drag Wall | Masonry via CSS `columns`; wrap x/y with `gsap.utils.wrap`; `Draggable` with `inertia`; reposition offscreen tiles on drag end. | *"infinite masonry"*, *"draggable pinterest"* |  |
| 18 | `/187maskwindow` | Reveal-Mask Page Transition | SVG `clipPath` circle/rect; animate `r`/`width` from 0→max; incoming page behind; `ease:"power3.inOut"`. | *"masked transition"*, *"circular reveal"* |  |
| 19 | `/187datepicker` | Stateful Event Calendar | Generate day grid; highlight today; store selected in `Set`; prev/next month slides via `gsap.to`. | *"event calendar"*, *"date picker"* |  |
| 21 | `/187infgridbase` | Unbounded Uniform Drag Grid | Uniform grid; `gsap.utils.wrap` on both axes; `Draggable` with `inertia`; bounds dynamically update. | *"basic infinite grid"*, *"drag tiles"* |  |
| 26 | `/187shutterpage` | Quad-Shutter Camera Wipe | Four panels (top/bottom/left/right); animate `scaleX`/`scaleY` 0↔1; staggered `0.1s`; `ease:"power4.inOut"`. | *"shutter transition"*, *"camera wipe"* |  |
| 27 | `/187clickzoom` | Modal-Free Zoom Lens | Scale `1→1.5`; overlay `opacity:0→0.7`; click outside reverts; `ease:"back.out(1.2)"`. | *"click zoom"*, *"image magnify"* |  |
| 28 | `/187progblur` | Depth-of-Field Progressive Blur | `filter:blur()` mapped via `gsap.utils.mapRange`; throttled to `rAF`; uses `will-change:filter`. | *"progressive blur"*, *"dof blur scroll"* |  |
| 32 | `/187glassmorph` | Frosted Glass Backdrop | CSS `backdrop-filter:blur(16px)` + `saturate(1.4)`; border `rgba(255,255,255,0.2)`; no GSAP overhead. | *"glass effect"*, *"frosted panel"* |  |
| 34 | `/187curvewipe` | Bezier-Curved Organic Wipe | SVG bezier path as mask; animate `scaleX` 0→1; `ease:"power3.inOut"`; organic reveal. | *"curved wipe"*, *"organic page transition"* |  |
| 35 | `/187odometer` | Reel-Style Number Odometer | Tween `{val:0}`→`{val:target}`; `onUpdate` formats with commas; layered digit sprites via `background-position`. | *"odometer"*, *"counter reel"* |  |
| 38 | `/187mediacontroller` | Universal Viewport-Aware Media Driver | IntersectionObserver for autoPlay; `mouseenter` play/`mouseleave` pause; click toggle; `preload:"metadata"`. | *"video autoplay"*, *"hover play video"* |  |
| 39 | `/187meganav` | Direction-Aware Mega-Menu | Detect enter direction via `getBoundingClientRect`; animate `clip-path` from that side; stagger sub-links. | *"mega navigation"*, *"dropdown direction"* |  |
| 41 | `/187pathcursor` | SVG Path Drawing Trail | On `mousemove`, update SVG `d` with `M x y L x y`; `gsap.to` smooths; cap trail to 50 segments. | *"draw path cursor"*, *"cursor trail svg"* |  |
| 42 | `/187pixelwave` | Pixel-Grid Wave Assembler | 20x20 grid divs; transition out with delay based on row+col (wave); transition in reverse; `steps(1)` ease. | *"pixel wave"*, *"grid disintegrate"* |  |
| 43 | `/187cascadedeck` | Tinder-Style Cascading Deck | Stack offsets; `Draggable` `type:"x"`; fling if threshold exceeded; animate next in; `InertiaPlugin`. | *"cascading slider"*, *"tinder deck"* |  |
| 44 | `/187fanoutcards` | Fan-Out Stacked Page Transition | Current page splits into 6 segments; each rotates/scales (fan) to reveal incoming; `stagger:0.05`; `transform-origin:bottom`. | *"fan out pages"*, *"stacked transition"* |  |
| 47 | `/187drawsvgwipe` | SVG Stroke-Draw Page Wipe | Large SVG path; `DrawSVGPlugin` draws 0→100%; reveals new page; `ease:"power2.inOut"`. | *"draw svg transition"*, *"stroke wipe"* |  |
| 48 | `/187sidebyside` | Split-Screen Slide Transition | Old slides left (`x:-100%`); new slides from right; overlap briefly; `ease:"power3.inOut"`. | *"side by side"*, *"split slide"* |  |
| 51 | `/187colwipe` | Column-Sequential Curtain Wipe | 10 vertical columns; each `scaleX`/`x` staggered `0.03s`; `power2.inOut`; curtain effect. | *"column wipe"*, *"curtain transition"* |  |
| 52 | `/187crossfade` | Classic Opacity Cross-Fade | Outgoing `1→0`; incoming `0→1`; `power1.inOut`; preload incoming assets. | *"cross fade"*, *"fade transition"* |  |
| 53 | `/187pixelbasic` | Simple Pixelate In/Out | `filter:blur()` + `image-rendering:pixelated`; scrub blur 0→10px; reverse for incoming. | *"basic pixelate"*, *"blur pixel transition"* |  |
| 55 | `/187showreel` | Minimalist Showreel Controller | Custom video controls (play/progress/volume); progress updates via `timeupdate`; click to seek. | *"mini showreel"*, *"compact video"* |  |
| 57 | `/187dropstack` | Gravity-Drop Card Stack | Cards fall from above to form vertical stack; `bounce.out`; `stagger:0.06`; reusable outside loader. | *"dropping stack"*, *"falling deck"* |  |
| 58 | `/187expandpill` | Morphing Feature Pill Expander | Pill `border-radius:50px→8px`; width expands; content fades; reverse on outside click. | *"expanding pills"*, *"feature expander"* |  |
| 59 | `/187rotatetrail` | Directional Rotation Cursor Trail | Cloned images trail cursor; each rotates via `Math.atan2(deltaY,deltaX)`; `quickTo` positions; trail capped at 8. | *"rotating trail"*, *"spin cursor"* |  |
| 63 | `/187csstooltip` | Pure CSS Data-Attribute Tooltip | `::before`/`::after` with `content:attr(data-tooltip)`; appears on `:hover`; no JS. | *"css tooltip"*, *"data tip"* |  |
| 64 | `/187dragmarq` | Inertia-Driven Draggable Ticker | Horizontal marquee; `Draggable` `type:"x"`; `inertia`; dynamic bounds; snap on drag end. | *"draggable marquee"*, *"drag ticker"* |  |
| 66 | `/187snowfall` | Falling Particle Emitter | Spawn divs with `border-radius:50%`; random x/size/duration; `gsap.to` y; recycle on complete. | *"snowflake"*, *"falling particles"* |  |
| 69 | `/187stacktrail` | Vertical Stacking Image Trail | Images stack vertically behind cursor with `y` offset; each fades `opacity`; trail limit 10. | *"stacking trail"*, *"image pile"* |  |
| 71 | `/187livesearch` | Real-Time List.js Filter | Instantiate `List.js`; search triggers `list.search()`; debounce 300ms; highlight matches. | *"live search"*, *"list filter"* |  |
| 72 | `/187overlapslide` | Overlapping Card Swipe | Slides overlap by 30%; `Draggable` `type:"x"`; `inertia`; snap to card index. | *"overlapping slider"*, *"overlap cards"* |  |
| 74 | `/187dlbutton` | Stateful Download Trigger | Click triggers download; button shows spinner; on success morphs to checkmark via `gsap.to`; resets after 3s. | *"download button"*, *"download state"* |  |
| 75 | `/187crisploader` | Step-Based Geometric Loader | Geometric shapes animate with `steps(4)`; crisp staccato loading sequence. | *"crisp loader"*, *"stepped loader"* |  |
| 76 | `/187refractglass` | Mouse-Driven Refraction Distortion | Canvas pixel displacement; mouse controls warp grid; `gsap.utils.lerp` smoothing. | *"refracted glass"*, *"warp distortion"* |  |
| 78 | `/187coordcursor` | Live Mouse Coordinate Display | Two spans for X/Y; update via `mousemove`; `gsap.to` for smooth visual; click to copy. | *"cursor coordinates"*, *"xy display"* |  |
| 79 | `/187elasticbtn` | Elastic Pulse Interaction | Hover scales with `elastic.out(1,0.3)`; click pulses `0.9→1.1→1`; timeline ease. | *"elastic button"*, *"bouncy btn"* |  |
| 81 | `/187timetable` | Live-Updated Weekly Timetable | Grid layout; `getDay()` highlights current; store hours in object; dynamic classes. | *"opening hours"*, *"weekly timetable"* |  |
| 84 | `/187gridflip` | Layout State Flip Animator | `Flip.getState` before class change; `Flip.from` animates grid layout changes. | *"grid flip"*, *"layout state change"* |  |
| 85 | `/187socialshare` | Native Share-Intent Group | Click opens `window.open` for Twitter/LinkedIn/Facebook; `navigator.share` on mobile. | *"social share"*, *"share links"* |  |
| 86 | `/187swiperset` | Swiper.js Instantiation Wizard | Configure Swiper with pagination/navigation/autoplay; breakpoints; pause on hover. | *"swiper setup"*, *"swiper init"* |  |
| 87 | `/187countdown` | Live Date-Difference Countdown | `setInterval` computes diff; converts to days/hrs/mins/secs; stops at zero; emits `complete`. | *"countdown"*, *"date timer"* |  |
| 88 | `/187magneticbtn` | Magnetic Attraction Button | On hover, button `x`/`y` shifts toward mouse with `clamp`; `quickTo`; snaps back on leave. | *"magnetic cursor"*, *"attract hover"* |  |
| 89 | `/187hlsadvlight` | Advanced HLS Lightbox | HLS.js with quality selector, PIP, custom controls; volume persists in localStorage. | *"hls advanced"*, *"bunny lightbox"* |  |
| 90 | `/187hlsbg` | Muted HLS Background Stream | HLS.js auto-loads; `muted:true`; `autoplay:true`; fallback poster on error. | *"hls background"*, *"bunny bg video"* |  |
| 91 | `/187hlsbasic` | Minimal Custom HLS Player | HLS.js with play/pause + volume slider; error recovery. | *"basic hls"*, *"bunny player"* |  |
| 93 | `/187hlsadv` | Full-Featured HLS Suite | HLS.js + scrubber, speed (0.5-2x), quality, fullscreen; keyboard shortcuts. | *"advanced hls"*, *"hls full controls"* |  |
| 96 | `/187slntreveal` | Diagonal Slant Background Button | `::before` with `skewX`; `scaleX` 0→1 on hover; `transform-origin:left`; diagonal reveal. | *"slanted button"*, *"diagonal hover"* |  |
| 99 | `/187multifilter` | AND-Logic Multi-Category Filter | Selected tags in Set; show items where ALL selected; `Array.every`; animated show/hide. | *"multi filter"*, *"and logic filter"* |  |
| 100 | `/187filterbasic` | Single-Category Toggle Filter | Radio/button group; show only selected category; `data-category` match; `power1.out`. | *"basic filter"*, *"category filter"* |  |
| 102 | `/187pixelimg` | Pixelated Image Disintegration | `filter:blur()` + `pixelated` + `clip-path:inset()` stepped; dissolves on hover. | *"pixelate image"*, *"pixel hover"* |  |
| 104 | `/187dirhover` | Direction-Aware Slide List | Detect enter direction via `bound`; animate item sliding from that side; `power2.out`. | *"directional list"*, *"slide from side"* |  |
| 105 | `/187prevcursor` | Dynamic Image-Preview Cursor | Cursor changes to thumbnail of hovered link; `quickTo`; preload via `new Image()`. | *"image preview cursor"*, *"thumbnail follower"* |  |
| 106 | `/187logowall` | Breathing Logo Wall Animation | Logos cycle opacity/scale in wave pattern; stagger based on grid position; infinite loop. | *"logo wall"*, *"breathing logos"* |  |
| 107 | `/187masonry` | Responsive CSS Masonry Grid | Uses CSS `columns` with `break-inside:avoid`; no JS needed. | *"masonry"*, *"pinterest layout"* |  |
| 108 | `/187flickswipe` | Tinder-Style Flick Swiper | Card follows `x`/`rotation` on drag; if threshold exceeded, fling off; next animates in; `InertiaPlugin`. | *"flick cards"*, *"tinder swipe"* |  |
| 111 | `/187multinav` | Nested Multi-Level Accordion Menu | 3-level deep dropdown; each submenu slides in (`x:20→0`); `aria-expanded` toggled. | *"multilevel nav"*, *"deep dropdown"* |  |
| 112 | `/187tiltbouncebtn` | Tilt & Bounce Hybrid Button | On hover, tilts `rotateX/Y` ±5deg and bounces `y` with `elastic.out`; combines perspective + physics. | *"tilting bounce"*, *"bounce tilt btn"* |  |
| 113 | `/187gsapslider` | Core GSAP Slide Translator | Basic slide via `x`; next/prev buttons; `power2.inOut`; autoplay optional. | *"basic gsap slider"*, *"image slide"* |  |
| 116 | `/187lottie` | Lottie Web Playback Controller | Load JSON via `lottie.loadAnimation`; play/pause/seek; `loop:true`; resize observer. | *"lottie"*, *"json animation"* |  |
| 117 | `/187csscursor` | Static CSS URI Cursor | `cursor: url('path.png') 16 16, auto`; no JS. | *"css cursor"*, *"png cursor"* |  |
| 118 | `/187lazyvideo` | Lazy-Load Play-on-Hover Video | `preload:"none"`; `mouseenter` loads+plays; `mouseleave` pauses+unloads; `IntersectionObserver`. | *"lazy video"*, *"hover play"* |  |
| 119 | `/187whatsappqr` | WhatsApp QR Code Modal | QRCode.js generates `wa.me` link; modal overlay; click to download QR. | *"whatsapp qr"*, *"qr modal"* |  |
| 120 | `/187stackcards` | Stacked Drag-to-Reveal Deck | Cards offset by `y:10`; drag top card to reveal; snap to open/closed; `back.out`. | *"stacked cards"*, *"card peek"* |  |
| 128 | `/187ariaattr` | Accessibility Attribute Toggler | Toggle `aria-expanded`, `aria-hidden`; `setAttribute`; `prefers-reduced-motion` check. | *"aria toggle"*, *"attribute toggle"* |  |
| 130 | `/187displaycount` | Dynamic Numeric DOM Injector | Takes `data-count` target; inserts number with `gsap.to` on `innerText`. | *"display count"*, *"inject number"* |  |
| 131 | `/187stickers` | Freeform Draggable Sticker Canvas | `Draggable` with `type:"x,y"`; `bounds` parent; `inertia:false`; snap to grid optional. | *"draggable stickers"*, *"moveable stickers"* |  |
| 132 | `/187vimeolight` | Advanced Vimeo Lightbox | Vimeo Player API; custom controls (play/progress/quality); autoplay on open. | *"vimeo lightbox"*, *"vimeo advanced"* |  |
| 135 | `/187copyemail` | Clipboard Email Copier | `navigator.clipboard.writeText`; button changes to "Copied!"; resets after 2s; fallback prompt. | *"copy email"*, *"clipboard"* |  |
| 136 | `/187matterfall` | Matter.js Collision Physics | Matter.js engine; drop rectangles/circles; collision events; GSAP removal. | *"matter fall"*, *"physics drop"* |  |
| 137 | `/187centerloop` | Center-Focused Infinite Looper | Current slide centered/scaled 1.2; neighbors 0.8; auto-loop timeline; drag to interrupt. | *"centered loop"*, *"focus slider"* |  |
| 139 | `/187rotateiconbtn` | 360° Rotating Icon on Hover | `gsap.to` icon `rotate:360`; `power2.out`; supports SVG inline. | *"rotate icon"*, *"spin btn"* |  |
| 141 | `/187hamscale` | Hamburger-to-Close Morph Scale | Three lines: top rotates 45°, middle fades, bottom -45°; `power2.inOut`; scale transition. | *"hamburger morph"*, *"close icon"* |  |
| 142 | `/187beforeafter` | Draggable Split Comparator | Two images; `clip-path:inset(0 X% 0 0)` controlled by `Draggable` handle. | *"before after"*, *"split comparator"* |  |
| 145 | `/187flickity` | Flickity Cell Carousel | Instantiate `Flickity` with `wrapAround`, `cellAlign`; custom arrows. | *"flickity"*, *"flickity carousel"* |  |
| 147 | `/187cssmarq` | CSS Keyframe Infinite Marquee | `@keyframes` `translateX` 0→-100%; `linear infinite`; pause on hover. | *"css marquee"*, *"infinite ticker"* |  |
| 148 | `/187velocitycur` | Velocity-Responsive Dynamic Cursor | Calculate delta per frame; map to scale (1-3) and hue rotation; `gsap.to` updates. | *"velocity cursor"*, *"speed reactive"* |  |
| 149 | `/187stopmotion` | CSS Steps Stop-Motion Button | `animation: sprite 1s steps(4) infinite`; background-position shifts frame by frame. | *"stop motion"*, *"steps sprite"* |  |
| 150 | `/187darkmode` | Persistent Theme System | CSS custom properties; toggle `class="dark"`; store in localStorage; `prefers-color-scheme` fallback. | *"dark mode"*, *"theme toggle"* |  |
| 151 | `/187lightbox` | Vanilla JS Image Lightbox | Modal with `img`; navigation arrows; `Esc` close; focus trap; `gsap` scale open. | *"lightbox"*, *"image modal"* |  |
| 153 | `/187autocycle` | Auto-Fading Image Slideshow | Timeline loops; fade between images; pause on hover; `power2.inOut`. | *"auto slideshow"*, *"image cycle"* |  |
| 155 | `/187imagetrail` | Trailing Image Path Behind Cursor | Cloned images trail cursor with delay; new images added on move; cap at 15. | *"image trail"*, *"cursor trail images"* |  |
| 156 | `/187filterone` | Single-Category Basic Filter | Single select; hide/show via `data-category`; `power1.out` for grid items. | *"basic filter"*, *"single filter"* |  |
| 157 | `/187csstabs` | CSS-Only :target Tab System | Uses `:target` or radio buttons; no JS. | *"css tabs"*, *":target tabs"* |  |
| 158 | `/187titleleave` | Tab-Blur Page Title Swap | `document.addEventListener('visibilitychange')`; on hidden, change title; restore on visible. | *"page title leave"*, *"tab blur title"* |  |
| 159 | `/187vimeobg` | Muted Vimeo Background | Vimeo Player API; autoplay muted; loop. | *"vimeo background"*, *"vimeo bg"* |  |
| 160 | `/187tabautoplay` | Auto-Rotating Tab System | Tabs cycle automatically with fade; pause on hover; `gsap.timeline` loop. | *"tab autoplay"*, *"rotating tabs"* |  |
| 162 | `/187modal` | Scale/Fade Basic Modal | Modal opens with `scale`/`fade`; overlay close; X button; focus trap. | *"basic modal"*, *"popup modal"* |  |
| 163 | `/187csstoggle` | Checkbox-Hack CSS Toggle | Hidden checkbox + `:checked` pseudo-class; toggles states without JS. | *"css toggle"*, *"checkbox hack"* |  |
| 164 | `/187formvalbasic` | Basic Live Form Validation | Validate on input/blur; display error messages; required/email patterns. | *"form validation"*, *"live validate"* |  |
| 166 | `/187burger` | Hamburger-to-Close Morph | Three lines; top/bottom rotate to X; middle fades; `power2.inOut`. | *"burger menu"*, *"hamburger morph"* |  |
| 167 | `/187drawcanvas` | Cursor Drawing Canvas | Canvas element; `mousemove` draws lines; `lineTo`; `stroke`; configurable color/size. | *"draw canvas"*, *"sketchpad"* |  |
| 168 | `/187vimeobasic` | Basic Custom Vimeo Player | Vimeo Player API; play/pause + progress. | *"basic vimeo"*, *"vimeo custom"* |  |
| 169 | `/187vimeoadv` | Advanced Custom Vimeo Player | Full controls: quality, speed, volume, fullscreen. | *"advanced vimeo"*, *"vimeo full controls"* |  |
| 170 | `/187accordion` | CSS Max-Height Accordion | `max-height` transition; pure CSS; `overflow:hidden`. | *"accordion"*, *"css accordion"* |  |
| 173 | `/187magnethover` | Magnetic Hover Attraction | Button moves toward cursor with clamp; `quickTo`; `power2.out`; snap back. | *"magnetic hover"*, *"attract hover"* |  |
| 176 | `/187confetti` | Physics2D Cursor Confetti | On click, burst 30 colored divs; `Physics2DPlugin` with random velocity/angle/gravity. | *"confetti"*, *"cursor burst"* |  |
| 177 | `/187clock` | Live Real-Time Clock | `setInterval` updates hours:minutes:seconds; `toLocaleTimeString`. | *"live clock"*, *"current time"* |  |
| 178 | `/187morphplay` | Play-to-Pause SVG Morph | `MorphSVGPlugin` morphs triangle to two bars on click. | *"morph play"*, *"play pause svg"* |  |
| 181 | `/187emojirain` | Falling Emoji Rain | Spawn emojis with random sizes/speeds; fall with `gsap.to`; recycle. | *"emoji rain"*, *"falling emojis"* |  |
| 182 | `/187basiccursor` | Simple Lagging Custom Cursor | Circle cursor; `quickTo` with 0.2s lag; `opacity`/`scale` toggles. | *"basic cursor"*, *"simple custom cursor"* |  |
| 183 | `/187dirbtn` | Direction-Sensing Button Background | Background slides from mouse enter direction; `bound` detection. | *"directional button"*, *"hover direction"* |  |
| 184 | `/187numloader` | 3-Step Percentage Loader | Counts 0→100% in three phases; each with different ease; `onUpdate`. | *"number loader"*, *"step loader"* |  |
| 185 | `/187bubblearrow` | Arrow-to-Speech-Bubble Morph | Arrow morphs into bubble tail on hover; `gsap.to` path/background. | *"bubble arrow"*, *"speech btn"* |  |
| 187 | `/187formvaladv` | Advanced Multi-Rule Form Validator | Custom rules (password match, min length, pattern); real-time feedback; submit handler. | *"advanced form"*, *"live validate advanced"* |  |
| 188 | `/187expirebadge` | Time-Based Expiring Badge | Checks sessionStorage or date; removes "New" badge after X days or first view. | *"expiring badge"*, *"new label"* |  |
| 190 | `/187infslider` | Classic Infinite Draggable Slider | Clones slides; `Draggable` with `type:"x"`; `InertiaPlugin`; `gsap.utils.wrap`; snap on drag end. | *"infinite slider"*, *"draggable infinite"* |  |
| 191 | `/187sidenavwipe` | Off-Canvas Side Nav with Wipe | Side nav slides in; content behind wipes (clip-path) away; `timeline`. | *"side nav wipe"*, *"off-canvas wipe"* |  |
| 192 | `/187osmofluid` | Fluid Viewport Scaling System | `gsap.utils.mapRange` maps viewport width to font-size/scale; `ResizeObserver` rebinds. | *"osmo scale"*, *"fluid system"* |  |
| 193 | `/187copyright` | Auto-Copyright Year Injector | `new Date().getFullYear()`; injects into footer. | *"copyright year"*, *"current year"* |  |
| 195 | `/187appledock` | Apple-Style Scaling Dock | Icons scale up on mouse approach; neighboring icons scale slightly; `quickTo` with distance. | *"apple dock"*, *"macos dock"* |  |
| 197 | `/187pixelreveal` | Pixelated-to-Sharp Image Reveal | Image starts pixelated (`blur`/`pixelated`); sharpens on scroll/hover. | *"pixel reveal"*, *"sharp reveal"* |  |
| 204 | `/187sketchline` | 3D Fat Cursor Drawing Trail | Uses `three-mesh-bvh` or `MeshLine` library. The cursor draws an extruded 3D tube/path in real-time. GSAP records mouse deltas and feeds them to the geometry's `setPoints()`, creating a dynamic, ribbon-like 3D sculpture that follows the user. | *"3d draw cursor"*, *"fat ribbon trail"* | yes |
