import React from "react";
import { Link } from "wouter";
import {
  ShieldCheck,
  Award,
  Sparkles,
  Cloud,
  ExternalLink,
  ArrowRight
} from "lucide-react";

const academicIncubators = [
  {
    name: "FITT IIT Delhi",
    fullTitle: "Foundation for Innovation and Technology Transfer",
    institution: "Indian Institute of Technology, Delhi",
    role: "Apex Academic Research Incubation",
    location: "Hauz Khas, New Delhi, India",
    link: "https://fitt-iitd.in/",
    badge: "INCUBATOR",
    badgeColor: "text-[#FF6F1E] bg-[#FF6F1E]/10 border-[#FF6F1E]/20",
    description:
      "Incubated under FITT at IIT Delhi, India's foremost engineering institute. Focuses on frontier deep-tech autonomous agent architectures, sovereign Indic language intelligence, and mathematical determinism in code generation.",
    metrics: [
      { label: "Track", value: "Deep-Tech AI" },
      { label: "Tenure", value: "Multi-Year Incubation" },
      { label: "Focus", value: "Autonomous Systems" }
    ]
  },
  {
    name: "Jubilant Bhartia Foundation",
    fullTitle: "Jubilant Bhartia Social Innovation & Acceleration",
    institution: "Jubilant Bhartia Group",
    role: "Strategic Enterprise & Social Acceleration",
    location: "Noida, Uttar Pradesh, India",
    link: "https://www.jubilantbhartiafoundation.com/",
    badge: "FOUNDATION",
    badgeColor: "text-[#4A2237] bg-[#4A2237]/10 border-[#4A2237]/20",
    description:
      "Strategic incubation and acceleration partner supporting Enver's enterprise deployment pipelines, grassroots AI accessibility, and sovereign digital infrastructure across emerging commercial ecosystems.",
    metrics: [
      { label: "Cohort", value: "Enterprise AI" },
      { label: "Mandate", value: "Sovereign Scale" },
      { label: "Advisory", value: "Executive Mentorship" }
    ]
  },
  {
    name: "BITSoM Vertex AI Incubator",
    fullTitle: "BITS School of Management & Google Cloud Incubator",
    institution: "BITSoM (BITS Pilani) in partnership with Google Cloud",
    role: "Flagship FinTech XAI Incubation",
    location: "Mumbai, Maharashtra, India",
    link: "https://www.bitsom.edu.in/",
    badge: "FLAGSHIP MVP",
    badgeColor: "text-[#FF6F1E] bg-white border-[#E5DFD1]",
    description:
      "Selected as the flagship enterprise incubatee for Artificer — our autonomous explainable underwriting citadel. Engineered on Google Cloud Vertex AI to ingest messy Indian bank PDFs and GST challans with line-level deterministic citations.",
    metrics: [
      { label: "Product", value: "Artificer Underwriting" },
      { label: "Infra", value: "Google Vertex AI" },
      { label: "Verification", value: "MSME Citadel" }
    ]
  }
];

const hyperscalerCloudEcosystems = [
  {
    name: "Microsoft Azure",
    program: "Microsoft for Startups Founders Hub",
    badge: "FOUNDERS HUB",
    color: "from-[#0078D4]/10 to-transparent",
    link: "https://foundershub.startups.microsoft.com/",
    description:
      "Enterprise cloud sponsorship with Azure Container Apps, Cognitive Services, Azure Key Vault, and private VPC networking for sovereign multi-tenant orchestration."
  },
  {
    name: "Google Cloud",
    program: "Google for Startups Cloud Program · Vertex AI",
    badge: "VERTEX AI COHORT",
    color: "from-[#4285F4]/10 to-transparent",
    link: "https://cloud.google.com/startup",
    description:
      "Dedicated infrastructure grants powering our Gemini 2.0 Flash REST endpoints, Cloud Run container tenancies in Asia-South1 (Mumbai), and Firestore architecture lead pipelines."
  },
  {
    name: "Amazon Web Services",
    program: "AWS Activate TechStartup Portfolio",
    badge: "ACTIVATE TECHSTARTUP",
    color: "from-[#FF9900]/10 to-transparent",
    link: "https://aws.amazon.com/activate/",
    description:
      "Multi-cloud deployment rails enabling Arbiter to enforce AST-level destructive command firewalls and monitor live infrastructure instances across AWS regions."
  },
  {
    name: "Hub71 Abu Dhabi",
    program: "Sovereign Tech Ecosystem Validation",
    badge: "MENA VALIDATION",
    color: "from-[#2B121F]/10 to-transparent",
    link: "https://www.hub71.com/",
    description:
      "Validation workshop and cross-border ecosystem engagement with Abu Dhabi's global tech hub for international enterprise expansion."
  }
];

