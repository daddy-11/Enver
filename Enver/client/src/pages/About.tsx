import { Mail, ArrowRight, Award, GraduationCap, Cloud, Sparkles, ShieldCheck, Linkedin, CheckCircle2 } from "lucide-react";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import InstitutionalEndorsement from "@/components/InstitutionalEndorsement";
import { Link } from "wouter";

// @ts-ignore
import GhostFibers from "@/components/reactbits/GhostFibers";
// @ts-ignore
import SplitText from "@/components/reactbits/SplitText";

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
  return (
    <div className="bg-[#F7F3E9] text-[#2B121F] min-h-screen pt-28 sm:pt-36 font-sans">
      {/* === HERO SECTION === */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-[#E5DFD1]">
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

            {/* Right Content: Interactive GhostFibers Showcase (5 cols) */}
            <div className="lg:col-span-5 h-[400px] sm:h-[430px] w-full relative rounded-3xl bg-gradient-to-b from-[#180A14] via-[#140810] to-[#0D040A] border border-[#4A2237]/60 overflow-hidden shadow-[0_24px_60px_rgba(43,18,31,0.18)]">
              {/* GhostFibers WebGL Background with Subtle Light Pink Tonal Shift */}
              <div className="absolute inset-0 w-full h-full">
                <GhostFibers
                  lineColor="#6E2349"
                  glowColor="#FFB3D9"
                  speed={0.15}
                  scale={1.85}
                  rotationSpeed={0.12}
                  layers={4}
                  waveAmplitude={0.016}
                  waveFrequency={3.0}
                  waveSpeed={0.12}
                  layerSpeed={0.06}
                  glowIntensity={1.4}
                  brightness={1.9}
                  blueBoost={1.05}
                  vignette={0.65}
                  grain={0.03}
                  lightMode={false}
                />
              </div>

              {/* Overlay Gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D040A]/90 via-transparent to-[#180A14]/50 pointer-events-none" />

              {/* Top Status Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/15 text-[10px] font-mono text-[#FFB3D9] backdrop-blur-md shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F1E] animate-pulse" />
                <span>SOVEREIGN ARCHITECTURAL CORE</span>
              </div>

              {/* Central Interactive Crest Lockup */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                <div className="relative group pointer-events-auto">
                  <img
                    src="/enver-enterprise-crest.png"
                    alt="Enver AI Tech Enterprise Crest"
                    className="w-24 sm:w-28 h-auto object-contain filter drop-shadow-[0_10px_24px_rgba(255,111,30,0.4)] transition-transform duration-300 group-hover:scale-105 select-none"
                  />
                </div>

                <div className="mt-4 space-y-1.5 pointer-events-auto">
                  <div className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                    Enver Intelligence Lab
                  </div>
                  <p className="text-xs font-mono text-[#E5DFD1]/80 max-w-[280px] mx-auto leading-relaxed">
                    Deterministic Multi-Agent State Machines &amp; Enterprise Governance
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 font-medium">
                      0.00% Drift Guard
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-[#FF802B] font-medium">
                      Air-Gapped Sovereign Enclave
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === CREDIBILITY & VERIFIED BADGES SECTION === */}
      <section className="py-20 border-b border-[#E5DFD1] relative bg-white">
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
              className="p-6 rounded-2xl bg-[#F7F3E9] border border-[#E5DFD1] hover:border-[#2B121F] transition-all no-underline block group shadow-2xs hover:shadow-md"
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
              className="p-6 rounded-2xl bg-[#F7F3E9] border border-[#E5DFD1] hover:border-[#FF6F1E] transition-all no-underline block group shadow-2xs hover:shadow-md"
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
            <div className="p-6 rounded-2xl bg-[#F7F3E9] border border-[#E5DFD1] shadow-2xs">
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
            <div className="p-6 rounded-2xl bg-[#F7F3E9] border border-[#E5DFD1] shadow-2xs">
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

      {/* === 3-YEAR ACCOMPLISHMENTS & PRODUCTION MILESTONES (2023–2026) === */}
      <section id="accomplishments" className="py-20 md:py-28 relative bg-[#F7F3E9] border-b border-[#E5DFD1]">
        <div className="container">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6EDF2] border border-[#2B121F]/20 text-[#2B121F] text-xs font-mono font-bold mb-3 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F1E] animate-pulse" />
              [ 3-YEAR JOURNEY &amp; VERIFIED TRACK RECORD ]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#2B121F] tracking-tight leading-tight mb-3">
              What We Have Accomplished.
            </h2>
            <p className="text-base sm:text-lg font-sans text-[#7A6F68] leading-relaxed">
              From founding in Mumbai to institutional incubation under IIT Delhi and deploying production multi-agent systems across India's financial and cloud ecosystems.
            </p>
          </div>

          {/* 4-Year Milestone Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 2023 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E5DFD1] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6F1E] bg-[#FF6F1E]/10 px-3 py-1 rounded-full">
                    2023 // INCORPORATION &amp; FOUNDATION
                  </span>
                  <span className="text-xs font-mono text-[#7A6F68]">Mumbai, MH</span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-[#2B121F] mb-3">
                  Incorporated &amp; DPIIT Recognized
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#7A6F68] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#FF6F1E] shrink-0 mt-0.5" />
                    <span><strong>Private Limited Entity</strong>: Founded Enver AI Tech Pvt Ltd as a sovereign enterprise AI engineering firm.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#FF6F1E] shrink-0 mt-0.5" />
                    <span><strong>Startup India Recognition</strong>: Formally certified deep-tech enterprise under Startup India &amp; DPIIT.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#FF6F1E] shrink-0 mt-0.5" />
                    <span><strong>Core R&amp;D</strong>: Engineered AST security firewalls and Shannon entropy algorithms for zero-trust code auditing.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2024 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E5DFD1] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#2B121F] bg-[#F6EDF2] border border-[#2B121F]/20 px-3 py-1 rounded-full">
                    2024 // INSTITUTIONAL INCUBATION &amp; ARTIFICER MVP
                  </span>
                  <span className="text-xs font-mono text-[#7A6F68]">FITT IITD · BITSoM</span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-[#2B121F] mb-3">
                  Incubated &amp; Shipped Flagship XAI
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#7A6F68] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#2B121F] shrink-0 mt-0.5" />
                    <span><strong>Institutional Backing</strong>: Selected for incubation under <strong>FITT IIT Delhi</strong> and <strong>Jubilant Bhartia Foundation</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#2B121F] shrink-0 mt-0.5" />
                    <span><strong>BITSoM Vertex AI Accelerator</strong>: Selected into cohort backed by Google Cloud and AWS Activate.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#2B121F] shrink-0 mt-0.5" />
                    <span><strong>Artificer Production MVP</strong>: High-throughput ingestion of multi-bank statement formats and GST challans with <strong>0.00% probabilistic drift</strong>.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2025 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E5DFD1] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#4A2237] bg-[#4A2237]/10 px-3 py-1 rounded-full">
                    2025 // MULTI-CLOUD GOVERNANCE &amp; DEVSECOPS
                  </span>
                  <span className="text-xs font-mono text-[#7A6F68]">AWS · GCP · Azure</span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-[#2B121F] mb-3">
                  Arbiter &amp; Cerberus Deployments
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#7A6F68] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#4A2237] shrink-0 mt-0.5" />
                    <span><strong>Arbiter Cloud Firewall</strong>: AST-level destructive command interceptor deployed for Slack/Teams ChatOps (0 accidental drops).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#4A2237] shrink-0 mt-0.5" />
                    <span><strong>Cerberus Sentinel</strong>: Continuous PR entropy scanner with SARIF standard compliance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#4A2237] shrink-0 mt-0.5" />
                    <span><strong>Global Acceleration</strong>: Selected into <strong>Hub71 Validation Workshop</strong> &amp; <strong>Microsoft Azure Founders Hub</strong>.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2026 */}
            <div className="p-8 rounded-3xl bg-[#2B121F] text-white shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#FF6F1E] bg-white/10 px-3 py-1 rounded-full">
                    2026 // SOVEREIGN AIR-GAPPED PRIVATE VPCS
                  </span>
                  <span className="text-xs font-mono text-white/70">NVIDIA TensorRT</span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">
                  Sovereign Enclaves &amp; Rural Synthesis
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-white/80 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#FF6F1E] shrink-0 mt-0.5" />
                    <span><strong>Air-Gapped Private VPCs</strong>: Turnkey multi-agent DAG architectures on NVIDIA NIM with <strong>0 bytes outbound egress</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#FF6F1E] shrink-0 mt-0.5" />
                    <span><strong>Rural Mandi OCR</strong>: Digitizing stamped APMC slips and agricultural trade invoices for regional commerce.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#FF6F1E] shrink-0 mt-0.5" />
                    <span><strong>Unified Intelligence Core</strong>: Production RAG deliberation with real-time 3D neural thinking telemetry.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === TEAM SECTION === */}
      <section className="py-20 relative bg-[#F7F3E9]">
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
      <section className="py-20 text-center border-t border-[#E5DFD1] bg-white">
        <div className="container max-w-2xl mx-auto">
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
