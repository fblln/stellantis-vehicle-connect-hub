
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import Index from "./pages/Index";
import QuickStart from "./pages/QuickStart";
import Authentication from "./pages/Authentication";
import ApiReference from "./pages/ApiReference";
import Webhooks from "./pages/Webhooks";
import SDKs from "./pages/SDKs";
import BestPractices from "./pages/BestPractices";
import ApiExplorer from "./pages/ApiExplorer";
import ApiStatus from "./pages/ApiStatus";
import Changelog from "./pages/Changelog";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="stellantis-docs-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quickstart" element={<QuickStart />} />
            <Route path="/authentication" element={<Authentication />} />
            <Route path="/api-reference" element={<ApiReference />} />
            <Route path="/webhooks" element={<Webhooks />} />
            <Route path="/sdks" element={<SDKs />} />
            <Route path="/best-practices" element={<BestPractices />} />
            <Route path="/api-explorer" element={<ApiExplorer />} />
            <Route path="/api-status" element={<ApiStatus />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
