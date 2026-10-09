import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  CalendarDays,
  User,
  Cpu,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { api, ApiRequestError } from "@/services/api";
import { Button } from "@/components/Button";
import type { Project } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; project: Project };

export function ProjectDetails() {
  const { slug = "" } = useParams();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    api
      .getProject(slug)
      .then((project) => {
        if (!cancelled) setState({ status: "ready", project });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message =
          err instanceof ApiRequestError && err.status === 404
            ? "This project doesn't exist or isn't published."
            : "Couldn't load this project. Please try again.";
        setState({ status: "error", message });
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <main className="pt-[calc(var(--nav-h)+3rem)] pb-24">
      <div className="container-x">
        {/* Back link */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-line transition-colors group-hover:border-brand-500/50">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </span>
          Back to portfolio
        </Link>

        {state.status === "loading" && (
          <div className="mt-16 flex flex-col items-center gap-3 text-muted">
            <Loader2 className="h-6 w-6 animate-spin text-brand-400" />
            <p className="text-sm">Loading project…</p>
          </div>
        )}

        {state.status === "error" && (
          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-danger/25 bg-danger/[0.06] p-8 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-danger" />
            <h1 className="mt-4 text-xl text-ink">Project not found</h1>
            <p className="mt-2 text-sm text-muted">{state.message}</p>
            <Button variant="secondary" size="md" href="/" className="mt-6">
              Return home
            </Button>
          </div>
        )}

        {state.status === "ready" && <Detail project={state.project} />}
      </div>
    </main>
  );
}

function Detail({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      className="mx-auto mt-10 max-w-4xl"
    >
      {/* Header */}
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-brand-500/30 bg-brand-500/12 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-brand-200">
            {project.category}
          </span>
          {project.featured && (
            <span className="rounded-md border border-amber-500/30 bg-amber-500/12 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-amber-300">
              Featured
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl text-ink">
          {project.title}
        </h1>
        <p className="mt-2 text-lg text-brand-300">{project.tagline}</p>

        {/* Meta row */}
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          {project.timeline && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-faint" />
              {project.timeline}
            </span>
          )}
          {project.role && (
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4 text-faint" />
              {project.role}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Cpu className="h-4 w-4 text-faint" />
            {project.techStack.length} technologies
          </span>
        </div>
      </header>

      {/* Hero band */}
      <div className="relative mt-8 overflow-hidden rounded-2xl border border-line-soft bg-gradient-to-br from-surface-2 via-elevated to-surface-2">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 78% 22%, rgb(28 200 245 / 0.18), transparent 55%), radial-gradient(circle at 18% 88%, rgb(139 92 246 / 0.16), transparent 55%)",
          }}
        />
        <div className="relative grid h-48 place-items-center sm:h-64">
          <span className="font-display text-5xl font-bold text-aurora opacity-40 sm:text-7xl">
            {project.title.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Links */}
      {(project.links.live || project.links.source) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.live && (
            <Button variant="primary" size="md" href={project.links.live}>
              <ExternalLink className="h-4 w-4" />
              Live demo
            </Button>
          )}
          {project.links.source && (
            <Button variant="secondary" size="md" href={project.links.source}>
              <Github className="h-4 w-4" />
              Source code
            </Button>
          )}
        </div>
      )}

      {/* Overview */}
      <section className="mt-12">
        <h2 className="text-xl text-ink">Overview</h2>
        <div className="mt-4 space-y-4">
          {project.description.map((para, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-muted">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Highlights */}
      {project.highlights.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl text-ink">Key highlights</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 rounded-xl border border-line-soft bg-white/[0.02] p-3.5 text-sm leading-relaxed text-muted"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tech stack */}
      <section className="mt-10">
        <h2 className="text-xl text-ink">Tech stack</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <li
              key={t}
              className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-[12.5px] text-muted transition-colors hover:border-brand-500/40 hover:text-brand-100"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Next / back */}
      <div className="mt-14 border-t border-line-soft pt-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm text-brand-300 transition-colors hover:text-brand-200"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to all projects
        </Link>
      </div>
    </motion.article>
  );
}
