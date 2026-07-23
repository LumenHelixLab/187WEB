# 187AUDIO effect catalog

Generated from [`docs/handoffs/187-motion-gsap-skill-registry-v3.md`](../../../../docs/handoffs/187-motion-gsap-skill-registry-v3.md) by `scripts/parse-motion-registry.py`. Do not hand-edit — re-run the script after changing the source registry or the classification rules in the script.

**2 patterns** classified to this skill (of 207 total in the registry). Full machine-readable registry: [`EFFECT-REGISTRY.json`](../../187gsap/references/EFFECT-REGISTRY.json).

| # | Command | Name | Logic | Trigger | Hybrid (Three.js) |
|---|---|---|---|---|---|
| 152 | `/187howler` | Howler.js Custom Audio Player | Howl instance; custom scrubber, volume, speed; UI updates via `onplay`/`onend`. | *"audio player"*, *"howler audio"* |  |
| 207 | `/187colorwaveaudio` | Audio-Reactive WebGL Visualizer | Uses `WebAudio` `AnalyserNode` to process microphone or an audio file. GSAP doesn't loop; instead, it pipes the frequency data to Three.js uniforms. The `SphereGeometry` or `BoxGeometry` vertices stretch outward based on bass/treble, creating a 3D oscilloscope inside the hero section. | *"audio visualizer"*, *"3d music reactive"* | yes |
