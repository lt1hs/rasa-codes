import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/admin/AdminSidebar.scss';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  submenu?: MenuItem[];
}

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobile: boolean;
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  onSectionChange,
  isCollapsed,
  onToggleCollapse,
  isMobile,
  onClose
}) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'داشبورد',
      icon: '📊'
    },
    {
      id: 'content',
      label: 'مدیریت محتوا',
      icon: '📝',
      submenu: [
        { id: 'content-list', label: 'لیست محتوا', icon: '📄' },
        { id: 'content-create', label: 'ایجاد محتوا', icon: '➕' }
      ]
    },
    {
      id: 'blog',
      label: 'مدیریت بلاگ',
      icon: '✍️',
      submenu: [
        { id: 'blog-posts', label: 'پست‌های بلاگ', icon: '📰' },
        { id: 'blog-categories', label: 'دسته‌بندی‌ها', icon: '🏷️' }
      ]
    },
    {
      id: 'users',
      label: 'مدیریت کاربران',
      icon: '👥',
      badge: 3
    },
    {
      id: 'media',
      label: 'مدیریت رسانه',
      icon: '🖼️'
    },
    {
      id: 'analytics',
      label: 'آمار و تحلیل',
      icon: '📈'
    },
    {
      id: 'settings',
      label: 'تنظیمات سیستم',
      icon: '⚙️'
    }
  ];

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.submenu) {
      toggleSubmenu(item.id);
    } else {
      onSectionChange(item.id);
      if (isMobile && onClose) {
        onClose();
      }
    }
  };

  const sidebarVariants = {
    expanded: {
      width: isMobile ? '280px' : '280px',
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    collapsed: {
      width: isMobile ? '0px' : '80px',
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  const contentVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, delay: 0.1 }
    },
    collapsed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !isCollapsed && (
        <motion.div
          className="sidebar-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`admin-sidebar ${
          isCollapsed ? 'collapsed' : 'expanded'
        } ${isMobile ? 'mobile' : 'desktop'}`}
        variants={sidebarVariants}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        initial={false}
      >
        {/* Header */}
        <div className="sidebar-header">
          <motion.div 
            className="logo-container"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="logo-icon">🚀</div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  className="logo-text"
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                >
                  <h2>رسا ادمین</h2>
                  <span>پنل مدیریت</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Toggle Button */}
          <motion.button
            className="toggle-btn"
            onClick={onToggleCollapse}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isCollapsed ? '→' : '←'}
            </motion.span>
          </motion.button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item.id} className="menu-item">
                <motion.button
                  className={`menu-button ${
                    activeSection === item.id ? 'active' : ''
                  }`}
                  onClick={() => handleMenuClick(item)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="menu-icon">{item.icon}</span>
                  
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.div
                        className="menu-content"
                        variants={contentVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                      >
                        <span className="menu-label">{item.label}</span>
                        {item.badge && (
                          <span className="menu-badge">{item.badge}</span>
                        )}
                        {item.submenu && (
                          <motion.span
                            className="submenu-arrow"
                            animate={{
                              rotate: expandedMenus.includes(item.id) ? 90 : 0
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            ▶
                          </motion.span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Submenu */}
                <AnimatePresence>
                  {item.submenu && 
                   expandedMenus.includes(item.id) && 
                   !isCollapsed && (
                    <motion.ul
                      className="submenu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.submenu.map((subItem) => (
                        <motion.li
                          key={subItem.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <button
                            className={`submenu-button ${
                              activeSection === subItem.id ? 'active' : ''
                            }`}
                            onClick={() => {
                              onSectionChange(subItem.id);
                              if (isMobile && onClose) onClose();
                            }}
                          >
                            <span className="submenu-icon">{subItem.icon}</span>
                            <span className="submenu-label">{subItem.label}</span>
                          </button>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                className="user-info"
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
              >
                <div className="user-avatar">
                  <img src="/api/placeholder/40/40" alt="User" />
                </div>
                <div className="user-details">
                  <span className="user-name">مدیر سیستم</span>
                  <span className="user-role">ادمین</span>
                </div>
                <motion.button
                  className="logout-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  🚪
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {isCollapsed && (
            <motion.button
              className="logout-btn-collapsed"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              🚪
            </motion.button>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
