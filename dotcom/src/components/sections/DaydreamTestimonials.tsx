"use client";

import React, { useState } from "react";
import { Zap, Award } from "lucide-react";

interface Testimonial {
  id: number;
  pillLabel: string;
  quote: string;
  author: string;
  role: string;
  companyName: string;
  statNumber: string;
  statLabel: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    pillLabel: "Ananya Sharma - Bengaluru Tech",
    quote: "I was getting rejected by automated ATS filters for months due to traditional format checks. Atrea highlighted my actual GitHub PRs and custom systems design depth, landing me a role at a fast-growing startup in weeks.",
    author: "Ananya Sharma",
    role: "Full-Stack Engineer",
    companyName: "Bengaluru Tech",
    statNumber: "18d",
    statLabel: "average placement time"
  },
  {
    id: 2,
    pillLabel: "Rohan Mehta - AI/ML Specialist",
    quote: "Atrea didn't just look at my resume; its analyzer evaluated my training scripts and neural net designs. For the first time, a recruitment portal valued code quality over corporate keywords.",
    author: "Rohan Mehta",
    role: "AI/ML Developer",
    companyName: "Stealth Startup",
    statNumber: "2.4x",
    statLabel: "salary increment ratio"
  },
  {
    id: 3,
    pillLabel: "Priya Nair - Cloud Infra",
    quote: "Kariman's spatial routing telemetry was a great showcase of my PostGIS database queries. Having Atrea coordinate my layout and credentials made technical screening simple.",
    author: "Priya Nair",
    role: "Database Administrator",
    companyName: "Logistics Corp",
    statNumber: "100%",
    statLabel: "ATS filters bypassed"
  },
  {
    id: 4,
    pillLabel: "Arjun Rao - Software Dev",
    quote: "I love the credit-based matching parameters. Bypassing the traditional 9-5 recruiter pipeline let me speak directly to technical architects and show my real code.",
    author: "Arjun Rao",
    role: "Backend Engineer",
    companyName: "FinTech Lab",
    statNumber: "3 Wks",
    statLabel: "from intake to offer"
  },
  {
    id: 5,
    pillLabel: "Kavita Reddy - Data Engineering",
    quote: "The system design check is highly accurate. They parsed my Postgres schemas and event-driven setups, matching me directly to a high-scale database team.",
    author: "Kavita Reddy",
    role: "Data Architect",
    companyName: "E-Commerce Sqd",
    statNumber: "5+",
    statLabel: "interview rounds skipped"
  }
];

export function DaydreamTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeTestimonial = TESTIMONIALS[activeIdx];

  return (
    <section className="bg-white py-24 border-b border-[#121212] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Title and Toggles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-4 select-none">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#121212] tracking-tight leading-tight">
              The results <br /> you dream of
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-script text-[#E8660A] text-2xl font-semibold rotate-[-4deg] inline-block mr-2 select-none">
                Explore placements:
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {TESTIMONIALS.map((t, idx) => {
                const isSelected = idx === activeIdx;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#121212] text-xs font-bold transition-all hover:scale-[1.02] ${
                      isSelected 
                        ? "bg-[#EEDDFF] text-[#121212] shadow-sm" 
                        : "bg-white text-[#4a4a4a]"
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-[#121212] flex items-center justify-center shrink-0">
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#121212]" />}
                    </span>
                    {t.pillLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-12">
          
          {/* Left testimonial quote block */}
          <div className="lg:col-span-8 border border-[#121212] rounded-[32px] p-8 md:p-12 bg-[#FAF6EF]/20 flex flex-col justify-between shadow-sm min-h-[300px]">
            {/* Massive Quote Text */}
            <div className="mb-8 relative">
              {/* Highlight bar on the left */}
              <div className="absolute left-[-24px] top-0 bottom-0 w-1 bg-[#EEDDFF] rounded-full" />
              <p className="text-xl md:text-3xl font-extrabold text-[#121212] leading-relaxed tracking-tight select-none">
                "{activeTestimonial.quote}"
              </p>
            </div>

            {/* Author info & mini company badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#121212]/10 mt-auto">
              <div>
                <h4 className="text-sm font-extrabold text-[#121212]">
                  {activeTestimonial.author}
                </h4>
                <p className="text-xs font-semibold text-[#7a7a7a]">
                  {activeTestimonial.role}
                </p>
              </div>

              {/* Company Logo pill */}
              <div className="flex items-center gap-2 bg-white border border-[#121212] px-4 py-2 rounded-xl text-xs font-bold text-[#121212] shadow-sm select-none">
                <Zap className="w-3.5 h-3.5 text-[#E8660A]" strokeWidth={3} />
                <span>{activeTestimonial.companyName}</span>
              </div>
            </div>
          </div>

          {/* Right Stat highlight box */}
          <div className="lg:col-span-4 bg-[#EEDDFF] border border-[#121212] rounded-[32px] p-10 flex flex-col justify-center text-center shadow-sm relative overflow-hidden select-none min-h-[250px]">
            {/* Star outline doodle in background */}
            <div className="absolute top-4 right-4 opacity-15">
              <Award className="w-20 h-20 text-[#121212]" />
            </div>

            <h3 className="text-6xl md:text-7xl font-extrabold text-[#121212] tracking-tight leading-none mb-3">
              {activeTestimonial.statNumber}
            </h3>
            <p className="text-xs md:text-sm font-extrabold text-[#121212] uppercase tracking-wider max-w-[180px] mx-auto leading-snug">
              {activeTestimonial.statLabel}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
