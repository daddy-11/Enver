"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: authError } = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/dashboard",
      });

      if (authError) {
        setError(authError.message ?? "Registration failed.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: "0.75rem 1rem",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "1px",
    color: "var(--chalk)" as const,
    fontFamily: "var(--font-mono)",
    fontSize: "0.82rem",
    outline: "none",
    transition: "border-color 0.15s",
    width: "100%" as const,
  };

  const labelStyle = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.62rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "#6b6b6b",
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px" }}>
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
          — New Account
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
          Request Access
        </h1>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "#6b6b6b",
          }}
        >
          Create your lab credentials.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
            }}
          >
            {error}
          </div>
        )}

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={labelStyle}>Display Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "rgba(240,125,0,0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>

        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "rgba(240,125,0,0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>

        {/* Password */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "rgba(240,125,0,0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>

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
            borderRadius: "1px",
          }}
        >
          {loading ? "Creating account..." : "Create Account →"}
        </button>
      </form>

      <div
        style={{
          marginTop: "2rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#3d3d3d" }}>
          Have an account?
        </span>
        <Link
          href="/auth/login"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#f07d00", textDecoration: "none" }}
        >
          Log In →
        </Link>
      </div>
    </div>
  );
}
