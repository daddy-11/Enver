import { NextRequest, NextResponse } from "next/server";
import { requireTeamMember, AccessError } from "@/lib/team/guards";
import { verifyCsrfOrigin, csrfErrorResponse } from "@/lib/security/csrf";
import { leaveVoice } from "@/lib/voice/sessions";

/** POST /api/voice/leave { roomId } — log voice leave. */
export async function POST(req: NextRequest) {
  try {
    const csrf = verifyCsrfOrigin(req);
    if (!csrf.valid) return csrfErrorResponse();

    const ctx = await requireTeamMember(req.headers);
    const { roomId } = await req.json();
    if (!roomId || typeof roomId !== "string") {
      return NextResponse.json({ error: "roomId is required." }, { status: 400 });
    }
    await leaveVoice(ctx.userId, roomId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof AccessError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[voice/leave] error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
