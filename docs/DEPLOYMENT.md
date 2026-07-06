# Deployment

The app is a standard Next.js 15 application with a Prisma/Postgres backend. Two well-trodden paths: **Vercel** and **Docker**.

## Environment variables

| Variable               | Required | Notes |
|------------------------|----------|-------|
| `DATABASE_URL`         | For persistence | Postgres connection string. Unset ⇒ preview mode (no writes). |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL for absolute OG/metadata links, e.g. `https://187webdesign.com`. |

## Option A — Vercel

1. Push this repo to GitHub and **import** it in Vercel.
2. Provision Postgres (Vercel Postgres, [Neon](https://neon.tech), or [Supabase](https://supabase.com)).
3. Add `DATABASE_URL` and `NEXT_PUBLIC_SITE_URL` in **Project → Settings → Environment Variables**.
4. Deploy. The build runs `prisma generate && next build` automatically.
5. Apply the schema to your production database:

   ```bash
   # locally, pointed at the production DATABASE_URL
   npx prisma migrate deploy   # if using migrations
   # or, for prototypes:
   npx prisma db push
   ```

> Tip: create migrations during development with `npm run db:migrate` so production can run `prisma migrate deploy` deterministically.

## Option B — Docker

The included multi-stage `Dockerfile` produces a lean standalone image (`output: "standalone"` in `next.config.mjs`).

```bash
# build
docker build -t 187webdesign .

# run (point at any reachable Postgres)
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public" \
  -e NEXT_PUBLIC_SITE_URL="https://your-domain.com" \
  187webdesign
```

For a self-contained local stack, run the bundled Postgres alongside it:

```bash
docker compose up -d                 # Postgres on :5432
docker build -t 187webdesign .
docker run --network host \
  -e DATABASE_URL="postgresql://postgres:postgres@localhost:5432/onep8seven?schema=public" \
  187webdesign
```

(Then run `npm run db:push` once against that database to create tables.)

## Database migrations

- **Prototyping:** `npm run db:push` syncs the schema without migration files.
- **Production:** commit migrations (`npm run db:migrate` in dev creates them) and run `npx prisma migrate deploy` on release.

## Health checks

Point your platform's health check at:

```
GET /api/health  →  { "status": "ok", "database": "configured" | "preview", "timestamp": "..." }
```

## Pre-deploy checklist

Before shipping, run the [pre-ship audit](../.claude/skills/187webdesign/references/CHECKLIST.md) and verify:

- `npm run lint && npm run typecheck && npm run build` all pass (CI does this too).
- `DATABASE_URL` and `NEXT_PUBLIC_SITE_URL` are set in the target environment.
- The schema has been applied to the production database.
- A Lighthouse pass on the deployed URL clears Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1).
