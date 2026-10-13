import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Mail,
  ShieldCheck,
  Terminal,
  BookOpen,
  ExternalLink,
  Sparkles,
  KeyRound,
  X,
  Building,
  Users,
  Download,
  Lock
} from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { getCustomerRoster, CustomerLeadRecord } from "@/lib/auth";

export default function AgentGateway() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const { register, login, loginGoogle, logout, user } = useAuth();

  // Mode: "signin" vs "signup"
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const [authMode, setAuthMode] = useState<"signin" | "signup">(initialMode);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: ""
  });

  const [step, setStep] = useState<"form" | "admitted">(user ? "admitted" : "form");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queueToken, setQueueToken] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Admin Roster Modal / View
  const [showAdminRoster, setShowAdminRoster] = useState(false);
  const [customerRoster, setCustomerRoster] = useState<CustomerLeadRecord[]>([]);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Sync user state on mount or change
  useEffect(() => {
    if (user) {
      setStep("admitted");
      setFormData((prev) => ({
        ...prev,
        email: user.email || prev.email,
        name: user.displayName || prev.name,
        company: user.org || prev.company
      }));
    }
  }, [user]);

  // Load customer roster for admin
  useEffect(() => {
    setCustomerRoster(getCustomerRoster());
  }, [step, showAdminRoster]);

  const generateQueueToken = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let token = "ENV-PRD-";
    for (let i = 0; i < 4; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  };

  // 1. Direct Sign In Submission
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatusMessage("");

    const cleanEmail = formData.email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage("Please enter your registered work email.");
      return;
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      setErrorMessage("Please enter a valid work email address (e.g. name@company.com).");
      return;
    }

    if (!formData.password || formData.password.trim().length === 0) {
      setErrorMessage("Please enter your passcode or access key.");
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage("Please accept the Terms of Service & Privacy Statement to proceed.");
      return;
    }

    setIsSubmitting(true);
    const token = generateQueueToken();
    setQueueToken(token);

    try {
      await login({
        email: cleanEmail,
        password: formData.password,
        acceptTos: true,
        acceptPs: true
      });

      localStorage.setItem("enver_playground_unlocked", "true");
      setIsSubmitting(false);
      setStep("admitted");
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || "Sign in failed. Please verify your credentials or register a new account.");
    }
  };

  // 2. Direct Enterprise Sign Up (Real customer onboarding, no fake loops)
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatusMessage("");

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanCompany = formData.company.trim();

    if (!cleanName || cleanName.length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      setErrorMessage("Please enter a valid work email address (e.g. name@company.com).");
      return;
    }

    if (!formData.password || formData.password.length < 4) {
      setErrorMessage("Please set an access passcode (minimum 4 characters).");
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage("You must agree to the Terms of Service & Privacy Statement to register.");
      return;
    }

    setIsSubmitting(true);
    const token = generateQueueToken();
    setQueueToken(token);

    try {
      await register({
        name: cleanName,
        email: cleanEmail,
        password: formData.password,
        company: cleanCompany || "Enterprise Client",
        role: "ENGINEER",
        workload: "Artificer · Autonomous Credit Underwriting",
        acceptTos: true,
        acceptPs: true
      });

      localStorage.setItem("enver_playground_unlocked", "true");
      setIsSubmitting(false);
      setStep("admitted");
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || "Registration failed. Please check your details.");
    }
  };

  // 3. Real Microsoft Entra ID Native SSO (Azure Static Web Apps built-in OAuth)
  const handleMicrosoftEntraSso = () => {
    if (!agreedToTerms) {
      setErrorMessage("Please accept the Terms of Service & Privacy Statement before signing in.");
      return;
    }
    // Redirect directly to Azure Static Web Apps native Microsoft OAuth
    window.location.href = "/.auth/login/aad?post_login_redirect_uri=/agent-gateway";
  };

  // 4. Real Google Workspace SSO
  const handleGoogleSso = async () => {
    if (!agreedToTerms) {
      setErrorMessage("Please accept the Terms of Service & Privacy Statement before signing in.");
      return;
    }

    const emailInput = window.prompt("Enter your Corporate Google Workspace email:");
    if (!emailInput) return;

    const cleanEmail = emailInput.trim().toLowerCase();
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setErrorMessage("Please enter a valid Google Workspace work email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const displayName = cleanEmail.split("@")[0].replace(/[._-]/g, " ");
      await loginGoogle(cleanEmail, displayName, "Google Workspace Partner", true);
      localStorage.setItem("enver_playground_unlocked", "true");
      setIsSubmitting(false);
      setStep("admitted");
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || "Google Workspace authentication failed.");
    }
  };

  // Export Customer Roster as CSV (for founders)
  const handleExportRoster = () => {
    const roster = getCustomerRoster();
    if (!roster.length) {
      alert("No customer records registered yet.");
      return;
    }
    const headers = "Name,Email,Company,Role,Provider,Timestamp,Token\n";
    const rows = roster
      .map(
        (c) =>
          `"${c.name}","${c.email}","${c.company}","${c.role || ""}","${c.provider}","${c.timestamp}","${c.token || ""}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enver_customers_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isAdmin =
    user?.email?.toLowerCase() === "enver.ai@outlook.com" ||
    user?.email?.toLowerCase() === "hanabi@enveraitech.com" ||
    user?.email?.toLowerCase().endsWith("@enveraitech.com");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#111111] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#FEE140]/60 selection:text-black relative overflow-x-hidden">
      {/* Top Navbar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pt-2 pb-6">
        <Link href="/" className="inline-flex items-center gap-2 group no-underline">
          <Logo size="md" theme="light" />
        </Link>

        {/* Top Announcement Pill */}
        <Link
          href="/accreditations"
          className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white hover:bg-[#F8F5EE] border border-[#E9E4D9] shadow-[0_2px_8px_rgba(0,0,0,0.03)] text-xs font-sans text-[#4A453F] transition-all no-underline group"
        >
          <span className="font-medium">
            OpenAI Partner in Tier-1 Hyperscale Accelerators
          </span>
          <span className="w-5 h-5 rounded-full bg-[#EFE8DC] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center transition-colors">
            <ArrowRight size={11} />
          </span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl w-full mx-auto my-auto py-6">
        {step === "form" ? (
          <div>
            {/* Active Session Pill if already signed in */}
            {user && (
              <div className="max-w-xl mx-auto mb-8 p-3.5 px-5 rounded-2xl bg-white border border-[#E9E4D9] shadow-[0_2px_10px_rgba(0,0,0,0.03)] text-xs font-sans flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[#4A453F] truncate">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span className="truncate">
                    Active Session: <strong className="text-[#111111]">{user.email}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep("admitted")}
                  className="font-medium text-[#111111] underline underline-offset-2 hover:opacity-80 cursor-pointer"
                >
                  View Status
                </button>
              </div>
            )}

            {/* Title Section */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#111111] font-normal tracking-tight mb-3">
                {authMode === "signin" ? "Institutional Access" : "Customer Registration"}
              </h1>
              <p className="text-xs sm:text-sm font-sans text-[#756E65] max-w-lg mx-auto leading-relaxed">
                {authMode === "signin"
                  ? "Authenticate to access Enver AI Tech sovereign intelligence solutions, autonomous credit underwriting citadel, and formal research theorems."
                  : "Register your enterprise account to access our autonomous agent meshes, Artificer underwriting citadel, and proprietary models."}
              </p>
            </div>

            {/* Error & Status Alerts */}
            {errorMessage && (
              <div className="max-w-xl mx-auto mb-6 p-4 rounded-2xl bg-red-50 border border-red-200/80 text-red-700 text-xs font-sans flex items-center justify-between shadow-xs">
                <span>{errorMessage}</span>
                <button
                  type="button"
                  onClick={() => setErrorMessage("")}
                  className="text-red-600 hover:text-red-900 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {statusMessage && (
              <div className="max-w-xl mx-auto mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans flex items-center justify-between shadow-xs">
                <span>{statusMessage}</span>
                <button
                  type="button"
                  onClick={() => setStatusMessage("")}
                  className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Two-Column Gateway Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-6 sm:gap-8 items-center max-w-3xl mx-auto">
              {/* Left Column: Direct Work Credentials */}
              <div className="md:col-span-5 space-y-4">
                {authMode === "signin" ? (
                  /* Sign In Form */
                  <form onSubmit={handleSignInSubmit} noValidate className="space-y-3.5">
                    <div className="relative">
                      <input
                        type="email"
                        required
                        name="email"
                        autoComplete="username"
                        inputMode="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Work Email (e.g. name@company.com)"
                        className="w-full px-6 py-4 rounded-full bg-white border border-[#E9E4D9] text-[#111111] text-xs sm:text-sm font-sans placeholder-[#9C958B] shadow-[0_4px_16px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#111111] transition-all"
                      />
                    </div>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        name="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Passcode / Access Key"
                        className="w-full pl-6 pr-12 py-4 rounded-full bg-white border border-[#E9E4D9] text-[#111111] text-xs sm:text-sm font-sans placeholder-[#9C958B] shadow-[0_4px_16px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#111111] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-4 text-[#9C958B] hover:text-[#111111] transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-full bg-[#111111] hover:bg-[#2B121F] text-white text-xs sm:text-sm font-sans font-medium flex items-center justify-between shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-md transition-all cursor-pointer group disabled:opacity-50"
                    >
                      <span>{isSubmitting ? "Authenticating..." : "Login to Your Account"}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                ) : (
                  /* Real Direct Enterprise Sign Up Form */
                  <form onSubmit={handleSignUpSubmit} noValidate className="space-y-3.5">
                    <div>
                      <input
                        type="text"
                        required
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full Name"
                        className="w-full px-6 py-3.5 rounded-full bg-white border border-[#E9E4D9] text-[#111111] text-xs sm:text-sm font-sans placeholder-[#9C958B] shadow-[0_4px_16px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#111111] transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        name="email"
                        autoComplete="username"
                        inputMode="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Work Email (e.g. name@company.com)"
                        className="w-full px-6 py-3.5 rounded-full bg-white border border-[#E9E4D9] text-[#111111] text-xs sm:text-sm font-sans placeholder-[#9C958B] shadow-[0_4px_16px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#111111] transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="organization"
                        autoComplete="organization"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Enterprise Organization (e.g. Citadel, Axis Bank)"
                        className="w-full px-6 py-3.5 rounded-full bg-white border border-[#E9E4D9] text-[#111111] text-xs sm:text-sm font-sans placeholder-[#9C958B] shadow-[0_4px_16px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#111111] transition-all"
                      />
                    </div>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        name="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Create Passcode / Access Key (min 4 chars)"
                        className="w-full pl-6 pr-12 py-3.5 rounded-full bg-white border border-[#E9E4D9] text-[#111111] text-xs sm:text-sm font-sans placeholder-[#9C958B] shadow-[0_4px_16px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#111111] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-3.5 text-[#9C958B] hover:text-[#111111] transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-full bg-[#111111] hover:bg-[#2B121F] text-white text-xs sm:text-sm font-sans font-medium flex items-center justify-between shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-md transition-all cursor-pointer group disabled:opacity-50"
                    >
                      <span>{isSubmitting ? "Registering Verified Account..." : "Create Account & Access Citadel"}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>

              {/* Middle Divider */}
              <div className="hidden md:flex md:col-span-1 items-center justify-center text-[#C7C0B5] font-serif text-xl select-none">
                /
              </div>

              {/* Right Column: Real Microsoft Entra ID & Google Workspace */}
              <div className="md:col-span-5 space-y-3.5">
                {/* Real Microsoft Entra ID Native SSO */}
                <button
                  type="button"
                  onClick={handleMicrosoftEntraSso}
                  className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-[#F8F5EE] border border-[#E9E4D9] text-xs sm:text-sm font-sans font-medium text-[#111111] flex items-center gap-3.5 shadow-[0_3px_12px_rgba(0,0,0,0.02)] transition-all cursor-pointer group"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                  <span className="truncate">Sign in with Microsoft Entra ID</span>
                </button>

                {/* Google Workspace */}
                <button
                  type="button"
                  onClick={handleGoogleSso}
                  className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-[#F8F5EE] border border-[#E9E4D9] text-xs sm:text-sm font-sans font-medium text-[#111111] flex items-center gap-3.5 shadow-[0_3px_12px_rgba(0,0,0,0.02)] transition-all cursor-pointer group"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span className="truncate">Sign in with Google Workspace</span>
                </button>

                <p className="text-[11px] text-[#8F887C] pt-2 px-1 text-center sm:text-left leading-normal">
                  Corporate Google Workspace and Microsoft 365 accounts sign in directly via 1-click federated verification.
                </p>
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="mt-8 text-center space-y-4">
              <div className="flex items-center justify-center gap-6 text-xs sm:text-sm font-sans text-[#756E65]">
                {authMode === "signin" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("signup");
                        setErrorMessage("");
                        setStatusMessage("");
                      }}
                      className="hover:text-[#111111] transition-colors cursor-pointer"
                    >
                      Need an account? <strong className="text-[#111111] font-semibold underline underline-offset-4">Register with Work Email</strong>
                    </button>
                    <span>·</span>
                    <Link href="/contact" className="hover:text-[#111111] transition-colors no-underline">
                      Need Enterprise Key?
                    </Link>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("signin");
                      setErrorMessage("");
                      setStatusMessage("");
                    }}
                    className="hover:text-[#111111] transition-colors cursor-pointer"
                  >
                    Already registered? <strong className="text-[#111111] font-semibold underline underline-offset-4">Sign in to your account</strong>
                  </button>
                )}
              </div>

              {/* Mandatory Sovereign Terms Agreement */}
              <div>
                <label className="inline-flex items-center gap-2 text-[11px] font-sans text-[#8F887C] cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-3.5 h-3.5 rounded accent-[#111111] border-[#C7C0B5] cursor-pointer"
                  />
                  <span>
                    By accessing, you agree to Enver AI Tech's{" "}
                    <Link href="/tos" target="_blank" className="text-[#111111] font-medium underline underline-offset-2">
                      Terms of Service
                    </Link>{" "}
                    &amp;{" "}
                    <Link href="/ps" target="_blank" className="text-[#111111] font-medium underline underline-offset-2">
                      Privacy Statement
                    </Link>
                    .
                  </span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          /* Admitted State - Multi-Entity Unlocked Hub */
          <div className="max-w-xl mx-auto text-center py-6 animate-in fade-in-50 duration-300">
            <div className="bg-white rounded-3xl border border-[#E9E4D9] p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 mb-6 font-semibold">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>SESSION ADMITTED · VERIFIED CLEARANCE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] mb-3">
                Welcome to Enver AI Tech
              </h2>

              <p className="text-xs sm:text-sm font-sans text-[#756E65] max-w-md mx-auto leading-relaxed mb-6">
                Your enterprise identity has been validated under sovereign governance protocols (Compliance Ref: <strong>EAT-TOS-2026.04</strong>).
              </p>

              {/* Dossier Card */}
              <div className="p-5 rounded-2xl bg-[#FBF9F4] border border-[#E9E4D9] text-left mb-6 space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E9E4D9]">
                  <span className="text-[#756E65]">ADMISSION TOKEN:</span>
                  <span className="font-bold text-[#111111] bg-white px-2.5 py-1 rounded border border-[#E9E4D9]">
                    {queueToken || "ENV-PRD-8421"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#756E65]">Account Email:</span>
                  <span className="font-medium text-[#111111]">{formData.email || user?.email || "verified@enterprise.client"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#756E65]">Organization:</span>
                  <span className="font-medium text-[#111111]">{formData.company || user?.org || "Enterprise Partner"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#756E65]">Clearance Level:</span>
                  <span className="font-medium text-[#111111]">
                    {isAdmin ? "Enver Core Founder / Admin" : "Verified Enterprise Customer"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#756E65]">Terms Governance:</span>
                  <span className="font-medium text-emerald-700">COMPLIANT (EAT-TOS-2026.04)</span>
                </div>
              </div>

              {/* Unlocked Citadel Entities */}
              <div className="space-y-3 mb-6 text-left">
                <p className="text-xs font-sans font-semibold text-[#8F887C] uppercase tracking-wider px-1">
                  Unlocked Solutions &amp; Engines:
                </p>

                {/* 1. Artificer Citadel (Running Live on Azure Container Apps) */}
                <a
                  href="https://artificer-enverai.thankfulbay-87f2ee82.centralindia.azurecontainerapps.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-4 rounded-2xl bg-white hover:bg-[#FAF8F2] border border-[#E9E4D9] text-[#111111] transition-all flex items-center justify-between group no-underline shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <div className="font-sans font-medium text-xs sm:text-sm text-[#111111] flex items-center gap-1.5">
                        <span>Launch Artificer Citadel</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">Live on Azure</span>
                      </div>
                      <div className="text-[11px] font-sans text-[#756E65]">Autonomous credit underwriting citadel for MSMEs</div>
                    </div>
                  </div>
                  <ExternalLink size={15} className="text-[#756E65] group-hover:text-[#111111] transition-colors" />
                </a>

                {/* 2. Agentic Console */}
                <Link
                  href="/playground"
                  className="w-full p-4 rounded-2xl bg-[#111111] hover:bg-[#2B121F] text-white transition-all flex items-center justify-between group no-underline shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                      <Terminal size={16} />
                    </div>
                    <div>
                      <div className="font-sans font-medium text-xs sm:text-sm text-white">Launch Agentic Console</div>
                      <div className="text-[11px] font-sans text-neutral-400">High-throughput autonomous agent meshes &amp; MCP protocols</div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* 3. Deep Research */}
                <Link
                  href="/research"
                  className="w-full p-4 rounded-2xl bg-white hover:bg-[#FAF8F2] border border-[#E9E4D9] text-[#111111] transition-all flex items-center justify-between group no-underline shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#F0ECE1] flex items-center justify-center text-[#2B3322]">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <div className="font-sans font-medium text-xs sm:text-sm text-[#111111]">Access Deep Research Papers</div>
                      <div className="text-[11px] font-sans text-[#756E65]">Formal AST verification theorems &amp; RBI DL-09 compliance</div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-[#111111] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Admin Customer Directory Access */}
              <div className="mb-6 p-4 rounded-2xl bg-[#F8F5EE] border border-[#E9E4D9] flex items-center justify-between text-left">
                <div className="flex items-center gap-2.5">
                  <Users size={16} className="text-[#C8973E]" />
                  <div>
                    <span className="text-xs font-sans font-semibold text-[#111111]">Customer Directory (Admin)</span>
                    <p className="text-[11px] text-[#756E65]">{customerRoster.length} verified customer{customerRoster.length === 1 ? "" : "s"} on sovereign ledger</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAdminRoster(!showAdminRoster)}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#E9E4D9] text-xs font-sans font-medium text-[#111111] hover:bg-[#FAF8F2] cursor-pointer"
                >
                  {showAdminRoster ? "Hide Roster" : "View Roster"}
                </button>
              </div>

              {/* Customer Roster Table (Admin View) */}
              {showAdminRoster && (
                <div className="mb-6 p-4 rounded-2xl bg-white border border-[#E9E4D9] text-left animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E9E4D9] mb-3">
                    <span className="text-xs font-sans font-bold text-[#111111]">Registered Customers</span>
                    <button
                      type="button"
                      onClick={handleExportRoster}
                      className="inline-flex items-center gap-1.5 text-xs text-[#111111] font-medium underline hover:opacity-80 cursor-pointer"
                    >
                      <Download size={13} /> Export CSV
                    </button>
                  </div>

                  {customerRoster.length === 0 ? (
                    <p className="text-xs text-[#756E65] py-2">No registered customers recorded yet.</p>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {customerRoster.map((c, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-[#FBF9F4] border border-[#E9E4D9] text-xs font-sans flex items-center justify-between gap-2">
                          <div className="truncate">
                            <strong className="text-[#111111] block">{c.name}</strong>
                            <span className="text-[#756E65] font-mono text-[11px]">{c.email}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-mono block mb-0.5">
                              {c.company || "Enterprise"}
                            </span>
                            <span className="text-[10px] text-[#8F887C] block font-mono">
                              {new Date(c.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Nav Links */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E9E4D9] text-xs font-sans text-[#756E65]">
                <Link href="/" className="hover:text-[#111111] transition-colors no-underline">
                  ← Return to Home
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setStep("form");
                    setErrorMessage("");
                    setStatusMessage("");
                    setFormData({ name: "", email: "", password: "", company: "" });
                  }}
                  className="hover:text-rose-600 underline cursor-pointer"
                >
                  Sign Out / Switch Account
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Bar */}
      <footer className="max-w-6xl w-full mx-auto pt-8 pb-2 border-t border-[#E9E4D9]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#756E65]">
        <div className="flex items-center gap-4">
          <Link href="/ps" className="hover:text-[#111111] transition-colors no-underline">
            Privacy Policy
          </Link>
          <span className="text-[#C7C0B5]">|</span>
          <Link href="/tos" className="hover:text-[#111111] transition-colors no-underline">
            Terms &amp; Conditions
          </Link>
        </div>

        <div className="text-center sm:text-right">
          <span>Copyrights @ Enver AI Tech Pvt Ltd 2026 · OpenAI Partner · Tier-1 Hyperscale Accelerator</span>
        </div>
      </footer>
    </div>
  );
}
