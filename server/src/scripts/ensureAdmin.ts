import bcrypt from "bcryptjs";
import { AdminUser } from "../models/AdminUser.js";
import { env } from "../config/env.js";

/**
 * Idempotent admin bootstrap. Creates the admin account on first boot
 * using ADMIN_USERNAME / ADMIN_PASSWORD from the environment.
 */
export async function ensureAdminUser(): Promise<void> {
  const username = env.ADMIN_USERNAME.toLowerCase();

  const existing = await AdminUser.findOne({ username }).lean();

  if (existing) {
    // Keep the password in sync with the environment on every boot,
    // so rotating credentials is just a redeploy.
    const currentHash = String(existing.passwordHash ?? "");
    const needsUpdate = !(await bcrypt.compare(env.ADMIN_PASSWORD, currentHash));
    if (needsUpdate) {
      await AdminUser.updateOne(
        { _id: existing._id },
        { $set: { passwordHash: await bcrypt.hash(env.ADMIN_PASSWORD, 12) } },
      );
      console.log(`🔁 Updated admin password for "${username}"`);
    }
    return;
  }

  const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 12);
  await AdminUser.create({ username, passwordHash, role: "admin" });
  console.log(`👤 Created admin user "${username}"`);
}
