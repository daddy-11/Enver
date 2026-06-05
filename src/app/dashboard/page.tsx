import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login?redirect=/dashboard");
  }

  const { user } = session;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--void)",
        padding: "7rem 2rem 4rem",
        position: "relative",
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(240,125,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(240,125,0,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "4rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#3d3d3d",
                marginBottom: "0.75rem",
              }}
            >
              — Lab Environment
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "2.5rem",
                letterSpacing: "-0.03em",
                color: "var(--white)",
              }}
            >
              Dashboard
            </h1>
          </div>
          <div
            style={{
              textAlign: "right",
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: "#3d3d3d",
            }}
          >
            <div style={{ color: "#f07d00", marginBottom: "0.25rem" }}>{user.name}</div>
            <div>{user.email}</div>
          </div>
        </div>

        {/* App tiles */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {[
            {
              slug: "orange-farm",
              label: "Geospatial Intelligence",
              title: "Orange Farm Mapper",
              desc: "PostGIS spatial queries, MVT tile serving, choropleth overlays.",
              accent: "#00e5cc",
              status: "live",
            },
            {
              slug: "resume-comparer",
              label: "Document Intelligence",
              title: "Resume Comparer",
              desc: "pgvector embeddings, cosine similarity, structured diff output.",
              accent: "#d4ff4a",
              status: "beta",
            },
          ].map((app) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}`}
              style={{
                display: "block",
                padding: "2rem",
                background: "var(--graphite)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "border-color 0.2s, transform 0.2s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = `${app.accent}40`;
                el.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: app.accent,
                  opacity: 0.4,
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: app.accent,
                  marginBottom: "0.75rem",
                }}
              >
                {app.label}
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  letterSpacing: "-0.02em",
                  color: "var(--white)",
                  marginBottom: "0.75rem",
                }}
              >
                {app.title}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "#6b6b6b",
                  lineHeight: 1.7,
                }}
              >
                {app.desc}
              </p>
              <div
                style={{
                  marginTop: "1.5rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: app.accent,
                }}
              >
                Open →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
