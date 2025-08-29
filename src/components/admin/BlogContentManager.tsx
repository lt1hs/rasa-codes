import React, { useState } from 'react';
import BlogListManager from './BlogListManager';
import CreateEditBlogManager from './CreateEditBlogManager';
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

const BlogContentManager: React.FC = () => {
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<ContentItem | null>(null);

  const handleAddNewBlog = () => {
    setCurrentItem(null);
    setShowCreateEditModal(true);
  };

  const handleEditBlog = (item: ContentItem) => {
    setCurrentItem(item);
    setShowCreateEditModal(true);
  };

  const handleSaveBlog = () => {
    setShowCreateEditModal(false);
    setCurrentItem(null);
    // In a real application, you would re-fetch the list of blogs here
  };

  const handleCancelEdit = () => {
    setShowCreateEditModal(false);
    setCurrentItem(null);
  };

  return (
    <div className="content-manager">
      {!showCreateEditModal ? (
        <>
          <div className="content-header">
            <h2>مدیریت محتوای بلاگ</h2>
            <div className="content-actions">
              <button className="add-new-button" onClick={handleAddNewBlog}>
                افزودن پست بلاگ جدید
              </button>
            </div>
          </div>
          <BlogListManager onEditBlog={handleEditBlog} />
        </>
      ) : (
        <div className="modal-overlay">
          <CreateEditBlogManager 
            currentItem={currentItem} 
            onSave={handleSaveBlog} 
            onCancel={handleCancelEdit} 
          />
        </div>
      )}
    </div>
  );
};

export default BlogContentManager;
