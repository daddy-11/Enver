import React from 'react';

export interface CallChipProps {
  icon?: 'terminal' | 'bash' | 'shield' | 'arbiter' | 'lock' | 'cerberus' | 'cpu' | 'artificer' | 'globe' | 'web' | 'code' | 'sparkle' | React.ReactNode;
  name: string;
  argument?: string;
  status?: 'pending' | 'running' | 'done' | 'failed' | 'cancelled';
  expectedMs?: number;
  size?: number;
  radius?: number;
  color?: string;
  surfaceColor?: string;
  progressColor?: string;
  progressOpacity?: number;
  doneColor?: string;
  errorColor?: string;
  washOpacity?: number;
  shake?: number;
  showTimer?: boolean;
  onRetry?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

declare const CallChip: React.FC<CallChipProps>;
export default CallChip;
