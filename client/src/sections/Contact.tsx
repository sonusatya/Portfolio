import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Download,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { api, ApiRequestError } from "@/services/api";
import { PROFILE } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

type Status = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL: FormState = { name: "", email: "", subject: "", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    // Clear the field error as soon as the user types.
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "That email address doesn't look valid.";
    if (!form.message.trim()) next.message = "Please write a message.";
    else if (form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!validate()) return;

    setStatus("loading");
    setFeedback("");

    try {
      const res = await api.sendContact({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || undefined,
        message: form.message.trim(),
      });

      setStatus("success");
      setFeedback(
        res.message || "Thanks! Your message has been sent. I'll get back to you soon.",
      );
      setForm(INITIAL);
    } catch (err) {
      setStatus("error");
      setFeedback(
        err instanceof ApiRequestError
          ? err.message
          : "Couldn't send your message right now. Please email me directly.",
      );
    }
  };

  const isEmail = EMAIL_RE.test(form.email.trim());

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      {/* Top glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[380px] opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgb(28 200 245 / 0.2), transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x">
        <SectionHeading
          label="Contact"
          title={
            <>
              Let&apos;s <span className="text-aurora">build something</span>
            </>
          }
          description="Open to SDE and Web Developer roles at product-focused companies and funded startups. Drop a message and I'll respond as soon as I can."
          align="center"
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-5">
          {/* ---------------- Contact info ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="space-y-4 lg:col-span-2"
          >
            <InfoCard
              icon={<Mail className="h-4 w-4 text-brand-300" />}
              label="Email"
              value={PROFILE.email}
              href={`mailto:${PROFILE.email}`}
            />
            <InfoCard
              icon={<Phone className="h-4 w-4 text-accent-300" />}
              label="Phone"
              value={PROFILE.phone}
              href={`tel:${PROFILE.phone.replace(/[^+\d]/g, "")}`}
            />
            <InfoCard
              icon={<MapPin className="h-4 w-4 text-emerald-300" />}
              label="Location"
              value={PROFILE.location}
            />

            {/* Socials */}
            <div className="flex gap-2.5 pt-2">
              <SocialButton
                href={PROFILE.github}
                label="GitHub"
                icon={<Github className="h-4 w-4" />}
              />
              <SocialButton
                href={PROFILE.linkedin}
                label="LinkedIn"
                icon={<Linkedin className="h-4 w-4" />}
              />
              <Button
                variant="secondary"
                size="md"
                href={PROFILE.resumeUrl}
                className="flex-1"
              >
                <Download className="h-4 w-4" />
                Resume
              </Button>
            </div>
          </motion.div>

          {/* ---------------- Form ---------------- */}
          <motion.form
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            onSubmit={onSubmit}
            noValidate
            className="glass-strong rounded-2xl p-5 sm:p-6 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label="Your name"
                value={form.name}
                onChange={(v) => set("name", v)}
                placeholder="Jane Doe"
                error={errors.name}
                autoComplete="name"
              />
              <Field
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => set("email", v)}
                placeholder="jane@company.com"
                error={errors.email}
                valid={isEmail && form.email.length > 0}
                autoComplete="email"
              />
            </div>

            <div className="mt-4">
              <Field
                id="subject"
                label="Subject"
                optional
                value={form.subject}
                onChange={(v) => set("subject", v)}
                placeholder="Job opportunity / Collaboration"
                autoComplete="off"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="message"
                className="mb-1.5 block text-[13px] font-medium text-muted"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Tell me a bit about the role or project…"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`w-full resize-y rounded-xl border bg-white/[0.03] px-3.5 py-2.5 text-sm text-ink placeholder:text-faint transition-colors focus:outline-none ${
                  errors.message
                    ? "border-danger/60"
                    : "border-line focus:border-brand-500/60"
                }`}
              />
              {errors.message && (
                <p
                  id="message-error"
                  className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease }}
                  className="overflow-hidden"
                >
                  <div
                    role="status"
                    className={`mt-4 flex items-start gap-2 rounded-xl border px-3.5 py-3 text-sm ${
                      status === "success"
                        ? "border-success/25 bg-success/[0.08] text-success"
                        : "border-danger/25 bg-danger/[0.07] text-danger"
                    }`}
                  >
                    {status === "success" ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    <span>{feedback}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send message
                  </>
                )}
              </Button>
            </div>

            <p className="mt-3 text-center text-[11px] text-faint">
              This form delivers to my inbox — or email{" "}
              <a
                href={`mailto:${PROFILE.email}`}
                className="text-brand-300 underline-offset-2 hover:underline"
              >
                {PROFILE.email}
              </a>{" "}
              directly.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Sub-components ---------------- */

function InfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-center gap-3.5 rounded-xl border border-line-soft bg-white/[0.02] p-4 transition-all duration-300 hover:border-line hover:bg-white/[0.045]">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="label-mono block text-[10px] text-faint">{label}</span>
        <span className="block truncate text-sm text-ink transition-colors group-hover:text-brand-100">
          {value}
        </span>
      </span>
    </div>
  );

  return href ? <a href={href}>{content}</a> : content;
}

function SocialButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/50 hover:text-brand-200 hover:shadow-glow"
    >
      {icon}
    </a>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  valid,
  optional,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  valid?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-muted">
        {label}
        {optional && <span className="ml-1 text-faint">(optional)</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-xl border bg-white/[0.03] px-3.5 py-2.5 pr-9 text-sm text-ink placeholder:text-faint transition-colors focus:outline-none ${
            error
              ? "border-danger/60"
              : valid
                ? "border-success/50"
                : "border-line focus:border-brand-500/60"
          }`}
        />
        {valid && !error && (
          <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-success" />
        )}
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
        >
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}
