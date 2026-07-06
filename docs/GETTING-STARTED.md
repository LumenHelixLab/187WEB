# Getting started

This guide takes you from a fresh clone to a running app, with and without a database.

## Prerequisites

- **Node.js ≥ 18.18** (20 LTS recommended) and **npm**.
- **Docker** (optional) — only needed if you want a local PostgreSQL.

Check your versions:

```bash
node -v
npm -v
```

## 1. Install dependencies

```bash
npm install
```

This also runs `prisma generate` indirectly the first time you build. To generate the Prisma client explicitly:

```bash
npx prisma generate
```

## 2. Run it (preview mode — no database)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Everything works:

- the full showcase renders,
- the lead form submits and gets a friendly "preview mode" acknowledgement,
- `/api/health` reports `"database": "preview"`.

This is the fastest way to look around. When you're ready to persist data, add a database.

## 3. Add a database (optional)

### Option A — local Postgres via Docker (recommended)

```bash
cp .env.example .env          # DATABASE_URL already points at the compose DB
docker compose up -d          # start Postgres on localhost:5432
npm run db:push               # create tables from prisma/schema.prisma
npm run db:seed               # optional: a few sample leads
npm run dev
```

Now submissions persist, and the social-proof counter reflects real rows.

### Option B — a hosted Postgres

Use [Neon](https://neon.tech), [Supabase](https://supabase.com), [Vercel Postgres](https://vercel.com/storage/postgres), or any Postgres. Put its connection string in `.env`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB?schema=public&sslmode=require"
```

Then:

```bash
npm run db:push      # for prototyping
# or, for tracked migrations:
npm run db:migrate
```

## Everyday commands

| Task                      | Command |
|---------------------------|---------|
| Dev server                | `npm run dev` |
| Lint                      | `npm run lint` |
| Typecheck                 | `npm run typecheck` |
| Format                    | `npm run format` |
| Inspect data              | `npm run db:studio` |
| Production build (local)  | `npm run build && npm start` |

## Environment variables

| Variable              | Required | Purpose |
|-----------------------|----------|---------|
| `DATABASE_URL`        | No*      | Postgres connection string. Unset ⇒ preview mode. |
| `NEXT_PUBLIC_SITE_URL`| No       | Canonical URL used for absolute OG/metadata links. Defaults to `http://localhost:3000`. |

\* Not required to run the demo, but required to persist leads.

## Troubleshooting

- **`Can't reach database server`** — is `docker compose up -d` running? Does `DATABASE_URL` match `docker-compose.yml`?
- **Prisma client errors after editing the schema** — run `npx prisma generate` (and `npm run db:push`).
- **Fonts fail to download during build** — `next/font` fetches Google Fonts at build time; ensure the build environment has network access, or switch to `next/font/local` with bundled files.

Next: [Architecture](./ARCHITECTURE.md) · [Design system](./DESIGN-SYSTEM.md).
