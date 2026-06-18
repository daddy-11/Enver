import React from "react";
import Link from "next/link";

export default function KarimanPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-2)] text-[var(--navy)] pt-32 pb-24">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-6 h-1.5 bg-[#E8660A] rounded-sm" />
          <span className="font-mono text-[12px] font-extrabold uppercase tracking-widest text-[#E8660A]">
            Emergency Logistics
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-8">
          Kariman
        </h1>
        
        <p className="text-xl md:text-2xl text-[var(--muted)] font-medium leading-relaxed mb-16">
          Agentic medical response routing. Instantly verify and deploy doctors to emergency zones when seconds matter most.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white border border-[var(--border)] rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-extrabold mb-4">Medical Assistance Routing</h3>
            <p className="text-[var(--muted)] leading-relaxed font-medium">
              Kariman uses AI-driven geospatial logic to locate the nearest available medical professionals and seamlessly route them to emergency hotspots. It optimizes response times by analyzing real-time traffic and personnel availability.
            </p>
          </div>
          <div className="bg-white border border-[var(--border)] rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-extrabold mb-4">Manpower Verification</h3>
            <p className="text-[var(--muted)] leading-relaxed font-medium">
              In crisis scenarios, verifying credentials is as critical as the response itself. The agentic system rapidly processes and verifies medical licenses and specialized capabilities before dispatching personnel.
            </p>
          </div>
        </div>

        <div className="bg-[var(--navy)] text-white rounded-2xl p-12 text-center shadow-lg">
          <h2 className="text-3xl font-extrabold mb-6">Restricted Access</h2>
          <p className="text-white/70 font-medium max-w-lg mx-auto mb-8">
            Kariman is currently deployed for authorized emergency services and relief agencies only.
          </p>
          <Link 
            href="mailto:daddy@enveraitech.com"
            className="inline-flex px-8 py-4 bg-white text-[var(--navy)] font-extrabold rounded-xl hover:bg-opacity-90 transition-opacity"
          >
            Request Implementation →
          </Link>
        </div>
      </div>
    </div>
  );
}
