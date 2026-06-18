"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

interface StackLayer {
  label: string;
  color: string;
  items: { name: string; role: string; version?: string }[];
}

const STACK: StackLayer[] = [
  {
    label: "Frontend",
    color: "#E8660A",
    items: [
      { name: "Next.js 14", role: "App Router + RSC", version: "14.x" },
      { name: "TypeScript", role: "Strict mode", version: "5.5" },
      { name: "Tailwind CSS", role: "Design system", version: "3.4" },
      { name: "Framer Motion", role: "Animations", version: "11.x" },
    ],
  },
  {
    label: "Auth Layer",
    color: "#1B2B4B",
    items: [
      { name: "Better Auth", role: "Session management", version: "1.x" },
      { name: "Drizzle ORM", role: "Schema + migrations", version: "0.33" },
      { name: "Middleware", role: "Route protection" },
    ],
  },
  {
    label: "Data Layer",
    color: "#3A9A3C",
    items: [
      { name: "Supabase", role: "Postgres + Storage + Realtime" },
      { name: "pgvector", role: "1536-dim HNSW index" },
      { name: "PostGIS", role: "Spatial types + distance ops" },
      { name: "Redis", role: "Rate limiting / Caching" },
    ],
  },
  {
    label: "Infrastructure",
    color: "#6b7280",
    items: [
      { name: "Vercel", role: "Edge deployment" },
      { name: "Supabase Edge", role: "Functions + RLS" },
      { name: "Upstash", role: "Serverless Redis" },
    ],
  },
];

function StackLayerRow({ layer, idx }: { layer: StackLayer; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-4 md:gap-8 py-8 border-b border-[var(--border)] transition-all duration-700 ease-out`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-2rem)",
        transitionDelay: `${idx * 100}ms`
      }}
    >
      {/* Layer label */}
      <div className="pt-1">
        <div className="flex items-center gap-2">
          <div
            className="w-[2px] h-4 rounded-[1px]"
            style={{ background: layer.color }}
          />
          <span
            className="font-mono text-[10px] tracking-[0.14em] uppercase font-bold"
            style={{ color: layer.color }}
          >
            {layer.label}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-wrap gap-3">
        {layer.items.map((item) => (
          <div
            key={item.name}
            className="flex flex-col gap-1 px-4 py-3 bg-white border border-[var(--border)] rounded-xl min-w-[160px] relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Accent top border */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-80"
              style={{ background: layer.color }}
            />
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono text-[12px] font-extrabold text-[var(--navy)]">
                {item.name}
              </span>
              {item.version && (
                <span className="font-mono text-[10px] text-[var(--muted)] font-bold">
                  v{item.version}
                </span>
              )}
            </div>
            <span className="font-mono text-[10px] text-[var(--muted)] tracking-[0.04em] font-medium">
              {item.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StackSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="stack" className="py-32 bg-[var(--surface-2)] relative overflow-hidden border-t border-[var(--border)]">
      <div className="container max-w-6xl mx-auto px-4">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div>
            <p className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--navy)] mb-4 flex items-center gap-2">
              <span className="w-5 h-1.5 bg-[var(--orange)] inline-block rounded-sm" />
              System Architecture
            </p>
            <h2 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-[var(--navy)]">
              Full stack.
              <br />
              No abstraction.
            </h2>
          </div>
          <div>
            <p className="text-base text-[var(--muted)] font-medium leading-relaxed max-w-md">
              Every layer is a deliberate choice. Supabase handles the data
              plane — Postgres extensions, edge functions, object storage. Better
              Auth owns the session lifecycle. Next.js App Router handles
              rendering boundaries. The stack is auditable end-to-end.
            </p>
          </div>
        </div>

        {/* Stack layers */}
        <div className="mb-16">
          {STACK.map((layer, idx) => (
            <StackLayerRow key={layer.label} layer={layer} idx={idx} />
          ))}
        </div>

        {/* Database schema preview */}
        <div className="mt-16 p-6 md:p-8 bg-white border border-[var(--border)] rounded-2xl shadow-sm overflow-x-auto">
          <div className="font-mono text-[10px] font-extrabold tracking-[0.14em] uppercase text-[var(--navy)] mb-4">
            schema preview · supabase/postgresql
          </div>
          <pre className="m-0 font-mono text-[12px] md:text-[13px] leading-relaxed text-[var(--muted)]">
            <span className="text-gray-400 font-medium">-- Medical Response: Kariman</span>{"\n"}
            <span className="text-[var(--orange)] font-bold">CREATE TABLE</span>
            <span className="text-[var(--navy)]"> dispatch_agents (</span>{"\n"}
            {"  "}
            <span className="text-[var(--green)] font-bold">id</span>
            <span className="text-[var(--navy)]">          uuid PRIMARY KEY DEFAULT gen_random_uuid(),</span>{"\n"}
            {"  "}
            <span className="text-[var(--green)] font-bold">location</span>
            <span className="text-[var(--navy)]">    geography(POINT, 4326) NOT NULL,</span>{"\n"}
            {"  "}
            <span className="text-[var(--green)] font-bold">status</span>
            <span className="text-[var(--navy)]">      varchar(50) NOT NULL,</span>{"\n"}
            {"  "}
            <span className="text-[var(--green)] font-bold">credentials</span>
            <span className="text-[var(--navy)]"> jsonb,</span>{"\n"}
            {"  "}
            <span className="text-[var(--green)] font-bold">user_id</span>
            <span className="text-[var(--navy)]">     uuid REFERENCES users(id) ON DELETE CASCADE</span>{"\n"}
            <span className="text-[var(--navy)]">);</span>{"\n"}
            <span className="text-[var(--orange)] font-bold">CREATE INDEX</span>
            <span className="text-[var(--navy)]"> ON dispatch_agents USING gist(location);</span>{"\n\n"}
            <span className="text-gray-400 font-medium">-- Recruitment Intel: Atrea</span>{"\n"}
            <span className="text-[var(--orange)] font-bold">CREATE TABLE</span>
            <span className="text-[var(--navy)]"> repo_analyses (</span>{"\n"}
            {"  "}
            <span className="text-[var(--green)] font-bold">id</span>
            <span className="text-[var(--navy)]">        uuid PRIMARY KEY DEFAULT gen_random_uuid(),</span>{"\n"}
            {"  "}
            <span className="text-[var(--green)] font-bold">repo_url</span>
            <span className="text-[var(--navy)]">  text NOT NULL,</span>{"\n"}
            {"  "}
            <span className="text-[var(--green)] font-bold">embedding</span>
            <span className="text-[var(--navy)]"> vector(1536),</span>{"\n"}
            {"  "}
            <span className="text-[var(--green)] font-bold">score</span>
            <span className="text-[var(--navy)]">      numeric(4,2)</span>{"\n"}
            <span className="text-[var(--navy)]">);</span>{"\n"}
            <span className="text-[var(--orange)] font-bold">CREATE INDEX</span>
            <span className="text-[var(--navy)]"> ON repo_analyses USING hnsw (embedding vector_cosine_ops);</span>
          </pre>
        </div>
      </div>
    </section>
  );
}
