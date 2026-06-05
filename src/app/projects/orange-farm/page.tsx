import { Navigation } from "@/components/layout/Navigation";
import Link from "next/link";

export default function OrangeFarmPage() {
  return (
    <>
      <Navigation />
      <main>
        <div className="page active" id="page-detail-orange">
          <div className="det-hdr reveal in">
            <Link href="/projects" className="det-back"><i className="ti ti-arrow-left" aria-hidden="true"></i> Back to projects</Link>
            <div className="det-meta"><span className="status s-live">Live</span><span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)' }}>Geospatial Intelligence</span></div>
            <h1>Orange Farm Mapper</h1>
            <p>Tile-based geospatial platform for agricultural monitoring. PostGIS spatial queries, MVT tile serving via pg_tileserv, MapLibre GL rendering &mdash; built for field operators on edge hardware.</p>
            <div className="det-stack"><span className="tag">PostGIS</span><span className="tag">pg_tileserv</span><span className="tag">MapLibre GL</span><span className="tag">Supabase</span><span className="tag">GDAL</span><span className="tag">Next.js 14</span><span className="tag">TypeScript</span><span className="tag">Better Auth</span></div>
            <Link href="/contact" className="btn-hero-p" style={{ fontSize: 13, padding: '9px 20px' }}>Request access &rarr;</Link>
          </div>
          
          <div className="divider" style={{ margin: '0 2rem' }}></div>
          
          <div className="det-body reveal in">
            <div className="det-sec">
              <h2>What it does</h2>
              <p>Ingests GPS waypoints and drone imagery from field devices, stores plot geometry as PostGIS <code>geography(POLYGON, 4326)</code> with a GiST spatial index, and serves Mapbox Vector Tiles directly from the database via pg_tileserv. The client renders choropleth overlays in MapLibre GL &mdash; no tile CDN required.</p>
              <p>Field operators see real-time health scores per plot, tile job status, and an area summary &mdash; all scoped to their account via Row-Level Security.</p>
            </div>
            
            <div className="det-sec">
              <h2>Technical architecture</h2>
              <div className="arch">
                <span className="hl">Database</span> &middot; <span className="or">Supabase PostgreSQL</span> + PostGIS extension<br />
                <span className="hl">Geometry</span> &middot; <span className="gr">geography(POLYGON, 4326)</span> &mdash; WGS84 native<br />
                <span className="hl">Spatial index</span> &middot; GiST on geometry column<br />
                <span className="hl">Tile format</span> &middot; <span className="or">MVT</span> via pg_tileserv &mdash; no CDN dependency<br />
                <span className="hl">Renderer</span> &middot; <span className="gr">MapLibre GL</span> (open source, MIT licensed)<br />
                <span className="hl">Auth</span> &middot; Better Auth sessions + RLS: <span className="or">farm_plots_owner</span><br />
                <span className="hl">Ingest</span> &middot; GDAL for drone raster reprojection + vectorization<br />
                <span className="hl">Frontend</span> &middot; Next.js 14 App Router &middot; TypeScript strict &middot; Tailwind
              </div>
            </div>
            
            <div className="det-sec">
              <h2>Key features</h2>
              <div className="features">
                <div className="feat">
                  <i className="ti ti-map-pin feat-icon" aria-hidden="true"></i>
                  <div><h4>Plot geometry management</h4><p>Draw, edit, and store farm plot polygons. Stored as PostGIS geography with full spatial query support including area, distance, and intersection queries.</p></div>
                </div>
                <div className="feat">
                  <i className="ti ti-chart-area feat-icon" aria-hidden="true"></i>
                  <div><h4>Real-time health scoring</h4><p>Per-plot health scores computed from sensor data and drone imagery analysis. Updated on each field device sync.</p></div>
                </div>
                <div className="feat">
                  <i className="ti ti-server feat-icon" aria-hidden="true"></i>
                  <div><h4>MVT tile serving</h4><p>pg_tileserv serves vector tiles directly from PostGIS &mdash; no intermediate tile generation step, no S3 dependency, no tile CDN cost.</p></div>
                </div>
                <div className="feat">
                  <i className="ti ti-lock feat-icon" aria-hidden="true"></i>
                  <div><h4>Per-user data isolation</h4><p>RLS policy ensures each operator sees only their own plots. Enforced at database query time &mdash; not just application layer.</p></div>
                </div>
              </div>
            </div>
            
            <div className="cta-card">
              <h3>Want access to Orange Farm Mapper?</h3>
              <p>This product is invite-only. Apply and we&#39;ll review within 48 hours.</p>
              <Link href="/contact" className="btn-hero-s" style={{ background: '#fff', color: 'var(--navy)', border: 'none' }}>Apply for access</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
