/**
 * Seed a few sample leads so `prisma studio` and the social-proof counter
 * have something to show on a fresh database. Safe to run repeatedly.
 *
 *   npm run db:seed
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sample = [
  { email: "ada@example.com", message: "Love the blueprint hero.", source: "seed" },
  { email: "grace@example.com", message: "Finally a starter that respects CWV.", source: "seed" },
  { email: "linus@example.com", source: "seed" },
];

async function main() {
  for (const lead of sample) {
    await prisma.lead.upsert({
      where: { email: lead.email },
      update: {},
      create: lead,
    });
  }
  const count = await prisma.lead.count();
  console.log(`Seed complete. ${count} lead(s) in the database.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
