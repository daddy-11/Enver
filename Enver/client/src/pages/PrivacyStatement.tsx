import React from "react";
import { Link } from "wouter";
import { ArrowLeft, Shield, Lock, EyeOff, Database, CheckCircle2, Mail, Server } from "lucide-react";

export default function PrivacyStatement() {
  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#2B121F] pt-28 sm:pt-36 pb-24 font-sans selection:bg-[#2B121F] selection:text-[#F7F3E9]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
        
        {/* Navigation & Header Breadcrumb */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7A6F68] hover:text-[#2B121F] transition-colors no-underline font-medium"
          >
            <ArrowLeft size={14} /> Back to Overview
          </Link>
          <span className="text-[#E5DFD1]">/</span>
          <span className="text-xs font-mono text-[#FF6F1E] font-semibold">Privacy &amp; Data Governance</span>
        </div>

        {/* Hero Title */}
        <div className="pb-10 mb-12 border-b border-[#E5DFD1]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5DFD1] text-[11px] font-mono text-[#2B121F] font-bold shadow-2xs mb-4">
            <Lock size={13} className="text-emerald-600" />
            <span>ENTERPRISE PRIVACY &amp; DATA PROTECTION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-[#2B121F] tracking-tight leading-tight mb-4">
            Privacy Statement
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#7A6F68]">
            <span>Last Updated: September 30, 2026</span>
            <span>•</span>
            <span>Status: Active &amp; Enforced</span>
            <span>•</span>
            <span>Reference: EAT-PRIV-2026.04</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-12 leading-relaxed text-sm sm:text-base font-sans text-[#4A3E39]">
          
          {/* Section 1 */}
          <section className="bg-white p-8 rounded-3xl border border-[#E5DFD1] shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#FF6F1E] font-bold uppercase tracking-wider mb-2">
              <span>Section 01</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#2B121F] mb-4">
              Commitment to Sovereign Data Privacy
            </h2>
            <p className="mb-4">
              At <strong>Enver AI Tech Private Limited</strong> (&quot;Enver&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;), we operate at the frontier of enterprise artificial intelligence, high-stakes credit underwriting, and autonomous infrastructure. We believe sovereign privacy is a non-negotiable architectural invariant.
            </p>
            <p className="mb-4">
              This Privacy Statement explains how we collect, process, store, and safeguard data submitted through our website (<a href="https://enveraitech.com" className="text-[#FF6F1E] underline">enveraitech.com</a>), our interactive agent consoles, API endpoints, and client engagements.
            </p>
            <div className="p-4 rounded-2xl bg-[#F7F3E9] border border-[#E5DFD1] flex items-start gap-3">
              <EyeOff size={18} className="text-[#FF6F1E] shrink-0 mt-0.5" />
              <div className="text-xs font-mono text-[#2B121F] leading-relaxed">
                <strong>Core Tenet:</strong> Enver never sells, rents, monetizes, or publicly indexes your business briefs, architecture inquiries, or enterprise operational data.
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-8 rounded-3xl border border-[#E5DFD1] shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#FF6F1E] font-bold uppercase tracking-wider mb-2">
              <span>Section 02</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#2B121F] mb-4">
              Categories of Data We Process
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-heading font-bold text-[#2B121F] text-base mb-1">
                  1. Contact &amp; Inquiry Information
                </h3>
                <p>
                  When you submit an architecture brief, schedule an engineering consultation, or request enterprise pricing, we collect your name, corporate email address, organization name, role, and inquiry text.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-[#2B121F] text-base mb-1">
                  2. Authentication Credentials (Azure AD / Google OAuth)
                </h3>
                <p>
                  When accessing authenticated developer environments or testing the agent console, we ingest standard OAuth tokens (name, verified email, and profile avatar). We never store or view raw account passwords.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-[#2B121F] text-base mb-1">
                  3. System Telemetry &amp; Security Logs
                </h3>
                <p>
                  To protect our infrastructure against automated scrapers, bot clusters, and DDoS attacks, our edge interceptors process anonymized IP addresses, TLS handshake characteristics, and HTTP request headers.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white p-8 rounded-3xl border border-[#E5DFD1] shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#FF6F1E] font-bold uppercase tracking-wider mb-2">
              <span>Section 03</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#2B121F] mb-4">
              Zero Training on Client Inputs Guarantee
            </h2>
            <p className="mb-4">
              Enterprise AI demands absolute confidentiality. <strong>We adhere to an immutable Zero Training Guarantee:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Your architecture specifications, business bottlenecks, and submitted documents are <strong>never used to train public or foundation models</strong>.</li>
              <li>Queries processed through our Gemini, NVIDIA NIM, or localized open-weight endpoints operate within ephemeral, isolated execution contexts.</li>
              <li>When fine-tuning domain models for enterprise clients, the resulting weights are cryptographically locked and belong exclusively to the client enterprise.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white p-8 rounded-3xl border border-[#E5DFD1] shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#FF6F1E] font-bold uppercase tracking-wider mb-2">
              <span>Section 04</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#2B121F] mb-4">
              Infrastructure Security &amp; Defense Architecture
            </h2>
            <p className="mb-4">
              We deploy multi-layered defensive controls across our cloud fleets (Microsoft Azure, Google Cloud, and AWS):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] space-y-1.5">
                <div className="font-bold text-[#2B121F] flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" /> In-Transit &amp; At-Rest Encryption
                </div>
                <div className="text-[#7A6F68] font-sans">
                  All traffic is enforced over TLS 1.3 with HSTS. Persistent databases are encrypted with AES-256 via Azure Key Vault and Google Cloud KMS.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] space-y-1.5">
                <div className="font-bold text-[#2B121F] flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" /> Bot &amp; Anti-Scraper Guardrails
                </div>
                <div className="text-[#7A6F68] font-sans">
                  Edge interceptors terminate malicious scanners (e.g. sqlmap, nikto, automated DOM scrapers) and enforce strict 15KB payload ceilings.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] space-y-1.5">
                <div className="font-bold text-[#2B121F] flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" /> AST-Level Command Firewalls
                </div>
                <div className="text-[#7A6F68] font-sans">
                  Autonomous agents execute behind hard-coded AST parsers preventing arbitrary code execution or unintended data leakage.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] space-y-1.5">
                <div className="font-bold text-[#2B121F] flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" /> Zero Memory Drift Guarantee
                </div>
                <div className="text-[#7A6F68] font-sans">
                  Automated hourly garbage sweeps clear ephemeral rate-limit caches, maintaining fixed zero-drift container footprints.
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-white p-8 rounded-3xl border border-[#E5DFD1] shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#FF6F1E] font-bold uppercase tracking-wider mb-2">
              <span>Section 05</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#2B121F] mb-4">
              Data Subject Rights &amp; Regulatory Alignment
            </h2>
            <p className="mb-4">
              We align our data governance practices with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act, India)</strong>, RBI data localization regulations, and the European Union General Data Protection Regulation (GDPR) for international partners.
            </p>
            <p className="mb-4">
              You retain the following statutory rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Right to Access &amp; Portability:</strong> Request a full copy of all personal records maintained within our systems.</li>
              <li><strong>Right to Rectification:</strong> Correct any inaccurate or incomplete company details.</li>
              <li><strong>Right to Complete Erasure:</strong> Request the total cryptographic purge of your data from our active databases and cold storage archives.</li>
              <li><strong>Right to Withdraw Consent:</strong> Revoke authorization for ongoing communications or marketing updates at any time.</li>
            </ul>
          </section>

          {/* Section 6 - Contact */}
          <section className="bg-[#2B121F] text-white p-8 rounded-3xl shadow-md border border-[#4A2237]">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3">
              Data Protection Officer &amp; Privacy Inquiries
            </h2>
            <p className="text-sm font-sans text-white/80 leading-relaxed mb-6">
              To exercise your data protection rights, request data erasure, or report security observations, contact our Data Protection and Compliance Officer:
            </p>
            <div className="p-4 rounded-xl bg-white/10 border border-white/15 font-mono text-xs space-y-1.5">
              <div><strong>Enver AI Tech Private Limited — Privacy &amp; Data Governance Office</strong></div>
              <div>Jurisdiction: Mumbai, Maharashtra, India</div>
              <div>Data Inquiries: <a href="mailto:privacy@enveraitech.com" className="text-[#FF6F1E] underline">privacy@enveraitech.com</a></div>
              <div>Legal &amp; Compliance: <a href="mailto:legal@enveraitech.com" className="text-[#FF6F1E] underline">legal@enveraitech.com</a></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
