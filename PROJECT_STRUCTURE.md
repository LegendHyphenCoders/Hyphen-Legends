# HL Stack — Full-Stack Project Architecture & Design System Guide

This document provides the complete architectural roadmap for **HL Stack**, covering:
1. **Full-Stack Project Structure** (Frontend + Proposed Backend)
2. **Backend Architecture Guide** (Endpoints, Schemas, Controllers, Proxy)
3. **Hand-Drawn Design System & CSS Guide** (Warm paper tokens, wobbly borders, hard shadows, components)
4. **Step-by-Step Setup Instructions & Commands**

---

## 1. Full-Stack Directory Structure

```text
Hyphen-Legends/
├── .env.example                         # Environment variables template
├── .gitignore                           # Git ignore rules (node_modules, dist, .env)
├── index.html                           # Single-page HTML entry point (Kalam & Patrick Hand fonts)
├── package.json                         # Frontend dependencies & scripts
├── PROJECT_STRUCTURE.md                 # This architecture & design guide
├── README.md                            # High-level academy overview & deployment guide
├── vercel.json                          # Client-side routing rewrites for Vercel
├── vite.config.js                       # Vite dev server & API proxy config
│
├── public/                              # Static public assets
│   ├── favicon.svg                      # Sketched graduation cap SVG icon
│   └── _redirects                       # SPA routing redirects for Netlify
│
├── src/                                 # 🎨 FRONTEND SOURCE CODE (Vite + React)
│   ├── main.jsx                         # App bootstrap & React Router provider
│   ├── App.jsx                          # Root routes & page layout wrapper
│   │
│   ├── config/
│   │   └── site.js                      # Centralized brand, phone, email & WhatsApp config
│   │
│   ├── data/                            # Local structured data & curriculum
│   │   ├── courses.js                   # 8 courses, modules, capstones, tuition
│   │   ├── instructors.js               # Faculty bios and sample badges
│   │   └── faqs.js                      # Collapsible FAQ items
│   │
│   ├── components/                      # Reusable UI Components
│   │   ├── Navbar.jsx                   # Sticky paper header with 3px pencil border & wavy links
│   │   ├── Footer.jsx                   # Notepad footer with dashed borders & compliance notes
│   │   ├── Button.jsx                   # Wobbly hand-drawn button with flat-press active state
│   │   ├── CourseCard.jsx               # Sketched card with masking tape strip & draft fee badge
│   │   ├── CourseGrid.jsx               # Responsive course grid + empty state handling
│   │   ├── FAQAccordion.jsx             # Lined notepad accordion for questions & syllabus
│   │   ├── AdmissionForm.jsx            # Lead capture form with tape strip & validation
│   │   ├── WhatsAppCTA.jsx              # Hand-drawn WhatsApp integration with fallback modal
│   │   └── ScrollToTop.jsx              # Automatic scroll reset on route change
│   │
│   ├── pages/                           # Application Pages
│   │   ├── Home.jsx                     # Hero, featured tracks, journey, faculty, FAQs, CTA
│   │   ├── Courses.jsx                  # Catalog with live search, filters & sort
│   │   ├── CourseDetails.jsx            # Syllabus, modules, capstones, sticky post-it sidebar
│   │   ├── About.jsx                    # Mission, pedagogy, pillars & transparency pledge
│   │   ├── Contact.jsx                  # Admission form, campus details, WhatsApp card
│   │   └── NotFound.jsx                 # Custom 404 sketchbook page
│   │
│   └── styles/                          # 🖌️ HAND-DRAWN DESIGN SYSTEM (Vanilla CSS)
│       ├── global.css                   # Paper palette, Kalam & Patrick Hand tokens, wobbly radii, hard shadows
│       └── components.css               # Navbar, Hero, CourseCard, Form, Tape, and Post-It styles
│
└── server/                              # 🚀 RECOMMENDED BACKEND (Node.js + Express)
    ├── package.json                     # Backend dependencies (express, cors, dotenv, etc.)
    ├── .env                             # Environment secrets (PORT, DB_URI, SMTP, etc.)
    ├── server.js                        # Express server entry point & HTTP listener
    │
    ├── config/
    │   ├── db.js                        # Database connection (MongoDB / PostgreSQL)
    │   └── mailer.js                    # Email transport (Nodemailer / Resend)
    │
    ├── models/                          # Database Schemas / Models
    │   ├── Admission.js                 # Inquiries from AdmissionForm.jsx
    │   ├── Course.js                    # Course curriculum, pricing, batches
    │   └── ContactMessage.js            # General contact form messages
    │
    ├── controllers/                     # Request Business Logic
    │   ├── admissionController.js       # Validate & save admission leads
    │   ├── courseController.js          # Fetch catalog & course details
    │   └── contactController.js         # Handle contact inquiries
    │
    ├── routes/                          # REST API Endpoints
    │   ├── admissionRoutes.js           # /api/admissions
    │   ├── courseRoutes.js              # /api/courses
    │   └── contactRoutes.js             # /api/contact
    │
    └── middleware/                      # Middlewares
        ├── errorHandler.js              # Global error handler
        └── validate.js                  # Request body validator
```

---

## 2. Backend Design & REST API Specification

### A. Endpoints Needed by Frontend

