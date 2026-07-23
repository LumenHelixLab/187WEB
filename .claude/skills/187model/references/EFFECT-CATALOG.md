# 187MODEL effect catalog

Generated from [`docs/handoffs/187-motion-gsap-skill-registry-v3.md`](../../../../docs/handoffs/187-motion-gsap-skill-registry-v3.md) by `scripts/parse-motion-registry.py`. Do not hand-edit — re-run the script after changing the source registry or the classification rules in the script.

**6 patterns** classified to this skill (of 207 total in the registry). Full machine-readable registry: [`EFFECT-REGISTRY.json`](../../187gsap/references/EFFECT-REGISTRY.json).

| # | Command | Name | Logic | Trigger | Hybrid (Three.js) |
|---|---|---|---|---|---|
| 5 | `/187radial3d` | Inertia-Orbital 3D Carousel | Cards in `rotateY` + `translateZ` circle; `Draggable` with `type:"rotation"`; `InertiaPlugin` snap; `onPress` pauses autoplay. | *"radial 3d slider"*, *"orbital cards"* |  |
| 7 | `/187cube3d` | Hardware-Accelerated Cube Flip | Four panels with `preserve-3d`; tween `rotateY` by 90°; `backface-visibility:hidden`; `ease:"power4.inOut"`; keyboard arrow support. | *"3d cube transition"*, *"flip page cube"* |  |
| 13 | `/187tornado3d` | Helical Funnel Card Tornado | Cards arranged in helix (`rotateY` + `translateZ`); container spins continuously; scroll maps to `translateZ` offset for funnel effect. | *"3d tornado"*, *"helix funnel"* |  |
| 82 | `/187perspective3d` | Mouse-Tilt 3D Card | `mousemove` calculates `rotateX/Y` via `mapRange`; clamp ±15deg; `perspective:1000px`; `quickTo`. | *"3d perspective"*, *"tilt card"* |  |
| 103 | `/187cylcarousel` | 3D Cylindrical Carousel | Images on `rotateY` increments; `Draggable` `type:"rotation"`; `InertiaPlugin` snap. | *"3d carousel"*, *"cylinder slider"* |  |
| 202 | `/187physicscascade` | 3D Matter.js + Three.js Hybrid Physics | Matter.js runs the 2D physics engine (collisions/gravity) but drives the `position` and `rotation` of Three.js 3D rendered cubes (extruded boxes). GSAP orchestrates the initial cascade drop (staggered release of 30 physics bodies). | *"3d physics drop"*, *"matter three hybrid"* | yes |
