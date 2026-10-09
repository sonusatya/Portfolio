import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { ExperienceSection } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Contact } from "@/sections/Contact";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { AlertTriangle, RefreshCw, Loader2 } from "lucide-react";

interface HomeProps {
  onOpenChat: () => void;
}

export function Home({ onOpenChat }: HomeProps) {
  const { projects, skills, experience, education, loading, error, refresh } =
    usePortfolioData();

  return (
    <>
      <Hero onOpenChat={onOpenChat} />

      {/* Data-loading banner (only shown on error) */}
      {error && (
        <div className="container-x mb-4">
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-warn/25 bg-warn/[0.07] px-4 py-3"
          >
            <p className="flex items-center gap-2.5 text-sm text-warn">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {error}
            </p>
            <button
              onClick={refresh}
              className="inline-flex items-center gap-1.5 rounded-lg border border-warn/30 px-3 py-1.5 text-xs text-warn transition-colors hover:bg-warn/10"
            >
              <RefreshCw className="h-3 w-3" />
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="hairline-x container-x" aria-hidden="true" />

      <About education={education} experience={experience} />

      <Skills skills={skills} />

      <ExperienceSection experience={experience} education={education} />

      {/* Skeleton while projects load so the layout doesn't jump */}
      {loading && projects.length === 0 ? (
        <ProjectSkeleton />
      ) : (
        <Projects projects={projects} />
      )}

      <Contact />
    </>
  );
}

function ProjectSkeleton() {
  return (
    <section className="py-20 sm:py-28" aria-busy="true" aria-label="Loading projects">
      <div className="container-x">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin text-brand-400" />
          Loading projects…
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-72 animate-shimmer rounded-2xl border border-line-soft bg-surface"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
