import type { Profile, Project, SkillCategory, Experience, Education } from "@/types";

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
  { value: "8.4", suffix: "", label: "B.Tech CSE CGPA" },
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

/* ============================================================
   STATIC FALLBACK CONTENT
   Mirrors server/src/data/seed.ts. Used when the API is
   unreachable so the portfolio still renders fully offline.
   ============================================================ */

export const FALLBACK_PROJECTS: Project[] = [
  {
    _id: "p-grocnest",
    slug: "grocnest",
    title: "GrocNest",
    tagline: "Full-stack grocery e-commerce platform",
    summary:
      "A production-ready grocery shopping platform on the MERN stack — product browsing, persistent cart, checkout, JWT-secured accounts, Cloudinary image storage, deployed on Vercel + Render.",
    description: [
      "GrocNest is a complete grocery e-commerce application built with React, Node.js, Express and MongoDB, covering the entire shopping flow — browsing products, managing a persistent cart, placing orders and managing accounts.",
      "Frontend: React 18 with Vite, Tailwind CSS, Redux Toolkit for global cart/auth state and React Router for protected routes. Product images use Cloudinary.",
      "Backend: A layered Express.js REST API with JWT auth, bcrypt hashing and centralized error handling, modeled in MongoDB Atlas with the Mongoose ODM across users, products, categories and orders.",
    ],
    techStack: [
      "React 18",
      "Redux Toolkit",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Mongoose ODM",
      "JWT",
      "Bcrypt",
      "Cloudinary",
    ],
    category: "fullstack",
    timeline: "2025",
    role: "Full-Stack Developer",
    highlights: [
      "Complete shopping flow: product listing, cart, checkout and order history",
      "JWT authentication with bcrypt hashing and protected routes",
      "RESTful API with layered Express architecture and centralized error handling",
      "MongoDB Atlas + Mongoose ODM with users, products, categories and orders",
      "Redux Toolkit for global state; Cloudinary for product image uploads",
      "Responsive mobile-first UI on Vercel with the API on Render",
    ],
    links: { live: "https://grocnest.vercel.app/", source: "https://github.com/sonusatya" },
    featured: true,
    published: true,
    order: 1,
  },
  {
    _id: "p-ai-portfolio",
    slug: "ai-portfolio",
    title: "AI Portfolio & Assistant",
    tagline: "This site — Gemini-powered portfolio with an AI assistant",
    summary:
      "The portfolio you're viewing. A MERN + TypeScript app with a Google Gemini AI assistant grounded in real portfolio data, a secure admin dashboard, JWT auth, rate limiting and a MongoDB backend.",
    description: [
      "This is the very site you're browsing — built to showcase my work and let recruiters talk to an AI that actually knows my projects, skills and experience.",
      "Frontend: React 19 + TypeScript, Vite, Tailwind CSS v4 and Framer Motion for the animated AI-orb hero and floating chat panel.",
      "Backend: Express 5 + TypeScript in a layered structure, MongoDB Atlas via Mongoose, Zod validation and a single error-handling middleware.",
      "AI: Server-side Google Gemini (gemini-2.0-flash) grounded in a curated portfolio context block, with an offline fallback. The API key never reaches the browser.",
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS v4",
      "Framer Motion",
      "Express 5",
      "MongoDB Atlas",
      "Mongoose ODM",
      "Google Gemini AI",
      "Zod",
      "JWT",
    ],
    category: "ai",
    timeline: "2026",
    role: "Full-Stack Developer & AI Integration",
    highlights: [
      "Gemini assistant grounded in verified portfolio context with an offline fallback",
      "Express 5 + TypeScript layered API with Zod validation",
      "MongoDB Atlas + Mongoose models for all portfolio content",
      "JWT auth in httpOnly cookies, bcrypt, helmet, CORS and rate limiting",
      "Admin dashboard to manage content without code edits",
      "Animated AI-orb hero, code-split routes, SEO meta, responsive 320px→1440px",
    ],
    links: { live: "", source: "https://github.com/sonusatya" },
    featured: true,
    published: true,
    order: 2,
  },
  {
    _id: "p-dr-doodley",
    slug: "dr-doodley",
    title: "Dr. Doodley",
    tagline: "Veterinary services platform",
    summary:
      "A production-ready veterinary services platform with 8 modular components, an interactive FAQ accordion, dynamic expert cards, multi-location display and a booking form.",
    description: [
      "Dr. Doodley is a veterinary services platform built with React.js, Vite and Tailwind CSS, composed of 8 modular components — Navbar, Hero, Services, Experts, HappyPets, Locations, FAQ and Footer.",
      "Tools: React.js for a component-driven UI, Vite for a fast build loop, Tailwind CSS for utility-first styling, Lucide React for icons and React Router for navigation.",
      "Frontend-focused (no database), centred on component architecture, state management and pixel-perfect responsive design, deployed to Vercel.",
    ],
    techStack: ["React.js", "Vite", "Tailwind CSS", "Lucide React", "React Router"],
    category: "frontend",
    timeline: "2024",
    role: "Frontend Developer",
    highlights: [
      "8 modular, reusable components with clear separation of concerns",
      "Interactive FAQ accordion with toggle state management",
      "Dynamic expert team cards and multi-location clinic display",
      "Service booking form with cross-browser compatibility",
      "Mobile-first responsive grid layout deployed on Vercel",
    ],
    links: { live: "", source: "https://github.com/sonusatya" },
    featured: false,
    published: true,
    order: 3,
  },
];

