/* ============================================
   THANK YOU / LEAD CONVERSION PAGE — Neo-Brutalist Enterprise
   - Confirmed Lead Receipt
   - Reference ID & 24h SLA Guarantee
   - Instant Discovery Call Option
   - Google Ads Conversion Target Landing
   ============================================ */

import { Link } from "wouter";
import { CheckCircle2, Calendar, ArrowRight, ShieldCheck, Clock, Mail, MessageSquare, Terminal } from "lucide-react";
import { useEffect } from "react";

export default function ThankYou() {
  // Generate a reproducible session confirmation ID
  const refCode = `ENV-INQ-${Math.floor(100000 + Math.random() * 900000)}`;

  useEffect(() => {
    // Scroll to top upon landing
    window.scrollTo(0, 0);
  }, []);

  const handleBookCall = () => {
    const subject = encodeURIComponent(`Priority Discovery Call [${refCode}] — Enver AI Tech`);
    const body = encodeURIComponent(
      `Hi Amaan & Enver Engineering Team,\n\nI just submitted an inquiry via the website (Ref: ${refCode}) and would like to schedule a direct discovery call.\n\nPlease share your earliest open slots.\n\nBest regards`
    );
    window.location.href = `mailto:hanabi@enveraitech.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#2B121F] pt-20">
      {/* === HERO / STATUS BANNER === */}
      <section className="py-20 bg-[#F7F3E9] border-b border-[#E5DFD1] relative overflow-hidden">
        <div className="container">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              INQUIRY RECEIVED &amp; QUEUED
            </span>
            <span className="font-mono text-xs text-[#7A6F68] bg-white px-3 py-1.5 border border-[#E5DFD1] rounded-full shadow-2xs">
              Ref: <span className="font-bold text-[#2B121F]">{refCode}</span>
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-[#2B121F] mb-6 tracking-tight">
            We Have Received Your Architecture Brief.
          </h1>

          <p className="text-lg md:text-xl font-sans text-[#7A6F68] max-w-3xl leading-relaxed">
            Our engineering team is reviewing your project requirements, constraints, and latency targets. We maintain a strict <strong className="text-[#2B121F] font-bold">&lt; 24-hour turnaround</strong> for all technical evaluations.
          </p>
        </div>
      </section>

      {/* === NEXT STEPS & ACTION CARDS === */}
      <section className="py-16 bg-[#F7F3E9]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="p-8 bg-white border border-[#E5DFD1] rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] flex items-center justify-center mb-6 text-[#2B121F] font-bold font-mono text-lg">
                  01
                </div>
                <h3 className="text-xl font-heading font-bold text-[#2B121F] mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#FF6F1E]" />
                  Engineering Review
                </h3>
                <p className="font-sans text-sm text-[#7A6F68] leading-relaxed">
                  Your submission is assigned directly to our Lead AI Engineers to evaluate model selection, guardrails, and cloud deployment topology.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E5DFD1] text-xs font-mono text-[#7A6F68]">
                Target SLA: <span className="text-[#2B121F] font-semibold">Under 24 Hours</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 bg-white border border-[#E5DFD1] rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F7F3E9] border border-[#E5DFD1] flex items-center justify-center mb-6 text-[#2B121F] font-bold font-mono text-lg">
                  02
                </div>
                <h3 className="text-xl font-heading font-bold text-[#2B121F] mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  Direct Consultation
                </h3>
                <p className="font-sans text-sm text-[#7A6F68] leading-relaxed">
                  You will receive an actionable response detailing preliminary architectural recommendations, estimated sprint velocity, and milestone scopes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E5DFD1] text-xs font-mono text-[#7A6F68]">
                Sent to your provided email address
              </div>
            </div>

            {/* Step 3: Expedited Option */}
            <div className="p-8 bg-[#2B121F] text-white border border-[#4A2237] rounded-2xl shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 font-bold font-mono text-xl text-[#FF6F1E]">
                  03
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#FF6F1E]" />
                  Fast-Track Discovery Call
                </h3>
                <p className="font-sans text-sm text-white/80 leading-relaxed mb-6">
                  Need immediate technical triage or an institutional RFP response? Schedule a 25-minute architecture discovery session directly with the founder.
                </p>
              </div>

              <button
                onClick={handleBookCall}
                className="w-full bg-[#FF6F1E] hover:bg-[#E85B0B] text-white font-mono font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book Priority Call
              </button>
            </div>

          </div>

          {/* === FOOTER RETURN LINKS === */}
          <div className="mt-14 p-6 bg-white border border-[#E5DFD1] rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#F7F3E9] border border-[#E5DFD1] rounded-xl">
                <Terminal className="w-6 h-6 text-[#2B121F]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-[#2B121F] text-base">
                  Enver AI Tech Research &amp; Operations
                </h4>
                <p className="font-mono text-xs text-[#7A6F68]">
                  BITSoM Vertex AI Incubator &bull; AWS, GCP, Azure &amp; Sarvam TechStartup &bull; DPIIT Recognized
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/services"
                className="font-mono text-xs font-bold text-[#2B121F] hover:text-[#FF6F1E] transition-colors flex items-center gap-1.5 no-underline"
              >
                Explore Systems <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="almetra-btn-primary !min-h-[40px] !px-5 text-xs font-mono no-underline"
              >
                Return to Home
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
