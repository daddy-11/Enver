import { NextRequest, NextResponse } from "next/server";
import { requireTeamMember, AccessError } from "@/lib/team/guards";
import { mintRealtimeToken } from "@/lib/realtime/token";

/**
 * Issue a short-lived Supabase Realtime token to an authenticated team member.
 * The browser uses it to subscribe to the lounge channels.
 */
export async function GET(req: NextRequest) {
  try {
    const ctx = await requireTeamMember(req.headers);
    const { token, expiresIn } = await mintRealtimeToken({
      userId: ctx.userId,
      email: ctx.email,
      role: ctx.role,
    });
    return NextResponse.json({ token, expiresIn });
  } catch (err) {
    if (err instanceof AccessError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[realtime/token] error:", err);
    return NextResponse.json({ error: "Could not issue realtime token." }, { status: 500 });
  }
}
