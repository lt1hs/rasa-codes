import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon,
  DocumentTextIcon,
  PhotoIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  TagIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../utils/cn';

interface ContentItem {
  id: string;
  title: string;
  type: 'post' | 'page' | 'product' | 'service';
  status: 'published' | 'draft' | 'scheduled' | 'archived';
  author: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  featured: boolean;
  excerpt: string;
  thumbnail?: string;
}

const ContentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'معرفی خدمات جدید شرکت',
      type: 'post',
      status: 'published',
      author: 'احمد محمدی',
      category: 'اخبار',
      tags: ['خدمات', 'جدید', 'شرکت'],
      createdAt: '1402/12/15',
      updatedAt: '1402/12/20',
      views: 1250,
      featured: true,
      excerpt: 'در این مقاله به معرفی خدمات جدید شرکت می‌پردازیم که شامل...'
    },
    {
      id: '2',
      title: 'راهنمای استفاده از محصولات',
      type: 'page',
      status: 'draft',
      author: 'مریم احمدی',
      category: 'راهنما',
      tags: ['راهنما', 'محصولات'],
      createdAt: '1402/12/10',
      updatedAt: '1402/12/18',
      views: 850,
      featured: false,
      excerpt: 'راهنمای کاملی برای استفاده بهینه از محصولات ما...'
    },
    {
      id: '3',
      title: 'محصول ویژه - پکیج طلایی',
      type: 'product',
      status: 'published',
      author: 'علی رضایی',
      category: 'محصولات',
      tags: ['محصول', 'ویژه', 'طلایی'],
      createdAt: '1402/12/05',
      updatedAt: '1402/12/15',
      views: 2100,
      featured: true,
      excerpt: 'پکیج طلایی ما شامل تمامی امکانات پیشرفته...'
    },
    {
      id: '4',
      title: 'خدمات مشاوره تخصصی',
      type: 'service',
      status: 'scheduled',
      author: 'فاطمه کریمی',
      category: 'خدمات',
      tags: ['مشاوره', 'تخصصی'],
      createdAt: '1402/12/01',
      updatedAt: '1402/12/12',
      views: 650,
      featured: false,
      excerpt: 'تیم متخصص ما آماده ارائه مشاوره در زمینه...'
    }
  ];

  const contentTypes = [
    { key: 'all', label: 'همه محتوا', count: contentItems.length },
    { key: 'post', label: 'مقالات', count: contentItems.filter(item => item.type === 'post').length },
    { key: 'page', label: 'صفحات', count: contentItems.filter(item => item.type === 'page').length },
    { key: 'product', label: 'محصولات', count: contentItems.filter(item => item.type === 'product').length },
    { key: 'service', label: 'خدمات', count: contentItems.filter(item => item.type === 'service').length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-lime-500';
      case 'draft': return 'bg-gray-500';
      case 'scheduled': return 'bg-orange-500';
      case 'archived': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'منتشر شده';
      case 'draft': return 'پیش‌نویس';
      case 'scheduled': return 'زمان‌بندی شده';
      case 'archived': return 'آرشیو شده';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post': return DocumentTextIcon;
      case 'page': return DocumentTextIcon;
      case 'product': return TagIcon;
      case 'service': return UserIcon;
      default: return DocumentTextIcon;
    }
  };

  const filteredItems = contentItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold admin-text-light">مدیریت محتوا</h1>
          <p className="admin-text-light/70 mt-1">مدیریت کامل محتوای وب‌سایت</p>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <PlusIcon className="w-4 h-4 ml-2" />
            محتوای جدید
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'کل محتوا', value: contentItems.length, color: 'bg-orange-500', icon: DocumentTextIcon },
          { title: 'منتشر شده', value: contentItems.filter(i => i.status === 'published').length, color: 'bg-lime-500', icon: CheckCircleIcon },
          { title: 'پیش‌نویس', value: contentItems.filter(i => i.status === 'draft').length, color: 'bg-gray-500', icon: PencilIcon },
          { title: 'کل بازدید', value: contentItems.reduce((sum, item) => sum + item.views, 0), color: 'bg-teal-500', icon: EyeIcon }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm admin-text-light/70">{stat.title}</p>
                    <p className="text-2xl font-bold admin-text-light">{stat.value.toLocaleString()}</p>
                  </div>
                  <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", stat.color)}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Content Type Tabs */}
            <div className="flex flex-wrap gap-2">
              {contentTypes.map(type => (
                <button
                  key={type.key}
                  onClick={() => setActiveTab(type.key)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    activeTab === type.key
                      ? "bg-orange-500 text-white"
                      : "admin-text-light/70 hover:bg-primary/10 hover:admin-text-light"
                  )}
                >
                  {type.label} ({type.count})
                </button>
              ))}
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 admin-text-light/50" />
                <input
                  type="text"
                  placeholder="جستجو در محتوا..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 pl-4 py-2 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50 w-64"
                />
              </div>
              <Button variant="ghost" size="sm" className="admin-text-light/70">
                <FunnelIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map((item, index) => {
            const TypeIcon = getTypeIcon(item.type);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-0">
                    {/* Thumbnail */}
                    <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-xl">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <TypeIcon className="w-16 h-16 admin-text-light/30" />
                      </div>
                      {item.featured && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-orange-500 text-white">ویژه</Badge>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className={cn("px-2 py-1 rounded-full text-xs text-white", getStatusColor(item.status))}>
                          {getStatusLabel(item.status)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold admin-text-light text-lg leading-tight">{item.title}</h3>
                      </div>
                      
                      <p className="admin-text-light/70 text-sm mb-4 line-clamp-2">{item.excerpt}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-primary/10 admin-text-light/70 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs admin-text-light/60 mb-4">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <UserIcon className="w-3 h-3" />
                          <span>{item.author}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <EyeIcon className="w-3 h-3" />
                          <span>{item.views.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs admin-text-light/60 mb-4">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{item.updatedAt}</span>
                        </div>
                        <span className="px-2 py-1 bg-accent/10 admin-text-accent rounded-full">{item.category}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-primary/10">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button variant="ghost" size="sm" className="admin-text-light/70 hover:admin-text-light">
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="admin-text-light/70 hover:admin-text-light">
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <div className={cn("w-2 h-2 rounded-full", getStatusColor(item.status))}></div>
                          <span className="text-xs admin-text-light/60">{getStatusLabel(item.status)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <DocumentTextIcon className="w-16 h-16 admin-text-light/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold admin-text-light mb-2">محتوایی یافت نشد</h3>
          <p className="admin-text-light/70 mb-6">محتوای مورد نظر خود را ایجاد کنید</p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <PlusIcon className="w-4 h-4 ml-2" />
            ایجاد محتوای جدید
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ContentManagement;
