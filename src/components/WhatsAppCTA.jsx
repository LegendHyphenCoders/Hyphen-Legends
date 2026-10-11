import React, { useState } from "react";
import { MessageCircle, AlertCircle, X, ExternalLink } from "lucide-react";
import { siteConfig } from "../config/site";

/**
 * Reusable WhatsApp CTA component.
 * Generates pre-filled message tailored to course or general enquiry.
 * Handles fallback gracefully if the number is unconfigured.
 */
export default function WhatsAppCTA({
  courseTitle,
  variant = "button", // "button" | "compact" | "floating" | "icon"
  label,
  className = "",
}) {
  const [showConfigNotice, setShowConfigNotice] = useState(false);

  const rawNumber = siteConfig.whatsapp?.number?.replace(/\D/g, "");
  const isConfigured = Boolean(
    siteConfig.whatsapp?.isConfigured &&
    rawNumber &&
    rawNumber !== "1234567890" &&
    rawNumber !== "0000000000"
  );

  // Construct message
  const textMessage = courseTitle
    ? `Hello, I am interested in your ${courseTitle} course at ${siteConfig.name}. Please share the curriculum, upcoming batch schedule, and admission details.`
    : siteConfig.whatsapp?.defaultMessage ||
      `Hello ${siteConfig.name}, I would like to enquire about your live online IT training courses and upcoming batches.`;

  const encodedMessage = encodeURIComponent(textMessage);
  const whatsappUrl = `https://wa.me/${rawNumber}?text=${encodedMessage}`;

  const handleClick = (e) => {
    // If not configured, intercept and show friendly configuration guide
    if (!isConfigured) {
      e.preventDefault();
      setShowConfigNotice(true);
    }
  };

  const buttonText = label || (courseTitle ? `Enquire for ${courseTitle}` : "Chat on WhatsApp");

  const renderContent = () => {
    if (variant === "floating") {
      return (
        <a
          href={isConfigured ? whatsappUrl : "#"}
          onClick={handleClick}
          target={isConfigured ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="whatsapp-floating-btn"
          aria-label="Chat with SkillNova Admissions on WhatsApp"
          title="Chat with us on WhatsApp"
        >
          <div className="whatsapp-floating-pulse"></div>
          <MessageCircle size={26} />
          <span className="whatsapp-floating-text">Chat with Advisor</span>
        </a>
      );
    }

    if (variant === "compact") {
      return (
        <a
          href={isConfigured ? whatsappUrl : "#"}
          onClick={handleClick}
          target={isConfigured ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`btn btn-whatsapp btn-sm ${className}`}
          title={buttonText}
        >
          <MessageCircle size={16} />
          <span>WhatsApp</span>
        </a>
      );
    }

    if (variant === "icon") {
      return (
        <a
          href={isConfigured ? whatsappUrl : "#"}
          onClick={handleClick}
          target={isConfigured ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`whatsapp-icon-btn ${className}`}
          aria-label="Enquire via WhatsApp"
        >
          <MessageCircle size={18} />
        </a>
      );
    }

    // Default button
    return (
      <a
        href={isConfigured ? whatsappUrl : "#"}
        onClick={handleClick}
        target={isConfigured ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className={`btn btn-whatsapp ${className}`}
      >
        <MessageCircle size={18} />
        <span>{buttonText}</span>
      </a>
    );
  };

  return (
    <>
      {renderContent()}

      {/* Configuration notice modal if phone number is not set by user */}
      {showConfigNotice && (
        <div className="modal-backdrop" onClick={() => setShowConfigNotice(false)}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="tape-strip" aria-hidden="true" />
            <div className="modal-header">
              <div className="modal-icon-warning">
                <AlertCircle size={22} />
              </div>
              <h3 id="modal-title">WhatsApp Integration Setup</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowConfigNotice(false)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p>
                To route students directly to your official WhatsApp Business chat, update your real
                phone number in the centralized configuration file:
              </p>
              <div className="code-snippet-box">
                <code>src/config/site.js &rarr; siteConfig.whatsapp.number</code>
              </div>
              <p className="mt-2 text-sm text-muted">
                <strong>Current Draft Message:</strong>
                <br />
                <em>&ldquo;{textMessage}&rdquo;</em>
              </p>
              <div className="config-instructions">
                <p>1. Open <code>src/config/site.js</code></p>
                <p>2. Set <code>whatsapp.number: "91XXXXXXXXXX"</code> (country code + number)</p>
                <p>3. Set <code>whatsapp.isConfigured: true</code></p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setShowConfigNotice(false)}
              >
                Got It
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <span>Test WhatsApp URL Anyway</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
