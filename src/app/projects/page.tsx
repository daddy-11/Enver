import { Navigation } from "@/components/layout/Navigation";
import { MiniGeoCanvas } from "@/components/ui/MiniGeoCanvas";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main>
        <div className="page active" id="page-projects">
          <div className="section reveal in">
            <div className="s-eyebrow">All projects</div>
            <h2 className="s-h2">Live AI products</h2>
            <p className="s-sub">General-purpose AI tools built for real workflows. Each product is independently deployable, auth-protected, and production-grade from day one.</p>
            
            <Link href="/projects/orange-farm" className="proj-featured" style={{ marginBottom: 16 }}>
              <div className="pf-inner">
                <div className="pf-left">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                    <div className="pf-badge"><span className="live-pip"></span> Live</div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>Geospatial Intelligence</span>
                  </div>
                  <h3>Orange Farm Mapper</h3>
                  <p>Tile-based geospatial platform for agricultural monitoring. Ingests drone waypoints, serves PostGIS vector tiles via pg_tileserv, renders choropleth overlays in MapLibre GL.</p>
                  <div className="pf-tags" style={{ marginBottom: '1.5rem' }}>
                    <span className="tag">PostGIS</span><span className="tag">pg_tileserv</span><span className="tag">MapLibre GL</span><span className="tag">GDAL</span><span className="tag">Supabase</span><span className="tag">Next.js 14</span>
                  </div>
                  <div className="btn-hero-p" style={{ fontSize: 13, padding: '9px 20px', display: 'inline-block' }}>View project &rarr;</div>
                </div>
                <div className="pf-right">
                  <div className="geo-vis">
                    <div className="geo-row"><span style={{ minWidth: 60, fontFamily: 'var(--mono)', fontSize: 11 }}>Plot A-12</span><div className="geo-bar-bg"><div className="geo-bar-fill" style={{ width: '82%' }}></div></div><span className="geo-val">82%</span></div>
                    <div className="geo-row"><span style={{ minWidth: 60, fontFamily: 'var(--mono)', fontSize: 11 }}>Plot B-07</span><div className="geo-bar-bg"><div className="geo-bar-fill" style={{ width: '67%' }}></div></div><span className="geo-val">67%</span></div>
                    <div className="geo-row"><span style={{ minWidth: 60, fontFamily: 'var(--mono)', fontSize: 11 }}>Plot C-03</span><div className="geo-bar-bg"><div className="geo-bar-fill" style={{ width: '91%' }}></div></div><span className="geo-val">91%</span></div>
                    <div className="geo-row"><span style={{ minWidth: 60, fontFamily: 'var(--mono)', fontSize: 11 }}>Plot D-19</span><div className="geo-bar-bg"><div className="geo-bar-fill" style={{ width: '44%' }}></div></div><span className="geo-val">44%</span></div>
                    <MiniGeoCanvas />
                    <div className="vis-label" style={{ marginTop: 8 }}>PostGIS &middot; MVT tiles &middot; EPSG:4326</div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="proj-grid" style={{ marginBottom: '2rem' }}>
              <Link href="/projects/resume-comparer" className="proj-card" style={{ borderTop: '2px solid var(--orange)' }}>
                <div className="pc-top">
                  <div className="pc-icon" style={{ background: 'rgba(232,102,10,.1)' }}><i className="ti ti-file-text" style={{ color: 'var(--orange)' }} aria-hidden="true"></i></div>
                  <span className="status s-beta">Beta</span>
                </div>
                <div className="pc-title">Resume Comparer</div>
                <div className="pc-desc">Upload two PDFs, get cosine similarity score and skill gap delta. pgvector HNSW, OpenAI ada-002, sub-50ms P95.</div>
                <div className="pc-tags"><span className="tag">pgvector</span><span className="tag">HNSW</span><span className="tag">OpenAI</span><span className="tag">Supabase Storage</span></div>
                <i className="ti ti-arrow-up-right pc-arrow" aria-hidden="true"></i>
              </Link>
              <div className="proj-card" style={{ borderTop: '2px solid var(--green)' }}>
                <div className="pc-top">
                  <div className="pc-icon" style={{ background: 'rgba(58,154,60,.1)' }}><i className="ti ti-brain" style={{ color: 'var(--green)' }} aria-hidden="true"></i></div>
                  <span className="status s-soon">Coming soon</span>
                </div>
                <div className="pc-title">AI Document QA</div>
                <div className="pc-desc">Natural language interrogation of any document. RAG pipeline, streaming answers, source citations.</div>
                <div className="pc-tags"><span className="tag">RAG</span><span className="tag">pgvector</span><span className="tag">Streaming</span><span className="tag">LangChain</span></div>
                <i className="ti ti-arrow-up-right pc-arrow" aria-hidden="true"></i>
              </div>
              <div className="proj-card" style={{ borderTop: '2px solid var(--navy)' }}>
                <div className="pc-top">
                  <div className="pc-icon" style={{ background: 'rgba(27,43,75,.1)' }}><i className="ti ti-chart-dots" style={{ color: 'var(--navy)' }} aria-hidden="true"></i></div>
                  <span className="status s-soon">Coming soon</span>
                </div>
                <div className="pc-title">Predictive Analytics API</div>
                <div className="pc-desc">REST API for time-series forecasting and anomaly detection. CSV in, JSON predictions out.</div>
                <div className="pc-tags"><span className="tag">REST API</span><span className="tag">Time-series</span><span className="tag">Python</span><span className="tag">Forecasting</span></div>
                <i className="ti ti-arrow-up-right pc-arrow" aria-hidden="true"></i>
              </div>
            </div>

            <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius)', padding: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Building something specific?</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', fontFamily: 'var(--mono)' }}>We take a small number of custom AI engagements each quarter.</div>
              </div>
              <Link href="/contact" className="btn-hero-p" style={{ background: '#fff', color: 'var(--navy)' }}>Get in touch &rarr;</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
