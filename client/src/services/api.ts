/**
 * Tiny typed fetch client for the portfolio API.
 *
 * - In dev, Vite proxies `/api` → the Express server (see vite.config.ts),
 *   so we can use relative URLs and avoid CORS entirely.
 * - In production, set VITE_API_URL to the deployed API origin.
 */

import type {
  ChatMessage,
  ChatResponse,
  ContactMessage,
  Education,
  Experience,
  HealthResponse,
  Project,
  SkillCategory,
} from "@/types";

const BASE_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

class ApiRequestError extends Error {
  readonly status: number;
  readonly details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.details = details;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20_000);

  try {
    const res = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      signal: options.signal ?? controller.signal,
      ...options,
    });

    const isJson = res.headers.get("content-type")?.includes("application/json");
    const body = isJson ? await res.json().catch(() => null) : null;

    if (!res.ok) {
      const message =
        (body as { message?: string } | null)?.message ??
        `Request failed with status ${res.status}`;
      throw new ApiRequestError(message, res.status, body);
    }

    return body as T;
  } finally {
    window.clearTimeout(timeout);
  }
}

/* ---------------- Public API ---------------- */

export const api = {
  health: () => request<HealthResponse>("/api/health"),

  getProjects: (params?: { featured?: boolean; page?: number; limit?: number }) => {
    const search = new URLSearchParams();
    if (params?.featured) search.set("featured", "true");
    if (params?.page) search.set("page", String(params.page));
    if (params?.limit) search.set("limit", String(params.limit));
    const qs = search.toString();
    return request<{ items: Project[]; total: number; page: number; pages: number }>(
      `/api/projects${qs ? `?${qs}` : ""}`,
    );
  },

  getProject: (slug: string) => request<Project>(`/api/projects/${encodeURIComponent(slug)}`),

  getSkills: () => request<SkillCategory[]>("/api/skills"),

  getExperience: () => request<Experience[]>("/api/experience"),

  getEducation: () => request<Education[]>("/api/education"),

  sendContact: (payload: ContactMessage) =>
    request<{ ok: boolean; message: string }>("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  chat: (messages: ChatMessage[], signal?: AbortSignal) =>
    request<ChatResponse>("/api/ai/chat", {
      method: "POST",
      body: JSON.stringify({ messages }),
      signal,
    }),
};

export { ApiRequestError };
