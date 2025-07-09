
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/contacts" element={<div className="text-center py-12"><h1 className="text-2xl font-bold text-gray-900">Contatos - Em Desenvolvimento</h1></div>} />
            <Route path="/documents" element={<div className="text-center py-12"><h1 className="text-2xl font-bold text-gray-900">Documentos - Em Desenvolvimento</h1></div>} />
            <Route path="/travel" element={<div className="text-center py-12"><h1 className="text-2xl font-bold text-gray-900">Viagens - Em Desenvolvimento</h1></div>} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
