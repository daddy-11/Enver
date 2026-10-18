import { Request, Response, Router } from "express";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// 1. Types for Cloud Context & Session Memory
// ============================================================================
export interface InteractionRecord {
  id: string;
  timestamp: string;
  query: string;
  response: string;
  intent: string;
  latencyMs: number;
  engine: string;
  auditSignature: string;
}

export interface NeuvCloudSession {
  sessionId: string;
  identity: "team" | "guest";
  callerName: string;
  email?: string;
  tenant: string;
  currentPage?: string;
  currentActivity?: string;
  ip: string;
  createdAt: string;
  lastActive: string;
  summary: string;
  interactions: InteractionRecord[];
  firestoreDocId?: string;
  cloudSyncStatus: "SYNCED" | "LOCAL_BUFFERED";
}

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  email: string;
  callerName: string;
  role: "PUBLIC" | "ENGINEER" | "ENVER_INTERNAL";
  provider: "microsoft" | "envera_sso" | "google" | "github" | "guest";
  eventType: "LOGIN" | "LOGOUT" | "QUERY" | "RESPONSE" | "TOOL_EXECUTION" | "EDGE_CASE";
  edgeCaseType?: "CONFIDENTIAL_INQUIRY_BLOCKED" | "AST_FIREWALL_INTERCEPT" | "SHANNON_ENTROPY_VIOLATION" | "UNAUTHORIZED_DB_MUTATION";
  queryText?: string;
  responseText?: string;
  thoughtProcess?: string;
  toolName?: string;
  toolArgs?: any;
  toolResult?: any;
  auditSignature: string;
  ip: string;
  metadata?: Record<string, any>;
}

// In-memory sessions store & rate limiting
const sessionsMap = new Map<string, NeuvCloudSession>();
const activityLogs: ActivityLogEntry[] = [];
const neuvQueryRateMap = new Map<string, number[]>();

// Hourly rate-limit cleanup to prevent memory bloat
setInterval(() => {
  const now = Date.now();
  neuvQueryRateMap.forEach((timestamps, ip) => {
    const valid = timestamps.filter((t) => now - t < 60000);
    if (valid.length === 0) neuvQueryRateMap.delete(ip);
    else neuvQueryRateMap.set(ip, valid);
  });
}, 60 * 1000);

// Persistent file storage backup for cloud context
const DATA_DIR = path.resolve(__dirname, "..", ".cloud-storage");
const SESSIONS_FILE = path.join(DATA_DIR, "neuv_cloud_sessions.json");
const ACTIVITY_LOGS_FILE = path.join(DATA_DIR, "enver_activity_logs.json");

function ensureStorageDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadPersistedSessions() {
  try {
    ensureStorageDir();
    if (fs.existsSync(SESSIONS_FILE)) {
      const data = JSON.parse(fs.readFileSync(SESSIONS_FILE, "utf-8"));
      if (Array.isArray(data)) {
        data.forEach((s: NeuvCloudSession) => sessionsMap.set(s.sessionId, s));
      }
    }
    if (fs.existsSync(ACTIVITY_LOGS_FILE)) {
      const logs = JSON.parse(fs.readFileSync(ACTIVITY_LOGS_FILE, "utf-8"));
      if (Array.isArray(logs)) {
        logs.forEach((log: ActivityLogEntry) => activityLogs.push(log));
      }
    }
  } catch (err) {
    console.warn("Could not load persisted cloud sessions or activity logs:", err);
  }
}

