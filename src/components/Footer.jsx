import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "../config/site";
import { courses } from "../data/courses";
import WhatsAppCTA from "./WhatsAppCTA";

// Clean, lightweight social icon SVGs
function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 1 0 0-3.38 1.69 1.69 0 0 0 0 3.38m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function GitHubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function TwitterIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 0 0 2.42 7.19C2 8.76 2 12 2 12s0 3.24.42 4.81a2.5 2.5 0 0 0 1.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.42-4.81zM9.75 15.02V8.98l5.5 3.02-5.5 3.02z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Grid */}
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <Link to="/" className="logo-link">
              <div className="logo-icon-wrapper">
                <GraduationCap size={24} />
              </div>
              <div className="logo-text-group">
                <span className="logo-title">
                  Skill<span>Nova</span>
                </span>
                <span className="logo-tagline">IT Training Academy</span>
              </div>
            </Link>
            <p>
              Bridging the gap between academic theory and practical technology engineering through
              live online classes, hands-on labs, and dedicated mentor guidance.
            </p>
            <div className="footer-socials">
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="GitHub"
              >
                <GitHubIcon size={18} />
              </a>
              <a
                href={siteConfig.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="X / Twitter"
              >
                <TwitterIcon size={18} />
              </a>
              <a
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="YouTube"
              >
                <YouTubeIcon size={18} />
              </a>
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/courses" className="footer-link">Browse All Courses</Link>
              <Link to="/about" className="footer-link">About Academy</Link>
              <Link to="/contact" className="footer-link">Admissions & Contact</Link>
              <Link to="/courses?category=Data%20%26%20AI" className="footer-link">Data & AI Tracks</Link>
              <Link to="/courses?category=Software%20Engineering" className="footer-link">Software Engineering</Link>
            </div>
          </div>

          {/* Courses List */}
          <div className="footer-col">
            <h4 className="footer-col-title">Top Programs</h4>
            <div className="footer-links">
              {courses.slice(0, 6).map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.slug}`}
                  className="footer-link"
                >
                  {course.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-col-title">Admissions & Support</h4>
            <div className="footer-contact-item">
              <Mail size={16} className="footer-contact-icon" />
              <span>{siteConfig.contact.email}</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} className="footer-contact-icon" />
              <span>{siteConfig.contact.phoneDisplay}</span>
            </div>
            <div className="footer-contact-item">
              <Clock size={16} className="footer-contact-icon" />
              <span>{siteConfig.contact.workingHours}</span>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} className="footer-contact-icon" />
              <span>
                {siteConfig.contact.address.city}, {siteConfig.contact.address.country}
                <br />
                <small className="text-muted">{siteConfig.contact.address.mode}</small>
              </span>
            </div>

            <div className="mt-3">
              <WhatsAppCTA variant="compact" label="Chat with Counselor" />
            </div>
          </div>
        </div>

        {/* Transparency Commitment Notice */}
        <div className="footer-transparency-card">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={16} className="text-emerald-400" />
            <strong>Pricing & Credibility Policy:</strong>
          </div>
          <span>
            {siteConfig.transparencyNotice.pricingNotice} {siteConfig.transparencyNotice.cohortNotice} We never use artificial urgency timers or fake discount counters.
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/about" className="footer-link">Academic Philosophy</Link>
            <Link to="/contact" className="footer-link">Admissions Enquiry</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
