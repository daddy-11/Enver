"use client";
import React from "react";

const ITEMS = [
  "Next.js 14 App Router", "TypeScript Strict Mode", "Supabase PostgreSQL",
  "PostGIS Geography Types", "pgvector HNSW Index", "Better Auth Sessions",
  "Drizzle ORM", "Tailwind CSS", "MapLibre GL", "Vercel Edge Network",
  "Row-Level Security", "OpenAI Embeddings", "Upstash Rate Limiting",
  "Zod Validation", "CSRF Protection", "DDoS Mitigation",
];

export function MarqueeBar() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div style={{
      overflow: "hidden", borderTop: "0.5px solid var(--border)",
      borderBottom: "0.5px solid var(--border)", background: "var(--surface)",
      padding: "14px 0",
    }}>
      <div style={{ display: "flex", gap: "3rem", whiteSpace: "nowrap", animation: "marquee 32s linear infinite" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--orange)", flexShrink: 0 }} />
            <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
