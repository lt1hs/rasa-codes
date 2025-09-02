import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Button,
  Tag,
  Space,
  Dropdown,
  Input,
  Select,
  DatePicker,
  Modal,
  message,
  Tooltip,
  Avatar,
  Typography,
  Row,
  Col,
  Statistic
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
  SearchOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ContentItem, ContentFilters, ContentStats, ContentType, ContentStatus } from '../../types/content.types';
import { getContentList, deleteContent, getContentStats, bulkUpdateContent } from '../../services/content.service';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text, Title } = Typography;

interface ContentListProps {
  type?: ContentType;
  showStats?: boolean;
}

const ContentList: React.FC<ContentListProps> = ({ type, showStats = true }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [stats, setStats] = useState<ContentStats | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [filters, setFilters] = useState<ContentFilters>({ type });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  // Load content list
  const loadContent = async () => {
    setLoading(true);
    try {
      const result = await getContentList({
        page: pagination.current,
        pageSize: pagination.pageSize,
        filters,
        sortBy: 'updatedAt',
        sortOrder: 'desc'
      });
      
      setContent(result.items);
      setPagination(prev => ({
        ...prev,
        total: result.total
      }));
    } catch (error) {
      message.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  // Load statistics
  const loadStats = async () => {
    if (!showStats) return;
    
    try {
      const contentStats = await getContentStats();
      setStats(contentStats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  useEffect(() => {
    loadContent();
    loadStats();
  }, [pagination.current, pagination.pageSize, filters]);

  // Handle search
  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value || undefined }));
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof ContentFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Handle pagination change
  const handleTableChange = (page: number, pageSize: number) => {
    setPagination(prev => ({ ...prev, current: page, pageSize }));
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await deleteContent(id);
      message.success('Content deleted successfully');
      loadContent();
      loadStats();
      setDeleteModalVisible(false);
      setDeleteItemId(null);
    } catch (error) {
      message.error('Failed to delete content');
    }
  };

  // Handle bulk actions
  const handleBulkAction = async (action: string) => {
    if (selectedRowKeys.length === 0) {
      message.warning('Please select items to perform bulk action');
      return;
    }

    try {
      const result = await bulkUpdateContent(
        selectedRowKeys as string[],
        action as any
      );
      
      if (result.failed > 0) {
        message.warning(`${result.success} items updated, ${result.failed} failed`);
      } else {
        message.success(`${result.success} items updated successfully`);
      }
      
      setSelectedRowKeys([]);
      loadContent();
      loadStats();
    } catch (error) {
      message.error('Bulk operation failed');
    }
  };

  // Get status color
  const getStatusColor = (status: ContentStatus): string => {
    const colors = {
      published: 'green',
      draft: 'orange',
      archived: 'red',
      scheduled: 'blue'
    };
    return colors[status];
  };

  // Table columns
  const columns: ColumnsType<ContentItem> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 300,
      render: (title: string, record: ContentItem) => (
        <div className="flex items-start space-x-3">
          {record.featuredImage && (
            <img
              src={record.featuredImage}
              alt={title}
              className="w-12 h-12 rounded object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">{title}</div>
            {record.excerpt && (
              <div className="text-sm text-gray-500 truncate mt-1">
                {record.excerpt}
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: ContentStatus) => (
        <Tag color={getStatusColor(status)} className="capitalize">
          {status.replace('_', ' ')}
        </Tag>
      ),
      filters: [
        { text: 'Published', value: 'published' },
        { text: 'Draft', value: 'draft' },
        { text: 'Archived', value: 'archived' },
        { text: 'Scheduled', value: 'scheduled' }
      ]
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: 150,
      render: (author: ContentItem['author']) => (
        <div className="flex items-center space-x-2">
          <Avatar src={author.avatar} size="small">
            {author.name.charAt(0)}
          </Avatar>
          <span className="text-sm">{author.name}</span>
        </div>
      )
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      key: 'categories',
      width: 150,
      render: (categories: string[]) => (
        <div className="flex flex-wrap gap-1">
          {categories.slice(0, 2).map(category => (
            <Tag key={category} size="small">{category}</Tag>
          ))}
          {categories.length > 2 && (
            <Tag size="small">+{categories.length - 2}</Tag>
          )}
        </div>
      )
    },
    {
      title: 'Stats',
      key: 'stats',
      width: 120,
      render: (_, record: ContentItem) => (
        <div className="text-xs text-gray-500">
          <div>👁 {record.viewCount}</div>
          <div>❤️ {record.likeCount}</div>
          <div>💬 {record.commentCount}</div>
        </div>
      )
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 120,
      render: (date: Date) => (
        <Tooltip title={dayjs(date).format('YYYY-MM-DD HH:mm:ss')}>
          <span className="text-sm text-gray-500">
            {dayjs(date).format('MMM D, YYYY')}
          </span>
        </Tooltip>
      ),
      sorter: true
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record: ContentItem) => (
        <Space>
          <Tooltip title="View">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => window.open(`/blog/${record.slug}`, '_blank')}
            />
          </Tooltip>
          
          <Tooltip title="Edit">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => navigate(`/admin/content/edit/${record.id}`)}
            />
          </Tooltip>
          
          <Dropdown
            menu={{
              items: [
                {
                  key: 'duplicate',
                  icon: <CopyOutlined />,
                  label: 'Duplicate',
                  onClick: () => navigate(`/admin/content/new?duplicate=${record.id}`)
                },
                {
                  key: 'delete',
                  icon: <DeleteOutlined />,
                  label: 'Delete',
                  danger: true,
                  onClick: () => {
                    setDeleteItemId(record.id);
                    setDeleteModalVisible(true);
                  }
                }
              ]
            }}
            trigger={['click']}
          >
            <Button type="text" size="small" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      )
    }
  ];

  return (
    <div className="content-list">
      {/* Statistics Cards */}
      {showStats && stats && (
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <Statistic
                  title="Total Posts"
                  value={stats.totalPosts}
                  prefix={<EditOutlined style={{ color: '#3b82f6' }} />}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <Statistic
                  title="Published"
                  value={stats.publishedPosts}
                  prefix={<EyeOutlined style={{ color: '#10b981' }} />}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <Statistic
                  title="Total Views"
                  value={stats.totalViews}
                  prefix={<EyeOutlined style={{ color: '#f59e0b' }} />}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <Statistic
                  title="Draft Posts"
                  value={stats.draftPosts}
                  prefix={<EditOutlined style={{ color: '#ef4444' }} />}
                />
              </Card>
            </motion.div>
          </Col>
        </Row>
      )}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <Title level={3} className="mb-1">
                {type ? `${type.replace('_', ' ')} Management` : 'Content Management'}
              </Title>
              <Text className="text-gray-500">
                Manage your content with advanced editing tools
              </Text>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/admin/content/new')}
            >
              Create New
            </Button>
          </div>

          {/* Filters */}
          <div className="mb-4 space-y-4">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={8}>
                <Search
                  placeholder="Search content..."
                  allowClear
                  onSearch={handleSearch}
                  prefix={<SearchOutlined />}
                />
              </Col>
              
              {!type && (
                <Col xs={24} sm={12} lg={4}>
                  <Select
                    placeholder="Type"
                    allowClear
                    className="w-full"
                    onChange={(value) => handleFilterChange('type', value)}
                  >
                    <Option value="blog_post">Blog Post</Option>
                    <Option value="page">Page</Option>
                    <Option value="project">Project</Option>
                    <Option value="news">News</Option>
                  </Select>
                </Col>
              )}
              
              <Col xs={24} sm={12} lg={4}>
                <Select
                  placeholder="Status"
                  allowClear
                  className="w-full"
                  onChange={(value) => handleFilterChange('status', value)}
                >
                  <Option value="published">Published</Option>
                  <Option value="draft">Draft</Option>
                  <Option value="archived">Archived</Option>
                  <Option value="scheduled">Scheduled</Option>
                </Select>
              </Col>
              
              <Col xs={24} sm={12} lg={8}>
                <RangePicker
                  className="w-full"
                  onChange={(dates) => {
                    if (dates) {
                      handleFilterChange('dateFrom', dates[0]?.toDate());
                      handleFilterChange('dateTo', dates[1]?.toDate());
                    } else {
                      handleFilterChange('dateFrom', undefined);
                      handleFilterChange('dateTo', undefined);
                    }
                  }}
                />
              </Col>
            </Row>

            {/* Bulk Actions */}
            {selectedRowKeys.length > 0 && (
              <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                <Text strong>{selectedRowKeys.length} items selected</Text>
                <Space>
                  <Button
                    size="small"
                    onClick={() => handleBulkAction('publish')}
                  >
                    Publish
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleBulkAction('move_to_draft')}
                  >
                    Move to Draft
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleBulkAction('archive')}
                  >
                    Archive
                  </Button>
                  <Button
                    size="small"
                    danger
                    onClick={() => handleBulkAction('delete')}
                  >
                    Delete
                  </Button>
                </Space>
              </div>
            )}
          </div>

          {/* Table */}
          <Table
            columns={columns}
            dataSource={content}
            rowKey="id"
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              onChange: handleTableChange
            }}
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
              preserveSelectedRowKeys: true
            }}
            scroll={{ x: 1200 }}
          />
        </Card>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={() => deleteItemId && handleDelete(deleteItemId)}
        onCancel={() => {
          setDeleteModalVisible(false);
          setDeleteItemId(null);
        }}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this content? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default ContentList;