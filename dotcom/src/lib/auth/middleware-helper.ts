import { NextRequest } from "next/server";

/**
 * Lightweight session check for middleware.
 * For full session validation, use auth.api.getSession() in Server Components.
 */
export async function getSessionFromRequest(req: NextRequest) {
  const token =
    req.cookies.get("better-auth.session_token")?.value ??
    req.cookies.get("__Secure-better-auth.session_token")?.value;

  return token ? { token } : null;
}
