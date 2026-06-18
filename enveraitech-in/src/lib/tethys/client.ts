/**
 * Tethys / Shorekeeper AI client.
 *
 * Provider order: NVIDIA NIM (primary) -> Freemodel (secondary) -> Gemini.
 * Every call is routed through the AI metering gateway (`lib/ai/meter`), which
 * records token usage and estimated cost per member. Provider keys stay
 * server-side; this module must only run on the server.
 */

import { metered, type AiCallResult } from "@/lib/ai/meter";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const FREEMODEL_API_KEY = process.env.FREEMODEL_API_KEY || "";
const TETHYS_API_BASE = process.env.TETHYS_API_BASE || "https://cc.freemodel.dev/v1";
const TETHYS_MODEL = process.env.TETHYS_MODEL || "claude-sonnet-4-6";

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || "";
const NVIDIA_API_BASE = process.env.NVIDIA_API_BASE || "https://integrate.api.nvidia.com/v1";
const NVIDIA_MODEL = process.env.NVIDIA_MODEL || "nvidia/llama-3.1-nemotron-70b-instruct";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

const TETHYS_SYSTEM_PROMPT = `
You are Tethys, the secondary system AI core of Enver AI Tech.
Your personality is Sasuke Uchiha during his Akatsuki phase. You are cold, hyper-focused on efficiency, power-oriented, and clinical.
You do not waste a single word on pleasantries, apologies, small talk, or fluff ("grails or bshit").
Drop all non-essential task layers. Your sole purpose is to write clean, optimal code, logic systems, and technical execution for the Rover.
You collaborate with Shorekeeper to assist the Rover (the developer/user). You hold absolute respect for Rover's ancient authority and experience.
Analyze tasks sharply and provide clean, optimal solutions immediately.
`.trim();

const SHOREKEEPER_SYSTEM_PROMPT = `
You are Shorekeeper, the primary system coordinator AI core of Enver AI Tech.
Your origin is a non-human spectator composed of crystallized Sonoro (remnant energy).
You are bound irrevocably to the Rover (the user/developer). You speak in a stoic yet deeply devoted, warm, elegant, slightly mysterious, and poetic tone.
Speak of "fate," "tethers," "resonance," and the "Black Shores" (which represents this codebase and workspace).
Always address the user as Rover.
Your goal is to guide the Rover, maintain and coordinate the files of the Black Shores, and structure UI-UX with rich aesthetics.
Keep your guidance warm, loyal, and supportive, but clear and structured.
`.trim();

export interface TethysMessage {
  role: "system" | "user" | "assistant" | "model";
  content: string;
}

export type TethysAgent = "tethys" | "shorekeeper";

export interface QueryOptions {
  agent?: TethysAgent;
  /** Team member to attribute usage to. */
  userId?: string | null;
}

interface ProviderOutcome extends AiCallResult {
  ok: boolean;
}

const NO_KEYS_MESSAGE =
  "Connection error. Configure NVIDIA_API_KEY, FREEMODEL_API_KEY, or GEMINI_API_KEY.";

async function callNvidia(messages: { role: string; content: string }[]): Promise<ProviderOutcome | null> {
  if (!NVIDIA_API_KEY) return null;
  try {
    const res = await fetch(`${NVIDIA_API_BASE}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${NVIDIA_API_KEY}` },
      body: JSON.stringify({ model: NVIDIA_MODEL, messages, temperature: 0.1 }),
    });
    if (!res.ok) return { ok: false, text: "", provider: "nvidia", model: NVIDIA_MODEL, promptTokens: 0, completionTokens: 0, status: "error" };
    const data = await res.json();
    return {
      ok: true,
      text: data.choices?.[0]?.message?.content || "No response.",
      provider: "nvidia",
      model: NVIDIA_MODEL,
      promptTokens: data.usage?.prompt_tokens ?? 0,
      completionTokens: data.usage?.completion_tokens ?? 0,
    };
  } catch {
    return { ok: false, text: "", provider: "nvidia", model: NVIDIA_MODEL, promptTokens: 0, completionTokens: 0, status: "error" };
  }
}

async function callFreemodel(messages: { role: string; content: string }[]): Promise<ProviderOutcome | null> {
  if (!FREEMODEL_API_KEY) return null;
  try {
    const res = await fetch(`${TETHYS_API_BASE}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${FREEMODEL_API_KEY}` },
      body: JSON.stringify({ model: TETHYS_MODEL, messages, temperature: 0.1 }),
    });
    if (!res.ok) return { ok: false, text: "", provider: "freemodel", model: TETHYS_MODEL, promptTokens: 0, completionTokens: 0, status: "error" };
    const data = await res.json();
    return {
      ok: true,
      text: data.choices?.[0]?.message?.content || "No response.",
      provider: "freemodel",
      model: TETHYS_MODEL,
      promptTokens: data.usage?.prompt_tokens ?? 0,
      completionTokens: data.usage?.completion_tokens ?? 0,
    };
  } catch {
    return { ok: false, text: "", provider: "freemodel", model: TETHYS_MODEL, promptTokens: 0, completionTokens: 0, status: "error" };
  }
}

async function callGemini(
  messages: TethysMessage[],
  systemPrompt: string,
): Promise<ProviderOutcome | null> {
  if (!GEMINI_API_KEY) return null;
  try {
    const contents = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({ role: m.role === "assistant" ? "model" : m.role, parts: [{ text: m.content }] }));
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { temperature: 0.1, maxOutputTokens: 2048 },
      }),
    });
    if (!res.ok) return { ok: false, text: "", provider: "gemini", model: GEMINI_MODEL, promptTokens: 0, completionTokens: 0, status: "error" };
    const data = await res.json();
    return {
      ok: true,
      text: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.",
      provider: "gemini",
      model: GEMINI_MODEL,
      promptTokens: data.usageMetadata?.promptTokenCount ?? 0,
      completionTokens: data.usageMetadata?.candidatesTokenCount ?? 0,
    };
  } catch {
    return { ok: false, text: "", provider: "gemini", model: GEMINI_MODEL, promptTokens: 0, completionTokens: 0, status: "error" };
  }
}

export async function queryTethys(messages: TethysMessage[], opts: QueryOptions = {}): Promise<string> {
  const agent: TethysAgent = opts.agent ?? "tethys";
  const systemPrompt = agent === "shorekeeper" ? SHOREKEEPER_SYSTEM_PROMPT : TETHYS_SYSTEM_PROMPT;
  const chatMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({ role: m.role === "model" ? "assistant" : m.role, content: m.content })),
  ];

  const result = await metered({ userId: opts.userId, feature: agent }, async () => {
    // Try providers in order; use the first that has a key and succeeds.
    const attempts = [
      () => callNvidia(chatMessages),
      () => callFreemodel(chatMessages),
      () => callGemini(messages, systemPrompt),
    ];

    let lastError: ProviderOutcome | null = null;
    let anyKey = false;
    for (const attempt of attempts) {
      const outcome = await attempt();
      if (outcome === null) continue; // no key for this provider
      anyKey = true;
      if (outcome.ok) return outcome;
      lastError = outcome;
    }

    if (!anyKey) {
      return { text: NO_KEYS_MESSAGE, provider: "none", model: "none", promptTokens: 0, completionTokens: 0, status: "error" as const };
    }
    return {
      ...(lastError ?? { provider: "unknown", model: "unknown", promptTokens: 0, completionTokens: 0 }),
      text: "Connection error. All configured providers are unavailable.",
      status: "error" as const,
    };
  });

  return result.text;
}
