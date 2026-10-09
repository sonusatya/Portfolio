import { Schema, model, type InferSchemaType, type Model } from "mongoose";

const messageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 200,
    },
    subject: { type: String, trim: true, maxlength: 200, default: "" },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    read: { type: Boolean, default: false, index: true },
    ipHash: { type: String, default: "" },
    userAgent: { type: String, default: "" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        delete (ret as Record<string, unknown>)._id;
        delete (ret as Record<string, unknown>).__v;
        delete (ret as Record<string, unknown>).ipHash;
        delete (ret as Record<string, unknown>).userAgent;
        return ret;
      },
    },
  },
);

messageSchema.index({ createdAt: -1 });

export type MessageDoc = InferSchemaType<typeof messageSchema>;
export const Message: Model<MessageDoc> = model("Message", messageSchema);
