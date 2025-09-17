import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import { useEffect, useState } from 'react';
import { onAuth } from './lib/auth';
import { userIsAdmin } from './lib/admin';
import ReportDetails from './pages/report-details';
import AdminDashboard from './pages/admin-dashboard';
import AdminLogin from './pages/admin-login';
import HomeMapView from './pages/home-map-view';

const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(null);
  useEffect(() => {
    const unsub = onAuth(async (user) => {
      try {
        if (!user) return setOk(false);
        setOk(await userIsAdmin(user.uid));
      } catch {
        setOk(false);
      }
    });
    return () => unsub();
  }, []);
  if (ok === null) return null;
  return ok ? children : <AdminLogin />;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomeMapView />} />
        <Route path="/report-details" element={<ReportDetails />} />
        <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/home-map-view" element={<HomeMapView />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
