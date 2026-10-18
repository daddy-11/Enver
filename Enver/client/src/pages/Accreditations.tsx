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
import DotGrid from "@/components/reactbits/DotGrid";
import { usePageMeta } from "@/hooks/usePageMeta";

const academicIncubators = [
  {
    name: "FITT IIT Delhi",
    fullTitle: "Foundation for Innovation and Technology Transfer",
    institution: "Indian Institute of Technology, Delhi",
    location: "New Delhi, India",
    link: "https://fitt-iitd.in/",
    badge: "ACADEMIC INCUBATOR",
    badgeColor: "text-[#FF6F1E] bg-[#FF6F1E]/10 border-[#FF6F1E]/20",
    description:
      "Apex deep-tech research incubation under FITT at IIT Delhi. Research and engineering focus on autonomous agent state machines, sovereign Indic language intelligence, and AST-level deterministic execution.",
    metrics: [
      { label: "Track", value: "Deep-Tech AI" },
      { label: "Tenure", value: "Research Incubation" },
      { label: "Focus", value: "Autonomous Systems" }
    ]
  },
  {
    name: "Jubilant Bhartia Foundation",
    fullTitle: "Jubilant Bhartia Foundation",
    institution: "Jubilant Bhartia Group",
    location: "Noida, UP, India",
    link: "https://www.jubilantbhartiafoundation.com/",
    badge: "ENTERPRISE INCUBATION",
    badgeColor: "text-[#4A2237] bg-[#4A2237]/10 border-[#4A2237]/20",
    description:
      "Selected and partnered under the Jubilant Bhartia Foundation for strategic enterprise operational AI workflows, automated verification systems, and digital infrastructure across enterprise commercial ecosystems.",
    metrics: [
      { label: "Cohort", value: "Enterprise AI" },
      { label: "Mandate", value: "Operational Scale" },
      { label: "Advisory", value: "Enterprise Mentorship" }
    ]
  },
  {
    name: "BITSoM (BITS Pilani)",
    fullTitle: "BITS School of Management & Google Cloud Ecosystem",
    institution: "BITSoM (BITS Pilani)",
    location: "Mumbai, MH, India",
    link: "https://www.bitsom.edu.in/",
    badge: "COMPETITION WINNER",
    badgeColor: "text-[#FF6F1E] bg-white border-[#E5DFD1]",
    description:
      "Participated and won at BITSoM (BITS Pilani); attending dedicated business incubation and acceleration support for the upcoming quarter for Artificer XAI.",
    metrics: [
      { label: "Result", value: "Competition Winner" },
      { label: "Support", value: "Business Incubation" },
      { label: "Cohort", value: "Upcoming Quarter" }
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
  usePageMeta({
    title: "Accreditations & Incubator Alliances",
    description: "DPIIT recognized (#DIPP193082), incubated at BITSoM Vertex AI, backed by FITT IIT Delhi, and Microsoft for Startups Founders Hub.",
  });

  return (
    <div className="relative bg-[#F7F3E9] text-[#2B121F] min-h-screen pt-8 sm:pt-12 font-sans selection:bg-[#2B121F] selection:text-[#F7F3E9] overflow-hidden">
      {/* =========================================================================
          FULL-PAGE INTERACTIVE DOTGRID CANVAS BACKGROUND
          Precision institutional matrix with cursor inertia and click shockwaves.
          ========================================================================= */}
      <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden opacity-90">
        <DotGrid
          className="w-full h-full"
          dotSize={5}
          gap={32}
          baseColor="#D5CDBC"
          activeColor="#FF6F1E"
          proximity={150}
          speedTrigger={70}
          shockRadius={260}
          shockStrength={6}
          maxSpeed={5000}
          resistance={750}
          returnDuration={1.4}
        />
      </div>

      {/* =========================================================================
          HERO SECTION — Institutional Accreditations
          ========================================================================= */}
      <section className="relative z-10 overflow-hidden py-14 lg:py-20 border-b border-[#E5DFD1]/80 bg-transparent">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E5DFD1] text-[#2B121F] text-xs font-mono font-semibold shadow-2xs mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF6F1E] shadow-[0_0_8px_#FF6F1E] animate-pulse" />
              <span>INSTITUTIONAL ACCREDITATIONS &amp; SOVEREIGN ECOSYSTEMS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold text-[#2B121F] leading-[1.06] tracking-tight mb-6">
              Institutional Rigor. <br />
              <span className="bg-gradient-to-r from-[#2B121F] via-[#4A2237] to-[#FF6F1E] bg-clip-text text-transparent">
                Production Tenancies.
              </span>
            </h1>

            <p className="text-base sm:text-xl font-sans text-[#7A6F68] leading-relaxed">
              Enver AI Tech is accelerated, incubated, and formally recognized by India&apos;s apex academic institutes, statutory startup authorities, and tier-1 hyperscaler cloud ecosystems. We engineer autonomous systems with mathematical determinism, audited security, and zero-drift execution.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1 — APEX ACADEMIC & ENTERPRISE INCUBATORS
          ========================================================================= */}
      <section className="py-16 md:py-24 relative z-10 border-b border-[#E5DFD1]/80 bg-transparent">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#2B121F]/20 text-[#2B121F] font-mono text-xs font-bold mb-3 tracking-wider shadow-2xs">
              [ 01 // RESEARCH &amp; ENTERPRISE INCUBATION ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2B121F] leading-tight">
              Incubated at Apex Research &amp; Enterprise Centers.
            </h2>
            <p className="text-base font-sans text-[#7A6F68] mt-3 leading-relaxed">
              Our engineering thesis and sovereign agent pipelines are developed in close alignment with premier academic institutes and corporate foundation acceleration programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {academicIncubators.map((incubator) => (
              <div
                key={incubator.name}
                className="p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E5DFD1] hover:border-[#FF6F1E] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Clean unbloated header row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded tracking-wider uppercase border ${incubator.badgeColor}`}>
                      {incubator.badge}
                    </span>
                    <span className="text-xs font-mono text-[#7A6F68] font-medium">{incubator.location}</span>
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
      <section className="py-16 md:py-24 relative z-10 border-b border-[#E5DFD1]/80 bg-transparent">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#2B121F]/20 text-[#2B121F] font-mono text-xs font-bold mb-3 tracking-wider shadow-2xs">
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
                className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E5DFD1] hover:border-[#2B121F] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-[#FF6F1E] uppercase tracking-wider bg-[#FAF7F0] px-2 py-0.5 rounded border border-[#E5DFD1]">
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
      <section className="py-14 text-center relative z-10 bg-transparent">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E5DFD1] shadow-xs">
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
