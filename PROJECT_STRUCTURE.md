# HL Stack — Full-Stack Project Architecture & Design System Guide

This document provides the complete architectural roadmap and design system guide for **HL Stack**, covering:
1. **Monorepo Directory Structure** (`frontend/` + `backend/`)
2. **Frontend Architecture & Components** (Vite, React Router, Hand-drawn Design System, Dark Mode, Intro Splash)
3. **Backend Architecture & API Specification** (Express 4, MongoDB Atlas, Nodemailer fallback, Controllers)
4. **Design System & CSS Tokens Guide** (Warm paper palette, dark sketchbook, wobbly borders, hard drop shadows)
5. **Development & Deployment Commands**

---

## 1. Monorepo Directory Structure

```text
Hyphen-Legends/
├── frontend/                            # 🎨 FRONTEND SERVICE (Vite + React SPA — Vercel)
│   ├── index.html                       # Anti-flash theme script, Kalam & Patrick Hand fonts, meta tags
│   ├── package.json                     # Frontend dependencies & build scripts ("name": "hl-stack")
│   ├── vite.config.js                   # Vite dev server configuration & API proxy
│   ├── vercel.json                      # Single-page application routing rewrites for Vercel
│   ├── .env.example                     # Environment template (VITE_API_URL)
│   │
│   ├── public/                          # Static public assets
│   │   ├── favicon.svg                  # Hand-drawn sketched graduation cap SVG
│   │   └── _redirects                   # SPA redirects for Netlify/static hosts
│   │
│   └── src/                             # Source code
│       ├── main.jsx                     # Application bootstrap, StrictMode, theme & CSS imports
│       ├── App.jsx                      # App root layout, SplashScreen mount, ScrollToTop, Routes
│       │
│       ├── config/                      # Configuration modules
│       │   ├── site.js                  # Centralized HL Stack brand copy, WhatsApp number, email addresses
│       │   └── api.js                   # Centralized API client & endpoint helpers with fallback
│       │
│       ├── data/                        # Structured content catalogs
│       │   ├── courses.js               # 8 IT programs, curriculum modules, capstone projects, tuition fees
│       │   ├── instructors.js           # Faculty mentor profiles and sample badges
│       │   └── faqs.js                  # Collapsible general academy FAQs
│       │
│       ├── components/                  # Reusable UI components
│       │   ├── SplashScreen.jsx         # Full-screen sketched intro splash animation with auto-dismiss
│       │   ├── Navbar.jsx               # Header with hand-drawn logo, nav links, theme toggle, mobile drawer
│       │   ├── Footer.jsx               # Sketched footer with transparency notice, social links & copyright
│       │   ├── Button.jsx               # Wobbly button with flat-press active state (supports to/href/button)
│       │   ├── CourseCard.jsx           # Sketched card with masking tape strip, modules count & draft fee badge
│       │   ├── CourseGrid.jsx           # Responsive 3-column course grid + empty state handling
│       │   ├── FAQAccordion.jsx         # Lined notepad accordion for curriculum modules & questions
│       │   ├── AdmissionForm.jsx        # Lead capture form with tape strip & MongoDB Atlas dispatch
│       │   ├── WhatsAppCTA.jsx          # WhatsApp channel CTA button, compact mode & floating badge
│       │   └── ScrollToTop.jsx          # Automatic window scroll reset on route changes
│       │
│       ├── pages/                       # Application pages
│       │   ├── Home.jsx                 # Hero, featured tracks, journey steps, faculty, FAQs, demo CTA
│       │   ├── Courses.jsx              # Full catalog with search, category pills, level filter, fee sort
│       │   ├── CourseDetails.jsx        # Detailed syllabus, module accordion, capstones, sticky post-it sidebar
│       │   ├── About.jsx                # Academic philosophy, pedagogy, pillars & transparency pledge
│       │   ├── Contact.jsx              # Admission lead form, general inquiry tab, campus info, WhatsApp card
│       │   └── NotFound.jsx             # Hand-drawn 404 sketchbook page with return home button
│       │
│       └── styles/                      # 🖌️ HAND-DRAWN DESIGN SYSTEM (Pure Vanilla CSS)
│           ├── global.css               # Paper canvas tokens, Kalam & Patrick Hand typography, wobbly radii, hard shadows
│           ├── themes.css               # Dark theme ("Midnight Sketchbook") tokens, CSS variables & component overrides
│           ├── components.css           # Component styles (Navbar, Cards, Forms, Post-its, Tape, Thumbtacks)
│           └── splash.css               # Intro splash screen keyframes, doodle floats, wobbly progress bar
│
├── backend/                             # 🚀 BACKEND SERVICE (Express 4 + MongoDB Atlas — Render)
│   ├── server.js                        # Express server entry point, CORS, MongoDB connect, routes, error handling
│   ├── package.json                     # Dependencies (express, mongoose, cors, dotenv, nodemailer)
│   ├── render.yaml                      # Render Blueprint web service configuration
│   ├── .env.example                     # Environment template (PORT, MONGODB_URI, ALLOWED_ORIGINS, SMTP)
│   │
│   ├── config/                          # Infrastructure configurations
│   │   ├── db.js                        # Mongoose connection with retry handling & lifecycle events
│   │   └── mailer.js                    # Nodemailer transport with dev console mock fallback
│   │
│   ├── models/                          # Mongoose document models
│   │   ├── Admission.js                 # Lead inquiry model (fullName, email, phone, courseSlug, status, timing)
│   │   ├── Course.js                    # Course model (slug, title, category, level, tuition, modules, outcomes)
│   │   └── ContactMessage.js            # General contact inquiry model (fullName, email, phone, message)
│   │
│   ├── controllers/                     # Business logic controllers
│   │   ├── admissionController.js       # Create admission lead & dispatch email notification
│   │   ├── courseController.js          # Fetch course catalog with filters & individual course by slug
│   │   └── contactController.js         # Save contact inquiry message & dispatch notification email
│   │
│   ├── routes/                          # REST API route definitions
│   │   ├── admissionRoutes.js           # POST /api/admissions, GET /api/admissions
│   │   ├── courseRoutes.js              # GET /api/courses, GET /api/courses/:slug
│   │   └── contactRoutes.js             # POST /api/contact
│   │
│   ├── middleware/                      # Middlewares
│   │   ├── errorHandler.js              # Centralized JSON error handling
│   │   └── validate.js                  # Joi/custom request body validation
│   │
│   └── seed/                            # Database seed scripts
│       └── seedCourses.js               # Seeds all 8 academy courses into MongoDB Atlas
│
├── .gitignore                           # Monorepo-level gitignore (protects envs, node_modules, builds)
├── PROJECT_STRUCTURE.md                 # Complete architectural roadmap & design guide
└── README.md                            # Setup guide, deployment instructions & curl verification
```

