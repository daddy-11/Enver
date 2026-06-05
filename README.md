# Enver-AI Tech — AI Lab Hub

Production-grade Next.js AI lab hosting two core applications:
**Orange Farm Geospatial Mapper** (PostGIS + pg_tileserv) and **Resume Comparer** (pgvector + Supabase Storage).

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + Space Mono / Syne fonts |
| Auth | Better Auth v1 |
| ORM | Drizzle ORM |
| Database | Supabase PostgreSQL |
| Spatial | PostGIS, pg_tileserv |
| Vector | pgvector (HNSW, 1536-dim) |
| Storage | Supabase Storage |
| Animations | Framer Motion + CSS canvas |
| Deployment | Vercel + Supabase |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── auth/
│   │   ├── login/page.tsx          # Login form
│   │   └── signup/page.tsx         # Registration form
│   ├── dashboard/page.tsx          # Authenticated hub
│   ├── apps/
│   │   ├── orange-farm/page.tsx    # Geospatial app
│   │   └── resume-comparer/page.tsx
│   └── api/
│       ├── auth/[...all]/route.ts  # Better Auth handler
│       ├── farms/plots/route.ts    # PostGIS plots CRUD
│       └── resumes/
│           ├── route.ts            # Upload to Supabase Storage
│           └── compare/route.ts    # pgvector similarity
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── Providers.tsx
│   └── sections/
│       ├── HeroSection.tsx         # Canvas-animated hero
│       ├── AppsSection.tsx         # App showcase cards
│       └── StackSection.tsx        # Tech stack breakdown
├── lib/
│   ├── auth/
│   │   ├── auth.ts                 # Better Auth server config
│   │   ├── auth-client.ts          # Browser client
│   │   └── middleware-helper.ts
│   ├── db/
│   │   ├── index.ts                # Drizzle instance
│   │   ├── schema.ts               # All tables
│   │   └── migrations/
│   │       └── 001_postgis_pgvector.sql
│   ├── supabase/
│   │   ├── client.ts               # Browser Supabase client
│   │   └── server.ts               # Server + service clients
│   └── utils.ts
├── hooks/
│   └── useCurrentUser.ts
├── middleware.ts                   # Route protection
├── styles/globals.css
└── types/index.ts
```

---

## Setup

### 1. Clone + Install

```bash
git clone <repo>
cd enver-ai-tech
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (server-only)
- `DATABASE_URL` — direct Postgres connection string
- `BETTER_AUTH_SECRET` — random 32-char secret
- `BETTER_AUTH_URL` — app URL (http://localhost:3000 in dev)

### 3. Supabase Setup

1. Create a new Supabase project
2. In the Supabase SQL editor, run `src/lib/db/migrations/001_postgis_pgvector.sql`
3. Create a `resumes` storage bucket (private)
4. Run Drizzle migrations:

```bash
npm run db:push
```

Add to `package.json` scripts:
```json
"db:push": "drizzle-kit push",
"db:studio": "drizzle-kit studio"
```

### 4. Enable PostGIS + pgvector

In your Supabase project → Database → Extensions:
- Enable `postgis`
- Enable `vector`

Or run:
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS vector;
```

### 5. Dev Server

```bash
npm run dev
```

Visit http://localhost:3000

---

## Auth Routes

| Route | Protection | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/auth/login` | Redirects if authed | Login form |
| `/auth/signup` | Redirects if authed | Registration |
| `/dashboard` | **Protected** | App hub |
| `/apps/orange-farm` | **Protected** | PostGIS app |
| `/apps/resume-comparer` | **Protected** | pgvector app |

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET/POST` | `/api/auth/[...all]` | Better Auth handler |
| `GET` | `/api/farms/plots` | List user's farm plots |
| `POST` | `/api/farms/plots` | Create farm plot |
| `GET` | `/api/resumes` | List user's resumes |
| `POST` | `/api/resumes` | Upload PDF → Supabase Storage |
| `POST` | `/api/resumes/compare` | Cosine similarity via pgvector |

---

## Next Steps

### Orange Farm
- Install MapLibre GL: `npm install maplibre-gl`
- Set up `pg_tileserv` against your Supabase DB
- Wire tile endpoint to `NEXT_PUBLIC_TILE_URL`
- Implement plot draw tool with Turf.js polygon creation

### Resume Comparer
- Deploy Supabase Edge Function `embed-resume` (pdfjs-dist + OpenAI)
- Implement polling for `embeddingStatus` on the frontend
- Add section-level diff UI with skill gap highlighting

---

## Visual Assets (Higgsfield MCP)

Hero background and app card visuals are SVG/canvas-generated. To swap in AI-generated images:
1. Connect your Higgsfield account at https://higgsfield.ai
2. Run generation for hero image: aerial orange grove, PostGIS grid overlay
3. Add returned CDN URLs to `next.config.ts` `remotePatterns`
4. Replace canvas backgrounds with `<Image>` components

---

## Design System

**Fonts:** Space Mono (mono/code), Syne (display/UI)  
**Palette:** Industrial Ember — `#f07d00` (primary), `#00e5cc` (geospatial), `#d4ff4a` (vectors), `#080808` (void)  
**Motion:** CSS keyframe animations + Intersection Observer reveals  
**Aesthetic:** Dark industrial, monospace-heavy, brutally minimal chrome
