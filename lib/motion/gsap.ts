import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Observer } from "gsap/Observer";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

let registered = false;

/**
 * Core plugin set — safe to call from every motion-lab component regardless
 * of which effect it implements. Kept deliberately small: ScrollTrigger and
 * Flip cover the majority of the 187GSAP/187SCROLL catalog, and
 * Draggable/InertiaPlugin/Observer are near-universal companions to them.
 */
export function registerGsap() {
  if (typeof window === "undefined") return;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger, Flip, Draggable, InertiaPlugin, Observer);
    registered = true;
  }
}

let advancedRegistered = false;

/**
 * Opt-in plugin set for the less-common patterns (SplitText/Scramble for
 * 187TYPE's scramble/mask family, SVG plugins for draw/morph transitions,
 * MotionPathPlugin for scroll-scrubbed path followers, Physics2DPlugin for
 * `/187gravitytxt` and `/187confetti`-style bursts). Call this only from a
 * component that actually uses one of these — registering it globally would
 * make every page pay for plugins most of them never touch.
 */
export function registerAdvancedGsapPlugins() {
  if (typeof window === "undefined") return;
  if (!advancedRegistered) {
    gsap.registerPlugin(
      CustomEase,
      SplitText,
      ScrambleTextPlugin,
      DrawSVGPlugin,
      MorphSVGPlugin,
      MotionPathPlugin,
      Physics2DPlugin,
    );
    advancedRegistered = true;
  }
}

export {
  gsap,
  Flip,
  ScrollTrigger,
  Draggable,
  InertiaPlugin,
  Observer,
  CustomEase,
  SplitText,
  ScrambleTextPlugin,
  DrawSVGPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  Physics2DPlugin,
};
