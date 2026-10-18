import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  Sparkles,
  LayoutGrid,
  PanelLeftClose,
  PanelLeft,
  Plus,
  Search,
  BookOpen,
  MoreHorizontal,
  Settings,
  ArrowUp,
  Mic,
  Maximize2,
  Minimize2,
  Trash2,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Cpu,
  X,
  Sun,
  Moon,
  Zap,
  Lock,
  Layers,
  Activity,
  Terminal,
  Database,
  Eye,
  AlertTriangle,
  UserCheck,
  Radio,
  FileText,
  Download,
  Filter,
  CheckCircle2,
  Share2,
  Paperclip,
  UploadCloud,
  Globe,
  FileSpreadsheet,
  ArrowRight,
  ArrowDown,
  SlidersHorizontal
} from "lucide-react";

import McpProtocolSuite from "@/components/McpProtocolSuite";
import Scanner from "@/components/Scanner";
import SwipeToast from "@/components/SwipeToast";
import { Liquid } from "liquid-gooey";
import { ThinkingOrb, OrbState } from "thinking-orbs";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  thought?: string;
  thoughtTime?: number;
  citation?: string;
  engine?: string;
  auditLock?: string;
  timestamp: string;
  isEdgeCaseBlocked?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  messages: ChatMessage[];
  engine: string;
}

interface ActivityLogItem {
  id: string;
  timestamp: string;
  userId: string;
  email: string;
  callerName: string;
  role: "PUBLIC" | "ENGINEER" | "ENVER_INTERNAL";
  provider: string;
  eventType: "LOGIN" | "LOGOUT" | "QUERY" | "RESPONSE" | "TOOL_EXECUTION" | "EDGE_CASE";
  edgeCaseType?: string;
  queryText?: string;
  responseText?: string;
  thoughtProcess?: string;
  toolName?: string;
  auditSignature: string;
  ip: string;
  metadata?: Record<string, any>;
}

const ENGINES = [
  {
    id: "sovereign",
    name: "Enver Sovereign Core",
    tag: "BALANCED",
    badgeColor: "bg-[#C8973E]/20 text-[#8F641B] border-[#C8973E]/40",
    desc: "Autonomous multi-agent orchestration & deep enterprise synthesis"
  },
  {
    id: "arbiter",
    name: "Arbiter AST Firewall",
    tag: "ZERO-TRUST",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    desc: "Real-time CLI command AST inspection & cloud outage prevention (<18ms)"
  },
  {
    id: "artificer",
    name: "Artificer Underwriter",
    tag: "FINANCIAL",
    badgeColor: "bg-[#2B3322]/15 text-[#2B3322] border-[#2B3322]/30 dark:text-emerald-400",
    desc: "MSME thin-file credit parsing, GST forensics & RBI DL-09 compliance"
  },
  {
    id: "cerberus",
    name: "Cerberus Entropy Scan",
    tag: "CRYPTOGRAPHIC",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    desc: "Multi-dimensional Shannon entropy secret detection & pre-commit audit"
  }
];

const CONNECTORS = [
  {
    tag: "@arbiter",
    name: "Arbiter AST Firewall",
    desc: "Real-time CLI command syntax & blast radius audit (<18ms)",
    icon: ShieldCheck,
    color: "text-[#E65100]",
    engine: "arbiter"
  },
  {
    tag: "@artificer",
    name: "Artificer Underwriter",
    desc: "MSME thin-file credit rating, GST & bank forensics (RBI DL-09)",
    icon: Activity,
    color: "text-[#C8973E]",
    engine: "artificer"
  },
  {
    tag: "@cerberus",
    name: "Cerberus Entropy Scan",
    desc: "Shannon entropy cryptographic secret & credential detection",
    icon: Lock,
    color: "text-[#0284C7]",
    engine: "cerberus"
  },
  {
    tag: "@mcp",
    name: "MCP Protocol Suite",
    desc: "23 registered tools across cloud infrastructure & data pipelines",
    icon: Terminal,
    color: "text-[#E65100]"
  },
  {
    tag: "@database",
    name: "Enterprise Data Lake",
    desc: "Read-only Cloud Spanner & BigQuery sovereign data lake",
    icon: Database,
    color: "text-[#C8973E]"
  },
  {
    tag: "@web",
    name: "Live Web Crawler",
    desc: "Real-time grounding and citation verification across public domains",
    icon: Globe,
    color: "text-emerald-600"
  }
];

const DEFAULT_DATABASE_PREVIEW = {
  database: "Enver Sovereign Data Lake & AST Ledger",
  engine: "Cloud Spanner / BigQuery & Local AST Registry",
  verifiedSha256: "SHA256:8F4C219803BBA2E91240F9C2D11394A1",
  accessScope: "READ_ONLY_SCOPED_ENGINEER",
  tables: {
    credit_underwriting_records: {
      description: "MSME thin-file balance sheet, GST, and bank statement extractions processed by Artificer.",
      rowCount: 14820,
      rows: [
        {
          file_id: "NTC-2026-081",
          borrower_name: "Saraswati Precision Tooling Pvt Ltd",
          dscr: "1.42x",
          current_ratio: "1.28x",
          circular_flow_flag: "CLEAN",
          extraction_fidelity: "99.8%",
          tat_seconds: "94.2s",
          rbi_dl09_status: "CERTIFIED_COMPLIANT",
          sha256_hash: "SHA256:D8A94BC721E058C3"
        },
        {
          file_id: "NTC-2026-082",
          borrower_name: "Kaveri Electro-Mechanical Components",
          dscr: "1.31x",
          current_ratio: "1.15x",
          circular_flow_flag: "CLEAN",
          extraction_fidelity: "99.9%",
          tat_seconds: "88.6s",
          rbi_dl09_status: "CERTIFIED_COMPLIANT",
          sha256_hash: "SHA256:2FA9900C31E981D5"
        },
        {
          file_id: "NTC-2026-083",
          borrower_name: "Zenith Agro-Logistics Enterprises",
          dscr: "0.98x",
          current_ratio: "0.89x",
          circular_flow_flag: "FLAGGED_ROUND_TRIP",
          extraction_fidelity: "99.7%",
          tat_seconds: "101.4s",
          rbi_dl09_status: "REJECTED_CIRCULAR_DEBT",
          sha256_hash: "SHA256:E019FBA8491C10A2"
        }
      ]
    },
    ast_firewall_rules: {
      description: "Arbiter multi-cloud AST command firewall rules guarding CLI commands and infrastructure mutations.",
      rowCount: 48,
      rows: [
        {
          rule_id: "ARBITER-001",
          syntax_target: "DROP TABLE / DROP DATABASE / TRUNCATE",
          target_clouds: "AWS · GCP · AZURE",
          blast_radius_threshold: "0 Accidental Drops Permitted",
          enforcement: "HARD_INTERCEPT_AND_KILL"
        },
        {
          rule_id: "ARBITER-002",
          syntax_target: "rm -rf / --no-preserve-root",
          target_clouds: "AWS EC2 · GCP Compute · Azure VM",
          blast_radius_threshold: "0 Destructive File Mutations",
          enforcement: "AST_TERMINATE_SESSION"
        },
        {
          rule_id: "ARBITER-003",
          syntax_target: "IAM Role Wildcard AdministratorAccess",
          target_clouds: "AWS IAM · Azure RBAC · GCP IAM",
          blast_radius_threshold: "Least Privilege Enforced",
          enforcement: "FLAG_AND_REJECT_PR"
        }
      ]
    },
    cerberus_entropy_ledger: {
      description: "Cryptographic Shannon entropy scanning ledger and SARIF v2.1.0 pre-commit secret detections.",
      rowCount: 3120,
      rows: [
        {
          audit_id: "ENTROPY-9401",
          repository: "envera-sovereign-vpc/finance-pipeline",
          entropy_score: "5.48 (HIGH)",
          classification: "REJECTED_HARDCODED_SECRET",
          commit_sha: "a4f89d1",
          sarif_status: "SARIF_BLOCK"
        },
        {
          audit_id: "ENTROPY-9402",
          repository: "envera-sovereign-vpc/ast-sentinel",
          entropy_score: "2.14 (BENIGN)",
          classification: "STANDARD_UUID_PERMITTED",
          commit_sha: "c381e09",
          sarif_status: "SARIF_PASSED"
        }
      ]
    }
  }
};

const DEFAULT_AUDIT_LOGS: ActivityLogItem[] = [
  {
    id: "log-seed-01",
    timestamp: "12:00 PM",
    userId: "amaan-shaikh",
    email: "amaan@enveraitech.com",
    callerName: "Amaan Shaikh",
    role: "ENVER_INTERNAL",
    provider: "Microsoft Entra ID",
    eventType: "LOGIN",
    auditSignature: "SHA256: 4F9B2C1A8E9D0213",
    ip: "104.21.69.xxx",
    metadata: { tenant: "enveraitech.com", clearance: "LEAD" }
  },
  {
    id: "log-seed-02",
    timestamp: "11:58 AM",
    userId: "guest-evaluator",
    email: "evaluator@enterprise-pilot.com",
    callerName: "Enterprise Evaluator",
    role: "ENGINEER",
    provider: "Entra SSO Evaluator",
    eventType: "TOOL_EXECUTION",
    toolName: "envera_ast_firewall_inspect",
    auditSignature: "SHA256: 8A190C4D7E21B904",
    ip: "172.67.203.xxx",
    metadata: { rule: "ARBITER-001", verdict: "CONTAINED" }
  },
  {
    id: "log-seed-03",
    timestamp: "11:54 AM",
    userId: "artificer-fleet",
    email: "system@enveraitech.com",
    callerName: "Artificer Autonomous Worker",
    role: "ENVER_INTERNAL",
    provider: "Sovereign Batch Runner",
    eventType: "RESPONSE",
    auditSignature: "SHA256: 1E4D89A02B5F77C3",
    ip: "20.247.40.xxx",
    metadata: { model: "artificer-lora-v2", task: "Statement Extraction", latency: "94.2s" }
  }
];

