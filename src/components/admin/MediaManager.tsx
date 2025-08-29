import React, { useState, useEffect } from 'react';
import '../../styles/admin/MediaManager.scss';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'audio';
  size: string;
  dimensions?: string;
  url: string;
  thumbnailUrl: string;
  uploadDate: string;
  uploader: string;
}

const MediaManager: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<keyof MediaItem>('uploadDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<MediaItem | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    // Simulate fetching media items from an API
    const fetchMediaItems = () => {
      setIsLoading(true);

      // In a real application, you would fetch this data from your API
      setTimeout(() => {
        const mockMediaItems: MediaItem[] = [
          {
            id: '1',
            name: 'hero-image.jpg',
            type: 'image',
            size: '2.4 MB',
            dimensions: '1920x1080',
            url: 'https://via.placeholder.com/1920x1080',
            thumbnailUrl: 'https://via.placeholder.com/300x200',
            uploadDate: '2023-06-15',
            uploader: 'Admin'
          },
          {
            id: '2',
            name: 'product-demo.mp4',
            type: 'video',
            size: '15.8 MB',
            dimensions: '1280x720',
            url: 'https://example.com/videos/product-demo.mp4',
            thumbnailUrl: 'https://via.placeholder.com/300x200',
            uploadDate: '2023-06-10',
            uploader: 'Jane Smith'
          },
          {
            id: '3',
            name: 'user-manual.pdf',
            type: 'document',
            size: '4.2 MB',
            url: 'https://example.com/documents/user-manual.pdf',
            thumbnailUrl: 'https://via.placeholder.com/300x200',
            uploadDate: '2023-06-05',
            uploader: 'Admin'
          },
          {
            id: '4',
            name: 'logo.png',
            type: 'image',
            size: '0.8 MB',
            dimensions: '512x512',
            url: 'https://via.placeholder.com/512x512',
            thumbnailUrl: 'https://via.placeholder.com/300x200',
            uploadDate: '2023-05-20',
            uploader: 'John Doe'
          },
          {
            id: '5',
            name: 'podcast-episode.mp3',
            type: 'audio',
            size: '28.6 MB',
            url: 'https://example.com/audio/podcast-episode.mp3',
            thumbnailUrl: 'https://via.placeholder.com/300x200',
            uploadDate: '2023-06-12',
            uploader: 'Jane Smith'
          },
          {
            id: '6',
            name: 'background-pattern.jpg',
            type: 'image',
            size: '1.5 MB',
            dimensions: '2000x2000',
            url: 'https://via.placeholder.com/2000x2000',
            thumbnailUrl: 'https://via.placeholder.com/300x200',
            uploadDate: '2023-06-08',
            uploader: 'Admin'
          },
        ];

        setMediaItems(mockMediaItems);
        setIsLoading(false);
      }, 800);
    };

    fetchMediaItems();
  }, []);

  // Filter and sort media items
  const filteredAndSortedItems = mediaItems
    .filter(item => {
      const matchesType = filterType === 'all' || item.type === filterType;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
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

  const handleSort = (field: keyof MediaItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = () => {
    // In a real application, you would call your API to delete the selected items
    setMediaItems(mediaItems.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setShowDeleteModal(false);
  };

  const handleViewDetails = (item: MediaItem) => {
    setCurrentItem(item);
    setShowDetailsModal(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return '🖼️';
      case 'video': return '🎬';
      case 'document': return '📄';
      case 'audio': return '🔊';
      default: return '📁';
    }
  };

  return (
    <div className="media-manager">
      <div className="media-header">
        <h2>کتابخانه رسانه</h2>
        <div className="media-actions">
          <div className="view-toggle">
            <button 
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="نمای شبکه‌ای"
            >
              📱
            </button>
            <button 
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="نمای لیستی"
            >
              📋
            </button>
          </div>
          <button 
            className="upload-button" 
            onClick={() => setShowUploadModal(true)}
          >
            آپلود رسانه
          </button>
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

      <div className="media-filters">
        <div className="search-filter">
          <input
            type="text"
            placeholder="جستجوی رسانه..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="type-filter">
          <label htmlFor="type-select">نوع:</label>
          <select 
            id="type-select" 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">همه انواع</option>
            <option value="image">تصاویر</option>
            <option value="video">ویدیوها</option>
            <option value="document">اسناد</option>
            <option value="audio">صوت</option>
          </select>
        </div>
        
        <div className="sort-filter">
          <label htmlFor="sort-select">مرتب‌سازی بر اساس:</label>
          <select 
            id="sort-select" 
            value={`${sortField}-${sortDirection}`}
            onChange={(e) => {
              const [field, direction] = e.target.value.split('-');
              setSortField(field as keyof MediaItem);
              setSortDirection(direction as 'asc' | 'desc');
            }}
          >
            <option value="uploadDate-desc">تاریخ (جدیدترین)</option>
            <option value="uploadDate-asc">تاریخ (قدیمی‌ترین)</option>
            <option value="name-asc">نام (الف تا ی)</option>
            <option value="name-desc">نام (ی تا الف)</option>
            <option value="size-desc">اندازه (بزرگترین)</option>
            <option value="size-asc">اندازه (کوچکترین)</option>
          </select>
        </div>
      </div>

      <div className={`media-container ${viewMode}`}>
        {isLoading ? (
          <div className="loading-indicator">Loading media items...</div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="media-grid">
                {filteredAndSortedItems.length === 0 ? (
                  <div className="no-items">No media items found.</div>
                ) : (
                  filteredAndSortedItems.map((item) => (
                    <div 
                      key={item.id} 
                      className={`media-grid-item ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                      onClick={() => handleSelectItem(item.id)}
                    >
                      <div className="media-thumbnail">
                        <img src={item.thumbnailUrl} alt={item.name} />
                        <div className="media-type-icon">{getTypeIcon(item.type)}</div>
                      </div>
                      <div className="media-info">
                        <h4 className="media-name">{item.name}</h4>
                        <p className="media-details">
                          {item.size} • {item.uploadDate}
                        </p>
                      </div>
                      <div className="media-actions">
                        <button 
                          className="view-button" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(item);
                          }}
                          title="View Details"
                        >
                          👁️
                        </button>
                        <button 
                          className="delete-button" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItems([item.id]);
                            setShowDeleteModal(true);
                          }}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <table className="media-table">
                <thead>
                  <tr>
                    <th className="checkbox-column">
                      <input 
                        type="checkbox" 
                        checked={selectedItems.length === filteredAndSortedItems.length && filteredAndSortedItems.length > 0}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>پیش‌نمایش</th>
                    <th 
                      className={`sortable ${sortField === 'name' ? 'sorted' : ''}`}
                      onClick={() => handleSort('name')}
                    >
                      نام
                      {sortField === 'name' && (
                        <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    <th 
                      className={`sortable ${sortField === 'type' ? 'sorted' : ''}`}
                      onClick={() => handleSort('type')}
                    >
                      نوع
                      {sortField === 'type' && (
                        <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    <th 
                      className={`sortable ${sortField === 'size' ? 'sorted' : ''}`}
                      onClick={() => handleSort('size')}
                    >
                      اندازه
                      {sortField === 'size' && (
                        <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    <th 
                      className={`sortable ${sortField === 'uploadDate' ? 'sorted' : ''}`}
                      onClick={() => handleSort('uploadDate')}
                    >
                      تاریخ آپلود
                      {sortField === 'uploadDate' && (
                        <span className="sort-indicator">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </th>
                    <th>عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedItems.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="no-items">
                        هیچ رسانه‌ای یافت نشد.
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
                        <td className="preview-cell">
                          <img 
                            src={item.thumbnailUrl} 
                            alt={item.name} 
                            className="preview-thumbnail"
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>
                          <span className="type-icon">{getTypeIcon(item.type)}</span>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </td>
                        <td>{item.size}</td>
                        <td>{item.uploadDate}</td>
                        <td className="actions-cell">
                          <button 
                            className="view-button" 
                            onClick={() => handleViewDetails(item)}
                            title="View Details"
                          >
                            👁️
                          </button>
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
          </>
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal upload-modal">
            <h3>آپلود رسانه</h3>
            <div className="upload-area">
              <div className="upload-dropzone">
                <p>فایل‌ها را اینجا بکشید و رها کنید</p>
                <p>یا</p>
                <button className="browse-button">انتخاب فایل‌ها</button>
                <p className="upload-hint">فرمت‌های پشتیبانی شده: JPG, PNG, GIF, MP4, PDF, MP3</p>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="cancel-button" 
                onClick={() => setShowUploadModal(false)}
              >
                انصراف
              </button>
              <button 
                className="upload-button" 
                onClick={() => {
                  // In a real application, you would process the uploads here
                  setShowUploadModal(false);
                }}
              >
                آپلود فایل‌ها
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Details Modal */}
      {showDetailsModal && currentItem && (
        <div className="modal-overlay">
          <div className="modal details-modal">
            <h3>جزئیات رسانه</h3>
            <div className="media-details-content">
              <div className="media-preview">
                {currentItem.type === 'image' ? (
                  <img src={currentItem.url} alt={currentItem.name} />
                ) : (
                  <div className="media-preview-placeholder">
                    <span className="media-type-icon">{getTypeIcon(currentItem.type)}</span>
                  </div>
                )}
              </div>
              <div className="media-details-info">
                <table className="details-table">
                  <tbody>
                    <tr>
                      <th>نام:</th>
                      <td>{currentItem.name}</td>
                    </tr>
                    <tr>
                      <th>نوع:</th>
                      <td>{currentItem.type.charAt(0).toUpperCase() + currentItem.type.slice(1)}</td>
                    </tr>
                    <tr>
                      <th>اندازه:</th>
                      <td>{currentItem.size}</td>
                    </tr>
                    {currentItem.dimensions && (
                      <tr>
                        <th>ابعاد:</th>
                        <td>{currentItem.dimensions}</td>
                      </tr>
                    )}
                    <tr>
                      <th>تاریخ آپلود:</th>
                      <td>{currentItem.uploadDate}</td>
                    </tr>
                    <tr>
                      <th>آپلود کننده:</th>
                      <td>{currentItem.uploader}</td>
                    </tr>
                    <tr>
                      <th>آدرس:</th>
                      <td>
                        <a href={currentItem.url} target="_blank" rel="noopener noreferrer">
                          مشاهده اصلی
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="close-button" 
                onClick={() => setShowDetailsModal(false)}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManager;