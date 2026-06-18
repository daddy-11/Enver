/**
 * Per-model token prices, used to estimate the cost of each AI call.
 *
 * Prices are USD per 1,000 tokens. These are estimates for the per-member
 * usage view — the authoritative org spend comes from the Cloud Billing
 * export. Update as provider pricing changes; can graduate to a DB table.
 */

export interface ModelPrice {
  inputPer1k: number;
  outputPer1k: number;
}

// provider:model -> price. Keys are matched case-insensitively, longest-prefix.
const PRICES: Record<string, ModelPrice> = {
  // Google Gemini (AI Studio / Vertex) — approximate public list prices.
  "gemini:gemini-2.0-flash": { inputPer1k: 0.0001, outputPer1k: 0.0004 },
  "gemini:gemini-2.5-flash": { inputPer1k: 0.00015, outputPer1k: 0.0006 },
  "gemini:gemini-2.5-pro": { inputPer1k: 0.00125, outputPer1k: 0.01 },
  "gemini:gemini-1.5-flash": { inputPer1k: 0.000075, outputPer1k: 0.0003 },

  // NVIDIA NIM — most catalog models are free in preview; treat as 0 unless billed.
  "nvidia:nvidia/llama-3.1-nemotron-70b-instruct": { inputPer1k: 0, outputPer1k: 0 },

  // Freemodel proxy — varies by upstream model; default 0, override as needed.
};

const DEFAULT_PRICE: ModelPrice = { inputPer1k: 0, outputPer1k: 0 };

export function priceFor(provider: string, model: string): ModelPrice {
  const key = `${provider}:${model}`.toLowerCase();
  if (PRICES[key]) return PRICES[key];

  // Longest-prefix fallback (e.g. a versioned model name).
  let best: ModelPrice | undefined;
  let bestLen = -1;
  for (const [k, v] of Object.entries(PRICES)) {
    if (key.startsWith(k) && k.length > bestLen) {
      best = v;
      bestLen = k.length;
    }
  }
  return best ?? DEFAULT_PRICE;
}

export function estimateCostUsd(
  provider: string,
  model: string,
  promptTokens: number,
  completionTokens: number,
): number {
  const p = priceFor(provider, model);
  const cost = (promptTokens / 1000) * p.inputPer1k + (completionTokens / 1000) * p.outputPer1k;
  // Round to 6 decimal places to match the numeric(12,6) column.
  return Math.round(cost * 1e6) / 1e6;
}
