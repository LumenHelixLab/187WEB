"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export { HeroScene } from "./HeroScene";
export { KineticType } from "./KineticType";
export { ProductViewer } from "./ProductViewer";
export { ScrollNarrative } from "./ScrollNarrative";
export { AudioMesh } from "./AudioMesh";
export { NetworkViz } from "./NetworkViz";
export { MotionHooksDemo } from "./MotionHooksDemo";

export interface DemoMeta {
  id: string;
  title: string;
  description: string;
  component: ComponentType;
}

export const demos: DemoMeta[] = [
  {
    id: "hero",
    title: "Immersive hero",
    description: "Mouse-parallax shards and slow orbital rings with a GSAP entrance.",
    component: dynamic(() => import("./HeroScene").then((mod) => mod.HeroScene), { ssr: false }),
  },
  {
    id: "kinetic",
    title: "Kinetic type",
    description: "3D typography staggered in with GSAP and reduced-motion fallback.",
    component: dynamic(() => import("./KineticType").then((mod) => mod.KineticType), { ssr: false }),
  },
  {
    id: "product",
    title: "Product viewer",
    description: "Procedural device built from primitives: drag, rotate, and explode.",
    component: dynamic(() => import("./ProductViewer").then((mod) => mod.ProductViewer), { ssr: false }),
  },
  {
    id: "narrative",
    title: "Scroll narrative",
    description: "ScrollTrigger-driven camera and object choreography across the page.",
    component: dynamic(() => import("./ScrollNarrative").then((mod) => mod.ScrollNarrative), { ssr: false }),
  },
  {
    id: "audio",
    title: "Audio mesh",
    description: "Web Audio oscillator drives an instanced mesh visualization.",
    component: dynamic(() => import("./AudioMesh").then((mod) => mod.AudioMesh), { ssr: false }),
  },
  {
    id: "network",
    title: "Network graph",
    description: "Instanced nodes and line edges in a web/honeycomb-like layout.",
    component: dynamic(() => import("./NetworkViz").then((mod) => mod.NetworkViz), { ssr: false }),
  },
  {
    id: "hooks",
    title: "Motion hooks",
    description: "Spring, loop, stagger, and scrub primitives from the 187WEB motion library.",
    component: dynamic(() => import("./MotionHooksDemo").then((mod) => mod.MotionHooksDemo), { ssr: false }),
  },
  {
    id: "magnetic",
    title: "Magnetic mascot",
    description: "Cursor pull on the badge and wireframe marks with proximity glow.",
    component: dynamic(() => import("./MagneticMascot").then((mod) => mod.MagneticMascot), { ssr: false }),
  },
  {
    id: "flip",
    title: "Flip layout",
    description: "Triangle grid morphs into a lockup + full mascot detail panel.",
    component: dynamic(() => import("./FlipPageSampler").then((mod) => mod.FlipPageSampler), { ssr: false }),
  },
  {
    id: "scroll-reveal",
    title: "Scroll brand stack",
    description: "Wireframe, wordmark, and badge reveal as you scroll inside the card.",
    component: dynamic(() => import("./ScrollRevealSampler").then((mod) => mod.ScrollRevealSampler), {
      ssr: false,
    }),
  },
];
