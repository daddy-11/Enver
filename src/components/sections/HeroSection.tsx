"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const TYPEWRITER_LINES = [
  "PostGIS spatial intelligence — production.",
  "pgvector similarity at sub-50ms latency.",
  "Better Auth + Supabase. No vendor lock.",
  "Open stack. Auditable. Yours to own.",
];

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lineIndex, setLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Typewriter
  useEffect(() => {
    const currentLine = TYPEWRITER_LINES[lineIndex];
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => {
        setDisplayText(currentLine.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 32);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCharIndex(0);
        setDisplayText("");
        setLineIndex((i) => (i + 1) % TYPEWRITER_LINES.length);
      }, 2800);
      return () => clearTimeout(t);
    }
  }, [charIndex, lineIndex]);

  // Animated grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLS = 28;
    const ROWS = 16;

    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cellW = canvas.width / COLS;
      const cellH = canvas.height / ROWS;

      // Grid lines
      ctx.strokeStyle = "rgba(240,125,0,0.04)";
      ctx.lineWidth = 1;

      for (let col = 0; col <= COLS; col++) {
        ctx.beginPath();
        ctx.moveTo(col * cellW, 0);
        ctx.lineTo(col * cellW, canvas.height);
        ctx.stroke();
      }
      for (let row = 0; row <= ROWS; row++) {
        ctx.beginPath();
        ctx.moveTo(0, row * cellH);
        ctx.lineTo(canvas.width, row * cellH);
        ctx.stroke();
      }

      // Glowing nodes at intersections
      for (let col = 0; col <= COLS; col++) {
        for (let row = 0; row <= ROWS; row++) {
          const wave = Math.sin(t + col * 0.4 + row * 0.3);
          const alpha = (wave + 1) / 2;
          const size = alpha * 1.8;
          if (alpha > 0.55) {
            ctx.beginPath();
            ctx.arc(col * cellW, row * cellH, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(240,125,0,${alpha * 0.5})`;
            ctx.fill();
          }
        }
      }

      // Flowing data lines
      for (let i = 0; i < 4; i++) {
        const progress = ((t * 0.5 + i * 0.25) % 1);
        const x = progress * canvas.width;
        const y = (Math.sin(t + i * 1.2) * 0.2 + 0.5) * canvas.height;

        const grad = ctx.createLinearGradient(x - 120, 0, x + 120, 0);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.5, `rgba(240,125,0,0.12)`);
        grad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(x - 120, y);
        ctx.lineTo(x + 120, y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Scan line
      const scanY = (Math.sin(t * 0.3) * 0.5 + 0.5) * canvas.height;
      const scanGrad = ctx.createLinearGradient(0, scanY - 1, 0, scanY + 1);
      scanGrad.addColorStop(0, "transparent");
      scanGrad.addColorStop(0.5, "rgba(240,125,0,0.06)");
      scanGrad.addColorStop(1, "transparent");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, canvas.width, 120);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        background: "var(--void)",
      }}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Radial gradient focal point */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "55%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(240,125,0,0.07) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom vignette */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30%",
          background:
            "linear-gradient(to bottom, transparent, var(--void))",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 2rem 5rem",
          width: "100%",
        }}
      >
        {/* Lab badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "2.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(1rem)",
            transition: "opacity 0.6s, transform 0.6s",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 6px #22c55e",
              animation: "data-pulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#6b6b6b",
            }}
          >
            Systems Active — 3 services running
          </span>
        </div>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "var(--white)",
            maxWidth: "900px",
            marginBottom: "1.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(2rem)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}
        >
          Build
          <br />
          <span style={{ color: "var(--ember)" }}>spatial</span>
          <br />
          intelligence.
        </h1>

        {/* Typewriter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "3rem",
            minHeight: "1.5rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s 0.3s",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              letterSpacing: "0.02em",
              color: "#9b9b9b",
            }}
          >
            {displayText}
          </span>
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1rem",
              background: "var(--ember)",
              animation: "type-blink 1s step-end infinite",
            }}
          />
        </div>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(1.5rem)",
            transition: "opacity 0.6s 0.4s, transform 0.6s 0.4s",
          }}
        >
          <Link
            href="#apps"
            className="btn-primary"
          >
            Explore Applications
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/auth/signup"
            className="btn-ghost"
          >
            Request Access
          </Link>
        </div>

        {/* Bottom stats row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s 0.6s",
          }}
        >
          {[
            { value: "2", label: "Live Apps" },
            { value: "PostGIS", label: "Spatial Engine" },
            { value: "pgvector", label: "Similarity Index" },
            { value: "BetterAuth", label: "Auth Layer" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--ember)",
                  marginBottom: "0.25rem",
                  letterSpacing: "0.02em",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#3d3d3d",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
