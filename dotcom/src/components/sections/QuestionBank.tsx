"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

interface QuestionItem {
  id: number;
  questionText: string;
  badge: string;
  heading: string;
  stepCount: string;
  stepDescription: string;
  flowType: "dispatch" | "sysdesign" | "github" | "vectors" | "geo";
}

const QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    questionText: "How does Atrea help candidates bypass automated resume filters?",
    badge: "Candidate Matching",
    heading: "How does Atrea help candidates bypass automated resume filters?",
    stepCount: "1/3",
    stepDescription: "Atrea scans public codebases, PRs, and repositories to construct placecards, allowing candidates to stand out through actual code depth.",
    flowType: "github"
  },
  {
    id: 2,
    questionText: "How does Kariman route doctor dispatches in under 5 minutes?",
    badge: "Emergency Logistics",
    heading: "How does Kariman route doctor dispatches in under 5 minutes?",
    stepCount: "2/3",
    stepDescription: "Kariman queries active coordinates and spatial logs using PostGIS ST_DWithin filters to match doctors dynamically.",
    flowType: "dispatch"
  },
  {
    id: 3,
    questionText: "What is Enver's mission in the general-use AI movement?",
    badge: "AI Movement",
    heading: "What is Enver's mission in the general-use AI movement?",
    stepCount: "1/2",
    stepDescription: "We leverage AI dynamically to build practical projects, participate in hackathons, and challenge rigid recruitment schedules.",
    flowType: "sysdesign"
  },
  {
    id: 4,
    questionText: "Can we query applicant profiles using vector search?",
    badge: "Vector Search",
    heading: "Can we query applicant profiles using vector search?",
    stepCount: "3/3",
    stepDescription: "Yes. Profile text is translated into 1536-dimensional vectors, enabling recruitment queries using cosine similarity.",
    flowType: "vectors"
  },
  {
    id: 5,
    questionText: "How do we handle real-time geospatial coordinate mapping?",
    badge: "Spatial Analytics",
    heading: "How do we handle real-time geospatial coordinate mapping?",
    stepCount: "2/2",
    stepDescription: "We serve vector geometry tiles directly to the client browser to trace medical coverage boundaries dynamically.",
    flowType: "geo"
  }
];

