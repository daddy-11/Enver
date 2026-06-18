/**
 * Voice session tracking for the lounge.
 *
 * Voice itself runs on Google Meet (Meet cannot be embedded in an iframe). The
 * backend owns the room's persistent Meet link and records who joined/left so
 * presence and the admin activity view reflect real voice participation.
 */

import { db } from "@/lib/db";
import { voiceSessions, loungeRooms } from "@/lib/db/schema";
import { and, eq, isNull } from "drizzle-orm";

export async function joinVoice(
  userId: string,
  roomId: string,
): Promise<{ meetUrl: string | null; sessionId: string }> {
  const room = await db
    .select({ meetUrl: loungeRooms.meetUrl })
    .from(loungeRooms)
    .where(eq(loungeRooms.id, roomId))
    .limit(1)
    .then((r) => r[0]);

  // Close any dangling open voice session for this user+room first.
  await db
    .update(voiceSessions)
    .set({ leftAt: new Date() })
    .where(and(eq(voiceSessions.userId, userId), eq(voiceSessions.roomId, roomId), isNull(voiceSessions.leftAt)));

  const inserted = await db
    .insert(voiceSessions)
    .values({ userId, roomId })
    .returning({ id: voiceSessions.id });

  return { meetUrl: room?.meetUrl ?? null, sessionId: inserted[0].id };
}

export async function leaveVoice(userId: string, roomId: string): Promise<void> {
  await db
    .update(voiceSessions)
    .set({ leftAt: new Date() })
    .where(and(eq(voiceSessions.userId, userId), eq(voiceSessions.roomId, roomId), isNull(voiceSessions.leftAt)));
}
