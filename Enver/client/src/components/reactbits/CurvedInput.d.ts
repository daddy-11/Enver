import React from 'react';

export interface CurvedInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  onSubmit?: (val: string) => void;
  placeholder?: string;
  buttonText?: string;
  type?: string;
  name?: string;
  ariaLabel?: string;
  theme?: 'dark' | 'light';
  width?: number | string;
  bend?: number;
  height?: number;
  cornerRadius?: number;
  borderWidth?: number;
  fontSize?: number;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  borderColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  iconColor?: string;
  shadowSize?: 'sm' | 'md' | 'lg';
  shadowColor?: string;
  showButton?: boolean;
  showIcon?: boolean;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

declare const CurvedInput: React.FC<CurvedInputProps>;
export default CurvedInput;
