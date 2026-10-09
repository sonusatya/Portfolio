import type { Request, Response } from "express";
import { Project } from "../models/Project.js";
import { SkillCategory } from "../models/SkillCategory.js";
import { Experience } from "../models/Experience.js";
import { Education } from "../models/Education.js";
import { Message } from "../models/Message.js";
import { AppError, asyncHandler } from "../middleware/validate.js";
import { validateBody } from "../middleware/validate.js";
import { contactSchema, chatSchema } from "../validators/schemas.js";
import { generateReply, fallbackReply, isAIConfigured } from "../services/ai.js";
import type { ChatInput, ContactInput } from "../validators/schemas.js";

/* ================================================================
 *  Public: projects
 * ================================================================ */

/** GET /api/projects?featured=true&page=1&limit=12 */
export const listProjects = asyncHandler(async (req: Request, res: Response) => {
  const featured = req.query.featured === "true";
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 12));

  const filter: Record<string, unknown> = { published: true };
  if (featured) filter.featured = true;

  const [items, total] = await Promise.all([
    Project.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean({ virtuals: false }),
    Project.countDocuments(filter),
  ]);

  res.json({
    items,
    total,
    page,
    pages: Math.ceil(total / limit) || 1,
  });
});

/** GET /api/projects/:slug */
export const getProjectBySlug = asyncHandler(async (req: Request, res: Response) => {
  const slug = String(req.params.slug || "").toLowerCase();

  const project = await Project.findOne({ slug, published: true }).lean({
    virtuals: false,
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  res.json(project);
});

/* ================================================================
 *  Public: content collections
 * ================================================================ */

export const listSkills = asyncHandler(async (_req: Request, res: Response) => {
  const items = await SkillCategory.find().sort({ order: 1, name: 1 }).lean({ virtuals: false });
  res.json(items);
});

export const listExperience = asyncHandler(async (_req: Request, res: Response) => {
  const items = await Experience.find().sort({ order: 1, start: -1 }).lean({ virtuals: false });
  res.json(items);
});

export const listEducation = asyncHandler(async (_req: Request, res: Response) => {
  const items = await Education.find().sort({ order: 1, start: -1 }).lean({ virtuals: false });
  res.json(items);
});

/* ================================================================
 *  Public: contact
 * ================================================================ */

export const submitContact = asyncHandler(async (req: Request, res: Response) => {
  const data: ContactInput = validateBody(contactSchema, req.body);

  const doc = await Message.create({
    ...data,
    subject: data.subject ?? "",
    ipHash: "", // intentionally not storing IPs
    userAgent: (req.get("user-agent") ?? "").slice(0, 300),
  });

  // Log to server console so the owner sees it even without the admin UI.
  console.log(
    `\n📨 New contact message\n   From: ${data.name} <${data.email}>\n   Subject: ${data.subject || "(none)"}\n   ${data.message.slice(0, 140)}${data.message.length > 140 ? "…" : ""}\n`,
  );

  res.status(201).json({
    ok: true,
    id: doc.id,
    message: `Thanks ${data.name.split(" ")[0]}! Your message has been sent — I'll get back to you soon.`,
  });
});

/* ================================================================
 *  Public: AI chat
 * ================================================================ */

export const chat = asyncHandler(async (req: Request, res: Response) => {
  const { messages }: ChatInput = validateBody(chatSchema, req.body);

  try {
    const { reply, fallback } = await generateReply(messages);
    res.json({ reply, fallback });
  } catch (err) {
    // Never fail the request — degrade to a helpful canned answer.
    console.warn("⚠️  AI request failed, using fallback:", (err as Error).message);
    const { reply, fallback } = fallbackReply(messages);
    res.json({ reply, fallback });
  }
});

/** GET /api/ai/status — lets the client know whether the AI is live. */
export const aiStatus = (_req: Request, res: Response): void => {
  res.json({ configured: isAIConfigured() });
};
