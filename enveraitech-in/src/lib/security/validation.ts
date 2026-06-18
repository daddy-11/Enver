import { z } from "zod";

// ─── Auth ────────────────────────────────────────────────────────────────────

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(254, "Email too long") // RFC 5321
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password too long"), // prevent bcrypt DoS
});

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(64, "Name too long")
    .trim()
    .regex(/^[\p{L}\p{M} '-]+$/u, "Name contains invalid characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(254, "Email too long")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password too long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

// ─── Contact form ─────────────────────────────────────────────────────────────

export const ContactSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name too long")
    .trim()
    .regex(/^[\p{L}\p{M} '-]+$/u, "Invalid characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name too long")
    .trim()
    .regex(/^[\p{L}\p{M} '-]+$/u, "Invalid characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(254, "Email too long")
    .toLowerCase()
    .trim(),
  interest: z.enum([
    "early-access",
    "custom-build",
    "partnership",
    "general",
  ]),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message too long — max 2000 characters")
    .trim(),
  // Honeypot — should always be empty; filled means bot
  website: z.string().max(0, "Bot detected").optional(),
});

export type ContactFormData = z.infer<typeof ContactSchema>;

// ─── Farm plots ───────────────────────────────────────────────────────────────

export const CreatePlotSchema = z.object({
  name: z
    .string()
    .min(1, "Plot name is required")
    .max(100, "Name too long")
    .trim(),
  // GeoJSON-style coordinates for a polygon — validated loosely here,
  // PostGIS will reject invalid geometry at DB level
  coordinates: z
    .array(z.array(z.tuple([z.number(), z.number()])))
    .min(1, "At least one ring required")
    .max(10, "Too many rings"),
  treeCount: z.number().int().min(0).max(1_000_000).optional(),
  healthScore: z.number().min(0).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// ─── Resume upload ────────────────────────────────────────────────────────────

export const UploadResumeSchema = z.object({
  filename: z
    .string()
    .min(1)
    .max(255)
    .regex(/\.pdf$/i, "Only PDF files are accepted"),
  fileSize: z
    .number()
    .int()
    .min(1, "File is empty")
    .max(10 * 1024 * 1024, "File exceeds 10MB limit"),
});

export const CompareResumesSchema = z.object({
  resumeAId: z.string().uuid("Invalid resume ID"),
  resumeBId: z.string().uuid("Invalid resume ID"),
}).refine((d) => d.resumeAId !== d.resumeBId, {
  message: "Cannot compare a resume with itself",
  path: ["resumeBId"],
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Format Zod errors into a flat object for client display.
 * Only expose field-level messages, never raw Zod internals.
 */
export function formatZodErrors(
  error: z.ZodError
): Record<string, string> {
  return Object.fromEntries(
    error.errors.map((e) => [e.path.join("."), e.message])
  );
}

/**
 * Safe parse wrapper — returns typed result or formatted errors.
 */
export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  return { success: false, errors: formatZodErrors(result.error) };
}
