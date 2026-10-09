import { Schema, model, type InferSchemaType, type Model } from "mongoose";

const educationSchema = new Schema(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    location: { type: String, trim: true, default: "" },
    start: { type: String, required: true, trim: true },
    end: { type: String, required: true, trim: true },
    score: { type: String, trim: true, default: "" },
    scoreLabel: { type: String, trim: true, default: "CGPA" },
    coursework: { type: [String], default: [] },
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

educationSchema.index({ order: 1 });

export type EducationDoc = InferSchemaType<typeof educationSchema>;
export const Education: Model<EducationDoc> = model("Education", educationSchema);
