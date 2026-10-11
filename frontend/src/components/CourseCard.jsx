import React from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  BarChart,
  Code2,
  CheckCircle2,
  ArrowRight,
  FolderGit2,
  Sparkles,
} from "lucide-react";
import Button from "./Button";
import WhatsAppCTA from "./WhatsAppCTA";

export default function CourseCard({ course }) {
  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case "Data & AI":
        return "badge-cyan";
      case "Software Engineering":
        return "badge-indigo";
      case "Finance & Accounting":
        return "badge-amber";
      default:
        return "badge-indigo";
    }
  };

  return (
    <article className="course-card">
      <div className="tape-strip" aria-hidden="true" />
      <div className="course-card-header">
        <div className="course-card-topbar">
          <span className={`badge ${getCategoryBadgeClass(course.category)}`}>
            {course.category}
          </span>
          <span className="course-meta-pill">
            <Clock size={12} />
            <span>{course.duration}</span>
          </span>
        </div>

        <h3 className="course-card-title">
          <Link to={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>

        <p className="course-card-desc">{course.shortDescription}</p>
      </div>

      <div className="course-card-body">
        <div className="course-meta-pills">
          <span className="course-meta-pill">
            <BarChart size={12} />
            <span>{course.skillLevel}</span>
          </span>
          <span className="course-meta-pill">
            <FolderGit2 size={12} />
            <span>{course.projects?.length || 3} Real Projects</span>
          </span>
          <span className="course-meta-pill">
            <Code2 size={12} />
            <span>{course.modules?.length || 4} Modules</span>
          </span>
        </div>

        {/* Top 2 learning outcomes preview */}
        {course.learningOutcomes && (
          <div className="course-highlights-list">
            {course.learningOutcomes.slice(0, 2).map((outcome, idx) => (
              <div key={idx} className="course-highlight-item">
                <CheckCircle2 size={14} />
                <span className="truncate">{outcome}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="course-card-footer">
        <div className="course-pricing-row">
          <div>
            <span className="course-price-label">Proposed Tuition</span>
            <div className="course-price-val">{course.feeDisplay}</div>
          </div>
          <span className="course-fee-proposed-badge">Draft Fee</span>
        </div>

        <div className="course-card-actions">
          <Button
            to={`/courses/${course.slug}`}
            variant="primary"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
          >
            View Details
          </Button>

          <WhatsAppCTA
            courseTitle={course.title}
            variant="icon"
          />
        </div>
      </div>
    </article>
  );
}