---

## 2. REST API Specification

| Endpoint | Method | Source Component | Request Payload / Params | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | Health Checks / Uptime | — | Service status and timestamp check |
| `/api/courses` | `GET` | `Courses.jsx` | `?category=...&level=...&search=...` | Returns filtered course catalog from MongoDB |
| `/api/courses/:slug` | `GET` | `CourseDetails.jsx` | URL parameter: `:slug` | Returns detailed syllabus, modules, and capstones |
| `/api/admissions` | `POST` | `AdmissionForm.jsx` | `{ fullName, email, phone, courseSlug, currentStatus, preferredTiming, message }` | Saves admission lead & dispatches notification email |
| `/api/admissions` | `GET` | Admin / Internal | — | Lists recent candidate applications |
| `/api/contact` | `POST` | `Contact.jsx` | `{ fullName, email, phone, message }` | Saves general inquiry & dispatches notification email |

---

## 3. Hand-Drawn Design System & CSS Guide

### A. Core Tokens (`frontend/src/styles/global.css` & `themes.css`)

- **Typography**:
  - Headings: `'Kalam', cursive, sans-serif` (wght 700) — felt-tip marker style.
  - Body: `'Patrick Hand', cursive, sans-serif` (wght 400) — legible handwritten notebook style.
- **Palette (Light Mode — Warm Paper Canvas)**:
  - Canvas: `#fdfbf7` (`--bg-primary`)
  - Secondary Paper: `#f6f1e8` (`--bg-secondary`)
  - Soft Pencil: `#2d2d2d` (`--fg-pencil`, `--text-primary`)
  - Red Marker Accent: `#ff4d4d` (`--color-accent`)
  - Blue Ballpoint: `#2d5da1` (`--color-secondary`)
  - Post-It Yellow: `#fff9c4` (`--bg-postit`)
- **Palette (Dark Mode — "Midnight Sketchbook")**:
  - Canvas: `#131110` (`--bg-primary`)
  - Secondary Paper: `#1c1917` (`--bg-secondary`)
  - White Chalk/Pencil: `#f0ede6` (`--fg-pencil`, `--text-primary`)
  - Neon Coral Accent: `#ff6b6b` (`--color-accent`)
  - Sky Ballpoint: `#6ea8ff` (`--color-secondary`)
  - Dark Post-It: `#2a2512` (`--bg-postit`)
- **Signature Visuals**:
  - **Wobbly Borders**: `--radius-wobbly: 255px 15px 225px 15px / 15px 225px 15px 255px`
  - **Hard Offset Shadows (Zero Blur)**: `--shadow-hard: 4px 4px 0px 0px var(--fg-pencil)`
  - **Tape Strips**: Semi-transparent masking tape rotated at `-2deg` atop cards.
  - **Intro Splash Screen**: Pure CSS keyframe animated wordmark draw, floating doodles, and wobbly progress bar (`frontend/src/styles/splash.css`).

---

## 4. Development & Deployment Commands

### Frontend (`frontend/`)
```bash
# Start local Vite dev server (http://localhost:3000)
npm run dev

# Production build test
npm run build

# Preview production build locally
npm run preview
```

### Backend (`backend/`)
```bash
# Install dependencies
npm install

# Seed course catalog into MongoDB Atlas
npm run seed

# Run backend with hot-reload (http://localhost:5000)
npm run dev

# Start production server
npm start
```
