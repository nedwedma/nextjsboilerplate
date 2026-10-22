# ⚡ Next.js Boilerplate

A modern Next.js boilerplate to launch new applications faster. It's built with Next.js 16, better-auth, Prisma ORM 7, Tailwind CSS 4 and shadcn/ui on Base UI.

## Features

- 🚀 Next.js 16 with App Router, Turbopack and `proxy.ts`
- 🔒 Authentication with [better-auth](https://www.better-auth.com) (email/password with verification, Google OAuth, admin plugin with roles, bans and impersonation)
- 🗄️ PostgreSQL with Prisma ORM 7 (`prisma-client` generator, `pg` driver adapter)
- 🎨 Tailwind CSS 4 and shadcn/ui components built on [Base UI](https://base-ui.com)
- 📧 Transactional email via Maileroo
- 🖼️ Admin image management with S3 and CloudFront, AI image generation via fal.ai
- 💬 AI chat via OpenRouter
- ⚡ SEO helpers and Markdown-based docs pages
- 🔍 TypeScript 6, ESLint 10 and Prettier

> **Stripe:** `stripe` and `@stripe/stripe-js` are preinstalled, but there is no payment integration yet.

## Requirements

- Node.js `>=22.12` (see `.nvmrc`, Node 24 recommended)
- A PostgreSQL database

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/nedwedma/nextjsboilerplate.git
   cd nextjsboilerplate
   ```

2. Install dependencies (this also runs `prisma generate` and writes the client to `src/generated/prisma`):
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
   Prisma reads `.env` via `prisma.config.ts`; Next.js reads both `.env` and `.env.local`.

4. Apply the database migrations:
   ```bash
   npm run db:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Make it your own: set app name, description, contact email and repository URL in `src/lib/site-config.ts`, replace `public/logo.svg`, and replace the Lorem ipsum texts in `/tos` and `/privacy-policy` with your legal texts.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript without emitting |
| `npm run db:migrate` | Create and apply migrations (`prisma migrate dev`) |
| `npm run db:studio` | Open Prisma Studio |
| `npm run auth:generate` | Sync the better-auth models into `prisma/schema.prisma` |

## Database workflow

- The schema lives in `prisma/schema.prisma`, the migrations in `prisma/migrations`, and the configuration (including `DATABASE_URL`) in `prisma.config.ts`.
- After changing the better-auth config or adding plugins, run `npm run auth:generate`, review the schema diff, then create a migration with `npm run db:migrate -- --name <change>`.
- Deploy migrations in production with `npx prisma migrate deploy`.

### Upgrading an existing database

The initial migration creates a unique constraint on `account (providerId, accountId)`, as required by better-auth 1.7. If you point the app at a database that already contains accounts, check for duplicates first:

```sql
SELECT "providerId", "accountId", COUNT(*)
FROM "account"
GROUP BY "providerId", "accountId"
HAVING COUNT(*) > 1;
```

For an existing database whose tables already match the schema, mark the initial migration as applied with `npx prisma migrate resolve --applied <migration_folder_name>` instead of running it.

## Authentication

- `src/lib/auth.ts` configures better-auth, `src/lib/auth-client.ts` the client.
- `src/proxy.ts` performs an optimistic check (session cookie present) and redirects unauthenticated users away from `/dashboard`, `/profile`, `/settings` and `/admin`.
- The real checks happen in the data access layer `src/lib/dal.ts`: call `requireAuth()` or `requireAdmin()` in every protected page, server action and route handler.

## Image uploads (S3 and CloudFront)

Uploads are sent without ACLs, because new S3 buckets have ACLs disabled ("Bucket owner enforced"). Make the images readable through CloudFront with Origin Access Control (recommended) or a bucket policy. The browser uploads directly to S3 with a presigned URL, so the bucket also needs a CORS rule that allows `PUT` from your site's origin.
