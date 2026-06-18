/**
 * Server-side access guards for the internal workspace.
 *
 * Every internal route handler and server component calls one of these. They
 * re-verify the full Better Auth session on the server (a session cookie alone,
 * as checked in middleware, is necessary but not sufficient) and then enforce
 * team membership and, where required, the founder role.
 */

import { headers as nextHeaders } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { isTeamMemberEmail, rosterEntry, normalizeEmail } from "./roster";
import type { TeamRole } from "@/lib/db/schema";

export interface TeamContext {
  userId: string;
  email: string;
  displayName: string;
  role: TeamRole;
}

export class AccessError extends Error {
  constructor(public status: 401 | 403, message: string) {
    super(message);
    this.name = "AccessError";
  }
}

/**
 * Resolve the current team context, or throw AccessError.
 *
 * @param hdrs Pass `req.headers` from a route handler; omit in a server
 *             component to read the incoming request headers automatically.
 */
export async function requireTeamMember(hdrs?: Headers): Promise<TeamContext> {
  const session = await auth.api.getSession({ headers: hdrs ?? (await nextHeaders()) });
  if (!session?.user?.email) {
    throw new AccessError(401, "Authentication required.");
  }

  const email = normalizeEmail(session.user.email);
  if (!isTeamMemberEmail(email)) {
    throw new AccessError(403, "Not a member of the enveraitech.in team.");
  }

  // The DB row is authoritative for active/role once seeded; the roster is the
  // fallback so the gate works before/while the row exists.
  const row = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.email, email))
    .limit(1)
    .then((r) => r[0])
    .catch(() => undefined);

  if (row && row.active === false) {
    throw new AccessError(403, "Team membership is inactive.");
  }

  const seed = rosterEntry(email);
  return {
    userId: session.user.id,
    email,
    displayName: row?.displayName ?? seed?.displayName ?? session.user.name ?? email,
    role: (row?.role as TeamRole) ?? seed?.role ?? "engineer",
  };
}

/** Like requireTeamMember, but additionally requires the founder role. */
export async function requireFounder(hdrs?: Headers): Promise<TeamContext> {
  const ctx = await requireTeamMember(hdrs);
  if (ctx.role !== "founder") {
    throw new AccessError(403, "Founder access required.");
  }
  return ctx;
}

/**
 * Helper for API route handlers: run a guard and convert AccessError into a
 * Response. Returns either { ctx } on success or { response } to return early.
 */
export async function guardRoute(
  guard: (hdrs?: Headers) => Promise<TeamContext>,
  hdrs: Headers,
): Promise<{ ctx: TeamContext; response?: never } | { ctx?: never; response: Response }> {
  try {
    const ctx = await guard(hdrs);
    return { ctx };
  } catch (err) {
    if (err instanceof AccessError) {
      return {
        response: new Response(JSON.stringify({ error: err.message }), {
          status: err.status,
          headers: { "Content-Type": "application/json" },
        }),
      };
    }
    throw err;
  }
}
