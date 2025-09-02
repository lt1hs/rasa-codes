import {
  MediaFile,
  MediaFolder,
  MediaUploadConfig,
  MediaSearchResult,
  MediaListQuery,
  MediaStats,
  MediaBulkOperation,
  MediaBulkResult,
  CloudStorage,
  MediaTransformation,
  MediaSharingLink,
  MediaUploadProgress,
  StorageProvider
} from '../types/media.types';

// Mock data for development
const mockFiles: MediaFile[] = [
  {
    id: '1',
    name: 'hero-banner.jpg',
    originalName: 'Hero Banner Image.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 2048000,
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300',
    status: 'ready',
    provider: 'cloudinary',
    metadata: {
      width: 1920,
      height: 1080,
      format: 'JPEG',
      colorSpace: 'sRGB'
    },
    tags: ['hero', 'banner', 'homepage'],
    folder: 'images/banners',
    alt: 'Main hero banner for homepage',
    caption: 'Beautiful landscape banner image',
    author: {
      id: '1',
      name: 'John Admin',
      email: 'admin@example.com'
    },
    uploadedAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    accessCount: 145,
    isPublic: true
  },
  {
    id: '2',
    name: 'team-photo.jpg',
    originalName: 'Our Amazing Team.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 1536000,
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300',
    status: 'ready',
    provider: 'aws_s3',
    metadata: {
      width: 1600,
      height: 900,
      format: 'JPEG',
      colorSpace: 'sRGB'
    },
    tags: ['team', 'about', 'people'],
    folder: 'images/team',
    alt: 'Our team members working together',
    author: {
      id: '2',
      name: 'Sarah Editor',
      email: 'editor@example.com'
    },
    uploadedAt: new Date('2024-01-14T15:20:00'),
    updatedAt: new Date('2024-01-14T15:20:00'),
    accessCount: 89,
    isPublic: true
  },
  {
    id: '3',
    name: 'company-presentation.pdf',
    originalName: 'Company Presentation 2024.pdf',
    type: 'document',
    mimeType: 'application/pdf',
    size: 5242880,
    url: '/api/files/company-presentation.pdf',
    status: 'ready',
    provider: 'local',
    metadata: {
      format: 'PDF'
    },
    tags: ['presentation', 'company', '2024'],
    folder: 'documents/presentations',
    author: {
      id: '1',
      name: 'John Admin',
      email: 'admin@example.com'
    },
    uploadedAt: new Date('2024-01-13T09:15:00'),
    updatedAt: new Date('2024-01-13T09:15:00'),
    accessCount: 23,
    isPublic: false
  },
  {
    id: '4',
    name: 'product-demo.mp4',
    originalName: 'Product Demo Video.mp4',
    type: 'video',
    mimeType: 'video/mp4',
    size: 15728640,
    url: '/api/files/product-demo.mp4',
    thumbnailUrl: '/api/files/product-demo-thumb.jpg',
    status: 'ready',
    provider: 'local',
    metadata: {
      width: 1280,
      height: 720,
      duration: 120,
      bitrate: 1000000,
      format: 'MP4'
    },
    tags: ['product', 'demo', 'video'],
    folder: 'videos/products',
    author: {
      id: '3',
      name: 'Mike Author',
      email: 'author@example.com'
    },
    uploadedAt: new Date('2024-01-12T14:45:00'),
    updatedAt: new Date('2024-01-12T14:45:00'),
    accessCount: 67,
    isPublic: true
  },
  {
    id: '5',
    name: 'logo-variations.zip',
    originalName: 'Logo Variations Pack.zip',
    type: 'archive',
    mimeType: 'application/zip',
    size: 3145728,
    url: '/api/files/logo-variations.zip',
    status: 'ready',
    provider: 'local',
    metadata: {
      format: 'ZIP'
    },
    tags: ['logo', 'branding', 'assets'],
    folder: 'assets/branding',
    author: {
      id: '2',
      name: 'Sarah Editor',
      email: 'editor@example.com'
    },
    uploadedAt: new Date('2024-01-11T11:30:00'),
    updatedAt: new Date('2024-01-11T11:30:00'),
    accessCount: 12,
    isPublic: false
  }
];

