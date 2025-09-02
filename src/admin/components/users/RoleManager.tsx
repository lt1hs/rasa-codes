import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Checkbox,
  message,
  Typography,
  Tag,
  Tooltip,
  Divider,
  Row,
  Col,
  Statistic,
  Collapse
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UserOutlined,
  SecurityScanOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Role, RoleFormData, PermissionCategory } from '../../types/user.types';
import { 
  getAllRoles, 
  createRole, 
  updateRole, 
  deleteRole, 
  getPermissionsByCategory 
} from '../../services/user.service';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

const RoleManager: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissionCategories, setPermissionCategories] = useState<PermissionCategory[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState<string | null>(null);
  const [form] = Form.useForm();

  // Load data
  useEffect(() => {
    loadRoles();
    loadPermissions();
  }, []);

  const loadRoles = async () => {
    setLoading(true);
    try {
      const rolesData = await getAllRoles();
      setRoles(rolesData);
    } catch (error) {
      message.error('Failed to load roles');
    } finally {
      setLoading(false);
    }
  };

  const loadPermissions = async () => {
    try {
      const categories = await getPermissionsByCategory();
      setPermissionCategories(categories);
    } catch (error) {
      message.error('Failed to load permissions');
    }
  };

  // Handle create/edit role
  const handleSave = async (values: any) => {
    try {
      const roleData: RoleFormData = {
        name: values.name,
        displayName: values.displayName,
        description: values.description,
        permissions: values.permissions || []
      };

      if (editingRole) {
        await updateRole(editingRole.id, roleData);
        message.success('Role updated successfully');
      } else {
        await createRole(roleData);
        message.success('Role created successfully');
      }

      setModalVisible(false);
      setEditingRole(null);
      form.resetFields();
      loadRoles();
    } catch (error) {
      message.error(`Failed to ${editingRole ? 'update' : 'create'} role`);
    }
  };

  // Handle delete role
  const handleDelete = async (id: string) => {
    try {
      await deleteRole(id);
      message.success('Role deleted successfully');
      setDeleteModalVisible(false);
      setDeleteRoleId(null);
      loadRoles();
    } catch (error) {
      message.error('Failed to delete role');
    }
  };

  // Open edit modal
  const openEditModal = (role: Role) => {
    setEditingRole(role);
    form.setFieldsValue({
      name: role.name,
      displayName: role.displayName,
      description: role.description,
      permissions: role.permissions.map(p => p.id)
    });
    setModalVisible(true);
  };

  // Open create modal
  const openCreateModal = () => {
    setEditingRole(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Table columns
  const columns: ColumnsType<Role> = [
    {
      title: 'Role',
      key: 'role',
      render: (_, record: Role) => (
        <div>
          <div className="font-medium text-gray-900">{record.displayName}</div>
          <div className="text-sm text-gray-500">{record.name}</div>
          {record.isSystem && (
            <Tag color="blue" size="small" className="mt-1">System Role</Tag>
          )}
        </div>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => (
        <Text className="text-sm">{description}</Text>
      )
    },
    {
      title: 'Permissions',
      key: 'permissions',
      render: (_, record: Role) => (
        <div>
          <Text strong>{record.permissions.length}</Text>
          <Text className="text-gray-500 ml-1">permissions</Text>
          <div className="mt-1">
            {record.permissions.slice(0, 3).map(permission => (
              <Tag key={permission.id} size="small" className="mb-1">
                {permission.name}
              </Tag>
            ))}
            {record.permissions.length > 3 && (
              <Tag size="small">+{record.permissions.length - 3} more</Tag>
            )}
          </div>
        </div>
      )
    },
    {
      title: 'Users',
      dataIndex: 'userCount',
      key: 'userCount',
      render: (count: number) => (
        <div className="flex items-center">
          <UserOutlined className="mr-1" />
          <span>{count}</span>
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Role) => (
        <Space>
          <Tooltip title="Edit Role">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => openEditModal(record)}
            />
          </Tooltip>
          
          {!record.isSystem && (
            <Tooltip title="Delete Role">
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  setDeleteRoleId(record.id);
                  setDeleteModalVisible(true);
                }}
              />
            </Tooltip>
          )}
        </Space>
      )
    }
  ];

  return (
    <div className="role-manager">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Statistics */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Roles"
                value={roles.length}
                prefix={<SecurityScanOutlined style={{ color: '#3b82f6' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="System Roles"
                value={roles.filter(r => r.isSystem).length}
                prefix={<LockOutlined style={{ color: '#10b981' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Users"
                value={roles.reduce((sum, role) => sum + role.userCount, 0)}
                prefix={<TeamOutlined style={{ color: '#f59e0b' }} />}
              />
            </Card>
          </Col>
        </Row>

        <Card>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <Title level={3} className="mb-1">
                Role Management
              </Title>
              <Text className="text-gray-500">
                Manage roles and permissions for your team
              </Text>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openCreateModal}
            >
              Create Role
            </Button>
          </div>

          {/* Roles Table */}
          <Table
            columns={columns}
            dataSource={roles}
            rowKey="id"
            loading={loading}
            pagination={false}
          />
        </Card>

        {/* Permission Overview */}
        <Card className="mt-6">
          <Title level={4} className="mb-4">Permission Categories</Title>
          <Collapse>
            {permissionCategories.map(category => (
              <Panel 
                header={
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <Tag>{category.permissions.length} permissions</Tag>
                  </div>
                }
                key={category.id}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.permissions.map(permission => (
                    <div key={permission.id} className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">{permission.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {permission.description}
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        {permission.resource}.{permission.action}
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            ))}
          </Collapse>
        </Card>
      </motion.div>

      {/* Create/Edit Role Modal */}
      <Modal
        title={editingRole ? 'Edit Role' : 'Create New Role'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingRole(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        width={800}
        okText={editingRole ? 'Update' : 'Create'}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="Role Name"
                rules={[
                  { required: true, message: 'Please enter role name' },
                  { pattern: /^[a-z_]+$/, message: 'Use lowercase letters and underscores only' }
                ]}
              >
                <Input placeholder="e.g., content_manager" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                name="displayName"
                label="Display Name"
                rules={[{ required: true, message: 'Please enter display name' }]}
              >
                <Input placeholder="e.g., Content Manager" />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea 
              rows={3} 
              placeholder="Describe what this role can do..."
            />
          </Form.Item>

          <Form.Item
            name="permissions"
            label="Permissions"
          >
            <div className="max-h-96 overflow-y-auto border rounded p-4">
              {permissionCategories.map(category => (
                <div key={category.id} className="mb-4">
                  <Text strong className="block mb-2">{category.name}</Text>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {category.permissions.map(permission => (
                      <Checkbox 
                        key={permission.id} 
                        value={permission.id}
                        className="mb-1"
                      >
                        <div>
                          <div className="text-sm">{permission.name}</div>
                          <div className="text-xs text-gray-500">
                            {permission.description}
                          </div>
                        </div>
                      </Checkbox>
                    ))}
                  </div>
                  <Divider className="my-3" />
                </div>
              ))}
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={() => deleteRoleId && handleDelete(deleteRoleId)}
        onCancel={() => {
          setDeleteModalVisible(false);
          setDeleteRoleId(null);
        }}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this role? This action cannot be undone.</p>
        <p className="text-orange-600">
          <strong>Warning:</strong> Users with this role will lose their permissions.
        </p>
      </Modal>
    </div>
  );
};

export default RoleManager;