import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { developerTelemetry } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { SanctuaryDashboard } from "@/components/sections/SanctuaryDashboard";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login?redirect=/dashboard");
  }

  const { user } = session;

  let telemetryLogs = [];
  try {
    telemetryLogs = await db
      .select()
      .from(developerTelemetry)
      .orderBy(desc(developerTelemetry.createdAt))
      .limit(30);
  } catch (err) {
    console.warn("[Dashboard DB Telemetry Fetch Failed - Falling back to local simulation]:", err);
    // Simulated initial logs for fallback
    telemetryLogs = [
      {
        id: "mock-log-1",
        userId: user.id,
        activityType: "login",
        details: { ip: "127.0.0.1", status: "session_authorized" },
        createdAt: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: "mock-log-2",
        userId: user.id,
        activityType: "command",
        details: { command: "npm run dev", directory: "/website", durationMs: 450 },
        createdAt: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: "mock-log-3",
        userId: user.id,
        activityType: "prompt",
        details: { fileOpen: "/src/lib/tethys/client.ts", action: "calibrate_tethers" },
        createdAt: new Date(Date.now() - 60 * 60 * 1000)
      }
    ];
  }

  // Serialize logs before sending to the client component to avoid serialization errors with Date objects
  const serializedLogs = telemetryLogs.map(log => ({
    id: log.id,
    userId: log.userId,
    activityType: log.activityType,
    details: log.details,
    createdAt: log.createdAt instanceof Date ? log.createdAt.toISOString() : String(log.createdAt)
  }));

  return (
    <SanctuaryDashboard 
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image
      }} 
      initialTelemetry={serializedLogs} 
    />
  );
}

