import 'server-only'
import { cache } from 'react'
import { auth } from '@/src/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const verifySession = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user?.id) {
    return null
  }

  return { 
    isAuth: true, 
    userId: session.user.id,
    role: session.user.role,
    user: session.user
  }
})

export const requireAuth = cache(async () => {
  const session = await verifySession()
  
  if (!session) {
    redirect('/sign-in')
  }
  
  return session
})

export const requireAdmin = cache(async () => {
  const session = await requireAuth()
  
  if (session.role !== 'admin') {
    redirect('/dashboard') // or throw error
  }
  
  return session
}) 