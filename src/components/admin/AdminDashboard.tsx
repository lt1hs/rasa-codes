import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import ContentManager from './ContentManager';
import BlogContentManager from './BlogContentManager';
import BlogListManager from './BlogListManager';
import CreateEditBlogManager from './CreateEditBlogManager';
import MediaManager from './MediaManager';
import SettingsManager from './SettingsManager';
import StatisticsPanel from './StatisticsPanel';
import UserManager from './UserManager';
import '../../styles/admin/AdminDashboard.scss';

interface AdminDashboardProps {
  initialSection?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  initialSection = 'dashboard' 
}) => {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleCloseSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const renderMainContent = () => {
    const contentVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };

    switch (activeSection) {
      case 'dashboard':
        return (
          <motion.div
            key="dashboard"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="dashboard-overview"
          >
            <div className="dashboard-header">
              <h1>داشبورد مدیریت</h1>
              <p>خوش آمدید! اینجا می‌توانید کل سیستم را مدیریت کنید.</p>
            </div>
            
            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>کل بازدیدها</h3>
                  <p className="stat-number">12,345</p>
                  <span className="stat-change positive">+12.5%</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>کاربران فعال</h3>
                  <p className="stat-number">1,234</p>
                  <span className="stat-change positive">+8.2%</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-content">
                  <h3>محتوای منتشر شده</h3>
                  <p className="stat-number">456</p>
                  <span className="stat-change positive">+15.3%</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h3>درآمد ماهانه</h3>
                  <p className="stat-number">$12,345</p>
                  <span className="stat-change negative">-2.1%</span>
                </div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>فعالیت‌های اخیر</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">👤</div>
                    <div className="activity-content">
                      <p>کاربر جدید ثبت‌نام کرد</p>
                      <span className="activity-time">5 دقیقه پیش</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">📝</div>
                    <div className="activity-content">
                      <p>مقاله جدید منتشر شد</p>
                      <span className="activity-time">1 ساعت پیش</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">💬</div>
                    <div className="activity-content">
                      <p>نظر جدید دریافت شد</p>
                      <span className="activity-time">2 ساعت پیش</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-card">
                <h3>آمار سریع</h3>
                <div className="quick-stats">
                  <div className="quick-stat">
                    <span className="quick-stat-label">مقالات در انتظار</span>
                    <span className="quick-stat-value">12</span>
                  </div>
                  <div className="quick-stat">
                    <span className="quick-stat-label">نظرات جدید</span>
                    <span className="quick-stat-value">34</span>
                  </div>
                  <div className="quick-stat">
                    <span className="quick-stat-label">پیام‌های پشتیبانی</span>
                    <span className="quick-stat-value">7</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      case 'content-list':
      case 'content':
        return (
          <motion.div
            key="content"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ContentManager />
          </motion.div>
        );
      
      case 'blog-list':
        return (
          <motion.div
            key="blog-list"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <BlogListManager />
          </motion.div>
        );
      
      case 'blog-create':
        return (
          <motion.div
            key="blog-create"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <CreateEditBlogManager />
          </motion.div>
        );
      
      case 'blog-content':
        return (
          <motion.div
            key="blog-content"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <BlogContentManager />
          </motion.div>
        );
      
      case 'media':
        return (
          <motion.div
            key="media"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <MediaManager />
          </motion.div>
        );
      
      case 'users':
        return (
          <motion.div
            key="users"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <UserManager />
          </motion.div>
        );
      
      case 'statistics':
        return (
          <motion.div
            key="statistics"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <StatisticsPanel />
          </motion.div>
        );
      
      case 'settings':
        return (
          <motion.div
            key="settings"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <SettingsManager />
          </motion.div>
        );
      
      default:
        return (
          <motion.div
            key="default"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="dashboard-overview"
          >
            <div className="dashboard-header">
              <h1>صفحه پیدا نشد</h1>
              <p>بخش مورد نظر شما یافت نشد.</p>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`sidebar-container ${
        isMobile ? (sidebarOpen ? 'mobile-open' : 'mobile-closed') : 
        (sidebarCollapsed ? 'collapsed' : 'expanded')
      }`}>
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          isMobile={isMobile}
          onClose={handleCloseSidebar}
        />
      </div>

      {/* Main Content Area */}
      <div className={`main-content ${
        isMobile ? 'mobile' : (sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded')
      }`}>
        {/* Header */}
        <AdminHeader
          onToggleSidebar={handleToggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
          currentUser={{
            name: 'مدیر سیستم',
            email: 'admin@example.com',
            role: 'مدیر کل'
          }}
        />

        {/* Page Content */}
        <main className="page-content">
          <AnimatePresence mode="wait">
            {renderMainContent()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;