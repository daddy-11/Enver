import React from 'react';

export interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
  style?: React.CSSProperties;
}

declare function CurvedLoop(props: CurvedLoopProps): JSX.Element;

export default CurvedLoop;
