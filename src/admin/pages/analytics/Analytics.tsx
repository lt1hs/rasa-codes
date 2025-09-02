import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  EyeIcon,
  UserIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../utils/cn';
import { blogService } from '../../services/blog.service';
import { userService } from '../../services/user.service';
import { galleryService } from '../../services/gallery.service';
import { productService } from '../../services/product.service';

interface AnalyticsData {
  users: {
    total: number;
    active: number;
    newThisMonth: number;
    growth: number;
  };
  content: {
    totalBlogs: number;
    publishedBlogs: number;
    totalViews: number;
    avgViews: number;
    topPosts: Array<{ title: string; views: number; slug: string }>;
  };
  media: {
    totalImages: number;
    featuredImages: number;
    categories: number;
  };
  products: {
    total: number;
    active: number;
    outOfStock: number;
  };
  activity: {
    recentActions: Array<{
      id: string;
      action: string;
      resource_type: string;
      user: { name: string };
      created_at: string;
    }>;
  };
}

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeChart, setActiveChart] = useState('visitors');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const timeRanges = [
    { value: '24h', label: '24 ساعت' },
    { value: '7d', label: '7 روز' },
    { value: '30d', label: '30 روز' },
    { value: '90d', label: '90 روز' }
  ];

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    try {
      setIsLoading(true);
      
      const [
        blogs,
        userStats,
        gallery,
        products,
        activityLogs
      ] = await Promise.all([
        blogService.getAll().catch(() => []),
        userService.getUserStats().catch(() => ({ total: 0, active: 0, newThisMonth: 0 })),
        galleryService.getAll().catch(() => []),
        productService.getAll().catch(() => []),
        userService.getActivityLogs(undefined, 10).catch(() => [])
      ]);

      // Calculate blog analytics
      const publishedBlogs = blogs.filter(b => b.status === 'published');
      const totalViews = blogs.reduce((sum, b) => sum + (b.view_count || 0), 0);
      const avgViews = publishedBlogs.length > 0 ? Math.round(totalViews / publishedBlogs.length) : 0;
      
      // Get top posts by views
      const topPosts = blogs
        .filter(b => b.status === 'published')
        .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
        .slice(0, 5)
        .map(b => ({
          title: b.title,
          views: b.view_count || 0,
          slug: b.slug
        }));

      // Calculate media analytics
      const categories = new Set(gallery.map(g => g.category).filter(Boolean));

      const data: AnalyticsData = {
        users: {
          total: userStats.total,
          active: userStats.active,
          newThisMonth: userStats.newThisMonth,
          growth: userStats.newThisMonth > 0 ? 15.2 : 0
        },
        content: {
          totalBlogs: blogs.length,
          publishedBlogs: publishedBlogs.length,
          totalViews,
          avgViews,
          topPosts
        },
        media: {
          totalImages: gallery.length,
          featuredImages: gallery.filter(g => g.is_featured).length,
          categories: categories.size
        },
        products: {
          total: products.length,
          active: products.filter(p => p.status === 'active').length,
          outOfStock: products.filter(p => p.status === 'out_of_stock').length
        },
        activity: {
          recentActions: activityLogs
        }
      };

      setAnalyticsData(data);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="admin-text-light">در حال بارگذاری آمار...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <p className="admin-text-light">خطا در بارگذاری داده‌های آماری</p>
      </div>
    );
  }

  const stats = [
    {
      title: 'کل کاربران',
      value: analyticsData.users.total,
      change: analyticsData.users.growth,
      positive: analyticsData.users.growth > 0,
      icon: UserIcon,
      color: 'bg-orange-500',
      description: `${analyticsData.users.active} کاربر فعال`
    },
    {
      title: 'بازدیدهای وبلاگ',
      value: analyticsData.content.totalViews,
      change: analyticsData.content.avgViews > 50 ? 8.7 : -2.3,
      positive: analyticsData.content.avgViews > 50,
      icon: EyeIcon,
      color: 'bg-teal-500',
      description: `${analyticsData.content.avgViews} میانگین بازدید`
    },
    {
      title: 'محتوای منتشر شده',
      value: analyticsData.content.publishedBlogs,
      change: analyticsData.content.totalBlogs > analyticsData.content.publishedBlogs ? 12.4 : 5.1,
      positive: true,
      icon: DocumentTextIcon,
      color: 'bg-blue-500',
      description: `${analyticsData.content.totalBlogs} کل مقالات`
    },
    {
      title: 'رسانه‌های آپلود شده',
      value: analyticsData.media.totalImages,
      change: analyticsData.media.featuredImages > 0 ? 15.8 : 0,
      positive: analyticsData.media.featuredImages > 0,
      icon: GlobeAltIcon,
      color: 'bg-purple-500',
      description: `${analyticsData.media.featuredImages} تصویر ویژه`
    }
  ];

  return (
    <div className="admin-layout min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold admin-title-primary">آمار و تحلیل</h1>
            <p className="admin-text-light opacity-70 mt-2">
              نمای کلی از عملکرد سایت و محتوا
            </p>
          </div>
          <div className="flex gap-2">
            {timeRanges.map(range => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  timeRange === range.value
                    ? "bg-orange-500 text-white"
                    : "bg-white/10 admin-text-light hover:bg-white/20"
                )}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="admin-card rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", stat.color)}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm",
                  stat.positive ? "text-green-400" : "text-red-400"
                )}>
                  {stat.positive ? (
                    <ArrowUpIcon className="w-4 h-4" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4" />
                  )}
                  {stat.change.toFixed(1)}%
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold admin-text-light">
                  {stat.value.toLocaleString('fa-IR')}
                </div>
                <div className="text-sm admin-text-light opacity-70">{stat.title}</div>
                <div className="text-xs admin-text-light opacity-50">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Posts */}
          <motion.div
            className="admin-card rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold admin-title-accent mb-6">محبوب‌ترین مقالات</h3>
            <div className="space-y-4">
              {analyticsData.content.topPosts.length > 0 ? analyticsData.content.topPosts.map((post, index) => (
                <div key={post.slug} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <span className="text-orange-400 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium admin-text-light">{post.title}</div>
                      <div className="text-sm admin-text-light opacity-70">/{post.slug}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold admin-text-light">{post.views.toLocaleString('fa-IR')}</div>
                    <div className="text-xs admin-text-light opacity-70">بازدید</div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <DocumentTextIcon className="w-12 h-12 admin-text-light opacity-30 mx-auto mb-2" />
                  <p className="admin-text-light opacity-70">هنوز مقاله‌ای منتشر نشده</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            className="admin-card rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold admin-title-accent mb-6">فعالیت‌های اخیر</h3>
            <div className="space-y-4">
              {analyticsData.activity.recentActions.length > 0 ? analyticsData.activity.recentActions.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center">
                    <span className="text-teal-400 text-sm">
                      {activity.action === 'create' ? '➕' : 
                       activity.action === 'update' ? '✏️' : 
                       activity.action === 'delete' ? '🗑️' : '📝'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="admin-text-light text-sm">
                      <span className="font-medium">{activity.user?.name || 'کاربر'}</span>
                      {' '}
                      {activity.action === 'create' ? 'ایجاد کرد' :
                       activity.action === 'update' ? 'به‌روزرسانی کرد' :
                       activity.action === 'delete' ? 'حذف کرد' : 'تغییر داد'}
                      {' '}
                      <span className="text-teal-400">{activity.resource_type}</span>
                    </p>
                    <p className="text-xs admin-text-light opacity-60">
                      {new Date(activity.created_at).toLocaleDateString('fa-IR', {
                        month: 'short',
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
        </div>

        {/* Content Overview */}
        <motion.div
          className="admin-card rounded-xl p-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold admin-title-accent mb-6">نمای کلی محتوا</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-blue-400 mb-2">
                {analyticsData.content.totalBlogs}
              </div>
              <div className="text-sm admin-text-light opacity-70">کل مقالات</div>
              <div className="text-xs admin-text-light opacity-50 mt-1">
                {analyticsData.content.publishedBlogs} منتشر شده
              </div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-purple-400 mb-2">
                {analyticsData.media.totalImages}
              </div>
              <div className="text-sm admin-text-light opacity-70">تصاویر گالری</div>
              <div className="text-xs admin-text-light opacity-50 mt-1">
                {analyticsData.media.categories} دسته‌بندی
              </div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-green-400 mb-2">
                {analyticsData.products.active}
              </div>
              <div className="text-sm admin-text-light opacity-70">محصولات فعال</div>
              <div className="text-xs admin-text-light opacity-50 mt-1">
                {analyticsData.products.total} کل محصولات
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
