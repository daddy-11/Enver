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
      <div className="architectural-frame px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#E5DFD1]">
          {/* Brand Column (2 cols wide) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <Link
                href="/"
                onClick={scrollToTop}
                className="flex items-center gap-3 no-underline group cursor-pointer"
              >
                <Logo size="lg" theme="light" />
              </Link>
              <div className="w-px h-6 bg-[#E5DFD1]" />
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white border border-[#E5DFD1] shadow-2xs">
                <img
                  src="/enver-enterprise-crest.png"
                  alt="AST Seal"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-[11px] font-mono font-bold text-[#2B121F]">AST Verified</span>
              </div>
            </div>

            <p className="text-[#7A6F68] text-xs sm:text-sm leading-relaxed font-sans max-w-sm">
              Sovereign enterprise AI engineering, autonomous decisioning pipelines, and explainable credit underwriting. Scaling gracefully with leading institutional incubators and cloud accelerators.
            </p>

            {/* System Status Pill Row with Interactive Evasive AST Guard */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <div className="relative h-9 w-[138px] flex items-center shrink-0">
                <DodgeField
                  inkColor="#2B121F"
                  contrastColor="#FF6F1E"
                  fieldHeight={36}
                  reach={32}
                  radius={58}
                  falloff={2}
                  fleeDuration={110}
                  returnDuration={480}
                  returnBounce={0.15}
                  axis="both"
                  wall="clamp"
                  patience={4}
                  taunts={["Catch AST", "0.00% Drift", "AST Intercept", "Deterministic"]}
                  onCatch={() => console.log('AST Guard caught in footer!')}
                >
                  {({ dodges, gave }) => (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E5DFD1] text-[11px] font-mono text-[#2B121F] shadow-2xs cursor-pointer select-none group hover:border-[#FF6F1E]/60 transition-colors whitespace-nowrap">
                      <img
                        src="/enver-enterprise-crest.png"
                        alt="AST Guard"
                        className="w-3.5 h-3.5 object-contain filter drop-shadow-[0_2px_4px_rgba(255,111,30,0.3)] group-hover:scale-110 transition-transform"
                      />
                      <span className="font-semibold text-[#FF6F1E]">
                        {gave ? "Locked · AST" : dodges ? `Dodged #${dodges}` : "AST Grounded"}
                      </span>
                    </div>
                  )}
                </DodgeField>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5DFD1] text-[11px] font-mono text-[#2B121F] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>System status · All Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#2B121F] font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              {[
                { href: "/", label: "Overview" },
                { href: "/#artificer", label: "Artificer MVP" },
                { href: "/services", label: "Capabilities" },
                { href: "/accreditations", label: "Accreditations" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#7A6F68] hover:text-[#2B121F] font-medium transition-colors no-underline block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Systems Column */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#2B121F] font-bold">
              Production Systems
            </h4>
            <ul className="space-y-2 font-mono text-xs text-[#7A6F68]">
              {[
                "Artificer (Credit XAI · MVP)",
                "Sarvam Indic Intelligence",
                "Arbiter Cloud Sentinel",
                "Cerberus DevSecOps Auditor",
                "Enterprise Vector RAG"
              ].map((item) => (
                <li key={item} className="py-0.5 hover:text-[#2B121F] transition-colors font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#2B121F] font-bold">
              Connect & Verify
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
                <div className="text-[11px] font-mono text-[#2B121F] font-semibold flex items-center gap-1.5 pt-1">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>DPIIT Recognized Startup</span>
                </div>
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
