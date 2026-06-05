import { Navigation } from "@/components/layout/Navigation";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        <div className="page active" id="page-about">
          <div className="section reveal in">
            <div className="s-eyebrow">About</div>
            <h2 className="s-h2">An independent AI lab</h2>
            <p className="s-sub">Enver AI Tech builds production-grade AI products for real-world use cases. No demos. No vaporware. If it&#39;s in the lab, it runs in production.</p>
            
            <div className="about-layout">
              <div>
                <div className="founder-card">
                  <div className="fc-top">
                    <div className="fc-av">
                      <svg width="28" height="28" viewBox="0 0 80 80" aria-hidden="true">
                        <polygon points="40,8 72,26 72,58 40,76 8,58 8,26" fill="#fff" opacity=".1"/>
                        <polygon points="8,26 40,8 40,24 8,42" fill="#fff"/>
                        <polygon points="8,42 40,24 40,40 8,58" fill="rgba(255,255,255,.7)"/>
                        <polygon points="8,58 40,40 40,56 8,58" fill="rgba(255,255,255,.4)"/>
                        <polygon points="40,8 72,26 40,24" fill="rgba(255,255,255,.6)"/>
                        <polygon points="72,26 72,58 40,76 40,56" fill="rgba(255,255,255,.3)"/>
                      </svg>
                    </div>
                    <div><div className="fc-name">Enver &middot; Founder</div><div className="fc-role">AI Engineer &amp; Builder</div></div>
                  </div>
                  <div className="fc-bio">Building AI systems that actually ship. Background in full-stack engineering, spatial data, and machine learning. Every product in the lab is built, maintained, and iterated on personally &mdash; no team, no outsourcing.</div>
                </div>
                
                <div className="stats-row">
                  <div className="stat-box"><div className="stat-v" style={{ color: 'var(--navy)' }}>3+</div><div className="stat-l">Products shipped</div></div>
                  <div className="stat-box"><div className="stat-v" style={{ color: 'var(--orange)' }}>&lt;50ms</div><div className="stat-l">P95 latency</div></div>
                  <div className="stat-box"><div className="stat-v" style={{ color: 'var(--green)' }}>100%</div><div className="stat-l">Auth-gated</div></div>
                  <div className="stat-box"><div className="stat-v" style={{ color: 'var(--navy)' }}>0</div><div className="stat-l">Data leaks</div></div>
                </div>
              </div>
              
              <div className="about-blocks">
                <div className="ab">
                  <h4>The approach</h4>
                  <p>Ship working products, not pitch decks. Every system is production-grade from day one &mdash; proper auth, real databases, auditable code.</p>
                </div>
                <div className="ab">
                  <h4>The stack</h4>
                  <p>Next.js 14, TypeScript strict, Supabase PostgreSQL, PostGIS, pgvector, Better Auth, Drizzle ORM. Deliberate choices. No abstraction for abstraction&#39;s sake.</p>
                </div>
                <div className="ab">
                  <h4>Open by default</h4>
                  <p>Architecture is documented, schemas are public. Every technical decision is reasoned and written up. No black boxes.</p>
                </div>
                <div className="ab">
                  <h4>Security by design</h4>
                  <p>Row-Level Security on every table. HttpOnly session cookies. Middleware route protection. Service-role keys server-side only. Defense in depth by default.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
