"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ModelSlide {
  id: number;
  pillLabel: string;
  title: string;
  description: string;
  books: string[];
  graphicType: "workspace" | "agents" | "telemetry" | "feedback";
}

const SLIDES: ModelSlide[] = [
  {
    id: 1,
    pillLabel: "Leverage AI-native builders",
    title: "Leverage AI-native builders",
    description: "We are the first generation of AI/ML engineers in India. We don't rely on generic boilerplate — our engineers are experts at leveraging AI in their respective domains, coming together under Enver to build clinical, high-performance assets.",
    books: ["AI/ML Foundations", "Code footprint V1", "Neural Sourcing"],
    graphicType: "workspace"
  },
  {
    id: 2,
    pillLabel: "Bypass rigid ATS recruiting filters",
    title: "Bypass rigid ATS recruiting filters via Atrea",
    description: "We translate applicant codebases directly into queryable portfolios. Our Atrea matching agent evaluates repository structure, commit depth, design patterns, and test coverages to match engineers based on skill, not resume keywords.",
    books: ["GitHub footprint", "System Design Match", "Atrea Sourcing"],
    graphicType: "agents"
  },
  {
    id: 3,
    pillLabel: "Deploy spatial dispatch pipelines via Kariman",
    title: "Deploy spatial dispatch pipelines via Kariman",
    description: "Our Kariman logistics engine coordinates medical response units. By utilizing PostGIS spatial coordinates inside PostgreSQL, it maps nearest available professionals to crisis zones with built-in credential and ETA verification.",
    books: ["PostGIS Spatial", "RLS Database", "Kariman Routing"],
    graphicType: "telemetry"
  },
  {
    id: 4,
    pillLabel: "Credit-based dynamic project scaling",
    title: "Credit-based dynamic scaling over rigid 9-5 rules",
    description: "We operate based on credits and overage time rather than rigid 9-5 templates. Our squads scale up dynamically to deliver software products exactly when needed, optimizing compute budgets and engineering loops.",
    books: ["Overage Scaling", "Credit Mechanics", "Stealth Pipeline"],
    graphicType: "feedback"
  }
];

