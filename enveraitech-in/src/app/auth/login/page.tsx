"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { signInWithGoogle } from "@/lib/auth/auth-client";

function LoginPanel() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle(redirect);
      // On success Better Auth redirects to Google; control leaves the page.
    } catch {
      setError("Could not start Google sign-in. Try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#52525b",
            marginBottom: "0.75rem",
          }}
        >
          — enveraitech.in · sanctuary
        </p>
        <h1
          style={{
            fontFamily: "var(--font)",
            fontWeight: 800,
            fontSize: "2rem",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: "#fff",
            marginBottom: "0.5rem",
          }}
        >
          Team access
        </h1>
        <p style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "#a1a1aa" }}>
          Sign in with your enveraitech.com Workspace account.
        </p>
      </div>

      {error && (
        <div
          style={{
            padding: "0.75rem 1rem",
            background: "rgba(255,59,59,0.08)",
            border: "1px solid rgba(255,59,59,0.25)",
            borderRadius: "6px",
            fontFamily: "var(--mono)",
            fontSize: "0.72rem",
            color: "#ff6b6b",
            marginBottom: "1rem",
          }}
        >
          {error}
        </div>
      )}

      <button
        onClick={handleGoogle}
        disabled={loading}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "0.9rem 1.5rem",
          background: loading ? "#27272a" : "#fff",
          color: "#18181b",
          fontFamily: "var(--mono)",
          fontSize: "0.78rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "box-shadow 0.15s",
        }}
        onMouseEnter={(e) => {
          if (!loading) (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(255,255,255,0.18)";
        }}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
      >
        <GoogleMark />
        {loading ? "Connecting tether…" : "Continue with Google"}
      </button>

      <p
        style={{
          marginTop: "1.5rem",
          fontFamily: "var(--mono)",
          fontSize: "0.66rem",
          color: "#52525b",
          lineHeight: 1.6,
        }}
      >
        Access is restricted to the enveraitech.in team allowlist. Accounts outside the team are
        rejected automatically.
      </p>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ fontFamily: "var(--mono)", fontSize: "0.85rem", color: "#6b6b6b" }}>
          Initializing tether…
        </div>
      }
    >
      <LoginPanel />
    </Suspense>
  );
}
