import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema";
import { createServiceClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

const BUCKET = "resumes";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userResumes = await db
    .select()
    .from(resumes)
    .where(eq(resumes.userId, session.user.id));

  return NextResponse.json({ resumes: userResumes });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Only PDF files are accepted" },
      { status: 415 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File exceeds 10MB limit" },
      { status: 413 }
    );
  }

  const supabase = createServiceClient();
  const storageKey = `${session.user.id}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  const bytes = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storageKey, bytes, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (uploadError) {
    console.error("Supabase Storage upload error:", uploadError);
    return NextResponse.json(
      { error: "Storage upload failed" },
      { status: 500 }
    );
  }

  // Create DB record — embedding pipeline is triggered async
  const [resume] = await db
    .insert(resumes)
    .values({
      userId: session.user.id,
      filename: file.name,
      storageKey,
      fileSize: file.size,
      embeddingStatus: "pending",
    })
    .returning();

  // TODO: Trigger Supabase Edge Function for PDF parsing + pgvector embedding
  // await supabase.functions.invoke("embed-resume", { body: { resumeId: resume.id } });

  return NextResponse.json({ resume }, { status: 201 });
}
