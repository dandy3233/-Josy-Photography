import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import GalleryList from "./pages/GalleryList";
import GalleryDetail from "./pages/GalleryDetail";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/admin/Dashboard";
import Galleries from "./pages/admin/Galleries";
import GalleryPhotos from "./pages/admin/GalleryPhotos";
import HeroImages from "./pages/admin/HeroImages";
import Clients from "./pages/admin/Clients";
import Bookings from "./pages/admin/Bookings";
import Inquiries from "./pages/admin/Inquiries";
import Services from "./pages/admin/Services";
import Testimonials from "./pages/admin/Testimonials";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/galleries" element={<GalleryList />} />
            <Route path="/gallery/:id" element={<GalleryDetail />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/hero-images" element={<ProtectedRoute requireAdmin><HeroImages /></ProtectedRoute>} />
            <Route path="/admin/galleries" element={<ProtectedRoute requireAdmin><Galleries /></ProtectedRoute>} />
            <Route path="/admin/galleries/:id/photos" element={<ProtectedRoute requireAdmin><GalleryPhotos /></ProtectedRoute>} />
            <Route path="/admin/clients" element={<ProtectedRoute requireAdmin><Clients /></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute requireAdmin><Bookings /></ProtectedRoute>} />
            <Route path="/admin/inquiries" element={<ProtectedRoute requireAdmin><Inquiries /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute requireAdmin><Services /></ProtectedRoute>} />
            <Route path="/admin/testimonials" element={<ProtectedRoute requireAdmin><Testimonials /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><Settings /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
