import React from 'react';

export interface MagicRingsProps {
  color?: string;
  colorTwo?: string;
  speed?: number;
  ringCount?: number;
  attenuation?: number;
  lineThickness?: number;
  baseRadius?: number;
  radiusStep?: number;
  scaleRate?: number;
  opacity?: number;
  blur?: number;
  noiseAmount?: number;
  rotation?: number;
  ringGap?: number;
  fadeIn?: number;
  fadeOut?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  hoverScale?: number;
  parallax?: number;
  clickBurst?: boolean;
  alphaMode?: 'luminance' | 'coverage';
  className?: string;
  style?: React.CSSProperties;
}

declare function MagicRings(props: MagicRingsProps): JSX.Element;

export default MagicRings;
