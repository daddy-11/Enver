import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orange Farm Mapper",
};

export default async function OrangeFarmPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/login?redirect=/apps/orange-farm");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--void)",
        padding: "5rem 2rem 4rem",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#00e5cc",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 6px #22c55e",
              }}
            />
            Geospatial Intelligence · PostGIS
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "2.25rem",
              letterSpacing: "-0.03em",
              color: "var(--white)",
              marginBottom: "0.5rem",
            }}
          >
            Orange Farm Mapper
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              color: "#6b6b6b",
              maxWidth: "560px",
            }}
          >
            Spatial plot management with PostGIS geography columns, MVT tile
            serving via pg_tileserv, and MapLibre GL rendering. Authenticated
            user: <span style={{ color: "#f07d00" }}>{session.user.email}</span>
          </p>
        </div>

        {/* Map placeholder — wire in MapLibre + Supabase tile endpoint */}
        <div
          style={{
            width: "100%",
            height: "540px",
            background: "var(--carbon)",
            border: "1px solid rgba(0,229,204,0.15)",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Animated grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(0,229,204,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,204,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Contour rings */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            viewBox="0 0 800 540"
            preserveAspectRatio="xMidYMid slice"
          >
            {[200, 160, 120, 80, 40].map((r, i) => (
              <ellipse
                key={i}
                cx="400"
                cy="270"
                rx={r * 3}
                ry={r * 1.8}
                fill="none"
                stroke={`rgba(0,229,204,${0.05 + i * 0.025})`}
                strokeWidth="1"
              />
            ))}
            {/* Plot points */}
            {[
              [280, 200], [320, 185], [360, 180], [400, 178], [440, 180],
              [480, 185], [520, 200], [300, 230], [340, 215], [380, 210],
              [420, 210], [460, 215], [500, 230], [320, 260], [360, 248],
              [400, 244], [440, 248], [480, 260],
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="6" fill="rgba(240,125,0,0.1)" stroke="rgba(240,125,0,0.4)" strokeWidth="1"/>
                <circle cx={cx} cy={cy} r="2.5" fill="#f07d00" opacity="0.85"/>
              </g>
            ))}
            {/* Active selection */}
            <rect
              x="340"
              y="160"
              width="120"
              height="110"
              fill="rgba(0,229,204,0.04)"
              stroke="rgba(0,229,204,0.4)"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
          </svg>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              padding: "2rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "#3d3d3d",
                marginBottom: "1rem",
                letterSpacing: "0.08em",
              }}
            >
              MapLibre GL · PostGIS MVT tiles
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "#2d2d2d",
              }}
            >
              Install MapLibre + wire pg_tileserv tile endpoint to activate
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            marginTop: "1px",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          {[
            { label: "Active Plots", value: "—", unit: "farms" },
            { label: "Total Area", value: "—", unit: "ha" },
            { label: "Tree Count", value: "—", unit: "trees" },
            { label: "Tile Cache", value: "—", unit: "tiles" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: "1.25rem 1.5rem",
                background: "var(--graphite)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#00e5cc",
                  marginBottom: "0.25rem",
                }}
              >
                {stat.value}{" "}
                <span style={{ fontSize: "0.6rem", color: "#3d3d3d" }}>
                  {stat.unit}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#3d3d3d",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
