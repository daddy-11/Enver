/**
 * Azure Application Insights Telemetry Client
 * Automatically initialized via the official Microsoft Azure Monitor SDK in index.html
 */

declare global {
  interface Window {
    appInsights?: {
      trackEvent: (event: { name: string; properties?: Record<string, any> }) => void;
      trackPageView: (pageView?: { name?: string; uri?: string; properties?: Record<string, any> }) => void;
      trackException: (exception: { exception: Error; properties?: Record<string, any> }) => void;
      trackMetric: (metric: { name: string; average: number; properties?: Record<string, any> }) => void;
      setAuthenticatedUserContext: (authenticatedUserId: string, accountId?: string) => void;
      clearAuthenticatedUserContext: () => void;
      flush: () => void;
    };
  }
}

export function trackEvent(name: string, properties?: Record<string, any>) {
  try {
    if (typeof window !== "undefined" && window.appInsights?.trackEvent) {
      window.appInsights.trackEvent({ name, properties });
    }
  } catch (err) {
    // Non-blocking telemetry
    console.debug("[Telemetry] Failed to track event:", name, err);
  }
}

export function trackPageView(name?: string, uri?: string, properties?: Record<string, any>) {
  try {
    if (typeof window !== "undefined" && window.appInsights?.trackPageView) {
      window.appInsights.trackPageView({ name, uri, properties });
    }
  } catch (err) {
    console.debug("[Telemetry] Failed to track page view:", name, err);
  }
}

export function trackException(error: Error, properties?: Record<string, any>) {
  try {
    if (typeof window !== "undefined" && window.appInsights?.trackException) {
      window.appInsights.trackException({ exception: error, properties });
    }
  } catch (err) {
    console.debug("[Telemetry] Failed to track exception:", err);
  }
}

export function identifyUser(userId: string, accountId?: string) {
  try {
    if (typeof window !== "undefined" && window.appInsights?.setAuthenticatedUserContext) {
      window.appInsights.setAuthenticatedUserContext(userId, accountId);
    }
  } catch (err) {
    console.debug("[Telemetry] Failed to set user context:", err);
  }
}
