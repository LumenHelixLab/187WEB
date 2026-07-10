import { z } from "zod";

export const RecordKindSchema = z.enum(["crawl", "entity", "stub", "knot-point"]);
export type RecordKind = z.infer<typeof RecordKindSchema>;

export const KNOTRecordSchema = z.object({
  id: z.string().min(1),
  kind: RecordKindSchema,
  source: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  tags: z.array(z.string()).optional(),
  knotHash: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  meta: z.record(z.unknown()).optional(),
});
export type KNOTRecord = z.infer<typeof KNOTRecordSchema>;

export const KNOTLinkSchema = z.object({
  sourceId: z.string().min(1),
  targetId: z.string().min(1),
  rel: z.string().optional(),
  createdAt: z.string().datetime(),
});
export type KNOTLink = z.infer<typeof KNOTLinkSchema>;

export const KNOTStatsSchema = z.object({
  totalRecords: z.number().int().min(0),
  crawlDepth: z.number().int().min(0),
  entitiesWoven: z.number().int().min(0),
  stubPages: z.number().int().min(0),
  links: z.number().int().min(0),
  knotPoints: z.number().int().min(0),
});
export type KNOTStats = z.infer<typeof KNOTStatsSchema>;

export const KNOTQuerySchema = z.object({
  kind: RecordKindSchema.optional(),
  source: z.string().optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().optional(),
  limit: z.number().int().min(1).optional(),
});
export type KNOTQuery = z.infer<typeof KNOTQuerySchema>;

export interface KNOTstoreBackend {
  open(): void;
  close(): void;
  put(record: KNOTRecord): string;
  get(id: string): KNOTRecord | null;
  query(filter: KNOTQuery): KNOTRecord[];
  link(sourceId: string, targetId: string, meta?: { rel?: string }): void;
  getLinks(id: string): { outgoing: KNOTLink[]; incoming: KNOTLink[] };
  stats(): KNOTStats;
}

export interface KNOTstoreOptions {
  backend: "sqlite" | "knot-points" | "hybrid";
  path?: string;
}
