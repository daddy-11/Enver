import { NextRequest, NextResponse } from "next/server";
import { queryTethys, TethysMessage, type TethysAgent } from "@/lib/tethys/client";
import { requireTeamMember, AccessError } from "@/lib/team/guards";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/security/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // ── Rate limit: 20 agent calls per minute per IP (cost control) ─────────
    const ip = getClientIp(req as unknown as Request);
    const rl = await checkRateLimit(ip, "ai");
    if (!rl.success) return rateLimitResponse(rl.retryAfter) as NextResponse;

    // Only team members may use the agents; attribute usage to them.
    const ctx = await requireTeamMember(req.headers);

    const { messages, agent } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "messages array is required." }, { status: 400 });
    }

    const tethysReply = await queryTethys(messages as TethysMessage[], {
      agent: agent as TethysAgent | undefined,
      userId: ctx.userId,
    });

    return NextResponse.json({ reply: tethysReply });
  } catch (err) {
    if (err instanceof AccessError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("Tethys Chat API error:", err);
    return NextResponse.json({ error: "Internal server error occurred." }, { status: 500 });
  }
}
