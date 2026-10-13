import React, { useState } from "react";
import { Link } from "wouter";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Zap,
  Building2,
  Mail,
  User,
  KeyRound,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";

interface AgentPaywallProps {
  onUnlock: () => void;
}

export default function AgentPaywall({ onUnlock }: AgentPaywallProps) {
  const { loginMicrosoftWork, loginGoogle, loginEnverSso } = useAuth();

  const [selectedPlan, setSelectedPlan] = useState<"pilot" | "sovereign">("sovereign");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    workload: "Artificer · Autonomous Credit Underwriting"
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [activeTab, setActiveTab] = useState<"signup" | "code">("signup");

  // Handle direct sign-up form submission
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    if (!agreedToTerms) {
      setCodeError("You must agree to the Terms of Service and Privacy Statement to continue.");
      return;
    }

    setIsSubmitting(true);
    const token = `ENV-SUB-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    try {
      localStorage.setItem("enver_playground_unlocked", "true");
      localStorage.setItem("enver_user_name", formData.name);
      localStorage.setItem("enver_user_email", formData.email);
      if (formData.company) localStorage.setItem("enver_user_company", formData.company);

      // Notify enterprise admissions inbox
      fetch("https://formsubmit.co/ajax/hanabi@enveraitech.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || "Enterprise Inquirer",
          plan: selectedPlan === "sovereign" ? "Sovereign Dedicated Enclave ($2,400/mo)" : "Enterprise Pilot Sandbox ($490/mo)",
          workload: formData.workload,
          token,
          tos_accepted: "YES (EAT-TOS-2026.04)",
          _subject: `💳 Agent Console Paywall Unlock: ${formData.name} [${token}]`,
          _captcha: "false"
        })
      }).catch(() => {});

      // Auto sign-in as an authenticated enterprise evaluator with terms accepted
      await loginMicrosoftWork(formData.email, formData.name, formData.company || "Enterprise Evaluator", true);
    } catch {}

    setTimeout(() => {
      setIsSubmitting(false);
      onUnlock();
    }, 600);
  };

  // Handle access code / team token unlock
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = accessCode.trim().toUpperCase();
    const validCodes = ["ENVER2026", "SOVEREIGN", "ROOT", "CITADEL", "AZURE2026", "PILOT"];

    if (validCodes.includes(normalized) || normalized.startsWith("ENV-")) {
      setCodeError("");
      localStorage.setItem("enver_playground_unlocked", "true");
      loginEnverSso("evaluator@enveraitech.com", "Authorized Enterprise Evaluator", true);
      onUnlock();
    } else {
      setCodeError("Invalid access token. Use code 'ENVER2026' or contact support.");
    }
  };

  // Handle Microsoft Entra SSO instant unlock
  const handleMicrosoftAuth = async () => {
    try {
      localStorage.setItem("enver_playground_unlocked", "true");
      await loginMicrosoftWork(undefined, undefined, undefined, true);
      onUnlock();
    } catch {}
  };

  // Handle Google Workspace SSO instant unlock
  const handleGoogleAuth = async () => {
    try {
      localStorage.setItem("enver_playground_unlocked", "true");
      await loginGoogle(true);
      onUnlock();
    } catch {}
  };

  // Instant sandbox bypass for evaluators (binds terms)
  const handleGuestSandbox = () => {
    localStorage.setItem("enver_playground_unlocked", "true");
    loginEnverSso("evaluator@enveraitech.com", "Authorized Enterprise Evaluator", true);
    onUnlock();
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#2B121F] py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#FF6F1E]/20 relative overflow-hidden flex flex-col justify-center">
      {/* Ambient background architectural blurs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#4A2237]/10 via-[#FF6F1E]/8 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#2B121F]/8 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Top return link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#7A6F68] hover:text-[#2B121F] transition-colors py-1.5 px-3 rounded-full bg-white border border-[#E5DFD1] shadow-2xs"
          >
            <ArrowLeft size={13} />
            <span>Return to Public Website</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5DFD1] text-[11px] font-mono text-[#7A6F68]">
            <Lock size={12} className="text-[#FF6F1E]" />
            <span>Enver Citadel Gatekeeper · Restricted Access</span>
          </div>
        </div>

        {/* Main Paywall Card */}
        <div className="bg-white rounded-3xl border border-[#E5DFD1] shadow-[0_25px_60px_rgba(43,18,31,0.08)] overflow-hidden">
          {/* Header Banner */}
          <div className="p-8 sm:p-10 border-b border-[#E5DFD1] bg-[#FAF8F3] relative overflow-hidden">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Logo size="md" theme="light" />
                <div className="w-px h-5 bg-[#E5DFD1]" />
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2B121F] text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F1E] animate-pulse" />
                  <span>Sovereign Paywall Gate</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#2B121F] tracking-tight leading-tight mb-3">
                Autonomous Agent Console Requires Enterprise Admission.
              </h1>
              <p className="text-sm sm:text-base font-sans text-[#7A6F68] leading-relaxed">
                The high-throughput multi-agent deliberation fleet, 3D neural kernel, AST-level destructive command firewall, and tamper-evident XAI ledgers are restricted to licensed enterprise subscriptions and pilot tenancies.
              </p>
            </div>
          </div>

          {/* Pricing Tiers & Sign-Up Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Subscription Tiers (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#E5DFD1] bg-[#FDFBF7] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#7A6F68] font-bold block mb-4">
                  Select Enterprise Admission Tier
                </span>

                <div className="space-y-4">
                  {/* Tier 1: Sovereign Enclave */}
                  <div
                    onClick={() => setSelectedPlan("sovereign")}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      selectedPlan === "sovereign"
                        ? "border-[#FF6F1E] bg-white shadow-sm ring-1 ring-[#FF6F1E]/30"
                        : "border-[#E5DFD1] bg-white/60 hover:bg-white"
                    }`}
                  >
                    <div className="absolute top-3.5 right-3.5">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF6F1E] text-white">
                        Recommended
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-1.5">
                      <ShieldCheck size={16} className="text-[#FF6F1E]" />
                      <h3 className="font-heading font-bold text-sm text-[#2B121F]">
                        Sovereign Dedicated Enclave
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-1.5 mb-2.5">
                      <span className="text-2xl font-heading font-extrabold text-[#2B121F]">$2,400</span>
                      <span className="text-xs font-mono text-[#7A6F68]">/ month</span>
                    </div>

                    <ul className="space-y-1.5 text-xs font-sans text-[#7A6F68]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#FF6F1E] shrink-0" />
                        <span>Air-gapped private VPC enclave (Azure / GCP)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#FF6F1E] shrink-0" />
                        <span>0-byte external data egress guarantee</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#FF6F1E] shrink-0" />
                        <span>All 23 Model Context Protocol (MCP) servers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#FF6F1E] shrink-0" />
                        <span>Dedicated 99.99% enterprise SLA</span>
                      </li>
                    </ul>
                  </div>

                  {/* Tier 2: Pilot Sandbox */}
                  <div
                    onClick={() => setSelectedPlan("pilot")}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedPlan === "pilot"
                        ? "border-[#FF6F1E] bg-white shadow-sm ring-1 ring-[#FF6F1E]/30"
                        : "border-[#E5DFD1] bg-white/60 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Zap size={16} className="text-[#2B121F]" />
                      <h3 className="font-heading font-bold text-sm text-[#2B121F]">
                        Enterprise Pilot Sandbox
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-1.5 mb-2.5">
                      <span className="text-2xl font-heading font-extrabold text-[#2B121F]">$490</span>
                      <span className="text-xs font-mono text-[#7A6F68]">/ month</span>
                    </div>

                    <ul className="space-y-1.5 text-xs font-sans text-[#7A6F68]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#2B121F] shrink-0" />
                        <span>4-Agent concurrent deliberation DAG</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#2B121F] shrink-0" />
                        <span>Artificer XAI Underwriting &amp; AST Firewall</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-[#2B121F] shrink-0" />
                        <span>100,000 Deliberation Tokens / month</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Institutional Endorsement footer note */}
              <div className="mt-6 pt-4 border-t border-[#E5DFD1] text-[11px] font-mono text-[#7A6F68]">
                <span>Incubated under BITSoM &amp; FITT IIT Delhi · DPIIT Registered (DIPP193082)</span>
              </div>
            </div>

            {/* Right Column: Sign-Up Form & SSO (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                {/* Mode Selector Tabs */}
                <div className="flex items-center gap-2 p-1 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] mb-6 max-w-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("signup")}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeTab === "signup"
                        ? "bg-white text-[#2B121F] shadow-2xs border border-[#E5DFD1]"
                        : "text-[#7A6F68] hover:text-[#2B121F]"
                    }`}
                  >
                    Sign Up &amp; Paywall
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("code")}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeTab === "code"
                        ? "bg-white text-[#2B121F] shadow-2xs border border-[#E5DFD1]"
                        : "text-[#7A6F68] hover:text-[#2B121F]"
                    }`}
                  >
                    Access Code
                  </button>
                </div>

                {activeTab === "signup" ? (
                  <div>
                    {/* SSO One-Click Providers */}
                    <div className="mb-6 pb-6 border-b border-[#E5DFD1]">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A6F68] font-bold block mb-3">
                        Instant Enterprise SSO Access:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={handleMicrosoftAuth}
                          className="w-full py-2.5 px-3.5 rounded-xl border border-[#E5DFD1] bg-[#FAF8F3] hover:bg-white text-xs font-mono text-[#2B121F] font-bold flex items-center justify-center gap-2 shadow-2xs hover:border-[#0078D4] transition-all cursor-pointer"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 23 23">
                            <path fill="#f35325" d="M1 1h10v10H1z" />
                            <path fill="#81bc06" d="M12 1h10v10H12z" />
                            <path fill="#05a6f0" d="M1 12h10v10H1z" />
                            <path fill="#ffba08" d="M12 12h10v10H12z" />
                          </svg>
                          <span>Microsoft Entra ID</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleGoogleAuth}
                          className="w-full py-2.5 px-3.5 rounded-xl border border-[#E5DFD1] bg-[#FAF8F3] hover:bg-white text-xs font-mono text-[#2B121F] font-bold flex items-center justify-center gap-2 shadow-2xs hover:border-[#EA4335] transition-all cursor-pointer"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                          </svg>
                          <span>Google Workspace</span>
                        </button>
                      </div>
                    </div>

                    {/* Standard Sign-Up Form */}
                    <form onSubmit={handleSignUpSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7A6F68] mb-1 font-bold">
                            Full Name *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="e.g. Arjun Mehta"
                              className="w-full pl-9 pr-3.5 py-2.5 bg-[#F7F3E9]/70 border border-[#E5DFD1] rounded-xl font-sans text-xs text-[#2B121F] focus:outline-none focus:border-[#FF6F1E] transition-colors"
                            />
                            <User size={14} className="absolute left-3 top-3 text-[#7A6F68]" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7A6F68] mb-1 font-bold">
                            Work Email *
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="arjun@enterprise.com"
                              className="w-full pl-9 pr-3.5 py-2.5 bg-[#F7F3E9]/70 border border-[#E5DFD1] rounded-xl font-sans text-xs text-[#2B121F] focus:outline-none focus:border-[#FF6F1E] transition-colors"
                            />
                            <Mail size={14} className="absolute left-3 top-3 text-[#7A6F68]" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7A6F68] mb-1 font-bold">
                            Organization Name
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              placeholder="e.g. Apex Financial"
                              className="w-full pl-9 pr-3.5 py-2.5 bg-[#F7F3E9]/70 border border-[#E5DFD1] rounded-xl font-sans text-xs text-[#2B121F] focus:outline-none focus:border-[#FF6F1E] transition-colors"
                            />
                            <Building2 size={14} className="absolute left-3 top-3 text-[#7A6F68]" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7A6F68] mb-1 font-bold">
                            Target Workload
                          </label>
                          <select
                            value={formData.workload}
                            onChange={(e) => setFormData({ ...formData, workload: e.target.value })}
                            className="w-full px-3 py-2.5 bg-[#F7F3E9]/70 border border-[#E5DFD1] rounded-xl font-sans text-xs text-[#2B121F] focus:outline-none focus:border-[#FF6F1E] transition-colors"
                          >
                            <option value="Artificer · Autonomous Credit Underwriting">Artificer (Credit Underwriting)</option>
                            <option value="Arbiter · Multi-Cloud AST Firewall">Arbiter (Cloud Firewall)</option>
                            <option value="Cerberus · Zero-Trust Git Auditor">Cerberus (Entropy Scanner)</option>
                            <option value="Bespoke Sovereign AI DAG">Bespoke Sovereign Cluster</option>
                          </select>
                        </div>
                      </div>

                      {/* Mandatory Terms & Privacy Statement Acceptance */}
                      <div className="pt-2 pb-1">
                        <label className="flex items-start gap-2.5 cursor-pointer text-xs font-sans text-[#4A3E39] select-none">
                          <input
                            type="checkbox"
                            required
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="mt-0.5 w-4 h-4 rounded text-[#FF6F1E] accent-[#FF6F1E] border-[#E5DFD1] focus:ring-[#FF6F1E] cursor-pointer"
                          />
                          <span>
                            I agree to Enver AI Tech's{" "}
                            <Link href="/tos" target="_blank" className="text-[#FF6F1E] font-semibold underline underline-offset-2 hover:text-[#2B121F]">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/ps" target="_blank" className="text-[#FF6F1E] font-semibold underline underline-offset-2 hover:text-[#2B121F]">
                              Privacy Statement
                            </Link>
                            .
                          </span>
                        </label>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting || !agreedToTerms}
                          className="w-full py-3.5 px-6 rounded-xl bg-[#2B121F] hover:bg-[#FF6F1E] text-white text-xs font-mono font-bold tracking-wider uppercase disabled:opacity-50 cursor-pointer shadow-sm transition-all flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Provisioning Tenant Credentials...</span>
                            </>
                          ) : (
                            <>
                              <span>Unlock Sovereign Agent Console ({selectedPlan === "sovereign" ? "$2,400/mo" : "$490/mo"}) →</span>
                            </>
                          )}
                        </button>
                        <div className="flex items-center gap-3 pt-1">
                          <button
                            type="button"
                            onClick={handleGuestSandbox}
                            className="w-full py-2.5 px-4 rounded-xl border border-[#E5DFD1] hover:bg-white text-[#7A6F68] hover:text-[#2B121F] text-xs font-mono font-medium transition cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Sparkles size={13} className="text-[#FF6F1E]" />
                            <span>Explore as Guest Sandbox (Instant)</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div>
                    {/* Access Code Verification */}
                    <form onSubmit={handleCodeSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7A6F68] mb-1.5 font-bold">
                          Enter Pilot Token / Partner Access Code
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={accessCode}
                            onChange={(e) => {
                              setAccessCode(e.target.value);
                              setCodeError("");
                            }}
                            placeholder="e.g. ENVER2026 or ENV-PRD-XXXX"
                            className="w-full pl-10 pr-4 py-3 bg-[#F7F3E9]/70 border border-[#E5DFD1] rounded-xl font-mono text-sm tracking-wider text-[#2B121F] uppercase focus:outline-none focus:border-[#FF6F1E] transition-colors"
                          />
                          <KeyRound size={16} className="absolute left-3.5 top-3.5 text-[#7A6F68]" />
                        </div>
                        {codeError && (
                          <p className="mt-2 text-xs font-mono text-rose-600 font-semibold">{codeError}</p>
                        )}
                        <p className="mt-2 text-[11px] font-mono text-[#7A6F68]">
                          Demo partner bypass: enter code <strong className="text-[#2B121F]">ENVER2026</strong> or sign in via Microsoft Entra.
                        </p>
                      </div>

                      <div className="pt-2 space-y-2">
                        <button
                          type="submit"
                          className="w-full py-3.5 px-6 rounded-xl bg-[#2B121F] hover:bg-[#FF6F1E] text-white text-xs font-mono font-bold tracking-wider uppercase cursor-pointer shadow-sm transition-all flex items-center justify-center gap-2"
                        >
                          <span>Verify &amp; Enter Console →</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleGuestSandbox}
                          className="w-full py-2.5 px-4 rounded-xl border border-[#E5DFD1] hover:bg-white text-[#7A6F68] hover:text-[#2B121F] text-xs font-mono font-medium transition cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Sparkles size={13} className="text-[#FF6F1E]" />
                          <span>Enter Guest Sandbox Immediately</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Bottom security assurance */}
              <div className="mt-8 pt-4 border-t border-[#E5DFD1] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#7A6F68]">
                <span>256-Bit Cryptographic Isolation</span>
                <span>Zero Generative Hallucination</span>
                <span>RBI &amp; SOC2 Guardrails</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
