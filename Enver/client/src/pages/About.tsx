import { Mail, ArrowRight, Award, GraduationCap, Cloud, Sparkles, ShieldCheck, Linkedin, CheckCircle2, Lock, FileCheck } from "lucide-react";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import InstitutionalEndorsement from "@/components/InstitutionalEndorsement";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

// @ts-ignore
import SplitText from "@/components/reactbits/SplitText";
import GhostFibers from "@/components/reactbits/GhostFibers";
// @ts-ignore
import MetaBalls from "@/components/reactbits/MetaBalls";

const team = [
  {
    name: "Amaan Shaikh",
    role: "Founder, CEO · Applied AI Architect",
    doodle: "https://api.dicebear.com/9.x/open-peeps/svg?seed=AmaanShaikh&face=smile",
    description: "Built the Artificer agent fleet on Vertex / Gemini — ingestion, grounded scoring, the XAI drawer, and the live GCP production organisation.",
    email: "hanabi@enveraitech.com",
    linkedin: "https://www.linkedin.com/in/tendo296/"
  },
  {
    name: "Needa Kaiser Shaikh",
    role: "Co-Founder & Director · Governance & Enterprise Trust",
    doodle: "https://api.dicebear.com/9.x/open-peeps/svg?seed=NeedaShaikh&face=smile",
    description: "Governance, security posture, and the AI monitoring / evaluation layer. Leading compliance across DPIIT, RBI guidelines, and enterprise trust.",
    email: "hanabi@enveraitech.com"
  },
  {
    name: "Faiq Shaikh",
    role: "AI & Systems Engineering Lead",
    doodle: "https://api.dicebear.com/9.x/open-peeps/svg?seed=FaiqShaikh",
    description: "Architecting low-latency multi-agent inference pipelines, distributed task orchestrators, and real-time observability systems.",
    email: "hanabi@enveraitech.com"
  },
  {
    name: "Abhishek Kottharath",
    role: "Sales Lead · Enterprise Partnerships",
    doodle: "https://api.dicebear.com/9.x/open-peeps/svg?seed=AbhishekKottharath",
    description: "Driving institutional partnerships and enterprise solution deployments across banking, commercial credit, and cloud sectors.",
    email: "hanabi@enveraitech.com"
  },
  {
    name: "Brazz Gabriel",
    role: "Senior Data Analyst · Quantitative Modeling",
    doodle: "https://api.dicebear.com/9.x/open-peeps/svg?seed=BrazzGabriel",
    description: "Statistical modeling, financial data pipelines, and quantitative verification algorithms for AST balance-sheet reconciliation.",
    email: "hanabi@enveraitech.com"
  },
  {
    name: "Kadam Krupa",
    role: "Finance Lead · Corporate Treasury & Compliance",
    doodle: "https://api.dicebear.com/9.x/open-peeps/svg?seed=KadamKrupa",
    description: "Overseeing financial strategy, institutional capital allocation, statutory audit compliance, and corporate governance.",
    email: "hanabi@enveraitech.com"
  },
  {
    name: "Umaira Ansari",
    role: "AI Enablement Analyst",
    doodle: "https://api.dicebear.com/9.x/open-peeps/svg?seed=UmairaAnsari",
    description: "Mapping complex commercial workflows into deterministic multi-agent state machines to accelerate enterprise adoption.",
    email: "hanabi@enveraitech.com"
  },
  {
    name: "Zaid Shaikh",
    role: "Systems & Infrastructure Engineer",
    doodle: "https://api.dicebear.com/9.x/open-peeps/svg?seed=ZaidShaikh",
    description: "Developing fault-tolerant microservices, multi-cloud Terraform pipelines, and sovereign VPC network boundaries.",
    email: "hanabi@enveraitech.com"
  }
];

