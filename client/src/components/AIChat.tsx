import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X, Sparkles, RotateCcw, AlertTriangle, Bot, User } from "lucide-react";
import { api, ApiRequestError } from "@/services/api";
import { SUGGESTED_QUESTIONS } from "@/lib/content";
import type { ChatMessage } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm Sonu's AI assistant. Ask me anything about his projects, tech stack, experience, or how he designs a backend — I'll answer from his actual portfolio.",
};

interface AIChatProps {
  open: boolean;
  onClose: () => void;
}

export function AIChat({ open, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* Auto-scroll to newest message */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  /* Focus input on open */
  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 260);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  /* Escape closes the panel; also abort any in-flight request */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* Lock body scroll when the panel is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || loading) return;

      setError(null);
      setIsFallback(false);
      setInput("");

      const nextMessages: ChatMessage[] = [
        ...messages,
        { role: "user", content: question },
      ];
      setMessages(nextMessages);
      setLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        // Keep only the last 10 turns to bound the prompt size.
        const payload = nextMessages.slice(-11);
        const res = await api.chat(payload, controller.signal);

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: res.reply },
        ]);
        setIsFallback(Boolean(res.fallback));
      } catch (err) {
        if (controller.signal.aborted) return;

        const message =
          err instanceof ApiRequestError
            ? err.message
            : "Something went wrong reaching the AI. Please try again.";
        setError(message);
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
        setLoading(false);
      }
    },
    [messages, loading],
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter adds a newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([WELCOME]);
    setError(null);
    setIsFallback(false);
    setInput("");
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-void/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Panel — full-screen sheet on mobile, docked card on desktop */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="AI assistant chat"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease }}
            className="glass-strong fixed inset-0 z-[61] flex flex-col
                       sm:inset-auto sm:right-5 sm:bottom-5 sm:top-auto sm:h-[620px]
                       sm:w-[420px] sm:max-w-[calc(100vw-2.5rem)] sm:rounded-2xl sm:shadow-glow-lg
                       max-sm:h-[100dvh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3.5 sm:px-5">
              <div className="flex items-center gap-3">
                <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-400/25 to-accent-500/25 border border-brand-500/30">
                  <Sparkles className="h-4 w-4 text-brand-200" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-success" />
                </span>
                <div className="leading-tight">
                  <p className="font-display text-sm font-semibold text-ink">
                    Sonu&apos;s AI
                  </p>
                  <p className="text-[11px] text-faint">
                    Ask about projects, skills &amp; architecture
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={reset}
                  aria-label="Reset conversation"
                  title="Reset conversation"
                  className="grid h-8 w-8 place-items-center rounded-lg text-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close chat"
                  className="grid h-8 w-8 place-items-center rounded-lg text-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5"
            >
              {messages.map((m, i) => (
                <Bubble key={i} message={m} />
              ))}

              {loading && <TypingIndicator />}

              {isFallback && !loading && (
                <p className="text-center text-[11px] text-warn/80">
                  AI service unavailable — showing a saved answer.
                </p>
              )}

              {error && (
                <div className="flex items-start gap-2.5 rounded-xl border border-danger/25 bg-danger/[0.07] px-3.5 py-3 text-sm text-danger">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Suggested questions — shown while the convo is short */}
              {messages.length <= 3 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => void send(q)}
                      className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-muted transition-all duration-200 hover:border-brand-500/50 hover:text-brand-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-white/[0.07] px-3 py-3 sm:px-4"
            >
              <div className="flex items-end gap-2 rounded-xl border border-line bg-white/[0.03] px-3 py-2 transition-colors focus-within:border-brand-500/50">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about projects, skills, architecture…"
                  rows={1}
                  maxLength={600}
                  className="max-h-32 flex-1 resize-none bg-transparent py-1.5 text-sm text-ink placeholder:text-faint focus:outline-none"
                  style={{ fieldSizing: "content" as never }}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500 text-void transition-all duration-200 hover:bg-brand-400 disabled:opacity-30 disabled:hover:bg-brand-500"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-faint">
                Answers are generated from Sonu&apos;s portfolio. Enter to send ·
                Shift+Enter for a new line
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Sub-components ---------------- */

function Bubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease }}
      className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <span
        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border ${
          isUser
            ? "border-accent-500/30 bg-accent-500/15"
            : "border-brand-500/30 bg-brand-500/15"
        }`}
      >
        {isUser ? (
          <User className="h-3.5 w-3.5 text-accent-300" />
        ) : (
          <Bot className="h-3.5 w-3.5 text-brand-200" />
        )}
      </span>

      <div
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
          isUser
            ? "rounded-tr-sm bg-accent-500/15 border border-accent-500/20 text-ink"
            : "rounded-tl-sm bg-white/[0.045] border border-white/[0.06] text-ink/90"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-brand-500/30 bg-brand-500/15">
        <Bot className="h-3.5 w-3.5 text-brand-200" />
      </span>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.045] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-brand-300"
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.16 }}
          />
        ))}
      </div>
    </div>
  );
}
