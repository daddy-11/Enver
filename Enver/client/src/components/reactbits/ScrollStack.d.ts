import React from 'react';

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

export interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
}

export declare const ScrollStackItem: React.FC<ScrollStackItemProps>;
declare const ScrollStack: React.FC<ScrollStackProps>;
export default ScrollStack;
