import type { Metadata } from "next";
import { LaunchPage } from "@/components/launch/LaunchPage";

// Release-surface roster: 187REPO 187CRAFT 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187QUANTUM 187CHAIN

export const metadata: Metadata = {
  title: "187WEB — A killer AI-powered web suite",
  description:
    "187WEB is a command-driven AI web suite. Use /187 craft, /187 seo, /187 launch, /187 research, and more to generate landing pages, design systems, docs, and research artifacts.",
  openGraph: {
    title: "187WEB — A killer AI-powered web suite",
    description:
      "Command-driven AI webcraft. One /187 surface for pages, design systems, docs, research labs, and publish gates.",
  },
};

export default function HomePage() {
  return <LaunchPage />;
}
