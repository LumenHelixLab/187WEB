import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "kali",
  name: "KALI",
  tagline: "Growth + design/dev assist",
  color: "#a855f7",
  skillIds: ["seo", "revenue", "publish", "craft", "repo", "vibe"],
  overview:
    "KALI drives growth and assists CHARLOTTE with direct web design and development. She audits SEO, designs revenue systems, runs the publish gate, and contributes hands-on craft, repo, and vibe work.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function KaliPage() {
  return <AgentPage agent={agent} />;
}
