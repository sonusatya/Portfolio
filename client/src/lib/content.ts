import type { Profile } from "@/types";

/**
 * Verified public profile data (from Sonu's resume).
 * Safe to keep on the client — contains no secrets.
 */
export const PROFILE: Profile = {
  name: "Sonu Kumar",
  initials: "SK",
  role: "Full-Stack Developer · AI Explorer",
  headline: "Full-Stack Developer · AI Explorer",
  tagline: "Building the web. Exploring intelligence.",
  intro:
    "I build modern web applications, scalable backend systems and thoughtful AI-powered experiences.",
  location: "Jaipur, Rajasthan, India",
  email: "sonusatyajnu2005@gmail.com",
  phone: "+91-7209080805",
  github: "https://github.com/sonusatya",
  linkedin: "https://linkedin.com/in/sonukr72",
  resumeUrl: "/resume.pdf",
  photoUrl: "/images/profile.jpg",
  availableForOpportunities: true,
  summary:
    "Full-Stack Web Developer with hands-on experience building AI-integrated web applications using React, Node.js, and REST APIs. Completed a 9-month Delta Full Stack program (Apna College) and shipped production-ready projects deployed on Vercel. Seeking SDE / Web Developer roles at product-focused companies and funded startups.",
  about: [
    "I'm Sonu Kumar, a Full-Stack Web Developer based in Jaipur, India. I specialize in the MERN stack — building everything from responsive, pixel-perfect interfaces to RESTful backends with JWT auth and real data models.",
    "Over a 9-month intensive Delta program at Apna College I shipped 5+ end-to-end products, covering relational and NoSQL database design, REST API architecture, and production deployments on Vercel.",
    "Lately I've been going deep on AI — wiring LLMs into real products with the Groq and OpenAI APIs, LangChain, and prompt engineering. I care about interfaces that feel fast, and systems that stay simple enough to reason about.",
  ],
};

/**
 * Three capability pillars shown as "01 / BUILD", "02 / DESIGN", "03 / EXPLORE".
 */
export const PILLARS = [
  {
    index: "01",
    label: "BUILD",
    title: "Web Apps",
    description:
      "Production-ready products across the stack — React frontends, Express APIs, auth, and databases that hold up in production.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    index: "02",
    label: "DESIGN",
    title: "Architecture",
    description:
      "RESTful API design, relational & document data modeling, and clean separation that keeps codebases maintainable as they grow.",
    tags: ["REST APIs", "JWT", "Mongoose", "SQL"],
  },
  {
    index: "03",
    label: "EXPLORE",
    title: "AI Systems",
    description:
      "Integrating LLMs into real products — chat interfaces, retrieval, and prompt engineering grounded in actual user needs.",
    tags: ["Groq", "OpenAI", "LangChain", "LLMs"],
  },
] as const;

/** Quick stats for the hero / about strip. */
export const STATS = [
  { value: "9", suffix: "mo", label: "Delta Full-Stack Program" },
  { value: "5", suffix: "+", label: "Full-Stack Projects Shipped" },
  { value: "7.2", suffix: "", label: "B.Tech CSE CGPA" },
  { value: "2027", suffix: "", label: "Graduating" },
] as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

/** Starter prompts surfaced in the AI chat panel. */
export const SUGGESTED_QUESTIONS = [
  "What projects has Sonu built?",
  "What is Sonu's tech stack?",
  "How does Sonu design a backend?",
  "How can I contact Sonu?",
] as const;
