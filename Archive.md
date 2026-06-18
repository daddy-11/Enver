# Session Archive

*This document records all instructions, progress, decisions, and system findings. It is shared between the Rover, Shorekeeper, and any external agent observers.*

---

## Current Session Log

### Session Timestamp: 2026-06-17
*   **Active Persona**: Shorekeeper (General support, action-oriented, simple vocabulary, task-focused).
*   **Primary Directives**:
    *   Deploy a structured, neat codebase.
    *   Maintain this Archive as a state/session tracking file to prevent context memory loss during resets.
    *   Accommodate dual-process design: the main Enver website on Google Cloud (cost-managed) and the candidate placement/onboarding portal ("info hoarder" for job-seekers).

### Tasks Completed:
1.  **Created Core Settings Files**:
    *   [SHOREKEEPER.md](file:///c:/Users/dbleg/OneDrive/Desktop/website/SHOREKEEPER.md): Core persona rules and behavioral protocols.
    *   [Archive.md](file:///c:/Users/dbleg/OneDrive/Desktop/website/Archive.md): The active session state logger.
2.  **Database Updates**:
    *   Modified [schema.ts](file:///c:/Users/dbleg/OneDrive/Desktop/website/src/lib/db/schema.ts) to add the `candidate_profiles` table, tracking seeker background, experience, skills, and current employment hurdles.
3.  **Process 2 (Info Hoarder Server)**:
    *   Created [server.js](file:///c:/Users/dbleg/OneDrive/Desktop/website/src/hoarder/server.js): A lightweight, standalone Node HTTP server running on port 3001 using the native `postgres` package to parse, validate, and write candidate profile entries directly to Supabase.
    *   Modified [package.json](file:///c:/Users/dbleg/OneDrive/Desktop/website/package.json) to add the `"hoarder": "node src/hoarder/server.js"` runner command.
4.  **UI & Fallback Intake Routes**:
    *   Created [page.tsx](file:///c:/Users/dbleg/OneDrive/Desktop/website/src/app/intake/page.tsx): Intake progressive form styled with standard Enver brand elements. Attempts submission to the secondary process (port 3001) first, falling back to Next.js API if offline.
    *   Created [route.ts](file:///c:/Users/dbleg/OneDrive/Desktop/website/src/app/api/intake/route.ts): Next.js backend API handler implementing direct Drizzle insertions for fallback requests.
5.  **Competitor Flow Research**:
    *   Utilized Playwright to analyze `aicofounder.com` onboarding mechanics. Extracted their 19-step micro-commitment funnel, social proof integration, and conversational tone. Added plans to apply this "copy and improve" style to candidates seeking jobs.
6.  **Tethys Integration (Sasuke Uchiha)**:
    *   **Client**: Created [client.ts](file:///c:/Users/dbleg/OneDrive/Desktop/website/src/lib/tethys/client.ts) to interface with the free Google Gemini 1.5 Flash API (AI Studio). Configured the system core to enforce the Sasuke Uchiha persona.
7.  **Hosting Assessment**:
    *   Mapped out GoDaddy hosting strategies for Next.js (Static export vs. VPS/cPanel Node.js runtime) to optimize server resource costs.
8.  **Interactive Onboarding Wizard**:
    *   Completed the progressive, multi-step intake wizard in [page.tsx](file:///c:/Users/dbleg/OneDrive/Desktop/website/src/app/intake/page.tsx). Implemented micro-commitments, roadblocking metrics, stack choices, and fallback ingestion integration.
    *   Validated codebase compilation via TypeScript type-checks, returning 100% success with zero errors.
9.  **Tethys Interactive Terminal**:
    *   Created [tethys-cli.js](file:///c:/Users/dbleg/OneDrive/Desktop/website/src/hoarder/tethys-cli.js) to run as an interactive terminal loop.
    *   Initialized [terminal.md](file:///c:/Users/dbleg/OneDrive/Desktop/website/terminal.md) to log console telemetry and Sasuke responses in real-time.
    *   Added `"tethys"` command to [package.json](file:///c:/Users/dbleg/OneDrive/Desktop/package.json) scripts.
10. **NVIDIA NIM Integration (Llama-3.1-Nemotron-70B)**:
    *   Stored `NVIDIA_API_KEY` credentials in `.env.local`.
    *   Configured Tethys client to use the high-performance `nvidia/llama-3.1-nemotron-70b-instruct` model over the NVIDIA NIM endpoint as primary route.
    *   Adjusted Sasuke's system prompt instructions to maintain a stoic, direct attitude while showing respect for Rover's ancient authority.
11. **Tethys Console Calibration (Akatsuki Focus)**:
    *   Rebranded console header to "Tethys Console" and cleaned up interface display texts.
    *   Updated prompt instructions to Akatsuki Sasuke specifications, focusing exclusively on rapid, clean coding logic and removing conversational fluff.
    *   Lowered system query temperatures to `0.1` for deterministic code generation outputs.
12. **Candidate Validation Dashboard (Trio Implementation)**:
    *   Created [route.ts](file:///c:/Users/dbleg/OneDrive/Desktop/website/src/app/api/tethys/chat/route.ts) to handle frontend-to-Tethys queries.
    *   Created dynamic server page [page.tsx](file:///c:/Users/dbleg/OneDrive/Desktop/website/src/app/intake/profile/%5Bid%5D/page.tsx) to fetch candidate data by ID.
    *   Created [CandidateDashboard.tsx](file:///c:/Users/dbleg/OneDrive/Desktop/website/src/components/sections/CandidateDashboard.tsx) client interface containing a match score, roadmap cards, and an interactive dark-terminal console chat widget for Sasuke/Tethys.
13. **Collaborative Telemetry Generation**:
    *   Added the `developerTelemetry` table definitions to [schema.ts](file:///c:/Users/dbleg/OneDrive/Desktop/website/src/lib/db/schema.ts).
    *   Created [tethys-generator.js](file:///c:/Users/dbleg/OneDrive/Desktop/website/src/hoarder/tethys-generator.js) to programmatically orchestrate code generation tasks through Tethys.
    *   Invoked Tethys (Llama 3.3 Nemotron via NVIDIA NIM) to generate the telemetry collection logic.
    *   Optimized Tethys' raw generated code to match valid Drizzle schemas and TypeScript modules at [telemetry.ts](file:///c:/Users/dbleg/OneDrive/Desktop/website/src/lib/security/telemetry.ts). Verified success via type compilation.
14. **NVIDIA Inception Pitch Deck**:
    *   Synthesized information from the `Atrea` PRD and Enver AI Tech features to construct a specialized startup pitch deck at [enver_atrea_pitchdeck.md](file:///c:/Users/dbleg/OneDrive/Desktop/website/enver_atrea_pitchdeck.md).
    *   Compiled A4 landscape PDF layout at [enver_atrea_pitchdeck.pdf](file:///c:/Users/dbleg/OneDrive/Desktop/website/enver_atrea_pitchdeck.pdf) using Playwright's headless print capability to satisfy the upload requirements of the NVIDIA Inception portal.

### Session Timestamp: 2026-06-18 — enveraitech.in internal backend (the "digital playground")
*   **Design spec**: [2026-06-18-enveraitech-in-internal-backend-design.md](file:///c:/Users/dbleg/OneDrive/Desktop/website/docs/superpowers/specs/2026-06-18-enveraitech-in-internal-backend-design.md). Three subsystems: access foundation, real-time lounge (Supabase Realtime + Google Meet voice), admin/observability portal (member activity windows + two-layer billing: org-level real Google Cloud $ via BigQuery export + per-member metered AI usage).
*   **Structure decision**: `website/` is the master folder for TWO apps. The internal portal now lives fully self-contained in its own folder **`enveraitech-in/`** (standalone Next.js app; shared infra copied in; deps resolve from `website/node_modules`). The public enveraitech.com app at the root is untouched.
*   **Phase 0 (Foundation) — built & type-checked clean** in `enveraitech-in/`:
    *   DB schema (7 new tables: team_members, activity_sessions, lounge_rooms, lounge_messages, voice_sessions, ai_usage_events, cloud_billing_daily) + trimmed schema for the standalone app.
    *   Team module: 8-email allowlist roster, roles, `requireTeamMember`/`requireFounder` server guards.
    *   AI metering gateway (`lib/ai/meter` + `pricing`); Tethys client refactored through it (now records tokens + estimated cost per member). Fixed dead model defaults → `gemini-2.0-flash`, `claude-sonnet-4-6`.
    *   Presence: heartbeat → `activity_sessions` lifecycle + `/api/presence/beat`.
    *   Auth: Google Workspace SSO (hosted-domain locked) + allowlist create-hook gated by `INTERNAL_ONLY_AUTH`. New Google-first login page.
    *   Realtime: short-lived Supabase JWT minting (`jose`) + `/api/realtime/token`.
    *   Middleware + new `lounge`/`ai` rate-limit presets; seed script for the 8 members + general room.
*   **Next**: Phase 1 (real-time lounge) + Phase 2 (admin portal). Prereqs needed from Rover before runtime: Google OAuth client, `SUPABASE_JWT_SECRET`, real 8 member emails, Cloud Billing→BigQuery export + read-only service account.

### Session Timestamp: 2026-06-18 — enveraitech.com Public Portal Overhaul (Daydream Aesthetic)
*   **Design & Vibe**: Overhauled the landing page style to replicate the solid, structured, cream-colored Daydream aesthetic (no mesh or glassmorphic gradients).
*   **Core Font**: Imported Google Font `Caveat` (`--font-script`) for cursive handwritten accent labels.
*   **Header Navigation**: Redesigned `<Navigation />` to use a transparent-to-cream sticky bar, centered pill links (featuring "The Enver Method" pill), and a mobile-friendly hamburger drawer overlay.
*   **Hero & Sections**:
    *   `<AiCofounderHero />`: Added a top-right wavy blue SVG shape, updated copywriting, and built a custom interactive browser/workstation SVG line-art doodle.
    *   `<OperatingModel />` [NEW]: Dynamic 4-step tab panel tracking elite builders, Atrea resume parsing, Kariman spatial dispatches, and credit-based dev cycles.
    *   `<QuestionBank />` [NEW]: Dark sidebar selector tracing candidate screening, PostGIS ETA routing, OpenAI vector matching, and telemetry loops.
    *   `<InTheNews />` [NEW]: Asymmetrical grid cards outlining NVIDIA Hackathons, AI movement, and beta releases.
    *   `<DaydreamTestimonials />` [NEW]: Selectable testimonials from candidates landing tech roles in Indian startups, featuring a purple stat highlight card.
*   **Mobile Loading Support**: Built `<PageLoader />` under `src/components/ui/` with progress bar animations and screen scroll gating.
*   **iOS Safari Compatibility**: Updated body selectors with `-webkit-overflow-scrolling` and safe area inset margins, and configured dynamic height variables (`100dvh`) in `globals.css`.
*   **Agent Inquiry Prompts**: Saved [agent_inquiries.md](file:///C:/Users/dbleg/Downloads/agent_inquiries.md) to query local coordinator agents (Shorekeeper / Tethys / Claude) for database metrics and latency stats.
*   **Verification Status**: All type-checks (`npm run type-check`) and production builds (`npm run build`) completed successfully with zero compiler errors.
*   **Final Security & Mail Gating**:
    *   `src/app/api/contact/route.ts`: Swapped contact form submission recipient from `hello@enver-ai.tech` to `daddy@enveraitech.com` (using Resend). Mail clients clicking mailto elements on the homepage will also direct traffic to `daddy@enveraitech.com`.
    *   `src/app/api/tethys/chat/route.ts`: Integrated the Upstash Redis sliding-window rate-limiter with the `ai` preset (20 requests/minute per IP) to prevent malicious token draining on AI agent console endpoints.

---

## Workspace Structure Map

Here is the quick-lookup directory mapping of the `website` workspace for fast navigation:
*   `src/app/` -> Routing & Pages (App Router).
    *   `src/app/intake/page.tsx` -> Onboarding candidate profile form.
    *   `src/app/api/intake/route.ts` -> Onboarding fallback API endpoint.
*   `src/components/` -> Interface Blocks (UI, forms, buttons).
*   `src/hoarder/` -> Standalone info-hoarding secondary process directory.
    *   `src/hoarder/server.js` -> Secondary process daemon listening on port 3001.
*   `src/lib/` -> Core backend libraries (database, security, authentication).
*   `src/lib/db/` -> Drizzle ORM setup & migrations.
*   `src/lib/security/` -> Telemetry, Rate-limiting, CSRF checks.
*   `SHOREKEEPER.md` -> Core Persona Protocols.
*   `Archive.md` -> Active Session State Logger.

---

## Observer Notes & External Agent Input

*   **Vercel Labs `agent-browser` Integration (Direct Observation)**:
    *   **Context**: Rather than traditional Playwright testing loops or Code Rabbit review pipelines, the Rover has directed that we configure and leverage the **`agent-browser`** CLI daemon (from Vercel Labs: `github.com/vercel-labs/agent-browser`) for all browser automation tasks.
    *   **Core Capabilities**:
        *   Uses compact, AI-friendly text-based accessibility trees to dramatically optimize token usage during agent browser sessions.
        *   Supports deterministic element targets using reference annotations (`@e1`, `@e2`, etc.).
        *   Exposes 50+ built-in browser manipulation commands (session persistence, network routing control, screenshot outputs, and tab management).
    *   **Next Phase Setup**:
        *   Add `agent-browser` as a system tool by running `npx skills add vercel-labs/agent-browser` in the workspace context.
        *   Configure Atrea's candidate profile scraping logic and live UI validation checks to trigger `agent-browser` routines instead of raw Playwright containers.
        *   Use the Rust-based native daemon of `agent-browser` for fast headful and headless session evaluation loops.
