import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { candidateProfiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CandidateDashboard } from "@/components/sections/CandidateDashboard";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = params;

  // Query candidate profile using standard Drizzle
  const [profile] = await db
    .select()
    .from(candidateProfiles)
    .where(eq(candidateProfiles.id, id))
    .limit(1);

  if (!profile) {
    return notFound();
  }

  return (
    <>
      <Navigation />
      <main className="container" style={{ padding: "4rem 2rem", maxWidth: "1040px" }}>
        <CandidateDashboard profile={profile} />
      </main>
      <Footer />
    </>
  );
}
