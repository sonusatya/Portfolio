import mongoose from "mongoose";
import { env, isProd } from "./env.js";

mongoose.set("strictQuery", true);

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) return;

  if (!env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.example to server/.env and add your Atlas connection string.",
    );
  }

  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10_000,
      socketTimeoutMS: 45_000,
      autoIndex: !isProd, // build indexes in dev only
    });

    isConnected = true;
    console.log(`✅ MongoDB connected → ${mongoose.connection.name}`);

    mongoose.connection.on("disconnected", () => {
      isConnected = false;
      console.warn("⚠️  MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      isConnected = true;
      console.log("✅ MongoDB reconnected");
    });
  } catch (err) {
    isConnected = false;
    console.error("❌ MongoDB connection failed:", (err as Error).message);
    throw err;
  }
}

export function dbStatus(): "connected" | "disconnected" {
  return mongoose.connection.readyState === 1 ? "connected" : "disconnected";
}

export async function disconnectDB(): Promise<void> {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
}
