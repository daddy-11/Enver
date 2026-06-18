-- ══════════════════════════════════════════════════════════════════════════════
-- Enver AI Tech — PostGIS + pgvector migration
-- Run in Supabase SQL editor AFTER Drizzle push
-- ══════════════════════════════════════════════════════════════════════════════

-- Extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ── Farm plots: swap geometry_wkt for real PostGIS column ─────────────────────
ALTER TABLE farm_plots
  DROP COLUMN IF EXISTS geometry_wkt,
  ADD COLUMN IF NOT EXISTS geometry geography(GEOMETRY, 4326);

CREATE INDEX IF NOT EXISTS farm_plots_geometry_idx
  ON farm_plots USING gist(geometry);

-- ── Resume chunks: add vector(1536) column ────────────────────────────────────
ALTER TABLE resume_chunks
  ADD COLUMN IF NOT EXISTS embedding vector(1536);

CREATE INDEX IF NOT EXISTS resume_chunks_hnsw_idx
  ON resume_chunks USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- ── RLS ───────────────────────────────────────────────────────────────────────
ALTER TABLE farm_plots     ENABLE ROW LEVEL SECURITY;
ALTER TABLE farm_tile_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_chunks  ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparisons    ENABLE ROW LEVEL SECURITY;

CREATE POLICY farm_plots_owner     ON farm_plots     FOR ALL USING (auth.uid()::uuid = user_id);
CREATE POLICY tile_jobs_owner      ON farm_tile_jobs FOR ALL USING (EXISTS (SELECT 1 FROM farm_plots fp WHERE fp.id = farm_tile_jobs.plot_id AND fp.user_id = auth.uid()::uuid));
CREATE POLICY resumes_owner        ON resumes        FOR ALL USING (auth.uid()::uuid = user_id);
CREATE POLICY chunks_via_resume    ON resume_chunks  FOR ALL USING (EXISTS (SELECT 1 FROM resumes r WHERE r.id = resume_chunks.resume_id AND r.user_id = auth.uid()::uuid));
CREATE POLICY comparisons_owner    ON comparisons    FOR ALL USING (auth.uid()::uuid = user_id);

-- ── Helper: cosine similarity search ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION match_resume_chunks(
  query_embedding vector(1536),
  resume_id_filter uuid,
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10
)
RETURNS TABLE (id uuid, resume_id uuid, content text, chunk_idx integer, similarity float)
LANGUAGE sql STABLE AS $$
  SELECT rc.id, rc.resume_id, rc.content, rc.chunk_idx,
         1 - (rc.embedding <=> query_embedding) AS similarity
  FROM resume_chunks rc
  WHERE rc.resume_id = resume_id_filter
    AND rc.embedding IS NOT NULL
    AND 1 - (rc.embedding <=> query_embedding) > match_threshold
  ORDER BY rc.embedding <=> query_embedding
  LIMIT match_count;
$$;
