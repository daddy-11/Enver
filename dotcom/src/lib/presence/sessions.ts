/**
 * Durable activity-session tracking.
 *
 * The client sends a heartbeat (~every 30s) while the workspace tab is active.
 * Each heartbeat extends the member's live `activity_sessions` row. When the
 * gap between heartbeats exceeds HEARTBEAT_GAP_MS the session is considered
 * ended (at its last heartbeat) and the next heartbeat opens a new one. This is
 * what powers the admin "active from when to when" view.
 */

import { db } from "@/lib/db";
import { activitySessions } from "@/lib/db/schema";
import { and, eq, isNull, gte, sql } from "drizzle-orm";

/** A live session is one whose heartbeat is no older than this. */
export const HEARTBEAT_GAP_MS = 90_000;

export interface HeartbeatInput {
  userId: string;
  source?: "portal" | "ide";
  ipAddress?: string | null;
  userAgent?: string | null;
}

/**
 * Record a heartbeat. Extends the current live session, or opens a new one if
 * none is live (or the previous one went stale). Returns the active session id.
 */
export async function recordHeartbeat(input: HeartbeatInput): Promise<string> {
  const source = input.source ?? "portal";
  const cutoff = new Date(Date.now() - HEARTBEAT_GAP_MS);

  // First, close any stale-but-still-open sessions for this user.
  await closeStaleSessions(input.userId);

  // Try to extend a live session for this user + source.
  const live = await db
    .select({ id: activitySessions.id })
    .from(activitySessions)
    .where(
      and(
        eq(activitySessions.userId, input.userId),
        eq(activitySessions.source, source),
        isNull(activitySessions.endedAt),
        gte(activitySessions.lastHeartbeatAt, cutoff),
      ),
    )
    .limit(1)
    .then((r) => r[0]);

  if (live) {
    await db
      .update(activitySessions)
      .set({ lastHeartbeatAt: new Date() })
      .where(eq(activitySessions.id, live.id));
    return live.id;
  }

  const inserted = await db
    .insert(activitySessions)
    .values({
      userId: input.userId,
      source,
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null,
    })
    .returning({ id: activitySessions.id });

  return inserted[0].id;
}

/**
 * Close sessions whose last heartbeat is older than the gap, setting endedAt to
 * the last heartbeat time so reported windows reflect real activity.
 */
export async function closeStaleSessions(userId?: string): Promise<void> {
  const cutoff = new Date(Date.now() - HEARTBEAT_GAP_MS);
  const conditions = [isNull(activitySessions.endedAt), sql`${activitySessions.lastHeartbeatAt} < ${cutoff}`];
  if (userId) conditions.push(eq(activitySessions.userId, userId));

  await db
    .update(activitySessions)
    .set({ endedAt: sql`${activitySessions.lastHeartbeatAt}` })
    .where(and(...conditions));
}

/** Explicitly end the member's live session(s), e.g. on logout. */
export async function endSession(userId: string): Promise<void> {
  await db
    .update(activitySessions)
    .set({ endedAt: new Date() })
    .where(and(eq(activitySessions.userId, userId), isNull(activitySessions.endedAt)));
}
