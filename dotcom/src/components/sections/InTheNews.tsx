"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface NewsCard {
  id: number;
  sourceName: string;
  sourceLogo: string;
  headline: string;
  date: string;
  link: string;
  gridSpanClass: string;
}

const NEWS_ARTICLES: NewsCard[] = [
  {
    id: 1,
    sourceName: "NVIDIA Hackathons",
    sourceLogo: "NV",
    headline: "Enver engineers prepare developer submissions and system integrations for the upcoming regional AI showcase.",
    date: "June 2026",
    link: "https://nvidia.com",
    gridSpanClass: "md:col-span-2"
  },
  {
    id: 2,
    sourceName: "Rapid AI Movement",
    sourceLogo: "AI",
    headline: "Driving general-use AI accessibility and breaking the rigid 9-5 corporate recruiting mold in India.",
    date: "May 2026",
    link: "#",
    gridSpanClass: "md:col-span-2"
  },
  {
    id: 3,
    sourceName: "Atrea Placement Beta",
    sourceLogo: "AT",
    headline: "Stealth candidate intake pipeline goes live for select engineering design partners and tech squads.",
    date: "April 2026",
    link: "/intake",
    gridSpanClass: "md:col-span-2"
  },
  {
    id: 4,
    sourceName: "Kariman Operations",
    sourceLogo: "KA",
    headline: "Testing spatial medical dispatch algorithms during simulated regional logistics runs.",
    date: "March 2026",
    link: "#",
    gridSpanClass: "md:col-span-3"
  },
  {
    id: 5,
    sourceName: "Development Credits",
    sourceLogo: "CR",
    headline: "How flexible engineering credits are changing developer productivity across local tech squads.",
    date: "February 2026",
    link: "#",
    gridSpanClass: "md:col-span-3"
  }
];

export function InTheNews() {
  return (
    <section className="bg-white py-24 border-b border-[#121212] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* White rounded container representing the inner article layout block */}
        <div className="bg-[#FAF6EF]/30 border border-[#121212] rounded-[32px] p-8 md:p-12 shadow-sm">
          
          <div className="mb-10 text-left">
            <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-[#E8660A] block mb-3">
              ACTIVE ROADMAPS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#121212] tracking-tight leading-tight max-w-4xl">
              enver drives a rapid AI movement in general use sector and coordinates active dispatches
            </h2>
          </div>

          {/* Asymmetrical Grid of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {NEWS_ARTICLES.map((article) => (
              <a 
                key={article.id}
                href={article.link}
                className={`${article.gridSpanClass} bg-white border border-dashed border-[#121212] rounded-[24px] p-6 hover:shadow-md transition-shadow flex flex-col justify-between group cursor-pointer hover:border-solid`}
              >
                <div>
                  <p className="text-sm md:text-base font-bold text-[#121212] leading-snug mb-8 group-hover:text-[#E8660A] transition-colors">
                    {article.headline}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#121212]/10">
                  <div className="flex items-center gap-3">
                    {/* Logo Placeholder */}
                    <div className="w-8 h-8 rounded-lg bg-[#FAF6EF] border border-[#121212] flex items-center justify-center font-mono text-[9px] font-extrabold text-[#121212]">
                      {article.sourceLogo}
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#121212]">{article.sourceName}</h4>
                      <p className="text-[10px] font-medium text-[#7a7a7a]">{article.date}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#121212] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View updates <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                </div>
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
