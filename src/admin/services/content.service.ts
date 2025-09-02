import axios, { AxiosResponse } from 'axios';
import { 
  ContentItem, 
  ContentFormData, 
  ContentSearchResult, 
  ContentListQuery,
  ContentStats,
  Category,
  Tag,
  ContentRevision,
  BulkAction,
  BulkOperationResult,
  ContentTemplate
} from '../types/content.types';

// Mock API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Axios instance for content API
const contentAPI = axios.create({
  baseURL: `${API_BASE_URL}/content`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for development
const generateMockContent = (): ContentItem[] => [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    slug: 'getting-started-react-typescript',
    content: '# Getting Started with React and TypeScript\n\nThis comprehensive guide will help you build modern React applications with TypeScript...\n\n## Prerequisites\n\n- Basic knowledge of JavaScript\n- Node.js installed on your machine\n- Code editor (VS Code recommended)\n\n## Installation\n\n```bash\nnpx create-react-app my-app --template typescript\ncd my-app\nnpm start\n```',
    excerpt: 'Learn how to build modern React applications with TypeScript in this comprehensive guide.',
    type: 'blog_post',
    status: 'published',
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    tags: ['react', 'typescript', 'javascript', 'tutorial'],
    categories: ['development', 'frontend'],
    author: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
    },
    seo: {
      metaTitle: 'Getting Started with React and TypeScript - Complete Guide',
      metaDescription: 'Learn React with TypeScript from basics to advanced concepts.',
      keywords: ['react', 'typescript', 'javascript', 'web development'],
      ogImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200'
    },
    publishedAt: new Date('2024-01-15T10:00:00Z'),
    createdAt: new Date('2024-01-14T15:30:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    viewCount: 1247,
    likeCount: 89,
    commentCount: 23
  },
  {
    id: '2',
    title: 'Advanced Dashboard Analytics Implementation',
    slug: 'advanced-dashboard-analytics',
    content: '# Advanced Dashboard Analytics\n\nBuilding comprehensive analytics dashboards requires careful planning and the right tools...',
    excerpt: 'Learn how to implement advanced analytics dashboards with real-time data visualization.',
    type: 'blog_post',
    status: 'draft',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    tags: ['analytics', 'dashboard', 'data-visualization'],
    categories: ['development', 'analytics'],
    author: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
    },
    seo: {
      metaTitle: 'Advanced Dashboard Analytics Implementation Guide',
      metaDescription: 'Build powerful analytics dashboards with real-time data.',
      keywords: ['analytics', 'dashboard', 'data visualization', 'charts']
    },
    createdAt: new Date('2024-01-20T14:20:00Z'),
    updatedAt: new Date('2024-01-20T16:45:00Z'),
    viewCount: 0,
    likeCount: 0,
    commentCount: 0
  }
];

const generateMockCategories = (): Category[] => [
  {
    id: '1',
    name: 'Development',
    slug: 'development',
    description: 'Software development tutorials and guides',
    color: '#3b82f6',
    postCount: 15,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Frontend',
    slug: 'frontend',
    description: 'Frontend development and UI/UX',
    color: '#10b981',
    postCount: 8,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

const generateMockTags = (): Tag[] => [
  { id: '1', name: 'React', slug: 'react', postCount: 5, createdAt: new Date('2024-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '2', name: 'TypeScript', slug: 'typescript', postCount: 3, createdAt: new Date('2024-01-01'), updatedAt: new Date('2024-01-01') },
  { id: '3', name: 'JavaScript', slug: 'javascript', postCount: 7, createdAt: new Date('2024-01-01'), updatedAt: new Date('2024-01-01') }
];

// Content CRUD operations
export const getContentList = async (query?: ContentListQuery): Promise<ContentSearchResult> => {
  if (import.meta.env.DEV) {
    // Mock implementation for development
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockData = generateMockContent();
    const { page = 1, pageSize = 10, sortBy = 'createdAt', sortOrder = 'desc', filters } = query || {};
    
    let filteredData = [...mockData];
    
    // Apply filters
    if (filters?.status) {
      filteredData = filteredData.filter(item => item.status === filters.status);
    }
    if (filters?.type) {
      filteredData = filteredData.filter(item => item.type === filters.type);
    }
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredData = filteredData.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply sorting
    filteredData.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      
      if (aValue < bValue) return -1 * multiplier;
      if (aValue > bValue) return 1 * multiplier;
      return 0;
    });
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    return {
      items: paginatedData,
      total: filteredData.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredData.length / pageSize)
    };
  }
  
  // Real API implementation
  try {
    const response: AxiosResponse<ContentSearchResult> = await contentAPI.get('/', { params: query });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch content list:', error);
    throw new Error('Failed to fetch content list');
  }
};

export const getContentById = async (id: string): Promise<ContentItem> => {
  if (import.meta.env.DEV) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const mockData = generateMockContent();
    const item = mockData.find(content => content.id === id);
    if (!item) {
      throw new Error('Content not found');
    }
    return item;
  }
  
  try {
    const response: AxiosResponse<ContentItem> = await contentAPI.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch content:', error);
    throw new Error('Failed to fetch content');
  }
};

