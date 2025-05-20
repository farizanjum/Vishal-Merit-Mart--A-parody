
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MockTest from "./pages/MockTest";
import Exam from "./pages/Exam";
import Result from "./pages/Result";
import Certificate from "./pages/Certificate";
import TopperList from "./pages/TopperList";
import Layout from "./components/Layout";
import Cutoff from "./pages/Cutoff";
import MemeGenerator from "./pages/MemeGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/mock-test" element={<Layout><MockTest /></Layout>} />
          <Route path="/exam" element={<Layout><Exam /></Layout>} />
          <Route path="/result" element={<Layout><Result /></Layout>} />
          <Route path="/certificate" element={<Layout><Certificate /></Layout>} />
          <Route path="/topper-list" element={<Layout><TopperList /></Layout>} />
          <Route path="/cutoff" element={<Layout><Cutoff /></Layout>} />
          <Route path="/meme-generator" element={<Layout><MemeGenerator /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