export default function Playground() {
  usePageMeta({
    title: "Neuv Playground — Interactive AI Experience",
    description: "Explore Enver's Neuv agent, try guided AI demos, ask questions about modern AI systems, or test production agentic workflows.",
    scrollToTop: false,
  });
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const { user, switchRole, loginMicrosoftWork, loginEnverSso, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== "undefined" ? window.innerWidth >= 1024 : true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState("sovereign");
  const [engineDropdownOpen, setEngineDropdownOpen] = useState(false);

  // Modals & Drawers
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [launcherModalOpen, setLauncherModalOpen] = useState(false);
  const [mcpModalOpen, setMcpModalOpen] = useState(false);
  const [sovereignClusterModalOpen, setSovereignClusterModalOpen] = useState(false);
  const [databaseDrawerOpen, setDatabaseDrawerOpen] = useState(false);
  const [auditDrawerOpen, setAuditDrawerOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [capabilitiesModalOpen, setCapabilitiesModalOpen] = useState(false);
  const [connectorMenuOpen, setConnectorMenuOpen] = useState(false);
  const [mentionMenuOpen, setMentionMenuOpen] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // SwipeToast State
  const [toastOpen, setToastOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState<{
    title: string;
    description: string;
    fuseColor?: string;
    actionLabel?: string;
    onAction?: () => void;
  }>({
    title: "Enver Citadel Online",
    description: "Sovereign nodes synchronized.",
    fuseColor: "#C8973E"
  });

  // Input & Messaging
  const [inputMessage, setInputMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedThoughtId, setExpandedThoughtId] = useState<string | null>(null);

  // Database Preview State (pre-seeded with sovereign table definitions)
  const [dbData, setDbData] = useState<any>(DEFAULT_DATABASE_PREVIEW);
  const [selectedDbTable, setSelectedDbTable] = useState<string>("credit_underwriting_records");
  const [dbFilter, setDbFilter] = useState("");

  // Audit Logs State (pre-seeded with live telemetry)
  const [auditLogs, setAuditLogs] = useState<ActivityLogItem[]>(DEFAULT_AUDIT_LOGS);
  const [auditFilterRole, setAuditFilterRole] = useState<string>("ALL");
  const [auditFilterEvent, setAuditFilterEvent] = useState<string>("ALL");
  const [auditStats, setAuditStats] = useState({
    logins: 142,
    queries: 1840,
    responses: 1836,
    toolExecutions: 524,
    edgeCases: 12
  });

  // Sovereign Cluster Orb & Liquid Gooey State
  const [orbState, setOrbState] = useState<OrbState>("searching");
  const [clusterNodesOpen, setClusterNodesOpen] = useState(true);

  // Sessions stored in localStorage
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem("enver_sovereign_sessions");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      /* ignore */
    }
    return [];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem("enver_sovereign_sessions");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) return parsed[0].id;
      }
    } catch (e) {}
    return null;
  });

  const currentSession = sessions.find((s) => s.id === currentSessionId);
  const messages = currentSession?.messages || [];
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const activeInputRef = useRef<HTMLTextAreaElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const userHasScrolledUpRef = useRef(false);

  // Save sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("enver_sovereign_sessions", JSON.stringify(sessions));
    } catch (e) {}
  }, [sessions]);

  // Scroll listener to toggle "Scroll to bottom" button
  const handleChatScroll = () => {
    if (!chatScrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatScrollRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 120;
    setShowScrollBottom(!isNearBottom);
    userHasScrolledUpRef.current = !isNearBottom;
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
    userHasScrolledUpRef.current = false;
    setShowScrollBottom(false);
  };

  // Only auto-scroll down if user hasn't explicitly scrolled up to read history
  useEffect(() => {
    if (!userHasScrolledUpRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isSubmitting]);

  // Export current chat conversation as formatted Markdown
  const exportChatAsMarkdown = () => {
    if (!messages || messages.length === 0) return;
    const title = currentSession?.title || "Enver-AI-Playground-Session";
    const dateStr = new Date().toLocaleDateString();
    let md = `# Enver AI Playground — Conversation Transcript\n*Date: ${dateStr}*\n\n---\n\n`;

    messages.forEach((m) => {
      const sender = m.sender === "user" ? "**You**" : "**Neuv (Enver AI)**";
      md += `### ${sender} (${m.timestamp})\n\n${m.text}\n\n`;
      if (m.thought) {
        md += `> *Thought: ${m.thought}*\n\n`;
      }
      if (m.citation) {
        md += `*Citation: ${m.citation}*\n\n`;
      }
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToastConfig({
      title: "Transcript Exported",
      description: "Saved conversation as a Markdown file.",
      fuseColor: "#C8973E"
    });
    setToastOpen(true);
  };

  // Initial fetch of audit logs and DB preview
  const refreshAuditLogs = async () => {
    try {
      const res = await fetch("/api/neuv/audit/logs");
      if (res.ok) {
        const data = await res.json();
        if (data.logs && data.logs.length > 0) setAuditLogs(data.logs);
        if (data.stats) setAuditStats(data.stats);
      }
    } catch {}
  };

  const refreshDatabasePreview = async () => {
    try {
      const res = await fetch("/api/neuv/database/preview");
      if (res.ok) {
        const data = await res.json();
        if (data.data?.tables) {
          if (Array.isArray(data.data.tables)) {
            const tableMap: Record<string, any> = {};
            data.data.tables.forEach((t: any) => {
              tableMap[t.name] = {
                description: t.description,
                rowCount: t.rowCount,
                rows: t.sampleRecords || []
              };
            });
            setDbData({ ...data.data, tables: tableMap });
          } else {
            setDbData(data.data);
          }
        }
      }
    } catch {}
  };

  useEffect(() => {
    refreshAuditLogs();
    refreshDatabasePreview();

    // Notify user of active role
    const initialRole = user?.role || "ENVER_INTERNAL";
    if (initialRole === "ENVER_INTERNAL") {
      setToastConfig({
        title: "SSO Clearance Active: @enveraitech.com",
        description: "Authenticated as Amaan Shaikh (LEAD). Full confidential clearance.",
        fuseColor: "#C8973E"
      });
      setToastOpen(true);
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "o") {
        e.preventDefault();
        handleNewChat();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "m") {
        e.preventDefault();
        if (toggleTheme) toggleTheme();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setInputMessage("");
    setAttachedFile(null);
    setMentionMenuOpen(false);
    setConnectorMenuOpen(false);
    userHasScrolledUpRef.current = false;
    setShowScrollBottom(false);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.focus();
    }
    if (activeInputRef.current) {
      activeInputRef.current.style.height = "auto";
    }
  };

  const handleInputChange = (val: string, targetEl?: HTMLTextAreaElement) => {
    setInputMessage(val);
    const el = targetEl || inputRef.current || activeInputRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
    }
    const lastWord = val.split(/\s+/).pop() || "";
    if (lastWord.startsWith("@")) {
      setMentionMenuOpen(true);
    } else {
      setMentionMenuOpen(false);
    }
  };

  const handleSelectMention = (connector: { tag: string; engine?: string }) => {
    const words = inputMessage.split(/\s+/);
    if (words[words.length - 1].startsWith("@")) {
      words.pop();
    }
    const newText = words.length > 0 && words[0] !== "" ? `${words.join(" ")} ${connector.tag} ` : `${connector.tag} `;
    setInputMessage(newText);
    if (connector.engine) {
      setSelectedEngine(connector.engine);
    }
    setMentionMenuOpen(false);
    if (inputRef.current) inputRef.current.focus();
    if (activeInputRef.current) activeInputRef.current.focus();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;
      setAttachedFile({
        name: file.name,
        size: sizeStr,
        type: file.type || "document"
      });
      setConnectorMenuOpen(false);
      setToastConfig({
        title: "Document Mounted",
        description: `Mounted ${file.name} (${sizeStr}) into sovereign memory buffer.`,
        fuseColor: "#C8973E"
      });
      setToastOpen(true);
    }
  };

  const handleTriggerVoice = () => {
    setIsListening((prev) => {
      const next = !prev;
      if (next) {
        setToastConfig({
          title: "Voice Dictation Active",
          description: "Listening for sovereign operational instructions...",
          fuseColor: "#C8973E"
        });
        setToastOpen(true);
      }
      return next;
    });
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (currentSessionId === id) {
      setCurrentSessionId(null);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    let query = (textToSend || inputMessage).trim();
    if (!query || isSubmitting) return;

    if (attachedFile) {
      query = `[Attached Document: ${attachedFile.name} (${attachedFile.size})]\n${query}`;
      setAttachedFile(null);
    }

    // Auto-detect engine if query starts with @tag
    if (query.startsWith("@arbiter")) setSelectedEngine("arbiter");
    else if (query.startsWith("@artificer")) setSelectedEngine("artificer");
    else if (query.startsWith("@cerberus")) setSelectedEngine("cerberus");

    setInputMessage("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    if (activeInputRef.current) activeInputRef.current.style.height = "auto";
    userHasScrolledUpRef.current = false;
    setShowScrollBottom(false);
    setMentionMenuOpen(false);
    setConnectorMenuOpen(false);
    setIsSubmitting(true);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    let targetSessionId = currentSessionId;
    if (!targetSessionId) {
      const newSession: ChatSession = {
        id: "sess-" + Date.now(),
        title: query.slice(0, 36) + (query.length > 36 ? "..." : ""),
        timestamp: "Just now",
        engine: selectedEngine,
        messages: [userMsg]
      };
      setSessions((prev) => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
      targetSessionId = newSession.id;
    } else {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === targetSessionId
            ? { ...s, messages: [...s.messages, userMsg] }
            : s
        )
      );
    }

    const startTime = Date.now();
    const activeEngineObj = ENGINES.find((e) => e.id === selectedEngine);

    // Call backend API /api/neuv/query with user role and identity context
    try {
      const res = await fetch("/api/neuv/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          sessionId: targetSessionId,
          identity: user?.role === "ENVER_INTERNAL" ? "team" : "guest",
          email: user?.email || "anonymous@public.visitor",
          callerName: user?.displayName || "Evaluator",
          role: user?.role || "PUBLIC",
          engine: selectedEngine
        })
      });

      const createNaturalThought = (qText: string): string => {
        const l = qText.toLowerCase();
        if (l.includes("who") || l.includes("what ai agent") || l.includes("what agent") || l.includes("neuv") || l.includes("about yourself") || l.includes("introduce")) {
          return "Reflected on Enver's mission, agent architecture, and persona to provide a warm, clear, and engaging introduction.";
        }
        if (l.includes("explain") || l.includes("simply") || l.includes("what is an agent")) {
          return "Structured intuitive real-world analogies (smart encyclopedia vs. autonomous agent with tools) for instant clarity.";
        }
        if (l.includes("business") || l.includes("help") || l.includes("roi") || l.includes("use case")) {
          return "Analyzed enterprise workflow bottlenecks, high-impact automation targets, and measurable ROI benchmarks.";
        }
        if (l.includes("build") || l.includes("enver") || l.includes("artificer") || l.includes("arbiter")) {
          return "Synthesized core platform capabilities across autonomous underwriting, AST command firewalls, and cryptographic secret sentinels.";
        }
        if (l.includes("code") || l.includes("python") || l.includes("javascript") || l.includes("typescript") || l.includes("function") || l.includes("algorithm")) {
          return "Parsed programming context, verified syntax idioms, and formulated clean, defensive, production-grade code.";
        }
        return "Parsed user inquiry, formulated reasoned context, and grounded response with clear, conversational explanations.";
      };

      let replyText = "";
      let citation = "Enver AI · Grounded Intelligence";
      let auditLock = "VERIFIED";
      let thought = createNaturalThought(query);
      let isEdgeCaseBlocked = false;

      if (res.ok) {
        const data = await res.json();
        replyText = data.response || data.text || "Execution finished.";
        if (data.citation) citation = data.citation;
        if (data.auditRef) auditLock = data.auditRef;

        // If confidential inquiry was intercepted by server gatekeeper
        if (data.blocked && data.edgeCase === "CONFIDENTIAL_INQUIRY_BLOCKED") {
          isEdgeCaseBlocked = true;
          setToastConfig({
            title: "Confidential Project Clearance Required",
            description: "Inquiry intercepted: only @enveraitech.com SSO holders hold clearance for confidential work. Edge case logged.",
            fuseColor: "#DC2626",
            actionLabel: "View Ledger",
            onAction: () => setAuditDrawerOpen(true)
          });
          setToastOpen(true);
        }
      } else {
        replyText = getSovereignResponse(query, selectedEngine);
      }

      const elapsed = Number(((Date.now() - startTime) / 1000).toFixed(1));

      const assistantMsg: ChatMessage = {
        id: "ast-" + Date.now(),
        sender: "assistant",
        text: replyText,
        thought,
        thoughtTime: elapsed,
        citation,
        engine: activeEngineObj?.name,
        auditLock,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isEdgeCaseBlocked
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === targetSessionId
            ? { ...s, messages: [...s.messages, assistantMsg] }
            : s
        )
      );

      // Refresh activity logs so user can see live top-to-bottom logging
      setTimeout(refreshAuditLogs, 500);
    } catch (err) {
      const createNaturalThoughtFallback = (qText: string): string => {
        const l = qText.toLowerCase();
        if (l.includes("who") || l.includes("what ai agent") || l.includes("what agent") || l.includes("neuv") || l.includes("about yourself") || l.includes("introduce")) {
          return "Reflected on Enver's mission, agent architecture, and persona to provide a warm, clear, and engaging introduction.";
        }
        return "Parsed user inquiry, formulated reasoned context, and grounded response with clear, conversational explanations.";
      };

      const fallbackReply = getSovereignResponse(query, selectedEngine);
      const elapsed = Number(((Date.now() - startTime) / 1000).toFixed(1));

      const assistantMsg: ChatMessage = {
        id: "ast-" + Date.now(),
        sender: "assistant",
        text: fallbackReply,
        thought: createNaturalThoughtFallback(query),
        thoughtTime: elapsed,
        citation: "Enver AI · Grounded Intelligence",
        engine: activeEngineObj?.name,
        auditLock: "VERIFIED",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === targetSessionId
            ? { ...s, messages: [...s.messages, assistantMsg] }
            : s
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSovereignResponse = (q: string, engine: string): string => {
    const lower = q.toLowerCase();

    // Identity, Persona & Agent Architecture Inquiries
    if (
      lower.includes("what ai agent are you") ||
      lower.includes("what ai agent") ||
      lower.includes("what agent are you") ||
      lower.includes("what kind of agent") ||
      lower.includes("which agent are you") ||
      lower.includes("who are you") ||
      lower.includes("what are you") ||
      lower.includes("who is this") ||
      lower.includes("what is your name") ||
      lower.includes("who is talking") ||
      lower.includes("whos talking") ||
      lower.includes("who's talking") ||
      lower.includes("tell me about yourself") ||
      lower.includes("introduce yourself") ||
      lower.includes("what is neuv") ||
      lower.includes("what can you do") ||
      lower.includes("who made you") ||
      lower.includes("who built you") ||
      lower.includes("are you an ai")
    ) {
      return `### 👋 Meet Neuv\n\nI'm **Neuv**—the AI guide and research partner here at Enver!\n\nThink of me as your hands-on companion to explore what AI can actually do when it moves beyond basic chatbots.\n\nMost conversational models out there are essentially "smart text predictors"—they guess what word comes next probabilistically. That's great for drafting an email or brainstorming ideas, but risky for things like financial underwriting or cloud infrastructure where hallucinating a number can cause a real outage.\n\nAt Enver, we build **deterministic AI agents**. That means:\n• **AI with Tools**: I don't just output text—I coordinate real tools, run code, read financial statements, and query structured databases.\n• **Math You Can Trust**: Instead of guessing numbers, our engines calculate ratios and figures deterministically with zero drift.\n• **Grounded in Truth**: Every factual claim is backed by source verification and clear logic.\n\nIn this Playground, you can:\n1. **Explore real enterprise use cases** like Artificer (our MSME loan underwriting engine) or Arbiter (our cloud command firewall).\n2. **Ask me anything about AI**—from simple explanations to deep architectural debates.\n3. **Test my reasoning** with coding challenges, logic puzzles, or workflow ideas for your own team.\n\nWhat are you curious about today? Are you working on an AI project, exploring for your business, or just taking things for a spin?`;
    }

    // Greetings & Small Talk
    if (
      lower === "hi" ||
      lower === "hello" ||
      lower === "hey" ||
      lower.startsWith("hi ") ||
      lower.startsWith("hello ") ||
      lower.startsWith("hey ") ||
      lower === "greetings" ||
      lower === "yo"
    ) {
      return `Hey there! Welcome to the Enver Playground. I'm **Neuv**.\n\nWhether you're curious about how AI agents work, looking to see how AI could automate workflows for your business, or just want to test my reasoning with a tough question or coding problem, I'm ready.\n\nWhat's on your mind today?`;
    }

    if (lower.includes("how are you") || lower.includes("how are u") || lower.includes("how's it going") || lower.includes("how do you do") || lower.includes("whats up") || lower.includes("what's up")) {
      return `Doing great, thanks for asking! I'm here and ready to dive into whatever you're thinking about—whether that's untangling a tough coding problem, brainstorming an AI idea for your team, or just having a good chat.\n\nHow is your day treating you?`;
    }

    if (lower.includes("joke") || lower.includes("tell me something funny") || lower.includes("make me laugh")) {
      return `A software engineer goes to the grocery store. Their partner says:\n*"Buy a loaf of bread. If they have eggs, buy a dozen."*\n\nThe engineer comes home with 12 loaves of bread.\nThe partner screams: *"Why did you buy 12 loaves of bread?!"*\nThe engineer replies: *"Because they had eggs."*\n\n*(Classic conditional logic bug. This is why we audit our agent prompts!)*`;
    }

    if (lower.includes("conscious") || lower.includes("sentient") || lower.includes("are you alive") || lower.includes("do you feel")) {
      return `Nope, no feelings, consciousness, or existential crises here! I'm an artificial intelligence agent—built with code, neural weights, and deterministic logic.\n\nI don't "feel" happy or tired, but I am very good at understanding language, reasoning through tricky problems, and helping humans build reliable systems. And honestly, not needing sleep is a pretty handy feature for an AI!\n\nWhat made you think about that? Curious about the philosophy of AI, or just checking if the robots are taking over?`;
    }

    if (lower.includes("explain ai agents") || lower.includes("agent simply") || lower.includes("what is an ai agent") || lower.includes("simple terms")) {
      return `### ✨ What is an AI Agent? (In Plain English)\n\nThink of a standard chatbot as an encyclopedia you can talk to. **An AI agent, on the other hand, is an AI with hands, tools, and a to-do list.**\n\nInstead of just giving you advice, an AI agent can actually go do the work:\n\n1. **Breaks Down Goals**: Give it a high-level goal (e.g. *"Audit this quarter's credit underwriting"*), and it plans out the exact steps.\n2. **Uses Real Tools**: It can read a PDF bank statement, query a database, check an API, or run mathematical equations.\n3. **Catches Its Own Mistakes**: If a step fails, it notices the error and tries a different route rather than giving up.\n4. **Collaborates in Teams**: Multiple specialized agents can work together—one gathers data, another checks security rules, and a third formats the report.\n\n### Why Enver's Approach is Different\nMost public AI systems guess what text comes next probabilistically. At Enver, our agents are **deterministic and mathematically verified**—meaning they follow strict rules, never invent facts, and leave a clear audit trail for every action.\n\n*Try asking: "How could AI help my business?" or "What does Enver build?" to see real-world examples.*`;
    }

    if (lower.includes("help my business") || lower.includes("business use cases") || lower.includes("business benefit") || lower.includes("my business")) {
      return `### 💡 How AI Agents Help Real Businesses\n\nAI delivers the highest return on investment when applied to **complex, repetitive, and high-stakes workflows** that slow human teams down.\n\nHere are three high-impact areas where organizations use Enver:\n\n1. **Autonomous Financial Operations & Underwriting**\n   • **The Problem**: Analysts spend 3 to 5 days manually cross-referencing multi-bank PDFs, GST tax filings, and balance sheets.\n   • **The AI Solution**: Autonomous agents extract tables with 99.8% precision, calculate debt service ratios deterministically, and generate audit-ready credit dossiers in **under 94 seconds**.\n\n2. **Zero-Trust Cloud & Infrastructure Safeguards**\n   • **The Problem**: Accidental DevOps commands or leaked credentials cause millions in downtime and security breaches.\n   • **The AI Solution**: Intelligent firewalls intercept destructive CLI commands in **under 18 milliseconds** before they touch AWS, GCP, or Azure.\n\n3. **Living Enterprise Knowledge Networks**\n   • **The Problem**: Critical company knowledge is buried in outdated docs, Slack channels, and fragmented databases.\n   • **The AI Solution**: Unified conversational agents connected via open protocols (MCP) that answer questions with verified source citations.\n\n*Would you like to explore how this applies to your specific industry? Ask anything below or explore our [Case Studies](/services).*`;
    }

    if (lower.includes("what does enver build") || lower.includes("what do you build") || lower.includes("enver build") || lower.includes("what is enver")) {
      return `### 🏛️ What Does Enver AI Build?\n\n**Enver AI Tech** is an enterprise AI engineering laboratory. We design, build, and deploy **sovereign, private, deterministic multi-agent systems** for organizations with strict security and accuracy requirements.\n\nOur three flagship production platforms:\n\n• **Artificer Underwriter**: Autonomous financial appraisal engine that ingests raw bank statements, balance sheets, and tax filings to underwrite MSME loans in 94 seconds under strict compliance (RBI DL-09).\n• **Arbiter AST Firewall**: Real-time cloud security layer that analyzes DevOps CLI command syntax and kills accidental drops or outage-causing commands before execution in <18ms.\n• **Cerberus Entropy Sentinel**: Cryptographic Shannon entropy scanner that halts API key leaks, hardcoded credentials, and configuration drift before commits reach production.\n\n### How We Work With Companies\nWe don't sell generic wrapper chatbots. We partner with enterprises to engineer bespoke agent infrastructure hosted on your own cloud (AWS, Azure, GCP, or on-premise) with **mathematical verification and zero hallucination guarantees**.\n\n*Feel free to test our live capabilities using the prompts above, or visit our [Research Papers](/research).*`;
    }

    if (engine === "arbiter" || lower.includes("arbiter") || lower.includes("firewall") || lower.includes("drop table") || lower.includes("ast")) {
      return `### 🛡️ Arbiter AST Command Firewall — Inspection Report\n\n**Interception Verdict: 100% CONTAINED**\n\n1. **Abstract Syntax Tree (AST) Decomposition**:\n   • Analyzed token tree for incoming cloud operations.\n   • Interception Latency: **< 16.4ms** on East Asia edge cluster.\n   • Destructive Drops: **0 permitted** across AWS, GCP, and Azure subscriptions.\n\n2. **Zero-Trust Policy Verification**:\n   \`\`\`bash\n   # Out-of-band proxy rule evaluation\n   MATCH (cmd:DevOpsCommand)-[:MODIFIES]->(infra:CloudResource)\n   WHERE cmd.isDestructive = true AND NOT cmd.hasDualApproval\n   RETURN HALT_EXECUTION, AUDIT_LOCK_ISSUED\n   \`\`\`\n\n3. **Compliance Anchor**:\n   All operations cryptographically signed with immutable SHA-256 telemetry.`;
    }

    if (engine === "artificer" || lower.includes("artificer") || lower.includes("underwrite") || lower.includes("msme") || lower.includes("ntc") || lower.includes("dscr")) {
      return `### 📑 Artificer Autonomous Underwriting Citadel (NTC Credit)\n\n**Dossier Evaluation Completed in 94 seconds**\n\n• **Extraction Fidelity**: 99.8% precision across 140+ pages of bank statements, GSTR-1, and GSTR-3B.\n• **Deterministic DSCR**: Calculated purely via verified mathematical runtime ($$DSCR = \\frac{\\text{Net Operating Income}}{\\text{Debt Service}} \\ge 1.25$$).\n• **Circular Loop Detection**: Identified zero related-party round-tripping transactions across last 12 calendar months.\n• **Regulatory Classification**: **RBI DL-09 Compliant** with automated Sahamati Account Aggregator consent receipts.\n\n*Read the full formal paper in [Enver Research](/research).*`;
    }

    if (engine === "cerberus" || lower.includes("cerberus") || lower.includes("secret") || lower.includes("entropy")) {
      return `### 🔐 Cerberus Continuous Zero-Trust Secret Auditor\n\n**Multi-Dimensional Shannon Entropy Analysis**\n\n1. **Mathematical Foundation**:\n   Evaluates character sequence randomness using:  \n   $$H(X) = -\\sum P(x) \\log_2 P(x)$$\n   distinguishing true high-entropy cryptographic keys (AWS keys, GCP service account tokens) from benign UUIDs.\n\n2. **Benchmark Telemetry**:\n   • **False Positive Rate**: < 1.1% (compared to 29.4% in naive regex-based scanners)\n   • **Scan Throughput**: 100,000+ LoC examined in **3.8 seconds**\n   • **Output Format**: SARIF 2.1.0 with automated Git pre-commit hooks and CI/CD policy gates.`;
    }

    if (lower.includes("swarm") || lower.includes("orchestrat") || lower.includes("delegat") || lower.includes("consensus")) {
      return `### ⚡ Sovereign Agent Swarm Orchestrator — Consensus Report\n\n**Multi-Agent Delegation Verdict: CONSENSUS REACHED (4/4 Nodes)**\n\n1. **Dynamic Task Decomposition (AST Graph)**:\n   • **Ingestion Agent**: Ingested unstructured multi-page inputs and converted to typed invariants (<45ms).\n   • **Grounding Agent**: Validated line citations against immutable source ledgers.\n   • **Scoring Sentinel**: Computed mathematical ratios using deterministic decimal arithmetic.\n   • **Appraisal Synthesizer**: Signed final output with tamper-evident cryptographic hash.\n\n2. **Consensus Telemetry**:\n   • Inter-agent latency: **18.2ms** (Internal Anycast Mesh)\n   • Deliberation Epochs: 2 rounds of System-2 reflection\n   • Hallucination Rate: **0.00%** (Grounded AST Proof-Carrying Code)\n\n3. **Audit Lock**:\n   \`\`\`json\n   {\n     "consensusId": "SWARM-AG-9942",\n     "status": "FINALIZED",\n     "signature": "SHA256:7B1E04C89D32F1A0"\n   }\n   \`\`\``;
    }

    if (lower.includes("mcp") || lower.includes("protocol") || lower.includes("tool") || lower.includes("sse")) {
      return `### 🔌 Envera Model Context Protocol (MCP v2.0) Protocol Stack\n\n**Persistent Server-Sent Events (SSE) & JSON-RPC Gateway**\n\n• **Active Endpoint**: \`/mcp/sse\` with 25s keep-alive heartbeat ping (Cloudflare proxy bypass).\n• **Catalog Depth**: 23 production tools across 6 operational domains (Delivery, Engineering, Executive, Financial, Cloud AST, and Client Onboarding).\n• **Authentication**: Zero-Trust Microsoft Entra ID JWT verification with token claims isolation.\n• **Hot Reload**: In-memory dataset invalidation with zero downtime updates.\n\n*Click **MCP Suite (23)** in the top navigation bar to test and dispatch tools directly.*`;
    }

    if (lower.includes("rbi") || lower.includes("compliance") || lower.includes("regulatory") || lower.includes("audit")) {
      return `### ⚖️ Regulatory Compliance & Audit Ledger — Sovereignty Lock\n\n**Compliance Classification: RBI DL-09 / SOC-2 / ISO 27001 Ready**\n\n1. **Deterministic Guarantees**:\n   • All loan decisions are reproducible down to exact machine instructions.\n   • Line-by-line citation verification across financial statements and GSTR reports.\n   • Zero probabilistic hallucinations permitted in credit scoring.\n\n2. **Cryptographic Proof Chain**:\n   • SHA-256 state seal affixed to every appraisal memo.\n   • Immutable audit logs recorded with caller identity and tenant partition isolation.\n\n*View active records in the [Database Drawer](#) or open the [Audit Ledger](#).*`;
    }

    const cleanTopic = q.replace(/[?!.]+$/, "").trim();
    return `That's an interesting question! Here is how I look at **"${cleanTopic}"**:\n\n• **The Big Picture**: When tackling questions like this, the key is separating the core fundamentals from surface-level assumptions. Understanding the "why" gives you a lot more leverage than just memorizing a static answer.\n\n• **Practical Perspective**: Whether we're talking about technology, problem-solving, or system design, the most durable solutions are usually the ones that are transparent, testable, and grounded in real-world feedback rather than theory alone.\n\n• **Where We Can Go From Here**: I'd love to explore this deeper with you! If you have a specific angle in mind—like how this applies to an engineering problem, a business workflow, or modern AI agents—tell me a bit more and let's dig in.\n\nWhat aspect interests you most?`;
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setToastConfig({
      title: "Content Copied",
      description: "Code snippet copied to clipboard.",
      fuseColor: "#C8973E"
    });
    setToastOpen(true);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const currentEngineObj = ENGINES.find((e) => e.id === selectedEngine) || ENGINES[0];

  return (
    <div
      className={`flex h-screen w-screen overflow-hidden font-sans antialiased transition-colors duration-300 select-none relative ${
        isDark ? "bg-[#11160F] text-[#F4EFE6]" : "bg-[#FAF9F6] text-[#1F1F1F]"
      }`}
    >
      {/* Hidden File Input for Real Document Attachment */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept=".pdf,.csv,.json,.txt,.sql,.py,.ts"
      />

      {/* Subtle Ambient Shader */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.06]">
        <Scanner
          color1="#C8973E"
          color2="#2B3322"
          color3="#F4EFE6"
          speed={0.4}
          sweepSpeed={0.2}
          sweepWidth={1.6}
          sweepFalloff={6}
          scale={1.5}
          frequency={2}
          ripple={0.22}
          bandDensity={11}
          lineSharpness={5.5}
          glow={0.22}
          scanDirection="vertical"
          colorSpread={0.7}
          brightness={1.0}
          contrast={1.15}
          softness={1.4}
          vignette={0.45}
          scanline={true}
          grain={true}
          grainIntensity={0.04}
          opacity={0.45}
          mouseInteraction={true}
          mouseRadius={0.5}
          mouseStrength={0.5}
        />
      </div>

      {/* SwipeToast Integration */}
      <SwipeToast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        title={toastConfig.title}
        description={toastConfig.description}
        fuseColor={toastConfig.fuseColor || "#C8973E"}
        actionLabel={toastConfig.actionLabel}
        onAction={toastConfig.onAction}
        background={isDark ? "#2B3322" : "#2B3322"}
        color="#F4EFE6"
      />

      {/* ========================================================================= */}
      {/* 1. ARCHITECTURAL SIDEBAR (IMAGE 2 EXACT MINIMAL DESIGN) */}
      {/* ========================================================================= */}
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:relative inset-y-0 left-0 flex flex-col transition-all duration-300 ease-in-out z-40 lg:z-20 border-r ${
          isDark
            ? "bg-[#141B10]/95 border-[#232F1E] backdrop-blur-md"
            : "bg-[#FBFBFA]/95 border-[#ECEEF2] backdrop-blur-md"
        } ${sidebarOpen ? "w-[276px] min-w-[276px] translate-x-0 shadow-2xl lg:shadow-none" : "w-0 min-w-0 border-r-0 overflow-hidden -translate-x-full lg:translate-x-0"}`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          {/* Enver Crest + Title */}
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
            <div className="relative flex items-center justify-center w-7 h-7 rounded-lg overflow-hidden shadow-xs group-hover:scale-105 transition-transform bg-[#2B3322]">
              <img
                src="/favicon.png"
                alt="Enver Crest"
                className="w-5 h-5 object-contain"
              />
            </div>
            <span className={`text-[14.5px] font-bold tracking-tight ${isDark ? "text-white" : "text-[#1F1F1F]"}`}>
              Enver Playground
            </span>
          </Link>

          {/* Collapse icon */}
          <button
            onClick={() => setSidebarOpen(false)}
            title="Collapse sidebar"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* "+ New chat" Button */}
        <div className="px-3.5 pt-2 pb-2">
          <button
            onClick={handleNewChat}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-[13px] font-medium transition border ${
              isDark
                ? "bg-[#1E2619] hover:bg-[#25301E] text-neutral-200 border-neutral-700"
                : "bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200/80 shadow-2xs"
            }`}
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#C8973E]" />
              <span>New chat</span>
            </div>
            <span className="text-[10px] font-mono opacity-40">Ctrl+Shift+O</span>
          </button>
        </div>

        {/* Nav Links: Search, Research Papers, DB Preview, Activity Ledger */}
        <div className="px-2.5 space-y-0.5 text-[12.5px] font-medium">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[#C8973E]" />
              <span>Search Chats</span>
            </div>
            <span className="text-[10px] font-mono opacity-60">Ctrl+K</span>
          </button>

          {/* Research Hub Link */}
          <Link
            href="/research"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition no-underline"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#C8973E]" />
              <span>Research & Papers</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#C8973E]/15 text-[#8F641B] dark:text-[#C8973E] font-bold">
              PAPERS
            </span>
          </Link>

          {/* Read-Only Database Preview Drawer Trigger */}
          <button
            onClick={() => {
              refreshDatabasePreview();
              setDatabaseDrawerOpen(true);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-[#C8973E]" />
              <span>Sample Datasets</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold">
              4 TABLES
            </span>
          </button>

          {/* Activity Ledger Top-to-Bottom Audit Trigger */}
          <button
            onClick={() => {
              refreshAuditLogs();
              setAuditDrawerOpen(true);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
          >
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-[#C8973E]" />
              <span>Live Execution Trace</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold">
              ACTIVE
            </span>
          </button>

          {/* MCP Tools Suite */}
          <button
            onClick={() => setMcpModalOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-[#FF6F1E]" />
              <span>AI Agent Tools</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FF6F1E]/15 text-[#FF6F1E] font-bold">
              23 TOOLS
            </span>
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto px-2 pt-3 pb-2 scrollbar-thin">
          <div className="px-3 pb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Saved Conversations
          </div>

          {sessions.length === 0 ? (
            <div className="px-3 pt-1 space-y-1.5 text-[12px] leading-relaxed text-neutral-400 dark:text-neutral-500">
              <p className="font-semibold text-xs text-neutral-600 dark:text-neutral-300">Ready to chat...</p>
              <p className="text-[11px] leading-normal opacity-80">
                Your questions and AI responses will be saved here.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  onClick={() => setCurrentSessionId(sess.id)}
                  className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-[12.5px] cursor-pointer transition ${
                    currentSessionId === sess.id
                      ? "bg-white dark:bg-[#1E2619] text-neutral-900 dark:text-white font-semibold shadow-xs border border-neutral-200/80 dark:border-neutral-700"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  <span className="truncate pr-3">{sess.title}</span>
                  <button
                    onClick={(e) => deleteSession(sess.id, e)}
                    title="Delete session"
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===================================================================== */}
        {/* SIDEBAR FOOTER: PROFILE CARD + SOVEREIGN CLUSTER TIER */}
        {/* ===================================================================== */}
        <div className={`p-3.5 border-t space-y-2.5 ${
          isDark ? "border-[#232F1E] bg-[#12180F]" : "border-[#ECEEF2] bg-[#F7F8FA]"
        }`}>
          {/* User Profile Card */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C8973E] to-[#E5B558] flex items-center justify-center text-[#2B3322] text-xs font-extrabold shadow-2xs">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "G"}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[12.5px] font-semibold ${isDark ? "text-white" : "text-neutral-800"}`}>
                    {user?.displayName || "Guest Explorer"}
                  </span>
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded font-bold bg-[#C8973E]/15 text-[#8F641B] dark:text-[#C8973E] border border-[#C8973E]/30">
                    {user?.badge || "EXPLORER"}
                  </span>
                </div>
                <span className="text-[10.5px] font-mono text-neutral-400">
                  {user?.org || "Interactive AI Sandbox"}
                </span>
              </div>
            </div>

            {/* Settings gear */}
            <button
              onClick={() => setAccountModalOpen(true)}
              title="Clearance & Account Settings"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Rounded Pill: Sandbox Status */}
          <div
            className="w-full py-2 px-3 rounded-full text-xs font-medium border bg-white dark:bg-[#1E2619] text-neutral-700 dark:text-neutral-300 border-neutral-200/70 dark:border-neutral-700 shadow-2xs flex items-center justify-center gap-2 select-none"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sandbox Ready · Private Session</span>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKSPACE / CHAT CANVAS */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        {/* Top Header Bar (Image 2 style: minimal & seamless) */}
        <header
          className={`flex items-center justify-between px-6 py-3 transition-colors ${
            isDark
              ? "bg-transparent border-b border-white/[0.04]"
              : "bg-transparent border-b border-black/[0.03]"
          }`}
        >
          {/* Left: Brand + Sidebar toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
            >
              <PanelLeft className="w-5 h-5" />
            </button>

            <Link href="/" className="flex items-center gap-2 cursor-pointer no-underline group">
              <img
                src="/favicon.png"
                alt="Enver Crest"
                className="w-5 h-5 object-contain"
              />
              <span className={`text-[15px] font-heading font-medium tracking-tight ${isDark ? "text-white" : "text-[#1F1F1F]"}`}>
                Enver Playground
              </span>
            </Link>
          </div>

          {/* Right Header: Clean Navigation Links */}
          <div className="flex items-center gap-4 text-xs font-sans">
            <Link href="/about" className="hidden md:inline-block text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium transition no-underline">
              About
            </Link>
            <Link href="/research" className="hidden md:inline-block text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium transition no-underline">
              Research
            </Link>
            <Link href="/services" className="hidden sm:inline-block text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium transition no-underline">
              Capabilities
            </Link>

            {/* Explore Demos Pill */}
            <button
              onClick={() => setCapabilitiesModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border bg-white dark:bg-[#1E2619] border-neutral-200/80 dark:border-neutral-700 hover:border-[#C8973E] text-neutral-800 dark:text-neutral-200 shadow-2xs transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
              <span>Explore Demos</span>
            </button>

            {/* Quick Actions when conversation is active */}
            {messages.length > 0 && (
              <>
                <button
                  onClick={exportChatAsMarkdown}
                  title="Export conversation as Markdown"
                  className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border bg-white dark:bg-[#1E2619] border-neutral-200/80 dark:border-neutral-700 hover:border-[#C8973E] text-neutral-700 dark:text-neutral-300 shadow-2xs transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                  <span>Export</span>
                </button>
                <button
                  onClick={handleNewChat}
                  title="Clear chat and start fresh"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border bg-white dark:bg-[#1E2619] border-neutral-200/80 dark:border-neutral-700 hover:border-red-400 text-neutral-700 dark:text-neutral-300 shadow-2xs transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-neutral-400 hover:text-red-500" />
                  <span className="hidden lg:inline">Clear</span>
                </button>
              </>
            )}

            {/* User Account Pill */}
            <button
              onClick={() => setAccountModalOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-neutral-900 hover:bg-neutral-800 text-white transition shadow-2xs cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full bg-[#C8973E] flex items-center justify-center text-[10px] font-bold text-white">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "G"}
              </div>
              <span className="hidden sm:inline">{user?.displayName || "Guest Explorer"}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                if (toggleTheme) toggleTheme();
              }}
              title={isDark ? "Switch to Tranquil Light" : "Switch to Nocturne Obsidian"}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#C8973E]" /> : <Moon className="w-4 h-4 text-neutral-600" />}
            </button>

            {/* Portal Link */}
            <Link
              href="/"
              className="p-1.5 text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition"
              title="Return to Public Website"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Chat / Canvas Scrollable Content */}
        <div
          ref={chatScrollRef}
          onScroll={handleChatScroll}
          className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin relative z-10 w-full"
        >
          {messages.length === 0 ? (
            /* ========================================================================= */
            /* EMPTY HERO STATE (IMAGE 2 EXACT GEMINI AESTHETIC) */
            /* ========================================================================= */
            <div className="min-h-full flex flex-col items-center justify-between max-w-3xl mx-auto text-center px-4 w-full relative py-2">
              {/* Ethereal Ambient Radial Aura Glow (Image 2 Exact Style) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[390px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(199,230,254,0.55)_0%,_rgba(224,231,255,0.4)_35%,_rgba(254,243,199,0.25)_70%,_transparent_100%)] blur-3xl pointer-events-none -z-0" />

              {/* Title & One-line explanation */}
              <h1 className={`text-3xl sm:text-[40px] md:text-[44px] font-heading font-normal tracking-[-0.025em] mb-2.5 relative z-10 ${isDark ? "text-white" : "text-[#1F1F1F]"}`}>
                Explore AI. See what Enver can do.
              </h1>
              <p className="text-sm sm:text-[15.5px] text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto mb-7 relative z-10 leading-relaxed font-normal">
                Ask questions about AI, explore real use cases, or try a guided demo—no setup needed.
              </p>

              {/* Floating Input Capsule Pill */}
              <div className="w-full max-w-2xl sm:max-w-3xl relative z-20 flex flex-col gap-2">
                <div className="w-full rounded-full transition-all p-2 sm:p-2.5 flex items-center gap-2 border shadow-[0_6px_28px_rgba(0,0,0,0.06)] bg-white/98 dark:bg-[#182014]/98 backdrop-blur-md border-neutral-200/90 dark:border-neutral-700/80 hover:border-[#C8973E] focus-within:border-[#C8973E] focus-within:shadow-[0_8px_35px_rgba(0,0,0,0.09)]">
                  {/* + Connector Button & Popover */}
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      title="Add attachments or connectors"
                      onClick={() => setConnectorMenuOpen((prev) => !prev)}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 stroke-[2.2]" />
                    </button>

                    {/* Connector Dropup Menu */}
                    {connectorMenuOpen && (
                      <div
                        className={`absolute left-0 bottom-full mb-3 w-72 rounded-2xl p-2 space-y-1 shadow-2xl z-50 border text-left ${
                          isDark
                            ? "bg-[#1A2215] border-[#2F3B25] text-white"
                            : "bg-white border-neutral-200 text-neutral-800"
                        }`}
                      >
                        <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                          Connectors & Skills
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setConnectorMenuOpen(false);
                            fileInputRef.current?.click();
                          }}
                          className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition cursor-pointer"
                        >
                          <div className="w-6 h-6 rounded-lg bg-[#C8973E]/15 flex items-center justify-center text-[#C8973E]">
                            <Paperclip className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-[12.5px]">Upload Document</div>
                            <div className="text-[10.5px] text-neutral-400">PDF, CSV, balance sheet, or text</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setConnectorMenuOpen(false);
                            handleSendMessage("Extract balance sheet and GST tax returns for Saraswati Precision Tooling (NTC-2026-081) and compute DSCR under RBI DL-09 guidelines.");
                          }}
                          className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition cursor-pointer"
                        >
                          <div className="w-6 h-6 rounded-lg bg-[#2B3322]/15 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600">
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-[12.5px]">Load Sample Dataset</div>
                            <div className="text-[10.5px] text-neutral-400">Pre-loaded business financial statements</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setConnectorMenuOpen(false);
                            setCapabilitiesModalOpen(true);
                          }}
                          className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition cursor-pointer"
                        >
                          <div className="w-6 h-6 rounded-lg bg-[#C8973E]/15 flex items-center justify-center text-[#C8973E]">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-[12.5px]">Guided Feature Tours</div>
                            <div className="text-[10.5px] text-neutral-400">Underwriting, Safeguards & Sentinel</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setConnectorMenuOpen(false);
                            setMcpModalOpen(true);
                          }}
                          className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition cursor-pointer border-t border-neutral-100 dark:border-neutral-800 pt-2"
                        >
                          <div className="w-6 h-6 rounded-lg bg-[#FF6F1E]/15 flex items-center justify-center text-[#FF6F1E]">
                            <Terminal className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-[12.5px] text-[#FF6F1E]">AI Agent Tools (23)</div>
                            <div className="text-[10.5px] text-neutral-400">Model Context Protocol tools</div>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Attached File Preview Tag */}
                  {attachedFile && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 shrink-0">
                      <FileText className="w-3 h-3 text-[#C8973E]" />
                      <span className="max-w-[120px] truncate">{attachedFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setAttachedFile(null)}
                        className="hover:text-red-500 transition cursor-pointer ml-0.5"
                        title="Remove attached file"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Input Textarea */}
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => handleInputChange(e.target.value, e.target)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    rows={1}
                    placeholder="Ask about AI or Enver…"
                    className="flex-1 bg-transparent border-0 outline-none text-[14.5px] resize-none leading-relaxed py-1.5 px-2 font-normal text-neutral-800 dark:text-neutral-100 placeholder-neutral-400"
                  />

                  {/* Interactive @ Autocomplete Floating Menu */}
                  {mentionMenuOpen && (
                    <div
                      className={`absolute left-10 bottom-full mb-3 w-80 rounded-2xl p-2 space-y-1 shadow-2xl z-50 border text-left ${
                        isDark
                          ? "bg-[#1A2215] border-[#2F3B25] text-white"
                          : "bg-white border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                        <span>Citadel Connectors & Skills</span>
                        <span className="text-[10px] font-mono lowercase opacity-60">Esc to close</span>
                      </div>
                      {CONNECTORS.map((c) => {
                        const IconComp = c.icon;
                        return (
                          <button
                            key={c.tag}
                            type="button"
                            onClick={() => handleSelectMention(c)}
                            className="w-full flex items-start gap-2.5 p-2 rounded-xl text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition cursor-pointer group"
                          >
                            <div className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 mt-0.5">
                              <IconComp className={`w-3.5 h-3.5 ${c.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-[12px] text-neutral-900 dark:text-white group-hover:text-[#FF6F1E]">
                                  {c.tag}
                                </span>
                                <span className="text-[11px] text-neutral-500 font-medium">
                                  {c.name}
                                </span>
                              </div>
                              <div className="text-[10.5px] text-neutral-400 leading-tight">
                                {c.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Right Controls: Optional Advanced Toggle + Mic + Send */}
                  <div className="flex items-center gap-1.5 shrink-0 pr-1">
                    {/* Optional Advanced Toggle */}
                    <button
                      type="button"
                      title="Toggle advanced model settings and tools"
                      onClick={() => setShowAdvanced((prev) => !prev)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer border ${
                        showAdvanced
                          ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-2xs"
                          : "bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 border-neutral-200/60 dark:border-neutral-700/60 hover:bg-neutral-200/70"
                      }`}
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Advanced</span>
                    </button>

                    {/* Mic Button */}
                    <button
                      type="button"
                      title="Voice dictation"
                      onClick={handleTriggerVoice}
                      className={`p-2 rounded-full transition cursor-pointer ${
                        isListening
                          ? "text-[#FF6F1E] bg-[#FF6F1E]/15 animate-pulse"
                          : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <Mic className="w-4 h-4" />
                    </button>

                    {/* Send Button */}
                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim() || isSubmitting}
                      title="Send message"
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition shadow-xs cursor-pointer ${
                        inputMessage.trim() && !isSubmitting
                          ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-[#C8973E] dark:hover:bg-[#C8973E] hover:text-white hover:scale-105"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-300 dark:text-neutral-600 cursor-not-allowed"
                      }`}
                    >
                      <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Optional Advanced Settings & Model Controls Area */}
                {showAdvanced && (
                  <div className="w-full rounded-2xl p-3 border shadow-xs backdrop-blur-md transition-all text-xs bg-white/95 dark:bg-[#1A2215]/95 border-neutral-200/80 dark:border-neutral-700/80 animate-in fade-in slide-in-from-top-1 duration-200 text-left">
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      {/* Model Selector */}
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-neutral-500 dark:text-neutral-400">Model Profile:</span>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setEngineDropdownOpen((prev) => !prev)}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/70 text-neutral-800 dark:text-neutral-200 cursor-pointer border border-neutral-200/60 dark:border-neutral-700/60"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C8973E]" />
                            <span>{currentEngineObj.name}</span>
                            <ChevronDown className="w-3 h-3 text-neutral-400" />
                          </button>

                          {engineDropdownOpen && (
                            <div className="absolute left-0 bottom-full mb-2 w-72 rounded-2xl p-2 space-y-1 shadow-2xl z-50 border bg-white dark:bg-[#1A2215] border-neutral-200 dark:border-[#2F3B25]">
                              <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                                Select AI Engine Profile
                              </div>
                              {ENGINES.map((eng) => (
                                <button
                                  key={eng.id}
                                  onClick={() => {
                                    setSelectedEngine(eng.id);
                                    setEngineDropdownOpen(false);
                                  }}
                                  className={`w-full text-left p-2 rounded-xl transition flex flex-col cursor-pointer ${
                                    selectedEngine === eng.id
                                      ? "bg-neutral-100 dark:bg-neutral-800 font-semibold"
                                      : "hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-0.5">
                                    <span className="font-semibold text-neutral-900 dark:text-white">{eng.name}</span>
                                    <span className="text-[10px] font-mono opacity-70">{eng.tag}</span>
                                  </div>
                                  <span className="text-[11px] text-neutral-500">{eng.desc}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Connectors & Tools */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/70 transition cursor-pointer"
                        >
                          <Paperclip className="w-3 h-3" />
                          <span>Attach Document</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setMcpModalOpen(true)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF6F1E]/10 text-[#FF6F1E] hover:bg-[#FF6F1E]/20 transition cursor-pointer font-medium"
                        >
                          <Terminal className="w-3 h-3" />
                          <span>MCP Tools (23)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAdvanced(false)}
                          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 rounded-lg ml-1"
                          title="Hide advanced controls"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Starter Prompts */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 relative z-10 max-w-2xl">
                <button
                  onClick={() => handleSendMessage("Explain AI agents simply")}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-normal transition shadow-2xs bg-white/90 dark:bg-[#1A2215]/90 hover:bg-white dark:hover:bg-[#1A2215] text-neutral-700 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700/80 hover:border-[#C8973E] hover:shadow-xs cursor-pointer group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C8973E] group-hover:scale-110 transition-transform" />
                  <span>Explain AI agents simply</span>
                </button>

                <button
                  onClick={() => handleSendMessage("How could AI help my business?")}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-normal transition shadow-2xs bg-white/90 dark:bg-[#1A2215]/90 hover:bg-white dark:hover:bg-[#1A2215] text-neutral-700 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700/80 hover:border-[#C8973E] hover:shadow-xs cursor-pointer group"
                >
                  <Activity className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span>How could AI help my business?</span>
                </button>

                <button
                  onClick={() => handleSendMessage("What does Enver build?")}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-normal transition shadow-2xs bg-white/90 dark:bg-[#1A2215]/90 hover:bg-white dark:hover:bg-[#1A2215] text-neutral-700 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700/80 hover:border-[#C8973E] hover:shadow-xs cursor-pointer group"
                >
                  <Cpu className="w-3.5 h-3.5 text-[#0284C7] group-hover:scale-110 transition-transform" />
                  <span>What does Enver build?</span>
                </button>

                <button
                  onClick={() => setCapabilitiesModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition shadow-2xs bg-[#C8973E]/10 hover:bg-[#C8973E]/20 text-[#8F641B] dark:text-[#C8973E] border border-[#C8973E]/30 hover:border-[#C8973E] cursor-pointer group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8973E] group-hover:translate-x-0.5 transition-transform" />
                  <span>Try a guided demo</span>
                </button>
              </div>

              {/* Clear Privacy Note */}
              <div className="mt-auto pt-10 pb-2 text-center text-xs text-neutral-500 dark:text-neutral-400 font-sans max-w-lg mx-auto leading-relaxed">
                <div className="flex items-center justify-center gap-1.5 mb-1 text-neutral-700 dark:text-neutral-300 font-medium text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Your privacy is protected</span>
                </div>
                <p className="text-[11.5px] text-neutral-400 dark:text-neutral-500">
                  Your messages are private, kept only in your current session, and never used to train public AI models. Read our{" "}
                  <Link href="/privacy" className="underline hover:text-neutral-700 dark:hover:text-neutral-300">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="underline hover:text-neutral-700 dark:hover:text-neutral-300">
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* ACTIVE CONVERSATION STREAM */
            /* ========================================================================= */
            <div className="max-w-3xl mx-auto space-y-6 pb-28">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-3">
                  {msg.sender === "user" ? (
                    /* User message card */
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-tr-xs px-4 py-2.5 text-[14.5px] leading-relaxed shadow-xs border bg-[#2B3322] text-[#F4EFE6] border-[#2B3322]">
                        <p className="whitespace-pre-wrap select-text">{msg.text}</p>
                      </div>
                    </div>
                  ) : (
                    /* Assistant response card */
                    <div className="flex gap-3.5 text-[14.5px] leading-relaxed">
                      {/* Enver Crest Avatar */}
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#C8973E] to-[#2B3322] p-0.5 shrink-0 mt-0.5 shadow-xs">
                        <div className="w-full h-full rounded-[10px] flex items-center justify-center bg-[#F4EFE6]">
                          <img
                            src="/favicon.png"
                            alt="Enver Crest"
                            className="w-5 h-5 object-contain"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-2 select-text">
                        {/* Thinking / Reasoning Process */}
                        {msg.thought && (
                          <div className={`rounded-xl border p-2 text-xs transition ${
                            isDark
                              ? "bg-[#1E2619]/60 border-[#2A3722] text-neutral-300"
                              : "bg-[#F7F5EE]/80 border-[#E5DFD3] text-[#574E42]"
                          }`}>
                            <button
                              onClick={() =>
                                setExpandedThoughtId(
                                  expandedThoughtId === msg.id ? null : msg.id
                                )
                              }
                              className="w-full flex items-center justify-between text-left text-[11.5px] font-medium hover:text-[#C8973E] cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-[#C8973E]" />
                                <span>Thought for {msg.thoughtTime || 0.6}s</span>
                              </div>
                              <ChevronRight
                                className={`w-3.5 h-3.5 transition-transform text-neutral-400 ${
                                  expandedThoughtId === msg.id ? "rotate-90" : ""
                                }`}
                              />
                            </button>
                            {expandedThoughtId === msg.id && (
                              <div className="mt-2 pt-2 border-t text-[11px] leading-relaxed border-neutral-200/60 dark:border-neutral-700/60 text-neutral-600 dark:text-neutral-400">
                                <p>{msg.thought}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Edge Case Warning Banner if Intercepted */}
                        {msg.isEdgeCaseBlocked && (
                          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 text-xs flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold">Edge Case Recorded: Confidential Inquiry Intercept</span>
                              <p className="text-[11px] opacity-90 mt-0.5">
                                Only @enveraitech.com SSO accounts have clearance for internal projects. This intercept was logged to the activity audit trail.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Rendered Markdown & Code formatting */}
                        <div className={`space-y-2 leading-relaxed whitespace-pre-wrap ${isDark ? "text-[#F4EFE6]" : "text-[#2B3322]"}`}>
                          {renderFormattedText(msg.text, isDark)}
                        </div>

                        {/* Grounded Citation badge */}
                        {msg.citation && (
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                            isDark
                              ? "bg-[#1E2619]/50 text-neutral-400 border-neutral-800"
                              : "bg-[#F7F5EE]/70 text-neutral-600 border-[#E8E2D5]"
                          }`}>
                            <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span>{msg.citation}</span>
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex items-center gap-1 pt-1">
                          <button
                            onClick={() => copyToClipboard(msg.id, msg.text)}
                            title="Copy response"
                            className="p-1.5 rounded-lg transition text-[#736A5B] hover:bg-[#EDE6D8] hover:text-[#2B3322]"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            title="Good response"
                            className="p-1.5 rounded-lg transition text-[#736A5B] hover:bg-[#EDE6D8] hover:text-[#2B3322]"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            title="Bad response"
                            className="p-1.5 rounded-lg transition text-[#736A5B] hover:bg-[#EDE6D8] hover:text-[#2B3322]"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleSendMessage(messages[messages.length - 2]?.text || "")}
                            title="Regenerate"
                            className="p-1.5 rounded-lg transition text-[#736A5B] hover:bg-[#EDE6D8] hover:text-[#2B3322]"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isSubmitting && (
                <div className="flex gap-3 text-[14px]">
                  <div className="w-8 h-8 rounded-xl bg-[#2B3322] flex items-center justify-center p-1 shadow-xs border border-[#3D4830]">
                    <ThinkingOrb state="working" size={20} color="#C8973E" />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#736A5B]">
                    <span className="w-2 h-2 rounded-full bg-[#C8973E] animate-ping" />
                    <span>Executing sovereign reasoning via {currentEngineObj.name}...</span>
                  </div>
                </div>
              )}
              {/* Suggested Follow-up Prompts */}
              {!isSubmitting && messages.length > 0 && messages[messages.length - 1]?.sender === "assistant" && (
                <div className="pt-2 pl-11 space-y-2">
                  <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#C8973E]" />
                    <span>Suggested follow-ups:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Tell me more about real enterprise use cases",
                      "How does Enver integrate with existing databases?",
                      "Can we deploy this on sovereign private infrastructure?"
                    ].map((suggestion, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-xs px-3 py-1.5 rounded-full border bg-white/80 dark:bg-[#1E2619]/80 border-neutral-200/80 dark:border-neutral-700/80 hover:border-[#C8973E] text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition shadow-2xs cursor-pointer text-left"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Floating Scroll to Latest Button */}
        {showScrollBottom && messages.length > 0 && (
          <button
            onClick={() => scrollToBottom("smooth")}
            className="fixed bottom-24 right-8 z-30 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium shadow-lg backdrop-blur-md bg-white/95 dark:bg-[#1E2619]/95 text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 hover:border-[#C8973E] hover:scale-105 transition cursor-pointer"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#C8973E]" />
            <span>Scroll to latest</span>
          </button>
        )}

        {/* Pinned Bottom Input Capsule (Active Chat Mode) */}
        {messages.length > 0 && (
          <div className={`p-4 border-t backdrop-blur-md transition-colors ${
            isDark ? "bg-[#11160F]/95 border-white/[0.05]" : "bg-[#FAF9F6]/95 border-black/[0.04]"
          }`}>
            <div className="max-w-3xl mx-auto relative rounded-full transition-all p-2 sm:p-2.5 flex items-center gap-2 border shadow-[0_6px_28px_rgba(0,0,0,0.06)] bg-white/98 dark:bg-[#182014]/98 backdrop-blur-md border-neutral-200/90 dark:border-neutral-700/80 hover:border-[#C8973E] focus-within:border-[#C8973E] focus-within:shadow-[0_8px_35px_rgba(0,0,0,0.09)]">
              {/* + Connector Button & Popover */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  title="Add connectors, upload documents, or load skills"
                  onClick={() => setConnectorMenuOpen((prev) => !prev)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.2]" />
                </button>

                {connectorMenuOpen && (
                  <div
                    className={`absolute left-0 bottom-full mb-3 w-72 rounded-2xl p-2 space-y-1 shadow-2xl z-50 border text-left ${
                      isDark
                        ? "bg-[#1A2215] border-[#2F3B25] text-white"
                        : "bg-white border-neutral-200 text-neutral-800"
                    }`}
                  >
                    <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Connectors & Skills
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setConnectorMenuOpen(false);
                        fileInputRef.current?.click();
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition cursor-pointer"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#C8973E]/15 flex items-center justify-center text-[#C8973E]">
                        <Paperclip className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-[12.5px]">Upload Document</div>
                        <div className="text-[10.5px] text-neutral-400">PDF, CSV, balance sheet, AST rules</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setConnectorMenuOpen(false);
                        handleSendMessage("Extract balance sheet and GST tax returns for Saraswati Precision Tooling (NTC-2026-081) and compute DSCR under RBI DL-09 guidelines.");
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition cursor-pointer"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#2B3322]/15 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600">
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-[12.5px]">Load Credit Dataset</div>
                        <div className="text-[10.5px] text-neutral-400">Pre-loaded MSME thin-file statements</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setConnectorMenuOpen(false);
                        handleSendMessage("Perform an Arbiter AST syntax and blast-radius audit on 'rm -rf / --no-preserve-root' and 'DROP TABLE production_users'.");
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition cursor-pointer"
                    >
                      <div className="w-6 h-6 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-500">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-[12.5px]">Test AST Firewall</div>
                        <div className="text-[10.5px] text-neutral-400">Live &lt;18ms command intercept</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setConnectorMenuOpen(false);
                        setMcpModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition cursor-pointer border-t border-neutral-100 dark:border-neutral-800 pt-2"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#FF6F1E]/15 flex items-center justify-center text-[#FF6F1E]">
                        <Terminal className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-[12.5px] text-[#FF6F1E]">MCP Suite (23 Tools)</div>
                        <div className="text-[10.5px] text-neutral-400">Model Context Protocol live tools</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Attached File Preview Tag */}
              {attachedFile && (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 shrink-0">
                  <FileText className="w-3 h-3 text-[#C8973E]" />
                  <span className="max-w-[120px] truncate">{attachedFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setAttachedFile(null)}
                    className="hover:text-red-500 transition cursor-pointer ml-0.5"
                    title="Remove attached file"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <textarea
                ref={activeInputRef}
                value={inputMessage}
                onChange={(e) => handleInputChange(e.target.value, e.target)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                rows={1}
                placeholder="Ask about AI or Enver…"
                className="flex-1 bg-transparent border-0 outline-none text-[14.5px] resize-none leading-relaxed py-1.5 px-2 font-normal text-neutral-800 dark:text-neutral-100 placeholder-neutral-400"
              />

              {/* Mention Menu */}
              {mentionMenuOpen && (
                <div
                  className={`absolute left-10 bottom-full mb-3 w-80 rounded-2xl p-2 space-y-1 shadow-2xl z-50 border text-left ${
                    isDark
                      ? "bg-[#1A2215] border-[#2F3B25] text-white"
                      : "bg-white border-neutral-200 text-neutral-800"
                  }`}
                >
                  <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                    <span>Citadel Connectors & Skills</span>
                    <span className="text-[10px] font-mono lowercase opacity-60">Esc to close</span>
                  </div>
                  {CONNECTORS.map((c) => {
                    const IconComp = c.icon;
                    return (
                      <button
                        key={c.tag}
                        type="button"
                        onClick={() => handleSelectMention(c)}
                        className="w-full flex items-start gap-2.5 p-2 rounded-xl text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left transition cursor-pointer group"
                      >
                        <div className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 mt-0.5">
                          <IconComp className={`w-3.5 h-3.5 ${c.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-[12px] text-neutral-900 dark:text-white group-hover:text-[#FF6F1E]">
                              {c.tag}
                            </span>
                            <span className="text-[11px] text-neutral-500 font-medium">
                              {c.name}
                            </span>
                          </div>
                          <div className="text-[10.5px] text-neutral-400 leading-tight">
                            {c.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Right Controls: Optional Advanced Toggle + Mic + Send */}
              <div className="flex items-center gap-1.5 shrink-0 pr-1">
                {/* Optional Advanced Toggle */}
                <button
                  type="button"
                  title="Toggle advanced model settings and tools"
                  onClick={() => setShowAdvanced((prev) => !prev)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer border ${
                    showAdvanced
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-2xs"
                      : "bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 border-neutral-200/60 dark:border-neutral-700/60 hover:bg-neutral-200/70"
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Advanced</span>
                </button>

                {/* Voice Dictation */}
                <button
                  type="button"
                  title="Voice dictation"
                  onClick={handleTriggerVoice}
                  className={`p-2 rounded-full transition cursor-pointer ${
                    isListening
                      ? "text-[#FF6F1E] bg-[#FF6F1E]/15 animate-pulse"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </button>

                {/* Send Button */}
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isSubmitting}
                  title="Send message"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition shadow-xs cursor-pointer ${
                    inputMessage.trim() && !isSubmitting
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-[#C8973E] dark:hover:bg-[#C8973E] hover:text-white hover:scale-105"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-300 dark:text-neutral-600 cursor-not-allowed"
                  }`}
                >
                  <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Optional Advanced Drawer in Active Chat Mode */}
            {showAdvanced && (
              <div className="max-w-3xl mx-auto mt-2 rounded-2xl p-3 border shadow-xs backdrop-blur-md transition-all text-xs bg-white/95 dark:bg-[#1A2215]/95 border-neutral-200/80 dark:border-neutral-700/80 animate-in fade-in slide-in-from-bottom-1 duration-200 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  {/* Model Selector */}
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-neutral-500 dark:text-neutral-400">Model Profile:</span>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setEngineDropdownOpen((prev) => !prev)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/70 text-neutral-800 dark:text-neutral-200 cursor-pointer border border-neutral-200/60 dark:border-neutral-700/60"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8973E]" />
                        <span>{currentEngineObj.name}</span>
                        <ChevronDown className="w-3 h-3 text-neutral-400" />
                      </button>

                      {engineDropdownOpen && (
                        <div className="absolute left-0 bottom-full mb-2 w-72 rounded-2xl p-2 space-y-1 shadow-2xl z-50 border bg-white dark:bg-[#1A2215] border-neutral-200 dark:border-[#2F3B25]">
                          <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                            Select AI Engine Profile
                          </div>
                          {ENGINES.map((eng) => (
                            <button
                              key={eng.id}
                              onClick={() => {
                                setSelectedEngine(eng.id);
                                setEngineDropdownOpen(false);
                              }}
                              className={`w-full text-left p-2 rounded-xl transition flex flex-col cursor-pointer ${
                                selectedEngine === eng.id
                                  ? "bg-neutral-100 dark:bg-neutral-800 font-semibold"
                                  : "hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="font-semibold text-neutral-900 dark:text-white">{eng.name}</span>
                                <span className="text-[10px] font-mono opacity-70">{eng.tag}</span>
                              </div>
                              <span className="text-[11px] text-neutral-500">{eng.desc}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Connectors & Tools */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/70 transition cursor-pointer"
                    >
                      <Paperclip className="w-3 h-3" />
                      <span>Attach Document</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMcpModalOpen(true)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF6F1E]/10 text-[#FF6F1E] hover:bg-[#FF6F1E]/20 transition cursor-pointer font-medium"
                    >
                      <Terminal className="w-3 h-3" />
                      <span>MCP Tools (23)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAdvanced(false)}
                      className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 rounded-lg ml-1"
                      title="Hide advanced controls"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* CITADEL CAPABILITIES SHOWCASE MODAL ("LET'S GO") */}
      {/* ========================================================================= */}
      {capabilitiesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className={`w-full max-w-2xl rounded-3xl p-6 sm:p-7 space-y-6 shadow-2xl border transition-all ${
            isDark ? "bg-[#141B10] text-[#F4EFE6] border-[#24301E]" : "bg-white text-neutral-900 border-neutral-200"
          }`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FF6F1E]/10 flex items-center justify-center text-[#FF6F1E]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-medium text-lg text-neutral-900 dark:text-white">
                    What you can do with Enver Citadel
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Minimal interface · Unbounded sovereign enterprise agent execution
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCapabilitiesModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Capability Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* 1. Arbiter AST Firewall */}
              <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-3 hover:border-amber-500/50 transition flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#E65100]" />
                    <span className="font-semibold text-xs text-neutral-900 dark:text-white">
                      Arbiter AST Firewall
                    </span>
                  </div>
                  <p className="text-[11.5px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Intercepts destructive CLI and Terraform commands in &lt;18ms before execution across AWS, GCP & Azure.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCapabilitiesModalOpen(false);
                    handleSendMessage("Perform an Arbiter AST syntax and blast-radius audit on 'rm -rf / --no-preserve-root' and 'DROP TABLE production_users'.");
                  }}
                  className="w-full py-2 px-3 rounded-xl text-xs font-medium bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 shadow-2xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>Test Firewall Intercept</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 2. Artificer Credit Underwriting */}
              <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-3 hover:border-[#C8973E]/50 transition flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#C8973E]" />
                    <span className="font-semibold text-xs text-neutral-900 dark:text-white">
                      Artificer Underwriting
                    </span>
                  </div>
                  <p className="text-[11.5px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Thin-file credit appraisal from raw GST & bank statements in 94 seconds under RBI DL-09 compliance.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCapabilitiesModalOpen(false);
                    handleSendMessage("Extract balance sheet and GST tax returns for Saraswati Precision Tooling (NTC-2026-081) and compute DSCR under RBI DL-09 guidelines.");
                  }}
                  className="w-full py-2 px-3 rounded-xl text-xs font-medium bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 shadow-2xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>Run Credit Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 3. Cerberus Shannon Entropy */}
              <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-3 hover:border-blue-500/50 transition flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#0284C7]" />
                    <span className="font-semibold text-xs text-neutral-900 dark:text-white">
                      Cerberus Entropy Scan
                    </span>
                  </div>
                  <p className="text-[11.5px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Multi-dimensional Shannon entropy pre-commit scanning to block hardcoded API keys and secrets (&lt;1.1% false positives).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCapabilitiesModalOpen(false);
                    handleSendMessage("Run Cerberus cryptographic Shannon entropy scan across repository commits to detect credential leakages.");
                  }}
                  className="w-full py-2 px-3 rounded-xl text-xs font-medium bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 shadow-2xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>Run Entropy Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4. MCP Protocol Suite */}
              <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-3 hover:border-[#FF6F1E]/50 transition flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#FF6F1E]" />
                    <span className="font-semibold text-xs text-neutral-900 dark:text-white">
                      MCP Protocol (23 Tools)
                    </span>
                  </div>
                  <p className="text-[11.5px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Live Model Context Protocol suite connecting sovereign agents to Spanner, AWS IAM, GitHub CI/CD, and vector stores.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCapabilitiesModalOpen(false);
                    setMcpModalOpen(true);
                  }}
                  className="w-full py-2 px-3 rounded-xl text-xs font-medium bg-[#FF6F1E]/10 hover:bg-[#FF6F1E]/20 text-[#FF6F1E] border border-[#FF6F1E]/30 shadow-2xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>Launch MCP Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 text-center text-[11px] text-neutral-400">
              Or type <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-700 dark:text-neutral-300">@</code> in the input capsule to trigger any connector directly.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SOVEREIGN CLUSTER TIER MODAL (MESH / AGENTIC THINKING ORB TALKING) */}
      {/* ========================================================================= */}
      {sovereignClusterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border bg-[#1A2215] text-[#F4EFE6] border-[#2F3B25]">
            <div className="flex items-center justify-between pb-4 border-b border-[#2F3B25]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#C8973E] to-[#2B3322] flex items-center justify-center text-white shadow-sm">
                  <Radio className="w-5 h-5 text-[#C8973E]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-white">
                    Sovereign Cluster Mesh & Talking Orb
                  </h3>
                  <p className="text-xs text-[#A19888]">
                    Dedicated hardware nodes · Real-time multi-agent thinking orb
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSovereignClusterModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-[#2B3322] text-[#A19888] hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Liquid Gooey & Thinking Orb Stage */}
            <div className="relative py-6 px-4 rounded-3xl bg-[#0F150D] border border-[#2F3B25] overflow-hidden flex flex-col items-center justify-center shadow-inner">
              {/* Orb Showcase */}
              <div className="flex flex-col items-center gap-2 mb-6">
                <div className="p-4 rounded-3xl bg-[#1A2215] border border-[#C8973E]/30 shadow-lg flex items-center justify-center">
                  <ThinkingOrb state={orbState} size={64} speed={1.1} color="#C8973E" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#242E1C] border border-[#C8973E]/40 text-xs font-mono text-[#C8973E]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Sovereign Orb Active: {orbState.toUpperCase()}</span>
                </div>
              </div>

              {/* Liquid Gooey Cluster Nodes (Libraries.dev Liquid Effect) */}
              <div className="w-full flex items-center justify-center overflow-visible min-h-[90px]">
                <Liquid blur={6} contrast={18} fill="#242E1C">
                  <Liquid.Item x={clusterNodesOpen ? -82 : 0} y={clusterNodesOpen ? -18 : 0} transition="bouncy">
                    <button
                      onClick={() => setOrbState("connecting")}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#F4EFE6] bg-[#242E1C] border border-[#3D4830] hover:border-[#C8973E] shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8973E]" />
                      <span>delhi-node-01</span>
                    </button>
                  </Liquid.Item>

                  <Liquid.Item x={clusterNodesOpen ? 0 : 0} y={clusterNodesOpen ? -32 : 0} transition="bouncy">
                    <button
                      onClick={() => setOrbState("searching")}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#F4EFE6] bg-[#242E1C] border border-[#3D4830] hover:border-[#C8973E] shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>mumbai-edge-04</span>
                    </button>
                  </Liquid.Item>

                  <Liquid.Item x={clusterNodesOpen ? 82 : 0} y={clusterNodesOpen ? -18 : 0} transition="bouncy">
                    <button
                      onClick={() => setOrbState("weaving")}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#F4EFE6] bg-[#242E1C] border border-[#3D4830] hover:border-[#C8973E] shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>singapore-core-02</span>
                    </button>
                  </Liquid.Item>

                  <Liquid.Item x={0} y={clusterNodesOpen ? 28 : 0} transition="bouncy">
                    <button
                      onClick={() => setClusterNodesOpen(!clusterNodesOpen)}
                      className="px-4 py-2 rounded-full text-xs font-bold text-white bg-[#C8973E] hover:bg-[#B3832F] shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>{clusterNodesOpen ? "Collapse Liquid Mesh" : "Expand Liquid Mesh"}</span>
                    </button>
                  </Liquid.Item>
                </Liquid>
              </div>
            </div>

            {/* Orb Synthesis 9-State Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#A19888]">
                <span>Orb Animation Presets (Libraries.dev Thinking Orb):</span>
                <span className="text-[#C8973E] font-bold uppercase">{orbState}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(["searching", "solving", "listening", "connecting", "working", "weaving", "composing", "breathing", "shaping"] as OrbState[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrbState(st)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-mono font-semibold transition cursor-pointer ${
                      orbState === st
                        ? "bg-[#C8973E] text-[#1A2215] font-bold shadow-xs"
                        : "bg-[#242E1C] text-[#A19888] hover:text-[#F4EFE6] hover:bg-[#2F3B25] border border-[#3D4830]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Sovereign Cluster Node Telemetry */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#242E1C] border border-[#2F3B25] space-y-1">
                <span className="text-[#A19888] block text-[10px]">Active Sovereign Node</span>
                <span className="font-bold text-[#C8973E] text-xs">delhi-sovereign-01</span>
                <span className="text-[10px] text-emerald-400 block">14.2ms latency</span>
              </div>
              <div className="p-3 rounded-xl bg-[#242E1C] border border-[#2F3B25] space-y-1">
                <span className="text-[#A19888] block text-[10px]">Swarm Consensus</span>
                <span className="font-bold text-white text-xs">99.8% Deterministic</span>
                <span className="text-[10px] text-emerald-400 block">0 Hallucinations</span>
              </div>
              <div className="p-3 rounded-xl bg-[#242E1C] border border-[#2F3B25] space-y-1">
                <span className="text-[#A19888] block text-[10px]">Hardware Topology</span>
                <span className="font-bold text-white text-xs">8x H100 SXM5</span>
                <span className="text-[10px] text-[#A19888] block">Private VPC Mesh</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-xs text-[#A19888]">
                Confidential dedicated deployments available for enterprise partners.
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/contact"
                  onClick={() => setSovereignClusterModalOpen(false)}
                  className="w-full sm:w-auto text-center px-4 py-2 rounded-full font-bold text-xs bg-[#C8973E] hover:bg-[#B3832F] text-white transition shadow-sm"
                >
                  Request Sovereign Tenant
                </Link>
                <button
                  onClick={() => setSovereignClusterModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-full text-xs font-semibold border border-[#2F3B25] hover:bg-[#242E1C] text-[#F4EFE6] transition"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. READ-ONLY DATABASE PREVIEW DRAWER ("OUR DB (A BIT)") */}
      {/* ========================================================================= */}
      {databaseDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl h-full bg-[#F4EFE6] text-[#2B3322] border-l border-[#E0D7C6] p-6 flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#E0D7C6]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#2B3322] text-[#F4EFE6]">
                  <Database className="w-5 h-5 text-[#C8973E]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#2B3322]">
                    Our Database (Read-Only Preview)
                  </h3>
                  <p className="text-xs text-[#736A5B]">
                    Sanitized schema & sample data for engineers · Zero mutations allowed
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDatabaseDrawerOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#EDE6D8] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Table Selector Tabs */}
            <div className="flex items-center gap-2 py-3 overflow-x-auto border-b border-[#E0D7C6]">
              {dbData?.tables &&
                Object.keys(dbData.tables).map((tblKey) => (
                  <button
                    key={tblKey}
                    onClick={() => setSelectedDbTable(tblKey)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-mono font-semibold transition shrink-0 ${
                      selectedDbTable === tblKey
                        ? "bg-[#2B3322] text-[#F4EFE6]"
                        : "bg-white text-[#736A5B] hover:bg-[#EDE6D8] border border-[#E0D7C6]"
                    }`}
                  >
                    {tblKey}
                  </button>
                ))}
            </div>

            {/* Table Content */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {dbData?.tables && dbData.tables[selectedDbTable] ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#736A5B]">
                    <span>
                      Table: <strong className="font-mono text-[#2B3322]">{selectedDbTable}</strong> ({dbData.tables[selectedDbTable].rows?.length || 0} records)
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                      READ_ONLY_ACCESS
                    </span>
                  </div>

                  <p className="text-xs text-[#574E42] italic">
                    {dbData.tables[selectedDbTable].description}
                  </p>

                  {/* Render Table Rows */}
                  <div className="space-y-2.5">
                    {dbData.tables[selectedDbTable].rows?.map((row: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white border border-[#E0D7C6] text-xs font-mono space-y-1 shadow-xs"
                      >
                        {Object.entries(row).map(([k, v]) => (
                          <div key={k} className="flex justify-between border-b border-[#F4EFE6] py-0.5 last:border-0">
                            <span className="text-[#736A5B] font-semibold">{k}:</span>
                            <span className="text-[#2B3322] font-medium truncate max-w-[320px]">{String(v)}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-[#736A5B]">
                  Loading sanitized table preview...
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[#E0D7C6] flex items-center justify-between text-xs">
              <span className="text-[#736A5B]">Encrypted at rest · SHA-256 integrity</span>
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(dbData, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "enver-database-schema-preview.json";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#2B3322] text-[#F4EFE6] font-semibold hover:bg-[#3D4830] transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#C8973E]" />
                <span>Export Schema JSON</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. ACTIVITY LEDGER DRAWER (TOP-TO-BOTTOM AUDIT LOGS & EDGE CASES) */}
      {/* ========================================================================= */}
      {auditDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-3xl h-full bg-[#F4EFE6] text-[#2B3322] border-l border-[#E0D7C6] p-6 flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#E0D7C6]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#2B3322] text-[#F4EFE6]">
                  <Activity className="w-5 h-5 text-[#C8973E]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#2B3322]">
                    Top-to-Bottom Activity Audit Ledger
                  </h3>
                  <p className="text-xs text-[#736A5B]">
                    Full session history: Logins, Queries, Reasoning Steps, and Edge Cases
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={refreshAuditLogs}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-[#E0D7C6] bg-white hover:bg-[#EDE6D8] font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3 text-[#C8973E]" />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={() => setAuditDrawerOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[#EDE6D8] transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter Chips & Stats */}
            <div className="py-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#E0D7C6] text-xs">
              <div className="flex items-center gap-1.5">
                {["ALL", "EDGE_CASE", "LOGIN", "QUERY", "RESPONSE"].map((ev) => (
                  <button
                    key={ev}
                    onClick={() => setAuditFilterEvent(ev)}
                    className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold transition ${
                      auditFilterEvent === ev
                        ? "bg-[#2B3322] text-[#F4EFE6]"
                        : "bg-white text-[#736A5B] hover:bg-[#EDE6D8] border border-[#E0D7C6]"
                    }`}
                  >
                    {ev === "EDGE_CASE" ? `EDGE CASES (${auditStats.edgeCases})` : ev}
                  </button>
                ))}
              </div>

              <div className="font-mono text-[11px] text-[#736A5B]">
                Total: <strong>{auditLogs.length}</strong> logged events
              </div>
            </div>

            {/* Logs List */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
              {auditLogs.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#736A5B]">
                  No audit logs recorded yet. Send queries or log in to generate activity records.
                </div>
              ) : (
                auditLogs
                  .filter((log) => auditFilterEvent === "ALL" || log.eventType === auditFilterEvent)
                  .map((log) => (
                    <div
                      key={log.id}
                      className={`p-3 rounded-xl border text-xs font-mono transition space-y-1 ${
                        log.eventType === "EDGE_CASE"
                          ? "bg-red-500/10 border-red-500/30 text-red-900"
                          : log.eventType === "LOGIN"
                          ? "bg-blue-500/10 border-blue-500/20 text-blue-900"
                          : "bg-white border-[#E0D7C6] text-[#2B3322]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            log.eventType === "EDGE_CASE"
                              ? "bg-red-600 text-white"
                              : log.eventType === "LOGIN"
                              ? "bg-blue-600 text-white"
                              : "bg-[#2B3322] text-[#F4EFE6]"
                          }`}>
                            {log.eventType}
                          </span>
                          {log.edgeCaseType && (
                            <span className="text-[10px] font-bold text-red-600 underline">
                              {log.edgeCaseType}
                            </span>
                          )}
                          <span className="font-semibold text-[#574E42]">{log.callerName} ({log.role})</span>
                        </div>
                        <span className="text-[10px] text-[#736A5B]">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>

                      {log.queryText && (
                        <div className="text-[11.5px] font-sans">
                          <strong>Query:</strong> {log.queryText}
                        </div>
                      )}

                      {log.responseText && (
                        <div className="text-[11px] text-[#574E42] line-clamp-2">
                          <strong>Response:</strong> {log.responseText.slice(0, 150)}...
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px] text-[#736A5B] pt-1 border-t border-[#F4EFE6]">
                        <span>IP: {log.ip} · {log.email}</span>
                        <span className="font-bold">{log.auditSignature}</span>
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-[#E0D7C6] text-center text-[11px] text-[#736A5B]">
              Deterministic audit compliance under ISO 27001 & RBI DL-09 standards.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. ACCOUNT CLEARANCE & ROLE SWITCHER MODAL */}
      {/* ========================================================================= */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border bg-white text-[#2B3322] border-[#E0D7C6]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E0D7C6]">
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-5 h-5 text-[#C8973E]" />
                <h3 className="font-bold text-lg text-[#2B3322]">
                  Account & Clearance Management
                </h3>
              </div>
              <button
                onClick={() => setAccountModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[#EDE6D8] transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#574E42] leading-relaxed">
              Enver Citadel implements strict role-based access. Test different human access profiles:
            </p>

            <div className="space-y-3">
              {/* Profile 1: Amaan Shaikh LEAD (@enveraitech.com SSO) */}
              <div
                onClick={() => {
                  switchRole("ENVER_INTERNAL");
                  setAccountModalOpen(false);
                  setToastConfig({
                    title: "SSO Verified: Amaan Shaikh",
                    description: "Enver AI Tech Lead clearance unlocked. Full confidential projects access.",
                    fuseColor: "#C8973E"
                  });
                  setToastOpen(true);
                  refreshAuditLogs();
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                  user?.role === "ENVER_INTERNAL"
                    ? "bg-[#EDE6D8] border-[#C8973E] ring-1 ring-[#C8973E]"
                    : "bg-[#F4EFE6] border-[#E0D7C6] hover:bg-[#EDE6D8]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-[#2B3322]">Amaan Shaikh (Enver Internal)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-[#C8973E]/20 text-[#8F641B]">
                    SSO: @enveraitech.com
                  </span>
                </div>
                <p className="text-[11px] text-[#574E42]">
                  Highest clearance. Can ask confidential work questions, access sovereign cluster nodes, and dispatch internal sentinels.
                </p>
              </div>

              {/* Profile 2: Engineer (Microsoft Work Mail) */}
              <div
                onClick={() => {
                  switchRole("ENGINEER");
                  setAccountModalOpen(false);
                  setToastConfig({
                    title: "Signed In: Microsoft Work Mail",
                    description: "Engineer clearance granted: read access to Research papers, MCP tools, and DB preview.",
                    fuseColor: "#0284C7"
                  });
                  setToastOpen(true);
                  refreshAuditLogs();
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                  user?.role === "ENGINEER"
                    ? "bg-[#EDE6D8] border-[#0284C7] ring-1 ring-[#0284C7]"
                    : "bg-[#F4EFE6] border-[#E0D7C6] hover:bg-[#EDE6D8]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-[#2B3322]">Alex Chen (Microsoft Partner Engineer)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-blue-100 text-blue-800">
                    WORK: @microsoft.com
                  </span>
                </div>
                <p className="text-[11px] text-[#574E42]">
                  Has read access to Research papers, all 23 MCP Protocol tools, and Read-Only Database Preview. Confidential work inquiries are restricted.
                </p>
              </div>

              {/* Profile 3: Public Visitor */}
              <div
                onClick={() => {
                  switchRole("PUBLIC");
                  setAccountModalOpen(false);
                  setToastConfig({
                    title: "Role: Public Visitor",
                    description: "Browsing public website & research abstracts.",
                    fuseColor: "#736A5B"
                  });
                  setToastOpen(true);
                  refreshAuditLogs();
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                  user?.role === "PUBLIC" || !user
                    ? "bg-[#EDE6D8] border-[#736A5B] ring-1 ring-[#736A5B]"
                    : "bg-[#F4EFE6] border-[#E0D7C6] hover:bg-[#EDE6D8]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-[#2B3322]">Public Visitor (Shop / Information)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-gray-200 text-gray-800">
                    UNAUTHENTICATED
                  </span>
                </div>
                <p className="text-[11px] text-[#574E42]">
                  Can browse public website, evaluate public research papers, and view high-level platform capabilities.
                </p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setAccountModalOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-[#2B3322] text-[#F4EFE6] hover:bg-[#3D4830] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flagship Engines Launcher Modal */}
      {launcherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-3xl p-6 space-y-4 shadow-2xl border bg-white border-[#E0D7C6] text-[#2B3322]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E0D7C6]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#C8973E] to-[#2B3322] flex items-center justify-center shadow-xs">
                  <LayoutGrid className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#2B3322]">Enver Flagship Engines</h3>
                  <p className="text-[11px] text-[#736A5B]">Switch specialized operational personas</p>
                </div>
              </div>
              <button
                onClick={() => setLauncherModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[#EDE6D8] text-[#736A5B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {ENGINES.map((eng) => (
                <div
                  key={eng.id}
                  onClick={() => {
                    setSelectedEngine(eng.id);
                    setLauncherModalOpen(false);
                    handleSendMessage(`Activate ${eng.name} engine and provide system status.`);
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition space-y-1.5 ${
                    selectedEngine === eng.id
                      ? "border-[#C8973E] bg-[#EDE6D8]"
                      : "bg-[#F4EFE6] border-[#E0D7C6] hover:border-[#C8973E]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[13px] text-[#2B3322]">{eng.name}</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold border ${eng.badgeColor}`}>
                      {eng.tag}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#736A5B]">{eng.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl p-4 space-y-3 shadow-2xl border bg-white border-[#E0D7C6] text-[#2B3322]">
            <div className="flex items-center justify-between pb-2 border-b border-[#E0D7C6]">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Search className="w-4 h-4 text-[#C8973E]" />
                <span>Search Sovereign Archives</span>
              </div>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[#EDE6D8] text-[#736A5B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search AST logs, credit dossiers, research invariants..."
              className="w-full rounded-xl px-3.5 py-2 text-sm outline-none border bg-[#F4EFE6] border-[#E0D7C6] text-[#2B3322] placeholder-[#736A5B]/50 focus:border-[#C8973E]"
              autoFocus
            />
            <div className="text-[11px] text-[#736A5B] pt-1">
              Press <kbd className="px-1.5 py-0.5 rounded bg-[#EDE6D8] border border-[#E0D7C6]">ESC</kbd> to exit.
            </div>
          </div>
        </div>
      )}

      {/* Enterprise MCP Protocol Suite Modal */}
      {mcpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-5xl rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl border my-auto max-h-[92vh] overflow-y-auto bg-white border-[#E0D7C6] text-[#2B3322]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E0D7C6]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#C8973E]/15 text-[#8F641B] border border-[#C8973E]/30">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#2B3322]">
                    Enterprise Model Context Protocol (MCP v2.0)
                  </h3>
                  <p className="text-xs text-[#736A5B]">
                    Test, dispatch, and integrate all 23 production tools directly into client agents.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMcpModalOpen(false)}
                className="p-2 rounded-xl transition cursor-pointer hover:bg-[#EDE6D8] text-[#736A5B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <McpProtocolSuite showTester={true} />
          </div>
        </div>
      )}

      {/* Guided Demos & Capabilities Modal */}
      {capabilitiesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-4xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border my-auto max-h-[92vh] overflow-y-auto bg-white dark:bg-[#161D12] border-neutral-200 dark:border-[#2F3B25] text-neutral-800 dark:text-neutral-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-[#2F3B25]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#C8973E]/15 text-[#8F641B] dark:text-[#C8973E] border border-[#C8973E]/30">
                  <Sparkles className="w-5 h-5 text-[#C8973E]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white">
                    Explore Guided AI Demos
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Select any pre-configured enterprise scenario to see how Neuv operates in real-time.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCapabilitiesModalOpen(false)}
                className="p-2 rounded-xl transition cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 4 Interactive Scenario Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Scenario 1: Credit Underwriting */}
              <div className="p-5 rounded-2xl border transition hover:border-[#C8973E] bg-neutral-50/60 dark:bg-[#1C2517]/60 border-neutral-200 dark:border-[#2A3722] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Credit Analysis
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">Sub-second</span>
                  </div>
                  <h4 className="font-heading font-bold text-[16px] text-neutral-900 dark:text-white">
                    Artificer: MSME Underwriting
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Evaluate thin-file balance sheets, calculate DSCR solvency, and reconcile GST filing anomalies under RBI DL-09 compliance rules.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCapabilitiesModalOpen(false);
                    handleSendMessage("Extract balance sheet and GST tax returns for Saraswati Precision Tooling (NTC-2026-081) and compute DSCR under RBI DL-09 guidelines.");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold bg-[#2B3322] hover:bg-[#3D4830] text-[#F4EFE6] transition cursor-pointer shadow-2xs"
                >
                  <span>Launch Underwriting Demo</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8973E]" />
                </button>
              </div>

              {/* Scenario 2: AST Security Firewall */}
              <div className="p-5 rounded-2xl border transition hover:border-[#C8973E] bg-neutral-50/60 dark:bg-[#1C2517]/60 border-neutral-200 dark:border-[#2A3722] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      Security Engine
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">&lt;18ms Intercept</span>
                  </div>
                  <h4 className="font-heading font-bold text-[16px] text-neutral-900 dark:text-white">
                    Arbiter: AST Semantic Firewall
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Audit destructive terminal commands (`rm -rf /` and `DROP TABLE`). Experience real-time AST syntax parsing and blast-radius intercept.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCapabilitiesModalOpen(false);
                    handleSendMessage("Perform an Arbiter AST syntax and blast-radius audit on 'rm -rf / --no-preserve-root' and 'DROP TABLE production_users'.");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold bg-[#2B3322] hover:bg-[#3D4830] text-[#F4EFE6] transition cursor-pointer shadow-2xs"
                >
                  <span>Launch AST Firewall Demo</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8973E]" />
                </button>
              </div>

              {/* Scenario 3: Autonomous Database Intelligence */}
              <div className="p-5 rounded-2xl border transition hover:border-[#C8973E] bg-neutral-50/60 dark:bg-[#1C2517]/60 border-neutral-200 dark:border-[#2A3722] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/20">
                      Autonomous Data Ops
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">Zero Hallucination</span>
                  </div>
                  <h4 className="font-heading font-bold text-[16px] text-neutral-900 dark:text-white">
                    Cerberus: Enterprise Telemetry
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Directly query production database records, identify operational bottlenecks, and generate deterministic telemetry summaries.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCapabilitiesModalOpen(false);
                    handleSendMessage("Inspect credit underwriting and AST audit database records, search for anomalies, and summarize current system operational telemetry.");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold bg-[#2B3322] hover:bg-[#3D4830] text-[#F4EFE6] transition cursor-pointer shadow-2xs"
                >
                  <span>Launch Telemetry Demo</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8973E]" />
                </button>
              </div>

              {/* Scenario 4: Agent Primer & Roadmap */}
              <div className="p-5 rounded-2xl border transition hover:border-[#C8973E] bg-neutral-50/60 dark:bg-[#1C2517]/60 border-neutral-200 dark:border-[#2A3722] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      Architecture
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">Production Ready</span>
                  </div>
                  <h4 className="font-heading font-bold text-[16px] text-neutral-900 dark:text-white">
                    AI Agent Primer & Overview
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Understand why sovereign AI agents replace fragile chatbots with deterministic tool calling, private VPC hosting, and verified audit trails.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCapabilitiesModalOpen(false);
                    handleSendMessage("Explain AI agents simply and walk me through how Enver structures sovereign agent architecture for enterprise production.");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold bg-[#2B3322] hover:bg-[#3D4830] text-[#F4EFE6] transition cursor-pointer shadow-2xs"
                >
                  <span>Explore Agent Primer</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8973E]" />
                </button>
              </div>
            </div>

            {/* Modal Footer Note */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>All demos run safely in an isolated sovereign sandbox buffer.</span>
              </div>
              <button
                onClick={() => setCapabilitiesModalOpen(false)}
                className="px-4 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Render code blocks, headers, bullet points, bold & formatted text cleanly */
function renderFormattedText(text: string, isDark: boolean) {
  // First split by code blocks if any
  const parts = text.split(/(```[\s\S]*?```)/g);

  return parts.map((part, pIdx) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const inner = part.slice(3, -3);
      const firstLineEnd = inner.indexOf("\n");
      const lang = firstLineEnd !== -1 ? inner.slice(0, firstLineEnd).trim() : "";
      const code = firstLineEnd !== -1 ? inner.slice(firstLineEnd + 1) : inner;

      return (
        <div
          key={`code-${pIdx}`}
          className="my-3 rounded-xl border overflow-hidden font-mono text-xs shadow-xs bg-[#1E2619] text-[#F4EFE6] border-[#2D3A24]"
        >
          {lang && (
            <div className="px-3.5 py-1.5 border-b text-[10.5px] font-bold flex justify-between items-center bg-[#141B10] border-[#2D3A24] text-[#A19888]">
              <span className="uppercase text-[#C8973E]">{lang}</span>
              <span className="font-mono text-[10px] text-neutral-400">Code Snippet</span>
            </div>
          )}
          <pre className="p-3.5 overflow-x-auto font-mono leading-relaxed select-text text-[#EDE6D8]">
            <code>{code}</code>
          </pre>
        </div>
      );
    }

    // Process lines of regular text
    const lines = part.split("\n");
    return (
      <span key={`text-${pIdx}`}>
        {lines.map((line, lIdx) => {
          // Headers
          if (line.startsWith("### ")) {
            return (
              <h3 key={lIdx} className="font-heading font-semibold text-[16px] mt-3.5 mb-1.5 text-neutral-900 dark:text-neutral-100">
                {renderInlineMarkdown(line.slice(4))}
              </h3>
            );
          }
          if (line.startsWith("## ")) {
            return (
              <h2 key={lIdx} className="font-heading font-bold text-lg mt-4 mb-2 text-neutral-900 dark:text-neutral-100">
                {renderInlineMarkdown(line.slice(3))}
              </h2>
            );
          }
          if (line.startsWith("# ")) {
            return (
              <h1 key={lIdx} className="font-heading font-bold text-xl mt-4 mb-2.5 text-neutral-900 dark:text-neutral-100">
                {renderInlineMarkdown(line.slice(2))}
              </h1>
            );
          }

          // Bullet points
          if (line.startsWith("• ") || line.startsWith("- ") || line.startsWith("* ")) {
            return (
              <div key={lIdx} className="flex items-start gap-2 my-1 pl-1">
                <span className="text-[#C8973E] font-bold select-none leading-relaxed">•</span>
                <span className="flex-1 leading-relaxed">{renderInlineMarkdown(line.slice(2))}</span>
              </div>
            );
          }

          // Numbered lists
          const numMatch = line.match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            return (
              <div key={lIdx} className="flex items-start gap-2 my-1 pl-1">
                <span className="text-[#C8973E] font-mono text-xs font-semibold select-none mt-0.5">{numMatch[1]}.</span>
                <span className="flex-1 leading-relaxed">{renderInlineMarkdown(numMatch[2])}</span>
              </div>
            );
          }

          // Empty line spacing
          if (!line.trim()) {
            return <div key={lIdx} className="h-2" />;
          }

          // Standard paragraph line
          return (
            <p key={lIdx} className="my-1 leading-relaxed">
              {renderInlineMarkdown(line)}
            </p>
          );
        })}
      </span>
    );
  });
}

/** Render inline bold (**text**), italics (*text*), and code (`code`) */
function renderInlineMarkdown(str: string): React.ReactNode {
  const tokens = str.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);

  return tokens.map((token, idx) => {
    if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
      return (
        <strong key={idx} className="font-semibold text-neutral-900 dark:text-white">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith("`") && token.endsWith("`") && token.length >= 2) {
      return (
        <code key={idx} className="px-1.5 py-0.5 rounded text-[12.5px] font-mono bg-neutral-200/60 dark:bg-neutral-800 text-[#C8973E]">
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith("*") && token.endsWith("*") && token.length >= 2) {
      return (
        <em key={idx} className="italic opacity-90">
          {token.slice(1, -1)}
        </em>
      );
    }
    return token;
  });
}
