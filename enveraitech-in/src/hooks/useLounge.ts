"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { getLoungeClient, loungeChannelName } from "@/lib/realtime/client";

export interface LoungeMessageView {
  id: string;
  roomId: string;
  userId: string;
  authorName: string;
  authorColor: string;
  content: string;
  createdAt: string;
}

export interface PresenceMember {
  userId: string;
  name: string;
  color: string;
  inVoice: boolean;
  typing: boolean;
}

interface UseLoungeArgs {
  id: string;
  name: string;
  color?: string;
}

interface PresencePayload extends PresenceMember {
  onlineAt: string;
}

export function useLounge(user: UseLoungeArgs) {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [meetUrl, setMeetUrl] = useState<string | null>(null);
  const [messages, setMessages] = useState<LoungeMessageView[]>([]);
  const [online, setOnline] = useState<PresenceMember[]>([]);
  const [connected, setConnected] = useState(false);
  const [inVoice, setInVoice] = useState(false);
  const [loading, setLoading] = useState(true);

  const channelRef = useRef<RealtimeChannel | null>(null);
  const selfRef = useRef<PresencePayload>({
    userId: user.id,
    name: user.name,
    color: user.color ?? "#3a9a3c",
    inVoice: false,
    typing: false,
    onlineAt: "",
  });

  const pushPresence = useCallback(async () => {
    const ch = channelRef.current;
    if (!ch) return;
    try {
      await ch.track({ ...selfRef.current });
    } catch {
      /* not subscribed yet */
    }
  }, []);

  // Load room + history, then connect realtime.
  useEffect(() => {
    let cancelled = false;

    async function init() {
      setLoading(true);
      try {
        const roomsRes = await fetch("/api/lounge/rooms", { cache: "no-store" });
        const roomsData = await roomsRes.json();
        const general =
          (roomsData.rooms ?? []).find((r: { name: string }) => r.name === "general") ??
          (roomsData.rooms ?? [])[0];
        if (!general || cancelled) return;

        setRoomId(general.id);
        setMeetUrl(general.meetUrl ?? null);

        const msgRes = await fetch(`/api/lounge/messages?roomId=${general.id}`, { cache: "no-store" });
        const msgData = await msgRes.json();
        if (!cancelled) setMessages(msgData.messages ?? []);

        // Realtime is best-effort.
        const client = await getLoungeClient();
        if (!client || cancelled) return;

        const channel = client.channel(loungeChannelName(general.id), {
          // Private channel: Supabase checks Realtime Authorization (RLS on
          // realtime.messages) against the team token. See
          // enveraitech-in/src/lib/db/migrations/realtime_authorization.sql
          config: { private: true, presence: { key: user.id }, broadcast: { self: false } },
        });
        channelRef.current = channel;

        channel.on("broadcast", { event: "message" }, ({ payload }) => {
          const msg = payload as LoungeMessageView;
          setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
        });

        channel.on("presence", { event: "sync" }, () => {
          const state = channel.presenceState<PresencePayload>();
          const members: PresenceMember[] = Object.values(state)
            .map((entries) => entries[0])
            .filter(Boolean)
            .map((e) => ({
              userId: e.userId,
              name: e.name,
              color: e.color,
              inVoice: e.inVoice,
              typing: e.typing,
            }));
          setOnline(members);
        });

        channel.subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            setConnected(true);
            selfRef.current.onlineAt = new Date().toISOString();
            await pushPresence();
          } else if (status === "CLOSED" || status === "CHANNEL_ERROR") {
            setConnected(false);
          }
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
      const ch = channelRef.current;
      if (ch) {
        ch.unsubscribe();
        channelRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const sendMessage = useCallback(
    async (content: string): Promise<boolean> => {
      const trimmed = content.trim();
      if (!trimmed || !roomId) return false;
      try {
        const res = await fetch("/api/lounge/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomId, content: trimmed }),
        });
        if (!res.ok) return false;
        const { message } = await res.json();
        setMessages((prev) => (prev.some((m) => m.id === message.id) ? prev : [...prev, message]));
        const ch = channelRef.current;
        if (ch) ch.send({ type: "broadcast", event: "message", payload: message });
        return true;
      } catch {
        return false;
      }
    },
    [roomId],
  );

  const joinVoice = useCallback(async () => {
    if (!roomId) return;
    try {
      const res = await fetch("/api/voice/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId }),
      });
      if (!res.ok) return;
      const data = await res.json();
      setInVoice(true);
      selfRef.current.inVoice = true;
      await pushPresence();
      const url = data.meetUrl ?? meetUrl;
      if (url && typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      /* ignore */
    }
  }, [roomId, meetUrl, pushPresence]);

  const leaveVoice = useCallback(async () => {
    if (!roomId) return;
    try {
      await fetch("/api/voice/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId }),
      });
    } catch {
      /* ignore */
    } finally {
      setInVoice(false);
      selfRef.current.inVoice = false;
      await pushPresence();
    }
  }, [roomId, pushPresence]);

  return {
    roomId,
    meetUrl,
    messages,
    online,
    connected,
    inVoice,
    loading,
    sendMessage,
    joinVoice,
    leaveVoice,
  };
}
