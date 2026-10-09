# Sonu Kumar — Portfolio

A modern, dark, futuristic portfolio site for **Sonu Kumar** (Full-Stack Developer & AI Explorer), with a full REST backend, a MongoDB database, an AI assistant powered by Google Gemini, and a secure admin dashboard for managing content — no code edits needed for content updates.

> **Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Express 5 · MongoDB (Mongoose) · Google Gemini · JWT auth

---

## ✨ Features

- **AI Digital Universe UI** — animated AI orb (with your photo at the core), aurora backgrounds, glassmorphism cards, fully responsive from 320px → 1440px.
- **AI assistant ("Ask My AI")** — floating chat panel grounded in your verified portfolio data (projects, skills, experience, contact). Uses Gemini, with a keyword-matched offline fallback when no API key is set. Rate-limited and server-side keyed.
- **REST API** — projects (list + detail with pagination), skills, experience, education, contact form, AI chat, and admin CRUD.
- **Admin dashboard** — secure JWT login (httpOnly cookie). Create / edit / publish / delete projects, manage skills, experience, education, and read/delete contact messages. Every admin route is protected **server-side**.
- **Contact form** — validated on both client and server, stored in MongoDB, and viewable in the admin inbox.
- **SEO & performance** — meta tags, Open Graph, JSON-LD structured data, sitemap, code-split routes, `prefers-reduced-motion` respected.

---

## 📁 Project structure

```
Portfolio/
├── client/                      # React + Vite frontend
│   ├── public/
│   │   ├── images/              # ← put profile.jpg & og-image here
│   │   └── resume.pdf           # ← drop your resume here
│   └── src/
│       ├── components/          # Navbar, Footer, Button, AIChat, AIOrb…
│       ├── sections/            # Hero, About, Skills, Experience, Projects, Contact
│       ├── pages/               # Home, ProjectDetails, Admin
│       ├── services/api.ts      # typed fetch client
│       ├── hooks/               # usePortfolioData
│       ├── lib/content.ts       # verified profile data
│       └── types/               # shared TS types
├── server/                      # Express + TypeScript backend
│   └── src/
│       ├── config/              # env.ts (validated), db.ts (Mongo connection)
│       ├── models/              # Project, SkillCategory, Experience, Education, Message, AdminUser
│       ├── data/seed.ts         # ← verified content lives here
│       ├── routes/              # public.routes.ts, admin.routes.ts
│       ├── controllers/         # public, auth, admin
│       ├── services/            # ai.ts (Gemini), portfolioContext.ts
│       ├── middleware/          # auth (JWT), error, rateLimit, validate
│       ├── validators/          # Zod schemas
│       └── scripts/             # seed.ts, ensureAdmin.ts
├── .env.example
└── README.md
```

---

## 🚀 Getting started

### Prerequisites
- **Node.js ≥ 20**
- A **MongoDB Atlas** account (free M0) — or a local MongoDB
- *(Optional)* A **Google Gemini API key** for the AI chat

### 1. Install everything
```bash
npm run install:all
```
This installs the root, `client/`, and `server/` dependencies.

### 2. Configure environment
`server/.env` is already created with safe dev defaults. Update it:
```bash
# server/.env
MONGODB_URI=your_atlas_connection_string   # ← required
GEMINI_API_KEY=your_gemini_key             # ← optional (AI chat)
JWT_SECRET=some_long_random_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_strong_password
```
Copy `.env.example` if you ever need a fresh template.

### 3. Seed the database
Loads your verified projects, skills, experience, education, and creates the admin user. **Idempotent** — safe to re-run.
```bash
npm run seed
```

### 4. Run in development
Starts both the client and the server together:
```bash
npm run dev
```
Or run them in **separate terminals**:
```bash
# Terminal 1 — API → http://localhost:4000
npm run dev:server

# Terminal 2 — Web → http://localhost:5173
npm run dev:client
```

- **Frontend:** http://localhost:5173
- **API health check:** http://localhost:4000/api/health
- **Admin dashboard:** http://localhost:5173/admin (login: your `ADMIN_USERNAME` / `ADMIN_PASSWORD`)

