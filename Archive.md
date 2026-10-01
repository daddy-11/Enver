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
*   **Candidate Intake Flow Verification (enveraitech.com)**:
    *   Verified database integration: Intake form submissions successfully insert records into the `candidate_profiles` table in Supabase via Drizzle ORM (under the Next.js `/api/intake` fallback route) or direct client connections (via the secondary `hoarder` daemon).
    *   Dynamic matching report pages are active at `/intake/profile/[id]` (e.g., [http://localhost:3000/intake/profile/aa9c2a49-9717-4ff0-9779-98f1297b5b7c](http://localhost:3000/intake/profile/aa9c2a49-9717-4ff0-9779-98f1297b5b7c) for the latest candidate, **Amaan Shaikh**).

### Session Timestamp: 2026-06-18 — Handoff for Terminal Agent (Claude) to begin `enveraitech.in`
*   **Objective**: Complete the implementation of the private team portal (`enveraitech-in/`) covering Phase 1 (Lounge) and Phase 2 (Admin Observability).
*   **State of `enveraitech-in/` Subsystem**:
    *   **Phase 0 (Foundation)**: Roster, SSO auth hook domain locks, AI metering (`lib/ai/meter`), and heartbeats are fully set up.
    *   **Phase 1 (Lounge)**: The real-time messaging, presence tracking, and voice session hooks are fully implemented in `src/hooks/useLounge.ts`. The main page `src/components/sections/SanctuaryDashboard.tsx` is wired to these hooks but needs verification in local developer runs.
    *   **Phase 2 (Admin/Observability)**: Not yet built. Requires:
        1.  BigQuery sync logic for Google Cloud org-billing inside `src/lib/billing/` writing to `cloud_billing_daily`.
        2.  Founder auth guards (`requireFounder`) applied on all admin pages/endpoints.
        3.  Admin backend endpoints `/api/admin/*` to return aggregated member activity timelines, AI usage/costs, and daily GCP billing costs.
        4.  Admin UI dashboard path at `/dashboard/admin/page.tsx` displaying telemetry charts, activity windows, and service expense tables.

---

## Workspace Structure Map

Here is the quick-lookup directory mapping of the `website` workspace for fast navigation:
*   `src/app/` -> Routing & Pages (App Router for enveraitech.com).
    *   `src/app/intake/page.tsx` -> Onboarding candidate profile form.
    *   `src/app/api/intake/route.ts` -> Onboarding fallback API endpoint.
*   `enveraitech-in/` -> Self-contained Next.js app for internal portal.
    *   `enveraitech-in/src/app/` -> Pages & API endpoints.
    *   `enveraitech-in/src/components/sections/SanctuaryDashboard.tsx` -> Main control center.
    *   `enveraitech-in/src/hooks/useLounge.ts` -> Lounge hooks & Realtime syncing.
    *   `enveraitech-in/src/lib/` -> Auth, Presence, Security, Roster, AI metering, database connection.
*   `src/components/` -> Interface Blocks for public site.
*   `src/hoarder/` -> Standalone info-hoarding secondary process directory.
*   `src/lib/` -> Core backend libraries for public site.
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

---

## Session Timestamp: 2026-09-30 — Workspace Cleanup & Azure Deployment Protocol Lock
*   **Active Persona**: Shorekeeper.
*   **Hosting Architecture ("Deploy" Protocol)**:
    *   **Provider**: Microsoft Azure (Founders Hub).
    *   **App Registration**: `Enver Website` (`6cae09cb-4819-4ddc-8a98-13c5c7bf58ec`).
    *   **Directory / Tenant**: `bda1a0ee-c558-4d13-a112-18b2d8d1deba`.
    *   **Authenticated Identity**: `Enver.AI@outlook.com` on `Azure subscription 1` (`c5ba51bd-ad7c-4e15-8199-bbc045d607de`).
    *   **Deployment Vector**: `Enver/azure-deploy.ps1` -> Azure Container Apps (`enver-web-app` in `centralindia` under `enver-ai-rg`) containerized from [Enver/Dockerfile](file:///c:/Users/dbleg/OneDrive/Desktop/website/Enver/Dockerfile).
    *   **Target Custom Domain**: `enveraitech.com`.
*   **Security & Sanitization**:
    *   Strengthened root `.gitignore` to prevent any `.env*` or legacy leakage.
    *   Cleaned mock database connection strings in test docs.
    *   Organized legacy sessions and plan docs into `docs/history/`.
    *   Root `.vscode/mcp.json` initialized with Windows-safe `cmd.exe /c npx -y shadcn@latest mcp` command.

---

## Session Timestamp: 2026-10-01 — Decoupled Production Launch & Azure SWA Edge Deployment
*   **Active Persona**: Shorekeeper.
*   **Primary Directives**:
    *   Execute a decoupled website launch for Enver AI Tech ([enveraitech.com](https://enveraitech.com)).
    *   Deploy production static build to Microsoft Azure Static Web Apps under Founders Hub Sponsored credits.
    *   Design and deploy the Agent Console Gateway for priority pilot queue staging.
    *   Repair form delivery pipeline to ensure direct email notifications to founders with zero lead loss.
    *   Diagnose and resolve the HTTP 503 error on `enveraitech.com` via GoDaddy DNS cutover.
*   **Key Architecture Accomplishments**:
    1.  **Azure Static Web Apps Deployment**:
        *   Resource Group: `rg-enveraitech-prod` (Subscription: `c5ba51bd-ad7c-4e15-8199-bbc045d607de`, `Azure subscription 1`).
        *   App: `enveraitech-web` (SKU: `Standard`, Region: `East Asia` control plane, worldwide Anycast Edge CDN).
        *   Default Hostname: [https://nice-meadow-010692200.5.azurestaticapps.net](https://nice-meadow-010692200.5.azurestaticapps.net).
        *   Edge Routing & Headers: Configured in `staticwebapp.config.json` with strict CSP, HSTS, frame options, and SPA fallback routes.
    2.  **Decoupled Agent Gateway (`/playground`, `/signup`)**:
        *   Implemented `client/src/pages/AgentGateway.tsx` to handle decoupled launch state.
        *   Visitors attempting to access the agent console are welcomed to the Enver AI Sovereign Agent Cloud priority staging queue.
        *   Generates cryptographic queue tickets (`ENV-PRD-XXXX`), captures registrant contact and company details, and dispatches directly to founders.
        *   Displays live cluster deployment telemetry (Quantum Arbiter, Sovereign Enclave, RBI Financial Engine) and auto-returns visitors to the home portal in 10s with pause/resume controls.
        *   Maintains internal team preview access via `?access=root` or `?preview=true` to access the full 3D Neuv deliberation console.
    3.  **Form & Lead Delivery Pipeline**:
        *   Diagnosed and repaired legacy Formspree endpoint (`mqaejydz`) returning 404 Form Not Found errors.
        *   Integrated FormSubmit AJAX pipeline targeting `hanabi@enveraitech.com` (CC `amaan@enveraitech.com`).
        *   Added persistent browser storage caching (`enver_inquiries` / `enver_pilot_queue_token`) so inquiries are safely stored locally even during network drops.
        *   Tested live end-to-end: `/contact` successfully transmits inquiry and transitions cleanly to `/thank-you`.
    4.  **DNS Cutover & 503 Resolution**:
        *   Root Cause: GoDaddy nameservers (`ns45.domaincontrol.com` / `ns46.domaincontrol.com`) were routing `enveraitech.com` to abandoned Google Cloud/Firebase IP addresses (216.239.36.21, etc.) that responded with HTTP 503 Service Unavailable.
        *   Resolution: Generated Azure custom domain validation TXT token (`_muk37rt7gdhfj59fni4v3jun1dnu2ux`), created CNAME alias to `nice-meadow-010692200.5.azurestaticapps.net`, and purged obsolete Google A/AAAA records.
    5.  **Microsoft Entra ID Authentication**:
        *   Configured App Registration `Enver AI` (Client ID: `6cae09cb-4819-4ddc-8a98-13c5c7bf58ec`, Tenant: `bda1a0ee-c558-4d13-a112-18b2d8d1deba`).
        *   Registered authorized production redirect URIs for Azure SWA and custom domain callbacks.
    6.  **Security & Zero Secrets Exposure**:
        *   Audited all bundles to verify zero private environment variables (`RESEND_API_KEY`, Azure secrets) are exposed to client JavaScript.
        *   Confirmed production deployment only serves static client assets from `./dist/public`.


