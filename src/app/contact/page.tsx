"use client";
import React, { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    interest: "early-access", message: "",
    website: "", // honeypot — hidden from real users
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.status === 422) { setErrors(data.fields ?? {}); setState("idle"); return; }
      if (res.status === 429) { setState("error"); setErrors({ _root: `Too many requests. Try again in ${data.retryAfter}s.` }); return; }
      if (!res.ok) { setState("error"); setErrors({ _root: data.error ?? "Something went wrong." }); return; }

      setState("success");
    } catch {
      setState("error");
      setErrors({ _root: "Network error. Please try again." });
    }
  };

  const inputStyle = {
    fontFamily: "var(--font)", fontSize: 14, padding: "10px 14px",
    background: "var(--surface)", border: "1px solid var(--border-md)",
    borderRadius: "var(--r-md)", color: "var(--text)", outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s", width: "100%",
  };

  return (
    <>
      <Navigation />
      <main>
        <section className="section">
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="eyebrow" style={{ marginBottom: "1rem" }}>Contact</div>
            <h1 className="display-2" style={{ marginBottom: "1rem" }}>Get in touch</h1>
            <p className="body-lg" style={{ maxWidth: 480, marginBottom: "3.5rem" }}>
              Request early access, discuss a custom project, or ask a question. Every message reviewed within 48 hours.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
              {/* Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: "✉", title: "Email", body: "hello@enver-ai.tech" },
                  { icon: "⏱", title: "Response time", body: "Within 48 hours, usually faster" },
                  { icon: "🔒", title: "Access model", body: "All products are invite-only" },
                  { icon: "⚡", title: "Custom builds", body: "Small number of engagements per quarter" },
                ].map(({ icon, title, body }) => (
                  <div key={title} style={{ display: "flex", gap: 12, padding: "1rem 1.25rem", background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--r-md)", alignItems: "flex-start" }}>
                    <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{title}</div>
                      <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>{body}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              {state === "success" ? (
                <div style={{ padding: "3rem", textAlign: "center", background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--r-lg)" }}>
                  <div style={{ fontSize: 40, marginBottom: "1rem" }}>✓</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: "0.5rem" }}>Message sent</div>
                  <div className="body-md">We'll be in touch within 48 hours.</div>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {errors._root && (
                    <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.06)", border: "0.5px solid rgba(239,68,68,0.3)", borderRadius: "var(--r-md)", fontSize: 13, color: "#dc2626" }}>
                      {errors._root}
                    </div>
                  )}

                  {/* Honeypot — visually hidden */}
                  <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
                    <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 5 }}>First name</label>
                      <input required style={inputStyle} value={form.firstName} onChange={set("firstName")} placeholder="Ahmed"
                        onFocus={(e) => { e.target.style.borderColor = "var(--navy)"; e.target.style.boxShadow = "0 0 0 3px rgba(27,43,75,0.08)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--border-md)"; e.target.style.boxShadow = "none"; }}
                      />
                      {errors.firstName && <div style={{ fontSize: 12, color: "#dc2626", marginTop: 3 }}>{errors.firstName}</div>}
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 5 }}>Last name</label>
                      <input required style={inputStyle} value={form.lastName} onChange={set("lastName")} placeholder="Rahman"
                        onFocus={(e) => { e.target.style.borderColor = "var(--navy)"; e.target.style.boxShadow = "0 0 0 3px rgba(27,43,75,0.08)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--border-md)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 5 }}>Email</label>
                    <input type="email" required style={inputStyle} value={form.email} onChange={set("email")} placeholder="you@company.com"
                      onFocus={(e) => { e.target.style.borderColor = "var(--navy)"; e.target.style.boxShadow = "0 0 0 3px rgba(27,43,75,0.08)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "var(--border-md)"; e.target.style.boxShadow = "none"; }}
                    />
                    {errors.email && <div style={{ fontSize: 12, color: "#dc2626", marginTop: 3 }}>{errors.email}</div>}
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 5 }}>I'm interested in</label>
                    <select style={{ ...inputStyle, appearance: "none" }} value={form.interest} onChange={set("interest")}>
                      <option value="early-access">Early access to a product</option>
                      <option value="custom-build">Custom AI product build</option>
                      <option value="partnership">Partnership or integration</option>
                      <option value="general">General enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 5 }}>Message</label>
                    <textarea required rows={4} style={{ ...inputStyle, resize: "vertical" }} value={form.message} onChange={set("message")} placeholder="Tell us what you're building or what you need..."
                      onFocus={(e) => { e.target.style.borderColor = "var(--navy)"; e.target.style.boxShadow = "0 0 0 3px rgba(27,43,75,0.08)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "var(--border-md)"; e.target.style.boxShadow = "none"; }}
                    />
                    {errors.message && <div style={{ fontSize: 12, color: "#dc2626", marginTop: 3 }}>{errors.message}</div>}
                  </div>

                  <button type="submit" disabled={state === "submitting"} className="btn btn-primary"
                    style={{ width: "100%", opacity: state === "submitting" ? 0.7 : 1, cursor: state === "submitting" ? "not-allowed" : "pointer" }}>
                    {state === "submitting" ? "Sending..." : "Send message"}
                  </button>

                  <p className="mono" style={{ fontSize: 11, color: "var(--muted)", textAlign: "center" }}>
                    Protected by CSRF validation and rate limiting · 3 submissions / 15 min per IP
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
