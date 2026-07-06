import { PrismaClient } from "@prisma/client";

/**
 * Lazily-created Prisma singleton.
 *
 * Returns `null` when `DATABASE_URL` is not configured so the app can run in
 * "preview mode" — the showcase renders and the lead form acknowledges
 * submissions without a database. This keeps the very first `npm run dev`
 * frictionless while still being a real persistence layer once you wire a DB.
 *
 * The singleton avoids exhausting connections during Next.js hot-reload.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getPrisma(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }
  return globalForPrisma.prisma;
}

/** Whether a database is configured. Used to show honest UI/preview states. */
export const isDatabaseConfigured = (): boolean => Boolean(process.env.DATABASE_URL);

/**
 * Lead count for the social-proof counter. Never throws: returns `null` when
 * there's no database (or a query fails) so server components can render
 * statically without a DB at build time.
 */
export async function safeLeadCount(): Promise<number | null> {
  const prisma = getPrisma();
  if (!prisma) return null;
  try {
    return await prisma.lead.count();
  } catch {
    return null;
  }
}
