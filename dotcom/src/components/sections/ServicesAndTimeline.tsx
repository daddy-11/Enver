"use client";
import React from "react";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";

// ── Fix 2: Services & Solutions ───────────────────────────────────────────────

const SERVICES = [
  {
    accentColor: "#E8660A",
    icon: "🚨",
    category: "Emergency Intelligence",
    title: "Agentic Medical Routing",
    problem: "Delays in critical emergency verification and lack of coordinated logistics.",
    bullets: [
      "Real-time tracking of medical personnel",
      "Automated verification of credentials",
      "Intelligent routing based on proximity",
      "Live dispatcher dashboards",
    ],
    idealFor: ["Hospitals", "Emergency Services", "Relief Agencies"],
  },
  {
    accentColor: "#1B2B4B",
    icon: "🧠",
    category: "Recruitment Intelligence",
    title: "Elite Engineering Matching",
    problem: "Traditional hiring relies on keyword matching, missing actual capabilities.",
    bullets: [
      "Deep semantic analysis of contributions",
      "System design capability verification",
      "Automated skill gap deltas",
      "Ranked synergy matching using pgvector",
    ],
    idealFor: ["Tech Startups", "Enterprise Teams", "Agencies"],
  },
  {
    accentColor: "#3A9A3C",
    icon: "⚡",
    category: "Custom AI Products",
    title: "Bespoke AI builds",
    problem: "A specific workflow off-the-shelf AI doesn't cover, or a white-label product.",
    bullets: [
      "Full-stack application with your branding",
      "Agentic AI baked into the core workflow",
      "Hardened auth, rate limiting, RLS",
      "Deployed on your infrastructure",
    ],
    idealFor: ["SaaS founders", "Innovation Teams", "Agencies"],
  },
];

