import { KNOTstoreBackend, KNOTstoreOptions } from "./types";
import { SqliteBackend } from "./backends/sqlite";
import { KnotPointBackend } from "./backends/knot-points";
import { HybridBackend } from "./backends/hybrid";
import { KNOTstoreError } from "./errors";

export * from "./types";
export * from "./errors";

export function KNOTstore(options: KNOTstoreOptions): KNOTstoreBackend {
  switch (options.backend) {
    case "sqlite":
      return new SqliteBackend(options.path ?? "knotstore.db");
    case "knot-points":
      return new KnotPointBackend(options.path ?? "knotstore.jsonl");
    case "hybrid":
      return new HybridBackend(
        (options.path ?? "knotstore") + ".db",
        (options.path ?? "knotstore") + ".jsonl",
      );
    default:
      throw new KNOTstoreError(
        "EINVALID",
        `Unknown backend: ${(options as KNOTstoreOptions).backend}`,
      );
  }
}
