import type { Metadata } from "next";
import { Showcase } from "@/components/showcase/Showcase";

export const metadata: Metadata = {
  title: "Live demo — killer design in motion",
  description:
    "An immersive, animated demo of the 187webDESIGN skill — kinetic type, generative canvas, self-drawing SVG, 3D tilt, and magnetic micro-interactions.",
};

// The GitHub Pages showcase: a self-contained, client-animated experience.
// Deliberately distinct from the README and docs — this page is the proof.
export default function HomePage() {
  return <Showcase />;
}
