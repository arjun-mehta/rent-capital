import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SelectPlatform from "./pages/SelectPlatform";
import ConnectPatreon from "./pages/ConnectPatreon";

import Processing from "./pages/Processing";
import Offers from "./pages/Offers";
import EntityDetails from "./pages/EntityDetails";
// import SignIRSForm from "./pages/SignIRSForm"; // Commented out - may need in future
import BusinessVerification from "./pages/BusinessVerification";
import Contract from "./pages/Contract";
import Dashboard from "./pages/Dashboard";
import DashboardEstablished from "./pages/DashboardEstablished";
import { HomePage } from "./pages/homepage";
import ForPropertyManagers from "./pages/ForPropertyManagers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/for-property-managers" element={<ForPropertyManagers />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/select-platform" element={<SelectPlatform />} />
            <Route path="/connect-patreon" element={<ConnectPatreon />} />
            <Route path="/processing" element={<Processing />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/entity-details" element={<EntityDetails />} />
            {/* <Route path="/sign-irs-form" element={<SignIRSForm />} /> */}
            <Route
              path="/business-verification"
              element={<BusinessVerification />}
            />
            <Route path="/contract" element={<Contract />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/dashboard-established"
              element={<DashboardEstablished />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