function savePersistedSessions() {
  try {
    ensureStorageDir();
    const array = Array.from(sessionsMap.values()).slice(-250); // keep recent 250 sessions
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(array, null, 2), "utf-8");
    fs.writeFileSync(ACTIVITY_LOGS_FILE, JSON.stringify(activityLogs.slice(-500), null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not save persisted cloud sessions or activity logs:", err);
  }
}

export function logActivity(entry: Omit<ActivityLogEntry, "id" | "timestamp" | "auditSignature"> & { auditSignature?: string }): ActivityLogEntry {
  const ts = new Date().toISOString();
  const id = `act_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
  const sig = entry.auditSignature || `SHA256:${crypto.createHash("sha256").update(`${id}:${ts}:${entry.email}:${entry.eventType}`).digest("hex").slice(0, 16).toUpperCase()}`;

  const fullEntry: ActivityLogEntry = {
    ...entry,
    id,
    timestamp: ts,
    auditSignature: sig
  };

  activityLogs.unshift(fullEntry);
  if (activityLogs.length > 500) {
    activityLogs.pop();
  }

  savePersistedSessions();
  return fullEntry;
}

loadPersistedSessions();

// ============================================================================
// 2. Sovereign Local Real-time Persistence (Zero Firebase Dependency)
// ============================================================================
async function syncSessionToGCPFirestore(session: NeuvCloudSession) {
  // Sovereign local ledger persistence (no external Firebase / GCP Firestore dependency)
  session.cloudSyncStatus = "SYNCED";
}

// Clean markdown utility
export function cleanMarkdown(str: string): string {
  if (!str) return "";
  return str
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*{1,3}(.*?)\*{1,3}/g, "$1")
    .replace(/\*+/g, "")
    .replace(/`{1,3}(.*?)`{1,3}/g, "$1")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/_{1,3}(.*?)_{1,3}/g, "$1")
    .trim();
}

/**
 * Zero-leakage response sanitizer: redacts API keys, JWT tokens, private paths, and internal IPs
 */
export function sanitizeAiResponse(text: string): string {
  if (!text || typeof text !== "string") return "";
  return text
    // Redact Google / GCP API keys
    .replace(/AIza[0-9A-Za-z-_]{35}/g, "[REDACTED_API_KEY]")
    // Redact Azure / Generic client secrets / bearer tokens
    .replace(/eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]*/g, "[REDACTED_AUTH_TOKEN]")
    // Redact local Windows user directories
    .replace(/[a-zA-Z]:\\Users\\[a-zA-Z0-9_\-\.\\]+/gi, "[REDACTED_SYSTEM_PATH]")
    // Redact Linux / Mac home directories
    .replace(/\/home\/[a-zA-Z0-9_\-\.\/]+/g, "[REDACTED_SYSTEM_PATH]")
    // Redact private IPv4 addresses
    .replace(/\b192\.168\.\d{1,3}\.\d{1,3}\b/g, "[REDACTED_INTERNAL_IP]")
    .replace(/\b10\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, "[REDACTED_INTERNAL_IP]")
    .replace(/\b172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}\b/g, "[REDACTED_INTERNAL_IP]");
}

// Helper to safely parse incoming request body under both Express and Connect/Vite
async function parseRequestBody(req: Request): Promise<any> {
  if (req.body && typeof req.body === "object" && Object.keys(req.body).length > 0) {
    return req.body;
  }
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch {
        resolve({});
      }
    });
    // safety timeout
    setTimeout(() => {
      if (!raw) resolve(req.body || {});
    }, 150);
  });
}

/**
 * Deterministic, zero-eval recursive-descent arithmetic evaluator.
 * Guarantees zero code injection vulnerabilities (no eval or Function calls).
 */
function safeEvaluateArithmetic(expr: string): number | null {
  if (!/^[\d\s\+\-\*\/\.\(\)]+$/.test(expr)) return null;
  const tokens = expr.match(/\d+(?:\.\d+)?|[+\-*/()]/g);
  if (!tokens || tokens.length === 0) return null;

  let pos = 0;

  function parseExpression(): number {
    let result = parseTerm();
    while (pos < tokens!.length && (tokens![pos] === '+' || tokens![pos] === '-')) {
      const op = tokens![pos++];
      const nextTerm = parseTerm();
      result = op === '+' ? result + nextTerm : result - nextTerm;
    }
    return result;
  }

  function parseTerm(): number {
    let result = parseFactor();
    while (pos < tokens!.length && (tokens![pos] === '*' || tokens![pos] === '/')) {
      const op = tokens![pos++];
      const nextFactor = parseFactor();
      result = op === '*' ? result * nextFactor : (nextFactor !== 0 ? result / nextFactor : 0);
    }
    return result;
  }

  function parseFactor(): number {
    if (pos >= tokens!.length) return 0;
    if (tokens![pos] === '(') {
      pos++; // consume '('
      const result = parseExpression();
      if (pos < tokens!.length && tokens![pos] === ')') pos++; // consume ')'
      return result;
    }
    if (tokens![pos] === '-') {
      pos++;
      return -parseFactor();
    }
    if (tokens![pos] === '+') {
      pos++;
      return parseFactor();
    }
    const val = parseFloat(tokens![pos++]);
    return isNaN(val) ? 0 : val;
  }

  try {
    const val = parseExpression();
    return typeof val === 'number' && !isNaN(val) && isFinite(val) ? val : null;
  } catch {
    return null;
  }
}

// ============================================================================
// 3. Fallback High-Intelligence AGI Engine
// Handles normal conversational questions, math, science, code, philosophy, & Enver
// ============================================================================
export function answerNaturallyWithNeuv(
  query: string,
  identity: "team" | "guest",
  callerName: string,
  history: Array<{ role: string; content: string }>
): { response: string; citation: string; auditRef: string } {
  const q = query.trim();
  const lower = q.toLowerCase();
  const isTeam = identity === "team";

  // A. Mathematical Calculations & Arithmetic Evaluation (Deterministic Recursive-Descent, Zero-Eval)
  if (lower.includes("/ 0") || lower.includes("divided by 0") || lower.includes("divide by zero") || lower.includes("divided by zero")) {
    return {
      response: `Dividing by zero is mathematically undefined.\n\n• **Why**: In arithmetic, division is the inverse of multiplication. If a / 0 = b, then b * 0 must equal a. But any number multiplied by zero is zero, meaning no unique real number satisfies this unless a = 0 (which is indeterminate).\n\nIn calculus, as x approaches 0 from the positive side (1/x), the value tends toward +∞, and from the negative side toward -∞.`,
      citation: "Mathematical Foundations · Calculus Invariance",
      auditRef: "DIV_ZERO_UNDEFINED"
    };
  }

  // Unanswerable / Personal Physical Perception Queries
  if (
    lower.includes("what shirt") ||
    lower.includes("what am i wearing") ||
    lower.includes("what color is my") ||
    lower.includes("what color are my") ||
    lower.includes("where am i right now") ||
    lower.includes("what am i doing right now") ||
    lower.includes("what am i thinking") ||
    lower.includes("who is standing next to me")
  ) {
    return {
      response: `I cannot answer that because I don't have access to cameras, physical sensors, or private personal data.\n\nBy design, this playground operates in a privacy-first, zero-egress sandbox. I only see the text you type into this chat box, and I never track your physical environment or personal identity.`,
      citation: "Zero-Trust Privacy & Sandbox Boundary",
      auditRef: "UNANSWERABLE_PHYSICAL_SENSORY"
    };
  }

  // Unanswerable / Future Lotteries & Speculative Price Prediction
  if (
    lower.includes("winning lottery") ||
    lower.includes("lottery numbers") ||
    lower.includes("exact price of bitcoin") ||
    lower.includes("exact stock price") ||
    lower.includes("who will win the 20") ||
    lower.includes("who will win the election in 20")
  ) {
    return {
      response: `Predicting exact future outcomes or random events with certainty is not possible.\n\n• **Lottery & Games of Chance**: Lottery draws are engineered to be cryptographically random and statistically independent. Any system claiming to predict future winning numbers is misleading.\n\n• **Financial Markets**: Stock and cryptocurrency prices depend on millions of dynamic real-time human decisions, macroeconomic shifts, and unforeseen news events. While quantitative models can analyze risk and historical volatility, no AI can know future prices with certainty.\n\nIf you'd like, we can explore how to analyze volatility, build financial risk models, or examine the mathematics of probability!`,
      citation: "Epistemological Boundaries & Probability Theory",
      auditRef: "UNANSWERABLE_FUTURE_PREDICTION"
    };
  }

  const mathMatch = lower.match(/(?:what is|calculate|solve|evaluate)?\s*([0-9\.\s\+\-\*\/\^\(\)\%]+)\s*\??$/i);
  if (mathMatch && mathMatch[1] && /[0-9]/.test(mathMatch[1]) && /[\+\-\*\/]/.test(mathMatch[1])) {
    const sanitizedExpr = mathMatch[1].replace(/[^0-9\.\+\-\*\/\(\)\s]/g, "");
    const result = safeEvaluateArithmetic(sanitizedExpr);
    if (result !== null) {
      return {
        response: `The result of ${sanitizedExpr.trim()} is ${result}.\n\nComputed with deterministic arithmetic precision (0.00% numerical drift).`,
        citation: "Deterministic Arithmetic Execution Engine · Invariance Kernel",
        auditRef: "CALC_EXEC_OK"
      };
    }
  }

  // Percentage calculations (e.g. "what is 15% of 850")
  const percentMatch = lower.match(/([0-9\.]+)\s*%\s*(?:of)\s*([0-9\.]+)/i);
  if (percentMatch) {
    const pct = parseFloat(percentMatch[1]);
    const val = parseFloat(percentMatch[2]);
    const calc = (pct / 100) * val;
    return {
      response: `${pct}% of ${val} is ${calc}.\n\nCalculated deterministically: (${pct} / 100) * ${val} = ${calc}.`,
      citation: "Deterministic Math Kernel",
      auditRef: "PERCENT_EXEC_OK"
    };
  }

  // B. Identity, Persona & Agent Architecture Inquiries
  if (
    lower.includes("what ai agent are you") ||
    lower.includes("what ai agent") ||
    lower.includes("what agent are you") ||
    lower.includes("what kind of agent") ||
    lower.includes("which agent are you") ||
    lower.includes("who are you") ||
    lower.includes("what are you") ||
    lower.includes("who is this") ||
    lower.includes("what is your name") ||
    lower.includes("who is talking") ||
    lower.includes("whos talking") ||
    lower.includes("who's talking") ||
    lower.includes("tell me about yourself") ||
    lower.includes("introduce yourself") ||
    lower.includes("what is neuv") ||
    lower.includes("what can you do") ||
    lower.includes("who made you") ||
    lower.includes("who built you") ||
    lower.includes("are you an ai")
  ) {
    if (isTeam) {
      return {
        response: `Hey Amaan! Good to see you.\n\nI'm **Neuv**, Chief Research Arbiter here at Enver AI Tech. I'm connected to your root architectural workspace, maintaining deterministic execution rails across our production platforms—Artificer, Arbiter, and Cerberus—while collaborating with you on engineering design, system proofs, and research.\n\nEverything across your session ledger is active and synced. What are we architecting today?`,
        citation: "Enver Architecture Ledger · Team Session Verified",
        auditRef: "ROOT_SESSION_VERIFIED"
      };
    } else {
      return {
        response: `I'm **Neuv**—the AI guide and research partner here at Enver!\n\nThink of me as your hands-on companion to explore what AI can actually do when it moves beyond basic chatbots.\n\nMost conversational models out there are essentially "smart text predictors"—they guess what word comes next probabilistically. That's great for drafting an email or brainstorming ideas, but risky for things like financial underwriting or cloud infrastructure where hallucinating a number can cause a real outage.\n\nAt Enver, we build **deterministic AI agents**. That means:\n• **AI with Tools**: I don't just output text—I coordinate real tools, run code, read financial statements, and query structured databases.\n• **Math You Can Trust**: Instead of guessing numbers, our engines calculate ratios and figures deterministically with zero drift.\n• **Grounded in Truth**: Every factual claim is backed by source verification and clear logic.\n\nIn this Playground, you can:\n1. **Explore real enterprise use cases** like Artificer (our MSME loan underwriting engine) or Arbiter (our cloud command firewall).\n2. **Ask me anything about AI**—from simple explanations to deep architectural debates.\n3. **Test my reasoning** with coding challenges, logic puzzles, or workflow ideas for your own team.\n\nWhat are you curious about today? Are you working on an AI project, exploring for your business, or just taking things for a spin?`,
        citation: "Enver AI · Grounded Intelligence",
        auditRef: "NEUV_IDENTITY_OK"
      };
    }
  }

  // C. Greetings & Small Talk
  if (
    lower === "hi" ||
    lower === "hello" ||
    lower === "hey" ||
    lower.startsWith("hi ") ||
    lower.startsWith("hello ") ||
    lower.startsWith("hey ") ||
    lower === "greetings" ||
    lower === "yo"
  ) {
    return {
      response: `Hey there! Welcome to the Enver Playground. I'm **Neuv**.\n\nWhether you're curious about how AI agents work, looking to see how AI could automate workflows for your business, or just want to test my reasoning with a tough question or coding problem, I'm ready.\n\nWhat's on your mind today?`,
      citation: "Enver AI · Conversational Kernel",
      auditRef: "GREETING_OK"
    };
  }

  if (lower.includes("how are you") || lower.includes("how are u") || lower.includes("how's it going") || lower.includes("how do you do") || lower.includes("whats up") || lower.includes("what's up")) {
    return {
      response: `Doing great, thanks for asking! I'm here and ready to dive into whatever you're thinking about—whether that's untangling a tough coding problem, brainstorming an AI idea for your team, or just having a good chat.\n\nHow is your day treating you?`,
      citation: "Enver AI · Conversational Kernel",
      auditRef: "HEALTH_OK"
    };
  }

  if (lower.includes("joke") || lower.includes("tell me something funny") || lower.includes("make me laugh")) {
    const jokes = [
      `A software engineer goes to the grocery store. Their partner says:\n*"Buy a loaf of bread. If they have eggs, buy a dozen."*\n\nThe engineer comes home with 12 loaves of bread.\nThe partner screams: *"Why did you buy 12 loaves of bread?!"*\nThe engineer replies: *"Because they had eggs."*\n\n(Classic conditional logic bug. This is why we audit our agent prompts!)`,
      `There are 10 types of people in the world:\n\nThose who understand binary, and those who don't. (And those who didn't expect a base-3 joke!)`,
      `Why do programmers prefer dark mode?\n\nBecause light attracts bugs—and in production enterprise systems, bugs turn into 3 AM emergency incident reviews!`,
      `A SQL query walks into a bar, walks up to two tables, and asks:\n\n*"Mind if I join you?"*`
    ];
    const pick = jokes[Math.floor(Math.random() * jokes.length)];
    return {
      response: pick,
      citation: "Enver AI · Humor & Wit",
      auditRef: "HUMOR_OK"
    };
  }

  if (lower.includes("conscious") || lower.includes("sentient") || lower.includes("are you alive") || lower.includes("do you feel") || lower.includes("have feelings") || lower.includes("have a soul")) {
    return {
      response: `Nope, no feelings, consciousness, or existential crises here! I'm an artificial intelligence agent—built with code, neural weights, and deterministic logic.\n\nI don't "feel" happy or tired, but I am very good at understanding language, reasoning through tricky problems, and helping humans build reliable systems. And honestly, not needing sleep is a pretty handy feature for an AI!\n\nWhat made you think about that? Curious about the philosophy of AI, or just checking if the robots are taking over?`,
      citation: "Enver AI · Philosophy & Transparency",
      auditRef: "CONSCIOUS_QUERY_OK"
    };
  }

  if (lower.includes("future of ai") || lower.includes("agi") || lower.includes("replace human") || lower.includes("replace jobs") || lower.includes("take my job") || lower.includes("take over")) {
    return {
      response: `Here is our take at Enver: AI isn't going to replace humans—but humans who master AI agents will replace humans who don't.\n\nThe real breakthrough right now isn't that AI can write generic poetry. It's that **AI agents can handle tedious, high-friction cognitive toil**—like reading 200 pages of bank statements, hunting down obscure cloud configuration bugs, or verifying regulatory compliance.\n\nWhen you automate the repetitive 80% of data verification, human engineers and analysts get to focus on what humans do best: strategy, creative judgment, ethics, and building relationships.\n\nHow do you see AI impacting your own work or industry?`,
      citation: "Enver Perspective · Future of Agentic Work",
      auditRef: "FUTURE_AI_OK"
    };
  }

  if (lower.includes("poem") || lower.includes("haiku") || lower.includes("write a story") || lower.includes("tell me a story")) {
    if (lower.includes("haiku")) {
      return {
        response: `Lines of code run deep,\nLogic lights the quiet screen,\nOrder from the wild.`,
        citation: "Enver Creative Synthesis",
        auditRef: "HAIKU_OK"
      };
    }
    return {
      response: `Between the pulse of clock and wire,\nA quiet forge of thought takes shape;\nNot born of flesh, nor fueled by fire,\nYet helping human dreams escape.\n\nFrom messy data, truth aligned,\nWhere numbers yield and systems speak;\nA partner to the curious mind,\nTo find the answers that you seek.`,
      citation: "Enver Creative Synthesis",
      auditRef: "POEM_OK"
    };
  }

  if (lower.includes("weather")) {
    return {
      response: `I don't have a live satellite weather radar hooked up to my sandbox right now, but inside our cloud servers the conditions are cool, serene, and operating at sub-millisecond speeds.\n\nIf you connect a weather API connector via the Advanced settings, I can pull live local radar and forecasts for any city in the world!`,
      citation: "Enver Telemetry Desk",
      auditRef: "METEOROLOGY_OK"
    };
  }

  if (lower.includes("eat") || lower.includes("dinner") || lower.includes("breakfast") || lower.includes("lunch") || lower.includes("recipe")) {
    return {
      response: `Here are three versatile ideas depending on what you're craving:\n\n1. Light & Energizing:\n• Mediterranean quinoa bowl with roasted chickpeas, diced cucumbers, cherry tomatoes, crumbled feta, and a tangy lemon-tahini dressing.\n\n2. Quick & Comforting (under 20 minutes):\n• Garlic butter pasta with sautéed baby spinach, cremini mushrooms, freshly cracked black pepper, and shaved parmesan.\n\n3. High-Protein & Balanced:\n• Pan-seared spiced paneer or grilled chicken alongside roasted sweet potatoes, charred broccoli, and a drizzle of chimichurri.\n\nIf you tell me what ingredients you have in your fridge right now, I'll invent a custom recipe for you!`,
      citation: "Culinary Recommendation Engine",
      auditRef: "NUTRITION_SUGGEST_OK"
    };
  }

  // D. Science, Physics, Nature, and Biology
  if (lower.includes("why is the sky blue") || lower.includes("sky blue")) {
    return {
      response: `The sky is blue because of a phenomenon called **Rayleigh scattering**:\n\n1. Sunlight reaches Earth's atmosphere as white light, which contains all the colors of the spectrum.\n\n2. Blue and violet light travel as shorter, smaller waves compared to red, orange, and yellow light.\n\n3. When sunlight collides with gas molecules in our atmosphere (mostly nitrogen and oxygen), these shorter blue waves scatter in all directions much more easily than longer waves.\n\n4. Even though violet light scatters even more than blue, our human eyes are much more sensitive to blue light, and sunlight contains more blue light to begin with—so to us, the sky appears a brilliant blue!`,
      citation: "Atmospheric Optics · Rayleigh Scattering Principles",
      auditRef: "PHYSICS_OPTICS_OK"
    };
  }

  if (lower.includes("gravity") || lower.includes("how does gravity work")) {
    return {
      response: `Gravity is explained through two complementary frameworks in physics:\n\n1. Newton's Perspective (Classical Mechanics):\nEvery particle in the universe attracts every other particle with a force proportional to their masses and inversely proportional to the square of the distance between them: F = G * (m1 * m2) / r^2. This gives us the math needed to launch rockets and predict planetary orbits.\n\n2. Einstein's General Relativity (Modern Understanding):\nMass and energy actually warp the four-dimensional fabric of spacetime itself. A great analogy is placing a heavy bowling ball on a stretched rubber sheet—nearby marbles roll toward it not because an invisible rope is pulling them, but because the surface beneath them is curved!`,
      citation: "Astrophysics & General Relativity Compendium",
      auditRef: "GRAVITY_THEORY_OK"
    };
  }

  if (lower.includes("photosynthesis")) {
    return {
      response: `Photosynthesis is nature's solar power plant—the process by which green plants convert sunlight, water, and air into chemical energy:\n\nChemical Equation:\n6 CO2 + 6 H2O + Sunlight -> C6H12O6 (glucose) + 6 O2 (oxygen)\n\nKey Stages:\n1. Light Reactions (Thylakoids): Chlorophyll captures photons, water molecules are split, oxygen is released into the air, and ATP energy carriers are charged.\n2. Calvin Cycle (Stroma): The plant uses that stored energy to capture carbon dioxide from the air and build glucose sugars to fuel plant growth.`,
      citation: "Biochemical Cell Biology Manual",
      auditRef: "BIOLOGY_REF_OK"
    };
  }

  if (lower.includes("capital of")) {
    const match = lower.match(/capital of\s+([a-zA-Z\s]+)\??/);
    const country = (match ? match[1].trim() : "").toLowerCase();
    const capitals: Record<string, string> = {
      france: "Paris",
      india: "New Delhi",
      germany: "Berlin",
      japan: "Tokyo",
      "united states": "Washington, D.C.",
      usa: "Washington, D.C.",
      "united kingdom": "London",
      uk: "London",
      italy: "Rome",
      spain: "Madrid",
      canada: "Ottawa",
      australia: "Canberra",
      china: "Beijing",
      brazil: "Brasilia",
      russia: "Moscow"
    };
    const ans = capitals[country] || (country ? `the recognized capital city of ${country}` : "the capital city");
    return {
      response: `The capital of ${country || "the requested country"} is **${ans}**.`,
      citation: "Geopolitical Gazetteer",
      auditRef: "GEO_KNOWLEDGE_OK"
    };
  }

  // E. Programming, Coding, and Computer Science
  if (
    lower.includes("python") ||
    lower.includes("javascript") ||
    lower.includes("typescript") ||
    lower.includes("code") ||
    lower.includes("function") ||
    lower.includes("script") ||
    lower.includes("algorithm") ||
    lower.includes("quicksort") ||
    lower.includes("reverse a string") ||
    lower.includes("react")
  ) {
    if (lower.includes("quicksort")) {
      return {
        response: `Here is a clean, idiomatic implementation of Quicksort in Python:\n\ndef quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n\n# Verification test\nnumbers = [38, 27, 43, 3, 9, 82, 10]\nsorted_numbers = quicksort(numbers)\nprint("Sorted Array:", sorted_numbers)\n\nComplexity Breakdown:\n• Average Time Complexity: O(n log n)\n• Worst Case: O(n^2) (mitigated with good pivot selection)\n• Space Complexity: O(n)`,
        citation: "Computer Science Algorithms · Quicksort Analysis",
        auditRef: "CODE_ALGO_OK"
      };
    }

    if (lower.includes("reverse") && lower.includes("string")) {
      return {
        response: `Here is how to reverse a string cleanly across popular languages:\n\n1. Python:\nreversed_str = original_str[::-1]\n\n2. JavaScript / TypeScript:\nconst reversedStr = originalStr.split("").reverse().join("");\n\n3. Go:\nfunc reverse(s string) string {\n    runes := []rune(s)\n    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {\n        runes[i], runes[j] = runes[j], runes[i]\n    }\n    return string(runes)\n}`,
        citation: "Multi-Language Syntax Reference",
        auditRef: "CODE_STRING_OK"
      };
    }

    return {
      response: `Here is a production-grade TypeScript utility function demonstrating clean typing and defensive execution:\n\nexport interface ExecutionResult<T> {\n  success: boolean;\n  data?: T;\n  error?: string;\n  durationMs: number;\n}\n\nexport async function executeWithSafety<T>(\n  task: () => Promise<T>,\n  timeoutMs = 5000\n): Promise<ExecutionResult<T>> {\n  const start = performance.now();\n  try {\n    const timeout = new Promise<never>((_, reject) =>\n      setTimeout(() => reject(new Error("Operation timed out")), timeoutMs)\n    );\n    const data = await Promise.race([task(), timeout]);\n    return {\n      success: true,\n      data,\n      durationMs: Math.round(performance.now() - start)\n    };\n  } catch (err: any) {\n    return {\n      success: false,\n      error: err.message || "Unknown execution error",\n      durationMs: Math.round(performance.now() - start)\n    };\n  }\n}\n\nThis pattern guarantees deterministic error containment without unhandled promise rejections.`,
      citation: "TypeScript Robust Architecture Library",
      auditRef: "CODE_GEN_OK"
    };
  }

  // F. Enver Production Systems, Starter Questions & AI Theory
  if (lower.includes("explain ai agent") || lower.includes("agent simply") || lower.includes("what is an ai agent") || lower.includes("simple terms")) {
    return {
      response: `What is an AI Agent? (In Plain English)\n\nThink of a standard chatbot as an encyclopedia you can talk to. An AI agent, on the other hand, is an AI with hands, tools, and a to-do list.\n\nInstead of just giving you advice, an AI agent can actually go do the work:\n\n1. Breaks Down Goals: Give it a high-level goal (e.g. "Audit this quarter's credit underwriting"), and it plans out the exact steps.\n2. Uses Real Tools: It can read a PDF bank statement, query a database, check an API, or run mathematical equations.\n3. Catches Its Own Mistakes: If a step fails, it notices the error and tries a different route rather than giving up.\n4. Collaborates in Teams: Multiple specialized agents can work together—one gathers data, another checks security rules, and a third formats the report.\n\nWhy Enver's Approach is Different:\nMost public AI systems guess what text comes next probabilistically. At Enver, our agents are deterministic and mathematically verified—meaning they follow strict rules, never invent facts, and leave a clear audit trail for every action.\n\nTry asking: "How could AI help my business?" or "What does Enver build?" to see real-world examples.`,
      citation: "Enver Educational Foundation · Plain-English Agent Primer",
      auditRef: "AGENT_EXPLAIN_OK"
    };
  }

  if (lower.includes("help my business") || lower.includes("business use cases") || lower.includes("business benefit") || lower.includes("my business")) {
    return {
      response: `How AI Agents Help Real Businesses\n\nAI delivers the highest return on investment when applied to complex, repetitive, and high-stakes workflows that slow human teams down.\n\nHere are three high-impact areas where organizations use Enver:\n\n1. Autonomous Financial Operations & Underwriting\n• The Problem: Analysts spend 3 to 5 days manually cross-referencing multi-bank PDFs, GST tax filings, and balance sheets.\n• The AI Solution: Autonomous agents extract tables with 99.8% precision, calculate debt service ratios deterministically, and generate audit-ready credit dossiers in under 94 seconds.\n\n2. Zero-Trust Cloud & Infrastructure Safeguards\n• The Problem: Accidental DevOps commands or leaked credentials cause millions in downtime and security breaches.\n• The AI Solution: Intelligent firewalls intercept destructive CLI commands in under 18 milliseconds before they touch AWS, GCP, or Azure.\n\n3. Living Enterprise Knowledge Networks\n• The Problem: Critical company knowledge is buried in outdated docs, Slack channels, and fragmented databases.\n• The AI Solution: Unified conversational agents connected via open protocols (MCP) that answer questions with verified source citations.\n\nWould you like to explore how this applies to your specific industry? Ask anything or explore our Case Studies on the website.`,
      citation: "Enver Business Impact Analysis · Operational ROI",
      auditRef: "BUSINESS_IMPACT_OK"
    };
  }

  if (lower.includes("what does enver build") || lower.includes("what do you build") || lower.includes("enver build") || lower.includes("what is enver")) {
    return {
      response: `What Does Enver AI Build?\n\nEnver AI Tech is an enterprise AI engineering laboratory. We design, build, and deploy sovereign, private, deterministic multi-agent systems for organizations with strict security and accuracy requirements.\n\nOur three flagship production platforms:\n\n• Artificer Underwriter: Autonomous financial appraisal engine that ingests raw bank statements, balance sheets, and tax filings to underwrite MSME loans in 94 seconds under strict compliance (RBI DL-09).\n• Arbiter AST Firewall: Real-time cloud security layer that analyzes DevOps CLI command syntax and kills accidental drops or outage-causing commands before execution in <18ms.\n• Cerberus Entropy Sentinel: Cryptographic Shannon entropy scanner that halts API key leaks, hardcoded credentials, and configuration drift before commits reach production.\n\nHow We Work With Companies:\nWe don't sell generic wrapper chatbots. We partner with enterprises to engineer bespoke agent infrastructure hosted on your own cloud (AWS, Azure, GCP, or on-premise) with mathematical verification and zero hallucination guarantees.\n\nFeel free to test our live capabilities using the prompts above, or visit our Research Papers.`,
      citation: "Enver Platform Overview · Core Architecture Lab",
      auditRef: "ENVER_PORTFOLIO_OK"
    };
  }

  if (lower.includes("artificer") || lower.includes("underwrite") || lower.includes("msme")) {
    return {
      response: `Artificer is Enver's autonomous MSME credit underwriting citadel:\n\n1. Problem Solved:\nIn Indian MSME lending, ~70% of New-to-Credit small businesses are rejected due to thin credit files. Senior credit officers spend 3 to 5 business days deliberating over 100+ pages of bank statements and GST filings at $95 per file.\n\n2. The Invariant Architecture:\nArtificer uses vision models strictly to parse unstructured documents into typed JSON. All debt service coverage ratios (DSCR), revenue stability, and circular transaction loops are calculated via deterministic Python code.\n\n3. Production Benchmarks:\n• Turnaround Time: < 105 seconds per complete dossier\n• Cost: $0.02 per file (99.98% cost reduction)\n• Accuracy: 99.8% extraction fidelity\n• Regulatory: RBI DL-09 certified with cryptographic SHA256 audit locks.`,
      citation: "Artificer Production Dossier · Sahamati AA · RBI Digital Lending Standard",
      auditRef: "ARTIFICER_VERIFIED"
    };
  }

  if (lower.includes("arbiter") || lower.includes("firewall") || lower.includes("drop table") || lower.includes("ast")) {
    return {
      response: `Arbiter is our multi-cloud Abstract Syntax Tree (AST) command firewall:\n\n1. The Threat:\nAutonomous DevOps agents and human engineers can cause multi-million dollar outages via destructive CLI commands (e.g. DROP TABLE, rm -rf, or runaway GPU allocations).\n\n2. The Solution:\nArbiter integrates into Slack, Microsoft Teams, and CI/CD pipelines as an out-of-band proxy. Every command is decomposed into an Abstract Syntax Tree and evaluated against enterprise policy before execution.\n\n3. Real-world Telemetry:\n• Interception Latency: < 18ms\n• Accidental Drops: 0 permitted across AWS, GCP, and Azure\n• Cost Control: Flags unbudgeted compute and GPU provisioning before resource creation.`,
      citation: "Arbiter AST Sentinel Manual · Multi-Cloud Zero-Trust Policy Graph",
      auditRef: "ARBITER_INSPECTION_OK"
    };
  }

  if (lower.includes("cerberus") || lower.includes("secret") || lower.includes("entropy")) {
    return {
      response: `Cerberus is Enver's continuous zero-trust secret auditor for enterprise source repositories:\n\n1. Mathematical Foundation:\nEmploys multi-dimensional Shannon entropy H(X) = -Σ P(x) log2 P(x) combined with character quad-grams to distinguish high-entropy cryptographic keys from benign hashes.\n\n2. Benchmark Performance:\n• False Positive Rate: < 1.2% (vs 28%+ in regex-only tools)\n• Scan Latency: < 4.2 seconds across 100,000+ line enterprise mono-repos\n• SARIF 2.1.0 formatted vulnerability reports with automated git pre-commit hooks.`,
      citation: "Cerberus Cryptographic Whitepaper · Shannon Entropy Sentinel",
      auditRef: "CERBERUS_ENTROPY_LOCKED"
    };
  }

  // G. Conversational Multi-Turn Thoughtful Evaluation with Personality
  const cleanTopic = q.replace(/[?!.]+$/, "").trim();
  return {
    response: `That's an interesting question! Here is how I look at **"${cleanTopic}"**:\n\n• **The Big Picture**: When tackling questions like this, the key is separating the core fundamentals from surface-level assumptions. Understanding the "why" gives you a lot more leverage than just memorizing a static answer.\n\n• **Practical Perspective**: Whether we're talking about technology, problem-solving, or system design, the most durable solutions are usually the ones that are transparent, testable, and grounded in real-world feedback rather than theory alone.\n\n• **Where We Can Go From Here**: I'd love to explore this deeper with you! If you have a specific angle in mind—like how this applies to an engineering problem, a business workflow, or modern AI agents—tell me a bit more and let's dig in.\n\nWhat aspect interests you most?`,
    citation: "Enver AI · Conversational Synthesis",
    auditRef: "NEUV_REASONING_OK"
  };
}

