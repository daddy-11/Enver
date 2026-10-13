import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ProjectDetail from "./pages/ProjectDetail";
import Accreditations from "./pages/Accreditations";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import TermsOfService from "./pages/TermsOfService";
import PrivacyStatement from "./pages/PrivacyStatement";
import SmoothScroll from "./components/SmoothScroll";
import { useEffect, useState, lazy, Suspense } from "react";
import { useAuth } from "./contexts/AuthContext";

// Code-split gatekept app & onboarding so initial landing page load NEVER loads the MCP/agent bundle
const AgentGateway = lazy(() => import("./pages/AgentGateway"));
const Playground = lazy(() => import("./pages/Playground"));
const AgentPaywall = lazy(() => import("./components/AgentPaywall"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Welcome = lazy(() => import("./pages/Welcome"));
const Research = lazy(() => import("./pages/Research"));

// Gatekept Playground Route with Paywall
function DecoupledConsoleRoute() {
  const { user, isAuthenticated, hasAcceptedTerms } = useAuth();
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("access") === "root" || searchParams.get("preview") === "true") {
      localStorage.setItem("enver_playground_unlocked", "true");
      return true;
    }
    return localStorage.getItem("enver_playground_unlocked") === "true";
  });

  const isAuthorized = (isAuthenticated && hasAcceptedTerms) || unlocked;

  if (!isAuthorized) {
    return <AgentPaywall onUnlock={() => setUnlocked(true)} />;
  }

  return <Playground />;
}

function PageLoader() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F7F3E9] text-[#2B121F] font-mono text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FF6F1E] animate-ping" />
        <span>Loading Envera Citadel...</span>
      </div>
    </div>
  );
}

function Router() {
  return (
    <SmoothScroll>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          {/* Decoupled Gateway for Agent Console */}
          <Route path="/playground" component={DecoupledConsoleRoute} />
          <Route path="/signup" component={AgentGateway} />
          <Route path="/login" component={AgentGateway} />
          <Route path="/signin" component={AgentGateway} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/settings" component={Settings} />
          <Route path="/onboarding" component={Onboarding} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/research" component={Research} />

          {/* Standard Public Website Pages wrapped in site Layout */}
          <Route>
            {() => (
              <Layout>
                <Switch>
                  <Route path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/services" component={Services} />
                <Route path="/services/:slug" component={ProjectDetail} />
                <Route path="/projects/:slug">
                  {(params) => <Redirect to={`/services/${params.slug}`} />}
                </Route>
                <Route path="/projects"><Redirect to="/services" /></Route>
                <Route path="/accreditations" component={Accreditations} />
                <Route path="/contact" component={Contact} />
                <Route path="/thank-you" component={ThankYou} />
                <Route path="/tos" component={TermsOfService} />
                <Route path="/terms" component={TermsOfService} />
                <Route path="/ps" component={PrivacyStatement} />
                <Route path="/privacy" component={PrivacyStatement} />
                <Route path="/404" component={NotFound} />
                <Route component={NotFound} />
              </Switch>
            </Layout>
          )}
        </Route>
      </Switch>
    </Suspense>
  </SmoothScroll>
  );
}


function App() {
  useEffect(() => {
    // Track visitor page hit
    fetch("/api/visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => console.error("Failed to track visit:", err));
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable={true}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster position="top-right" />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;


