import { Router } from "express";
import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

/**
 * Shared rate limiters.
 *
 * The AI endpoint is the most expensive (and abusable) route, so it gets
 * a tight limit. Contact is looser but still bounded to stop spam.
 */

const message = (max: number, windowMs: number, name: string) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: `Too many ${name} requests — please slow down and try again shortly.` },
    handler: (_req, res) => {
      res.status(429).json({
        message: `Too many ${name} requests — please slow down and try again shortly.`,
      });
    },
  });

/** 10 AI requests per minute per IP. */
export const aiLimiter = message(10, 60_000, "AI chat");

/** 5 contact submissions per 15 minutes per IP. */
export const contactLimiter = message(5, 15 * 60_000, "contact form");

/** 20 auth attempts per 15 minutes per IP — brute-force protection. */
export const authLimiter = message(20, 15 * 60_000, "login");

/**
 * In production behind a proxy (Render/Heroku/Nginx), trust the first hop
 * so `req.ip` reflects the real client and rate limiting works correctly.
 */
export function configureTrustProxy(): void {
  if (env.NODE_ENV === "production") {
    // 1 = trust the immediate proxy (Render's router)
    process.env.TRUST_PROXY = "1";
  }
}

export const apiRouter = Router();
