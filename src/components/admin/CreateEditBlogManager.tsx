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

interface CreateEditBlogManagerProps {
  currentItem: ContentItem | null;
  onSave: () => void;
  onCancel: () => void;
}

const CreateEditBlogManager: React.FC<CreateEditBlogManagerProps> = ({ currentItem, onSave, onCancel }) => {
  const [title, setTitle] = useState(currentItem?.title || '');
  const [slug, setSlug] = useState(currentItem?.slug || '');
  const [author, setAuthor] = useState(currentItem?.author || 'Admin');
  const [publishDate, setPublishDate] = useState(currentItem?.publishDate || new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState(currentItem?.status || 'draft');
  const [tags, setTags] = useState(currentItem?.tags.join(', ') || '');
  const [content, setContent] = useState("محتوای پست بلاگ را اینجا وارد کنید..."); // Placeholder for actual content
  const [featuredImage, setFeaturedImage] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');

  useEffect(() => {
    if (currentItem) {
      setTitle(currentItem.title);
      setSlug(currentItem.slug);
      setAuthor(currentItem.author);
      setPublishDate(currentItem.publishDate);
      setStatus(currentItem.status);
      setTags(currentItem.tags.join(', '));
      // In a real app, you'd fetch the full content of the blog post here
      setContent("محتوای ویرایش شده پست بلاگ..."); 
      // Assuming these fields would also be part of currentItem in a real app
      setFeaturedImage(''); 
      setSeoTitle('');
      setSeoDescription('');
      setSeoKeywords('');
    } else {
      setTitle('');
      setSlug('');
      setAuthor('Admin');
      setPublishDate(new Date().toISOString().slice(0, 10));
      setStatus('draft');
      setTags('');
      setContent("محتوای پست بلاگ را اینجا وارد کنید...");
      setFeaturedImage('');
      setSeoTitle('');
      setSeoDescription('');
      setSeoKeywords('');
    }
  }, [currentItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would save the form data to your API
    console.log({
      id: currentItem?.id || Date.now().toString(), // Simple ID generation for mock
      title,
      slug,
      type: 'post', // Always 'post' for blog manager
      status,
      lastModified: new Date().toISOString().slice(0, 10),
      author,
      publishDate,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      featuredImage,
      seoTitle,
      seoDescription,
      seoKeywords: seoKeywords.split(',').map(keyword => keyword.trim()).filter(keyword => keyword !== '')
    });
    onSave();
  };

  return (
    <div className="add-edit-modal">
      <h3 className="modal-title">{currentItem ? 'ویرایش پست بلاگ' : 'افزودن پست بلاگ جدید'}</h3>
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-section main-content">
          <div className="form-group">
            <label htmlFor="content-title">عنوان</label>
            <input 
              type="text" 
              id="content-title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content-editor">محتوا</label>
            <textarea 
              id="content-editor" 
              rows={15} 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-textarea"
            />
          </div>
        </div>

        <div className="form-section sidebar-content">
          <div className="form-group">
            <label htmlFor="content-slug">اسلاگ (URL)</label>
            <input 
              type="text" 
              id="content-slug" 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="featured-image">تصویر شاخص (URL)</label>
            <input 
              type="text" 
              id="featured-image" 
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              className="form-input"
              placeholder="مثال: /images/blog/my-blog-post.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content-author">نویسنده</label>
            <input 
              type="text" 
              id="content-author" 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content-publish-date">تاریخ انتشار</label>
            <input 
              type="date" 
              id="content-publish-date" 
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content-status">وضعیت</label>
            <select 
              id="content-status" 
              value={status}
              onChange={(e) => setStatus(e.target.value as 'published' | 'draft' | 'archived')}
              className="form-select"
            >
              <option value="published">منتشر شده</option>
              <option value="draft">پیش‌نویس</option>
              <option value="archived">بایگانی شده</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content-tags">برچسب‌ها (با کاما جدا کنید)</label>
            <input 
              type="text" 
              id="content-tags" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="مثال: React, JavaScript, Web Development"
              className="form-input"
            />
          </div>

          <div className="form-section seo-settings">
            <h4>تنظیمات سئو</h4>
            <div className="form-group">
              <label htmlFor="seo-title">عنوان سئو</label>
              <input 
                type="text" 
                id="seo-title" 
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="form-input"
                placeholder="عنوان بهینه شده برای موتورهای جستجو"
              />
            </div>
            <div className="form-group">
              <label htmlFor="seo-description">توضیحات متا</label>
              <textarea 
                id="seo-description" 
                rows={3} 
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="form-textarea"
                placeholder="توضیحات کوتاه برای نمایش در نتایج جستجو"
              />
            </div>
            <div className="form-group">
              <label htmlFor="seo-keywords">کلمات کلیدی سئو (با کاما جدا کنید)</label>
              <input 
                type="text" 
                id="seo-keywords" 
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                className="form-input"
                placeholder="مثال: سئو, بلاگ, توسعه وب"
              />
            </div>
          </div>
        </div>
        
        <div className="modal-actions full-width">
          <button 
            type="button"
            className="cancel-button" 
            onClick={onCancel}
          >
            انصراف
          </button>
          <button 
            type="submit"
            className="save-button" 
          >
            ذخیره پست بلاگ
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditBlogManager;
