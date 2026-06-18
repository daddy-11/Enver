"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
  Terminal, Shield, Compass, Radio, Users, Mic, MicOff, 
  Send, MessageSquare, ExternalLink, Activity, Database, 
  Sparkles, LogOut, CheckCircle2, Server, Clock, Code,
  Laptop, ChevronRight, UserCheck
} from "lucide-react";
import Link from "next/link";
import { useLounge } from "@/hooks/useLounge";
import { usePresenceHeartbeat } from "@/hooks/usePresenceHeartbeat";

interface TelemetryLog {
  id: string;
  userId: string | null;
  activityType: string;
  details: any;
  createdAt: string | Date;
}

interface SanctuaryDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
  initialTelemetry: TelemetryLog[];
}

export function SanctuaryDashboard({ user, initialTelemetry }: SanctuaryDashboardProps) {
  const [activeTab, setActiveTab] = useState<"agents" | "telemetry" | "lounge" | "apps">("agents");
  const [activeAgent, setActiveAgent] = useState<"tethys" | "shorekeeper" | "claude" | "gemini">("shorekeeper");
  
  // Tethys / Shorekeeper chat states
  const [chatInputs, setChatInputs] = useState({ tethys: "", shorekeeper: "", claude: "", gemini: "" });
  const [tethysMessages, setTethysMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hmph. Code or backend questions only. Speak, Rover." }
  ]);
  const [shorekeeperMessages, setShorekeeperMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Welcome back, Rover. The tethers are secure, and the Black Shores resonate with your presence. How shall we direct our focus today?" }
  ]);
  const [claudeMessages, setClaudeMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hello! I'm Claude. I'm ready to assist with complex reasoning, writing, or analysis tasks." }
  ]);
  const [geminiMessages, setGeminiMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hi! I am Gemini 1.5 Pro. With my massive context window, I can analyze entire codebases or large datasets. How can I help?" }
  ]);
  const [agentLoading, setAgentLoading] = useState(false);

  // Lounge — real-time data (messages, presence, voice) via hook
  const lounge = useLounge({ id: user.id, name: user.name });
  usePresenceHeartbeat();
  const [loungeInput, setLoungeInput] = useState("");

  // Telemetry logs state
  const [telemetryLogs, setTelemetryLogs] = useState<TelemetryLog[]>(initialTelemetry);
  const [telemetryFilter, setTelemetryFilter] = useState<string>("all");

  // Local clock state
  const [currentTime, setCurrentTime] = useState("");

  const tethysEndRef = useRef<HTMLDivElement>(null);
  const shorekeeperEndRef = useRef<HTMLDivElement>(null);
  const loungeEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll chats to bottom
    tethysEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tethysMessages]);

  useEffect(() => {
    shorekeeperEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [shorekeeperMessages]);

  useEffect(() => {
    loungeEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lounge.messages]);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle agent queries
  const handleAgentSubmit = async (e: React.FormEvent, agent: "tethys" | "shorekeeper" | "claude" | "gemini") => {
    e.preventDefault();
    const input = chatInputs[agent].trim();
    if (!input || agentLoading) return;

    // Clear input
    setChatInputs(prev => ({ ...prev, [agent]: "" }));

    // Add user message locally
    if (agent === "tethys") {
      setTethysMessages(prev => [...prev, { role: "user", content: input }]);
    } else {
      setShorekeeperMessages(prev => [...prev, { role: "user", content: input }]);
    }

    setAgentLoading(true);

    try {
      const history = agent === "tethys" ? tethysMessages : shorekeeperMessages;
      const formattedHistory = [
        ...history.map(m => ({
          role: m.role === "assistant" ? "assistant" as const : "user" as const,
          content: m.content
        })),
        { role: "user" as const, content: input }
      ];

      const res = await fetch("/api/tethys/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: formattedHistory, agent }),
      });

      if (res.ok) {
        const data = await res.json();
        if (agent === "tethys") {
          setTethysMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
        } else {
          setShorekeeperMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
        }

        // Proactively insert a simulated telemetry entry since we made a prompt!
        const newLog: TelemetryLog = {
          id: Math.random().toString(36).substring(7),
          userId: user.id,
          activityType: "prompt",
          details: { query: input.substring(0, 60) + (input.length > 60 ? "..." : ""), agent },
          createdAt: new Date().toISOString()
        };
        setTelemetryLogs(prev => [newLog, ...prev]);

      } else {
        const errorMsg = agent === "tethys" 
          ? "Hmph. Tethys core is currently unresponsive. Re-calibrate connection tethers." 
          : "The Sonoro network is fluctuating. I could not connect with the central tether. Please try again, Rover.";
        if (agent === "tethys") {
          setTethysMessages(prev => [...prev, { role: "assistant", content: errorMsg }]);
        } else {
          setShorekeeperMessages(prev => [...prev, { role: "assistant", content: errorMsg }]);
        }
      }
    } catch (err) {
      const failMsg = "Tether connection lost. Check local terminal endpoints.";
      if (agent === "tethys") {
        setTethysMessages(prev => [...prev, { role: "assistant", content: failMsg }]);
      } else {
        setShorekeeperMessages(prev => [...prev, { role: "assistant", content: failMsg }]);
      }
    } finally {
      setAgentLoading(false);
    }
  };

  // Send a real lounge message (persists + broadcasts via the hook)
  const handleLoungeSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = loungeInput.trim();
    if (!text) return;
    setLoungeInput("");
    await lounge.sendMessage(text);
  };

  // Filtered telemetry logs
  const filteredTelemetry = telemetryLogs.filter(log => {
    if (telemetryFilter === "all") return true;
    return log.activityType === telemetryFilter;
  });

  // Calculate live statistics
  const promptCount = telemetryLogs.filter(l => l.activityType === "prompt" || l.activityType === "prompt_cycle").length;
  const loginCount = telemetryLogs.filter(l => l.activityType === "login").length;
  const uniqueUsers = Array.from(new Set(telemetryLogs.map(l => l.userId).filter(Boolean))).length || 1;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#08080a",
      color: "#f4f4f5",
      fontFamily: "var(--font)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Dynamic Keyframes Animation Injection */}
      <style>{`
        @keyframes ripple {
          0% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.3; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes flowUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.95); }
        }
        .animate-flowUp {
          animation: flowUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-ripple {
          animation: ripple 2s infinite ease-out;
        }
        .pulse-active {
          animation: pulseDot 2s infinite ease-in-out;
        }
      `}</style>

      {/* Cyber Grid Background */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(232,102,10,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(232,102,10,0.015) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        pointerEvents: "none",
        zIndex: 0
      }} />

      {/* Top Header Command Bar */}
      <header style={{
        zIndex: 10,
        height: "64px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        background: "rgba(9, 9, 11, 0.85)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        position: "sticky",
        top: 0
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "32px",
            height: "32px",
            background: "linear-gradient(135deg, #1b2b4b 0%, #e8660a 100%)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "14px",
            color: "#fff"
          }}>
            E
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "-0.2px" }}>enveraitech.in</span>
              <span className="badge badge-live" style={{ padding: "2px 8px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }}>
                <span className="badge-dot" /> sanctuary
              </span>
            </div>
            <div style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "#52525b" }}>ROVER COMMAND CENTER</div>
          </div>
        </div>

        {/* Realtime coordinates & status */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--mono)", fontSize: "11px", color: "#a1a1aa" }} className="hide-mobile">
            <Clock size={12} style={{ color: "var(--orange)" }} />
            <span>{currentTime || "12:00:00"}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--mono)", fontSize: "11px", color: "#a1a1aa" }} className="hide-mobile">
            <Server size={12} style={{ color: "#38bdf8" }} />
            <span>TETHERS: ACTIVE</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--orange)" }}>{user.name}</div>
              <div style={{ fontSize: "9px", fontFamily: "var(--mono)", color: "#71717a" }}>{user.email}</div>
            </div>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#27272a",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              color: "#fff"
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace layout */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        zIndex: 1,
        position: "relative"
      }} className="dashboard-layout">
        
        {/* Sidebar Nav */}
        <nav style={{
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          background: "rgba(9, 9, 11, 0.5)",
          padding: "1.5rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }} className="sidebar">
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <div style={{ fontSize: "10px", fontFamily: "var(--mono)", letterSpacing: "0.1em", color: "#52525b", paddingLeft: "10px", marginBottom: "0.5rem" }}>
              NAVIGATION
            </div>
            
            {[
              { id: "agents", label: "AI Workstations", icon: Sparkles, color: "#a855f7" },
              { id: "telemetry", label: "Telemetry Logs", icon: Activity, color: "#22c55e" },
              { id: "lounge", label: "Black Shores Lounge", icon: Radio, color: "var(--orange)" },
              { id: "apps", label: "Core Utilities", icon: Compass, color: "#38bdf8" }
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "10px 12px",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    background: isSelected ? "rgba(255, 255, 255, 0.03)" : "transparent",
                    color: isSelected ? "#fff" : "#a1a1aa",
                    borderLeft: isSelected ? `2px solid ${tab.color}` : "2px solid transparent"
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.015)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) {
                      e.currentTarget.style.color = "#a1a1aa";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <Icon size={16} style={{ color: isSelected ? tab.color : "#71717a" }} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1rem" }}>
            <Link
              href="/api/auth/signout"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 12px",
                fontSize: "12px",
                color: "#f43f5e",
                fontWeight: 600,
                borderRadius: "6px"
              }}
            >
              <LogOut size={14} />
              Disconnect Session
            </Link>
          </div>
        </nav>

        {/* Tab Workstation Area */}
        <main style={{ padding: "2rem", overflowY: "auto", position: "relative" }}>

          {/* TAB 1: AI WORKSTATIONS */}
          {activeTab === "agents" && (
            <div className="animate-flowUp" style={{ display: "flex", flexDirection: "column", gap: "2rem", height: "100%" }}>
              
              {/* Header Status */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>AI Workstations</h2>
                  <p style={{ fontSize: "13px", color: "#a1a1aa" }}>Interact with the core tethers of the sanctuary.</p>
                </div>
                
                {/* Switchers */}
                <div style={{ display: "flex", gap: "4px", background: "#18181b", padding: "4px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <button 
                    onClick={() => setActiveAgent("shorekeeper")}
                    style={{
                      border: "none",
                      background: activeAgent === "shorekeeper" ? "#27272a" : "transparent",
                      color: activeAgent === "shorekeeper" ? "#fff" : "#71717a",
                      fontWeight: 600,
                      fontSize: "12px",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      transition: "all 0.15s ease"
                    }}
                  >
                    🛡️ Shorekeeper
                  </button>
                  <button 
                    onClick={() => setActiveAgent("tethys")}
                    style={{
                      border: "none",
                      background: activeAgent === "tethys" ? "#27272a" : "transparent",
                      color: activeAgent === "tethys" ? "#fff" : "#71717a",
                      fontWeight: 600,
                      fontSize: "12px",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      transition: "all 0.15s ease"
                    }}
                  >
                    🗡️ Tethys
                  </button>
                  <button 
                    onClick={() => setActiveAgent("claude")}
                    style={{
                      border: "none",
                      background: activeAgent === "claude" ? "#27272a" : "transparent",
                      color: activeAgent === "claude" ? "#d97757" : "#71717a",
                      fontWeight: 600,
                      fontSize: "12px",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      transition: "all 0.15s ease"
                    }}
                  >
                    🧠 Claude 3.5
                  </button>
                  <button 
                    onClick={() => setActiveAgent("gemini")}
                    style={{
                      border: "none",
                      background: activeAgent === "gemini" ? "#27272a" : "transparent",
                      color: activeAgent === "gemini" ? "#4285f4" : "#71717a",
                      fontWeight: 600,
                      fontSize: "12px",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      transition: "all 0.15s ease"
                    }}
                  >
                    ✨ Gemini 1.5
                  </button>
                </div>
              </div>

              {/* Console Screen Container */}
              <div style={{
                flex: 1,
                minHeight: "450px",
                display: "grid",
                gridTemplateColumns: "1fr 280px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "10px",
                overflow: "hidden",
                background: "#09090b"
              }} className="console-split">
                
                {/* Left: Messages */}
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  
                  {/* Console Top Bar */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem 1.25rem",
                    background: "#0f0f13",
                    borderBottom: "1px solid rgba(255,255,255,0.04)"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Terminal size={14} style={{ color: activeAgent === "shorekeeper" ? "#c084fc" : activeAgent === "tethys" ? "#38bdf8" : activeAgent === "claude" ? "#d97757" : "#4285f4" }} />
                      <span style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "#a1a1aa", fontWeight: "bold" }}>
                        {activeAgent === "shorekeeper" ? "SHOREKEEPER TETHER ACTIVE" : activeAgent === "tethys" ? "TETHYS CORE CONSOLE" : activeAgent === "claude" ? "CLAUDE OPUS/SONNET" : "GEMINI PRO ENGINE"}
                      </span>
                    </div>
                    
                    <div style={{ display: "flex", gap: "6px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} />
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#eab308" }} />
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <div style={{
                    flex: 1,
                    padding: "1.5rem",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    fontFamily: "var(--mono)",
                    fontSize: "13px",
                    lineHeight: "1.6"
                  }}>
                    {activeAgent === "shorekeeper" && shorekeeperMessages.map((msg, i) => (
                        <div key={i} style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                          <div style={{ color: msg.role === "user" ? "#38bdf8" : "#c084fc", fontWeight: "bold", marginBottom: "3px" }}>
                            {msg.role === "user" ? "Rover >" : "Shorekeeper >"}
                          </div>
                          <div style={{
                            background: msg.role === "user" ? "rgba(56,189,248,0.03)" : "rgba(192,132,252,0.03)",
                            border: msg.role === "user" ? "1px solid rgba(56,189,248,0.15)" : "1px solid rgba(192,132,252,0.15)",
                            borderRadius: "6px",
                            padding: "10px 14px",
                            color: "#e4e4e7",
                            whiteSpace: "pre-wrap"
                          }}>
                            {msg.content}
                          </div>
                        </div>
                    ))}
                    {activeAgent === "tethys" && tethysMessages.map((msg, i) => (
                        <div key={i} style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                          <div style={{ color: msg.role === "user" ? "#38bdf8" : "#fbbf24", fontWeight: "bold", marginBottom: "3px" }}>
                            {msg.role === "user" ? "Rover >" : "Tethys >"}
                          </div>
                          <div style={{
                            background: msg.role === "user" ? "rgba(56,189,248,0.03)" : "rgba(251,191,36,0.03)",
                            border: msg.role === "user" ? "1px solid rgba(56,189,248,0.15)" : "1px solid rgba(251,191,36,0.15)",
                            borderRadius: "6px",
                            padding: "10px 14px",
                            color: "#e4e4e7",
                            whiteSpace: "pre-wrap"
                          }}>
                            {msg.content}
                          </div>
                        </div>
                    ))}
                    {activeAgent === "claude" && claudeMessages.map((msg, i) => (
                        <div key={i} style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                          <div style={{ color: msg.role === "user" ? "#38bdf8" : "#d97757", fontWeight: "bold", marginBottom: "3px" }}>
                            {msg.role === "user" ? "Rover >" : "Claude >"}
                          </div>
                          <div style={{
                            background: msg.role === "user" ? "rgba(56,189,248,0.03)" : "rgba(217,119,87,0.03)",
                            border: msg.role === "user" ? "1px solid rgba(56,189,248,0.15)" : "1px solid rgba(217,119,87,0.15)",
                            borderRadius: "6px",
                            padding: "10px 14px",
                            color: "#e4e4e7",
                            whiteSpace: "pre-wrap"
                          }}>
                            {msg.content}
                          </div>
                        </div>
                    ))}
                    {activeAgent === "gemini" && geminiMessages.map((msg, i) => (
                        <div key={i} style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                          <div style={{ color: msg.role === "user" ? "#38bdf8" : "#4285f4", fontWeight: "bold", marginBottom: "3px" }}>
                            {msg.role === "user" ? "Rover >" : "Gemini >"}
                          </div>
                          <div style={{
                            background: msg.role === "user" ? "rgba(56,189,248,0.03)" : "rgba(66,133,244,0.03)",
                            border: msg.role === "user" ? "1px solid rgba(56,189,248,0.15)" : "1px solid rgba(66,133,244,0.15)",
                            borderRadius: "6px",
                            padding: "10px 14px",
                            color: "#e4e4e7",
                            whiteSpace: "pre-wrap"
                          }}>
                            {msg.content}
                          </div>
                        </div>
                    ))}
                    {agentLoading && (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#71717a", fontStyle: "italic" }}>
                        <span className="badge-live"><span className="badge-dot pulse-active" /></span>
                        {activeAgent === "shorekeeper" ? "Shorekeeper is formulating resonance..." : "Tethys is calculating code logic..."}
                      </div>
                    )}
                    <div ref={activeAgent === "shorekeeper" ? shorekeeperEndRef : tethysEndRef} />
                  </div>

                  {/* Input form */}
                  <form 
                    onSubmit={(e) => handleAgentSubmit(e, activeAgent)}
                    style={{
                      display: "flex",
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      background: "#0c0c10",
                      padding: "8px"
                    }}
                  >
                    <input
                      type="text"
                      value={chatInputs[activeAgent]}
                      onChange={e => setChatInputs(prev => ({ ...prev, [activeAgent]: e.target.value }))}
                      placeholder={activeAgent === "shorekeeper" ? "Communicate with Shorekeeper..." : "Ask Sasuke / Tethys for code/logic..."}
                      disabled={agentLoading}
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#fff",
                        padding: "12px",
                        fontFamily: "var(--mono)",
                        fontSize: "13px"
                      }}
                    />
                    <button
                      type="submit"
                      disabled={agentLoading || !chatInputs[activeAgent].trim()}
                      style={{
                        background: activeAgent === "shorekeeper" ? "rgba(192,132,252,0.1)" : "rgba(56,189,248,0.1)",
                        border: "none",
                        borderRadius: "6px",
                        color: activeAgent === "shorekeeper" ? "#c084fc" : "#38bdf8",
                        padding: "0 18px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: chatInputs[activeAgent].trim() ? 1 : 0.4
                      }}
                    >
                      <Send size={16} />
                    </button>
                  </form>
                </div>

                {/* Right: Tether Details Sidebar */}
                <div style={{
                  borderLeft: "1px solid rgba(255,255,255,0.05)",
                  background: "#0c0c0f",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem"
                }} className="console-meta">
                  
                  <div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>Tether Metadata</h3>
                    <p style={{ fontSize: "11px", color: "#71717a" }}>Core specs & active directives.</p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: "10px", borderRadius: "6px" }}>
                      <div style={{ fontSize: "9px", fontFamily: "var(--mono)", color: "#71717a" }}>DESIGNATION</div>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: "#e4e4e7" }}>
                        {activeAgent === "shorekeeper" ? "SHOREKEEPER" : activeAgent === "tethys" ? "TETHYS CORE" : activeAgent === "claude" ? "CLAUDE 3.5 SONNET" : "GEMINI 1.5 PRO"}
                      </div>
                    </div>

                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: "10px", borderRadius: "6px" }}>
                      <div style={{ fontSize: "9px", fontFamily: "var(--mono)", color: "#71717a" }}>RESONANCE STYLE</div>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: activeAgent === "shorekeeper" ? "#c084fc" : activeAgent === "tethys" ? "#38bdf8" : activeAgent === "claude" ? "#d97757" : "#4285f4" }}>
                        {activeAgent === "shorekeeper" ? "Stoic, Devoted, Poetic" : activeAgent === "tethys" ? "Sasuke Uchiha (Akatsuki)" : activeAgent === "claude" ? "Highly Analytical, Nuanced" : "Helpful, Vast Knowledge"}
                      </div>
                    </div>

                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: "10px", borderRadius: "6px" }}>
                      <div style={{ fontSize: "9px", fontFamily: "var(--mono)", color: "#71717a" }}>TEMPERATURE CALIBRATION</div>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: "#e4e4e7", fontFamily: "var(--mono)" }}>
                        {activeAgent === "shorekeeper" ? "0.7 (Dynamic Resonance)" : activeAgent === "tethys" ? "0.1 (Strict Determinism)" : activeAgent === "claude" ? "0.5 (Analytical)" : "0.8 (Creative/Expansive)"}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "#52525b", marginBottom: "0.5rem" }}>ACTIVE ABILITIES</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "11px", fontFamily: "var(--mono)", color: "#a1a1aa" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Code size={10} style={{ color: "#3a9a3c" }} /> playwright-1.60.0</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Laptop size={10} style={{ color: "#3a9a3c" }} /> ui-ux-pro-max-skill</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Database size={10} style={{ color: "#3a9a3c" }} /> claude-mem-13.5.6</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: TELEMETRY LOGS */}
          {activeTab === "telemetry" && (
            <div className="animate-flowUp" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>IDE Telemetry Hub</h2>
                  <p style={{ fontSize: "13px", color: "#a1a1aa" }}>Active developer query triggers, workspace logins, and shell execution durations.</p>
                </div>
                
                {/* Filters */}
                <div style={{ display: "flex", gap: "6px" }}>
                  {["all", "prompt", "login", "command"].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setTelemetryFilter(filter)}
                      style={{
                        background: telemetryFilter === filter ? "rgba(34,197,94,0.08)" : "#18181b",
                        border: telemetryFilter === filter ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(255,255,255,0.05)",
                        color: telemetryFilter === filter ? "#4ade80" : "#a1a1aa",
                        fontSize: "11px",
                        fontFamily: "var(--mono)",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      {filter.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Statistic widgets */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
                {[
                  { label: "Total Synced Logs", val: telemetryLogs.length, icon: Database, color: "#38bdf8" },
                  { label: "Active Prompt Cycles", val: promptCount, icon: Terminal, color: "var(--orange)" },
                  { label: "Developer Nodes Ingesting", val: uniqueUsers, icon: UserCheck, color: "#4ade80" },
                  { label: "System Status", val: "OPERATIONAL", icon: Shield, color: "#a855f7" }
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} style={{
                      background: "#121214",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "8px",
                      padding: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}>
                      <div>
                        <div style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "#71717a", textTransform: "uppercase" }}>{stat.label}</div>
                        <div style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginTop: "4px" }}>{stat.val}</div>
                      </div>
                      <Icon size={24} style={{ color: stat.color, opacity: 0.8 }} />
                    </div>
                  );
                })}
              </div>

              {/* Data Table */}
              <div style={{
                background: "#0c0c0e",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "10px",
                overflow: "hidden"
              }}>
                <div style={{
                  padding: "1rem 1.5rem",
                  background: "#121215",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#e4e4e7" }}>Ingestion Feed</span>
                  <span style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "#71717a" }}>Showing {filteredTelemetry.length} items</span>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textCombineUpright: "none", fontSize: "12px", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
                        <th style={{ padding: "12px 16px", color: "#a1a1aa", fontWeight: 600, fontFamily: "var(--mono)", fontSize: "11px" }}>TIMESTAMP</th>
                        <th style={{ padding: "12px 16px", color: "#a1a1aa", fontWeight: 600, fontFamily: "var(--mono)", fontSize: "11px" }}>NODE IDENTIFIER</th>
                        <th style={{ padding: "12px 16px", color: "#a1a1aa", fontWeight: 600, fontFamily: "var(--mono)", fontSize: "11px" }}>ACTIVITY TYPE</th>
                        <th style={{ padding: "12px 16px", color: "#a1a1aa", fontWeight: 600, fontFamily: "var(--mono)", fontSize: "11px" }}>DETAILS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTelemetry.length === 0 ? (
                        <tr>
                          <td colSpan={4} style={{ padding: "2rem", textCombineUpright: "none", textAlign: "center", color: "#71717a", fontStyle: "italic" }}>
                            No logged activity matches filter coordinates.
                          </td>
                        </tr>
                      ) : (
                        filteredTelemetry.map((log) => {
                          const date = new Date(log.createdAt);
                          const formattedDate = date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                          return (
                            <tr key={log.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                              <td style={{ padding: "12px 16px", fontFamily: "var(--mono)", color: "#71717a" }}>{formattedDate}</td>
                              <td style={{ padding: "12px 16px", fontWeight: 500, color: "#fff" }}>
                                {log.userId === user.id ? user.email : `developer_${(log.userId || "anon").substring(0, 4)}@enveraitech.in`}
                              </td>
                              <td style={{ padding: "12px 16px" }}>
                                <span style={{
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                  fontSize: "9px",
                                  fontWeight: "bold",
                                  fontFamily: "var(--mono)",
                                  background: log.activityType === "prompt" ? "rgba(232,102,10,0.08)" : log.activityType === "login" ? "rgba(56,189,248,0.08)" : "rgba(168,85,247,0.08)",
                                  color: log.activityType === "prompt" ? "var(--orange)" : log.activityType === "login" ? "#38bdf8" : "#c084fc",
                                  border: `1px solid ${log.activityType === "prompt" ? "rgba(232,102,10,0.15)" : log.activityType === "login" ? "rgba(56,189,248,0.15)" : "rgba(168,85,247,0.15)"}`
                                }}>
                                  {log.activityType.toUpperCase()}
                                </span>
                              </td>
                              <td style={{ padding: "12px 16px", fontFamily: "var(--mono)", color: "#d4d4d8" }}>
                                {typeof log.details === "object" 
                                  ? JSON.stringify(log.details) 
                                  : String(log.details || "No parameters logged")}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: BLACK SHORES LOUNGE */}
          {activeTab === "lounge" && (
            <div className="animate-flowUp lounge-split" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "2rem" }}>
              
              {/* Left Column: Voice Lobby */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>Sanctuary Lounge</h2>
                  <p style={{ fontSize: "12px", color: "#71717a" }}>WFH workspace socialization system.</p>
                </div>

                <div style={{
                  background: "#121214",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "10px",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  alignItems: "center",
                  textAlign: "center"
                }}>
                  {/* Status Indicator */}
                  <div style={{ position: "relative" }}>
                    <div style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: lounge.inVoice ? "rgba(232,102,10,0.1)" : "#1c1917",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: `2px solid ${lounge.inVoice ? "var(--orange)" : "#444"}`
                    }}>
                      <Radio size={28} style={{ color: lounge.inVoice ? "var(--orange)" : "#71717a" }} />
                    </div>

                    {lounge.inVoice && (
                      <span style={{
                        position: "absolute",
                        inset: -4,
                        borderRadius: "50%",
                        border: "2px solid var(--orange)",
                        pointerEvents: "none"
                      }} className="animate-ripple" />
                    )}
                  </div>

                  <div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>
                      {lounge.inVoice ? "Voice Tether Active" : "Voice Lounge"}
                    </h3>
                    <p style={{ fontSize: "11px", color: "#71717a", marginTop: "4px" }}>
                      {lounge.inVoice
                        ? "You joined the call. Audio runs in Google Meet."
                        : "Voice runs in Google Meet. Join to open the room."}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "8px", width: "100%" }}>
                    <button
                      onClick={() => (lounge.inVoice ? lounge.leaveVoice() : lounge.joinVoice())}
                      disabled={!lounge.meetUrl && !lounge.inVoice}
                      title={!lounge.meetUrl ? "No Meet link configured for this room yet" : undefined}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        background: lounge.inVoice ? "#f43f5e" : "var(--orange)",
                        border: "none",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: 600,
                        padding: "8px 16px",
                        borderRadius: "6px",
                        cursor: !lounge.meetUrl && !lounge.inVoice ? "not-allowed" : "pointer",
                        opacity: !lounge.meetUrl && !lounge.inVoice ? 0.5 : 1
                      }}
                    >
                      {lounge.inVoice ? "Leave Voice" : "Join Voice"}
                      {!lounge.inVoice && <ExternalLink size={12} />}
                    </button>
                  </div>

                  {!lounge.meetUrl && (
                    <p style={{ fontSize: "9px", color: "#52525b", fontFamily: "var(--mono)" }}>
                      Set a Meet link on the room (LOUNGE_MEET_URL) to enable voice.
                    </p>
                  )}
                </div>

                {/* Team Status Panel */}
                <div style={{
                  background: "#121214",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "10px",
                  padding: "1.5rem"
                }}>
                  <h3 style={{ fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Users size={12} style={{ color: "var(--orange)" }} /> ACTIVE TETHERS ({lounge.online.length})
                    <span style={{ marginLeft: "auto", fontSize: "9px", fontFamily: "var(--mono)", color: lounge.connected ? "#22c55e" : "#71717a" }}>
                      {lounge.connected ? "LIVE" : "OFFLINE"}
                    </span>
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {lounge.online.length === 0 && (
                      <div style={{ fontSize: "11px", color: "#71717a", fontStyle: "italic" }}>
                        {lounge.connected ? "No one else is online right now." : "Connecting to presence…"}
                      </div>
                    )}
                    {lounge.online.map((member) => (
                      <div key={member.userId} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: `${member.color}22`,
                          color: member.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: "bold"
                        }}>
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: "12px", fontWeight: 600, color: "#e4e4e7" }}>
                            {member.userId === user.id ? `${member.name} (You)` : member.name}
                          </div>
                          <div style={{ fontSize: "9px", color: "#71717a" }}>
                            {member.inVoice ? "In voice call" : "Active in sanctuary"}
                          </div>
                        </div>
                        <span style={{
                          marginLeft: "auto",
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: member.inVoice ? "var(--orange)" : "#22c55e",
                          display: "block"
                        }} />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Chat board */}
              <div style={{
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "10px",
                background: "#09090b",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                height: "500px"
              }}>
                <div style={{
                  padding: "0.75rem 1.25rem",
                  background: "#121215",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <MessageSquare size={14} style={{ color: "var(--orange)" }} />
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>Workspace Communications</span>
                </div>

                {/* Messages feed */}
                <div style={{
                  flex: 1,
                  padding: "1.5rem",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem"
                }}>
                  {lounge.loading && lounge.messages.length === 0 && (
                    <div style={{ fontSize: "12px", color: "#71717a", fontStyle: "italic" }}>Loading messages…</div>
                  )}
                  {!lounge.loading && lounge.messages.length === 0 && (
                    <div style={{ fontSize: "12px", color: "#71717a", fontStyle: "italic" }}>
                      No messages yet. Say something to the team.
                    </div>
                  )}
                  {lounge.messages.map((msg) => (
                    <div key={msg.id} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: msg.authorColor,
                        flexShrink: 0
                      }}>
                        {msg.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>
                            {msg.userId === user.id ? `${msg.authorName} (You)` : msg.authorName}
                          </span>
                          <span style={{ fontSize: "9px", color: "#52525b", fontFamily: "var(--mono)" }}>
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <p style={{ fontSize: "13px", color: "#d4d4d8", marginTop: "3px", whiteSpace: "pre-wrap" }}>{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={loungeEndRef} />
                </div>

                {/* Input bar */}
                <form 
                  onSubmit={handleLoungeSend}
                  style={{
                    display: "flex",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    background: "#0c0c10",
                    padding: "8px"
                  }}
                >
                  <input
                    type="text"
                    value={loungeInput}
                    onChange={e => setLoungeInput(e.target.value)}
                    placeholder="Broadcast status coordinates to team..."
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#fff",
                      padding: "12px",
                      fontSize: "13px"
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!loungeInput.trim()}
                    style={{
                      background: "rgba(232,102,10,0.1)",
                      border: "none",
                      borderRadius: "6px",
                      color: "var(--orange)",
                      padding: "0 18px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: loungeInput.trim() ? 1 : 0.4
                    }}
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* TAB 4: CORE APPLICATIONS */}
          {activeTab === "apps" && (
            <div className="animate-flowUp" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>Core Utilities</h2>
                <p style={{ fontSize: "13px", color: "#a1a1aa" }}>Active application platforms of Enver AI Tech & Atrea.</p>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                gap: "1.5rem"
              }}>
                {[
                  {
                    slug: "kariman",
                    label: "Emergency Logistics",
                    title: "Kariman",
                    desc: "Agentic medical response routing. Instantly verify and deploy doctors to emergency zones.",
                    accent: "#E8660A",
                    status: "live",
                  },
                  {
                    slug: "atrea",
                    label: "Recruitment Intelligence",
                    title: "Atrea",
                    desc: "Elite engineering hiring portal. AI deeply analyzes GitHub repos and system design capability.",
                    accent: "#1B2B4B",
                    status: "live",
                  },
                ].map((app) => (
                  <Link
                    key={app.slug}
                    href={`/apps/${app.slug}`}
                    style={{
                      display: "block",
                      padding: "2rem",
                      background: "#121214",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "10px",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = `${app.accent}40`;
                      el.style.transform = "translateY(-3px)";
                      el.style.boxShadow = `0 10px 30px rgba(0,0,0,0.2)`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(255,255,255,0.06)";
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: app.accent,
                        opacity: 0.5,
                      }}
                    />
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                      <div
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "10px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: app.accent,
                        }}
                      >
                        {app.label}
                      </div>
                      
                      <span style={{
                        fontSize: "9px",
                        fontFamily: "var(--mono)",
                        fontWeight: "bold",
                        padding: "2px 8px",
                        borderRadius: "100px",
                        background: app.status === "live" ? "rgba(34,197,94,0.1)" : "rgba(234,179,8,0.1)",
                        color: app.status === "live" ? "#4ade80" : "#fbbf24",
                        border: `1px solid ${app.status === "live" ? "rgba(34,197,94,0.15)" : "rgba(234,179,8,0.15)"}`
                      }}>
                        {app.status.toUpperCase()}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontWeight: 700,
                        fontSize: "18px",
                        color: "#fff",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {app.title}
                    </h3>
                    
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#a1a1aa",
                        lineHeight: 1.6,
                        marginBottom: "1.5rem"
                      }}
                    >
                      {app.desc}
                    </p>
                    
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontFamily: "var(--mono)",
                        fontSize: "11px",
                        color: app.accent,
                        fontWeight: "bold"
                      }}
                    >
                      Initialize Workspace Module <ChevronRight size={12} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
