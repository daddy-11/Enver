"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface AppCardProps {
  index: number;
  slug: string;
  status: "live" | "beta" | "wip";
  category: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  svgIllustration: React.ReactNode;
}

function AppCard({
  index,
  slug,
  status,
  category,
  title,
  subtitle,
  description,
  stack,
  metrics,
  accentColor,
  svgIllustration,
}: AppCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const statusColors: Record<string, string> = {
    live: "#22c55e",
    beta: "#f07d00",
    wip: "#6b6b6b",
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--graphite)",
        border: `1px solid ${hovered ? `${accentColor}30` : "rgba(255,255,255,0.06)"}`,
        borderRadius: "2px",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        transform: inView
          ? hovered ? "translateY(-4px)" : "translateY(0)"
          : `translateY(${20 + index * 8}px)`,
        opacity: inView ? 1 : 0,
        transitionProperty: "opacity, transform, border-color, box-shadow",
        transitionDuration: `0.6s, 0.6s, 0.3s, 0.3s`,
        transitionDelay: `${index * 0.15}s`,
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${accentColor}15` : "none",
      }}
    >
      {/* Illustration pane */}
      <div
        style={{
          height: "220px",
          background: "var(--carbon)",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 50% 80%, ${accentColor}12 0%, transparent 70%)`,
            transition: "opacity 0.3s",
            opacity: hovered ? 1.5 : 1,
          }}
        />
        {svgIllustration}

        {/* Status badge */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            padding: "0.25rem 0.5rem",
            background: "rgba(8,8,8,0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "1px",
          }}
        >
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: statusColors[status],
              boxShadow: `0 0 6px ${statusColors[status]}`,
              animation: status === "live" ? "data-pulse 2s ease-in-out infinite" : "none",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: statusColors[status],
            }}
          >
            {status}
          </span>
        </div>

        {/* Index number */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            color: "#2d2d2d",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Category */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: accentColor,
            marginBottom: "0.75rem",
          }}
        >
          {category}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.5rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--white)",
            marginBottom: "0.375rem",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "#6b6b6b",
            marginBottom: "1rem",
            letterSpacing: "0.02em",
          }}
        >
          {subtitle}
        </p>

        <p
          style={{
            fontSize: "0.82rem",
            lineHeight: 1.7,
            color: "#9b9b9b",
            marginBottom: "1.5rem",
            flex: 1,
          }}
        >
          {description}
        </p>

        {/* Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.75rem",
            marginBottom: "1.5rem",
            paddingTop: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {metrics.map((m) => (
            <div key={m.label}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: accentColor,
                  marginBottom: "0.2rem",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#3d3d3d",
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stack tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1.5rem" }}>
          {stack.map((tech) => (
            <span
              key={tech}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.2rem 0.5rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#6b6b6b",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderRadius: "1px",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/apps/${slug}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1rem",
            background: hovered ? `${accentColor}15` : "rgba(255,255,255,0.03)",
            border: `1px solid ${hovered ? `${accentColor}40` : "rgba(255,255,255,0.07)"}`,
            color: hovered ? accentColor : "#6b6b6b",
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "all 0.2s",
            borderRadius: "1px",
          }}
        >
          <span>Open Application</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}

// SVG Illustrations
function OrangeFarmIllustration() {
  return (
    <svg viewBox="0 0 360 180" width="360" height="180" xmlns="http://www.w3.org/2000/svg" style={{ position: "relative", zIndex: 1 }}>
      {/* Grid base */}
      <defs>
        <pattern id="geo-grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0L0 0 0 30" fill="none" stroke="rgba(0,229,204,0.08)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="360" height="180" fill="url(#geo-grid)" />

      {/* Terrain contours */}
      <ellipse cx="180" cy="110" rx="140" ry="55" fill="none" stroke="rgba(0,229,204,0.12)" strokeWidth="1"/>
      <ellipse cx="180" cy="110" rx="100" ry="38" fill="none" stroke="rgba(0,229,204,0.18)" strokeWidth="1"/>
      <ellipse cx="180" cy="110" rx="60" ry="22" fill="none" stroke="rgba(0,229,204,0.25)" strokeWidth="1"/>

      {/* Orange tree dots (geospatial points) */}
      {[
        [90,85],[120,78],[150,72],[180,70],[210,72],[240,78],[270,85],
        [105,100],[135,93],[165,88],[195,88],[225,93],[255,100],
        [120,115],[150,108],[180,105],[210,108],[240,115],
        [135,128],[165,122],[195,122],[225,128],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5" fill="rgba(240,125,0,0.15)" stroke="rgba(240,125,0,0.5)" strokeWidth="0.8"/>
          <circle cx={cx} cy={cy} r="2" fill="#f07d00" opacity="0.9"/>
        </g>
      ))}

      {/* Tile boundary */}
      <rect x="130" y="62" width="100" height="80" fill="none" stroke="rgba(0,229,204,0.35)" strokeWidth="1" strokeDasharray="4 3"/>

      {/* Coordinate labels */}
      <text x="132" y="58" fontFamily="monospace" fontSize="7" fill="rgba(0,229,204,0.5)">24.8201°N</text>
      <text x="230" y="148" fontFamily="monospace" fontSize="7" fill="rgba(0,229,204,0.5)">46.6712°E</text>

      {/* Data ping */}
      <circle cx="180" cy="105" r="12" fill="none" stroke="rgba(0,229,204,0.2)" strokeWidth="1">
        <animate attributeName="r" values="6;18;6" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="180" cy="105" r="3" fill="#00e5cc" opacity="0.9"/>
    </svg>
  );
}

