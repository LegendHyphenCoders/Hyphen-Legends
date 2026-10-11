import React from "react";
import { Link } from "react-router-dom";
import { Compass, ArrowRight, Home, BookOpen } from "lucide-react";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <div
      className="not-found-page section"
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div className="container container-narrow">
        <div className="glass-card" style={{ padding: "4rem 2rem", maxWidth: "600px", margin: "0 auto" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "rgba(99, 102, 241, 0.15)",
              color: "var(--primary-400)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem auto",
            }}
          >
            <Compass size={36} />
          </div>

          <span className="section-tag" style={{ marginBottom: "1rem" }}>
            404 Error &bull; Page Not Found
          </span>

          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Page Not Found</h1>

          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: "1.6", marginBottom: "2rem" }}>
            The page you are looking for might have been moved, removed, or is temporarily unavailable. Let&apos;s get you back on track!
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Button to="/" variant="primary" icon={Home}>
              Return to Homepage
            </Button>
            <Button to="/courses" variant="secondary" icon={BookOpen}>
              Explore Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
