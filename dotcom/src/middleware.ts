import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/security/rate-limit";

// Routes that require a valid session
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/apps",
];

// Routes only for unauthenticated users
const AUTH_ONLY = ["/auth/login", "/auth/signup"];

// API routes and their rate-limit preset (first match wins; order matters)
const API_RATE_LIMITS: Array<{ pattern: RegExp; preset: "api" | "auth" | "contact" | "upload" | "lounge" | "ai" }> = [
  { pattern: /^\/api\/auth/, preset: "auth" },
  { pattern: /^\/api\/contact/, preset: "contact" },
  { pattern: /^\/api\/resumes$/, preset: "upload" },
  { pattern: /^\/api\/lounge/, preset: "lounge" },
  { pattern: /^\/api\/tethys/, preset: "ai" },
  { pattern: /^\/api\//, preset: "api" },
];

// Known bad user-agent substrings — coarse bot filter
const BAD_UA_PATTERNS = [
  "sqlmap",
  "nikto",
  "masscan",
  "nmap",
  "python-requests/2", // generic scraper baseline — tune as needed
  "go-http-client/1",
  "curl/7",             // uncomment if you want to block curl in prod
].map((p) => p.toLowerCase());

function isBadBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BAD_UA_PATTERNS.some((p) => ua.includes(p));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ip = getClientIp(req as unknown as Request);

  // ── 1. Block known bad bots ──────────────────────────────────────────────
  const ua = req.headers.get("user-agent");
  if (isBadBot(ua)) {
    return new NextResponse(null, { status: 403 });
  }

  // ── 2. Rate limit API routes ─────────────────────────────────────────────
  const matchedApi = API_RATE_LIMITS.find(({ pattern }) => pattern.test(pathname));
  if (matchedApi) {
    const result = await checkRateLimit(ip, matchedApi.preset);
    if (!result.success) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: { "Retry-After": String(result.retryAfter) },
        }
      );
    }
  }

  // ── 3. Auth route protection ─────────────────────────────────────────────
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthOnly = AUTH_ONLY.some((p) => pathname.startsWith(p));

  const sessionToken =
    req.cookies.get("better-auth.session_token")?.value ??
    req.cookies.get("__Secure-better-auth.session_token")?.value;

  const hasSession = Boolean(sessionToken);

  if (isProtected && !hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthOnly && hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // ── 4. Pass through — security headers applied in next.config.ts ─────────
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match everything except:
     * - _next/static (static files — served by Next.js CDN layer)
     * - _next/image (image optimization)
     * - favicon.ico, robots.txt, sitemap.xml
     * - Public asset extensions
     */
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot)$).*)",
  ],
};
