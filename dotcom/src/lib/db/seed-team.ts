/**
 * Seed the internal-workspace roster and the default lounge room.
 *
 * Run after pushing the schema:  npx tsx src/lib/db/seed-team.ts
 *
 * Idempotent: upserts team members by email and ensures a single "general"
 * lounge room exists. Links each member to an existing Better Auth user row by
 * matching email, if that user has already signed in.
 */

import { db } from "./index";
import { teamMembers, loungeRooms, users } from "./schema";
import { ROSTER } from "@/lib/team/roster";
import { eq } from "drizzle-orm";

async function seed() {
  // Lounge: ensure exactly one "general" room.
  const existingGeneral = await db
    .select({ id: loungeRooms.id })
    .from(loungeRooms)
    .where(eq(loungeRooms.name, "general"))
    .limit(1);
  if (existingGeneral.length === 0) {
    await db.insert(loungeRooms).values({ name: "general", meetUrl: process.env.LOUNGE_MEET_URL ?? null });
    console.log("Created lounge room: general");
  } else {
    console.log("Lounge room 'general' already exists");
  }

  // Team members: upsert by email, linking to a user row if one exists.
  for (const entry of ROSTER) {
    const email = entry.email.toLowerCase();
    const userRow = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then((r) => r[0]);

    const existing = await db
      .select({ id: teamMembers.id })
      .from(teamMembers)
      .where(eq(teamMembers.email, email))
      .limit(1)
      .then((r) => r[0]);

    if (existing) {
      await db
        .update(teamMembers)
        .set({
          displayName: entry.displayName,
          role: entry.role,
          avatarColor: entry.avatarColor,
          userId: userRow?.id ?? null,
          updatedAt: new Date(),
        })
        .where(eq(teamMembers.id, existing.id));
      console.log(`Updated team member: ${email}`);
    } else {
      await db.insert(teamMembers).values({
        email,
        displayName: entry.displayName,
        role: entry.role,
        avatarColor: entry.avatarColor,
        userId: userRow?.id ?? null,
      });
      console.log(`Inserted team member: ${email}`);
    }
  }

  console.log("Seed complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
