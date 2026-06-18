import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Enver AI Tech official logo — isometric cube, navy/orange/green stripe.
 * SVG reconstructed from brand asset.
 */
export function Logo({ size = 32, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Enver AI Tech logo"
      role="img"
    >
      {/* Left face — navy/orange/green horizontal stripes */}
      <polygon points="8,26 40,8 40,26 8,44"   fill="#1B2B4B" />
      <polygon points="8,44 40,26 40,38 8,56"   fill="#E8660A" />
      <polygon points="8,56 40,38 40,50 8,68"   fill="#3A9A3C" />

      {/* Top face — navy */}
      <polygon points="40,8 72,26 40,44 8,26"   fill="#1B2B4B" opacity="0.75" />

      {/* Right face — navy, darker */}
      <polygon points="72,26 72,62 40,80 40,44" fill="#1B2B4B" opacity="0.45" />

      {/* Edge highlights for depth */}
      <polyline points="8,26 40,8 72,26" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" fill="none" />
      <line x1="40" y1="8"  x2="40" y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
    </svg>
  );
}

/** Wordmark: logo + text */
export function Wordmark({ size = 28 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
      <Logo size={size} />
      <span
        style={{
          fontFamily: "var(--font)",
          fontWeight: 700,
          fontSize: Math.round(size * 0.54) + "px",
          letterSpacing: "-0.3px",
          color: "var(--text)",
          lineHeight: 1,
        }}
      >
        Enver AI Tech
      </span>
    </span>
  );
}
