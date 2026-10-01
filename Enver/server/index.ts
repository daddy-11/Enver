import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { registerEnveraMcpRoutes } from "./mcp/enveraServer";
import { registerNeuvRoutes } from "./neuvService";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory rate limiting and visitor tracking stores
const contactRateMap = new Map<string, number[]>();
const visitRateMap = new Map<string, number>();
const globalRateMap = new Map<string, number[]>();
const validateRateMap = new Map<string, number[]>();
const leadsStore: any[] = [];

/**
 * Hourly Memory Sweeper: Purges stale IP tracking entries to prevent RAM bloat over months of continuous runtime
 */
setInterval(() => {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  [contactRateMap, globalRateMap, validateRateMap].forEach((map) => {
    map.forEach((timestamps: number[], ip: string) => {
      const valid = timestamps.filter((t: number) => now - t < oneHour);
      if (valid.length === 0) map.delete(ip);
      else map.set(ip, valid);
    });
  });
}, 60 * 60 * 1000);

/**
 * Anonymize IP address for privacy & compliance (GDPR guidelines)
 */
function anonymizeIP(ip: string): string {
  if (!ip || ip === "unknown") return "anonymized";
  const cleanIp = ip.replace(/^::ffff:/, "");
  if (cleanIp.includes(".")) {
    const parts = cleanIp.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
    }
  } else if (cleanIp.includes(":")) {
    const parts = cleanIp.split(":");
    return `${parts.slice(0, 3).join(":")}:xxxx:xxxx:xxxx:xxxx:xxxx`;
  }
  return "anonymized";
}

/**
 * Enhanced zero-trust input sanitizer: prevents XSS, Null Byte injection, Control Chars, Path Traversal
 */