export default function About() {
  usePageMeta({
    title: "About Us — Sovereign AI Engineers & Founders",
    description: "Meet the engineering and governance team behind Enver AI Tech. DPIIT recognized startup building deterministic agentic architectures and AST security sentinels.",
  });

  return (
    <div className="relative bg-[#F7F3E9] text-[#2B121F] min-h-screen pt-8 sm:pt-12 font-sans selection:bg-[#2B121F] selection:text-[#F7F3E9] overflow-hidden">
      {/* =========================================================================
          FULL-PAGE SOVEREIGN GHOSTFIBERS NEURAL CANVAS BACKGROUND
          Covers the entire About page continuously with sovereign fiber telemetry.
          ========================================================================= */}
      <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden opacity-[0.24]">
        <GhostFibers
          className="w-full h-full"
          lineColor="#4A2237"
          glowColor="#FF6F1E"
          speed={0.12}
          scale={1.8}
          rotationSpeed={0.08}
          layers={4}
          waveAmplitude={0.016}
          waveFrequency={2.8}
          waveSpeed={0.12}
          layerSpeed={0.06}
          glowIntensity={1.4}
          brightness={1.8}
          blueBoost={1.05}
          vignette={0.4}
          grain={0.03}
          lightMode={true}
        />
      </div>

      {/* === HERO SECTION === */}
      <section className="relative z-10 overflow-hidden py-16 lg:py-24 border-b border-[#E5DFD1]/80 bg-transparent">

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFD1] text-[#2B121F] text-xs font-mono font-semibold shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F1E] animate-pulse" />
                <span>ABOUT US · INTELLIGENCE CORE</span>
              </div>

              <div className="max-w-2xl">
                <SplitText
                  text="The Engineering Minds Behind Enterprise AI."
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-heading font-extrabold text-[#2B121F] leading-[1.12] tracking-tight text-left"
                  delay={35}
                  duration={0.9}
                  ease="power3.out"
                  splitType="words, chars"
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                  textAlign="left"
                  tag="h1"
                />
              </div>

              <p className="text-base sm:text-lg font-sans text-[#7A6F68] max-w-xl leading-relaxed">
                With rigorous hands-on experience orchestrating sophisticated data pipelines and architecting secure systems, our engineering core bridges the gap between state-of-the-art AI research and production-grade enterprise reality. We engineer autonomous decisioning infrastructure that scales gracefully.
              </p>

              {/* Verified Institutional Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-[#7A6F68]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DFD1] shadow-2xs">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span className="text-[#2B121F] font-semibold">DPIIT Recognized</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DFD1] shadow-2xs">
                  <Award size={13} className="text-[#FF6F1E]" />
                  <span className="text-[#2B121F] font-semibold">BITSoM Incubated</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DFD1] shadow-2xs">
                  <Cloud size={13} className="text-cyan-600" />
                  <span className="text-[#2B121F] font-semibold">Tier-1 Cloud Scaled</span>
                </div>
              </div>
            </div>

            {/* Right Content: Interactive Sovereign MetaBalls Fluid Canvas (Desktop only, transparent, interactive cursor) */}
            <div className="hidden lg:flex lg:col-span-5 w-full h-[480px] relative items-center justify-center select-none overflow-hidden">
              <MetaBalls
                className="w-full h-full"
                color="#2B121F"
                cursorBallColor="#FF6F1E"
                speed={0.32}
                ballCount={16}
                clumpFactor={1.15}
                cursorBallSize={3.4}
                animationSize={28}
                hoverSmoothness={0.06}
                enableMouseInteraction={true}
                enableTransparency={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* === CREDIBILITY & VERIFIED BADGES SECTION === */}
      <section className="py-20 border-b border-[#E5DFD1]/80 relative z-10 bg-transparent">
        <div className="container">
          <div className="mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6EDF2] text-[#2B121F] text-xs font-mono font-bold mb-3 border border-[#E5DFD1]">
              <ShieldCheck size={14} className="text-[#FF6F1E]" />
              VERIFIED CREDENTIALS
            </div>
            <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-[#2B121F]">
              Founding Leadership & Industry Verification
            </h2>
            <p className="text-[#7A6F68] font-sans text-sm max-w-2xl mt-2">
              Our engineering standards are grounded in verified academic excellence, official incubator backing, and recognized global technical credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* LinkedIn Badge */}
            <a
              href="https://www.linkedin.com/in/tendo296/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E5DFD1] hover:border-[#2B121F] transition-all no-underline block group shadow-2xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center font-heading font-extrabold text-xl mb-4 group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                in
              </div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#2B121F] bg-[#F6EDF2] px-2 py-0.5 rounded inline-block mb-2">
                FOUNDER
              </span>
              <h3 className="text-xl font-heading font-extrabold text-[#2B121F] group-hover:text-[#0A66C2] transition-colors mb-1">
                Amaan Kaiser Shaikh
              </h3>
              <p className="text-xs font-sans text-[#7A6F68] mb-4">
                Founder & Lead AI Engineer (LinkedIn: @tendo296)
              </p>
              <div className="text-xs font-mono font-bold text-[#0A66C2] flex items-center gap-1">
                View LinkedIn Profile <ArrowRight size={12} />
              </div>
            </a>

            {/* Credly Badge */}
            <a
              href="https://www.credly.com/users/hanabi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E5DFD1] hover:border-[#FF6F1E] transition-all no-underline block group shadow-2xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FF6F1E]/15 text-[#FF6F1E] flex items-center justify-center font-heading font-extrabold text-xl mb-4 group-hover:bg-[#FF6F1E] group-hover:text-white transition-colors">
                CR
              </div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#FF6F1E] bg-[#FF6F1E]/10 px-2 py-0.5 rounded inline-block mb-2">
                CERTIFICATIONS
              </span>
              <h3 className="text-xl font-heading font-extrabold text-[#2B121F] group-hover:text-[#FF6F1E] transition-colors mb-1">
                Credly Transcript
              </h3>
              <p className="text-xs font-sans text-[#7A6F68] mb-4">
                Verified Cloud, Security & AI Badges (@hanabi)
              </p>
              <div className="text-xs font-mono font-bold text-[#FF6F1E] flex items-center gap-1">
                Verify Credentials on Credly <ArrowRight size={12} />
              </div>
            </a>

            {/* Academic Degree Badge */}
            <div className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E5DFD1] shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center font-heading font-extrabold text-lg mb-4">
                B.E.
              </div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#1877F2] bg-[#1877F2]/10 px-2 py-0.5 rounded inline-block mb-2">
                ACADEMIC DEGREE
              </span>
              <h3 className="text-xl font-heading font-extrabold text-[#2B121F] mb-1">
                B.E. AI & Data Science
              </h3>
              <p className="text-xs font-sans text-[#7A6F68] mb-4">
                University of Mumbai
              </p>
              <div className="text-xs font-mono font-bold text-[#1877F2]">
                Autonomous Systems & ML Focus
              </div>
            </div>

            {/* Accelerator & Incubator Badge */}
            <div className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E5DFD1] shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-heading font-extrabold text-lg mb-4">
                INC
              </div>
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded inline-block mb-2">
                INCUBATOR BACKED
              </span>
              <h3 className="text-xl font-heading font-extrabold text-[#2B121F] mb-1">
                BITSoM Vertex AI
              </h3>
              <p className="text-xs font-sans text-[#7A6F68] mb-4">
                Incubatorship · Google Cloud, AWS &amp; Azure Cohorts
              </p>
              <div className="text-xs font-mono font-bold text-emerald-600">
                Scaling Gracefully
              </div>
            </div>
          </div>

          {/* Institutional Endorsement Strip */}
          <InstitutionalEndorsement className="mt-12" />
        </div>
      </section>



      {/* === TEAM SECTION === */}
      <section className="py-20 relative z-10 bg-transparent border-b border-[#E5DFD1]/80">
        <div className="container">
          <div className="mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#2B121F] text-xs font-mono font-bold mb-3 border border-[#E5DFD1]">
              THE TEAM
            </div>
            <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-[#2B121F] mb-3">
              Engineering Core
            </h2>
            <p className="text-[#7A6F68] font-sans text-base max-w-xl">
              Specialized engineers dedicated to uncompromised technical excellence and scalable architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <SpotlightCard
                key={idx}
                className="p-6 md:p-8 rounded-2xl bg-white border border-[#E5DFD1] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                spotlightColor="rgba(43, 18, 31, 0.05)"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#F7F3E9] border border-[#E5DFD1] flex items-center justify-center mb-6 overflow-hidden relative shadow-2xs">
                    <img
                      src={member.doodle}
                      alt={`${member.name} doodle`}
                      className="w-full h-full object-cover p-1"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.style.display = "none";
                        if (target.parentElement) {
                          const fallbackDiv = document.createElement("div");
                          fallbackDiv.className = "w-full h-full flex items-center justify-center font-heading font-extrabold text-xl text-[#2B121F] bg-[#F7F3E9]";
                          fallbackDiv.innerText = member.name.split(" ").map(n => n[0]).join("");
                          target.parentElement.appendChild(fallbackDiv);
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-heading font-extrabold text-[#2B121F] mb-1">
                    {member.name}
                  </h3>
                  <div className="text-[#FF6F1E] font-mono text-xs uppercase tracking-wider font-bold mb-4">
                    {member.role}
                  </div>
                  <p className="text-[#7A6F68] font-sans text-xs sm:text-sm leading-relaxed mb-6 min-h-[4.5rem]">
                    {member.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5DFD1] flex flex-col gap-2">
                  {member.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-[#7A6F68] shrink-0" />
                      <a
                        href={`mailto:${member.email}`}
                        className="text-xs font-mono text-[#7A6F68] hover:text-[#2B121F] font-medium transition-colors no-underline truncate"
                      >
                        {member.email}
                      </a>
                    </div>
                  )}
                  {member.linkedin && (
                    <div>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-bold text-[#0A66C2] hover:text-[#2B121F] transition-colors no-underline inline-flex items-center gap-1"
                      >
                        LinkedIn Profile <ArrowRight size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="py-20 text-center relative z-10 bg-transparent">
        <div className="container max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E5DFD1] shadow-xs">
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-[#2B121F] mb-4">
            Want to collaborate with our architects?
          </h2>
          <p className="text-[#7A6F68] font-sans text-base md:text-lg mb-8 leading-relaxed">
            Get in touch to discuss how we can engineer explainable underwriting or agentic cloud governance for your enterprise.
          </p>
          <Link
            href="/contact"
            className="almetra-btn-primary !min-h-[48px] !px-8 text-sm font-mono font-semibold no-underline inline-flex items-center gap-2"
          >
            Schedule Architecture Briefing <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
