'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './SpringCheck.css';

export default function SpringCheck({
  label = '',
  checked,
  defaultChecked = false,
  onChange,
  color = 'currentColor',
  fillColor = '#0284C7',
  checkColor = '#FFFFFF',
  boxSize = 24,
  boxRadius = 8,
  fontSize = 15,
  bounce = 0.2,
  strikeLag = 0.12,
  doneOpacity = 0.45,
  strike = 'left',
  disabled = false,
  className = '',
  style = {}
}) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? checked : internalChecked;

  useEffect(() => {
    if (isControlled) {
      setInternalChecked(checked);
    }
  }, [checked, isControlled]);

  const handleToggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  };

  const springTransition = {
    type: 'spring',
    stiffness: 400,
    damping: Math.max(12, 30 - bounce * 40),
    mass: 0.8
  };

  return (
    <label
      className={`spring-check-root ${className} ${disabled ? 'disabled' : ''}`}
      style={{
        '--sc-color': color,
        '--sc-fill': fillColor,
        '--sc-check': checkColor,
        '--sc-size': `${boxSize}px`,
        '--sc-radius': `${boxRadius}px`,
        '--sc-font': `${fontSize}px`,
        '--sc-done-opacity': doneOpacity,
        ...style
      }}
      onClick={(e) => {
        e.preventDefault();
        handleToggle();
      }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={handleToggle}
        className="spring-check-input"
        aria-checked={isChecked}
      />

      <motion.div
        className="spring-check-box"
        animate={{
          scale: isChecked ? [1, 1 - bounce * 0.8, 1 + bounce * 0.4, 1] : 1,
          backgroundColor: isChecked ? fillColor : 'transparent',
          borderColor: isChecked ? fillColor : 'var(--sc-color)'
        }}
        transition={springTransition}
      >
        <AnimatePresence mode="wait">
          {isChecked && (
            <svg
              className="spring-check-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke={checkColor}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{
                  duration: 0.22,
                  ease: [0.23, 1, 0.32, 1]
                }}
              />
            </svg>
          )}
        </AnimatePresence>
      </motion.div>

      {label && (
        <span className="spring-check-label-wrapper">
          <motion.span
            className="spring-check-label"
            animate={{
              opacity: isChecked ? doneOpacity : 1
            }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.span>
          {strike !== 'none' && (
            <motion.span
              className="spring-check-strike-line"
              style={{
                transformOrigin: strike === 'right' ? 'right center' : 'left center'
              }}
              initial={false}
              animate={{
                scaleX: isChecked ? 1 : 0
              }}
              transition={{
                delay: isChecked ? strikeLag : 0,
                duration: 0.24,
                ease: [0.23, 1, 0.32, 1]
              }}
            />
          )}
        </span>
      )}
    </label>
  );
}
