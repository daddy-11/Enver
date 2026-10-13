import React from 'react';

export interface TopographyProps {
  lowColor?: string;
  midColor?: string;
  highColor?: string;
  speed?: number;
  morphAmount?: number;
  morphSpeed?: number;
  bands?: number;
  thickness?: number;
  scale?: number;
  pixelSize?: number;
  glow?: number;
  colorMode?: 'elevation' | 'uniform' | 'alternating';
  contrast?: number;
  brightness?: number;
  fillBands?: boolean;
  opacity?: number;
  grain?: boolean;
  grainIntensity?: number;
  mouseInteraction?: boolean;
  mouseRadius?: number;
  mouseStrength?: number;
  lightMode?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare const Topography: React.FC<TopographyProps>;
export default Topography;
