import { Schema, model, type InferSchemaType, type Model } from "mongoose";

const projectSchema = new Schema(
  {
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    tagline: { type: String, trim: true, maxlength: 200, default: "" },
    summary: { type: String, required: true, trim: true, maxlength: 400 },
    description: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    category: {
      type: String,
      enum: ["fullstack", "frontend", "backend", "ai", "other"],
      default: "fullstack",
      index: true,
    },
    timeline: { type: String, trim: true, default: "" },
    role: { type: String, trim: true, default: "" },
    highlights: { type: [String], default: [] },
    image: { type: String, default: "" },
    links: {
      live: { type: String, default: "" },
      source: { type: String, default: "" },
    },
    featured: { type: Boolean, default: false, index: true },
    published: { type: Boolean, default: true, index: true },
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

// Efficient "published + sorted" list query.
projectSchema.index({ published: 1, order: 1, createdAt: -1 });

export type ProjectDoc = InferSchemaType<typeof projectSchema>;
export const Project: Model<ProjectDoc> = model("Project", projectSchema);
