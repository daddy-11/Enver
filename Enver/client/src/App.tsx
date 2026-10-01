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
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Accreditations from "./pages/Accreditations";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import TermsOfService from "./pages/TermsOfService";
import PrivacyStatement from "./pages/PrivacyStatement";
import SmoothScroll from "./components/SmoothScroll";
import { useEffect, lazy, Suspense } from "react";

// Code-split gatekept app & onboarding so initial landing page load NEVER loads the MCP/agent bundle
const AgentGateway = lazy(() => import("./pages/AgentGateway"));
const Playground = lazy(() => import("./pages/Playground"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Welcome = lazy(() => import("./pages/Welcome"));

// Decoupled Launch Gateway: Public visitors see sign-up & production staging gate
function DecoupledConsoleRoute() {
  const search = typeof window !== "undefined" ? window.location.search : "";
  const isRootOverride = search.includes("access=root") || search.includes("preview=true");
  if (isRootOverride) {
    return <Playground />;
  }
  return <AgentGateway />;
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
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/settings" component={Settings} />
          <Route path="/onboarding" component={Onboarding} />
          <Route path="/welcome" component={Welcome} />

          {/* Standard Public Website Pages wrapped in site Layout */}
          <Route>
            {() => (
              <Layout>
                <Switch>
                  <Route path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/services" component={Services} />
                <Route path="/projects" component={Projects} />
                <Route path="/projects/:slug" component={ProjectDetail} />
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
      <ThemeProvider defaultTheme="light">
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


