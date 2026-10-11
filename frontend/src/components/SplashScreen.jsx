import React, { useState, useEffect, useRef } from "react";

export default function SplashScreen() {
  const [shouldRender, setShouldRender] = useState(() => {
    try {
      return !sessionStorage.getItem("hl-splash-shown");
    } catch {
      return false;
    }
  });
  const [isExiting, setIsExiting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const splashRef = useRef(null);

  useEffect(() => {
    if (!shouldRender) return;

    try {
      sessionStorage.setItem("hl-splash-shown", "true");
    } catch {
      // Ignore private browsing storage errors
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const labelTimer = setTimeout(() => {
      setIsReady(true);
    }, prefersReducedMotion ? 300 : 1250);

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, prefersReducedMotion ? 450 : 1550);

    // Hard fallback timeout: ensure splash is unmounted from DOM even if transitionend fails
    const cleanupTimer = setTimeout(() => {
      setShouldRender(false);
    }, prefersReducedMotion ? 650 : 1950);

    return () => {
      clearTimeout(labelTimer);
      clearTimeout(exitTimer);
      clearTimeout(cleanupTimer);
    };
  }, [shouldRender]);

  const handleTransitionEnd = (e) => {
    if (e.target === splashRef.current && isExiting) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      ref={splashRef}
      className={`hl-splash-screen ${isExiting ? "hl-splash-exit" : ""}`}
      onTransitionEnd={handleTransitionEnd}
      aria-hidden="true"
    >
      {/* Hand-Sketched Edge Doodles */}
      <svg className="hl-splash-doodle hl-splash-doodle-star" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="var(--bg-postit)" />
      </svg>

      <svg className="hl-splash-doodle hl-splash-doodle-asterisk" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="4.22" y1="7.22" x2="19.78" y2="16.78" />
        <line x1="4.22" y1="16.78" x2="19.78" y2="7.22" />
      </svg>

      <svg className="hl-splash-doodle hl-splash-doodle-circle" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>

      <svg className="hl-splash-doodle hl-splash-doodle-squiggle" width="70" height="30" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 20 Q 25 5, 45 20 T 85 20 T 95 15" />
      </svg>

      <svg className="hl-splash-doodle hl-splash-doodle-zigzag" width="40" height="50" viewBox="0 0 30 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="5 5 25 15 5 25 25 35 5 45" />
      </svg>

      {/* Branded Centerpiece */}
      <div className="hl-splash-content">
        <div className="hl-splash-wordmark-wrap">
          <svg className="hl-splash-svg" viewBox="0 0 320 100">
            <text x="50%" y="60" textAnchor="middle" className="hl-splash-text">
              HL Stack
            </text>
            <path d="M40 82 Q 160 92, 280 82" className="hl-splash-underline" />
          </svg>
        </div>

        {/* Wobbly Progress Bar & Micro Tape-Strip Label */}
        <div className="hl-splash-progress-container">
          <div className="hl-splash-progress-track">
            <div className="hl-splash-progress-bar" />
          </div>
          <div className="hl-splash-tape-label">
            {isReady ? "ready! ✨" : "sharpening pencils... ✏️"}
          </div>
        </div>
      </div>
    </div>
  );
}
