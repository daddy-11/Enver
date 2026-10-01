'use client';

import React, { useState, Children, useRef, useLayoutEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import './Stepper.css';

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  renderStepIndicator,
  theme = 'auto',
  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const effectiveTheme = useMemo(() => {
    if (theme === 'light' || theme === 'dark') return theme;
    if (typeof window !== 'undefined' && document.documentElement.classList.contains('dark')) {
      return 'dark';
    }
    return 'light';
  }, [theme]);

  const updateStep = (newStep) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  const handleRestart = () => {
    setDirection(-1);
    updateStep(1);
  };

  return (
    <div className="outer-container" data-theme={effectiveTheme} {...rest}>
      <div
        className={`step-circle-container ${effectiveTheme === 'dark' ? 'dark' : 'light'} ${stepCircleContainerClassName}`}
      >
        <div className={`step-indicator-row ${stepContainerClassName}`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    theme={effectiveTheme}
                    onClickStep={(clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} theme={effectiveTheme} />}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`step-content-default ${contentClassName}`}
        >
          {isCompleted ? (
            <div className="step-default text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
                <CheckIcon className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-heading font-bold text-current">Ready to Deliberate with Neuv</h3>
              <p className="text-xs opacity-75 font-mono mt-1 max-w-sm mx-auto">
                You now understand Neuv&apos;s identity recognition, natural reasoning, enterprise citadels, and cloud persistence.
              </p>
            </div>
          ) : (
            stepsArray[currentStep - 1]
          )}
        </StepContentWrapper>

        <div className={`footer-container ${footerClassName}`}>
          <div className={`footer-nav ${isCompleted ? 'end' : currentStep !== 1 ? 'spread' : 'end'}`}>
            {isCompleted ? (
              <button
                type="button"
                onClick={handleRestart}
                className="back-button"
              >
                Restart Guide
              </button>
            ) : (
              <>
                {currentStep !== 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className={`back-button ${currentStep === 1 ? 'inactive' : ''}`}
                    {...backButtonProps}
                  >
                    {backButtonText}
                  </button>
                )}
                <button
                  type="button"
                  onClick={isLastStep ? handleComplete : handleNext}
                  className="next-button"
                  {...nextButtonProps}
                >
                  {isLastStep ? 'Complete' : nextButtonText}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: parentHeight || 'auto' }}
      transition={{ type: 'spring', duration: 0.35, bounce: 0 }}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <SlideTransition
          key={isCompleted ? 'completed' : currentStep}
          direction={direction}
          onHeightReady={(h) => setParentHeight(h)}
        >
          {children}
        </SlideTransition>
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', left: 0, right: 0, top: 0, width: '100%' }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: (dir) => ({
    x: dir >= 0 ? 30 : -30,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (dir) => ({
    x: dir >= 0 ? -30 : 30,
    opacity: 0
  })
};

export function Step({ children, className = '' }) {
  return <div className={`step-default ${className}`}>{children}</div>;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators, theme }) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';
  const isLight = theme === 'light';

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="step-indicator"
      style={disableStepIndicators ? { pointerEvents: 'none', opacity: 0.5 } : {}}
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: isLight ? '#E2E8F0' : '#1E293B',
            color: isLight ? '#475569' : '#94A3B8'
          },
          active: {
            scale: 1,
            backgroundColor: '#0284C7',
            color: '#FFFFFF'
          },
          complete: {
            scale: 1,
            backgroundColor: '#0284C7',
            color: '#FFFFFF'
          }
        }}
        transition={{ duration: 0.3 }}
        className="step-indicator-inner"
      >
        {status === 'complete' ? (
          <CheckIcon className="check-icon" />
        ) : status === 'active' ? (
          <div className="active-dot" />
        ) : (
          <span className="step-number">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete, theme }) {
  const isLight = theme === 'light';
  const lineVariants = {
    incomplete: { width: 0, backgroundColor: 'transparent' },
    complete: { width: '100%', backgroundColor: '#0284C7' }
  };

  return (
    <div className={`step-connector ${isLight ? 'light' : 'dark'}`}>
      <motion.div
        className="step-connector-inner"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
