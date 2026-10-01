# System Health and Security Audit Report

**Audit Timestamp:** 2026-06-26 04:30:05
**Target Directory:** `C:\Users\dbleg\OneDrive\Desktop\website`

---
## 1. Secrets & Credentials Scan
> [!WARNING]
> Hardcoded credentials detected in source code files! Redact these immediately.

| File | Credential Type | Redacted Exposure |
| :--- | :--- | :--- |
| `.github\skills\caveman\tests\caveman-compress\claude-md-project.md` | Database Credentials (URL) | `postgres...432/` |
| `.github\skills\caveman\tests\caveman-compress\claude-md-project.original.md` | Database Credentials (URL) | `postgres...432/` |
| `dotcom\reset.js` | Database Credentials (URL) | `postgres...432/` |
| `dotcom\src\lib\db\index.ts` | Database Credentials (URL) | `postgres...432/` |
| `enveraitech-in\src\lib\db\index.ts` | Database Credentials (URL) | `postgres...432/` |
| `enveraitech-in\src\lib\db\index.ts` | Database Credentials (URL) | `postgres...432/` |

## 2. Git Configuration Safety
> [!NOTE]
> **Pass:** Configuration files containing credentials are excluded from Git repository index.

## 3. Input Validation Architecture
> [!NOTE]
> **Pass:** Schema validation library imports detected in source files (e.g. Zod).

## 4. Critical Dependencies Check
| Dependency | Description | Status |
| :--- | :--- | :--- |
| `zod` | Required infrastructure/auth component | ✅ Detected in `dotcom, enveraitech-in` |
| `better-auth` | Required infrastructure/auth component | ✅ Detected in `dotcom, enveraitech-in` |
| `@upstash/ratelimit` | Required infrastructure/auth component | ✅ Detected in `dotcom, enveraitech-in` |
| `drizzle-orm` | Required infrastructure/auth component | ✅ Detected in `dotcom, enveraitech-in` |

## 5. Local Endpoint Status
| Service URL | Status | Response Code | Latency (ms) | Access-Control-Allow-Origin |
| :--- | :--- | :--- | :--- | :--- |
| `http://127.0.0.1:3000` | ❌ Offline | N/A | N/A | `timed out` |
| `http://127.0.0.1:8000` | ❌ Offline | N/A | N/A | `timed out` |