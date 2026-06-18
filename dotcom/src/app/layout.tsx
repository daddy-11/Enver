import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: { default: "Enver AI Tech — AI Lab", template: "%s · Enver AI Tech" },
  description: "Independent AI lab building production-grade spatial intelligence and document analysis systems. PostGIS, pgvector, and enterprise auth infrastructure.",
  keywords: ["AI Lab", "PostGIS", "pgvector", "geospatial", "Supabase", "vector embeddings"],
  authors: [{ name: "Enver AI Tech", url: "https://enver-ai.tech" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Enver AI Tech",
    title: "Enver AI Tech — AI Lab",
    description: "Production-grade AI systems: spatial intelligence and document analysis at scale.",
    url: "https://enver-ai.tech",
  },
  twitter: { card: "summary_large_image", title: "Enver AI Tech" },
  // Security: no phone number detection, no format detection
  other: { "format-detection": "telephone=no" },
};

export const viewport: Viewport = {
  themeColor: "#FAF6EF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

import { PageLoader } from "@/components/ui/PageLoader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
