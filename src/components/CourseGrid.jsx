import React from "react";
import { BookOpen } from "lucide-react";
import CourseCard from "./CourseCard";
import Button from "./Button";

export default function CourseGrid({ courses, onResetFilters }) {
  if (!courses || courses.length === 0) {
    return (
      <div className="empty-state-box">
        <div className="empty-state-icon">
          <BookOpen size={30} />
        </div>
        <h3>No matching courses found</h3>
        <p>
          We couldn&apos;t find any programs matching your current search or category filters.
          Try clearing filters or search for another keyword.
        </p>
        {onResetFilters && (
          <Button variant="secondary" size="sm" onClick={onResetFilters}>
            Reset All Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
