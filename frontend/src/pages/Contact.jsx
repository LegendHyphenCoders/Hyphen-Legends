import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Send,
  RefreshCw,
  ExternalLink,
  GraduationCap,
  MessageSquare,
  Server,
} from "lucide-react";
import { siteConfig } from "../config/site";
import { apiSubmitContact } from "../config/api";
import AdmissionForm from "../components/AdmissionForm";
import WhatsAppCTA from "../components/WhatsAppCTA";
import Button from "../components/Button";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get("course") || "";

  useEffect(() => {
    document.title = "Admissions & Inquiries — HL Stack";
  }, []);

  // Tab state: 'admission' or 'general'
  const [activeTab, setActiveTab] = useState("admission");

  // General contact form state
  const [generalForm, setGeneralForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const validateGeneral = () => {
    const errs = {};
    if (!generalForm.fullName.trim() || generalForm.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name (minimum 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!generalForm.email.trim() || !emailRegex.test(generalForm.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    const phoneDigits = generalForm.phone.replace(/\D/g, "");
    if (!phoneDigits || phoneDigits.length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile number.";
    }
    if (!generalForm.message.trim() || generalForm.message.trim().length < 5) {
      errs.message = "Please write a brief message (minimum 5 characters).";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (serverError) setServerError(null);
  };

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    if (!validateGeneral()) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await apiSubmitContact({
        fullName: generalForm.fullName.trim(),
        email: generalForm.email.trim(),
        phone: generalForm.phone.trim(),
        message: generalForm.message.trim(),
      });

      setSubmittedMessage({
        ...generalForm,
        submittedAt: new Date().toLocaleString(),
        id: res?.data?._id || "MSG-SAVED",
      });
    } catch (err) {
      console.warn("Contact form submission error:", err.message);
      let errorMsg = err.message || "Failed to submit message. Please reach out via WhatsApp directly.";
      if (err.name === "TypeError" && (err.message === "Failed to fetch" || err.message.includes("fetch"))) {
        errorMsg = "Unable to connect to the academy server. Please check your connection or reach out directly on WhatsApp.";
      }
      setServerError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetGeneralForm = () => {
    setSubmittedMessage(null);
    setServerError(null);
    setGeneralForm({ fullName: "", email: "", phone: "", message: "" });
    setErrors({});
  };

  const whatsappUrl =
    siteConfig.whatsapp?.channelUrl ||
    siteConfig.whatsapp?.url ||
    "https://whatsapp.com/channel/0029VbDpAjNFMqrYPjEV2916";

  return (
    <div className="contact-page section" style={{ paddingTop: "3rem" }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: "2.5rem" }}>
          <span className="section-tag">
            <Sparkles size={14} /> Admissions &amp; Inquiries
          </span>
          <h1>Get in Touch with HL Stack</h1>
          <p>
            Have questions about upcoming cohorts, tuition, or technical curriculum? Submit an inquiry below or chat directly with our academic team on WhatsApp.
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("admission")}
            className={`btn ${activeTab === "admission" ? "btn-primary" : "btn-secondary"}`}
            style={{
              padding: "0.6rem 1.4rem",
              fontSize: "1.05rem",
              cursor: "pointer",
            }}
          >
            <GraduationCap size={18} />
            <span>Course Admission Enquiry</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`btn ${activeTab === "general" ? "btn-primary" : "btn-secondary"}`}
            style={{
              padding: "0.6rem 1.4rem",
              fontSize: "1.05rem",
              cursor: "pointer",
            }}
          >
            <MessageSquare size={18} />
            <span>General Message / Enquiry</span>
          </button>
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
            {activeTab === "admission" ? (
              <AdmissionForm defaultCourseSlug={preselectedCourse} />
            ) : submittedMessage ? (
              <div className="form-success-card postit-card" style={{ position: "relative" }}>
                <div className="tape-strip" aria-hidden="true" />
                <div className="form-success-icon">
                  <CheckCircle2 size={36} />
                </div>
                <h3>Message Received!</h3>
                <p className="mt-2 text-muted">
                  Thank you, <strong>{submittedMessage.fullName}</strong>. Your query has been logged to our database.
                </p>

                <div className="submission-preview-box mt-3">
                  <p><strong>Name:</strong> {submittedMessage.fullName}</p>
                  <p><strong>Email:</strong> {submittedMessage.email}</p>
                  <p><strong>Phone:</strong> {submittedMessage.phone}</p>
                  <p><strong>Message:</strong> {submittedMessage.message}</p>
                  <p><small className="text-dim">Timestamp: {submittedMessage.submittedAt}</small></p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    <MessageCircle size={18} />
                    <span>Join Our WhatsApp Channel</span>
                    <ExternalLink size={14} />
                  </a>

                  <Button variant="secondary" onClick={resetGeneralForm}>
                    <RefreshCw size={16} />
                    <span>Send Another Message</span>
                  </Button>
                </div>
              </div>
            ) : (
              <form className="form-card" onSubmit={handleGeneralSubmit} noValidate>
                <div className="tape-strip" aria-hidden="true" />

                {serverError && (
                  <div className="form-banner-error mb-4">
                    <AlertCircle size={20} color="var(--color-accent)" />
                    <div>
                      <strong style={{ color: "var(--color-accent)" }}>Submission Notice:</strong>
                      <p className="mt-0.5" style={{ color: "var(--fg-pencil)" }}>{serverError}</p>
                      <div className="mt-2">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-whatsapp"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            padding: "0.35rem 0.85rem",
                            fontSize: "0.85rem",
                            textDecoration: "none",
                          }}
                        >
                          <MessageCircle size={15} />
                          <span>Chat on WhatsApp Directly</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid-2">
                  <div className="form-group">
                    <label htmlFor="gen-fullName" className="form-label">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="gen-fullName"
                      name="fullName"
                      className="form-input"
                      placeholder="e.g. Priya Iyer"
                      value={generalForm.fullName}
                      onChange={handleGeneralChange}
                    />
                    {errors.fullName && (
                      <span className="form-error">
                        <AlertCircle size={14} /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="gen-email" className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="gen-email"
                      name="email"
                      className="form-input"
                      placeholder="e.g. priya@example.com"
                      value={generalForm.email}
                      onChange={handleGeneralChange}
                    />
                    {errors.email && (
                      <span className="form-error">
                        <AlertCircle size={14} /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="gen-phone" className="form-label">
                    Mobile / WhatsApp Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="gen-phone"
                    name="phone"
                    className="form-input"
                    placeholder="e.g. 9876543210"
                    value={generalForm.phone}
                    onChange={handleGeneralChange}
                  />
                  {errors.phone && (
                    <span className="form-error">
                      <AlertCircle size={14} /> {errors.phone}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="gen-message" className="form-label">
                    Message / Question <span className="required">*</span>
                  </label>
                  <textarea
                    id="gen-message"
                    name="message"
                    rows="4"
                    className="form-textarea"
                    placeholder="How can we assist you with our training programs, corporate batches, or admissions?"
                    value={generalForm.message}
                    onChange={handleGeneralChange}
                  />
                  {errors.message && (
                    <span className="form-error">
                      <AlertCircle size={14} /> {errors.message}
                    </span>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    icon={Send}
                    iconPosition="right"
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            )}
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
                    background: "var(--bg-surface)",
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
                    Direct counseling &amp; cohort guidance
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
                Prefer an immediate conversation? Reach out directly to our admissions coordinator to ask about batch timings, fee installments, and project portfolios.
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

            {/* Architecture Card */}
            <div
              className="glass-card"
              style={{
                padding: "1.5rem",
                background: "var(--bg-paper-card)",
                border: "2px solid var(--fg-pencil)",
                boxShadow: "3px 3px 0 var(--fg-pencil)",
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
                <Server size={18} color="var(--color-ballpoint-blue)" />
                <strong style={{ fontSize: "0.95rem", color: "var(--fg-pencil)" }}>
                  Full-Stack Architecture:
                </strong>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5", margin: 0 }}>
                Connected to Express REST API &amp; MongoDB Atlas. Admission leads are stored in the <code>admissions</code> collection; messages are stored in <code>contactmessages</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
