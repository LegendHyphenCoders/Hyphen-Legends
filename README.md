# HL Stack — Full-Stack Monorepo

A production-ready full-stack EdTech academy platform built with a decoupled architecture:
- **Frontend**: React + Vite SPA styled with a custom **Hand-Drawn Sketched Paper Design System** (Vanilla CSS, Kalam & Patrick Hand typography, organic wobbly radii, hard offset drop-shadows).
- **Backend**: Express 4 REST API with Mongoose, MongoDB Atlas, Nodemailer notification pipeline, and graceful fallback handling.
- **Deployments**: Independent zero-touch deployment setup — **Vercel** for Frontend, **Render** for Backend.

---

## 📂 Repository Layout

```text
hl-stack/
├── frontend/                  # Vite + React app (Vercel deployment)
│   ├── src/
│   │   ├── main.jsx, App.jsx
│   │   ├── config/ (site.js, api.js)
│   │   ├── data/ (courses.js, instructors.js, faqs.js)
│   │   ├── components/ (Navbar, Footer, Button, CourseCard, CourseGrid, FAQAccordion, AdmissionForm, WhatsAppCTA, ScrollToTop)
│   │   ├── pages/ (Home, Courses, CourseDetails, About, Contact, NotFound)
│   │   └── styles/ (global.css, components.css)
│   ├── index.html, package.json, vite.config.js, vercel.json, public/
│   ├── .env.example
├── backend/                   # Express 4 + MongoDB Atlas REST API (Render deployment)
│   ├── package.json, server.js, render.yaml
│   ├── config/ (db.js, mailer.js)
│   ├── models/ (Admission.js, Course.js, ContactMessage.js)
│   ├── controllers/ (admissionController.js, courseController.js, contactController.js)
│   ├── routes/ (admissionRoutes.js, courseRoutes.js, contactRoutes.js)
│   ├── middleware/ (errorHandler.js, validate.js)
│   ├── seed/ (seedCourses.js)
│   └── .env.example
├── .gitignore                 # Monorepo-level gitignore (protects envs & builds)
└── README.md                  # Comprehensive setup & deployment guide
```

---

## 🛠️ Step-by-Step Setup & Deployment Guide

Follow these exact numbered steps to set up the database, run both services locally, and deploy to production.

### Step 1: MongoDB Atlas Setup
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free shared cluster (e.g. M0 tier).
3. Under **Security → Database Access**, create a database user:
   - Example username: `i7am8sid6_db_user`
   - Example password: `<strong-password>`
   - Role: Read and write to any database.
4. Under **Security → Network Access**, add an IP Access List entry:
   - For cloud platforms (Render) and local dev: click **Allow Access from Anywhere** (`0.0.0.0/0`).
5. Under **Deployment → Database**, click **Connect → Drivers → Node.js** to copy your connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/hlstack?retryWrites=true&w=majority
   ```

---

### Step 2: Backend Local Setup
Navigate to `backend/` and install dependencies:
```bash
cd backend
npm install
```

Create your local `.env` file from the example:
```bash
cp .env.example .env
```

Edit `backend/.env` with your MongoDB connection string and settings:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/hlstack?retryWrites=true&w=majority
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
NOTIFY_EMAIL=admissions@hlstack.edu
```
*(SMTP variables can remain blank in development; emails will gracefully fall back to formatted console output without crashing.)*

Seed the 8 academy courses into MongoDB Atlas:
```bash
npm run seed
```

Start the backend development server:
```bash
npm run dev
```
Backend will start on `http://localhost:5000` with the health check live at `http://localhost:5000/api/health`.

---

### Step 3: Frontend Local Setup
Open a new terminal window, navigate to `frontend/`, and install dependencies:
```bash
cd frontend
npm install
```

Create your local `.env` file:
```bash
cp .env.example .env
```
Ensure `frontend/.env` contains:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. All API requests route to `http://localhost:5000` with automatic fallback to local dataset if the backend is paused.

---

