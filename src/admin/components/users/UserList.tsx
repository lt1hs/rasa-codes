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
  Modal,
  message,
  Tooltip,
  Avatar,
  Typography,
  Row,
  Col,
  Statistic,
  Badge,
  Switch
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  MoreOutlined,
  SearchOutlined,
  LockOutlined,
  UnlockOutlined,
  UserSwitchOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, UserFilters, UserStats, BulkUserAction } from '../../types/user.types';
import { getUserList, deleteUser, getUserStats, bulkUpdateUsers } from '../../services/user.service';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Search } = Input;
const { Option } = Select;
const { Text, Title } = Typography;

interface UserListProps {
  showStats?: boolean;
}

const UserList: React.FC<UserListProps> = ({ showStats = true }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [filters, setFilters] = useState<UserFilters>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [bulkActionModalVisible, setBulkActionModalVisible] = useState(false);
  const [bulkAction, setBulkAction] = useState<BulkUserAction | null>(null);
  const [bulkData, setBulkData] = useState<any>(null);

  // Load users
  const loadUsers = async () => {
    setLoading(true);
    try {
      const result = await getUserList({
        page: pagination.current,
        pageSize: pagination.pageSize,
        filters,
        sortBy: 'updatedAt',
        sortOrder: 'desc'
      });
      
      setUsers(result.items);
      setPagination(prev => ({
        ...prev,
        total: result.total
      }));
    } catch (error) {
      message.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Load statistics
  const loadStats = async () => {
    if (!showStats) return;
    
    try {
      const userStats = await getUserStats();
      setStats(userStats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  useEffect(() => {
    loadUsers();
    loadStats();
  }, [pagination.current, pagination.pageSize, filters]);

  // Handle search
  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value || undefined }));
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof UserFilters, value: any) => {
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
      await deleteUser(id);
      message.success('User deleted successfully');
      loadUsers();
      loadStats();
      setDeleteModalVisible(false);
      setDeleteUserId(null);
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  // Handle bulk actions
  const handleBulkAction = async () => {
    if (selectedRowKeys.length === 0 || !bulkAction) {
      message.warning('Please select users and action');
      return;
    }

    try {
      const result = await bulkUpdateUsers(
        selectedRowKeys as string[],
        bulkAction,
        bulkData
      );
      
      if (result.failed > 0) {
        message.warning(`${result.success} users updated, ${result.failed} failed`);
      } else {
        message.success(`${result.success} users updated successfully`);
      }
      
      setSelectedRowKeys([]);
      setBulkActionModalVisible(false);
      setBulkAction(null);
      setBulkData(null);
      loadUsers();
      loadStats();
    } catch (error) {
      message.error('Bulk operation failed');
    }
  };

  // Get status color
  const getStatusColor = (status: User['status']): string => {
    const colors = {
      active: 'green',
      inactive: 'orange',
      suspended: 'red',
      pending: 'blue'
    };
    return colors[status];
  };

  // Get role color
  const getRoleColor = (role: User['role']): string => {
    const colors = {
      super_admin: 'red',
      admin: 'orange',
      editor: 'blue',
      author: 'green',
      viewer: 'gray'
    };
    return colors[role];
  };

  // Table columns
  const columns: ColumnsType<User> = [
    {
      title: 'User',
      key: 'user',
      width: 250,
      render: (_, record: User) => (
        <div className="flex items-center space-x-3">
          <Avatar 
            src={record.avatar} 
            size={40}
            icon={<UserOutlined />}
          />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900">
              {record.firstName} {record.lastName}
            </div>
            <div className="text-sm text-gray-500 truncate">
              {record.email}
            </div>
            {record.profile.phone && (
              <div className="text-xs text-gray-400 flex items-center mt-1">
                <PhoneOutlined className="mr-1" />
                {record.profile.phone}
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role: User['role']) => (
        <Tag color={getRoleColor(role)} className="capitalize">
          {role.replace('_', ' ')}
        </Tag>
      ),
      filters: [
        { text: 'Super Admin', value: 'super_admin' },
        { text: 'Admin', value: 'admin' },
        { text: 'Editor', value: 'editor' },
        { text: 'Author', value: 'author' },
        { text: 'Viewer', value: 'viewer' }
      ]
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: User['status']) => (
        <Badge 
          status={status === 'active' ? 'success' : status === 'pending' ? 'processing' : 'error'}
          text={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'Suspended', value: 'suspended' },
        { text: 'Pending', value: 'pending' }
      ]
    },
    {
      title: 'Activity',
      key: 'activity',
      width: 150,
      render: (_, record: User) => (
        <div className="text-xs">
          <div className="text-gray-900">Logins: {record.stats.loginCount}</div>
          <div className="text-gray-500">Posts: {record.stats.postsCreated}</div>
          {record.lastLoginAt && (
            <div className="text-gray-400">
              Last: {dayjs(record.lastLoginAt).format('MMM D')}
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Security',
      key: 'security',
      width: 100,
      render: (_, record: User) => (
        <div className="flex space-x-1">
          <Tooltip title={record.settings.twoFactorEnabled ? '2FA Enabled' : '2FA Disabled'}>
            <Tag 
              color={record.settings.twoFactorEnabled ? 'green' : 'orange'}
              icon={record.settings.twoFactorEnabled ? <LockOutlined /> : <UnlockOutlined />}
            >
              {record.settings.twoFactorEnabled ? '2FA' : 'No 2FA'}
            </Tag>
          </Tooltip>
        </div>
      )
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
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
      render: (_, record: User) => (
        <Space>
          <Tooltip title="Edit User">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => navigate(`/admin/users/edit/${record.id}`)}
            />
          </Tooltip>
          
          <Tooltip title="Send Email">
            <Button
              type="text"
              size="small"
              icon={<MailOutlined />}
              onClick={() => window.location.href = `mailto:${record.email}`}
            />
          </Tooltip>
          
          <Dropdown
            menu={{
              items: [
                {
                  key: 'switch_role',
                  icon: <UserSwitchOutlined />,
                  label: 'Change Role',
                  onClick: () => {
                    setBulkAction('change_role');
                    setSelectedRowKeys([record.id]);
                    setBulkActionModalVisible(true);
                  }
                },
                {
                  key: 'toggle_status',
                  icon: record.status === 'active' ? <LockOutlined /> : <UnlockOutlined />,
                  label: record.status === 'active' ? 'Deactivate' : 'Activate',
                  onClick: async () => {
                    try {
                      await bulkUpdateUsers(
                        [record.id],
                        record.status === 'active' ? 'deactivate' : 'activate'
                      );
                      message.success(`User ${record.status === 'active' ? 'deactivated' : 'activated'} successfully`);
                      loadUsers();
                    } catch (error) {
                      message.error('Failed to update user status');
                    }
                  }
                },
                {
                  type: 'divider'
                },
                {
                  key: 'delete',
                  icon: <DeleteOutlined />,
                  label: 'Delete User',
                  danger: true,
                  onClick: () => {
                    setDeleteUserId(record.id);
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
    <div className="user-list">
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
                  title="Total Users"
                  value={stats.totalUsers}
                  prefix={<UserOutlined style={{ color: '#3b82f6' }} />}
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
                  title="Active Users"
                  value={stats.activeUsers}
                  prefix={<UserOutlined style={{ color: '#10b981' }} />}
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
                  title="Total Logins"
                  value={stats.totalLogins}
                  prefix={<LockOutlined style={{ color: '#f59e0b' }} />}
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
                  title="New This Month"
                  value={stats.newUsersThisMonth}
                  prefix={<PlusOutlined style={{ color: '#ef4444' }} />}
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
                User Management
              </Title>
              <Text className="text-gray-500">
                Manage users, roles, and permissions
              </Text>
            </div>
            <Space>
              <Button
                icon={<UserSwitchOutlined />}
                onClick={() => navigate('/admin/users/roles')}
              >
                Manage Roles
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate('/admin/users/new')}
              >
                Add User
              </Button>
            </Space>
          </div>

          {/* Filters */}
          <div className="mb-4 space-y-4">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={8}>
                <Search
                  placeholder="Search users..."
                  allowClear
                  onSearch={handleSearch}
                  prefix={<SearchOutlined />}
                />
              </Col>
              
              <Col xs={24} sm={12} lg={4}>
                <Select
                  placeholder="Role"
                  allowClear
                  className="w-full"
                  onChange={(value) => handleFilterChange('role', value)}
                >
                  <Option value="super_admin">Super Admin</Option>
                  <Option value="admin">Admin</Option>
                  <Option value="editor">Editor</Option>
                  <Option value="author">Author</Option>
                  <Option value="viewer">Viewer</Option>
                </Select>
              </Col>
              
              <Col xs={24} sm={12} lg={4}>
                <Select
                  placeholder="Status"
                  allowClear
                  className="w-full"
                  onChange={(value) => handleFilterChange('status', value)}
                >
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="suspended">Suspended</Option>
                  <Option value="pending">Pending</Option>
                </Select>
              </Col>
            </Row>

            {/* Bulk Actions */}
            {selectedRowKeys.length > 0 && (
              <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                <Text strong>{selectedRowKeys.length} users selected</Text>
                <Space>
                  <Button
                    size="small"
                    onClick={() => {
                      setBulkAction('activate');
                      setBulkActionModalVisible(true);
                    }}
                  >
                    Activate
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      setBulkAction('deactivate');
                      setBulkActionModalVisible(true);
                    }}
                  >
                    Deactivate
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      setBulkAction('change_role');
                      setBulkActionModalVisible(true);
                    }}
                  >
                    Change Role
                  </Button>
                  <Button
                    size="small"
                    danger
                    onClick={() => {
                      setBulkAction('delete');
                      setBulkActionModalVisible(true);
                    }}
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
            dataSource={users}
            rowKey="id"
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} users`,
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
        onOk={() => deleteUserId && handleDelete(deleteUserId)}
        onCancel={() => {
          setDeleteModalVisible(false);
          setDeleteUserId(null);
        }}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this user? This action cannot be undone.</p>
      </Modal>

      {/* Bulk Action Modal */}
      <Modal
        title={`Bulk ${bulkAction?.replace('_', ' ')}`}
        open={bulkActionModalVisible}
        onOk={handleBulkAction}
        onCancel={() => {
          setBulkActionModalVisible(false);
          setBulkAction(null);
          setBulkData(null);
        }}
        okText="Apply"
      >
        <p>Apply this action to {selectedRowKeys.length} selected users?</p>
        
        {bulkAction === 'change_role' && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Select new role:</label>
            <Select
              className="w-full"
              placeholder="Choose role"
              onChange={(value) => setBulkData({ role: value })}
            >
              <Option value="super_admin">Super Admin</Option>
              <Option value="admin">Admin</Option>
              <Option value="editor">Editor</Option>
              <Option value="author">Author</Option>
              <Option value="viewer">Viewer</Option>
            </Select>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserList;