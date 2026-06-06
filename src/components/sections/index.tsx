"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/ui/Logo";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

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
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>Security Architecture</div>
              <h2 className="display-2" style={{ marginBottom: "1.25rem" }}>Enterprise-grade.<br />By default.</h2>
              <p className="body-md" style={{ marginBottom: "2.5rem" }}>
                Every route is auth-gated. Every input is validated. Every table has RLS. Rate limiting, CSRF protection, and hardened HTTP headers ship as baseline — not add-ons.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {CERTS.map((c) => (
                  <div key={c.title} style={{ padding: "1.125rem", background: "var(--bg)", border: "0.5px solid var(--border)", borderRadius: "var(--r-md)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{c.title}</span>
                    </div>
                    <p className="body-sm">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal */}
            <div style={{ animation: "float 6s ease-in-out infinite" }}>
              <div style={{ background: "#0D1117", borderRadius: "var(--r-xl)", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
                <div style={{ padding: "12px 16px", borderBottom: "0.5px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 7 }}>
                  {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
                    <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                  ))}
                  <span className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", margin: "0 auto", letterSpacing: "0.08em" }}>security · audit log</span>
                </div>
                <div style={{ padding: "1.5rem", fontFamily: "var(--mono)", fontSize: 12, lineHeight: 2.1, color: "rgba(255,255,255,0.45)" }}>
                  <div><span style={{ color: "rgba(255,255,255,0.3)" }}>$ </span><span style={{ color: "#60a5fa" }}>check-route</span> <span>/apps/orange-farm</span></div>
                  <br />
                  <div><span style={{ color: "#4ade80" }}>✓</span> Session token valid · <span style={{ color: "#fbbf24" }}>e8f2...@enver-ai.tech</span></div>
                  <div><span style={{ color: "#4ade80" }}>✓</span> RLS policy: <span style={{ color: "#60a5fa" }}>farm_plots_owner</span></div>
                  <div><span style={{ color: "#4ade80" }}>✓</span> Rate limit: <span style={{ color: "#60a5fa" }}>94/100 remaining</span></div>
                  <div><span style={{ color: "#4ade80" }}>✓</span> CSRF origin: <span style={{ color: "#60a5fa" }}>enver-ai.tech</span></div>
                  <div><span style={{ color: "#4ade80" }}>✓</span> Input validated: <span style={{ color: "#60a5fa" }}>Zod schema passed</span></div>
                  <div><span style={{ color: "#4ade80" }}>✓</span> PostGIS GiST index: <span style={{ color: "#60a5fa" }}>healthy</span></div>
                  <div><span style={{ color: "#4ade80" }}>✓</span> HNSW index: <span style={{ color: "#60a5fa" }}>1536-dim active</span></div>
                  <br />
                  <div style={{ color: "rgba(255,255,255,0.2)" }}>────────────────────────────</div>
                  <div>Status: <span style={{ color: "#4ade80" }}>AUTHORIZED</span> · 4ms</div>
                  <div>Render: <span style={{ color: "rgba(255,255,255,0.7)" }}>Server Component (RSC)</span></div>
                  <br />
                  <div><span style={{ color: "rgba(255,255,255,0.3)" }}>$ </span><span style={{ display: "inline-block", width: 7, height: 13, background: "#60a5fa", verticalAlign: "-0.1em", animation: "blink 1s step-end infinite" }} /></div>
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
  { initials: "AR", name: "Ahmed R.", role: "AgriTech Operations Lead", color: "var(--navy)", quote: "The geospatial mapper cut our field survey time by 40%. Real data, real speed — nothing close to this existed before." },
  { initials: "PK", name: "Priya K.", role: "Head of Talent, Series B", color: "var(--orange)", quote: "Resume Comparer saved our team hours of manual screening every week. The similarity scores are remarkably accurate." },
  { initials: "MT", name: "Marcus T.", role: "CTO, Logistics SaaS", color: "var(--green)", quote: "Clean APIs, solid auth, completely auditable stack. This is what production AI tooling should look like." },
];

export function TestimonialsSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="section">
      <div className="container">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>Social proof</div>
          <h2 className="display-2" style={{ marginBottom: "3rem" }}>What early users say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card" style={{ padding: "1.5rem" }}>
                <div style={{ color: "var(--orange)", fontSize: 14, letterSpacing: 3, marginBottom: "1rem" }}>★★★★★</div>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, fontStyle: "italic", marginBottom: "1.25rem" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: `${t.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: t.color, flexShrink: 0 }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                    <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{t.role}</div>
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
    <section style={{ padding: "6rem 0", background: "var(--surface)" }}>
      <div className="container">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`} style={{ textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: "1.25rem", justifyContent: "center" }}>Access</div>
          <h2 className="display-2" style={{ marginBottom: "1rem", maxWidth: 480, margin: "0 auto 1rem" }}>
            Ready to get started?
          </h2>
          <p className="body-lg" style={{ maxWidth: 420, margin: "0 auto 2.5rem" }}>
            All products are auth-gated. Apply for early access — reviewed within 48 hours.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary btn-lg">Apply for access</Link>
            <Link href="/projects" className="btn btn-secondary btn-lg">View live projects</Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "0.5px solid var(--border)", flexWrap: "wrap" }}>
            {["End-to-end encrypted", "48-hour review", "No vendor lock-in", "SOC2-aligned infra"].map((t) => (
              <div key={t} className="mono" style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--green)" }} />
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
    <footer style={{ borderTop: "0.5px solid var(--border)", background: "var(--bg)", padding: "3rem 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          <div>
            <Wordmark size={26} />
            <p className="body-sm" style={{ maxWidth: 260, marginTop: "0.875rem" }}>
              AI research laboratory building production-grade spatial intelligence and document analysis systems.
            </p>
            <div className="badge badge-live" style={{ marginTop: "1.25rem" }}>
              <span className="badge-dot" /> All systems operational
            </div>
          </div>
          {[
            { title: "Applications", links: ["Orange Farm Mapper", "Resume Comparer", "AI Document QA", "Dashboard"] },
            { title: "Technology", links: ["Architecture", "Security Model", "Database Schema", "Changelog"] },
            { title: "Company", links: ["About", "Contact", "Privacy Policy", "Terms of Service"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div className="mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: "1rem" }}>{title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {links.map((l) => (
                  <span key={l} style={{ fontSize: 13, color: "var(--muted)", cursor: "pointer", transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
                  >{l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "0.5px solid var(--border)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>© {year} Enver AI Tech · enver-ai.tech</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["SOC2-aligned infrastructure", "HTTPS enforced", "HSTS preload"].map((t) => (
              <span key={t} className="mono" style={{ fontSize: 11, color: "var(--muted)", display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--green)" }} />{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
