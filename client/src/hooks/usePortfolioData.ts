import { useEffect, useState } from "react";
import { api } from "@/services/api";
import {
  FALLBACK_PROJECTS,
  FALLBACK_SKILLS,
  FALLBACK_EXPERIENCE,
  FALLBACK_EDUCATION,
} from "@/lib/content";
import type { Education, Experience, Project, SkillCategory } from "@/types";

interface PortfolioData {
  projects: Project[];
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Fetches all portfolio data used by the home page sections.
 * Falls back to an empty list per resource so one failing endpoint
 * never blanks out the whole page.
 */
export function usePortfolioData(): PortfolioData {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setError(null);

      // Fetch independently — a failure in one shouldn't block the others.
      const [p, s, e, d] = await Promise.allSettled([
        api.getProjects({ limit: 50 }),
        api.getSkills(),
        api.getExperience(),
        api.getEducation(),
      ]);

      if (cancelled) return;

      if (p.status === "fulfilled") {
        setProjects(p.value.items ?? []);
      } else {
        setProjects(FALLBACK_PROJECTS);
      }
      if (s.status === "fulfilled") setSkills(s.value ?? []);
      else setSkills(FALLBACK_SKILLS);
      if (e.status === "fulfilled") setExperience(e.value ?? []);
      else setExperience(FALLBACK_EXPERIENCE);
      if (d.status === "fulfilled") setEducation(d.value ?? []);
      else setEducation(FALLBACK_EDUCATION);

      const failed = [p, s, e, d].some((r) => r.status === "rejected");
      if (failed) {
        // Non-fatal: static fallback content is shown. Surface a soft notice
        // so live features (AI chat, contact) are known to be offline.
        setError(
          "Showing built-in content — the live API is offline, so AI chat and the contact form may not work.",
        );
      }

      setLoading(false);
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [tick]);

  return {
    projects,
    skills,
    experience,
    education,
    loading,
    error,
    refresh: () => setTick((t) => t + 1),
  };
}
