import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, BookOpen, RotateCcw, Sparkles } from "lucide-react";
import { courses, courseCategories, skillLevels } from "../data/courses";
import CourseGrid from "../components/CourseGrid";
import Button from "../components/Button";

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "All Courses";
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("default");

  // Filtered and sorted courses
  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        // Search filter (title or description or tech)
        const query = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !query ||
          course.title.toLowerCase().includes(query) ||
          course.shortDescription.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query);

        // Category filter
        const matchesCategory =
          selectedCategory === "All Courses" ||
          course.category === selectedCategory;

        // Skill level filter
        const matchesLevel =
          selectedLevel === "All Levels" ||
          course.skillLevel.toLowerCase().includes(selectedLevel.toLowerCase());

        return matchesQuery && matchesCategory && matchesLevel;
      })
      .sort((a, b) => {
        if (sortBy === "fee-asc") return a.proposedFee - b.proposedFee;
        if (sortBy === "fee-desc") return b.proposedFee - a.proposedFee;
        if (sortBy === "duration-asc") return parseInt(a.duration) - parseInt(b.duration);
        if (sortBy === "duration-desc") return parseInt(b.duration) - parseInt(a.duration);
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All Courses") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Courses");
    setSelectedLevel("All Levels");
    setSortBy("default");
    setSearchParams({});
  };

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All Courses" ||
    selectedLevel !== "All Levels" ||
    sortBy !== "default";

  return (
    <div className="courses-page section" style={{ paddingTop: "3rem" }}>
      <div className="container">
        {/* Page Header */}
        <div className="section-header" style={{ marginBottom: "2.5rem" }}>
          <span className="section-tag">
            <Sparkles size={14} /> Full Academy Catalog
          </span>
          <h1>Explore All IT Training Programs</h1>
          <p>
            Choose from comprehensive career tracks in Data, AI, Software Engineering, and Commercial Finance. Every course features live online classes and portfolio capstones.
          </p>
        </div>

        {/* Toolbar & Search */}
        <div className="catalog-toolbar">
          <div className="toolbar-search-row">
            {/* Search Input */}
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon-inside" />
              <input
                type="text"
                className="form-input"
                placeholder="Search by course title, skill, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search courses"
              />
            </div>

            {/* Skill Level Dropdown */}
            <div style={{ minWidth: "180px" }}>
              <select
                className="form-select"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                aria-label="Filter by skill level"
              >
                {skillLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div style={{ minWidth: "180px" }}>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort courses"
              >
                <option value="default">Sort: Default Order</option>
                <option value="fee-asc">Tuition: Low to High</option>
                <option value="fee-desc">Tuition: High to Low</option>
                <option value="duration-asc">Duration: Short to Long</option>
                <option value="duration-desc">Duration: Long to Short</option>
              </select>
            </div>

            {/* Reset Filter Button if active */}
            {isFiltered && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleResetFilters}
                title="Reset all filters"
                style={{ padding: "0.75rem 1rem" }}
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Category Pill Filters */}
          <div className="filter-pills-row">
            <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginRight: "0.25rem" }}>
              Category:
            </span>
            {courseCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Result Count and Active Filters note */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              paddingTop: "0.5rem",
              borderTop: "1px dashed var(--border-subtle)",
            }}
          >
            <span>
              Showing <strong>{filteredCourses.length}</strong> of <strong>{courses.length}</strong> courses
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--amber-400)" }}>
              * All course fees are proposed introductory tuition amounts
            </span>
          </div>
        </div>

        {/* Course Grid with Empty State */}
        <CourseGrid
          courses={filteredCourses}
          onResetFilters={isFiltered ? handleResetFilters : undefined}
        />
      </div>
    </div>
  );
}
