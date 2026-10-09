import { Router } from "express";
import {
  listProjects,
  getProjectBySlug,
  listSkills,
  listExperience,
  listEducation,
  submitContact,
  chat,
  aiStatus,
} from "../controllers/public.controller.js";
import { dbStatus } from "../config/db.js";
import { isAIConfigured } from "../services/ai.js";
import { aiLimiter, contactLimiter } from "../middleware/rateLimit.js";

export const publicRouter = Router();

/* ---------------- Health ---------------- */

publicRouter.get("/health", (_req, res) => {
  res.json({
    status: dbStatus() === "connected" ? "ok" : "degraded",
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    database: dbStatus(),
    ai: isAIConfigured() ? "configured" : "not-configured",
  });
});

/* ---------------- Projects ---------------- */

publicRouter.get("/projects", listProjects);
publicRouter.get("/projects/:slug", getProjectBySlug);

/* ---------------- Content ---------------- */

publicRouter.get("/skills", listSkills);
publicRouter.get("/experience", listExperience);
publicRouter.get("/education", listEducation);

/* ---------------- Contact (rate limited) ---------------- */

publicRouter.post("/contact", contactLimiter, submitContact);

/* ---------------- AI chat (rate limited) ---------------- */

publicRouter.get("/ai/status", aiStatus);
publicRouter.post("/ai/chat", aiLimiter, chat);