| Endpoint | Method | Source Component | Payload | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/api/admissions` | `POST` | `AdmissionForm.jsx` | `{ fullName, email, phone, courseSlug, currentStatus, preferredTiming, message }` | Saves student lead and sends email notification |
| `/api/courses` | `GET` | `Courses.jsx` | Query params: `?category=...&level=...&search=...` | Returns list of courses for the catalog |
| `/api/courses/:slug` | `GET` | `CourseDetails.jsx` | URL param: `slug` | Returns full course curriculum, modules, capstone |
| `/api/contact` | `POST` | `Contact.jsx` | `{ fullName, email, phone, message }` | General enquiry from contact page |

---

### B. Sample Backend Setup (Express.js)

#### 1. Initialize `server/` directory
```bash
mkdir server
cd server
npm init -y
npm install express cors dotenv mongoose nodemailer
npm install --save-dev nodemon
```

#### 2. `server/server.js`
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import admissionRoutes from './routes/admissionRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/api/admissions', admissionRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/contact', contactRoutes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

#### 3. Connecting Frontend to Backend in `vite.config.js`
To avoid CORS issues during development, configure the Vite dev server proxy:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

With this proxy, any frontend call to `fetch('/api/admissions')` is automatically forwarded to `http://localhost:5000/api/admissions`.

---

## 3. Hand-Drawn Design System & CSS Guide

The project implements an authentic **Hand-Drawn & Sketched Paper Design System** using native **Vanilla CSS** with zero extra library bundle overhead.

### A. Design Tokens: `src/styles/global.css`

#### 1. Color Palette (Single Warm Paper Palette)
```css
:root {
  /* Paper Canvases */
  --bg-primary: #fdfbf7;           /* Warm Paper Canvas */
  --bg-secondary: #f6f1e8;         /* Notepad Paper Alternate */
  --bg-surface: #ffffff;           /* Clean Paper Card */
  --bg-muted: #e5e0d8;             /* Old Paper / Erased Pencil */
  --bg-postit: #fff9c4;            /* Post-it Yellow */
  --bg-postit-tape: rgba(229, 224, 216, 0.85); /* Masking Tape */

  /* Pencil & Ink Foregrounds */
  --fg-pencil: #2d2d2d;            /* Soft Pencil Black (never pure #000) */
  --text-primary: #2d2d2d;         /* Primary Pencil Text */
  --text-secondary: #4a4a4a;       /* Secondary Pencil Notes */
  --text-muted: #737373;           /* Light Pencil Scribble */

  /* Marker & Pen Accents */
  --color-accent: #ff4d4d;          /* Red Correction Marker */
  --color-secondary: #2d5da1;       /* Blue Ballpoint Pen */
  --color-whatsapp: #25d366;        /* WhatsApp Marker Green */
  --color-emerald: #15803d;         /* Green Pen */
}
```

#### 2. Typography
```css
:root {
  --font-heading: 'Kalam', cursive, sans-serif;       /* Felt-tip marker headings (wght 700) */
  --font-body: 'Patrick Hand', cursive, sans-serif;    /* Legible handwritten body copy (wght 400) */
}
```

#### 3. Organic Wobbly Borders (No Straight Lines)
```css
:root {
  --radius-wobbly: 255px 15px 225px 15px / 15px 225px 15px 255px;
  --radius-wobbly-md: 20px 255px 15px 225px / 225px 15px 255px 15px;
  --radius-wobbly-sm: 10px 180px 8px 190px / 190px 10px 180px 12px;
  --radius-wobbly-badge: 15px 225px 15px 255px / 255px 15px 225px 15px;
  --radius-wobbly-circle: 50% 55% 45% 52% / 53% 47% 53% 48%;
}
```

#### 4. Hard Offset Box Shadows (Zero Blur)
```css
:root {
  --shadow-hard-xs: 2px 2px 0px 0px var(--fg-pencil);
  --shadow-hard: 4px 4px 0px 0px var(--fg-pencil);
  --shadow-hard-lg: 8px 8px 0px 0px var(--fg-pencil);
}
```

---

### B. Component Styling & Visual Signatures: `src/styles/components.css`

| Visual Element | CSS Selector | Description & Behavior |
| :--- | :--- | :--- |
| **Masking Tape** | `.tape-strip` | Translucent masking tape strip pinned at the top center of cards (`rotate(-2deg)`) |
| **Thumbtack** | `.thumbtack` | Red circular thumbtack with pencil lead border pinned at the top of cards |
| **Post-It Cards** | `.postit-card` | Post-it yellow background `#fff9c4` with `-1.5deg` tilt and hard shadow |
| **Buttons** | `.btn`, `.btn-primary` | Wobbly oval with 3px pencil border; hovers to marker red `#ff4d4d`; active click presses flat |
| **Navigation** | `.site-header`, `.nav-link` | Sticky paper header with 3px pencil border; wavy red marker link underlines |
| **Course Cards** | `.course-card` | White paper card with tape strip; alternating organic tilts (`-1deg` and `1deg`) |
| **Filters** | `.filter-pill` | Sketched pill buttons; active selection turns into red marker pill with 2px translate |
| **Accordions** | `.faq-card`, `.module-accordion-item` | Lined paper panels; expanded question highlights in post-it yellow |
| **Admission Form**| `.form-card`, `.form-input` | Notepad form with tape strip; input focus switches to blue ballpoint pen ring |

---

## 4. Useful Development Commands

```bash
# Start Vite Development Server (http://localhost:3000)
npm run dev

# Run Production Build Test
npm run build

# Preview Production Build Locally
npm run preview
```
