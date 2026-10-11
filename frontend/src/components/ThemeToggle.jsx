import React from "react";
import { useTheme } from "../hooks/useTheme";

/**
 * Hand-Drawn ThemeToggle Component
 * Features sketched sun/moon ink stroke icons, wobbly borders,
 * hard offset shadows, and flat-press click states.
 */
export default function ThemeToggle({ showLabel = false, className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to daylight sketchbook" : "Switch to midnight sketchbook"}
    >
      <span className="theme-toggle-icon-wrap" aria-hidden="true">
        {isDark ? (
          /* Sketched Moon SVG */
          <svg
            className="theme-sketch-icon theme-moon-icon"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
            <path d="M19 3v4" strokeWidth="2" />
            <path d="M21 5h-4" strokeWidth="2" />
          </svg>
        ) : (
          /* Sketched Sun SVG */
          <svg
            className="theme-sketch-icon theme-sun-icon"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2v2.5" />
            <path d="M12 19.5V22" />
            <path d="M4.93 4.93l1.77 1.77" />
            <path d="M17.3 17.3l1.77 1.77" />
            <path d="M2 12h2.5" />
            <path d="M19.5 12H22" />
            <path d="M4.93 19.07l1.77-1.77" />
            <path d="M17.3 6.7l1.77-1.77" />
          </svg>
        )}
      </span>

      {showLabel && (
        <span className="theme-toggle-label">
          {isDark ? "Midnight Sketch" : "Daylight Paper"}
        </span>
      )}
    </button>
  );
}
