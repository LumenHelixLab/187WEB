import type { Metadata } from "next";
import Link from "next/link";
import { ProductShell } from "@/components/launch/ProductShell";
import { LocalBrainPage } from "@/components/brain/LocalBrainPage";

export const metadata: Metadata = {
  title: "Local Brain & Obsidian — 187WEB",
  description:
    "How 187WEB’s local brain, Obsidian vault, NATASHA modules, and command triggers work together for offline-first agentic work.",
};

export default function BrainRoutePage() {
  return (
    <ProductShell>
      <LocalBrainPage />
      <div className="border-t border-white/10 px-6 py-10 text-center text-sm text-white/45">
        <Link href="/187" className="text-[#39FF14] underline-offset-2 hover:underline">
          ← Back to /187 command reference
        </Link>
      </div>
    </ProductShell>
  );
}
