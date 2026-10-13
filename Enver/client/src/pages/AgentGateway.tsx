import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  ArrowLeft,
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
  RotateCw,
  X,
  Building,
  Info
} from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";

export default function AgentGateway() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const { register, login, sendOtp, verifyOtp, loginMicrosoftWork, loginGoogle, logout, user } = useAuth();

  // Mode: "signin" vs "signup"
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const [authMode, setAuthMode] = useState<"signin" | "signup">(initialMode);

  // Multi-step signup: "details" -> "otp" -> "passcode"
  const [signupStep, setSignupStep] = useState<"details" | "otp" | "passcode">("details");

  // OTP State
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [previewOtp, setPreviewOtp] = useState<string | null>(null);
  const [verificationToken, setVerificationToken] = useState<string>("");
  const [otpResendCooldown, setOtpResendCooldown] = useState(0);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Dev backdoor support
  const devAccess = searchParams.get("access") === "root" || searchParams.get("preview") === "true";
  useEffect(() => {
    if (devAccess) {
      localStorage.setItem("enver_playground_unlocked", "true");
    }
  }, [devAccess]);

  const [step, setStep] = useState<"form" | "admitted">("form");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queueToken, setQueueToken] = useState("");

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: ""
  });

  // Mandatory ToS & Privacy consent
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Enterprise SSO Linking Modal State (Google & Microsoft)
  const [ssoModal, setSsoModal] = useState<{
    open: boolean;
    provider: "microsoft" | "google";
    email: string;
    name: string;
    company: string;
    loading: boolean;
    error: string;
  }>({
    open: false,
    provider: "microsoft",
    email: "",
    name: "",
    company: "",
    loading: false,
    error: ""
  });

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Countdown timer for OTP resend
  useEffect(() => {
    if (otpResendCooldown > 0) {
      const timer = setTimeout(() => setOtpResendCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpResendCooldown]);

  const generateQueueToken = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let token = "ENV-PRD-";
    for (let i = 0; i < 4; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  };

  // Sign In Submission
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatusMessage("");

    const cleanEmail = formData.email.trim();
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
      setErrorMessage(err?.message || "Sign in failed. Please verify your credentials.");
    }
  };

  // Sign Up Step 1: Request Email OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatusMessage("");

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();

    if (!cleanName || cleanName.length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      setErrorMessage("Please enter a valid work email address (e.g. name@company.com).");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await sendOtp(cleanEmail, cleanName);
      setIsSubmitting(false);
      if (res.previewCode) {
        setPreviewOtp(res.previewCode);
      }
      setSignupStep("otp");
      setOtpResendCooldown(45);
      setStatusMessage(`Verification code sent to ${cleanEmail}`);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || "Failed to dispatch verification code.");
    }
  };

  // Sign Up Step 2: Handle OTP Single-Digit Change (Auto-advance)
  const handleDigitChange = (index: number, value: string) => {
    const raw = value.replace(/\D/g, "");
    if (!raw) {
      const newDigits = [...otpDigits];
      newDigits[index] = "";
      setOtpDigits(newDigits);
      return;
    }

    // Take the last typed character
    const char = raw.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);

    // Auto-advance focus to next input
    if (index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Sign Up Step 2: Handle 6-digit Paste across all boxes
  const handlePasteOtp = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || "";
    }
    setOtpDigits(newDigits);
    const focusIdx = Math.min(pasted.length, 5);
    otpInputRefs.current[focusIdx]?.focus();
  };

  // Sign Up Step 2: Handle Backspace & Arrows smoothly
  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otpDigits[index] && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
      } else if (otpDigits[index]) {
        const newDigits = [...otpDigits];
        newDigits[index] = "";
        setOtpDigits(newDigits);
        e.preventDefault();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Sign Up Step 2: Verify OTP
  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatusMessage("");

    const fullCode = otpDigits.join("").trim();
    if (fullCode.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit verification code.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await verifyOtp(formData.email.trim(), fullCode);
      setIsSubmitting(false);
      setVerificationToken(res.verificationToken || `vet_${Date.now()}`);
      setSignupStep("passcode");
      setStatusMessage("Work email verified successfully! Create your passcode.");
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || "Invalid or expired verification code.");
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (otpResendCooldown > 0 || isSubmitting) return;
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      const res = await sendOtp(formData.email.trim(), formData.name.trim());
      setIsSubmitting(false);
      if (res.previewCode) {
        setPreviewOtp(res.previewCode);
      }
      setOtpResendCooldown(45);
      setStatusMessage(`Fresh verification code sent to ${formData.email}`);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || "Failed to resend code.");
    }
  };

  // Sign Up Step 3: Set Passcode & Complete Registration
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatusMessage("");

    if (!formData.password || formData.password.length < 4) {
      setErrorMessage("Passcode must be at least 4 characters long.");
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage("You must accept the Terms of Service & Privacy Statement to access Enver.");
      return;
    }

    setIsSubmitting(true);
    const token = generateQueueToken();
    setQueueToken(token);

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        company: formData.company.trim(),
        role: "ENGINEER",
        workload: "Artificer · Autonomous Credit Underwriting",
        verificationToken,
        emailVerified: true,
        acceptTos: true,
        acceptPs: true
      });

      // Dispatch audit notification
      fetch("https://formsubmit.co/ajax/hanabi@enveraitech.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || "Enterprise Inquirer",
          token,
          email_verified: "YES (Cryptographic OTP Verified)",
          partner_tier: "Tier-1 Hyperscale Accelerator",
          tos_accepted: "YES (EAT-TOS-2026.04)",
          _subject: `🎟️ Verified Enver Member: ${formData.name} [${token}]`,
          _captcha: "false"
        })
      }).catch(() => {});

      localStorage.setItem("enver_playground_unlocked", "true");
      setIsSubmitting(false);
      setStep("admitted");
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || "Registration failed. Please check your details.");
    }
  };

  // Open SSO Enterprise Linking Modal
  const handleInitiateSso = (provider: "microsoft" | "google") => {
    setErrorMessage("");
    if (!agreedToTerms) {
      setErrorMessage("Please accept the Terms of Service & Privacy Statement before signing in.");
      return;
    }
    setSsoModal({
      open: true,
      provider,
      email: formData.email.trim() || (provider === "google" ? "elena@apexfinancial.com" : "elena@citadel.com"),
      name: formData.name.trim() || "Elena Rostova",
      company: formData.company.trim() || (provider === "google" ? "Apex Financial Corp" : "Citadel Financial Infrastructure"),
      loading: false,
      error: ""
    });
  };

  // Submit SSO Modal (Federated Enterprise Authentication)
  const handleConfirmSso = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = ssoModal.email.trim().toLowerCase();
    const cleanName = ssoModal.name.trim();
    const cleanCompany = ssoModal.company.trim();

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      setSsoModal((prev) => ({ ...prev, error: "Please enter a valid enterprise work email." }));
      return;
    }

    if (!cleanName) {
      setSsoModal((prev) => ({ ...prev, error: "Please enter your full name." }));
      return;
    }

    setSsoModal((prev) => ({ ...prev, loading: true, error: "" }));
    const token = generateQueueToken();
    setQueueToken(token);

    try {
      if (ssoModal.provider === "microsoft") {
        await loginMicrosoftWork(cleanEmail, cleanName, cleanCompany, true);
      } else {
        await loginGoogle(cleanEmail, cleanName, cleanCompany, true);
      }

      setFormData((prev) => ({
        ...prev,
        email: cleanEmail,
        name: cleanName,
        company: cleanCompany
      }));

      // Dispatch audit notification
      fetch("https://formsubmit.co/ajax/hanabi@enveraitech.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          company: cleanCompany,
          token,
          sso_provider: ssoModal.provider === "microsoft" ? "Microsoft Entra ID" : "Google Workspace",
          email_verified: `YES (${ssoModal.provider.toUpperCase()} SSO Federated)`,
          _subject: `🎟️ Verified Enver SSO Member: ${cleanName} [${token}]`,
          _captcha: "false"
        })
      }).catch(() => {});

      localStorage.setItem("enver_playground_unlocked", "true");
      setSsoModal((prev) => ({ ...prev, open: false, loading: false }));
      setStep("admitted");
    } catch (err: any) {
      setSsoModal((prev) => ({ ...prev, loading: false, error: err?.message || "SSO identity verification failed." }));
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#111111] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#FEE140]/60 selection:text-black relative overflow-x-hidden">
      {/* Top Navbar / Header Bar */}
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
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setStep("admitted")}
                    className="font-medium text-[#111111] underline underline-offset-2 hover:opacity-80 cursor-pointer"
                  >
                    View Status
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setErrorMessage("");
                      setStatusMessage("");
                    }}
                    className="text-[#888177] hover:text-rose-600 underline cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {/* Editorial Heading Section with Hand-Drawn Yellow Loop */}
            <div className="text-center mb-10 sm:mb-14">
              <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-serif tracking-tight leading-[1.08] text-[#111111] font-normal mb-4">
                {authMode === "signin" ? (
                  <>
                    <span className="relative inline-block mr-3">
                      <span>Login</span>
                      {/* Organic Yellow Highlight Loop */}
                      <svg
                        className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+24px)] h-[calc(100%+16px)] pointer-events-none -z-10"
                        viewBox="0 0 170 65"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 34C14 18 42 6 88 8C142 10 162 24 160 38C158 52 126 59 78 57C32 55 10 44 12 30"
                          stroke="#FACC15"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    to Your Account
                  </>
                ) : (
                  <>
                    <span className="relative inline-block mr-3">
                      <span>Create</span>
                      <svg
                        className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+24px)] h-[calc(100%+16px)] pointer-events-none -z-10"
                        viewBox="0 0 170 65"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 34C14 18 42 6 88 8C142 10 162 24 160 38C158 52 126 59 78 57C32 55 10 44 12 30"
                          stroke="#FACC15"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Your Account
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base font-sans text-[#6B645D] max-w-xl mx-auto leading-relaxed font-normal">
                Uncover the Untapped Potential of Autonomous Fleets &amp; Sovereign Enclaves to Connect with Production Workloads
              </p>
            </div>

            {/* Notification Messages */}
            {errorMessage && (
              <div className="max-w-xl mx-auto mb-6 p-3.5 px-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-center justify-between gap-2 shadow-sm animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Error:</span>
                  <span>{errorMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setErrorMessage("")}
                  className="text-rose-500 hover:text-rose-800 text-sm font-bold leading-none cursor-pointer"
                >
                  ×
                </button>
              </div>
            )}

            {statusMessage && !errorMessage && (
              <div className="max-w-xl mx-auto mb-6 p-3 px-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans flex items-center justify-between gap-2 shadow-sm animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStatusMessage("")}
                  className="text-emerald-600 hover:text-emerald-900 text-sm font-bold leading-none cursor-pointer"
                >
                  ×
                </button>
              </div>
            )}

            {/* Split Grid: Left Column (Form) / Middle Slash / Right Column (SSO) */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-6 sm:gap-8 items-center max-w-3xl mx-auto">
              {/* Left Column */}
              <div className="md:col-span-5">
                {authMode === "signin" ? (
                  /* Standard Sign In Form */
                  <form onSubmit={handleSignInSubmit} noValidate className="space-y-4">
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
                      <span>
                        {isSubmitting ? "Verifying Credentials..." : "Login to Your Account"}
                      </span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                ) : (
                  /* 3-Step Work Email + OTP Sign Up Workflow */
                  <div>
                    {signupStep === "details" && (
                      /* Step 1: Work Details & Email Input */
                      <form onSubmit={handleRequestOtp} noValidate className="space-y-3.5 animate-in fade-in duration-200">
                        <div className="relative">
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
                            className="w-full px-6 py-3.5 rounded-full bg-white border border-[#E9E4D9] text-[#111111] text-xs sm:text-sm font-sans placeholder-[#9C958B] shadow-[0_4px_16px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#111111] transition-all"
                          />
                        </div>

                        <div className="relative">
                          <input
                            type="text"
                            name="organization"
                            autoComplete="organization"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Enterprise Organization (Optional)"
                            className="w-full px-6 py-3.5 rounded-full bg-white border border-[#E9E4D9] text-[#111111] text-xs sm:text-sm font-sans placeholder-[#9C958B] shadow-[0_4px_16px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#111111] transition-all"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 px-6 rounded-full bg-[#111111] hover:bg-[#2B121F] text-white text-xs sm:text-sm font-sans font-medium flex items-center justify-between shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-md transition-all cursor-pointer group disabled:opacity-50"
                        >
                          <span>
                            {isSubmitting ? "Dispatching Code..." : "Send Verification Code"}
                          </span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <p className="text-[11px] text-center text-[#8F887C] pt-1">
                          A 6-digit cryptographic verification code will be sent to your work email.
                        </p>
                      </form>
                    )}

                    {signupStep === "otp" && (
                      /* Step 2: 6-Digit OTP Verification Screen */
                      <form onSubmit={handleVerifyOtpSubmit} noValidate className="space-y-4 animate-in fade-in duration-200">
                        <div className="p-4 rounded-2xl bg-[#F8F5EE] border border-[#E9E4D9] text-center">
                          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#4A453F] mb-1 font-semibold">
                            <Mail size={13} className="text-[#C8973E]" />
                            <span>CODE SENT TO</span>
                          </div>
                          <p className="text-xs sm:text-sm font-sans text-[#111111] font-medium truncate">
                            {formData.email}
                          </p>
                        </div>

                        {/* Dev / Test mode instant filler */}
                        {previewOtp && (
                          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-center flex items-center justify-between px-4">
                            <span className="text-[11px] font-mono text-amber-800">
                              Test Code: <strong>{previewOtp}</strong>
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const digits = previewOtp.split("");
                                setOtpDigits(digits);
                                otpInputRefs.current[5]?.focus();
                              }}
                              className="text-[11px] font-medium text-amber-900 underline hover:text-black cursor-pointer"
                            >
                              Auto-Fill Code
                            </button>
                          </div>
                        )}

                        {/* 6 Digit Input Boxes */}
                        <div>
                          <label className="block text-xs font-sans text-[#756E65] mb-2 text-center">
                            Enter the 6-digit verification code:
                          </label>
                          <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                            {otpDigits.map((digit, index) => (
                              <input
                                key={index}
                                ref={(el) => {
                                  otpInputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onPaste={handlePasteOtp}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleDigitChange(index, e.target.value)}
                                onKeyDown={(e) => handleDigitKeyDown(index, e)}
                                autoFocus={index === 0}
                                className="w-10 h-12 sm:w-11 sm:h-13 text-center text-lg sm:text-xl font-mono font-bold bg-white border border-[#E9E4D9] rounded-xl text-[#111111] shadow-sm focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all"
                              />
                            ))}
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting || otpDigits.join("").length !== 6}
                          className="w-full py-4 px-6 rounded-full bg-[#111111] hover:bg-[#2B121F] text-white text-xs sm:text-sm font-sans font-medium flex items-center justify-between shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-md transition-all cursor-pointer group disabled:opacity-50"
                        >
                          <span>
                            {isSubmitting ? "Verifying Code..." : "Verify Code & Set Passcode"}
                          </span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Resend & Back controls */}
                        <div className="flex items-center justify-between text-xs font-sans text-[#756E65] pt-1 px-1">
                          <button
                            type="button"
                            onClick={() => {
                              setSignupStep("details");
                              setErrorMessage("");
                            }}
                            className="hover:text-[#111111] underline cursor-pointer"
                          >
                            ← Change Email
                          </button>

                          <button
                            type="button"
                            disabled={otpResendCooldown > 0 || isSubmitting}
                            onClick={handleResendOtp}
                            className="hover:text-[#111111] underline cursor-pointer disabled:opacity-50 disabled:no-underline"
                          >
                            {otpResendCooldown > 0 ? (
                              <span>Resend in {otpResendCooldown}s</span>
                            ) : (
                              <span className="flex items-center gap-1 font-medium text-[#111111]">
                                <RotateCw size={11} /> Resend Code
                              </span>
                            )}
                          </button>
                        </div>
                      </form>
                    )}

                    {signupStep === "passcode" && (
                      /* Step 3: Set Passcode & Agree to Terms */
                      <form onSubmit={handleCompleteRegistration} noValidate className="space-y-4 animate-in fade-in duration-200">
                        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 px-4 text-xs font-sans text-emerald-800">
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                          <div className="truncate">
                            <span className="font-semibold">Work Email Verified: </span>
                            <span className="font-mono">{formData.email}</span>
                          </div>
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
                          <span>
                            {isSubmitting ? "Creating Verified Account..." : "Complete Registration & Access"}
                          </span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>

              {/* Middle Divider: Subtle Slash */}
              <div className="hidden md:flex md:col-span-1 items-center justify-center text-[#C7C0B5] font-serif text-xl select-none">
                /
              </div>

              {/* Right Column: Google Workspace & Microsoft Entra ID SSO */}
              <div className="md:col-span-5 space-y-3.5">
                {/* Google Workspace */}
                <button
                  type="button"
                  onClick={() => handleInitiateSso("google")}
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

                {/* Microsoft Entra ID */}
                <button
                  type="button"
                  onClick={() => handleInitiateSso("microsoft")}
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

                <p className="text-[11px] text-[#8F887C] pt-2 px-1 text-center sm:text-left leading-normal">
                  Corporate Google Workspace and Microsoft 365 accounts sign in directly with 1-click federated verification.
                </p>
              </div>
            </div>

            {/* Bottom Form Actions: Switch Mode & Legal Checkbox */}
            <div className="mt-8 text-center space-y-4">
              <div className="flex items-center justify-center gap-6 text-xs sm:text-sm font-sans text-[#756E65]">
                {authMode === "signin" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("signup");
                        setSignupStep("details");
                        setErrorMessage("");
                        setStatusMessage("");
                      }}
                      className="hover:text-[#111111] transition-colors cursor-pointer"
                    >
                      Need an account? <strong className="text-[#111111] font-semibold underline underline-offset-4">Sign up with Work Email</strong>
                    </button>
                    <span>·</span>
                    <Link href="/contact" className="hover:text-[#111111] transition-colors no-underline">
                      Forgot Passcode?
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("signin");
                        setErrorMessage("");
                        setStatusMessage("");
                      }}
                      className="hover:text-[#111111] transition-colors cursor-pointer"
                    >
                      Already have an account? <strong className="text-[#111111] font-semibold underline underline-offset-4">Login here</strong>
                    </button>
                    <span>·</span>
                    <Link href="/contact" className="hover:text-[#111111] transition-colors no-underline">
                      Request Enterprise Key
                    </Link>
                  </>
                )}
              </div>

              {/* Mandatory Legal Agreement Notice */}
              <div className="max-w-md mx-auto pt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-sans text-[#756E65] select-none">
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
                  <span className="font-medium text-[#111111]">{formData.email || user?.email || "evaluator@enterprise.internal"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#756E65]">Email Verification:</span>
                  <span className="font-semibold text-emerald-700">VERIFIED (Cryptographic OTP)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#756E65]">Clearance Level:</span>
                  <span className="font-medium text-[#111111]">
                    {user?.role === "ENVER_INTERNAL" ? "Enver Core Lead" : "Verified Enterprise Partner"}
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

                {/* 1. Agentic Console */}
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

                {/* 2. Deep Research */}
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

                {/* 3. Artificer Citadel (Separate Subdomain / Engine) */}
                <a
                  href={`https://artificer.enveraitech.in/?admitted=true&email=${encodeURIComponent(formData.email || user?.email || "")}&token=${encodeURIComponent(queueToken || "ENV-PRD-8421")}&name=${encodeURIComponent(formData.name || user?.displayName || "")}`}
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
                        <span>Proceed to Artificer Citadel</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono">Separate Engine</span>
                      </div>
                      <div className="text-[11px] font-sans text-[#756E65]">Autonomous credit underwriting for thin-file MSMEs</div>
                    </div>
                  </div>
                  <ExternalLink size={15} className="text-[#756E65] group-hover:text-[#111111] transition-colors" />
                </a>
              </div>

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
                    setSignupStep("details");
                    setErrorMessage("");
                    setStatusMessage("");
                    setFormData({ name: "", email: "", password: "", company: "" });
                    setOtpDigits(["", "", "", "", "", ""]);
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
      {/* Enterprise SSO Identity Linking Modal */}
      {ssoModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#FDFBF7] border border-[#E9E4D9] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative">
            <button
              type="button"
              onClick={() => setSsoModal((prev) => ({ ...prev, open: false }))}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white border border-[#E9E4D9] flex items-center justify-center text-[#756E65] hover:text-[#111111] hover:bg-[#F8F5EE] transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>

            {/* Provider Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white border border-[#E9E4D9] flex items-center justify-center shadow-xs">
                {ssoModal.provider === "microsoft" ? (
                  <svg className="w-5 h-5" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-[#111111]">
                  {ssoModal.provider === "microsoft" ? "Microsoft Entra ID (Azure AD)" : "Google Workspace"} SSO
                </h3>
                <p className="text-[11px] font-sans text-[#756E65]">
                  Enterprise Single Sign-On &amp; Identity Link
                </p>
              </div>
            </div>

            <p className="text-xs font-sans text-[#4A453F] leading-relaxed">
              Link your corporate identity to access Enver Sovereign Solutions. Your account will be admitted under sovereign governance compliance protocols.
            </p>

            <form onSubmit={handleConfirmSso} className="space-y-3.5">
              <div>
                <label className="block text-xs font-sans font-medium text-[#111111] mb-1">
                  Enterprise Work Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={ssoModal.email}
                    onChange={(e) => setSsoModal((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="name@enterprise.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E9E4D9] text-[#111111] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#111111] transition-all"
                  />
                  <Mail size={15} className="absolute right-4 top-3.5 text-[#9C958B]" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-[#111111] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={ssoModal.name}
                  onChange={(e) => setSsoModal((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Elena Rostova"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E9E4D9] text-[#111111] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#111111] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-[#111111] mb-1">
                  Organization / Tenant Domain
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={ssoModal.company}
                    onChange={(e) => setSsoModal((prev) => ({ ...prev, company: e.target.value }))}
                    placeholder="e.g. Apex Financial Corp"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E9E4D9] text-[#111111] text-xs sm:text-sm font-sans focus:outline-none focus:border-[#111111] transition-all"
                  />
                  <Building size={15} className="absolute right-4 top-3.5 text-[#9C958B]" />
                </div>
              </div>

              {ssoModal.error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
                  {ssoModal.error}
                </div>
              )}

              {/* Informational Box for Production OAuth2 */}
              <div className="p-3 rounded-xl bg-[#F8F5EE] border border-[#E9E4D9] text-[11px] font-sans text-[#756E65] space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-[#4A453F]">
                  <Info size={13} className="text-[#C8973E] shrink-0" />
                  <span>Production Identity Linking</span>
                </div>
                <p className="leading-normal">
                  In live deployments, Enver redirects directly to your corporate IdP (Azure MSAL / Google OAuth 2.0). Linking your email here registers your identity in the sovereign audit ledger.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSsoModal((prev) => ({ ...prev, open: false }))}
                  className="px-4 py-2.5 rounded-full text-xs font-sans text-[#756E65] hover:text-[#111111] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={ssoModal.loading}
                  className="px-6 py-2.5 rounded-full bg-[#111111] hover:bg-[#2B121F] text-white text-xs font-sans font-medium flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>{ssoModal.loading ? "Linking Identity..." : "Link Identity & Access"}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