export const FALLBACK_SKILLS: SkillCategory[] = [
  { _id: "s-languages", name: "Languages", icon: "languages", order: 1, skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Python", "SQL", "JSX", "Java + DSA"] },
  { _id: "s-frontend", name: "Frontend", icon: "frontend", order: 2, skills: ["React.js", "Vite", "Tailwind CSS", "Redux Toolkit", "React Router", "Lucide React", "Framer Motion", "Responsive Design"] },
  { _id: "s-backend", name: "Backend", icon: "backend", order: 3, skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Mongoose ODM", "Socket.io", "Bcrypt", "Multer"] },
  { _id: "s-ai", name: "AI & APIs", icon: "ai", order: 4, skills: ["Google Gemini", "Groq API (Llama 3.3-70B)", "OpenAI API", "LangChain", "Prompt Engineering", "LLM Integration", "AI Chatbots"] },
  { _id: "s-databases", name: "Databases", icon: "database", order: 5, skills: ["MongoDB Atlas", "Mongoose ODM", "Neon (Postgres)", "SQL", "NoSQL"] },
  { _id: "s-devops", name: "DevOps & Tools", icon: "devops", order: 6, skills: ["Git", "GitHub", "Docker", "CI/CD", "Redis", "Cloudinary", "Vercel", "Render", "Postman", "ESLint", "npm"] },
];

export const FALLBACK_EXPERIENCE: Experience[] = [
  {
    _id: "e-cisco",
    organization: "Cisco Networking Academy",
    role: "Introduction to Cybersecurity — Internship",
    location: "Online",
    type: "internship",
    start: "Aug 2025",
    end: "Aug 2025",
    current: false,
    certificate: "View Certificate",
    certificateUrl: "/certificates/cisco-cybersecurity-certificate.pdf",
    order: 1,
    bullets: [
      "Completed Cisco Networking Academy's Introduction to Cybersecurity program, gaining a foundation in the cybersecurity landscape, common threats and attacks, and the principles of protecting data and privacy.",
      "Studied real-world security concepts including malware, network attacks, social engineering, vulnerability assessment and the role of firewalls, intrusion detection and encryption.",
      "Explored cybersecurity careers and practices such as defense-in-depth, risk management and secure browsing.",
    ],
  },
  {
    _id: "e-delta",
    organization: "Apna College",
    role: "Delta — Full Stack Web Development",
    location: "Remote",
    type: "program",
    start: "Aug 2024",
    end: "Jul 2025",
    current: false,
    certificate: "View Certificate",
    certificateUrl: "/certificates/delta-fullstack-certificate.pdf",
    order: 2,
    bullets: [
      "Completed an intensive 9-month full-stack curriculum covering HTML/CSS, JavaScript, React.js, Node.js, Express, MongoDB and SQL under mentorship of Shradha Khapra (Co-Founder, Apna College); maintained 100% module completion.",
      "Delivered 5+ end-to-end full-stack projects encompassing JWT auth, relational and NoSQL database design, RESTful API architecture, and pixel-perfect responsive UIs across all screen sizes.",
    ],
  },
  {
    _id: "e-dsa",
    organization: "Self-Paced Coursework",
    role: "Data Structures & Algorithms (Java)",
    location: "Online",
    type: "course",
    start: "2024",
    end: "2025",
    current: false,
    certificate: "View Certificate",
    certificateUrl: "/certificates/dsa-certificate.pdf",
    order: 3,
    bullets: [
      "Completed a Data Structures & Algorithms course in Java, practising core data structures (arrays, linked lists, stacks, queues, trees, graphs, hash maps) and classic algorithms (sorting, searching, recursion, dynamic programming, greedy approaches).",
      "Focused on problem-solving patterns and time/space complexity analysis to write efficient, interview-ready code.",
    ],
  },
];

export const FALLBACK_EDUCATION: Education[] = [
  {
    _id: "edu-jnu",
    institution: "Jagannath University",
    degree: "Bachelor of Technology — Computer Science & Engineering",
    location: "Jaipur, Rajasthan",
    start: "Jul 2023",
    end: "Expected Jul 2027",
    score: "8.4",
    scoreLabel: "CGPA",
    coursework: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks", "OOP"],
    order: 1,
  },
];
