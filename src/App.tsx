import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CheckPage from "./pages/CheckPage";
import ReportPage from "./pages/ReportPage";
import TestPage from "./pages/TestPage";
import CasesPage from "./pages/CasesPage";
import StatsPage from "./pages/StatsPage";
import SafetyTipsPage from "./pages/SafetyTipsPage";
import ThankYouPage from "./pages/ThankYouPage";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import AIChatBot from "./components/AIChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AIChatBot />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/check" element={<CheckPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/safety-tips" element={<SafetyTipsPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
