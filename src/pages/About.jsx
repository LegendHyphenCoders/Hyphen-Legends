import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Target,
  Users,
  Compass,
  ArrowRight,
  Code2,
  BookOpen,
  Briefcase,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "../config/site";
import { instructors } from "../data/instructors";
import Button from "../components/Button";
import WhatsAppCTA from "../components/WhatsAppCTA";

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="section" style={{ paddingTop: "4rem", paddingBottom: "3.5rem" }}>
        <div className="container container-narrow" style={{ textAlign: "center" }}>
          <span className="section-tag">
            <Sparkles size={14} /> Our Mission &amp; Academic Philosophy
          </span>
          <h1 style={{ marginBottom: "1.5rem" }}>
            Real Engineering Skills. <br />
            <span className="gradient-accent">Zero Hype.</span>
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              lineHeight: "1.7",
              color: "var(--text-secondary)",
              maxWidth: "720px",
              margin: "0 auto 2.5rem auto",
            }}
          >
            {siteConfig.name} was established to solve the greatest disconnect in computer science education: the chasm between textbook theory and the hands-on code real engineering teams ship daily.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Button to="/courses" variant="primary" icon={ArrowRight} iconPosition="right">
              View Our Programs
            </Button>
            <WhatsAppCTA variant="button" label="Speak With Our Academic Team" />
          </div>
        </div>
      </section>

      {/* The Problem & Our Solution */}
      <section className="section" style={{ backgroundColor: "rgba(15, 23, 42, 0.4)" }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center", gap: "3rem" }}>
            <div>
              <span className="section-tag">Why We Exist</span>
              <h2 style={{ marginBottom: "1.25rem" }}>
                Education Built for Actual Competence, Not Multiple-Choice Quizzes
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "1.25rem" }}>
                Most online courses rely on passive pre-recorded videos where students blindly copy code without internalizing architectural concepts. When faced with an unfamiliar bug or real workplace problem, they freeze.
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                At {siteConfig.name}, all core sessions are <strong>100% live</strong>. Students write code under mentor supervision, review edge cases, and learn how to read database logs and execution traces.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.95rem" }}>
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  <span>Interactive code pairing in live video rooms</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.95rem" }}>
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  <span>Real GitHub repositories reviewed by senior engineers</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.95rem" }}>
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  <span>Evening doubt-clearing sessions so you never stay blocked</span>
                </div>
              </div>
            </div>

            {/* Pillars Card */}
            <div className="glass-card" style={{ padding: "2.5rem" }}>
              <h3 style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>Our Core Training Pillars</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {siteConfig.pillars.map((pillar, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "rgba(99, 102, 241, 0.15)",
                        color: "var(--primary-400)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontWeight: "700",
                        fontSize: "0.85rem",
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1rem", marginBottom: "0.2rem", color: "#ffffff" }}>
                        {pillar.title}
                      </h4>
                      <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences We Serve */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Users size={14} /> Tailored Learning Paths
            </span>
            <h2>Who We Build For</h2>
            <p>Our programs are engineered to meet you at your current level and elevate your trajectory.</p>
          </div>

          <div className="grid-4">
            {siteConfig.targetAudience.map((group, idx) => (
              <div key={idx} className="glass-card" style={{ padding: "1.75rem" }}>
                <span className="badge badge-indigo" style={{ marginBottom: "1rem" }}>
                  {group.role}
                </span>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "0.6rem" }}>{group.role}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                  {group.pitch}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Honesty Commitment */}
      <section className="section" style={{ backgroundColor: "rgba(15, 23, 42, 0.4)" }}>
        <div className="container container-narrow">
          <div
            className="glass-card"
            style={{
              padding: "3rem",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              background: "rgba(15, 23, 42, 0.8)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <ShieldCheck size={28} className="text-emerald-400" />
              <h3 style={{ margin: 0, fontSize: "1.4rem" }}>Our Transparency Pledge</h3>
            </div>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "1.25rem" }}>
              In an online education market saturated with unrealistic promises, we hold ourselves to rigorous standards of integrity:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.925rem", color: "var(--text-muted)" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <strong style={{ color: "var(--emerald-400)" }}>&bull; Zero Fake Placement Numbers:</strong>
                <span>We never fabricate 100% placement guarantees or fake salary stats. Employment depends on your actual dedicated effort and market alignment.</span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <strong style={{ color: "var(--emerald-400)" }}>&bull; Upfront Proposed Fees:</strong>
                <span>All tuition rates displayed across our site are clear, proposed figures with no hidden exam fees or surprise surcharges.</span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <strong style={{ color: "var(--emerald-400)" }}>&bull; Authentic Faculty Profiles:</strong>
                <span>We clearly mark placeholder profiles while recruiting mentor specialists, ensuring you always know who guides your education.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Instructors Roster */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Faculty Profiles</span>
            <h2>Meet Our Teaching Mentors</h2>
            <p>Our educators bring practical corporate and startup engineering experience into the virtual classroom.</p>
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
        </div>
      </section>
    </div>
  );
}
