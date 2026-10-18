import { Link } from "wouter";
import { ArrowUpRight, Linkedin, Award, ShieldCheck, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import DodgeField from "@/components/reactbits/DodgeField";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#F7F3E9] text-[#2B121F] border-t border-[#E5DFD1] pt-16 pb-12 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#E5DFD1]">
          {/* Brand Column placed prominently on the left (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                onClick={scrollToTop}
                className="flex items-center gap-2.5 no-underline group cursor-pointer"
              >
                <Logo size="md" theme="light" />
              </Link>
              <div className="hidden sm:block w-px h-6 bg-[#E5DFD1]" />
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white border border-[#E5DFD1] shadow-2xs">
                <img
                  src="/enver-crest-transparent.png"
                  alt="AST Seal"
                  className="w-4 h-4 object-contain filter drop-shadow-[0_1px_3px_rgba(43,18,31,0.12)]"
                />
                <span className="text-[11px] font-mono font-bold text-[#2B121F]">AST Verified</span>
              </div>
            </div>

            <p className="text-[#7A6F68] text-xs sm:text-sm leading-relaxed font-sans max-w-md">
              Sovereign enterprise AI engineering, autonomous decisioning pipelines, and explainable credit underwriting. Scaling gracefully with leading institutional incubators and cloud accelerators.
            </p>

            {/* System Status Pill Row with Interactive Evasive Running Logo */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="relative h-11 w-[165px] flex items-center shrink-0">
                <DodgeField
                  inkColor="#2B121F"
                  contrastColor="#FF6F1E"
                  fieldHeight={42}
                  reach={42}
                  radius={75}
                  falloff={2}
                  fleeDuration={110}
                  returnDuration={480}
                  returnBounce={0.2}
                  axis="both"
                  wall="clamp"
                  patience={5}
                  taunts={["Catch Logo", "Autonomous", "0.00% Drift", "Sovereign Core"]}
                  onCatch={() => console.log('Enver crest caught in footer!')}
                >
                  {({ dodges, gave, caught }) => (
                    <div
                      title={gave ? "Sovereign Core Locked!" : dodges ? `Dodged ${dodges} times` : "Catch the Sovereign Crest"}
                      className={`px-3 py-1.5 rounded-full bg-white border shadow-2xs cursor-pointer select-none transition-all flex items-center gap-2 ${
                        gave
                          ? "border-emerald-500 bg-emerald-50/70"
                          : dodges
                          ? "border-[#FF6F1E] shadow-xs"
                          : "border-[#E5DFD1] hover:border-[#FF6F1E]"
                      }`}
                    >
                      <img
                        src="/enver-crest-transparent.png"
                        alt="Enver Autonomous Crest"
                        className={`w-5 h-5 object-contain filter drop-shadow-[0_2px_4px_rgba(43,18,31,0.18)] transition-transform duration-200 ${
                          caught ? "scale-125 rotate-12" : dodges ? "scale-110" : "group-hover:scale-110"
                        }`}
                      />
                      <span className="text-[11px] font-mono font-semibold whitespace-nowrap">
                        {gave ? (
                          <span className="text-emerald-700">Caught!</span>
                        ) : dodges ? (
                          <span className="text-[#FF6F1E]">Dodged #{dodges}</span>
                        ) : (
                          <span className="text-[#2B121F]">Enver Crest</span>
                        )}
                      </span>
                    </div>
                  )}
                </DodgeField>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E5DFD1] text-[11px] font-mono text-[#2B121F] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>System status · All Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Navigation Column (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#2B121F] font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              {[
                { href: "/", label: "Overview" },
                { href: "/playground", label: "Agent Console" },
                { href: "/services", label: "Capabilities" },
                { href: "/research", label: "Research & Theorems" },
                { href: "/agent-gateway", label: "Enterprise Gateway" },
                { href: "/accreditations", label: "Credibility" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={scrollToTop}
                    className="text-[#7A6F68] hover:text-[#2B121F] font-medium transition-colors no-underline block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Production Systems Column (3 cols) — Fully routed to live dossiers and case studies */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#2B121F] font-bold">
              Production Systems
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              {[
                { label: "Artificer (Credit XAI · MVP)", href: "/services/artificer" },
                { label: "Arbiter Cloud Sentinel", href: "/services/arbiter" },
                { label: "Cerberus DevSecOps Auditor", href: "/services/cerberus" },
                { label: "Sarvam Indic Intelligence", href: "/services?case=bespoke-sovereign" },
                { label: "Enterprise Vector RAG", href: "/services?case=bespoke-sovereign" }
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={scrollToTop}
                    className="py-0.5 text-[#7A6F68] hover:text-[#2B121F] hover:translate-x-0.5 transition-all font-medium flex items-center justify-between group no-underline"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 text-[#FF6F1E] transition-opacity shrink-0" />
                  </Link>
                </li>
              ))}
              <li className="pt-1 border-t border-[#E5DFD1]/60">
                <Link
                  href="/services"
                  onClick={scrollToTop}
                  className="py-0.5 text-[#FF6F1E] hover:text-[#2B121F] transition-colors font-semibold flex items-center gap-1 group no-underline"
                >
                  <span>View All Capabilities &amp; Case Studies</span>
                  <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Verify Column (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#2B121F] font-bold">
              Connect &amp; Verify
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <a
                  href="mailto:hanabi@enveraitech.com"
                  className="text-[#7A6F68] hover:text-[#2B121F] font-medium transition-colors no-underline flex items-center gap-1.5"
                >
                  <Mail size={13} className="text-[#FF6F1E]" />
                  <span>hanabi@enveraitech.com</span>
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/tendo296"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7A6F68] hover:text-[#2B121F] font-medium transition-colors no-underline flex items-center gap-1.5"
                >
                  <Linkedin size={13} className="text-[#0A66C2]" />
                  <span>LinkedIn Profile (@tendo296)</span>
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.credly.com/users/hanabi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7A6F68] hover:text-[#2B121F] font-medium transition-colors no-underline flex items-center gap-1.5"
                >
                  <Award size={13} className="text-[#FF6F1E]" />
                  <span>Credly Badges (@hanabi)</span>
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
              </li>
              <li>
                <Link
                  href="/accreditations"
                  onClick={scrollToTop}
                  className="text-[#7A6F68] hover:text-[#2B121F] font-medium transition-colors no-underline flex items-center gap-1.5 pt-1 group"
                >
                  <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-mono text-[#2B121F] font-semibold">DPIIT Recognized Startup</span>
                  <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 text-[#FF6F1E] transition-opacity shrink-0" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#7A6F68]">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span>© {new Date().getFullYear()} Enver AI Tech Private Limited. All rights reserved.</span>
            <span className="hidden sm:inline text-[#E5DFD1]">|</span>
            <Link href="/tos" className="text-[#2B121F] hover:text-[#FF6F1E] font-medium transition-colors no-underline">
              Terms of Service
            </Link>
            <span className="text-[#E5DFD1]">·</span>
            <Link href="/ps" className="text-[#2B121F] hover:text-[#FF6F1E] font-medium transition-colors no-underline">
              Privacy Statement
            </Link>
            <span className="text-[#E5DFD1]">·</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-[#2B121F] hover:text-[#FF6F1E] font-medium transition-colors no-underline">
              Sitemap
            </a>
            <span className="text-[#E5DFD1]">·</span>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="text-[#FF6F1E] hover:text-[#2B121F] font-semibold transition-colors no-underline">
              llms.txt
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[#2B121F] font-medium text-[11px]">
            <span>DPIIT Recognized</span>
            <span>•</span>
            <span>BITSoM Vertex AI Incubator</span>
            <span>•</span>
            <span>AWS • GCP • Azure Startups</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
