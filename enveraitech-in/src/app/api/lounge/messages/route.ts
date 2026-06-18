import { NextRequest, NextResponse } from "next/server";
import { requireTeamMember, AccessError } from "@/lib/team/guards";
import { verifyCsrfOrigin, csrfErrorResponse } from "@/lib/security/csrf";
import { listMessages, createMessage, MessageInputSchema } from "@/lib/lounge/messages";

/** GET /api/lounge/messages?roomId=...&before=ISO — message history. */
export async function GET(req: NextRequest) {
  try {
    await requireTeamMember(req.headers);
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");
    if (!roomId) {
      return NextResponse.json({ error: "roomId is required." }, { status: 400 });
    }
    const before = searchParams.get("before") ?? undefined;
    const messages = await listMessages(roomId, { before });
    return NextResponse.json({ messages });
  } catch (err) {
    if (err instanceof AccessError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[lounge/messages GET] error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

/** POST /api/lounge/messages — create a message. Rate-limited via middleware. */
export async function POST(req: NextRequest) {
  try {
    const csrf = verifyCsrfOrigin(req);
    if (!csrf.valid) return csrfErrorResponse();

    const ctx = await requireTeamMember(req.headers);
    const body = await req.json();
    const parsed = MessageInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid message." },
        { status: 400 },
      );
    }

    const message = await createMessage({
      roomId: parsed.data.roomId,
      userId: ctx.userId,
      content: parsed.data.content,
    });
    return NextResponse.json({ message });
  } catch (err) {
    if (err instanceof AccessError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[lounge/messages POST] error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
