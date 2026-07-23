---
name: 187viz
description: >-
  3D and grid-based visualization — proximity-reactive pixel grids, column visualizers, glowing WebGL orb fields, and point-cloud depth surfaces. 4 catalogued patterns.
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/187viz/SKILL.md`](../../.claude/skills/187viz/SKILL.md).

# 187VIZ

187VIZ renders *shapes made of data or points*, not a specific product or a
hero backdrop — that distinction is what separates it from `187MODEL` and
`187HERO` when a pattern could plausibly live in either. It catalogs 4
patterns: [`references/EFFECT-CATALOG.md`](references/EFFECT-CATALOG.md).
This skill's original scope — 3D network/node-edge graphs, force layouts,
spatial data stories — isn't represented in the source registry at all; the
4 entries here are the closest adjacent patterns (grid- and particle-field
visualizations), and dedicated force-directed graph work is still
greenfield.

## Sub-skills

- **viz-grid** — DOM-based, no WebGL required: `/187gridvisual` (rhythmic
  column bars, `sine.inOut` wave from center), `/187pixelgrid`
  (proximity-activated cell grid, `gsap.utils.distance` to mouse mapped to
  scale/brightness).
- **viz-particle** — WebGL/Three.js required (hybrid): `/187pointcloudocean`
  (50,000-vertex point cloud, mouse-driven wave displacement),
  `/187fiberorb` (20 glowing spheres on a Lissajous curve with
  `UnrealBloomPass`).

## When to use

- A metric or dataset needs a lightweight visual representation that isn't a
  standard chart (route standard charts to a dedicated dataviz tool, not
  this skill).
- An ambient, non-narrative visual texture is wanted for a section
  background — `viz-particle` patterns work well here but carry a real GPU
  cost; confirm the performance budget first.
- A network/node-edge graph — this skill's original scope, still greenfield;
  build directly against React Three Fiber + a force-layout library rather
  than stretching one of the 4 catalogued patterns to fit.

## Output contract

1. Data schema and source plan (real metric vs. ambient/decorative), or
   visualization spec — grid/particle count for the catalogued patterns.
2. Layout algorithm choice (for graph work) or interaction model —
   proximity, scroll, or static/looping (for the catalogued patterns).
3. Performance budget — vertex count and target frame rate; `viz-particle`
   patterns especially need an explicit fallback for low-end/mobile (reduced
   particle count or a static image).
4. Reduced-motion fallback.
5. Next actions.

## Effect catalog

[`references/EFFECT-CATALOG.md`](references/EFFECT-CATALOG.md) — 4 entries.

## Routes

- `187MODEL` for detailed 3D node representations, or when the "data" is
  actually a single product object, not a field/grid.
- `187SCROLL` when the visualization's state is driven by scroll position
  rather than proximity or a loop, or for scroll-narrative integration.
- `187AUDIO` for the audio-reactive sibling pattern
  (`/187colorwaveaudio`) — shares the shader/uniform technique with
  `viz-particle` but is catalogued under audio since audio data is the
  driver.
- `187ACCESS+` for screen-reader/keyboard graph navigation and
  photosensitivity review on any particle field that pulses or flashes.

