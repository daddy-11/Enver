import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  numeric,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ═══════════════════════════════════════════
// BETTER AUTH TABLES
// ═══════════════════════════════════════════

export const users = pgTable("users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verifications = pgTable("verifications", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ═══════════════════════════════════════════
// ORANGE FARM APP
// NOTE: geometry column uses PostGIS — apply raw SQL migration for
// geography(POLYGON, 4326) type. Drizzle column stores geometry text.
// ═══════════════════════════════════════════

export const farmPlots = pgTable(
  "farm_plots",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    // geometry stored as GeoJSON text; actual DB type set in raw migration:
    // geometry geography(POLYGON,4326)
    geometryWkt: text("geometry_wkt"),
    treeCount: integer("tree_count"),
    healthScore: numeric("health_score", { precision: 4, scale: 2 }),
    lastSurvey: timestamp("last_survey"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  }
);

export const farmTileJobs = pgTable("farm_tile_jobs", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  plotId: uuid("plot_id")
    .notNull()
    .references(() => farmPlots.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("pending"), // pending | processing | done | error
  tileUrl: text("tile_url"),
  zoomMin: integer("zoom_min").default(10),
  zoomMax: integer("zoom_max").default(18),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

// ═══════════════════════════════════════════
// RESUME COMPARER APP
// NOTE: embedding column uses pgvector — apply raw SQL migration for
// vector(1536) type and HNSW index.
// ═══════════════════════════════════════════

export const resumes = pgTable("resumes", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  filename: text("filename").notNull(),
  storageKey: text("storage_key").notNull(), // Supabase Storage object key
  fileSize: integer("file_size"),
  parsedText: text("parsed_text"),
  embeddingStatus: text("embedding_status").notNull().default("pending"), // pending | processing | done | error
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const resumeChunks = pgTable(
  "resume_chunks",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    resumeId: uuid("resume_id")
      .notNull()
      .references(() => resumes.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    // embedding: vector(1536) — raw migration applies vector type
    // stored here as text placeholder; actual type is set in SQL migration
    chunkIdx: integer("chunk_idx").notNull(),
    tokenCount: integer("token_count"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  }
);

export const comparisons = pgTable("comparisons", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  resumeAId: uuid("resume_a_id")
    .notNull()
    .references(() => resumes.id),
  resumeBId: uuid("resume_b_id")
    .notNull()
    .references(() => resumes.id),
  similarityScore: numeric("similarity_score", { precision: 5, scale: 4 }),
  diffJson: jsonb("diff_json"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ═══════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type FarmPlot = typeof farmPlots.$inferSelect;
export type NewFarmPlot = typeof farmPlots.$inferInsert;
export type Resume = typeof resumes.$inferSelect;
export type NewResume = typeof resumes.$inferInsert;
export type Comparison = typeof comparisons.$inferSelect;
