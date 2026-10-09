import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { FloatingAIButton } from "@/components/FloatingAIButton";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Starfield } from "@/components/Starfield";
import { Home } from "@/pages/Home";

// Heavier pages are code-split so the landing page stays light.
const ProjectDetails = lazy(() =>
  import("@/pages/ProjectDetails").then((m) => ({ default: m.ProjectDetails })),
);
const Admin = lazy(() =>
  import("@/pages/Admin").then((m) => ({ default: m.Admin })),
);

function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center pt-[var(--nav-h)]">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-brand-400" />
    </div>
  );
}

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();

  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => setChatOpen(false), []);

  // Scroll to the top whenever the route changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  // Keyboard shortcut: press "k" (Ctrl/Cmd + K) to toggle the AI chat.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setChatOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Starfield />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-void"
      >
        Skip to content
      </a>

      <Navbar onOpenChat={openChat} />

      <main id="main" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home onOpenChat={openChat} />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="/admin" element={<Admin />} />
            {/* Anchor-style shortcuts that map to home sections */}
            <Route
              path="/about"
              element={<Navigate to="/#about" replace />}
            />
            <Route path="/skills" element={<Navigate to="/#skills" replace />} />
            <Route
              path="/experience"
              element={<Navigate to="/#experience" replace />}
            />
            <Route
              path="/education"
              element={<Navigate to="/#education" replace />}
            />
            <Route
              path="/projects"
              element={<Navigate to="/#projects" replace />}
            />
            <Route
              path="/contact"
              element={<Navigate to="/#contact" replace />}
            />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer is hidden on the admin route to keep it focused */}
      {location.pathname !== "/admin" && <Footer />}

      {/* AI assistant */}
      {isHome && <FloatingAIButton open={chatOpen} onClick={openChat} />}
      <AIChat open={chatOpen} onClose={closeChat} />
    </div>
  );
}
