"use client";

import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const SERVICES = [
  {
    number: "01",
    accentColor: "#E8660A",
    category: "Emergency Intelligence",
    title: "Agentic Medical Routing",
    problem: "In critical emergency scenarios, locating and deploying the right medical professionals and manpower is often delayed by manual verification and uncoordinated logistics.",
    solution: "We build agentic systems like Kariman that instantly locate, verify, and route available medical professionals and required manpower to critical zones, optimizing response times when seconds matter.",
    outcomes: [
      "Real-time tracking of medical personnel and assets",
      "Automated verification of credentials before deployment",
      "Intelligent routing based on proximity and specialty",
      "Live operational dashboards for dispatch centers",
    ],
    idealFor: ["Hospitals", "Emergency Services", "Disaster Relief", "Government Health Agencies"],
    deliverable: "Agentic routing protocol + live tracking map + authenticated dispatcher dashboard",
  },
  {
    number: "02",
    accentColor: "#1B2B4B",
    category: "Recruitment Intelligence",
    title: "Elite Engineering Matching",
    problem: "Traditional hiring relies on keyword matching, missing the nuance of actual engineering capability and resulting in poor technical fits for high-stakes roles.",
    solution: "We deploy AI agents like Atrea that deeply analyze a candidate's complete technical footprint—including GitHub repositories, technical blogs, and system design capability—to find perfect synergy.",
    outcomes: [
      "Deep semantic analysis of actual codebase contributions",
      "System design capability verification via agentic interrogation",
      "Automated skill gap deltas between candidates and roles",
      "Ranked synergy matching using pgvector HNSW indexing",
    ],
    idealFor: ["Tech Startups", "Enterprise Engineering Teams", "Specialized Talent Agencies"],
    deliverable: "Vector-backed matchmaking engine + candidate analysis dashboard + integrated ATS sync",
  },
  {
    number: "03",
    accentColor: "#3A9A3C",
    category: "Custom AI Products",
    title: "Bespoke AI Product Builds",
    problem: "You have a specific, high-value workflow that off-the-shelf AI tools don't cover—or you need a white-labeled product you can ship to your own customers.",
    solution: "We scope, design, and build a complete AI-powered product—from database schema to authenticated frontend—tailored to your exact requirements. Typically scoping to production in 3–6 weeks.",
    outcomes: [
      "Full-stack Next.js application with your branding",
      "Hardened auth layer (Better Auth + RLS + rate limiting)",
      "Agentic AI capability baked into the core workflow",
      "Deployed on your infrastructure with your domain",
    ],
    idealFor: ["SaaS Founders", "Enterprise Innovation Teams", "Agencies Building for Clients"],
    deliverable: "Complete production application — code, deployment, documentation, and handover",
  },
];