export function QuestionBank() {
  const [selectedId, setSelectedId] = useState(1);

  const activeQuestion = QUESTIONS.find((q) => q.id === selectedId) || QUESTIONS[0];

  return (
    <section className="bg-[#CBEFFF]/40 py-24 border-b border-[#121212] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Title */}
        <div className="text-center mb-16 select-none">
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#121212] tracking-tight mb-4">
            See how we get it done for you
          </h2>
          <p className="text-lg md:text-xl font-medium text-[#4a4a4a]">
            Explore typical operational questions and how we resolve things
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Question Bank Sidebar */}
          <div className="lg:col-span-4 bg-[#121212] rounded-[32px] p-6 md:p-8 flex flex-col justify-between text-white shadow-xl min-h-[460px]">
            <div>
              <div className="mb-8 select-none">
                <span className="font-sans font-extrabold text-lg uppercase tracking-widest text-[#FAF6EF]">
                  The 
                </span>
                <span className="font-script text-[#CBEFFF] text-3xl font-semibold ml-2 inline-block rotate-[-3deg]">
                  question bank
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {QUESTIONS.map((q) => {
                  const isSelected = q.id === selectedId;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setSelectedId(q.id)}
                      className={`w-full text-left flex items-start gap-3 p-4 rounded-2xl transition-all border ${
                        isSelected 
                          ? "bg-white/10 border-white text-white font-semibold" 
                          : "border-transparent text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? "border-[#CBEFFF]" : "border-white/30"
                      }`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-[#CBEFFF]" />}
                      </span>
                      <span className="text-xs md:text-sm tracking-tight leading-snug">{q.questionText}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Question Detail & Diagram */}
          <div className="lg:col-span-8 bg-white border border-[#121212] rounded-[32px] p-8 md:p-12 flex flex-col justify-between shadow-sm relative">
            
            {/* Header / Badge */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-xl md:text-2xl font-extrabold text-[#121212] tracking-tight max-w-lg">
                {activeQuestion.heading}
              </h3>
              <span className="bg-[#CBEFFF] border border-[#121212] text-xs font-bold px-3 py-1.5 rounded-full text-[#121212] shrink-0 self-start select-none">
                {activeQuestion.badge}
              </span>
            </div>

            {/* Diagram Panel */}
            <div className="flex-1 bg-[#FAF6EF] border border-[#121212] rounded-2xl p-6 md:p-8 flex items-center justify-center min-h-[260px] relative overflow-hidden mb-6">
              
              {/* SVG flowchart renderings based on flowType */}
              {activeQuestion.flowType === "dispatch" && (
                <svg className="w-full max-w-[480px] h-auto text-[#121212]" viewBox="0 0 420 180" fill="none">
                  <rect x="10" y="70" width="70" height="40" rx="8" stroke="#121212" strokeWidth="1.5" fill="white" />
                  <text x="45" y="94" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">TRIGGER</text>
                  
                  <rect x="110" y="70" width="70" height="40" rx="8" stroke="#121212" strokeWidth="1.5" fill="white" />
                  <text x="145" y="94" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">POSTGIS</text>
                  
                  <rect x="210" y="70" width="70" height="40" rx="8" stroke="#121212" strokeWidth="1.5" fill="#CBEFFF" />
                  <text x="245" y="94" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">VERIFY</text>
                  
                  <rect x="310" y="70" width="70" height="40" rx="8" stroke="#121212" strokeWidth="1.5" fill="white" />
                  <text x="345" y="94" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">DISPATCH</text>
                  
                  <line x1="80" y1="90" x2="102" y2="90" stroke="#121212" strokeWidth="1.5" />
                  <path d="M102 90 L97 86 L97 94 Z" fill="#121212" />
                  
                  <line x1="180" y1="90" x2="202" y2="90" stroke="#121212" strokeWidth="1.5" />
                  <path d="M202 90 L197 86 L197 94 Z" fill="#121212" />
                  
                  <line x1="280" y1="90" x2="302" y2="90" stroke="#121212" strokeWidth="1.5" />
                  <path d="M302 90 L297 86 L297 94 Z" fill="#121212" />
                </svg>
              )}

              {activeQuestion.flowType === "sysdesign" && (
                <svg className="w-full max-w-[480px] h-auto text-[#121212]" viewBox="0 0 420 180" fill="none">
                  <rect x="20" y="40" width="80" height="40" rx="8" stroke="#121212" strokeWidth="1.5" fill="white" />
                  <text x="60" y="64" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">Applicant Intake</text>
                  
                  <rect x="150" y="40" width="80" height="40" rx="8" stroke="#121212" strokeWidth="1.5" fill="white" />
                  <text x="190" y="64" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">Stack Analysis</text>
                  
                  <rect x="280" y="40" width="100" height="40" rx="8" stroke="#121212" strokeWidth="1.5" fill="#EEDDFF" />
                  <text x="330" y="64" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">Design Architecture</text>
                  
                  <g transform="translate(160, 110)">
                    <ellipse cx="30" cy="10" rx="20" ry="6" stroke="#121212" strokeWidth="1.5" fill="white" />
                    <path d="M10 10 L10 30 A 20 6 0 0 0 50 30 L50 10" stroke="#121212" strokeWidth="1.5" fill="white" />
                    <ellipse cx="30" cy="30" rx="20" ry="6" stroke="#121212" strokeWidth="1.5" fill="none" />
                    <text x="30" y="23" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">SQL</text>
                  </g>

                  <line x1="100" y1="60" x2="142" y2="60" stroke="#121212" strokeWidth="1.5" />
                  <line x1="230" y1="60" x2="272" y2="60" stroke="#121212" strokeWidth="1.5" />
                  <line x1="190" y1="80" x2="190" y2="104" stroke="#121212" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              )}

              {activeQuestion.flowType === "github" && (
                <svg className="w-full max-w-[480px] h-auto text-[#121212]" viewBox="0 0 420 180" fill="none">
                  <rect x="30" y="60" width="90" height="50" rx="10" stroke="#121212" strokeWidth="1.5" fill="white" />
                  <text x="75" y="85" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">GitHub OAuth</text>
                  <text x="75" y="97" textAnchor="middle" className="font-mono text-[7px] fill-[#4a4a4a]">Access Token</text>
                  
                  <rect x="160" y="60" width="100" height="50" rx="10" stroke="#121212" strokeWidth="1.5" fill="#CBEFFF" />
                  <text x="210" y="85" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">Footprint Engine</text>
                  <text x="210" y="97" textAnchor="middle" className="font-mono text-[7px] fill-[#4a4a4a]">Scan PRs & imports</text>
                  
                  <rect x="290" y="60" width="90" height="50" rx="10" stroke="#121212" strokeWidth="1.5" fill="white" />
                  <text x="335" y="85" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">Score & Match</text>
                  <text x="335" y="97" textAnchor="middle" className="font-mono text-[7px] fill-[#4a4a4a]">Atrea Placement</text>
                  
                  <line x1="120" y1="85" x2="152" y2="85" stroke="#121212" strokeWidth="1.5" />
                  <line x1="260" y1="85" x2="282" y2="85" stroke="#121212" strokeWidth="1.5" />
                </svg>
              )}

              {activeQuestion.flowType === "vectors" && (
                <svg className="w-full max-w-[480px] h-auto text-[#121212]" viewBox="0 0 420 180" fill="none">
                  <rect x="20" y="70" width="80" height="40" rx="6" stroke="#121212" strokeWidth="1.5" fill="white" />
                  <text x="60" y="94" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">Input String</text>
                  
                  <rect x="140" y="50" width="120" height="80" rx="12" stroke="#121212" strokeWidth="1.5" fill="#EEDDFF" />
                  <text x="200" y="72" textAnchor="middle" className="font-mono text-[9px] font-bold fill-[#121212]">1536d Vector</text>
                  <text x="200" y="94" textAnchor="middle" className="font-mono text-[8px] fill-[#121212]">[0.12, -0.42, ..., 0.89]</text>
                  <line x1="150" y1="108" x2="250" y2="108" stroke="#121212" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="200" y="120" textAnchor="middle" className="font-mono text-[7px] fill-[#4a4a4a]">OpenAI ada-002 model</text>
                  
                  <rect x="300" y="70" width="90" height="40" rx="6" stroke="#121212" strokeWidth="1.5" fill="white" />
                  <text x="345" y="94" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">Cosine Search</text>
                  
                  <line x1="100" y1="90" x2="132" y2="90" stroke="#121212" strokeWidth="1.5" />
                  <line x1="260" y1="90" x2="292" y2="90" stroke="#121212" strokeWidth="1.5" />
                </svg>
              )}

              {activeQuestion.flowType === "geo" && (
                <svg className="w-full max-w-[480px] h-auto text-[#121212]" viewBox="0 0 420 180" fill="none">
                  <circle cx="100" cy="90" r="40" stroke="#121212" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
                  <circle cx="100" cy="90" r="6" fill="#E8660A" stroke="#121212" strokeWidth="1.5" />
                  <text x="100" y="78" textAnchor="middle" className="font-mono text-[7px] font-bold fill-[#121212]">EMERGENCY</text>
                  
                  <g>
                    <circle cx="70" cy="70" r="5" fill="#3A9A3C" stroke="#121212" strokeWidth="1" />
                    <line x1="75" y1="72" x2="95" y2="88" stroke="#121212" strokeWidth="1" />
                    <text x="50" y="73" className="font-mono text-[6px] fill-[#4a4a4a]">Dr. Unit 1</text>
                    
                    <circle cx="140" cy="110" r="5" fill="#3A9A3C" stroke="#121212" strokeWidth="1" />
                    <line x1="135" y1="107" x2="105" y2="92" stroke="#121212" strokeWidth="1" />
                    <text x="150" y="113" className="font-mono text-[6px] fill-[#4a4a4a]">Dr. Unit 2</text>
                  </g>
                  
                  <rect x="250" y="65" width="130" height="50" rx="10" stroke="#121212" strokeWidth="1.5" fill="white" />
                  <text x="315" y="85" textAnchor="middle" className="font-mono text-[8px] font-bold fill-[#121212]">PostGIS spatial query</text>
                  <text x="315" y="98" textAnchor="middle" className="font-mono text-[7px] fill-[#3A9A3C]">ST_DWithin() filter</text>
                  
                  <path d="M142 90 Q196 90, 242 90" stroke="#121212" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                </svg>
              )}

              {/* Progress Check Nodes on the far right */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-white border border-[#121212] flex items-center justify-center shadow-sm">
                      <Check className="w-3 h-3 text-[#3A9A3C]" strokeWidth={3} />
                    </div>
                    {i < 2 && <div className="w-[1.5px] h-4 bg-[#121212]" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Info text */}
            <div className="flex items-center gap-4 text-xs md:text-sm text-[#4a4a4a] font-medium leading-relaxed bg-[#CBEFFF]/20 border border-[#121212] p-4 rounded-xl">
              <span className="font-extrabold text-[#E8660A] shrink-0 font-mono text-[11px] bg-white border border-[#121212] px-2 py-1 rounded">
                {activeQuestion.stepCount}
              </span>
              <p>{activeQuestion.stepDescription}</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
