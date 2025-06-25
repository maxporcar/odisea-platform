
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Mapa from "./pages/Mapa";
import Paises from "./pages/Paises";
import PaisDetalle from "./pages/PaisDetalle";
import Testimonios from "./pages/Testimonios";
import Comunidad from "./pages/Comunidad";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/test" element={<Layout><Test /></Layout>} />
            <Route path="/mapa" element={<Layout><Mapa /></Layout>} />
            <Route path="/paises" element={<Layout><Paises /></Layout>} />
            <Route path="/paises/:id" element={<Layout><PaisDetalle /></Layout>} />
            <Route path="/testimonios" element={<Layout><Testimonios /></Layout>} />
            <Route path="/comunidad" element={<Layout><Comunidad /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
