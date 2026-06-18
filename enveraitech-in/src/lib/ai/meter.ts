/**
 * The single AI metering gateway.
 *
 * Every AI/LLM call in the app routes through `metered()`. It times the call,
 * reads token usage from the provider response, computes an estimated cost, and
 * writes one `ai_usage_events` row. This is the only place per-member usage is
 * recorded, and it keeps provider keys server-side. Nothing should call a
 * provider directly outside this module.
 */

import { db } from "@/lib/db";
import { aiUsageEvents } from "@/lib/db/schema";
import { estimateCostUsd } from "./pricing";

export interface AiCallResult {
  text: string;
  provider: string; // "gemini" | "nvidia" | "freemodel"
  model: string;
  promptTokens: number;
  completionTokens: number;
  status?: "ok" | "error";
}

export interface MeterOptions {
  /** The team member this call is attributed to. Null for system calls. */
  userId?: string | null;
  /** Logical feature, e.g. "tethys" | "shorekeeper". */
  feature: string;
}

async function recordUsage(
  opts: MeterOptions,
  result: Pick<AiCallResult, "provider" | "model" | "promptTokens" | "completionTokens" | "status">,
  latencyMs: number,
): Promise<void> {
  const cost = estimateCostUsd(
    result.provider,
    result.model,
    result.promptTokens,
    result.completionTokens,
  );
  try {
    await db.insert(aiUsageEvents).values({
      userId: opts.userId ?? null,
      provider: result.provider,
      model: result.model,
      feature: opts.feature,
      promptTokens: result.promptTokens,
      completionTokens: result.completionTokens,
      estimatedCostUsd: cost.toFixed(6),
      latencyMs,
      status: result.status ?? "ok",
    });
  } catch (err) {
    // Metering must never break the user-facing call — log and move on.
    console.error("[ai/meter] failed to record usage:", err);
  }
}

/**
 * Run an AI call and record its usage. `run` performs the actual provider
 * request and returns the text plus token counts.
 */
export async function metered<T extends AiCallResult>(
  opts: MeterOptions,
  run: () => Promise<T>,
): Promise<T> {
  const start = Date.now();
  try {
    const result = await run();
    await recordUsage(opts, { ...result, status: result.status ?? "ok" }, Date.now() - start);
    return result;
  } catch (err) {
    await recordUsage(
      opts,
      { provider: "unknown", model: "unknown", promptTokens: 0, completionTokens: 0, status: "error" },
      Date.now() - start,
    );
    throw err;
  }
}
