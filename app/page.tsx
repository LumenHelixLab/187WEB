import type { Metadata } from "next";
import { Showcase } from "@/components/showcase/Showcase";

export const metadata: Metadata = {
  title: "187SUITE — Killer Web Design Solutions",
  description:
    "187REPO orchestrates, 187CRAFT designs, 187VIBE delights, and 187LAUNCH ships. The short-name command surface for the 187web ecosystem.",
  openGraph: {
    title: "187SUITE — Killer Web Design Solutions",
    description: "187REPO orchestrates, 187CRAFT designs, 187VIBE delights, and 187LAUNCH ships.",
  },
};

export default function HomePage() {
  return <Showcase />;
}
