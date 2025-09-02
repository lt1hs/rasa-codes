import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon,
  DocumentTextIcon,
  UserIcon,
  PhotoIcon,
  ChartBarIcon,
  CogIcon,
  BookOpenIcon,
  FolderIcon,
  RectangleStackIcon,
  UsersIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon,
  AdjustmentsHorizontalIcon,
  LockClosedIcon,
  BoltIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  StarIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../utils/cn';

interface AdminSidebarProps {
  collapsed: boolean;
  isMobile: boolean;
  onClose?: () => void;
}

interface MenuItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: number;
  permission?: string;
  children?: MenuItem[];
  isNew?: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  collapsed, 
  isMobile, 
  onClose 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { can, canManageUsers, canManageContent, canManageMedia, canManageSettings } = useAuth();
  
  const [openKeys, setOpenKeys] = useState<string[]>(['dashboard']);

  const menuItems: MenuItem[] = [
    {
      key: 'dashboard',
      label: 'داشبورد',
      icon: HomeIcon,
      path: '/admin/dashboard'
    },
    {
      key: 'homepage',
      label: 'مدیریت صفحه اصلی',
      icon: HomeIcon,
      path: '/admin/homepage',
      isNew: true
    },
    {
      key: 'content',
      label: 'مدیریت محتوا',
      icon: DocumentTextIcon,
      path: '/admin/content',
      badge: 3,
      permission: 'manage_content',
      children: [
        { key: 'posts', label: 'مقالات', icon: DocumentTextIcon, path: '/admin/content/posts' },
        { key: 'pages', label: 'صفحات', icon: BookOpenIcon, path: '/admin/content/pages' },
        { key: 'categories', label: 'دسته‌بندی‌ها', icon: FolderIcon, path: '/admin/content/categories' }
      ]
    },
    {
      key: 'users',
      label: 'مدیریت کاربران',
      icon: UsersIcon,
      path: '/admin/users',
      badge: 12,
      permission: 'manage_users',
      children: [
        { key: 'all-users', label: 'همه کاربران', icon: UserIcon, path: '/admin/users/all' },
        { key: 'roles', label: 'نقش‌ها', icon: ShieldCheckIcon, path: '/admin/users/roles' }
      ]
    },
    {
      key: 'media',
      label: 'کتابخانه رسانه',
      icon: PhotoIcon,
      path: '/admin/media',
      permission: 'manage_media'
    },
    {
      key: 'analytics',
      label: 'آنالیتیکس',
      icon: ChartBarIcon,
      path: '/admin/analytics',
      isNew: true,
      children: [
        { key: 'overview', label: 'نمای کلی', icon: ChartBarIcon, path: '/admin/analytics/overview' },
        { key: 'reports', label: 'گزارش‌ها', icon: RectangleStackIcon, path: '/admin/analytics/reports' }
      ]
    },
    {
      key: 'qr-codes',
      label: 'QR Code Manager',
      icon: QrCodeIcon,
      path: '/admin/qr-codes'
    },
    {
      key: 'signboard',
      label: 'مدیریت تابلوساز',
      icon: RectangleStackIcon,
      path: '/admin/signboard',
      isNew: true,
      children: [
        { key: 'signboard-users', label: 'کاربران', icon: UsersIcon, path: '/admin/signboard' },
        { key: 'signboard-designs', label: 'طرح‌ها', icon: PhotoIcon, path: '/admin/signboard' },
        { key: 'signboard-orders', label: 'سفارشات', icon: ClipboardDocumentListIcon, path: '/admin/signboard' }
      ]
    },
    {
      key: 'settings',
      label: 'تنظیمات',
      icon: CogIcon,
      path: '/admin/settings',
      permission: 'manage_settings',
      children: [
        { key: 'general', label: 'عمومی', icon: AdjustmentsHorizontalIcon, path: '/admin/settings/general' },
        { key: 'security', label: 'امنیت', icon: LockClosedIcon, path: '/admin/settings/security' },
        { key: 'backup', label: 'پشتیبان‌گیری', icon: CloudArrowUpIcon, path: '/admin/settings/backup' }
      ]
    }
  ];

  // Filter menu items based on permissions
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.permission) return true;
    if (item.permission === 'manage_content') return canManageContent;
    if (item.permission === 'manage_users') return canManageUsers;
    if (item.permission === 'manage_media') return canManageMedia;
    if (item.permission === 'manage_settings') return canManageSettings;
    return can(item.permission);
  });

  // Get selected key based on current path
  const getSelectedKey = () => {
    for (const item of filteredMenuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (location.pathname.startsWith(child.path)) {
            return child.key;
          }
        }
      }
      if (location.pathname.startsWith(item.path)) {
        return item.key;
      }
    }
    return 'dashboard';
  };

  const selectedKey = getSelectedKey();

  const handleMenuClick = (item: MenuItem) => {
    navigate(item.path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const toggleSubmenu = (key: string) => {
    setOpenKeys(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isSelected = selectedKey === item.key;
    const isOpen = openKeys.includes(item.key);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.key} className="mb-1">
        <motion.div
          whileHover={{ x: collapsed ? 0 : 4 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "flex items-center px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 group relative overflow-hidden",
            level > 0 && "mr-4",
            isSelected 
              ? "admin-gradient-primary text-white shadow-lg shadow-primary/25" 
              : "admin-text-light/70 hover:bg-primary/10 hover:admin-text-light"
          )}
          onClick={() => hasChildren ? toggleSubmenu(item.key) : handleMenuClick(item)}
        >
          {/* Background glow for selected item */}
          {isSelected && (
            <motion.div
              layoutId="selectedGlow"
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}

          {/* Selection indicator */}
          {isSelected && (
            <motion.div
              layoutId="selectedIndicator"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}

          {/* Icon with enhanced styling */}
          <div className={cn(
            "flex items-center justify-center w-10 h-10 ml-3 rounded-lg transition-all duration-200 relative z-10",
            isSelected 
              ? "bg-white/20 text-white shadow-lg" 
              : "group-hover:bg-primary/20 group-hover:scale-110"
          )}>
            <item.icon className="w-5 h-5" />
          </div>

          {/* Label, badge, and chevron */}
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center justify-between flex-1 overflow-hidden relative z-10"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="font-medium truncate">{item.label}</span>
                  {item.isNew && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center"
                    >
                      <StarIcon className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded-full font-medium mr-1">
                        جدید
                      </span>
                    </motion.div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  {item.badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={cn(
                        "px-2 py-1 text-xs font-bold rounded-full min-w-[20px] text-center",
                        isSelected 
                          ? "bg-white/30 text-white" 
                          : "admin-bg-primary text-white shadow-lg"
                      )}
                    >
                      {item.badge}
                    </motion.span>
                  )}
                  {hasChildren && (
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center w-6 h-6"
                    >
                      <ChevronRightIcon className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Submenu */}
        <AnimatePresence>
          {hasChildren && isOpen && !collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-2 space-y-1 mr-2">
                {item.children?.map(child => renderMenuItem(child, level + 1))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.div
      initial={false}
      animate={{
        width: isMobile ? (collapsed ? 0 : 288) : (collapsed ? 80 : 288),
        x: isMobile && collapsed ? 288 : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed right-0 top-0 h-full z-50 flex flex-col",
        isMobile ? "shadow-2xl" : "shadow-lg"
      )}
      dir="rtl"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 admin-gradient-dark backdrop-blur-xl" />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF8301' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Enhanced Logo/Brand */}
        <div className="flex items-center px-6 py-6 border-b border-primary/20">
          <div className="flex items-center space-x-3 space-x-reverse">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <div className="w-10 h-10 admin-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <BoltIcon className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 admin-bg-lime rounded-full border-2 border-white"></div>
            </motion.div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <div>
                    <h1 className="text-xl font-bold admin-text-light">پنل مدیریت</h1>
                    <p className="text-xs admin-text-light/60 mt-0.5">سیستم مدیریت محتوا</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            {/* Quick Stats - Only show when expanded */}
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 glass rounded-xl border border-primary/10"
                >
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <div className="text-lg font-bold admin-text-primary">1.2K</div>
                      <div className="text-xs admin-text-light/60">کاربران</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold admin-text-accent">89</div>
                      <div className="text-xs admin-text-light/60">محتوا</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Menu Items */}
            {filteredMenuItems.map(item => renderMenuItem(item))}
          </div>
        </nav>

        {/* Enhanced Footer */}
        <div className="px-4 py-4 border-t border-primary/20">
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
                  <div className="w-2 h-2 admin-bg-lime rounded-full animate-pulse"></div>
                  <p className="text-xs admin-text-light/70">سیستم آنلاین</p>
                </div>
                <p className="text-xs admin-text-light/50">نسخه 2.1.0</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Collapsed state indicator */}
          {collapsed && (
            <div className="flex justify-center">
              <div className="w-8 h-1 admin-bg-primary rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
