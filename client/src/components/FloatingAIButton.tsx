import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Floating "Ask My AI" launcher. Hidden while the chat panel is open.
 */
export function FloatingAIButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <AnimatePresence>
      {!open && (
        <motion.button
          initial={{ opacity: 0, y: 24, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.4, ease }}
          onClick={onClick}
          aria-label="Ask Sonu's AI assistant"
          className="group fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full border border-brand-500/35 bg-gradient-to-r from-brand-500/20 to-accent-500/20 py-2.5 pl-3 pr-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/70 hover:shadow-glow-lg sm:bottom-7 sm:right-7"
        >
          {/* Pulsing ring */}
          <span className="pointer-events-none absolute inset-0 rounded-full border border-brand-400/40" />
          <span className="pointer-events-none absolute -inset-1 rounded-full border border-brand-400/20 animate-ping" />

          <span className="relative grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-accent-500">
            <Sparkles className="h-4 w-4 text-void" />
          </span>

          <span className="relative text-sm font-medium text-ink">
            Ask My AI
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
