"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

const METRICS = [
  { value: "3+",    label: "Live products"  },
  { value: "<50ms", label: "P95 latency"    },
  { value: "RLS",   label: "DB isolation"   },
  { value: "100%",  label: "Auth-gated"     },
];

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.003;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const CELL = 60;
      ctx.strokeStyle = "rgba(27,43,75,0.055)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += CELL) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y <= H; y += CELL) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Glowing intersection nodes
      for (let cx = 0; cx <= W; cx += CELL) {
        for (let cy = 0; cy <= H; cy += CELL) {
          const wave = (Math.sin(t + cx * 0.05 + cy * 0.04) + 1) / 2;
          if (wave > 0.6) {
            const r = wave * 1.8;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(27,43,75,${wave * 0.35})`;
            ctx.fill();
          }
        }
      }

      // Flowing accent lines
      [[0.3, "#E8660A"], [0.6, "#1B2B4B"], [0.8, "#3A9A3C"]].forEach(
        ([yRatio, color], i) => {
          const y = (Number(yRatio) + Math.sin(t * 0.5 + i) * 0.05) * H;
          const progress = ((t * 0.35 + i * 0.33) % 1) * (W + 200) - 100;
          const grad = ctx.createLinearGradient(progress - 120, 0, progress + 120, 0);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.5, `${color}20`);
          grad.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.moveTo(progress - 120, y);
          ctx.lineTo(progress + 120, y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      );

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section
      style={{
        minHeight: "91vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "25%", right: "15%",
        width: 560, height: 560, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(27,43,75,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "10%",
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(232,102,10,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "28%",
        background: "linear-gradient(to bottom, transparent, var(--bg))",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "5rem" }}>
        {/* Live badge */}
        <div
          className="badge badge-live"
          style={{ marginBottom: "2rem", animation: "fadeUp 0.5s var(--ease) both" }}
        >
          <span className="badge-dot" />
          3 systems live · enver-ai.tech
        </div>

        {/* Headline */}
        <h1
          className="display-1"
          style={{ marginBottom: "1.5rem", animation: "fadeUp 0.6s 0.06s var(--ease) both", maxWidth: 780 }}
        >
          Build with<br />
          <span style={{ color: "var(--orange)" }}>spatial</span>{" "}
          <span style={{ color: "var(--navy)" }}>intelligence.</span>
        </h1>

        {/* Sub */}
        <p
          className="body-lg"
          style={{ maxWidth: 520, marginBottom: "2.5rem", animation: "fadeUp 0.6s 0.12s var(--ease) both" }}
        >
          Independent AI lab shipping production-grade tools for real-world use — geospatial analysis, document intelligence, and applied ML. No demos. No vaporware.
        </p>

        {/* CTAs */}
        <div
          style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "4rem", animation: "fadeUp 0.6s 0.18s var(--ease) both" }}
        >
          <Link href="/projects" className="btn btn-primary btn-lg">
            View live projects
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/contact" className="btn btn-secondary btn-lg">Get early access</Link>
        </div>

        {/* Metrics */}
        <div
          style={{
            display: "flex", gap: "3rem", flexWrap: "wrap",
            paddingTop: "2rem", borderTop: "0.5px solid var(--border)",
            animation: "fadeUp 0.6s 0.24s var(--ease) both",
          }}
        >
          {METRICS.map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 3, color: "var(--navy)" }}>
                {value}
              </div>
              <div className="mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
