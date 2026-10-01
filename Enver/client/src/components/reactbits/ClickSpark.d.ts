import React from 'react';

export interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: string;
  extraScale?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

declare function ClickSpark(props: ClickSparkProps): JSX.Element;

export default ClickSpark;
