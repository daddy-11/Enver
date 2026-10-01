'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  ShieldCheck,
  Lock,
  Cpu,
  Sparkles,
  Code,
  Globe,
  Check,
  AlertCircle,
  RotateCcw,
  Loader2
} from 'lucide-react';
import './CallChip.css';

export default function CallChip({
  icon = 'terminal',
  name = 'call',
  argument = '',
  status = 'done',
  expectedMs = 2000,
  size = 34,
  radius = 10,
  color = 'currentColor',
  surfaceColor = '#1e293b',
  progressColor = 'currentColor',
  progressOpacity = 0.08,
  doneColor = '#22c55e',
  errorColor = '#ef4444',
  washOpacity = 0.14,
  shake = 6,
  showTimer = true,
  onRetry,
  className = '',
  style = {}
}) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const startRef = useRef(0);

  useEffect(() => {
    let interval;
    if (status === 'running') {
      startRef.current = performance.now();
      setElapsedMs(0);
      interval = setInterval(() => {
        setElapsedMs(Math.round(performance.now() - startRef.current));
      }, 50);
    } else if (status === 'done' && elapsedMs === 0) {
      setElapsedMs(Math.min(expectedMs, 850));
    }
    return () => clearInterval(interval);
  }, [status, expectedMs]);

  const progressPercent = Math.min(100, Math.round((elapsedMs / (expectedMs || 1000)) * 100));

  const renderIcon = () => {
    if (React.isValidElement(icon)) return icon;
    const iconSize = Math.max(12, Math.round(size * 0.42));
    switch (icon) {
      case 'terminal':
      case 'bash':
        return <Terminal size={iconSize} />;
      case 'shield':
      case 'arbiter':
        return <ShieldCheck size={iconSize} />;
      case 'lock':
      case 'cerberus':
        return <Lock size={iconSize} />;
      case 'cpu':
      case 'artificer':
        return <Cpu size={iconSize} />;
      case 'globe':
      case 'web':
        return <Globe size={iconSize} />;
      case 'code':
        return <Code size={iconSize} />;
      default:
        return <Sparkles size={iconSize} />;
    }
  };

  const statusBg =
    status === 'done'
      ? `color-mix(in srgb, ${doneColor} ${Math.round(washOpacity * 100)}%, ${surfaceColor})`
      : status === 'failed'
      ? `color-mix(in srgb, ${errorColor} ${Math.round(washOpacity * 100)}%, ${surfaceColor})`
      : surfaceColor;

  const statusBorder =
    status === 'done'
      ? `color-mix(in srgb, ${doneColor} 35%, transparent)`
      : status === 'failed'
      ? `color-mix(in srgb, ${errorColor} 45%, transparent)`
      : 'var(--cc-border, rgba(255, 255, 255, 0.12))';

  return (
    <motion.div
      className={`call-chip ${className} ${status}`}
      style={{
        '--cc-size': `${size}px`,
        '--cc-radius': `${radius}px`,
        '--cc-color': color,
        '--cc-surface': statusBg,
        '--cc-border-color': statusBorder,
        ...style
      }}
      animate={
        status === 'failed' && shake > 0
          ? { x: [0, -shake, shake, -shake * 0.6, shake * 0.6, 0] }
          : { x: 0 }
      }
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {/* Running Progress Bar Fill */}
      {status === 'running' && (
        <div
          className="call-chip-progress"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: progressColor,
            opacity: progressOpacity
          }}
        />
      )}

      {/* Leading Icon with Status Dot */}
      <div className="call-chip-icon-box">
        {status === 'running' ? (
          <Loader2 size={Math.round(size * 0.42)} className="call-chip-spinner animate-spin" />
        ) : (
          renderIcon()
        )}
      </div>

      {/* Function / Command Name */}
      <span className="call-chip-name">{name}</span>

      {/* Argument snippet (if any) */}
      {argument && (
        <span className="call-chip-arg font-mono" title={argument}>
          {argument}
        </span>
      )}

      {/* Trailing Status Badge & Timer */}
      <div className="call-chip-trailing">
        {status === 'done' && (
          <span className="call-chip-status-done" style={{ color: doneColor }}>
            <Check size={12} strokeWidth={2.5} />
          </span>
        )}
        {status === 'failed' && (
          <span className="call-chip-status-error" style={{ color: errorColor }}>
            <AlertCircle size={12} strokeWidth={2.5} />
          </span>
        )}
        {showTimer && elapsedMs > 0 && (
          <span className="call-chip-timer font-mono">
            {(elapsedMs / 1000).toFixed(1)}s
          </span>
        )}
        {status === 'failed' && onRetry && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRetry();
            }}
            className="call-chip-retry-btn"
            title="Retry invocation"
          >
            <RotateCcw size={11} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
