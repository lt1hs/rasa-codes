import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { blogService, Blog } from '../../services/blog.service';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setIsLoading(true);
      const data = await blogService.getAll();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to load blogs:', error);
      // Use mock data if database fails
      setBlogs([
        {
          id: '1',
          title: 'مقاله نمونه',
          slug: 'sample-post',
          excerpt: 'این یک مقاله نمونه است',
          content: 'محتوای نمونه',
          status: 'published' as const,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          view_count: 0,
          read_time: 5,
          featured_image: null,
          author_id: null,
          category: null,
          tags: null,
          published_at: null,
          author: { name: 'نویسنده نمونه', avatar_url: null }
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    navigate('/admin/blog/new');
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('آیا از حذف این مقاله اطمینان دارید؟')) {
      try {
        await blogService.delete(id);
        await loadBlogs();
      } catch (error) {
        console.error('Failed to delete blog:', error);
      }
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await blogService.publish(id);
      await loadBlogs();
    } catch (error) {
      console.error('Failed to publish blog:', error);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-300';
      case 'draft': return 'bg-yellow-500/20 text-yellow-300';
      case 'archived': return 'bg-gray-500/20 text-gray-300';
      default: return 'bg-blue-500/20 text-blue-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'منتشر شده';
      case 'draft': return 'پیش‌نویس';
      case 'archived': return 'آرشیو شده';
      default: return status;
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold admin-title-primary">مدیریت وبلاگ</h1>
            <p className="admin-text-light opacity-70 mt-2">
              مدیریت مقالات و محتوای وبلاگ
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            مقاله جدید
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="جستجو مقالات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-input px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-input px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="published">منتشر شده</option>
            <option value="draft">پیش‌نویس</option>
            <option value="archived">آرشیو شده</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="admin-card rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold admin-text-light">{blogs.length}</div>
              <div className="text-sm admin-text-light opacity-70">کل مقالات</div>
            </div>
          </div>
          <div className="admin-card rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{blogs.filter(b => b.status === 'published').length}</div>
              <div className="text-sm admin-text-light opacity-70">منتشر شده</div>
            </div>
          </div>
          <div className="admin-card rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{blogs.filter(b => b.status === 'draft').length}</div>
              <div className="text-sm admin-text-light opacity-70">پیش‌نویس</div>
            </div>
          </div>
          <div className="admin-card rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{blogs.reduce((sum, b) => sum + b.view_count, 0)}</div>
              <div className="text-sm admin-text-light opacity-70">کل بازدید</div>
            </div>
          </div>
        </div>

        {/* Blog List */}
        <div className="admin-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full admin-table">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">عنوان</th>
                  <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">نویسنده</th>
                  <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">وضعیت</th>
                  <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">بازدید</th>
                  <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">تاریخ</th>
                  <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredBlogs.map((blog) => (
                  <motion.tr
                    key={blog.id}
                    className="hover:bg-orange-500/5 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium admin-text-light">{blog.title}</div>
                        {blog.excerpt && (
                          <div className="text-sm admin-text-light opacity-70 mt-1">
                            {blog.excerpt.substring(0, 100)}...
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="admin-text-light">{blog.author?.name || 'نامشخص'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(blog.status)}`}>
                        {getStatusText(blog.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 admin-text-light">{blog.view_count}</td>
                    <td className="px-6 py-4 admin-text-light">
                      {new Date(blog.created_at).toLocaleDateString('fa-IR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(blog.id)}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-xs hover:bg-blue-500/30"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        {blog.status === 'draft' && (
                          <button
                            onClick={() => handlePublish(blog.id)}
                            className="px-3 py-1 bg-green-500/20 text-green-300 rounded text-xs hover:bg-green-500/30"
                          >
                            انتشار
                          </button>
                        )}
                        <button
                          onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                          className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded text-xs hover:bg-teal-500/30"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="px-3 py-1 bg-red-500/20 text-red-300 rounded text-xs hover:bg-red-500/30"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold admin-text-light mb-2">هیچ مقاله‌ای یافت نشد</h3>
            <p className="admin-text-light opacity-70 mb-6">اولین مقاله خود را ایجاد کنید</p>
            <button
              onClick={handleCreateNew}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              ایجاد مقاله جدید
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
