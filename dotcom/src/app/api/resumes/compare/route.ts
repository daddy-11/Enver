import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { comparisons, resumes } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resumeAId, resumeBId } = await req.json();

  if (!resumeAId || !resumeBId) {
    return NextResponse.json(
      { error: "resumeAId and resumeBId are required" },
      { status: 400 }
    );
  }

  // Verify ownership
  const [resumeA, resumeB] = await Promise.all([
    db.query.resumes.findFirst({
      where: and(eq(resumes.id, resumeAId), eq(resumes.userId, session.user.id)),
    }),
    db.query.resumes.findFirst({
      where: and(eq(resumes.id, resumeBId), eq(resumes.userId, session.user.id)),
    }),
  ]);

  if (!resumeA || !resumeB) {
    return NextResponse.json(
      { error: "One or both resumes not found or not owned by you" },
      { status: 404 }
    );
  }

  if (
    resumeA.embeddingStatus !== "done" ||
    resumeB.embeddingStatus !== "done"
  ) {
    return NextResponse.json(
      { error: "Embeddings not ready yet. Check back shortly." },
      { status: 422 }
    );
  }

  // pgvector: compute average cosine similarity across all chunk pairs
  // Uses the HNSW index on resume_chunks(embedding)
  const result = await db.execute(sql`
    SELECT
      1 - AVG(a.embedding <=> b.embedding) AS similarity
    FROM resume_chunks a
    CROSS JOIN resume_chunks b
    WHERE a.resume_id = ${resumeAId}
      AND b.resume_id = ${resumeBId}
      AND a.embedding IS NOT NULL
      AND b.embedding IS NOT NULL
    LIMIT 1000
  `);

  const similarityScore =
    ((result as unknown as { similarity: string }[])[0])?.similarity ?? "0";

  // Persist comparison result
  const [comparison] = await db
    .insert(comparisons)
    .values({
      userId: session.user.id,
      resumeAId,
      resumeBId,
      similarityScore,
      diffJson: {
        method: "pgvector_cosine",
        dimensions: 1536,
        index: "hnsw",
      },
    })
    .returning();

  return NextResponse.json({
    comparison,
    similarityScore: parseFloat(similarityScore),
    label: getSimilarityLabel(parseFloat(similarityScore)),
  });
}

function getSimilarityLabel(score: number): string {
  if (score >= 0.9) return "Near-identical";
  if (score >= 0.75) return "Strong match";
  if (score >= 0.55) return "Partial match";
  if (score >= 0.35) return "Weak match";
  return "Low similarity";
}
