import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  fallbackTitle?: string;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * VisualErrorBoundary
 * Prevents WebGL2 / Canvas context loss or shader crash from collapsing the page.
 * Gracefully renders an adaptive visual fallback instead of an unhandled error screen.
 */
export default class VisualErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(
      `[VisualErrorBoundary] Caught render exception in ${this.props.componentName || "3D/Canvas component"}:`,
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-[#FAF7F0] border border-[#E5DFD1] rounded-3xl text-center select-none">
          <div className="w-10 h-10 rounded-full bg-[#FF6F1E]/15 border border-[#FF6F1E]/30 flex items-center justify-center mb-3 text-[#FF6F1E] font-bold text-sm">
            ⚡
          </div>
          <h4 className="font-heading font-bold text-[#2B121F] text-base mb-1">
            {this.props.fallbackTitle || "Adaptive Visual Fallback Active"}
          </h4>
          <p className="font-sans text-xs text-[#7A6F68] max-w-md leading-relaxed mb-4">
            Hardware WebGL2 acceleration is unavailable on this browser or GPU thread. The platform has switched to safe 2D accelerated presentation mode.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-1.5 rounded-full bg-[#2B121F] text-white hover:bg-[#FF6F1E] font-mono text-xs font-semibold transition shadow-2xs"
          >
            Retry WebGL Context
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
