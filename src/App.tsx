import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ScheduleTestInfo from "./pages/ScheduleTestInfo";
import NotFound from "./pages/NotFound";
import InfectionsAndCkd from "./pages/resources/InfectionsAndCkd";
import CaringForYourMind from "./pages/resources/CaringForYourMind";
import ManagingStress from "./pages/resources/ManagingStress";
import EasyExercise from "./pages/resources/EasyExercise";
import LivingWithCkdGuide from "./pages/resources/LivingWithCkdGuide";
import ProtectingYourKidneys from "./pages/resources/ProtectingYourKidneys";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ScrollToTop from "./helpers/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ScrollToTop />
        <ScrollToTopButton />
        <AdminAuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/schedule-test" element={<ScheduleTestInfo />} />
          <Route path="/resources/infections-and-ckd" element={<InfectionsAndCkd />} />
          <Route path="/resources/caring-for-your-mind-during-the-festive-season" element={<CaringForYourMind />} />
          <Route path="/resources/managing-stress-for-better-renal-health" element={<ManagingStress />} />
          <Route path="/resources/easy-exercise-for-ckd" element={<EasyExercise />} />
          <Route path="/resources/living-with-ckd-guide" element={<LivingWithCkdGuide />} />
          <Route path="/resources/protecting-your-kidneys" element={<ProtectingYourKidneys />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
