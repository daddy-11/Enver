"use client";
import React from "react";
import Link from "next/link";
import { Wordmark } from "@/components/ui/Logo";
import { useReveal } from "@/hooks/useReveal";

// ── Security Section ──────────────────────────────────────────────────────────
const CERTS = [
  { title: "Row-Level Security", body: "PostgreSQL RLS on every table. Users can only touch their own rows — enforced at query time, not application layer." },
  { title: "Better Auth Sessions", body: "HttpOnly, Secure, SameSite=Lax cookies. 7-day expiry with 24h rolling refresh. Token cached in edge middleware." },
  { title: "Upstash Rate Limiting", body: "Sliding window rate limits per IP on every API route. Auth: 10/min. Contact: 3/15min. DDoS-resilient fail-open design." },
  { title: "CSRF + Origin Check", body: "Origin header validation on all mutating routes. Custom header requirement prevents cross-site request forgery." },
  { title: "Zod Input Validation", body: "Every API input validated against a typed schema before it reaches the DB. SQL injection surface is zero." },
  { title: "Security Headers", body: "CSP, HSTS (2yr + preload), X-Frame-Options DENY, Referrer-Policy, Permissions-Policy — set on every response." },
];

export function SecuritySection() {
  const { ref, visible } = useReveal();
  return (
    <section className="py-24 bg-[var(--surface-2)]">
      <div className="container max-w-6xl mx-auto px-4">
        <div ref={ref} className={`transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <div className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--navy)] mb-4">Security Architecture</div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-[var(--navy)] mb-6">Enterprise-grade.<br />By default.</h2>
              <p className="text-base text-[var(--muted)] font-medium leading-relaxed mb-10">
                Every route is auth-gated. Every input is validated. Every table has RLS. Rate limiting, CSRF protection, and hardened HTTP headers ship as baseline — not add-ons.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CERTS.map((c) => (
                  <div key={c.title} className="p-5 bg-white border border-[var(--border)] rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 ring-4 ring-green-500/20 shrink-0" />
                      <span className="text-[13px] font-extrabold text-[var(--navy)]">{c.title}</span>
                    </div>
                    <p className="text-[12px] text-[var(--muted)] leading-relaxed font-medium">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal */}
            <div className="animate-[float_6s_ease-in-out_infinite]">
              <div className="bg-[#0D1117] rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.18)] border border-gray-800">
                <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
                  {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
                    <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                  ))}
                  <span className="font-mono text-[11px] text-white/30 mx-auto tracking-widest uppercase">security · audit log</span>
                </div>
                <div className="p-6 font-mono text-[12px] leading-relaxed text-white/50">
                  <div><span className="text-white/30">$ </span><span className="text-blue-400">check-route</span> <span>/apps/kariman</span></div>
                  <br />
                  <div><span className="text-green-400">✓</span> Session token valid · <span className="text-yellow-400">e8f2...@enver-ai.tech</span></div>
                  <div><span className="text-green-400">✓</span> RLS policy: <span className="text-blue-400">dispatch_agents_owner</span></div>
                  <div><span className="text-green-400">✓</span> Rate limit: <span className="text-blue-400">94/100 remaining</span></div>
                  <div><span className="text-green-400">✓</span> CSRF origin: <span className="text-blue-400">enver-ai.tech</span></div>
                  <div><span className="text-green-400">✓</span> Input validated: <span className="text-blue-400">Zod schema passed</span></div>
                  <div><span className="text-green-400">✓</span> PostGIS GiST index: <span className="text-blue-400">healthy</span></div>
                  <div><span className="text-green-400">✓</span> pgvector HNSW index: <span className="text-blue-400">1536-dim active</span></div>
                  <br />
                  <div className="text-white/20">────────────────────────────</div>
                  <div>Status: <span className="text-green-400 font-bold">AUTHORIZED</span> · 4ms</div>
                  <div>Render: <span className="text-white/70">Server Component (RSC)</span></div>
                  <br />
                  <div><span className="text-white/30">$ </span><span className="inline-block w-2 h-3.5 bg-blue-400 align-[-0.1em] animate-[blink_1s_step-end_infinite]" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { initials: "AR", name: "Ahmed R.", role: "Head of Ops, Rapid Response", color: "var(--navy)", quote: "Kariman cut our dispatch verification time by 40%. Agentic routing that works when seconds matter — nothing close to this existed before." },
  { initials: "PK", name: "Priya K.", role: "Head of Talent, Series B", color: "var(--orange)", quote: "Atrea saved our team hours of manual screening every week. The deep repo analysis and system design verification are remarkably accurate." },
  { initials: "MT", name: "Marcus T.", role: "CTO, Enterprise SaaS", color: "var(--green)", quote: "Clean APIs, solid auth, completely auditable stack. This is what production AI tooling should look like." },
];

export function TestimonialsSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="py-24 bg-white border-y border-[var(--border)]">
      <div className="container max-w-6xl mx-auto px-4">
        <div ref={ref} className={`transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--navy)] mb-4 text-center">Social proof</div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-[var(--navy)] mb-12 text-center">What early users say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-8 bg-white border border-[var(--border)] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[var(--orange)] text-[14px] tracking-[3px] mb-4">★★★★★</div>
                <p className="text-[14px] text-[var(--muted)] leading-relaxed italic mb-6 font-medium">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0" style={{ background: `${t.color}15`, color: t.color }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-[var(--navy)]">{t.name}</div>
                    <div className="font-mono text-[11px] font-bold text-[var(--muted)]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ───────────────────────────────────────────────────────────────
export function CtaSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="py-32 bg-[var(--surface-2)]">
      <div className="container max-w-6xl mx-auto px-4">
        <div ref={ref} className={`text-center transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--navy)] mb-5">Access</div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-[var(--navy)] mb-4 max-w-xl mx-auto">
            Ready to get started?
          </h2>
          <p className="text-lg text-[var(--muted)] font-medium max-w-md mx-auto mb-10">
            All products are auth-gated. Apply for early access — reviewed within 48 hours.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="mailto:hanabi@enveraitech.com" className="inline-flex items-center justify-center px-8 py-4 bg-[var(--navy)] text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity">
              Apply for access
            </Link>
            <Link href="/projects" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[var(--navy)] font-bold border border-[var(--border)] rounded-xl shadow-sm hover:bg-[var(--surface-2)] transition-colors">
              View live apps
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-[var(--border)] flex-wrap">
            {["End-to-end encrypted", "48-hour review", "No vendor lock-in", "SOC2-aligned infra"].map((t) => (
              <div key={t} className="font-mono text-[12px] font-bold text-[var(--muted)] flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[var(--green)]" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-[var(--border)] py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          <div className="md:col-span-5">
            <Wordmark size={26} />
            <p className="text-[13px] text-[var(--muted)] font-medium max-w-xs mt-4">
              AI research laboratory building production-grade agentic intelligence systems.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-[11px] font-bold mt-5 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> All systems operational
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { title: "Applications", links: [
                { label: "Kariman", href: "/apps/kariman" },
                { label: "Atrea", href: "/apps/atrea" },
                { label: "Dashboard", href: "/dashboard" },
              ]},
              { title: "Technology", links: [
                { label: "Architecture", href: "/about" },
                { label: "Security Model", href: "/about" },
                { label: "Database Schema", href: "/about" },
              ]},
              { title: "Company", links: [
                { label: "About", href: "/about" },
                { label: "Contact", href: "mailto:hanabi@enveraitech.com" },
                { label: "Services", href: "/services" },
                { label: "Apps", href: "/apps" },
              ]},
            ].map(({ title, links }) => (
              <div key={title}>
                <div className="font-mono text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--navy)] mb-4">{title}</div>
                <div className="flex flex-col gap-3">
                  {links.map((l) => (
                    <Link key={l.label} href={l.href} className="text-[13px] font-bold text-[var(--muted)] hover:text-[var(--navy)] transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[11px] font-bold text-[var(--muted)]">© {year} Enver AI Tech · enver-ai.tech</span>
          <div className="flex flex-wrap gap-6">
            {["SOC2-aligned infrastructure", "HTTPS enforced", "HSTS preload"].map((t) => (
              <span key={t} className="font-mono text-[11px] font-bold text-[var(--muted)] flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[var(--green)]" />{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
