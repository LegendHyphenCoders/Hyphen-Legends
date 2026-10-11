import React from "react";
import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className = "",
  type = "button",
  onClick,
  disabled = false,
  target,
  rel,
  ...props
}) {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;
  const sizeClass = size === "md" ? "" : `btn-${size}`;
  const combinedClasses = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim();

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon size={size === "sm" ? 16 : 18} />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon size={size === "sm" ? 16 : 18} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} onClick={onClick} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        onClick={onClick}
        target={target}
        rel={target === "_blank" ? (rel || "noopener noreferrer") : rel}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}
