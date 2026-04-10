import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "./pages/home";
import ApplyPage from "./pages/apply";
import ResumeBuilder from "./pages/resume-builder";
import About from "./pages/about";
import Contact from "./pages/contact";
import Careers from "./pages/careers";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsAndConditions from "./pages/terms";
import RefundPolicy from "./pages/refund-policy";
import AdminLogin from "./pages/admin/login";
import AdminDashboard from "./pages/admin/dashboard";
import AdminJobs from "./pages/admin/jobs";
import AdminApplications from "./pages/admin/applications";
import AdminMessages from "./pages/admin/messages";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/careers" component={Careers} />
      <Route path="/apply" component={ApplyPage} />
      <Route path="/apply/:jobId" component={ApplyPage} />
      <Route path="/resume-builder" component={ResumeBuilder} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsAndConditions} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/jobs" component={AdminJobs} />
      <Route path="/admin/applications" component={AdminApplications} />
      <Route path="/admin/messages" component={AdminMessages} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
