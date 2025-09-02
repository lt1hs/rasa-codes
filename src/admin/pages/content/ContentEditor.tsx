import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon,
  PhotoIcon,
  EyeIcon,
  DocumentTextIcon,
  TagIcon,
  CalendarIcon,
  GlobeAltIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../utils/cn';

const ContentEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [contentData, setContentData] = useState({
    title: '',
    content: '',
    excerpt: '',
    type: 'post',
    status: 'draft',
    category: '',
    tags: [],
    featured: false,
    seoTitle: '',
    seoDescription: '',
    publishDate: '',
    visibility: 'public'
  });

  const contentTypes = [
    { value: 'post', label: 'مقاله', icon: DocumentTextIcon },
    { value: 'page', label: 'صفحه', icon: DocumentTextIcon },
    { value: 'product', label: 'محصول', icon: TagIcon },
    { value: 'service', label: 'خدمت', icon: GlobeAltIcon }
  ];

  const statusOptions = [
    { value: 'draft', label: 'پیش‌نویس', color: 'bg-gray-500' },
    { value: 'published', label: 'منتشر شده', color: 'bg-lime-500' },
    { value: 'scheduled', label: 'زمان‌بندی شده', color: 'bg-orange-500' },
    { value: 'archived', label: 'آرشیو شده', color: 'bg-red-500' }
  ];

  const tabs = [
    { key: 'content', label: 'محتوا', icon: DocumentTextIcon },
    { key: 'settings', label: 'تنظیمات', icon: TagIcon },
    { key: 'seo', label: 'سئو', icon: GlobeAltIcon },
    { key: 'preview', label: 'پیش‌نمایش', icon: EyeIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Button variant="ghost" className="admin-text-light/70">
            <ArrowRightIcon className="w-4 h-4 ml-2" />
            بازگشت
          </Button>
          <div>
            <h1 className="text-2xl font-bold admin-text-light">ویرایش محتوا</h1>
            <p className="admin-text-light/70 mt-1">ایجاد و ویرایش محتوای جدید</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <Button variant="ghost" className="admin-text-light/70">
            <EyeIcon className="w-4 h-4 ml-2" />
            پیش‌نمایش
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            ذخیره و انتشار
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs */}
          <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
            <CardContent className="p-0">
              <div className="flex border-b border-primary/10">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "flex items-center space-x-2 space-x-reverse px-6 py-4 text-sm font-medium transition-all duration-200",
                      activeTab === tab.key
                        ? "border-b-2 border-orange-500 admin-text-light bg-primary/5"
                        : "admin-text-light/70 hover:admin-text-light hover:bg-primary/5"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium admin-text-light mb-2">عنوان</label>
                      <input
                        type="text"
                        value={contentData.title}
                        onChange={(e) => setContentData({...contentData, title: e.target.value})}
                        placeholder="عنوان محتوا را وارد کنید..."
                        className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50 text-lg"
                      />
                    </div>

                    {/* Content Editor */}
                    <div>
                      <label className="block text-sm font-medium admin-text-light mb-2">محتوا</label>
                      <div className="glass border border-primary/20 rounded-lg overflow-hidden">
                        <div className="flex items-center space-x-2 space-x-reverse p-3 border-b border-primary/10">
                          <Button variant="ghost" size="sm" className="admin-text-light/70">B</Button>
                          <Button variant="ghost" size="sm" className="admin-text-light/70">I</Button>
                          <Button variant="ghost" size="sm" className="admin-text-light/70">U</Button>
                          <div className="w-px h-4 bg-primary/20"></div>
                          <Button variant="ghost" size="sm" className="admin-text-light/70">
                            <PhotoIcon className="w-4 h-4" />
                          </Button>
                        </div>
                        <textarea
                          value={contentData.content}
                          onChange={(e) => setContentData({...contentData, content: e.target.value})}
                          placeholder="محتوای خود را اینجا بنویسید..."
                          rows={12}
                          className="w-full p-4 bg-transparent admin-text-light placeholder-admin-text-light/50 resize-none focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-sm font-medium admin-text-light mb-2">خلاصه</label>
                      <textarea
                        value={contentData.excerpt}
                        onChange={(e) => setContentData({...contentData, excerpt: e.target.value})}
                        placeholder="خلاصه‌ای از محتوا برای نمایش در لیست‌ها..."
                        rows={3}
                        className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50 resize-none"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    {/* Content Type */}
                    <div>
                      <label className="block text-sm font-medium admin-text-light mb-3">نوع محتوا</label>
                      <div className="grid grid-cols-2 gap-3">
                        {contentTypes.map(type => (
                          <button
                            key={type.value}
                            onClick={() => setContentData({...contentData, type: type.value})}
                            className={cn(
                              "flex items-center space-x-3 space-x-reverse p-4 rounded-lg border transition-all duration-200",
                              contentData.type === type.value
                                ? "border-orange-500 bg-orange-500/10 admin-text-light"
                                : "border-primary/20 admin-text-light/70 hover:border-primary/40 hover:admin-text-light"
                            )}
                          >
                            <type.icon className="w-5 h-5" />
                            <span>{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium admin-text-light mb-2">دسته‌بندی</label>
                      <select
                        value={contentData.category}
                        onChange={(e) => setContentData({...contentData, category: e.target.value})}
                        className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light"
                      >
                        <option value="">انتخاب دسته‌بندی</option>
                        <option value="news">اخبار</option>
                        <option value="products">محصولات</option>
                        <option value="services">خدمات</option>
                        <option value="guides">راهنما</option>
                      </select>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium admin-text-light mb-2">برچسب‌ها</label>
                      <input
                        type="text"
                        placeholder="برچسب‌ها را با کاما جدا کنید..."
                        className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50"
                      />
                    </div>

                    {/* Featured */}
                    <div className="flex items-center justify-between p-4 glass border border-primary/20 rounded-lg">
                      <div>
                        <h4 className="font-medium admin-text-light">محتوای ویژه</h4>
                        <p className="text-sm admin-text-light/70">این محتوا در بخش ویژه نمایش داده شود</p>
                      </div>
                      <button
                        onClick={() => setContentData({...contentData, featured: !contentData.featured})}
                        className={cn(
                          "relative w-12 h-6 rounded-full transition-colors duration-200",
                          contentData.featured ? "bg-orange-500" : "bg-gray-600"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200",
                          contentData.featured ? "translate-x-7" : "translate-x-1"
                        )} />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium admin-text-light mb-2">عنوان سئو</label>
                      <input
                        type="text"
                        value={contentData.seoTitle}
                        onChange={(e) => setContentData({...contentData, seoTitle: e.target.value})}
                        placeholder="عنوان برای موتورهای جستجو..."
                        className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium admin-text-light mb-2">توضیحات سئو</label>
                      <textarea
                        value={contentData.seoDescription}
                        onChange={(e) => setContentData({...contentData, seoDescription: e.target.value})}
                        placeholder="توضیحات برای موتورهای جستجو..."
                        rows={4}
                        className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50 resize-none"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'preview' && (
                  <div className="space-y-6">
                    <div className="glass border border-primary/20 rounded-lg p-6">
                      <h2 className="text-2xl font-bold admin-text-light mb-4">
                        {contentData.title || 'عنوان محتوا'}
                      </h2>
                      <div className="admin-text-light/70 whitespace-pre-wrap">
                        {contentData.content || 'محتوای شما اینجا نمایش داده خواهد شد...'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="admin-text-light">انتشار</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">وضعیت</label>
                <select
                  value={contentData.status}
                  onChange={(e) => setContentData({...contentData, status: e.target.value})}
                  className="w-full px-3 py-2 glass border border-primary/20 rounded-lg focus:outline-none admin-text-light text-sm"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">تاریخ انتشار</label>
                <input
                  type="datetime-local"
                  value={contentData.publishDate}
                  onChange={(e) => setContentData({...contentData, publishDate: e.target.value})}
                  className="w-full px-3 py-2 glass border border-primary/20 rounded-lg focus:outline-none admin-text-light text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">نمایش</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={contentData.visibility === 'public'}
                      onChange={(e) => setContentData({...contentData, visibility: e.target.value})}
                      className="text-orange-500"
                    />
                    <GlobeAltIcon className="w-4 h-4 admin-text-light/70" />
                    <span className="text-sm admin-text-light">عمومی</span>
                  </label>
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={contentData.visibility === 'private'}
                      onChange={(e) => setContentData({...contentData, visibility: e.target.value})}
                      className="text-orange-500"
                    />
                    <LockClosedIcon className="w-4 h-4 admin-text-light/70" />
                    <span className="text-sm admin-text-light">خصوصی</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="admin-text-light">تصویر شاخص</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center">
                <PhotoIcon className="w-12 h-12 admin-text-light/30 mx-auto mb-3" />
                <p className="text-sm admin-text-light/70 mb-3">تصویر شاخص را انتخاب کنید</p>
                <Button variant="ghost" size="sm" className="admin-text-light/70">
                  انتخاب تصویر
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
