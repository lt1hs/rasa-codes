import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import ContentManager from '../components/admin/ContentManager';
import BlogContentManager from '../components/admin/BlogContentManager';
import UserManager from '../components/admin/UserManager';
import MediaManager from '../components/admin/MediaManager';
import SettingsManager from '../components/admin/SettingsManager';
import StatisticsPanel from '../components/admin/StatisticsPanel';
import '../styles/admin/AdminDashboard.scss';

const AdminDashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if user is authenticated and has admin privileges
    const checkAuth = () => {
      // In development, bypass authentication
      if (process.env.NODE_ENV === 'development') {
        setIsLoading(false);
        return;
      }
      
      // In production, implement proper authentication check
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const isAdmin = localStorage.getItem('userRole') === 'admin';
      
      if (!isAuthenticated || !isAdmin) {
        window.location.href = '/login';
        return;
      }
      
      setIsLoading(false);
    };

    // Handle responsive behavior
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarCollapsed(true);
      }
    };

    checkAuth();
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderActiveSection = () => {
    const sectionVariants = {
      hidden: { opacity: 0, x: 20, scale: 0.95 },
      visible: { 
        opacity: 1, 
        x: 0, 
        scale: 1,
        transition: { 
          duration: 0.4,
          ease: "easeOut"
        }
      },
      exit: { 
        opacity: 0, 
        x: -20, 
        scale: 0.95,
        transition: { duration: 0.3 }
      }
    };

    const getSectionComponent = () => {
      switch (activeSection) {
        case 'dashboard':
          return <StatisticsPanel />;
        case 'content':
          return <ContentManager />;
        case 'blog-content':
          return <BlogContentManager />;
        case 'users':
          return <UserManager />;
        case 'media':
          return <MediaManager />;
        case 'settings':
          return <SettingsManager />;
        default:
          return <StatisticsPanel />;
      }
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="admin-section-container"
        >
          {getSectionComponent()}
        </motion.div>
      </AnimatePresence>
    );
  };

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <motion.div 
          className="admin-loading-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-spinner"></div>
          <h2 className="gradient-text">در حال بارگذاری پنل مدیریت</h2>
          <p>لطفاً صبر کنید...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard rtl">
      {/* Background Effects */}
      <div className="admin-background-effects">
        <div className="bg-effect bg-effect-1"></div>
        <div className="bg-effect bg-effect-2"></div>
        <div className="bg-effect bg-effect-3"></div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && !isSidebarCollapsed && (
        <motion.div 
          className="mobile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobile={isMobile}
      />

      {/* Main Content Area */}
      <motion.main 
        className={`admin-main ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Header */}
        <AdminHeader 
          activeSection={activeSection}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Content */}
        <div className="admin-content">
          {renderActiveSection()}
        </div>
      </motion.main>
    </div>
  );
};

export default AdminDashboardPage;
