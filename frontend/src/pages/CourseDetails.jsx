import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock,
  BarChart,
  Calendar,
  CheckCircle2,
  FolderGit2,
  Layers,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Users,
  AlertCircle,
  Video,
  Terminal,
  FileText,
  ChevronDown,
} from "lucide-react";
import { courses as localCourses } from "../data/courses";
import { apiGetCourseBySlug } from "../config/api";
import Button from "../components/Button";
import WhatsAppCTA from "../components/WhatsAppCTA";
import FAQAccordion from "../components/FAQAccordion";

export default function CourseDetails() {
  const { slug } = useParams();
  const localMatch = localCourses.find((c) => c.slug === slug);
  const [course, setCourse] = useState(localMatch || null);
  const [isLoading, setIsLoading] = useState(!localMatch);

  // Fetch course from backend API with fallback
  useEffect(() => {
    let isMounted = true;
    async function loadCourse() {
      try {
        const result = await apiGetCourseBySlug(slug);
        if (isMounted && result && result.data) {
          const apiData = result.data;
          setCourse({
            ...localMatch,
            ...apiData,
            skillLevel:
              apiData.skillLevel ||
              (apiData.level
                ? apiData.level.charAt(0).toUpperCase() + apiData.level.slice(1)
                : localMatch?.skillLevel),
            proposedFee: apiData.proposedFee || apiData.tuition || localMatch?.proposedFee,
            feeDisplay:
              localMatch?.feeDisplay ||
              `₹${(apiData.tuition || apiData.proposedFee || 0).toLocaleString("en-IN")}`,
          });
        }
      } catch (err) {
        console.warn("API unreachable for course slug; using local fallback:", err.message);
        if (isMounted && localMatch) {
          setCourse(localMatch);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadCourse();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Module accordion state (first module open by default)
  const [openModuleIndex, setOpenModuleIndex] = useState(0);

  // If slug is invalid and not loading, show friendly not-found state
  if (!isLoading && !course) {
    return (
      <div className="section" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container container-narrow" style={{ textAlign: "center" }}>
          <div className="empty-state-box" style={{ maxWidth: "560px", margin: "0 auto" }}>
            <div className="empty-state-icon">
              <ShieldAlert size={32} />
            </div>
            <h2>Course Not Found</h2>
            <p className="mt-2">
              We couldn&apos;t find a program matching the URL <code>/courses/{slug}</code>. The course might have been renamed or moved.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <Button to="/courses" variant="primary" icon={ArrowRight} iconPosition="right">
                Browse All 8 Courses
              </Button>
              <Button to="/" variant="secondary">
                Return Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const toggleModule = (idx) => {
    setOpenModuleIndex(openModuleIndex === idx ? -1 : idx);
  };

  return (
    <div className="course-details-page">
      {/* =================================================================
          HERO & COURSE OVERVIEW
         ================================================================= */}
      <section className="course-details-hero">
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
              <Link to="/" style={{ color: "var(--text-muted)" }}>Home</Link>
              <span>/</span>
              <Link to="/courses" style={{ color: "var(--text-muted)" }}>Courses</Link>
              <span>/</span>
              <span style={{ color: "var(--primary-400)" }}>{course.title}</span>
            </div>

            {/* Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center", marginBottom: "1rem" }}>
              <span className="badge badge-indigo">{course.category}</span>
              <span className="badge badge-cyan">{course.skillLevel}</span>
              <span className="course-fee-proposed-badge">Proposed Fee: {course.feeDisplay}</span>
            </div>

            {/* Title */}
            <h1 style={{ marginBottom: "1.25rem", fontSize: "clamp(2.2rem, 3.8vw, 3.25rem)" }}>
              {course.title}
            </h1>

            {/* Full Description */}
            <p style={{ fontSize: "1.15rem", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "2rem" }}>
              {course.fullDescription}
            </p>

            {/* Hero Quick Metrics */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Clock size={16} className="text-cyan-400" />
                <span><strong>Duration:</strong> {course.duration}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Video size={16} className="text-emerald-400" />
                <span><strong>Format:</strong> Live Interactive Online</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Terminal size={16} className="text-violet-400" />
                <span><strong>Commitment:</strong> {course.weeklyCommitment}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          MAIN CONTENT & STICKY ENQUIRY SIDEBAR LAYOUT
         ================================================================= */}
      <section className="section" style={{ paddingTop: "2.5rem" }}>
        <div className="container">
          <div className="course-details-layout">
            {/* Left Content Column */}
            <div className="course-content-col">
              {/* Learning Outcomes */}
              <div className="course-details-card">
                <h3>
                  <CheckCircle2 size={22} className="text-emerald-400" />
                  <span>What You Will Master</span>
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.85rem", marginTop: "1rem" }}>
                  {course.learningOutcomes?.map((outcome, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                      <CheckCircle2 size={18} className="text-emerald-400" style={{ flexShrink: 0, marginTop: "3px" }} />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Curriculum Modules Accordion */}
              <div className="course-details-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <h3 style={{ margin: 0 }}>
                    <Layers size={22} className="text-cyan-400" />
                    <span>Detailed Curriculum &amp; Modules</span>
                  </h3>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    {course.modules?.length} Structured Modules ({course.duration})
                  </span>
                </div>

                <div className="curriculum-accordion">
                  {course.modules?.map((mod, idx) => {
                    const isOpen = openModuleIndex === idx;
                    return (
                      <div key={mod.number} className="module-accordion-item">
                        <button
                          type="button"
                          className="module-header-btn"
                          onClick={() => toggleModule(idx)}
                          aria-expanded={isOpen}
                        >
                          <div className="module-title-left">
                            <span className="module-num-badge">{mod.number}</span>
                            <span>{mod.title}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <span className="module-duration-pill">{mod.duration}</span>
                            <ChevronDown
                              size={18}
                              style={{
                                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 200ms ease",
                                color: "var(--primary-400)",
                              }}
                            />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="module-topics-list">
                            {mod.topics.map((topic, tIdx) => (
                              <div key={tIdx} className="module-topic-item">
                                <span className="module-topic-bullet">&bull;</span>
                                <span>{topic}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Real-World Capstone Projects */}
              <div className="course-details-card">
                <h3>
                  <FolderGit2 size={22} className="text-violet-400" />
                  <span>Real-World Capstone Projects</span>
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.925rem", marginBottom: "1.25rem" }}>
                  Every student builds and deploys these production-caliber portfolio projects with verifiable GitHub repositories:
                </p>

                <div>
                  {course.projects?.map((proj, idx) => (
                    <div key={idx} className="project-item-card">
                      <h4>{proj.title}</h4>
                      <p>{proj.description}</p>
                      <div className="project-tech-tags">
                        {proj.tech.map((t, tIdx) => (
                          <span key={tIdx} className="project-tech-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Should Join & Prerequisites */}
              <div className="grid-2">
                <div className="course-details-card" style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.15rem" }}>
                    <Users size={18} className="text-cyan-400" />
                    <span>Who Should Join?</span>
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.85rem" }}>
                    {course.whoShouldJoin?.map((item, idx) => (
                      <div key={idx} style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                        <span style={{ color: "var(--cyan-400)" }}>&bull;</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="course-details-card" style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.15rem" }}>
                    <FileText size={18} className="text-amber-400" />
                    <span>Prerequisites</span>
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.85rem" }}>
                    {course.prerequisites?.map((item, idx) => (
                      <div key={idx} style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                        <span style={{ color: "var(--amber-400)" }}>&bull;</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Course-Specific FAQs */}
              {course.faqs && (
                <div className="course-details-card">
                  <h3>
                    <HelpCircle size={22} className="text-cyan-400" />
                    <span>Frequently Asked Questions about {course.title}</span>
                  </h3>
                  <FAQAccordion items={course.faqs} className="mt-3" />
                </div>
              )}
            </div>

            {/* Right Sticky Sidebar */}
            <aside>
              <div className="details-sidebar-card">
                <div className="tape-strip" aria-hidden="true" />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span className="course-price-label">Proposed Tuition Fee</span>
                  <span className="course-fee-proposed-badge">Introductory Rate</span>
                </div>

                <div className="details-sidebar-price">{course.feeDisplay}</div>

                <p style={{ fontSize: "0.775rem", color: "var(--text-dim)", marginTop: "0.35rem" }}>
                  {course.feeNote}
                </p>

                {/* Sidebar Perks Checklist */}
                <div className="details-sidebar-perks">
                  <div className="details-sidebar-perk">
                    <CheckCircle2 size={16} />
                    <span><strong>Duration:</strong> {course.duration}</span>
                  </div>
                  <div className="details-sidebar-perk">
                    <CheckCircle2 size={16} />
                    <span><strong>Classes:</strong> Live Online Video</span>
                  </div>
                  <div className="details-sidebar-perk">
                    <CheckCircle2 size={16} />
                    <span><strong>Batches:</strong> Weekdays &amp; Weekends</span>
                  </div>
                  <div className="details-sidebar-perk">
                    <CheckCircle2 size={16} />
                    <span><strong>Support:</strong> Daily Mentor Doubt Rooms</span>
                  </div>
                  <div className="details-sidebar-perk">
                    <CheckCircle2 size={16} />
                    <span><strong>Portfolio:</strong> 3+ Verified Capstones</span>
                  </div>
                </div>

                {/* Main Enrol Button - Preserves course in enquiry flow! */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <Button
                    to={`/contact?course=${course.slug}`}
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    style={{ width: "100%" }}
                  >
                    Enrol / Book Free Demo
                  </Button>

                  {/* WhatsApp CTA prefilled for this exact course */}
                  <WhatsAppCTA
                    courseTitle={course.title}
                    variant="button"
                    label="Chat About This Course"
                  />
                </div>

                {/* Trust Guarantee Note */}
                <div style={{ marginTop: "1.5rem", fontSize: "0.775rem", color: "var(--text-dim)", textAlign: "center", lineHeight: "1.4" }}>
                  🔒 Direct admission counselling. No high-pressure sales calls.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
