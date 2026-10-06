# Niraj Dhore — Full-Stack Portfolio Application

A production-ready full-stack portfolio application designed for **Niraj Dhore** (Aspiring DevOps & Cloud Engineer | Co-Founder @ KALA), combining a modern design system inspired by the Aditya Pratama reference with a robust Node.js, Express, TypeScript, and MongoDB backend.

---

## 1. Architecture Overview

The system uses a decoupled, layered full-stack architecture:

```
[ Frontend: React 19 + TypeScript + Vite ]
                   │
                   ▼  (REST API / CORS)
[ Backend: Node.js + Express + TypeScript ]
  ├── Security: Helmet, Rate Limiter, CORS
  ├── Authentication: JWT + bcrypt password hashing
  ├── Validation: Zod schemas
  └── Controllers & Services
                   │
                   ▼  (Mongoose ODM)
[ Database: MongoDB / MongoDB Atlas ]
  (with automatic embedded in-memory fallback for local dev)
```

---

## 2. Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Vanilla CSS + Tailwind CSS (utilities), custom SVG iconography.
- **Backend**: Node.js (ES Modules), Express.js, TypeScript.
- **Database**: MongoDB, Mongoose 8.x (with `mongodb-memory-server` embedded local fallback).
- **Security & Auth**: JWT (`jsonwebtoken`), `bcryptjs`, `helmet`, `express-rate-limit`, `zod` input validation.

---

## 3. Folder Structure

```
MyPortfollio/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment & MongoDB connection logic
│   │   ├── controllers/     # Public & Admin business logic handlers
│   │   ├── middleware/      # JWT Auth, Rate Limiter, Zod Validator, Error Handler
│   │   ├── models/          # Mongoose Schemas (User, Project, Experience, etc.)
│   │   ├── routes/          # Public (/api) and Admin (/api/admin) route trees
│   │   ├── types/           # TypeScript data interfaces & Express Auth types
│   │   ├── utils/           # Database seed script & test suite
│   │   ├── app.ts           # Express app instance, security middlewares, routing
│   │   └── server.ts        # Entrypoint: DB connect, listener, graceful shutdown
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── src/                     # React Frontend
│   ├── assets/              # High-resolution SVGs, banners, and portrait
│   ├── components/          # TopProfileCard, Sidebar, Modals, Terminal, StatusBadge
│   ├── data/                # Initial seed structures (fallback)
│   ├── services/            # Frontend API client (api.ts)
│   ├── views/               # AboutView, PortfolioView, ResumeView, ContactView, AdminView
│   ├── App.tsx              # Main routing & application state
│   ├── index.css            # Core design system & reference tokens
│   └── main.tsx
│
├── .env.example
├── package.json
└── README.md
```

---

## 4. Environment Variables

Create `.env` inside `backend/` (and optionally in root for frontend):

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection String (Atlas or local)
# If left empty during development, an embedded in-memory database will boot automatically!
MONGODB_URI=

# JWT Secret for Admin Authentication (32+ characters)
JWT_SECRET=super_secret_jwt_key_change_in_production_min_32_chars
JWT_EXPIRES_IN=7d

# Initial Admin Credentials (seeded automatically on first run)
ADMIN_NAME=Niraj Dhore
ADMIN_EMAIL=dhoreniraj83@gmail.com
ADMIN_PASSWORD=NirajAdminSecurePass2026!

# Allowed CORS Origins (comma-separated)
CORS_ORIGIN=http://localhost:5173,http://127.0.0.1:5173,https://www.nirajdhore.dev

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

Frontend `.env`:
```bash
VITE_API_URL=http://localhost:5000/api
```

---

## 5. Getting Started (Running Locally)

### Prerequisites
- Node.js >= 20
- npm >= 10

### Step 1: Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

### Step 2: Start the Backend Service
```bash
npm run backend:dev
# Or build & start:
# npm run backend:build && npm run backend:start
```
The backend starts at `http://localhost:5000` and automatically connects to MongoDB (or starts the embedded instance and seeds it with genuine Niraj Dhore data).

### Step 3: Start the Frontend Application
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 6. Admin Panel & Authentication

The portfolio features a secure, hidden administrative dashboard:

1. **Accessing the Admin Console**:
   - Navigate to `http://localhost:5173/#admin` (or type `admin` in the virtual terminal).
2. **Logging In**:
   - Email: `dhoreniraj83@gmail.com`
   - Password: `NirajAdminSecurePass2026!` (configured in `.env`)
3. **Capabilities**:
   - **Overview**: View system metrics, total messages, unread count, and connection health.
   - **Projects**: Add, update, and delete projects (changes reflect immediately on the Portfolio page).
   - **Messages**: View inquiries submitted through the contact form, toggle Read/Unread status, or delete entries.
4. **Security**:
   - Passwords hashed with `bcryptjs` (salt rounds: 10).
   - Authenticated requests verified via JWT bearer tokens.
   - Login rate-limiting (10 attempts per 15 minutes).
   - Public view never exposes admin controls.

---

## 7. API Endpoints Reference

### Public Endpoints (`/api`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service uptime and health status |
| `GET` | `/api/projects` | List all projects (supports `?category=` and `?status=`) |
| `GET` | `/api/projects/:slug` | Retrieve single project by unique slug |
| `GET` | `/api/experience` | List leadership & professional experience |
| `GET` | `/api/education` | List education records (B.Tech IT, etc.) |
| `GET` | `/api/achievements` | List hackathons, achievements & badges |
| `GET` | `/api/skills` | List technical competencies & categories |
| `GET` | `/api/social-links` | List external profiles (GitHub, LinkedIn, KALA) |
| `GET` | `/api/site-settings` | Retrieve public profile bio & metadata |
| `GET` | `/api/search?q=` | Multi-collection search across projects, skills, etc. |
| `POST` | `/api/contact` | Submit inquiry (rate-limited, validated with Zod) |

### Protected Admin Endpoints (`/api/admin`)
*All admin endpoints require `Authorization: Bearer <token>`.*

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/login` | Authenticate and obtain JWT token |
| `GET` | `/api/admin/stats` | Dashboard statistics & unread message count |
| `GET` | `/api/admin/projects` | List all projects for editing |
| `POST` | `/api/admin/projects` | Create a new project |
| `PUT` | `/api/admin/projects/:id` | Update project fields |
| `DELETE`| `/api/admin/projects/:id` | Delete project |
| `GET` | `/api/admin/messages` | List all contact form inquiries |
| `PATCH`| `/api/admin/messages/:id` | Toggle message status (`read` / `unread`) |
| `DELETE`| `/api/admin/messages/:id`| Remove message |
| `GET` | `/api/admin/settings` | Get site settings |
| `PUT` | `/api/admin/settings` | Update site settings |

---

## 8. Automated Test Suite

A standalone test script tests all public and protected APIs, including input validation failures and unauthorized rejections:

```bash
node backend/src/utils/testApi.cjs
```

---

## 9. Production Deployment

### Frontend (Vercel)
1. Import repository to Vercel.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set environment variable: `VITE_API_URL=https://your-backend-api.onrender.com/api`

### Backend (Render)
1. Deploy as a Web Service on Render (Root Directory: `backend`).
2. Build command: `npm install && npm run build`
3. Start command: `node dist/server.js`
4. Environment variables:
   - `NODE_ENV=production`
   - `PORT=10000`
   - `MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio`
   - `JWT_SECRET=<secure_random_string>`
   - `CORS_ORIGIN=https://www.nirajdhore.dev,https://nirajdhore.vercel.app`
