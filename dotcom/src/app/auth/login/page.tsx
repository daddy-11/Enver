"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth/auth-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: authError } = await signIn.email({
        email,
        password,
        callbackURL: redirect,
      });

      if (authError) {
        setError(authError.message ?? "Authentication failed.");
      } else {
        router.push(redirect);
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#3d3d3d",
            marginBottom: "0.75rem",
          }}
        >
          — Authenticate
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "2rem",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: "var(--white)",
            marginBottom: "0.5rem",
          }}
        >
          Log in
        </h1>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "#6b6b6b",
          }}
        >
          Access your lab environment.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Error */}
        {error && (
          <div
            style={{
              padding: "0.75rem 1rem",
              background: "rgba(255,59,59,0.08)",
              border: "1px solid rgba(255,59,59,0.25)",
              borderRadius: "1px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "#ff3b3b",
              letterSpacing: "0.02em",
            }}
          >
            {error}
          </div>
        )}

        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6b6b6b",
            }}
          >
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            style={{
              padding: "0.75rem 1rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "1px",
              color: "var(--chalk)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.82rem",
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(240,125,0,0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>

        {/* Password */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6b6b6b",
            }}
          >
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              padding: "0.75rem 1rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "1px",
              color: "var(--chalk)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.82rem",
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(240,125,0,0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "0.5rem",
            padding: "0.875rem 1.5rem",
            background: loading ? "#7a3000" : "#f07d00",
            color: "#080808",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.15s, box-shadow 0.15s",
            borderRadius: "1px",
          }}
          onMouseEnter={(e) => {
            if (!loading) (e.target as HTMLElement).style.boxShadow = "0 0 25px rgba(240,125,0,0.35)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.boxShadow = "none";
          }}
        >
          {loading ? "Authenticating..." : "Log In →"}
        </button>
      </form>

      {/* Footer */}
      <div
        style={{
          marginTop: "2rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "#3d3d3d",
          }}
        >
          No account?
        </span>
        <Link
          href="/auth/signup"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "#f07d00",
            textDecoration: "none",
            letterSpacing: "0.08em",
          }}
        >
          Request Access →
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "#6b6b6b" }}>
        Loading credentials node...
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