export function OperatingModel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const selectSlide = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = SLIDES[activeIndex];

  return (
    <section id="operating-model" className="bg-white py-24 border-b border-[#121212] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Title and Pill selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-4 select-none">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#121212] tracking-tight leading-tight">
              Operating <br /> model
            </h2>
          </div>
          
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-script text-[#E8660A] text-2xl font-semibold rotate-[-6deg] inline-block mr-2 select-none">
                Explore our model:
              </span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {SLIDES.map((slide, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => selectSlide(idx)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#121212] text-xs font-bold transition-all hover:scale-[1.02] ${
                      isSelected 
                        ? "bg-[#EEDDFF] text-[#121212] shadow-sm" 
                        : "bg-white text-[#4a4a4a]"
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-[#121212] flex items-center justify-center shrink-0">
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#121212]" />}
                    </span>
                    {slide.pillLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content details and graphic layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-5 flex flex-col justify-center min-h-[300px]">
            <div className="text-sm font-mono font-bold text-[#E8660A]/85 mb-4 tracking-wider select-none">
              0{currentSlide.id} / 0{SLIDES.length}
            </div>
            
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#121212] tracking-tight leading-snug mb-4">
              {currentSlide.title}
            </h3>
            
            <p className="text-base font-medium text-[#4a4a4a] leading-relaxed mb-8">
              {currentSlide.description}
            </p>

            {/* Slider arrows */}
            <div className="flex gap-3 mt-auto">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-[#121212] flex items-center justify-center bg-white hover:bg-neutral-50 transition-colors hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-[#121212]" strokeWidth={2.5} />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-[#121212] flex items-center justify-center bg-white hover:bg-neutral-50 transition-colors hover:scale-105 active:scale-95"
              >
                <ArrowRight className="w-4 h-4 text-[#121212]" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Right Workstation SVG Graphic */}
          <div className="lg:col-span-7 bg-[#FAF6EF]/60 border border-[#121212] rounded-[32px] p-8 md:p-12 relative overflow-hidden flex items-center justify-center min-h-[380px]">
            {/* Soft decorative shadow inside */}
            <div className="absolute inset-4 border border-[#121212]/5 pointer-events-none rounded-[24px]" />
            
            {/* Active Graphic mapping */}
            {currentSlide.graphicType === "workspace" && (
              <svg className="w-full max-w-[460px] h-auto text-[#121212]" viewBox="0 0 400 240" fill="none">
                {/* Desk screen outline */}
                <rect x="120" y="30" width="220" height="130" rx="10" stroke="#121212" strokeWidth="1.5" fill="white" />
                <rect x="130" y="40" width="200" height="90" rx="4" stroke="#121212" strokeWidth="1" fill="#FAF6EF" />
                {/* Bar chart inside screen */}
                <path d="M140 110 L140 115 M160 90 L160 115 M180 80 L180 115 M200 100 L200 115 M220 70 L220 115 M240 55 L240 115 M260 95 L260 115" stroke="#121212" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M135 118 L320 118" stroke="#121212" strokeWidth="1" />
                {/* Secondary smaller monitor */}
                <rect x="40" y="60" width="70" height="100" rx="6" stroke="#121212" strokeWidth="1.5" fill="white" />
                <line x1="40" y1="80" x2="110" y2="80" stroke="#121212" strokeWidth="1" />
                <rect x="48" y="90" width="54" height="60" rx="3" stroke="#121212" strokeWidth="1" fill="#CBEFFF" />
                {/* Workstation Keyboard */}
                <polygon points="150,180 310,180 290,200 130,200" stroke="#121212" strokeWidth="1.5" fill="white" />
                <line x1="160" y1="190" x2="280" y2="190" stroke="#121212" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Books stack on desk */}
                <g transform="translate(40, 180)">
                  <rect x="10" y="0" width="60" height="12" rx="2" stroke="#121212" strokeWidth="1.2" fill="#EEDDFF" />
                  <text x="40" y="9" textAnchor="middle" className="font-sans text-[6px] font-bold fill-[#121212]">{currentSlide.books[0]}</text>
                  <rect x="5" y="12" width="70" height="12" rx="2" stroke="#121212" strokeWidth="1.2" fill="#CBEFFF" />
                  <text x="40" y="21" textAnchor="middle" className="font-sans text-[6px] font-bold fill-[#121212]">{currentSlide.books[1]}</text>
                  <rect x="0" y="24" width="80" height="14" rx="2" stroke="#121212" strokeWidth="1.2" fill="white" />
                  <text x="40" y="33" textAnchor="middle" className="font-sans text-[6px] font-bold fill-[#121212]">{currentSlide.books[2]}</text>
                </g>
              </svg>
            )}

            {currentSlide.graphicType === "agents" && (
              <svg className="w-full max-w-[460px] h-auto text-[#121212]" viewBox="0 0 400 240" fill="none">
                {/* Central agent node */}
                <circle cx="200" cy="120" r="28" stroke="#121212" strokeWidth="1.5" fill="#EEDDFF" />
                <text x="200" y="125" textAnchor="middle" className="font-mono text-xs font-bold fill-[#121212]">AGENT</text>
                
                {/* Branching nodes */}
                <circle cx="100" cy="60" r="18" stroke="#121212" strokeWidth="1.5" fill="white" />
                <text x="100" y="64" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">INPUT</text>
                <circle cx="300" cy="60" r="18" stroke="#121212" strokeWidth="1.5" fill="white" />
                <text x="300" y="64" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">PARSE</text>
                <circle cx="100" cy="180" r="18" stroke="#121212" strokeWidth="1.5" fill="white" />
                <text x="100" y="184" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">VEC DB</text>
                <circle cx="300" cy="180" r="18" stroke="#121212" strokeWidth="1.5" fill="#CBEFFF" />
                <text x="300" y="184" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">ROUTE</text>
                
                {/* Connector lines */}
                <line x1="118" y1="72" x2="182" y2="108" stroke="#121212" strokeWidth="1.5" />
                <line x1="282" y1="72" x2="218" y2="108" stroke="#121212" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="118" y1="168" x2="182" y2="132" stroke="#121212" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="282" y1="168" x2="218" y2="132" stroke="#121212" strokeWidth="1.5" />
                
                {/* Floating hand-drawn doodle sparkles */}
                <path d="M220 40 L222 45 L227 47 L222 49 L220 54 L218 49 L213 47 L218 45 Z" fill="white" stroke="#121212" strokeWidth="1" />
                <path d="M150 190 L151 193 L154 194 L151 195 L150 198 L149 195 L146 194 L149 193 Z" fill="white" stroke="#121212" strokeWidth="1" />
              </svg>
            )}

            {currentSlide.graphicType === "telemetry" && (
              <svg className="w-full max-w-[460px] h-auto text-[#121212]" viewBox="0 0 400 240" fill="none">
                {/* Terminal audit box */}
                <rect x="50" y="30" width="300" height="170" rx="16" stroke="#121212" strokeWidth="1.5" fill="#121212" />
                <div className="absolute inset-0 p-8 pt-12 text-left font-mono text-[10px] text-green-400 leading-relaxed overflow-hidden pointer-events-none select-none">
                  {/* Fake log outputs */}
                  <div className="text-white/40">$ enver-deploy --verify</div>
                  <div className="text-emerald-400">✓ RLS checks: OK · doctor_pool</div>
                  <div className="text-emerald-400">✓ Security sessions: Encrypted HTTPOnly</div>
                  <div className="text-emerald-400">✓ Rate Limiter sliding-window: passed</div>
                  <div className="text-[#CBEFFF]">✓ Coordinates matched inside PostGIS index</div>
                  <div className="text-[#EEDDFF]">✓ Candidate footprints parsed into vector embeddings</div>
                  <div className="text-white/20">──────────────────────────────────────</div>
                  <div className="text-white font-bold">STATUS: AUTHORIZED IN 3ms</div>
                </div>
                {/* Terminal window buttons */}
                <circle cx="70" cy="45" r="4" fill="#FF5F57" />
                <circle cx="82" cy="45" r="4" fill="#FFBD2E" />
                <circle cx="94" cy="45" r="4" fill="#28C840" />
              </svg>
            )}

            {currentSlide.graphicType === "feedback" && (
              <svg className="w-full max-w-[460px] h-auto text-[#121212]" viewBox="0 0 400 240" fill="none">
                {/* Circular feedback loop flow */}
                <path d="M120 70 A 90 90 0 1 1 280 70" stroke="#121212" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
                {/* Arrowhead */}
                <path d="M276 65 L283 75 L288 62 Z" fill="#121212" stroke="#121212" />
                
                {/* Feedback stars widget */}
                <rect x="100" y="90" width="200" height="60" rx="14" stroke="#121212" strokeWidth="1.5" fill="white" />
                <text x="200" y="112" textAnchor="middle" className="font-sans text-[11px] font-bold fill-[#121212] uppercase tracking-widest">telemetry score</text>
                
                {/* Five star vectors */}
                <g transform="translate(130, 122)">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <path key={i} d="M6 0 L8 4 L12 5 L9 8 L10 12 L6 10 L2 12 L3 8 L0 5 L4 4 Z" fill="#E8660A" stroke="#121212" strokeWidth="1" transform={`translate(${i * 28}, 0)`} />
                  ))}
                </g>
                
                {/* Live indicators */}
                <g transform="translate(50, 40)" className="animate-[float_5s_ease-in-out_infinite]">
                  <rect x="0" y="0" width="80" height="25" rx="6" fill="#CBEFFF" stroke="#121212" strokeWidth="1" />
                  <text x="40" y="16" textAnchor="middle" className="font-mono text-[9px] font-bold fill-[#121212]">99.8% Match</text>
                </g>
                
                <g transform="translate(270, 160)" className="animate-[float_6s_ease-in-out_infinite_0.5s]">
                  <rect x="0" y="0" width="80" height="25" rx="6" fill="#EEDDFF" stroke="#121212" strokeWidth="1" />
                  <text x="40" y="16" textAnchor="middle" className="font-mono text-[9px] font-bold fill-[#121212]">100% Secure</text>
                </g>
              </svg>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
