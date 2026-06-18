import { NextRequest, NextResponse } from "next/server";
import { requireTeamMember, AccessError } from "@/lib/team/guards";
import { verifyCsrfOrigin, csrfErrorResponse } from "@/lib/security/csrf";
import { softDeleteMessage } from "@/lib/lounge/messages";

/** DELETE /api/lounge/messages/[id] — soft-delete (author or founder only). */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const csrf = verifyCsrfOrigin(req);
    if (!csrf.valid) return csrfErrorResponse();

    const ctx = await requireTeamMember(req.headers);
    const ok = await softDeleteMessage(params.id, ctx.userId, ctx.role === "founder");
    if (!ok) {
      return NextResponse.json({ error: "Not found or not permitted." }, { status: 403 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof AccessError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[lounge/messages DELETE] error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
