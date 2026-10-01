import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Unlock,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Cpu,
  BarChart3,
  ExternalLink,
  Sparkles,
  Zap,
  Layers,
  Database
} from "lucide-react";
import { Link } from "wouter";

interface Pillar {
  id: string;
  name: string;
  score: number;
  metric: string;
  citation: string;
  status: "healthy" | "warning";
  codeSnippet: string;
}

const PILLARS: Pillar[] = [
  {
    id: "liquidity",
    name: "01 Liquidity Pillar",
    score: 84,
    metric: "1.84x Quick Ratio",
    citation: "Bank Stmt P.14 L.342",
    status: "healthy",
    codeSnippet: "quick_ratio = (current_assets - inventory) / current_liabilities // 1.84 (deterministic)"
  },
  {
    id: "revenue",
    name: "02 Revenue Velocity",
    score: 92,
    metric: "₹48.2L / mo (±0.46% GSTR)",
    citation: "GSTR-3B T3.1 vs HDFC A/C",
    status: "healthy",
    codeSnippet: "variance = abs(gstr3b_turnover - bank_credits) / bank_credits // 0.0046 <= 0.05"
  },
  {
    id: "stability",
    name: "03 Cash-Flow Stability",
    score: 79,
    metric: "0.14 Coeff of Var",
    citation: "12-Month Inflow StdDev",
    status: "healthy",
    codeSnippet: "cov = inflow_std_dev / inflow_mean // 0.14 (stable seasonality)"
  },
  {
    id: "leverage",
    name: "04 Leverage Capacity",
    score: 86,
    metric: "2.10x DSCR",
    citation: "MCA Charges vs Operating PAT",
    status: "healthy",
    codeSnippet: "dscr = operating_income / total_debt_service // 2.10x (safe ceiling)"
  },
  {
    id: "behaviour",
    name: "05 Behavioural Hygiene",
    score: 95,
    metric: "0 Bounces · 0 Loops",
    citation: "Account Aggregator AA-7801",
    status: "healthy",
    codeSnippet: "circular_loops_detected = 0; ecs_bounce_count = 0; clean_flag = True"
  }
];

