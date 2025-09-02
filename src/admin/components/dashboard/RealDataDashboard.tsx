import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  DocumentTextIcon, 
  PhotoIcon,
  StarIcon,
  ClockIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { blogService } from '../../services/blog.service';
import { galleryService } from '../../services/gallery.service';
import { productService } from '../../services/product.service';
import { userService } from '../../services/user.service';

interface DashboardStats {
  users: { total: number; active: number; newThisMonth: number };
  blogs: { total: number; published: number; drafts: number; totalViews: number };
  gallery: { total: number; featured: number };
  products: { total: number; active: number; outOfStock: number };
}

export const RealDataDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      const [blogs, gallery, products, userStats, activityLogs] = await Promise.all([
        blogService.getAll().catch(() => []),
        galleryService.getAll().catch(() => []),
        productService.getAll().catch(() => []),
        userService.getUserStats().catch(() => ({ total: 0, active: 0, newThisMonth: 0 })),
        userService.getActivityLogs(undefined, 5).catch(() => [])
      ]);

      setStats({
        users: userStats,
        blogs: {
          total: blogs.length,
          published: blogs.filter(b => b.status === 'published').length,
          drafts: blogs.filter(b => b.status === 'draft').length,
          totalViews: blogs.reduce((sum, b) => sum + (b.view_count || 0), 0)
        },
        gallery: {
          total: gallery.length,
          featured: gallery.filter(g => g.is_featured).length
        },
        products: {
          total: products.length,
          active: products.filter(p => p.status === 'active').length,
          outOfStock: products.filter(p => p.status === 'out_of_stock').length
        }
      });

      setRecentActivity(activityLogs);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="admin-text-light">در حال بارگذاری داشبورد...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold admin-title-primary">داشبورد مدیریت</h1>
          <p className="admin-text-light opacity-70 mt-2">
            خوش آمدید {user?.name} - نمای کلی از وضعیت سیستم
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Users Stats */}
          <motion.div
            className="admin-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm admin-text-light opacity-70">کاربران</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">کل کاربران</span>
                <span className="admin-text-light font-semibold">{stats?.users.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">فعال</span>
                <span className="text-green-400 font-semibold">{stats?.users.active || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">جدید این ماه</span>
                <span className="text-blue-400 font-semibold">{stats?.users.newThisMonth || 0}</span>
              </div>
            </div>
          </motion.div>

          {/* Blog Stats */}
          <motion.div
            className="admin-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm admin-text-light opacity-70">وبلاگ</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">کل مقالات</span>
                <span className="admin-text-light font-semibold">{stats?.blogs.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">منتشر شده</span>
                <span className="text-green-400 font-semibold">{stats?.blogs.published || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">پیش‌نویس</span>
                <span className="text-yellow-400 font-semibold">{stats?.blogs.drafts || 0}</span>
              </div>
            </div>
          </motion.div>

          {/* Gallery Stats */}
          <motion.div
            className="admin-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <PhotoIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm admin-text-light opacity-70">گالری</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">کل تصاویر</span>
                <span className="admin-text-light font-semibold">{stats?.gallery.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">ویژه</span>
                <span className="text-blue-400 font-semibold">{stats?.gallery.featured || 0}</span>
              </div>
            </div>
          </motion.div>

          {/* Product Stats */}
          <motion.div
            className="admin-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center">
                <StarIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm admin-text-light opacity-70">محصولات</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">کل محصولات</span>
                <span className="admin-text-light font-semibold">{stats?.products.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">فعال</span>
                <span className="text-green-400 font-semibold">{stats?.products.active || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">ناموجود</span>
                <span className="text-red-400 font-semibold">{stats?.products.outOfStock || 0}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          className="admin-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-bold admin-title-accent mb-6">فعالیت‌های اخیر</h2>
          <div className="space-y-4">
            {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <span className="text-orange-400">
                    {activity.action === 'create' ? '➕' : 
                     activity.action === 'update' ? '✏️' : 
                     activity.action === 'delete' ? '🗑️' : '📝'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="admin-text-light">
                    <span className="font-semibold">{activity.user?.name || 'کاربر'}</span>
                    {' '}
                    {activity.action === 'create' ? 'ایجاد کرد' :
                     activity.action === 'update' ? 'به‌روزرسانی کرد' :
                     activity.action === 'delete' ? 'حذف کرد' : 'تغییر داد'}
                    {' '}
                    <span className="text-orange-400">{activity.resource_type}</span>
                  </p>
                  <p className="text-sm admin-text-light opacity-60">
                    {new Date(activity.created_at).toLocaleDateString('fa-IR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            )) : (
              <div className="text-center py-8">
                <ClockIcon className="w-12 h-12 admin-text-light opacity-30 mx-auto mb-2" />
                <p className="admin-text-light opacity-70">هیچ فعالیت اخیری یافت نشد</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="/admin/blog/new"
            className="admin-card rounded-xl p-6 hover:bg-orange-500/10 transition-colors group"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <PlusIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold admin-text-light">مقاله جدید</h3>
              <p className="text-sm admin-text-light opacity-70 mt-2">ایجاد مقاله جدید</p>
            </div>
          </a>

          <a
            href="/admin/media/upload"
            className="admin-card rounded-xl p-6 hover:bg-teal-500/10 transition-colors group"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <PhotoIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold admin-text-light">آپلود تصویر</h3>
              <p className="text-sm admin-text-light opacity-70 mt-2">افزودن به گالری</p>
            </div>
          </a>

          <a
            href="/admin/products/new"
            className="admin-card rounded-xl p-6 hover:bg-purple-500/10 transition-colors group"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <StarIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold admin-text-light">محصول جدید</h3>
              <p className="text-sm admin-text-light opacity-70 mt-2">افزودن محصول</p>
            </div>
          </a>

          <a
            href="/admin/users/new"
            className="admin-card rounded-xl p-6 hover:bg-lime-500/10 transition-colors group"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold admin-text-light">کاربر جدید</h3>
              <p className="text-sm admin-text-light opacity-70 mt-2">ایجاد حساب کاربری</p>
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
};
