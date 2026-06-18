"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PROJECTS = [
  {
    slug: "kariman",
    status: "live" as const,
    category: "Emergency Intelligence",
    title: "Kariman",
    desc: "Agentic medical response routing. Instantly verify and deploy doctors to emergency zones.",
    stack: ["Agentic AI", "Real-time Routing", "Postgres", "Supabase", "Next.js 14"],
    accent: "#E8660A",
    featured: true,
  },
  {
    slug: "atrea",
    status: "live" as const,
    category: "Recruitment Intelligence",
    title: "Atrea",
    desc: "Elite engineering hiring portal. AI deeply analyzes GitHub repos and system design capability.",
    stack: ["pgvector", "HNSW", "OpenAI ada-002", "Agentic Analysis"],
    accent: "#1B2B4B",
    featured: false,
  },
  {
    slug: "sanctuary",
    status: "beta" as const,
    category: "Workspace Intelligence",
    title: "Sanctuary",
    desc: "Seamlessly switch between Claude, GPT-4, and local models. Retains context across agents.",
    stack: ["Vector DB", "LangChain", "Streaming"],
    accent: "#3A9A3C",
    featured: false,
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export function ProjectsSection() {
  const { ref, visible } = useReveal();
  const featured = PROJECTS.find((p) => p.featured)!;
  const cards = PROJECTS.filter((p) => !p.featured);

  return (
    <section className="bg-[var(--bg)] py-24 px-4 font-sans border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end mb-16">
            <div>
              <div className="inline-block px-3 py-1 rounded-full border border-[var(--border)] bg-white text-xs text-[var(--navy)] font-bold uppercase tracking-widest mb-6 shadow-sm">
                Active Systems
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--navy)] tracking-tight leading-tight">
                Lab Applications
              </h2>
            </div>
            <p className="text-[var(--muted)] text-lg font-medium max-w-md md:justify-self-end">
              Production-grade AI tools — each independently deployable, auth-protected, and isolated.
            </p>
          </div>

          {/* Featured card */}
          <div className="bg-white rounded-[32px] border border-[var(--border)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden mb-8 grid grid-cols-1 md:grid-cols-2 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="p-10 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live
                </span>
                <span className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider">{featured.category}</span>
              </div>
              <h3 className="text-4xl font-extrabold text-[var(--navy)] mb-4 tracking-tight">{featured.title}</h3>
              <p className="text-[var(--muted)] text-lg font-medium leading-relaxed mb-8">{featured.desc}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {featured.stack.map((t) => (
                  <span key={t} className="bg-[var(--surface-2)] text-[var(--navy)] text-xs font-bold px-3 py-2 rounded-lg">{t}</span>
                ))}
              </div>
              <div className="text-[var(--navy)] font-bold flex items-center gap-2">View project →</div>
            </div>

            {/* Visual */}
            <div className="bg-orange-50 p-10 md:p-12 flex flex-col justify-center gap-4 border-l border-[var(--border)]">
              {[
                { label: "Locating Doctor...", status: "Verified", color: "var(--green)" },
                { label: "Calculating Route...", status: "ETA 4m", color: "var(--orange)" },
                { label: "Dispatching Unit...", status: "En Route", color: "var(--navy)" }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-[var(--border)] flex items-center justify-between">
                  <span className="font-mono text-sm text-[var(--navy)] font-bold">{item.label}</span>
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded-md" style={{ backgroundColor: `${item.color}15`, color: item.color }}>{item.status}</span>
                </div>
              ))}
              <div className="font-mono text-xs text-[var(--muted)] mt-2 text-center uppercase tracking-widest">Agentic routing protocol active</div>
            </div>
          </div>

          {/* Cards row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {cards.map((p) => (
              <div key={p.slug} className="bg-white rounded-[32px] border border-[var(--border)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 hover:shadow-lg transition-shadow cursor-pointer flex flex-col" style={{ borderTop: `4px solid ${p.accent}` }}>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider">{p.category}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${p.status === "beta" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"}`}>
                    {p.status}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-[var(--navy)] mb-3 tracking-tight">{p.title}</h3>
                <p className="text-[var(--muted)] text-base font-medium mb-8 leading-relaxed flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {p.stack.map((t) => <span key={t} className="bg-[var(--surface-2)] text-[var(--navy)] text-xs font-bold px-3 py-1.5 rounded-lg">{t}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* Custom builds banner */}
          <div className="bg-[var(--navy)] rounded-[32px] p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div>
              <div className="text-2xl font-extrabold text-white mb-2 tracking-tight">Building something specific?</div>
              <div className="font-mono text-sm text-blue-200">We take a small number of custom AI engagements each quarter.</div>
            </div>
            <Link href="mailto:daddy@enveraitech.com" className="bg-white text-[var(--navy)] px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-opacity whitespace-nowrap shadow-sm">
              Get in touch →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
