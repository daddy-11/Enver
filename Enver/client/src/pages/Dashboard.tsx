import React, { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Activity,
  Download,
  ShieldCheck,
  Zap,
  Terminal,
  FileText,
  Key,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Moon,
  Sun
} from "lucide-react";
import TechText from "@/components/reactbits/TechText";

export default function Dashboard() {
  const [themeMode, setThemeMode] = useState<"tranquil" | "nocturne">("tranquil");
  const isTranquil = themeMode === "tranquil";

  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (filename: string) => {
    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

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
            Dashboard & Usage
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
            href="/settings"
            className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
              isTranquil
                ? "bg-white border-[#CBE4EE] text-[#4A7285] hover:text-[#0A2533]"
                : "bg-white/5 border-white/15 text-slate-300 hover:text-white"
            }`}
          >
            <Key size={12} />
            <span className="hidden sm:inline">Settings & PATs</span>
          </Link>

          <Link
            href="/playground"
            className="px-3.5 py-1.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-mono font-bold transition-all shadow-xs"
          >
            Enter Playground →
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Title Bar */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#0284C7]">
              Telemetry & Sovereign Audit
            </span>
            <span className="text-xs opacity-40">|</span>
            <span className="text-[10px] font-mono opacity-60">
              Zero-Trust Verification Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
            Usage Quotas & Audit Archive
          </h1>
          <p className="text-xs sm:text-sm opacity-70 mt-1 max-w-2xl">
            Live telemetry of agent executions, AST firewall block rates, and downloadable cryptographic audit trails compliant with RBI Digital Lending Protocol DL-09.
          </p>
        </div>

        {downloadSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} />
            <span>Cryptographic audit archive dispatched: <strong>{downloadSuccess}</strong> (SHA256 verified)</span>
          </div>
        )}

        {/* 1. QUOTA TRACKER CARDS (From diagram: "Quota tracker (e.g. 20/50 runs)") */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Card 1: Deliberation Runs */}
          <div
            className={`p-5 rounded-3xl border transition-all ${
              isTranquil
                ? "bg-white border-[#BAE6FD] shadow-[0_4px_20px_rgba(2,132,199,0.04)]"
                : "bg-[#091F2D] border-[#38BDF8]/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            }`}
          >
            <div className="flex items-center justify-between mb-3 text-xs font-mono opacity-70">
              <span>Daily Deliberations</span>
              <Activity size={14} className="text-[#0284C7]" />
            </div>
            <div className="text-2xl font-mono font-bold text-[#0284C7]">
              24 <span className="text-sm font-normal opacity-60">/ 50 runs</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-[#E0F2FE] dark:bg-white/10 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#0284C7] h-full rounded-full" style={{ width: "48%" }} />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono opacity-60 mt-2">
              <span>48% consumed</span>
              <span className="flex items-center gap-1"><Clock size={10} /> Resets in 5h 22m</span>
            </div>
          </div>

          {/* Card 2: Ingested Tokens */}
          <div
            className={`p-5 rounded-3xl border transition-all ${
              isTranquil
                ? "bg-white border-[#BAE6FD] shadow-[0_4px_20px_rgba(2,132,199,0.04)]"
                : "bg-[#091F2D] border-[#38BDF8]/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            }`}
          >
            <div className="flex items-center justify-between mb-3 text-xs font-mono opacity-70">
              <span>Token Throughput</span>
              <Zap size={14} className="text-emerald-500" />
            </div>
            <div className="text-2xl font-mono font-bold text-emerald-500">
              184.2k <span className="text-sm font-normal opacity-60">/ 500k</span>
            </div>
            <div className="w-full bg-emerald-100 dark:bg-white/10 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: "36.8%" }} />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono opacity-60 mt-2">
              <span>36.8% of daily limit</span>
              <span>Burst safe</span>
            </div>
          </div>

          {/* Card 3: AST Firewall Interceptions */}
          <div
            className={`p-5 rounded-3xl border transition-all ${
              isTranquil
                ? "bg-white border-[#BAE6FD] shadow-[0_4px_20px_rgba(2,132,199,0.04)]"
                : "bg-[#091F2D] border-[#38BDF8]/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            }`}
          >
            <div className="flex items-center justify-between mb-3 text-xs font-mono opacity-70">
              <span>AST Firewall Blocks</span>
              <ShieldCheck size={14} className="text-[#38BDF8]" />
            </div>
            <div className="text-2xl font-mono font-bold text-[#38BDF8]">
              12 <span className="text-sm font-normal opacity-60">intercepted</span>
            </div>
            <div className="w-full bg-[#E0F2FE] dark:bg-white/10 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#38BDF8] h-full rounded-full" style={{ width: "100%" }} />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono opacity-60 mt-2">
              <span>100% blocked pre-dispatch</span>
              <span>0 outages</span>
            </div>
          </div>

          {/* Card 4: Sovereign Latency */}
          <div
            className={`p-5 rounded-3xl border transition-all ${
              isTranquil
                ? "bg-white border-[#BAE6FD] shadow-[0_4px_20px_rgba(2,132,199,0.04)]"
                : "bg-[#091F2D] border-[#38BDF8]/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            }`}
          >
            <div className="flex items-center justify-between mb-3 text-xs font-mono opacity-70">
              <span>VPC Stream Latency</span>
              <Terminal size={14} className="text-purple-500" />
            </div>
            <div className="text-2xl font-mono font-bold text-purple-500">
              92ms <span className="text-sm font-normal opacity-60">median</span>
            </div>
            <div className="w-full bg-purple-100 dark:bg-white/10 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: "24%" }} />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono opacity-60 mt-2">
              <span>Air-gapped SSE stream</span>
              <span>Zero egress</span>
            </div>
          </div>
        </div>

        {/* 2. GENERATED AUDIT REPORTS (From diagram: "Generated Audit Reports") */}
        <div
          className={`rounded-3xl border overflow-hidden transition-all ${
            isTranquil
              ? "bg-white border-[#BAE6FD] shadow-[0_6px_25px_rgba(2,132,199,0.05)]"
              : "bg-[#091F2D] border-[#38BDF8]/20 shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
          }`}
        >
          <div className="p-5 border-b border-inherit flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-[#0284C7]" />
              <h2 className="font-heading font-bold text-base sm:text-lg">
                Generated Forensic Audit Reports
              </h2>
            </div>
            <span className="text-xs font-mono opacity-60">
              4 archives available · Encrypted SHA256
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead
                className={`border-b text-[11px] uppercase tracking-wider ${
                  isTranquil ? "bg-[#F0F8FA] text-[#52798F]" : "bg-[#071926] text-slate-400"
                }`}
              >
                <tr>
                  <th className="py-3 px-5">Report Name & Identifier</th>
                  <th className="py-3 px-4">Standard & Pipeline</th>
                  <th className="py-3 px-4">Cryptographic Hash</th>
                  <th className="py-3 px-4">Generated Timestamp</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-inherit">
                <tr className="hover:bg-sky-50/40 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#0284C7]">Artificer MSME Underwriting Dossier</div>
                    <div className="text-[10px] opacity-60">File: Artificer-MSME-Underwriting-SHA256-8f9b.pdf</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px]">
                      RBI DL-09 Certified
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[10px] opacity-80">
                    SHA256: 8f9b2c41...a104
                  </td>
                  <td className="py-4 px-4 opacity-70">
                    Today · 15:42 IST
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => handleDownload("Artificer-MSME-Underwriting-SHA256-8f9b.pdf")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white text-[11px] font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Download size={11} /> Download PDF
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-sky-50/40 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#0284C7]">Cerberus Zero-Trust Git Secret Scan</div>
                    <div className="text-[10px] opacity-60">File: Cerberus-SARIF-v2.1.0-ZeroTrust.sarif</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-blue-500/10 text-[#0284C7] border border-blue-500/20 text-[10px]">
                      OASIS SARIF v2.1.0
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[10px] opacity-80">
                    SHA256: 3d18e5f2...f903
                  </td>
                  <td className="py-4 px-4 opacity-70">
                    Today · 14:18 IST
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => handleDownload("Cerberus-SARIF-v2.1.0-ZeroTrust.sarif")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white text-[11px] font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Download size={11} /> Download SARIF
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-sky-50/40 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#0284C7]">Arbiter AST Firewall Command Interceptions</div>
                    <div className="text-[10px] opacity-60">File: Arbiter-AST-Firewall-Incident-Log.csv</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-[10px]">
                      OPA Gatekeeper Rules
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[10px] opacity-80">
                    SHA256: c47a19e0...b821
                  </td>
                  <td className="py-4 px-4 opacity-70">
                    Yesterday · 18:05 IST
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => handleDownload("Arbiter-AST-Firewall-Incident-Log.csv")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white text-[11px] font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Download size={11} /> Download CSV
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-sky-50/40 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#0284C7]">Sovereign Air-Gapped VPC Compliance Attestation</div>
                    <div className="text-[10px] opacity-60">File: Sovereign-VPC-AirGapped-Attestation.pdf</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px]">
                      DPDP Act & SOC2 Type II
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[10px] opacity-80">
                    SHA256: 1a8c5f92...b304
                  </td>
                  <td className="py-4 px-4 opacity-70">
                    Sep 28, 2026 · 11:30 IST
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => handleDownload("Sovereign-VPC-AirGapped-Attestation.pdf")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white text-[11px] font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Download size={11} /> Download PDF
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. External Integration CTA */}
        <div
          className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
            isTranquil
              ? "bg-[#E0F2FE]/40 border-[#BAE6FD]"
              : "bg-[#091F2D]/60 border-[#38BDF8]/20"
          }`}
        >
          <div>
            <h3 className="font-heading font-bold text-sm sm:text-base">
              Need programmatic tool execution from Claude Desktop or Cursor?
            </h3>
            <p className="text-xs opacity-70 mt-0.5">
              Issue scoped Personal Access Tokens (PATs) and view pre-configured MCP JSON manifests.
            </p>
          </div>
          <Link
            href="/settings"
            className="px-4 py-2 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-mono text-xs font-bold transition-all whitespace-nowrap"
          >
            Manage PATs & Keys →
          </Link>
        </div>
      </main>
    </div>
  );
}
