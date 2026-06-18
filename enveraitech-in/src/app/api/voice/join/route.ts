import { NextRequest, NextResponse } from "next/server";
import { requireTeamMember, AccessError } from "@/lib/team/guards";
import { verifyCsrfOrigin, csrfErrorResponse } from "@/lib/security/csrf";
import { joinVoice } from "@/lib/voice/sessions";

/** POST /api/voice/join { roomId } — log voice join, return the Meet link. */
export async function POST(req: NextRequest) {
  try {
    const csrf = verifyCsrfOrigin(req);
    if (!csrf.valid) return csrfErrorResponse();

    const ctx = await requireTeamMember(req.headers);
    const { roomId } = await req.json();
    if (!roomId || typeof roomId !== "string") {
      return NextResponse.json({ error: "roomId is required." }, { status: 400 });
    }
    const result = await joinVoice(ctx.userId, roomId);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof AccessError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[voice/join] error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
