import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Comparer",
};

export default async function ResumeComparerPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login?redirect=/apps/resume-comparer");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--void)",
        padding: "5rem 2rem 4rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#d4ff4a",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#d4ff4a",
                boxShadow: "0 0 6px #d4ff4a",
                animation: "data-pulse 2s ease-in-out infinite",
              }}
            />
            Document Intelligence · pgvector
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "2.25rem",
              letterSpacing: "-0.03em",
              color: "var(--white)",
              marginBottom: "0.5rem",
            }}
          >
            Resume Comparer
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              color: "#6b6b6b",
              maxWidth: "520px",
            }}
          >
            Upload two PDFs to Supabase Storage. Text extracted via pdfjs,
            chunked and embedded with OpenAI ada-002, similarity scored via
            pgvector cosine distance. HNSW index, P95 &lt;50ms.
          </p>
        </div>

        {/* Upload interface */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "1.5rem",
            alignItems: "start",
            marginBottom: "2rem",
          }}
        >
          {/* Resume A */}
          <UploadSlot label="Resume A" accent="#d4ff4a" />

          {/* VS divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "3rem",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "#3d3d3d",
                letterSpacing: "0.08em",
              }}
            >
              vs
            </div>
          </div>

          {/* Resume B */}
          <UploadSlot label="Resume B" accent="#d4ff4a" />
        </div>

        {/* Compare button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
          <button
            style={{
              padding: "0.875rem 3rem",
              background: "#d4ff4a",
              color: "#080808",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              borderRadius: "1px",
            }}
          >
            Run Similarity Analysis →
          </button>
        </div>

        {/* Results placeholder */}
        <div
          style={{
            padding: "2rem",
            background: "var(--graphite)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "2px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#3d3d3d",
              marginBottom: "1rem",
            }}
          >
            Similarity Results
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "4rem",
                  letterSpacing: "-0.04em",
                  color: "#d4ff4a",
                  lineHeight: 1,
                }}
              >
                —
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#3d3d3d",
                  marginTop: "0.5rem",
                }}
              >
                Cosine Similarity
              </div>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "#3d3d3d",
                lineHeight: 1.8,
              }}
            >
              Upload two resumes and run the analysis to see skill gap deltas,
              semantic similarity scores per section, and a structured JSON diff
              output.
            </div>
          </div>
        </div>

        {/* Tech details */}
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          {["pgvector HNSW", "OpenAI ada-002", "Supabase Storage", "pdfjs-dist", "1536-dim vectors", "cosine distance"].map((tag) => (
            <span
              key={tag}
              style={{
                padding: "0.25rem 0.625rem",
                background: "rgba(212,255,74,0.05)",
                border: "1px solid rgba(212,255,74,0.12)",
                color: "#6b6b6b",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderRadius: "1px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function UploadSlot({ label, accent }: { label: string; accent: string }) {
  return (
    <div
      style={{
        padding: "1.5rem",
        background: "var(--graphite)",
        border: `1px solid rgba(255,255,255,0.06)`,
        borderRadius: "2px",
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: accent,
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          border: `1px dashed ${accent}30`,
          borderRadius: "1px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          gap: "0.75rem",
          cursor: "pointer",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 16V8M12 8L9 11M12 8L15 11" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke={accent} strokeWidth="1" opacity="0.2"/>
        </svg>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "#3d3d3d",
            textAlign: "center",
          }}
        >
          Drop PDF or click to upload
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "#2d2d2d",
          }}
        >
          → Supabase Storage
        </p>
      </div>
    </div>
  );
}
