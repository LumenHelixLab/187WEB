import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content";
import { skillShowcases } from "@/lib/skill-showcase-data";

export const dynamic = "force-static";

const base = siteConfig.url.replace(/\/$/, "");

/** Static sitemap for GitHub Pages (`output: "export"`). */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "",
    "/187",
    "/about",
    "/brain",
    "/install",
    "/showcase",
    "/187plusplus",
    "/187access",
    "/187include",
    "/187create",
    "/187craft",
    "/influencer-kit",
    "/kali",
    "/charlotte",
    "/natasha",
    "/yelena",
    "/xavier",
  ];

  const skillPaths = skillShowcases.map((s) => `/187${s.id}`);

  return [...staticPaths, ...skillPaths].map((path) => ({
    url: `${base}${path === "" ? "/" : `${path}/`}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.includes("access") || path.includes("include") || path.includes("plusplus") ? 0.9 : 0.6,
  }));
}
