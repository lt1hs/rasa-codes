import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { blogService } from '../../services/blog.service';
import { galleryService } from '../../services/gallery.service';
import { productService } from '../../services/product.service';
import { userService } from '../../services/user.service';

interface DashboardStats {
  blogs: {
    total: number;
    published: number;
    drafts: number;
  };
  gallery: {
    total: number;
    featured: number;
  };
  products: {
    total: number;
    active: number;
    outOfStock: number;
    totalValue: number;
  };
  users: {
    total: number;
    active: number;
    admins: number;
    newThisMonth: number;
  };
}

export const IntegratedDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      const [
        blogs,
        publishedBlogs,
        gallery,
        featuredGallery,
        products,
        productStats,
        userStats,
        activityLogs
      ] = await Promise.all([
        blogService.getAll(),
        blogService.getPublished(),
        galleryService.getAll(),
        galleryService.getFeatured(),
        productService.getAll(),
        productService.getInventoryReport(),
        userService.getUserStats(),
        userService.getActivityLogs(undefined, 10)
      ]);

      setStats({
        blogs: {
          total: blogs.length,
          published: publishedBlogs.length,
          drafts: blogs.filter(b => b.status === 'draft').length
        },
        gallery: {
          total: gallery.length,
          featured: featuredGallery.length
        },
        products: productStats,
        users: userStats
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
            نمای کلی از وضعیت سیستم و فعالیت‌های اخیر
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Blog Stats */}
          <motion.div
            className="admin-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <span className="text-sm admin-text-light opacity-70">وبلاگ</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">کل مقالات</span>
                <span className="admin-text-light font-semibold">{stats?.blogs.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">منتشر شده</span>
                <span className="text-green-400 font-semibold">{stats?.blogs.published}</span>
              </div>
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">پیش‌نویس</span>
                <span className="text-yellow-400 font-semibold">{stats?.blogs.drafts}</span>
              </div>
            </div>
          </motion.div>

          {/* Gallery Stats */}
          <motion.div
            className="admin-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🖼️</span>
              </div>
              <span className="text-sm admin-text-light opacity-70">گالری</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">کل تصاویر</span>
                <span className="admin-text-light font-semibold">{stats?.gallery.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">ویژه</span>
                <span className="text-blue-400 font-semibold">{stats?.gallery.featured}</span>
              </div>
            </div>
          </motion.div>

          {/* Product Stats */}
          <motion.div
            className="admin-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🛍️</span>
              </div>
              <span className="text-sm admin-text-light opacity-70">محصولات</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">کل محصولات</span>
                <span className="admin-text-light font-semibold">{stats?.products.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">فعال</span>
                <span className="text-green-400 font-semibold">{stats?.products.active}</span>
              </div>
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">ناموجود</span>
                <span className="text-red-400 font-semibold">{stats?.products.outOfStock}</span>
              </div>
            </div>
          </motion.div>

          {/* User Stats */}
          <motion.div
            className="admin-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <span className="text-sm admin-text-light opacity-70">کاربران</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">کل کاربران</span>
                <span className="admin-text-light font-semibold">{stats?.users.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">فعال</span>
                <span className="text-green-400 font-semibold">{stats?.users.active}</span>
              </div>
              <div className="flex justify-between">
                <span className="admin-text-light opacity-70">ادمین</span>
                <span className="text-blue-400 font-semibold">{stats?.users.admins}</span>
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
            {recentActivity.map((activity, index) => (
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
                    <span className="font-semibold">{activity.user?.name}</span>
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
            ))}
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
            href="/admin/content/new"
            className="admin-card rounded-xl p-6 hover:bg-orange-500/10 transition-colors group"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">➕</span>
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
                <span className="text-2xl">📤</span>
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
                <span className="text-2xl">🛍️</span>
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
                <span className="text-2xl">👤</span>
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
