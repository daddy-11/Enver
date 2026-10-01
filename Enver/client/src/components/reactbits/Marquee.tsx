import { useRef, useEffect, useState } from "react";

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
  separator?: string;
}

export default function Marquee({
  text,
  speed = 40,
  className = "",
  separator = " // ",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const firstChild = containerRef.current.querySelector(
        ".marquee-content"
      ) as HTMLElement;
      if (firstChild) {
        setContentWidth(firstChild.offsetWidth);
      }
    }
  }, [text]);

  // Repeat text enough times to fill + overflow
  const repeatedText = `${text}${separator}`.repeat(6);
  const duration = contentWidth > 0 ? contentWidth / speed : 20;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        ref={containerRef}
        className="inline-flex animate-marquee"
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        <span className="marquee-content inline-block pr-4 font-mono text-sm uppercase tracking-[0.2em]">
          {repeatedText}
        </span>
        <span className="inline-block pr-4 font-mono text-sm uppercase tracking-[0.2em]">
          {repeatedText}
        </span>
      </div>
    </div>
  );
}
