import { motion } from "framer-motion";
import { Briefcase, MapPin, Award, CheckCircle2, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { Experience } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

interface ExperienceSectionProps {
  experience?: Experience[];
}

export function ExperienceSection({ experience = [] }: ExperienceSectionProps) {
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          label="Experience"
          title={
            <>
              Internships, programs <span className="text-aurora">&amp; courses</span>
            </>
          }
          description="A cybersecurity internship, an intensive full-stack program and focused DSA coursework — each backed by a verified certificate."
        />

        <ol className="relative mt-12 space-y-6 border-l border-line-soft pl-5 sm:pl-8">
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
              <span className="absolute -left-[27px] top-5 grid h-3 w-3 place-items-center rounded-full border border-brand-500/50 bg-void sm:-left-[37px]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400 transition-shadow duration-300 group-hover:shadow-[0_0_10px_2px_rgb(28_200_245/0.7)]" />
              </span>

              <div className="rounded-2xl border border-line-soft bg-surface p-5 transition-all duration-400 hover:border-line hover:bg-surface-2 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="text-base font-semibold text-ink sm:text-lg">
                      {exp.role}
                    </h4>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-300">
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 opacity-80" />
                        {exp.organization}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-muted">
                        <MapPin className="h-3.5 w-3.5 opacity-80" />
                        {exp.location}
                      </span>
                    </p>
                  </div>

                  <span className="shrink-0 rounded-md border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted">
                    {exp.start} — {exp.current ? "Present" : exp.end}
                  </span>
                </div>

                {exp.certificate && (
                  <div className="mt-3">
                    {exp.certificateUrl ? (
                      <a
                        href={exp.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Open ${exp.certificate}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-success/25 bg-success/[0.07] px-3 py-1.5 text-xs text-success transition-colors hover:bg-success/15"
                      >
                        <Award className="h-3.5 w-3.5" />
                        {exp.certificate}
                        <ExternalLink className="h-3 w-3 opacity-70" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-success/25 bg-success/[0.07] px-3 py-1.5 text-xs text-success/90">
                        <Award className="h-3.5 w-3.5" />
                        {exp.certificate}
                      </span>
                    )}
                  </div>
                )}

                {exp.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {exp.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-muted sm:text-sm"
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
    </section>
  );
}