export const createContent = async (data: ContentFormData): Promise<ContentItem> => {
  if (import.meta.env.DEV) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newContent: ContentItem = {
      id: Date.now().toString(),
      ...data,
      author: {
        id: '1',
        name: 'Current User',
        email: 'user@example.com'
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: data.status === 'published' ? new Date() : undefined,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0
    };
    
    return newContent;
  }
  
  try {
    const response: AxiosResponse<ContentItem> = await contentAPI.post('/', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create content:', error);
    throw new Error('Failed to create content');
  }
};

export const updateContent = async (id: string, data: Partial<ContentFormData>): Promise<ContentItem> => {
  if (import.meta.env.DEV) {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const existingContent = await getContentById(id);
    const updatedContent: ContentItem = {
      ...existingContent,
      ...data,
      updatedAt: new Date(),
      publishedAt: data.status === 'published' && !existingContent.publishedAt ? new Date() : existingContent.publishedAt
    };
    
    return updatedContent;
  }
  
  try {
    const response: AxiosResponse<ContentItem> = await contentAPI.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update content:', error);
    throw new Error('Failed to update content');
  }
};

export const deleteContent = async (id: string): Promise<void> => {
  if (import.meta.env.DEV) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return;
  }
  
  try {
    await contentAPI.delete(`/${id}`);
  } catch (error) {
    console.error('Failed to delete content:', error);
    throw new Error('Failed to delete content');
  }
};

// Categories and Tags
export const getCategories = async (): Promise<Category[]> => {
  if (import.meta.env.DEV) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return generateMockCategories();
  }
  
  try {
    const response: AxiosResponse<Category[]> = await contentAPI.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw new Error('Failed to fetch categories');
  }
};

export const getTags = async (): Promise<Tag[]> => {
  if (import.meta.env.DEV) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return generateMockTags();
  }
  
  try {
    const response: AxiosResponse<Tag[]> = await contentAPI.get('/tags');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    throw new Error('Failed to fetch tags');
  }
};

// Content statistics
export const getContentStats = async (): Promise<ContentStats> => {
  if (import.meta.env.DEV) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      totalPosts: 45,
      publishedPosts: 32,
      draftPosts: 8,
      scheduledPosts: 5,
      totalViews: 15420,
      totalLikes: 892,
      totalComments: 234
    };
  }
  
  try {
    const response: AxiosResponse<ContentStats> = await contentAPI.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch content stats:', error);
    throw new Error('Failed to fetch content stats');
  }
};

// Bulk operations
export const bulkUpdateContent = async (ids: string[], action: BulkAction): Promise<BulkOperationResult> => {
  if (import.meta.env.DEV) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: ids.length,
      failed: 0,
      errors: []
    };
  }
  
  try {
    const response: AxiosResponse<BulkOperationResult> = await contentAPI.post('/bulk', { ids, action });
    return response.data;
  } catch (error) {
    console.error('Failed to perform bulk operation:', error);
    throw new Error('Failed to perform bulk operation');
  }
};

// Content templates
export const getContentTemplates = async (): Promise<ContentTemplate[]> => {
  if (import.meta.env.DEV) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [
      {
        id: '1',
        name: 'Blog Post Template',
        description: 'Standard blog post with introduction, content, and conclusion',
        content: '# Blog Post Title\n\n## Introduction\n\nWrite your introduction here...\n\n## Main Content\n\nYour main content goes here...\n\n## Conclusion\n\nSummarize your key points...',
        type: 'blog_post',
        isDefault: true
      },
      {
        id: '2',
        name: 'Tutorial Template',
        description: 'Step-by-step tutorial template',
        content: '# Tutorial: How to...\n\n## Prerequisites\n\n- Item 1\n- Item 2\n\n## Step 1\n\nDescription...\n\n## Step 2\n\nDescription...\n\n## Conclusion\n\nSummary...',
        type: 'blog_post'
      }
    ];
  }
  
  try {
    const response: AxiosResponse<ContentTemplate[]> = await contentAPI.get('/templates');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch content templates:', error);
    throw new Error('Failed to fetch content templates');
  }
};