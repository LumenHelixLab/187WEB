---
title: 187RESEARCH Lab Architecture
description: Architecture for reproducible browser-based and computational labs.
tags: ["187research", "lab-architecture", "reference", "reproducibility"]
skill: 187research
---

# 187RESEARCH Lab Architecture

## Lab stack

A standard 187RESEARCH lab is a static or serverless web application with the following layers:

| Layer | Purpose | Default choices |
|---|---|---|
| Shell | Navigation, layout, modes, panels | Next.js, React, or single-file HTML |
| State | Reproducible experiment parameters | URL query params, JSON import/export |
| Computation | Deterministic calculations | Pyodide, JavaScript cells, Web Workers |
| Visualization | Charts, diagrams, 3D, maps | D3, Vega-Lite, Plotly, ECharts, Three.js |
| Evidence | Citations, provenance, reproducibility | Citation side panel, provenance log |
| Export | Data, code, report artifacts | SVG, PNG, JSON, PDF, Markdown |

## Deployment targets

- Static export to GitHub Pages / Cloudflare Pages / Netlify / Vercel
- Local-first mode: open `index.html` or run a local server
- JupyterLite / Pyodide notebooks in the browser
- Observable-style notebook cells embedded in the lab shell

## State and reproducibility

- Every interactive state must be permalinkable.
- Use deterministic seeds for stochastic computations.
- Log all parameter changes and computation results.
- Provide a "Reset to default" control.
- Export full experiment state as JSON with metadata.

## Modes

- **Plain-language mode:** Definitions and explanations at a general reading level.
- **Expert mode:** Full technical detail, formulas, and raw data.
- **Citation mode:** Side panel showing sources for the current view.
- **Reproducibility mode:** Panel showing environment, seeds, logs, and downloadables.

## Accessibility

- WCAG 2.2 AA contrast and keyboard navigation.
- Cognitive accessibility: plain language, chunked controls, error prevention.
- Screen-reader friendly tables and charts.
- Print/PDF-friendly report output.

## Safety

- No medical diagnosis or treatment guidance in biomedical labs.
- Human-review gate before enabling public-claim mode.
- Clear disclaimers for clinical, legal, civic, and invention-related outputs.