export default function ArtificerCockpit() {
  const [activeAgent, setActiveAgent] = useState<"ingest" | "ground" | "score" | "explain">("score");
  const [selectedPillar, setSelectedPillar] = useState<Pillar>(PILLARS[0]);
  const [isLocked, setIsLocked] = useState(true);

  return (
    <div className="w-full rounded-2xl bg-white border border-[#E5DFD1] shadow-md overflow-hidden text-[#2B121F]">
      {/* Workbench Browser Chrome Header */}
      <div className="px-4 py-3.5 bg-[#F7F3E9] border-b border-[#E5DFD1] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2B121F]/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#2B121F]/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6F1E]" />
          </div>
          <span className="text-[#2B121F] font-bold px-2 py-0.5 rounded bg-white border border-[#E5DFD1]">
            artificer.enveraitech.in
          </span>
          <span className="hidden sm:inline-block text-[#7A6F68]">
            Officer Cockpit · Google SSO Authenticated
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-[#4A2237] bg-[#F6EDF2] px-2.5 py-0.5 rounded-full border border-[#2B121F]/15 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F1E] animate-pulse" />
            <span>TEMPERATURE-0 RUN</span>
          </div>

          <button
            onClick={() => setIsLocked(!isLocked)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
              isLocked
                ? "bg-[#2B121F] text-white shadow-xs"
                : "bg-amber-100 text-amber-900 border border-amber-300"
            }`}
          >
            {isLocked ? <Lock size={12} className="text-[#FF6F1E]" /> : <Unlock size={12} />}
            <span>{isLocked ? "COCKPIT LOCKED" : "UNLOCKED"}</span>
          </button>
        </div>
      </div>

      {/* 4-Agent Fleet Step Selector (Directly from Deck Slide 06) */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#E5DFD1] bg-[#F7F3E9]/50 text-xs font-mono">
        <button
          onClick={() => setActiveAgent("ingest")}
          className={`p-3.5 text-left border-r border-b md:border-b-0 border-[#E5DFD1] transition-all ${
            activeAgent === "ingest"
              ? "bg-white text-[#2B121F] font-bold border-t-2 border-t-[#FF6F1E]"
              : "text-[#7A6F68] hover:text-[#2B121F] hover:bg-white/50"
          }`}
        >
          <div className="text-[10px] text-[#FF6F1E] font-bold">01 INGEST</div>
          <div className="text-xs font-heading font-bold mt-0.5 truncate">Bank PDF & GSTR</div>
          <div className="text-[10px] text-[#7A6F68] mt-0.5 hidden sm:block">Indian layout parser</div>
        </button>

        <button
          onClick={() => setActiveAgent("ground")}
          className={`p-3.5 text-left border-r border-b md:border-b-0 border-[#E5DFD1] transition-all ${
            activeAgent === "ground"
              ? "bg-white text-[#2B121F] font-bold border-t-2 border-t-[#FF6F1E]"
              : "text-[#7A6F68] hover:text-[#2B121F] hover:bg-white/50"
          }`}
        >
          <div className="text-[10px] text-[#FF6F1E] font-bold">02 GROUND</div>
          <div className="text-xs font-heading font-bold mt-0.5 truncate">Zero Orphan Figures</div>
          <div className="text-[10px] text-[#7A6F68] mt-0.5 hidden sm:block">Line-level citation</div>
        </button>

        <button
          onClick={() => setActiveAgent("score")}
          className={`p-3.5 text-left border-r border-[#E5DFD1] transition-all ${
            activeAgent === "score"
              ? "bg-white text-[#2B121F] font-bold border-t-2 border-t-[#FF6F1E]"
              : "text-[#7A6F68] hover:text-[#2B121F] hover:bg-white/50"
          }`}
        >
          <div className="text-[10px] text-[#FF6F1E] font-bold">03 SCORE</div>
          <div className="text-xs font-heading font-bold mt-0.5 truncate">Five Pillars (In Code)</div>
          <div className="text-[10px] text-[#7A6F68] mt-0.5 hidden sm:block">Math is the model</div>
        </button>

        <button
          onClick={() => setActiveAgent("explain")}
          className={`p-3.5 text-left transition-all ${
            activeAgent === "explain"
              ? "bg-white text-[#2B121F] font-bold border-t-2 border-t-[#FF6F1E]"
              : "text-[#7A6F68] hover:text-[#2B121F] hover:bg-white/50"
          }`}
        >
          <div className="text-[10px] text-[#FF6F1E] font-bold">04 EXPLAIN</div>
          <div className="text-xs font-heading font-bold mt-0.5 truncate">XAI Drawer & Lock</div>
          <div className="text-[10px] text-[#7A6F68] mt-0.5 hidden sm:block">RBI compliant audit</div>
        </button>
      </div>

      {/* Main Workbench Simulation Area */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white">
        {/* Left Column (7 cols): The 5 Pillars Deterministic Calculator */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD1]">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-[#FF6F1E]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2B121F]">
                Deterministic Financial Scorecard
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#7A6F68]">
              Code-grounded (No model hallucination)
            </span>
          </div>

          {/* Pillars List */}
          <div className="space-y-2.5">
            {PILLARS.map((pillar) => {
              const isSelected = selectedPillar.id === pillar.id;
              return (
                <div
                  key={pillar.id}
                  onClick={() => setSelectedPillar(pillar)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#F7F3E9] border-[#2B121F] shadow-xs"
                      : "bg-white hover:bg-[#F7F3E9]/50 border-[#E5DFD1]"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="font-bold text-[#2B121F]">{pillar.name}</span>
                    <span className="text-[#FF6F1E] font-bold">{pillar.score}/100</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-sans text-[#7A6F68] mb-2">
                    <span className="font-semibold text-[#2B121F]">{pillar.metric}</span>
                    <span className="font-mono text-[11px] text-[#4A2237] bg-white px-2 py-0.5 rounded border border-[#E5DFD1]">
                      CIT: {pillar.citation}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-[#E5DFD1] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#2B121F] to-[#FF6F1E] rounded-full"
                      style={{ width: `${pillar.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Pillar Math Proof Drawer */}
          <div className="p-4 rounded-xl bg-[#2B121F] text-white font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-[#FF6F1E] text-[11px] font-bold">
              <span>XAI DETERMINISTIC PROOF DRAWER</span>
              <span>VERIFIED IN CODE</span>
            </div>
            <p className="text-white/90 text-[11px] font-mono leading-relaxed bg-black/40 p-2.5 rounded border border-white/10">
              {selectedPillar.codeSnippet}
            </p>
            <div className="text-[10px] text-white/60 flex items-center justify-between">
              <span>Source Citation: {selectedPillar.citation}</span>
              <span>Temp: 0.0 · Seed: 42</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Live Health Band, System-2 Committee & ThinkingOrb */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Health Band Box (Slide 05: 300-900 band) */}
          <div className="p-6 rounded-2xl bg-[#F7F3E9] border border-[#E5DFD1] text-center space-y-3 relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#2B121F] bg-white px-3 py-1 rounded-full border border-[#E5DFD1]">
              <ShieldCheck size={13} className="text-[#FF6F1E]" />
              <span>OVERALL HEALTH SCORE BAND</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="text-5xl font-heading font-extrabold text-[#2B121F] tracking-tight">
                742
              </span>
              <span className="text-sm font-mono text-[#7A6F68] font-bold">
                / 900
              </span>
            </div>

            <div className="inline-block px-3 py-1 rounded-md bg-[#2B121F] text-[#FF6F1E] font-mono text-xs font-bold tracking-wider">
              PRIME MSME · STRONG CASH VELOCITY
            </div>

            <p className="text-xs font-sans text-[#7A6F68] leading-relaxed">
              Alternative data adjudication confirms consistent ₹48.2L monthly revenue with zero GST tax-gap discrepancy.
            </p>
          </div>

          {/* System-2 Credit Committee Adjudication + ThinkingOrb */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5DFD1] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF6F1E] animate-ping" />
                <span className="text-xs font-mono font-bold text-[#2B121F]">
                  SYSTEM-2 COMMITTEE ADJUDICATION
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#7A6F68] bg-[#F7F3E9] px-2 py-0.5 rounded">
                Active RLHF
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Active Multi-Agent Adjudication Pulse Indicator */}
              <div className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center bg-[#F6EDF2] border border-[#2B121F]/20 text-[#2B121F] shadow-2xs">
                <Cpu size={24} className="text-[#FF6F1E] animate-pulse" />
              </div>
              <div className="space-y-1 text-xs">
                <div className="font-heading font-bold text-[#2B121F]">
                  Committee Deliberation
                </div>
                <p className="font-sans text-[11px] text-[#7A6F68] leading-tight">
                  System-1 evaluates cash flows; System-2 cross-references GSTR-1 vs GSTR-3B filings, MCA charge registries, and e-Courts litigation data.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5DFD1] text-[11px] font-mono flex items-center justify-between text-[#7A6F68]">
              <span>Inference Time: <strong>54.2s</strong></span>
              <span>Tokens: <strong>7,840</strong></span>
              <span>Cost: <strong className="text-[#FF6F1E]">$0.02</strong></span>
            </div>
          </div>

          {/* Tamper-Evident Audit State & CTA */}
          <div className="pt-2">
            <div className="text-[11px] font-mono text-[#7A6F68] mb-2 flex items-center justify-between">
              <span>Audit Signature:</span>
              <span className="text-[#2B121F] font-bold">SHA256: 8f9b...a104</span>
            </div>
            <div className="flex gap-2">
              <Link
                href="/projects/artificer"
                className="flex-1 text-center py-2.5 px-4 rounded-full bg-[#2B121F] hover:bg-[#FF6F1E] text-white text-xs font-sans font-semibold transition-all shadow-xs no-underline"
              >
                Inspect Full Artificer Dossier
              </Link>
              <Link
                href="/signup"
                className="py-2.5 px-4 rounded-full bg-white hover:bg-[#F6EDF2] border border-[#E5DFD1] text-[#2B121F] text-xs font-sans font-medium transition-all no-underline"
              >
                Launch Cockpit
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Unit Economics Footer Banner (Directly from Slide 10 of Pitch Deck) */}
      <div className="px-6 py-4 bg-[#F7F3E9] border-t border-[#E5DFD1] grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs font-mono">
        <div>
          <div className="text-base font-heading font-bold text-[#2B121F]">₹50</div>
          <div className="text-[10px] text-[#7A6F68]">List Price Per Eval</div>
        </div>
        <div>
          <div className="text-base font-heading font-bold text-[#FF6F1E]">&lt; 55s</div>
          <div className="text-[10px] text-[#7A6F68]">Streamed TAT (vs 3-5 days)</div>
        </div>
        <div>
          <div className="text-base font-heading font-bold text-[#2B121F]">$0.02</div>
          <div className="text-[10px] text-[#7A6F68]">Gemini Cost (~8k tokens)</div>
        </div>
        <div>
          <div className="text-base font-heading font-bold text-[#4A2237]">$80–$110</div>
          <div className="text-[10px] text-[#7A6F68]">Manual Review Cost Replaced</div>
        </div>
      </div>
    </div>
  );
}
