import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

interface AdminHeaderProps {
  onMenuClick: () => void;
  collapsed: boolean;
  isMobile: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  onMenuClick, 
  collapsed, 
  isMobile 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const [searchValue, setSearchValue] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getBreadcrumb = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbMap: Record<string, string> = {
      admin: 'پنل مدیریت',
      dashboard: 'داشبورد',
      content: 'مدیریت محتوا',
      users: 'مدیریت کاربران',
      media: 'کتابخانه رسانه',
      analytics: 'آنالیتیکس',
      settings: 'تنظیمات'
    };
    return pathSegments.map(segment => breadcrumbMap[segment] || segment).join(' / ');
  };

  const notifications = [
    { id: 1, title: 'کاربر جدید ثبت نام کرد', time: '5 دقیقه پیش', unread: true, type: 'user' },
    { id: 2, title: 'محتوای جدید منتشر شد', time: '1 ساعت پیش', unread: true, type: 'content' },
    { id: 3, title: 'پشتیبان گیری کامل شد', time: '2 ساعت پیش', unread: false, type: 'system' },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 glass border-b border-primary/10 backdrop-blur-xl"
      dir="rtl"
    >
      {/* Main Header Content */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Right Section - Menu & Breadcrumb */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="hover:bg-primary/10 admin-text-light hover:scale-105 transition-all duration-200"
          >
            <Bars3Icon className="w-5 h-5" />
          </Button>

          <div className="hidden md:flex items-center space-x-2 space-x-reverse">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <nav className="flex items-center space-x-2 space-x-reverse text-sm">
              <span className="admin-text-light/60 text-xs">مدیریت</span>
              <span className="admin-text-light/40">/</span>
              <span className="font-semibold admin-text-light bg-primary/10 px-3 py-1 rounded-full text-xs">
                {getBreadcrumb().split(' / ').pop()}
              </span>
            </nav>
          </div>
        </div>

        {/* Center Section - Enhanced Search */}
        <div className="flex-1 max-w-lg mx-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <MagnifyingGlassIcon className="absolute right-4 w-4 h-4 admin-text-light/50 z-10" />
              <input
                type="text"
                placeholder="جستجو در پنل مدیریت..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pr-12 pl-4 py-3 glass border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-200 admin-text-light placeholder-admin-text-light/40 text-sm"
              />
              <div className="absolute left-3 flex items-center space-x-1 space-x-reverse">
                <CommandLineIcon className="w-3 h-3 admin-text-light/30" />
                <span className="text-xs admin-text-light/30">⌘K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Left Section - Actions */}
        <div className="flex items-center space-x-3 space-x-reverse">
          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2 space-x-reverse">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary/10 admin-text-light/70 hover:admin-text-light transition-all duration-200"
            >
              <SunIcon className="w-4 h-4 ml-2" />
              <span className="text-xs">روشن</span>
            </Button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative hover:bg-primary/10 admin-text-light group"
            >
              <BellIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 admin-bg-primary text-white text-xs rounded-full flex items-center justify-center font-medium shadow-lg"
                >
                  {unreadCount}
                </motion.span>
              )}
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-0 top-full mt-3 w-80 glass rounded-2xl shadow-2xl border border-primary/20 py-3 z-50"
                >
                  <div className="px-4 py-3 border-b border-primary/10">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold admin-text-light">اعلان‌ها</h3>
                      <span className="text-xs admin-bg-primary text-white px-2 py-1 rounded-full">
                        {unreadCount} جدید
                      </span>
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto custom-scrollbar">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        whileHover={{ x: 4 }}
                        className={cn(
                          "px-4 py-3 cursor-pointer border-r-4 transition-all duration-200",
                          notification.unread 
                            ? "admin-border-primary bg-primary/5 hover:bg-primary/10" 
                            : "border-transparent hover:bg-primary/5"
                        )}
                      >
                        <div className="flex items-start space-x-3 space-x-reverse">
                          <div className={cn(
                            "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                            notification.unread ? "admin-bg-primary" : "bg-gray-400"
                          )}></div>
                          <div className="flex-1">
                            <p className="font-medium admin-text-light text-sm">{notification.title}</p>
                            <p className="text-xs admin-text-light/60 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-primary/10">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full admin-text-light/70 hover:admin-text-light hover:bg-primary/10 text-xs"
                    >
                      مشاهده همه اعلان‌ها
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-xl hover:bg-primary/10 transition-all duration-200 group"
            >
              <div className="relative">
                <div className="w-9 h-9 admin-gradient-primary rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 admin-bg-lime rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold admin-text-light">{user?.name || 'مدیر سیستم'}</p>
                <p className="text-xs admin-text-light/60">{user?.role || 'Super Admin'}</p>
              </div>
              <ChevronDownIcon className="w-4 h-4 admin-text-light/60 group-hover:admin-text-light transition-colors duration-200" />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-0 top-full mt-3 w-64 glass rounded-2xl shadow-2xl border border-primary/20 py-3 z-50"
                >
                  <div className="px-4 py-3 border-b border-primary/10">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-12 h-12 admin-gradient-primary rounded-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold admin-text-light">{user?.name || 'مدیر سیستم'}</p>
                        <p className="text-sm admin-text-light/60">{user?.email || 'admin@example.com'}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 admin-bg-lime text-white text-xs rounded-full">
                          آنلاین
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <button
                      onClick={() => navigate('/admin/profile')}
                      className="flex items-center space-x-3 space-x-reverse w-full px-4 py-3 text-right hover:bg-primary/10 transition-all duration-200 group"
                    >
                      <UserIcon className="w-4 h-4 admin-text-light/60 group-hover:admin-text-primary" />
                      <span className="text-sm admin-text-light group-hover:admin-text-primary">پروفایل کاربری</span>
                    </button>
                    
                    <button
                      onClick={() => navigate('/admin/settings')}
                      className="flex items-center space-x-3 space-x-reverse w-full px-4 py-3 text-right hover:bg-primary/10 transition-all duration-200 group"
                    >
                      <CogIcon className="w-4 h-4 admin-text-light/60 group-hover:admin-text-primary" />
                      <span className="text-sm admin-text-light group-hover:admin-text-primary">تنظیمات</span>
                    </button>
                  </div>
                  
                  <div className="border-t border-primary/10 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 space-x-reverse w-full px-4 py-3 text-right hover:bg-red-500/10 transition-all duration-200 text-red-400 hover:text-red-300 group"
                    >
                      <ArrowRightOnRectangleIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium">خروج از سیستم</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </motion.header>
  );
};

export default AdminHeader;
