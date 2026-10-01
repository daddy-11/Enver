import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Layers,
  BarChart3,
  Cpu,
  CheckCircle2,
  Terminal,
  Activity,
  Network,
  Lock,
  Code2,
  FileText,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Eye,
  Database,
  Server,
  Fingerprint,
  ChevronRight,
  Zap,
  CheckCheck,
  FileCode,
  AlertTriangle
} from "lucide-react";
import Marquee from "@/components/reactbits/Marquee";
// @ts-ignore
import Lightfall from "@/components/reactbits/Lightfall";
import FlipCard from "@/components/reactbits/FlipCard";
import InfiniteMenu from "@/components/reactbits/InfiniteMenu";

const ECOSYSTEM_INFINITE_ITEMS = [
  {
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&h=600&fit=crop&q=80",
    link: "/accreditations",
    title: "BITSoM Vertex AI",
    description: "Incubated at BITS School of Management AI Cohort"
  },
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=600&fit=crop&q=80",
    link: "/accreditations",
    title: "FITT IIT Delhi",
    description: "Deep-tech incubation & institutional research validation"
  },
  {
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop&q=80",
    link: "/accreditations",
    title: "Sarvam Tech Start-up",
    description: "Indic foundation intelligence & sovereign agentic ecosystem"
  },
  {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=600&fit=crop&q=80",
    link: "/accreditations",
    title: "Google Cloud",
    description: "Google Cloud for Startups sovereign credits & Vertex AI"
  },
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=600&fit=crop&q=80",
    link: "/accreditations",
    title: "Microsoft Azure",
    description: "Azure TechStartup enterprise architecture"
  },
  {
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=600&fit=crop&q=80",
    link: "/accreditations",
    title: "AWS Activate",
    description: "Multi-cloud zero-trust infrastructure backing"
  },
  {
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&h=600&fit=crop&q=80",
    link: "/accreditations",
    title: "Typesafe AI",
    description: "Deterministic typed reasoning & structured judgment units"
  },
  {
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=600&fit=crop&q=80",
    link: "/accreditations",
    title: "Kotak Bizlabs S3",
    description: "Institutional commercial fintech accelerator cohort S3"
  },
  {
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=600&fit=crop&q=80",
    link: "/accreditations",
    title: "Hub71 Sovereign",
    description: "Abu Dhabi global sovereign tech ecosystem"
  },
  {
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=600&fit=crop&q=80",
    link: "/accreditations",
    title: "DPIIT Certified",
    description: "Govt of India recognized deep-tech enterprise"
  }
];