export function ServicesSection() {
  const { ref, visible } = useReveal();

  return (
    <section className="py-24 bg-white border-t border-[var(--border)]">
      <div className="container max-w-6xl mx-auto px-4">
        <div ref={ref} className={`transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end mb-14">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-1.5 bg-[var(--orange)] inline-block rounded-sm" />
                <span className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--orange)]">
                  Services & Solutions
                </span>
              </div>
              <h2 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-[var(--navy)]">
                Problems we solve<br />for your business.
              </h2>
            </div>
            <div>
              <p className="text-base text-[var(--muted)] font-medium leading-relaxed max-w-md mb-5">
                The technical details are built in. What matters to you is the outcome — here's how our capabilities map to real business problems.
              </p>
              <Link href="/services" className="inline-flex items-center gap-2 text-[14px] font-bold text-[var(--navy)] hover:text-[var(--orange)] transition-colors">
                Full services breakdown →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Accent bar */}
                <div className="h-1 opacity-90" style={{ background: svc.accentColor }} />

                <div className="p-7 flex-1 flex flex-col">
                  {/* Icon + category */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border"
                      style={{ background: `${svc.accentColor}0F`, border: `0.5px solid ${svc.accentColor}25` }}
                    >
                      {svc.icon}
                    </div>
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.12em]" style={{ color: svc.accentColor }}>
                      {svc.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold tracking-tight leading-snug text-[var(--navy)] mb-3">
                    {svc.title}
                  </h3>

                  {/* Problem */}
                  <p className="text-[13px] text-[var(--muted)] font-medium leading-relaxed italic mb-5">
                    "{svc.problem}"
                  </p>

                  {/* Outcome bullets */}
                  <div className="flex flex-col gap-2 mb-6 flex-1">
                    {svc.bullets.map((b) => (
                      <div key={b} className="flex gap-2.5 items-start">
                        <span className="shrink-0 text-[12px] font-extrabold mt-0.5" style={{ color: svc.accentColor }}>✓</span>
                        <span className="text-[13px] font-bold text-[var(--navy)] leading-relaxed">{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Ideal for pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {svc.idealFor.map((sector) => (
                      <span
                        key={sector}
                        className="font-mono text-[10px] font-bold px-3 py-1 rounded-full border bg-white shadow-sm"
                        style={{ border: `0.5px solid ${svc.accentColor}35`, color: "var(--navy)" }}
                      >
                        {sector}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/services"
                    className="flex items-center justify-between px-4 py-3 rounded-xl border text-[13px] font-bold transition-colors hover:bg-white"
                    style={{ border: `0.5px solid ${svc.accentColor}30`, background: `${svc.accentColor}07`, color: svc.accentColor }}
                  >
                    <span>Learn more</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Fix 4: How We Work Timeline ───────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    phase: "Scoping",
    duration: "Day 1–3",
    title: "Aligning on product goals",
    body: "A structured discovery call to map your data, infrastructure, and outcome. We define the scope, agree on deliverables, and flag risks early. You receive a written specification before any code is written.",
    accentColor: "#1B2B4B",
    icon: "🎯",
  },
  {
    number: "02",
    phase: "Prototype",
    duration: "Day 4–14",
    title: "A functional build in 10–14 days",
    body: "Working software — not a wireframe. A deployed Next.js app with real data connections, authenticated routes, and the core AI capability operating end-to-end. You can click through it and break it.",
    accentColor: "#E8660A",
    icon: "⚡",
  },
  {
    number: "03",
    phase: "Hardening",
    duration: "Day 15–28",
    title: "RLS, rate limiting, security headers",
    body: "Row-Level Security on every table. Upstash rate limiting on every API route. CSRF protection, Zod input validation, HSTS, CSP. The security layer is applied systematically — not patched in at the end.",
    accentColor: "#3A9A3C",
    icon: "🔒",
  },
  {
    number: "04",
    phase: "Deployment",
    duration: "Day 28–42",
    title: "Live on your infrastructure, your domain",
    body: "Deployed to Vercel + Supabase under your account. Custom domain, SSL, environment variables isolated, monitoring configured. Full code handover with documentation — you own everything, no vendor lock-in.",
    accentColor: "#1B2B4B",
    icon: "🚀",
  },
];

export function HowWeWorkSection() {
  const { ref, visible } = useReveal();

  return (
    <section className="py-24 bg-[var(--surface-2)] border-t border-[var(--border)]">
      <div className="container max-w-4xl mx-auto px-4">
        <div ref={ref} className={`transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-1.5 bg-[var(--orange)] inline-block rounded-sm" />
                <span className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--orange)]">How We Work</span>
              </div>
              <h2 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-[var(--navy)]">
                From brief to<br />production in<br />3–6 weeks.
              </h2>
            </div>
            <p className="text-base text-[var(--muted)] font-medium leading-relaxed max-w-sm">
              A tight, predictable delivery loop. Each phase has a clear output — nothing is open-ended. You always know exactly where the project stands.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-[var(--border)]" aria-hidden="true" />

            <div className="flex flex-col">
              {STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  className="grid grid-cols-[56px_1fr] gap-6"
                  style={{ paddingBottom: idx < STEPS.length - 1 ? "2.5rem" : 0 }}
                >
                  {/* Node */}
                  <div className="flex flex-col items-center relative z-10">
                    <div
                      className="w-[54px] h-[54px] rounded-full flex items-center justify-center text-2xl shrink-0"
                      style={{
                        background: step.accentColor,
                        boxShadow: `0 0 0 4px var(--surface-2), 0 0 0 5px ${step.accentColor}30`,
                      }}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm"
                    style={{
                      borderLeft: `4px solid ${step.accentColor}`,
                      marginBottom: idx < STEPS.length - 1 ? "0.5rem" : 0,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="font-mono text-[11px] font-extrabold" style={{ color: step.accentColor }}>
                        Phase {step.number}
                      </span>
                      <span className="w-px h-3 bg-[var(--border)]" />
                      <span
                        className="font-mono text-[11px] font-bold px-3 py-1 rounded-full"
                        style={{ background: `${step.accentColor}10`, color: step.accentColor }}
                      >
                        {step.phase}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-[var(--muted)] ml-auto">
                        {step.duration}
                      </span>
                    </div>

                    <h3 className="text-[17px] font-extrabold tracking-tight text-[var(--navy)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-[var(--muted)] font-medium leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 p-8 md:p-10 bg-[var(--navy)] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_40px_rgba(27,43,75,0.15)]">
            <div>
              <div className="text-[18px] font-extrabold text-white mb-1.5">
                Ready to start the scoping process?
              </div>
              <div className="font-mono text-[12px] font-bold text-white/50">
                First call is free. We'll be honest if it's not a fit.
              </div>
            </div>
            <Link
              href="mailto:daddy@enveraitech.com"
              className="inline-flex px-6 py-3.5 bg-white text-[var(--navy)] rounded-xl font-extrabold text-[14px] whitespace-nowrap hover:bg-opacity-90 transition-opacity"
            >
              Book a scoping call →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
