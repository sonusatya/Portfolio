/**
 * Verified portfolio content (from Sonu's resume).
 *
 * This file is the single source of truth used to (re)seed the database.
 * Run:  npm run seed --prefix server
 *
 * It is idempotent — existing documents with the same slug/name are updated,
 * not duplicated.
 */

export const seedProjects = [
  {
    slug: "grocnest",
    title: "GrocNest",
    tagline: "Full-stack grocery e-commerce platform",
    summary:
      "A production-ready grocery shopping platform built on the MERN stack, with product browsing, cart management, secure auth and a deployed storefront on Vercel.",
    description: [
      "GrocNest is a full-stack grocery e-commerce application built with React, Node.js, Express and MongoDB. It covers the complete shopping flow — browsing products, managing a persistent cart, placing orders and managing user accounts.",
      "The backend exposes a RESTful API with JWT authentication, password hashing and Mongoose data models for users, products and orders. The frontend is a responsive React app with Vite and Tailwind CSS, deployed to Vercel.",
      "The project was built end-to-end to practice real product concerns: schema design, protected routes, error handling and deployment.",
    ],
    techStack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Bcrypt",
    ],
    category: "fullstack",
    timeline: "2025",
    role: "Full-Stack Developer",
    highlights: [
      "Complete shopping flow: product listing, cart, checkout and order history",
      "JWT authentication with bcrypt password hashing and protected routes",
      "RESTful API architecture with Express and Mongoose ODM",
      "Responsive mobile-first UI built with Tailwind CSS",
      "Deployed frontend on Vercel with a hosted API backend",
    ],
    links: {
      live: "https://grocnest.vercel.app/",
      source: "https://github.com/sonusatya",
    },
    featured: true,
    published: true,
    order: 1,
  },
  {
    slug: "dr-doodley",
    title: "Dr. Doodley",
    tagline: "Veterinary services platform",
    summary:
      "A production-ready veterinary services platform with 8 modular components, an interactive FAQ accordion, dynamic expert cards, multi-location display and a booking form.",
    description: [
      "Dr. Doodley is a veterinary services platform built with React.js, Vite and Tailwind CSS. The UI is composed of 8 modular components — Navbar, Hero, Services, Experts, HappyPets, Locations, FAQ and Footer — keeping the codebase clean and easy to extend.",
      "It features an interactive FAQ accordion with toggle state management, dynamic expert team cards, a multi-location clinic display and a service booking form, all built with a mobile-first responsive grid layout.",
      "The project focuses on component architecture, state management and pixel-perfect responsive design, deployed to Vercel for public access.",
    ],
    techStack: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "Lucide React",
      "React Router",
    ],
    category: "frontend",
    timeline: "2024",
    role: "Frontend Developer",
    highlights: [
      "8 modular, reusable components with a clear separation of concerns",
      "Interactive FAQ accordion with toggle state management",
      "Dynamic expert team cards and multi-location clinic display",
      "Service booking form with cross-browser compatibility",
      "Mobile-first responsive grid layout deployed on Vercel",
    ],
    links: {
      live: "",
      source: "https://github.com/sonusatya",
    },
    featured: false,
    published: true,
    order: 2,
  },
];

export const seedSkills = [
  {
    name: "Languages",
    icon: "languages",
    order: 1,
    skills: [
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Python",
      "SQL",
      "JSX",
      "Java + DSA",
    ],
  },
  {
    name: "Frontend",
    icon: "frontend",
    order: 2,
    skills: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Router",
      "Lucide React",
      "Framer Motion",
      "Responsive Design",
    ],
  },
  {
    name: "Backend",
    icon: "backend",
    order: 3,
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "Mongoose ODM",
      "Socket.io",
      "Bcrypt",
      "Multer",
    ],
  },
  {
    name: "AI & APIs",
    icon: "ai",
    order: 4,
    skills: [
      "Groq API (Llama 3.3-70B)",
      "OpenAI API",
      "Google Gemini",
      "LangChain",
      "Prompt Engineering",
      "LLM Integration",
      "AI Chatbots",
    ],
  },
  {
    name: "DevOps & Tools",
    icon: "devops",
    order: 5,
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "CI/CD",
      "Redis",
      "Vercel",
      "Render",
      "Postman",
      "ESLint",
      "npm",
      "Cloudinary",
    ],
  },
  {
    name: "Databases",
    icon: "database",
    order: 6,
    skills: ["MongoDB Atlas", "Mongoose", "Neon (Postgres)", "SQL", "NoSQL"],
  },
];

export const seedExperience = [
  {
    organization: "Apna College",
    role: "Delta — Full Stack Web Development",
    location: "Remote",
    type: "program",
    start: "Aug 2024",
    end: "Jul 2025",
    current: false,
    certificate: "Certificate",
    order: 1,
    bullets: [
      "Completed an intensive 9-month full-stack curriculum covering HTML/CSS, JavaScript, React.js, Node.js, Express, MongoDB and SQL under mentorship of Shradha Khapra (Co-Founder, Apna College); maintained 100% module completion.",
      "Delivered 5+ end-to-end full-stack projects encompassing JWT auth, relational and NoSQL database design, RESTful API architecture, and pixel-perfect responsive UIs across all screen sizes.",
    ],
  },
];

export const seedEducation = [
  {
    institution: "Jagannath University",
    degree: "Bachelor of Technology — Computer Science & Engineering",
    location: "Jaipur, Rajasthan",
    start: "Jul 2023",
    end: "Expected Jul 2027",
    score: "7.2",
    scoreLabel: "CGPA",
    order: 1,
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
      "OOP",
    ],
  },
];