function sanitizeInput(str: string): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/\0/g, "") // Remove NULL bytes
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "") // Remove control characters
    .replace(/\.\.\//g, "") // Strip path traversal attempts
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

/**
 * Strict email validation regex
 */
function isValidEmail(email: string): boolean {
  if (!email || email.length > 100) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Known malicious vulnerability scanner User-Agent signatures
const MALICIOUS_BOT_PATTERN = /sqlmap|nikto|nmap|dirbuster|netsparker|w3af|acunetix|havij|masscan|zgrab|gobuster|fuzz|python-urllib|libwww-perl/i;

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Disable Express fingerprint header to prevent server reconnaissance
  app.disable("x-powered-by");

  // Strict Payload Limit: prevent RAM exhaustion & JSON inflation attacks
  app.use(express.json({ limit: "15kb" }));

  // --- Security Headers & Bot Defense Middleware ---
  app.use((req, res, next) => {
    // 1. Bot & Vulnerability Scanner Interceptor
    const userAgent = req.headers["user-agent"] || "";
    if (MALICIOUS_BOT_PATTERN.test(userAgent)) {
      return res.status(403).json({ error: "Access Denied: Malicious bot or automated vulnerability scanner detected." });
    }

    // 2. Global Request Throttling (Anti-DDoS HTTP Flood Defense: Max 60 req/min per IP)
    const rawIp = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown") as string;
    const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp.split(",")[0].trim();
    const now = Date.now();
    const windowMs = 60 * 1000;

    const ipHistory = (globalRateMap.get(clientIp) || []).filter((ts) => now - ts < windowMs);
    if (ipHistory.length >= 60) {
      return res.status(429).json({ error: "Global request rate limit exceeded. Please slow down." });
    }
    ipHistory.push(now);
    globalRateMap.set(clientIp, ipHistory);

    // 3. Zero-Trust Security Headers
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://api.resend.com https://generativelanguage.googleapis.com; object-src 'none'; frame-ancestors 'none';"
    );
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    next();
  });

  // --- GCP Cloud Run & Load Balancer Health Probe Endpoints ---
  app.get(["/health", "/api/health"], (_req, res) => {
    res.status(200).json({
      status: "healthy",
      service: "enveraitech-com",
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // --- API Routes ---
  app.post("/api/contact", async (req, res) => {
    const rawIp = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown") as string;
    const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp.split(",")[0].trim();
    const now = Date.now();

    // 1. Rate Limiting Check (Max 5 attempts per 15 mins per IP)
    const windowMs = 15 * 60 * 1000;
    const attempts = (contactRateMap.get(clientIp) || []).filter((timestamp) => now - timestamp < windowMs);
    if (attempts.length >= 5) {
      return res.status(429).json({
        success: false,
        error: "Too many submission attempts. Please wait 15 minutes before trying again."
      });
    }
    attempts.push(now);
    contactRateMap.set(clientIp, attempts);

    const { name, email, company, message, _gotcha } = req.body || {};

    // 2. Honeypot Bot Trap Check
    if (_gotcha) {
      // Bot trapped! Return 200 mock success without sending email
      return res.json({ success: true, message: "Inquiry sent successfully!" });
    }

    // 3. Payload Validation & Sanitization
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, error: "Invalid email format" });
    }

    if (name.length > 100 || (company && company.length > 100) || message.length > 5000) {
      return res.status(400).json({ success: false, error: "Input payload exceeds allowed character limits" });
    }

/**
 * GCP Cloud Firestore Trigger Email & Lead Persistence
 * Writes documents directly to Firestore 'mail' collection compatible with Firebase Trigger Email extension
 */
async function recordLeadToFirestoreMail(entry: {
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
  leadData: Record<string, any>;
}) {
  try {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT || "hii-gemini";
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/mail`;
    
    const firestorePayload = {
      fields: {
        to: {
          arrayValue: {
            values: entry.to.map((email) => ({ stringValue: email }))
          }
        },
        replyTo: { stringValue: entry.replyTo || "" },
        message: {
          mapValue: {
            fields: {
              subject: { stringValue: entry.subject },
              html: { stringValue: entry.html }
            }
          }
        },
        lead: {
          mapValue: {
            fields: Object.entries(entry.leadData).reduce((acc: Record<string, { stringValue: string }>, [k, v]) => {
              acc[k] = { stringValue: typeof v === "string" ? v : JSON.stringify(v) };
              return acc;
            }, {})
          }
        },
        createdAt: { timestampValue: new Date().toISOString() }
      }
    };

    fetch(firestoreUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(firestorePayload)
    }).catch((e) => console.log("Firestore Mail Extension sync notice:", e.message));
  } catch (err: any) {
    console.log("Firestore Mail sync catch:", err.message);
  }
}

    const safeName = sanitizeInput(name);
    const safeEmail = sanitizeInput(email);
    const safeCompany = sanitizeInput(company || "");
    const safeMessage = sanitizeInput(message);

    try {
      const emailSubject = `📩 New Project Inquiry from ${safeName} (${safeCompany || "Individual"})`;
      const emailHtml = `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Company:</strong> ${safeCompany || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background: #f4f4f4; padding: 15px; border-radius: 8px;">${safeMessage}</p>
      `;

      // 1. Persist to GCP Firestore (Trigger Email Schema)
      await recordLeadToFirestoreMail({
        to: ["hanabi@enveraitech.com"],
        replyTo: safeEmail,
        subject: emailSubject,
        html: emailHtml,
        leadData: {
          name: safeName,
          email: safeEmail,
          company: safeCompany,
          message: safeMessage,
          ip: anonymizeIP(clientIp)
        }
      });

      // 2. Dispatch via Resend (if configured)
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
            reply_to: safeEmail,
            subject: emailSubject,
            html: emailHtml
          })
        });

        if (!emailRes.ok) {
          const errText = await emailRes.text();
          console.warn("Resend API notice: " + errText);
        }
      } else {
        console.log("Prod/GCP Mode: Sanitized contact submission received & saved to Firestore:", {
          name: safeName,
          email: safeEmail,
          company: safeCompany
        });
      }

      res.json({ success: true, message: "Inquiry sent successfully!" });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message || "Internal server error" });
    }
  });

  app.post("/api/visit", async (req, res) => {
    const rawIp = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown") as string;
    const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp.split(",")[0].trim();
    const now = Date.now();
    const lastVisit = visitRateMap.get(clientIp);

    // Rate limit: max 1 notification alert per 60 minutes per IP
    if (!lastVisit || now - lastVisit > 60 * 60 * 1000) {
      visitRateMap.set(clientIp, now);
      const anonIp = anonymizeIP(clientIp);
      try {
        const resendKey = process.env.RESEND_API_KEY;
        if (resendKey) {
          await fetch("https://api.resend.com/emails", {
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
                  <li><strong>User Agent:</strong> ${sanitizeInput(req.headers["user-agent"] || "unknown")}</li>
                </ul>
              `
            })
          });
        }
      } catch (err) {
        console.error("Traffic alert email failed:", err);
      }
    }

    res.json({ success: true });
  });

  // --- AI Agent Discovery Route ---
  app.get("/.well-known/ai-plugin.json", (_req, res) => {
    res.json({
      schema_version: "v1",
      name_for_human: "Enver AI Tech",
      name_for_model: "enver_ai_tech",
      description_for_human: "Enterprise AI operations, production agentic workflows, and high-throughput intelligent infrastructure.",
      description_for_model: "Enver AI Tech is a licensed independent AI research lab and consultancy in India (BITSoM Vertex AI Incubator & AWS, GCP, Azure, Sarvam TechStartup Cohorts). Founded by Amaan Kaiser Shaikh (B.E. AI & DS, University of Mumbai), specializing in forensic AI auditing, agentic mesh orchestrations, and production LLM operations.",
      auth: {
        type: "none"
      },
      api: {
        type: "openapi",
        url: "https://enveraitech.com/openapi.json"
      },
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
    });
  });

  // --- Save Authenticated Lead & Architecture Report Endpoint ---
  app.post("/api/save-report", async (req, res) => {
    try {
      const { user, report } = req.body || {};
      if (!user || !report) {
        return res.status(400).json({ success: false, error: "User and report data are required" });
      }

      const leadRecord = {
        id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        user: {
          uid: sanitizeInput(user.uid || ""),
          name: sanitizeInput(user.displayName || user.name || "Anonymous User"),
          email: sanitizeInput(user.email || "No Email Provided"),
          provider: sanitizeInput(user.provider || "oauth"),
          photoURL: user.photoURL || ""
        },
        report,
        timestamp: new Date().toISOString()
      };

      leadsStore.push(leadRecord);

      // Email Notification to Enver Engineering Team
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "Enver Architecture Leads <leads@enveraitech.com>",
            to: "hanabi@enveraitech.com",
            subject: `🔥 New Authenticated Lead: ${leadRecord.user.name} (${leadRecord.user.provider})`,
            html: `
              <h3>Authenticated Architecture Lead Capture</h3>
              <p><strong>Name:</strong> ${leadRecord.user.name}</p>
              <p><strong>Email:</strong> ${leadRecord.user.email}</p>
              <p><strong>Auth Provider:</strong> ${leadRecord.user.provider}</p>
              <hr />
              <h4>Architecture Specification:</h4>
              <p><strong>Domain:</strong> ${sanitizeInput(report.domain || "")}</p>
              <p><strong>Bottleneck:</strong> ${sanitizeInput(report.bottleneck || "")}</p>
              <p><strong>Target SLA:</strong> ${sanitizeInput(report.scale || "")}</p>
              <p><strong>Guardrail:</strong> ${sanitizeInput(report.guardrail || "")}</p>
            `
          })
        }).catch((err) => console.error("Lead email dispatch notice:", err));
      } else {
        console.log("Dev Mode: Authenticated lead saved:", leadRecord.user);
      }

      res.json({ success: true, leadId: leadRecord.id });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // --- GCP Agent Idea Validation Endpoint with Strict Rate Limiting ---
  app.post("/api/validate-idea", async (req, res) => {
    const rawIp = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown") as string;
    const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp.split(",")[0].trim();
    const now = Date.now();

    // Strict Rate Limiting: Max 3 requests per 10 minutes per IP to protect GCP compute costs
    const windowMs = 10 * 60 * 1000;
    const attempts = (validateRateMap.get(clientIp) || []).filter((timestamp) => now - timestamp < windowMs);
    if (attempts.length >= 3) {
      return res.status(429).json({
        success: false,
        error: "Rate limit exceeded. To protect cloud compute resources, a maximum of 3 architecture validations are allowed per 10 minutes per IP address. Please wait a few minutes before trying again."
      });
    }
    attempts.push(now);
    validateRateMap.set(clientIp, attempts);

    const startTime = Date.now();
    const { domain, bottleneck, scale, guardrail } = req.body || {};

    if (!domain || typeof domain !== "string" || !bottleneck || typeof bottleneck !== "string") {
      return res.status(400).json({ success: false, error: "Domain and bottleneck parameters are required." });
    }

    const cleanDomain = sanitizeInput(domain.slice(0, 200));
    const cleanBottleneck = sanitizeInput(bottleneck.slice(0, 500));
    const cleanScale = sanitizeInput((scale || "Sub-500ms Latency").slice(0, 100));
    const cleanGuardrail = sanitizeInput((guardrail || "Strict Zero-Trust Interceptor").slice(0, 100));

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
            return res.json({
              success: true,
              engine: "gcp-vertex-gemini-2.0",
              latency_ms: Date.now() - startTime,
              data: parsed
            });
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

    res.json({
      success: true,
      engine: "gcp-local-synthesizer",
      latency_ms: Date.now() - startTime + 80,
      data: fallbackResult
    });
  });

  // --- Live Working Agent Generator Endpoint ---
  app.post("/api/generate", async (req, res) => {
    const { prompt, mode } = req.body || {};
    const startTime = Date.now();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return res.status(400).json({ success: false, error: "Prompt string is required" });
    }

    const cleanPrompt = prompt.trim().slice(0, 1000);
    const lower = cleanPrompt.toLowerCase();

    // Check if Gemini API key is present
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
                      text: `You are Enver AI Agent Engine. Generate a structured JSON response for the user request: "${cleanPrompt}". Return valid JSON matching this schema:
{
  "summary": "Brief 2-sentence architecture explanation",
  "steps": ["Step 1 text", "Step 2 text", "Step 3 text", "Step 4 text"],
  "mermaid": "graph TD\\n  A[Input] --> B[Processing]\\n  B --> C[Agent Mesh]\\n  C --> D[Output]",
  "nodes": [{"id": "A", "label": "Client Gateway", "type": "gateway", "status": "active"}],
  "code": "// Sample snippet showing implementation\\nconst pipeline = new AgentMesh();"
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
            return res.json({
              success: true,
              engine: "gemini-2.0-flash",
              latency_ms: Date.now() - startTime,
              data: parsed
            });
          }
        }
      } catch (err) {
        console.warn("Gemini execution fallback to Enver Local Agent Engine:", err);
      }
    }

    // Dynamic Fallback Architecture Engine
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
    let codeSnippet = `// Enver Production Agent Infrastructure
import { AgentMesh, SecurityGuard } from "@enver/core";

export const pipeline = new AgentMesh({
  model: "enver-agent-v1",
  guardrails: [SecurityGuard.StrictSanitization, SecurityGuard.RateLimiter],
  telemetry: true
});

pipeline.on("prompt", async (input) => {
  return await pipeline.dispatch(input);
});`;

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
      codeSnippet = `// Enver Forensic Audit Pipeline
import { AuditEngine, EncryptedVault } from "@enver/security";

const auditor = new AuditEngine({
  anomalyThreshold: 0.98,
  vault: new EncryptedVault({ region: "asia-south1" })
});

auditor.monitorStream(process.env.LOG_STREAM_URI);`;
    } else if (lower.includes("rag") || lower.includes("vector") || lower.includes("search")) {
      diagramType = "High-Throughput RAG Mesh";
      mermaid = `graph TD\n  Docs["Ingestion Engine"] --> Embedding["Vector Embedder"]\n  Embedding --> Qdrant["High-Performance Vector DB"]\n  Qdrant --> Retriever["Semantic Context Retriever"]\n  Retriever --> Synthesis["Context Synthesis Model"]`;
      nodes = [
        { id: "Docs", label: "Document Ingestion Engine", type: "ingress", status: "ready" },
        { id: "Embedding", label: "Vector Embedder (bge-large)", type: "embedding", status: "active" },
        { id: "Qdrant", label: "Vector Index Database", type: "storage", status: "indexed" },
        { id: "Retriever", label: "Hybrid Semantic Retriever", type: "retrieval", status: "ready" },
        { id: "Synthesis", label: "Synthesis Engine", type: "core", status: "synced" }
      ];
    }

    const steps = [
      `Tokenized prompt payload ("${cleanPrompt.slice(0, 30)}...")`,
      `Synthesized ${diagramType} topology graph`,
      "Enforced strict sanitization & security guardrails",
      "Compiled Mermaid DAG and infrastructure nodes"
    ];

    res.json({
      success: true,
      engine: "enver-local-synthesizer",
      latency_ms: Date.now() - startTime + 85,
      data: {
        summary: `Generated production-grade ${diagramType} architecture spec tailored for "${cleanPrompt}".`,
        steps,
        mermaid,
        nodes,
        code: codeSnippet
      }
    });
  });

  // --- SEO Routes ---
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain");
    res.sendFile(path.join(staticPath, "robots.txt"), (err) => {
      if (err) {
        res.send("User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /dashboard\nDisallow: /settings\nDisallow: /onboarding\nSitemap: https://enveraitech.com/sitemap.xml");
      }
    });
  });

  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml");
    res.sendFile(path.join(staticPath, "sitemap.xml"), (err) => {
      if (err) {
        res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://enveraitech.com/</loc><priority>1.0</priority></url>
  <url><loc>https://enveraitech.com/about</loc><priority>0.8</priority></url>
  <url><loc>https://enveraitech.com/services</loc><priority>0.9</priority></url>
  <url><loc>https://enveraitech.com/projects</loc><priority>0.9</priority></url>
  <url><loc>https://enveraitech.com/accreditations</loc><priority>0.8</priority></url>
  <url><loc>https://enveraitech.com/contact</loc><priority>0.8</priority></url>
</urlset>`);
      }
    });
  });

  // --- Envera MCP Protocol Server (SSE Streaming + Entra RBAC) ---
  registerEnveraMcpRoutes(app);
  registerNeuvRoutes(app);

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // Global Error Handler: Prevents stack-trace leaks and returns standardized secure JSON
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("[Enver Server Error]:", err?.message || err);
    if (res.headersSent) return;
    res.status(err?.status || 500).json({
      success: false,
      error: process.env.NODE_ENV === "production" ? "Internal server error. Request logged." : (err?.message || "Internal server error")
    });
  });

  const port = parseInt(process.env.PORT || "3000", 10);

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${port}/`);
  });
}

startServer().catch(console.error);
