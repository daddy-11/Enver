import React, { Component, ReactNode } from "react";
import { ShieldAlert, RotateCcw, Home, Eye, Sparkles } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  showDetails: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, showDetails: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, showDetails: false };
  }

  handleRestartSafeMode = () => {
    try {
      sessionStorage.setItem("enver_safe_mode", "true");
    } catch {
      /* ignore */
    }
    window.location.reload();
  };

  handleReload = () => {
    window.location.reload();
  };

  handleReturnHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      const isWebGLError =
        this.state.error?.message?.toLowerCase().includes("webgl") ||
        this.state.error?.message?.toLowerCase().includes("context") ||
        this.state.error?.stack?.toLowerCase().includes("webgl");

      return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#F7F3E9] text-[#2B121F] font-sans selection:bg-[#2B121F] selection:text-[#F7F3E9]">
          <div className="w-full max-w-xl rounded-3xl bg-white border border-[#E5DFD1] p-8 shadow-[0_24px_64px_rgba(43,18,31,0.08)] flex flex-col items-center text-center">
            {/* Crest / Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF6F1E] to-[#4A2237] p-0.5 shadow-md mb-5 flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center">
                <ShieldAlert className="w-7 h-7 text-[#FF6F1E]" />
              </div>
            </div>

            {/* Title */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#E5DFD1] text-[11px] font-mono font-bold text-[#FF6F1E] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF6F1E] animate-pulse" />
              <span>CITADEL SYSTEM RECOVERY GATEWAY</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#2B121F] tracking-tight mb-2">
              {isWebGLError
                ? "Graphics Acceleration Notice"
                : "Operational Exception Caught"}
            </h1>

            <p className="text-sm font-sans text-[#7A6F68] max-w-md leading-relaxed mb-6">
              {isWebGLError
                ? "Your current browser or GPU configuration encountered a WebGL2 acceleration limit. The platform can instantly recover in 2D hardware-accelerated Safe Mode."
                : "An unexpected runtime event occurred. Sovereign state was safely captured without data leakage."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full mb-6">
              {isWebGLError && (
                <button
                  type="button"
                  onClick={this.handleRestartSafeMode}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FF6F1E] hover:bg-[#E85B0B] text-white font-mono text-xs font-bold tracking-wider transition shadow-md cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Launch in Safe Mode (Disable 3D)</span>
                </button>
              )}

              <button
                type="button"
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#2B121F] hover:bg-[#401C30] text-white font-mono text-xs font-bold tracking-wider transition shadow-sm cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reload Citadel</span>
              </button>

              <button
                type="button"
                onClick={this.handleReturnHome}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#FAF7F0] border border-[#E5DFD1] text-[#2B121F] font-mono text-xs font-bold tracking-wider transition cursor-pointer"
              >
                <Home size={14} />
                <span>Return to Overview</span>
              </button>
            </div>

            {/* Expandable Technical Telemetry */}
            <div className="w-full border-t border-[#E5DFD1] pt-4">
              <button
                type="button"
                onClick={() => this.setState((prev) => ({ showDetails: !prev.showDetails }))}
                className="text-xs font-mono text-[#7A6F68] hover:text-[#2B121F] inline-flex items-center gap-1.5 transition"
              >
                <Eye size={12} />
                <span>{this.state.showDetails ? "Hide Diagnostic Telemetry" : "View Diagnostic Telemetry"}</span>
              </button>

              {this.state.showDetails && (
                <div className="mt-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E5DFD1] text-left max-h-48 overflow-y-auto">
                  <div className="text-[11px] font-mono font-bold text-[#FF6F1E] mb-1">
                    {this.state.error?.name || "Error"}: {this.state.error?.message}
                  </div>
                  <pre className="text-[10px] font-mono text-[#7A6F68] whitespace-pre-wrap break-all leading-tight">
                    {this.state.error?.stack}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
