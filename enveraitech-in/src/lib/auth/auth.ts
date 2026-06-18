import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { TEAM_DOMAIN, isTeamMemberEmail, isTeamDomain } from "@/lib/team/roster";

// When true, only allowlisted enveraitech.com team members may create accounts.
// Set on the internal (enveraitech.in) deployment; leave unset elsewhere.
const INTERNAL_ONLY_AUTH = process.env.INTERNAL_ONLY_AUTH === "true";

// Google Workspace SSO is enabled only when OAuth credentials are present.
const googleConfigured =
  Boolean(process.env.GOOGLE_CLIENT_ID) && Boolean(process.env.GOOGLE_CLIENT_SECRET);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // Minimum password length enforced here AND in Zod schema
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  // Google Workspace SSO, hosted-domain-locked to the team domain. The `hd`
  // hint constrains Google's account picker; the create hook below is the
  // authoritative server-side enforcement.
  ...(googleConfigured
    ? {
        socialProviders: {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            hd: TEAM_DOMAIN,
          },
        },
      }
    : {}),

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // On the internal deployment, require allowlist membership. Elsewhere,
          // still enforce the team domain (preserves prior behavior).
          const allowed = INTERNAL_ONLY_AUTH
            ? isTeamMemberEmail(user.email)
            : isTeamDomain(user.email);
          if (!allowed) {
            throw new Error(
              INTERNAL_ONLY_AUTH
                ? "This account is not on the enveraitech.in team allowlist."
                : `Only @${TEAM_DOMAIN} accounts are allowed.`,
            );
          }
          return { data: user };
        },
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,   // 7 days
    updateAge: 60 * 60 * 24,         // Refresh if older than 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,               // 5-min cookie cache
    },
  },

  // Cookie security
  advanced: {
    generateId: () => crypto.randomUUID(),
    cookiePrefix: "enver",
    // useSecureCookies: true — automatically true when NODE_ENV=production
    crossSubDomainCookies: {
      enabled: false, // Don't share cookies across subdomains
    },
  },

  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    "https://enver-ai.tech",
  ],

  // Rate limiting on auth endpoints — second layer after middleware
  rateLimit: {
    window: 60,  // 60 seconds
    max: 10,      // 10 attempts per window
    storage: "memory", // Use "database" in production for multi-instance
  },
});

export type Auth = typeof auth;
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
