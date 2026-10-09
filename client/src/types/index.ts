/**
 * Shared domain types for the portfolio.
 * These mirror the API responses from the Express server.
 */

export interface Link {
  label: string;
  url: string;
}

export interface Project {
  _id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string[];
  /** Short one-liner used on cards */
  summary: string;
  techStack: string[];
  category: "fullstack" | "frontend" | "backend" | "ai" | "other";
  /** e.g. "2024" or "Aug 2024 — Jul 2025" */
  timeline: string;
  role: string;
  highlights: string[];
  image?: string;
  links: {
    live?: string;
    source?: string;
  };
  featured: boolean;
  published: boolean;
  order: number;
}

export interface SkillCategory {
  _id: string;
  name: string;
  /** icon key resolved on the client (see lib/icons.ts) */
  icon: string;
  skills: string[];
  order: number;
}

export interface Experience {
  _id: string;
  organization: string;
  role: string;
  location: string;
  type: "work" | "program" | "internship" | "course" | "volunteer";
  start: string;
  end: string;
  current: boolean;
  certificate?: string;
  /** Link that opens the certificate when the badge is clicked. */
  certificateUrl?: string;
  bullets: string[];
  order: number;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  location: string;
  start: string;
  end: string;
  score?: string;
  scoreLabel?: string;
  coursework: string[];
  order: number;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  reply: string;
  /** present when the AI service was unavailable and a canned answer was returned */
  fallback?: boolean;
}

export interface ApiError {
  message: string;
  details?: unknown;
}

export interface HealthResponse {
  status: "ok" | "degraded";
  uptime: number;
  timestamp: string;
  database: "connected" | "disconnected";
  ai: "configured" | "not-configured";
}

export interface Profile {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  headline: string;
  intro: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  photoUrl: string;
  availableForOpportunities: boolean;
  summary: string;
  about: string[];
}
