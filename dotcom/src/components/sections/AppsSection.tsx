"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Activity, Users, Zap, ShieldCheck } from "lucide-react";

interface AppCardProps {
  index: number;
  slug: string;
  status: "live" | "beta" | "wip";
  category: string;
  title: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  icon: React.ReactNode;
}

function AppCard({
  index,
  slug,
  status,
  category,
  title,
  description,
  stack,
  metrics,
  accentColor,
  icon,
}: AppCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-white rounded-[32px] border border-[var(--border)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col hover:shadow-lg transition-all duration-700 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
      style={{ transitionDelay: `${index * 150}ms`, borderTop: `4px solid ${accentColor}` }}
    >
      <div className="p-10 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-6">
          <span className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider">{category}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${status === 'live' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
            {status}
          </span>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
            {icon}
          </div>
          <h3 className="text-3xl font-extrabold text-[var(--navy)] tracking-tight">{title}</h3>
        </div>

        <p className="text-[var(--muted)] text-base font-medium leading-relaxed mb-8 flex-1">
          {description}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-t border-[var(--border)]">
          {metrics.map((m, i) => (
            <div key={i}>
              <div className="text-xl font-extrabold text-[var(--navy)] tracking-tight mb-1">{m.value}</div>
              <div className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {stack.map((tech) => (
            <span key={tech} className="bg-[var(--surface-2)] text-[var(--navy)] text-xs font-bold px-3 py-1.5 rounded-lg">
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={`/apps/${slug}`}
          className="mt-auto bg-[var(--surface-2)] text-[var(--navy)] px-6 py-4 rounded-xl font-bold flex items-center justify-between hover:bg-[var(--navy)] hover:text-white transition-colors"
        >
          <span>Initialize Protocol</span>
          <ArrowRight className="w-4 h-4" strokeWidth={3} />
        </Link>
      </div>
    </div>
  );
}

export function AppsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTitleVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const apps: AppCardProps[] = [
    {
      index: 0,
      slug: "kariman",
      status: "live",
      category: "Emergency Intelligence",
      title: "Kariman",
      description: "Agentic medical response platform. Uses AI to instantly locate, verify, and route available medical professionals to critical zones, optimizing response times when seconds matter.",
      stack: ["Agentic AI", "Real-time Routing", "PostGIS", "Next.js"],
      metrics: [
        { value: "<2s", label: "Routing Latency" },
        { value: "100%", label: "Verified Data" },
        { value: "Live", label: "Sync" },
      ],
      accentColor: "#E8660A",
      icon: <Activity className="w-8 h-8" strokeWidth={2.5} />,
    },
    {
      index: 1,
      slug: "atrea",
      status: "live",
      category: "Recruitment Intelligence",
      title: "Atrea",
      description: "Elite engineering hiring portal. Atrea deploys AI agents to deeply analyze GitHub repositories, technical blogs, and system design capability for perfect talent matching.",
      stack: ["pgvector", "HNSW", "OpenAI ada-002", "Agentic Matchmaking"],
      metrics: [
        { value: "1536", label: "Vector Dim" },
        { value: "P95", label: "Sub-50ms" },
        { value: "HNSW", label: "Index Type" },
      ],
      accentColor: "#1B2B4B",
      icon: <Users className="w-8 h-8" strokeWidth={2.5} />,
    },
  ];

  return (
    <section id="apps" className="bg-[var(--bg)] py-32 px-4 font-sans relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section header */}
        <div
          ref={titleRef}
          className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-[var(--border)] pb-8 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--navy)] tracking-tight mb-4">
              Agentic Systems
            </h2>
            <p className="text-[var(--muted)] text-lg font-medium">
              Explore our live production environments. Auth-gated, edge-deployed, and engineered for scale.
            </p>
          </div>
          <div className="font-mono text-sm text-[var(--muted)] text-right">
            <div>2 systems deployed</div>
            <div className="flex items-center gap-2 justify-end mt-1"><ShieldCheck className="w-4 h-4 text-green-600" /> Enterprise Secured</div>
          </div>
        </div>

        {/* App cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apps.map((app) => (
            <AppCard key={app.slug} {...app} />
          ))}
        </div>
      </div>
    </section>
  );
}
