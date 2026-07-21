import type { Metadata } from "next";
import { AgentPage } from "@/components/launch/AgentPage";
import { charlotteKit } from "@/lib/agents/charlotte-kit";

export const metadata: Metadata = {
  title: `${charlotteKit.name} — 187WEB Agent`,
  description: charlotteKit.overview,
};

export default function CharlottePage() {
  return <AgentPage agent={charlotteKit} />;
}
