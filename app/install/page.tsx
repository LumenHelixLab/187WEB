import type { Metadata } from "next";
import { ProductShell } from "@/components/launch/ProductShell";
import { InstallPageClient } from "@/components/install/InstallPageClient";

export const metadata: Metadata = {
  title: "Install 187WEB",
  description:
    "Preflight, CLI install, curated packs, and onboarding for 187WEB skills, agents, modules, and local brain.",
};

export default function InstallPage() {
  return (
    <ProductShell>
      <InstallPageClient />
    </ProductShell>
  );
}
