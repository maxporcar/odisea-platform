import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Test from "./pages/Test";
import PaisesIndex from "./pages/paises/index";
import CountryDetail from "./pages/paises/[countryId]/index";
import CitiesIndex from "./pages/paises/[countryId]/ciudades/index";
import CityDetail from "./pages/paises/[countryId]/ciudades/[slug]";
import UniversitiesIndex from "./pages/paises/[countryId]/universidades/index";
import UniversityDetail from "./pages/paises/[countryId]/universidades/[uniId]";
import Testimonios from "./pages/Testimonios";
import Comunidad from "./pages/Comunidad";
import Login from "./pages/Login";
import AdminUsers from "./pages/AdminUsers";
import PremiumSuccess from "./pages/PremiumSuccess";
import PremiumCancel from "./pages/PremiumCancel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/test" element={<Layout><Test /></Layout>} />
              {/* Redirect old map route to countries */}
              <Route path="/mapa" element={<Navigate to="/paises" replace />} />
              <Route path="/paises" element={<Layout><PaisesIndex /></Layout>} />
              <Route path="/paises/:countryId" element={<Layout><CountryDetail /></Layout>} />
              <Route path="/paises/:countryId/ciudades" element={<Layout><CitiesIndex /></Layout>} />
              <Route path="/paises/:countryId/ciudades/:slug" element={<Layout><CityDetail /></Layout>} />
              <Route path="/paises/:countryId/universidades" element={<Layout><UniversitiesIndex /></Layout>} />
              <Route path="/paises/:countryId/universidades/:uniId" element={<Layout><UniversityDetail /></Layout>} />
              <Route path="/testimonios" element={<Layout><Testimonios /></Layout>} />
              <Route path="/comunidad" element={<Layout><Comunidad /></Layout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/premium-success" element={<PremiumSuccess />} />
              <Route path="/premium-cancel" element={<PremiumCancel />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
