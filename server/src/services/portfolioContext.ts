/**
 * Verified portfolio context injected into the Gemini system prompt.
 *
 * Keep this factual and in sync with `src/data/seed.ts`. The AI is
 * instructed to answer ONLY from this block, which prevents hallucinated
 * projects, employers or dates.
 */

export const PROFILE_CONTEXT = `
NAME: Sonu Kumar
ROLE: Full-Stack Web Developer (MERN stack) & AI Explorer
LOCATION: Jaipur, Rajasthan, India
AVAILABILITY: Actively seeking SDE / Web Developer roles at product-focused companies and funded startups.

CONTACT:
- Email: sonusatyajnu2005@gmail.com
- Phone: +91-7209080805
- GitHub: https://github.com/sonusatya
- LinkedIn: https://linkedin.com/in/sonukr72

SUMMARY:
Full-Stack Web Developer with hands-on experience building AI-integrated web applications using React, Node.js and REST APIs. Completed a 9-month Delta Full Stack program (Apna College) and shipped production-ready projects deployed on Vercel.

PROJECTS:

1) GrocNest (Featured) — Full-Stack Developer — 2025 — Category: fullstack
   Live: https://grocnest.vercel.app/
   Summary: A production-ready grocery shopping platform on the MERN stack — product browsing, persistent cart, checkout, JWT-secured accounts, Cloudinary image storage, deployed on Vercel + Render.
   Frontend tools: React 18, Redux Toolkit, Vite, Tailwind CSS, React Router
   Backend tools: Node.js, Express.js, REST API, JWT, Bcrypt, Cloudinary
   Database: MongoDB Atlas using the Mongoose ODM (collections: users, products, categories, orders, with referenced ObjectId relations)
   Highlights:
   - Complete shopping flow: product listing, cart, checkout and order history
   - JWT authentication with bcrypt hashing and protected client + server routes
   - RESTful API with a layered Express architecture and centralized error handling
   - MongoDB Atlas + Mongoose ODM with referenced relations and schema validation
   - Redux Toolkit for global cart/auth state; Cloudinary for product image uploads

2) AI Portfolio & Assistant (Featured) — Full-Stack Developer & AI Integration — 2026 — Category: ai
   Summary: The portfolio site itself. A MERN + TypeScript app with a Google Gemini AI assistant grounded in real portfolio data, a secure admin dashboard, JWT auth, rate limiting and a MongoDB backend.
   Frontend tools: React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion
   Backend tools: Express 5, Node.js, Zod validation, JWT, Bcrypt, Helmet, rate limiting
   Database: MongoDB Atlas using the Mongoose ODM (projects, skills, experience, education, messages)
   AI: Google Gemini (gemini-2.0-flash), grounded in a verified portfolio context block with an offline keyword fallback. The API key stays server-side only.
   Highlights:
   - Gemini assistant grounded in verified portfolio context with an offline fallback
   - Express 5 + TypeScript layered API with Zod validation and centralized error handling
   - MongoDB Atlas + Mongoose models for all portfolio content
   - JWT auth in httpOnly cookies, bcrypt hashing, helmet, CORS allow-list, route-level rate limiting
   - Admin dashboard to manage projects, skills, experience and messages without code edits

3) Dr. Doodley — Frontend Developer — 2024 — Category: frontend
   Summary: A production-ready veterinary services platform with 8 modular components, an interactive FAQ accordion, dynamic expert cards, multi-location display and a booking form.
   Frontend tools: React.js, Vite, Tailwind CSS, Lucide React, React Router (frontend-only, no database)
   Highlights:
   - 8 modular, reusable components (Navbar, Hero, Services, Experts, HappyPets, Locations, FAQ, Footer)
   - Interactive FAQ accordion with toggle state management
   - Dynamic expert team cards and multi-location clinic display
   - Service booking form with cross-browser compatibility
   - Mobile-first responsive grid layout deployed on Vercel

SKILLS:
- Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, Python, SQL, JSX, Java + DSA
- Frontend: React.js, Vite, Tailwind CSS, Redux Toolkit, React Router, Lucide React, Framer Motion, Responsive Design
- Backend: Node.js, Express.js, REST APIs, JWT Authentication, Mongoose ODM, Socket.io, Bcrypt, Multer
- AI & APIs: Google Gemini, Groq API (Llama 3.3-70B), OpenAI API, LangChain, Prompt Engineering, LLM Integration, AI Chatbots
- DevOps & Tools: Git, GitHub, Docker, CI/CD, Redis, Vercel, Render, Postman, ESLint, npm, Cloudinary
- Databases: MongoDB Atlas, Mongoose, Neon (Postgres), SQL, NoSQL

EXPERIENCE:
- Cisco Networking Academy — Introduction to Cybersecurity Internship (Online) — Aug 2025 — Certificate
  - Completed Cisco Networking Academy's Introduction to Cybersecurity program, gaining a solid foundation in the cybersecurity landscape, common threats and attacks, and the principles of protecting data and privacy.
  - Studied real-world security concepts including malware, network attacks, social engineering, vulnerability assessment and the role of firewalls, intrusion detection and encryption.
  - Explored cybersecurity careers and practices such as defense-in-depth, risk management and secure browsing.

- Apna College — Delta Full Stack Web Development (Remote) — Aug 2024 to Jul 2025 — Certificate
  - Completed an intensive 9-month full-stack curriculum covering HTML/CSS, JavaScript, React.js, Node.js, Express, MongoDB and SQL under mentorship of Shradha Khapra (Co-Founder, Apna College); maintained 100% module completion.
  - Delivered 5+ end-to-end full-stack projects encompassing JWT auth, relational and NoSQL database design, RESTful API architecture, and pixel-perfect responsive UIs across all screen sizes.

- Self-Paced Coursework — Data Structures & Algorithms in Java — 2024 to 2025 — Certificate
  - Practised core data structures (arrays, linked lists, stacks, queues, trees, graphs, hash maps) and classic algorithms (sorting, searching, recursion, dynamic programming, greedy approaches).
  - Focused on problem-solving patterns and time/space complexity analysis for efficient, interview-ready code.

EDUCATION:
- Jagannath University, Jaipur, Rajasthan — Bachelor of Technology, Computer Science & Engineering
  - Jul 2023 to Expected Jul 2027 — CGPA: 8.4
  - Coursework: Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, OOP

HOW SONU DESIGNS A BACKEND (typical approach):
- Express.js REST API with a layered structure (routes -> controllers -> services -> models)
- MongoDB + Mongoose ODM for document data, or SQL/Neon for relational data
- JWT authentication in httpOnly cookies, bcrypt for password hashing
- Zod schemas for centralized request validation
- Centralized error handling middleware returning consistent JSON error shapes
- Environment-based configuration, never committing secrets
- Deployed on Render with MongoDB Atlas for the database

ABOUT SONU (personal):
Sonu is a B.Tech CSE student who went deep on the MERN stack through Apna College's Delta program. He enjoys building interfaces that feel fast and systems simple enough to reason about. Recently he has been focused on integrating LLMs into real products. He is open to relocating or remote work and is currently looking for SDE or Web Developer roles.
`.trim();
