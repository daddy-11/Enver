import { NextRequest, NextResponse } from "next/server";
import { requireTeamMember, AccessError } from "@/lib/team/guards";
import { recordHeartbeat } from "@/lib/presence/sessions";
import { getClientIp } from "@/lib/security/rate-limit";

/**
 * Heartbeat endpoint. The workspace client posts here (~every 30s) while the
 * tab is active to keep the member's activity session alive.
 */
export async function POST(req: NextRequest) {
  try {
    const ctx = await requireTeamMember(req.headers);

    const sessionId = await recordHeartbeat({
      userId: ctx.userId,
      source: "portal",
      ipAddress: getClientIp(req as unknown as Request),
      userAgent: req.headers.get("user-agent"),
    });

    return NextResponse.json({ ok: true, sessionId });
  } catch (err) {
    if (err instanceof AccessError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[presence/beat] error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
