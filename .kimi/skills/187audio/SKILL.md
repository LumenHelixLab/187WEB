---
name: 187audio
description: >-
  Audio playback and audio-reactive geometry using Web Audio frequency data, Howler.js, and Three.js / R3F. 2 catalogued patterns.
model_adapter: kimi
---

> **Kimi adapter:** Load via the Kimi Skill tool or place in your Kimi skills directory. Source: [`../../.claude/skills/187audio/SKILL.md`](../../.claude/skills/187audio/SKILL.md).

# 187AUDIO

187AUDIO is the smallest catalog in the motion lab — 2 patterns, honestly so:
the source registry has one real audio-playback pattern and one audio-
reactive hybrid. Full detail:
[`references/EFFECT-CATALOG.md`](references/EFFECT-CATALOG.md). This skill's
original scope — Web Audio-driven Three.js geometry reacting to frequency
data, beats, and microphone input — remains the deep end
(`/187colorwaveaudio`); plain playback control (`/187howler`) is the
practical, more common ask. Video players (Vimeo/HLS/Bunny — `/187hlsadv`
and siblings) are catalogued under `187GSAP`, not here — this skill is
specifically audio, not general media UI.

## Sub-skills

- **audio-playback** — `/187howler`, a Howler.js-backed custom player with
  scrubber, volume, and speed control, UI state driven by `onplay`/`onend`.
- **audio-reactive** — `/187colorwaveaudio` (hybrid, Three.js required): Web
  Audio `AnalyserNode` frequency data piped into shader/geometry uniforms —
  bass/treble stretch a `SphereGeometry`/`BoxGeometry` into a 3D
  oscilloscope. GSAP does not loop this one; the audio data *is* the driver.
  Microphone-input variants need explicit `getUserMedia` permission handling
  — never request it silently on page load.

## When to use

- A page needs a controllable audio player (not a background video with
  sound — that's `187GSAP`'s media-controller family).
- A visual should react to live or file-based audio frequency data.

## Output contract

1. Audio node graph / playback source and controls — file/stream, scrubber,
   volume, speed.
2. If audio-reactive: frequency-band mapping (bass → what, treble → what)
   and which uniforms/geometry properties the data drives.
3. Permission and autoplay-policy notes — browsers block audible autoplay
   and microphone access requires an explicit user gesture; state both
   requirements rather than assuming they're handled.
4. Reduced-motion / photosensitivity fallback for the reactive visual — a
   static waveform or amplitude bar, not a frozen mid-animation frame.
5. Next actions.

## Effect catalog

[`references/EFFECT-CATALOG.md`](references/EFFECT-CATALOG.md) — 2 entries.

## Routes

- `187GSAP` for non-audio-reactive motion synced to playback *events*
  (`onplay`/`onend`) rather than raw frequency data — see the **Sonic
  Feedback** skillchain in `187MOTION`'s `references/SKILLCHAINS.md`.
- `187VIZ` for the geometry/shader techniques `/187colorwaveaudio` shares
  with the non-audio 3D visualizations.
- `187MOTION` for reusable audio-reactive hooks.
- `187ACCESS+` for autoplay policy and photosensitivity review — a
  fast-pulsing audio-reactive visualizer is a real seizure-trigger risk at
  the wrong flash rate; check WCAG 2.3.1 explicitly, not just
  `prefers-reduced-motion`.

