# Enver AI Tech

Production-grade Next.js AI lab — geospatial intelligence + document analysis, enterprise security hardened.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, RSC) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS custom properties |
| Auth | Better Auth v1 |
| ORM | Drizzle ORM |
| Database | Supabase PostgreSQL |
| Spatial | PostGIS, pg_tileserv |
| Vector | pgvector (HNSW, 1536-dim) |
| Storage | Supabase Storage |
| Rate Limiting | Upstash Redis (sliding window) |
| Email | Resend |
| Validation | Zod (all API inputs) |

## Security Architecture

### Rate Limiting (Upstash Redis)
- **Auth routes**: 10 req/60s per IP
- **Contact form**: 3 req/15min per IP  
- **Upload routes**: 5 req/60s per IP
- **General API**: 100 req/60s per IP
- Algorithm: sliding window (more accurate than fixed window)
- Fail-open: if Redis is down, traffic passes through (never block legit users due to infra failure)

### CSRF Protection
- Origin header validation on all mutating routes (POST/PUT/PATCH/DELETE)
- Fail-closed in production, open in development for DX

### Input Validation
- Zod schemas on every API route — validated before DB access
- No raw user input ever reaches SQL

### Bot Mitigation
- User-agent blocklist in middleware (sqlmap, nikto, masscan, etc.)
- Honeypot field on contact form (silent accept, discard)

### Security Headers (every response)
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy` — strict allowlist
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — all sensors disabled
- `X-Powered-By` header removed

### Database Security
- Row-Level Security enabled on all application tables
- Service-role key server-only, never in client bundles
- SSL required in production (`ssl: "require"`)

## Setup

```bash
git clone <repo>
cd enver-ai-tech
cp .env.example .env.local   # fill in all values
npm install
npm run db:push              # push schema to Supabase
```

Then run the SQL migration in Supabase SQL editor:
```
src/lib/db/migrations/001_postgis_pgvector.sql
```

Start dev server:
```bash
npm run dev
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/     ← Better Auth handler
│   │   ├── contact/           ← Rate-limited, CSRF-checked, Zod-validated
│   │   ├── farms/plots/       ← PostGIS CRUD
│   │   └── resumes/           ← Upload + pgvector compare
│   ├── (marketing)/           ← Public landing pages
│   ├── (protected)/           ← Auth-gated app routes
│   ├── auth/                  ← Login / signup
│   ├── contact/               ← Contact page
│   └── layout.tsx
├── components/
│   ├── layout/Navigation.tsx
│   ├── sections/              ← Hero, Projects, Security, Testimonials, CTA
│   └── ui/Logo.tsx            ← Official brand logo (SVG)
├── lib/
│   ├── auth/                  ← Better Auth server + client
│   ├── db/                    ← Drizzle + schema + migrations
│   ├── supabase/              ← Browser + server clients
│   └── security/
│       ├── rate-limit.ts      ← Upstash sliding window
│       ├── csrf.ts            ← Origin validation
│       └── validation.ts      ← Zod schemas
├── middleware.ts               ← Bot filter + rate limit + auth guard
├── styles/globals.css          ← Full design system
└── types/
```
