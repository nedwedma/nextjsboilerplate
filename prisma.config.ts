import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // process.env instead of env(): `prisma generate` runs on postinstall and must not require a database URL
    url: process.env.DATABASE_URL,
  },
});
