import React from 'react';

export interface SpringCheckProps {
  label?: string | React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  color?: string;
  fillColor?: string;
  checkColor?: string;
  boxSize?: number;
  boxRadius?: number;
  fontSize?: number;
  bounce?: number;
  strikeLag?: number;
  doneOpacity?: number;
  strike?: 'left' | 'right' | 'none';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare const SpringCheck: React.FC<SpringCheckProps>;
export default SpringCheck;
