import { db } from "@/lib/db";
import { developerTelemetry } from "@/lib/db/schema";

/**
 * Logs developer activity telemetry directly into Supabase via Drizzle ORM.
 * 
 * @param userId Unique identifier of the developer.
 * @param activityType Type of activity (e.g., "login", "prompt_cycle", "command").
 * @param details Additional metadata about the action (files open, prompt queries, etc.)
 */
export async function logDeveloperActivity(
  userId: string, 
  activityType: string, 
  details: Record<string, any>
) {
  try {
    const [inserted] = await db.insert(developerTelemetry).values({
      userId,
      activityType,
      details,
    }).returning({ id: developerTelemetry.id });
    
    return inserted.id;
  } catch (err) {
    console.error("[Telemetry Logging Failed]:", err);
    return null;
  }
}