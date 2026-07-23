# 187VIZ effect catalog

Generated from [`docs/handoffs/187-motion-gsap-skill-registry-v3.md`](../../../../docs/handoffs/187-motion-gsap-skill-registry-v3.md) by `scripts/parse-motion-registry.py`. Do not hand-edit — re-run the script after changing the source registry or the classification rules in the script.

**4 patterns** classified to this skill (of 207 total in the registry). Full machine-readable registry: [`EFFECT-REGISTRY.json`](../../187gsap/references/EFFECT-REGISTRY.json).

| # | Command | Name | Logic | Trigger | Hybrid (Three.js) |
|---|---|---|---|---|---|
| 46 | `/187gridvisual` | Rhythmic Column Visualizer | Vertical bars with `scaleY`; wave pattern via `stagger` from center; `sine.inOut`; continuous loop. | *"grid visualizer"*, *"column animation"* |  |
| 146 | `/187pixelgrid` | Proximity-Activated Pixel Grid | Grid cells; `gsap.utils.distance` to mouse; map to scale/brightness; `quickTo`; throttled. | *"pixel grid"*, *"mouse proximity"* |  |
| 200 | `/187pointcloudocean` | Interactive 3D Point Cloud Depth | Uses Three.js `Points` with 50,000 vertices arranged in a flat grid. On `mousemove`, GSAP `quickTo` applies a wave displacement to the `z` axis of nearby vertices (simulating an ocean surface), layered with a `sin` time uniform. | *"point cloud ocean"*, *"3d depth grid"* | yes |
| 203 | `/187fiberorb` | Real-time WebGL Glowing Orbs | Generates 20 animated Three.js `SphereGeometry` meshes with `MeshPhysicalMaterial` (clearcoat/roughness). GSAP continuously loops a stagger animation, tweening their `scale` and `position` along a spherical Lissajous curve. Uses `unrealBloomPass` for a glowing, ethereal aesthetic. | *"glowing orbs"*, *"bloom spheres"* | yes |
