"use client";

/**
 * Browser-side Supabase Realtime client for the lounge.
 *
 * The client connects with the public anon key, then authenticates the realtime
 * socket with a short-lived team token from /api/realtime/token. Returns null if
 * Supabase env vars are absent so the lounge degrades gracefully (chat still
 * persists through the API; live delivery is simply disabled).
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

async function fetchRealtimeToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/realtime/token", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.token ?? null;
  } catch {
    return null;
  }
}

export async function getLoungeClient(): Promise<SupabaseClient | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;

  const token = await fetchRealtimeToken();
  if (!token) return null;

  if (!cached) {
    cached = createClient(url, anon, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  // Authenticate the realtime socket with the team token.
  cached.realtime.setAuth(token);
  return cached;
}

export function loungeChannelName(roomId: string): string {
  return `lounge:${roomId}`;
}
