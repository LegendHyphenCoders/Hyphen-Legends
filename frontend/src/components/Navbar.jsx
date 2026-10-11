import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "../config/site";
import Button from "./Button";
import WhatsAppCTA from "./WhatsAppCTA";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        {/* Logo */}
        <Link to="/" className="logo-link" aria-label={`${siteConfig.name} Home`}>
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

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop-links" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="nav-desktop-actions">
          <ThemeToggle />
          <WhatsAppCTA variant="compact" />
          <Button to="/courses" variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
            Explore Courses
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`} role="dialog" aria-modal="true">
        <nav className="mobile-nav-list" aria-label="Mobile Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
            >
              <span>{link.label}</span>
              <ArrowRight size={18} />
            </NavLink>
          ))}
        </nav>

        <div className="mobile-nav-actions">
          <ThemeToggle showLabel={true} className="theme-toggle-mobile" />
          <Button
            to="/courses"
            variant="primary"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => setMobileMenuOpen(false)}
          >
            Explore All Courses
          </Button>
          <Button
            to="/contact"
            variant="secondary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a Free Demo
          </Button>
          <WhatsAppCTA />
        </div>
      </div>
    </header>
  );
}
