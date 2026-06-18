import { NextRequest, NextResponse } from "next/server";
import { requireTeamMember, AccessError } from "@/lib/team/guards";
import { listRooms, getGeneralRoom } from "@/lib/lounge/messages";

/** List lounge rooms (ensures the default general room exists). */
export async function GET(req: NextRequest) {
  try {
    await requireTeamMember(req.headers);
    await getGeneralRoom(); // ensure general exists
    const rooms = await listRooms();
    return NextResponse.json({ rooms });
  } catch (err) {
    if (err instanceof AccessError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("[lounge/rooms] error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
