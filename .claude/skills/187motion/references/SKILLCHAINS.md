# Motion-lab skillchains

A skillchain is an ordered composition of motion-lab skills that produces one
shippable outcome. Each entry below names the skills in invocation order, the
handoff artifact passed at each step, and a worked example built from real
entries in the effect registry
([`187gsap/references/EFFECT-REGISTRY.json`](../../187gsap/references/EFFECT-REGISTRY.json)) —
not hypothetical effects.

Every chain terminates through 187MOTION's guardrail table (auto-cleanup,
reduced-motion, SSR-safe) and, before ship, through `187ACCESS+` and
`187PUBLISH`.

---

## Hero Launch

**Chain:** 187HERO → 187TYPE → 187GSAP → 187MOTION

1. **187HERO** picks the immersive layer and performance budget (WebGL
   background, gradient, or static — see `references/EFFECT-CATALOG.md` for
   the loader/atmosphere options, e.g. `/187logoload` for the entrance).
2. **187TYPE** sets the headline treatment — e.g. `/187titlewipe` for a
   typographic reveal, or `/187gravitytxt` if the brief wants something
   physical rather than clean.
3. **187GSAP** sequences the two into one entrance timeline (`gsap-timeline`
   sub-skill) with labels so the hero CTA fires on a named beat, not a fixed
   delay.
4. **187MOTION** wraps the whole sequence in `useGsapTimeline` +
   `useReducedMotion`; reduced-motion users get the final hero state with no
   tween, not a shortened one.

**Handoff artifact:** a single timeline spec (hero layer → headline reveal →
CTA entrance) with named labels, so a later chain (e.g. Page Transition
System) can hook the "CTA entrance" label as its exit trigger.

---

## Page Transition System

**Chain:** 187GSAP → 187SCROLL → 187MOTION

1. **187GSAP** owns the transition mechanic itself — most of the registry's
   transition family lives here: `/187crossfade`, `/187colwipe`,
   `/187maskwindow`, `/187cube3d` (routes to 187MODEL for the 3D variant),
   `/187shutterpage`, `/187fanoutcards`.
2. **187SCROLL** restores scroll position and re-primes any pinned
   `ScrollTrigger` instances on the incoming route — this is the step most
   transition implementations skip, and where jank actually comes from.
3. **187MOTION** ensures `ScrollTrigger.refresh()` runs after the DOM
   settles, not before, and that the outgoing page's `gsap.context()` is
   reverted before the incoming page mounts (no orphaned tweens holding a
   detached DOM node in memory).

**Handoff artifact:** the transition's `onComplete` callback signature,
documented so 187SCROLL knows exactly when it's safe to call
`ScrollTrigger.refresh()`.

---

## Scroll Narrative

**Chain:** 187SCROLL → 187TYPE → 187VIZ → 187MOTION

1. **187SCROLL** builds the pinned/scrubbed backbone —
   `/187steptime` (pinned scroll-journey timeline) or `/187seqscroll`
   (canvas frame-sequence) are the two most common spines.
2. **187TYPE** sequences copy reveals against the same scroll progress —
   `/187scrollhighlight` or `/187highlighter` for word-level emphasis timed
   to scroll position, not a fixed stagger.
3. **187VIZ** renders the data/visual payoff at the narrative's climax —
   `/187gridvisual` or `/187pixelgrid` for a lightweight DOM-based visual;
   the hybrid `/187pointcloudocean` or `/187fiberorb` if WebGL is already in
   the page's budget.
4. **187MOTION** provides the single `useScrollProgress` value all three
   consume, so the type reveal, the visual payoff, and the pin are reading
   the *same* number — a common source of narrative drift is each section
   computing its own progress independently.

**Handoff artifact:** one shared 0–1 progress value (from
`useScrollProgress`), with named ranges (e.g. `0.0–0.3` hook, `0.3–0.7`
value, `0.7–1.0` payoff) that 187TYPE and 187VIZ both read from.

---

## Product Reveal

**Chain:** 187MODEL → 187GSAP → 187MOTION

1. **187MODEL** picks the object presentation —
   `/187radial3d` (orbital carousel), `/187cylcarousel` (cylindrical), or
   `/187perspective3d` (single tilt card) depending on catalog size (many
   items → carousel; one hero product → tilt card).
2. **187GSAP** adds the supporting micro-interaction layer — hover states,
   a magnetic CTA (`/187magneticbtn`), or an entrance stagger for a grid of
   products.
3. **187MOTION** confirms `Draggable`/`InertiaPlugin` (both used by the
   carousel variants) are registered once, not per-carousel-instance, and
   that reduced-motion disables the momentum fling in favor of a plain
   click-to-advance.

**Handoff artifact:** the carousel's public API (current index, `goTo(i)`,
`onSettle` callback) so 187GSAP's micro-interactions can react to state
changes without reaching into the carousel's internals.

---

## Sonic Feedback

**Chain:** 187AUDIO → 187GSAP → 187MOTION

1. **187AUDIO** owns playback state — `/187howler` for a controllable
   player, or the hybrid `/187colorwaveaudio` when the brief wants a visual
   reactive to frequency data.
2. **187GSAP** drives any non-audio-reactive motion synced to playback
   events (`onplay`/`onend`), e.g. a progress ring or a pulse tied to the
   beat grid rather than raw frequency data.
3. **187MOTION** enforces that audio never autoplays with sound (browser
   policy plus a real accessibility concern), and that any audio-reactive
   visual has a static fallback when `prefers-reduced-motion` is set — a
   flashing/pulsing visualizer is exactly the kind of motion that guardrail
   exists to gate.

**Handoff artifact:** the current playback/frequency state object, shared
between the audio skill and whatever GSAP/visual layer reacts to it, so
there's one source of truth instead of two polling loops.

---

## Loader / Boot Sequence

**Chain:** 187HERO → 187GSAP → 187MOTION

1. **187HERO** picks the loader personality —
   `/187willemloader` (mascot-walk) or `/187logoload` (morphing logo) for
   brand-forward moments; a plain progress rail for utility contexts.
2. **187GSAP** sequences the progress mechanic itself (`gsap.to({v:0},
   {v:100, onUpdate...})` — see `components/motion/TechBootLoader.tsx`,
   which already implements this exact step).
3. **187MOTION** is non-optional here: a loader that ignores
   `prefers-reduced-motion` should resolve to `100%` immediately rather than
   force a user through a tween they explicitly asked not to see — that's
   what `TechBootLoader.tsx`'s reduced-motion branch does
   (`transform: scaleX(1)` set directly, no `gsap.to`).

**Handoff artifact:** an `onComplete` callback the loader fires once, so the
page it's blocking can mount exactly once, not race against multiple
completion signals.

---

## Adding a new chain

A chain earns a place in this file when it's used by at least two real
surfaces in the app — a one-off composition belongs in the implementing
component's own comments, not here. Name the skills in invocation order,
state the handoff artifact explicitly, and cite real registry entries (by
`/187command`) rather than inventing hypothetical ones — that's what keeps
this file from drifting out of sync with what the skills actually catalog.
