import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Space,
  Input,
  Select,
  Modal,
  message,
  Typography,
  Row,
  Col,
  Image,
  Tag,
  Dropdown,
  Tooltip,
  Switch,
  Checkbox,
  Empty,
  Spin
} from 'antd';
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  FilterOutlined,
  MoreOutlined,
  EyeOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  FolderOutlined,
  FileImageOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  FileZipOutlined,
  TagOutlined,
  CopyOutlined,
  CloudDownloadOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { MediaFile, MediaFolder, MediaFilters, MediaListQuery } from '../../types/media.types';
import { getMediaList, deleteMedia, updateMedia, bulkOperateMedia } from '../../services/media.service';
import dayjs from 'dayjs';

const { Search } = Input;
const { Option } = Select;
const { Text, Title } = Typography;

interface MediaLibraryProps {
  selectionMode?: boolean;
  onSelect?: (files: MediaFile[]) => void;
  allowMultiple?: boolean;
  typeFilter?: string[];
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({
  selectionMode = false,
  onSelect,
  allowMultiple = true,
  typeFilter
}) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [folders, setFolders] = useState<MediaFolder[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<MediaFile[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<MediaFilters>({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0
  });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteFileId, setDeleteFileId] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingFile, setEditingFile] = useState<MediaFile | null>(null);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);

  // Load media files
  const loadMedia = async () => {
    setLoading(true);
    try {
      const query: MediaListQuery = {
        page: pagination.current,
        pageSize: pagination.pageSize,
        filters: {
          ...filters,
          type: typeFilter ? typeFilter[0] as any : filters.type
        },
        sortBy: 'uploadedAt',
        sortOrder: 'desc',
        view: viewMode
      };

      const result = await getMediaList(query);
      setFiles(result.items);
      setFolders(result.folders);
      setPagination(prev => ({
        ...prev,
        total: result.total
      }));
    } catch (error) {
      message.error('Failed to load media files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [pagination.current, pagination.pageSize, filters, viewMode]);

  // Handle search
  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value || undefined }));
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof MediaFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Handle file selection
  const handleFileSelect = (file: MediaFile, selected: boolean) => {
    if (selectionMode) {
      let newSelection: MediaFile[];
      
      if (allowMultiple) {
        if (selected) {
          newSelection = [...selectedFiles, file];
        } else {
          newSelection = selectedFiles.filter(f => f.id !== file.id);
        }
      } else {
        newSelection = selected ? [file] : [];
      }
      
      setSelectedFiles(newSelection);
      onSelect?.(newSelection);
    }
  };

  // Handle bulk selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFiles(files);
      onSelect?.(files);
    } else {
      setSelectedFiles([]);
      onSelect?.([]);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await deleteMedia(id);
      message.success('File deleted successfully');
      setDeleteModalVisible(false);
      setDeleteFileId(null);
      loadMedia();
    } catch (error) {
      message.error('Failed to delete file');
    }
  };

  // Handle edit
  const handleEdit = async (values: any) => {
    if (!editingFile) return;

    try {
      await updateMedia(editingFile.id, {
        name: values.name,
        alt: values.alt,
        caption: values.caption,
        tags: values.tags || [],
        isPublic: values.isPublic
      });
      message.success('File updated successfully');
      setEditModalVisible(false);
      setEditingFile(null);
      loadMedia();
    } catch (error) {
      message.error('Failed to update file');
    }
  };

  // Format file size
  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file icon
  const getFileIcon = (type: string, size: number = 20) => {
    const iconProps = { style: { fontSize: size } };
    
    switch (type) {
      case 'image':
        return <FileImageOutlined {...iconProps} />;
      case 'video':
        return <VideoCameraOutlined {...iconProps} />;
      case 'document':
        return <FileTextOutlined {...iconProps} />;
      case 'archive':
        return <FileZipOutlined {...iconProps} />;
      default:
        return <FileTextOutlined {...iconProps} />;
    }
  };

  // File dropdown menu
  const getFileMenu = (file: MediaFile) => ({
    items: [
      {
        key: 'preview',
        icon: <EyeOutlined />,
        label: 'Preview',
        onClick: () => {
          setPreviewFile(file);
          setPreviewModalVisible(true);
        }
      },
      {
        key: 'download',
        icon: <DownloadOutlined />,
        label: 'Download',
        onClick: () => {
          window.open(file.url, '_blank');
        }
      },
      {
        key: 'copy',
        icon: <CopyOutlined />,
        label: 'Copy URL',
        onClick: () => {
          navigator.clipboard.writeText(file.url);
          message.success('URL copied to clipboard');
        }
      },
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: 'Edit Details',
        onClick: () => {
          setEditingFile(file);
          setEditModalVisible(true);
        }
      },
      {
        key: 'share',
        icon: <ShareAltOutlined />,
        label: 'Share',
        onClick: () => {
          // TODO: Implement sharing
          message.info('Sharing feature coming soon');
        }
      },
      {
        type: 'divider' as const
      },
      {
        key: 'delete',
        icon: <DeleteOutlined />,
        label: 'Delete',
        danger: true,
        onClick: () => {
          setDeleteFileId(file.id);
          setDeleteModalVisible(true);
        }
      }
    ]
  });

  // Render file card
  const renderFileCard = (file: MediaFile) => {
    const isSelected = selectedFiles.some(f => f.id === file.id);
    
    return (
      <motion.div
        key={file.id}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Card
          hoverable
          className={`media-file-card ${isSelected ? 'selected' : ''} ${selectionMode ? 'selectable' : ''}`}
          bodyStyle={{ padding: 0 }}
          onClick={() => selectionMode && handleFileSelect(file, !isSelected)}
        >
          {/* File Preview */}
          <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
            {file.type === 'image' ? (
              <Image
                src={file.thumbnailUrl || file.url}
                alt={file.alt || file.name}
                className="w-full h-full object-cover"
                preview={false}
              />
            ) : (
              <div className="text-center">
                {getFileIcon(file.type, 48)}
                <div className="mt-2 text-xs text-gray-500">
                  {file.mimeType}
                </div>
              </div>
            )}
            
            {/* Selection checkbox */}
            {selectionMode && (
              <div className="absolute top-2 left-2">
                <Checkbox
                  checked={isSelected}
                  onChange={(e) => handleFileSelect(file, e.target.checked)}
                />
              </div>
            )}
            
            {/* File actions */}
            <div className="absolute top-2 right-2">
              <Dropdown menu={getFileMenu(file)} trigger={['click']}>
                <Button
                  type="text"
                  icon={<MoreOutlined />}
                  className="bg-white/80 hover:bg-white"
                  size="small"
                />
              </Dropdown>
            </div>
            
            {/* File status */}
            {file.status !== 'ready' && (
              <div className="absolute bottom-2 left-2">
                <Tag color={file.status === 'processing' ? 'processing' : 'error'}>
                  {file.status}
                </Tag>
              </div>
            )}
            
            {/* Public indicator */}
            {file.isPublic && (
              <div className="absolute bottom-2 right-2">
                <Tag color="green">Public</Tag>
              </div>
            )}
          </div>
          
          {/* File info */}
          <div className="p-3">
            <div className="font-medium text-sm truncate mb-1" title={file.name}>
              {file.name}
            </div>
            <div className="text-xs text-gray-500 mb-2">
              {formatSize(file.size)} • {dayjs(file.uploadedAt).format('MMM D, YYYY')}
            </div>
            
            {/* Tags */}
            {file.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {file.tags.slice(0, 2).map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
                {file.tags.length > 2 && (
                  <Tag>+{file.tags.length - 2}</Tag>
                )}
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    );
  };

  // Render list item
  const renderListItem = (file: MediaFile) => {
    const isSelected = selectedFiles.some(f => f.id === file.id);
    
    return (
      <motion.div
        key={file.id}
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className={`flex items-center p-4 border-b hover:bg-gray-50 cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`}
          onClick={() => selectionMode && handleFileSelect(file, !isSelected)}
        >
          {selectionMode && (
            <Checkbox
              checked={isSelected}
              onChange={(e) => handleFileSelect(file, e.target.checked)}
              className="mr-3"
            />
          )}
          
          <div className="flex-shrink-0 mr-3">
            {file.type === 'image' ? (
              <Image
                src={file.thumbnailUrl || file.url}
                width={40}
                height={40}
                className="rounded object-cover"
                preview={false}
              />
            ) : (
              getFileIcon(file.type, 24)
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{file.name}</div>
            <div className="text-sm text-gray-500">
              {formatSize(file.size)} • {dayjs(file.uploadedAt).format('MMM D, YYYY')}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Tag color={file.isPublic ? 'green' : 'default'}>
              {file.isPublic ? 'Public' : 'Private'}
            </Tag>
            
            <Dropdown menu={getFileMenu(file)} trigger={['click']}>
              <Button type="text" icon={<MoreOutlined />} size="small" />
            </Dropdown>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="media-library">
      <Card>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <Title level={4} className="mb-1">
              Media Library
            </Title>
            <Text className="text-gray-500">
              {selectionMode ? 'Select media files' : 'Manage your media files'}
            </Text>
          </div>
          
          <Space>
            {selectionMode && selectedFiles.length > 0 && (
              <Button type="primary" onClick={() => onSelect?.(selectedFiles)}>
                Select ({selectedFiles.length})
              </Button>
            )}
            
            <Button.Group>
              <Button
                icon={<AppstoreOutlined />}
                type={viewMode === 'grid' ? 'primary' : 'default'}
                onClick={() => setViewMode('grid')}
              />
              <Button
                icon={<UnorderedListOutlined />}
                type={viewMode === 'list' ? 'primary' : 'default'}
                onClick={() => setViewMode('list')}
              />
            </Button.Group>
          </Space>
        </div>

        {/* Filters */}
        <div className="mb-4">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <Search
                placeholder="Search files..."
                allowClear
                onSearch={handleSearch}
                prefix={<SearchOutlined />}
              />
            </Col>
            
            <Col xs={24} sm={12} lg={4}>
              <Select
                placeholder="Type"
                allowClear
                className="w-full"
                onChange={(value) => handleFilterChange('type', value)}
              >
                <Option value="image">Images</Option>
                <Option value="video">Videos</Option>
                <Option value="document">Documents</Option>
                <Option value="archive">Archives</Option>
              </Select>
            </Col>
            
            <Col xs={24} sm={12} lg={4}>
              <Select
                placeholder="Visibility"
                allowClear
                className="w-full"
                onChange={(value) => handleFilterChange('isPublic', value)}
              >
                <Option value={true}>Public</Option>
                <Option value={false}>Private</Option>
              </Select>
            </Col>
            
            <Col xs={24} sm={12} lg={8}>
              <Select
                placeholder="Filter by tags"
                mode="multiple"
                allowClear
                className="w-full"
                onChange={(value) => handleFilterChange('tags', value)}
              >
                <Option value="hero">Hero</Option>
                <Option value="banner">Banner</Option>
                <Option value="team">Team</Option>
                <Option value="product">Product</Option>
                <Option value="logo">Logo</Option>
              </Select>
            </Col>
          </Row>

          {/* Bulk actions */}
          {selectionMode && files.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Checkbox
                  indeterminate={selectedFiles.length > 0 && selectedFiles.length < files.length}
                  checked={selectedFiles.length === files.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                >
                  Select All
                </Checkbox>
                
                {selectedFiles.length > 0 && (
                  <Text className="text-gray-600">
                    {selectedFiles.length} of {files.length} selected
                  </Text>
                )}
              </div>
            </div>
          )}
        </div>

        {/* File Grid/List */}
        <Spin spinning={loading}>
          {files.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No media files found"
            />
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' 
              : 'space-y-0'
            }>
              {files.map(file => 
                viewMode === 'grid' ? renderFileCard(file) : renderListItem(file)
              )}
            </div>
          )}
        </Spin>

        {/* Pagination */}
        {pagination.total > pagination.pageSize && (
          <div className="flex justify-center mt-6">
            <Button
              disabled={pagination.current === 1}
              onClick={() => setPagination(prev => ({ ...prev, current: prev.current - 1 }))}
            >
              Previous
            </Button>
            <span className="mx-4 flex items-center">
              Page {pagination.current} of {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            <Button
              disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
              onClick={() => setPagination(prev => ({ ...prev, current: prev.current + 1 }))}
            >
              Next
            </Button>
          </div>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={() => deleteFileId && handleDelete(deleteFileId)}
        onCancel={() => {
          setDeleteModalVisible(false);
          setDeleteFileId(null);
        }}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this file? This action cannot be undone.</p>
      </Modal>

      {/* Edit File Modal */}
      <Modal
        title="Edit File Details"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingFile(null);
        }}
        onOk={() => {
          // Form submission will be handled by the form
        }}
        width={600}
      >
        {editingFile && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">File Name</label>
              <Input
                defaultValue={editingFile.name}
                placeholder="Enter file name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Alt Text</label>
              <Input
                defaultValue={editingFile.alt}
                placeholder="Describe the image for accessibility"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Caption</label>
              <Input.TextArea
                rows={3}
                defaultValue={editingFile.caption}
                placeholder="Add a caption for this file"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Tags</label>
              <Select
                mode="tags"
                className="w-full"
                placeholder="Add tags"
                defaultValue={editingFile.tags}
              />
            </div>
            
            <div className="flex items-center">
              <Switch defaultChecked={editingFile.isPublic} />
              <span className="ml-2">Make this file public</span>
            </div>
          </div>
        )}
      </Modal>

      {/* Preview Modal */}
      <Modal
        title={previewFile?.name}
        open={previewModalVisible}
        onCancel={() => {
          setPreviewModalVisible(false);
          setPreviewFile(null);
        }}
        footer={null}
        width={800}
      >
        {previewFile && (
          <div className="text-center">
            {previewFile.type === 'image' ? (
              <Image
                src={previewFile.url}
                alt={previewFile.alt || previewFile.name}
                className="max-w-full"
              />
            ) : previewFile.type === 'video' ? (
              <video
                src={previewFile.url}
                controls
                className="max-w-full"
              />
            ) : (
              <div className="p-8">
                {getFileIcon(previewFile.type, 64)}
                <div className="mt-4">
                  <Text>This file type cannot be previewed</Text>
                  <div className="mt-2">
                    <Button
                      type="primary"
                      icon={<DownloadOutlined />}
                      onClick={() => window.open(previewFile.url, '_blank')}
                    >
                      Download File
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4 text-left">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Text strong>Size:</Text> {formatSize(previewFile.size)}
                </div>
                <div>
                  <Text strong>Type:</Text> {previewFile.mimeType}
                </div>
                <div>
                  <Text strong>Uploaded:</Text> {dayjs(previewFile.uploadedAt).format('MMM D, YYYY')}
                </div>
                <div>
                  <Text strong>Views:</Text> {previewFile.accessCount}
                </div>
              </div>
              
              {previewFile.metadata.width && previewFile.metadata.height && (
                <div className="mt-2 text-sm">
                  <Text strong>Dimensions:</Text> {previewFile.metadata.width} × {previewFile.metadata.height}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MediaLibrary;