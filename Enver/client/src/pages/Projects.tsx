/* ============================================
   PROJECTS REGISTRY PAGE — Neo-Brutalist Enterprise
   - Dedicated index for all 4 enterprise AI case studies
   - Brutalist dossier cards with tech tags & key metrics
   - Direct routing to /projects/:slug dossier pages
   ============================================ */

import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, ArrowRight, Shield, Layers, Bot, BarChart3, Terminal, Compass } from "lucide-react";
import { projects } from "@/lib/projects";
// @ts-ignore
import SpotlightCard from "@/components/reactbits/SpotlightCard";

const categoryIcons: Record<string, any> = {
  "artificer": BarChart3,
  "arbiter": Layers,
  "cerberus": Shield,
};

export default function Projects() {
  const [selectedTag, setSelectedTag] = useState<string>("ALL");

  const tags = ["ALL", "FLAGSHIP MVP", "FINTECH", "CLOUD OPS", "DEVSECOPS"];

  const filteredProjects = projects.filter((p) => {
    if (selectedTag === "ALL") return true;
    if (selectedTag === "CLIENT DEPLOYMENT") return p.dossier.classification === "CLIENT DEPLOYMENT";
    if (selectedTag === "INTERNAL TOOL") return p.dossier.classification === "INTERNAL TOOL";
    return p.tags.includes(selectedTag);
  });

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#2B121F] pt-28 sm:pt-36">
      {/* === HEADER === */}
      <section className="py-20 bg-white border-b border-[#E5DFD1]">
        <div className="container">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6EDF2] border border-[#E5DFD1] text-[10px] font-mono text-[#FF6F1E] font-bold uppercase tracking-widest mb-4">
            System Registry
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-[#2B121F] leading-tight tracking-tight mb-4">
            Deployed Systems & Engineering Case Studies.
          </h1>
          <p className="text-base sm:text-lg font-sans text-[#7A6F68] max-w-3xl leading-relaxed">
            Explore our deployed autonomous AI agents, security auditors, underwriting engines, and cloud governance frameworks built for enterprise scale.
          </p>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 font-mono text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                  selectedTag === tag
                    ? "bg-[#2B121F] text-white border-[#2B121F] shadow-xs"
                    : "bg-[#F7F3E9] text-[#7A6F68] border-[#E5DFD1] hover:text-[#2B121F] hover:bg-[#EFE9DC]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* === PROJECTS GRID === */}
      <section className="py-20 bg-[#F7F3E9]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => {
              const Icon = categoryIcons[project.slug] || Terminal;
              return (
                <SpotlightCard
                  key={project.slug}
                  spotlightColor="rgba(43, 18, 31, 0.05)"
                  className="bg-white border border-[#E5DFD1] p-8 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
                >
                  <div>
                    {/* Classification & Status */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Icon size={18} className="text-[#FF6F1E]" />
                        <span className="text-[10px] font-mono font-bold bg-[#F6EDF2] text-[#2B121F] px-2.5 py-1 rounded-full border border-[#E5DFD1]">
                          {project.dossier.classification}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#7A6F68] font-medium">
                        {project.client}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h2 className="text-2xl font-heading font-extrabold text-[#2B121F] mb-2">
                      {project.title}
                    </h2>
                    <p className="text-sm font-sans text-[#7A6F68] mb-6 line-clamp-2 leading-relaxed">
                      {project.subtitle}
                    </p>

                    {/* Core AI Model Badge */}
                    <div className="mb-6 p-3 bg-[#F7F3E9] rounded-xl border border-[#E5DFD1] text-xs font-mono">
                      <span className="text-[#7A6F68] block text-[10px] uppercase font-bold tracking-wider mb-0.5">
                        Core AI Engine:
                      </span>
                      <span className="text-[#2B121F] font-bold">{project.dossier.coreModel}</span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2 mb-6">
                      {project.results.slice(0, 2).map((result, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-sans text-[#7A6F68]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{result}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 text-[11px] font-mono bg-[#F7F3E9] border border-[#E5DFD1] text-[#2B121F] rounded-lg">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="almetra-btn-primary !min-h-[38px] !px-4 text-xs font-mono inline-flex items-center gap-1.5 no-underline"
                    >
                      Inspect Dossier <ArrowRight size={14} />
                    </Link>

                    {project.externalLink && (
                      <a
                        href={project.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-medium text-[#7A6F68] hover:text-[#2B121F] inline-flex items-center gap-1 no-underline transition-colors"
                      >
                        Live Link <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* === CALL TO ACTION === */}
      <section className="py-16 bg-[#2B121F] text-white border-t border-[#4A2237]">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-4">
            Need a custom AI system engineered for your infrastructure?
          </h2>
          <p className="text-sm font-sans text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
            From autonomous multi-agent pipelines to compliant financial XAI underwriting engines, we architect and deploy production systems.
          </p>
          <Link href="/contact" className="almetra-btn-primary !bg-[#FF6F1E] hover:!bg-[#E85B0B] text-white !min-h-[46px] !px-8 text-sm font-mono font-semibold no-underline inline-block">
            Initiate Project Inquiry →
          </Link>
        </div>
      </section>
    </div>
  );
}
