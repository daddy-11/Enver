"use client";

import React, { useState, useEffect } from "react";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable body scroll when loader is active
    document.body.style.overflow = "hidden";

    // Progress bar animation simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 40);

    // Wait for page load
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
        // Re-enable body scroll after fade out completes
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = "";
        }, 300); // match transition duration
      }, 500); // brief hold at 100% for smooth visuals
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Fallback timeout in case window load event doesn't fire
      const fallback = setTimeout(handleLoad, 1200);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(fallback);
        clearInterval(progressInterval);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#FAF6EF] flex flex-col items-center justify-center transition-opacity duration-300 ease-out select-none ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Brand Logo with Pulsing Dot */}
        <div className="flex items-center gap-2 mb-6">
          <span className="font-sans font-extrabold text-4xl tracking-tighter text-[#121212]">
            enver
          </span>
          <span className="w-3.5 h-3.5 rounded-full bg-[#E8660A] animate-pulse" />
        </div>

        {/* Cursive Subtitle */}
        <p className="font-script text-[#4a4a4a] text-2xl font-medium tracking-tight mb-6">
          Preparing agent workspace...
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-[2px] bg-neutral-200 border border-[#121212]/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#121212] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
