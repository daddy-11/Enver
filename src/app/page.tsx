import { Navigation } from "@/components/layout/Navigation";
import { MiniGeoCanvas } from "@/components/ui/MiniGeoCanvas";
import Link from "next/link";
import Script from "next/script";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <div className="page active" id="page-home">
          <section className="hero">
            <div className="hero-bg">
              <div className="hero-orb" style={{ width: 500, height: 500, top: -100, right: -100, background: 'var(--navy)' }}></div>
              <div className="hero-orb" style={{ width: 300, height: 300, bottom: 0, left: -50, background: 'var(--orange)' }}></div>
              <div className="hero-orb" style={{ width: 200, height: 200, bottom: 100, right: 200, background: 'var(--green)' }}></div>
            </div>
            <div style={{ position: 'relative', maxWidth: 720, width: '100%' }}>
              <div className="hero-tag"><span className="live-pip"></span> 3 systems live &middot; enver-ai.tech</div>
              <h1>Build with<br /><span className="line2">spatial</span><br /><span className="line3">intelligence.</span></h1>
              <p className="hero-sub">Independent AI lab shipping production-grade tools for real-world use &mdash; geospatial analysis, document intelligence, and applied ML. No demos. No vaporware.</p>
              <div className="hero-btns">
                <Link href="/projects" className="btn-hero-p">View live projects &rarr;</Link>
                <Link href="/contact" className="btn-hero-s">Get early access</Link>
              </div>
              <div className="hero-metrics">
                <div className="hero-metric"><div className="val" style={{ color: 'var(--navy)' }}>3+</div><div className="lbl">Live products</div></div>
                <div className="hero-metric"><div className="val" style={{ color: 'var(--orange)' }}>&lt;50ms</div><div className="lbl">P95 latency</div></div>
                <div className="hero-metric"><div className="val" style={{ color: 'var(--green)' }}>100%</div><div className="lbl">Auth-gated</div></div>
                <div className="hero-metric"><div className="val" style={{ color: 'var(--navy)' }}>RLS</div><div className="lbl">DB isolation</div></div>
              </div>
            </div>
          </section>

          <div className="marquee-wrap">
            <div className="marquee-inner">
              <span className="m-item"><span className="m-dot"></span>Next.js 14 App Router</span>
              <span className="m-item"><span className="m-dot"></span>TypeScript Strict Mode</span>
              <span className="m-item"><span className="m-dot"></span>Supabase PostgreSQL</span>
              <span className="m-item"><span className="m-dot"></span>PostGIS Geography Types</span>
              <span className="m-item"><span className="m-dot"></span>pgvector HNSW Index</span>
              <span className="m-item"><span className="m-dot"></span>Better Auth Sessions</span>
              <span className="m-item"><span className="m-dot"></span>Drizzle ORM &middot; Tailwind CSS</span>
              <span className="m-item"><span className="m-dot"></span>MapLibre GL &middot; Vercel Edge</span>
              <span className="m-item"><span className="m-dot"></span>Row-Level Security</span>
              <span className="m-item"><span className="m-dot"></span>OpenAI Embeddings</span>
              <span className="m-item"><span className="m-dot"></span>Next.js 14 App Router</span>
              <span className="m-item"><span className="m-dot"></span>TypeScript Strict Mode</span>
              <span className="m-item"><span className="m-dot"></span>Supabase PostgreSQL</span>
              <span className="m-item"><span className="m-dot"></span>PostGIS Geography Types</span>
              <span className="m-item"><span className="m-dot"></span>pgvector HNSW Index</span>
              <span className="m-item"><span className="m-dot"></span>Better Auth Sessions</span>
              <span className="m-item"><span className="m-dot"></span>Drizzle ORM &middot; Tailwind CSS</span>
              <span className="m-item"><span className="m-dot"></span>MapLibre GL &middot; Vercel Edge</span>
              <span className="m-item"><span className="m-dot"></span>Row-Level Security</span>
              <span className="m-item"><span className="m-dot"></span>OpenAI Embeddings</span>
            </div>
          </div>

          <div className="section reveal in">
            <div className="s-eyebrow">Featured project</div>
            <Link href="/projects/orange-farm" className="proj-featured">
              <div className="pf-inner">
                <div className="pf-left">
                  <div className="pf-badge"><span className="live-pip"></span> Live</div>
                  <h3>Orange Farm Mapper</h3>
                  <p>PostGIS-powered geospatial platform for agricultural monitoring. Real-time health scores per plot, MVT tile serving, MapLibre GL rendering. Built for field operators.</p>
                  <div className="pf-tags"><span className="tag">PostGIS</span><span className="tag">MapLibre GL</span><span className="tag">Supabase</span><span className="tag">Next.js 14</span><span className="tag">GDAL</span></div>
                  <div className="btn-proj" style={{ color: 'var(--navy)' }}>Open project <i className="ti ti-arrow-right" aria-hidden="true"></i></div>
                </div>
                <div className="pf-right">
                  <div className="geo-vis">
                    <div className="geo-row"><span style={{ minWidth: 60, fontFamily: 'var(--mono)', fontSize: 11 }}>Plot A-12</span><div className="geo-bar-bg"><div className="geo-bar-fill" style={{ width: '82%' }}></div></div><span className="geo-val">82%</span></div>
                    <div className="geo-row"><span style={{ minWidth: 60, fontFamily: 'var(--mono)', fontSize: 11 }}>Plot B-07</span><div className="geo-bar-bg"><div className="geo-bar-fill" style={{ width: '67%' }}></div></div><span className="geo-val">67%</span></div>
                    <div className="geo-row"><span style={{ minWidth: 60, fontFamily: 'var(--mono)', fontSize: 11 }}>Plot C-03</span><div className="geo-bar-bg"><div className="geo-bar-fill" style={{ width: '91%' }}></div></div><span className="geo-val">91%</span></div>
                    <div className="geo-row"><span style={{ minWidth: 60, fontFamily: 'var(--mono)', fontSize: 11 }}>Plot D-19</span><div className="geo-bar-bg"><div className="geo-bar-fill" style={{ width: '44%' }}></div></div><span className="geo-val">44%</span></div>
                    <MiniGeoCanvas />
                    <div className="vis-label">Live PostGIS spatial query &middot; EPSG:4326</div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="proj-grid">
              <Link href="/projects/resume-comparer" className="proj-card" style={{ borderTop: '2px solid var(--orange)' }}>
                <div className="pc-top">
                  <div className="pc-icon" style={{ background: 'rgba(232,102,10,.1)' }}><i className="ti ti-file-text" style={{ color: 'var(--orange)' }} aria-hidden="true"></i></div>
                  <span className="status s-beta">Beta</span>
                </div>
                <div className="pc-title">Resume Comparer</div>
                <div className="pc-desc">pgvector cosine similarity for PDF analysis. 1536-dim HNSW index. Sub-50ms P95 on cold queries.</div>
                <div className="pc-tags"><span className="tag">pgvector</span><span className="tag">OpenAI</span><span className="tag">Supabase</span></div>
                <i className="ti ti-arrow-up-right pc-arrow" aria-hidden="true"></i>
              </Link>
              <div className="proj-card" style={{ borderTop: '2px solid var(--green)' }}>
                <div className="pc-top">
                  <div className="pc-icon" style={{ background: 'rgba(58,154,60,.1)' }}><i className="ti ti-brain" style={{ color: 'var(--green)' }} aria-hidden="true"></i></div>
                  <span className="status s-soon">Coming soon</span>
                </div>
                <div className="pc-title">AI Document QA</div>
                <div className="pc-desc">RAG pipeline for natural language interrogation of any document. Streaming answers with citations.</div>
                <div className="pc-tags"><span className="tag">RAG</span><span className="tag">pgvector</span><span className="tag">Streaming</span></div>
                <i className="ti ti-arrow-up-right pc-arrow" aria-hidden="true"></i>
              </div>
              <div className="proj-card" style={{ borderTop: '2px solid var(--navy)' }}>
                <div className="pc-top">
                  <div className="pc-icon" style={{ background: 'rgba(27,43,75,.1)' }}><i className="ti ti-chart-dots" style={{ color: 'var(--navy)' }} aria-hidden="true"></i></div>
                  <span className="status s-soon">Coming soon</span>
                </div>
                <div className="pc-title">Predictive API</div>
                <div className="pc-desc">REST API for time-series forecasting and anomaly detection. Drop a CSV, get predictions in JSON.</div>
                <div className="pc-tags"><span className="tag">REST API</span><span className="tag">Time-series</span><span className="tag">Python</span></div>
                <i className="ti ti-arrow-up-right pc-arrow" aria-hidden="true"></i>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="section reveal in">
            <div className="s-eyebrow">Social proof</div>
            <h2 className="s-h2">What early users say</h2>
            <div className="testi-grid">
              <div className="testi">
                <div className="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <q>The geospatial mapper cut our field survey time by 40%. Real data, real speed &mdash; nothing else comes close.</q>
                <div className="testi-who">
                  <div className="testi-av" style={{ background: 'rgba(27,43,75,.1)', color: 'var(--navy)' }}>AR</div>
                  <div><div className="testi-name">Ahmed R.</div><div className="testi-co">AgriTech Operations Lead</div></div>
                </div>
              </div>
              <div className="testi">
                <div className="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <q>Resume Comparer saved our team hours of manual screening every week. Similarity scores are remarkably accurate.</q>
                <div className="testi-who">
                  <div className="testi-av" style={{ background: 'rgba(232,102,10,.1)', color: 'var(--orange)' }}>PK</div>
                  <div><div className="testi-name">Priya K.</div><div className="testi-co">Head of Talent, Series B</div></div>
                </div>
              </div>
              <div className="testi">
                <div className="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <q>Clean APIs, solid auth, completely auditable stack. This is what production AI tooling should look like.</q>
                <div className="testi-who">
                  <div className="testi-av" style={{ background: 'rgba(58,154,60,.1)', color: 'var(--green)' }}>MT</div>
                  <div><div className="testi-name">Marcus T.</div><div className="testi-co">CTO, Logistics SaaS</div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="section reveal in" style={{ textAlign: 'center', paddingBottom: '5rem' }}>
            <div className="s-eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>Access</div>
            <h2 className="s-h2" style={{ maxWidth: 400, margin: '0 auto 1rem' }}>Ready to get started?</h2>
            <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: '2rem' }}>All products are auth-gated. Apply for early access &mdash; reviewed within 48 hours.</p>
            <Link href="/contact" className="btn-hero-p">Apply for access &rarr;</Link>
          </div>
        </div>
      </main>
    </>
  );
}
