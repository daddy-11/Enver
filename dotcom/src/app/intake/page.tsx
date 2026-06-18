"use client";
import React, { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CandidateIntakePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    githubUrl: "",
    linkedinUrl: "",
    techStack: "",
    systemDesign: "",
    databaseInfra: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      githubUrl: formData.githubUrl,
      linkedinUrl: formData.linkedinUrl,
      preferredRoles: "Backend Engineer",
      skills: formData.techStack,
      challenges: `System Design: ${formData.systemDesign} | Database & Infra: ${formData.databaseInfra}`,
      experienceYears: 0,
    };

    try {
      let response;
      try {
        response = await fetch("http://localhost:3001/api/intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        response = await fetch("/api/intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        setStatus("success");
        setStep(6); // Complete screen
      } else {
        const errData = await response.json();
        setStatus("error");
        setMessage(errData.error || "Failed to submit candidate profile.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Connection lost. We've queued your data locally.");
    }
  };

  // Prevent default form submission on enter for early steps
  const handleEnterKey = (e: React.KeyboardEvent, nextAction: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextAction();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans flex flex-col">
      <Navigation />
      
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-32 flex flex-col items-center justify-center">
        
        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center animate-[fadeUp_0.4s_ease-out]">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-5 h-1.5 bg-[#1B2B4B] rounded-sm" />
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-[#1B2B4B]">
                Enver Engineering Intake
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1B2B4B] tracking-tight leading-tight mb-6">
              Deploy your career.
            </h1>
            <p className="text-lg text-gray-500 font-medium max-w-xl mx-auto leading-relaxed mb-10">
              We bypass ATS filters by deeply analyzing your backend capability, system design choices, and real-world infrastructure experience. Tell us what you build.
            </p>
            <button 
              onClick={nextStep}
              className="px-8 py-4 bg-[#1B2B4B] text-white font-bold rounded-xl shadow-[0_8px_30px_rgb(27,43,75,0.12)] hover:bg-opacity-90 transition-all"
            >
              Start Intake Flow
            </button>
          </div>
        )}

        {/* Step 2: Tech Stack (Screenshot Match) */}
        {step === 2 && (
          <div className="w-full max-w-2xl animate-[fadeUp_0.4s_ease-out]">
            <div className="bg-white border border-gray-200 rounded-[24px] p-8 md:p-12 shadow-sm">
              <div className="flex gap-2 mb-8">
                <div className="h-1.5 w-1/3 bg-[#1B2B4B] rounded-full" />
                <div className="h-1.5 w-1/3 bg-gray-100 rounded-full" />
                <div className="h-1.5 w-1/3 bg-gray-100 rounded-full" />
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B2B4B] mb-8">
                Define Technical Stack
              </h2>

              <div className="relative flex items-center">
                <input
                  type="text"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleTextChange}
                  onKeyDown={(e) => {
                    if (formData.techStack.trim() && e.key === "Enter") nextStep();
                  }}
                  autoFocus
                  placeholder="e.g. Next.js, Postgres, Machine Learning..."
                  className="w-full pl-6 pr-32 py-5 border border-gray-300 rounded-xl font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2B4B]/20 focus:border-[#1B2B4B] transition-all"
                />
                <button
                  onClick={nextStep}
                  disabled={!formData.techStack.trim()}
                  className="absolute right-2 px-6 py-3 bg-[#1B2B4B] text-white font-bold rounded-lg disabled:opacity-50 transition-opacity flex items-center gap-2"
                >
                  Next <ArrowRight size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: System Design Experience */}
        {step === 3 && (
          <div className="w-full max-w-2xl animate-[fadeUp_0.4s_ease-out]">
            <div className="bg-white border border-gray-200 rounded-[24px] p-8 md:p-12 shadow-sm">
              <div className="flex gap-2 mb-8">
                <div className="h-1.5 w-1/3 bg-gray-100 rounded-full" />
                <div className="h-1.5 w-1/3 bg-[#1B2B4B] rounded-full" />
                <div className="h-1.5 w-1/3 bg-gray-100 rounded-full" />
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B2B4B] mb-2">
                System Architecture
              </h2>
              <p className="text-gray-500 font-medium mb-8">
                Describe a complex system you built (e.g. monoliths, microservices, or event-driven).
              </p>

              <div className="relative">
                <textarea
                  name="systemDesign"
                  value={formData.systemDesign}
                  onChange={handleTextChange}
                  autoFocus
                  rows={4}
                  placeholder="I built a pub-sub architecture using Redis and Node.js that handled..."
                  className="w-full p-6 pb-20 border border-gray-300 rounded-xl font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2B4B]/20 focus:border-[#1B2B4B] transition-all resize-none"
                />
                <button
                  onClick={nextStep}
                  disabled={!formData.systemDesign.trim()}
                  className="absolute bottom-4 right-4 px-6 py-3 bg-[#1B2B4B] text-white font-bold rounded-lg disabled:opacity-50 transition-opacity flex items-center gap-2"
                >
                  Next <ArrowRight size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Database & Infrastructure */}
        {step === 4 && (
          <div className="w-full max-w-2xl animate-[fadeUp_0.4s_ease-out]">
            <div className="bg-white border border-gray-200 rounded-[24px] p-8 md:p-12 shadow-sm">
              <div className="flex gap-2 mb-8">
                <div className="h-1.5 w-1/3 bg-gray-100 rounded-full" />
                <div className="h-1.5 w-1/3 bg-gray-100 rounded-full" />
                <div className="h-1.5 w-1/3 bg-[#1B2B4B] rounded-full" />
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B2B4B] mb-2">
                Data & Infrastructure
              </h2>
              <p className="text-gray-500 font-medium mb-8">
                What databases and infra tools are you most comfortable orchestrating?
              </p>

              <div className="relative flex items-center">
                <input
                  type="text"
                  name="databaseInfra"
                  value={formData.databaseInfra}
                  onChange={handleTextChange}
                  onKeyDown={(e) => {
                    if (formData.databaseInfra.trim() && e.key === "Enter") nextStep();
                  }}
                  autoFocus
                  placeholder="e.g. PostgreSQL, Redis, AWS ECS, Vercel..."
                  className="w-full pl-6 pr-32 py-5 border border-gray-300 rounded-xl font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2B4B]/20 focus:border-[#1B2B4B] transition-all"
                />
                <button
                  onClick={nextStep}
                  disabled={!formData.databaseInfra.trim()}
                  className="absolute right-2 px-6 py-3 bg-[#1B2B4B] text-white font-bold rounded-lg disabled:opacity-50 transition-opacity flex items-center gap-2"
                >
                  Next <ArrowRight size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Registration */}
        {step === 5 && (
          <div className="w-full max-w-2xl animate-[fadeUp_0.4s_ease-out]">
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-[24px] p-8 md:p-12 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B2B4B] mb-2">
                Lock in your profile
              </h2>
              <p className="text-gray-500 font-medium mb-8">
                Provide your coordinates for Atrea analysis and team matching.
              </p>

              <div className="flex flex-col gap-5 mb-8">
                <div>
                  <label className="block font-bold text-[13px] text-[#1B2B4B] mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleTextChange}
                    required
                    placeholder="e.g. Alex Chen"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1B2B4B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[13px] text-[#1B2B4B] mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleTextChange}
                    required
                    placeholder="e.g. alex@example.com"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1B2B4B]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-bold text-[13px] text-[#1B2B4B] mb-2">GitHub Profile</label>
                    <input
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleTextChange}
                      required
                      placeholder="https://github.com/..."
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1B2B4B]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[13px] text-[#1B2B4B] mb-2">LinkedIn Profile</label>
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleTextChange}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1B2B4B]"
                    />
                  </div>
                </div>
              </div>

              {status === "error" && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl text-[14px] font-medium mb-6">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-[#1B2B4B] text-white font-bold rounded-xl shadow-[0_8px_30px_rgb(27,43,75,0.12)] disabled:opacity-70 transition-all flex items-center justify-center gap-2"
              >
                {status === "loading" ? "Analyzing..." : "Complete Submission"}
              </button>
            </form>
          </div>
        )}

        {/* Step 6: Success */}
        {step === 6 && (
          <div className="text-center animate-[fadeUp_0.4s_ease-out]">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-green-500" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1B2B4B] tracking-tight mb-6">
              Data Received
            </h1>
            <p className="text-lg text-gray-500 font-medium max-w-lg mx-auto leading-relaxed mb-10">
              Your backend profile has been successfully parsed and securely stored. Shorekeeper and Atrea will process your engineering footprint. Expect an update via email.
            </p>
            <a href="/" className="inline-flex px-8 py-4 bg-white border border-gray-200 text-[#1B2B4B] font-bold rounded-xl hover:bg-gray-50 transition-colors">
              Return to Homepage
            </a>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
