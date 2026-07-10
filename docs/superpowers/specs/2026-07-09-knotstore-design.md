# KNOTstore DB Design Spec

**Project:** 187WEB  
**Date:** 2026-07-09  
**Scope:** Phase II, step 4 — scaffold `lib/knotstore/` as the agentic data layer.

## Purpose

KNOTstore is the structured local memory layer for the Charlotte / 187WEB agent ecosystem. It persists:

- **Crawl results** — pages, entities, and claims discovered by `agent-charlotte` / `CHAR`.
- **Bidirectional wikilinks** — relationships between records so the agent can trace provenance.
- **Connection health** — latency, error rate, and last-sync state for external sources.
- **KNOT point records** — optional base64-encoded hash payloads for cryptographic point storage.

It is intentionally offline-first and file-based so the showcase runs without `DATABASE_URL`.

## Design decisions

| Decision          | Choice                                                            | Rationale                                                                                 |
| ----------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Architecture      | Adapter pattern with one `KNOTstore` class and swappable backends | Keeps consumer code simple while supporting multiple storage shapes.                      |
| Primary backend   | `better-sqlite3`                                                  | Synchronous, zero-config, widely supported on Node ≥ 18.                                  |
| KNOT point format | Base64-encoded hashes                                             | Compact, JSON-safe, easy to render in UI.                                                 |
| Hybrid mode       | One record can carry both SQL fields and an optional `knotHash`   | Lets the same logical entity have structured metadata and a cryptographic anchor.         |
| UI surface        | `/knotstore` route                                                | Mirrors the Vault template pole: trust surfaces, stat counters, connection health matrix. |

## Public API

```ts
interface KNOTstoreBackend {
  open(): void;
  close(): void;
  put(record: KNOTRecord): string; // returns id
  get(id: string): KNOTRecord | null;
  query(filter: KNOTQuery): KNOTRecord[];
  link(sourceId: string, targetId: string, meta?: LinkMeta): void;
  getLinks(id: string): { outgoing: Link[]; incoming: Link[] };
  stats(): KNOTStats;
}

interface KNOTstoreOptions {
  backend: "sqlite" | "knot-points" | "hybrid";
  path?: string; // file path for sqlite / knot-points file
}
```

### Core methods

- `open()` / `close()` — lifecycle.
- `put(record)` — insert or upsert a record; returns the record id.
- `get(id)` — fetch a single record by id.
- `query(filter)` — filter by `kind`, `source`, `tags`, date range, or full-text search on `title`/`content`.
- `link(sourceId, targetId, meta)` — create a bidirectional wikilink with optional metadata.
- `getLinks(id)` — return outgoing and incoming links for a record.
- `stats()` — counters for total records, crawl depth, entities woven, stub pages, links, and KNOT points.

## Data model

### `KNOTRecord`

```ts
type KNOTRecord = {
  id: string;
  kind: "crawl" | "entity" | "stub" | "knot-point";
  source?: string; // URL, file path, or agent name
  title?: string;
  content?: string;
  tags?: string[];
  knotHash?: string; // base64-encoded hash, present in hybrid/knot-point records
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  meta?: Record<string, unknown>;
};
```

### `KNOTLink`

```ts
type KNOTLink = {
  sourceId: string;
  targetId: string;
  rel?: string; // e.g. "cites", "defines", "parent-of"
  createdAt: string;
};
```

## Backends

### `SqliteBackend`

- Stores records in a `records` table.
- Stores links in a `links` table with indexes on `sourceId` and `targetId`.
- JSON columns for `tags` and `meta`.
- Optional `knotHash` text column for hybrid records.

### `KnotPointBackend`

- File-based key/value store (JSON lines or simple JSON object map).
- Keys are record ids; values are `{ knotHash, meta?, createdAt, updatedAt }`.
- Supports in-memory mode for tests.

### `HybridBackend`

- Delegates structured fields to `SqliteBackend`.
- Delegates `knotHash` existence/validation to `KnotPointBackend`.
- Ensures ids are consistent across both stores.

## UI surface

Route: `/knotstore`

Components (Vault-style, deep navy + mint):

- **Stat counters** — total records, crawl depth, entities woven, stub pages, links, KNOT points.
- **Connection health matrix** — rates-table pattern showing source URL, latency, error count, last sync.
- **Schema preview panel** — a read-only JSON preview of the current `KNOTRecord` and `KNOTLink` schemas.
- **Seed controls** — buttons to insert sample crawl/entity/knot-point records for demo purposes.

## Error handling

- Backend methods throw typed `KNOTstoreError` with a `code` field (`ENOENT`, `ECONFLICT`, `EINVALID`, etc.).
- The UI catches errors and renders an honest empty/error state (no fake data).
- Database-config checks are unnecessary — KNOTstore is always available because it uses local files.

## Testing strategy

- Unit tests for each backend in `lib/knotstore/__tests__/`*.
- Round-trip tests: put → get → query → link → getLinks → stats.
- Hybrid-mode tests ensure `knotHash` survives all operations.
- UI preview tests verify stat counters update after seeding.

## Files to create

```text
lib/knotstore/
├─ index.ts            # public API + KNOTstore class
├─ types.ts            # shared TypeScript types
├─ errors.ts           # KNOTstoreError
├─ backends/
│  ├─ base.ts          # abstract backend interface
│  ├─ sqlite.ts        # better-sqlite3 backend
│  ├─ knot-points.ts   # hash-based backend
│  └─ hybrid.ts        # combined backend
├─ __tests__/
│  ├─ sqlite.test.ts
│  ├─ knot-points.test.ts
│  └─ hybrid.test.ts
└─ README.md           # consumer usage guide

app/knotstore/
├─ page.tsx            # Vault-style preview panel
└─ layout.tsx          # route metadata
```

## Dependencies

- `better-sqlite3` — SQLite backend.
- `zod` — runtime validation for records (already in project).

## Open questions

None at spec time. All decisions captured above.

## Approval

Spec approved by user on 2026-07-09.
