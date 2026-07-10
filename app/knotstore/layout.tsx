import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KNOTstore — 187WEB agent memory",
  description: "Vault-style preview of the 187WEB KNOTstore data layer.",
};

export default function KnotstoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
