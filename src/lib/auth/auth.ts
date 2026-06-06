import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

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
