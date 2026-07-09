<div align="center">

<br>

<img src="public/images/187suite-hero.jpg" alt="187SUITE" width="72%" />

<h1>Contributing to 187SUITE</h1>
<p><strong>Every element earns its place or it gets cut.</strong></p>

<br>

</div>

Thanks for helping make killer websites. This project is small on purpose — keep changes focused, well-crafted, and aligned with the four layers of the suite: **187REPO**, **187CRAFT**, **187VIBE**, and **187LAUNCH**.

<br>

## ◆ Setup

```bash
npm install
npm run dev
```

See [docs/GETTING-STARTED.md](./docs/GETTING-STARTED.md) for the database options.

<br>

## ◆ Before you open a PR

Run the full local gate (the same checks CI runs):

```bash
npm run lint
npm run typecheck
npm run build
npm run format
```

<br>

## ◆ The one house rule

**If your change touches the UI, run the [pre-ship checklist](./.claude/skills/187webdesign/references/CHECKLIST.md) and note what you verified in the PR.** This repo's whole premise is that it's built to its own standard. At minimum confirm:

- Responsive at 360 / 768 / 1280.
- Keyboard operable with a visible focus state.
- Contrast holds (≥4.5:1 body, ≥3:1 large/UI).
- `prefers-reduced-motion` respected.
- No new layout shift; no raster images where SVG/CSS will do.

<br>

## ◆ Code style

- **TypeScript, strict.** No `any` unless truly unavoidable (and commented).
- **Tokens, not hex.** Use the Tailwind color/space utilities backed by the design tokens — never hardcode colors or arbitrary sizes.
- **Tokens live in one place.** Add or change visual tokens in `app/globals.css` (+ `tailwind.config.ts`), not inline.
- **Content lives in `lib/content.ts`.** Copy and data go there, not scattered in JSX.
- Prettier + ESLint are the source of truth for formatting/lint.

<br>

## ◆ Commits & PRs

- Write clear, imperative commit messages ("Add lead rate-limiting", not "fixes").
- Keep PRs scoped to one concern.
- Describe the change, the reasoning, and (for UI) the checklist items you verified.

<br>

## ◆ Reporting issues

Open a GitHub issue with steps to reproduce, expected vs actual, and environment (browser, OS, Node version). For visual bugs, a screenshot at a stated viewport width helps a lot.

<br>

<div align="center">

<strong>187SUITE</strong> — <a href="LICENSE">MIT</a> © 2026 Lumen Helix Solutions

</div>
