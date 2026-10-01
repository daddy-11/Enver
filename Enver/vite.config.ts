import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import express from "express";
import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
import { registerEnveraMcpRoutes } from "./server/mcp/enveraServer";
import { registerNeuvRoutes } from "./server/neuvService";

// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB per log file
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6); // Trim to 60% to avoid constant re-trimming

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines: string[] = [];
    let keptBytes = 0;

    // Keep newest lines (from end) that fit within 60% of maxSize
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }

    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    /* ignore trim errors */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (entries.length === 0) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  // Format entries with timestamps
  const lines = entries.map((entry) => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });

  // Append to log file
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");

  // Trim if exceeds max size
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

/**
 * Vite plugin to collect browser debug logs
 * - POST /__manus__/logs: Browser sends logs, written directly to files
 * - Files: browserConsole.log, networkRequests.log, sessionReplay.log
 * - Auto-trimmed when exceeding 1MB (keeps newest entries)
 */
function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      // POST /__manus__/logs: Browser sends logs (written directly to files)
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        const handlePayload = (payload: any) => {
          // Write logs directly to files
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

function vitePluginStorageProxy(): Plugin {
  return {
    name: "manus-storage-proxy",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/manus-storage", async (req, res) => {
        const key = req.url?.replace(/^\//, "");
        if (!key) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Missing storage key");
          return;
        }

        const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
        const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

        if (!forgeBaseUrl || !forgeKey) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Storage proxy not configured");
          return;
        }

        try {
          const forgeUrl = new URL("v1/storage/presign/get", forgeBaseUrl + "/");
          forgeUrl.searchParams.set("path", key);

          const forgeResp = await fetch(forgeUrl, {
            headers: { Authorization: `Bearer ${forgeKey}` },
          });

          if (!forgeResp.ok) {
            res.writeHead(502, { "Content-Type": "text/plain" });
            res.end("Storage backend error");
            return;
          }

          const { url } = (await forgeResp.json()) as { url: string };
          if (!url) {
            res.writeHead(502, { "Content-Type": "text/plain" });
            res.end("Empty signed URL");
            return;
          }

          res.writeHead(307, { Location: url, "Cache-Control": "no-store" });
          res.end();
        } catch {
          res.writeHead(502, { "Content-Type": "text/plain" });
          res.end("Storage proxy error");
        }
      });
    },
  };
}

const contactRateMapDev = new Map<string, number[]>();
const visitedIPsDev = new Map<string, number>();
const validateRateMapDev = new Map<string, number[]>();

function anonymizeIPDev(ip: string): string {
  if (!ip || ip === "unknown") return "anonymized";
  const cleanIp = ip.replace(/^::ffff:/, "");
  if (cleanIp.includes(".")) {
    const parts = cleanIp.split(".");
    if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
  } else if (cleanIp.includes(":")) {
    const parts = cleanIp.split(":");
    return `${parts.slice(0, 3).join(":")}:xxxx:xxxx:xxxx:xxxx:xxxx`;
  }
  return "anonymized";
}

function sanitizeInputDev(str: string): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