### Step 4: Deploy Backend to Render
1. Push your repository to GitHub.
2. Go to the [Render Dashboard](https://dashboard.render.com/) and click **New + → Web Service**.
3. Connect your GitHub repository.
4. Fill in the service configuration:
   - **Name**: `hl-stack-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `MONGODB_URI`: `<your-mongodb-atlas-connection-string>`
   - `ALLOWED_ORIGINS`: `http://localhost:3000,http://localhost:5173` *(you will add your Vercel URL in Step 6)*
   - `NOTIFY_EMAIL`: `admissions@hlstack.edu`
   - *(Optional)* `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` if you want live transactional emails.
6. Click **Create Web Service**. Once deployed, copy your service URL (e.g. `https://hl-stack-backend.onrender.com`).

---

### Step 5: Deploy Frontend to Vercel
1. Go to the [Vercel Dashboard](https://vercel.com/) and click **Add New... → Project**.
2. Import your GitHub repository.
3. Configure the project:
   - **Root Directory**: Click *Edit* and select `frontend`.
   - **Framework Preset**: `Vite` (automatically detected).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://hl-stack-backend.onrender.com` *(your Render backend URL from Step 4)*
5. Click **Deploy**. Vercel will build the frontend with `vercel.json` SPA routing support.

---

### Step 6: Cross-Origin Handshake & Final Sync
1. Copy your newly generated Vercel production URL (e.g. `https://hl-stack.vercel.app`).
2. Return to your Render backend dashboard:
   - Go to **Environment** tab.
   - Update `ALLOWED_ORIGINS` to include your Vercel URL:
     ```text
     http://localhost:3000,http://localhost:5173,https://hl-stack.vercel.app
     ```
3. Save changes. Render will automatically reload the environment with CORS permissions enabled for your Vercel deployment.

---

## 🧪 Local API Verification Checklist

Run these `curl` commands in your terminal to verify all 5 endpoints:

### 1. Health Check (`GET /api/health`)
```bash
curl -X GET http://localhost:5000/api/health
```
**Expected Response:**
```json
{"status":"ok","db":"connected"}
```

### 2. List Courses with Filtering (`GET /api/courses`)
```bash
curl -X GET "http://localhost:5000/api/courses?category=Data%20%26%20AI&level=beginner"
```
**Expected Response:**
```json
{"success":true,"count":1,"data":[{"slug":"data-analytics","title":"Data Analytics & Visualization",...}]}
```

### 3. Get Course Details by Slug (`GET /api/courses/:slug`)
```bash
curl -X GET http://localhost:5000/api/courses/data-analytics
```
**Expected Response:**
```json
{"success":true,"data":{"slug":"data-analytics","title":"Data Analytics & Visualization","modules":[...],"capstone":{...}}}
```

### 4. Submit Admission Lead (`POST /api/admissions`)
```bash
curl -X POST http://localhost:5000/api/admissions \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Rahul Sharma",
    "email": "rahul@example.com",
    "phone": "9876543210",
    "courseSlug": "data-analytics",
    "currentStatus": "student",
    "preferredTiming": "evening",
    "message": "Interested in upcoming weekend batch and fee structure."
  }'
```
**Expected Response (HTTP 201):**
```json
{"success":true,"message":"Admission inquiry submitted successfully.","data":{"_id":"...","status":"new"}}
```

### 5. Submit General Contact Message (`POST /api/contact`)
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Priya Iyer",
    "email": "priya@example.com",
    "phone": "9876543211",
    "message": "Requesting corporate discount details for batch enrollment."
  }'
```
**Expected Response (HTTP 201):**
```json
{"success":true,"message":"Contact message sent successfully.","data":{"_id":"..."}}
```

---

## 🎨 Design System Integrity
- **Hand-Drawn Sketched Aesthetic**: Kalam & Patrick Hand fonts, warm paper `#fdfbf7`, soft pencil `#2d2d2d`, ballpoint blue `#2d5da1`, highlighter red `#ff4d4d`.
- **Pure Vanilla CSS**: Zero Tailwind, zero external UI component kits.
- **WhatsApp Integration**: Official Academy Channel [https://whatsapp.com/channel/0029VbDpAjNFMqrYPjEV2916](https://whatsapp.com/channel/0029VbDpAjNFMqrYPjEV2916).
