import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/middleware-helper";

// Routes that require authentication
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/apps/orange-farm",
  "/apps/resume-comparer",
];

// Routes only accessible when NOT authenticated
const AUTH_ONLY_ROUTES = ["/auth/login", "/auth/signup"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isAuthRoute = AUTH_ONLY_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // Get session cookie (Better Auth uses "__Secure-better-auth.session_token" in prod)
  const sessionToken =
    req.cookies.get("better-auth.session_token")?.value ??
    req.cookies.get("__Secure-better-auth.session_token")?.value;

  const hasSession = Boolean(sessionToken);

  // Redirect unauthenticated users away from protected routes
  if (isProtected && !hasSession) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth-only routes
  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder assets
     * - API auth routes (handled by Better Auth)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
