"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PROJECTS = [
  {
    slug: "orange-farm",
    status: "live" as const,
    category: "Geospatial Intelligence",
    title: "Orange Farm Mapper",
    desc: "PostGIS spatial queries, MVT tile serving via pg_tileserv, MapLibre GL rendering. Real-time health scores per plot. Built for field operators on edge hardware.",
    stack: ["PostGIS", "pg_tileserv", "MapLibre GL", "GDAL", "Supabase", "Next.js 14"],
    accent: "#1B2B4B",
    featured: true,
  },
  {
    slug: "resume-comparer",
    status: "beta" as const,
    category: "Document Intelligence",
    title: "Resume Comparer",
    desc: "pgvector HNSW cosine similarity on 1536-dim OpenAI embeddings. P95 under 50ms. Skill gap delta output.",
    stack: ["pgvector", "HNSW", "OpenAI ada-002", "Supabase Storage"],
    accent: "#E8660A",
    featured: false,
  },
  {
    slug: "document-qa",
    status: "soon" as const,
    category: "Document Intelligence",
    title: "AI Document QA",
    desc: "RAG pipeline — natural language interrogation of any document. Streaming answers with source citations.",
    stack: ["RAG", "pgvector", "Streaming", "LangChain"],
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
    <section className="section">
      <div className="container">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "flex-end", marginBottom: "3.5rem" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>Active Systems</div>
              <h2 className="display-2">Lab Applications</h2>
            </div>
            <p className="body-md" style={{ maxWidth: 380 }}>
              Production-grade AI tools — each independently deployable, auth-protected, and route-isolated behind Better Auth middleware and Supabase RLS.
            </p>
          </div>

          {/* Featured card */}
          <Link
            href={`/projects/${featured.slug}`}
            style={{ display: "block", textDecoration: "none", marginBottom: 14 }}
          >
            <div
              className="card"
              style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                overflow: "hidden", cursor: "pointer",
              }}
            >
              <div style={{ padding: "2.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
                  <span className="badge badge-live"><span className="badge-dot" /> Live</span>
                  <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{featured.category}</span>
                </div>
                <h3 className="display-3" style={{ marginBottom: "0.75rem" }}>{featured.title}</h3>
                <p className="body-sm" style={{ marginBottom: "1.5rem" }}>{featured.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: "1.75rem" }}>
                  {featured.stack.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <span className="btn-ghost">View project →</span>
              </div>

              {/* Visual */}
              <div style={{ background: "linear-gradient(135deg, #EDF2FF, #F0F8FF)", padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
                {[["Plot A-12", 82], ["Plot B-07", 67], ["Plot C-03", 91], ["Plot D-19", 44]].map(([label, val]) => (
                  <div key={String(label)} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className="mono" style={{ fontSize: 11, color: "var(--muted)", minWidth: 64 }}>{label}</span>
                    <div style={{ flex: 1, height: 5, background: "rgba(27,43,75,0.1)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${val}%`, background: "var(--navy)", borderRadius: 3 }} />
                    </div>
                    <span className="mono" style={{ fontSize: 12, fontWeight: 500, color: "var(--navy)", minWidth: 32, textAlign: "right" }}>{val}%</span>
                  </div>
                ))}
                <div className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}>Health scores · live PostGIS query · EPSG:4326</div>
              </div>
            </div>
          </Link>

          {/* Cards row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginBottom: 14 }}>
            {cards.map((p) => (
              <Link key={p.slug} href={p.status !== "soon" ? `/projects/${p.slug}` : "#"} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: "1.5rem", height: "100%", borderTop: `2px solid ${p.accent}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <span className="mono" style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.category}</span>
                    <span className={`badge badge-${p.status}`}>{p.status === "soon" ? "Coming soon" : p.status}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.2px" }}>{p.title}</h3>
                  <p className="body-sm" style={{ marginBottom: "1.25rem" }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {p.stack.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Custom builds banner */}
          <div style={{
            background: "var(--navy)", borderRadius: "var(--r-lg)",
            padding: "1.75rem 2rem", display: "flex",
            alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap",
          }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Building something specific?</div>
              <div className="mono" style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>We take a small number of custom AI engagements each quarter.</div>
            </div>
            <Link href="/contact" className="btn" style={{ background: "#fff", color: "var(--navy)", whiteSpace: "nowrap" }}>
              Get in touch →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
