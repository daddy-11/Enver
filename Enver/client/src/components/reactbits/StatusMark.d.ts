import React from 'react';

export interface StatusMarkProps {
  status?: 'pending' | 'running' | 'done' | 'failed' | 'cancelled';
  progress?: number;
  label?: string;
  color?: string;
  doneColor?: string;
  errorColor?: string;
  size?: number;
  strokeWidth?: number;
  dashes?: number;
  fontSize?: number;
  spinDuration?: number;
  arcLength?: number;
  drawDuration?: number;
  fillOpacity?: number;
  strike?: boolean;
  strikeDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

declare const StatusMark: React.FC<StatusMarkProps>;
export default StatusMark;
