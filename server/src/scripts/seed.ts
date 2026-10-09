/**
 * Seed (or re-seed) the database with verified portfolio content.
 *
 * Usage:
 *   npm run seed --prefix server
 *
 * Idempotent: documents are matched by slug/name and updated in place,
 * so running this twice never creates duplicates.
 */

import "dotenv/config";
import mongoose from "mongoose";
import { connectDB, disconnectDB } from "../config/db.js";
import { Project } from "../models/Project.js";
import { SkillCategory } from "../models/SkillCategory.js";
import { Experience } from "../models/Experience.js";
import { Education } from "../models/Education.js";
import { ensureAdminUser } from "./ensureAdmin.js";
import {
  seedProjects,
  seedSkills,
  seedExperience,
  seedEducation,
} from "../data/seed.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyModel = mongoose.Model<any>;

async function upsertBy(
  model: AnyModel,
  docs: Record<string, unknown>[],
  key: string,
  label: string,
): Promise<void> {
  let created = 0;
  let updated = 0;

  for (const doc of docs) {
    const filter = { [key]: doc[key] } as Record<string, unknown>;
    const result = await model
      .updateOne(filter, { $set: doc }, { upsert: true, runValidators: true })
      .exec();

    if (result.upsertedCount) created += 1;
    else if (result.modifiedCount) updated += 1;
  }

  console.log(`  ${label}: ${created} created, ${updated} updated, ${docs.length} total`);
}

async function run(): Promise<void> {
  console.log("\n🌱 Seeding database with verified portfolio content…\n");

  await connectDB();

  await upsertBy(Project, seedProjects, "slug", "Projects  ");
  await upsertBy(SkillCategory, seedSkills, "name", "Skills     ");
  await upsertBy(Experience, seedExperience, "organization", "Experience ");
  await upsertBy(Education, seedEducation, "institution", "Education  ");

  // Admin account comes along for the ride.
  await ensureAdminUser();

  const [p, s, e, d] = await Promise.all([
    Project.countDocuments(),
    SkillCategory.countDocuments(),
    Experience.countDocuments(),
    Education.countDocuments(),
  ]);

  console.log("\n📊 Database totals:");
  console.log(`   projects=${p}  skills=${s}  experience=${e}  education=${d}`);
  console.log("\n✅ Seeding complete.\n");

  await disconnectDB();
  process.exit(0);
}

run().catch(async (err) => {
  console.error("\n❌ Seed failed:", err);
  await disconnectDB().catch(() => undefined);
  process.exit(1);
});
