import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  id?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Reusable section header: "01 / BUILD" style index + title + optional description.
 */
export function SectionHeading({
  index,
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
        className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}
      >
        <span className="label-mono text-brand-300">{index}</span>
        <span className="h-px w-8 bg-line" aria-hidden="true" />
        <span className="label-mono">{label}</span>
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