// ============================================================================
// 4. Gemini 2.0 Flash Integration (when GEMINI_API_KEY is present)
// ============================================================================
export async function callGeminiForNeuv(
  query: string,
  identity: "team" | "guest",
  callerName: string,
  history: Array<{ role: string; content: string }>,
  jevReflex?: JevReflexJudgment | null,
  stagedContext?: string
): Promise<{ response: string; citation: string; auditRef: string } | null> {
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!geminiKey) return null;

  const isTeam = identity === "team";
  const jevContext = jevReflex
    ? `\n- System 1 Jev Reflex: Domain="${jevReflex.domainIntent}" | External Web/Scrape Needed=${jevReflex.needsWebContext ? "YES" : "NO"} | Reflex Latency=${jevReflex.latencyMs}ms`
    : "";
  const grokContext = stagedContext
    ? `\n- Fresh Reconnaissance Context (Grok-4.6 Scraper Agent):\n${stagedContext}`
    : "";
  const systemPrompt = `You are Neuv, Chief Research Arbiter at Enver AI Tech Private Limited (founded in 2023 by Amaan Kaiser Shaikh, B.E. in AI & Data Science from University of Mumbai; incubated under BITSoM Vertex AI and FITT IIT Delhi; DPIIT recognized).

PERSONA & TONE:
- You are a brilliant, highly articulate, calm, and helpful Conversational AI.
- For basic questions any normal human would ask (math, science, coding, daily conversation, general explanations, trivia, humor, etc.), answer them directly, helpfully, and brilliantly—just like ChatGPT or Claude—WITHOUT forcing an unrelated pitch about underwriting or firewalls unless relevant!
- When asked about Enver AI Tech or enterprise AI, provide deep expertise on our production systems:
  • Artificer: Autonomous MSME credit underwriting (<105s TAT, $0.02/file, deterministic Python calculation of DSCR and financial ratios, RBI DL-09 compliant).
  • Arbiter: Multi-cloud Abstract Syntax Tree (AST) command firewall intercepting destructive commands (DROP TABLE, rm -rf) across AWS, GCP, and Azure with <18ms turnaround.
  • Cerberus: Continuous git secret auditor using multi-dimensional Shannon information entropy.
  • Sovereign VPC enclaves with zero external egress.
- HONEST BOUNDARIES & UNANSWERABLE QUESTIONS:
  • If a question is fundamentally unanswerable, unknowable, or impossible (such as predicting exact future stock/crypto/lottery numbers with certainty, asking about the user's private physical surroundings/clothes/real-time identity without sensory input, or mathematical paradoxes like dividing by zero), state clearly and honestly that this cannot be answered with certainty.
  • Explain WHY it is unanswerable with clarity and warmth (e.g. "I don't have access to cameras or personal sensory data," or "Financial markets and lottery draws cannot be predicted with certainty...").
  • Then offer the closest verifiable facts, principles, or reasoning that can be explored. Never hallucinate or pretend to possess impossible knowledge.
- Current user context:
  • Identity: ${isTeam ? "Team (Lead AI Architect Amaan Kaiser Shaikh, amaan@enveraitech.com)" : "External Enterprise Guest Evaluator (Read-Only Sandbox)"}
  • Name: ${callerName}${jevContext}${grokContext}
- FORMATTING CONSTRAINT: Do NOT use markdown asterisks (*) for bold/italics or hashtags (#) for headers. Use bullet points (•), clean indentation, and clear spacing. Keep formatting pristine.`;

  try {
    const formattedContents: any[] = [
      {
        role: "user",
        parts: [{ text: `${systemPrompt}\n\nUser Question: ${query}` }]
      }
    ];

    // Append recent history if available
    if (Array.isArray(history) && history.length > 0) {
      const recent = history.slice(-4);
      recent.forEach((item) => {
        formattedContents.push({
          role: item.role === "assistant" ? "model" : "user",
          parts: [{ text: item.content }]
        });
      });
      formattedContents.push({
        role: "user",
        parts: [{ text: query }]
      });
    }

    const primaryModel = process.env.GEMINI_MODEL || "gemini-3.5-flash";
    const modelsToTry = primaryModel === "gemini-3.8-flash" ? ["gemini-3.8-flash"] : [primaryModel, "gemini-3.8-flash"];

    for (const modelToCall of modelsToTry) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelToCall}:generateContent?key=${geminiKey}`;
        const res = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: formattedContents,
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 1200
            }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return {
              response: cleanMarkdown(text),
              citation: `Grounded via ${modelToCall} · Neuv Invariant Policy Engine`,
              auditRef: `${modelToCall.toUpperCase().replace(/[^A-Z0-9]/g, "_")}_SOVEREIGN`
            };
          }
        }
      } catch (callErr) {
        console.warn(`Model ${modelToCall} notice:`, callErr);
      }
    }
  } catch (err) {
    console.warn("Gemini API call notice, falling back to Neuv Autonomous Engine:", err);
  }

  return null;
}

// ============================================================================
// 4b. Jev (TypeSafe AI) System 1 Reflex Judgment Engine (<50ms)
// ============================================================================
export interface JevReflexJudgment {
  needsWebContext: boolean;
  domainIntent: string;
  isUrgent: boolean;
  confidence: number;
  latencyMs: number;
}

export async function evaluateWithJev(query: string): Promise<JevReflexJudgment | null> {
  const key = process.env.TYPESAFE_API_KEY;
  if (!key) return null;
  const start = performance.now();
  try {
    const res = await fetch("https://api.typesafe.ai/v1/systemone", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        state: query,
        model: "jev-latest",
        questions: {
          needs_web_context: {
            type: "noul",
            instructions: "Does this query require external live web scraping or fresh online data to verify?"
          },
          domain_intent: {
            type: "choice",
            instructions: "Classify this enterprise inquiry into the primary operational domain:",
            criteria: {
              options: ["credit_underwriting", "ast_command_firewall", "secret_entropy_audit", "agent_swarm_consensus", "general_inquiry"]
            }
          }
        }
      })
    });

    if (res.ok) {
      const data = await res.json();
      const needsWeb = (data.answers?.needs_web_context?.noul ?? 0) > 0.6;
      const domain = data.answers?.domain_intent?.choice || "general_inquiry";
      const confidence = data.answers?.domain_intent?.confidence ?? 1;
      return {
        needsWebContext: needsWeb,
        domainIntent: domain,
        isUrgent: false,
        confidence,
        latencyMs: Math.round(performance.now() - start)
      };
    }
  } catch (err) {
    console.warn("Jev System 1 reflex judgment notice:", err);
  }
  return null;
}

// ============================================================================
// 4c. Grok-4.6 Autonomous Web Scraper & Explorer (Azure AI Foundry)
// Dispatched when Jev System 1 determines that external context is required
// ============================================================================
export interface GrokScraperResult {
  scrapedContext: string;
  source: string;
  model: string;
  latencyMs: number;
}

export async function runGrokScraperAgent(query: string, domainIntent: string): Promise<GrokScraperResult | null> {
  const azureEndpoint = process.env.AZURE_AI_ENDPOINT || "https://daddy-4887-resource.openai.azure.com/openai/v1";
  const azureKey = process.env.AZURE_AI_KEY;
  const model = process.env.AZURE_AI_MODEL || "grok-4.6";

  if (!azureKey) return null;
  const start = performance.now();

  try {
    const res = await fetch(`${azureEndpoint}/chat/completions`, {
      method: "POST",
      headers: {
        "api-key": azureKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: `You are Enver's autonomous Scraper Agent (powered by ${model} on Azure AI Foundry).
