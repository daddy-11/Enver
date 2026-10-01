import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  UserCheck,
  Lock
} from "lucide-react";
import TechText from "@/components/reactbits/TechText";

export default function Onboarding() {
  const [, setLocation] = useLocation();

  const [selectedRole, setSelectedRole] = useState("risk-officer");
  const [selectedPersona, setSelectedPersona] = useState("neuv");

  const roles = [
    {
      id: "risk-officer",
      title: "Chief Risk Officer / Credit Underwriter",
      description: "MSME financial appraisal, circular loop detection, debt service coverage (DSCR) validation.",
      badge: "Artificer Engine"
    },
    {
      id: "ciso-security",
      title: "CISO / Cloud Security Engineer",
      description: "AST command firewall, preventing runaway GPU spend and destructive database operations.",
      badge: "Arbiter AST Sentinel"
    },
    {
      id: "dev-architect",
      title: "Enterprise AI Architect",
      description: "Private air-gapped VPC enclaves, sovereign LLM inference, zero data egress compliance.",
      badge: "Sovereign Enclave"
    },
    {
      id: "quant-auditor",
      title: "Audit & Compliance Officer",
      description: "RBI Digital Lending Protocol DL-09 compliance, OASIS SARIF v2.1.0 security reports.",
      badge: "Cerberus SARIF"
    }
  ];

  const personas = [
    {
      id: "neuv",
      name: "Neuv · 0.5 (Chief Research Arbiter)",
      temper: "Temp 0.5 · Judicial Rigor",
      description: "Analytical, empirical research-grounded, disciplined evidence calculation. Operates under the mathematical invariant 'Math is the Model'."
    },
    {
      id: "strict",
      name: "Invariant Sentinel · 0.0 (Strict Zero-Trust)",
      temper: "Temp 0.0 · Deterministic Only",
      description: "Zero probabilistic extrapolation. Pure AST parsing and deterministic Python computation."
    }
  ];

  const handleFinishOnboarding = () => {
    setLocation("/welcome");
  };

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
          <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
          <span>Step 2 of 3: Onboarding & Persona Setup</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl w-full mx-auto my-6 space-y-8">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#0284C7]">
            Auth & Bridge Protocol
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight mt-1">
            Tailor Your Sovereign Deliberation Workspace
          </h1>
          <p className="text-xs sm:text-sm text-[#52798F] mt-1.5">
            Select your enterprise domain and preferred agent operational persona for Envera's deterministic decision Citadels.
          </p>
        </div>

        {/* 1. Role Selection */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider font-bold text-[#0A2533] flex items-center gap-1.5">
            <UserCheck size={14} className="text-[#0284C7]" />
            <span>1. Primary Enterprise Domain</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roles.map((r) => {
              const active = selectedRole === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    active
                      ? "bg-white border-[#0284C7] shadow-[0_8px_20px_rgba(2,132,199,0.12)] ring-2 ring-[#0284C7]/20"
                      : "bg-white/80 border-[#CBE4EE] hover:border-[#0284C7]/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] font-semibold">
                      {r.badge}
                    </span>
                    {active && <CheckCircle2 size={16} className="text-[#0284C7]" />}
                  </div>
                  <h3 className="font-heading font-bold text-sm text-[#0A2533] mb-1">
                    {r.title}
                  </h3>
                  <p className="text-xs text-[#52798F] leading-relaxed">
                    {r.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Persona Setup */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider font-bold text-[#0A2533] flex items-center gap-1.5">
            <Cpu size={14} className="text-[#0284C7]" />
            <span>2. Agent Persona Baseline</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {personas.map((p) => {
              const active = selectedPersona === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPersona(p.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    active
                      ? "bg-white border-[#0284C7] shadow-[0_8px_20px_rgba(2,132,199,0.12)] ring-2 ring-[#0284C7]/20"
                      : "bg-white/80 border-[#CBE4EE] hover:border-[#0284C7]/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#0284C7] font-bold">
                      {p.temper}
                    </span>
                    {active && <CheckCircle2 size={16} className="text-[#0284C7]" />}
                  </div>
                  <h3 className="font-heading font-bold text-sm text-[#0A2533] mb-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[#52798F] leading-relaxed">
                    {p.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 flex items-center justify-between border-t border-[#CBE4EE]">
          <Link href="/signup" className="text-xs font-mono text-[#52798F] hover:text-[#0A2533]">
            ← Back to Sign In
          </Link>
          <button
            onClick={handleFinishOnboarding}
            className="px-6 py-2.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to Welcome Briefing</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </main>

      <footer className="max-w-4xl w-full mx-auto py-4 text-center text-xs font-mono text-[#52798F]/60">
        Enver AI Tech Private Limited · DPIIT &amp; Startup India Recognized Deep-Tech Enterprise
      </footer>
    </div>
  );
}
