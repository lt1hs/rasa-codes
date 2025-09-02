export type ContentStatus = 'draft' | 'published' | 'archived' | 'scheduled';
export type ContentType = 'blog_post' | 'page' | 'project' | 'news';

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  type: ContentType;
  status: ContentStatus;
  featuredImage?: string;
  tags: string[];
  categories: string[];
  author: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
  publishedAt?: Date;
  scheduledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export interface ContentFormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  type: ContentType;
  status: ContentStatus;
  featuredImage: string;
  tags: string[];
  categories: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
  scheduledAt?: Date;
}

export interface ContentFilters {
  type?: ContentType;
  status?: ContentStatus;
  author?: string;
  category?: string;
  tag?: string;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface ContentStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  scheduledPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
}

// Content categories and tags management
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  postCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  postCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Content search and pagination
export interface ContentSearchResult {
  items: ContentItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ContentListQuery {
  page?: number;
  pageSize?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'publishedAt' | 'title' | 'viewCount';
  sortOrder?: 'asc' | 'desc';
  filters?: ContentFilters;
}

// Rich text editor types
export interface EditorConfig {
  toolbar: string[];
  preview: boolean;
  hideToolbar?: boolean;
  visibleDragBar?: boolean;
  height?: number;
  enableScroll?: boolean;
}

export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  type: ContentType;
  previewImage?: string;
  isDefault?: boolean;
}

// Content revision system
export interface ContentRevision {
  id: string;
  contentId: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  changeDescription?: string;
  version: number;
}

// Content bulk operations
export type BulkAction = 'publish' | 'unpublish' | 'delete' | 'archive' | 'move_to_draft';

export interface BulkOperationResult {
  success: number;
  failed: number;
  errors: Array<{
    id: string;
    error: string;
  }>;
}