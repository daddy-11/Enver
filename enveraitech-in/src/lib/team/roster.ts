/**
 * The fixed, private team roster for enveraitech.in.
 *
 * This allowlist is the source of truth for who may access the internal
 * workspace. Sign-in is rejected for any account whose verified email is not
 * listed here, even other @enveraitech.com accounts. To onboard a new member,
 * add an entry below and seed a matching `team_members` row (see scripts).
 *
 * The team domain lock is enforced in addition to this list at the auth layer.
 */

import type { TeamRole } from "@/lib/db/schema";

export const TEAM_DOMAIN = "enveraitech.com";

export interface RosterEntry {
  email: string;
  displayName: string;
  role: TeamRole;
  avatarColor: string;
}

/**
 * Seed roster. Replace the placeholder engineers with the real 8 members.
 * Emails are compared case-insensitively. At least one `founder` is required
 * for the admin portal to be reachable.
 */
export const ROSTER: RosterEntry[] = [
  { email: "daddy@enveraitech.com", displayName: "Daddy", role: "founder", avatarColor: "#e8660a" },
  // TODO: replace the following with the remaining 7 real team accounts.
  { email: "member2@enveraitech.com", displayName: "Member 2", role: "engineer", avatarColor: "#38bdf8" },
  { email: "member3@enveraitech.com", displayName: "Member 3", role: "engineer", avatarColor: "#c084fc" },
  { email: "member4@enveraitech.com", displayName: "Member 4", role: "engineer", avatarColor: "#4ade80" },
  { email: "member5@enveraitech.com", displayName: "Member 5", role: "engineer", avatarColor: "#fbbf24" },
  { email: "member6@enveraitech.com", displayName: "Member 6", role: "engineer", avatarColor: "#f472b6" },
  { email: "member7@enveraitech.com", displayName: "Member 7", role: "engineer", avatarColor: "#22d3ee" },
  { email: "member8@enveraitech.com", displayName: "Member 8", role: "engineer", avatarColor: "#a78bfa" },
];

const ROSTER_BY_EMAIL = new Map(ROSTER.map((m) => [m.email.toLowerCase(), m]));

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** True if the email belongs to the team domain. */
export function isTeamDomain(email: string): boolean {
  return normalizeEmail(email).endsWith(`@${TEAM_DOMAIN}`);
}

/** True only if the email is on the explicit allowlist. */
export function isAllowlisted(email: string): boolean {
  return ROSTER_BY_EMAIL.has(normalizeEmail(email));
}

/** The roster entry for an email, or undefined if not a member. */
export function rosterEntry(email: string): RosterEntry | undefined {
  return ROSTER_BY_EMAIL.get(normalizeEmail(email));
}

/**
 * The single gate used at login: a member must be both on the team domain
 * and on the explicit allowlist.
 */
export function isTeamMemberEmail(email: string): boolean {
  return isTeamDomain(email) && isAllowlisted(email);
}
