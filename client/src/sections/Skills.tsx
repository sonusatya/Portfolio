import { motion } from "framer-motion";
import {
  Code2,
  Layout,
  Server,
  BrainCircuit,
  Wrench,
  Database,
  Boxes,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { SkillCategory } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

/** Icon key → lucide component. Keeps the server data decoupled from the client. */
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  languages: Code2,
  frontend: Layout,
  backend: Server,
  ai: BrainCircuit,
  devops: Wrench,
  database: Database,
  tools: Boxes,
  default: Boxes,
};

function resolveIcon(key: string) {
  return ICONS[key.toLowerCase()] ?? ICONS.default;
}

/** Accent hue per category so the grid isn't monochrome. */
const ACCENTS = [
  { text: "text-brand-300", border: "border-brand-500/30", bg: "bg-brand-500/12" },
  { text: "text-accent-300", border: "border-accent-500/30", bg: "bg-accent-500/12" },
  { text: "text-emerald-300", border: "border-emerald-500/30", bg: "bg-emerald-500/12" },
  { text: "text-amber-300", border: "border-amber-500/30", bg: "bg-amber-500/12" },
  { text: "text-sky-300", border: "border-sky-500/30", bg: "bg-sky-500/12" },
];

interface SkillsProps {
  skills?: SkillCategory[];
}

export function Skills({ skills = [] }: SkillsProps) {
  return (
    <section id="skills" className="relative py-20 sm:py-28">
      {/* Subtle side glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgb(28 200 245 / 0.22), transparent 60%), radial-gradient(circle at 70% 50%, rgb(139 92 246 / 0.18), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x">
        <SectionHeading
          index="02"
          label="Skills"
          title={
            <>
              The <span className="text-aurora">stack</span> I build with
            </>
          }
          description="A practical toolkit honed across 5+ full-stack projects — from responsive UIs to REST APIs, databases and LLM integrations."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((cat, i) => {
            const Icon = resolveIcon(cat.icon);
            const accent = ACCENTS[i % ACCENTS.length];

            return (
              <motion.div
                key={cat._id || cat.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease }}
                className="group relative overflow-hidden rounded-2xl border border-line-soft bg-surface p-5 transition-all duration-400 hover:-translate-y-1 hover:border-line"
              >
                {/* Top glow on hover */}
                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${accent.border} ${accent.bg} ${accent.text} transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {cat.name}
                  </h3>
                </div>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-line bg-white/[0.025] px-2.5 py-1 text-[12.5px] text-muted transition-all duration-200 hover:border-brand-500/40 hover:bg-brand-500/[0.07] hover:text-brand-100"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
