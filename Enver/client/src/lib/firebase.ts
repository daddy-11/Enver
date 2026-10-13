/**
 * Backward compatibility alias: re-exports from sovereign enterprise auth module.
 * No Firebase dependency or network overhead.
 */
export * from "./auth";

// Mock auth object for legacy references
export const auth = {
  currentUser: null
};

// Mock db object for legacy references
export const db = {};
