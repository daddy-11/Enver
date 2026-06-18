import {
  pgTable, uuid, text, timestamp, boolean,
  integer, numeric, jsonb, index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ── Better Auth tables ───────────────────────────────────────────────────────

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
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
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

// ── Farm plots (PostGIS geometry applied via raw SQL migration) ───────────────

export const farmPlots = pgTable("farm_plots", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  geometryWkt: text("geometry_wkt"), // replaced by geography column in migration
  treeCount: integer("tree_count"),
  healthScore: numeric("health_score", { precision: 5, scale: 2 }),
  lastSurvey: timestamp("last_survey"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const farmTileJobs = pgTable("farm_tile_jobs", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  plotId: uuid("plot_id").notNull().references(() => farmPlots.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("pending"),
  tileUrl: text("tile_url"),
  zoomMin: integer("zoom_min").default(10),
  zoomMax: integer("zoom_max").default(18),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

// ── Resumes (pgvector embedding applied via raw SQL migration) ────────────────

export const resumes = pgTable("resumes", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  filename: text("filename").notNull(),
  storageKey: text("storage_key").notNull(),
  fileSize: integer("file_size"),
  parsedText: text("parsed_text"),
  embeddingStatus: text("embedding_status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const resumeChunks = pgTable("resume_chunks", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  resumeId: uuid("resume_id").notNull().references(() => resumes.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  chunkIdx: integer("chunk_idx").notNull(),
  tokenCount: integer("token_count"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const comparisons = pgTable("comparisons", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  resumeAId: uuid("resume_a_id").notNull().references(() => resumes.id),
  resumeBId: uuid("resume_b_id").notNull().references(() => resumes.id),
  similarityScore: numeric("similarity_score", { precision: 5, scale: 4 }),
  diffJson: jsonb("diff_json"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ── Candidate Profiles ("Info Hoarder" Flow) ─────────────────────────────────

export const candidateProfiles = pgTable("candidate_profiles", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  experienceYears: integer("experience_years"),
  challenges: text("challenges"), // Problems faced getting a job
  skills: text("skills"), // Comma-separated or serialized skills list
  preferredRoles: text("preferred_roles"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ── Developer Telemetry logs ─────────────────────────────────────────────────

export const developerTelemetry = pgTable("developer_telemetry", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  activityType: text("activity_type").notNull(), // "login", "prompt", "command"
  details: jsonb("details"), // Metadata for prompt text, files open, duration
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─────────────────────────────────────────────────────────────────────────────
// enveraitech.in — Internal workspace ("the digital playground")
// See docs/superpowers/specs/2026-06-18-enveraitech-in-internal-backend-design.md
// ─────────────────────────────────────────────────────────────────────────────

// ── Team members (the fixed private roster) ──────────────────────────────────

export const teamMembers = pgTable("team_members", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  role: text("role").notNull().default("engineer"), // "founder" | "engineer"
  avatarColor: text("avatar_color").notNull().default("#e8660a"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => ({
  emailIdx: index("team_members_email_idx").on(t.email),
}));

// ── Activity sessions (durable "active from when to when") ───────────────────

export const activitySessions = pgTable("activity_sessions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  lastHeartbeatAt: timestamp("last_heartbeat_at").notNull().defaultNow(),
  endedAt: timestamp("ended_at"), // null while the session is still live
  source: text("source").notNull().default("portal"), // "portal" | "ide"
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
}, (t) => ({
  userStartedIdx: index("activity_sessions_user_started_idx").on(t.userId, t.startedAt),
  liveIdx: index("activity_sessions_live_idx").on(t.userId, t.endedAt),
}));

// ── Lounge rooms & messages ──────────────────────────────────────────────────

export const loungeRooms = pgTable("lounge_rooms", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  meetUrl: text("meet_url"), // persistent Google Meet link for voice
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const loungeMessages = pgTable("lounge_messages", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  roomId: uuid("room_id").notNull().references(() => loungeRooms.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  editedAt: timestamp("edited_at"),
  deletedAt: timestamp("deleted_at"), // soft delete
}, (t) => ({
  roomCreatedIdx: index("lounge_messages_room_created_idx").on(t.roomId, t.createdAt),
}));

// ── Voice sessions (who was in a Meet room, when) ────────────────────────────

export const voiceSessions = pgTable("voice_sessions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  roomId: uuid("room_id").notNull().references(() => loungeRooms.id, { onDelete: "cascade" }),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
  leftAt: timestamp("left_at"),
}, (t) => ({
  userJoinedIdx: index("voice_sessions_user_joined_idx").on(t.userId, t.joinedAt),
}));

// ── AI usage events (per-member metering) ────────────────────────────────────

export const aiUsageEvents = pgTable("ai_usage_events", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  provider: text("provider").notNull(), // "gemini" | "nvidia" | "freemodel"
  model: text("model").notNull(),
  feature: text("feature").notNull().default("agent"), // "tethys" | "shorekeeper" | ...
  promptTokens: integer("prompt_tokens").notNull().default(0),
  completionTokens: integer("completion_tokens").notNull().default(0),
  estimatedCostUsd: numeric("estimated_cost_usd", { precision: 12, scale: 6 }).notNull().default("0"),
  latencyMs: integer("latency_ms"),
  status: text("status").notNull().default("ok"), // "ok" | "error"
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  userCreatedIdx: index("ai_usage_user_created_idx").on(t.userId, t.createdAt),
  providerCreatedIdx: index("ai_usage_provider_created_idx").on(t.provider, t.createdAt),
}));

// ── Cloud billing daily cache (org-level real $ from BigQuery export) ────────

export const cloudBillingDaily = pgTable("cloud_billing_daily", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  date: text("date").notNull(), // YYYY-MM-DD (usage day, UTC)
  service: text("service").notNull(),
  sku: text("sku").notNull().default(""),
  costUsd: numeric("cost_usd", { precision: 14, scale: 6 }).notNull().default("0"),
  currency: text("currency").notNull().default("USD"),
  syncedAt: timestamp("synced_at").notNull().defaultNow(),
}, (t) => ({
  dateServiceSkuIdx: index("cloud_billing_date_service_sku_idx").on(t.date, t.service, t.sku),
}));

// ── Types ────────────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type FarmPlot = typeof farmPlots.$inferSelect;
export type NewFarmPlot = typeof farmPlots.$inferInsert;
export type Resume = typeof resumes.$inferSelect;
export type Comparison = typeof comparisons.$inferSelect;
export type CandidateProfile = typeof candidateProfiles.$inferSelect;
export type NewCandidateProfile = typeof candidateProfiles.$inferInsert;
export type DeveloperTelemetry = typeof developerTelemetry.$inferSelect;
export type NewDeveloperTelemetry = typeof developerTelemetry.$inferInsert;

// enveraitech.in internal workspace
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type TeamRole = "founder" | "engineer";
export type ActivitySession = typeof activitySessions.$inferSelect;
export type NewActivitySession = typeof activitySessions.$inferInsert;
export type LoungeRoom = typeof loungeRooms.$inferSelect;
export type NewLoungeRoom = typeof loungeRooms.$inferInsert;
export type LoungeMessage = typeof loungeMessages.$inferSelect;
export type NewLoungeMessage = typeof loungeMessages.$inferInsert;
export type VoiceSession = typeof voiceSessions.$inferSelect;
export type NewVoiceSession = typeof voiceSessions.$inferInsert;
export type AiUsageEvent = typeof aiUsageEvents.$inferSelect;
export type NewAiUsageEvent = typeof aiUsageEvents.$inferInsert;
export type CloudBillingDaily = typeof cloudBillingDaily.$inferSelect;
export type NewCloudBillingDaily = typeof cloudBillingDaily.$inferInsert;


