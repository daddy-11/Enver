"use client";

import { useSession as useBetterAuthSession } from "@/lib/auth/auth-client";

/**
 * Hook to access the current authenticated session.
 * Returns null if not authenticated.
 */
export function useCurrentUser() {
  const { data: session, isPending, error } = useBetterAuthSession();

  return {
    user: session?.user ?? null,
    session: session ?? null,
    isLoading: isPending,
    isAuthenticated: Boolean(session?.user),
    error,
  };
}
