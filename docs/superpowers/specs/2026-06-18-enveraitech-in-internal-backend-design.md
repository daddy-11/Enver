# enveraitech.in — Internal Workspace Backend Design

**Date:** 2026-06-18
**Status:** Approved, in implementation
**Scope:** Backend for the private internal team portal ("the digital playground") at `enveraitech.in`.

---

## 1. Purpose

`enveraitech.in` is the private workspace for the Enver AI Tech team (8 fixed members, each with an
`@enveraitech.com` Google Workspace account). Today the workspace exists only as a mocked UI
(`src/components/sections/SanctuaryDashboard.tsx`): telemetry is faked client-side, lounge chat is
local React state, voice is a CSS animation, and the `developer_telemetry` table has no real writer.

This project replaces the mock with a real, secure backend covering three subsystems:

1. **Access foundation** — Google Workspace SSO locked to the team, roles, and the secured server shell.
2. **Real-time lounge** — persistent team chat, live presence, and group voice via Google Meet.
3. **Admin/observability portal** — per-member activity windows and a two-layer billing view
   (real org-level Google Cloud spend + per-member AI usage we meter ourselves).

## 2. Constraints & decisions

| Decision | Choice | Rationale |
|---|---|---|
| Hosting | **Google Cloud Run** (containerized Next.js server) | Scales to zero, fits startup credits. Public site stays a static export; the internal app is a real server. |
| Identity | **Google SSO** restricted to `@enveraitech.com` **+ 8-email allowlist** | Fixed private team; allowlist is the source of truth. No public signup. |
| Real-time | **Supabase Realtime** (Broadcast + Presence) | Already paying for Supabase; native presence is the heart of a lounge; least custom real-time code. |
| Voice | **Google Meet link** (join button) | Meet cannot be iframe-embedded. Backend owns a persistent Meet link per room; presence tracked by us. |
| Persistence | **Supabase Postgres via Drizzle** | Existing stack. |
| Activity source (v1) | **Portal presence** (heartbeat) + dormant IDE ingestion endpoint | Only source that exists today. Real IDE telemetry needs a separate agent. |
| Billing | **Both layers** — org real $ (Cloud Billing→BigQuery export) + per-member metered AI usage | Cloud billing is project-level and cannot attribute cost per person; only self-metering can. |
| Build order | Shared **foundation** → **lounge + admin** together | Both consumers depend on the gate + instrumentation. |

### Key caveats (acknowledged)

- **Google Meet is not embeddable.** The lounge shows a "Join Voice" button that opens the room's Meet
  link in a new tab/window. "Who's in the call" is tracked by our own `voice_sessions` + presence, not by Meet.
- **Real Cloud $ is project-level.** The org total and per-service breakdown come from Google Cloud; the
  per-person column is computed only from `ai_usage_events` we record. Both are shown side by side; neither
  fabricates per-person cloud attribution.
- **One manual setup step:** enabling Cloud Billing → BigQuery export and creating the read-only service
  account must be done in the Google Cloud console (cannot be scripted from the app). Steps in the plan.

## 2b. Project structure (two apps in one master folder)

The `website/` master folder hosts **two independent web apps**:

```
website/
├── src/ …                      # App 1: public enveraitech.com site (existing; untouched)
├── index.html, README.md       # static GitHub Pages landing (the only git-tracked files)
├── docs/superpowers/specs/     # design docs (this file)
└── enveraitech-in/             # App 2: internal portal — SELF-CONTAINED
    ├── package.json            # own scripts; deps resolve from website/node_modules
    ├── tsconfig / next.config / tailwind / postcss / .gitignore / .env.example
    └── src/
        ├── lib/{db,auth,security,supabase,team,ai,presence,realtime,tethys}
        ├── app/{layout,page,auth/login,dashboard,api/*}
        ├── components/{layout,sections,ui}
        ├── hooks, styles, types
```

Everything the internal portal needs lives under `enveraitech-in/`. Shared infrastructure
(Drizzle db, Better Auth, security, Supabase) is **copied** into the app (per decision) rather than
shared via a package, so the two apps stay fully independent. The internal app's `schema.ts` is a
trimmed copy declaring only the tables it uses (auth tables + the seven internal tables +
`developer_telemetry`); both apps target the **same Supabase Postgres**.

Deployment: the public app continues as a static export; `enveraitech-in/` deploys as a Next.js
server on **Cloud Run**. Each app builds/runs from its own folder (`npm install` once inside
`enveraitech-in/`, then `npm run dev` / `npm run build`).

