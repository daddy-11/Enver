import { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  Shield,
  Layers,
  BarChart3,
  Network,
  Cpu,
  CheckCircle2,
  Lock,
  Scale,
  Sparkles,
  Building2,
  FileText,
  TrendingUp,
  Activity,
  GitBranch,
  ListFilter,
  ShieldCheck,
  Bot,
  AlertTriangle
} from "lucide-react";
import {
  AiFile01Icon,
  BrickWallShieldIcon,
  CircleLock01Icon,
  CloudServerIcon
} from "@hugeicons/core-free-icons";
import BranchedMenu from "@/components/reactbits/BranchedMenu";

// Enterprise Use Cases Tackled by Enver AI Tech
export const useCases = [
  {
    id: "artificer",
    number: "01",
    title: "MSME Credit Underwriting & Alternative Ledgers",
    client: "Commercial Banking & NBFCs · BITSoM Vertex AI Incubator",
    tagline: "FLAGSHIP PRODUCTION MVP · XAI UNDERWRITING",
    problem:
      "70% of New-to-Credit (NTC) MSMEs in India are rejected on an empty bureau scorecard despite real, healthy cash flow. Credit officers spend 3 to 5 days manually reading 100+ page bank statements and GST filings at $80–$110 per file. Crucial fraud indicators like circular trading and GSTR-1 vs GSTR-3B revenue discrepancies are routinely missed by human reviewers, while black-box scoring violates RBI Digital Lending Guidelines.",
    solution:
      "Enver engineered a four-agent underwriting fleet running on Vertex AI / Gemini. The system ingests messy Indian statement layouts and GST challans, computes five deterministic financial ratios strictly in code (liquidity, revenue, stability, leverage, behaviour), and cross-checks alternative data via an automated credit committee. The output is a locked, tamper-evident underwriting memo with direct line citations.",
    impactMetrics: [
      { label: "TAT Reduction", value: "< 105s", detail: "Down from 3–5 manual days" },
      { label: "Cost Per File", value: "$0.02", detail: "vs $80–$110 manual review" },
      { label: "Tabular Extraction", value: "99.8%", detail: "Indian bank & GST formats" },
      { label: "Compliance", value: "100%", detail: "RBI Digital Lending certified" }
    ],
    techStack: ["Google Vertex AI", "Gemini 1.5 Pro", "Python", "FastAPI", "Azure PostgreSQL", "Sahamati AA"],
    architectureFlow: [
      { step: "01", name: "Multi-Source Ingest", desc: "Bank PDF, PSV, GSTR-1/3B & AA payloads parsed" },
      { step: "02", name: "Grounded Citations", desc: "Every number pinned to a statement line" },
      { step: "03", name: "Deterministic Scoring", desc: "Math in code: 5 pillars computed without model drift" },
      { step: "04", name: "System-2 Committee", desc: "Alternative data cross-referenced for fraud & circular loops" },
      { step: "05", name: "Lock & XAI Drawer", desc: "Dossier locked with cryptographic audit trail" }
    ],
    projectSlug: "artificer"
  },
  {
    id: "arbiter",
    number: "02",
    title: "Multi-Cloud Governance & Destructive-Command Firewall",
    client: "Enterprise DevOps & Infrastructure · AWS / GCP / Azure",
    tagline: "AUTONOMOUS INFRASTRUCTURE SENTINEL",
    problem:
      "Enterprise engineering teams frequently suffer from cloud budget overruns, unmonitored GPU instance sprawl, and disastrous human errors — such as accidental database drops (`DROP TABLE`, `rm -rf`) executed during high-stress deployments.",
    solution:
      "Built Arbiter, an intelligent ChatOps operations bot for Slack and Microsoft Teams. Arbiter intercepts all provisioning requests, calculates budget impact in real time, routes requests to engineering leads for budget gatekeeping, and enforces an AST-level destructive command firewall that hard-blocks catastrophic data-wiping commands.",
    impactMetrics: [
      { label: "Accidental Wipes", value: "0", detail: "Hard-blocked at AST parser" },
      { label: "Compute Savings", value: "34%", detail: "Idle instances auto-reclaimed" },
      { label: "Multi-Cloud Reach", value: "3 Clouds", detail: "AWS, GCP, and Azure unified" },
      { label: "Approval TAT", value: "< 2 mins", detail: "Via Slack & Teams ChatOps" }
    ],
    techStack: ["Go", "AWS SDK", "Azure SDK", "Google Cloud SDK", "Slack Bolt API", "Terraform", "Docker"],
    architectureFlow: [
      { step: "01", name: "ChatOps Intent", desc: "Engineer requests cloud compute via Slack prompt" },
      { step: "02", name: "Budget Gatekeeper", desc: "Agent calculates exact monthly cost estimate" },
      { step: "03", name: "Destructive Firewall", desc: "AST inspects commands for table/disk wipes" },
      { step: "04", name: "Automated Deploy", desc: "Terraform scaffolding across selected cloud" },
      { step: "05", name: "Status Dispatch", desc: "Audit log and rollback tokens generated" }
    ],
    projectSlug: "arbiter"
  },
  {
    id: "cerberus",
    number: "03",
    title: "Cerberus: Cybersecurity, Anti-Bot & Rogue AI Defense",
    client: "Cybersecurity Research Lab · Enterprise Application Defense",
    tagline: "ACTIVE DEFENSE PROGRAM · IN DEVELOPMENT",
    problem:
      "Static CAPTCHAs, legacy rate-limiters, and visual image puzzles are being systematically defeated by autonomous LLM scraping agents, headless browser clusters, and stealth fingerprint spoofing. Modern scraping bots bypass traditional WAFs to scrape proprietary datasets, abuse API tokens, automate credential stuffing, and probe application backends with rogue prompt injections.",
    solution:
      "Cerberus is Enver's active cybersecurity defense program in development, engineered specifically to counter autonomous scrapers, bot swarms, and rogue AI agents. Moving beyond decaying visual CAPTCHAs, Cerberus implements dynamic cryptographic proof-of-work challenges, behavioral DOM event cadence modeling, TLS fingerprint triangulation, and AST-level payload inspection to throttle and deflect unauthorized automated agents with zero latency penalty for human users.",
    impactMetrics: [
      { label: "Scraper Mitigation", value: "99.9%", detail: "Autonomous bot clusters neutralized" },
      { label: "CAPTCHA Evolution", value: "Dynamic PoW", detail: "Frictionless proof-of-work challenge" },
      { label: "Secret Leak Gate", value: "100%", detail: "Pre-commit AST entropy scanner" },
      { label: "Program Status", value: "In Active Dev", detail: "Closed enterprise pilot cohort" }
    ],
    techStack: ["Proof-of-Work Gate", "AST Entropy Engine", "Behavioral Cadence Analyzer", "Go", "Docker", "SARIF Engine"],
    architectureFlow: [
      { step: "01", name: "Ingress Telemetry", desc: "TLS fingerprint, TCP window & headless driver markers probed" },
      { step: "02", name: "Adaptive PoW Friction", desc: "Dynamic cryptographic difficulty scales against automated scrapers" },
      { step: "03", name: "Rogue Agent Semantic Filter", desc: "Detects automated prompt-injection & adversarial scraping intent" },
      { step: "04", name: "AST Policy Enforcer", desc: "Hard-blocks unauthorized payload extraction and secret commits" },
      { step: "05", name: "Forensic Audit Dossier", desc: "OASIS SARIF cryptographic audit & automated IP perimeter quarantine" }
    ],
    projectSlug: "cerberus"
  },
  {
    id: "bespoke-sovereign",
    number: "04",
    title: "Bespoke Sovereign AI Architectures for Enterprise Business",
    client: "Private Enterprise, Regulated BFSI & Defense Infrastructure",
    tagline: "SOVEREIGN AI FOR YOUR BUSINESS",
    problem:
      "Institutional enterprises with sensitive customer PII, confidential trade ledgers, and proprietary IP are legally barred by data protection authorities from sending operational data over public third-party LLM APIs. Off-the-shelf SaaS AI exposes companies to vendor lock-in, latency spikes, and catastrophic data leakage.",
    solution:
      "Enver architects, trains, and deploys custom sovereign AI pipelines tailored specifically to your business operations. Deployed inside your private VPC enclaves (Azure, AWS GovCloud, or GCP) or on-premise GPU clusters, our bespoke architectures combine localized open weights, fine-tuned domain models, and deterministic multi-agent DAGs to give your company enterprise autonomy with 100% data residency and zero external data egress.",
    impactMetrics: [
      { label: "Data Egress", value: "0 Bytes", detail: "100% air-gapped sovereign execution" },
      { label: "IP Ownership", value: "100%", detail: "Client owns models, weights & code" },
      { label: "Inference Latency", value: "< 400ms", detail: "Optimized with NVIDIA TensorRT-LLM" },
      { label: "Compliance", value: "100%", detail: "RBI, SOC2 & national data residency rails" }
    ],
    techStack: ["NVIDIA NIM", "TensorRT-LLM", "Python", "LangGraph", "Docker", "Kubernetes", "Azure / AWS / GCP"],
    architectureFlow: [
      { step: "01", name: "Operational Discovery", desc: "Audit business workflows, data residency & security boundaries" },
      { step: "02", name: "Private VPC Enclave", desc: "Provision isolated air-gapped compute with zero public egress" },
      { step: "03", name: "Domain Model Tuning", desc: "Local open-weights fine-tuned exclusively on your enterprise data" },
      { step: "04", name: "Deterministic Agent DAGs", desc: "Multi-agent orchestration with strict output schemas & state rails" },
      { step: "05", name: "Sovereign Handover", desc: "Continuous monitoring, internal observability & full IP custody transfer" }
    ],
    projectSlug: null
  }
];

