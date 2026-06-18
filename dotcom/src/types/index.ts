// ═══════════════════════════════════════════
// API Response types
// ═══════════════════════════════════════════

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

// ═══════════════════════════════════════════
// Kariman (Emergency Logistics)
// ═══════════════════════════════════════════

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface AgentLocation {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number]; // lng, lat
  };
  properties: {
    id: string;
    name: string;
    status: "active" | "en-route" | "idle";
    userId: string;
  };
}

export interface DispatchEndpoint {
  url: string;
  region: string;
  activeTethers: number;
}

// ═══════════════════════════════════════════
// Atrea (Recruitment Intelligence)
// ═══════════════════════════════════════════

export interface RepoAnalysisResult {
  id: string;
  repoUrl: string;
  commitCount: number;
  embeddingStatus: "pending" | "processing" | "done" | "error";
  createdAt: string;
}

export interface CandidateSynergy {
  candidateId: string;
  jobId: string;
  synergyScore: number;
  label: string;
  diffJson: SynergyDiff;
}

export interface SynergyDiff {
  method: "pgvector_cosine";
  dimensions: number;
  index: "hnsw" | "ivfflat";
  skillGaps?: string[];
  matchedCapabilities?: string[];
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
