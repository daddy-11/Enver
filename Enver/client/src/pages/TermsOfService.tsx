import React from "react";
import { Link } from "wouter";
import { ArrowLeft, Shield, FileText, Scale, Lock, CheckCircle2, Mail, ExternalLink } from "lucide-react";
import Logo from "@/components/Logo";

export default function TermsOfService() {
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
          <span className="text-xs font-mono text-[#FF6F1E] font-semibold">Legal &amp; Regulatory</span>
        </div>

        {/* Hero Title */}
        <div className="pb-10 mb-12 border-b border-[#E5DFD1]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5DFD1] text-[11px] font-mono text-[#2B121F] font-bold shadow-2xs mb-4">
            <Scale size={13} className="text-[#FF6F1E]" />
            <span>ENVER AI TECH PRIVATE LIMITED</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-[#2B121F] tracking-tight leading-tight mb-4">
            Terms of Service
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#7A6F68]">
            <span>Last Updated: September 30, 2026</span>
            <span>•</span>
            <span>Effective Date: Immediate</span>
            <span>•</span>
            <span>Document Ref: EAT-TOS-2026.04</span>
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
              Agreement to Terms &amp; Corporate Identity
            </h2>
            <p className="mb-4">
              These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you or the entity you represent (&quot;Client&quot;, &quot;User&quot;, &quot;you&quot;) and <strong>Enver AI Tech Private Limited</strong> (&quot;Enver&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), an artificial intelligence engineering laboratory and deep-tech consultancy incorporated under the laws of the Republic of India.
            </p>
            <p className="mb-4">
              By accessing our website (<a href="https://enveraitech.com" className="text-[#FF6F1E] underline">enveraitech.com</a>), testing the Enver Intelligence Core, subscribing to our services, or deploying our autonomous agent pipelines, you confirm that you have read, understood, and agreed to be bound by these Terms. If you are entering into these Terms on behalf of an enterprise or organization, you represent and warrant that you hold full legal authority to bind that entity.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white p-8 rounded-3xl border border-[#E5DFD1] shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#FF6F1E] font-bold uppercase tracking-wider mb-2">
              <span>Section 02</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#2B121F] mb-4">
              Scope of Engineering &amp; AI Systems
            </h2>
            <p className="mb-4">
              Enver AI Tech provides enterprise-grade autonomous agent architecture, explainable AI (XAI) decisioning systems, multi-cloud governance sentinels, and bespoke machine learning solutions. Our flagship systems include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 font-sans">
              <li><strong>Artificer:</strong> Explainable MSME credit underwriting citadel executing deterministic financial ratio scoring and document extraction.</li>
              <li><strong>Arbiter:</strong> Multi-cloud infrastructure governance and destructive-command firewall integration via ChatOps.</li>
              <li><strong>Cerberus:</strong> Continuous zero-trust cybersecurity, entropy analysis, and anti-bot scraper defense systems.</li>
              <li><strong>Bespoke Sovereign AI:</strong> Tailored, air-gapped multi-agent DAG architectures deployed directly within client VPC enclaves.</li>
            </ul>
            <p>
              Deliverables and operational Service Level Agreements (SLAs) for enterprise deployments are governed by individual Master Services Agreements (MSAs) or Statements of Work (SOWs) executed concurrently with these Terms.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-white p-8 rounded-3xl border border-[#E5DFD1] shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#FF6F1E] font-bold uppercase tracking-wider mb-2">
              <span>Section 03</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#2B121F] mb-4">
              Intellectual Property Rights &amp; Custody
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-heading font-bold text-[#2B121F] text-base mb-1">
                  A. Client Data &amp; Domain Weights
                </h3>
                <p>
                  Clients retain 100% full, exclusive ownership of all proprietary data, operational records, internal financial ledgers, customer records, and fine-tuned model weights produced exclusively for their enterprise tenancy. Enver claims zero intellectual property rights over Client inputs or client-specific fine-tuned outputs.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-[#2B121F] text-base mb-1">
                  B. Zero Training on Client Data Guarantee
                </h3>
                <p>
                  <strong>We maintain a strict zero-data-leakage policy:</strong> Enver never uses, trains, fine-tunes, or evaluates any foundation model, public model, or multi-tenant system on confidential data, prompts, or documents submitted by our Clients without explicit written consent.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-[#2B121F] text-base mb-1">
                  C. Enver Core Technology
                </h3>
                <p>
                  Enver retains all rights, title, and interest in its pre-existing technology, proprietary AST parsers, agent orchestration engines, entropy analysis algorithms, and foundational code libraries.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white p-8 rounded-3xl border border-[#E5DFD1] shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#FF6F1E] font-bold uppercase tracking-wider mb-2">
              <span>Section 04</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#2B121F] mb-4">
              Acceptable Use &amp; Autonomous Safety Rails
            </h2>
            <p className="mb-4">
              You agree not to misuse our systems or attempt to undermine the integrity of our software. You expressly agree not to use Enver systems:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>To develop, train, or deploy weaponized, offensive, or destructive autonomous software.</li>
              <li>To execute automated scraping, denial of service (DoS), or unauthorized penetration probes against Enver infrastructure.</li>
              <li>To conduct unconsented surveillance, non-consensual biometric processing, or discriminatory scoring in violation of applicable laws.</li>
              <li>To reverse-engineer, decompile, or extract the source code of our proprietary AST parsers or deterministic code engines.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="bg-white p-8 rounded-3xl border border-[#E5DFD1] shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#FF6F1E] font-bold uppercase tracking-wider mb-2">
              <span>Section 05</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#2B121F] mb-4">
              Deterministic Guarantees &amp; Limitation of Liability
            </h2>
            <p className="mb-4">
              While our proprietary architectures enforce deterministic code-level scoring (such as financial ratios computed without model hallucination), machine learning components operate under probabilistic principles. Enver systems are designed to augment and empower human decision-makers, not to replace statutory fiduciaries.
            </p>
            <p className="mb-4">
              To the maximum extent permitted by applicable law, Enver AI Tech Private Limited shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from lost profits, service interruptions, or algorithmic variance, except where strictly caused by our gross negligence or willful misconduct.
            </p>
          </section>

          {/* Section 6 */}
          <section className="bg-white p-8 rounded-3xl border border-[#E5DFD1] shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#FF6F1E] font-bold uppercase tracking-wider mb-2">
              <span>Section 06</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#2B121F] mb-4">
              Governing Law &amp; Dispute Resolution
            </h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the substantive laws of the <strong>Republic of India</strong>, without regard to conflict of law principles.
            </p>
            <p className="mb-4">
              Any dispute, controversy, or claim arising out of or relating to these Terms shall be referred to and finally resolved by arbitration administered under the <em>Arbitration and Conciliation Act, 1996</em>. The seat and venue of arbitration shall be <strong>Mumbai, Maharashtra, India</strong>, and proceedings shall be conducted in English.
            </p>
          </section>

          {/* Section 7 - Contact */}
          <section className="bg-[#2B121F] text-white p-8 rounded-3xl shadow-md border border-[#4A2237]">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3">
              Corporate &amp; Legal Notices
            </h2>
            <p className="text-sm font-sans text-white/80 leading-relaxed mb-6">
              For any contractual inquiries, service agreements, or formal legal notices, please reach out directly to our corporate legal team:
            </p>
            <div className="p-4 rounded-xl bg-white/10 border border-white/15 font-mono text-xs space-y-1.5">
              <div><strong>Enver AI Tech Private Limited</strong></div>
              <div>Headquarters: Mumbai, Maharashtra, India</div>
              <div>Legal Inquiries: <a href="mailto:legal@enveraitech.com" className="text-[#FF6F1E] underline">legal@enveraitech.com</a></div>
              <div>Executive Office: <a href="mailto:hanabi@enveraitech.com" className="text-[#FF6F1E] underline">hanabi@enveraitech.com</a></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
