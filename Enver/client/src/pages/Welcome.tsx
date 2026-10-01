import React, { useState } from "react";
import { Link } from "wouter";
import {
  Play,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Activity
} from "lucide-react";
import TechText from "@/components/reactbits/TechText";

export default function Welcome() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-[#0A2533] font-sans flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-4">
        <div className="w-28 h-8 relative flex items-center overflow-hidden">
          <TechText
            text="ENVERA"
            fontSize={22}
            fontWeight={800}
            letterSpacing={-0.02}
            color="#0284C7"
            accentColor="#38BDF8"
            dashLength={3}
            dashGap={2}
            reach={70}
            specks={6}
          />
        </div>
        <div className="text-xs font-mono text-[#52798F] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Step 3 of 3: Access Granted</span>
        </div>
      </header>

      {/* Main Center Stage */}
      <main className="max-w-3xl w-full mx-auto my-6 space-y-6">
        <div className="text-center">
          <span className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#0284C7]">
            ✦ Sovereign Deliberation Gateway
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight mt-1">
            Welcome to Envera Citadel
          </h1>
          <p className="text-xs sm:text-sm text-[#52798F] mt-2 max-w-lg mx-auto">
            Your Entra ID session is provisioned with sovereign tenant boundaries. Watch the 30-second protocol briefing below or proceed directly to the deliberation playground.
          </p>
        </div>

        {/* 30-sec Video / Interactive Preview Screen */}
        <div className="relative rounded-3xl overflow-hidden border border-[#BAE6FD] bg-[#091F2D] text-white shadow-2xl aspect-video flex flex-col items-center justify-center p-6 text-center group">
          {/* Subtle animated background radial */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: "radial-gradient(circle at center, #0284C7 0%, transparent 70%)"
            }}
          />

          {isPlaying ? (
            <div className="relative z-10 space-y-4 max-w-md animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8] mx-auto flex items-center justify-center text-[#38BDF8] animate-pulse">
                <Activity size={24} />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                "Math is the Model" — Operational Invariant
              </h3>
              <p className="text-xs font-mono text-slate-300 leading-relaxed">
                1. Probabilistic LLMs parse unstructured dossiers.<br />
                2. Python code calculates DSCR and circular loops deterministically.<br />
                3. Arbiter AST interceptors prevent destructive commands.<br />
                4. Sovereign VPC enclaves guarantee zero outbound egress.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#38BDF8]">
                Briefing Complete · Telemetry Locked
              </div>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center gap-3">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
                title="Watch 30-Second Operational Briefing"
              >
                <Play size={24} className="ml-1" />
              </button>
              <div className="text-xs font-mono font-semibold tracking-wider text-slate-200">
                PLAY 30-SECOND ARCHITECTURAL BRIEFING
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                Duration: 0:30 · Certified under RBI Digital Lending Protocol
              </div>
            </div>
          )}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/playground"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-mono text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Enter Deliberation Playground</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-[#CBE4EE] text-[#0A2533] font-mono text-xs font-bold transition-all text-center"
          >
            View Usage Dashboard
          </Link>
        </div>
      </main>

      <footer className="max-w-4xl w-full mx-auto py-4 text-center text-xs font-mono text-[#52798F]/60">
        Enver AI Tech Private Limited · Zero-Trust Intelligence Infrastructure
      </footer>
    </div>
  );
}
