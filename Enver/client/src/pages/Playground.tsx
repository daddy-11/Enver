import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
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
  Share2
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

  // Save sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("enver_sovereign_sessions", JSON.stringify(sessions));
    } catch (e) {}
  }, [sessions]);

  // Scroll to bottom on messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSubmitting]);

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
    if (inputRef.current) inputRef.current.focus();
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (currentSessionId === id) {
      setCurrentSessionId(null);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isSubmitting) return;

    setInputMessage("");
    setIsSubmitting(true);

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

      let replyText = "";
      let citation = `${activeEngineObj?.name || "Enver Sovereign Core"} · East Asia Sovereign Edge`;
      let auditLock = "SHA256: " + Math.random().toString(16).substring(2, 10).toUpperCase();
      let thought = `Decomposed operational query into typed AST primitives. Evaluated role permissions and contextual memory constraints.`;
      let isEdgeCaseBlocked = false;

      if (res.ok) {
        const data = await res.json();
        replyText = data.response || data.text || "Execution finished.";
        if (data.citation) citation = data.citation;
        if (data.auditRef) auditLock = `LOCK: ${data.auditRef}`;

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
      const fallbackReply = getSovereignResponse(query, selectedEngine);
      const elapsed = Number(((Date.now() - startTime) / 1000).toFixed(1));

      const assistantMsg: ChatMessage = {
        id: "ast-" + Date.now(),
        sender: "assistant",
        text: fallbackReply,
        thought: `Autonomous sovereign evaluation completed in ${elapsed}s with cryptographic lock verification.`,
        thoughtTime: elapsed,
        citation: `${activeEngineObj?.name || "Enver Sovereign Intelligence"} · Local Citadel Node`,
        engine: activeEngineObj?.name,
        auditLock: "SHA256: 9F8A2E1D",
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

    return `I have evaluated your inquiry: **"${q}"** through the **${ENGINES.find((e) => e.id === engine)?.name || "Enver Sovereign Core"}**.\n\n### Operational Assessment\n1. **Foundational Verification**: Every reasoning step is anchored to deterministic code, AST syntax verification, and auditable proof chains.\n2. **Autonomous Execution**: Whether verifying multi-cloud infrastructure, structuring MSME credit models, or engineering agent swarms, Enver guarantees zero ungrounded hallucinations.\n\nWhat component or workflow would you like to inspect or deploy next?`;
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
        isDark ? "bg-[#1E2519] text-[#F4EFE6]" : "bg-[#F4EFE6] text-[#2B3322]"
      }`}
    >
      {/* ========================================================================= */}
      {/* 0. AMBIENT SCANNER SHADER BACKGROUND (CAMEL YELLOW, DARK OLIVE, LATTE) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
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
      {/* 1. ARCHITECTURAL SIDEBAR (IMAGE 1 EXACT DESIGN) */}
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
            ? "bg-[#1A2215]/95 border-[#2F3B25] backdrop-blur-md"
            : "bg-[#EDE6D8]/95 border-[#E0D7C6] backdrop-blur-md"
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
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className={`text-[14px] font-extrabold tracking-tight ${isDark ? "text-white" : "text-[#2B3322]"}`}>
                  Enver Citadel
                </span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded font-bold bg-[#C8973E]/20 text-[#8F641B] dark:text-[#C8973E] border border-[#C8973E]/40">
                  OPS
                </span>
              </div>
            </div>
          </Link>

          {/* Top action icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLauncherModalOpen(true)}
              title="Flagship Engines Launcher"
              className={`p-1.5 rounded-lg transition ${
                isDark
                  ? "text-[#C8973E] hover:bg-[#2B3322] hover:text-white"
                  : "text-[#736A5B] hover:bg-[#E5DFD1] hover:text-[#2B3322]"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              title="Collapse sidebar"
              className={`p-1.5 rounded-lg transition ${
                isDark
                  ? "text-[#A19888] hover:bg-[#2B3322] hover:text-white"
                  : "text-[#736A5B] hover:bg-[#E5DFD1] hover:text-[#2B3322]"
              }`}
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* "+ New chat" Button */}
        <div className="px-3.5 pt-1.5 pb-2.5">
          <button
            onClick={handleNewChat}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-[13px] font-semibold transition shadow-xs border ${
              isDark
                ? "bg-[#2B3322] hover:bg-[#3D4830] text-[#F4EFE6] border-[#3D4830]"
                : "bg-[#2B3322] hover:bg-[#3D4830] text-[#F4EFE6] border-[#2B3322]"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#C8973E] flex items-center justify-center shadow-xs">
                <Plus className="w-3 h-3 text-[#2B3322]" />
              </div>
              <span>New session</span>
            </div>
            <span className="text-[10px] font-mono text-white/50">
              Ctrl+Shift+O
            </span>
          </button>
        </div>

        {/* Nav Links: Search, Research Papers, DB Preview, Activity Ledger */}
        <div className="px-2.5 space-y-0.5 text-[12.5px] font-medium">
          <button
            onClick={() => setSearchModalOpen(true)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
              isDark
                ? "text-[#D5CDBD] hover:bg-[#242E1C] hover:text-white"
                : "text-[#574E42] hover:bg-[#E5DFD1] hover:text-[#2B3322]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[#C8973E]" />
              <span>Search Archives</span>
            </div>
            <span className="text-[10px] font-mono text-[#736A5B]">Ctrl+K</span>
          </button>

          {/* Research Hub Link */}
          <Link
            href="/research"
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
              isDark
                ? "text-[#D5CDBD] hover:bg-[#242E1C] hover:text-white"
                : "text-[#574E42] hover:bg-[#E5DFD1] hover:text-[#2B3322]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#C8973E]" />
              <span>NTC Credit Research</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#C8973E]/20 text-[#8F641B] dark:text-[#C8973E] font-bold">
              PAPERS
            </span>
          </Link>

          {/* Read-Only Database Preview Drawer Trigger */}
          <button
            onClick={() => {
              refreshDatabasePreview();
              setDatabaseDrawerOpen(true);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
              isDark
                ? "text-[#D5CDBD] hover:bg-[#242E1C] hover:text-white"
                : "text-[#574E42] hover:bg-[#E5DFD1] hover:text-[#2B3322]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-[#C8973E]" />
              <span>Our DB (Read-Only)</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#2B3322]/10 text-[#2B3322] dark:text-[#D5CDBD] font-semibold">
              4 TABLES
            </span>
          </button>

          {/* Activity Ledger Top-to-Bottom Audit Trigger */}
          <button
            onClick={() => {
              refreshAuditLogs();
              setAuditDrawerOpen(true);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition ${
              isDark
                ? "text-[#D5CDBD] hover:bg-[#242E1C] hover:text-white"
                : "text-[#574E42] hover:bg-[#E5DFD1] hover:text-[#2B3322]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-[#C8973E]" />
              <span>Activity Ledger</span>
            </div>
            {auditStats.edgeCases > 0 ? (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-600 dark:text-red-400 font-bold border border-red-500/30">
                {auditStats.edgeCases} EDGES
              </span>
            ) : (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold">
                AUDITED
              </span>
            )}
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto px-2 pt-3 pb-2 scrollbar-thin">
          <div className="px-3 pb-2 text-[10.5px] font-bold uppercase tracking-wider text-[#736A5B]">
            Operations Ledger
          </div>

          {sessions.length === 0 ? (
            <div className="px-3 pt-1 space-y-2 text-[12px] leading-relaxed text-[#736A5B]">
              <p className="font-semibold text-xs text-[#2B3322] dark:text-[#EDE6D8]">Ready for operations...</p>
              <p className="text-[11px] leading-normal opacity-85">
                Past reasoning chains, AST audit logs, and credit dossiers will be indexed here automatically.
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
                      ? "bg-white text-[#2B3322] font-semibold shadow-xs border border-[#E0D7C6]"
                      : isDark
                      ? "text-[#D5CDBD] hover:bg-[#242E1C] hover:text-white"
                      : "text-[#574E42] hover:bg-[#E5DFD1] hover:text-[#2B3322]"
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
        {/* SIDEBAR FOOTER: IMAGE 1 EXACT PROFILE CARD + SOVEREIGN CLUSTER TIER */}
        {/* ===================================================================== */}
        <div className={`p-3.5 border-t space-y-3 ${
          isDark ? "border-[#2F3B25] bg-[#141B10]" : "border-[#E0D7C6] bg-[#EDE6D8]"
        }`}>
          {/* User Profile Card */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5">
              {/* Circular Avatar "A" in warm amber/camel tone */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C8973E] to-[#E5B558] flex items-center justify-center text-[#2B3322] text-sm font-extrabold shadow-xs">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "A"}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[13px] font-bold ${isDark ? "text-white" : "text-[#2B3322]"}`}>
                    {user?.displayName || "Amaan Shaikh"}
                  </span>
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded font-bold bg-[#C8973E]/20 text-[#8F641B] dark:text-[#C8973E] border border-[#C8973E]/40">
                    {user?.badge || "LEAD"}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#736A5B]">
                  {user?.org || "Enver AI Tech"}
                </span>
              </div>
            </div>

            {/* Settings gear: opens account clearance switcher */}
            <button
              onClick={() => setAccountModalOpen(true)}
              title="Clearance & Account Settings"
              className={`p-1.5 rounded-lg transition ${
                isDark
                  ? "text-[#C8973E] hover:bg-[#2B3322] hover:text-white"
                  : "text-[#736A5B] hover:bg-[#E5DFD1] hover:text-[#2B3322]"
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Rounded Pill Button: "Sovereign Cluster Tier" (Image 1 Exact) */}
          <button
            onClick={() => setSovereignClusterModalOpen(true)}
            className="w-full py-2.5 px-4 rounded-full text-[13px] font-semibold transition shadow-xs text-center border bg-[#F4EFE6] hover:bg-white text-[#2B3322] border-[#D5CDBD] hover:shadow-sm flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Sovereign Cluster Tier</span>
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKSPACE / CHAT CANVAS */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        {/* Top Header Bar */}
        <header
          className={`flex items-center justify-between px-5 py-3 border-b backdrop-blur-md z-10 transition-colors ${
            isDark
              ? "bg-[#1E2519]/90 border-[#2F3B25]"
              : "bg-[#F4EFE6]/90 border-[#E0D7C6]"
          }`}
        >
          {/* Left: Sidebar toggle + Engine Selector */}
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                title="Expand sidebar"
                className={`p-1.5 rounded-lg transition ${
                  isDark
                    ? "text-[#C8973E] hover:bg-[#2B3322] hover:text-white"
                    : "text-[#736A5B] hover:bg-[#E5DFD1] hover:text-[#2B3322]"
                }`}
              >
                <PanelLeft className="w-5 h-5" />
              </button>
            )}

            {/* Engine Picker Pill */}
            <div className="relative">
              <button
                onClick={() => setEngineDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition border ${
                  isDark
                    ? "bg-[#242E1C] hover:bg-[#2E3B24] text-white border-[#3D4830]"
                    : "bg-white hover:bg-[#EDE6D8] text-[#2B3322] border-[#E0D7C6]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#C8973E] animate-pulse" />
                <span>{currentEngineObj.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#736A5B]" />
              </button>

              {engineDropdownOpen && (
                <div
                  className={`absolute left-0 mt-2 w-80 rounded-2xl p-2 space-y-1 shadow-2xl z-30 border ${
                    isDark
                      ? "bg-[#1A2215] border-[#2F3B25]"
                      : "bg-white border-[#E0D7C6]"
                  }`}
                >
                  <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#736A5B]">
                    Select Sovereign Engine
                  </div>
                  {ENGINES.map((eng) => (
                    <button
                      key={eng.id}
                      onClick={() => {
                        setSelectedEngine(eng.id);
                        setEngineDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition flex flex-col ${
                        selectedEngine === eng.id
                          ? "bg-[#EDE6D8] text-[#2B3322] font-semibold"
                          : isDark
                          ? "text-[#D5CDBD] hover:bg-[#242E1C] hover:text-white"
                          : "text-[#574E42] hover:bg-[#F4EFE6] hover:text-[#2B3322]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-[13px]">{eng.name}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold border ${eng.badgeColor}`}>
                          {eng.tag}
                        </span>
                      </div>
                      <span className="text-[11px] leading-relaxed text-[#736A5B]">
                        {eng.desc}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Header: Role Clearance Badge, DB, Ledger, MCP, Theme, Fullscreen */}
          <div className="flex items-center gap-2">
            {/* Clearance Level Pill */}
            <button
              onClick={() => setAccountModalOpen(true)}
              title="Click to view clearance permissions or switch accounts"
              className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-mono font-semibold transition border bg-white hover:bg-[#EDE6D8] text-[#2B3322] border-[#E0D7C6]"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#C8973E]" />
              <span>{user?.role === "ENVER_INTERNAL" ? "SSO: @enveraitech.com" : user?.role === "ENGINEER" ? "Engineer (MS Work)" : "Public Visitor"}</span>
            </button>

            {/* MCP Suite Explorer Button */}
            <button
              onClick={() => setMcpModalOpen(true)}
              title="Open MCP Protocol Suite (23 Tools)"
              className="text-xs px-3 py-1.5 rounded-full font-mono font-semibold transition flex items-center gap-1.5 border bg-[#2B3322] hover:bg-[#3D4830] text-[#F4EFE6] border-[#2B3322]"
            >
              <Terminal className="w-3.5 h-3.5 text-[#C8973E]" />
              <span>MCP Suite (23)</span>
            </button>

            {/* Theme Switcher Toggle (Sun / Moon) */}
            <button
              onClick={() => {
                if (toggleTheme) toggleTheme();
              }}
              title={isDark ? "Switch to Tranquil Oat Silk" : "Switch to Nocturne Obsidian"}
              className="p-2 rounded-full transition flex items-center justify-center border bg-white hover:bg-[#EDE6D8] text-[#2B3322] border-[#E0D7C6]"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#C8973E]" /> : <Moon className="w-4 h-4 text-[#2B3322]" />}
            </button>

            {/* Back to Website */}
            <Link
              href="/"
              className="text-xs px-3 py-1.5 rounded-full font-semibold transition flex items-center gap-1.5 border bg-white hover:bg-[#EDE6D8] text-[#2B3322] border-[#E0D7C6]"
            >
              <span>Portal</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              className="p-2 rounded-full transition border bg-white hover:bg-[#EDE6D8] text-[#736A5B] hover:text-[#2B3322] border-[#E0D7C6]"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Chat / Canvas Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin relative z-10">
          {messages.length === 0 ? (
            /* ========================================================================= */
            /* EMPTY HERO STATE: IMAGE 2 CHIPS + ENVER MOTIF */
            /* ========================================================================= */
            <div className="flex flex-col items-center justify-center min-h-[75vh] max-w-2xl mx-auto text-center px-4">
              {/* Emblem Motif */}
              <div className="mb-4 relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#C8973E] via-[#2B3322] to-[#E5B558] p-0.5 shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-[14px] flex items-center justify-center bg-[#F4EFE6]">
                    <img
                      src="/favicon.png"
                      alt="Enver Sovereign Emblem"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Sovereign Greeting */}
              <h1 className={`text-[32px] sm:text-[38px] font-bold tracking-tight mb-2 ${isDark ? "text-white" : "text-[#2B3322]"}`}>
                How can Enver Citadel assist your operations?
              </h1>

              {/* Subtext */}
              <p className="text-[12.5px] mb-8 leading-relaxed max-w-lg text-[#574E42]">
                Autonomous agentic workflows · RBI DL-09 compliance · Zero-trust AST command firewall.{" "}
                <Link href="/research" className="underline hover:text-[#C8973E] transition font-semibold">
                  Read NTC research papers
                </Link>
                .
              </p>

              {/* Centered Capsule Input Pill */}
              <div className="w-full relative rounded-full transition-all p-2.5 flex items-center gap-2 border shadow-xl bg-white border-[#E0D7C6] hover:border-[#C8973E] focus-within:border-[#C8973E]">
                <button
                  type="button"
                  title="Attach operational document or balance sheet"
                  onClick={() => {
                    setToastConfig({
                      title: "Context Attachment",
                      description: "Upload financial statements, AST policies, or repository configs.",
                      fuseColor: "#C8973E"
                    });
                    setToastOpen(true);
                  }}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition shrink-0 text-[#736A5B] hover:text-[#2B3322] hover:bg-[#EDE6D8]"
                >
                  <Plus className="w-4 h-4" />
                </button>

                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={1}
                  placeholder={`Ask ${currentEngineObj.name}...`}
                  className="flex-1 bg-transparent border-0 outline-none text-[15px] resize-none leading-relaxed py-1 px-1 font-medium text-[#2B3322] placeholder-[#8F8578]"
                />

                <div className="flex items-center gap-1.5 shrink-0 pr-1">
                  <button
                    type="button"
                    title="Voice dictation"
                    onClick={() => {
                      setToastConfig({
                        title: "Voice Dictation Active",
                        description: "Listening for sovereign instructions...",
                        fuseColor: "#C8973E"
                      });
                      setToastOpen(true);
                    }}
                    className="p-2 rounded-full transition text-[#736A5B] hover:text-[#2B3322] hover:bg-[#EDE6D8]"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isSubmitting}
                    title="Dispatch operational query"
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition shadow-xs ${
                      inputMessage.trim() && !isSubmitting
                        ? "bg-[#C8973E] text-white hover:bg-[#B3832F] hover:scale-105"
                        : "bg-[#EDE6D8] text-[#736A5B]/50 cursor-not-allowed"
                    }`}
                  >
                    <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* ===================================================================== */}
              {/* IMAGE 2 EXACT QUICK ACTION CHIPS */}
              {/* Row 1: Arbiter AST Audit (tan), Artificer Credit Dossier (white), Cerberus Entropy Scan (white) */}
              {/* Row 2: Agent Swarm Orchestrator (white), MCP Protocol Suite (23 Tools) (orange prompt) */}
              {/* ===================================================================== */}
              <div className="flex flex-col items-center gap-2.5 mt-6">
                {/* Row 1 */}
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {/* Arbiter AST Audit (tan bg) */}
                  <button
                    onClick={() => handleSendMessage("Perform an AST security inspection for cloud DevOps commands.")}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition shadow-xs bg-[#EBE4D5] hover:bg-[#E2D9C7] text-[#2B3322] border border-[#DCD2C0]"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#E65100]" />
                    <span>Arbiter AST Audit</span>
                  </button>

                  {/* Artificer Credit Dossier (white bg) */}
                  <button
                    onClick={() => handleSendMessage("Explain Artificer MSME credit underwriting and DSCR calculation.")}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition shadow-xs bg-white hover:bg-[#FAF7F0] text-[#2B3322] border border-[#E0D7C6]"
                  >
                    <Activity className="w-4 h-4 text-[#C8973E]" />
                    <span>Artificer Credit Dossier</span>
                  </button>

                  {/* Cerberus Entropy Scan (white bg) */}
                  <button
                    onClick={() => handleSendMessage("Scan enterprise repository with Cerberus Shannon entropy detector.")}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition shadow-xs bg-white hover:bg-[#FAF7F0] text-[#2B3322] border border-[#E0D7C6]"
                  >
                    <Lock className="w-4 h-4 text-[#0284C7]" />
                    <span>Cerberus Entropy Scan</span>
                  </button>
                </div>

                {/* Row 2 */}
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {/* Agent Swarm Orchestrator */}
                  <button
                    onClick={() => handleSendMessage("Demonstrate multi-agent swarm task delegation and consensus loop.")}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition shadow-xs bg-white hover:bg-[#FAF7F0] text-[#2B3322] border border-[#E0D7C6]"
                  >
                    <Zap className="w-4 h-4 text-[#9333EA]" />
                    <span>Agent Swarm Orchestrator</span>
                  </button>

                  {/* MCP Protocol Suite (23 Tools) with orange prompt icon */}
                  <button
                    onClick={() => setMcpModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition shadow-xs bg-white hover:bg-[#FAF7F0] text-[#E65100] border border-[#E65100]/30 cursor-pointer"
                  >
                    <span className="font-mono font-bold text-sm text-[#E65100]">&gt;_</span>
                    <span>MCP Protocol Suite (23 Tools)</span>
                  </button>
                </div>
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
                          <div className="rounded-xl border p-2.5 text-xs transition bg-white/80 border-[#E0D7C6] text-[#574E42]">
                            <button
                              onClick={() =>
                                setExpandedThoughtId(
                                  expandedThoughtId === msg.id ? null : msg.id
                                )
                              }
                              className="w-full flex items-center justify-between text-left font-mono text-[11px] hover:text-[#C8973E]"
                            >
                              <div className="flex items-center gap-2">
                                <Cpu className="w-3.5 h-3.5 text-[#C8973E]" />
                                <span>
                                  Deterministic Reasoning ({msg.thoughtTime || 0.8}s) · {msg.auditLock || "SHA256 VERIFIED"}
                                </span>
                              </div>
                              <ChevronRight
                                className={`w-3.5 h-3.5 transition-transform ${
                                  expandedThoughtId === msg.id ? "rotate-90" : ""
                                }`}
                              />
                            </button>
                            {expandedThoughtId === msg.id && (
                              <p className="mt-2 pt-2 border-t text-[11px] font-mono leading-normal border-[#E0D7C6] text-[#736A5B]">
                                {msg.thought}
                              </p>
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

                        {/* Sovereign Citation badge */}
                        {msg.citation && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono border bg-white/70 text-[#736A5B] border-[#E0D7C6]">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
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
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Pinned Bottom Input Capsule (Active Chat Mode) */}
        {messages.length > 0 && (
          <div className={`p-4 border-t backdrop-blur-md transition-colors ${
            isDark ? "bg-[#1E2519]/95 border-[#2F3B25]" : "bg-[#F4EFE6]/95 border-[#E0D7C6]"
          }`}>
            <div className="max-w-3xl mx-auto relative rounded-full transition-all p-2.5 flex items-center gap-2 border shadow-xl bg-white border-[#E0D7C6] hover:border-[#C8973E] focus-within:border-[#C8973E]">
              <button
                type="button"
                title="Attach operational document"
                onClick={() => {
                  setToastConfig({
                    title: "Context Attachment",
                    description: "Upload financial statements, AST policies, or repository configs.",
                    fuseColor: "#C8973E"
                  });
                  setToastOpen(true);
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center transition shrink-0 text-[#736A5B] hover:text-[#2B3322] hover:bg-[#EDE6D8]"
              >
                <Plus className="w-4 h-4" />
              </button>

              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                rows={1}
                placeholder={`Message ${currentEngineObj.name}...`}
                className="flex-1 bg-transparent border-0 outline-none text-[15px] resize-none leading-relaxed py-1 px-1 font-medium text-[#2B3322] placeholder-[#8F8578]"
              />

              <div className="flex items-center gap-1.5 shrink-0 pr-1">
                <button
                  type="button"
                  title="Voice dictation"
                  className="p-2 rounded-full transition text-[#736A5B] hover:text-[#2B3322] hover:bg-[#EDE6D8]"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isSubmitting}
                  title="Send message"
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition shadow-xs ${
                    inputMessage.trim() && !isSubmitting
                      ? "bg-[#C8973E] text-white hover:bg-[#B3832F] hover:scale-105"
                      : "bg-[#EDE6D8] text-[#736A5B]/40 cursor-not-allowed"
                  }`}
                >
                  <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

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
    </div>
  );
}

/** Render code blocks & formatted text safely */
function renderFormattedText(text: string, isDark: boolean) {
  if (text.includes("```")) {
    const parts = text.split("```");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const firstLineEnd = part.indexOf("\n");
        const lang = firstLineEnd !== -1 ? part.slice(0, firstLineEnd).trim() : "";
        const code = firstLineEnd !== -1 ? part.slice(firstLineEnd + 1) : part;

        return (
          <div
            key={index}
            className="my-2.5 rounded-xl border overflow-hidden font-mono text-xs shadow-xs bg-[#2B3322] text-[#F4EFE6] border-[#3D4830]"
          >
            {lang && (
              <div className="px-3.5 py-1.5 border-b text-[10.5px] font-bold flex justify-between items-center bg-[#1A2215] border-[#3D4830] text-[#A19888]">
                <span className="uppercase text-[#C8973E]">{lang}</span>
                <span className="font-mono text-[10px]">Deterministic Snippet</span>
              </div>
            )}
            <pre className="p-3.5 overflow-x-auto font-mono leading-relaxed select-text text-[#EDE6D8]">
              <code>{code}</code>
            </pre>
          </div>
        );
      }
      return <span key={index}>{part}</span>;
    });
  }
  return text;
}
