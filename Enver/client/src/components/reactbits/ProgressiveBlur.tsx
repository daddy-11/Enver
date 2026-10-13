import React from "react";

export interface ProgressiveBlurProps {
  direction?: "top" | "bottom" | "left" | "right";
  blurLayers?: number;
  maxBlur?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Motion Primitives style Progressive Blur Component
 * Layered backdrop-filter blur segments with progressive alpha masks
 * Dissolves hard edges into buttery smooth glass transitions.
 */
export default function ProgressiveBlur({
  direction = "bottom",
  blurLayers = 6,
  maxBlur = 20,
  className = "",
  style = {}
}: ProgressiveBlurProps) {
  const layers = Array.from({ length: blurLayers }, (_, index) => {
    const step = (index + 1) / blurLayers;
    const blur = Math.pow(step, 2) * maxBlur;
    const startPercent = (index / blurLayers) * 100;
    const endPercent = ((index + 1) / blurLayers) * 100;

    return {
      blur: Number(blur.toFixed(2)),
      mask: `linear-gradient(to ${direction}, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${endPercent}%)`
    };
  });

  return (
    <div className={`relative pointer-events-none overflow-hidden ${className}`.trim()} style={style}>
      {layers.map((layer, i) => (
        <div
          key={i}
          className="absolute inset-0 pointer-events-none"
          style={{
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: layer.mask,
            WebkitMaskImage: layer.mask
          }}
        />
      ))}
    </div>
  );
}
