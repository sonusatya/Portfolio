import { motion } from "framer-motion";
import { GraduationCap, MapPin, CalendarDays, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { Education } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

interface EducationSectionProps {
  education?: Education[];
}

export function EducationSection({ education = [] }: EducationSectionProps) {
  if (education.length === 0) return null;

  return (
    <section id="education" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          label="Education"
          title={
            <>
              Academic <span className="text-aurora">background</span>
            </>
          }
          description="My formal Computer Science & Engineering foundation, alongside the coursework that shapes how I build software."
        />

        <div className="mt-12 grid gap-6">
          {education.map((edu, i) => (
            <motion.article
              key={edu._id || i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.6, ease }}
              className="group relative overflow-hidden rounded-3xl border border-line-soft bg-surface p-6 transition-all duration-400 hover:border-accent-500/40 sm:p-8"
            >
              {/* Corner glow */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-accent-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                {/* Icon */}
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-accent-500/30 bg-accent-500/10">
                  <GraduationCap className="h-7 w-7 text-accent-300" />
                </div>

                {/* Main info */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl text-ink sm:text-2xl">{edu.degree}</h3>

                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-accent-300">
                    <span className="inline-flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 opacity-80" />
                      {edu.institution}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-muted">
                      <MapPin className="h-3.5 w-3.5 opacity-80" />
                      {edu.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-muted">
                      <CalendarDays className="h-3.5 w-3.5 opacity-80" />
                      {edu.start} — {edu.end}
                    </span>
                  </p>

                  {edu.coursework.length > 0 && (
                    <div className="mt-6">
                      <h4 className="label-mono mb-3 flex items-center gap-2 text-faint">
                        <BookOpen className="h-3.5 w-3.5 text-accent-400" />
                        Relevant Coursework
                      </h4>
                      <ul className="flex flex-wrap gap-2">
                        {edu.coursework.map((c) => (
                          <li
                            key={c}
                            className="rounded-lg border border-line bg-white/[0.03] px-2.5 py-1.5 font-mono text-[11.5px] text-muted transition-colors group-hover:border-accent-500/30 group-hover:text-accent-100"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Score / CGPA */}
                {edu.score && (
                  <div className="flex shrink-0 flex-row items-center gap-4 border-t border-line-soft pt-5 lg:w-44 lg:flex-col lg:items-stretch lg:gap-0 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                    <div className="relative grid h-24 w-24 shrink-0 place-items-center lg:mx-auto lg:h-28 lg:w-28">
                      <svg
                        viewBox="0 0 100 100"
                        className="h-full w-full -rotate-90"
                        aria-hidden="true"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="44"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-white/[0.06]"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="44"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeLinecap="round"
                          className="text-accent-400"
                          strokeDasharray={2 * Math.PI * 44}
                          initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                          whileInView={{
                            strokeDashoffset:
                              2 *
                              Math.PI *
                              44 *
                              (1 -
                                Math.min(
                                  parseFloat(edu.score || "0") / 10,
                                  1,
                                )),
                          }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 1.2, ease, delay: 0.2 }}
                        />
                      </svg>
                      <div className="absolute inset-0 grid place-items-center">
                        <span className="font-display text-2xl font-bold text-accent-300">
                          {edu.score}
                        </span>
                      </div>
                    </div>
                    <div className="text-left lg:mt-3 lg:text-center">
                      <span className="label-mono block text-faint">
                        {edu.scoreLabel ?? "Score"}
                      </span>
                      <span className="mt-1 block text-xs text-muted">
                        out of 10
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
