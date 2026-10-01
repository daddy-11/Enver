# Enver AI Tech (enveraitech.com)

Enterprise AI Operations, Autonomous Engineering & Sovereign Agent Infrastructure for **Enver AI Tech** ([enveraitech.com](https://enveraitech.com)).

**Production Domain**: [https://enveraitech.com](https://enveraitech.com)  
**Incorporation & Recognition**: DPIIT Recognized Startup (**DIPP193082**), BITSoM Vertex AI Incubator, FITT IIT Delhi.

---

## 1. Envera Enterprise MCP Server (v2.0)

Enver ships a production-grade **Model Context Protocol (MCP)** server named **Envera**, built using the official `@modelcontextprotocol/sdk` with persistent Server-Sent Events (SSE) streaming and zero-trust Microsoft Entra ID authentication.

```
                           ┌──────────────────────────────────────────────┐
                           │          External MCP Host Clients           │
                           │   (Claude Desktop / Cursor / Copilot)        │
                           └──────────────────────┬───────────────────────┘
                                                  │
                                                  ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        ENVERA MCP SERVER (Azure Container Apps)                        │
│                                                                                        │
│  [ Transport & Session Layer ]                                                         │
│    ├── GET  /mcp/sse                      -> Persistent SSE Stream                     │
│    └── POST /mcp/messages?sessionId=<id>  -> Bidirectional JSON-RPC Messages          │
│                                                                                        │
│  [ Microsoft Entra ID Claims & Authorization Gate ]                                    │
│    ├── tid: Hard multi-tenant partition (Tenant A ≠ Tenant B)                          │
│    ├── oid/sub: User ID recorded in Application Insights audit trail                   │
│    └── email / roles: @enveraitech.com ? Full Deep Forensics : Sandbox Preview         │
│                                                                                        │
│  [ Exposed MCP Resources & Tools ]                                                     │
│    ├── 📚 envera://kb/underwriting-rules           (Dynamic RAG Context)               │
│    ├── 📚 envera://kb/cloud-governance-policies    (Arbiter AST Rules)                 │
│    ├── ⚙️  envera_public_overview                  (Public Access)                     │
│    ├── 🛡️  envera_deep_forensic_audit              (Restricted to @enveraitech.com)    │
│    ├── ⚡  envera_ast_firewall_inspect             (Prohibits DROP TABLE / rm -rf)     │
│    └── ⚡  envera_update_policy                    (Enver.Admin Role Required)         │
│                                                                                        │
│  [ Hot Invalidation Webhook Handler ]                                                  │
│    └── POST /api/mcp/webhook/dataset-updated                                           │
│          └── Emits notifications/resources/updated across all live SSE sessions        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Endpoints
- **SSE Stream**: `GET /mcp/sse` (Requires `Authorization: Bearer <Entra_Token>`)
- **JSON-RPC Messages**: `POST /mcp/messages?sessionId=<id>`
- **Status & Telemetry**: `GET /api/mcp/status`
- **Playground Exec Helper**: `POST /api/mcp/playground-exec`
- **Dynamic Hot-Reload Webhook**: `POST /api/mcp/webhook/dataset-updated`

---

## 2. Platform Architecture & Flagship Systems

1. **Artificer (MSME Underwriting Citadel)**:
   - Autonomous MSME financial statement parsing (< 105s TAT, $0.02 cost/file, 99.8% extraction accuracy).
   - "Math is the Model": 5 financial pillars computed deterministically in Python with zero probabilistic hallucination.
   - 100% RBI Digital Lending Certified with line-level statement citations and cryptographic SHA-256 locks.

2. **Arbiter (Multi-Cloud AST Destructive Firewall)**:
   - Intercepts compute provisioning and CLI terminal execution across AWS, GCP, and Azure via ChatOps.
   - Abstract Syntax Tree (AST) command sentinel blocks destructive drops (`DROP TABLE`, `rm -rf`, `truncate`).

3. **Cerberus (Zero-Trust Security & Git PR Sentinel)**:
   - Multi-dimensional Shannon entropy analysis combined with AST semantic filtering (< 1.2% false positives).
   - Audits commit-chain integrity, GPG signatures, and exports OASIS SARIF v2.1.0 compliance reports.

4. **Sovereign Private Enclaves**:
   - Packaged containerized micro-VMs that deploy directly inside client VPCs with zero external egress.

---

## 3. Brand Assets & Visual Identity

All master brand marks feature clean transparent alpha channels with antialiased perimeters:

| Asset | File Path | Resolution / Format | Notes |
| :--- | :--- | :--- | :--- |
| **Official Wordmark** | [`client/public/alphabet.png`](file:///c:/Users/dbleg/OneDrive/Desktop/website/Enver/client/public/alphabet.png) | 480×120 (PNG) | Transparent background, crisp typography |
| **Enterprise Crest** | [`client/public/enver-enterprise-crest.png`](file:///c:/Users/dbleg/OneDrive/Desktop/website/Enver/client/public/enver-enterprise-crest.png) | 512×512 (PNG) | Master circular disc, transparent corners, plum drop shadow |
| **Browser Favicon** | [`client/public/favicon.png`](file:///c:/Users/dbleg/OneDrive/Desktop/website/Enver/client/public/favicon.png) | 512×512 (PNG) | Crisp circular emblem for modern browser tabs |
| **Multi-Res Icon** | [`client/public/favicon.ico`](file:///c:/Users/dbleg/OneDrive/Desktop/website/Enver/client/public/favicon.ico) | 16/32/48px (ICO) | Legacy and desktop browser compatibility |
| **Apple Touch Icon** | [`client/public/apple-touch-icon.png`](file:///c:/Users/dbleg/OneDrive/Desktop/website/Enver/client/public/apple-touch-icon.png) | 180×180 (PNG) | iOS bookmarks and home screen shortcuts |

---

## 4. Local Development & Operational Commands

```bash
# 1. Install dependencies
pnpm install

# 2. Start local development server (Vite + MCP endpoints on http://localhost:3000)
npm run dev

# 3. Check TypeScript compilation (0 errors guaranteed)
npm run check

# 4. Build full production bundle (Vite SPA + Node esbuild server)
npm run build

# 5. Start production Node server
npm start
```

---

## 5. Live MCP Verification Commands

```bash
# Check Envera MCP server status and active tools
curl http://localhost:3000/api/mcp/status

# Test AST Destructive Command Interception
curl -X POST http://localhost:3000/api/mcp/playground-exec \
  -H "Content-Type: application/json" \
  -d '{"toolName":"envera_ast_firewall_inspect","token":"demo-guest-token","args":{"terminalCommand":"DROP TABLE users;","targetCloud":"AZURE"}}'

# Test Forensic Underwriting (Team vs Guest)
curl -X POST http://localhost:3000/api/mcp/playground-exec \
  -H "Content-Type: application/json" \
  -d '{"toolName":"envera_deep_forensic_audit","token":"demo-team-token","args":{"accountId":"MSME-001"}}'

# Simulate Azure Function Ingestion Webhook (Hot-Reload)
curl -X POST http://localhost:3000/api/mcp/webhook/dataset-updated \
  -H "Content-Type: application/json" \
  -H "x-enver-webhook-secret: enver-live-webhook-secret" \
  -d '{"updatedUri":"envera://kb/underwriting-rules","newVersion":"2026.10-live"}'
```

## 6. Playground Interface: Neuv Persona & Visual Architecture

The Playground at `/playground` is designed with the **Neuvillette (Neuv)** persona and inspired by the minimalist, spacious **UNI Cards** layout architecture:

* **Persona**: Codenamed `neuv`, sampling temperature `0.5`, role **Chief Research Arbiter**. Tone is composed, judicial, impartial, and grounded strictly in empirical evidence and mathematical invariants (zero fantasy elements).
* **Color Identity**: Dedicated **Tranquil White** (`#F5FAFC`) and **Light Pond Blue** (`#38BDF8`, `#0284C7`), completely replacing the homepage's Oat Silk and Saffron. Supports both a Tranquil Daylight mode and a Nocturnal Pond depth mode.
* **Layout**:
  - **Left**: Bold, uncluttered typography, crisp premise, pill CTA buttons, fluid prompt capsule, and a single structured ruling card with `<ThoughtLine />` breath pulse.
  - **Right**: 3 floating 3D luminous pond-blue Thinking Orbs, diagonal velocity laser lines, and an interactive 3D tilted Envera Sovereign Dossier Card with real-time mouse parallax.

---

## 7. Azure Production Deployment & Edge Infrastructure

The production website is deployed on **Microsoft Azure Static Web Apps** with worldwide Edge CDN caching:

* **Live Azure Hostname**: [https://nice-meadow-010692200.5.azurestaticapps.net](https://nice-meadow-010692200.5.azurestaticapps.net)
* **Custom Production Domain**: [https://enveraitech.com](https://enveraitech.com)
* **Resource Group**: `rg-enveraitech-prod` (Azure Subscription 1: `c5ba51bd-ad7c-4e15-8199-bbc045d607de`)
* **Decoupled Architecture**: Public visitors accessing `/playground` or `/signup` arrive at the lightweight `AgentGateway` capturing pilot registrations into a staged enterprise queue and redirecting them safely back to the website. Full 3D Neuv playground is isolated for authorized internal review via `?access=root`.
* **Lead Delivery**: Inquiries on `/contact` and pilot requests on `/playground` deliver direct email alerts to `hanabi@enveraitech.com` (CC `amaan@enveraitech.com`) with local browser caching.
* **Microsoft Entra ID**: App Registration `Enver AI` (Client ID: `6cae09cb-4819-4ddc-8a98-13c5c7bf58ec`, Tenant: `bda1a0ee-c558-4d13-a112-18b2d8d1deba`).


