import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQAccordion({ items, className = "" }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className={`faq-accordion-container ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const itemId = `faq-item-${idx}`;
        const contentId = `faq-content-${idx}`;

        return (
          <div key={idx} className={`faq-card ${isOpen ? "open" : ""}`}>
            <button
              type="button"
              className="faq-question-btn"
              onClick={() => toggleItem(idx)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              id={itemId}
            >
              <span className="faq-question-text">{item.q}</span>
              <span className={`faq-icon-chevron ${isOpen ? "rotated" : ""}`}>
                <ChevronDown size={20} />
              </span>
            </button>
            <div
              id={contentId}
              role="region"
              aria-labelledby={itemId}
              className={`faq-answer-collapse ${isOpen ? "open" : ""}`}
            >
              <div className="faq-answer-content">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
