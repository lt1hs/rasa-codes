import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Upload,
  Avatar,
  message,
  Typography,
  Row,
  Col,
  Tabs,
  Checkbox,
  Divider
} from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { UserFormData, Role, Permission, User } from '../../types/user.types';
import { createUser, updateUser, getUserById, getAllRoles, getPermissionsByCategory } from '../../services/user.service';
import { useValidatedForm } from '../../hooks/useValidation';
import { userSchema, userUpdateSchema } from '../../schemas/validation.schemas';
import {
  ValidatedForm,
  ValidatedInput,
  ValidatedPasswordInput,
  ValidatedTextArea,
  ValidatedSelect,
  ValidatedSwitch,
  ValidatedUpload,
  FormSection,
  FormActions
} from '../forms/ValidatedFields';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface UserFormProps {
  mode?: 'create' | 'edit';
}

const UserForm: React.FC<UserFormProps> = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [customPermissions, setCustomPermissions] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<string>('');
  const [activeTab, setActiveTab] = useState('basic');

  const isEdit = mode === 'edit';
  
  // Initialize form with validation
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    submitWithValidation,
    isSubmitting
  } = useValidatedForm(
    isEdit ? userUpdateSchema : userSchema,
    {
      defaultValues: {
        status: 'active',
        profile: {
          timezone: 'UTC',
          language: 'en'
        },
        settings: {
          emailNotifications: true,
          twoFactorEnabled: false,
          sessionTimeout: 8
        },
        sendWelcomeEmail: true
      }
    }
  );
  
  // Watch form values for role changes
  const watchedRole = watch('role');

  // Load data
  useEffect(() => {
    loadRoles();
    if (isEdit && id) {
      loadUser(id);
    }
  }, [isEdit, id]);

  const loadRoles = async () => {
    try {
      const rolesData = await getAllRoles();
      setRoles(rolesData);
    } catch (error) {
      message.error('Failed to load roles');
    }
  };

  const loadUser = async (userId: string) => {
    setLoading(true);
    try {
      const userData = await getUserById(userId);
      if (userData) {
        setUser(userData);
        setAvatar(userData.avatar || '');
        setSelectedRole(roles.find(r => r.name === userData.role) || null);
        setCustomPermissions(userData.permissions.map(p => p.id));
        
        // Fill form with user data using setValue
        setValue('email', userData.email);
        setValue('firstName', userData.firstName);
        setValue('lastName', userData.lastName);
        setValue('role', userData.role);
        setValue('status', userData.status);
        setValue('profile.bio', userData.profile.bio || '');
        setValue('profile.phone', userData.profile.phone || '');
        setValue('profile.timezone', userData.profile.timezone || 'UTC');
        setValue('profile.language', userData.profile.language || 'en');
        setValue('settings.emailNotifications', userData.settings.emailNotifications);
        setValue('settings.twoFactorEnabled', userData.settings.twoFactorEnabled);
        setValue('settings.sessionTimeout', userData.settings.sessionTimeout || 8);
      }
    } catch (error) {
      message.error('Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  // Handle role change
  useEffect(() => {
    if (watchedRole) {
      const role = roles.find(r => r.name === watchedRole);
      setSelectedRole(role || null);
      if (role) {
        setCustomPermissions(role.permissions.map(p => p.id));
      }
    }
  }, [watchedRole, roles]);

  // Handle form submission
  const onSubmit = async (values: any) => {
    try {
      const userData: UserFormData = {
        ...values,
        permissions: customPermissions,
        sendWelcomeEmail: values.sendWelcomeEmail ?? true
      };

      if (isEdit && id) {
        await updateUser(id, userData);
        message.success('User updated successfully');
      } else {
        await createUser(userData);
        message.success('User created successfully');
      }

      navigate('/admin/users');
    } catch (error) {
      throw new Error(`Failed to ${isEdit ? 'update' : 'create'} user`);
    }
  };

  // Handle avatar upload
  const handleAvatarUpload = (info: any) => {
    if (info.file.status === 'done') {
      const url = info.file.response?.url || URL.createObjectURL(info.file.originFileObj);
      setAvatar(url);
      message.success('Avatar uploaded successfully');
    } else if (info.file.status === 'error') {
      message.error('Avatar upload failed');
    }
  };

  return (
    <div className="user-form">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/admin/users')}
              >
                Back to Users
              </Button>
              <div>
                <Title level={3} className="mb-1">
                  {isEdit ? 'Edit User' : 'Create New User'}
                </Title>
                <Text className="text-gray-500">
                  {isEdit ? 'Update user information and permissions' : 'Add a new user to the system'}
                </Text>
              </div>
            </div>
          </div>

          {/* Form */}
          <ValidatedForm
            onSubmit={handleSubmit(submitWithValidation(onSubmit))}
            loading={loading || isSubmitting}
          >
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              items={[
                {
                  key: 'basic',
                  label: (
                    <span>
                      <UserOutlined />
                      Basic Info
                    </span>
                  ),
                  children: (
                    <FormSection
                      title="Personal Information"
                      description="Basic user details and contact information"
                    >
                      <Row gutter={[24, 16]}>
                        <Col xs={24} lg={8}>
                          <div className="text-center">
                            <Avatar
                              size={120}
                              src={avatar}
                              icon={<UserOutlined />}
                              className="mb-4"
                            />
                            <Upload
                              name="avatar"
                              showUploadList={false}
                              action="/api/upload/avatar"
                              onChange={handleAvatarUpload}
                              accept="image/*"
                            >
                              <Button icon={<UploadOutlined />}>
                                Change Avatar
                              </Button>
                            </Upload>
                          </div>
                        </Col>
                        
                        <Col xs={24} lg={16}>
                          <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                              <ValidatedInput
                                control={control}
                                name="firstName"
                                label="First Name"
                                placeholder="John"
                                required
                                addonBefore={<UserOutlined />}
                              />
                            </Col>
                            
                            <Col xs={24} sm={12}>
                              <ValidatedInput
                                control={control}
                                name="lastName"
                                label="Last Name"
                                placeholder="Doe"
                                required
                                addonBefore={<UserOutlined />}
                              />
                            </Col>
                            
                            <Col span={24}>
                              <ValidatedInput
                                control={control}
                                name="email"
                                label="Email Address"
                                type="email"
                                placeholder="john@example.com"
                                required
                                addonBefore={<MailOutlined />}
                              />
                            </Col>
                            
                            <Col xs={24} sm={12}>
                              <ValidatedInput
                                control={control}
                                name="profile.phone"
                                label="Phone Number"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                addonBefore={<PhoneOutlined />}
                              />
                            </Col>
                            
                            <Col xs={24} sm={12}>
                              <ValidatedSelect
                                control={control}
                                name="profile.timezone"
                                label="Timezone"
                                placeholder="Select timezone"
                                options={[
                                  { label: 'UTC', value: 'UTC' },
                                  { label: 'Eastern Time', value: 'America/New_York' },
                                  { label: 'Central Time', value: 'America/Chicago' },
                                  { label: 'Mountain Time', value: 'America/Denver' },
                                  { label: 'Pacific Time', value: 'America/Los_Angeles' },
                                  { label: 'London', value: 'Europe/London' },
                                  { label: 'Paris', value: 'Europe/Paris' },
                                  { label: 'Tokyo', value: 'Asia/Tokyo' }
                                ]}
                              />
                            </Col>
                            
                            <Col span={24}>
                              <ValidatedTextArea
                                control={control}
                                name="profile.bio"
                                label="Bio"
                                placeholder="Tell us about this user..."
                                maxLength={500}
                                showCount
                                rows={3}
                              />
                            </Col>
                            
                            {!isEdit && (
                              <>
                                <Col xs={24} sm={12}>
                                  <ValidatedPasswordInput
                                    control={control}
                                    name="password"
                                    label="Password"
                                    placeholder="Enter password"
                                    required
                                  />
                                </Col>
                                
                                <Col xs={24} sm={12}>
                                  <ValidatedPasswordInput
                                    control={control}
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    placeholder="Confirm password"
                                    required
                                  />
                                </Col>
                              </>
                            )}
                          </Row>
                        </Col>
                      </Row>
                    </FormSection>
                  )
                },
                {
                  key: 'permissions',
                  label: (
                    <span>
                      <LockOutlined />
                      Role & Permissions
                    </span>
                  ),
                  children: (
                    <FormSection
                      title="Role and Access Control"
                      description="Define user role and permissions"
                    >
                      <Row gutter={[24, 16]}>
                        <Col xs={24} lg={12}>
                          <ValidatedSelect
                            control={control}
                            name="role"
                            label="Role"
                            placeholder="Select role"
                            required
                            options={roles.map(role => ({
                              label: role.displayName,
                              value: role.name
                            }))}
                          />
                        </Col>
                        
                        <Col xs={24} lg={12}>
                          <ValidatedSelect
                            control={control}
                            name="status"
                            label="Status"
                            placeholder="Select status"
                            options={[
                              { label: 'Active', value: 'active' },
                              { label: 'Inactive', value: 'inactive' },
                              { label: 'Suspended', value: 'suspended' },
                              { label: 'Pending', value: 'pending' }
                            ]}
                          />
                        </Col>
                      </Row>

                      {selectedRole && (
                        <div className="mt-6">
                          <Title level={5}>Role Permissions</Title>
                          <Text className="text-gray-500 block mb-4">
                            The following permissions are included with the {selectedRole.displayName} role:
                          </Text>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {selectedRole.permissions.map(permission => (
                              <div 
                                key={permission.id}
                                className="p-3 border rounded-lg bg-gray-50"
                              >
                                <div className="font-medium text-sm">{permission.name}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {permission.description}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </FormSection>
                  )
                },
                {
                  key: 'settings',
                  label: (
                    <span>
                      <GlobalOutlined />
                      Settings
                    </span>
                  ),
                  children: (
                    <FormSection
                      title="User Preferences and Security"
                      description="Configure user settings and security options"
                    >
                      <Row gutter={[24, 16]}>
                        <Col xs={24} lg={12}>
                          <Card title="Notification Settings" size="small">
                            <ValidatedSwitch
                              control={control}
                              name="settings.emailNotifications"
                              label="Email Notifications"
                              checkedChildren="On"
                              unCheckedChildren="Off"
                            />
                          </Card>
                        </Col>
                        
                        <Col xs={24} lg={12}>
                          <Card title="Security Settings" size="small">
                            <ValidatedSwitch
                              control={control}
                              name="settings.twoFactorEnabled"
                              label="Two-Factor Authentication"
                              checkedChildren="On"
                              unCheckedChildren="Off"
                            />
                            
                            <ValidatedSelect
                              control={control}
                              name="settings.sessionTimeout"
                              label="Session Timeout"
                              className="mt-4"
                              options={[
                                { label: '1 hour', value: 1 },
                                { label: '2 hours', value: 2 },
                                { label: '4 hours', value: 4 },
                                { label: '8 hours', value: 8 },
                                { label: '24 hours', value: 24 }
                              ]}
                            />
                          </Card>
                        </Col>
                        
                        <Col xs={24} lg={12}>
                          <Card title="Preferences" size="small">
                            <ValidatedSelect
                              control={control}
                              name="profile.language"
                              label="Language"
                              options={[
                                { label: 'English', value: 'en' },
                                { label: 'Spanish', value: 'es' },
                                { label: 'French', value: 'fr' },
                                { label: 'German', value: 'de' }
                              ]}
                            />
                          </Card>
                        </Col>
                        
                        {!isEdit && (
                          <Col xs={24} lg={12}>
                            <Card title="Account Setup" size="small">
                              <ValidatedSwitch
                                control={control}
                                name="sendWelcomeEmail"
                                label="Send Welcome Email"
                                checkedChildren="Yes"
                                unCheckedChildren="No"
                              />
                            </Card>
                          </Col>
                        )}
                      </Row>
                    </FormSection>
                  )
                }
              ]}
            />

            <FormActions
              onCancel={() => navigate('/admin/users')}
              submitText={isEdit ? 'Update User' : 'Create User'}
              loading={isSubmitting}
              disabled={loading}
            />
          </ValidatedForm>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserForm;