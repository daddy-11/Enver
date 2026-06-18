import type { Metadata } from "next";

export const metadata: Metadata = { title: "Team access" };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#08080a",
        color: "#f4f4f5",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font)",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(232,102,10,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,102,10,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />
      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "500px",
          height: "500px",
          background: "radial-gradient(ellipse at bottom right, rgba(232,102,10,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <header
        style={{
          padding: "1.25rem 2rem",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <div
          style={{
            width: "26px",
            height: "26px",
            background: "linear-gradient(135deg, #1b2b4b 0%, #e8660a 100%)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "13px",
            color: "#fff",
          }}
        >
          E
        </div>
        <span style={{ fontWeight: 800, fontSize: "0.85rem", letterSpacing: "-0.01em" }}>
          enveraitech.in
        </span>
      </header>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 2rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        {children}
      </div>
    </div>
  );
}
