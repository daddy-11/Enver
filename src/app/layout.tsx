import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Providers } from "@/components/layout/Providers";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Enver-AI Tech — AI Lab Hub",
    template: "%s · Enver-AI Tech",
  },
  description:
    "AI research lab building production-grade spatial intelligence and document analysis systems. PostGIS geospatial mapping, pgvector similarity search, and real-time data pipelines.",
  keywords: [
    "AI Lab",
    "PostGIS",
    "pgvector",
    "geospatial",
    "Supabase",
    "orange farming",
    "resume analysis",
    "vector embeddings",
  ],
  authors: [{ name: "Enver-AI Tech" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Enver-AI Tech",
    title: "Enver-AI Tech — AI Lab Hub",
    description:
      "Production-grade AI systems: spatial intelligence and document analysis at scale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enver-AI Tech",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css" />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
