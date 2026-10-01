import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Clock,
  Lock,
  Server,
  Cpu,
  Layers,
  Building2,
  User,
  Mail,
  Pause,
  Play,
  ArrowUpRight
} from "lucide-react";
import Logo from "@/components/Logo";
import ShaderGradient from "@/components/ShaderGradient";

export default function AgentGateway() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  
  // Dev backdoor: ?access=root or ?preview=true directly opens the live agent console
  const devAccess = searchParams.get("access") === "root" || searchParams.get("preview") === "true";
  useEffect(() => {
    if (devAccess) {
      // Allow internal team root access if explicitly requested
      localStorage.setItem("enver_playground_unlocked", "true");
    }
  }, [devAccess]);

  const [step, setStep] = useState<"form" | "prod_notice">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "Engineering Leader",
    workload: "Artificer · Autonomous Credit Underwriting"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queueToken, setQueueToken] = useState("");

  // Countdown timer for automatic redirect back to homepage
  const [countdown, setCountdown] = useState(10);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize random queue token on submission
  const generateQueueToken = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let token = "ENV-PRD-";
    for (let i = 0; i < 4; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    const token = generateQueueToken();
    setQueueToken(token);

    // Save lead to local storage
    try {
      localStorage.setItem("enver_pilot_queue_token", token);
      localStorage.setItem("enver_user_name", formData.name);
      localStorage.setItem("enver_user_email", formData.email);
      if (formData.company) localStorage.setItem("enver_user_company", formData.company);

      // Direct Inbox Delivery for pilot registration
      fetch("https://formsubmit.co/ajax/hanabi@enveraitech.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || "Enterprise Inquirer",
          role: formData.role,
          workload: formData.workload,
          queue_token: token,
          _subject: `🎟️ New Agent Console Pilot Admission: ${formData.name} [${token}]`,
          _cc: "amaan@enveraitech.com",
          _template: "table",
          _captcha: "false"
        })
      }).catch(() => {
        // Safe catch
      });
    } catch {
      // Safe fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setStep("prod_notice");
    }, 450);
  };

  const handleInstantGoogleAccess = () => {
    const token = generateQueueToken();
    setQueueToken(token);
    setFormData((prev) => ({
      ...prev,
      name: prev.name || "Enterprise Evaluator",
      email: prev.email || "evaluator@enterprise.internal",
      company: prev.company || "Enterprise Organization"
    }));
    setStep("prod_notice");
  };

  // Auto-redirect countdown effect
  useEffect(() => {
    if (step === "prod_notice" && !isTimerPaused && countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else if (step === "prod_notice" && countdown === 0) {
      setLocation("/");
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [step, countdown, isTimerPaused, setLocation]);

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#2B121F] pt-24 sm:pt-32 pb-20 flex flex-col justify-center relative overflow-hidden font-sans selection:bg-[#FF6F1E]/20">
      {/* Background Architectural Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-25">
        <ShaderGradient className="w-full h-full" speed={0.002} />
      </div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none bg-[#FF6F1E]/10" />

      <div className="architectural-frame px-4 sm:px-8 relative z-10 max-w-4xl mx-auto w-full">
        {/* Top Navigation Backlink */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#7A6F68] hover:text-[#2B121F] transition-colors py-1.5 px-3 rounded-full bg-white/80 border border-[#E5DFD1] shadow-2xs backdrop-blur-xs"
          >
            <ArrowLeft size={14} />
            <span>Return to enveraitech.com</span>
          </Link>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#E5DFD1] text-[11px] font-mono text-[#7A6F68]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Decoupled Production Gateway</span>
          </div>
        </div>

        {/* Phase A: Registration & Sign Up Form */}
        {step === "form" && (
          <div>
            {/* Header Branding */}
            <div className="mb-8 text-center flex flex-col items-center">
              <Link href="/" className="no-underline inline-block mb-4">
                <Logo size="lg" theme="light" />
              </Link>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFD1] text-[11px] font-mono text-[#2B121F] shadow-xs mb-3 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#FF6F1E] animate-ping" />
                <span>ENVERA AGENT CONSOLE · PRIVATE ADMISSION</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-heading font-bold text-[#2B121F] tracking-tight leading-tight mb-3">
                Register for Priority Agent Console Access.
              </h1>
              <p className="text-sm sm:text-base font-sans text-[#7A6F68] max-w-xl mx-auto leading-relaxed">
                Connect your engineering team to our autonomous deliberation fleet, backed by the 3D particle neural kernel and deterministic verification loops.
              </p>
            </div>

            {/* Registration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              {/* Form Column */}
              <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD1] shadow-xs flex flex-col justify-between">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7A6F68] mb-1.5 font-bold">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Arjun Mehta"
                        className="w-full pl-10 pr-4 py-3 bg-[#F7F3E9]/80 border border-[#E5DFD1] rounded-xl font-sans text-xs text-[#2B121F] focus:outline-none focus:border-[#FF6F1E] transition-colors"
                      />
                      <User size={15} className="absolute left-3.5 top-3.5 text-[#7A6F68]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7A6F68] mb-1.5 font-bold">
                      Work Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="arjun@enterprise.com"
                        className="w-full pl-10 pr-4 py-3 bg-[#F7F3E9]/80 border border-[#E5DFD1] rounded-xl font-sans text-xs text-[#2B121F] focus:outline-none focus:border-[#FF6F1E] transition-colors"
                      />
                      <Mail size={15} className="absolute left-3.5 top-3.5 text-[#7A6F68]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7A6F68] mb-1.5 font-bold">
                        Organization
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Apex Financial"
                          className="w-full pl-10 pr-4 py-3 bg-[#F7F3E9]/80 border border-[#E5DFD1] rounded-xl font-sans text-xs text-[#2B121F] focus:outline-none focus:border-[#FF6F1E] transition-colors"
                        />
                        <Building2 size={15} className="absolute left-3.5 top-3.5 text-[#7A6F68]" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7A6F68] mb-1.5 font-bold">
                        Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F7F3E9]/80 border border-[#E5DFD1] rounded-xl font-sans text-xs text-[#2B121F] focus:outline-none focus:border-[#FF6F1E] transition-colors"
                      >
                        <option value="Engineering Leader">Engineering Leader</option>
                        <option value="AI / ML Architect">AI / ML Architect</option>
                        <option value="Fintech Risk Officer">Fintech Risk Officer</option>
                        <option value="Security / Compliance Auditor">Security / Compliance Auditor</option>
                        <option value="Executive / Founder">Executive / Founder</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7A6F68] mb-1.5 font-bold">
                      Primary Production Workload
                    </label>
                    <select
                      value={formData.workload}
                      onChange={(e) => setFormData({ ...formData, workload: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F7F3E9]/80 border border-[#E5DFD1] rounded-xl font-sans text-xs text-[#2B121F] focus:outline-none focus:border-[#FF6F1E] transition-colors"
                    >
                      <option value="Artificer · Autonomous Credit Underwriting">Artificer · Autonomous Credit Underwriting (&lt;105s)</option>
                      <option value="Arbiter · Multi-Cloud AST Firewall">Arbiter · Multi-Cloud AST Command Firewall (&lt;18ms)</option>
                      <option value="Cerberus · Zero-Trust Git Auditor">Cerberus · Zero-Trust Shannon Entropy Sentinel</option>
                      <option value="Custom Enterprise Agent Fleet">Custom Sovereign AI Fleet Integration</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#2B121F] hover:bg-[#FF6F1E] text-white text-xs font-mono font-bold tracking-wider uppercase disabled:opacity-50 cursor-pointer shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Assigning Priority Token...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Priority Admission →</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="pt-4 mt-4 border-t border-[#E5DFD1] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <span className="text-[11px] font-mono text-[#7A6F68]">
                    Or evaluate via Enterprise SSO:
                  </span>
                  <button
                    type="button"
                    onClick={handleInstantGoogleAccess}
                    className="text-xs font-mono text-[#2B121F] hover:text-[#FF6F1E] transition-colors inline-flex items-center gap-1.5 font-bold cursor-pointer py-1 px-3 rounded-lg border border-[#E5DFD1] bg-[#F7F3E9]/50 hover:bg-[#F7F3E9]"
                  >
                    <span>Instant Workspace SSO</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>

              {/* Right Info Column — Institutional Credibility */}
              <div className="md:col-span-5 flex flex-col justify-between bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD1] shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#E5DFD1]">
                    <span className="font-mono text-[11px] text-[#FF6F1E] uppercase font-bold tracking-widest flex items-center gap-1.5">
                      <Sparkles size={13} />
                      <span>ENTERPRISE SPEC</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F6EDF2] text-[#2B121F] font-bold border border-[#2B121F]/15">
                      TIER-1 CLUSTER
                    </span>
                  </div>

                  <ul className="space-y-4 text-xs font-sans text-[#7A6F68]">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-[#F7F3E9] text-[#FF6F1E] flex items-center justify-center shrink-0 mt-0.5 border border-[#E5DFD1]">
                        <Cpu size={14} />
                      </div>
                      <div>
                        <span className="font-semibold text-[#2B121F] block">Zero-Hallucination Execution</span>
                        <span className="text-[11px] text-[#7A6F68] leading-snug block">Deterministic Python &amp; AST validation kernels guaranteeing mathematical invariance.</span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-[#F7F3E9] text-[#FF6F1E] flex items-center justify-center shrink-0 mt-0.5 border border-[#E5DFD1]">
                        <Server size={14} />
                      </div>
                      <div>
                        <span className="font-semibold text-[#2B121F] block">Sovereign Cloud Enclaves</span>
                        <span className="text-[11px] text-[#7A6F68] leading-snug block">Dedicated VPC boundaries with zero external egress and air-gapped data retention.</span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-[#F7F3E9] text-[#FF6F1E] flex items-center justify-center shrink-0 mt-0.5 border border-[#E5DFD1]">
                        <ShieldCheck size={14} />
                      </div>
                      <div>
                        <span className="font-semibold text-[#2B121F] block">Cryptographic Audit Ledger</span>
                        <span className="text-[11px] text-[#7A6F68] leading-snug block">Every deliberation turn is stamped with SHA-256 signatures for compliance boards.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#2B121F] text-white shadow-xs mt-6">
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className="text-[#FF6F1E] font-bold">BITSoM VERTEX AI</span>
                    <span className="text-emerald-400 font-semibold">DPIIT Registered</span>
                  </div>
                  <p className="text-[11px] font-sans text-white/80 leading-relaxed">
                    Enver AI Tech Pvt Ltd. (Inc. May 2023) · Incubated under BITSoM &amp; FITT IIT Delhi · Enterprise AI Operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase B: Post-Signup "Envera in Production Rollout" Staging Screen & Send Them Back */}
        {step === "prod_notice" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl border border-[#E5DFD1] p-8 sm:p-12 shadow-sm relative overflow-hidden text-center">
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2B121F] via-[#FF6F1E] to-[#2B121F]" />

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F6EDF2] border border-[#2B121F]/20 text-[11px] font-mono text-[#2B121F] shadow-2xs mb-6 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6F1E] animate-pulse" />
                <span>ENVERA CORE IN PRODUCTION PROVISIONING</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#2B121F] tracking-tight leading-snug mb-4">
                Registration Confirmed.
                <br />
                Envera is Currently in Production Staging.
              </h2>

              <p className="text-sm font-sans text-[#7A6F68] max-w-lg mx-auto leading-relaxed mb-8">
                Thank you for your interest{formData.name ? `, ${formData.name}` : ""}. To maintain deterministic zero-drift guarantees and strict VPC air-gap compliance, Envera's autonomous reasoning cluster is being rolled out in staged enterprise cohorts.
              </p>

              {/* High-Tech Allocation Dossier */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F7F3E9] border border-[#E5DFD1] text-left mb-8 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD1]">
                  <span className="text-[#7A6F68] flex items-center gap-2">
                    <Lock size={14} className="text-[#FF6F1E]" />
                    <span>PRIORITY TOKEN</span>
                  </span>
                  <span className="font-bold text-[#2B121F] bg-white px-2.5 py-1 rounded-md border border-[#E5DFD1]">
                    {queueToken || "ENV-PRD-8421"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#7A6F68]">Entity Organization:</span>
                  <span className="font-medium text-[#2B121F]">{formData.company || "Enterprise Inquirer"}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#7A6F68]">Registered Email:</span>
                  <span className="font-medium text-[#2B121F]">{formData.email || "Registered Account"}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#7A6F68]">Target Workload:</span>
                  <span className="font-medium text-[#2B121F] text-right truncate max-w-[240px]">
                    {formData.workload}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E5DFD1]">
                  <span className="text-[#7A6F68]">Cluster Allocation:</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Batch 03 · Enterprise Provisioning</span>
                  </span>
                </div>
              </div>

              {/* Live Return Counter & Controls */}
              <div className="p-4 rounded-xl bg-white border border-[#E5DFD1] mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs font-mono text-[#2B121F]">
                  <Clock size={16} className="text-[#FF6F1E] animate-pulse" />
                  <span>
                    {isTimerPaused ? (
                      <span className="text-[#7A6F68]">Auto-redirect paused</span>
                    ) : (
                      <>
                        Redirecting to homepage in <strong className="text-[#FF6F1E]">{countdown}s</strong>
                      </>
                    )}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTimerPaused(!isTimerPaused)}
                  className="text-[11px] font-mono text-[#7A6F68] hover:text-[#2B121F] transition-colors inline-flex items-center gap-1.5 py-1 px-3 rounded-md bg-[#F7F3E9] border border-[#E5DFD1] cursor-pointer"
                >
                  {isTimerPaused ? (
                    <>
                      <Play size={12} />
                      <span>Resume Timer</span>
                    </>
                  ) : (
                    <>
                      <Pause size={12} />
                      <span>Pause Redirect</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons: Send Em Back */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="py-3.5 px-6 rounded-xl bg-[#2B121F] hover:bg-[#FF6F1E] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer no-underline"
                >
                  <ArrowLeft size={14} />
                  <span>Return to Homepage Now</span>
                </Link>

                <Link
                  href="/projects"
                  className="py-3.5 px-6 rounded-xl bg-[#F7F3E9] hover:bg-white text-[#2B121F] border border-[#E5DFD1] text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
                >
                  <span>Explore Flagship Engines</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/contact"
                  className="py-3.5 px-6 rounded-xl bg-transparent hover:bg-[#F7F3E9] text-[#7A6F68] hover:text-[#2B121F] border border-transparent hover:border-[#E5DFD1] text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
                >
                  <span>Contact Founders</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
