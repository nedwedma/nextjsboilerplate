// Grants the admin role to an existing user: npm run db:make-admin -- user@example.com
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();
  if (!email) {
    console.error("Usage: npm run db:make-admin -- <email>");
    process.exit(1);
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.error(`No user found with email ${email}. Sign up first, then run this script.`);
      process.exit(1);
    }

    const roles = new Set((user.role ?? "user").split(",").map((r) => r.trim()).filter(Boolean));
    roles.add("admin");

    await prisma.user.update({
      where: { id: user.id },
      data: { role: [...roles].join(",") },
    });
    // Existing sessions keep the old role in the cookie cache for up to 5 minutes.
    console.log(`${email} is now an admin.`);
  } finally {
    await prisma.$disconnect();
  }
}

main();
