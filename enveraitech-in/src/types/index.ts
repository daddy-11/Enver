// ═══════════════════════════════════════════
// API Response types
// ═══════════════════════════════════════════

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

// ═══════════════════════════════════════════
// Geospatial — Orange Farm
// ═══════════════════════════════════════════

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface FarmPlotGeoJSON {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: {
    id: string;
    name: string;
    treeCount: number | null;
    healthScore: number | null;
    userId: string;
  };
}

export interface TileEndpoint {
  url: string;
  zoomRange: [number, number];
  format: "mvt" | "pbf";
}

// ═══════════════════════════════════════════
// Resume Comparer
// ═══════════════════════════════════════════

export interface ResumeUploadResult {
  id: string;
  filename: string;
  storageKey: string;
  fileSize: number;
  embeddingStatus: "pending" | "processing" | "done" | "error";
  createdAt: string;
}

export interface SimilarityResult {
  resumeAId: string;
  resumeBId: string;
  similarityScore: number;
  label: string;
  diffJson: SimilarityDiff;
}

export interface SimilarityDiff {
  method: "pgvector_cosine";
  dimensions: number;
  index: "hnsw" | "ivfflat";
  skillGaps?: string[];
  matchedSections?: string[];
}

// ═══════════════════════════════════════════
// Auth
// ═══════════════════════════════════════════

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
}

// ═══════════════════════════════════════════
// UI
// ═══════════════════════════════════════════

export type AppStatus = "live" | "beta" | "wip";

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}