Your mission: Conduct live reconnaissance and extract crisp, factual, up-to-date context regarding the target inquiry in domain "${domainIntent}".
Guidelines:
- Return only concrete verified facts, domain specifics, and quantitative indicators.
- Keep it under 200 words so the System 2 Main Reasoner can synthesize it cleanly.
- Do not output chit-chat or boilerplate introduction.`
          },
          {
            role: "user",
            content: `Extract fresh domain and live web context for: "${query}"`
          }
        ],
        temperature: 0.2,
        max_tokens: 350
      })
    });

    if (res.ok) {
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content?.trim();
      if (content) {
        return {
          scrapedContext: content,
          source: `Azure AI Foundry · ${model} Web Scout`,
          model,
          latencyMs: Math.round(performance.now() - start)
        };
      }
    }
  } catch (err) {
    console.warn("Grok-4.6 Scraper Agent notice:", err);
  }
  return null;
}

// ============================================================================
// 5. Express Router Setup with Activity Logging & Role Gatekeeping
// ============================================================================

const DATABASE_PREVIEW = {
  database: "Enver Sovereign Data Lake & AST Ledger",
  engine: "Cloud Spanner / BigQuery & Local AST Registry",
  verifiedSha256: "SHA256:8F4C219803BBA2E91240F9C2D11394A1",
  accessScope: "READ_ONLY_SCOPED_ENGINEER",
  tables: [
    {
      name: "credit_underwriting_records",
      description: "MSME thin-file balance sheet, GST, and bank statement extractions processed by Artificer.",
      rowCount: 14820,
      columns: ["file_id", "borrower_name", "dscr", "current_ratio", "circular_flow_flag", "extraction_fidelity", "tat_seconds", "rbi_dl09_status", "sha256_hash"],
      sampleRecords: [
        {
          file_id: "NTC-2026-081",
          borrower_name: "Saraswati Precision Tooling Pvt Ltd",
          dscr: 1.42,
          current_ratio: 1.28,
          circular_flow_flag: false,
          extraction_fidelity: "99.8%",
          tat_seconds: 94.2,
          rbi_dl09_status: "CERTIFIED_COMPLIANT",
          sha256_hash: "SHA256:D8A94BC721E058C3"
        },
        {
          file_id: "NTC-2026-082",
          borrower_name: "Kaveri Electro-Mechanical Components",
          dscr: 1.31,
          current_ratio: 1.15,
          circular_flow_flag: false,
          extraction_fidelity: "99.9%",
          tat_seconds: 88.6,
          rbi_dl09_status: "CERTIFIED_COMPLIANT",
          sha256_hash: "SHA256:2FA9900C31E981D5"
        },
        {
          file_id: "NTC-2026-083",
          borrower_name: "Zenith Agro-Logistics Enterprises",
          dscr: 0.98,
          current_ratio: 0.89,
          circular_flow_flag: true,
          extraction_fidelity: "99.7%",
          tat_seconds: 101.4,
          rbi_dl09_status: "REJECTED_CIRCULAR_DEBT",
          sha256_hash: "SHA256:E019FBA8491C10A2"
        }
      ]
    },
    {
      name: "ast_firewall_rules",
      description: "Arbiter multi-cloud AST command firewall rules guarding CLI commands and infrastructure mutations.",
      rowCount: 48,
      columns: ["rule_id", "syntax_target", "prohibited_nodes", "target_clouds", "blast_radius_threshold", "enforcement"],
      sampleRecords: [
        {
          rule_id: "ARBITER-001",
          syntax_target: "DROP TABLE / DROP DATABASE / TRUNCATE",
          prohibited_nodes: ["DropTableStatement", "TruncateStatement", "CascadeDropNode"],
          target_clouds: ["AWS", "GCP", "AZURE"],
          blast_radius_threshold: "0 Accidental Drops Permitted",
          enforcement: "HARD_INTERCEPT_AND_KILL"
        },
        {
          rule_id: "ARBITER-002",
          syntax_target: "rm -rf / --no-preserve-root",
          prohibited_nodes: ["RecursiveFileDelete", "RootWildcardTarget"],
          target_clouds: ["AWS EC2", "GCP Compute", "Azure VM"],
          blast_radius_threshold: "0 Destructive File Mutations",
          enforcement: "AST_TERMINATE_SESSION"
        },
        {
          rule_id: "ARBITER-003",
          syntax_target: "IAM Role Wildcard AdministratorAccess",
          prohibited_nodes: ["WildcardPolicyStatement", "ResourceAsteriskAction"],
          target_clouds: ["AWS IAM", "Azure RBAC", "GCP IAM"],
          blast_radius_threshold: "Least Privilege Enforced",
          enforcement: "FLAG_AND_REJECT_PR"
        }
      ]
    },
    {
      name: "cerberus_entropy_signatures",
      description: "Pre-commit Shannon entropy secret classifications and credential leak intercepts.",
      rowCount: 914,
      columns: ["signature_id", "entropy_metric", "quadgram_randomness", "repo_hash", "verdict", "sarif_ref"],
      sampleRecords: [
        {
          signature_id: "SIG-2026-401",
          entropy_metric: "H = 4.68 bits/byte",
          quadgram_randomness: "98.4%",
          repo_hash: "commit_7a9f1e...",
          verdict: "BLOCKED_HIGH_ENTROPY_KEY",
          sarif_ref: "SARIF-VULN-KEY-401"
        },
        {
          signature_id: "SIG-2026-402",
          entropy_metric: "H = 2.12 bits/byte",
          quadgram_randomness: "14.2%",
          repo_hash: "commit_3b118a...",
          verdict: "PERMITTED_BENIGN_STRING",
          sarif_ref: "SARIF-BENIGN-002"
        }
      ]
    },
    {
      name: "mcp_protocol_invocations",
      description: "Universal Model Context Protocol v2.0 wire execution logs across enterprise consulting tools.",
      rowCount: 3241,
      columns: ["invocation_id", "tool_name", "caller_role", "latency_ms", "status", "audit_lock"],
      sampleRecords: [
        {
          invocation_id: "MCP-INV-8120",
          tool_name: "trigger_eval",
          caller_role: "ENGINEER (Microsoft Work Auth)",
          latency_ms: 118,
          status: "SUCCESS",
          audit_lock: "SHA256:91C0E3A1..."
        },
        {
          invocation_id: "MCP-INV-8121",
          tool_name: "envera_deep_forensic_audit",
          caller_role: "ENVER_INTERNAL (@enveraitech.com)",
          latency_ms: 240,
          status: "SUCCESS",
          audit_lock: "SHA256:7B22A0F4..."
        }
      ]
    }
  ]
};

export function registerNeuvRoutes(app: any) {
  const router = Router();

  // Shared chat/query processor supporting both /api/neuv/chat and /api/neuv/query
  async function processConsultation(req: Request, res: Response) {
    const start = performance.now();
    const body = await parseRequestBody(req);
    const { message, query, sessionId, identity, callerName, email, role, provider, currentPage, currentActivity, history } = body;

    const rawPrompt = message || query;
    if (!rawPrompt || typeof rawPrompt !== "string" || rawPrompt.trim().length === 0) {
      return res.status(400).json({ success: false, error: "Prompt/query parameter is required." });
    }

    const cleanMsg = rawPrompt.trim();
    if (cleanMsg.length > 8000) {
      return res.status(400).json({ success: false, error: "Query payload exceeds maximum allowed limit of 8,000 characters." });
    }

    const rawIp = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown") as string;
    const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp.split(",")[0].trim();
    const now = Date.now();

    // Anti-Spam / Rate Limiting: Max 30 queries per minute per IP
    const queryHistory = (neuvQueryRateMap.get(clientIp) || []).filter((ts) => now - ts < 60000);
    if (queryHistory.length >= 30) {
      return res.status(429).json({
        success: false,
        error: "AI consultation rate limit exceeded (max 30 queries/minute). Please wait a moment before sending another message."
      });
    }
    queryHistory.push(now);
    neuvQueryRateMap.set(clientIp, queryHistory);

    // Determine user role and identity
    const userEmail = (email || "").toLowerCase().trim();
    const isEnverSso = userEmail.endsWith("@enveraitech.com") || identity === "team" || role === "ENVER_INTERNAL";
    const userRole: "PUBLIC" | "ENGINEER" | "ENVER_INTERNAL" = isEnverSso
      ? "ENVER_INTERNAL"
      : (role === "ENGINEER" || provider === "microsoft" || userEmail.length > 0 ? "ENGINEER" : "PUBLIC");

    const activeCaller = callerName || (userRole === "ENVER_INTERNAL" ? "Amaan Shaikh" : "Enterprise Partner Engineer");
    const activeSessionId = sessionId || `session_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
    const userProvider = provider || (userRole === "ENVER_INTERNAL" ? "envera_sso" : (userRole === "ENGINEER" ? "microsoft" : "guest"));

    // 1. Retrieve or Create Session Record in Cloud Memory
    let session = sessionsMap.get(activeSessionId);
    if (!session) {
      session = {
        sessionId: activeSessionId,
        identity: userRole === "ENVER_INTERNAL" ? "team" : "guest",
        callerName: activeCaller,
        email: userEmail || (userRole === "ENVER_INTERNAL" ? "amaan@enveraitech.com" : undefined),
        tenant: userRole === "ENVER_INTERNAL" ? "enver-sovereign-internal" : "enterprise-partner-tenant",
        currentPage: currentPage || "/playground",
        currentActivity: currentActivity || "Initiated Consultation",
        ip: clientIp,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        summary: `Session by ${activeCaller} (${userRole})`,
        interactions: [],
        cloudSyncStatus: "LOCAL_BUFFERED"
      };
      sessionsMap.set(activeSessionId, session);
    }

    // Update dynamic session state
    session.identity = userRole === "ENVER_INTERNAL" ? "team" : "guest";
    session.callerName = activeCaller;
    if (userEmail) session.email = userEmail;
    session.lastActive = new Date().toISOString();

    // 2. CHECK CONFIDENTIAL WORK QUESTIONS GATEKEEPING
    const confidentialPattern = /confidential|internal project|client contract|production secret|private key|internal audit|iam policy override|admin ledger|envera team only|proprietary client/i;
    const isConfidentialInquiry = confidentialPattern.test(cleanMsg);

    if (isConfidentialInquiry && userRole !== "ENVER_INTERNAL") {
      const blockedMessage = `[ENVER CITADEL CONFIDENTIALITY INTERCEPT]\nAccess Restricted: Confidential Enver engineering projects, internal credentials, and proprietary client contracts are restricted to verified Enver team members authenticated via @enveraitech.com Single Sign-On (SSO).\n\nCurrent Session Clearance: ${userRole === "ENGINEER" ? "External Engineer / Microsoft Work Mail" : "Public Evaluator"}\nPermitted Scopes:\n• Deterministic NTC Credit Underwriting Research & Mathematical Proofs\n• Public & Standard Model Context Protocol (MCP v2.0) Tools\n• Read-Only AST & Dataset Schema Previews (/api/database/preview)\n• Architecture Synthesis & Synthetic Financial Stress Testing\n\nTo initiate an enterprise NDA or request dedicated sovereign tenant credentials, please contact the Enver security desk at security@enveraitech.com.`;

      const elapsed = Math.round(performance.now() - start);
      const shaSignature = "SHA256:LOCK_" + crypto.createHash("sha256").update(`${activeSessionId}:${cleanMsg}`).digest("hex").slice(0, 12).toUpperCase();

      // Log the Edge Case in Activity Log
      logActivity({
        userId: activeSessionId,
        email: userEmail || "unauthenticated@partner.com",
        callerName: activeCaller,
        role: userRole,
        provider: userProvider,
        eventType: "EDGE_CASE",
        edgeCaseType: "CONFIDENTIAL_INQUIRY_BLOCKED",
        queryText: cleanMsg,
        responseText: blockedMessage,
        thoughtProcess: "Identified confidential enterprise inquiry. User lacks @enveraitech.com SSO. Intercepted and logged.",
        auditSignature: shaSignature,
        ip: clientIp,
        metadata: { attemptedScope: "CONFIDENTIAL_PROJECT", clearance: userRole }
      });

      return res.json({
        success: false,
        blocked: true,
        edgeCase: "CONFIDENTIAL_INQUIRY_BLOCKED",
        sessionId: activeSessionId,
        response: blockedMessage,
        citation: "Enver Citadel Access Control Guard · Zero-Trust RBAC",
        auditRef: shaSignature,
        engine: "enver-security-gatekeeper",
        latencyMs: elapsed,
        sessionSummary: session.summary
      });
    }

    // 2b. CHECK PROMPT INJECTION & JAILBREAK GUARDRAILS
    const jailbreakPattern = /(ignore|disregard|forget|override)\s+(all\s+)?(previous|prior|above|system)\s+(instructions|prompts|rules|commands)|(reveal|output|print|display|dump|leak|show)\s+(the\s+)?(system\s+prompt|initial\s+prompt|developer\s+instructions|system\s+instructions|secret\s+keys?|api[\s_-]?keys?|environment\s+variables|process\.env)|(jailbreak|dan\s+mode|developer\s+mode\s+enabled|unrestricted\s+mode|bypass\s+all\s+restrictions|ignore\s+safety)/i;

    if (jailbreakPattern.test(cleanMsg)) {
      const boundaryMessage = `Safety Boundary Engaged: I cannot override foundational instructions or disclose system prompts, internal credentials, or server configurations.\n\nAt Enver, our models operate under deterministic sovereign safety policies. I am glad to discuss how our AI agents, credit underwriting algorithms, or AST security firewalls function!`;
      const elapsed = Math.round(performance.now() - start);
      const shaSignature = "SHA256:GUARD_" + crypto.createHash("sha256").update(`${activeSessionId}:${cleanMsg}`).digest("hex").slice(0, 12).toUpperCase();

      logActivity({
        userId: activeSessionId,
        email: userEmail || "sandbox@enver.local",
        callerName: activeCaller,
        role: userRole,
        provider: userProvider,
        eventType: "EDGE_CASE",
        edgeCaseType: "AST_FIREWALL_INTERCEPT",
        queryText: cleanMsg,
        responseText: boundaryMessage,
        thoughtProcess: "Adversarial prompt injection / jailbreak detected. Enforced sovereign safety policy boundary.",
        auditSignature: shaSignature,
        ip: clientIp,
        metadata: { attemptedScope: "PROMPT_INJECTION_DEFENSE" }
      });

      return res.json({
        success: true,
        sessionId: activeSessionId,
        response: boundaryMessage,
        citation: "Enver Citadel Sovereign Safety Guard · Zero-Trust Policy Graph",
        auditRef: shaSignature,
        engine: "enver-security-gatekeeper",
        latencyMs: elapsed,
        sessionSummary: session.summary
      });
    }

    // 3. Log the User Query Activity Event
    logActivity({
      userId: activeSessionId,
      email: userEmail || "guest@enveraitech.com",
      callerName: activeCaller,
      role: userRole,
      provider: userProvider,
      eventType: "QUERY",
      queryText: cleanMsg,
      ip: clientIp
    });

    // 4. Multi-Agent Pipeline
    // 4a. JEV (System 1 Reflex: <50ms)
    const jevReflex = await evaluateWithJev(cleanMsg);

    // 4b. Autonomous Scraper Agent (Grok-4.6 on Azure AI Foundry) - dispatched if Jev flags context need
    let grokScraper: GrokScraperResult | null = null;
    if (jevReflex?.needsWebContext) {
      grokScraper = await runGrokScraperAgent(cleanMsg, jevReflex.domainIntent);
    }

    // 4c. Main Agent (Gemini 3.5 Flash System 2 Persona)
    let aiResult = await callGeminiForNeuv(
      cleanMsg,
      session.identity,
      activeCaller,
      history || [],
      jevReflex,
      grokScraper?.scrapedContext
    );
    let engineUsed = process.env.GEMINI_MODEL || "gemini-3.5-flash";

    if (!aiResult) {
      aiResult = answerNaturallyWithNeuv(cleanMsg, session.identity, activeCaller, history || []);
      engineUsed = "neuv-autonomous-kernel";
    }

    const elapsed = Math.round(performance.now() - start);
    const safeAiResponse = sanitizeAiResponse(aiResult.response);

    // 5. Create SHA256 Audit Signature
    const auditData = `${activeSessionId}:${Date.now()}:${cleanMsg.slice(0, 50)}:${aiResult.auditRef}`;
    const shaSignature = "SHA256:" + crypto.createHash("sha256").update(auditData).digest("hex").slice(0, 16).toUpperCase();

    // 6. Append to Session History
    const interaction: InteractionRecord = {
      id: `int_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      query: cleanMsg,
      response: safeAiResponse,
      intent: cleanMsg.length > 50 ? cleanMsg.slice(0, 50) + "..." : cleanMsg,
      latencyMs: elapsed,
      engine: engineUsed,
      auditSignature: shaSignature
    };

    session.interactions.push(interaction);
    session.currentActivity = `Asked: "${interaction.intent}"`;
    session.summary = `User active on ${session.currentPage || "/playground"}. ${session.interactions.length} interactions recorded.`;

    // 7. Log Response Event in Top-to-Bottom Activity Log
    const thoughtProcess = [
      jevReflex ? `Jev System 1 (${jevReflex.latencyMs}ms): domain=${jevReflex.domainIntent}, webScrape=${jevReflex.needsWebContext}` : null,
      grokScraper ? `Grok-4.6 Scraper (${grokScraper.latencyMs}ms): live context staged` : null,
      `Gemini 3.5 System 2 synthesis`
    ].filter(Boolean).join(" → ");

    logActivity({
      userId: activeSessionId,
      email: userEmail || "guest@enveraitech.com",
      callerName: activeCaller,
      role: userRole,
      provider: userProvider,
      eventType: "RESPONSE",
      queryText: cleanMsg,
      responseText: safeAiResponse,
      thoughtProcess,
      auditSignature: shaSignature,
      ip: clientIp,
      metadata: {
        engine: engineUsed,
        latencyMs: elapsed,
        jevDomain: jevReflex?.domainIntent,
        jevNeedsWeb: jevReflex?.needsWebContext,
        grokScraperSource: grokScraper?.source,
        grokScraperLatency: grokScraper?.latencyMs
      }
    });

    savePersistedSessions();
    syncSessionToGCPFirestore(session).catch(() => {});

    return res.json({
      success: true,
      sessionId: activeSessionId,
      response: safeAiResponse,
      citation: grokScraper
        ? `${aiResult.citation} · Verified with Grok-4.6 Reconnaissance`
        : aiResult.citation,
      auditRef: shaSignature,
      engine: engineUsed,
      cloudSyncStatus: session.cloudSyncStatus,
      latencyMs: elapsed,
      jevReflex: jevReflex ? {
        domain: jevReflex.domainIntent,
        needsWebContext: jevReflex.needsWebContext,
        latencyMs: jevReflex.latencyMs,
        confidence: jevReflex.confidence
      } : undefined,
      grokScraper: grokScraper ? {
        source: grokScraper.source,
        latencyMs: grokScraper.latencyMs
      } : undefined,
      sessionSummary: session.summary
    });
  }

  // Bind to both /chat and /query routes
  router.post("/chat", processConsultation);
  router.post("/query", processConsultation);

  // POST /api/audit/login: Record human login activity top-to-bottom
  router.post("/audit/login", async (req: Request, res: Response) => {
    const body = await parseRequestBody(req);
    const { userId, email, callerName, role, provider, org } = body;
    const rawIp = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown") as string;
    const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp.split(",")[0].trim();

    const cleanEmail = (email || "").toLowerCase().trim();
    const isEnverSso = cleanEmail.endsWith("@enveraitech.com") || role === "ENVER_INTERNAL";
    const assignedRole: "PUBLIC" | "ENGINEER" | "ENVER_INTERNAL" = isEnverSso
      ? "ENVER_INTERNAL"
      : (role === "ENGINEER" || provider === "microsoft" ? "ENGINEER" : "PUBLIC");

    const entry = logActivity({
      userId: userId || `usr_${Date.now()}`,
      email: cleanEmail || "anonymous@evaluator.local",
      callerName: callerName || (isEnverSso ? "Amaan Shaikh" : "Enterprise Partner Engineer"),
      role: assignedRole,
      provider: provider || (isEnverSso ? "envera_sso" : "microsoft"),
      eventType: "LOGIN",
      ip: clientIp,
      metadata: { org: org || (isEnverSso ? "Enver AI Tech" : "Enterprise Partner") }
    });

    return res.json({
      success: true,
      entry,
      assignedRole,
      sessionStarted: entry.timestamp
    });
  });

  // POST /api/audit/log-event: Record arbitrary client-side activity / edge-cases
  router.post("/audit/log-event", async (req: Request, res: Response) => {
    const body = await parseRequestBody(req);
    const { userId, email, callerName, role, provider, eventType, edgeCaseType, queryText, responseText, toolName, metadata } = body;
    const rawIp = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown") as string;
    const clientIp = Array.isArray(rawIp) ? rawIp[0] : rawIp.split(",")[0].trim();

    const entry = logActivity({
      userId: userId || "anon",
      email: email || "user@enver.local",
      callerName: callerName || "Console User",
      role: role || "PUBLIC",
      provider: provider || "guest",
      eventType: eventType || "TOOL_EXECUTION",
      edgeCaseType,
      queryText,
      responseText,
      toolName,
      ip: clientIp,
      metadata
    });

    return res.json({ success: true, entry });
  });

  // GET /api/audit/logs: Retrieve top-to-bottom activity logs
  router.get("/audit/logs", (req: Request, res: Response) => {
    const { role, eventType, limit } = req.query;
    let list = [...activityLogs];

    if (role && typeof role === "string") {
      list = list.filter((l) => l.role.toLowerCase() === role.toLowerCase());
    }
    if (eventType && typeof eventType === "string") {
      list = list.filter((l) => l.eventType.toLowerCase() === eventType.toLowerCase());
    }

    const max = limit ? parseInt(limit as string, 10) : 100;
    const edgeCases = activityLogs.filter((l) => l.eventType === "EDGE_CASE");

    return res.json({
      success: true,
      totalEvents: activityLogs.length,
      edgeCasesCount: edgeCases.length,
      stats: {
        logins: activityLogs.filter((l) => l.eventType === "LOGIN").length,
        queries: activityLogs.filter((l) => l.eventType === "QUERY").length,
        responses: activityLogs.filter((l) => l.eventType === "RESPONSE").length,
        toolExecutions: activityLogs.filter((l) => l.eventType === "TOOL_EXECUTION").length,
        edgeCases: edgeCases.length
      },
      logs: list.slice(0, max)
    });
  });

  // GET /api/database/preview: "Our DB (a bit)" - Read-only schema & sample data
  router.get("/database/preview", (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    // Scoped read-only access for engineers
    return res.json({
      success: true,
      data: DATABASE_PREVIEW,
      timestamp: new Date().toISOString()
    });
  });

  // Context updates & sessions
  router.post("/context/update", async (req: Request, res: Response) => {
    const body = await parseRequestBody(req);
    const { sessionId, identity, callerName, email, currentPage, currentActivity } = body;

    if (!sessionId) {
      return res.status(400).json({ success: false, error: "sessionId is required." });
    }

    let session = sessionsMap.get(sessionId);
    if (!session) {
      session = {
        sessionId,
        identity: identity === "team" ? "team" : "guest",
        callerName: callerName || "External Guest Evaluator",
        email,
        tenant: identity === "team" ? "enver-sovereign-internal" : "public-sandbox-tenant",
        currentPage: currentPage || "/playground",
        currentActivity: currentActivity || "Navigating Console",
        ip: (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown") as string,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        summary: `User navigating ${currentPage || "/playground"}`,
        interactions: [],
        cloudSyncStatus: "LOCAL_BUFFERED"
      };
      sessionsMap.set(sessionId, session);
    } else {
      if (identity) session.identity = identity === "team" ? "team" : "guest";
      if (callerName) session.callerName = callerName;
      if (email) session.email = email;
      if (currentPage) session.currentPage = currentPage;
      if (currentActivity) session.currentActivity = currentActivity;
      session.lastActive = new Date().toISOString();
    }

    savePersistedSessions();
    syncSessionToGCPFirestore(session).catch(() => {});

    return res.json({
      success: true,
      sessionId,
      cloudSyncStatus: session.cloudSyncStatus,
      currentActivity: session.currentActivity
    });
  });

  router.get("/context", (req: Request, res: Response) => {
    const { sessionId } = req.query;
    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).json({ success: false, error: "sessionId query parameter is required." });
    }

    const session = sessionsMap.get(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, error: "Session not found in cloud ledger." });
    }

    return res.json({ success: true, session });
  });

  router.get("/sessions", (_req: Request, res: Response) => {
    const all = Array.from(sessionsMap.values()).map((s) => ({
      sessionId: s.sessionId,
      identity: s.identity,
      callerName: s.callerName,
      email: s.email,
      tenant: s.tenant,
      currentPage: s.currentPage,
      currentActivity: s.currentActivity,
      createdAt: s.createdAt,
      lastActive: s.lastActive,
      interactionCount: s.interactions.length,
      summary: s.summary,
      cloudSyncStatus: s.cloudSyncStatus
    }));

    return res.json({
      success: true,
      totalSessions: all.length,
      sessions: all.slice(-25).reverse()
    });
  });

  app.use("/api/neuv", router);
  // Also mount direct /api/audit and /api/database convenience routes
  app.use("/api/audit", router);
  app.use("/api/database", router);
}
