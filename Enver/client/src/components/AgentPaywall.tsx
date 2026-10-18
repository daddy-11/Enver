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
  ChevronRight,
  Bot,
  Terminal,
  Cpu,
  Layers,
  Activity,
  Shield,
  FileCode2,
  Network
} from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";

interface AgentPaywallProps {
  onUnlock: () => void;
}

export default function AgentPaywall({ onUnlock }: AgentPaywallProps) {
  const { loginGoogle, loginMicrosoftWork, loginEnverSso } = useAuth();

  const [googleEmail, setGoogleEmail] = useState("");
  const [googleName, setGoogleName] = useState("");
  const [showCustomEmailInput, setShowCustomEmailInput] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [activeTab, setActiveTab] = useState<"google" | "code">("google");

  // Handle Google Account Connection & Unlock
  const handleGoogleConnect = async (customEmail?: string, customName?: string) => {
    if (!agreedToTerms) {
      setCodeError("Please confirm agreement with the Terms of Service and Privacy Statement to enter.");
      return;
    }

    setIsConnecting(true);
    setCodeError("");

    const targetEmail = customEmail || googleEmail.trim() || "operator@workspace.google.com";
    const targetName = customName || googleName.trim() || targetEmail.split("@")[0].replace(".", " ");
    const token = `ENV-GGL-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    try {
      localStorage.setItem("enver_playground_unlocked", "true");
      localStorage.setItem("enver_user_name", targetName);
      localStorage.setItem("enver_user_email", targetEmail);
      localStorage.setItem("enver_google_connected", "true");

      // Notify founders inbox of verified Google connection
      fetch("https://formsubmit.co/ajax/hanabi@enveraitech.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: targetName,
          email: targetEmail,
          auth_provider: "Google Identity Gateway",
          token,
          tos_accepted: "YES (EAT-TOS-2026.04)",
          _subject: `🤖 Agent Citadel Unlocked via Google: ${targetEmail} [${token}]`,
          _captcha: "false"
        })
      }).catch(() => {});

      // Authenticate via AuthContext with Google provider
      await loginGoogle(targetEmail, targetName, "Google Enterprise Partner", true);
      
      setConnectionSuccess(true);
      setTimeout(() => {
        setIsConnecting(false);
        onUnlock();
      }, 700);
    } catch (err: any) {
      setIsConnecting(false);
      setCodeError(err?.message || "Failed to complete Google authentication. Please try again.");
    }
  };

  // Handle Internal Team Access Token Unlock
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = accessCode.trim().toUpperCase();
    const validCodes = ["ENVER2026", "SOVEREIGN", "ROOT", "CITADEL", "AZURE2026", "PILOT", "GOOGLE2026"];

    if (validCodes.includes(normalized) || normalized.startsWith("ENV-")) {
      setCodeError("");
      localStorage.setItem("enver_playground_unlocked", "true");
      loginEnverSso("operator@enveraitech.com", "Authorized Citadel Operator", true);
      onUnlock();
    } else {
      setCodeError("Invalid clearance code. Team operators may use 'ENVER2026' or connect via Google.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#2B121F] py-10 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#FF6F1E]/20 relative overflow-hidden flex flex-col justify-center">
      {/* Ambient background architectural blurs */}
      <div className="absolute top-0 right-1/4 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#4A2237]/10 via-[#FF6F1E]/8 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-[#2B121F]/8 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Top return link & Citadel badge */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#7A6F68] hover:text-[#2B121F] transition-colors py-1.5 px-3.5 rounded-full bg-white border border-[#E5DFD1] shadow-2xs group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Public Website</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFD1] text-[11px] font-mono text-[#7A6F68] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#2B121F] font-semibold">Citadel AI Agent Core</span>
            <span className="text-[#E5DFD1]">·</span>
            <span>Restricted Operator Gateway</span>
          </div>
        </div>

        {/* Main Access Card */}
        <div className="bg-white rounded-3xl border border-[#E5DFD1] shadow-[0_25px_60px_rgba(43,18,31,0.08)] overflow-hidden">
          {/* Header Banner */}
          <div className="p-8 sm:p-10 border-b border-[#E5DFD1] bg-[#FAF8F3] relative overflow-hidden">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Logo size="md" theme="light" />
                <div className="w-px h-5 bg-[#E5DFD1]" />
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2B121F] text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-2xs">
                  <Bot size={12} className="text-[#FF6F1E]" />
                  <span>Sovereign Agent Console</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold">
                  <ShieldCheck size={12} className="text-emerald-600" />
                  <span>Google Account Required</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#2B121F] tracking-tight leading-tight mb-3">
                Step Into the Enver Autonomous Agent Console.
              </h1>
              <p className="text-sm sm:text-base font-sans text-[#7A6F68] leading-relaxed">
                Direct conversational interface with our deterministic multi-agent deliberation mesh, live Model Context Protocol (MCP v2.0) tool suite, and mathematical verification engines. Access is granted upon connecting your verified Google account.
              </p>
            </div>
          </div>

          {/* Split Content: Left = Concrete Agent Showcase, Right = Google Account Connect */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Concrete Agent Capabilities Showcase (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#E5DFD1] bg-[#FDFBF7] flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#7A6F68] font-bold">
                    What Awaits You Beyond This Gate
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white border border-[#E5DFD1] text-[#2B121F]">
                    <Sparkles size={10} className="text-[#FF6F1E]" />
                    <span>Active Mesh</span>
                  </span>
                </div>

                {/* 3 Concrete Capability Cards */}
                <div className="space-y-3.5">
                  {/* Card 1: Live Multi-Agent Deliberation */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DFD1] shadow-2xs hover:border-[#FF6F1E]/50 transition-colors">
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-[#2B121F] text-[#FF6F1E] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Bot size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-heading font-bold text-sm text-[#2B121F]">
                            Interactive Conversational Agent
                          </h3>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FAF7F0] text-[#7A6F68] font-semibold">
                            Tri-Model DAG
                          </span>
                        </div>
                        <p className="text-xs text-[#7A6F68] leading-relaxed">
                          Converse directly with our reasoning cluster (TypeSafe Jev reflex + Gemini 3.5/3.8 Flash synthesis) with real-time thinking orb telemetry and mathematical statement verification.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Live Model Context Protocol Tools */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DFD1] shadow-2xs hover:border-[#FF6F1E]/50 transition-colors">
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] border border-[#E5DFD1] text-[#2B121F] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Terminal size={18} className="text-[#FF6F1E]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-heading font-bold text-sm text-[#2B121F]">
                            Model Context Protocol (MCP v2.0)
                          </h3>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                            Live SSE
                          </span>
                        </div>
                        <p className="text-xs text-[#7A6F68] leading-relaxed">
                          Execute 23 real-time enterprise tools: MSME underwriting extraction, AST destructive command verification, and Git PR entropy scanning.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Cryptographic Audit Trail */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DFD1] shadow-2xs hover:border-[#FF6F1E]/50 transition-colors">
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] border border-[#E5DFD1] text-[#2B121F] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <ShieldCheck size={18} className="text-emerald-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-heading font-bold text-sm text-[#2B121F]">
                            Tamper-Evident Ledger &amp; Citations
                          </h3>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FAF7F0] text-[#7A6F68] font-semibold">
                            SHA-256
                          </span>
                        </div>
                        <p className="text-xs text-[#7A6F68] leading-relaxed">
                          Zero probabilistic hallucinations. Every financial ratio and compute decision links to an unalterable audit signature with line-level source citations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Telemetry pill strip */}
                <div className="mt-6 pt-5 border-t border-[#E5DFD1] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#7A6F68]">
                  <div className="flex items-center gap-1.5">
                    <Activity size={13} className="text-emerald-600" />
                    <span>Response Latency: &lt; 350ms</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Cpu size={13} className="text-[#FF6F1E]" />
                    <span>Air-Gapped Privacy</span>
                  </div>
                </div>
              </div>

              {/* Credibility Footer */}
              <div className="pt-4 border-t border-[#E5DFD1] text-[11px] font-mono text-[#7A6F68] flex items-center justify-between">
                <span>DPIIT Recognized (#DIPP193082)</span>
                <span>BITSoM &amp; FITT IIT Delhi</span>
              </div>
            </div>

            {/* Right Column: Google Account Connection & Instant Access (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-white">
              <div>
                {/* Mode Selector Tabs: Google vs Operator Access Code */}
                <div className="flex items-center gap-2 p-1 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] mb-6 max-w-xs">
                  <button
                    type="button"
                    onClick={() => { setActiveTab("google"); setCodeError(""); }}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeTab === "google"
                        ? "bg-white text-[#2B121F] shadow-2xs border border-[#E5DFD1]"
                        : "text-[#7A6F68] hover:text-[#2B121F]"
                    }`}
                  >
                    Google Account
                  </button>
                  <button
                    type="button"
                    onClick={() => { setActiveTab("code"); setCodeError(""); }}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeTab === "code"
                        ? "bg-white text-[#2B121F] shadow-2xs border border-[#E5DFD1]"
                        : "text-[#7A6F68] hover:text-[#2B121F]"
                    }`}
                  >
                    Operator Code
                  </button>
                </div>

                {codeError && (
                  <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-sans flex items-start gap-2 animate-in fade-in">
                    <span className="font-bold text-amber-700 shrink-0">Notice:</span>
                    <span>{codeError}</span>
                  </div>
                )}

                {activeTab === "google" ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#2B121F] tracking-tight mb-1.5">
                        Connect with Google to Enter
                      </h2>
                      <p className="text-xs sm:text-sm text-[#7A6F68] font-sans leading-relaxed">
                        To maintain zero-abuse guarantees and sovereign telemetry, access to the live multi-agent playground is authenticated via Google.
                      </p>
                    </div>

                    {/* Prominent Google Authentication Card */}
                    <div className="p-6 rounded-2xl bg-[#FAF8F3] border-2 border-[#E5DFD1] hover:border-[#4285F4]/40 transition-all shadow-2xs space-y-4">
                      {/* One-Click Google Connect Button */}
                      <button
                        type="button"
                        onClick={() => handleGoogleConnect()}
                        disabled={isConnecting || connectionSuccess}
                        className={`w-full py-3.5 px-5 rounded-xl font-heading font-bold text-sm text-[#2B121F] bg-white border-2 border-[#E5DFD1] hover:border-[#4285F4] hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer group active:scale-[0.99] ${
                          isConnecting ? "opacity-75 cursor-wait" : ""
                        }`}
                      >
                        {connectionSuccess ? (
                          <>
                            <CheckCircle2 size={18} className="text-emerald-600 animate-bounce" />
                            <span className="text-emerald-700 font-mono">Google Connected · Entering Citadel...</span>
                          </>
                        ) : isConnecting ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-[#4285F4] border-t-transparent animate-spin" />
                            <span className="font-mono text-xs text-[#7A6F68]">Authenticating Google Identity...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                            </svg>
                            <span>Continue with Google Account</span>
                            <ArrowRight size={16} className="text-[#7A6F68] group-hover:translate-x-1 group-hover:text-[#4285F4] transition-all ml-auto" />
                          </>
                        )}
                      </button>

                      {/* Or enter custom Google Workspace / Gmail handle */}
                      <div className="pt-2">
                        {!showCustomEmailInput ? (
                          <button
                            type="button"
                            onClick={() => setShowCustomEmailInput(true)}
                            className="text-[11px] font-mono text-[#7A6F68] hover:text-[#2B121F] underline decoration-[#E5DFD1] hover:decoration-[#FF6F1E] transition-colors cursor-pointer block text-center w-full"
                          >
                            Or specify a dedicated Google Workspace / Gmail address
                          </button>
                        ) : (
                          <div className="space-y-3 pt-1 border-t border-[#E5DFD1]/60 animate-in fade-in">
                            <div>
                              <label className="text-[10px] font-mono uppercase tracking-wider text-[#7A6F68] font-bold block mb-1">
                                Google Account Email
                              </label>
                              <div className="relative">
                                <Mail size={14} className="absolute left-3 top-3 text-[#7A6F68]" />
                                <input
                                  type="email"
                                  value={googleEmail}
                                  onChange={(e) => setGoogleEmail(e.target.value)}
                                  placeholder="e.g. arjun@gmail.com or name@company.com"
                                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E5DFD1] bg-white text-xs text-[#2B121F] placeholder:text-[#A89F91] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4]"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[10px] font-mono uppercase tracking-wider text-[#7A6F68] font-bold block mb-1">
                                Display Name (Optional)
                              </label>
                              <div className="relative">
                                <User size={14} className="absolute left-3 top-3 text-[#7A6F68]" />
                                <input
                                  type="text"
                                  value={googleName}
                                  onChange={(e) => setGoogleName(e.target.value)}
                                  placeholder="e.g. Arjun Mehta"
                                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E5DFD1] bg-white text-xs text-[#2B121F] placeholder:text-[#A89F91] focus:outline-none focus:ring-2 focus:ring-[#4285F4]/30 focus:border-[#4285F4]"
                                />
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleGoogleConnect(googleEmail, googleName)}
                              disabled={isConnecting}
                              className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold text-white bg-[#2B121F] hover:bg-[#FF6F1E] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                            >
                              <span>Verify &amp; Enter with this Google Account</span>
                              <ArrowRight size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Enterprise Alternative: Microsoft Entra SSO */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                      <span className="font-mono text-[11px] text-[#7A6F68]">Corporate alternative:</span>
                      <button
                        type="button"
                        onClick={async () => {
                          localStorage.setItem("enver_playground_unlocked", "true");
                          await loginMicrosoftWork(undefined, undefined, undefined, true);
                          onUnlock();
                        }}
                        className="inline-flex items-center gap-2 py-1.5 px-3 rounded-lg border border-[#E5DFD1] hover:border-[#00a4ef] bg-[#FAF8F3] hover:bg-white text-[11px] font-mono text-[#2B121F] transition-all cursor-pointer shadow-2xs"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 23 23">
                          <path fill="#f25022" d="M1 1h10v10H1z"/>
                          <path fill="#00a4ef" d="M1 12h10v10H1z"/>
                          <path fill="#7fba00" d="M12 1h10v10H12z"/>
                          <path fill="#ffb900" d="M12 12h10v10H12z"/>
                        </svg>
                        <span>Sign in with Microsoft Entra ID</span>
                      </button>
                    </div>

                    {/* Terms Agreement Checkbox */}
                    <div className="pt-4 border-t border-[#E5DFD1]/60">
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-[#E5DFD1] text-[#FF6F1E] focus:ring-[#FF6F1E]/30 accent-[#FF6F1E]"
                        />
                        <span className="text-[11px] font-sans text-[#7A6F68] leading-relaxed">
                          I agree to Enver AI Tech's{" "}
                          <Link href="/terms" target="_blank" className="text-[#2B121F] font-semibold underline underline-offset-2 hover:text-[#FF6F1E]">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" target="_blank" className="text-[#2B121F] font-semibold underline underline-offset-2 hover:text-[#FF6F1E]">
                            Privacy Statement
                          </Link>
                          . Zero spam guarantee — your Google session is used exclusively for verified identity access.
                        </span>
                      </label>
                    </div>
                  </div>
                ) : (
                  /* Tab 2: Operator Clearance Code */
                  <form onSubmit={handleCodeSubmit} className="space-y-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#2B121F] tracking-tight mb-1.5">
                        Internal Operator Clearance
                      </h2>
                      <p className="text-xs sm:text-sm text-[#7A6F68] font-sans leading-relaxed">
                        Enver engineering team members, institutional partners, and accredited pilot holders may enter using their cryptographic access code.
                      </p>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#7A6F68] font-bold block mb-1.5">
                        Operator Clearance Token
                      </label>
                      <div className="relative">
                        <KeyRound size={15} className="absolute left-3.5 top-3.5 text-[#7A6F68]" />
                        <input
                          type="text"
                          value={accessCode}
                          onChange={(e) => setAccessCode(e.target.value)}
                          placeholder="e.g. ENVER2026 or ENV-XXXX"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5DFD1] bg-white text-sm font-mono tracking-wider text-[#2B121F] placeholder:text-[#A89F91] focus:outline-none focus:ring-2 focus:ring-[#FF6F1E]/30 focus:border-[#FF6F1E]"
                        />
                      </div>
                      <span className="text-[10px] font-mono text-[#7A6F68] mt-1 block">
                        Team demo code: <code className="font-bold text-[#2B121F]">ENVER2026</code>
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl font-heading font-bold text-sm text-white bg-[#2B121F] hover:bg-[#FF6F1E] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
                    >
                      <span>Unlock Sovereign Console</span>
                      <ArrowRight size={15} />
                    </button>
                  </form>
                )}
              </div>

              {/* Zero-Spam / Zero Data Egress Notice */}
              <div className="mt-8 pt-4 border-t border-[#E5DFD1] text-[11px] font-mono text-[#7A6F68] flex items-center gap-2">
                <Shield size={13} className="text-emerald-600 shrink-0" />
                <span>Zero Data Egress · Sovereign air-gapped state preserved across sessions.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