export default function Home() {

  return (
    <div className="relative w-full text-[#2B121F] min-h-screen font-sans selection:bg-[#2B121F] selection:text-[#F7F3E9]">
      {/* Full-Page Persistent Animated Lightfall Canvas Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <Lightfall
          backgroundColor="#F7F3E9"
          colors={["#FF6F1E", "#FFA048", "#FFD285", "#FF802B", "#FFFFFF"]}
          speed={1.2}
          streakCount={110}
          streakWidth={1.5}
          streakLength={1.8}
          glow={1.2}
          twinkle={1.2}
          mouseInteraction={true}
          mouseStrength={1.2}
          mouseRadius={170}
          className="w-full h-full"
        />
      </div>

      {/* =========================================================================
          1. HERO SECTION — Full-Bleed Animated Lightfall on Camel/Mist Background
          ========================================================================= */}
      <section className="relative z-10 w-full min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center pt-28 sm:pt-36 pb-20 overflow-hidden border-b border-[#E5DFD1]/80 bg-transparent">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#4A2237]/10 via-[#F3EFE4]/50 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute bottom-5 left-10 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#FF6F1E]/8 to-transparent blur-[100px] pointer-events-none" />

        <div className="max-w-[1080px] mx-auto px-4 sm:px-8 relative z-10 text-center flex flex-col items-center pointer-events-none">
          {/* Rounded Pill Badge (Clean, Focused) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E5DFD1] text-xs font-mono text-[#2B121F] shadow-xs pointer-events-auto"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF6F1E] shadow-[0_0_8px_#FF6F1E] animate-pulse" />
            <span className="font-semibold text-[#2B121F]">Enver AI Tech Pvt Ltd.</span>
          </motion.div>

          {/* Main Headline (Punchy, Confident, Modern) */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[78px] font-heading font-bold text-[#2B121F] leading-[1.05] tracking-[-0.035em] mb-6 max-w-4xl"
          >
            Autonomous Agents. <br />
            <span className="bg-gradient-to-r from-[#2B121F] via-[#4A2237] to-[#FF6F1E] bg-clip-text text-transparent">
              Deterministic Proof.
            </span>
          </motion.h1>

          {/* Clean Subtitle (Clear, Punchy, Zero Jargon Clutter) */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl font-sans text-[#7A6F68] max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Building AI Infrastructure For Enterprise Operation — Underwriting Engines to CLoud Governance.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
          >
            <Link
              href="/playground"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#2B121F] hover:bg-[#FF6F1E] text-white font-semibold text-sm tracking-wide transition-all shadow-[0_4px_24px_rgba(43,18,31,0.25)] hover:shadow-[0_4px_30px_rgba(255,111,30,0.4)] no-underline"
            >
              <span>See Agent Console</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link
              href="/services?case=bespoke-sovereign#case-dossier"
              className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-[#E5DFD1] hover:border-[#2B121F] text-[#2B121F] font-medium text-sm transition-all shadow-xs no-underline"
            >
              <span>Explore Bespoke</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          2. ACCREDITATION MARQUEE — Refined Glassmorphic Bridge
          ========================================================================= */}
      <div className="relative z-10 bg-[#FAF7F0]/70 backdrop-blur-md py-4 border-b border-[#E5DFD1]/80 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-center gap-2 text-center font-mono text-[11px] uppercase tracking-widest text-[#7A6F68] mb-2 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Accelerated &amp; Institutional Ecosystems</span>
            <Link href="/accreditations" className="text-[#FF6F1E] hover:underline font-bold ml-1 text-[10px] no-underline">
              [View Accreditations →]
            </Link>
          </div>
          <Marquee
            text="BITSoM VERTEX AI INCUBATOR • FITT IIT DELHI • JUBILANT BHARTIA FOUNDATION • GOOGLE CLOUD FOR STARTUPS • AWS ACTIVATE TECHSTARTUP • MICROSOFT AZURE TECHSTARTUP • HUB71 • DPIIT RECOGNIZED DEEP-TECH"
            speed={28}
            className="text-[#2B121F] font-mono font-medium text-xs sm:text-sm tracking-wider"
          />
        </div>
      </div>

      {/* =========================================================================
          3. HOW WE OPERATE — FORWARD DEPLOYED AI ENGINEERING
          ========================================================================= */}
      <section className="py-20 md:py-28 relative z-10 bg-gradient-to-b from-[#F7F3E9]/40 via-white/60 to-white/95">
        {/* Subtle Engineering Grid Backdrop */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2B121F_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Sticky Mission Manifesto (<75 Words) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 self-start pb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6EDF2] border border-[#2B121F]/20 text-[#2B121F] font-mono text-xs font-bold mb-5 tracking-wider shadow-xs">
                <Terminal size={13} className="text-[#FF6F1E]" />
                <span>01 · HOW WE OPERATE · FORWARD DEPLOYED AI</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2B121F] leading-[1.12] tracking-tight">
                A team of engineers with too much credit on hand.
              </h2>
              
              {/* Concise High-Immersion Narrative (< 75 Words) */}
              <div className="text-sm sm:text-base font-sans text-[#7A6F68] mt-6 leading-relaxed">
                <p>
                  We build sovereign AI infrastructure for high-stakes enterprise desks where hallucination is an existential liability. Our forward-deployed engineers replace generative token guessing with mathematically validated AST code execution—computing balance-sheet ratios and cloud boundaries with 0.00% drift, sealed with line-level SHA-256 cryptographic proofs.
                </p>
              </div>

              {/* Architectural Capability Chips */}
              <div className="flex flex-wrap items-center gap-2.5 mt-6 pt-6 border-t border-[#E5DFD1]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5DFD1] text-xs font-mono font-medium text-[#2B121F] shadow-2xs">
                  <CheckCircle2 size={12} className="text-emerald-600" />
                  0.00% Probabilistic Drift
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5DFD1] text-xs font-mono font-medium text-[#2B121F] shadow-2xs">
                  <ShieldCheck size={12} className="text-[#FF6F1E]" />
                  AST-Grounded Scoring
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5DFD1] text-xs font-mono font-medium text-[#2B121F] shadow-2xs">
                  <Lock size={12} className="text-[#4A2237]" />
                  SHA-256 Line Citations
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5DFD1] text-xs font-mono font-medium text-[#2B121F] shadow-2xs">
                  <Server size={12} className="text-[#2B121F]" />
                  Private Sovereign VPCs
                </span>
              </div>

              {/* Interactive Operating Pillar Navigation Pills */}
              <div className="hidden lg:flex flex-col gap-2.5 mt-8 pt-6 border-t border-[#E5DFD1]">
                <div className="flex items-center justify-between text-xs font-mono text-[#7A6F68]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F1E] animate-pulse" />
                    <span>3 Sovereign Pillars Beside</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#FF6F1E] font-bold">Interactive</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("card-01");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-[#FAF7F0] border border-[#E5DFD1] hover:border-[#FF6F1E] text-xs font-mono text-[#2B121F] hover:text-[#FF6F1E] transition-all shadow-2xs cursor-pointer"
                  >
                    01 · Code Scoring
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("card-02");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-[#FAF7F0] border border-[#E5DFD1] hover:border-[#FF6F1E] text-xs font-mono text-[#2B121F] hover:text-[#FF6F1E] transition-all shadow-2xs cursor-pointer"
                  >
                    02 · Safety Guard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("card-03");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-[#FAF7F0] border border-[#E5DFD1] hover:border-[#FF6F1E] text-xs font-mono text-[#2B121F] hover:text-[#FF6F1E] transition-all shadow-2xs cursor-pointer"
                  >
                    03 · Forensic Audit
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Clean, Perfectly Sorted Specialty Cards (No Command Brackets) */}
            <div className="lg:col-span-7 flex flex-col gap-6 relative pb-10">
              {/* Sorted Card 1: Deterministic Rails */}
              <div
                id="card-01"
                className="scroll-mt-28 rounded-3xl bg-white border border-[#E5DFD1] p-7 sm:p-9 shadow-[0_12px_36px_rgba(43,18,31,0.06)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#FF6F1E] font-bold bg-[#FAF7F0] px-3.5 py-1 rounded-full border border-[#E5DFD1]">
                    01 · DETERMINISTIC RAILS
                  </span>
                  <Code2 size={20} className="text-[#FF6F1E]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#2B121F] mb-3">
                  Code-Grounded Execution
                </h3>
                <p className="text-sm font-sans text-[#7A6F68] leading-relaxed">
                  Enterprise operations cannot tolerate generative guessing. Ingestion, reconciliation, and decision workflows execute through deterministic logic in code—delivering 100% reliable results every single time.
                </p>
              </div>

              {/* Sorted Card 2: Safety First */}
              <div
                id="card-02"
                className="scroll-mt-28 rounded-3xl bg-[#2B121F] text-white border border-[#4A2237] p-7 sm:p-9 shadow-[0_20px_48px_rgba(0,0,0,0.3)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#FF6F1E] font-bold bg-white/10 px-3.5 py-1 rounded-full border border-white/15">
                    02 · SAFETY FIRST
                  </span>
                  <Shield size={20} className="text-[#FF6F1E]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
                  Zero-Destruction Firewalls
                </h3>
                <p className="text-sm font-sans text-white/80 leading-relaxed">
                  Autonomous agents operate under hard-coded blast-radius boundaries. Abstract Syntax Tree parsers intercept and terminate irreversible commands (table drops, mass deletions, IAM overrides) across cloud tenancies.
                </p>
              </div>

              {/* Sorted Card 3: Citation Integrity */}
              <div
                id="card-03"
                className="scroll-mt-28 rounded-3xl bg-white border border-[#E5DFD1] p-7 sm:p-9 shadow-[0_24px_56px_rgba(43,18,31,0.09)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#4A2237] font-bold bg-[#F6EDF2] px-3.5 py-1 rounded-full border border-[#2B121F]/15">
                    03 · CITATION INTEGRITY
                  </span>
                  <Lock size={20} className="text-[#2B121F]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#2B121F] mb-3">
                  Forensic Audit Trails
                </h3>
                <p className="text-sm font-sans text-[#7A6F68] leading-relaxed">
                  Every inference, risk flag, and credit assessment is pinned directly to original source lines — bank statement pages, tax challans, or git commit hashes — sealed with tamper-evident cryptographic hashes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. ENTERPRISE SPECIALTIES IN 3D ORBIT — REACT BITS FLIPCARD DOSSIERS
          ========================================================================= */}
      <section id="specialties" className="py-20 md:py-28 relative z-10 bg-white/90 backdrop-blur-md border-b border-[#E5DFD1]/50 overflow-hidden">
        {/* Subtle grid accent */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#2B121F_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6EDF2] border border-[#2B121F]/20 text-[#2B121F] font-mono text-xs font-bold mb-4 tracking-wider shadow-xs">
                <Activity size={13} className="text-[#FF6F1E]" />
                <span>02 · ENTERPRISE SPECIALTIES · 3D INTERACTIVE DOSSIERS</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#2B121F] leading-[1.12] tracking-tight">
                Engineered Specialties in Continuous Motion.
              </h2>
              <p className="text-base sm:text-lg font-sans text-[#7A6F68] mt-4 leading-relaxed">
                Autonomous underwriting fleets, zero-destruction firewalls, and cryptographic audit vaults. Hover for 3D cursor tilt &amp; glare sheen — click or drag to flip the dossier.
              </p>
            </div>

            {/* FlipCard Controls Hint & Live Status */}
            <div className="flex flex-col items-start lg:items-end gap-2.5 shrink-0">
              <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E5DFD1] flex items-center gap-3 shadow-2xs font-mono text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[#2B121F] font-bold">3D Spring Physics</span>
                <span className="text-[#7A6F68]">·</span>
                <span className="text-[#FF6F1E] font-semibold">Flippable &amp; Draggable</span>
              </div>
              <div className="text-[11px] font-mono text-[#7A6F68]">
                Hover to tilt · Click or drag card to flip
              </div>
            </div>
          </div>

          {/* Dynamic 3D Specialty FlipCard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-center py-4">
            {/* Card 1: Artificer Credit Citadel */}
            <FlipCard
              width={360}
              height={500}
              radius={24}
              background="#1C0B15"
              color="#F7F3E9"
              shadow={true}
              shadowColor="#2B121F"
              shadowOpacity={0.4}
              tilt={true}
              tiltMax={14}
              glare={true}
              glareOpacity={0.28}
              hoverScale={1.03}
              perspective={1200}
              front={
                <div className="relative w-full h-full flex flex-col justify-between p-6 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop"
                    alt="Artificer Credit Citadel"
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C0B15] via-[#1C0B15]/75 to-[#1C0B15]/30 pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FF6F1E] font-mono text-[11px] font-bold tracking-wider shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F1E] animate-pulse" />
                      01 · FINTECH UNDERWRITING
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-mono text-white/80 border border-white/10">
                      AST v2.4
                    </span>
                  </div>

                  <div className="relative z-10 space-y-3">
                    <h3 className="text-2xl font-heading font-bold text-white tracking-tight">
                      Artificer Credit Citadel
                    </h3>
                    <p className="text-xs font-sans text-[#E5DFD1]/90 leading-relaxed">
                      Autonomous multi-agent balance sheet &amp; GST reconciliation engine for corporate credit desks.
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-medium">
                        0.00% Drift
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10 text-[10px] font-mono">
                        GST &amp; ITR Audits
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10 text-[10px] font-mono">
                        40-Page Memos
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-[#FF6F1E]">
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={12} />
                        <span>Click or Drag to Flip</span>
                      </span>
                      <span className="text-white/60">Specs ⟳</span>
                    </div>
                  </div>
                </div>
              }
              back={
                <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#1C0B15] via-[#2B121F] to-[#14080F] text-[#F7F3E9] overflow-hidden">
                  <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-[#FF6F1E]/15 blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#FF6F1E] font-bold">
                        SYSTEM SPECIFICATION
                      </div>
                      <div className="text-lg font-heading font-bold text-white">Artificer XAI Fleet</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FF6F1E]">
                      <Code2 size={16} />
                    </div>
                  </div>

                  <div className="relative z-10 space-y-3 my-auto py-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-xs font-mono text-[#FF6F1E] font-semibold flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                        Deterministic AST Engine
                      </div>
                      <p className="text-[11px] text-white/75 leading-relaxed font-sans">
                        Cross-verifies multi-year P&amp;L, balance sheets, and tax filings through compiled code logic with zero hallucination.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-xs font-mono text-[#FF6F1E] font-semibold flex items-center gap-1.5">
                        <FileText size={12} className="text-[#FFA048] shrink-0" />
                        Institutional Underwriting Memos
                      </div>
                      <p className="text-[11px] text-white/75 leading-relaxed font-sans">
                        Compiles comprehensive 40-page institutional appraisal memos with line-by-line source citations in under 90 seconds.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-xs font-mono text-[#FF6F1E] font-semibold flex items-center gap-1.5">
                        <Database size={12} className="text-cyan-400 shrink-0" />
                        Multi-Bank Extractor
                      </div>
                      <p className="text-[11px] text-white/75 leading-relaxed font-sans">
                        Ingests 12+ statement formats with 99.98% extraction fidelity, flagging circular transactions and undisclosed debt.
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Production Ready
                    </span>
                    <Link
                      href="/services?case=artificer-xai#case-dossier"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF6F1E] hover:bg-[#FF802B] text-white font-mono text-xs font-semibold tracking-wider transition-all shadow-xs no-underline"
                    >
                      <span>Dossier</span>
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              }
            />

            {/* Card 2: Arbiter Cloud Ops Guard */}
            <FlipCard
              width={360}
              height={500}
              radius={24}
              background="#160B1C"
              color="#F7F3E9"
              shadow={true}
              shadowColor="#2B121F"
              shadowOpacity={0.4}
              tilt={true}
              tiltMax={14}
              glare={true}
              glareOpacity={0.28}
              hoverScale={1.03}
              perspective={1200}
              front={
                <div className="relative w-full h-full flex flex-col justify-between p-6 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80&auto=format&fit=crop"
                    alt="Arbiter Multi-Cloud Governance"
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160B1C] via-[#160B1C]/75 to-[#160B1C]/30 pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FF6F1E] font-mono text-[11px] font-bold tracking-wider shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      02 · CLOUD GOVERNANCE
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-mono text-white/80 border border-white/10">
                      Guard v3.1
                    </span>
                  </div>

                  <div className="relative z-10 space-y-3">
                    <h3 className="text-2xl font-heading font-bold text-white tracking-tight">
                      Arbiter Cloud Ops Guard
                    </h3>
                    <p className="text-xs font-sans text-[#E5DFD1]/90 leading-relaxed">
                      Zero-destruction AST command firewall and blast-radius governor across multi-cloud tenancies.
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono font-medium">
                        0 Drops
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10 text-[10px] font-mono">
                        AWS · GCP · Azure
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10 text-[10px] font-mono">
                        Blast Radius
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-[#FF6F1E]">
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={12} />
                        <span>Click or Drag to Flip</span>
                      </span>
                      <span className="text-white/60">Specs ⟳</span>
                    </div>
                  </div>
                </div>
              }
              back={
                <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#160B1C] via-[#2B121F] to-[#0F0814] text-[#F7F3E9] overflow-hidden">
                  <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-rose-500/15 blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#FF6F1E] font-bold">
                        SECURITY GOVERNOR
                      </div>
                      <div className="text-lg font-heading font-bold text-white">Arbiter Sentinel</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-rose-400">
                      <Shield size={16} />
                    </div>
                  </div>

                  <div className="relative z-10 space-y-3 my-auto py-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-xs font-mono text-rose-300 font-semibold flex items-center gap-1.5">
                        <Shield size={12} className="text-rose-400 shrink-0" />
                        Zero-Destruction AST Intercept
                      </div>
                      <p className="text-[11px] text-white/75 leading-relaxed font-sans">
                        Parses terminal payloads and prevents catastrophic accidental actions (table drops, recursive deletes, IAM privilege escalations).
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-xs font-mono text-rose-300 font-semibold flex items-center gap-1.5">
                        <Activity size={12} className="text-amber-400 shrink-0" />
                        Ephemeral Blast Simulation
                      </div>
                      <p className="text-[11px] text-white/75 leading-relaxed font-sans">
                        Tests destructive operations inside ephemeral container sandboxes to quantify downtime risk before allowing cluster execution.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-xs font-mono text-rose-300 font-semibold flex items-center gap-1.5">
                        <Server size={12} className="text-cyan-400 shrink-0" />
                        Continuous Cloud Telemetry
                      </div>
                      <p className="text-[11px] text-white/75 leading-relaxed font-sans">
                        Maintains 24/7 audit health across AWS, Microsoft Azure, and Google Cloud sovereign tenancies with immediate threat isolation.
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Protection
                    </span>
                    <Link
                      href="/services?case=arbiter-guard#case-dossier"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF6F1E] hover:bg-[#FF802B] text-white font-mono text-xs font-semibold tracking-wider transition-all shadow-xs no-underline"
                    >
                      <span>Dossier</span>
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              }
            />

            {/* Card 3: Cerberus Sentinel Vault */}
            <FlipCard
              width={360}
              height={500}
              radius={24}
              background="#0B161C"
              color="#F7F3E9"
              shadow={true}
              shadowColor="#2B121F"
              shadowOpacity={0.4}
              tilt={true}
              tiltMax={14}
              glare={true}
              glareOpacity={0.28}
              hoverScale={1.03}
              perspective={1200}
              front={
                <div className="relative w-full h-full flex flex-col justify-between p-6 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80&auto=format&fit=crop"
                    alt="Cerberus Zero-Trust Sentinel"
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B161C] via-[#0B161C]/75 to-[#0B161C]/30 pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FF6F1E] font-mono text-[11px] font-bold tracking-wider shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      03 · ZERO-TRUST VAULT
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-mono text-white/80 border border-white/10">
                      Vault v4.0
                    </span>
                  </div>

                  <div className="relative z-10 space-y-3">
                    <h3 className="text-2xl font-heading font-bold text-white tracking-tight">
                      Cerberus Sentinel Vault
                    </h3>
                    <p className="text-xs font-sans text-[#E5DFD1]/90 leading-relaxed">
                      Shannon entropy leaked key defense and cryptographic line-level audit trails for sovereign clouds.
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-medium">
                        100% Pinned
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10 text-[10px] font-mono">
                        Shannon Entropy
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10 text-[10px] font-mono">
                        SHA-256 Vault
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-[#FF6F1E]">
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={12} />
                        <span>Click or Drag to Flip</span>
                      </span>
                      <span className="text-white/60">Specs ⟳</span>
                    </div>
                  </div>
                </div>
              }
              back={
                <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#0B161C] via-[#12242B] to-[#070E12] text-[#F7F3E9] overflow-hidden">
                  <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#FF6F1E] font-bold">
                        CRYPTOGRAPHIC AUDIT
                      </div>
                      <div className="text-lg font-heading font-bold text-white">Cerberus DevSecOps</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                      <Lock size={16} />
                    </div>
                  </div>

                  <div className="relative z-10 space-y-3 my-auto py-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-xs font-mono text-emerald-300 font-semibold flex items-center gap-1.5">
                        <Fingerprint size={12} className="text-emerald-400 shrink-0" />
                        Shannon Entropy Key Defense
                      </div>
                      <p className="text-[11px] text-white/75 leading-relaxed font-sans">
                        Statistical entropy scanning intercepts high-randomness credentials, private tokens, and API secrets before pull-request merges.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-xs font-mono text-emerald-300 font-semibold flex items-center gap-1.5">
                        <Lock size={12} className="text-cyan-400 shrink-0" />
                        Cryptographic SHA-256 Pinning
                      </div>
                      <p className="text-[11px] text-white/75 leading-relaxed font-sans">
                        Every agent decision and parameter transformation is pinned with immutable cryptographic hashes for regulator inspection.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-xs font-mono text-emerald-300 font-semibold flex items-center gap-1.5">
                        <Server size={12} className="text-[#FFA048] shrink-0" />
                        Air-Gapped Sovereign Enclave
                      </div>
                      <p className="text-[11px] text-white/75 leading-relaxed font-sans">
                        Zero-egress architecture deployed in dedicated enterprise VPCs, complying with strict banking, defense, and healthcare mandates.
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      SOC2 &amp; ISO Ready
                    </span>
                    <Link
                      href="/services?case=cerberus-sentinel#case-dossier"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF6F1E] hover:bg-[#FF802B] text-white font-mono text-xs font-semibold tracking-wider transition-all shadow-xs no-underline"
                    >
                      <span>Dossier</span>
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ACCREDITED ECOSYSTEMS — 3D INFINITE ORBIT SPHERE (REACT BITS)
          ========================================================================= */}
      <section id="accreditations" className="py-20 md:py-28 relative z-10 bg-white border-b border-[#E5DFD1]/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6EDF2] border border-[#2B121F]/20 text-[#2B121F] font-mono text-xs font-bold mb-4 tracking-wider shadow-xs">
                <ShieldCheck size={13} className="text-[#FF6F1E]" />
                <span>03 · ACCREDITED ECOSYSTEMS · 3D INFINITE SPHERE</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#2B121F] leading-[1.12] tracking-tight">
                Recognized by Global Deep-Tech Institutions.
              </h2>
              <p className="text-base sm:text-lg font-sans text-[#7A6F68] mt-4 leading-relaxed">
                Incubated and accelerated across Tier-1 venture studios, government research foundations, and sovereign cloud ecosystems. Drag and spin the spherical grid.
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-2.5 shrink-0">
              <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#E5DFD1] flex items-center gap-3 shadow-2xs font-mono text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[#2B121F] font-bold">WebGL2 3D Arcball Grid</span>
                <span className="text-[#7A6F68]">·</span>
                <span className="text-[#FF6F1E] font-semibold">Interactive</span>
              </div>
              <Link
                href="/accreditations"
                className="text-xs font-mono text-[#FF6F1E] hover:underline font-bold no-underline flex items-center gap-1"
              >
                <span>Inspect Full Sovereign Recognition Dossier →</span>
              </Link>
            </div>
          </div>

          {/* 3D Infinite Menu Canvas Stage (Pure White Crisp Background) */}
          <div className="w-full h-[540px] sm:h-[620px] relative rounded-3xl overflow-hidden border border-[#E5DFD1] shadow-[0_20px_50px_rgba(43,18,31,0.04)] bg-white">
            <InfiniteMenu
              items={ECOSYSTEM_INFINITE_ITEMS}
              scale={0.92}
              backgroundColor="#FFFFFF"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
