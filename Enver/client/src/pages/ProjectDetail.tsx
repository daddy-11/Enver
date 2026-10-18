/* ============================================
   PROJECT DETAIL — Classified Dossier Template
   
   Neo-Brutalist technical dossier layout:
   - Massive title typography
   - Scrolling marquee tech stack
   - 30/70 split: System Specs / Operational Overview
   - DM Mono for spec key-value pairs
   ============================================ */

import { Link, useParams } from "wouter";
import { ArrowLeft, CheckCircle, ExternalLink, Sparkles } from "lucide-react";
import Marquee from "@/components/reactbits/Marquee";
import { projects } from "@/lib/projects";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === params.slug);

  usePageMeta({
    title: project ? `${project.title} — System Dossier` : "System Dossier",
    description: project?.summary || "Classified technical dossier for Enver AI Tech sovereign enterprise fleet.",
  });

  if (!project) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-3xl font-heading font-bold text-navy mb-4">
          System not found
        </h1>
        <p className="font-mono text-muted-foreground mb-6">
          ACCESS DENIED — No matching system in registry.
        </p>
        <Link href="/services" className="brutal-btn brutal-btn-outline no-underline">
          <ArrowLeft size={16} /> Return to Capabilities
        </Link>
      </div>
    );
  }

  // Build marquee text from tech stack
  const marqueeText = project.techStack.join(" // ");

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#2B121F] pt-8 sm:pt-12">
      {/* === DOSSIER HEADER === */}
      <section className="pt-16 pb-12 bg-white border-b border-[#E5DFD1]">
        <div className="container">
          {/* Back nav */}
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#7A6F68] hover:text-[#2B121F] no-underline mb-6 transition-colors font-medium"
          >
            <ArrowLeft size={14} /> BACK TO CAPABILITIES &amp; ENGINES
          </Link>

          {/* Classification badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-mono font-bold bg-[#F6EDF2] text-[#2B121F] px-3 py-1 rounded-full border border-[#E5DFD1]">
              {project.dossier.classification}
            </span>
            <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              {project.dossier.status}
            </span>
          </div>

          {/* Massive Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-[#2B121F] leading-tight tracking-tight mb-4">
            {project.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg font-sans text-[#7A6F68] max-w-3xl leading-relaxed">
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* === SCROLLING TECH STACK MARQUEE === */}
      <section className="bg-[#2B121F] py-3.5 border-b border-[#4A2237] overflow-hidden">
        <Marquee
          text={marqueeText}
          speed={45}
          separator=" // "
          className="text-white/80 font-mono text-xs uppercase tracking-wider"
        />
      </section>

      {/* === DOSSIER BODY — 30/70 Split === */}
      <section className="py-16 bg-[#F7F3E9]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[32%_1fr] gap-0 border border-[#E5DFD1] rounded-2xl overflow-hidden shadow-sm bg-white">
            
            {/* LEFT COLUMN — System Specifications (30%) */}
            <div className="bg-[#F7F3E9]/50 border-b lg:border-b-0 lg:border-r border-[#E5DFD1] p-8 md:p-10">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#7A6F68] mb-8 pb-4 border-b border-[#E5DFD1] font-bold">
                System Specifications
              </h2>

              <div className="space-y-6">
                <SpecRow label="Designation" value={project.title} />
                <SpecRow label="Domain" value={project.dossier.domain} />
                <SpecRow label="Core AI Model" value={project.dossier.coreModel} />
                <SpecRow label="Primary Function" value={project.dossier.primaryFunction} />
                <SpecRow label="Client" value={project.client} />
                <SpecRow label="Status" value={project.dossier.status} />
                <SpecRow label="Classification" value={project.dossier.classification} />
              </div>

              {/* Tech stack tags */}
              <div className="mt-10 pt-6 border-t border-[#E5DFD1]">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#7A6F68] mb-4 font-bold">
                  Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 text-[11px] font-mono bg-white border border-[#E5DFD1] text-[#2B121F] rounded-md shadow-2xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Sandbox / Citadel Launch CTA (Below Stack) */}
              {(project.slug === "artificer" || project.externalLink) && (
                <div className="mt-8 pt-6 border-t border-[#E5DFD1]">
                  <div className="p-5 rounded-2xl bg-[#F8F5EE] border border-[#E5DFD1] shadow-xs">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold">
                          Live Active MVP
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#7A6F68] bg-white px-2 py-0.5 rounded border border-[#E5DFD1]">
                        Standalone Citadel
                      </span>
                    </div>

                    <h4 className="text-sm font-heading font-extrabold text-[#2B121F] mb-1.5">
                      Test Out {project.slug === "artificer" ? "Artificer Citadel" : project.title}
                    </h4>

                    <p className="text-xs font-sans text-[#7A6F68] mb-4 leading-relaxed">
                      {project.slug === "artificer"
                        ? "Execute live MSME balance sheet extractions, deterministic DSCR scoring, and forensic audit trail generation directly."
                        : `Launch the interactive production environment for ${project.title}.`}
                    </p>

                    <a
                      href={project.externalLink || (project.slug === "artificer" ? "https://artificer.enveraitech.in" : "#")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-between py-3 px-4 rounded-xl bg-[#2B121F] hover:bg-[#1E0C15] text-white text-xs font-mono font-semibold transition-all group no-underline shadow-sm"
                    >
                      <span>Launch {project.slug === "artificer" ? "Artificer Citadel" : "Engine"}</span>
                      <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#FF6F1E]" />
                    </a>

                    <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-[#7A6F68] px-1">
                      <span>Live Engine:</span>
                      <span className="text-[#2B121F] font-semibold truncate max-w-[180px]">
                        {project.slug === "artificer" ? "artificer.enveraitech.in" : project.externalLink?.replace(/^https?:\/\//, "")}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN — Operational Overview (70%) */}
            <div className="p-8 md:p-12 bg-white">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#7A6F68] mb-8 pb-4 border-b border-[#E5DFD1] font-bold">
                Operational Overview
              </h2>

              {/* Description */}
              <div className="mb-10">
                <h3 className="text-xl font-heading font-extrabold text-[#2B121F] mb-3">
                  System Description
                </h3>
                <p className="text-sm sm:text-base font-sans text-[#7A6F68] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Challenge */}
              <div className="mb-10 p-6 rounded-xl border border-amber-200/80 bg-amber-50/50">
                <h3 className="text-lg font-heading font-extrabold text-[#2B121F] mb-2">
                  Problem Statement
                </h3>
                <p className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-10">
                <h3 className="text-xl font-heading font-extrabold text-[#2B121F] mb-3">
                  Architecture & Solution
                </h3>
                <p className="text-sm sm:text-base font-sans text-[#7A6F68] leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Results & Operational Metrics */}
              <div className="p-7 sm:p-8 rounded-2xl bg-[#FAF7F0] border border-[#E5DFD1]">
                <h3 className="text-lg font-heading font-extrabold text-[#2B121F] mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF6F1E] rounded-full animate-pulse" />
                  <span>Operational Metrics & Key Results</span>
                </h3>
                <ul className="space-y-3.5">
                  {project.results.map((result) => (
                    <li key={result} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-sm font-sans text-[#2B121F] leading-relaxed">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* === SPEC ROW COMPONENT === */
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="group">
      <dt className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#7A6F68] mb-0.5 font-semibold">
        {label}
      </dt>
      <dd className="text-sm font-mono font-bold text-[#2B121F] leading-snug">
        {value}
      </dd>
    </div>
  );
}
