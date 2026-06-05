"use client";

import React, { useEffect, useRef, useState } from "react";

interface StackLayer {
  label: string;
  color: string;
  items: { name: string; role: string; version?: string }[];
}

const STACK: StackLayer[] = [
  {
    label: "Frontend",
    color: "#f07d00",
    items: [
      { name: "Next.js 14", role: "App Router + RSC", version: "14.x" },
      { name: "TypeScript", role: "Strict mode", version: "5.5" },
      { name: "Tailwind CSS", role: "Design system", version: "3.4" },
      { name: "Framer Motion", role: "Animations", version: "11.x" },
    ],
  },
  {
    label: "Auth Layer",
    color: "#d4ff4a",
    items: [
      { name: "Better Auth", role: "Session management", version: "1.x" },
      { name: "Drizzle ORM", role: "Schema + migrations", version: "0.33" },
      { name: "Middleware", role: "Route protection" },
    ],
  },
  {
    label: "Data Layer",
    color: "#00e5cc",
    items: [
      { name: "Supabase", role: "Postgres + Storage + Realtime" },
      { name: "PostGIS", role: "Spatial types + tile ops" },
      { name: "pgvector", role: "1536-dim HNSW index" },
      { name: "pg_tileserv", role: "MVT tile serving" },
    ],
  },
  {
    label: "Infrastructure",
    color: "#9b9b9b",
    items: [
      { name: "Vercel", role: "Edge deployment" },
      { name: "Supabase Edge", role: "Functions + RLS" },
      { name: "GDAL", role: "Raster/vector pipeline" },
    ],
  },
];

function StackLayerRow({ layer, idx }: { layer: StackLayer; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "160px 1fr",
        gap: "2rem",
        padding: "2rem 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-2rem)",
        transition: `opacity 0.6s ${idx * 0.1}s, transform 0.6s ${idx * 0.1}s`,
      }}
    >
      {/* Layer label */}
      <div style={{ paddingTop: "0.25rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              width: "2px",
              height: "16px",
              background: layer.color,
              borderRadius: "1px",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: layer.color,
            }}
          >
            {layer.label}
          </span>
        </div>
      </div>

      {/* Items */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        {layer.items.map((item) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
              padding: "0.75rem 1rem",
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "2px",
              minWidth: "160px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Accent top border */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: layer.color,
                opacity: 0.3,
              }}
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--chalk)",
                }}
              >
                {item.name}
              </span>
              {item.version && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    color: "#3d3d3d",
                  }}
                >
                  v{item.version}
                </span>
              )}
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "#6b6b6b",
                letterSpacing: "0.04em",
              }}
            >
              {item.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StackSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="stack"
      style={{
        background: "var(--void)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "7rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          ref={headerRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            marginBottom: "4rem",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(1.5rem)",
            transition: "opacity 0.6s, transform 0.6s",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#3d3d3d",
                marginBottom: "1rem",
              }}
            >
              — System Architecture
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "var(--white)",
              }}
            >
              Full stack.
              <br />
              No abstraction.
            </h2>
          </div>
          <div>
            <p
              style={{
                fontSize: "0.88rem",
                lineHeight: 1.8,
                color: "#6b6b6b",
                maxWidth: "420px",
              }}
            >
              Every layer is a deliberate choice. Supabase handles the data
              plane — Postgres extensions, edge functions, object storage. Better
              Auth owns the session lifecycle. Next.js App Router handles
              rendering boundaries. The stack is auditable end-to-end.
            </p>
          </div>
        </div>

        {/* Stack layers */}
        <div>
          {STACK.map((layer, idx) => (
            <StackLayerRow key={layer.label} layer={layer} idx={idx} />
          ))}
        </div>

        {/* Database schema preview */}
        <div
          style={{
            marginTop: "4rem",
            padding: "2rem",
            background: "var(--carbon)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "2px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            lineHeight: 1.8,
            color: "#6b6b6b",
            overflowX: "auto",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#3d3d3d",
              marginBottom: "1rem",
            }}
          >
            schema preview · supabase/postgresql
          </div>
          <pre style={{ margin: 0 }}>
            <span style={{ color: "#3d3d3d" }}>-- Geospatial: Orange Farm</span>{"\n"}
            <span style={{ color: "#00e5cc" }}>CREATE TABLE</span>
            <span style={{ color: "#9b9b9b" }}> farm_plots (</span>{"\n"}
            {"  "}
            <span style={{ color: "#f07d00" }}>id</span>
            <span style={{ color: "#6b6b6b" }}>          uuid PRIMARY KEY DEFAULT gen_random_uuid(),</span>{"\n"}
            {"  "}
            <span style={{ color: "#f07d00" }}>geometry</span>
            <span style={{ color: "#6b6b6b" }}>    geography(POLYGON, 4326) NOT NULL,</span>{"\n"}
            {"  "}
            <span style={{ color: "#f07d00" }}>tree_count</span>
            <span style={{ color: "#6b6b6b" }}>  integer,</span>{"\n"}
            {"  "}
            <span style={{ color: "#f07d00" }}>health_score</span>
            <span style={{ color: "#6b6b6b" }}> numeric(4,2),</span>{"\n"}
            {"  "}
            <span style={{ color: "#f07d00" }}>metadata</span>
            <span style={{ color: "#6b6b6b" }}>    jsonb,</span>{"\n"}
            {"  "}
            <span style={{ color: "#f07d00" }}>user_id</span>
            <span style={{ color: "#6b6b6b" }}>     uuid REFERENCES users(id) ON DELETE CASCADE</span>{"\n"}
            <span style={{ color: "#9b9b9b" }}>);</span>{"\n"}
            <span style={{ color: "#00e5cc" }}>CREATE INDEX</span>
            <span style={{ color: "#6b6b6b" }}> ON farm_plots USING gist(geometry);</span>{"\n\n"}
            <span style={{ color: "#3d3d3d" }}>-- Vector: Resume embeddings</span>{"\n"}
            <span style={{ color: "#00e5cc" }}>CREATE TABLE</span>
            <span style={{ color: "#9b9b9b" }}> resume_chunks (</span>{"\n"}
            {"  "}
            <span style={{ color: "#f07d00" }}>id</span>
            <span style={{ color: "#6b6b6b" }}>        uuid PRIMARY KEY DEFAULT gen_random_uuid(),</span>{"\n"}
            {"  "}
            <span style={{ color: "#f07d00" }}>resume_id</span>
            <span style={{ color: "#6b6b6b" }}>  uuid REFERENCES resumes(id),</span>{"\n"}
            {"  "}
            <span style={{ color: "#f07d00" }}>content</span>
            <span style={{ color: "#6b6b6b" }}>    text NOT NULL,</span>{"\n"}
            {"  "}
            <span style={{ color: "#f07d00" }}>embedding</span>
            <span style={{ color: "#6b6b6b" }}>  vector(1536),</span>{"\n"}
            {"  "}
            <span style={{ color: "#f07d00" }}>chunk_idx</span>
            <span style={{ color: "#6b6b6b" }}>  integer</span>{"\n"}
            <span style={{ color: "#9b9b9b" }}>);</span>{"\n"}
            <span style={{ color: "#00e5cc" }}>CREATE INDEX</span>
            <span style={{ color: "#6b6b6b" }}> ON resume_chunks USING hnsw (embedding vector_cosine_ops);</span>
          </pre>
        </div>
      </div>
    </section>
  );
}
