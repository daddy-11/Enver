import { FC } from 'react';

export interface MetaBallsProps {
  className?: string;
  color?: string;
  speed?: number;
  enableMouseInteraction?: boolean;
  hoverSmoothness?: number;
  animationSize?: number;
  ballCount?: number;
  clumpFactor?: number;
  cursorBallSize?: number;
  cursorBallColor?: string;
  enableTransparency?: boolean;
}

declare const MetaBalls: FC<MetaBallsProps>;
export default MetaBalls;
