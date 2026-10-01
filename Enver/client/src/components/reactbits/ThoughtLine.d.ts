import React from 'react';

export interface ThoughtLineProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  doneLabel?: string;
  renderLabel?: (label: string, isWorking: boolean) => React.ReactNode;
  glyph?: 'sparkle' | 'dot' | 'none' | React.ReactNode;
  steps?: string[];
  collapsible?: boolean;
  collapseOnSettle?: boolean;
  color?: string;
  glyphColor?: string;
  fontSize?: number;
  breathPeriod?: number;
  breathDepth?: number;
  shimmer?: boolean;
  shimmerDuration?: number;
  settleDuration?: number;
  settleBlur?: number;
  working?: boolean;
  settleAfter?: number;
  elapsed?: number;
  showTimer?: boolean;
  onSettle?: (seconds: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

declare function ThoughtLine(props: ThoughtLineProps): JSX.Element;

export default ThoughtLine;
