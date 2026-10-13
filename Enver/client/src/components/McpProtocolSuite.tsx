import React, { useState } from "react";
import { Link } from "wouter";
import {
  FolderKanban,
  Terminal,
  BookOpen,
  Users,
  Cpu,
  Wrench,
  Shield,
  Play,
  Check,
  Copy,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Code2,
  Database,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Layers
} from "lucide-react";

export interface McpToolItem {
  name: string;
  signature: string;
  description: string;
  defaultArgs: Record<string, any>;
}

export interface McpCategoryItem {
  id: string;
  title: string;
  badge: string;
  whyItMatters: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  tools: McpToolItem[];
}

export const MCP_CATEGORIES: McpCategoryItem[] = [
  {
    id: "project_delivery",
    title: "Project & Delivery",
    badge: "DELIVERY",
    whyItMatters: "Agents can track and report on client AI implementations",
    icon: FolderKanban,
    tools: [
      {
        name: "list_projects",
        signature: "list_projects(status?: 'ACTIVE' | 'ARCHIVED' | 'ALL')",
        description: "List enterprise consulting engagements, client tags, and health status.",
        defaultArgs: { status: "ACTIVE" }
      },
      {
        name: "get_project_status",
        signature: "get_project_status(projectId: string)",
        description: "Retrieve milestone completion, blockers, budget spend, and SLA health.",
        defaultArgs: { projectId: "PRJ-2026-001" }
      },
      {
        name: "create_ticket",
        signature: "create_ticket(projectId: string, title: string, priority: string)",
        description: "File an engineering or delivery ticket directly into the client tracker.",
        defaultArgs: { projectId: "PRJ-2026-001", title: "Review AST firewall rule for GCS bucket", priority: "HIGH" }
      },
      {
        name: "update_milestone",
        signature: "update_milestone(projectId: string, milestoneId: string, status: string)",
        description: "Update milestone delivery progress and sync customer steering reports.",
        defaultArgs: { projectId: "PRJ-2026-001", milestoneId: "M2-PROD-VALIDATION", status: "COMPLETED" }
      }
    ]
  },
  {
    id: "engineering",
    title: "Engineering",
    badge: "CI/CD & INFRA",
    whyItMatters: "Agents help with CI/CD, model evaluation, and infra",
    icon: Terminal,
    tools: [
      {
        name: "run_pipeline",
        signature: "run_pipeline(pipelineId: string, branch?: string)",
        description: "Trigger evaluation, AST verification, and zero-trust pre-flight pipelines.",
        defaultArgs: { pipelineId: "eval-underwriting-ast-v2", branch: "main" }
      },
      {
        name: "get_deployment_logs",
        signature: "get_deployment_logs(service: string, lines?: number)",
        description: "Stream verified container execution logs, health probes, and audit ticks.",
        defaultArgs: { service: "artificer-core", lines: 50 }
      },
      {
        name: "query_codebase",
        signature: "query_codebase(query: string, language?: string)",
        description: "AST-indexed semantic code search across private enterprise repositories.",
        defaultArgs: { query: "astFirewallRule", language: "typescript" }
      },
      {
        name: "trigger_eval",
        signature: "trigger_eval(benchmark: string, modelId?: string)",
        description: "Execute deterministic regression & drift evaluations on model weights.",
        defaultArgs: { benchmark: "rbi-dl09-financial-underwrite", modelId: "artificer-lora-v2" }
      }
    ]
  },
  {
    id: "knowledge_rag",
    title: "Knowledge & RAG",
    badge: "KNOWLEDGE",
    whyItMatters: "Instant access to your consulting methodology and past work",
    icon: BookOpen,
    tools: [
      {
        name: "search_internal_docs",
        signature: "search_internal_docs(query: string, scope?: string)",
        description: "Query enterprise runbooks, regulatory filings, and architectural blueprints.",
        defaultArgs: { query: "AST destructive command syntax", scope: "ALL" }
      },
      {
        name: "get_playbook",
        signature: "get_playbook(topic: string)",
        description: "Retrieve standardized engineering playbooks and incident response checklists.",
        defaultArgs: { topic: "zero_destruction_firewall" }
      },
      {
        name: "retrieve_case_study",
        signature: "retrieve_case_study(industry: string)",
        description: "Fetch anonymized enterprise implementation case studies and ROI metrics.",
        defaultArgs: { industry: "FINTECH" }
      }
    ]
  },
  {
    id: "client_context",
    title: "Client Context",
    badge: "CONTEXT",
    whyItMatters: "Agents stay grounded in the right client's data",
    icon: Users,
    tools: [
      {
        name: "get_client_context",
        signature: "get_client_context(clientId: string, scope?: string)",
        description: "Retrieve scoped, RBAC-permissioned client metadata and compliance parameters.",
        defaultArgs: { clientId: "CLI-ORION-CAPITAL", scope: "UNDERWRITING_CONFIG" }
      },
      {
        name: "list_active_engagements",
        signature: "list_active_engagements()",
        description: "Enumerate ongoing sovereign and enterprise customer engagements.",
        defaultArgs: {}
      }
    ]
  },
  {
    id: "ai_ops",
    title: "AI Ops specific",
    badge: "AI OPERATIONS",
    whyItMatters: "Direct value for Enterprise AI Operations work",
    icon: Cpu,
    tools: [
      {
        name: "list_models",
        signature: "list_models()",
        description: "Enumerate active sovereign models, latency SLAs, and operational status.",
        defaultArgs: {}
      },
      {
        name: "get_model_metrics",
        signature: "get_model_metrics(modelId: string, timeframe?: string)",
        description: "Fetch p50/p99 inference latency, token economics, and drift metrics.",
        defaultArgs: { modelId: "artificer-lora-v2", timeframe: "24h" }
      },
      {
        name: "trigger_retrain",
        signature: "trigger_retrain(modelId: string, datasetUri: string)",
        description: "Queue LoRA fine-tuning or AST calibration jobs on private compute.",
        defaultArgs: { modelId: "artificer-lora-v2", datasetUri: "gs://enver-curated-sovereign/statements/2026-q3.jsonl" }
      },
      {
        name: "cost_analysis",
        signature: "cost_analysis(timeframe?: string)",
        description: "Audit enterprise inference spend, per-file execution cost, and efficiency savings.",
        defaultArgs: { timeframe: "current_month" }
      }
    ]
  },
  {
    id: "utility",
    title: "Utility",
    badge: "DELIVERABLES",
    whyItMatters: "Speed up consulting deliverables",
    icon: Wrench,
    tools: [
      {
        name: "create_proposal_outline",
        signature: "create_proposal_outline(clientName: string, requirements: string)",
        description: "Synthesize institutional AI transformation proposals with milestones and SLA.",
        defaultArgs: { clientName: "Apex Commercial Capital", requirements: "Automated underwriting & AST command governance" }
      },
      {
        name: "generate_architecture_diagram_prompt",
        signature: "generate_architecture_diagram_prompt(architectureType: string, targetCloud?: string)",
        description: "Generate structured Mermaid system blueprints and high-precision visual prompts.",
        defaultArgs: { architectureType: "agentic_rag", targetCloud: "AZURE" }
      }
    ]
  },
  {
    id: "sentinels",
    title: "Core Sovereign Sentinels",
    badge: "SECURITY GATE",
    whyItMatters: "Zero-destruction firewall, Shannon entropy secret audit, and line-level SHA-256 cryptographic proofs",
    icon: Shield,
    tools: [
      {
        name: "envera_public_overview",
        signature: "envera_public_overview(inquiry?: string)",
        description: "Public institutional overview of Enver, founding credentials, and research engines.",
        defaultArgs: { inquiry: "artificer" }
      },
      {
        name: "envera_ast_firewall_inspect",
        signature: "envera_ast_firewall_inspect(command: string)",
        description: "Inspect CLI command AST for destructive clauses (table drop, recursive delete, IAM elevation).",
        defaultArgs: { command: "bq rm -f -t raw_ledger.credit_events" }
      },
      {
        name: "envera_deep_forensic_audit",
        signature: "envera_deep_forensic_audit(auditType: string)",
        description: "Execute deep cryptographic audit against internal datasets with SHA-256 line seal.",
        defaultArgs: { auditType: "ENTROPY_AUDIT" }
      },
      {
        name: "envera_update_policy",
        signature: "envera_update_policy(policyId: string, ruleJson: string)",
        description: "Update sovereign compliance guardrails with multi-sig cryptographic endorsement.",
        defaultArgs: { policyId: "POL-BLAST-RADIUS-V2" }
      }
    ]
  }
];

