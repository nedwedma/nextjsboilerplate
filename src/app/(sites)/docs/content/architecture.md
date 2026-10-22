# Architecture Overview

This document provides an overview of the architecture and design principles of the boilerplate.

## Core Technologies

- **Next.js 16**: App Router, Server Components, Turbopack and `proxy.ts` (formerly `middleware.ts`).
- **React 19** and **TypeScript 6**.
- **better-auth**: Email/password authentication with email verification, Google OAuth and the admin plugin (roles, bans, impersonation).
- **Prisma ORM 7**: PostgreSQL via the `@prisma/adapter-pg` driver adapter. The client is generated into `src/generated/prisma`.
- **Tailwind CSS 4** with **shadcn/ui** components built on **Base UI**.
- **Maileroo** for transactional email, **S3/CloudFront** for image storage, **fal.ai** and **OpenRouter** for AI features.

## Project Structure

```
.
├── prisma/
│   ├── schema.prisma     # Database schema (better-auth models + app models)
│   └── migrations/       # SQL migrations
├── prisma.config.ts      # Prisma CLI configuration (schema, migrations, DATABASE_URL)
├── public/               # Static assets
└── src/
    ├── app/
    │   ├── (auth)/       # Sign-in, sign-up, password reset, email verification
    │   ├── (main)/       # Landing page sections
    │   ├── (protected)/  # Dashboard and admin pages (require a session)
    │   ├── (sites)/      # Content pages such as the docs
    │   ├── actions/      # Server actions
    │   └── api/          # Route handlers (auth, contact, admin images, AI)
    ├── components/
    │   ├── admin/        # Admin dashboard components
    │   ├── navigation/   # Header, user menu, mobile menu
    │   ├── reusable/     # Shared feature components (e.g. contact form)
    │   └── ui/           # shadcn/ui components
    ├── generated/        # Generated Prisma client (not committed)
    ├── lib/              # auth, dal, prisma, email, s3, validation schemas
    └── proxy.ts          # Optimistic route protection
```

## App Router Structure

- **Route Groups**: Folders in parentheses like `(auth)` and `(protected)` organize the code without affecting the URL.
- **Layouts**: Shared UI per section in `layout.tsx`. Layouts are not used for authorization (see below).
- **Pages**: Each route has a `page.tsx` that defines its content.

## Authentication Flow

Authentication is handled by better-auth (`src/lib/auth.ts` on the server, `src/lib/auth-client.ts` in the browser). All auth endpoints are served by the catch-all route `src/app/api/auth/[...all]`.

Route protection has two layers:

1. **Proxy (optimistic)**: `src/proxy.ts` only checks whether a session cookie exists and redirects to `/sign-in` for `/dashboard`, `/profile`, `/settings` and `/admin`. It does not hit the database.
2. **Data Access Layer (authoritative)**: `src/lib/dal.ts` validates the session against the database. Every protected page, server action and route handler calls `requireAuth()` or `requireAdmin()` itself.

Checks live in pages and handlers rather than layouts, because layouts are not re-rendered on client-side navigation and do not prevent nested segments from rendering.

## Email

`src/lib/email.ts` exposes `sendEmail()`, which calls the Maileroo API directly. It is used by better-auth (verification, password reset, email change) and by the contact form. There is no public email endpoint.

## Styling Approach

1. **Utility-First**: Styling is done with Tailwind utility classes in JSX.
2. **Design Tokens**: Theme colors are CSS variables in `src/app/globals.css`, exposed to Tailwind via `@theme inline`.
3. **Component Classes**: The `cn()` helper merges classes; variants use `class-variance-authority`.
4. **Responsive Design**: Mobile-first with responsive breakpoints.

## API Structure

1. **Route Handlers**: Endpoints live in `src/app/api`.
2. **Authentication**: Protected endpoints verify the session (and role) on every request.
3. **Validation**: Request bodies are validated with Zod schemas from `src/lib/zod.ts`.
4. **Error Handling**: Errors are returned as `{ error: string }` with a matching status code.

## Security Considerations

1. **Authentication**: Sessions are managed by better-auth with HTTP-only cookies.
2. **Authorization**: Enforced in the DAL, not only in the proxy or the UI.
3. **Input Validation**: Server-side validation of user input; user content in emails is HTML-escaped.
4. **Security Headers**: HSTS, `X-Frame-Options`, `X-Content-Type-Options` and `Referrer-Policy` are set in `next.config.ts`.
5. **Dependency Scanning**: Run `npm audit` regularly.
