"use client";

import React from "react";

/**
 * HighlightedHeading renders a heading with optional accent highlighting.
 * The `children` prop can be a string containing `**word**` markers which will be
 * wrapped in a theme-colored accent span. If `children` is not a string, it is
 * rendered unchanged so callers can highlight a phrase with their own markup.
 */
export default function HighlightedHeading({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}) {

  // If the content is a plain string, replace **word** markers with a styled span.
  const renderContent = () => {
    if (typeof children === "string") {
      const parts = children.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, i) => {
        if (/^\*\*[^*]+\*\*$/.test(part)) {
          const text = part.replace(/^\*\*/, "").replace(/\*\*$/, "");
          return (
            <span key={i} className="heading-accent">
              {text}
            </span>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      });
    }
    // Fallback for non‑string children (e.g., elements, fragments)
    return children;
  };

  return (
    <Tag className={`font-bold text-3xl text-white ${className}`}>
      {renderContent()}
    </Tag>
  );
}
