import React from "react";
import { Brain, Code, Network, Terminal, Database, Shield, Sparkles, Check } from "lucide-react";

export function BentoFeatures() {
  return (
    <section className="bg-[#FAF9F8] py-32 px-4 relative z-10 font-sans overflow-hidden">
      {/* Soft mesh background elements for Daydream vibe */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" />
      <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-pink-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-20 left-1/2 w-[600px] h-[600px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Intelligence Reimagined
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-semibold text-slate-800 tracking-tight mb-6 leading-[1.1]">
            Everything you need.
            <br />
            Beautifully organized.
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
            Experience a workspace that feels like magic. High performance seamlessly blended with effortless, flowing design.
          </p>
        </div>

        {/* Daydream Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
          
          {/* Main Card */}
          <div className="md:col-span-2 md:row-span-2 bg-white/60 backdrop-blur-xl rounded-[32px] p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 flex flex-col hover:bg-white/80 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Brain className="w-8 h-8 text-purple-600" strokeWidth={2} />
            </div>
            <h3 className="text-3xl font-semibold text-slate-800 mb-4 tracking-tight">Deep Intelligence</h3>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
              Access Shorekeeper, Tethys, Claude, and Gemini directly from your command center. Seamlessly switch between models based on task parameters.
            </p>
            
            <div className="mt-auto space-y-3">
              {['Real-time model switching', 'Context retention across agents', 'Role-based agent isolation'].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-purple-100/80 rounded-full p-1.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-purple-600" strokeWidth={2.5} />
                  </div>
                  <span className="text-slate-600 font-medium text-[15px]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Card */}
          <div className="md:col-span-1 md:row-span-2 bg-white/60 backdrop-blur-xl rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 flex flex-col hover:bg-white/80 transition-all duration-500">
            <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Code className="w-7 h-7 text-blue-500" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-6 tracking-tight">Tech Stack</h3>
            <div className="flex flex-col gap-3 flex-1">
              {['Next.js 14', 'PostGIS', 'pgvector', 'Better Auth', 'React'].map((tech) => (
                <div key={tech} className="bg-white/80 backdrop-blur-md border border-white/60 px-5 py-3.5 rounded-2xl text-[14px] text-slate-700 font-medium shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow">
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Small Feature 1 */}
          <div className="md:col-span-1 md:row-span-1 bg-white/60 backdrop-blur-xl rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-500">
            <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">
              <Network className="w-6 h-6 text-emerald-500" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 tracking-tight">Lounge</h3>
              <p className="text-[15px] text-slate-500 font-medium mt-1.5">Team comms relay</p>
            </div>
          </div>

          {/* Small Feature 2 */}
          <div className="md:col-span-1 md:row-span-1 bg-slate-900 rounded-[32px] p-8 shadow-xl border border-slate-800 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-white/10 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center shadow-sm relative z-10 border border-white/10">
              <Terminal className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-white tracking-tight">Terminal</h3>
              <p className="text-[15px] text-slate-400 font-medium mt-1.5">Root CLI access</p>
            </div>
          </div>

          {/* Wide Feature 1 */}
          <div className="md:col-span-2 md:row-span-1 bg-white/60 backdrop-blur-xl rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 flex items-center justify-between hover:bg-white/80 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-orange-50/50 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                <Database className="w-7 h-7 text-orange-500" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 tracking-tight mb-2">Vector Storage</h3>
              <p className="text-[15px] text-slate-500 font-medium">Unlimited pgvector embeddings scaling.</p>
            </div>
          </div>

          {/* Wide Feature 2 */}
          <div className="md:col-span-2 md:row-span-1 bg-white/60 backdrop-blur-xl rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 flex items-center gap-6 hover:bg-white/80 transition-all duration-500">
            <div className="bg-rose-50 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
              <Shield className="w-8 h-8 text-rose-500" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 tracking-tight mb-2">Enterprise Sec</h3>
              <p className="text-[15px] text-slate-500 font-medium">SSO & Domain Restricted Access.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
