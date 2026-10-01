import { Award, Sparkles, Rocket, ShieldCheck, ExternalLink, CheckCircle2 } from "lucide-react";

export default function InstitutionalEndorsement({ className = "" }: { className?: string }) {
  return (
    <div
      className={`p-6 sm:p-8 md:p-10 rounded-2xl bg-white border border-[#E5DFD1] shadow-xs relative overflow-hidden ${className}`}
    >
      {/* Subtle Background Accent Glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-gradient-to-br from-[#4A2237]/10 via-[#FF6F1E]/5 to-transparent pointer-events-none blur-3xl" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
        {/* Left Info Column */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6EDF2] border border-[#2B121F]/20 text-[#2B121F] text-xs font-mono font-bold">
              <Rocket size={13} className="text-[#FF6F1E]" /> INSTITUTIONAL INCUBATION
            </span>
            <a
              href="https://fitt-iitd.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold text-[#2B121F] hover:text-[#FF6F1E] bg-[#F7F3E9] px-3 py-1 rounded-full border border-[#E5DFD1] inline-flex items-center gap-1.5 transition-colors no-underline"
            >
              <Sparkles size={13} className="text-[#FF6F1E]" /> FITT IIT Delhi · Jubilant Bhartia
            </a>
            <a
              href="https://www.startupindia.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold text-[#2B121F] hover:text-[#FF6F1E] bg-[#F7F3E9] px-3 py-1 rounded-full border border-[#E5DFD1] inline-flex items-center gap-1.5 transition-colors no-underline"
            >
              <ShieldCheck size={13} className="text-[#4A2237]" /> DPIIT Recognized Startup
            </a>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#2B121F] leading-tight tracking-tight">
            Recognised Ecosystems. <span className="bg-gradient-to-r from-[#2B121F] to-[#FF6F1E] bg-clip-text text-transparent">Shipping to Production.</span>
          </h3>

          <p className="text-sm sm:text-base font-sans text-[#7A6F68] leading-relaxed max-w-2xl">
            Selected for incubation under <strong>FITT IIT Delhi</strong>, <strong>Jubilant Bhartia Foundation</strong>, and <strong>BITSoM Vertex AI</strong>, with official Startup India certification. Our models and infrastructure already run on production Google Cloud and AWS tenancies.
          </p>

          {/* Grid of 4 Accelerator Pillars with Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
            <a
              href="https://fitt-iitd.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] hover:border-[#2B121F] transition-all no-underline block group"
            >
              <div className="text-[10px] font-mono font-bold text-[#FF6F1E] uppercase tracking-wider">INCUBATOR</div>
              <div className="text-xs sm:text-sm font-heading font-bold text-[#2B121F] group-hover:text-[#FF6F1E] transition-colors mt-0.5 flex items-center justify-between">
                <span>FITT IIT Delhi</span>
                <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>

            <a
              href="https://www.jubilantbhartiafoundation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] hover:border-[#2B121F] transition-all no-underline block group"
            >
              <div className="text-[10px] font-mono font-bold text-[#4A2237] uppercase tracking-wider">FOUNDATION</div>
              <div className="text-xs sm:text-sm font-heading font-bold text-[#2B121F] group-hover:text-[#4A2237] transition-colors mt-0.5 flex items-center justify-between">
                <span>Jubilant Bhartia</span>
                <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>

            <div className="p-3.5 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1]">
              <div className="text-[10px] font-mono font-bold text-[#2B121F] uppercase tracking-wider">CLOUD ECOSYSTEM</div>
              <div className="text-xs sm:text-sm font-heading font-bold text-[#2B121F] mt-0.5">Google Cloud · AWS</div>
            </div>

            <a
              href="https://www.startupindia.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] hover:border-[#2B121F] transition-all no-underline block group"
            >
              <div className="text-[10px] font-mono font-bold text-[#FF6F1E] uppercase tracking-wider">STARTUP INDIA</div>
              <div className="text-xs sm:text-sm font-heading font-bold text-[#2B121F] group-hover:text-[#FF6F1E] transition-colors mt-0.5 flex items-center justify-between">
                <span>DPIIT Certified</span>
                <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          </div>
        </div>

        {/* Right Badge Grid: Corporate Credentials with Links */}
        <div className="w-full lg:w-auto flex flex-col items-stretch lg:items-end justify-center gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E5DFD1]">
          <div className="grid grid-cols-2 gap-2.5 w-full lg:w-64 font-sans text-xs">
            <a
              href="https://cloud.google.com/startup"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] hover:border-[#2B121F] text-center transition-all no-underline block group"
            >
              <span className="text-[#2B121F] font-bold block text-sm font-heading group-hover:text-[#FF6F1E] transition-colors">Vertex AI</span>
              <span className="text-[10px] text-[#7A6F68] font-mono">Google for Startups</span>
            </a>

            <a
              href="https://aws.amazon.com/activate/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] hover:border-[#2B121F] text-center transition-all no-underline block group"
            >
              <span className="text-[#2B121F] font-bold block text-sm font-heading group-hover:text-[#FF6F1E] transition-colors">AWS</span>
              <span className="text-[10px] text-[#7A6F68] font-mono">Activate TechStartup</span>
            </a>

            <a
              href="https://foundershub.startups.microsoft.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] hover:border-[#2B121F] text-center transition-all no-underline block group"
            >
              <span className="text-[#2B121F] font-bold block text-sm font-heading group-hover:text-[#FF6F1E] transition-colors">Azure</span>
              <span className="text-[10px] text-[#7A6F68] font-mono">Founders Hub</span>
            </a>

            <a
              href="https://www.hub71.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] hover:border-[#2B121F] text-center transition-all no-underline block group"
            >
              <span className="text-[#2B121F] font-bold block text-sm font-heading group-hover:text-[#FF6F1E] transition-colors">Hub71</span>
              <span className="text-[10px] text-[#7A6F68] font-mono">Validation Workshop</span>
            </a>
          </div>

          <div className="text-[11px] font-mono text-[#7A6F68] text-center lg:text-right font-medium">
            Enver AI Tech Pvt Ltd · Recognized Deep-Tech Enterprise
          </div>
        </div>
      </div>
    </div>
  );
}
