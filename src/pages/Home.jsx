import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Video,
  Code2,
  FolderKanban,
  HelpCircle,
  Briefcase,
  Users,
  Compass,
  CheckCircle,
  Terminal,
  ShieldCheck,
  ChevronRight,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "../config/site";
import { courses } from "../data/courses";
import { instructors } from "../data/instructors";
import { generalFaqs } from "../data/faqs";
import CourseCard from "../components/CourseCard";
import Button from "../components/Button";
import FAQAccordion from "../components/FAQAccordion";
import WhatsAppCTA from "../components/WhatsAppCTA";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Data & AI", "Software Engineering", "Business & Finance"];

  const filteredCourses = activeCategory === "All"
    ? courses
    : courses.filter((c) => {
        if (activeCategory === "Business & Finance") {
          return c.category === "Finance & Accounting" || c.category === "Data & Business";
        }
        return c.category === activeCategory;
      });

  const journeySteps = [
    {
      num: "01",
      title: "Learn Live",
      desc: "Attend interactive online lectures led by working engineers. Grasp core mental models through screen-shared live code.",
      icon: Video,
    },
    {
      num: "02",
      title: "Practice Weekly",
      desc: "Solve rigorous assignment problem sets. Get constructive code reviews and clear your doubts in daily mentor rooms.",
      icon: Terminal,
    },
    {
      num: "03",
      title: "Build Real Projects",
      desc: "Construct end-to-end full stack web applications or production data models on authentic messy datasets.",
      icon: FolderKanban,
    },
    {
      num: "04",
      title: "Prepare & Launch",
      desc: "Optimize your resume, prepare GitHub portfolios, simulate technical mock interviews, and apply with conviction.",
      icon: Briefcase,
    },
  ];

  const whyChooseUsPillars = [
    {
      icon: Video,
      title: "Live Instructor-Led Classes",
      desc: "Real-time interactive lectures, not static pre-recorded videos. Speak with mentors and resolve questions immediately during class.",
      badge: "Real-Time Interaction",
    },
    {
      icon: Code2,
      title: "Practical, Hands-on Labs",
      desc: "Spend 70% of your time writing real code, configuring relational databases, and debugging complex real-world logic.",
      badge: "Zero Fluff",
    },
    {
      icon: FolderKanban,
      title: "Production-Grade Projects",
      desc: "Work on capstone architectures built from empty folders. Push clean code to GitHub that proves your actual capabilities.",
      badge: "Portfolio Ready",
    },
    {
      icon: HelpCircle,
      title: "Dedicated Doubt-Solving",
      desc: "Never get stuck on an error for hours. Join daily evening doubt rooms and reach out to dedicated teaching assistants.",
      badge: "Daily Doubt Rooms",
    },
    {
      icon: Briefcase,
      title: "Career & Interview Prep",
      desc: "Systematic resume refinement, live mock interview drills, DSA fundamentals, and project storytelling strategy.",
      badge: "Job Ready Skills",
    },
    {
      icon: ShieldCheck,
      title: "100% Honest Transparency",
      desc: "Upfront proposed fees, realistic course durations, and zero deceptive countdown timers or false claims.",
      badge: "Credible Education",
    },
  ];

  return (
    <div className="home-page">
      {/* =================================================================
          A & B. HERO SECTION
         ================================================================= */}
      <section className="hero-section section" style={{ paddingTop: "4.5rem", paddingBottom: "5.5rem" }}>
        <div className="container">
          <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
            {/* Live Cohort Badge */}
            <div className="section-tag">
              <span className="pulse-dot"></span>
              <span>Live Online IT Training &bull; Upcoming Batches Open</span>
            </div>

            {/* Headline */}
            <h1 style={{ marginBottom: "1.5rem" }}>
              Build Real Skills. <br />
              <span className="wavy-underline" style={{ color: "var(--color-accent)" }}>
                Create Your Future.
              </span>
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: "1.2rem",
                color: "var(--text-secondary)",
                lineHeight: "1.7",
                marginBottom: "2.5rem",
                maxWidth: "720px",
                marginInline: "auto",
              }}
            >
              Learn practical technology skills through live online classes, hands-on projects,
              and mentor-led guidance. Zero fluff—only the tools and frameworks modern companies actually hire for.
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                justifyContent: "center",
                marginBottom: "3rem",
              }}
            >
              <Button to="/courses" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Explore Courses
              </Button>
              <Button to="/contact" variant="secondary" size="lg" icon={Calendar}>
                Book a Free Demo
              </Button>
              <WhatsAppCTA variant="button" className="btn-lg" label="Chat on WhatsApp" />
            </div>

            {/* Trust Highlights */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1.75rem",
                paddingTop: "1.75rem",
                borderTop: "1px solid var(--border-subtle)",
                fontSize: "0.875rem",
                color: "var(--text-muted)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle size={16} className="text-emerald-400" />
                <span>100% Live Instructor-Led Classes</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle size={16} className="text-emerald-400" />
                <span>Real Capstone Projects</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle size={16} className="text-emerald-400" />
                <span>Daily Mentor Doubt Support</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle size={16} className="text-emerald-400" />
                <span>Transparent Proposed Fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          C. FEATURED COURSES SECTION
         ================================================================= */}
      <section className="section" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Sparkles size={14} /> Comprehensive Programs
            </span>
            <h2>Our Featured IT Career Tracks</h2>
            <p>
              Industry-aligned curriculums designed to take you from foundational understanding to
              production deployment.
            </p>

            {/* Quick Category Tabs */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "1.75rem",
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === "All" ? "All Featured Courses" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Catalog CTA */}
          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Button to="/courses" variant="outline" size="lg" icon={ArrowRight} iconPosition="right">
              View Detailed Curriculum &amp; All 8 Courses
            </Button>
          </div>
        </div>
      </section>

      {/* =================================================================
          D. WHY CHOOSE US?
         ================================================================= */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Educational Pillars</span>
            <h2>Why Choose {siteConfig.name}?</h2>
            <p>
              We focus squarely on what builds true engineering competence: deliberate coding practice,
              guided feedback, and personal accountability.
            </p>
          </div>

          <div className="grid-3">
            {whyChooseUsPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: "2rem",
                    transform: idx % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)",
                  }}
                >
                  <div className="thumbtack" aria-hidden="true" />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div className="journey-step-icon" style={{ margin: 0 }}>
                      <IconComp size={24} />
                    </div>
                    <span className="badge badge-indigo">{pillar.badge}</span>
                  </div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.6rem" }}>{pillar.title}</h3>
                  <p style={{ fontSize: "0.925rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          E. LEARNING JOURNEY
         ================================================================= */}
      <section className="section" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Methodology That Works</span>
            <h2>Your Proven Learning Journey</h2>
            <p>
              A structured four-phase progression that turns beginners and graduates into confident practitioners.
            </p>
          </div>

          <div className="journey-grid">
            {journeySteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.num} className="journey-step-card">
                  <span className="journey-step-number">{step.num}</span>
                  <div className="journey-step-icon">
                    <StepIcon size={24} />
                  </div>
                  <h3 className="journey-step-title">{step.title}</h3>
                  <p className="journey-step-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          F. INSTRUCTOR SECTION
         ================================================================= */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Users size={14} /> Teaching Faculty
            </span>
            <h2>Learn From Experienced Practitioners</h2>
            <p>
              Classes are guided by instructors who bring real-world software architecture and data analytics experience.
            </p>
          </div>

          <div className="grid-4">
            {instructors.map((inst) => (
              <div key={inst.id} className="instructor-card">
                <span className="sample-badge">Sample Profile</span>
                <div className="instructor-header">
                  <div className="instructor-avatar">{inst.avatarPlaceholder}</div>
                  <div className="instructor-info">
                    <h4>{inst.name}</h4>
                    <span className="instructor-role">{inst.role}</span>
                  </div>
                </div>
                <p className="instructor-bio">{inst.bio}</p>
                <div className="instructor-domain-tag">
                  <strong>Domain:</strong> {inst.domain}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "2rem",
              textAlign: "center",
              fontSize: "0.85rem",
              color: "var(--text-dim)",
            }}
          >
            <em>
              Note: The above instructor cards display sample mentor profiles. Genuine instructor biographies will be added as new faculty join cohorts.
            </em>
          </div>
        </div>
      </section>

      {/* =================================================================
          G. STUDENT TESTIMONIALS (HONEST PLACEHOLDER)
         ================================================================= */}
      <section className="section" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container container-narrow" style={{ textAlign: "center" }}>
          <div className="section-header" style={{ marginBottom: "2rem" }}>
            <span className="section-tag">Student Community</span>
            <h2>Real Cohorts &amp; Graduate Stories</h2>
            <p>
              We believe in 100% honesty. We never invent fake reviews, stock student photos, or fabricated placement statistics.
            </p>
          </div>

          <div className="glass-card" style={{ padding: "3rem 2rem", borderStyle: "dashed" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(99, 102, 241, 0.12)",
                color: "var(--primary-400)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem auto",
              }}
            >
              <Compass size={28} />
            </div>
            <h3 style={{ fontSize: "1.35rem", marginBottom: "0.75rem" }}>
              Initial Cohorts Currently In Session
            </h3>
            <p style={{ maxWidth: "560px", margin: "0 auto 1.75rem auto", color: "var(--text-muted)" }}>
              {siteConfig.transparencyNotice.cohortNotice} As our active students complete their capstone projects and transition into their careers, genuine video testimonials, portfolio links, and graduate case studies will be documented here.
            </p>
            <Button to="/contact" variant="secondary" size="sm">
              Attend an Upcoming Live Demo Session
            </Button>
          </div>
        </div>
      </section>

      {/* =================================================================
          H. FREQUENTLY ASKED QUESTIONS
         ================================================================= */}
      <section className="section">
        <div className="container container-narrow">
          <div className="section-header">
            <span className="section-tag">Got Questions?</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about our live classes, schedules, and admission process.</p>
          </div>

          <FAQAccordion items={generalFaqs} />

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
              Have another question not answered above?
            </p>
            <WhatsAppCTA variant="button" label="Ask Us on WhatsApp" />
          </div>
        </div>
      </section>

      {/* =================================================================
          I. FINAL ADMISSION CTA BANNER
         ================================================================= */}
      <section className="section" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div
            className="glass-card postit-card"
            style={{
              padding: "4rem 2rem",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div className="tape-strip" aria-hidden="true" />
            <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative", zIndex: 1 }}>
              <span className="section-tag" style={{ marginBottom: "1.5rem" }}>
                Admissions Now Open
              </span>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", marginBottom: "1.25rem" }}>
                Ready to Upgrade Your Tech Skills?
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-secondary)",
                  lineHeight: "1.7",
                  marginBottom: "2.5rem",
                }}
              >
                Join our next live online cohort. Build production-grade code, master real analytical tools, and get direct guidance from industry mentors.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <Button to="/contact" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Book a Free Demo Class
                </Button>
                <WhatsAppCTA variant="button" className="btn-lg" label="Enquire on WhatsApp" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
