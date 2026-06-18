import React from "react";
import Link from "next/link";

export default function AtreaPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-2)] text-[var(--navy)] pt-32 pb-24">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-6 h-1.5 bg-[#1B2B4B] rounded-sm" />
          <span className="font-mono text-[12px] font-extrabold uppercase tracking-widest text-[#1B2B4B]">
            Recruitment Intelligence
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-8">
          Atrea
        </h1>
        
        <p className="text-xl md:text-2xl text-[var(--muted)] font-medium leading-relaxed mb-16">
          An elite engineering hiring portal. The agentic AI goes beyond keyword matching to deeply analyze GitHub repositories, system design capabilities, and true technical competence to find the perfect candidate.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white border border-[var(--border)] rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-extrabold mb-4">Repository Analysis</h3>
            <p className="text-[var(--muted)] leading-relaxed font-medium">
              Instead of relying on self-reported skills, Atrea connects directly to candidate repositories. The agent analyzes commit history, architecture choices, and code quality to evaluate true engineering proficiency.
            </p>
          </div>
          <div className="bg-white border border-[var(--border)] rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-extrabold mb-4">Synergy Matching</h3>
            <p className="text-[var(--muted)] leading-relaxed font-medium">
              Using pgvector embeddings, Atrea creates a multi-dimensional map of your engineering team's current stack and matches candidates whose exact problem-solving capabilities fill your precise skill deltas.
            </p>
          </div>
        </div>

        <div className="bg-[var(--navy)] text-white rounded-2xl p-12 text-center shadow-lg">
          <h2 className="text-3xl font-extrabold mb-6">Restricted Access</h2>
          <p className="text-white/70 font-medium max-w-lg mx-auto mb-8">
            Atrea is currently in private beta for selected enterprise engineering teams.
          </p>
          <Link 
            href="mailto:daddy@enveraitech.com"
            className="inline-flex px-8 py-4 bg-white text-[var(--navy)] font-extrabold rounded-xl hover:bg-opacity-90 transition-opacity"
          >
            Apply for Beta →
          </Link>
        </div>
      </div>
    </div>
  );
}
