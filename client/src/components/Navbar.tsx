import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/lib/content";
import { Button } from "@/components/Button";

const ease = [0.16, 1, 0.3, 1] as const;

interface NavbarProps {
  onOpenChat: () => void;
}

export function Navbar({ onOpenChat }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isHome = location.pathname === "/";

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    // If we're not on the home page, let the link navigate first, then scroll.
    if (!isHome) return;
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        scrolled
          ? "glass-strong border-b border-white/[0.06] shadow-[0_10px_40px_-20px_rgb(0_0_0/0.9)]"
          : "border-b border-transparent"
      }`}
      style={{ height: "var(--nav-h)" }}
    >
      <nav className="container-x flex h-full items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => handleNavClick("#top")}
          className="group flex items-center gap-3"
          aria-label="Sonu Kumar — home"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-lg border border-brand-500/30 bg-brand-500/10 font-display text-sm font-bold text-brand-200 transition-all duration-300 group-hover:border-brand-400/60 group-hover:shadow-glow">
            SK
            <span className="absolute -inset-px rounded-lg bg-gradient-to-br from-brand-400/20 to-accent-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[15px] font-semibold text-ink">
              {PROFILE.name}
            </span>
            <span className="label-mono text-[9px] tracking-[0.2em] text-faint">
              Full-Stack · AI
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              {isHome ? (
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="group relative block px-3.5 py-2 text-sm text-muted transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                  <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-400 to-accent-400 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ) : (
                <NavLink
                  to={`/${link.href}`}
                  className="block px-3.5 py-2 text-sm text-muted transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenChat}
            className="hidden sm:inline-flex"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Ask My AI
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease }}
            className="glass-strong fixed inset-x-0 top-[var(--nav-h)] z-40 border-b border-white/[0.07] lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-5">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3, ease }}
                >
                  {isHome ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-[15px] text-ink transition-colors hover:bg-white/[0.05]"
                    >
                      {link.label}
                      <span className="label-mono text-[10px]">
                        0{i + 1}
                      </span>
                    </a>
                  ) : (
                    <Link
                      to={`/${link.href}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-[15px] text-ink transition-colors hover:bg-white/[0.05]"
                    >
                      {link.label}
                      <span className="label-mono text-[10px]">0{i + 1}</span>
                    </Link>
                  )}
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3, ease }}
                className="mt-3 border-t border-white/[0.06] pt-4"
              >
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenChat();
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                  Ask My AI
                </Button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
