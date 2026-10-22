// No "server-only" import here: this module is loaded by src/lib/auth.ts, which the
// better-auth CLI evaluates outside of Next.js.
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/src/generated/prisma/client';
import { env } from '@/src/lib/env';

const prismaClientSingleton = () => {
  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// Ensure the prisma instance is reused across hot reloads in development
if (env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