> In dev, Vite proxies `/api/*` to the server, so there are no CORS issues.

---

## 🗄️ API reference

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server + DB + AI status |
| GET | `/api/projects` | Published projects (`?featured=true&page=1&limit=12`) |
| GET | `/api/projects/:slug` | Single project by slug |
| GET | `/api/skills` | Skill categories |
| GET | `/api/experience` | Experience entries |
| GET | `/api/education` | Education entries |
| POST | `/api/contact` | Submit contact message *(rate limited)* |
| POST | `/api/ai/chat` | AI assistant conversation *(rate limited)* |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login (sets httpOnly cookie) |
| POST | `/api/auth/logout` | Clear session |

### Admin *(all require valid JWT cookie)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/session` | Check auth status |
| GET / POST | `/api/admin/projects` | List (incl. drafts) / create |
| PATCH / DELETE | `/api/admin/projects/:id` | Update / delete |
| GET / POST | `/api/admin/skills` | List / create |
| PATCH / DELETE | `/api/admin/skills/:id` | Update / delete |
| GET / POST | `/api/admin/experience` | List / create |
| PATCH / DELETE | `/api/admin/experience/:id` | Update / delete |
| GET / POST | `/api/admin/education` | List / create |
| PATCH / DELETE | `/api/admin/education/:id` | Update / delete |
| GET | `/api/admin/messages` | Inbox |
| PATCH / DELETE | `/api/admin/messages/:id` | Mark read / delete |

---

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run client + server together |
| `npm run dev:client` / `dev:server` | Run one side |
| `npm run build` | Build both for production |
| `npm run seed` | Seed/refresh database content |
| `npm run typecheck` | Type-check both apps |
| `npm run lint` | Lint both apps |
| `npm run setup` | Install all + seed |

---

## 🖼️ Adding your assets

1. **Profile photo** → save as `client/public/images/profile.jpg`
   (Until it exists, a gradient "SK" monogram is shown automatically.)
2. **Resume** → save as `client/public/resume.pdf`
3. **OG social image** → `client/public/images/og-image.svg`

---

## ☁️ Deployment

A straightforward free-tier setup:

| Piece | Host | Notes |
|-------|------|-------|
| Frontend | **Vercel** | Root = `client/`, build = `npm run build`, output = `dist` |
| Backend | **Render** | Root = `server/`, build = `npm run build`, start = `npm start` |
| Database | **MongoDB Atlas (M0)** | Network Access → allow Render's IP (or `0.0.0.0/0`) |

**Production env (Render):**
```
NODE_ENV=production
PORT=4000
MONGODB_URI=...
JWT_SECRET=...
GEMINI_API_KEY=...
CLIENT_URL=https://your-frontend.vercel.app
ADMIN_USERNAME=...
ADMIN_PASSWORD=...
```
Set `CLIENT_URL` to your real frontend URL so CORS + the auth cookie work (`sameSite=none; secure=true` is used in production). Then run `npm run seed` once against the production database.

---

## 🔐 Security notes

- Secrets live **only** in `.env` (git-ignored). `.env.example` has placeholders.
- Admin routes are guarded by JWT verification **on the server** — the UI hiding things is not the protection.
- Auth uses an **httpOnly cookie** (`secure` + `sameSite=none` in production).
- Passwords are hashed with **bcrypt** (12 rounds).
- **Zod** validates every request body; a centralized error handler returns consistent JSON.
- **Rate limiting** on AI chat (10/min), contact (5/15min), and login (20/15min).
- The Gemini API key never reaches the browser; the AI degrades gracefully if it's missing.

---

## 🧑‍💻 Author

**Sonu Kumar** — Full-Stack Developer & AI Explorer
- Email: sonusatyajnu2005@gmail.com
- Phone: +91-7209080805
- GitHub: [github.com/sonusatya](https://github.com/sonusatya)
- LinkedIn: [linkedin.com/in/sonukr72](https://linkedin.com/in/sonukr72)

MIT licensed.
