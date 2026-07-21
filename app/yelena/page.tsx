import type { Metadata } from "next";
import { AgentPage } from "@/components/launch/AgentPage";
import { yelenaKit } from "@/lib/agents/yelena-kit";

export const metadata: Metadata = {
  title: `${yelenaKit.name} — 187WEB Agent`,
  description: yelenaKit.overview,
};

export default function YelenaPage() {
  return <AgentPage agent={yelenaKit} />;
}
