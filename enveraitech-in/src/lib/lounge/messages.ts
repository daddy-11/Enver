/**
 * Lounge message persistence.
 *
 * Messages are the durable source of truth in Postgres. Live delivery to other
 * clients is handled separately by Supabase Realtime (see lib/realtime). This
 * module only reads/writes rows and validates input.
 */

import { z } from "zod";
import { db } from "@/lib/db";
import { loungeMessages, loungeRooms, users, teamMembers } from "@/lib/db/schema";
import { and, asc, desc, eq, isNull, lt } from "drizzle-orm";

export const MessageInputSchema = z.object({
  roomId: z.string().uuid("Invalid room id"),
  content: z.string().trim().min(1, "Message is empty").max(2000, "Message too long (max 2000)"),
});

export interface LoungeMessageView {
  id: string;
  roomId: string;
  userId: string;
  authorName: string;
  authorColor: string;
  content: string;
  createdAt: string;
}

/** Resolve the default "general" room, creating it if missing. */
export async function getGeneralRoom(): Promise<{ id: string; name: string; meetUrl: string | null }> {
  const existing = await db
    .select()
    .from(loungeRooms)
    .where(eq(loungeRooms.name, "general"))
    .limit(1)
    .then((r) => r[0]);
  if (existing) return { id: existing.id, name: existing.name, meetUrl: existing.meetUrl };

  const created = await db
    .insert(loungeRooms)
    .values({ name: "general", meetUrl: process.env.LOUNGE_MEET_URL ?? null })
    .returning();
  return { id: created[0].id, name: created[0].name, meetUrl: created[0].meetUrl };
}

export async function listRooms() {
  return db.select().from(loungeRooms).orderBy(asc(loungeRooms.createdAt));
}

function toView(row: {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  createdAt: Date;
  authorName: string | null;
  authorColor: string | null;
}): LoungeMessageView {
  return {
    id: row.id,
    roomId: row.roomId,
    userId: row.userId,
    authorName: row.authorName ?? "Member",
    authorColor: row.authorColor ?? "#e8660a",
    content: row.content,
    createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt),
  };
}

/**
 * Recent messages for a room, oldest-first, excluding soft-deleted. `before`
 * (ISO date) paginates older messages.
 */
export async function listMessages(
  roomId: string,
  opts: { limit?: number; before?: string } = {},
): Promise<LoungeMessageView[]> {
  const limit = Math.min(opts.limit ?? 50, 100);
  const conditions = [eq(loungeMessages.roomId, roomId), isNull(loungeMessages.deletedAt)];
  if (opts.before) conditions.push(lt(loungeMessages.createdAt, new Date(opts.before)));

  const rows = await db
    .select({
      id: loungeMessages.id,
      roomId: loungeMessages.roomId,
      userId: loungeMessages.userId,
      content: loungeMessages.content,
      createdAt: loungeMessages.createdAt,
      authorName: teamMembers.displayName,
      authorColor: teamMembers.avatarColor,
      fallbackName: users.name,
    })
    .from(loungeMessages)
    .leftJoin(users, eq(loungeMessages.userId, users.id))
    .leftJoin(teamMembers, eq(teamMembers.userId, users.id))
    .where(and(...conditions))
    .orderBy(desc(loungeMessages.createdAt))
    .limit(limit);

  // Returned newest-first from the query; present oldest-first for the UI.
  return rows
    .map((r) => toView({ ...r, authorName: r.authorName ?? r.fallbackName }))
    .reverse();
}

export async function createMessage(input: {
  roomId: string;
  userId: string;
  content: string;
}): Promise<LoungeMessageView> {
  const inserted = await db
    .insert(loungeMessages)
    .values({ roomId: input.roomId, userId: input.userId, content: input.content })
    .returning();
  const row = inserted[0];

  // Enrich with author identity for immediate broadcast.
  const member = await db
    .select({ name: teamMembers.displayName, color: teamMembers.avatarColor })
    .from(teamMembers)
    .where(eq(teamMembers.userId, input.userId))
    .limit(1)
    .then((r) => r[0])
    .catch(() => undefined);

  return toView({
    id: row.id,
    roomId: row.roomId,
    userId: row.userId,
    content: row.content,
    createdAt: row.createdAt,
    authorName: member?.name ?? null,
    authorColor: member?.color ?? null,
  });
}

/**
 * Soft-delete a message. Only the author or a founder may delete; this is
 * enforced by the caller passing `isFounder`.
 */
export async function softDeleteMessage(
  id: string,
  requesterUserId: string,
  isFounder: boolean,
): Promise<boolean> {
  const msg = await db
    .select({ id: loungeMessages.id, userId: loungeMessages.userId })
    .from(loungeMessages)
    .where(eq(loungeMessages.id, id))
    .limit(1)
    .then((r) => r[0]);
  if (!msg) return false;
  if (msg.userId !== requesterUserId && !isFounder) return false;

  await db.update(loungeMessages).set({ deletedAt: new Date() }).where(eq(loungeMessages.id, id));
  return true;
}
