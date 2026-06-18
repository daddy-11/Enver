import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About",
  description: "About Enver AI Tech — independent AI lab building production-grade spatial intelligence and document analysis systems.",
};

const VALUES = [
  {
    title: "Ship working products",
    body: "Not pitch decks. Every system is production-grade from day one — proper auth, real databases, auditable code. If it's in the lab, it runs in production.",
  },
  {
    title: "Open by default",
    body: "Architecture documented. Schemas public. Every technical decision has a written rationale. No black boxes — clients can always see what's running and why.",
  },
  {
    title: "Security by design",
    body: "RLS on every table. HttpOnly session cookies. Middleware route protection. Service-role keys server-side only. Defense in depth is the baseline, not an add-on.",
  },
  {
    title: "No abstraction for its own sake",
    body: "Every dependency in the stack is a deliberate choice. Supabase owns the data plane. Better Auth owns the session lifecycle. The stack is legible, replaceable, and owned by you.",
  },
];

const STATS = [
  { value: "3+",    label: "AI products shipped" },
  { value: "<50ms", label: "P95 query latency"   },
  { value: "100%",  label: "Auth-gated access"   },
  { value: "0",     label: "Cross-user data leaks" },
];

const STACK_REASONS = [
  { name: "Next.js 14", reason: "App Router + RSC = fast pages, server auth, no client-side secrets." },
  { name: "Supabase + PostGIS", reason: "Postgres with spatial extensions — no separate GIS stack needed." },
  { name: "pgvector HNSW", reason: "Sub-50ms cosine similarity at 1536-dim without a separate vector DB." },
  { name: "Better Auth", reason: "Open-source, self-hosted, auditable — no auth vendor lock-in." },
  { name: "Drizzle ORM", reason: "Typed schemas, zero runtime overhead, generated migrations." },
  { name: "Upstash Redis", reason: "Serverless rate limiting — no Redis infra to manage, pays per request." },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>

        {/* Hero */}
        <section style={{ padding: "5rem 0 4rem", borderBottom: "0.5px solid var(--border)" }}>
          <div className="container">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem" }}>
              <span style={{ width: 20, height: 1.5, background: "var(--orange)", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--orange)" }}>About</span>
            </div>
            <div className="about-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
              <div>
                <h1
                  style={{
                    fontFamily: "var(--font)", fontSize: "clamp(36px,5vw,58px)",
                    fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.05,
                    marginBottom: "1.25rem",
                  }}
                >
                  An independent<br />AI lab.
                </h1>
                <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.75, maxWidth: 440 }}>
                  Enver AI Tech builds production-grade AI products for real-world use cases — geospatial analysis, document intelligence, and beyond. No demos. No vaporware.
                </p>
              </div>

              {/* Stats grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)", border: "0.5px solid var(--border)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
                {STATS.map(({ value, label }) => (
                  <div
                    key={label}
                    style={{ background: "var(--surface)", padding: "1.5rem", textAlign: "center" }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font)", fontSize: 30, fontWeight: 800,
                        letterSpacing: "-1px", marginBottom: 5, color: "var(--navy)",
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)",
                        textTransform: "uppercase", letterSpacing: "0.08em",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section style={{ padding: "5rem 0", borderBottom: "0.5px solid var(--border)" }}>
          <div className="container">
            <div className="founder-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
              <div>
                <div
                  style={{
                    fontFamily: "var(--mono)", fontSize: 11, fontWeight: 500,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "var(--muted)", marginBottom: "1.25rem",
                  }}
                >
                  Founder
                </div>
                {/* Avatar */}
                <div
                  style={{
                    width: 80, height: 80, borderRadius: "var(--r-lg)",
                    background: "var(--navy)", display: "flex", alignItems: "center",
                    justifyContent: "center", marginBottom: "1rem",
                  }}
                >
                  {/* Logo mark inset */}
                  <svg width="44" height="44" viewBox="0 0 80 80" fill="none">
                    <polygon points="8,26 40,8 40,26 8,44"   fill="#fff" />
                    <polygon points="8,44 40,26 40,38 8,56"  fill="rgba(255,255,255,0.65)" />
                    <polygon points="8,56 40,38 40,50 8,68"  fill="rgba(255,255,255,0.35)" />
                    <polygon points="40,8 72,26 40,44 8,26"  fill="rgba(255,255,255,0.55)" />
                    <polygon points="72,26 72,62 40,80 40,44" fill="rgba(255,255,255,0.25)" />
                  </svg>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Enver</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)", marginBottom: "1.25rem" }}>
                  Founder · AI Engineer
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {["Full-stack engineering", "Spatial data systems", "Machine learning", "Production infrastructure"].map((skill) => (
                    <div
                      key={skill}
                      style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)" }}
                    >
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--orange)", flexShrink: 0 }} />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p
                  style={{
                    fontSize: 20, fontWeight: 500, lineHeight: 1.65,
                    letterSpacing: "-0.2px", marginBottom: "2rem", color: "var(--text)",
                  }}
                >
                  &quot;Building AI systems that actually ship. Every product in the lab is built, maintained, and iterated on personally — no team, no outsourcing, no middlemen.&quot;
                </p>
                <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.75, marginBottom: "1rem" }}>
                  Background spans full-stack engineering, spatial data infrastructure, and machine learning. Before starting Enver AI Tech, worked on production data pipelines handling millions of records and geospatial systems used in field operations.
                </p>
                <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.75 }}>
                  The lab exists because most AI demos don&apos;t survive contact with production requirements — authentication, data isolation, latency, cost. Everything built here starts with those constraints, not as an afterthought.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: "5rem 0", background: "var(--surface)", borderBottom: "0.5px solid var(--border)" }}>
          <div className="container">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
              <span style={{ width: 20, height: 1.5, background: "var(--orange)", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--orange)" }}>Principles</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font)", fontSize: "clamp(26px,4vw,40px)",
                fontWeight: 800, letterSpacing: "-1px", marginBottom: "3rem",
              }}
            >
              How we work
            </h2>
            <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
              {VALUES.map(({ title, body }) => (
                <div
                  key={title}
                  style={{
                    padding: "1.75rem", background: "var(--bg)",
                    border: "0.5px solid var(--border)", borderRadius: "var(--r-lg)",
                  }}
                >
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: "0.625rem", letterSpacing: "-0.2px" }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stack rationale */}
        <section style={{ padding: "5rem 0", borderBottom: "0.5px solid var(--border)" }}>
          <div className="container">
            <div className="stack-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
                  <span style={{ width: 20, height: 1.5, background: "var(--orange)", display: "inline-block" }} />
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--orange)" }}>Stack</span>
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font)", fontSize: "clamp(26px,3.5vw,38px)",
                    fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "1rem",
                  }}
                >
                  Deliberate choices.<br />No abstraction<br />for its own sake.
                </h2>
                <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.75 }}>
                  Every tool in the stack earns its place. Here&apos;s the reasoning behind each layer.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--border)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
                {STACK_REASONS.map(({ name, reason }) => (
                  <div
                    key={name}
                    className="stack-reason-row"
                    style={{
                      display: "grid", gridTemplateColumns: "160px 1fr",
                      background: "var(--surface)",
                    }}
                  >
                    <div
                      style={{
                        padding: "1.1rem 1.25rem",
                        borderRight: "0.5px solid var(--border)",
                        display: "flex", alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--mono)", fontSize: 12,
                          fontWeight: 500, color: "var(--text)",
                        }}
                      >
                        {name}
                      </span>
                    </div>
                    <div style={{ padding: "1.1rem 1.25rem", display: "flex", alignItems: "center" }}>
                      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "5rem 0", background: "var(--surface)" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--font)", fontSize: "clamp(26px,4vw,40px)",
                fontWeight: 800, letterSpacing: "-1px", marginBottom: "1rem",
              }}
            >
              Ready to build something?
            </h2>
            <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: "2rem" }}>
              Every engagement starts with a scoping call. No commitment required.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "12px 28px", background: "var(--navy)", color: "#fff",
                  borderRadius: "var(--r-md)", fontWeight: 700, fontSize: 15,
                  textDecoration: "none",
                }}
              >
                Start a project →
              </Link>
              <Link
                href="/projects"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "12px 28px", background: "transparent", color: "var(--text)",
                  border: "0.5px solid var(--border-md)", borderRadius: "var(--r-md)",
                  fontWeight: 500, fontSize: 15, textDecoration: "none",
                }}
              >
                View live projects
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
