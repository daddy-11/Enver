"use client";

import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    // Add ThemeProvider, AuthProvider, etc. here as they're wired up
    <>{children}</>
  );
}
