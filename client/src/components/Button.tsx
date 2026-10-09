import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Renders an anchor-styled button when provided. */
  href?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

const base =
  "relative inline-flex items-center justify-center gap-2 font-medium rounded-xl " +
  "transition-all duration-300 ease-out select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-400 " +
  "disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "text-void bg-gradient-to-r from-brand-300 to-brand-500 " +
    "hover:from-brand-200 hover:to-brand-400 " +
    "shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "text-ink glass hover:border-white/16 hover:bg-white/[0.07] hover:-translate-y-0.5",
  outline:
    "text-brand-200 border border-brand-500/35 bg-brand-500/[0.06] " +
    "hover:border-brand-400/70 hover:bg-brand-500/[0.13] hover:-translate-y-0.5",
  ghost:
    "text-muted hover:text-ink hover:bg-white/[0.05]",
};

const sizes: Record<Size, string> = {
  sm: "text-sm h-9 px-4",
  md: "text-sm h-11 px-5",
  lg: "text-[15px] h-12 px-7",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", href, className = "", children, fullWidth, ...rest },
    ref,
  ) => {
    const classes = [
      base,
      variants[variant],
      sizes[size],
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
