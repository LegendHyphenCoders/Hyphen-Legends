import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { siteConfig } from "../config/site";
import AdmissionForm from "../components/AdmissionForm";
import WhatsAppCTA from "../components/WhatsAppCTA";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get("course") || "";

  return (
    <div className="contact-page section" style={{ paddingTop: "3rem" }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: "3rem" }}>
          <span className="section-tag">
            <Sparkles size={14} /> Admissions &amp; Inquiries
          </span>
          <h1>Get in Touch with Academic Counselors</h1>
          <p>
            Have questions about syllabus depth, upcoming cohort dates, or career paths? Fill out
            the form below or message our team directly on WhatsApp.
          </p>
        </div>

        {/* 2-Column Layout: Form + Contact Info */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left Column: Form */}
          <div>
            <AdmissionForm defaultCourseSlug={preselectedCourse} />
          </div>

          {/* Right Column: Direct Contact Details & WhatsApp */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {/* Quick WhatsApp Card */}
            <div
              className="glass-card postit-card"
              style={{
                padding: "2rem",
                position: "relative",
              }}
            >
              <div className="tape-strip" aria-hidden="true" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-wobbly-circle)",
                    background: "#ffffff",
                    border: "2px solid var(--fg-pencil)",
                    color: "var(--color-whatsapp)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "2px 2px 0px 0px var(--fg-pencil)",
                  }}
                >
                  <MessageCircle size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.35rem", color: "var(--fg-pencil)", margin: 0 }}>
                    Instant WhatsApp Support
                  </h3>
                  <span style={{ fontSize: "0.95rem", color: "var(--color-emerald)", fontWeight: 700 }}>
                    Quick response during working hours
                  </span>
                </div>
              </div>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--text-secondary)",
                  lineHeight: "1.5",
                  marginBottom: "1.25rem",
                }}
              >
                Prefer an immediate conversation? Reach out directly to our admissions coordinator
                to ask about fee installments, class timings, and prerequisites.
              </p>

              <WhatsAppCTA variant="button" label="Chat Directly on WhatsApp" className="w-full" />
            </div>

            {/* Academy Contact Info Card */}
            <div className="glass-card" style={{ padding: "2rem", position: "relative" }}>
              <div className="thumbtack" aria-hidden="true" />
              <h3 style={{ fontSize: "1.35rem", marginBottom: "1.25rem", color: "var(--fg-pencil)" }}>
                Academy Contact Information
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <Mail size={18} style={{ color: "var(--primary-400)", marginTop: "2px" }} />
                  <div>
                    <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>
                      Admissions Email:
                    </strong>
                    <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                      {siteConfig.contact.email}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <Phone size={18} style={{ color: "var(--primary-400)", marginTop: "2px" }} />
                  <div>
                    <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>
                      Admissions Desk:
                    </strong>
                    <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                      {siteConfig.contact.phoneDisplay}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <Clock size={18} style={{ color: "var(--primary-400)", marginTop: "2px" }} />
                  <div>
                    <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>
                      Counselling Hours:
                    </strong>
                    <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                      {siteConfig.contact.workingHours}
                    </div>
                    <div style={{ fontSize: "0.775rem", color: "var(--text-dim)", marginTop: "2px" }}>
                      {siteConfig.contact.doubtSolvingHours}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <MapPin size={18} style={{ color: "var(--primary-400)", marginTop: "2px" }} />
                  <div>
                    <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>
                      Campus Office:
                    </strong>
                    <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                      {siteConfig.contact.address.line1}, {siteConfig.contact.address.city},{" "}
                      {siteConfig.contact.address.state} - {siteConfig.contact.address.pincode}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--cyan-400)", marginTop: "2px" }}>
                      {siteConfig.contact.address.mode}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Backend Integration Note for Developers */}
            <div
              className="glass-card"
              style={{
                padding: "1.5rem",
                background: "rgba(10, 14, 23, 0.6)",
                border: "1px dashed var(--border-medium)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <HelpCircle size={16} className="text-cyan-400" />
                <strong style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Connecting a Production Backend:
                </strong>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
                To pipe admissions inquiries into your database or email, plug your endpoint or
                webhook into <code>src/components/AdmissionForm.jsx</code> at line 82 (e.g., using{" "}
                <code>fetch(&apos;/api/admissions&apos;)</code>, Formspree, or EmailJS).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
