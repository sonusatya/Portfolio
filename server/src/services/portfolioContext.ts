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
   Summary: A production-ready grocery shopping platform built on the MERN stack, with product browsing, cart management, secure auth and a deployed storefront on Vercel.
   Tech: React, Vite, Tailwind CSS, Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt
   Highlights:
   - Complete shopping flow: product listing, cart, checkout and order history
   - JWT authentication with bcrypt password hashing and protected routes
   - RESTful API architecture with Express and Mongoose ODM
   - Responsive mobile-first UI built with Tailwind CSS
   - Deployed frontend on Vercel with a hosted API backend

2) Dr. Doodley — Frontend Developer — 2024 — Category: frontend
   Summary: A production-ready veterinary services platform with 8 modular components, an interactive FAQ accordion, dynamic expert cards, multi-location display and a booking form.
   Tech: React.js, Vite, Tailwind CSS, Lucide React, React Router
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
- AI & APIs: Groq API (Llama 3.3-70B), OpenAI API, Google Gemini, LangChain, Prompt Engineering, LLM Integration, AI Chatbots
- DevOps & Tools: Git, GitHub, Docker, CI/CD, Redis, Vercel, Render, Postman, ESLint, npm, Cloudinary
- Databases: MongoDB Atlas, Mongoose, Neon (Postgres), SQL, NoSQL

EXPERIENCE:
- Apna College — Delta Full Stack Web Development (Remote) — Aug 2024 to Jul 2025 — Certificate
  - Completed an intensive 9-month full-stack curriculum covering HTML/CSS, JavaScript, React.js, Node.js, Express, MongoDB and SQL under mentorship of Shradha Khapra (Co-Founder, Apna College); maintained 100% module completion.
  - Delivered 5+ end-to-end full-stack projects encompassing JWT auth, relational and NoSQL database design, RESTful API architecture, and pixel-perfect responsive UIs across all screen sizes.

EDUCATION:
- Jagannath University, Jaipur, Rajasthan — Bachelor of Technology, Computer Science & Engineering
  - Jul 2023 to Expected Jul 2027 — CGPA: 7.2
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
