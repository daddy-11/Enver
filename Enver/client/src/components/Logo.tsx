import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withDot?: boolean;
  withEmblem?: boolean;
  theme?: "light" | "dark" | "plumwine";
  onlyAlphabet?: boolean;
}

export default function Logo({
  className = "",
  size = "md",
  theme = "dark"
}: LogoProps) {
  // Proportional height for the official alphabet.png "enver_AI" wordmark
  const heightClass = {
    sm: "h-5 sm:h-6",
    md: "h-6 sm:h-7",
    lg: "h-8 sm:h-9"
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/alphabet.png"
        alt="Enver AI Tech"
        className={`${heightClass} w-auto object-contain transition-transform duration-200 hover:scale-105`}
      />
    </div>
  );
}
