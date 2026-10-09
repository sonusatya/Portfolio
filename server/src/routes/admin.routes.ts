import { Router } from "express";
import { login, logout, session } from "../controllers/auth.controller.js";
import {
  adminListProjects,
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject,
  adminListSkills,
  adminCreateSkill,
  adminUpdateSkill,
  adminDeleteSkill,
  adminListExperience,
  adminCreateExperience,
  adminUpdateExperience,
  adminDeleteExperience,
  adminListEducation,
  adminCreateEducation,
  adminUpdateEducation,
  adminDeleteEducation,
  adminListMessages,
  adminUpdateMessage,
  adminDeleteMessage,
  adminDeleteAllMessages,
} from "../controllers/admin.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimit.js";

/* ---------------- Auth (public) ---------------- */

export const authRouter = Router();

authRouter.post("/login", authLimiter, login);
authRouter.post("/logout", logout);

/* ---------------- Admin (protected) ---------------- */

export const adminRouter = Router();

// Session probe used by the client to detect an existing login.
adminRouter.get("/session", ...session);

// Projects
adminRouter.get("/projects", requireAuth, adminListProjects);
adminRouter.post("/projects", requireAuth, adminCreateProject);
adminRouter.patch("/projects/:id", requireAuth, adminUpdateProject);
adminRouter.delete("/projects/:id", requireAuth, adminDeleteProject);

// Skills
adminRouter.get("/skills", requireAuth, adminListSkills);
adminRouter.post("/skills", requireAuth, adminCreateSkill);
adminRouter.patch("/skills/:id", requireAuth, adminUpdateSkill);
adminRouter.delete("/skills/:id", requireAuth, adminDeleteSkill);

// Experience
adminRouter.get("/experience", requireAuth, adminListExperience);
adminRouter.post("/experience", requireAuth, adminCreateExperience);
adminRouter.patch("/experience/:id", requireAuth, adminUpdateExperience);
adminRouter.delete("/experience/:id", requireAuth, adminDeleteExperience);

// Education
adminRouter.get("/education", requireAuth, adminListEducation);
adminRouter.post("/education", requireAuth, adminCreateEducation);
adminRouter.patch("/education/:id", requireAuth, adminUpdateEducation);
adminRouter.delete("/education/:id", requireAuth, adminDeleteEducation);

// Messages
adminRouter.get("/messages", requireAuth, adminListMessages);
adminRouter.patch("/messages/:id", requireAuth, adminUpdateMessage);
adminRouter.delete("/messages/:id", requireAuth, adminDeleteMessage);
adminRouter.delete("/messages", requireAuth, adminDeleteAllMessages);
