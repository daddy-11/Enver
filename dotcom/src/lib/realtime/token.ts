/**
 * Mint short-lived Supabase-compatible JWTs for team members.
 *
 * Clients never hold the Supabase service-role key. They request a token from
 * /api/realtime/token (after passing the team guard); this token is signed with
 * the project's JWT secret and lets the browser authenticate to Supabase
 * Realtime channels with the `authenticated` role. Realtime Authorization
 * policies then scope which channels the token may access.
 */

import { SignJWT } from "jose";

const TOKEN_TTL_SECONDS = 60 * 60; // 1 hour

export interface RealtimeTokenClaims {
  userId: string;
  email: string;
  role: "founder" | "engineer";
}

export async function mintRealtimeToken(claims: RealtimeTokenClaims): Promise<{ token: string; expiresIn: number }> {
  const secret = process.env.SUPABASE_JWT_SECRET;
  if (!secret) {
    throw new Error("SUPABASE_JWT_SECRET is not configured.");
  }

  const key = new TextEncoder().encode(secret);
  const nowSeconds = Math.floor(Date.now() / 1000);

  const token = await new SignJWT({
    // Supabase expects the auth role here; "authenticated" satisfies RLS/Realtime.
    role: "authenticated",
    sub: claims.userId,
    email: claims.email,
    team_role: claims.role,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(nowSeconds)
    .setExpirationTime(nowSeconds + TOKEN_TTL_SECONDS)
    .sign(key);

  return { token, expiresIn: TOKEN_TTL_SECONDS };
}