const DIFFERENTIATORS = [
  { label: "No black boxes", body: "You get the code, the schema, and a walkthrough. Nothing is locked to our platform." },
  { label: "Security from day one", body: "RLS, CSRF protection, rate limiting, and security headers ship as standard — not as extras." },
  { label: "Fast delivery", body: "Scoping to functional prototype in 10–14 days. Production-hardened in 3–6 weeks." },
  { label: "Native intelligence", body: "We don't just API-wrap. We build deeply integrated vector databases and autonomous agents directly into your stack." },
];

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[var(--bg)] font-sans">

        {/* Header */}
        <section className="pt-20 pb-16 border-b border-[var(--border)]">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-5 h-1.5 bg-[var(--orange)] inline-block rounded-sm" />
              <span className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--orange)]">Services & Solutions</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
              <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-[var(--navy)]">
                What we solve<br />for your business.
              </h1>
              <p className="text-base text-[var(--muted)] font-medium leading-relaxed max-w-md md:justify-self-end pb-2">
                We translate agentic AI capabilities into business outcomes. Below is how our core systems map to problems you actually have — and the concrete deliverables you receive.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="container max-w-6xl mx-auto px-4 flex flex-col gap-8">
            {SERVICES.map((svc) => (
              <div
                key={svc.number}
                className="bg-white border border-[var(--border)] rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                {/* Top accent bar */}
                <div className="h-1 opacity-90" style={{ background: svc.accentColor }} />

                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left */}
                  <div className="p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-[var(--border)]">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-[11px] font-extrabold text-[var(--muted)]">
                        {svc.number}
                      </span>
                      <span className="w-px h-3 bg-[var(--border)]" />
                      <span
                        className="font-mono text-[11px] font-bold uppercase tracking-[0.1em]"
                        style={{ color: svc.accentColor }}
                      >
                        {svc.category}
                      </span>
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight leading-tight mb-8 text-[var(--navy)]">
                      {svc.title}
                    </h2>

                    {/* Problem / Solution */}
                    <div className="flex flex-col gap-4 mb-8">
                      <div className="p-5 bg-red-50 border border-red-100 rounded-2xl">
                        <div className="font-mono text-[10px] font-extrabold uppercase tracking-[0.12em] text-red-600 mb-2">
                          The problem
                        </div>
                        <p className="text-[14px] text-[var(--navy)] font-medium leading-relaxed">{svc.problem}</p>
                      </div>
                      <div className="p-5 bg-green-50 border border-green-100 rounded-2xl">
                        <div className="font-mono text-[10px] font-extrabold uppercase tracking-[0.12em] text-green-700 mb-2">
                          Our solution
                        </div>
                        <p className="text-[14px] text-[var(--navy)] font-medium leading-relaxed">{svc.solution}</p>
                      </div>
                    </div>

                    {/* Deliverable */}
                    <div className="p-5 bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl mb-8">
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--muted)] mb-2">
                        What you receive
                      </div>
                      <p className="font-mono text-[12px] font-bold text-[var(--navy)] leading-relaxed">{svc.deliverable}</p>
                    </div>

                    <Link
                      href="mailto:daddy@enveraitech.com"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm transition-opacity hover:opacity-90 shadow-sm"
                      style={{ background: svc.accentColor }}
                    >
                      Discuss this service →
                    </Link>
                  </div>

                  {/* Right */}
                  <div className="p-10 lg:p-12 bg-[var(--surface-2)]">
                    {/* Outcomes */}
                    <div className="mb-8">
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--muted)] mb-4">
                        Business outcomes
                      </div>
                      <div className="flex flex-col gap-2">
                        {svc.outcomes.map((o) => (
                          <div
                            key={o}
                            className="flex gap-3 px-4 py-3 bg-white border border-[var(--border)] rounded-xl items-start shadow-sm"
                          >
                            <span className="shrink-0 mt-0.5 font-extrabold" style={{ color: svc.accentColor }}>✓</span>
                            <span className="text-[13px] font-bold text-[var(--navy)] leading-relaxed">{o}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ideal for */}
                    <div>
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--muted)] mb-3">
                        Ideal for
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {svc.idealFor.map((sector) => (
                          <span
                            key={sector}
                            className="font-mono text-[11px] font-bold px-3 py-1.5 rounded-full bg-white border border-[var(--border)] text-[var(--navy)] shadow-sm"
                          >
                            {sector}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why us */}
        <section className="py-20 bg-[var(--surface-2)] border-t border-[var(--border)]">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-1.5 bg-[var(--orange)] inline-block rounded-sm" />
              <span className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--orange)]">Differentiators</span>
            </div>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight mb-12 text-[var(--navy)]">
              Why Enver AI Tech
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIFFERENTIATORS.map(({ label, body }) => (
                <div
                  key={label}
                  className="p-8 bg-white border border-[var(--border)] rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-extrabold mb-2 text-[var(--navy)]">{label}</h3>
                  <p className="text-sm font-medium text-[var(--muted)] leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container max-w-6xl mx-auto px-4 text-center">
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-[var(--navy)]">
              Ready to start?
            </h2>
            <p className="text-base font-medium text-[var(--muted)] mb-10 max-w-md mx-auto">
              Scoping calls are free. We'll tell you within the first 30 minutes whether we're the right fit.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="mailto:daddy@enveraitech.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--navy)] text-white rounded-xl font-bold text-[15px] shadow-lg hover:bg-opacity-90 transition-opacity"
              >
                Book a scoping call →
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center px-8 py-4 bg-white text-[var(--navy)] border border-[var(--border)] rounded-xl font-bold text-[15px] shadow-sm hover:bg-[var(--surface-2)] transition-colors"
              >
                See live work
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
