import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Phone, ArrowUpRight, Heart } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/lib/content";

const SOCIALS = [
  { label: "GitHub", href: PROFILE.github, Icon: Github },
  { label: "LinkedIn", href: PROFILE.linkedin, Icon: Linkedin },
  { label: "Email", href: `mailto:${PROFILE.email}`, Icon: Mail },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-line-soft bg-surface/40">
      {/* Fade-in top hairline */}
      <div className="hairline-x" aria-hidden="true" />

      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-brand-500/30 bg-brand-500/10 font-display text-sm font-bold text-brand-200">
                SK
              </span>
              <span className="font-display text-lg font-semibold text-ink">
                {PROFILE.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Full-Stack Developer &amp; AI Explorer. I build modern web
              applications, scalable backends and thoughtful AI-powered
              experiences.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="group grid h-10 w-10 place-items-center rounded-lg border border-line bg-white/[0.02] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/50 hover:text-brand-200 hover:shadow-glow"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-3" aria-label="Footer">
            <h3 className="label-mono mb-4 text-faint">Navigate</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={`/${link.href}`}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin"
                  className="text-sm text-faint transition-colors hover:text-ink"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="label-mono mb-4 text-faint">Get in touch</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="group flex items-start gap-2.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <span className="break-all">{PROFILE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PROFILE.phone.replace(/[^+\d]/g, "")}`}
                  className="group flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                  {PROFILE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted">
                <span className="grid h-4 w-4 shrink-0 place-items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
                </span>
                {PROFILE.availableForOpportunities
                  ? "Available for opportunities"
                  : "Currently unavailable"}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line-soft pt-6 sm:flex-row">
          <p className="text-xs text-faint">
            © {year} {PROFILE.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-faint">
            Designed &amp; built with
            <Heart className="h-3 w-3 text-danger" fill="currentColor" />
            using React, Express &amp; Gemini
          </p>
        </div>
      </div>
    </footer>
  );
}
