import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { useResponsive } from '../hooks/useResponsive';
import { useAuth } from '../hooks/useAuth';
import { ErrorBoundary } from '../services/errorTracking.service.tsx';
import '../styles/analytics.css';
import '../styles/modern.css';
import '../styles/admin-colors.css';

// Modern gradient background - Updated to match home page
const ModernBackground: React.FC = () => (
  <div className="fixed inset-0 -z-10">
    {/* Base gradient - Dark theme like home page */}
    <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary-dark to-secondary-light" />
    
    {/* Animated orbs - Using home page colors */}
    <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
    <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-lime/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
    
    {/* Grid pattern - Subtle for dark theme */}
    <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF8301' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }} />
  </div>
);

const AdminLayout: React.FC = () => {
  const { isMobile } = useResponsive();
  const { isAuthenticated, isLoading } = useAuth();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Auto-collapse on mobile, use stored preference on desktop
    if (isMobile) return true;
    return localStorage.getItem('admin_sidebar_collapsed') === 'true';
  });

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    const newCollapsed = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsed);
    
    // Store preference for desktop users
    if (!isMobile) {
      localStorage.setItem('admin_sidebar_collapsed', String(newCollapsed));
    }
  };

  // Handle mobile sidebar close
  const handleMobileSidebarClose = () => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  // Auto-collapse/expand based on screen size
  useEffect(() => {
    if (isMobile && !sidebarCollapsed) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ModernBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <div className="w-16 h-16 border-4 border-accent/30 border-t-primary rounded-full animate-spin mx-auto mb-6"></div>
          <div className="glass rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-text-light mb-2">Loading Admin Panel</h3>
            <p className="text-text-light/70">Preparing your dashboard...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Redirect if not authenticated (this should be handled by ProtectedRoute, but as a fallback)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ModernBackground />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center relative z-10"
        >
          <div className="glass rounded-2xl p-8 shadow-lg max-w-md">
            <div className="w-16 h-16 admin-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-light mb-3">Authentication Required</h3>
            <p className="text-text-light/70 mb-6">Please log in to access the admin panel.</p>
            <button 
              onClick={() => window.location.href = '/admin/login'}
              className="w-full px-6 py-3 admin-gradient-primary text-white rounded-xl hover:opacity-90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Go to Login
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen admin-theme admin-layout">
      <ModernBackground />
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && !sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleMobileSidebarClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AdminSidebar 
        collapsed={sidebarCollapsed}
        isMobile={isMobile}
        onClose={handleMobileSidebarClose}
      />

      {/* Main Layout */}
      <div 
        className={`transition-all duration-300 ${
          isMobile 
            ? 'mr-0' 
            : sidebarCollapsed 
              ? 'mr-20' 
              : 'mr-72'
        }`}
        dir="rtl"
      >
        {/* Header */}
        <AdminHeader 
          onMenuClick={handleSidebarToggle}
          collapsed={sidebarCollapsed}
          isMobile={isMobile}
        />

        {/* Content Area */}
        <main className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-full"
          >
            {/* Page Content */}
            <div className="p-6">
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;