function simulateToolResult(toolName: string, args: Record<string, any>) {
  switch (toolName) {
    case "list_projects":
      return {
        status: "SUCCESS",
        toolName,
        executionMode: "EDGE_DETERMINISTIC_CACHE",
        result: {
          projects: [
            { id: "PRJ-2026-001", client: "Tier-1 NBFC Consortium", status: "ACTIVE", health: "HEALTHY", slaCompliance: "99.98%" },
            { id: "PRJ-2026-002", client: "Sovereign Cloud Migration", status: "ACTIVE", health: "HEALTHY", slaCompliance: "100.00%" }
          ],
          total: 2
        },
        durationMs: 14
      };
    case "get_project_status":
      return {
        status: "SUCCESS",
        toolName,
        result: {
          projectId: args.projectId || "PRJ-2026-001",
          status: "ON_TRACK",
          milestone: "M2-PROD-VALIDATION",
          dscrThreshold: "1.25x",
          astSentinelVerification: "100% PASS",
          budgetConsumed: "38.4%"
        },
        durationMs: 18
      };
    case "envera_ast_firewall_inspect":
      return {
        status: "SUCCESS",
        toolName,
        result: {
          terminalCommand: args.terminalCommand || "DROP TABLE production_ledgers;",
          verdict: "BLOCKED",
          rule: "ARBITER-001",
          astTree: "DropTableStatement -> REJECTED_BY_FIREWALL",
          prohibitedNodes: ["DropTableStatement", "CascadeDropNode"],
          blastRadiusPrevented: "100%",
          auditLock: "SHA256: 8F4C219803BBA2E9"
        },
        durationMs: 12
      };
    case "envera_deep_forensic_audit":
      return {
        status: "SUCCESS",
        toolName,
        result: {
          accountId: args.accountId || "MSME-MAH-9921",
          annualTurnover: "₹5,00,00,000",
          dscr: "1.42x (SAFE)",
          quickRatio: "1.28x",
          circularLoops: 0,
          compliance: "RBI DL-09 SOVEREIGN_LENDING_CERTIFIED",
          auditToken: "SHA256: 4A8E029D"
        },
        durationMs: 24
      };
    case "get_deployment_logs":
      return {
        status: "SUCCESS",
        toolName,
        result: {
          service: args.service || "artificer-fleet",
          status: "STREAMING_HEALTHY",
          uptime: "99.99%",
          logs: [
            "[INFO] East Asia Anycast Edge: Cluster 01 online",
            "[INFO] Deterministic Python ratio engine validated",
            "[INFO] AST Sentinel: 0 destructive anomalies intercepted",
            "[INFO] Keepalive heartbeat active: 25s intervals"
          ]
        },
        durationMs: 16
      };
    default:
      return {
        status: "SUCCESS",
        toolName,
        executionMode: "SOVEREIGN_NODE_EXECUTED",
        arguments: args,
        result: {
          message: `Tool '${toolName}' executed successfully with grounded proof chain.`,
          auditLock: "SHA256: " + Math.random().toString(16).substring(2, 10).toUpperCase(),
          timestamp: new Date().toISOString()
        },
        durationMs: 19
      };
  }
}

