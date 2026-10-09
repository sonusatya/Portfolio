import { Schema, model, type InferSchemaType, type Model } from "mongoose";

const adminUserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    lastLoginAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        delete (ret as Record<string, unknown>)._id;
        delete (ret as Record<string, unknown>).__v;
        delete (ret as Record<string, unknown>).passwordHash;
        return ret;
      },
    },
  },
);

export type AdminUserDoc = InferSchemaType<typeof adminUserSchema>;
export const AdminUser: Model<AdminUserDoc> = model("AdminUser", adminUserSchema);
