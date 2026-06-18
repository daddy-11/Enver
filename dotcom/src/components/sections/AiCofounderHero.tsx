"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Search, ArrowUp, List, Edit3 } from "lucide-react";

export function AiCofounderHero() {
  return (
    <section className="relative bg-[#FAF6EF] min-h-[95vh] flex flex-col justify-center overflow-hidden pt-12 pb-24 border-b border-[#121212]">
      {/* Top Right Light-Blue Organic Wavy Shape */}
      <div className="absolute top-0 right-0 w-[45%] h-[280px] md:h-[350px] bg-[#CBEFFF] border-l border-b border-[#121212] rounded-bl-[120px] pointer-events-none z-0" style={{ clipPath: "ellipse(100% 80% at 90% 10%)" }}>
        {/* Additional organic accent outline inside the shape */}
        <div className="absolute inset-4 border-l border-b border-[#121212]/15 rounded-bl-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 grid grid-cols-1 gap-12 pt-16">
        
        {/* Header copy */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-[84px] font-extrabold text-[#121212] tracking-tight leading-[0.95] mb-8 select-none">
            Employment perspective <br className="hidden md:inline" /> is hard to win
          </h1>
          
          <p className="text-lg md:text-xl font-medium text-[#4a4a4a] max-w-2xl mx-auto leading-relaxed mb-10">
            We are the first generation of AI/ML engineers in India. enver delivers an unfair advantage in technical recruitment and operational emergency dispatch by combining candidate codebase capability with rapid, agentic execution.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#operating-model"
              className="bg-[#121212] text-white px-8 py-3.5 rounded-full font-bold text-sm border border-[#121212] hover:bg-[#232323] transition-colors shadow-sm inline-flex items-center gap-2"
            >
              Explore Our Projects ↓
            </a>
            <Link 
              href="/intake"
              className="bg-[#CBEFFF] text-[#121212] px-8 py-3.5 rounded-full font-bold text-sm border border-[#121212] hover:bg-[#b2e5ff] transition-all shadow-sm hover:scale-[1.02] inline-flex items-center gap-2"
            >
              Get Placement Access <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </Link>
          </div>
        </div>

        {/* Doodle Line-Art Illustration Container */}
        <div className="w-full max-w-5xl mx-auto mt-8 relative select-none">
          {/* Main SVG sketch */}
          <div className="bg-transparent border-t border-dashed border-[#121212]/30 pt-10">
            <svg 
              className="w-full h-auto max-h-[380px] text-[#121212]" 
              viewBox="0 0 1000 320" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left browser sketch */}
              <g className="animate-[float_6s_ease-in-out_infinite]">
                <rect x="50" y="40" width="220" height="150" rx="16" stroke="#121212" strokeWidth="1.5" fill="white" />
                <line x1="50" y1="75" x2="270" y2="75" stroke="#121212" strokeWidth="1.5" />
                {/* Dots in browser bar */}
                <circle cx="70" cy="58" r="4" fill="#E8660A" />
                <circle cx="85" cy="58" r="4" fill="#3A9A3C" />
                <circle cx="100" cy="58" r="4" fill="#121212" stroke="#121212" strokeWidth="0.5" />
                {/* Browser content */}
                <rect x="70" y="90" width="80" height="60" rx="8" stroke="#121212" strokeWidth="1.2" fill="#CBEFFF" />
                {/* Spark / Star outline */}
                <path d="M110 100 L113 110 L123 113 L113 116 L110 126 L107 116 L97 113 L107 110 Z" fill="white" stroke="#121212" strokeWidth="1" />
                {/* Horizontal line sketches */}
                <line x1="165" y1="95" x2="240" y2="95" stroke="#121212" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="165" y1="110" x2="220" y2="110" stroke="#121212" strokeWidth="1.5" />
                <line x1="165" y1="125" x2="250" y2="125" stroke="#121212" strokeWidth="1.5" />
                {/* Tiny checklist sketch */}
                <rect x="75" y="162" width="6" height="6" stroke="#121212" strokeWidth="1.2" />
                <line x1="90" y1="165" x2="140" y2="165" stroke="#121212" strokeWidth="1.5" />
                <rect x="160" y="162" width="6" height="6" stroke="#121212" strokeWidth="1.2" />
                <line x1="175" y1="165" x2="220" y2="165" stroke="#121212" strokeWidth="1.5" />
              </g>

              {/* Connecting Hand-Drawn Wavy Line */}
              <path 
                d="M275 120 Q350 160, 420 140 T560 160" 
                stroke="#121212" 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
                fill="none" 
              />

              {/* Central Logo Box */}
              <g className="animate-[float_7s_ease-in-out_infinite_1s]">
                <rect x="440" y="110" width="80" height="80" rx="20" stroke="#121212" strokeWidth="1.5" fill="white" />
                <rect x="445" y="115" width="70" height="70" rx="16" fill="#FAF6EF" stroke="#121212" strokeWidth="1" />
                {/* Cursive Logo Letter 'e' */}
                <text x="480" y="160" textAnchor="middle" className="font-script text-4xl font-bold fill-[#121212]">e</text>
              </g>

              {/* Connecting Line to Right Box */}
              <path 
                d="M525 150 Q600 130, 680 160" 
                stroke="#121212" 
                strokeWidth="1.5" 
                fill="none" 
              />

              {/* Right Profile / Workstation card */}
              <g className="animate-[float_5s_ease-in-out_infinite_0.5s]">
                <rect x="700" y="30" width="220" height="170" rx="24" stroke="#121212" strokeWidth="1.5" fill="white" />
                <circle cx="735" cy="65" r="15" fill="#EEDDFF" stroke="#121212" strokeWidth="1.5" />
                {/* Little user head sketch */}
                <circle cx="735" cy="62" r="5" fill="#121212" />
                <path d="M725 74 Q735 68 745 74" stroke="#121212" strokeWidth="1.5" fill="none" />
                
                {/* Form fields */}
                <line x1="765" y1="58" x2="880" y2="58" stroke="#121212" strokeWidth="2.5" />
                <line x1="765" y1="70" x2="840" y2="70" stroke="#121212" strokeWidth="1.5" strokeDasharray="3 3" />
                
                {/* Stats lines inside right card */}
                <rect x="720" y="100" width="180" height="40" rx="10" stroke="#121212" strokeWidth="1" fill="#FAF6EF" />
                <circle cx="740" cy="120" r="6" fill="#3A9A3C" />
                <line x1="758" y1="120" x2="880" y2="120" stroke="#121212" strokeWidth="1.5" />
                
                <rect x="720" y="150" width="120" height="30" rx="8" stroke="#121212" strokeWidth="1" fill="#CBEFFF" />
                <text x="780" y="169" textAnchor="middle" className="font-sans text-[10px] font-bold fill-[#121212]">verified expert</text>
              </g>

              {/* Background abstract layout element */}
              <path d="M10 220 C200 280, 500 240, 990 280" stroke="#121212" strokeWidth="1" opacity="0.3" />
            </svg>

            {/* Bottom floating button indicator bar */}
            <div className="flex justify-center gap-4 mt-6">
              {[
                { icon: <Search className="w-4 h-4" />, bg: "bg-[#EEDDFF]" },
                { icon: <ArrowUp className="w-4 h-4" />, bg: "bg-white" },
                { icon: <List className="w-4 h-4" />, bg: "bg-white" },
                { icon: <Edit3 className="w-4 h-4" />, bg: "bg-white" }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`w-12 h-12 rounded-2xl border border-[#121212] flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-all ${item.bg}`}
                >
                  {item.icon}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
