import React from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Compass, Sparkles, Terminal, FileCode, Mail } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function NotFound() {
  const [location] = useLocation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  usePageMeta({
    title: "404 — Resource Not Found",
    description: "The requested operational resource or URL path does not exist within Enver AI Tech's intelligence registry.",
  });

  return (
    <div
      className={`min-h-[80vh] flex items-center justify-center py-16 px-4 transition-colors duration-300 ${
        isDark ? "bg-[#0E130E] text-[#EDE8DF]" : "bg-[#F7F3E9] text-[#2B121F]"
      }`}
    >
      <div className="max-w-2xl w-full mx-auto text-center">
        {/* Glowing Crest / Error Badge */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF6F1E]/30 to-[#C8973E]/20 blur-xl animate-pulse" />
          <div
            className={`relative w-20 h-20 rounded-2xl p-1 flex items-center justify-center border shadow-xl ${
              isDark
                ? "bg-[#182017] border-[#2C3B29]"
                : "bg-white border-[#E5DFD1]"
            }`}
          >
            <img
              src="/enver-crest-transparent.png"
              alt="Enver Crest"
              className="w-12 h-12 object-contain filter drop-shadow-md"
            />
          </div>
        </div>

        {/* Status Code & Pill */}
        <div className="flex justify-center mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border shadow-2xs ${
              isDark
                ? "bg-[#1C261B] text-[#FF924E] border-[#2E412A]"
                : "bg-white text-[#FF6F1E] border-[#E5DFD1]"
            }`}
          >
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
            Error 404 · Locus Missing
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`text-3xl sm:text-4xl font-heading font-extrabold tracking-tight mb-3 ${
            isDark ? "text-white" : "text-[#2B121F]"
          }`}
        >
          Resource Not Located
        </h1>

        <p
          className={`text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-6 ${
            isDark ? "text-[#A8B3A4]" : "text-[#6E645C]"
          }`}
        >
          The requested path{" "}
          <code
            className={`px-2 py-0.5 rounded text-xs font-mono ${
              isDark ? "bg-[#1B241A] text-[#E0C078]" : "bg-[#EDE7DA] text-[#A34B16]"
            }`}
          >
            {location || "current path"}
          </code>{" "}
          does not exist or has been sequestered by our zero-trust AST security sentinel.
        </p>

        {/* Interactive Fast Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-8 text-left">
          {/* Card 1: Playground */}
          <Link
            href="/playground"
            className={`p-3.5 rounded-2xl border transition-all duration-200 no-underline group flex items-start gap-3 ${
              isDark
                ? "bg-[#151D14] border-[#243321] hover:border-[#FF6F1E]/60 hover:bg-[#1A2519]"
                : "bg-white border-[#E5DFD1] hover:border-[#FF6F1E] hover:shadow-xs"
            }`}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[#FF6F1E]/15 text-[#FF6F1E]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-heading font-bold ${isDark ? "text-white" : "text-[#2B121F]"}`}>
                  Neuv Playground
                </span>
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#FF6F1E]/20 text-[#FF6F1E] font-semibold">
                  Live AI
                </span>
              </div>
              <p className={`text-[11.5px] leading-snug mt-0.5 line-clamp-1 ${isDark ? "text-[#9DAA98]" : "text-[#7A6F68]"}`}>
                Test our conversational agent &amp; ask questions.
              </p>
            </div>
          </Link>

          {/* Card 2: Research & Whitepapers */}
          <Link
            href="/research"
            className={`p-3.5 rounded-2xl border transition-all duration-200 no-underline group flex items-start gap-3 ${
              isDark
                ? "bg-[#151D14] border-[#243321] hover:border-[#C8973E]/60 hover:bg-[#1A2519]"
                : "bg-white border-[#E5DFD1] hover:border-[#C8973E] hover:shadow-xs"
            }`}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[#C8973E]/15 text-[#C8973E]">
              <FileCode className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className={`text-xs font-heading font-bold block ${isDark ? "text-white" : "text-[#2B121F]"}`}>
                Sovereign Research
              </span>
              <p className={`text-[11.5px] leading-snug mt-0.5 line-clamp-1 ${isDark ? "text-[#9DAA98]" : "text-[#7A6F68]"}`}>
                Read AST firewalls &amp; underwriting papers.
              </p>
            </div>
          </Link>

          {/* Card 3: Systems & Services */}
          <Link
            href="/services"
            className={`p-3.5 rounded-2xl border transition-all duration-200 no-underline group flex items-start gap-3 ${
              isDark
                ? "bg-[#151D14] border-[#243321] hover:border-emerald-500/60 hover:bg-[#1A2519]"
                : "bg-white border-[#E5DFD1] hover:border-emerald-600 hover:shadow-xs"
            }`}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-emerald-500/15 text-emerald-500">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className={`text-xs font-heading font-bold block ${isDark ? "text-white" : "text-[#2B121F]"}`}>
                Production Fleets
              </span>
              <p className={`text-[11.5px] leading-snug mt-0.5 line-clamp-1 ${isDark ? "text-[#9DAA98]" : "text-[#7A6F68]"}`}>
                Explore Artificer, Arbiter &amp; Cerberus.
              </p>
            </div>
          </Link>

          {/* Card 4: Contact Engineering */}
          <Link
            href="/contact"
            className={`p-3.5 rounded-2xl border transition-all duration-200 no-underline group flex items-start gap-3 ${
              isDark
                ? "bg-[#151D14] border-[#243321] hover:border-sky-500/60 hover:bg-[#1A2519]"
                : "bg-white border-[#E5DFD1] hover:border-sky-600 hover:shadow-xs"
            }`}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-sky-500/15 text-sky-500">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className={`text-xs font-heading font-bold block ${isDark ? "text-white" : "text-[#2B121F]"}`}>
                Contact Founders
              </span>
              <p className={`text-[11.5px] leading-snug mt-0.5 line-clamp-1 ${isDark ? "text-[#9DAA98]" : "text-[#7A6F68]"}`}>
                Book a confidential enterprise brief.
              </p>
            </div>
          </Link>
        </div>

        {/* Primary Return Button */}
        <div>
          <Link
            href="/"
            className="almetra-btn-primary !min-h-[46px] !px-7 text-xs font-mono no-underline inline-flex items-center gap-2 shadow-md hover:scale-102 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Overview
          </Link>
        </div>
      </div>
    </div>
  );
}
