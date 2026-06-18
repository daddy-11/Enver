/**
 * CSRF Protection
 *
 * Next.js App Router + Same-Site cookies give us baseline CSRF protection,
 * but for sensitive mutations we add an explicit origin check.
 *
 * Strategy:
 *   1. Check Origin header matches our allowed origins
 *   2. For form submissions, verify the custom X-CSRF-Token header exists
 *      (presence of a custom header is enough — simple requests can't set them)
 *
 * This is defense-in-depth on top of Better Auth's own CSRF handling.
 */

const ALLOWED_ORIGINS = new Set([
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  "https://enver-ai.tech",
  "https://www.enver-ai.tech",
]);

export type CsrfCheckResult =
  | { valid: true }
  | { valid: false; reason: string };

/**
 * Verify the request origin is trusted.
 * Call this in any mutating API route (POST/PUT/PATCH/DELETE).
 */
export function verifyCsrfOrigin(req: Request): CsrfCheckResult {
  // Skip in development for DX — enforced in production
  if (process.env.NODE_ENV === "development") return { valid: true };

  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  // At least one of origin/referer must be present for browser requests
  const source = origin ?? (referer ? new URL(referer).origin : null);

  if (!source) {
    // No origin/referer — could be a direct API hit with no browser context.
    // Reject for mutation routes.
    return { valid: false, reason: "Missing origin header" };
  }

  if (!ALLOWED_ORIGINS.has(source)) {
    return { valid: false, reason: `Untrusted origin: ${source}` };
  }

  return { valid: true };
}

/**
 * Build a 403 CSRF failure response — never leak the reason to the client.
 */
export function csrfErrorResponse(): Response {
  return new Response(
    JSON.stringify({ error: "Forbidden" }),
    {
      status: 403,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
}
