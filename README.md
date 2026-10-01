# Enver AI Tech — Enterprise AI Operations & Sovereign Agent Infrastructure

Official web portal and sovereign agent platform for **Enver AI Tech** ([enveraitech.com](https://enveraitech.com)).

[![Azure Static Web Apps](https://img.shields.io/badge/Deployed%20on-Azure%20Static%20Web%20Apps-0078D4?logo=microsoft-azure&logoColor=white)](https://nice-meadow-010692200.5.azurestaticapps.net)
[![Startup Recognition](https://img.shields.io/badge/DPIIT%20Recognized-DIPP193082-FF6F1E)](https://enveraitech.com)
[![Incubator](https://img.shields.io/badge/Incubator-BITSoM%20Vertex%20AI%20%7C%20FITT%20IIT%20Delhi-4F46E5)](https://enveraitech.com)
[![Authentication](https://img.shields.io/badge/Zero--Trust-Microsoft%20Entra%20ID-00A4EF?logo=microsoft)](https://entra.microsoft.com)

---

## 1. System Overview

Enver AI Tech builds deterministic, sovereign agent architectures for enterprise finance, multi-cloud governance, and automated software engineering.

* **Live Edge Hostname**: [https://nice-meadow-010692200.5.azurestaticapps.net](https://nice-meadow-010692200.5.azurestaticapps.net)
* **Production Custom Domain**: [https://enveraitech.com](https://enveraitech.com)
* **Azure Subscription**: `Azure subscription 1` (Founders Hub Sponsored Credits `c5ba51bd-ad7c-4e15-8199-bbc045d607de`)
* **Resource Group**: `rg-enveraitech-prod` (`enveraitech-web` in East Asia / Global CDN Edge)

---

## 2. Decoupled Launch Architecture

To ensure 100% uptime, zero cold starts, and immediate global availability while enterprise agent clusters are in production staging, Enver employs a **Decoupled Gateway Architecture**:

```
                                  [ Global Edge Traffic ]
                                             │
                                             ▼
                      ┌──────────────────────────────────────────────┐
                      │    Azure Static Web Apps (Edge Anycast)      │
                      │       staticwebapp.config.json               │
                      └──────┬────────────────────────────────┬──────┘
                             │                                │
                 [ Public Marketing Pages ]       [ Agent Console Routes ]
                 (/, /about, /projects, /contact)  (/playground, /signup)
                             │                                │
                             ▼                                ▼
                      ┌──────────────┐                 ┌──────────────────────┐
                      │ Fast Static  │                 │   AgentGateway.tsx   │
                      │ Oat Silk UI  │                 │ (Enterprise Waitlist)│
                      └──────────────┘                 └──────────┬───────────┘
                                                                  │
                                            ┌─────────────────────┴─────────────────────┐
                                            │                                           │
                                            ▼                                           ▼
                                 [ Pilot Registration ]                     [ Internal Root Bypass ]
                                  - Issue ENV-PRD-XXXX                       - ?access=root
                                  - Dispatch to Founders                     - Live 3D Neuv Console
                                  - 10s auto-return to Home                  - Dynamic MCP Streaming
```

1. **Edge-Cached Marketing Portal**: Instant sub-second delivery of all marketing routes, brand dossiers, and interactive SVG diagrams.
2. **Enterprise Agent Gateway (`/playground`, `/signup`)**:
   - Routes visitors to a priority staging registration modal.
   - Assigns a cryptographic queue ticket (e.g. `ENV-PRD-7492`).
   - Dispatches lead intelligence directly to founders' inboxes.
   - Displays real-time cluster rollout metrics and auto-navigates back to the homepage in 10s (with manual pause/cancel controls).
3. **Internal Team Access**: Authorized operators bypass staging via `?access=root` or `?preview=true` to test the live 3D Neuvlette particle deliberation console.

---

## 3. Flagship Autonomous Systems

1. **Artificer (MSME Underwriting Citadel)**:
   - Autonomous MSME financial statement parsing (< 105s TAT, $0.02 cost/file, 99.8% extraction accuracy).
   - "Math is the Model": 5 financial pillars computed deterministically in Python with zero probabilistic hallucination.
   - 100% RBI Digital Lending Certified with line-level statement citations and cryptographic SHA-256 locks.

2. **Arbiter (Multi-Cloud AST Destructive Firewall)**:
   - Intercepts compute provisioning and CLI terminal execution across AWS, GCP, and Azure.
   - Abstract Syntax Tree (AST) command sentinel blocks destructive drops (`DROP TABLE`, `rm -rf`, `truncate`).

3. **Cerberus (Zero-Trust Security & Git PR Sentinel)**:
   - Multi-dimensional Shannon entropy analysis combined with AST semantic filtering (< 1.2% false positives).
   - Audits commit-chain integrity, GPG signatures, and exports OASIS SARIF v2.1.0 compliance reports.

4. **Envera MCP Server (v2.0)**:
   - Official Model Context Protocol server exposing real-time financial underwriting, multi-cloud AST firewalls, and dynamic dataset hot-reloading over persistent Server-Sent Events (SSE).

---

## 4. Inquiries & Lead Capture Pipeline

All customer contact forms and priority agent pilot registrations dispatch directly to founder inboxes:

* **Primary Recipient**: `hanabi@enveraitech.com`
* **Executive CC**: `amaan@enveraitech.com`
* **Transport**: FormSubmit AJAX delivery (`https://formsubmit.co/ajax/hanabi@enveraitech.com`)
* **Client Redirection**: Automatic routing to `/thank-you` upon submission
* **Local Redundancy**: All submissions are cached in browser `localStorage` (`enver_inquiries` / `enver_pilot_queue_token`) to prevent lead loss under intermittent network connectivity

---

## 5. Security & Authentication Guardrails

* **Zero-Trust Identity**: Microsoft Entra ID App Registration `Enver AI` (Client ID: `6cae09cb-4819-4ddc-8a98-13c5c7bf58ec`, Tenant: `bda1a0ee-c558-4d13-a112-18b2d8d1deba`).
* **Secrets Isolation**: No environment variables or API keys (`RESEND_API_KEY`, Azure secrets) are packaged in client-facing bundles. Build pipelines only ship `./dist/public`.
* **Security Headers**: Enforced via `staticwebapp.config.json`:
  - `Content-Security-Policy`: Modern script, style, and connect directives.
  - `Strict-Transport-Security`: `max-age=31536000; includeSubDomains; preload`
  - `X-Frame-Options`: `DENY`
  - `X-Content-Type-Options`: `nosniff`
  - `Referrer-Policy`: `strict-origin-when-cross-origin`

---

## 6. Repository Layout

```
website/
├── Enver/                     # Primary Production Web Application
│   ├── client/                # React SPA (TypeScript + Tailwind CSS + Lucide)
│   │   ├── src/pages/         # Home, About, Projects, Contact, AgentGateway, ThankYou
│   │   └── public/            # High-res logos, favicons, staticwebapp.config.json
│   ├── server/                # Node / Express / Envera MCP SSE Backend
│   ├── shared/                # Common schemas, types, and validation models
│   ├── dist/                  # Production build output
│   ├── HANDOFF.md             # Complete technical architecture & handoff dossier
│   └── README.md              # Enver app documentation & MCP API guide
├── docs/                      # Brand assets, specs, and historical archives
│   ├── BRAND_ASSETS.md        # Typography, palette, and SVG specifications
│   └── history/               # Archived planning documents and audits
├── SHOREKEEPER.md             # Core memory bank and persistent agent directives
├── Archive.md                 # Chronological session logs and infrastructure state
└── README.md                  # This root documentation file
```

---

## 7. Local Development & Deployment

```bash
# Navigate to the core application
cd Enver

# Install dependencies
pnpm install

# Start local dev server (Vite on http://localhost:3000)
npm run dev

# Run TypeScript type check (0 errors)
npm run check

# Build production bundle
npm run build

# Deploy to Azure Static Web Apps (using SWA CLI)
npx @azure/static-web-apps-cli deploy ./dist/public \
  --app-name enveraitech-web \
  --resource-group rg-enveraitech-prod \
  --env production
```