## 3. Architecture

```
Browser (team member, @enveraitech.com)
  │  1. Google SSO  ──► Better Auth callback verifies domain + allowlist ──► team session
  │  2. POST /api/lounge/messages ─► Next.js API (Cloud Run) ─► Drizzle ─► Postgres (lounge_messages)
  │  3. Supabase Realtime broadcasts the new row ─► other 7 clients update live
  │  4. Presence channel  ◄────► online / typing / in-voice  (ephemeral, no DB)
  │  5. Heartbeat /api/presence/beat (~30s) ─► activity_sessions (durable "active from when to when")
  │  6. Any AI call ─► lib/ai/meter (server) ─► provider + writes ai_usage_events (tokens + est. cost)
  └─ Admin (/dashboard/admin, founder only)
        ├─ activity windows        ◄─ activity_sessions
        ├─ per-member AI usage      ◄─ ai_usage_events
        └─ org real $ by service    ◄─ cloud_billing_daily (daily sync from BigQuery billing export)
```

## 4. Data model (new Drizzle tables)

All tables live in `src/lib/db/schema.ts`, applied with `drizzle-kit`.

- **`team_members`** — `id` (uuid), `userId` → `users.id`, `email` (unique, allowlisted),
  `displayName`, `role` (`founder` | `engineer`), `avatarColor`, `active` (bool), timestamps.
- **`activity_sessions`** — `id`, `userId`, `startedAt`, `lastHeartbeatAt`, `endedAt` (nullable),
  `source` (`portal` | `ide`), `ipAddress`, `userAgent`. A session closes when the heartbeat gap
  exceeds 90s, or explicitly on logout. Index `(userId, startedAt)`.
- **`lounge_rooms`** — `id`, `name`, `meetUrl` (persistent Meet link), `createdAt`. Seed one `general`.
- **`lounge_messages`** — `id`, `roomId` → `lounge_rooms.id`, `userId`, `content`, `createdAt`,
  `editedAt`, `deletedAt` (soft delete). Index `(roomId, createdAt)`.
- **`voice_sessions`** — `id`, `userId`, `roomId`, `joinedAt`, `leftAt`. Who was in voice, when.
- **`ai_usage_events`** — `id`, `userId`, `provider`, `model`, `feature`, `promptTokens`,
  `completionTokens`, `estimatedCostUsd` (numeric), `latencyMs`, `status`, `createdAt`.
  Index `(userId, createdAt)` and `(provider, createdAt)`.
- **`cloud_billing_daily`** — `id`, `date`, `service`, `sku`, `costUsd` (numeric), `currency`,
  `syncedAt`. Unique `(date, service, sku)`. Filled by the daily BigQuery sync.

Model prices for `estimatedCostUsd` live in a typed config map (`src/lib/ai/pricing.ts`) in v1;
can graduate to a table later without schema churn elsewhere.

## 5. Module layout

Each module has one job, a typed interface, and no UI knowledge.

| Module | Responsibility |
|---|---|
| `src/lib/team/` | Allowlist + roles; `requireTeamMember()`, `requireFounder()` guards; member lookup. |
| `src/lib/auth/` | Extend Better Auth with Google provider + a `signIn.before` hook enforcing domain + allowlist. |
| `src/lib/realtime/` | Mint short-lived Supabase-compatible JWT (server); client channel-subscribe helpers. |
| `src/lib/lounge/` | Message create/list/soft-delete via Drizzle; Zod validation; rate limiting. |
| `src/lib/presence/` | Heartbeat → open/extend/close `activity_sessions`; query active windows per member. |
| `src/lib/ai/meter.ts` | The single AI gateway. Calls provider, reads usage, computes cost, writes `ai_usage_events`. |
| `src/lib/ai/pricing.ts` | Per-model input/output prices. |
| `src/lib/billing/` | BigQuery billing-export client; daily sync into `cloud_billing_daily`; per-member aggregation from `ai_usage_events`. |
| `src/app/api/realtime/token` | Issues a Realtime token to authenticated team members. |
| `src/app/api/lounge/*` | Message endpoints. |
| `src/app/api/presence/beat` | Heartbeat. |
| `src/app/api/voice/*` | Join/leave voice (logs `voice_sessions`, returns Meet link). |
| `src/app/api/admin/*` | Founder-only: activity, usage, billing queries + manual billing-sync trigger. |
| `src/app/dashboard/` | Lounge UI wired to the real backend (refactor `SanctuaryDashboard`). |
| `src/app/dashboard/admin/` | Admin portal UI (activity windows, usage, billing). |