export default function Accreditations() {
  return (
    <div className="bg-[#F7F3E9] text-[#2B121F] min-h-screen pt-28 sm:pt-36 font-sans selection:bg-[#2B121F] selection:text-[#F7F3E9]">
      {/* =========================================================================
          HERO SECTION — Institutional Accreditations
          ========================================================================= */}
      <section className="relative overflow-hidden py-14 lg:py-20 border-b border-[#E5DFD1]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFD1] text-[#2B121F] text-xs font-mono font-semibold shadow-2xs mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF6F1E] shadow-[0_0_8px_#FF6F1E] animate-pulse" />
              <span>INSTITUTIONAL ACCREDITATIONS &amp; SOVEREIGN ECOSYSTEMS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold text-[#2B121F] leading-[1.06] tracking-tight mb-6">
              Institutional Rigor. <br />
              <span className="bg-gradient-to-r from-[#2B121F] via-[#4A2237] to-[#FF6F1E] bg-clip-text text-transparent">
                Production Tenancies.
              </span>
            </h1>

            <p className="text-base sm:text-xl font-sans text-[#7A6F68] leading-relaxed mb-8">
              Enver AI Tech is accelerated, incubated, and formally recognized by India&apos;s apex academic institutes, statutory startup authorities, and tier-1 hyperscaler cloud ecosystems. We engineer autonomous systems with mathematical determinism, audited security, and zero-drift execution.
            </p>

            {/* Quick Verification Badges Strip */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DFD1] text-xs font-mono text-[#2B121F] font-semibold">
                <ShieldCheck size={14} className="text-[#4A2237]" /> DPIIT Recognized Startup
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DFD1] text-xs font-mono text-[#2B121F] font-semibold">
                <Sparkles size={14} className="text-[#FF6F1E]" /> FITT IIT Delhi Incubated
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DFD1] text-xs font-mono text-[#2B121F] font-semibold">
                <Award size={14} className="text-[#2B121F]" /> BITSoM Vertex AI Citadel
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DFD1] text-xs font-mono text-[#2B121F] font-semibold">
                <Cloud size={14} className="text-[#FF6F1E]" /> Microsoft · Google · AWS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1 — APEX ACADEMIC INCUBATORS
          ========================================================================= */}
      <section className="py-16 md:py-24 relative border-b border-[#E5DFD1] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6EDF2] border border-[#2B121F]/20 text-[#2B121F] font-mono text-xs font-bold mb-3 tracking-wider">
              [ 01 // ACADEMIC RESEARCH &amp; INCUBATION ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2B121F] leading-tight">
              Incubated at Apex Research Centers.
            </h2>
            <p className="text-base font-sans text-[#7A6F68] mt-3 leading-relaxed">
              Our engineering thesis and sovereign agent pipelines are developed in close alignment with premier academic institutes and corporate foundation programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {academicIncubators.map((incubator) => (
              <div
                key={incubator.name}
                className="p-8 rounded-3xl bg-[#F7F3E9] border border-[#E5DFD1] hover:border-[#FF6F1E] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded tracking-wider uppercase border ${incubator.badgeColor}`}>
                      {incubator.badge}
                    </span>
                    <span className="text-xs font-mono text-[#7A6F68]">{incubator.role}</span>
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-[#2B121F] mb-1">
                    {incubator.name}
                  </h3>
                  <div className="text-xs font-mono text-[#4A2237] font-semibold mb-3">
                    {incubator.institution}
                  </div>

                  <p className="text-xs sm:text-sm font-sans text-[#7A6F68] leading-relaxed mb-6">
                    {incubator.description}
                  </p>
                </div>

                <div>
                  {/* Metrics Grid */}
                  <div className="py-4 border-t border-[#E5DFD1] grid grid-cols-3 gap-2 mb-4 font-mono text-xs">
                    {incubator.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-[10px] text-[#7A6F68] uppercase">{m.label}</div>
                        <div className="font-bold text-[#2B121F] truncate text-[11px]">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  <a
                    href={incubator.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full text-xs font-mono font-bold text-[#2B121F] hover:text-[#FF6F1E] transition-colors pt-2 border-t border-[#E5DFD1] no-underline group"
                  >
                    <span>Inspect Incubator Dossier</span>
                    <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — HYPERSCALER CLOUD ECOSYSTEMS & ACCELERATION
          ========================================================================= */}
      <section className="py-16 md:py-24 relative border-b border-[#E5DFD1] bg-[#F7F3E9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6EDF2] border border-[#2B121F]/20 text-[#2B121F] font-mono text-xs font-bold mb-3 tracking-wider">
              [ 02 // HYPERSCALER ENTERPRISE TENANCIES ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2B121F] leading-tight">
              Tier-1 Hyperscaler Acceleration.
            </h2>
            <p className="text-base font-sans text-[#7A6F68] mt-3 leading-relaxed">
              Our multi-cloud fleets operate directly across Microsoft Azure, Google Cloud, and Amazon Web Services production environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hyperscalerCloudEcosystems.map((cloud) => (
              <div
                key={cloud.name}
                className="p-6 rounded-2xl bg-white border border-[#E5DFD1] hover:border-[#2B121F] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-[#FF6F1E] uppercase tracking-wider bg-[#F7F3E9] px-2 py-0.5 rounded border border-[#E5DFD1]">
                      {cloud.badge}
                    </span>
                    <Cloud size={16} className="text-[#2B121F]" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-[#2B121F] mb-1">
                    {cloud.name}
                  </h3>
                  <div className="text-xs font-mono text-[#7A6F68] mb-3">
                    {cloud.program}
                  </div>
                  <p className="text-xs font-sans text-[#7A6F68] leading-relaxed mb-4">
                    {cloud.description}
                  </p>
                </div>

                <a
                  href={cloud.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pt-3 border-t border-[#E5DFD1] flex items-center justify-between text-xs font-mono font-bold text-[#2B121F] hover:text-[#FF6F1E] transition-colors no-underline"
                >
                  <span>Ecosystem Portal</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONCISE CLOSING ACTION BAR
          ========================================================================= */}
      <section className="py-14 text-center bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[#F7F3E9] border border-[#E5DFD1]">
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#2B121F] mb-1">
                Explore Enterprise Architectures
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#7A6F68]">
                Inspect our production case studies, cloud governance rails, and sovereign deployment pipelines.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#2B121F] hover:bg-[#FF6F1E] text-white text-xs font-mono font-bold transition-all no-underline shadow-2xs"
              >
                <span>View Use Cases</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
