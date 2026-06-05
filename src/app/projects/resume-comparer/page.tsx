import { Navigation } from "@/components/layout/Navigation";
import Link from "next/link";

export default function ResumeComparerPage() {
  return (
    <>
      <Navigation />
      <main>
        <div className="page active" id="page-detail-resume">
          <div className="det-hdr reveal in">
            <Link href="/projects" className="det-back"><i className="ti ti-arrow-left" aria-hidden="true"></i> Back to projects</Link>
            <div className="det-meta"><span className="status s-beta">Beta</span><span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)' }}>Document Intelligence</span></div>
            <h1>Resume Comparer</h1>
            <p>Upload two PDFs, get a cosine similarity score, skill gap delta, and structured diff. pgvector HNSW index with OpenAI ada-002 embeddings. P95 under 50ms on cold queries.</p>
            <div className="det-stack"><span className="tag">pgvector</span><span className="tag">HNSW index</span><span className="tag">OpenAI ada-002</span><span className="tag">Supabase Storage</span><span className="tag">pdfjs-dist</span><span className="tag">Drizzle ORM</span><span className="tag">Next.js 14</span></div>
            <Link href="/contact" className="btn-hero-p" style={{ fontSize: 13, padding: '9px 20px' }}>Request beta access &rarr;</Link>
          </div>
          
          <div className="divider" style={{ margin: '0 2rem' }}></div>
          
          <div className="det-body reveal in">
            <div className="det-sec">
              <h2>What it does</h2>
              <p>You upload two PDF resumes. The system extracts text via pdfjs-dist, chunks it, embeds each chunk with OpenAI&#39;s text-embedding-ada-002 (1536 dimensions), and stores the vectors in a pgvector HNSW index in Supabase.</p>
              <p>Similarity is computed as cosine distance across chunk pairs. The result is a percentage match score, a list of skills in A but not B, and a ranked similarity breakdown by section.</p>
            </div>
            
            <div className="det-sec">
              <h2>Technical architecture</h2>
              <div className="arch">
                <span className="hl">Storage</span> &middot; <span className="or">Supabase Storage</span> &mdash; private bucket, user-scoped prefix<br />
                <span className="hl">Extraction</span> &middot; pdfjs-dist on Vercel Edge functions<br />
                <span className="hl">Embeddings</span> &middot; <span className="gr">OpenAI text-embedding-ada-002</span> (1536-dim)<br />
                <span className="hl">Vector DB</span> &middot; <span className="or">pgvector</span> extension on Supabase PostgreSQL<br />
                <span className="hl">Index</span> &middot; HNSW (Hierarchical Navigable Small World) for fast ANN search<br />
                <span className="hl">Distance metric</span> &middot; Cosine distance (1 - inner product)<br />
                <span className="hl">ORM</span> &middot; Drizzle ORM with custom vector types<br />
                <span className="hl">Frontend</span> &middot; Next.js 14 App Router &middot; Framer Motion
              </div>
            </div>
            
            <div className="cta-card">
              <h3>Want to test Resume Comparer?</h3>
              <p>We are currently onboarding beta users. Apply for access.</p>
              <Link href="/contact" className="btn-hero-s" style={{ background: '#fff', color: 'var(--navy)', border: 'none' }}>Apply for beta access</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