function ResumeComparerIllustration() {
  return (
    <svg viewBox="0 0 360 180" width="360" height="180" xmlns="http://www.w3.org/2000/svg" style={{ position: "relative", zIndex: 1 }}>
      {/* Background grid */}
      <defs>
        <pattern id="doc-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0L0 0 0 20" fill="none" stroke="rgba(212,255,74,0.05)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="360" height="180" fill="url(#doc-grid)" />

      {/* PDF document card A */}
      <rect x="40" y="30" width="90" height="120" rx="2" fill="rgba(26,26,26,0.8)" stroke="rgba(212,255,74,0.2)" strokeWidth="1"/>
      <rect x="52" y="50" width="66" height="4" rx="1" fill="rgba(212,255,74,0.3)"/>
      <rect x="52" y="62" width="50" height="3" rx="1" fill="rgba(255,255,255,0.1)"/>
      <rect x="52" y="72" width="58" height="3" rx="1" fill="rgba(255,255,255,0.08)"/>
      <rect x="52" y="82" width="44" height="3" rx="1" fill="rgba(255,255,255,0.06)"/>
      <rect x="52" y="98" width="66" height="3" rx="1" fill="rgba(255,255,255,0.1)"/>
      <rect x="52" y="108" width="52" height="3" rx="1" fill="rgba(255,255,255,0.07)"/>
      <rect x="52" y="118" width="60" height="3" rx="1" fill="rgba(255,255,255,0.06)"/>
      <text x="52" y="44" fontFamily="monospace" fontSize="7" fill="rgba(212,255,74,0.6)">resume_a.pdf</text>

      {/* PDF document card B */}
      <rect x="230" y="30" width="90" height="120" rx="2" fill="rgba(26,26,26,0.8)" stroke="rgba(212,255,74,0.2)" strokeWidth="1"/>
      <rect x="242" y="50" width="66" height="4" rx="1" fill="rgba(212,255,74,0.3)"/>
      <rect x="242" y="62" width="56" height="3" rx="1" fill="rgba(255,255,255,0.1)"/>
      <rect x="242" y="72" width="48" height="3" rx="1" fill="rgba(255,255,255,0.08)"/>
      <rect x="242" y="82" width="62" height="3" rx="1" fill="rgba(255,255,255,0.06)"/>
      <rect x="242" y="98" width="54" height="3" rx="1" fill="rgba(255,255,255,0.1)"/>
      <rect x="242" y="108" width="66" height="3" rx="1" fill="rgba(255,255,255,0.07)"/>
      <rect x="242" y="118" width="46" height="3" rx="1" fill="rgba(255,255,255,0.06)"/>
      <text x="242" y="44" fontFamily="monospace" fontSize="7" fill="rgba(212,255,74,0.6)">resume_b.pdf</text>

      {/* Center: similarity score */}
      <circle cx="180" cy="90" r="32" fill="rgba(15,15,15,0.9)" stroke="rgba(212,255,74,0.3)" strokeWidth="1.5"/>
      <text x="180" y="85" textAnchor="middle" fontFamily="monospace" fontSize="18" fontWeight="bold" fill="#d4ff4a">87%</text>
      <text x="180" y="97" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(212,255,74,0.5)">similarity</text>

      {/* Connection lines */}
      <line x1="132" y1="90" x2="148" y2="90" stroke="rgba(212,255,74,0.2)" strokeWidth="1" strokeDasharray="3 2"/>
      <line x1="212" y1="90" x2="228" y2="90" stroke="rgba(212,255,74,0.2)" strokeWidth="1" strokeDasharray="3 2"/>

      {/* Vector dots */}
      {[0,1,2,3,4].map((i) => (
        <circle key={i} cx={155 + i * 6} cy={90} r="1.5" fill="rgba(212,255,74,0.5)" opacity={0.4 + i * 0.12}/>
      ))}

      {/* pgvector label */}
      <text x="180" y="155" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(212,255,74,0.3)">pgvector · cosine similarity</text>
    </svg>
  );
}

export function AppsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTitleVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const apps: AppCardProps[] = [
    {
      index: 0,
      slug: "orange-farm",
      status: "live",
      category: "Geospatial Intelligence",
      title: "Orange Farm\nMapper",
      subtitle: "Supabase + PostGIS tile engine",
      description:
        "Tile-based geospatial platform for agricultural monitoring. Ingests drone imagery and GPS waypoints, serves vector tiles through PostGIS, renders choropleth and cluster overlays client-side. Built for field operators running edge hardware.",
      stack: ["PostGIS", "Supabase", "MapLibre", "Next.js", "GDAL", "pg_tileserv"],
      metrics: [
        { value: "PostGIS", label: "Spatial DB" },
        { value: "MVT", label: "Tile Format" },
        { value: "EPSG:4326", label: "Projection" },
      ],
      accentColor: "#00e5cc",
      svgIllustration: <OrangeFarmIllustration />,
    },
    {
      index: 1,
      slug: "resume-comparer",
      status: "beta",
      category: "Document Intelligence",
      title: "Resume\nComparer",
      subtitle: "pgvector cosine similarity engine",
      description:
        "Upload PDFs to Supabase Storage, embed text chunks with OpenAI ada-002, run cosine similarity across the pgvector index. Returns ranked match scores, skill gap deltas, and structured diff output. Sub-50ms P95 on cold queries.",
      stack: ["pgvector", "Supabase Storage", "OpenAI", "Next.js", "Drizzle", "pdfjs"],
      metrics: [
        { value: "<50ms", label: "P95 Query" },
        { value: "1536-d", label: "Vector Dim" },
        { value: "HNSW", label: "Index Type" },
      ],
      accentColor: "#d4ff4a",
      svgIllustration: <ResumeComparerIllustration />,
    },
  ];

  return (
    <section
      id="apps"
      style={{
        background: "var(--carbon)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "7rem 2rem",
        position: "relative",
      }}
    >
      {/* Subtle background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(240,125,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(240,125,0,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Section header */}
        <div
          ref={titleRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "flex-end",
            marginBottom: "4rem",
            gap: "2rem",
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(1.5rem)",
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
              — Active Systems
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
              Lab Applications
            </h2>
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "#3d3d3d",
              textAlign: "right",
              lineHeight: 1.8,
            }}
          >
            <div>2 apps deployed</div>
            <div>Authentication gated</div>
          </div>
        </div>

        {/* App cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {apps.map((app) => (
            <AppCard key={app.slug} {...app} />
          ))}
        </div>
      </div>
    </section>
  );
}
