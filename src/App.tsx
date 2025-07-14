
import { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Index from "./pages/Index";
import Home from "./pages/Home";
import Mapa from "./pages/Mapa";
import Paises from "./pages/Paises";
import PaisDetalle from "./pages/PaisDetalle";
import Testimonios from "./pages/Testimonios";
import Test from "./pages/Test";
import Comunidad from "./pages/Comunidad";
import Login from "./pages/Login";
import Subscription from "./pages/Subscription";
import Success from "./pages/Success";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import PaisesIndex from "./pages/paises/index";
import CountryDetail from "./pages/paises/[countryId]/index";
import CitiesIndex from "./pages/paises/[countryId]/ciudades/index";
import CityDetail from "./pages/paises/[countryId]/ciudades/[slug]";
import UniversitiesIndex from "./pages/paises/[countryId]/universidades/index";
import UniversityDetail from "./pages/paises/[countryId]/universidades/[uniId]";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/mapa" element={<Mapa />} />
                <Route path="/paises-old" element={<Paises />} />
                <Route path="/pais/:id" element={<PaisDetalle />} />
                <Route path="/testimonios" element={<Testimonios />} />
                <Route path="/test" element={<Test />} />
                <Route path="/comunidad" element={<Comunidad />} />
                <Route path="/login" element={<Login />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/success" element={<Success />} />
                <Route path="/admin" element={<Admin />} />
                
                {/* New routing structure */}
                <Route path="/paises" element={<PaisesIndex />} />
                <Route path="/paises/:countryId" element={<CountryDetail />} />
                <Route path="/paises/:countryId/ciudades" element={<CitiesIndex />} />
                <Route path="/paises/:countryId/ciudades/:slug" element={<CityDetail />} />
                <Route path="/paises/:countryId/universidades" element={<UniversitiesIndex />} />
                <Route path="/paises/:countryId/universidades/:uniId" element={<UniversityDetail />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </I18nextProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
