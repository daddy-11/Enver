import React from 'react';

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: React.ReactNode;
  nextButtonText?: React.ReactNode;
  disableStepIndicators?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  renderStepIndicator?: (props: {
    step: number;
    currentStep: number;
    onStepClick: (step: number) => void;
  }) => React.ReactNode;
}

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export declare function Step(props: StepProps): JSX.Element;

declare function Stepper(props: StepperProps): JSX.Element;

export default Stepper;
