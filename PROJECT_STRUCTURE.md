# SkillNova Academy — Full Project Architecture & Development Guide

This document provides the complete architectural roadmap for **SkillNova Academy**, covering:
1. **Full-Stack Project Structure** (Frontend + Proposed Backend)
2. **Backend Architecture Guide** (Endpoints, Schemas, Controllers, Proxy)
3. **CSS Customization Guide** (Design tokens, components, themes)
4. **Step-by-Step Setup Instructions**

---

## 1. Full-Stack Directory Structure

```text
Hyphen-Legends/
├── .env.example                         # Environment variables template
├── .gitignore                           # Git ignore rules (node_modules, dist, .env)
├── index.html                           # Single-page HTML entry point
├── package.json                         # Frontend dependencies & scripts
├── PROJECT_STRUCTURE.md                 # This architecture & development guide
├── README.md                            # High-level academy overview & deployment
├── vercel.json                          # Client-side routing rewrites for Vercel
├── vite.config.js                       # Vite dev server & API proxy config
│
├── public/                              # Static public assets
│   ├── favicon.svg
│   └── _redirects                       # SPA routing redirects for Netlify
│
├── src/                                 # 🎨 FRONTEND SOURCE CODE (Vite + React)
│   ├── main.jsx                         # App bootstrap & React Router provider
│   ├── App.jsx                          # Root routes & page layout wrapper
│   │
│   ├── config/
│   │   └── site.js                      # Centralized brand, phone, email & WhatsApp
│   │
│   ├── data/                            # Local mock & fallback data
│   │   ├── courses.js                   # 8 courses, modules, capstones, tuition
│   │   ├── instructors.js               # Faculty bios and sample badges
│   │   └── faqs.js                      # Collapsible FAQ items
│   │
│   ├── components/                      # Reusable UI Components
│   │   ├── Navbar.jsx                   # Sticky glassmorphic header & mobile drawer
│   │   ├── Footer.jsx                   # Academy footer & compliance notices
│   │   ├── Button.jsx                   # Polymorphic button (link, anchor, button)
│   │   ├── CourseCard.jsx               # Course card with tuition & WhatsApp CTA
│   │   ├── CourseGrid.jsx               # Responsive course grid + empty state
│   │   ├── FAQAccordion.jsx             # Accessible accordion for questions
│   │   ├── AdmissionForm.jsx            # Lead capture form with field validation
│   │   ├── WhatsAppCTA.jsx              # WhatsApp inquiry integration
│   │   └── ScrollToTop.jsx              # Automatic scroll reset on route change
│   │
│   ├── pages/                           # Application Pages
│   │   ├── Home.jsx                     # Hero, features, highlights, CTA
│   │   ├── Courses.jsx                  # Catalog with search, filters & sort
│   │   ├── CourseDetails.jsx            # Syllabus, modules, capstones, fees
│   │   ├── About.jsx                    # Mission, pedagogy & transparency
│   │   ├── Contact.jsx                  # Campus details & admission inquiry
│   │   └── NotFound.jsx                 # Custom 404 page
│   │
│   └── styles/                          # 🖌️ STYLES & DESIGN SYSTEM
│       ├── global.css                   # CSS tokens, color variables, typography
│       └── components.css               # Navbar, Hero, CourseCard, Form styles
│
└── server/                              # 🚀 RECOMMENDED BACKEND (Node.js + Express)
    ├── package.json                     # Backend dependencies
    ├── .env                             # Environment secrets (PORT, DB_URI, SMTP, etc.)
    ├── server.js                        # Express server entry point
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

## 3. CSS Customization Guide

The styles use **Vanilla CSS** with a design token system.

### A. Global Design Tokens: `src/styles/global.css`
Contains design variables declared inside `:root`.

#### 1. Color Palette Customization
```css
:root {
  /* Dark Canvas Colors */
  --bg-primary: #0a0e17;           /* Main page background */
  --bg-secondary: #0f172a;         /* Section alternating background */
  --bg-surface: #141e33;           /* Cards and modal backgrounds */
  --bg-surface-elevated: #1a2744;  /* Hovered cards / dropdowns */

  /* Brand Accents */
  --primary-500: #6366f1;          /* Indigo brand primary */
  --primary-600: #4f46e5;          /* Hover state */
  --cyan-400: #38bdf8;             /* Cyan highlight */
  --violet-400: #c084fc;           /* Violet accent */
  --whatsapp-green: #25d366;       /* WhatsApp button */

  /* Text Colors */
  --text-primary: #f8fafc;         /* Headings and prominent text */
  --text-secondary: #cbd5e1;       /* Body copy */
  --text-muted: #94a3b8;           /* Subtitles and metadata */
}
```

#### 2. Typography Customization
```css
:root {
  --font-heading: 'Outfit', -apple-system, sans-serif;
  --font-body: 'Inter', -apple-system, sans-serif;
}
```
*To use different fonts, update the `<link>` in `index.html` and change these two variables.*

#### 3. Shadows and Glow Effects
```css
:root {
  --shadow-glow: 0 0 25px -5px rgba(99, 102, 241, 0.3);
  --shadow-glow-cyan: 0 0 25px -5px rgba(56, 189, 248, 0.25);
  --radius-lg: 1rem;
  --radius-xl: 1.25rem;
}
```

---

### B. Component Styling: `src/styles/components.css`

Find the relevant CSS class for each UI element:

| Element | CSS Classes | Purpose |
| :--- | :--- | :--- |
| **Navbar** | `.navbar`, `.nav-container`, `.nav-links`, `.nav-link` | Fixed blur header, navigation layout |
| **Mobile Drawer**| `.mobile-menu`, `.mobile-nav-link` | Slide-down mobile menu |
| **Buttons** | `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-whatsapp` | Button sizes, hover gradients, icons |
| **Course Cards** | `.course-card`, `.course-card-header`, `.course-price-badge` | Card grid items, badge styling, lifts |
| **Filters** | `.search-input`, `.filter-pill`, `.sort-select` | Catalog search bar, category pills |
| **Accordions** | `.accordion-item`, `.accordion-header`, `.accordion-body` | Syllabus & FAQ collapsible panels |
| **Admission Form**| `.admission-form`, `.form-group`, `.form-input`, `.error-message` | Inputs, dropdowns, validations |
| **Footer** | `.footer`, `.footer-grid`, `.footer-col`, `.footer-bottom` | Columns, copyright, and honesty note |

---

## 4. Useful Development Commands

```bash
# Run Frontend (Vite)
npm run dev

# Build Frontend for Production
npm run build

# Preview Production Build
npm run preview
```