// Branched Architecture Menu Items for Enterprise Domains
export const branchedMenuItems = [
  {
    label: "Credit & Underwriting",
    children: [
      {
        value: "artificer",
        label: "Case 01 · MSME Underwriting",
        icon: AiFile01Icon
      }
    ]
  },
  {
    label: "Cloud Ops & Cybersecurity",
    children: [
      {
        value: "arbiter",
        label: "Case 02 · Cloud Governance (Slack)",
        icon: BrickWallShieldIcon
      },
      {
        value: "cerberus",
        label: "Case 03 · Cerberus (Anti-Bot & Rogue AI)",
        icon: CircleLock01Icon
      }
    ]
  },
  {
    label: "Enterprise Solutions",
    children: [
      {
        value: "bespoke-sovereign",
        label: "Case 04 · Bespoke Sovereign AI",
        icon: CloudServerIcon
      }
    ]
  }
];

export default function Services() {
  const [, setLocation] = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeCase = useMemo(() => useCases[selectedIndex], [selectedIndex]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const caseParam = searchParams.get("case");
    if (caseParam === "bespoke-sovereign" || caseParam === "4" || caseParam === "bespoke") {
      setSelectedIndex(3);
      setTimeout(() => {
        const el = document.getElementById("case-dossier");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else if (caseParam) {
      const idx = useCases.findIndex((c) => c.id === caseParam);
      if (idx >= 0) setSelectedIndex(idx);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#2B121F] pt-28 sm:pt-36 pb-24 font-sans">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        
        {/* =========================================================================
            HEADER SECTION — Enterprise Use Cases & System Circuits
            ========================================================================= */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFD1] text-[#2B121F] text-xs font-mono font-semibold shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF6F1E] shadow-[0_0_8px_#FF6F1E] animate-pulse" />
            <span>PRODUCTION CASE STUDIES &amp; ARCHITECTURAL CIRCUITS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-bold text-[#2B121F] tracking-tight leading-[1.08] mb-4">
            Audited Systems. <br />
            <span className="bg-gradient-to-r from-[#2B121F] via-[#4A2237] to-[#FF6F1E] bg-clip-text text-transparent">
              Deterministic Engineering.
            </span>
          </h1>

          <p className="text-sm sm:text-base font-sans text-[#7A6F68] leading-relaxed">
            Explore our four enterprise capability systems. Each deployment enforces hard-coded architectural boundaries, line-level deterministic auditability, and zero hallucination risk across high-stakes business environments.
          </p>
        </div>

        {/* =========================================================================
            1. INTERACTIVE BRANCHED ARCHITECTURE SELECTOR
            ========================================================================= */}
        <div className="mb-14">
          <div className="flex flex-col lg:flex-row items-start gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DFD1] shadow-xs">
            {/* Left: Branched Architecture Tree Navigator */}
            <div className="w-full lg:w-[330px] shrink-0">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#E5DFD1]">
                <GitBranch size={16} className="text-[#FF6F1E]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#2B121F] font-bold">
                  Architecture Branches
                </span>
              </div>
              <p className="text-[12px] font-sans text-[#7A6F68] mb-4 leading-relaxed">
                Autonomous agent systems categorized by enterprise domain. Select any branch node to inspect its execution circuits and live telemetry.
              </p>
              
              <div className="p-4 rounded-2xl bg-[#F7F3E9] border border-[#E5DFD1]/80">
                <BranchedMenu
                  items={branchedMenuItems}
                  defaultOpen={[0, 1, 2]}
                  active={activeCase.id}
                  onSelect={(value: string) => {
                    const idx = useCases.findIndex((c) => c.id === value);
                    if (idx >= 0) setSelectedIndex(idx);
                  }}
                  color="#2B121F"
                  accentColor="#FF6F1E"
                  lineColor="#D9D0C1"
                  width={300}
                  rowHeight={36}
                  indent={38}
                  trunk={14}
                  radius={10}
                  lineWidth={1.5}
                  fontSize={13}
                  drawDuration={350}
                  foldDuration={250}
                />
              </div>
            </div>

            {/* Right: Quick Active Domain Inspector & Snapshot */}
            <div className="flex-1 flex flex-col justify-between self-stretch bg-[#F7F3E9] rounded-2xl p-6 sm:p-8 border border-[#E5DFD1]">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5DFD1] text-[11px] font-mono text-[#2B121F] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#FF6F1E] animate-pulse" />
                    ACTIVE CIRCUIT: CASE {activeCase.number}
                  </div>
                  <span className="text-xs font-mono text-[#7A6F68]">
                    {activeCase.client}
                  </span>
                </div>

                <div className="text-[11px] font-mono uppercase tracking-widest text-[#FF6F1E] font-bold mb-1">
                  {activeCase.tagline}
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#2B121F] tracking-tight mb-3">
                  {activeCase.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#7A6F68] leading-relaxed mb-6">
                  {activeCase.solution}
                </p>

                {/* Mini Metric Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {activeCase.impactMetrics.map((m, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-[#E5DFD1]">
                      <div className="text-lg sm:text-xl font-heading font-bold text-[#2B121F]">
                        {m.value}
                      </div>
                      <div className="text-[10px] font-mono font-bold text-[#FF6F1E] uppercase mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5DFD1] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#7A6F68] uppercase">Stack:</span>
                  <div className="flex flex-wrap gap-1">
                    {activeCase.techStack.slice(0, 4).map((t, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#E5DFD1] text-[#2B121F]">
                        {t}
                      </span>
                    ))}
                    {activeCase.techStack.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-[#7A6F68]">
                        +{activeCase.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <a
                  href="#case-dossier"
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#2B121F] hover:text-[#FF6F1E] transition-colors"
                >
                  <span>Examine Dossier &amp; Architecture Flow</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. ACTIVE USE CASE DOSSIER BREAKDOWN
            ========================================================================= */}
        <div
          id="case-dossier"
          key={activeCase.id}
          className="rounded-3xl bg-white border border-[#E5DFD1] p-6 sm:p-10 md:p-12 shadow-sm animate-in fade-in duration-300"
        >
          {/* Header Block */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E5DFD1]">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF6F1E] font-bold">
                  {activeCase.tagline}
                </span>
                <span className="text-[#7A6F68]/40">•</span>
                <span className="text-xs font-mono text-[#7A6F68]">
                  {activeCase.client}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#2B121F] tracking-tight leading-tight">
                Case {activeCase.number}: {activeCase.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-[#7A6F68]">Switch Case:</span>
              <div className="flex gap-1">
                {useCases.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedIndex(i)}
                    className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                      selectedIndex === i
                        ? "bg-[#2B121F] text-white shadow-xs"
                        : "bg-[#F7F3E9] text-[#7A6F68] hover:text-[#2B121F]"
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Problem vs Solution Juxtaposition */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Problem Statement Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F3E9] border border-[#E5DFD1] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#4A2237] uppercase tracking-wider block mb-2">
                  DOMAIN BOTTLENECK TACKLED
                </span>
                <h3 className="text-lg font-heading font-bold text-[#2B121F] mb-3">
                  The Operational Challenge
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#7A6F68] leading-relaxed">
                  {activeCase.problem}
                </p>
              </div>
            </div>

            {/* Enver Solution Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#2B121F] text-white border border-[#2B121F] flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#FF6F1E] uppercase tracking-wider block mb-2">
                  ENVER ARCHITECTURAL SOLUTION
                </span>
                <h3 className="text-lg font-heading font-bold text-white mb-3">
                  Engineered Multi-Agent Pipeline
                </h3>
                <p className="text-xs sm:text-sm font-sans text-white/85 leading-relaxed">
                  {activeCase.solution}
                </p>
              </div>
            </div>
          </div>

          {/* Quantified Business & Regulatory Impact */}
          <div className="mb-10">
            <span className="text-[10px] font-mono font-bold text-[#7A6F68] uppercase tracking-wider block mb-4">
              PROVEN PRODUCTION METRICS
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {activeCase.impactMetrics.map((metric, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#F7F3E9] border border-[#E5DFD1]">
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-[#2B121F] mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#FF6F1E] uppercase mb-1">
                    {metric.label}
                  </div>
                  <div className="text-[11px] font-sans text-[#7A6F68]">
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Step System Architecture Flow */}
          <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-[#FAF9F6] border border-[#E5DFD1]">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#FF6F1E] uppercase tracking-wider block">
                  ARCHITECTURE EXECUTION CIRCUIT
                </span>
                <h3 className="text-lg font-heading font-bold text-[#2B121F]">
                  5-Step Deterministic System Flow
                </h3>
              </div>
              <span className="text-xs font-mono text-[#7A6F68] hidden sm:block">
                Left to Right Execution Circuit
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {activeCase.architectureFlow.map((node, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white border border-[#E5DFD1] hover:border-[#FF6F1E] transition-colors relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-5 h-5 rounded-full bg-[#2B121F] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                      {node.step}
                    </span>
                    {i < activeCase.architectureFlow.length - 1 && (
                      <span className="text-[#7A6F68]/30 font-mono text-xs hidden lg:inline">→</span>
                    )}
                  </div>
                  <h4 className="text-xs font-mono font-bold text-[#2B121F] mb-1">
                    {node.name}
                  </h4>
                  <p className="text-[11px] font-sans text-[#7A6F68] leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Stack & Action CTAs */}
          <div className="p-6 rounded-2xl bg-[#F7F3E9] border border-[#E5DFD1] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A6F68] font-bold mb-2">
                Production Deployment Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeCase.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white border border-[#E5DFD1] text-[#2B121F] font-mono text-xs rounded-lg font-medium shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {activeCase.projectSlug && (
                <Link
                  href={`/projects/${activeCase.projectSlug}`}
                  className="inline-flex items-center gap-1.5 py-3 px-5 rounded-full bg-white border border-[#E5DFD1] hover:border-[#2B121F] text-[#2B121F] text-xs font-sans font-semibold transition-all no-underline shadow-2xs"
                >
                  <span>Complete Dossier</span>
                  <ArrowRight size={13} />
                </Link>
              )}
              <Link
                href="/signup"
                className="inline-flex items-center gap-1.5 py-3 px-6 rounded-full bg-[#2B121F] hover:bg-[#FF6F1E] text-white text-xs font-sans font-semibold transition-all shadow-xs no-underline"
              >
                <span>Launch Agent Console</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