const mockFolders: MediaFolder[] = [
  {
    id: 'images',
    name: 'Images',
    path: '/images',
    description: 'All image files',
    fileCount: 2,
    totalSize: 3584000,
    isPublic: true,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: 'images-banners',
    name: 'Banners',
    path: '/images/banners',
    parentId: 'images',
    description: 'Banner and hero images',
    fileCount: 1,
    totalSize: 2048000,
    isPublic: true,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: 'documents',
    name: 'Documents',
    path: '/documents',
    description: 'PDF and text documents',
    fileCount: 1,
    totalSize: 5242880,
    isPublic: false,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-13T09:15:00')
  },
  {
    id: 'videos',
    name: 'Videos',
    path: '/videos',
    description: 'Video files and media',
    fileCount: 1,
    totalSize: 15728640,
    isPublic: true,
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-12T14:45:00')
  }
];

const mockCloudStorages: CloudStorage[] = [
  {
    provider: 'aws_s3',
    config: {
      bucket: 'my-app-media',
      region: 'us-east-1'
    },
    isConnected: true,
    lastSync: new Date('2024-01-15T10:00:00')
  },
  {
    provider: 'cloudinary',
    config: {
      cloudName: 'my-app'
    },
    isConnected: true,
    lastSync: new Date('2024-01-15T09:30:00')
  },
  {
    provider: 'google_cloud',
    config: {
      bucket: 'my-app-storage'
    },
    isConnected: false
  }
];

// API simulation
export const getMediaList = async (query: MediaListQuery): Promise<MediaSearchResult> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredFiles = [...mockFiles];
  let filteredFolders = [...mockFolders];
  
  // Apply filters
  if (query.filters?.search) {
    const search = query.filters.search.toLowerCase();
    filteredFiles = filteredFiles.filter(file =>
      file.name.toLowerCase().includes(search) ||
      file.originalName.toLowerCase().includes(search) ||
      file.tags.some(tag => tag.toLowerCase().includes(search))
    );
    filteredFolders = filteredFolders.filter(folder =>
      folder.name.toLowerCase().includes(search) ||
      folder.description?.toLowerCase().includes(search)
    );
  }
  
  if (query.filters?.type) {
    filteredFiles = filteredFiles.filter(file => file.type === query.filters!.type);
  }
  
  if (query.filters?.folder) {
    filteredFiles = filteredFiles.filter(file => 
      file.folder?.startsWith(query.filters!.folder!)
    );
  }
  
  if (query.filters?.isPublic !== undefined) {
    filteredFiles = filteredFiles.filter(file => file.isPublic === query.filters!.isPublic);
  }
  
  // Apply sorting
  if (query.sortBy) {
    filteredFiles.sort((a, b) => {
      const aValue = a[query.sortBy as keyof MediaFile];
      const bValue = b[query.sortBy as keyof MediaFile];
      
      if (query.sortOrder === 'desc') {
        return aValue > bValue ? -1 : 1;
      }
      return aValue > bValue ? 1 : -1;
    });
  }
  
  // Apply pagination
  const page = query.page || 1;
  const pageSize = query.pageSize || 20;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const items = filteredFiles.slice(start, end);
  
  return {
    items,
    folders: filteredFolders,
    total: filteredFiles.length,
    page,
    pageSize,
    totalPages: Math.ceil(filteredFiles.length / pageSize)
  };
};

export const getMediaById = async (id: string): Promise<MediaFile | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockFiles.find(file => file.id === id) || null;
};

export const uploadMedia = async (
  files: File[], 
  config?: Partial<MediaUploadConfig>
): Promise<MediaUploadProgress[]> => {
  const progressItems: MediaUploadProgress[] = files.map(file => ({
    id: Date.now().toString() + Math.random(),
    fileName: file.name,
    progress: 0,
    status: 'uploading'
  }));
  
  // Simulate upload progress
  for (const progress of progressItems) {
    // Simulate progress updates
    for (let i = 0; i <= 100; i += 10) {
      progress.progress = i;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    progress.status = 'processing';
    await new Promise(resolve => setTimeout(resolve, 500));
    
    progress.status = 'complete';
    progress.url = `https://example.com/${progress.fileName}`;
    
    // Add to mock files
    const newFile: MediaFile = {
      id: progress.id,
      name: progress.fileName,
      originalName: progress.fileName,
      type: progress.fileName.includes('.jpg') || progress.fileName.includes('.png') ? 'image' : 'document',
      mimeType: progress.fileName.includes('.jpg') ? 'image/jpeg' : 'application/octet-stream',
      size: Math.floor(Math.random() * 5000000),
      url: progress.url,
      status: 'ready',
      provider: config?.storageProvider || 'local',
      metadata: {},
      tags: [],
      author: {
        id: '1',
        name: 'Current User',
        email: 'user@example.com'
      },
      uploadedAt: new Date(),
      updatedAt: new Date(),
      accessCount: 0,
      isPublic: false
    };
    
    mockFiles.push(newFile);
  }
  
  return progressItems;
};

export const deleteMedia = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const fileIndex = mockFiles.findIndex(file => file.id === id);
  if (fileIndex === -1) {
    throw new Error('File not found');
  }
  
  mockFiles.splice(fileIndex, 1);
};