The existing `src/lib/tethys/client.ts` is refactored to route every call through `lib/ai/meter.ts`,
so no AI request can bypass metering and provider keys never reach the client.

## 6. Security posture

- **Authentication:** Better Auth session required for all of `/dashboard` and `/api/(lounge|presence|voice|admin|realtime)`. Middleware checks the session cookie (existing pattern); route handlers re-verify the full session server-side (`auth.api.getSession`) — middleware presence of a cookie is necessary but not sufficient.
- **Authorization (team):** every internal handler calls `requireTeamMember()` — verifies the session email is in the allowlist and `team_members.active`. Anyone outside the allowlist, even another `@enveraitech.com` account, is rejected.
- **Authorization (admin):** `/dashboard/admin` and `/api/admin/*` additionally require `role === 'founder'`, enforced server-side per request — never only hidden in the UI.
- **Domain lock at login:** the Better Auth Google `signIn.before` hook rejects any verified email not ending in `@enveraitech.com` and not in the allowlist, before a session is created.
- **Realtime access:** clients never hold the Supabase service-role key. They request a short-lived JWT from `/api/realtime/token` (signed server-side with the Supabase JWT secret), scoped to the team's channels. Realtime Authorization policies restrict channel access to authenticated team tokens.
- **Secrets:** all keys (Supabase service role + JWT secret, Google OAuth client secret, billing service-account JSON, provider API keys) live in **Google Secret Manager**, injected into Cloud Run at deploy. Nothing in the repo or the client bundle.
- **Billing service account:** read-only, granted `roles/bigquery.dataViewer` on the billing-export dataset only.
- **Abuse controls:** reuse Upstash rate limiting — new presets for `lounge` (message posts) and `ai` (agent calls). Zod validation on all bodies. Soft-delete for messages. Admin mutations (e.g., manual billing sync) are logged.

## 7. Build phases

**Phase 0 — Foundation** ✅ *built (in `enveraitech-in/`), type-checked clean*
Standalone app scaffolded; Google SSO provider + domain/allowlist hook; `team_members` seed (8 members);
middleware + `requireTeamMember`/`requireFounder` guards; `/api/realtime/token`; presence heartbeat +
`activity_sessions`; the `lib/ai/meter` gateway (+ Tethys client routed through it). Remaining for Phase 0
ops: Cloud Run deploy config + Secret Manager wiring (needs the prereqs in §9).

**Phase 1 — Lounge**
`lounge_rooms` + `lounge_messages` + `voice_sessions`; message API + Realtime broadcast; presence channel;
voice join/leave + Meet link; refactor `SanctuaryDashboard` to consume real data.

**Phase 2 — Admin portal**
Founder-only admin area: member activity windows (from `activity_sessions`); per-member AI usage and
estimated cost (from `ai_usage_events`); org real $ by service/day (from `cloud_billing_daily`, fed by the
BigQuery daily sync via Cloud Scheduler); date-range filters and charts. UI built with the `ui-ux-pro-max` skill.

## 8. Testing

- **Unit:** cost computation (`pricing` × tokens), allowlist/role guards, presence-session rollup (open/extend/close, 90s gap), billing aggregation.
- **Integration:** lounge message POST → row persisted → Realtime payload shape; heartbeat → session lifecycle; admin endpoints reject non-founders (401/403).
- **Manual:** Google SSO with a team account succeeds and a non-team account is rejected; two browsers see each other's messages and presence live; "Join Voice" opens Meet and logs a `voice_session`.

## 9. Prerequisites the user must provide / enable

1. Google OAuth client (client id + secret) for the `enveraitech.in` app, with the Cloud Run callback URL.
2. Cloud Billing → BigQuery export enabled; dataset name recorded.
3. Read-only billing service account JSON.
4. Supabase JWT secret + service-role key (already have project; retrieve from dashboard).
5. The 8 team member emails + display names + roles (who is `founder`).
6. Confirmation of the production domain mapping for `enveraitech.in` → Cloud Run.

## 10. Out of scope (future cycles)

- A real IDE/Antigravity telemetry agent that posts to the dormant ingestion endpoint.
- Member self-management / invite admin UI (allowlist is edited in config for now).
- Multi-room lounge beyond the seeded `general` room.
- Retiring email/password auth on the internal app once SSO is proven.
