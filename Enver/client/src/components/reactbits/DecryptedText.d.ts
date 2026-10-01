import React from 'react';

export interface DecryptedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'click' | 'view' | 'inViewHover' | 'mount';
  clickMode?: 'once' | 'toggle';
}

declare const DecryptedText: React.FC<DecryptedTextProps>;
export default DecryptedText;
