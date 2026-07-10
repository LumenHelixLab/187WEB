"use server";

import { KNOTstore } from "@/lib/knotstore";
import { previewPath } from "@/lib/knotstore/preview";
import { KNOTRecord } from "@/lib/knotstore/types";

export async function seedKnotstore() {
  const store = KNOTstore({ backend: "hybrid", path: previewPath });
  store.open();

  const now = new Date().toISOString();

  const crawl: KNOTRecord = {
    id: "seed-crawl-1",
    kind: "crawl",
    source: "187web.dev",
    title: "Homepage crawl",
    content: "Sample homepage crawl record.",
    tags: ["home"],
    createdAt: now,
    updatedAt: now,
    meta: { depth: 1 },
  };

  const entity: KNOTRecord = {
    id: "seed-entity-1",
    kind: "entity",
    source: "vault",
    title: "Sample entity",
    content: "A woven entity node.",
    tags: ["entity"],
    knotHash: "knot-abc",
    createdAt: now,
    updatedAt: now,
  };

  const knot: KNOTRecord = {
    id: "seed-knot-1",
    kind: "knot-point",
    source: "vault",
    title: "KNOT anchor",
    content: "A KNOT point anchor.",
    tags: ["anchor"],
    knotHash: "knot-abc",
    createdAt: now,
    updatedAt: now,
  };

  store.put(crawl);
  store.put(entity);
  store.put(knot);
  store.link(entity.id, knot.id, { rel: "anchors" });

  const stats = store.stats();
  const records = store.query({ limit: 10 });
  store.close();

  return { stats, records };
}