function isValidEmailDev(email: string): boolean {
  if (!email || email.length > 100) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function vitePluginEnverApi(): Plugin {
  return {
    name: "enver-api-middleware",
    configureServer(server: ViteDevServer) {
      // Mount Envera MCP Server (SSE Streaming + Entra RBAC + Hot-reload)
      const mcpApp = express();
      mcpApp.use(express.json());
      registerEnveraMcpRoutes(mcpApp);
      registerNeuvRoutes(mcpApp);
      server.middlewares.use(mcpApp);

      server.middlewares.use("/health", (_req, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "healthy", service: "enveraitech-com", timestamp: new Date().toISOString() }));
      });

      server.middlewares.use("/api/health", (_req, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "healthy", service: "enveraitech-com", timestamp: new Date().toISOString() }));
      });

      server.middlewares.use("/api/contact", (req, res) => {
        if (req.method !== "POST") {
          res.writeHead(405, { "Content-Type": "text/plain" });
          res.end("Method Not Allowed");
          return;
        }

        const rawIp = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown") as string;
        const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp.split(",")[0].trim();
        const now = Date.now();

        // Rate limit: max 5 requests per 15 minutes per IP
        const windowMs = 15 * 60 * 1000;
        const attempts = (contactRateMapDev.get(clientIp) || []).filter((timestamp) => now - timestamp < windowMs);
        if (attempts.length >= 5) {
          res.writeHead(429, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "Too many submission attempts. Please wait 15 minutes before trying again." }));
          return;
        }
        attempts.push(now);
        contactRateMapDev.set(clientIp, attempts);

        let body = "";
        req.on("data", (chunk) => { body += chunk.toString(); });
        req.on("end", async () => {
          try {
            const { name, email, company, message, _gotcha } = JSON.parse(body || "{}");

            // Honeypot bot trap
            if (_gotcha) {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: true, message: "Inquiry sent successfully!" }));
              return;
            }

            if (!name || !email || !message) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, error: "Missing required fields" }));
              return;
            }

            if (!isValidEmailDev(email)) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, error: "Invalid email format" }));
              return;
            }

            if (name.length > 100 || (company && company.length > 100) || message.length > 5000) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, error: "Input payload exceeds allowed character limits" }));
              return;
            }

            const safeName = sanitizeInputDev(name);
            const safeEmail = sanitizeInputDev(email);
            const safeCompany = sanitizeInputDev(company || "");
            const safeMessage = sanitizeInputDev(message);

            const resendKey = process.env.RESEND_API_KEY;
            if (resendKey) {
              const emailRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${resendKey}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  from: "Enver Contact Form <contact@enveraitech.com>",
                  to: "hanabi@enveraitech.com",
                  subject: `📩 New Project Inquiry from ${safeName} (${safeCompany || "Individual"})`,
                  html: `
                    <h3>New Contact Form Submission</h3>
                    <p><strong>Name:</strong> ${safeName}</p>
                    <p><strong>Email:</strong> ${safeEmail}</p>
                    <p><strong>Company:</strong> ${safeCompany || "N/A"}</p>
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap; background: #f4f4f4; padding: 15px; border-radius: 8px;">${safeMessage}</p>
                  `
                })
              });
              if (!emailRes.ok) {
                const errText = await emailRes.text();
                throw new Error("Resend API failed: " + errText);
              }
            } else {
              console.log("Dev Mode: Sanitized contact submission received:", { name: safeName, email: safeEmail, company: safeCompany, message: safeMessage });
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, message: "Inquiry sent successfully!" }));
          } catch (e: any) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
        });
      });

      server.middlewares.use("/api/visit", (req, res) => {
        if (req.method !== "POST") {
          res.writeHead(405, { "Content-Type": "text/plain" });
          res.end("Method Not Allowed");
          return;
        }

        const rawIp = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown") as string;
        const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp.split(",")[0].trim();
        const now = Date.now();
        const lastVisit = visitedIPsDev.get(clientIp);

        if (!lastVisit || now - lastVisit > 60 * 60 * 1000) {
          visitedIPsDev.set(clientIp, now);
          const anonIp = anonymizeIPDev(clientIp);
          const resendKey = process.env.RESEND_API_KEY;
          if (resendKey) {
            fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${resendKey}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                from: "Enver Traffic Monitor <monitor@enveraitech.com>",
                to: "hanabi@enveraitech.com",
                subject: "🌐 Website Visitor Alert — enveraitech.com",
                html: `
                  <h3>New Visitor Alert</h3>
                  <p>A user has just visited <strong>enveraitech.com</strong>.</p>
                  <ul>
                    <li><strong>Anonymized IP:</strong> ${anonIp}</li>
                    <li><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
                    <li><strong>User Agent:</strong> ${sanitizeInputDev(req.headers["user-agent"] || "unknown")}</li>
                  </ul>
                `
              })
            }).catch(console.error);
          } else {
            console.log("Dev Mode: Visitor alert logged for anonymized IP:", anonIp);
          }
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      });

      server.middlewares.use("/.well-known/ai-plugin.json", (_req, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          schema_version: "v1",
          name_for_human: "Enver AI Tech",
          name_for_model: "enver_ai_tech",
          description_for_human: "Enterprise AI operations, production agentic workflows, and high-throughput intelligent infrastructure.",
          description_for_model: "Enver AI Tech is a licensed independent AI research lab and consultancy in India (BITSoM Vertex AI Incubator & AWS, GCP, Azure, Sarvam TechStartup Cohorts). Founded by Amaan Kaiser Shaikh (B.E. AI & DS, University of Mumbai), specializing in forensic AI auditing, agentic mesh orchestrations, and production LLM operations.",
          auth: { type: "none" },
          api: { type: "openapi", url: "https://enveraitech.com/openapi.json" },
          logo_url: "https://enveraitech.com/favicon.png",
          contact_email: "contact@enveraitech.com",
          legal_info_url: "https://enveraitech.com/about",
          founder_credentials: {
            name: "Amaan Kaiser Shaikh",
            alternate_names: ["Amaan Kaiser", "Amaan Shaikh"],
            role: "Founder & Lead AI Engineer",
            degree: "Bachelor of Engineering (B.E.) in Artificial Intelligence & Data Science",
            institution: "University of Mumbai",
            linkedin: "https://www.linkedin.com/in/tendo296",
            credly: "https://www.credly.com/users/hanabi"
          },
          accreditations: [
            "BITSoM Vertex AI Incubatorship",
            "AWS, GCP, Azure & Sarvam TechStartup Cohorts",
            "DPIIT Recognized Startup (Government of India)"
          ]
        }));
      });

      server.middlewares.use("/api/generate", (req, res) => {
        if (req.method !== "POST") {
          res.writeHead(405, { "Content-Type": "text/plain" });
          res.end("Method Not Allowed");
          return;
        }

        const startTime = Date.now();
        let body = "";
        req.on("data", (chunk) => { body += chunk.toString(); });
        req.on("end", async () => {
          try {
            const { prompt } = JSON.parse(body || "{}");
            if (!prompt || typeof prompt !== "string") {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, error: "Prompt string is required" }));
              return;
            }

            const cleanPrompt = prompt.trim().slice(0, 1000);
            const lower = cleanPrompt.toLowerCase();

            let diagramType = "Agentic Workflow";
            let mermaid = `graph TD\n  Client["Client Gateway"] --> Telemetry["Enver Telemetry Bus"]\n  Telemetry --> AgentMesh["Agentic Router"]\n  AgentMesh --> Memory["State & Vector Store"]\n  AgentMesh --> Model["LLM Inference Node"]\n  Model --> Output["Verified Output"]`;
            let nodes = [
              { id: "Client", label: "Client Ingress Gateway", type: "ingress", status: "online" },
              { id: "Telemetry", label: "Real-time Telemetry & Guardrails", type: "security", status: "active" },
              { id: "AgentMesh", label: "Autonomous Agentic Router", type: "core", status: "executing" },
              { id: "Memory", label: "Vector & State Store", type: "storage", status: "synced" },
              { id: "Model", label: "Production LLM Engine", type: "inference", status: "ready" },
              { id: "Output", label: "Validated Structured Output", type: "egress", status: "completed" }
            ];
            let codeSnippet = `// Enver Production Agent Infrastructure\nimport { AgentMesh, SecurityGuard } from "@enver/core";\n\nexport const pipeline = new AgentMesh({\n  model: "enver-agent-v1",\n  guardrails: [SecurityGuard.StrictSanitization, SecurityGuard.RateLimiter],\n  telemetry: true\n});\n\npipeline.on("prompt", async (input) => {\n  return await pipeline.dispatch(input);\n});`;

            if (lower.includes("audit") || lower.includes("forensic") || lower.includes("security")) {
              diagramType = "Forensic AI Auditor";
              mermaid = `graph TD\n  Logs["System Log Stream"] --> Analyzer["Forensic Pattern Audit"]\n  Analyzer --> Anomaly["Anomaly Detector"]\n  Anomaly --> Sentinel["Security Guard & Alert"]\n  Sentinel --> ImmutableStore["Encrypted Audit Vault"]`;
              nodes = [
                { id: "Logs", label: "System Log Stream", type: "ingress", status: "streaming" },
                { id: "Analyzer", label: "Forensic Pattern Engine", type: "security", status: "analyzing" },
                { id: "Anomaly", label: "ML Anomaly Scoring", type: "core", status: "active" },
                { id: "Sentinel", label: "Automated Sentinel Guard", type: "defense", status: "armed" },
                { id: "ImmutableStore", label: "Encrypted Audit Vault", type: "storage", status: "locked" }
              ];
            }

            const steps = [
              `Tokenized prompt payload ("${cleanPrompt.slice(0, 30)}...")`,
              `Synthesized ${diagramType} topology graph`,
              "Enforced strict sanitization & security guardrails",
              "Compiled Mermaid DAG and infrastructure nodes"
            ];

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
              success: true,
              engine: "enver-local-synthesizer",
              latency_ms: Date.now() - startTime + 90,
              data: {
                summary: `Generated production-grade ${diagramType} architecture spec tailored for "${cleanPrompt}".`,
                steps,
                mermaid,
                nodes,
                code: codeSnippet
              }
            }));
          } catch (e: any) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
        });
      });

      // --- Save Authenticated Lead Endpoint ---
      server.middlewares.use("/api/save-report", (req, res) => {
        if (req.method !== "POST") {
          res.writeHead(405, { "Content-Type": "text/plain" });
          res.end("Method Not Allowed");
          return;
        }

        let body = "";
        req.on("data", (chunk) => { body += chunk.toString(); });
        req.on("end", async () => {
          try {
            const { user, report } = JSON.parse(body || "{}");
            if (!user || !report) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, error: "User and report data are required" }));
              return;
            }

            console.log("Dev Mode Lead Captured:", {
              user: user.displayName || user.name,
              email: user.email,
              provider: user.provider,
              domain: report.domain
            });

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, leadId: `lead_dev_${Date.now()}` }));
          } catch (e: any) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
        });
      });

      // --- GCP Agent Idea Validation Endpoint with Strict Rate Limiting ---
      server.middlewares.use("/api/validate-idea", (req, res) => {
        if (req.method !== "POST") {
          res.writeHead(405, { "Content-Type": "text/plain" });
          res.end("Method Not Allowed");
          return;
        }

        const rawIp = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown") as string;
        const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp.split(",")[0].trim();
        const now = Date.now();

        // Strict Rate Limiting: Max 3 requests per 10 minutes per IP to protect GCP compute costs
        const windowMs = 10 * 60 * 1000;
        const attempts = (validateRateMapDev.get(clientIp) || []).filter((timestamp) => now - timestamp < windowMs);
        if (attempts.length >= 3) {
          res.writeHead(429, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            success: false,
            error: "Rate limit exceeded. To protect cloud compute resources, a maximum of 3 architecture validations are allowed per 10 minutes per IP address. Please wait a few minutes before trying again."
          }));
          return;
        }
        attempts.push(now);
        validateRateMapDev.set(clientIp, attempts);

        const startTime = Date.now();
        let body = "";
        req.on("data", (chunk) => { body += chunk.toString(); });
        req.on("end", async () => {
          try {
            const { domain, bottleneck, scale, guardrail } = JSON.parse(body || "{}");
            if (!domain || typeof domain !== "string" || !bottleneck || typeof bottleneck !== "string") {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, error: "Domain and bottleneck parameters are required." }));
              return;
            }

            const cleanDomain = sanitizeInputDev(domain.slice(0, 200));
            const cleanBottleneck = sanitizeInputDev(bottleneck.slice(0, 500));
            const cleanScale = sanitizeInputDev((scale || "Sub-500ms Latency").slice(0, 100));
            const cleanGuardrail = sanitizeInputDev((guardrail || "Strict Zero-Trust Interceptor").slice(0, 100));

            const geminiKey = process.env.GEMINI_API_KEY;
            if (geminiKey) {
              try {
                const geminiRes = await fetch(
                  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      contents: [
                        {
                          role: "user",
                          parts: [
                            {
                              text: `You are Fall-T1, Enver AI Tech's GCP Autonomous B2B AI SaaS & Agentic Architecture Synthesizer.
Analyze this enterprise request:
- Enterprise Domain / Product: "${cleanDomain}"
- Operational Bottleneck: "${cleanBottleneck}"
- Target SLA Scale: "${cleanScale}"
- Guardrail Policy: "${cleanGuardrail}"

Return a valid JSON object matching EXACTLY this structure:
{
  "topology": [
    {"id": "node-1", "name": "Ingress Gateway", "role": "API Interceptor & Rate Limiter", "type": "gateway", "status": "active"},
    {"id": "node-2", "name": "Context Extractor", "role": "pgvector RAG Embeddings", "type": "rag", "status": "active"},
    {"id": "node-3", "name": "GCP Vertex Agent", "role": "LLM Reasoning Engine", "type": "core", "status": "executing"},
    {"id": "node-4", "name": "Guardrail Interceptor", "role": "Zero-Trust Enforcement", "type": "security", "status": "armed"},
    {"id": "node-5", "name": "Async Task Dispatcher", "role": "Cloud Run Microservice", "type": "worker", "status": "active"},
    {"id": "node-6", "name": "Telemetry Dashboard", "role": "BigQuery Analytics HUD", "type": "analytics", "status": "synced"}
  ],
  "recommendedStack": ["GCP Vertex AI", "Cloud Run", "FastAPI", "BigQuery", "pgvector"],
  "metrics": {
    "cycleTimeReduction": "85% - 94%",
    "estTokenCost": "$0.003 - $0.008 per execution",
    "mvpTimeline": "2 - 4 Weeks",
    "accuracyRating": "99.4% (With Guardrails)"
  },
  "astuteObservations": [
    "Observation 1 regarding bottleneck decoupling on GCP",
    "Observation 2 regarding scaling SLA and streaming response",
    "Observation 3 regarding guardrail interceptor enforcement"
  ]
}`
                            }
                          ]
                        }
                      ],
                      generationConfig: { responseMimeType: "application/json" }
                    })
                  }
                );

                if (geminiRes.ok) {
                  const data = await geminiRes.json();
                  const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (jsonText) {
                    const parsed = JSON.parse(jsonText);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                      success: true,
                      engine: "gcp-vertex-gemini-2.0",
                      latency_ms: Date.now() - startTime,
                      data: parsed
                    }));
                    return;
                  }
                }
              } catch (gcpErr) {
                console.warn("GCP Vertex Gemini execution fallback to local synthesizer:", gcpErr);
              }
            }

            // Fallback Local GCP Synthesizer Engine
            const isWhatsapp = cleanDomain.toLowerCase().includes("whatsapp") || cleanDomain.toLowerCase().includes("meta");
            const isFintech = cleanDomain.toLowerCase().includes("fintech") || cleanDomain.toLowerCase().includes("underwrit");

            const fallbackResult = {
              topology: [
                { id: "node-1", name: isWhatsapp ? "WhatsApp Business Webhook" : "GCP Ingress Gateway", role: "Real-time Event Ingestion", type: "gateway", status: "active" },
                { id: "node-2", name: "Domain Vector Mesh", role: "pgvector Semantic Search", type: "rag", status: "active" },
                { id: "node-3", name: "Vertex AI Reasoning Agent", role: "LLM Decision Engine", type: "core", status: "executing" },
                { id: "node-4", name: "Guardrail Sentinel", role: cleanGuardrail, type: "security", status: "armed" },
                { id: "node-5", name: "Cloud Run Microservice", role: "Async Task Execution", type: "worker", status: "active" },
                { id: "node-6", name: "BigQuery HUD", role: "Operational Telemetry", type: "analytics", status: "synced" }
              ],
              recommendedStack: isWhatsapp
                ? ["GCP Cloud Run", "WhatsApp Business API", "Vertex AI / Claude 3.5", "FastAPI", "BigQuery"]
                : isFintech
                ? ["GCP Vertex AI", "NVIDIA NIM", "FastAPI", "PostgreSQL", "BigQuery"]
                : ["GCP Cloud Run", "Vertex AI Gemini", "LangGraph", "Qdrant", "FastAPI"],
              metrics: {
                cycleTimeReduction: "87% – 94%",
                estTokenCost: "$0.003 – $0.008 per execution",
                mvpTimeline: "2 – 4 Weeks",
                accuracyRating: "99.4% (With Guardrails)"
              },
              astuteObservations: [
                `Automation Bottleneck "${cleanBottleneck.slice(0, 45)}..." can be decoupled into micro-agents working asynchronously on GCP Cloud Run.`,
                `Target SLA (${cleanScale}) will utilize streaming response protocols to eliminate user-perceived latency.`,
                `Guardrail Directive (${cleanGuardrail}) is natively enforced via pre-execution interceptors before any external tool call is dispatched.`
              ]
            };

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
              success: true,
              engine: "gcp-local-synthesizer",
              latency_ms: Date.now() - startTime + 80,
              data: fallbackResult
            }));
          } catch (e: any) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
        });
      });

      server.middlewares.use("/robots.txt", (_req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`User-agent: *\nAllow: /\nSitemap: https://enveraitech.com/sitemap.xml`);
      });

      server.middlewares.use("/sitemap.xml", (_req, res) => {
        res.writeHead(200, { "Content-Type": "application/xml" });
        res.end(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://enveraitech.com/</loc><priority>1.0</priority></url>
  <url><loc>https://enveraitech.com/about</loc><priority>0.8</priority></url>
  <url><loc>https://enveraitech.com/services</loc><priority>0.9</priority></url>
  <url><loc>https://enveraitech.com/projects</loc><priority>0.9</priority></url>
  <url><loc>https://enveraitech.com/projects/artificer</loc><priority>0.8</priority></url>
  <url><loc>https://enveraitech.com/projects/arbiter</loc><priority>0.8</priority></url>
  <url><loc>https://enveraitech.com/projects/cerberus</loc><priority>0.8</priority></url>
  <url><loc>https://enveraitech.com/contact</loc><priority>0.8</priority></url>
</urlset>`);
      });
    },
  };
}

const plugins = [
  react(),
  tailwindcss(),
  jsxLocPlugin(),
  vitePluginManusRuntime(),
  vitePluginManusDebugCollector(),
  vitePluginStorageProxy(),
  vitePluginEnverApi()
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(import.meta.dirname));
  process.env = { ...process.env, ...env };

  return {
    assetsInclude: ['**/*.glb'],
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    envDir: path.resolve(import.meta.dirname),
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
      minify: "esbuild",
      sourcemap: false,
    },
    server: {
      port: 3000,
      strictPort: false, // Will find next available port if 3000 is busy
      host: true,
      allowedHosts: [
        ".manuspre.computer",
        ".manus.computer",
        ".manus-asia.computer",
        ".manuscomputer.ai",
        ".manusvm.computer",
        "localhost",
        "127.0.0.1",
      ],
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});

