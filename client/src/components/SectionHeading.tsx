import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  /** Small uppercase eyebrow label above the title (e.g. "Skills"). */
  label: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  id?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Reusable section header: eyebrow label + title + optional description.
 */
export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  id,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}
    >
      <div
        className={`mb-3 ${centered ? "flex justify-center" : ""}`}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/[0.07] px-3 py-1 label-mono text-brand-200">
          <span className="h-1 w-1 rounded-full bg-brand-400" aria-hidden="true" />
          {label}
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] text-ink">{title}</h2>

      {description && (
        <p className="mt-4 text-[15px] sm:text-base text-muted leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
