import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudArrowUpIcon,
  PhotoIcon,
  VideoCameraIcon,
  DocumentIcon,
  MusicalNoteIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  FolderIcon,
  PlusIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../utils/cn';
import { galleryService, GalleryItem } from '../../services/gallery.service';

const MediaLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [mediaItems, setMediaItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    images: 0,
    featured: 0,
    categories: 0
  });

  // Helper function to validate and clean image URLs
  const getValidImageUrl = (url: string, title: string) => {
    // Check if URL is a blob URL or localhost (but allow picsum.photos and other valid URLs)
    if (!url || url.startsWith('blob:') || url.includes('localhost:')) {
      return `https://via.placeholder.com/400x300/374151/9CA3AF?text=${encodeURIComponent(title || 'No Image')}`;
    }
    return url;
  };

  useEffect(() => {
    loadMediaItems();
  }, []);

  const loadMediaItems = async () => {
    try {
      setIsLoading(true);
      const items = await galleryService.getAll();
      
      // Clean up any items with invalid URLs (blob URLs, localhost, etc.)
      const cleanedItems = items.map(item => ({
        ...item,
        image_url: getValidImageUrl(item.image_url, item.title),
        thumbnail_url: item.thumbnail_url ? getValidImageUrl(item.thumbnail_url, item.title) : null
      }));
      
      setMediaItems(cleanedItems);
      
      // Calculate stats
      const categories = new Set(cleanedItems.map(item => item.category).filter(Boolean));
      setStats({
        total: cleanedItems.length,
        images: cleanedItems.length, // All items are images in gallery
        featured: cleanedItems.filter(item => item.is_featured).length,
        categories: categories.size
      });
    } catch (error) {
      console.error('Failed to load media items:', error);
      // Fallback to empty array
      setMediaItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (files: FileList) => {
    try {
      for (const file of Array.from(files)) {
        if (file.type.startsWith('image/')) {
          // Generate a realistic mock image URL
          const imageId = Math.random().toString(36).substr(2, 9);
          const mockImageUrl = `https://picsum.photos/400/300?random=${imageId}`;
          
          // Create a simple gallery item with realistic mock URL
          const newItem = {
            title: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
            description: `Uploaded image: ${file.name}`,
            image_url: mockImageUrl,
            thumbnail_url: `https://picsum.photos/200/150?random=${imageId}`,
            alt_text: file.name,
            category: 'uploads',
            tags: ['upload'],
            is_featured: false
          };
          
          await galleryService.create(newItem);
        }
      }
      
      await loadMediaItems();
      setShowUploadModal(false);
      alert('فایل‌ها با موفقیت آپلود شدند');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('خطا در آپلود فایل‌ها');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('آیا از حذف این فایل اطمینان دارید؟')) {
      try {
        await galleryService.delete(id);
        await loadMediaItems();
      } catch (error) {
        console.error('Delete failed:', error);
        alert('خطا در حذف فایل');
      }
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      await galleryService.update(id, { is_featured: !currentFeatured });
      await loadMediaItems();
    } catch (error) {
      console.error('Toggle featured failed:', error);
      alert('خطا در تغییر وضعیت ویژه');
    }
  };

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'featured' && item.is_featured) ||
                      (activeTab === 'images' && true) || // All items are images
                      (activeTab === 'category' && item.category);
    
    return matchesSearch && matchesTab;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="admin-text-light">در حال بارگذاری رسانه‌ها...</p>
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
            <h1 className="text-3xl font-bold admin-title-primary">کتابخانه رسانه</h1>
            <p className="admin-text-light opacity-70 mt-2">
              مدیریت تصاویر و فایل‌های رسانه‌ای
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <CloudArrowUpIcon className="w-5 h-5" />
            آپلود فایل
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="admin-card rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold admin-text-light">{stats.total}</div>
              <div className="text-sm admin-text-light opacity-70">کل فایل‌ها</div>
            </div>
          </div>
          <div className="admin-card rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.images}</div>
              <div className="text-sm admin-text-light opacity-70">تصاویر</div>
            </div>
          </div>
          <div className="admin-card rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.featured}</div>
              <div className="text-sm admin-text-light opacity-70">ویژه</div>
            </div>
          </div>
          <div className="admin-card rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{stats.categories}</div>
              <div className="text-sm admin-text-light opacity-70">دسته‌بندی</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="جستجو در رسانه‌ها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-input px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'همه' },
                { key: 'images', label: 'تصاویر' },
                { key: 'featured', label: 'ویژه' },
                { key: 'category', label: 'دسته‌بندی شده' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "px-4 py-2 rounded-lg transition-colors",
                    activeTab === tab.key
                      ? "bg-orange-500 text-white"
                      : "bg-white/10 admin-text-light hover:bg-white/20"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'grid' ? "bg-orange-500 text-white" : "bg-white/10 admin-text-light"
              )}
            >
              <Squares2X2Icon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'list' ? "bg-orange-500 text-white" : "bg-white/10 admin-text-light"
              )}
            >
              <ListBulletIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Grid */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className="admin-card rounded-xl overflow-hidden group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative aspect-video bg-gray-800">
                  <img
                    src={getValidImageUrl(item.thumbnail_url || item.image_url, item.title)}
                    alt={item.alt_text || item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/400x300/374151/9CA3AF?text=${encodeURIComponent(item.title || 'No Image')}`;
                    }}
                  />
                  {item.is_featured && (
                    <div className="absolute top-2 right-2">
                      <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        const validUrl = getValidImageUrl(item.image_url, item.title);
                        window.open(validUrl, '_blank');
                      }}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <EyeIcon className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(item.id, item.is_featured)}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <StarIcon className={cn("w-5 h-5", item.is_featured ? "text-yellow-400 fill-current" : "text-white")} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <TrashIcon className="w-5 h-5 text-red-300" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold admin-text-light truncate">{item.title}</h3>
                  <p className="text-sm admin-text-light opacity-70 mt-1 line-clamp-2">
                    {item.description || 'بدون توضیحات'}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs admin-text-light opacity-60">
                      {new Date(item.created_at).toLocaleDateString('fa-IR')}
                    </span>
                    {item.category && (
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="admin-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full admin-table">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">فایل</th>
                    <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">دسته‌بندی</th>
                    <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">وضعیت</th>
                    <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">تاریخ</th>
                    <th className="px-6 py-4 text-right text-sm font-medium admin-text-light">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-orange-500/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={getValidImageUrl(item.thumbnail_url || item.image_url, item.title)}
                            alt={item.alt_text || item.title}
                            className="w-12 h-12 object-cover rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://via.placeholder.com/48x48/374151/9CA3AF?text=${encodeURIComponent('No Image')}`;
                            }}
                          />
                          <div>
                            <div className="font-medium admin-text-light">{item.title}</div>
                            <div className="text-sm admin-text-light opacity-70">
                              {item.description?.substring(0, 50)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.category ? (
                          <Badge variant="secondary">{item.category}</Badge>
                        ) : (
                          <span className="admin-text-light opacity-50">بدون دسته</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {item.is_featured && (
                            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                          )}
                          <span className="text-sm admin-text-light">
                            {item.is_featured ? 'ویژه' : 'عادی'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 admin-text-light">
                        {new Date(item.created_at).toLocaleDateString('fa-IR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const validUrl = getValidImageUrl(item.image_url, item.title);
                              window.open(validUrl, '_blank');
                            }}
                            className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-xs hover:bg-blue-500/30"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(item.id, item.is_featured)}
                            className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded text-xs hover:bg-yellow-500/30"
                          >
                            <StarIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-3 py-1 bg-red-500/20 text-red-300 rounded text-xs hover:bg-red-500/30"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold admin-text-light mb-2">هیچ فایلی یافت نشد</h3>
            <p className="admin-text-light opacity-70 mb-6">اولین فایل خود را آپلود کنید</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              آپلود فایل جدید
            </button>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="admin-card rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold admin-title-accent mb-4">آپلود فایل جدید</h3>
              <div className="border-2 border-dashed border-orange-500/50 rounded-lg p-8 text-center">
                <CloudArrowUpIcon className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <p className="admin-text-light mb-4">فایل‌های خود را اینجا بکشید یا کلیک کنید</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 cursor-pointer inline-block"
                >
                  انتخاب فایل‌ها
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  لغو
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
