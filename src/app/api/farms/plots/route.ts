import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { farmPlots, NewFarmPlot } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const plots = await db
    .select()
    .from(farmPlots)
    .where(eq(farmPlots.userId, session.user.id));

  return NextResponse.json({ plots });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, geometryWkt, treeCount, healthScore, metadata } = body;

  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  const newPlot: NewFarmPlot = {
    userId: session.user.id,
    name,
    geometryWkt: geometryWkt ?? null,
    treeCount: treeCount ?? null,
    healthScore: healthScore ?? null,
    metadata: metadata ?? null,
  };

  const [created] = await db.insert(farmPlots).values(newPlot).returning();
  return NextResponse.json({ plot: created }, { status: 201 });
}
