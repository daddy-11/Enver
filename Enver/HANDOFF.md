# Enver AI Tech — Technical Handoff & Architecture Dossier

**Production Domain**: [https://enveraitech.com](https://enveraitech.com)  
**Edge CDN Endpoint**: [https://nice-meadow-010692200.5.azurestaticapps.net](https://nice-meadow-010692200.5.azurestaticapps.net)  
**Production Cloud Deployment**: Microsoft Azure Static Web Apps (Global Edge CDN) & Microsoft Entra ID  
**Incorporation & Recognition**: DPIIT Recognized Startup (**DIPP193082**), BITSoM Vertex AI Incubator, FITT IIT Delhi  

---

## 1. System Overview

Enver AI Tech is a production-grade enterprise AI Operations, Autonomous Engineering, and Sovereign Agent platform. Key subsystems:
1. **Envera Enterprise MCP Server (v2.0)**: Official Model Context Protocol server exposing real-time financial underwriting, multi-cloud AST firewalls, and dynamic dataset hot-reloading over persistent Server-Sent Events (SSE).
2. **Microsoft Entra External ID Gateway**: Zero-trust authentication with tenant isolation (`tid`), user identity auditing (`oid`), and team-exclusive authorization (`@enveraitech.com`).
3. **Unified 3D Playground Console (`/playground`)**: Interactive agent console featuring 3D particle sphere, ThoughtLine reasoning streaming, live MCP tool execution, and 1-click config exporter for Cursor & Claude Desktop.
4. **Artistic Oat Silk Design System**: Luxury layout with warm Oat Silk (`#F7F3E9`), Plum Wine (`#2B121F`), and Solar Amber (`#FF6F1E`).

---

## 2. Envera MCP Protocol Architecture

### Communication Protocol
- **Transport**: Server-Sent Events (SSE) over HTTPS.
- **Connect Stream**: `GET /mcp/sse` (Requires `Authorization: Bearer <Entra_Token>`).
- **Post Messages**: `POST /mcp/messages?sessionId=<id>`.
- **Status Endpoint**: `GET /api/mcp/status`.
- **Playground Exec Helper**: `POST /api/mcp/playground-exec`.

### Role-Based Access Control (RBAC)
- **Tenant Boundary (`tid`)**: Restricts queries so Tenant A can never retrieve Tenant B's data.
- **User Audit (`oid` / `sub`)**: Logged to Azure Application Insights with timestamp and latency for SOC 2 / ISO compliance.
- **Team Privilege Check (`email` / `roles`)**:
  - Gated Tool: `envera_deep_forensic_audit` requires a verified `@enveraitech.com` identity. Non-team callers receive a `403 FORBIDDEN` security notice.
  - Public Tool: `envera_public_overview` and `envera_ast_firewall_inspect` are accessible to authenticated tenants and public evaluators.

### Dynamic Dataset Invalidation (Hot-Reload)
When documentation updates in Azure Blob Storage:
1. Azure Event Grid triggers an Azure Function to chunk & embed into Azure AI Search.
2. The pipeline fires a webhook to `POST /api/mcp/webhook/dataset-updated`.
3. The MCP server emits `notifications/resources/updated` across all live SSE client connections.
4. Connected agents pull the latest context immediately without server redeployment.

---

## 3. Microsoft Azure Production Architecture & Deployment

1. **Host on Azure Static Web Apps (SWA)**:
   - **Service**: Azure Static Web Apps (`Standard` SKU, globally distributed Edge CDN).
   - **Resource Group**: `rg-enveraitech-prod` (Azure Subscription 1: `c5ba51bd-ad7c-4e15-8199-bbc045d607de`, Sponsored Founders Hub).
   - **Management Control Plane**: `East Asia` / Global Edge CDN.
   - **Default Hostname**: [https://nice-meadow-010692200.5.azurestaticapps.net](https://nice-meadow-010692200.5.azurestaticapps.net)
   - **Custom Domain**: `https://enveraitech.com` & `https://www.enveraitech.com`.
   - **Domain Validation TXT Token**: `_muk37rt7gdhfj59fni4v3jun1dnu2ux` (Host `@`).
   - **DNS Target**: CNAME to `nice-meadow-010692200.5.azurestaticapps.net`.

2. **Decoupled Architecture & Priority Gateway**:
   - **Decoupled Marketing Website**: Fast static delivery with 0ms cold starts, zero server costs, and global edge caching via `staticwebapp.config.json`.
   - **Agent Console Gateway**: `/playground` and `/signup` route to `AgentGateway.tsx`, capturing enterprise leads into a staged pilot queue (`ENV-PRD-XXXX`) and automatically returning visitors to the homepage.
   - **Internal Developer Access**: The live 3D Neuv deliberation console remains accessible to authorized team members using `?access=root` or `?preview=true`.

3. **Form Delivery & Lead Capture Pipeline**:
   - **Direct Inbox Delivery**: Inquiries on `/contact` and pilot registrations on `/playground` dispatch directly to `hanabi@enveraitech.com` (CC `amaan@enveraitech.com`) via FormSubmit.
   - **Durable Local Backup**: Inquiries and queue tokens are persisted in browser storage (`enver_inquiries` / `enver_pilot_queue_token`) so zero leads are dropped.

4. **Microsoft Entra ID / Azure AD Authentication**:
   - **App Registration**: `Enver AI`
   - **Application (Client) ID**: `6cae09cb-4819-4ddc-8a98-13c5c7bf58ec`
   - **Directory (Tenant) ID**: `bda1a0ee-c558-4d13-a112-18b2d8d1deba` (Default Domain: `enveraitech.com`)
   - **Configured Redirect URIs**:
     - `https://nice-meadow-010692200.5.azurestaticapps.net`
     - `https://nice-meadow-010692200.5.azurestaticapps.net/.auth/login/aad/callback`
     - `https://enveraitech.com`
     - `https://enveraitech.com/.auth/login/aad/callback`
     - `http://localhost:3000`

---

## 4. Local Verification & Operational Commands

```bash
# 1. Install dependencies
pnpm install

# 2. Start local development server (Vite + Envera MCP on http://localhost:3000)
npm run dev

# 3. Verify TypeScript compilation
npm run check

# 4. Build full production bundle (Vite + esbuild)
npm run build

# 5. Start production Node server
npm start
```

### Direct MCP Testing
```bash
# Check Envera status
curl http://localhost:3000/api/mcp/status

# Test AST Destructive Command Interception
curl -X POST http://localhost:3000/api/mcp/playground-exec \
  -H "Content-Type: application/json" \
  -d '{"toolName":"envera_ast_firewall_inspect","token":"demo-guest-token","args":{"terminalCommand":"DROP TABLE users;","targetCloud":"AZURE"}}'

# Test Forensic Underwriting as Team Member (@enveraitech.com)
curl -X POST http://localhost:3000/api/mcp/playground-exec \
  -H "Content-Type: application/json" \
  -d '{"toolName":"envera_deep_forensic_audit","token":"demo-team-token","args":{"accountId":"MSME-001"}}'
```

---

## 5. Handoff Verification Checklist

- [x] **Production Deployment**: Live on **Microsoft Azure Static Web Apps** ([nice-meadow-010692200.5.azurestaticapps.net](https://nice-meadow-010692200.5.azurestaticapps.net)) under Founders Hub Sponsored Subscription 1 (`c5ba51bd-ad7c-4e15-8199-bbc045d607de`).
- [x] **DNS & Custom Domain**: Mapped to `enveraitech.com` & `www.enveraitech.com` with TXT token `_muk37rt7gdhfj59fni4v3jun1dnu2ux`.
- [x] **Decoupled Agent Gateway**: `/playground` & `/signup` route to `AgentGateway.tsx`, capturing leads into enterprise staging queue with live countdown return to homepage. Internal root preview preserved via `?access=root`.
- [x] **Direct Inbox Delivery**: Forms on `/contact` and `/playground` deliver email alerts to `hanabi@enveraitech.com` (CC `amaan@enveraitech.com`).
- [x] **Microsoft Entra ID**: App Registration `Enver AI` (`6cae09cb-4819-4ddc-8a98-13c5c7bf58ec`) configured with production redirect URIs.
- [x] **Envera MCP Server** online with `@modelcontextprotocol/sdk` and SSE transport.
- [x] **Entra ID Claims & RBAC** active (`tid`, `oid`, `@enveraitech.com` domain check).
- [x] **Brand Assets Cleaned**: Transparent wordmark (`alphabet.png`), 512x512 master crest (`enver-enterprise-crest.png`), multi-res `favicon.ico`, and `apple-touch-icon.png`.
- [x] **Security Hardening**: Zero secrets exposed, strict CSP, HSTS, X-Frame-Options: DENY, and zero-eval math parser (`safeEvaluateArithmetic`).
- [x] **Build & Types**: `npx tsc --noEmit` 0 errors, `npm run build` succeeds cleanly.
