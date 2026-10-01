import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Key,
  Copy,
  Check,
  ShieldCheck,
  Lock,
  Plus,
  Trash2,
  ExternalLink,
  Code2,
  Terminal,
  Moon,
  Sun
} from "lucide-react";
import TechText from "@/components/reactbits/TechText";

interface PatToken {
  id: string;
  name: string;
  prefix: string;
  created: string;
  scope: string;
  lastUsed: string;
}

export default function Settings() {
  const [themeMode, setThemeMode] = useState<"tranquil" | "nocturne">("tranquil");
  const isTranquil = themeMode === "tranquil";

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [tokens, setTokens] = useState<PatToken[]>(() => {
    try {
      const saved = localStorage.getItem("enver_pat_tokens");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: "pat_live_01",
        name: "Claude Desktop Local MCP",
        prefix: "env_pat_9b2a...7c19",
        created: "Today, 10:14 IST",
        scope: "read_only_search + execute_forensic_tools",
        lastUsed: "12m ago"
      },
      {
        id: "pat_live_02",
        name: "Cursor IDE Envera SSE Bridge",
        prefix: "env_pat_4f1c...8e42",
        created: "Sep 28, 2026",
        scope: "read_only_search",
        lastUsed: "2h ago"
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem("enver_pat_tokens", JSON.stringify(tokens));
    } catch {}
  }, [tokens]);

  const [newTokenName, setNewTokenName] = useState("");
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [generatedSecret, setGeneratedSecret] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCreateToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTokenName.trim()) return;

    const secret = `env_pat_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
    const newToken = {
      id: `pat_${Date.now()}`,
      name: newTokenName.trim(),
      prefix: `${secret.slice(0, 12)}...${secret.slice(-4)}`,
      created: "Just now",
      scope: "execute_forensic_tools",
      lastUsed: "Never"
    };

    setTokens([newToken, ...tokens]);
    setGeneratedSecret(secret);
    setNewTokenName("");
  };

  const handleDeleteToken = (id: string) => {
    setTokens(tokens.filter((t) => t.id !== id));
  };

  const claudeConfigJson = `{
  "mcpServers": {
    "envera-sovereign": {
      "transport": "sse",
      "url": "http://localhost:3000/api/mcp/sse",
      "headers": {
        "Authorization": "Bearer env_pat_9b2a...7c19"
      }
    }
  }
}`;

  const cursorCommand = `npx -y @modelcontextprotocol/inspector --sse http://localhost:3000/api/mcp/sse`;

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 flex flex-col ${
        isTranquil
          ? "bg-[#F7FBFC] text-[#0A2533]"
          : "bg-[#040D14] text-[#F0F8FA]"
      }`}
    >
      {/* Top Gatekept Command Bar */}
      <header
        className={`h-14 border-b px-4 sm:px-8 flex items-center justify-between transition-colors ${
          isTranquil
            ? "bg-white/90 border-[#BAE6FD] shadow-[0_2px_12px_rgba(2,132,199,0.04)]"
            : "bg-[#091F2D]/90 border-[#38BDF8]/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/playground"
            className={`inline-flex items-center gap-1.5 text-xs font-mono transition-colors no-underline ${
              isTranquil ? "text-[#52798F] hover:text-[#0A2533]" : "text-[#7DD3FC]/70 hover:text-white"
            }`}
          >
            <ArrowLeft size={14} /> Playground
          </Link>
          <div className={`h-4 w-[1px] ${isTranquil ? "bg-[#CBE4EE]" : "bg-white/15"}`} />

          <div className="w-24 h-7 relative flex items-center overflow-hidden">
            <TechText
              text="ENVERA"
              fontSize={20}
              fontWeight={800}
              letterSpacing={-0.02}
              color={isTranquil ? "#0284C7" : "#E0F2FE"}
              accentColor="#38BDF8"
              dashLength={3}
              dashGap={2}
              reach={60}
              specks={6}
            />
          </div>

          <span
            className={`hidden sm:inline-flex items-center text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${
              isTranquil
                ? "bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]"
                : "bg-[#0B354C] text-[#38BDF8] border-[#38BDF8]/30"
            }`}
          >
            Settings & PATs
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setThemeMode(isTranquil ? "nocturne" : "tranquil")}
            className={`p-1.5 rounded-full border transition-all cursor-pointer ${
              isTranquil
                ? "bg-white border-[#CBE4EE] text-[#0284C7] hover:bg-[#E0F2FE]"
                : "bg-white/10 border-white/15 text-[#38BDF8] hover:bg-white/20"
            }`}
            title="Toggle theme"
          >
            {isTranquil ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          <Link
            href="/dashboard"
            className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
              isTranquil
                ? "bg-white border-[#CBE4EE] text-[#4A7285] hover:text-[#0A2533]"
                : "bg-white/5 border-white/15 text-slate-300 hover:text-white"
            }`}
          >
            <span>Dashboard & Usage</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#0284C7]">
              Developer Access & Identity
            </span>
            <span className="text-xs opacity-40">|</span>
            <span className="text-[10px] font-mono opacity-60">
              Personal Access Tokens (PATs)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
            API Keys & External MCP Integrations
          </h1>
          <p className="text-xs sm:text-sm opacity-70 mt-1 max-w-2xl">
            Configure Personal Access Tokens (PATs) to connect Claude Desktop, Cursor IDE, or internal CLI agents directly to Envera's live SSE MCP tools.
          </p>
        </div>

        {/* 1. Personal Access Tokens Table */}
        <div
          className={`rounded-3xl border overflow-hidden transition-all ${
            isTranquil
              ? "bg-white border-[#BAE6FD] shadow-[0_6px_25px_rgba(2,132,199,0.05)]"
              : "bg-[#091F2D] border-[#38BDF8]/20 shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
          }`}
        >
          <div className="p-5 border-b border-inherit flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key size={18} className="text-[#0284C7]" />
              <h2 className="font-heading font-bold text-base sm:text-lg">
                Active Personal Access Tokens
              </h2>
            </div>
            <button
              onClick={() => {
                setShowGenerateModal(true);
                setGeneratedSecret(null);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
            >
              <Plus size={14} /> Generate New PAT
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead
                className={`border-b text-[11px] uppercase tracking-wider ${
                  isTranquil ? "bg-[#F0F8FA] text-[#52798F]" : "bg-[#071926] text-slate-400"
                }`}
              >
                <tr>
                  <th className="py-3 px-5">Token Label</th>
                  <th className="py-3 px-4">Key Identifier</th>
                  <th className="py-3 px-4">Scopes Granted</th>
                  <th className="py-3 px-4">Last Utilized</th>
                  <th className="py-3 px-5 text-right">Revoke</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-inherit">
                {tokens.map((tok) => (
                  <tr key={tok.id} className="hover:bg-sky-50/40 dark:hover:bg-white/5 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-[#0284C7]">{tok.name}</div>
                      <div className="text-[10px] opacity-60">Created: {tok.created}</div>
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] opacity-90">
                      <code>{tok.prefix}</code>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/10 text-[#0284C7] border border-blue-500/20 text-[10px]">
                        {tok.scope}
                      </span>
                    </td>
                    <td className="py-4 px-4 opacity-70">
                      {tok.lastUsed}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => handleDeleteToken(tok.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Revoke Token"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Generate Modal / Drawer */}
        {showGenerateModal && (
          <div
            className={`p-6 rounded-3xl border transition-all ${
              isTranquil
                ? "bg-white border-[#BAE6FD] shadow-xl"
                : "bg-[#091F2D] border-[#38BDF8]/30 shadow-2xl"
            }`}
          >
            <h3 className="font-heading font-bold text-base mb-2">Generate Personal Access Token (PAT)</h3>
            <p className="text-xs opacity-70 mb-4">
              Tokens inherit your Entra ID tenant restrictions (<code className="font-mono">tid: a93b04c1</code>). Tokens allow external tools to execute Envera MCP resources over SSE.
            </p>

            {generatedSecret ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                    ✓ New Token Generated Successfully
                  </div>
                  <p className="text-xs opacity-80 mb-2">
                    Copy this token immediately. For security invariants, it will not be displayed again.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedSecret}
                      className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-white dark:bg-[#071926] border border-emerald-500/30 outline-none"
                    />
                    <button
                      onClick={() => handleCopy(generatedSecret, "new_secret")}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap"
                    >
                      {copiedKey === "new_secret" ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedKey === "new_secret" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 rounded-full border border-inherit text-xs font-mono cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateToken} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono mb-1 opacity-80">Token Name / Client Description</label>
                  <input
                    type="text"
                    value={newTokenName}
                    onChange={(e) => setNewTokenName(e.target.value)}
                    placeholder="e.g. Claude Desktop (Dev Laptop)"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-inherit bg-transparent text-xs font-mono outline-none focus:border-[#0284C7]"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-mono text-xs font-bold cursor-pointer"
                  >
                    Generate Token
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGenerateModal(false)}
                    className="px-4 py-2 rounded-full border border-inherit font-mono text-xs cursor-pointer opacity-70 hover:opacity-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 2. Ready-to-paste Claude Desktop and Cursor Configs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Claude Desktop Config */}
          <div
            className={`p-6 rounded-3xl border transition-all ${
              isTranquil
                ? "bg-white border-[#BAE6FD] shadow-[0_4px_20px_rgba(2,132,199,0.04)]"
                : "bg-[#091F2D] border-[#38BDF8]/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Code2 size={16} className="text-[#0284C7]" />
                <h3 className="font-heading font-bold text-sm">Claude Desktop Integration</h3>
              </div>
              <button
                onClick={() => handleCopy(claudeConfigJson, "claude_json")}
                className="text-xs font-mono flex items-center gap-1 opacity-70 hover:opacity-100 cursor-pointer text-[#0284C7]"
              >
                {copiedKey === "claude_json" ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedKey === "claude_json" ? "Copied" : "Copy JSON"}</span>
              </button>
            </div>
            <p className="text-[11px] opacity-70 mb-3">
              Add this snippet into your <code className="font-mono">claude_desktop_config.json</code> to load Neuv's sovereign underwriting & AST tools.
            </p>
            <pre
              className={`p-3.5 rounded-2xl text-[11px] font-mono overflow-x-auto ${
                isTranquil ? "bg-[#F0F8FA] text-[#16384C]" : "bg-[#071926] text-slate-300"
              }`}
            >
              {claudeConfigJson}
            </pre>
          </div>

          {/* Cursor IDE Integration */}
          <div
            className={`p-6 rounded-3xl border transition-all ${
              isTranquil
                ? "bg-white border-[#BAE6FD] shadow-[0_4px_20px_rgba(2,132,199,0.04)]"
                : "bg-[#091F2D] border-[#38BDF8]/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-[#0284C7]" />
                <h3 className="font-heading font-bold text-sm">Cursor IDE & CLI Bridge</h3>
              </div>
              <button
                onClick={() => handleCopy(cursorCommand, "cursor_cmd")}
                className="text-xs font-mono flex items-center gap-1 opacity-70 hover:opacity-100 cursor-pointer text-[#0284C7]"
              >
                {copiedKey === "cursor_cmd" ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedKey === "cursor_cmd" ? "Copied" : "Copy Command"}</span>
              </button>
            </div>
            <p className="text-[11px] opacity-70 mb-3">
              Connect Cursor via Settings → Features → MCP Servers, or run the official MCP inspector against Envera SSE:
            </p>
            <pre
              className={`p-3.5 rounded-2xl text-[11px] font-mono overflow-x-auto ${
                isTranquil ? "bg-[#F0F8FA] text-[#16384C]" : "bg-[#071926] text-slate-300"
              }`}
            >
              {cursorCommand}
            </pre>
          </div>
        </div>

        {/* 3. Entra ID Claims & Tenant Boundary */}
        <div
          className={`p-6 rounded-3xl border transition-all ${
            isTranquil ? "bg-white border-[#BAE6FD]" : "bg-[#091F2D] border-[#38BDF8]/20"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={18} className="text-[#0284C7]" />
            <h3 className="font-heading font-bold text-sm sm:text-base">
              Microsoft Entra External ID Token Claims
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className={`p-3.5 rounded-2xl border ${isTranquil ? "bg-[#F7FBFC] border-[#CBE4EE]" : "bg-[#071926] border-white/10"}`}>
              <div className="opacity-60 text-[10px] uppercase">Tenant Isolation (tid)</div>
              <div className="font-bold text-[#0284C7] mt-1">tenant-enver-prod-01</div>
              <div className="text-[10px] opacity-60 mt-0.5">Cross-tenant queries rejected</div>
            </div>
            <div className={`p-3.5 rounded-2xl border ${isTranquil ? "bg-[#F7FBFC] border-[#CBE4EE]" : "bg-[#071926] border-white/10"}`}>
              <div className="opacity-60 text-[10px] uppercase">User Identity (oid / sub)</div>
              <div className="font-bold text-[#0284C7] mt-1">amaan@enveraitech.com</div>
              <div className="text-[10px] opacity-60 mt-0.5">Audit log attribution verified</div>
            </div>
            <div className={`p-3.5 rounded-2xl border ${isTranquil ? "bg-[#F7FBFC] border-[#CBE4EE]" : "bg-[#071926] border-white/10"}`}>
              <div className="opacity-60 text-[10px] uppercase">RBAC Roles & Scopes</div>
              <div className="font-bold text-emerald-500 mt-1">Arbiter.Forensics.Admin</div>
              <div className="text-[10px] opacity-60 mt-0.5">Destructive tools permitted</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
