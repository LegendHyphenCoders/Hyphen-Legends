# SkillNova Academy — Premium Online IT Training Platform

A modern, responsive, conversion-focused EdTech website built with **React** + **Vite**, **React Router v6**, and an authentic **Hand-Drawn & Sketched Paper Design System** (Vanilla CSS).

Designed for an IT training academy offering live online classes, practical lab assignments, real-world capstone projects, daily doubt-solving support, and technical interview preparation.

---

## 🌟 Key Features

1. **Centralized Configuration & Course Data**:
   - Brand name, contact details, social links, and WhatsApp number managed in `src/config/site.js`.
   - All 8 comprehensive courses, proposed draft fees, modules, and learning outcomes in `src/data/courses.js`.
2. **Hand-Drawn Sketched Design System**:
   - Authentic warm paper canvas (`#fdfbf7`) with subtle notebook paper grain.
   - Handwritten typography with **Kalam** (marker headings) and **Patrick Hand** (body copy).
   - Organic wobbly border-radii (`border-radius: 255px 15px 225px 15px...`) and hard offset shadows.
   - Physical paper flourishes: masking tape strips, red thumbtacks, sticky post-it notes, and wavy link underlines.
3. **Interactive Catalog & Filters**:
   - Real-time search by course title and description.
   - Category filtering pills (*Data & AI*, *Software Engineering*, *Business & Finance*, etc.).
   - Skill-level filtering (*Beginner*, *Intermediate*, *Advanced*).
   - Dynamic sorting by tuition fee or duration.
   - Accessible empty states with one-click filter reset.
4. **Reusable Course Details Template**:
   - Deep-dive pages (`/courses/:slug`) with modular curriculum accordions.
   - Real-world capstone projects with technology stack tags.
   - Transparent proposed tuition pricing and batch schedules.
   - Direct enquiry button preserving the chosen course in admissions forms.
   - Graceful 404 state for invalid slugs.
5. **Accessible Admission & Contact Form**:
   - Full client validation (Name, Email format, 10-digit Phone, Course selection, Consent).
   - Clear error states, loading feedback, and demo mode transparency notice.
   - Direct WhatsApp forwarding button populated with candidate details.
6. **Integrated WhatsApp Experience**:
   - Context-aware WhatsApp enquiry component prefilling specific course names.
   - Persistent floating WhatsApp contact widget on all pages.
   - Graceful fallback modal with configuration instructions if no business number is set.
7. **Academic Transparency & Credibility**:
   - Zero fabricated reviews, fake countdown timers, or artificial scarcity.
   - Clearly marked sample instructor profiles until official onboarding is complete.
   - Honest notice explaining that student case studies will be published as cohorts graduate.

---

## 📂 Project Structure

```text
├── index.html                   # HTML entry point with Google Fonts (Kalam & Patrick Hand)
├── vite.config.js               # Vite configuration with React plugin
├── package.json                 # Project scripts and dependencies
├── PROJECT_STRUCTURE.md         # Full-stack backend architecture & CSS design guide
├── .gitignore                   # Standard Git ignore rules
└── src/
    ├── config/
    │   └── site.js              # Centralized brand, contact, WhatsApp, and social links
    ├── data/
    │   ├── courses.js           # 8 courses, draft fees, durations, modules, and capstones
    │   ├── instructors.js       # Reusable instructor profiles with sample badges
    │   └── faqs.js              # General academy frequently asked questions
    ├── styles/
    │   ├── global.css           # Paper palette, Kalam & Patrick Hand tokens, wobbly radii
    │   └── components.css       # Sketched cards, tape strips, post-its, and forms
    ├── components/
    │   ├── Navbar.jsx           # Sticky paper header with 3px pencil border & wavy links
    │   ├── Footer.jsx           # Notepad footer with dashed borders & honesty notices
    │   ├── CourseCard.jsx       # Sketched card with masking tape strip & draft fee
    │   ├── CourseGrid.jsx       # Responsive grid with empty-state handling
    │   ├── Button.jsx           # Wobbly polymorphic button with flat-press click state
    │   ├── WhatsAppCTA.jsx      # Prefilled WhatsApp messaging with fallback guide
    │   ├── AdmissionForm.jsx    # Accessible form with validation & demo feedback
    │   ├── FAQAccordion.jsx     # Accessible collapsible FAQ component
    │   └── ScrollToTop.jsx      # Automatic window scroll reset on route change
    ├── pages/
    │   ├── Home.jsx             # Hero, Featured Courses, Pillars, Journey, Faculty, FAQs
    │   ├── Courses.jsx          # Searchable & filterable course catalog
    │   ├── CourseDetails.jsx    # Curriculum, capstones, pricing sidebar, enquiry CTA
    │   ├── About.jsx            # Mission, pedagogy, pillars, and honesty pledge
    │   ├── Contact.jsx          # Admission form, academy office details, and WhatsApp
    │   └── NotFound.jsx         # Custom 404 page with quick navigation
    ├── App.jsx                  # Main routing and layout wrapper
    └── main.jsx                 # App bootstrap with React Router
```

---

## 🚀 Running Locally

### 1. Prerequisites
Ensure you have **Node.js 18+** installed. Check via:
```bash
node -v
npm -v
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The site will run at `http://localhost:3000/`.

### 4. Create Production Build
```bash
npm run build
```
Build output is generated into the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🚢 Deploying to Vercel or Netlify

### Deploying to Vercel
1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository (`Hyphen-Legends`).
4. Vercel automatically detects **Vite**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**.

*Note for client-side routing on Vercel:* If you encounter 404s when refreshing subpaths like `/courses/data-analytics`, create a `vercel.json` file in the root directory:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Deploying to Netlify
1. Sign in to [Netlify](https://netlify.com) and click **"Add new site" > "Import an existing project"**.
2. Connect your GitHub repository.
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy Site**.

*Note for client-side routing on Netlify:* Create a `public/_redirects` file with the following line:
```text
/*    /index.html   200
```

---

## ⚙️ Configuration Checklist (Next Steps)

To customize the website for your real production launch, update these files:

1. **WhatsApp Business Number**:
   - Open `src/config/site.js`
   - Set `siteConfig.whatsapp.number` to your international mobile number without spaces or symbols (e.g. `"919876543210"` for India).
   - Set `siteConfig.whatsapp.isConfigured: true`.

2. **Official Contact Information**:
   - Open `src/config/site.js`
   - Update `email`, `supportEmail`, `phone`, and campus address.

3. **Social Media Links**:
   - Open `src/config/site.js`
   - Update `socialLinks` with your academy's handles (LinkedIn, GitHub, X/Twitter, YouTube, Instagram).

4. **Connecting a Live Form Backend**:
   - Open `src/components/AdmissionForm.jsx`.
   - In `handleSubmit`, replace the mock timeout with your preferred endpoint or webhook (e.g., [Formspree](https://formspree.io), [EmailJS](https://www.emailjs.com), or your private REST API):
     ```javascript
     const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(formData),
     });
     ```

5. **Course Tuition & Syllabus Customization**:
   - Open `src/data/courses.js` to modify course titles, draft fees, duration, module outlines, or prerequisites.
