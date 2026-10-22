import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

const protectedPrefixes = ["/dashboard", "/profile", "/settings", "/admin"];

// Optimistic check only (cookie presence). Session validity and roles are
// enforced in the DAL (src/lib/dal.ts) via requireAuth()/requireAdmin().
// Auth routes are intentionally not redirected here: a stale cookie would
// otherwise make /sign-in unreachable.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtectedRoute && !getSessionCookie(request)) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
