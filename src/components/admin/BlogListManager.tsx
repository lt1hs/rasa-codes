import React, { useState, useEffect } from 'react';
import '../../styles/admin/ContentManager.scss'; // Reusing the same styles

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  type: 'page' | 'post' | 'project' | 'product';
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  author: string;
  publishDate: string;
  tags: string[];
}

interface BlogListManagerProps {
  onEditBlog: (item: ContentItem) => void;
}

const BlogListManager: React.FC<BlogListManagerProps> = ({ onEditBlog }) => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<keyof ContentItem>('lastModified');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // Simulate fetching content items from an API
    const fetchContentItems = () => {
      setIsLoading(true);

      // In a real application, you would fetch this data from your API
      setTimeout(() => {
        const mockContentItems: ContentItem[] = [
          {
            id: '3',
            title: 'Getting Started with React',
            slug: 'getting-started-with-react',
            type: 'post',
            status: 'published',
            lastModified: '2023-06-10',
            author: 'John Doe',
            publishDate: '2023-06-10',
            tags: ['React', 'JavaScript', 'Frontend']
          },
          {
            id: '4',
            title: 'Upcoming Features',
            slug: 'upcoming-features',
            type: 'post',
            status: 'draft',
            lastModified: '2023-06-14',
            author: 'Admin',
            publishDate: '2023-06-14',
            tags: ['Product', 'Roadmap']
          },
        ];

        setContentItems(mockContentItems);
        setIsLoading(false);
      }, 800);
    };

    fetchContentItems();
  }, []);

  // Filter and sort content items
  const filteredAndSortedItems = contentItems
    .filter(item => {
      const matchesType = filterType === 'all' || item.type === filterType;
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(filteredAndSortedItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSort = (field: keyof ContentItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = () => {
    // In a real application, you would call your API to delete the selected items
    setContentItems(contentItems.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setShowDeleteModal(false);
  };

  const handleStatusChange = (id: string, newStatus: 'published' | 'draft' | 'archived') => {
    // In a real application, you would call your API to update the status
    setContentItems(contentItems.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'published': return 'status-badge published';
      case 'draft': return 'status-badge draft';
      case 'archived': return 'status-badge archived';
      default: return 'status-badge';
    }
  };

  return (
    <div className="content-manager">
      <div className="content-header">
        <h2>لیست پست‌های بلاگ</h2>
        <div className="content-actions">
          {selectedItems.length > 0 && (
            <button 
              className="delete-button" 
              onClick={() => setShowDeleteModal(true)}
            >
              حذف انتخاب شده ({selectedItems.length})
            </button>
          )}
        </div>
      </div>

      <div className="content-filters">
        <div className="search-filter">
          <input
            type="text"
            placeholder="جستجوی پست بلاگ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="status-filter">
          <label htmlFor="status-select">وضعیت:</label>
          <select 
            id="status-select" 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="published">منتشر شده</option>
            <option value="draft">پیش‌نویس</option>
            <option value="archived">بایگانی شده</option>
          </select>
        </div>
      </div>

      <div className="content-table-container">
        {isLoading ? (
          <div className="loading-indicator">Loading blog posts...</div>
        ) : (
          <table className="content-table">
            <thead>
              <tr>
                <th className="checkbox-column">
                  <input 
                    type="checkbox" 
                    checked={selectedItems.length === filteredAndSortedItems.length && filteredAndSortedItems.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                  <th className={`sortable ${sortField === 'title' ? 'sorted' : ''}`}
                      onClick={() => handleSort('title')}
                    >
                      عنوان
                      {sortField === 'title' && (
                        <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    <th 
                      className={`sortable ${sortField === 'status' ? 'sorted' : ''}`}
                      onClick={() => handleSort('status')}
                    >
                      وضعیت
                      {sortField === 'status' && (
                        <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    <th 
                      className={`sortable ${sortField === 'lastModified' ? 'sorted' : ''}`}
                      onClick={() => handleSort('lastModified')}
                    >
                      آخرین تغییر
                      {sortField === 'lastModified' && (
                        <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    <th 
                      className={`sortable ${sortField === 'author' ? 'sorted' : ''}`}
                      onClick={() => handleSort('author')}
                    >
                      نویسنده
                      {sortField === 'author' && (
                        <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="no-items">
                    هیچ پست بلاگی یافت نشد.
                  </td>
                </tr>
              ) : (
                filteredAndSortedItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>
                      <span className={getStatusBadgeClass(item.status)}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td>{item.lastModified}</td>
                    <td>{item.author}</td>
                    <td className="actions-cell">
                      <button 
                        className="edit-button" 
                        onClick={() => onEditBlog(item)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <div className="status-dropdown">
                        <button className="status-button" title="Change Status">⚙️</button>
                        <div className="status-options">
                          <button onClick={() => handleStatusChange(item.id, 'published')}>انتشار</button>
                          <button onClick={() => handleStatusChange(item.id, 'draft')}>تنظیم به عنوان پیش‌نویس</button>
                          <button onClick={() => handleStatusChange(item.id, 'archived')}>بایگانی</button>
                        </div>
                      </div>
                      <button 
                        className="delete-button" 
                        onClick={() => {
                          setSelectedItems([item.id]);
                          setShowDeleteModal(true);
                        }}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <h3>تایید حذف</h3>
            <p>آیا مطمئن هستید که می‌خواهید {selectedItems.length} مورد انتخاب شده را حذف کنید؟</p>
            <p className="warning">این عمل قابل بازگشت نیست.</p>
            <div className="modal-actions">
              <button 
                className="cancel-button" 
                onClick={() => setShowDeleteModal(false)}
              >
                انصراف
              </button>
              <button 
                className="confirm-delete-button" 
                onClick={handleDelete}
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogListManager;
