import 'server-only'
import { cache } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { auth } from '@/src/lib/auth'

export type Role = 'user' | 'admin'

export class AuthError extends Error {
  constructor(public readonly status: 401 | 403) {
    super(status === 401 ? 'Unauthorized' : 'Forbidden')
    this.name = 'AuthError'
  }
}

// The admin plugin stores multiple roles as a comma-separated string.
export function hasRole(user: { role?: string | null }, role: Role) {
  return (user.role ?? 'user')
    .split(',')
    .map((r) => r.trim())
    .includes(role)
}

// `fresh` bypasses the session cookie cache so role changes and bans apply immediately.
const getSession = cache(async (fresh: boolean) => {
  const session = await auth.api.getSession({
    headers: await headers(),
    query: fresh ? { disableCookieCache: true } : undefined,
  })

  if (!session?.user?.id) {
    return null
  }

  return {
    isAuth: true as const,
    userId: session.user.id,
    role: session.user.role,
    isAdmin: hasRole(session.user, 'admin'),
    user: session.user,
  }
})

export type VerifiedSession = NonNullable<Awaited<ReturnType<typeof getSession>>>

export const verifySession = cache(async () => getSession(false))

// For Server Components: redirect on missing auth.

export const requireAuth = cache(async () => {
  const session = await getSession(false)

  if (!session) {
    redirect('/sign-in')
  }

  return session
})

export const requireAdmin = cache(async () => {
  const session = await getSession(true)

  if (!session) {
    redirect('/sign-in')
  }
  if (!session.isAdmin) {
    redirect('/dashboard')
  }

  return session
})

// For Route Handlers and Server Actions: throw AuthError instead of redirecting.

export async function assertAuth() {
  const session = await getSession(false)

  if (!session) {
    throw new AuthError(401)
  }

  return session
}

export async function assertAdmin() {
  const session = await getSession(true)

  if (!session) {
    throw new AuthError(401)
  }
  if (!session.isAdmin) {
    throw new AuthError(403)
  }

  return session
}

export function handleRouteError(error: unknown, fallbackMessage = 'Internal server error') {
  if (error instanceof AuthError) {
    return NextResponse.json({ error: error.message }, { status: error.status })
  }

  console.error(fallbackMessage, error)
  return NextResponse.json({ error: fallbackMessage }, { status: 500 })
}
