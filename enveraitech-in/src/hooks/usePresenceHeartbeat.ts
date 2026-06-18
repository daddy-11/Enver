"use client";

import { useEffect } from "react";

/**
 * Posts a presence heartbeat while the workspace tab is active, so the backend
 * can record durable activity sessions ("active from when to when"). Pauses when
 * the tab is hidden and resumes on focus.
 */
export function usePresenceHeartbeat(intervalMs = 30_000) {
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    const beat = () => {
      if (typeof document !== "undefined" && document.hidden) return;
      fetch("/api/presence/beat", { method: "POST" }).catch(() => {});
    };

    beat(); // immediate
    timer = setInterval(beat, intervalMs);

    const onVisibility = () => {
      if (!document.hidden) beat();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (timer) clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [intervalMs]);
}
