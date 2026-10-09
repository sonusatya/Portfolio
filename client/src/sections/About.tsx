import { motion } from "framer-motion";
import { GraduationCap, CalendarDays, Award } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PROFILE, PILLARS, STATS } from "@/lib/content";
import type { Education, Experience } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

interface AboutProps {
  education?: Education[];
  experience?: Experience[];
}

export function About({ education = [], experience = [] }: AboutProps) {
  const edu = education[0];
  const exp = experience[0];

  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---------------- Left: portrait + quick facts ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Portrait */}
              <div className="glass relative overflow-hidden rounded-2xl">
                <div className="aspect-[4/5] w-full bg-surface-2">
                  <img
                    src={PROFILE.photoUrl}
                    alt={`${PROFILE.name}, full-stack developer`}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover object-top"
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = "none";
                      const parent = el.parentElement;
                      if (parent) {
                        parent.classList.add(
                          "grid",
                          "place-items-center",
                          "bg-gradient-to-br",
                          "from-surface-2",
                          "to-elevated",
                        );
                        parent.innerHTML =
                          '<span class="font-display text-6xl text-aurora select-none">SK</span>';
                      }
                    }}
                  />
                </div>
                {/* Gradient scrim at the bottom */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void via-void/60 to-transparent" />
                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-lg font-semibold text-ink">
                    {PROFILE.name}
                  </p>
                  <p className="text-sm text-muted">
                    B.Tech CSE · Jaipur, India
                  </p>
                </div>
              </div>

              {/* Floating status card */}
              <div className="glass-strong absolute -bottom-6 -right-3 w-[210px] rounded-xl p-4 sm:-right-6">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
                  <span className="text-xs font-medium text-success/90">
                    Open to work
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-snug text-muted">
                  Seeking SDE / Web Developer roles at product-focused companies
                  &amp; funded startups.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ---------------- Right: text ---------------- */}
          <div className="lg:col-span-7">
            <SectionHeading
              label="About"
              title={
                <>
                  Turning ideas into <span className="text-aurora">shipped products</span>
                </>
              }
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="mt-6 space-y-4"
            >
              {PROFILE.about.map((para, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-muted">
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Education + Experience mini-cards */}
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {exp && <MiniCard
                icon={<CalendarDays className="h-4 w-4 text-brand-300" />}
                title="Experience"
                primary={exp.role}
                secondary={exp.organization}
                meta={`${exp.start} — ${exp.current ? "Present" : exp.end}`}
                extra={exp.location}
              />}
              {edu && <MiniCard
                icon={<GraduationCap className="h-4 w-4 text-accent-300" />}
                title="Education"
                primary={edu.degree}
                secondary={edu.institution}
                meta={`${edu.start} — ${edu.end}`}
                extra={edu.score ? `${edu.scoreLabel ?? "CGPA"}: ${edu.score}` : undefined}
              />}
            </div>

            {/* Stats */}
            <dl className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 * i, ease }}
                  className="rounded-xl border border-line-soft bg-white/[0.02] px-4 py-3"
                >
                  <dd className="font-display text-2xl font-bold text-ink">
                    {s.value}
                    <span className="text-brand-300">{s.suffix}</span>
                  </dd>
                  <dt className="mt-0.5 text-[11.5px] leading-tight text-faint">
                    {s.label}
                  </dt>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>

        {/* ---------------- Pillars: BUILD · DESIGN · EXPLORE ---------------- */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              className="group relative overflow-hidden rounded-2xl border border-line-soft bg-surface p-6 transition-all duration-400 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-glow"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-brand-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <span className="label-mono inline-flex items-center gap-2 text-brand-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
                  {p.label}
                </span>

                <h3 className="mt-3 text-xl text-ink">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {p.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-brand-500/25 group-hover:text-brand-100"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Mini card ---------------- */

function MiniCard({
  icon,
  title,
  primary,
  secondary,
  meta,
  extra,
}: {
  icon: React.ReactNode;
  title: string;
  primary: string;
  secondary: string;
  meta: string;
  extra?: string;
}) {
  return (
    <div className="rounded-xl border border-line-soft bg-white/[0.02] p-4 transition-colors duration-300 hover:border-line">
      <div className="flex items-center gap-2">
        {icon}
        <span className="label-mono text-[10px] text-faint">{title}</span>
      </div>
      <p className="mt-2.5 text-[15px] font-medium leading-snug text-ink">
        {primary}
      </p>
      <p className="mt-0.5 text-[13px] text-muted">{secondary}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-faint">
        <span>{meta}</span>
        {extra && (
          <span className="inline-flex items-center gap-1">
            <Award className="h-3 w-3" />
            {extra}
          </span>
        )}
      </div>
    </div>
  );
}
