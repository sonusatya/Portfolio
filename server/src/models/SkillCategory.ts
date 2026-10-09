import { Schema, model, type InferSchemaType, type Model } from "mongoose";

const skillCategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    /** Icon key resolved on the client (e.g. "frontend", "backend", "ai") */
    icon: { type: String, default: "tools" },
    skills: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        delete (ret as Record<string, unknown>)._id;
        delete (ret as Record<string, unknown>).__v;
        return ret;
      },
    },
  },
);

skillCategorySchema.index({ order: 1 });

export type SkillCategoryDoc = InferSchemaType<typeof skillCategorySchema>;
export const SkillCategory: Model<SkillCategoryDoc> = model(
  "SkillCategory",
  skillCategorySchema,
);
