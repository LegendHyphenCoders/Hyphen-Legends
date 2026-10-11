import React from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "../config/site";

/**
 * Reusable WhatsApp CTA component.
 * Links directly to the official SkillNova Academy WhatsApp channel:
 * https://whatsapp.com/channel/0029VbDpAjNFMqrYPjEV2916
 */
export default function WhatsAppCTA({
  courseTitle,
  variant = "button", // "button" | "compact" | "floating" | "icon"
  label,
  className = "",
}) {
  // WhatsApp channel URL from siteConfig or default fallback
  const whatsappUrl =
    siteConfig.whatsapp?.channelUrl ||
    siteConfig.whatsapp?.url ||
    "https://whatsapp.com/channel/0029VbDpAjNFMqrYPjEV2916";

  const buttonText = label || (courseTitle ? `Join Channel for ${courseTitle}` : "Join WhatsApp Channel");

  if (variant === "floating") {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-floating-btn"
        aria-label="Join SkillNova Academy WhatsApp Channel"
        title="Join our WhatsApp Channel"
      >
        <MessageCircle size={26} />
        <span className="whatsapp-floating-text">WhatsApp Channel</span>
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn-whatsapp btn-sm ${className}`}
        title="Join WhatsApp Channel"
      >
        <MessageCircle size={16} />
        <span>WhatsApp</span>
      </a>
    );
  }

  if (variant === "icon") {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`whatsapp-icon-btn ${className}`}
        aria-label="Join WhatsApp Channel"
        title="Join WhatsApp Channel"
      >
        <MessageCircle size={18} />
      </a>
    );
  }

  // Default button
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-whatsapp ${className}`}
    >
      <MessageCircle size={18} />
      <span>{buttonText}</span>
    </a>
  );
}
