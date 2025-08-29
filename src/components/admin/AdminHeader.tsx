import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminHeader.scss';

// Icons (you can replace with your preferred icon library)
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 12,15 18,9"/>
  </svg>
);

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
  currentUser?: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleSidebar,
  sidebarCollapsed,
  currentUser = {
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator'
  }
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'New user registered', time: '2 min ago', type: 'info' },
    { id: 2, title: 'Server maintenance scheduled', time: '1 hour ago', type: 'warning' },
    { id: 3, title: 'Backup completed successfully', time: '3 hours ago', type: 'success' }
  ]);

  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Implement logout functionality
  };

  return (
    <motion.header 
      className="admin-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="admin-header__container">
        {/* Left Section */}
        <div className="admin-header__left">
          <motion.button
            className="admin-header__menu-toggle"
            onClick={onToggleSidebar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MenuIcon />
          </motion.button>

          <div className="admin-header__breadcrumb">
            <span className="breadcrumb-item">Dashboard</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item active">Overview</span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="admin-header__center">
          <motion.div 
            ref={searchRef}
            className={`admin-header__search ${searchFocused ? 'focused' : ''}`}
            animate={{ width: searchFocused ? '400px' : '300px' }}
            transition={{ duration: 0.2 }}
          >
            <form onSubmit={handleSearch}>
              <div className="search-input-wrapper">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search users, content, settings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="search-input"
                />
                {searchQuery && (
                  <motion.button
                    type="button"
                    className="search-clear"
                    onClick={() => setSearchQuery('')}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    ×
                  </motion.button>
                )}
              </div>
            </form>

            {/* Search Suggestions */}
            <AnimatePresence>
              {searchFocused && searchQuery && (
                <motion.div
                  className="search-suggestions"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="suggestion-item">
                    <SearchIcon />
                    <span>Search for "{searchQuery}" in users</span>
                  </div>
                  <div className="suggestion-item">
                    <SearchIcon />
                    <span>Search for "{searchQuery}" in content</span>
                  </div>
                  <div className="suggestion-item">
                    <SearchIcon />
                    <span>Search for "{searchQuery}" in settings</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="admin-header__right">
          {/* Notifications */}
          <div className="admin-header__notifications" ref={notificationsRef}>
            <motion.button
              className="notification-button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BellIcon />
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </motion.button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  className="notifications-dropdown"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <button className="mark-all-read">Mark all read</button>
                  </div>
                  <div className="notifications-list">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`notification-item ${notification.type}`}>
                        <div className="notification-content">
                          <p className="notification-title">{notification.title}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="notifications-footer">
                    <button className="view-all">View all notifications</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="admin-header__user-menu" ref={userMenuRef}>
            <motion.button
              className="user-menu-trigger"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="user-avatar">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="user-info">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role">{currentUser.role}</span>
              </div>
              <ChevronDownIcon />
            </motion.button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  className="user-menu-dropdown"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="user-menu-header">
                    <div className="user-avatar large">
                      {currentUser.avatar ? (
                        <img src={currentUser.avatar} alt={currentUser.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {currentUser.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="user-details">
                      <h4>{currentUser.name}</h4>
                      <p>{currentUser.email}</p>
                      <span className="role-badge">{currentUser.role}</span>
                    </div>
                  </div>
                  <div className="user-menu-items">
                    <button className="menu-item">
                      <span>Profile Settings</span>
                    </button>
                    <button className="menu-item">
                      <span>Account Preferences</span>
                    </button>
                    <button className="menu-item">
                      <span>Security</span>
                    </button>
                    <div className="menu-divider"></div>
                    <button className="menu-item">
                      <span>Help & Support</span>
                    </button>
                    <button className="menu-item logout" onClick={handleLogout}>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default AdminHeader;