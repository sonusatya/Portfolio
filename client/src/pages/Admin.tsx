import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Star,
  Mail,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  Inbox,
  FolderGit2,
  X,
} from "lucide-react";
import { Button } from "@/components/Button";
import { PROFILE } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  API helpers (admin-scoped, cookie auth)                            */
/* ------------------------------------------------------------------ */

const BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

async function adminFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json().catch(() => null) : null;

  if (res.status === 401) throw new AuthError();
  if (!res.ok) {
    const msg =
      (body as { message?: string } | null)?.message ??
      `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return body as T;
}

class AuthError extends Error {
  constructor() {
    super("Not authenticated");
    this.name = "AuthError";
  }
}

interface AdminProject {
  _id: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  techStack: string[];
  category: string;
  featured: boolean;
  published: boolean;
}

interface AdminMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

const EMPTY_PROJECT = {
  title: "",
  slug: "",
  tagline: "",
  summary: "",
  description: "",
  techStack: "",
  category: "fullstack",
  timeline: "",
  role: "",
  highlights: "",
  live: "",
  source: "",
  featured: false,
  published: true,
};

type ProjectForm = typeof EMPTY_PROJECT;

/* ------------------------------------------------------------------ */

export function Admin() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  // Verify an existing session on mount.
  useEffect(() => {
    adminFetch("/api/admin/session")
      .then(() => setAuthed(true))
      .catch(() => setAuthed(false))
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <main className="grid min-h-[60vh] place-items-center pt-[var(--nav-h)]">
        <Loader2 className="h-6 w-6 animate-spin text-brand-400" />
      </main>
    );
  }

  return (
    <main className="pt-[calc(var(--nav-h)+2.5rem)] pb-24">
      <div className="container-x">
        <Link
          to="/"
          className="group mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to portfolio
        </Link>

        {authed ? (
          <Dashboard onLogout={() => setAuthed(false)} />
        ) : (
          <Login onSuccess={() => setAuthed(true)} />
        )}
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Login                                                              */
/* ------------------------------------------------------------------ */

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      await adminFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      onSuccess();
    } catch (err) {
      setError(
        err instanceof AuthError
          ? "Invalid username or password."
          : (err as Error).message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="mx-auto mt-8 max-w-sm"
    >
      <div className="glass-strong rounded-2xl p-6 sm:p-8">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand-500/30 bg-brand-500/12">
          <Lock className="h-5 w-5 text-brand-300" />
        </span>

        <h1 className="mt-5 text-2xl text-ink">Admin login</h1>
        <p className="mt-1.5 text-sm text-muted">
          Sign in to manage portfolio content.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="u" className="mb-1.5 block text-[13px] font-medium text-muted">
              Username
            </label>
            <input
              id="u"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full rounded-xl border border-line bg-white/[0.03] px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-brand-500/60 focus:outline-none"
              placeholder="admin"
            />
          </div>

          <div>
            <label htmlFor="p" className="mb-1.5 block text-[13px] font-medium text-muted">
              Password
            </label>
            <input
              id="p"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-xl border border-line bg-white/[0.03] px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-brand-500/60 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 rounded-lg border border-danger/25 bg-danger/[0.07] px-3 py-2.5 text-sm text-danger"
              >
                <AlertTriangle className="h-4 w-4 shrink-0" />
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard                                                          */
/* ------------------------------------------------------------------ */

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<"projects" | "messages">("projects");
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [editing, setEditing] = useState<ProjectForm | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2800);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [p, m] = await Promise.all([
        adminFetch<{ items: AdminProject[] }>("/api/admin/projects"),
        adminFetch<AdminMessage[]>("/api/admin/messages"),
      ]);
      setProjects(p.items ?? []);
      setMessages(m ?? []);
    } catch (err) {
      if (err instanceof AuthError) {
        onLogout();
        return;
      }
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    void load();
  }, [load]);

  const logout = async () => {
    try {
      await adminFetch("/api/auth/logout", { method: "POST" });
    } catch {
      /* ignore — we clear state regardless */
    }
    onLogout();
  };

  const removeProject = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await adminFetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      flash("Project deleted");
      await load();
    } catch (err) {
      flash((err as Error).message);
    } finally {
      setDeletingId(null);
    }
  };

  const togglePublished = async (p: AdminProject) => {
    try {
      await adminFetch(`/api/admin/projects/${p._id}`, {
        method: "PATCH",
        body: JSON.stringify({ published: !p.published }),
      });
      flash(p.published ? "Unpublished" : "Published");
      setProjects((prev) =>
        prev.map((x) => (x._id === p._id ? { ...x, published: !p.published } : x)),
      );
    } catch (err) {
      flash((err as Error).message);
    }
  };

  const markRead = async (m: AdminMessage) => {
    try {
      await adminFetch(`/api/admin/messages/${m._id}`, {
        method: "PATCH",
        body: JSON.stringify({ read: !m.read }),
      });
      setMessages((prev) =>
        prev.map((x) => (x._id === m._id ? { ...x, read: !m.read } : x)),
      );
    } catch (err) {
      flash((err as Error).message);
    }
  };

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            Signed in as {PROFILE.name} · manage content without touching code.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => void load()}>
            <Loader2 className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="secondary" size="sm" onClick={() => void logout()}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-2 border-b border-line-soft">
        {(
          [
            { key: "projects", label: "Projects", icon: FolderGit2, count: projects.length },
            { key: "messages", label: "Messages", icon: Inbox, count: messages.length },
          ] as const
        ).map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`relative -mb-px flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
              tab === key ? "text-brand-200" : "text-muted hover:text-ink"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
            <span className="rounded-full border border-line bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px]">
              {count}
            </span>
            {tab === key && (
              <motion.span
                layoutId="admin-tab"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-brand-400 to-accent-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed left-1/2 top-24 z-50 -translate-x-1/2 rounded-full border border-success/30 bg-success/15 px-4 py-2 text-sm text-success backdrop-blur-md"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-danger/25 bg-danger/[0.07] px-4 py-3 text-sm text-danger">
          <AlertTriangle className="h-4 w-4" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-brand-400" />
        </div>
      ) : tab === "projects" ? (
        <ProjectsPanel
          projects={projects}
          onNew={() => setEditing({ ...EMPTY_PROJECT })}
          onEdit={(p) =>
            setEditing({
              title: p.title,
              slug: p.slug,
              tagline: p.tagline,
              summary: p.summary,
              description: "",
              techStack: p.techStack.join(", "),
              category: p.category,
              timeline: "",
              role: "",
              highlights: "",
              live: "",
              source: "",
              featured: p.featured,
              published: p.published,
            })
          }
          onDelete={removeProject}
          onToggle={togglePublished}
          deletingId={deletingId}
        />
      ) : (
        <MessagesPanel
          messages={messages}
          onMarkRead={markRead}
          onDelete={async (id) => {
            if (!window.confirm("Delete this message?")) return;
            try {
              await adminFetch(`/api/admin/messages/${id}`, { method: "DELETE" });
              setMessages((prev) => prev.filter((m) => m._id !== id));
              flash("Message deleted");
            } catch (err) {
              flash((err as Error).message);
            }
          }}
        />
      )}

      {/* Project editor drawer */}
      <AnimatePresence>
        {editing && (
          <ProjectEditor
            initial={editing}
            onCancel={() => setEditing(null)}
            onSaved={async (msg) => {
              setEditing(null);
              flash(msg);
              await load();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Projects panel                                                     */
/* ------------------------------------------------------------------ */

function ProjectsPanel({
  projects,
  onNew,
  onEdit,
  onDelete,
  onToggle,
  deletingId,
}: {
  projects: AdminProject[];
  onNew: () => void;
  onEdit: (p: AdminProject) => void;
  onDelete: (id: string, title: string) => void;
  onToggle: (p: AdminProject) => void;
  deletingId: string | null;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          {projects.length} project{projects.length === 1 ? "" : "s"}
        </p>
        <Button variant="primary" size="sm" onClick={onNew}>
          <Plus className="h-4 w-4" />
          New project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line py-14 text-center">
          <FolderGit2 className="mx-auto h-9 w-9 text-faint" />
          <p className="mt-3 text-sm text-muted">No projects yet.</p>
          <p className="mt-1 text-xs text-faint">
            Click “New project” to add your first one.
          </p>
        </div>
      ) : (
        <ul className="mt-5 space-y-2.5">
          {projects.map((p) => (
            <li
              key={p._id}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-line-soft bg-surface px-4 py-3 transition-colors hover:border-line"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-[15px] font-medium text-ink">{p.title}</p>
                  {p.featured && (
                    <Star className="h-3.5 w-3.5 text-amber-400" fill="currentColor" />
                  )}
                  <span
                    className={`rounded-md border px-1.5 py-0.5 font-mono text-[10px] uppercase ${
                      p.published
                        ? "border-success/30 bg-success/10 text-success"
                        : "border-line bg-white/[0.03] text-faint"
                    }`}
                  >
                    {p.published ? "live" : "draft"}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted">{p.tagline}</p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onToggle(p)}
                  title={p.published ? "Unpublish" : "Publish"}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-brand-500/50 hover:text-brand-200"
                >
                  <Star
                    className={`h-3.5 w-3.5 ${p.featured ? "text-amber-400" : ""}`}
                    fill={p.featured ? "currentColor" : "none"}
                  />
                </button>
                <button
                  onClick={() => onEdit(p)}
                  title="Edit"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-brand-500/50 hover:text-brand-200"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => onDelete(p._id, p.title)}
                  disabled={deletingId === p._id}
                  title="Delete"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-danger/50 hover:text-danger disabled:opacity-40"
                >
                  {deletingId === p._id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Messages panel                                                     */
/* ------------------------------------------------------------------ */

function MessagesPanel({
  messages,
  onMarkRead,
  onDelete,
}: {
  messages: AdminMessage[];
  onMarkRead: (m: AdminMessage) => void;
  onDelete: (id: string) => void;
}) {
  if (messages.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-line py-14 text-center">
        <Inbox className="mx-auto h-9 w-9 text-faint" />
        <p className="mt-3 text-sm text-muted">No messages yet.</p>
        <p className="mt-1 text-xs text-faint">
          Submissions from the contact form will appear here.
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-6 space-y-3">
      {messages.map((m) => (
        <li
          key={m._id}
          className={`rounded-xl border p-4 transition-colors ${
            m.read
              ? "border-line-soft bg-surface"
              : "border-brand-500/30 bg-brand-500/[0.05]"
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[15px] font-medium text-ink">{m.name}</p>
                {!m.read && (
                  <span className="rounded-full bg-brand-400 px-1.5 py-0.5 text-[9px] font-bold uppercase text-void">
                    new
                  </span>
                )}
              </div>
              <a
                href={`mailto:${m.email}`}
                className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-brand-300 hover:underline"
              >
                <Mail className="h-3 w-3" />
                {m.email}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-faint">
                {new Date(m.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={() => onMarkRead(m)}
                title={m.read ? "Mark unread" : "Mark read"}
                className="grid h-7 w-7 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-brand-500/50 hover:text-brand-200"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onDelete(m._id)}
                title="Delete"
                className="grid h-7 w-7 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-danger/50 hover:text-danger"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {m.subject && (
            <p className="mt-2 text-sm font-medium text-ink/90">{m.subject}</p>
          )}
          <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-muted">
            {m.message}
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  Project editor                                                     */
/* ------------------------------------------------------------------ */

function ProjectEditor({
  initial,
  onCancel,
  onSaved,
}: {
  initial: ProjectForm;
  onCancel: () => void;
  onSaved: (msg: string) => void;
}) {
  const [form, setForm] = useState<ProjectForm>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof ProjectForm, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const isEdit = Boolean(initial.slug && initial.title);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (saving) return;

    if (!form.title.trim() || !form.summary.trim()) {
      setError("Title and summary are required.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      title: form.title.trim(),
      slug:
        form.slug.trim() ||
        form.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      tagline: form.tagline.trim(),
      summary: form.summary.trim(),
      description: form.description
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      techStack: form.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      category: form.category,
      timeline: form.timeline.trim(),
      role: form.role.trim(),
      highlights: form.highlights
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      links: { live: form.live.trim() || undefined, source: form.source.trim() || undefined },
      featured: form.featured,
      published: form.published,
    };

    try {
      if (isEdit) {
        await adminFetch(`/api/admin/projects/${encodeURIComponent(initial.slug)}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        onSaved("Project updated");
      } else {
        await adminFetch("/api/admin/projects", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        onSaved("Project created");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="fixed inset-0 z-[60] bg-void/75 backdrop-blur-sm"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? "Edit project" : "New project"}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 60 }}
        transition={{ duration: 0.32, ease }}
        className="glass-strong fixed inset-y-0 right-0 z-[61] flex w-full max-w-lg flex-col border-l border-white/[0.08]"
      >
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
          <h2 className="text-lg text-ink">
            {isEdit ? "Edit project" : "New project"}
          </h2>
          <button
            onClick={onCancel}
            aria-label="Close editor"
            className="grid h-8 w-8 place-items-center rounded-lg text-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={submit} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <Input label="Title *" value={form.title} onChange={(v) => set("title", v)} />
          <Input
            label="Slug"
            value={form.slug}
            onChange={(v) => set("slug", v)}
            placeholder="auto-generated from title"
          />
          <Input
            label="Tagline"
            value={form.tagline}
            onChange={(v) => set("tagline", v)}
            placeholder="One short line under the title"
          />
          <Textarea
            label="Summary *"
            value={form.summary}
            onChange={(v) => set("summary", v)}
            rows={2}
          />
          <Textarea
            label="Description (one paragraph per line)"
            value={form.description}
            onChange={(v) => set("description", v)}
            rows={4}
          />
          <Input
            label="Tech stack (comma separated)"
            value={form.techStack}
            onChange={(v) => set("techStack", v)}
            placeholder="React, Node.js, MongoDB"
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              value={form.category}
              onChange={(v) => set("category", v)}
              options={[
                { value: "fullstack", label: "Full-Stack" },
                { value: "frontend", label: "Frontend" },
                { value: "backend", label: "Backend" },
                { value: "ai", label: "AI" },
                { value: "other", label: "Other" },
              ]}
            />
            <Input
              label="Timeline"
              value={form.timeline}
              onChange={(v) => set("timeline", v)}
              placeholder="2025"
            />
          </div>

          <Input label="Role" value={form.role} onChange={(v) => set("role", v)} />
          <Textarea
            label="Highlights (one per line)"
            value={form.highlights}
            onChange={(v) => set("highlights", v)}
            rows={3}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Live URL"
              value={form.live}
              onChange={(v) => set("live", v)}
              placeholder="https://…"
            />
            <Input
              label="Source URL"
              value={form.source}
              onChange={(v) => set("source", v)}
              placeholder="https://github.com/…"
            />
          </div>

          <div className="flex flex-wrap gap-5 pt-1">
            <Toggle
              label="Featured"
              checked={form.featured}
              onChange={(v) => set("featured", v)}
            />
            <Toggle
              label="Published"
              checked={form.published}
              onChange={(v) => set("published", v)}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 rounded-lg border border-danger/25 bg-danger/[0.07] px-3 py-2.5 text-sm text-danger"
              >
                <AlertTriangle className="h-4 w-4 shrink-0" />
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" size="md" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save project"
              )}
            </Button>
            <Button type="button" variant="ghost" size="md" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </>
  );
}

/* ---------------- Form primitives ---------------- */

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const id = `f-${label.replace(/\W/g, "")}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-muted">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-white/[0.03] px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-brand-500/60 focus:outline-none"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  const id = `f-${label.replace(/\W/g, "")}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-muted">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-xl border border-line bg-white/[0.03] px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-brand-500/60 focus:outline-none"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = `f-${label.replace(/\W/g, "")}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-muted">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-sm text-ink focus:border-brand-500/60 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition-colors ${
          checked ? "bg-brand-500" : "bg-line"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-0.5"
          }`}
        />
      </button>
      {label}
    </label>
  );
}
