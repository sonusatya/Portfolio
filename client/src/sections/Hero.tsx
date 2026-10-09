import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles, MapPin } from "lucide-react";
import { AIOrb } from "@/components/AIOrb";
import { Button } from "@/components/Button";
import { PROFILE, STATS } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

interface HeroProps {
  onOpenChat: () => void;
}

export function Hero({ onOpenChat }: HeroProps) {
  const scrollToWork = () => {
    document.querySelector("#projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="top" className="relative overflow-hidden pt-[calc(var(--nav-h)+3rem)] pb-16 sm:pb-24">
      {/* Ambient background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid" />
        {/* Aurora blobs */}
        <div
          className="animate-aurora absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-45 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgb(28 200 245 / 0.32), transparent 62%), radial-gradient(circle at 68% 55%, rgb(139 92 246 / 0.26), transparent 60%)",
          }}
        />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* -------- Copy -------- */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            {/* Availability pill */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2.5 rounded-full border border-success/25 bg-success/[0.07] px-3.5 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
              <span className="text-xs font-medium tracking-wide text-success/90">
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06, ease }}
              className="mt-5 text-[2.6rem] leading-[1.03] xs:text-5xl sm:text-6xl lg:text-[4.1rem]"
            >
              <span className="block font-bold tracking-tight text-ink">
                {PROFILE.name}
              </span>
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease }}
              className="mt-3 font-mono text-[13px] font-medium uppercase tracking-[0.2em] sm:text-sm"
            >
              <span className="text-aurora">Full Stack Developer</span>
              <span className="mx-2 text-faint">·</span>
              <span className="text-accent-300">AI Explorer</span>
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="mt-5 font-display text-xl text-ink/90 sm:text-2xl"
            >
              {PROFILE.tagline}
            </motion.p>

            {/* Intro */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease }}
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
            >
              {PROFILE.intro}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button variant="primary" size="lg" onClick={scrollToWork}>
                Explore My Work
                <ArrowUpRight className="h-4 w-4" />
              </Button>

              <Button variant="secondary" size="lg" onClick={onOpenChat}>
                <Sparkles className="h-4 w-4 text-brand-300" />
                Ask My AI
              </Button>
            </motion.div>

            {/* Location */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 inline-flex items-center gap-2 text-sm text-faint"
            >
              <MapPin className="h-3.5 w-3.5 text-brand-400" />
              {PROFILE.location}
            </motion.p>
          </div>

          {/* -------- Orb -------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="order-1 flex justify-center lg:order-2 lg:col-span-5"
          >
            <div className="relative">
              <AIOrb size={280} />
              {/* Floating badges around the orb */}
              <Badge className="-left-2 top-6 sm:-left-10" delay={0.6}>
                React
              </Badge>
              <Badge className="-right-2 top-16 sm:-right-12" delay={0.75}>
                Node.js
              </Badge>
              <Badge className="bottom-6 left-0 sm:-left-8" delay={0.9}>
                MongoDB
              </Badge>
              <Badge className="bottom-16 right-0 sm:-right-10" delay={1.05}>
                Gemini AI
              </Badge>
            </div>
          </motion.div>
        </div>

        {/* -------- Stats strip -------- */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line-soft bg-line-soft sm:mt-20 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="group bg-surface px-5 py-6 transition-colors duration-300 hover:bg-surface-2"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display text-3xl font-bold text-ink sm:text-4xl">
                  {stat.value}
                  <span className="text-brand-300">{stat.suffix}</span>
                </span>
                <span className="mt-1.5 block text-[13px] leading-snug text-muted">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-14 flex justify-center"
        >
          <button
            onClick={scrollToWork}
            aria-label="Scroll to content"
            className="group flex flex-col items-center gap-2 text-faint transition-colors hover:text-brand-300"
          >
            <span className="label-mono text-[10px]">Scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-8 w-8 place-items-center rounded-full border border-line transition-colors group-hover:border-brand-500/50"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Badge({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease }}
      className={`glass absolute hidden rounded-full px-3 py-1 font-mono text-[11px] text-brand-100 sm:block ${className}`}
      style={{ boxShadow: "0 8px 24px -12px rgb(0 0 0 / 0.8)" }}
    >
      {children}
    </motion.span>
  );
}
