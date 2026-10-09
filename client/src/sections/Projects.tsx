import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, FolderGit2, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { Project } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

const FILTERS = [
  { key: "all", label: "All" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "ai", label: "AI" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

interface ProjectsProps {
  projects?: Project[];
}

export function Projects({ projects = [] }: ProjectsProps) {
  const [active, setActive] = useState<FilterKey>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="04"
            label="Projects"
            title={
              <>
                Things I&apos;ve <span className="text-aurora">built</span>
              </>
            }
            description="Production-ready applications shipped end-to-end — from database schema to deployment."
          />

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter projects"
          >
            {FILTERS.map((f) => {
              const isActive = active === f.key;
              return (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(f.key)}
                  className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-250 ${
                    isActive
                      ? "border-brand-400/60 bg-brand-500/15 text-brand-100 shadow-glow"
                      : "border-line bg-white/[0.02] text-muted hover:border-line hover:bg-white/[0.05] hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ---------------- Grid ---------------- */}
        <div className="mt-12">
          {filtered.length === 0 ? (
            <EmptyState active={active} hasProjects={projects.length > 0} />
          ) : (
            <motion.div
              layout
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <ProjectCard key={project._id} project={project} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Project card ---------------- */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line-soft bg-surface transition-all duration-400 hover:-translate-y-1.5 hover:border-brand-500/40 hover:shadow-glow"
    >
      {/* Header band with gradient */}
      <div className="relative h-32 overflow-hidden border-b border-line-soft bg-gradient-to-br from-surface-2 via-elevated to-surface-2">
        <div
          className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgb(28 200 245 / 0.16), transparent 55%), radial-gradient(circle at 20% 90%, rgb(139 92 246 / 0.14), transparent 55%)",
          }}
        />
        <div className="absolute inset-0 grid place-items-center">
          <FolderGit2 className="h-10 w-10 text-brand-400/25 transition-transform duration-500 group-hover:scale-110" />
        </div>

        {/* Category + timeline */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-md border border-white/10 bg-void/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-200 backdrop-blur-sm">
            {project.category}
          </span>
          {project.featured && (
            <span className="rounded-md border border-amber-500/30 bg-amber-500/12 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-amber-300 backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-brand-100">
            {project.title}
          </h3>
          {project.timeline && (
            <span className="shrink-0 pt-0.5 font-mono text-[11px] text-faint">
              {project.timeline}
            </span>
          )}
        </div>

        <p className="mt-1.5 text-sm text-brand-300/90">{project.tagline}</p>

        <p className="mt-3 line-clamp-3 text-[13.5px] leading-relaxed text-muted">
          {project.summary}
        </p>

        {/* Tech stack */}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((t) => (
            <li
              key={t}
              className="rounded-md border border-line bg-white/[0.025] px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {t}
            </li>
          ))}
          {project.techStack.length > 5 && (
            <li className="rounded-md border border-line bg-white/[0.025] px-2 py-0.5 font-mono text-[11px] text-faint">
              +{project.techStack.length - 5}
            </li>
          )}
        </ul>

        {/* Footer actions */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line-soft pt-4">
          <Link
            to={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 transition-colors hover:text-brand-200"
          >
            View details
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>

          <div className="flex items-center gap-1.5">
            {project.links.source && (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code`}
                className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition-all duration-250 hover:border-brand-500/50 hover:text-brand-200"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition-all duration-250 hover:border-brand-500/50 hover:text-brand-200"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------------- Empty state ---------------- */

function EmptyState({
  active,
  hasProjects,
}: {
  active: FilterKey;
  hasProjects: boolean;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line py-16 text-center">
      <FolderGit2 className="mx-auto h-10 w-10 text-faint" />
      <p className="mt-4 text-sm text-muted">
        {hasProjects
          ? `No ${active === "all" ? "" : active + " "}projects found.`
          : "Projects are loading from the portfolio API."}
      </p>
      <p className="mt-1 text-xs text-faint">
        {hasProjects
          ? "Try another filter."
          : "Run the server (npm run dev:server) and make sure the database is seeded."}
      </p>
    </div>
  );
}
