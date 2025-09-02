export type MediaType = 'image' | 'video' | 'audio' | 'document' | 'archive';
export type MediaStatus = 'uploading' | 'processing' | 'ready' | 'failed' | 'deleted';
export type StorageProvider = 'local' | 'aws_s3' | 'cloudinary' | 'google_cloud';

export interface MediaFile {
  id: string;
  name: string;
  originalName: string;
  type: MediaType;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  status: MediaStatus;
  provider: StorageProvider;
  metadata: {
    width?: number;
    height?: number;
    duration?: number;
    bitrate?: number;
    format?: string;
    colorSpace?: string;
    orientation?: number;
  };
  tags: string[];
  folder?: string;
  alt?: string;
  caption?: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  uploadedAt: Date;
  updatedAt: Date;
  accessCount: number;
  isPublic: boolean;
  expiresAt?: Date;
}

export interface MediaFolder {
  id: string;
  name: string;
  path: string;
  parentId?: string;
  description?: string;
  fileCount: number;
  totalSize: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaUploadConfig {
  maxFileSize: number;
  allowedTypes: string[];
  autoOptimize: boolean;
  generateThumbnails: boolean;
  storageProvider: StorageProvider;
  compressionQuality: number;
  watermark?: {
    enabled: boolean;
    text?: string;
    image?: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    opacity: number;
  };
}

export interface MediaFilters {
  type?: MediaType;
  status?: MediaStatus;
  folder?: string;
  tags?: string[];
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  author?: string;
  isPublic?: boolean;
}

export interface MediaStats {
  totalFiles: number;
  totalSize: number;
  imageCount: number;
  videoCount: number;
  documentCount: number;
  storageUsed: number;
  storageLimit: number;
  bandwidthUsed: number;
  bandwidthLimit: number;
}

export interface MediaSearchResult {
  items: MediaFile[];
  folders: MediaFolder[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface MediaListQuery {
  page?: number;
  pageSize?: number;
  sortBy?: 'uploadedAt' | 'name' | 'size' | 'type' | 'accessCount';
  sortOrder?: 'asc' | 'desc';
  filters?: MediaFilters;
  view?: 'grid' | 'list';
}

export interface MediaUploadProgress {
  id: string;
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
  url?: string;
}

export interface MediaTransformation {
  id: string;
  name: string;
  description: string;
  operations: Array<{
    type: 'resize' | 'crop' | 'rotate' | 'quality' | 'format' | 'watermark';
    params: Record<string, any>;
  }>;
  isDefault: boolean;
}

export interface MediaBulkOperation {
  action: 'delete' | 'move' | 'copy' | 'tag' | 'optimize' | 'makePublic' | 'makePrivate';
  fileIds: string[];
  data?: any;
}

export interface MediaBulkResult {
  success: number;
  failed: number;
  errors: Array<{
    fileId: string;
    error: string;
  }>;
}

export interface CloudStorage {
  provider: StorageProvider;
  config: {
    accessKey?: string;
    secretKey?: string;
    bucket?: string;
    region?: string;
    endpoint?: string;
    cloudName?: string;
    apiKey?: string;
    apiSecret?: string;
  };
  isConnected: boolean;
  lastSync?: Date;
}

export interface MediaAccessLog {
  id: string;
  fileId: string;
  userId?: string;
  userAgent: string;
  ipAddress: string;
  accessType: 'view' | 'download' | 'embed';
  referrer?: string;
  timestamp: Date;
}

export type MediaPermission = 'view' | 'upload' | 'edit' | 'delete' | 'share' | 'admin';

export interface MediaSharingLink {
  id: string;
  fileId: string;
  token: string;
  url: string;
  permissions: MediaPermission[];
  expiresAt?: Date;
  downloadLimit?: number;
  downloadCount: number;
  password?: string;
  createdBy: string;
  createdAt: Date;
}