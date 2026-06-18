"use client";
import React, { useState } from "react";
import { CandidateProfile } from "@/lib/db/schema";
import { Github, Linkedin, MessageSquare, Terminal, Award, HelpCircle, ArrowRight } from "lucide-react";

interface CandidateDashboardProps {
  profile: CandidateProfile;
}

export function CandidateDashboard({ profile }: CandidateDashboardProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hmph. I am Tethys. I analyzed your roadmap. What do you need to write?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      // Map role to what the client expects (system / user / assistant)
      const chatHistory = [
        ...messages.map(m => ({
          role: m.role === "assistant" ? "assistant" as const : "user" as const,
          content: m.content
        })),
        { role: "user" as const, content: userMsg }
      ];

      const res = await fetch("/api/tethys/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Failed to query the Tethys core." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection to Tethys gateway lost." }]);
    } finally {
      setLoading(false);
    }
  };

  // Extract primary obstacle/challenges from string
  const challengesText = profile.challenges || "";
  const matchObstacle = challengesText.match(/Primary obstacle:\s*([\w_-]+)/);
  const rawObstacle = matchObstacle ? matchObstacle[1] : "no_live_projects";

  const getObstacleDetails = (obs: string) => {
    switch (obs) {
      case "ats_filters":
        return {
          title: "ATS Resume Filtering",
          desc: "Your profile is bottlenecked by automated CV screens that don't look at actual build quality.",
          actions: ["Build direct portfolio proofs", "Run automated resume optimization scans", "Secure direct developer team referrals"]
        };
      case "remote_isolation":
        return {
          title: "Remote & Entry-Level Job Scarcity",
          desc: "Finding high-quality junior remote roles in open channels is highly saturated.",
          actions: ["Embed into live open-source engineering groups", "Target smaller, funded startups directly", "Verify code reviews via experienced leads"]
        };
      case "interview_anxiety":
        return {
          title: "Technical Coding Blockages",
          desc: "Failing to convert applications during live coding rounds and technical interviews.",
          actions: ["Run mock live pair-programming sessions", "Study data patterns and database structures", "Explain algorithm steps out loud while coding"]
        };
      default:
        return {
          title: "Production Experience Gap",
          desc: "Your biggest hurdle is the lack of real-world production code on your resume.",
          actions: ["Contribute to active Enver AI Tech sub-projects", "Publish live-deployed MVPs with custom databases", "Build with real infrastructure (Supabase, Upstash Redis)"]
        };
    }
  };

  const obstacleInfo = getObstacleDetails(rawObstacle);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", animation: "fadeUp 0.5s ease" }}>
      
      {/* Header Banner */}
      <div className="card" style={{ padding: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem", background: "linear-gradient(135deg, rgba(27,43,75,0.02) 0%, rgba(232,102,10,0.02) 100%)" }}>
        <div>
          <span className="badge badge-live" style={{ marginBottom: "0.75rem" }}>
            <span className="badge-dot" /> Match Report Ready
          </span>
          <h1 className="display-3" style={{ marginBottom: "0.25rem" }}>Welcome, {profile.fullName}</h1>
          <p className="body-md">Onboarding profile analyzed and synced with the Enver Placement Pipeline.</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "flex-end" }}>
            <Award className="orange" size={24} style={{ color: "var(--orange)" }} />
            <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--navy)" }}>94%</span>
          </div>
          <span className="body-sm">Fit Score for Enver Teams</span>
        </div>
      </div>

      {/* Main Core Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
        
        {/* Left Column: Profile details & Obstacle roadmap */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* Metadata Card */}
          <div className="card" style={{ padding: "2rem" }}>
            <h3 className="display-3" style={{ fontSize: "18px", marginBottom: "1.25rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
              Developer Coordinates
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "var(--muted)", fontWeight: 500 }}>Target Role:</span>
                <span style={{ fontWeight: 600, color: "var(--text)" }}>
                  {profile.preferredRoles?.toUpperCase() || "Fullstack Engineer"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "var(--muted)", fontWeight: 500 }}>Tech Stack:</span>
                <span style={{ fontWeight: 600, color: "var(--text)" }}>{profile.skills || "Not specified"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "var(--muted)", fontWeight: 500 }}>Email Coordinate:</span>
                <span style={{ fontWeight: 600, color: "var(--text)" }}>{profile.email}</span>
              </div>
              {profile.phone && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span style={{ color: "var(--muted)", fontWeight: 500 }}>Phone:</span>
                  <span style={{ fontWeight: 600, color: "var(--text)" }}>{profile.phone}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ flex: 1, gap: "8px" }}>
                  <Github size={16} /> GitHub
                </a>
              )}
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ flex: 1, gap: "8px" }}>
                  <Linkedin size={16} /> LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Obstacle Analysis Card */}
          <div className="card" style={{ padding: "2rem", borderLeft: "4px solid var(--orange)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
              <HelpCircle className="orange" style={{ color: "var(--orange)" }} />
              <h3 className="display-3" style={{ fontSize: "18px" }}>Roadblock: {obstacleInfo.title}</h3>
            </div>
            <p className="body-md" style={{ marginBottom: "1.5rem" }}>
              {obstacleInfo.desc}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {obstacleInfo.actions.map((act, index) => (
                <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px" }}>
                  <span style={{ color: "var(--orange)", fontWeight: "bold" }}>0{index + 1}.</span>
                  <span style={{ color: "var(--text)", fontWeight: 500 }}>{act}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tethys Code Console Chat Widget */}
        <div className="card" style={{ display: "flex", flexDirection: "column", background: "#0d0d0d", borderColor: "#222", overflow: "hidden", minHeight: "450px" }}>
          
          {/* Console Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1.25rem", borderBottom: "1px solid #222", background: "#151515" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Terminal size={16} style={{ color: "#a855f7" }} />
              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "#ccc", fontWeight: "bold" }}>TETHYS CORE CONSOLE</span>
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} />
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#eab308" }} />
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
            </div>
          </div>

          {/* Console Content Screen */}
          <div style={{ flex: 1, padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto", fontFamily: "var(--mono)", fontSize: "13px", color: "#f3f4f6" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
                <div style={{ 
                  color: msg.role === "user" ? "#38bdf8" : "#fbbf24", 
                  fontWeight: "bold",
                  marginBottom: "2px"
                }}>
                  {msg.role === "user" ? "Rover >" : "Tethys >"}
                </div>
                <div style={{ 
                  background: msg.role === "user" ? "#1e293b" : "#1e1b4b",
                  padding: "8px 12px",
                  borderRadius: "var(--r-sm)",
                  border: msg.role === "user" ? "1px solid #334155" : "1px solid #312e81",
                  whiteSpace: "pre-wrap"
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ color: "#6b7280", fontStyle: "italic" }}>
                Tethys is writing code...
              </div>
            )}
          </div>

          {/* Console Input Bar */}
          <form onSubmit={handleSendMessage} style={{ display: "flex", borderTop: "1px solid #222", background: "#111" }}>
            <input
              type="text"
              className="input"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              placeholder="Ask Tethys to solve your roadblock..."
              style={{
                background: "transparent",
                border: "none",
                borderRadius: 0,
                color: "#fff",
                fontFamily: "var(--mono)",
                padding: "12px",
                fontSize: "13px"
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "transparent",
                border: "none",
                color: "#a855f7",
                padding: "0 16px",
                cursor: "pointer"
              }}
            >
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