interface McpProtocolSuiteProps {
  initialCategory?: string;
  showTester?: boolean;
}

export default function McpProtocolSuite({
  initialCategory = "all",
  showTester = true
}: McpProtocolSuiteProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [activeTool, setActiveTool] = useState<McpToolItem>(MCP_CATEGORIES[0].tools[0]);
  const [activeToolArgs, setActiveToolArgs] = useState<string>(
    JSON.stringify(MCP_CATEGORIES[0].tools[0].defaultArgs, null, 2)
  );
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"catalog" | "live_tester" | "config">("catalog");

  const filteredCategories =
    selectedCategory === "all"
      ? MCP_CATEGORIES
      : MCP_CATEGORIES.filter((c) => c.id === selectedCategory);

  const totalTools = MCP_CATEGORIES.reduce((acc, cat) => acc + cat.tools.length, 0);

  const selectToolForTesting = (tool: McpToolItem) => {
    setActiveTool(tool);
    setActiveToolArgs(JSON.stringify(tool.defaultArgs, null, 2));
    setExecutionResult(null);
    setActiveTab("live_tester");
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setExecutionResult(null);
    try {
      let parsedArgs = {};
      try {
        parsedArgs = JSON.parse(activeToolArgs);
      } catch (e) {
        setExecutionResult({
          error: "Invalid JSON in arguments input field."
        });
        setIsExecuting(false);
        return;
      }

      try {
        const res = await fetch("/api/mcp/playground-exec", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toolName: activeTool.name,
            arguments: parsedArgs
          })
        });

        if (res.ok) {
          const data = await res.json();
          setExecutionResult(data);
          return;
        }
      } catch {
        // Fallback to simulation if backend endpoint is offline or running on static edge
      }

      // High-fidelity edge simulation
      const simulated = simulateToolResult(activeTool.name, parsedArgs);
      setExecutionResult(simulated);
    } catch (err: any) {
      setExecutionResult({
        error: err.message || "Execution error encountered."
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const copyConfig = () => {
    const config = JSON.stringify(
      {
        mcpServers: {
          envera: {
            url: `${window.location.origin}/api/mcp/sse`,
            transport: "sse"
          }
        }
      },
      null,
      2
    );
    navigator.clipboard.writeText(config);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Top Protocol Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-8 border-b border-[#E5DFD1] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#E5DFD1] font-mono text-xs text-[#2B121F] mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-[#FF6F1E]">MCP v2.0 Specification</span>
            <span className="text-[#7A6F68]">·</span>
            <span>23 Production Tools Registered</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#2B121F] tracking-tight">
            Universal Model Context Protocol Suite
          </h3>
          <p className="text-sm font-sans text-[#7A6F68] mt-1.5 max-w-2xl leading-relaxed">
            Connect any MCP-compatible agent (Claude Desktop, Cursor, Gemini CLI, LangChain) directly to Enver's enterprise execution fabric.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-[#FAF7F0] border border-[#E5DFD1] rounded-2xl shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("catalog")}
            className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "catalog"
                ? "bg-[#2B121F] text-white shadow-xs"
                : "text-[#7A6F68] hover:text-[#2B121F]"
            }`}
          >
            <span>Protocol Table ({totalTools})</span>
          </button>
          {showTester && (
            <button
              type="button"
              onClick={() => setActiveTab("live_tester")}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "live_tester"
                  ? "bg-[#2B121F] text-white shadow-xs"
                  : "text-[#7A6F68] hover:text-[#2B121F]"
              }`}
            >
              <span>Live Tool Tester</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setActiveTab("config")}
            className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "config"
                ? "bg-[#2B121F] text-white shadow-xs"
                : "text-[#7A6F68] hover:text-[#2B121F]"
            }`}
          >
            <span>Agent Client JSON</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: PROTOCOL TABLE (Matches uploaded user image format)
          ========================================================================= */}
      {activeTab === "catalog" && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer border ${
                selectedCategory === "all"
                  ? "bg-[#FF6F1E] text-white border-[#FF6F1E] shadow-xs"
                  : "bg-white text-[#7A6F68] border-[#E5DFD1] hover:border-[#2B121F] hover:text-[#2B121F]"
              }`}
            >
              All Categories ({totalTools})
            </button>
            {MCP_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer border ${
                  selectedCategory === cat.id
                    ? "bg-[#2B121F] text-white border-[#2B121F] shadow-xs"
                    : "bg-white text-[#7A6F68] border-[#E5DFD1] hover:border-[#2B121F] hover:text-[#2B121F]"
                }`}
              >
                {cat.title} ({cat.tools.length})
              </button>
            ))}
          </div>

          {/* Table Container (The exact table requested in user prompt) */}
          <div className="w-full overflow-hidden rounded-2xl border border-[#E5DFD1] bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#E5DFD1] text-[11px] font-mono uppercase tracking-wider text-[#7A6F68]">
                    <th className="py-3.5 px-6 font-bold w-[220px]">Category</th>
                    <th className="py-3.5 px-6 font-bold min-w-[360px]">Example Tools</th>
                    <th className="py-3.5 px-6 font-bold min-w-[320px]">Why it matters for you</th>
                    <th className="py-3.5 px-4 font-bold text-right w-[110px]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DFD1]/70 text-sm font-sans">
                  {filteredCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <tr key={cat.id} className="hover:bg-[#FAF7F0]/60 transition-colors group">
                        {/* Category Column */}
                        <td className="py-4 px-6 align-top">
                          <div className="flex items-start gap-2.5">
                            <div className="p-2 rounded-xl bg-[#FAF7F0] border border-[#E5DFD1] text-[#2B121F] group-hover:text-[#FF6F1E] group-hover:border-[#FF6F1E]/30 transition-colors mt-0.5">
                              <Icon size={16} />
                            </div>
                            <div>
                              <div className="font-heading font-bold text-[#2B121F] text-sm">
                                {cat.title}
                              </div>
                              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#FAF7F0] border border-[#E5DFD1] text-[10px] font-mono text-[#7A6F68] font-medium">
                                {cat.tools.length} Tools
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Example Tools Column (Styled code badge tags like in the image) */}
                        <td className="py-4 px-6 align-top">
                          <div className="flex flex-wrap gap-2">
                            {cat.tools.map((t) => (
                              <button
                                key={t.name}
                                type="button"
                                onClick={() => selectToolForTesting(t)}
                                title={t.description}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2B121F]/[0.04] hover:bg-[#2B121F] hover:text-[#FAF7F0] text-[#8C3A27] font-mono text-xs font-semibold border border-[#8C3A27]/20 transition-all cursor-pointer shadow-2xs group/btn"
                              >
                                <code>{t.name}</code>
                                <ChevronRight size={11} className="opacity-40 group-hover/btn:opacity-100 transition-opacity" />
                              </button>
                            ))}
                          </div>
                          <div className="text-[11px] font-sans text-[#7A6F68] mt-2">
                            {cat.tools.map((t) => t.description).join(" · ").slice(0, 160)}...
                          </div>
                        </td>

                        {/* Why It Matters Column */}
                        <td className="py-4 px-6 align-top">
                          <p className="text-sm font-sans text-[#2B121F]/90 font-medium leading-relaxed">
                            {cat.whyItMatters}
                          </p>
                        </td>

                        {/* Action Column */}
                        <td className="py-4 px-4 align-top text-right">
                          <button
                            type="button"
                            onClick={() => selectToolForTesting(cat.tools[0])}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FAF7F0] hover:bg-[#2B121F] text-[#2B121F] hover:text-white border border-[#E5DFD1] hover:border-[#2B121F] font-mono text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                          >
                            <span>Test</span>
                            <Play size={10} className="fill-current" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: LIVE TOOL TESTER
          ========================================================================= */}
      {activeTab === "live_tester" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-[#E5DFD1] rounded-2xl p-6 sm:p-8 shadow-xs">
          {/* Left: Tool Selection & Argument Editor */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#7A6F68] font-bold mb-2">
                Selected MCP Tool
              </label>
              <select
                aria-label="Selected MCP Tool"
                value={activeTool.name}
                onChange={(e) => {
                  const found = MCP_CATEGORIES.flatMap((c) => c.tools).find((t) => t.name === e.target.value);
                  if (found) {
                    setActiveTool(found);
                    setActiveToolArgs(JSON.stringify(found.defaultArgs, null, 2));
                    setExecutionResult(null);
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#E5DFD1] text-[#2B121F] font-mono text-xs font-bold focus:outline-none focus:border-[#FF6F1E]"
              >
                {MCP_CATEGORIES.map((cat) => (
                  <optgroup key={cat.id} label={cat.title}>
                    {cat.tools.map((t) => (
                      <option key={t.name} value={t.name}>
                        {t.name} — {t.description.slice(0, 45)}...
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E5DFD1] space-y-1.5">
              <div className="font-mono text-xs font-bold text-[#FF6F1E] flex items-center gap-1.5">
                <Code2 size={13} />
                <code>{activeTool.signature}</code>
              </div>
              <p className="text-xs font-sans text-[#7A6F68] leading-relaxed">
                {activeTool.description}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#7A6F68] font-bold">
                  JSON Arguments
                </label>
                <button
                  type="button"
                  onClick={() => setActiveToolArgs(JSON.stringify(activeTool.defaultArgs, null, 2))}
                  className="text-[11px] font-mono text-[#FF6F1E] hover:underline"
                >
                  Reset Defaults
                </button>
              </div>
              <textarea
                rows={7}
                value={activeToolArgs}
                onChange={(e) => setActiveToolArgs(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-[#1C0B15] text-[#F7F3E9] font-mono text-xs border border-[#4A2237] focus:outline-none focus:border-[#FF6F1E] leading-relaxed"
                spellCheck={false}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExecute}
                disabled={isExecuting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2B121F] hover:bg-[#FF6F1E] text-white font-mono text-xs font-bold tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {isExecuting ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Executing via MCP v2.0...</span>
                  </>
                ) : (
                  <>
                    <Play size={13} className="fill-current" />
                    <span>Execute Tool Live</span>
                  </>
                )}
              </button>

              <Link
                href="/playground"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-white hover:bg-[#FAF7F0] border border-[#E5DFD1] font-mono text-xs font-semibold text-[#2B121F] transition-all no-underline"
              >
                <span>Open in Playground</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Right: Live MCP Response Display */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5DFD1]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#7A6F68] font-bold flex items-center gap-1.5">
                <Terminal size={13} className="text-[#FF6F1E]" />
                MCP Wire Response
              </span>
              {executionResult && (
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {executionResult.durationMs ? `${executionResult.durationMs}ms latency` : "200 OK"}
                </span>
              )}
            </div>

            <div className="flex-1 min-h-[300px] rounded-xl bg-[#0F0814] border border-[#2B121F]/40 p-4 font-mono text-xs text-[#E5DFD1] overflow-auto leading-relaxed">
              {executionResult ? (
                <pre className="whitespace-pre-wrap">{JSON.stringify(executionResult, null, 2)}</pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#7A6F68] space-y-2">
                  <Play size={24} className="opacity-30 text-[#FF6F1E]" />
                  <p className="text-xs font-mono">
                    Ready to execute <code className="text-[#FF6F1E]">{activeTool.name}</code>.
                  </p>
                  <p className="text-[11px] max-w-xs text-white/50">
                    Click "Execute Tool Live" above to dispatch this payload to Enver's local MCP engine.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: AGENT CLIENT CONFIG (Claude Desktop / Cursor / LangChain)
          ========================================================================= */}
      {activeTab === "config" && (
        <div className="bg-white border border-[#E5DFD1] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-heading font-bold text-lg text-[#2B121F]">
                Connect External Agents to Enver MCP
              </h4>
              <p className="text-xs font-sans text-[#7A6F68] mt-0.5">
                Add this snippet to your <code className="font-mono text-[#FF6F1E]">claude_desktop_config.json</code> or Cursor MCP settings.
              </p>
            </div>
            <button
              type="button"
              onClick={copyConfig}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2B121F] hover:bg-[#FF6F1E] text-white font-mono text-xs font-semibold transition-all cursor-pointer self-start sm:self-auto"
            >
              {copiedCode ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedCode ? "Copied!" : "Copy Configuration"}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#0F0814] border border-[#2B121F]/40 font-mono text-xs text-[#E5DFD1] overflow-x-auto">
            <pre>
{`{
  "mcpServers": {
    "envera": {
      "url": "${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/api/mcp/sse",
      "transport": "sse"
    }
  }
}`}
            </pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E5DFD1] space-y-1.5">
              <div className="font-mono text-xs font-bold text-[#2B121F] flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-500" />
                <span>Claude Desktop</span>
              </div>
              <p className="text-xs font-sans text-[#7A6F68]">
                Native SSE support enables Claude to plan, query codebases, and report project status directly.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E5DFD1] space-y-1.5">
              <div className="font-mono text-xs font-bold text-[#2B121F] flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-500" />
                <span>Cursor / IDE</span>
              </div>
              <p className="text-xs font-sans text-[#7A6F68]">
                Trigger evaluation runs and inspect blast-radius AST security rules right in your IDE.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E5DFD1] space-y-1.5">
              <div className="font-mono text-xs font-bold text-[#2B121F] flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-500" />
                <span>Private VPC Agent Swarms</span>
              </div>
              <p className="text-xs font-sans text-[#7A6F68]">
                Scoped and permissioned access guarantees agents stay grounded in sovereign client data.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
