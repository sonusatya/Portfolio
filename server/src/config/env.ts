// Load .env BEFORE anything reads process.env.
import "dotenv/config";

import { z } from "zod";

/**
 * Centralized, validated environment access.
 * Fails fast at boot if a required variable is missing, so we never
 * run with a half-configured server.
 */

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),

  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI is required — set it in server/.env")
    .default(""),

  JWT_SECRET: z
    .string()
    .min(8, "JWT_SECRET must be at least 8 characters")
    .default("dev_secret_change_me_please"),

  ADMIN_USERNAME: z.string().min(1).default("admin"),
  ADMIN_PASSWORD: z.string().min(6).default("admin123"),

  GEMINI_API_KEY: z.string().default(""),
  GEMINI_MODEL: z.string().default("gemini-3.8-flash"),

  CLIENT_URL: z.string().default("http://localhost:5173"),
});

export type AppEnv = z.infer<typeof envSchema>;

function loadEnv(): AppEnv {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    console.error("\n❌ Invalid environment configuration:\n" + issues + "\n");
    // Only crash on truly fatal vars in production; warn in dev.
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }

  const data = parsed.success ? parsed.data : envSchema.parse({});

  if (!parsed.success && process.env.NODE_ENV !== "production") {
    console.warn("⚠️  Using default env values for missing variables.");
  }

  return data;
}

export const env = loadEnv();

export const isProd = env.NODE_ENV === "production";
