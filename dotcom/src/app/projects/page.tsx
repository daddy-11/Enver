import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Projects",
  description: "Live AI products built by Enver AI Tech.",
};

export default function ProjectsPage() {
  const projects = [
    {
      slug: "kariman",
      status: "live" as string,
      category: "Emergency Logistics",
      title: "Kariman",
      desc: "Agentic medical response routing. Instantly verify and deploy doctors to emergency zones.",
      longDesc: "Built for high-stakes emergency scenarios. Kariman uses agentic AI to instantly locate, verify, and route available medical professionals and required manpower to critical zones, optimizing response times when seconds matter.",
      stack: ["Agentic AI", "Real-time Routing", "Postgres", "Supabase", "Next.js 14"],
      metrics: [
        { label: "Deployment", value: "Real-time" },
        { label: "Architecture", value: "Agentic" },
        { label: "Auth", value: "Better Auth + RLS" },
      ],
      accentColor: "#E8660A",
      demoAvailable: true,
    },
    {
      slug: "atrea",
      status: "live" as string,
      category: "Recruitment Intelligence",
      title: "Atrea",
      desc: "Elite engineering hiring portal. AI deeply analyzes GitHub repos and system design capability.",
      longDesc: "Atrea transcends keyword matching. It deploys AI agents to deeply analyze GitHub repositories, technical blogs, and system design capability, ensuring perfect synergy between elite engineering talent and cutting-edge tech companies.",
      stack: ["pgvector", "HNSW", "OpenAI ada-002", "Agentic Matchmaking"],
      metrics: [
        { label: "Vector dimensions", value: "1536" },
        { label: "Index type", value: "HNSW (m=16, ef=64)" },
        { label: "Distance metric", value: "cosine (<=>) " },
        { label: "P95 latency", value: "<50ms cold" },
      ],
      accentColor: "#1B2B4B",
      demoAvailable: true,
    },
    {
      slug: "document-qa",
      status: "soon" as string,
      category: "Document Intelligence",
      title: "AI Document QA",
      desc: "Natural language interrogation of any uploaded document. RAG pipeline with pgvector retrieval, streaming answers, and inline source citations.",
      longDesc: "Drop in any PDF, Word document, or plain text file. The system chunks, embeds, and indexes content, then answers questions against it — streaming tokens back with citations pinned to exact passages.",
      stack: ["RAG", "pgvector", "LangChain", "Streaming", "Supabase Storage"],
      metrics: [],
      accentColor: "#3A9A3C",
      demoAvailable: false,
    },
  ];

  return (
    <>
      <Navigation />
      <main className="bg-[var(--bg)] font-sans">
        <section style={{ padding: "5rem 0 3rem", borderBottom: "0.5px solid var(--border)" }}>
          <div className="container max-w-6xl mx-auto px-4">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
              <span style={{ width: 20, height: 1.5, background: "var(--orange)", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--orange)" }}>Active Systems</span>
            </div>
            <div className="projects-header-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "flex-end" }}>
              <h1 style={{ fontFamily: "var(--font)", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.05, color: "var(--navy)" }}>
                Lab Applications
              </h1>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.75 }}>
                Production-grade AI tools — each independently deployable, auth-protected, and route-isolated. Public demos available. Full access requires an account.
              </p>
            </div>
          </div>
        </section>

        <section style={{ padding: "4rem 0 6rem" }}>
          <div className="container max-w-6xl mx-auto px-4" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {projects.map((p, idx) => (
              <article key={p.slug} style={{ background: "white", border: "0.5px solid var(--border)", borderRadius: "var(--r-xl)", overflow: "hidden", boxShadow: "0 8px 30px rgb(0,0,0,0.04)" }}>
                <div style={{ height: 4, background: p.accentColor }} />
                <div className="project-card-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <div style={{ padding: "2.5rem", borderRight: "0.5px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--muted)" }}>
                        {String(idx + 1).padStart(2, "0")} / 0{projects.length}
                      </span>
                      <span style={{ width: 1, height: 12, background: "var(--border)" }} />
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, padding: "3px 10px", borderRadius: 100, background: p.status === "live" ? "rgba(34,197,94,0.1)" : p.status === "beta" ? "rgba(234,179,8,0.12)" : "rgba(0,0,0,0.05)", color: p.status === "live" ? "#15803d" : p.status === "beta" ? "#a16207" : "#6B7280", fontWeight: "bold" }}>
                        {p.status === "soon" ? "Coming soon" : p.status.toUpperCase()}
                      </span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", fontWeight: "bold" }}>{p.category}</span>
                    </div>
                    <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.1, marginBottom: "0.75rem", color: "var(--navy)" }}>{p.title}</h2>
                    <p style={{ fontSize: 15, color: "var(--navy)", fontWeight: "bold", lineHeight: 1.75, marginBottom: "0.875rem" }}>{p.desc}</p>
                    <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.75rem" }}>{p.longDesc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "2rem" }}>
                      {p.stack.map((t) => <span key={t} style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: "bold", padding: "4px 12px", borderRadius: 100, background: "var(--surface-2)", color: "var(--navy)" }}>{t}</span>)}
                    </div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {p.demoAvailable && p.status !== "soon" && (
                        <Link href={`/apps/${p.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 20px", borderRadius: "var(--r-md)", background: p.accentColor, color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                          Try live demo →
                        </Link>
                      )}
                      <Link href="mailto:daddy@enveraitech.com" style={{ display: "inline-flex", alignItems: "center", padding: "9px 20px", borderRadius: "var(--r-md)", background: "transparent", color: "var(--navy)", border: "1px solid var(--navy)", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                        {p.status === "soon" ? "Get notified" : "Request full access"}
                      </Link>
                    </div>
                  </div>
                  <div style={{ padding: "2.5rem", background: "var(--surface-2)" }}>
                    {p.metrics.length > 0 && (
                      <>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--navy)", marginBottom: "1.25rem" }}>Technical specs</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
                          {p.metrics.map((m) => (
                            <div key={m.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "white", border: "1px solid var(--border)", borderRadius: "var(--r-md)", boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }}>
                              <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: "bold", color: "var(--muted)" }}>{m.label}</span>
                              <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 800, color: "var(--navy)" }}>{m.value}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    
                    {p.slug === "atrea" && (
                      <div style={{ padding: "1.25rem", background: "white", border: "1px solid var(--border)", borderRadius: "var(--r-md)", display: "flex", justifyContent: "center", gap: "2.5rem", boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-1px", color: p.accentColor }}>98%</div>
                          <div style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: "bold", color: "var(--muted)" }}>synergy match</div>
                        </div>
                        <div style={{ width: 1, background: "var(--border)", alignSelf: "stretch" }} />
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-1px", color: "var(--navy)" }}>12</div>
                          <div style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: "bold", color: "var(--muted)" }}>repos analyzed</div>
                        </div>
                      </div>
                    )}
                    {p.slug === "kariman" && (
                      <div style={{ padding: "1.25rem", background: "white", border: "1px solid var(--border)", borderRadius: "var(--r-md)", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1rem", boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }}>
                        <div className="flex flex-col gap-2 w-full">
                           <div className="flex justify-between items-center bg-[var(--surface-2)] p-2 rounded text-xs font-mono font-bold">
                             <span className="text-[var(--navy)]">System Status</span>
                             <span className="text-green-600">Online</span>
                           </div>
                           <div className="flex justify-between items-center bg-[var(--surface-2)] p-2 rounded text-xs font-mono font-bold">
                             <span className="text-[var(--navy)]">Active Agents</span>
                             <span className="text-[var(--orange)]">43</span>
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}

            <div style={{ background: "var(--navy)", borderRadius: "var(--r-xl)", padding: "2.5rem 3rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap", boxShadow: "0 10px 40px rgba(27,43,75,0.15)" }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: "0.5rem" }}>Need something custom?</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 14, color: "rgba(255,255,255,0.7)", fontWeight: "bold" }}>We design and ship bespoke AI products — scoping to production in 3–6 weeks.</div>
              </div>
              <Link href="mailto:daddy@enveraitech.com" style={{ display: "inline-flex", padding: "14px 28px", background: "#fff", color: "var(--navy)", borderRadius: "var(--r-md)", fontWeight: 800, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" }}>
                Start a project →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
