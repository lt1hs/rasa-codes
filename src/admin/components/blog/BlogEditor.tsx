import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { blogService, Blog } from '../../services/blog.service';

const BlogEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [] as string[],
    featured_image: '',
    status: 'draft' as 'draft' | 'published' | 'archived'
  });
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      loadBlog(id);
    }
  }, [id, isEditing]);

  const loadBlog = async (blogId: string) => {
    try {
      setIsLoading(true);
      const blog = await blogService.getById(blogId);
      if (blog) {
        setFormData({
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt || '',
          content: blog.content,
          category: blog.category || '',
          tags: blog.tags || [],
          featured_image: blog.featured_image || '',
          status: blog.status
        });
      }
    } catch (error) {
      console.error('Failed to load blog:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async (status?: 'draft' | 'published') => {
    try {
      setIsSaving(true);
      const dataToSave = {
        ...formData,
        status: status || formData.status
      };

      if (isEditing && id) {
        await blogService.update(id, dataToSave);
      } else {
        await blogService.create(dataToSave);
      }

      alert('مقاله با موفقیت ذخیره شد!');
      navigate('/admin/content/posts');
    } catch (error: any) {
      console.error('Failed to save blog:', error);
      if (error.message?.includes('Auth session missing')) {
        alert('لطفاً ابتدا وارد شوید (از باکس بالای صفحه)');
      } else {
        alert('خطا در ذخیره مقاله: ' + (error.message || 'خطای نامشخص'));
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="admin-text-light">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold admin-title-primary">
              {isEditing ? 'ویرایش مقاله' : 'مقاله جدید'}
            </h1>
            <p className="admin-text-light opacity-70 mt-2">
              {isEditing ? 'ویرایش مقاله موجود' : 'ایجاد مقاله جدید'}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleSave('draft')}
              disabled={isSaving}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
            >
              {isSaving ? 'در حال ذخیره...' : 'ذخیره پیش‌نویس'}
            </button>
            <button
              onClick={() => handleSave('published')}
              disabled={isSaving}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
            >
              {isSaving ? 'در حال انتشار...' : 'انتشار'}
            </button>
            <button
              onClick={() => navigate('/admin/content/posts')}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              لغو
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="admin-card rounded-xl p-6">
              <label className="block text-sm font-medium admin-text-light mb-2">عنوان مقاله</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="admin-input w-full px-4 py-3 rounded-lg text-lg"
                placeholder="عنوان مقاله را وارد کنید..."
              />
            </div>

            {/* Slug */}
            <div className="admin-card rounded-xl p-6">
              <label className="block text-sm font-medium admin-text-light mb-2">نامک (Slug)</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="admin-input w-full px-4 py-2 rounded-lg"
                placeholder="blog-post-slug"
              />
              <p className="text-xs admin-text-light opacity-60 mt-1">
                آدرس مقاله: /blog/{formData.slug}
              </p>
            </div>

            {/* Excerpt */}
            <div className="admin-card rounded-xl p-6">
              <label className="block text-sm font-medium admin-text-light mb-2">خلاصه مقاله</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={3}
                className="admin-input w-full px-4 py-2 rounded-lg resize-none"
                placeholder="خلاصه‌ای از محتوای مقاله..."
              />
            </div>

            {/* Content */}
            <div className="admin-card rounded-xl p-6">
              <label className="block text-sm font-medium admin-text-light mb-2">محتوای مقاله</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={15}
                className="admin-input w-full px-4 py-2 rounded-lg resize-none"
                placeholder="محتوای کامل مقاله را اینجا بنویسید..."
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="admin-card rounded-xl p-6">
              <label className="block text-sm font-medium admin-text-light mb-2">وضعیت</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="admin-input w-full px-4 py-2 rounded-lg"
              >
                <option value="draft">پیش‌نویس</option>
                <option value="published">منتشر شده</option>
                <option value="archived">آرشیو شده</option>
              </select>
            </div>

            {/* Category */}
            <div className="admin-card rounded-xl p-6">
              <label className="block text-sm font-medium admin-text-light mb-2">دسته‌بندی</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="admin-input w-full px-4 py-2 rounded-lg"
                placeholder="دسته‌بندی مقاله"
              />
            </div>

            {/* Tags */}
            <div className="admin-card rounded-xl p-6">
              <label className="block text-sm font-medium admin-text-light mb-2">برچسب‌ها</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="admin-input flex-1 px-3 py-2 rounded-lg"
                  placeholder="برچسب جدید"
                />
                <button
                  onClick={addTag}
                  className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  افزودن
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-orange-300 hover:text-orange-100"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div className="admin-card rounded-xl p-6">
              <label className="block text-sm font-medium admin-text-light mb-2">تصویر شاخص</label>
              <input
                type="url"
                value={formData.featured_image}
                onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                className="admin-input w-full px-4 py-2 rounded-lg"
                placeholder="آدرس تصویر شاخص"
              />
              {formData.featured_image && (
                <img
                  src={formData.featured_image}
                  alt="Featured"
                  className="mt-3 w-full h-32 object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
