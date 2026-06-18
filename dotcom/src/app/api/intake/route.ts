import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { candidateProfiles } from "@/lib/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, githubUrl, linkedinUrl, experienceYears, challenges, skills, preferredRoles } = body;

    if (!fullName || !email) {
      return NextResponse.json({ error: "fullName and email are required fields." }, { status: 400 });
    }

    const [inserted] = await db.insert(candidateProfiles).values({
      fullName,
      email,
      phone: phone || null,
      githubUrl: githubUrl || null,
      linkedinUrl: linkedinUrl || null,
      experienceYears: experienceYears || null,
      challenges: challenges || null,
      skills: skills || null,
      preferredRoles: preferredRoles || null,
    }).returning({ id: candidateProfiles.id });

    return NextResponse.json({
      message: "Candidate information hoarded successfully.",
      id: inserted.id
    }, { status: 201 });

  } catch (err) {
    console.error("Next.js candidate intake API failed:", err);
    return NextResponse.json({ error: "Internal server error occurred." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
