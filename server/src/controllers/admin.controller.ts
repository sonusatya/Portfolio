import type { Request, Response } from "express";
import { Project } from "../models/Project.js";
import { SkillCategory } from "../models/SkillCategory.js";
import { Experience } from "../models/Experience.js";
import { Education } from "../models/Education.js";
import { Message } from "../models/Message.js";
import { AppError, asyncHandler, validateBody } from "../middleware/validate.js";
import {
  createProjectSchema,
  updateProjectSchema,
  createSkillSchema,
  updateSkillSchema,
  createExperienceSchema,
  updateExperienceSchema,
  createEducationSchema,
  updateEducationSchema,
  updateMessageSchema,
} from "../validators/schemas.js";

/** Turns a title into a URL-safe slug when none is provided. */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

const idOf = (req: Request) => String(req.params.id || "");

/* ================================================================
 *  Projects
 * ================================================================ */

/** GET /api/admin/projects — includes drafts. */
export const adminListProjects = asyncHandler(async (_req: Request, res: Response) => {
  const items = await Project.find()
    .sort({ order: 1, createdAt: -1 })
    .lean({ virtuals: false });
  res.json({ items, total: items.length });
});

/** POST /api/admin/projects */
export const adminCreateProject = asyncHandler(async (req: Request, res: Response) => {
  const data = validateBody(createProjectSchema, req.body);

  const slug = data.slug || slugify(data.title);

  const exists = await Project.findOne({ slug });
  if (exists) {
    throw new AppError(`A project with the slug "${slug}" already exists`, 409);
  }

  const project = await Project.create({ ...data, slug });

  res.status(201).json(project.toJSON());
});

/** PATCH /api/admin/projects/:id */
export const adminUpdateProject = asyncHandler(async (req: Request, res: Response) => {
  const data = validateBody(updateProjectSchema, req.body);
  const id = idOf(req);

  // Look up by id OR slug so the client can send either.
  const existing = await Project.findOne({
    $or: [{ _id: id }, { slug: id.toLowerCase() }],
  });

  if (!existing) {
    throw new AppError("Project not found", 404);
  }

  // If the slug is changing, ensure it stays unique.
  if (data.slug && data.slug !== existing.slug) {
    const clash = await Project.findOne({ slug: data.slug, _id: { $ne: existing._id } });
    if (clash) {
      throw new AppError(`A project with the slug "${data.slug}" already exists`, 409);
    }
  }

  Object.assign(existing, data);
  await existing.save();

  res.json(existing.toJSON());
});

/** DELETE /api/admin/projects/:id */
export const adminDeleteProject = asyncHandler(async (req: Request, res: Response) => {
  const id = idOf(req);

  const deleted = await Project.findOneAndDelete({
    $or: [{ _id: id }, { slug: id.toLowerCase() }],
  });

  if (!deleted) {
    throw new AppError("Project not found", 404);
  }

  res.json({ ok: true, deleted: deleted.title });
});

/* ================================================================
 *  Skills
 * ================================================================ */

export const adminListSkills = asyncHandler(async (_req: Request, res: Response) => {
  const items = await SkillCategory.find().sort({ order: 1, name: 1 }).lean({ virtuals: false });
  res.json({ items, total: items.length });
});

export const adminCreateSkill = asyncHandler(async (req: Request, res: Response) => {
  const data = validateBody(createSkillSchema, req.body);
  const doc = await SkillCategory.create(data);
  res.status(201).json(doc.toJSON());
});

export const adminUpdateSkill = asyncHandler(async (req: Request, res: Response) => {
  const data = validateBody(updateSkillSchema, req.body);
  const doc = await SkillCategory.findByIdAndUpdate(idOf(req), data, {
    new: true,
    runValidators: true,
  });
  if (!doc) throw new AppError("Skill category not found", 404);
  res.json(doc.toJSON());
});

export const adminDeleteSkill = asyncHandler(async (req: Request, res: Response) => {
  const doc = await SkillCategory.findByIdAndDelete(idOf(req));
  if (!doc) throw new AppError("Skill category not found", 404);
  res.json({ ok: true, deleted: doc.name });
});

/* ================================================================
 *  Experience
 * ================================================================ */

export const adminListExperience = asyncHandler(async (_req: Request, res: Response) => {
  const items = await Experience.find().sort({ order: 1, start: -1 }).lean({ virtuals: false });
  res.json({ items, total: items.length });
});

export const adminCreateExperience = asyncHandler(async (req: Request, res: Response) => {
  const data = validateBody(createExperienceSchema, req.body);
  const doc = await Experience.create(data);
  res.status(201).json(doc.toJSON());
});

export const adminUpdateExperience = asyncHandler(async (req: Request, res: Response) => {
  const data = validateBody(updateExperienceSchema, req.body);
  const doc = await Experience.findByIdAndUpdate(idOf(req), data, {
    new: true,
    runValidators: true,
  });
  if (!doc) throw new AppError("Experience not found", 404);
  res.json(doc.toJSON());
});

export const adminDeleteExperience = asyncHandler(async (req: Request, res: Response) => {
  const doc = await Experience.findByIdAndDelete(idOf(req));
  if (!doc) throw new AppError("Experience not found", 404);
  res.json({ ok: true, deleted: doc.role });
});

/* ================================================================
 *  Education
 * ================================================================ */

export const adminListEducation = asyncHandler(async (_req: Request, res: Response) => {
  const items = await Education.find().sort({ order: 1, start: -1 }).lean({ virtuals: false });
  res.json({ items, total: items.length });
});

export const adminCreateEducation = asyncHandler(async (req: Request, res: Response) => {
  const data = validateBody(createEducationSchema, req.body);
  const doc = await Education.create(data);
  res.status(201).json(doc.toJSON());
});

export const adminUpdateEducation = asyncHandler(async (req: Request, res: Response) => {
  const data = validateBody(updateEducationSchema, req.body);
  const doc = await Education.findByIdAndUpdate(idOf(req), data, {
    new: true,
    runValidators: true,
  });
  if (!doc) throw new AppError("Education not found", 404);
  res.json(doc.toJSON());
});

export const adminDeleteEducation = asyncHandler(async (req: Request, res: Response) => {
  const doc = await Education.findByIdAndDelete(idOf(req));
  if (!doc) throw new AppError("Education not found", 404);
  res.json({ ok: true, deleted: doc.institution });
});

/* ================================================================
 *  Messages
 * ================================================================ */

export const adminListMessages = asyncHandler(async (_req: Request, res: Response) => {
  const items = await Message.find().sort({ createdAt: -1 }).limit(200).lean({ virtuals: false });
  res.json(items);
});

export const adminUpdateMessage = asyncHandler(async (req: Request, res: Response) => {
  const data = validateBody(updateMessageSchema, req.body);
  const doc = await Message.findByIdAndUpdate(idOf(req), data, { new: true });
  if (!doc) throw new AppError("Message not found", 404);
  res.json(doc.toJSON());
});

export const adminDeleteMessage = asyncHandler(async (req: Request, res: Response) => {
  const doc = await Message.findByIdAndDelete(idOf(req));
  if (!doc) throw new AppError("Message not found", 404);
  res.json({ ok: true });
});

export const adminDeleteAllMessages = asyncHandler(async (_req: Request, res: Response) => {
  const result = await Message.deleteMany({});
  res.json({ ok: true, deleted: result.deletedCount });
});
