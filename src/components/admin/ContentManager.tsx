import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/admin/ContentManager.scss';

interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'post' | 'project' | 'product';
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  author: string;
  views?: number;
  excerpt?: string;
  thumbnail?: string;
  tags?: string[];
}

interface ContentStats {
  total: number;
  published: number;
  draft: number;
  archived: number;
  totalViews: number;
}

const ContentManager: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<keyof ContentItem>('lastModified');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<ContentItem | null>(null);
  const [stats, setStats] = useState<ContentStats>({
    total: 0,
    published: 0,
    draft: 0,
    archived: 0,
    totalViews: 0
  });

  useEffect(() => {
    const fetchContentItems = async () => {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const mockContentItems: ContentItem[] = [
          {
            id: '1',
            title: 'صفحه اصلی - معرفی خدمات',
            type: 'page',
            status: 'published',
            lastModified: '۱۴۰۲/۰۸/۱۵',
            author: 'مدیر سیستم',
            views: 2547,
            excerpt: 'صفحه اصلی وب‌سایت با معرفی کامل خدمات و ویژگی‌های شرکت',
            thumbnail: '/api/placeholder/300/200',
            tags: ['صفحه اصلی', 'خدمات', 'معرفی']
          },
          {
            id: '2',
            title: 'راهنمای شروع کار با React',
            type: 'post',
            status: 'published',
            lastModified: '۱۴۰۲/۰۸/۱۲',
            author: 'احمد محمدی',
            views: 1834,
            excerpt: 'آموزش کامل نحوه شروع کار با React برای توسعه‌دهندگان مبتدی',
            thumbnail: '/api/placeholder/300/200',
            tags: ['React', 'آموزش', 'برنامه‌نویسی']
          },
          {
            id: '3',
            title: 'پروژه سیستم مدیریت محتوا',
            type: 'project',
            status: 'draft',
            lastModified: '۱۴۰۲/۰۸/۱۰',
            author: 'فاطمه احمدی',
            views: 456,
            excerpt: 'توسعه سیستم مدیریت محتوای پیشرفته با قابلیت‌های مدرن',
            thumbnail: '/api/placeholder/300/200',
            tags: ['CMS', 'پروژه', 'توسعه']
          },
          {
            id: '4',
            title: 'محصول اشتراک ویژه',
            type: 'product',
            status: 'published',
            lastModified: '۱۴۰۲/۰۸/۰۸',
            author: 'مدیر فروش',
            views: 3421,
            excerpt: 'بسته اشتراک ویژه با امکانات پیشرفته برای کاربران حرفه‌ای',
            thumbnail: '/api/placeholder/300/200',
            tags: ['محصول', 'اشتراک', 'ویژه']
          },
          {
            id: '5',
            title: 'درباره ما - تاریخچه شرکت',
            type: 'page',
            status: 'published',
            lastModified: '۱۴۰۲/۰۸/۰۵',
            author: 'مدیر سیستم',
            views: 987,
            excerpt: 'معرفی کامل شرکت، تاریخچه و اهداف سازمانی',
            thumbnail: '/api/placeholder/300/200',
            tags: ['درباره ما', 'تاریخچه', 'شرکت']
          },
          {
            id: '6',
            title: 'آموزش TypeScript پیشرفته',
            type: 'post',
            status: 'archived',
            lastModified: '۱۴۰۲/۰۷/۲۰',
            author: 'علی رضایی',
            views: 1245,
            excerpt: 'آموزش مفاهیم پیشرفته TypeScript برای توسعه‌دهندگان',
            thumbnail: '/api/placeholder/300/200',
            tags: ['TypeScript', 'آموزش', 'پیشرفته']
          }
        ];

        setContentItems(mockContentItems);
        
        // Calculate stats
        const newStats: ContentStats = {
          total: mockContentItems.length,
          published: mockContentItems.filter(item => item.status === 'published').length,
          draft: mockContentItems.filter(item => item.status === 'draft').length,
          archived: mockContentItems.filter(item => item.status === 'archived').length,
          totalViews: mockContentItems.reduce((sum, item) => sum + (item.views || 0), 0)
        };
        setStats(newStats);
        
        setIsLoading(false);
      }, 1000);
    };

    fetchContentItems();
  }, []);

  // Filter and sort content items
  const filteredAndSortedItems = contentItems
    .filter(item => {
      const matchesType = filterType === 'all' || item.type === filterType;
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  const handleSelectAll = () => {
    if (selectedItems.length === filteredAndSortedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredAndSortedItems.map(item => item.id));
    }
  };

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleStatusChange = (id: string, newStatus: 'published' | 'draft' | 'archived') => {
    setContentItems(contentItems.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const handleDelete = () => {
    setContentItems(contentItems.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setShowDeleteModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'success';
      case 'draft': return 'warning';
      case 'archived': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page': return '📄';
      case 'post': return '📝';
      case 'project': return '🚀';
      case 'product': return '🛍️';
      default: return '📄';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'منتشر شده';
      case 'draft': return 'پیش‌نویس';
      case 'archived': return 'بایگانی';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'page': return 'صفحه';
      case 'post': return 'پست';
      case 'project': return 'پروژه';
      case 'product': return 'محصول';
      default: return type;
    }
  };

  if (isLoading) {
    return (
      <div className="content-manager loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>در حال بارگذاری محتوا...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="content-manager"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <div className="content-header">
        <div className="header-info">
          <h1>مدیریت محتوا</h1>
          <p>مدیریت و سازماندهی تمام محتوای وب‌سایت</p>
        </div>
        <div className="header-actions">
          <motion.button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="btn-icon">➕</span>
            افزودن محتوا
          </motion.button>
          
          <AnimatePresence>
            {selectedItems.length > 0 && (
              <motion.button
                className="btn btn-danger"
                onClick={() => setShowDeleteModal(true)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="btn-icon">🗑️</span>
                حذف ({selectedItems.length})
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>کل محتوا</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>منتشر شده</h3>
            <p className="stat-number">{stats.published}</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>پیش‌نویس</h3>
            <p className="stat-number">{stats.draft}</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon">👁️</div>
          <div className="stat-content">
            <h3>کل بازدید</h3>
            <p className="stat-number">{stats.totalViews.toLocaleString()}</p>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="content-controls">
        <div className="search-and-filters">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="جستجو در محتوا..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters">
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">همه انواع</option>
              <option value="page">صفحات</option>
              <option value="post">پست‌ها</option>
              <option value="project">پروژه‌ها</option>
              <option value="product">محصولات</option>
            </select>

            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="published">منتشر شده</option>
              <option value="draft">پیش‌نویس</option>
              <option value="archived">بایگانی</option>
            </select>
          </div>
        </div>

        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            ⊞
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {filteredAndSortedItems.length > 0 && (
        <div className="bulk-actions">
          <label className="select-all">
            <input
              type="checkbox"
              checked={selectedItems.length === filteredAndSortedItems.length}
              onChange={handleSelectAll}
            />
            انتخاب همه ({filteredAndSortedItems.length})
          </label>
        </div>
      )}

      {/* Content Grid/List */}
      <AnimatePresence mode="wait">
        {filteredAndSortedItems.length === 0 ? (
          <motion.div 
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="empty-icon">📭</div>
            <h3>محتوایی یافت نشد</h3>
            <p>هیچ محتوایی با فیلترهای انتخابی پیدا نشد.</p>
          </motion.div>
        ) : (
          <motion.div 
            className={`content-${viewMode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredAndSortedItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`content-item ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <div className="item-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </div>

                {viewMode === 'grid' && item.thumbnail && (
                  <div className="item-thumbnail">
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="item-overlay">
                      <button className="overlay-btn">👁️</button>
                      <button className="overlay-btn">✏️</button>
                    </div>
                  </div>
                )}

                <div className="item-content">
                  <div className="item-header">
                    <div className="item-type">
                      <span className="type-icon">{getTypeIcon(item.type)}</span>
                      <span className="type-text">{getTypeText(item.type)}</span>
                    </div>
                    <div className={`status-badge status-${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </div>
                  </div>

                  <h3 className="item-title">{item.title}</h3>
                  
                  {item.excerpt && (
                    <p className="item-excerpt">{item.excerpt}</p>
                  )}

                  <div className="item-meta">
                    <div className="meta-info">
                      <span className="author">👤 {item.author}</span>
                      <span className="date">📅 {item.lastModified}</span>
                      {item.views && (
                        <span className="views">👁️ {item.views.toLocaleString()}</span>
                      )}
                    </div>
                  </div>

                  {item.tags && (
                    <div className="item-tags">
                      {item.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">{tag}</span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="tag-more">+{item.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="item-actions">
                  <button className="action-btn" title="مشاهده">
                    👁️
                  </button>
                  <button className="action-btn" title="ویرایش">
                    ✏️
                  </button>
                  <div className="status-dropdown">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                      className="status-select"
                    >
                      <option value="published">منتشر شده</option>
                      <option value="draft">پیش‌نویس</option>
                      <option value="archived">بایگانی</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>تأیید حذف</h3>
              <p>آیا از حذف {selectedItems.length} مورد انتخابی اطمینان دارید؟</p>
              <div className="modal-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  انصراف
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  حذف
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContentManager;
