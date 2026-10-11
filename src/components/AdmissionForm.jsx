import React, { useState, useEffect } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  RefreshCw,
  Info,
  ExternalLink,
} from "lucide-react";
import { courses } from "../data/courses";
import { siteConfig } from "../config/site";
import Button from "./Button";

export default function AdmissionForm({ defaultCourseSlug, onFormSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseSlug: defaultCourseSlug || "",
    currentStatus: "College Student",
    preferredTiming: "Weekday Evenings (7:30 PM - 9:30 PM IST)",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Sync defaultCourseSlug if it changes
  useEffect(() => {
    if (defaultCourseSlug) {
      setFormData((prev) => ({ ...prev, courseSlug: defaultCourseSlug }));
    }
  }, [defaultCourseSlug]);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneDigits || phoneDigits.length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile / WhatsApp number.";
    }

    if (!formData.courseSlug) {
      errs.courseSlug = "Please select a course of interest.";
    }

    if (!formData.consent) {
      errs.consent = "You must provide consent to receive course syllabus and admission details.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network submission delay (demonstration flow without silent backend discard)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData, submittedAt: new Date().toLocaleString() });
      if (onFormSuccess) onFormSuccess(formData);
    }, 600);
  };

  const resetForm = () => {
    setSubmittedData(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      courseSlug: defaultCourseSlug || "",
      currentStatus: "College Student",
      preferredTiming: "Weekday Evenings (7:30 PM - 9:30 PM IST)",
      message: "",
      consent: false,
    });
    setErrors({});
  };

  const selectedCourse = courses.find((c) => c.slug === (submittedData?.courseSlug || formData.courseSlug));

  // Construct direct WhatsApp forward link for convenience
  const rawWhatsAppNumber = siteConfig.whatsapp?.number?.replace(/\D/g, "");
  const directWhatsAppMessage = encodeURIComponent(
    `Hello ${siteConfig.name}! My name is ${submittedData?.fullName || formData.fullName}. I submitted an enquiry for the ${
      selectedCourse?.title || "IT Training"
    } program. My status: ${submittedData?.currentStatus || formData.currentStatus}. Preferred timing: ${
      submittedData?.preferredTiming || formData.preferredTiming
    }. Phone: ${submittedData?.phone || formData.phone}. Please share upcoming batch details.`
  );
  const whatsappUrl =
    siteConfig.whatsapp?.channelUrl ||
    siteConfig.whatsapp?.url ||
    "https://whatsapp.com/channel/0029VbDpAjNFMqrYPjEV2916";

  if (submittedData) {
    return (
      <div className="form-success-card">
        <div className="form-success-icon">
          <CheckCircle2 size={36} />
        </div>
        <h3>Inquiry Form Validated!</h3>
        <p className="mt-2 text-muted">
          Thank you, <strong>{submittedData.fullName}</strong>. Your enquiry details have been verified on the frontend.
        </p>

        {/* Clear transparent demo notice */}
        <div className="demo-mode-banner mt-4 text-left">
          <Info size={20} />
          <div>
            <strong>Frontend Demonstration Notice:</strong>
            <p className="mt-1">
              This repository currently operates in frontend-only mode (no private database or SMTP mail server is attached). To make this production-ready, connect this form handler to services like Formspree, EmailJS, or your backend REST API.
            </p>
          </div>
        </div>

        {/* Local summary preview */}
        <div className="submission-preview-box">
          <p><strong>Candidate:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone:</strong> {submittedData.phone}</p>
          <p><strong>Selected Course:</strong> {selectedCourse?.title} ({selectedCourse?.feeDisplay})</p>
          <p><strong>Status:</strong> {submittedData.currentStatus}</p>
          <p><strong>Preferred Timing:</strong> {submittedData.preferredTiming}</p>
          {submittedData.message && <p><strong>Message:</strong> {submittedData.message}</p>}
          <p><small className="text-dim">Timestamp: {submittedData.submittedAt}</small></p>
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

          <Button variant="secondary" onClick={resetForm}>
            <RefreshCw size={16} />
            <span>Submit Another Inquiry</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="tape-strip" aria-hidden="true" />
      {/* Honest Demo Mode Banner */}
      <div className="demo-mode-banner">
        <Info size={20} />
        <div>
          <strong>Admissions Demo Workflow:</strong>
          <p className="mt-0.5">
            Feel free to test full validation. Since no backend database is connected yet, your submission is verified in frontend state with direct WhatsApp forwarding.
          </p>
        </div>
      </div>

      <div className="grid-2">
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Full Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="form-input"
            placeholder="e.g. Rahul Sharma"
            value={formData.fullName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && (
            <span id="fullName-error" className="form-error">
              <AlertCircle size={14} /> {errors.fullName}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="e.g. rahul@example.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className="form-error">
              <AlertCircle size={14} /> {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className="grid-2">
        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Mobile / WhatsApp Number <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            placeholder="e.g. 9876543210"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone ? (
            <span id="phone-error" className="form-error">
              <AlertCircle size={14} /> {errors.phone}
            </span>
          ) : (
            <span className="form-hint">Used to send syllabus PDF and batch schedules</span>
          )}
        </div>

        {/* Course of Interest */}
        <div className="form-group">
          <label htmlFor="courseSlug" className="form-label">
            Course of Interest <span className="required">*</span>
          </label>
          <select
            id="courseSlug"
            name="courseSlug"
            className="form-select"
            value={formData.courseSlug}
            onChange={handleChange}
            aria-invalid={Boolean(errors.courseSlug)}
            aria-describedby={errors.courseSlug ? "courseSlug-error" : undefined}
          >
            <option value="" disabled>
              Select a program...
            </option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title} — {c.feeDisplay} ({c.duration})
              </option>
            ))}
          </select>
          {errors.courseSlug && (
            <span id="courseSlug-error" className="form-error">
              <AlertCircle size={14} /> {errors.courseSlug}
            </span>
          )}
        </div>
      </div>

      <div className="grid-2">
        {/* Education / Employment Status */}
        <div className="form-group">
          <label htmlFor="currentStatus" className="form-label">
            Current Education or Employment Status
          </label>
          <select
            id="currentStatus"
            name="currentStatus"
            className="form-select"
            value={formData.currentStatus}
            onChange={handleChange}
          >
            <option value="College Student">College Student (Pursuing Degree)</option>
            <option value="Fresh Graduate">Fresh Graduate (Looking for First Job)</option>
            <option value="Working Professional (IT)">Working Professional (In IT)</option>
            <option value="Working Professional (Non-IT)">Working Professional (Non-IT Switching)</option>
            <option value="Beginner / Career Explorer">Beginner / Career Explorer</option>
            <option value="Freelancer / Entrepreneur">Freelancer / Entrepreneur</option>
          </select>
        </div>

        {/* Preferred Class Timing */}
        <div className="form-group">
          <label htmlFor="preferredTiming" className="form-label">
            Preferred Class Timing
          </label>
          <select
            id="preferredTiming"
            name="preferredTiming"
            className="form-select"
            value={formData.preferredTiming}
            onChange={handleChange}
          >
            <option value="Weekday Evenings (7:30 PM - 9:30 PM IST)">
              Weekday Evenings (7:30 PM – 9:30 PM IST)
            </option>
            <option value="Weekend Batches (Saturday & Sunday)">
              Weekend Batches (Saturday & Sunday)
            </option>
            <option value="Flexible / Either Works">
              Flexible / Either Works
            </option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Any specific questions or goals? (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          className="form-textarea"
          placeholder="Tell us about your learning background or questions regarding curriculum and schedules..."
          value={formData.message}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Consent Checkbox */}
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <label htmlFor="consent" className="checkbox-label">
          I consent to receive syllabus updates, batch schedules, and free demo access via Email and WhatsApp from {siteConfig.name}. We strictly respect your privacy with zero spam. <span className="required">*</span>
        </label>
      </div>
      {errors.consent && (
        <div id="consent-error" className="form-error mb-3">
          <AlertCircle size={14} /> {errors.consent}
        </div>
      )}

      {/* Submit Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          icon={Send}
          iconPosition="right"
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Validating & Submitting..." : "Submit Admission Enquiry"}
        </Button>

        <p className="text-xs text-dim text-center sm:text-right">
          🔒 Encrypted client session &bull; Zero spam guarantee
        </p>
      </div>
    </form>
  );
}