export const updateMedia = async (id: string, updates: Partial<MediaFile>): Promise<MediaFile> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const fileIndex = mockFiles.findIndex(file => file.id === id);
  if (fileIndex === -1) {
    throw new Error('File not found');
  }
  
  mockFiles[fileIndex] = {
    ...mockFiles[fileIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  return mockFiles[fileIndex];
};

export const getMediaStats = async (): Promise<MediaStats> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const totalSize = mockFiles.reduce((sum, file) => sum + file.size, 0);
  
  return {
    totalFiles: mockFiles.length,
    totalSize,
    imageCount: mockFiles.filter(f => f.type === 'image').length,
    videoCount: mockFiles.filter(f => f.type === 'video').length,
    documentCount: mockFiles.filter(f => f.type === 'document').length,
    storageUsed: totalSize,
    storageLimit: 10 * 1024 * 1024 * 1024, // 10GB
    bandwidthUsed: 250 * 1024 * 1024, // 250MB
    bandwidthLimit: 1 * 1024 * 1024 * 1024 // 1GB
  };
};

export const createFolder = async (name: string, parentId?: string): Promise<MediaFolder> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const parent = parentId ? mockFolders.find(f => f.id === parentId) : null;
  const path = parent ? `${parent.path}/${name}` : `/${name}`;
  
  const newFolder: MediaFolder = {
    id: Date.now().toString(),
    name,
    path,
    parentId,
    fileCount: 0,
    totalSize: 0,
    isPublic: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockFolders.push(newFolder);
  return newFolder;
};

export const deleteFolder = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const folderIndex = mockFolders.findIndex(folder => folder.id === id);
  if (folderIndex === -1) {
    throw new Error('Folder not found');
  }
  
  mockFolders.splice(folderIndex, 1);
};

export const bulkOperateMedia = async (operation: MediaBulkOperation): Promise<MediaBulkResult> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  let success = 0;
  let failed = 0;
  const errors: Array<{ fileId: string; error: string }> = [];
  
  for (const fileId of operation.fileIds) {
    try {
      const fileIndex = mockFiles.findIndex(f => f.id === fileId);
      if (fileIndex === -1) {
        failed++;
        errors.push({ fileId, error: 'File not found' });
        continue;
      }
      
      switch (operation.action) {
        case 'delete':
          mockFiles.splice(fileIndex, 1);
          break;
        case 'makePublic':
          mockFiles[fileIndex].isPublic = true;
          break;
        case 'makePrivate':
          mockFiles[fileIndex].isPublic = false;
          break;
        case 'tag':
          if (operation.data?.tags) {
            mockFiles[fileIndex].tags = [...new Set([...mockFiles[fileIndex].tags, ...operation.data.tags])];
          }
          break;
      }
      
      success++;
    } catch (error) {
      failed++;
      errors.push({ fileId, error: (error as Error).message });
    }
  }
  
  return { success, failed, errors };
};

export const getCloudStorages = async (): Promise<CloudStorage[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockCloudStorages;
};

export const connectCloudStorage = async (provider: StorageProvider, config: any): Promise<CloudStorage> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const storage = mockCloudStorages.find(s => s.provider === provider);
  if (storage) {
    storage.config = { ...storage.config, ...config };
    storage.isConnected = true;
    storage.lastSync = new Date();
    return storage;
  }
  
  const newStorage: CloudStorage = {
    provider,
    config,
    isConnected: true,
    lastSync: new Date()
  };
  
  mockCloudStorages.push(newStorage);
  return newStorage;
};

export const optimizeMedia = async (fileId: string, transformations: any): Promise<MediaFile> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const file = mockFiles.find(f => f.id === fileId);
  if (!file) {
    throw new Error('File not found');
  }
  
  // Simulate optimization reducing file size
  file.size = Math.floor(file.size * 0.7);
  file.updatedAt = new Date();
  
  return file;
};