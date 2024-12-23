import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { adminNavItems } from "./nav-items";
import Login from "./pages/Login";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Sermons from "./pages/public/Sermons";
import Radio from "./pages/public/Radio";
import Contact from "./pages/public/Contact";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sermons" element={<Sermons />} />
      <Route path="/radio" element={<Radio />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Auth Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/admin" /> : <Login />}
      />
      
      {/* Admin Routes */}
      {adminNavItems.map(({ to, page }) => (
        <Route
          key={to}
          path={to}
          element={<ProtectedRoute>{page}</ProtectedRoute>}
        />
      ))}
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;