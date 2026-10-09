import { Schema, model, type InferSchemaType, type Model } from "mongoose";

const experienceSchema = new Schema(
  {
    organization: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    location: { type: String, trim: true, default: "Remote" },
    type: {
      type: String,
      enum: ["work", "program", "internship", "volunteer"],
      default: "program",
    },
    start: { type: String, required: true, trim: true },
    end: { type: String, trim: true, default: "" },
    current: { type: Boolean, default: false },
    certificate: { type: String, trim: true, default: "" },
    /** Optional link that opens the certificate (external URL or a file in /public) */
    certificateUrl: { type: String, trim: true, default: "" },
    bullets: { type: [String], default: [] },
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

experienceSchema.index({ order: 1 });

export type ExperienceDoc = InferSchemaType<typeof experienceSchema>;
export const Experience: Model<ExperienceDoc> = model("Experience", experienceSchema);
