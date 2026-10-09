import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Award,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { Education, Experience } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

interface ExperienceSectionProps {
  experience?: Experience[];
  education?: Education[];
}

export function ExperienceSection({
  experience = [],
  education = [],
}: ExperienceSectionProps) {
  if (experience.length === 0 && education.length === 0) return null;

  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Journey"
          title={
            <>
              Experience &amp; <span className="text-aurora">education</span>
            </>
          }
          description="A 9-month intensive full-stack program plus a B.Tech in Computer Science — with 5+ production projects shipped along the way."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ---------------- Experience timeline ---------------- */}
          {experience.length > 0 && (
            <div>
              <h3 className="label-mono mb-6 flex items-center gap-2 text-faint">
                <Briefcase className="h-3.5 w-3.5 text-brand-400" />
                Experience
              </h3>

              <ol className="relative space-y-6 border-l border-line-soft pl-6">
                {experience.map((exp, i) => (
                  <motion.li
                    key={exp._id || i}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease }}
                    className="group relative"
                  >
                    {/* Timeline dot */}
                    <span className="absolute -left-[31px] top-1.5 grid h-3 w-3 place-items-center rounded-full border border-brand-500/50 bg-void">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-400 transition-shadow duration-300 group-hover:shadow-[0_0_10px_2px_rgb(28_200_245/0.7)]" />
                    </span>

                    <div className="rounded-2xl border border-line-soft bg-surface p-5 transition-all duration-400 hover:border-line hover:bg-surface-2">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="text-base font-semibold text-ink">
                            {exp.role}
                          </h4>
                          <p className="mt-0.5 text-sm text-brand-300">
                            {exp.organization}
                          </p>
                        </div>

                        <span className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-muted">
                          {exp.start} — {exp.current ? "Present" : exp.end}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-faint">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                        {exp.certificate &&
                          (exp.certificateUrl ? (
                            <a
                              href={exp.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`Open ${exp.certificate}`}
                              className="inline-flex items-center gap-1.5 text-success/90 underline decoration-dotted underline-offset-2 transition-colors hover:text-success hover:decoration-solid"
                            >
                              <Award className="h-3 w-3" />
                              {exp.certificate}
                              <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-success/80">
                              <Award className="h-3 w-3" />
                              {exp.certificate}
                            </span>
                          ))}
                      </div>

                      {exp.bullets.length > 0 && (
                        <ul className="mt-3.5 space-y-2">
                          {exp.bullets.map((b, bi) => (
                            <li
                              key={bi}
                              className="flex items-start gap-2 text-[13.5px] leading-relaxed text-muted"
                            >
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          )}

          {/* ---------------- Education ---------------- */}
          {education.length > 0 && (
            <div>
              <h3 className="label-mono mb-6 flex items-center gap-2 text-faint">
                <GraduationCap className="h-3.5 w-3.5 text-accent-400" />
                Education
              </h3>

              <ol className="relative space-y-6 border-l border-line-soft pl-6">
                {education.map((edu, i) => (
                  <motion.li
                    key={edu._id || i}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease }}
                    className="group relative"
                  >
                    <span className="absolute -left-[31px] top-1.5 grid h-3 w-3 place-items-center rounded-full border border-accent-500/50 bg-void">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-400 transition-shadow duration-300 group-hover:shadow-[0_0_10px_2px_rgb(167_139_250/0.7)]" />
                    </span>

                    <div className="rounded-2xl border border-line-soft bg-surface p-5 transition-all duration-400 hover:border-line hover:bg-surface-2">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="text-base font-semibold text-ink">
                            {edu.degree}
                          </h4>
                          <p className="mt-0.5 text-sm text-accent-300">
                            {edu.institution}
                          </p>
                        </div>

                        <span className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-muted">
                          {edu.start} — {edu.end}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-faint">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" />
                          {edu.location}
                        </span>
                        {edu.score && (
                          <span className="inline-flex items-center gap-1.5 text-success/80">
                            <Award className="h-3 w-3" />
                            {edu.scoreLabel ?? "Score"}: {edu.score}
                          </span>
                        )}
                      </div>

                      {edu.coursework.length > 0 && (
                        <ul className="mt-3.5 flex flex-wrap gap-1.5">
                          {edu.coursework.map((c) => (
                            <li
                              key={c}
                              className="rounded-md border border-line bg-white/[0.025] px-2 py-1 font-mono text-[11px] text-muted"
                            >
                              {c}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
