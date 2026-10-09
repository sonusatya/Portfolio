import { z } from "zod";

/** Reusable field constraints. */

const email = z
  .string()
  .trim()
  .min(1, "Email is required")
  .max(200, "Email is too long")
  .email("Please provide a valid email address")
  .toLowerCase();

const name = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(120, "Name is too long");

const slug = z
  .string()
  .trim()
  .toLowerCase()
  .min(2, "Slug must be at least 2 characters")
  .max(120, "Slug is too long")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug may only contain lowercase letters, numbers and hyphens");

const url = z
  .string()
  .trim()
  .max(500, "URL is too long")
  .refine((v) => v === "" || /^https?:\/\/\S+$/.test(v), "Must be a valid http(s) URL");

/* ---------------- Contact ---------------- */

export const contactSchema = z.object({
  name,
  email,
  subject: z.string().trim().max(200, "Subject is too long").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(4000, "Message is too long"),
});

export type ContactInput = z.infer<typeof contactSchema>;

/* ---------------- AI chat ---------------- */

export const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z
          .string()
          .trim()
          .min(1, "Message content cannot be empty")
          .max(2000, "A single message may not exceed 2000 characters"),
      }),
    )
    .min(1, "At least one message is required")
    .max(12, "Too many messages — keep the conversation shorter"),
});

export type ChatInput = z.infer<typeof chatSchema>;

/* ---------------- Auth ---------------- */

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required").max(100),
  password: z.string().min(1, "Password is required").max(200),
});

/* ---------------- Admin: project ---------------- */

const projectBodySchema = z.object({
  title: name.max(120),
  slug: slug.optional(),
  tagline: z.string().trim().max(200).optional().default(""),
  summary: z.string().trim().min(10, "Summary must be at least 10 characters").max(400),
  description: z.array(z.string().trim().min(1)).max(20).optional().default([]),
  techStack: z.array(z.string().trim().min(1)).max(30).optional().default([]),
  category: z.enum(["fullstack", "frontend", "backend", "ai", "other"]).optional().default("fullstack"),
  timeline: z.string().trim().max(40).optional().default(""),
  role: z.string().trim().max(120).optional().default(""),
  highlights: z.array(z.string().trim().min(1)).max(20).optional().default([]),
  image: z.string().trim().max(500).optional().default(""),
  links: z
    .object({
      live: url.optional().default(""),
      source: url.optional().default(""),
    })
    .optional()
    .default({ live: "", source: "" }),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
  order: z.number().int().optional(),
});

export const createProjectSchema = projectBodySchema;

export const updateProjectSchema = projectBodySchema.partial();

/* ---------------- Admin: other content ---------------- */

export const createSkillSchema = z.object({
  name: z.string().trim().min(1).max(80),
  icon: z.string().trim().max(40).optional().default("tools"),
  skills: z.array(z.string().trim().min(1)).min(1).max(40),
  order: z.number().int().optional(),
});

export const updateSkillSchema = createSkillSchema.partial();

export const createExperienceSchema = z.object({
  organization: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(120),
  location: z.string().trim().max(120).optional().default("Remote"),
  type: z.enum(["work", "program", "internship", "volunteer"]).optional().default("program"),
  start: z.string().trim().min(1).max(40),
  end: z.string().trim().max(40).optional().default(""),
  current: z.boolean().optional().default(false),
  certificate: z.string().trim().max(120).optional().default(""),
  certificateUrl: z
    .string()
    .trim()
    .max(500)
    .optional()
    .default("")
    .refine(
      (v) => v === "" || /^https?:\/\/\S+$/.test(v) || v.startsWith("/"),
      "Certificate URL must be a valid http(s) link or a root-relative path like /certificates/x.pdf",
    ),
  bullets: z.array(z.string().trim().min(1)).max(15).optional().default([]),
  order: z.number().int().optional(),
});

export const updateExperienceSchema = createExperienceSchema.partial();

export const createEducationSchema = z.object({
  institution: z.string().trim().min(1).max(120),
  degree: z.string().trim().min(1).max(160),
  location: z.string().trim().max(120).optional().default(""),
  start: z.string().trim().min(1).max(40),
  end: z.string().trim().min(1).max(40),
  score: z.string().trim().max(40).optional().default(""),
  scoreLabel: z.string().trim().max(40).optional().default("CGPA"),
  coursework: z.array(z.string().trim().min(1)).max(20).optional().default([]),
  order: z.number().int().optional(),
});

export const updateEducationSchema = createEducationSchema.partial();

export const updateMessageSchema = z.object({
  read: z.boolean().optional(),
});
