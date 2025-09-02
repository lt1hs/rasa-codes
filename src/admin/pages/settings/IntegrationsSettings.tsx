import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Space,
  Typography,
  Row,
  Col,
  message,
  Switch,
  Tag,
  Badge,
  Modal,
  Form,
  Input,
  Select,
  Divider
} from 'antd';
import {
  ReloadOutlined,
  ThunderboltOutlined,
  ApiOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { getIntegrations } from '../../services/settings.service';
import { IntegrationConfig } from '../../types/settings.types';

const { Title, Text } = Typography;
const { Option } = Select;

interface Integration {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
  icon: string;
  config: Record<string, any>;
  lastSync?: Date;
}

const IntegrationsSettings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Google Analytics',
      description: 'Track website analytics and user behavior',
      type: 'analytics',
      status: 'connected',
      icon: '📊',
      config: { trackingId: 'GA-XXXXX-X' },
      lastSync: new Date('2024-01-15T10:30:00')
    },
    {
      id: '2',
      name: 'SendGrid',
      description: 'Email delivery service for notifications',
      type: 'email',
      status: 'connected',
      icon: '📧',
      config: { apiKey: 'SG.***' },
      lastSync: new Date('2024-01-15T09:15:00')
    },
    {
      id: '3',
      name: 'Stripe',
      description: 'Payment processing for subscriptions',
      type: 'payment',
      status: 'disconnected',
      icon: '💳',
      config: {}
    },
    {
      id: '4',
      name: 'Slack',
      description: 'Team notifications and alerts',
      type: 'communication',
      status: 'error',
      icon: '💬',
      config: { webhookUrl: 'https://hooks.slack.com/***' }
    }
  ]);
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [form] = Form.useForm();

  // Load integrations
  const loadIntegrations = async () => {
    setLoading(true);
    try {
      // Mock loading - in real app, use the service
      await new Promise(resolve => setTimeout(resolve, 500));
      message.success('Integrations loaded');
    } catch (error) {
      message.error('Failed to load integrations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIntegrations();
  }, []);

  // Handle integration toggle
  const handleToggleIntegration = async (integration: Integration) => {
    if (integration.status === 'connected') {
      Modal.confirm({
        title: 'Disconnect Integration',
        content: `Are you sure you want to disconnect ${integration.name}? This may affect related functionality.`,
        onOk: () => {
          setIntegrations(prev => 
            prev.map(i => 
              i.id === integration.id 
                ? { ...i, status: 'disconnected' as const }
                : i
            )
          );
          message.success(`${integration.name} disconnected`);
        }
      });
    } else {
      setSelectedIntegration(integration);
      setConfigModalVisible(true);
    }
  };

  // Handle configuration save
  const handleSaveConfig = async (values: any) => {
    try {
      if (selectedIntegration) {
        setIntegrations(prev => 
          prev.map(i => 
            i.id === selectedIntegration.id 
              ? { 
                  ...i, 
                  status: 'connected' as const, 
                  config: values,
                  lastSync: new Date()
                }
              : i
          )
        );
        message.success(`${selectedIntegration.name} connected successfully`);
        setConfigModalVisible(false);
        setSelectedIntegration(null);
        form.resetFields();
      }
    } catch (error) {
      message.error('Failed to save configuration');
    }
  };

  // Handle test connection
  const handleTestConnection = async (integration: Integration) => {
    message.loading(`Testing ${integration.name} connection...`, 0);
    
    // Simulate API test
    setTimeout(() => {
      message.destroy();
      if (integration.status === 'connected') {
        message.success(`${integration.name} connection test successful`);
      } else {
        message.error(`${integration.name} connection test failed`);
      }
    }, 2000);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'green';
      case 'disconnected': return 'default';
      case 'error': return 'red';
      default: return 'default';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircleOutlined />;
      case 'error': return <ExclamationCircleOutlined />;
      default: return null;
    }
  };

  // Render integration card
  const renderIntegrationCard = (integration: Integration) => (
    <motion.div
      key={integration.id}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        hoverable
        className="h-full"
        actions={[
          <Button
            key="configure"
            type="text"
            icon={<SettingOutlined />}
            onClick={() => {
              setSelectedIntegration(integration);
              setConfigModalVisible(true);
            }}
          >
            Configure
          </Button>,
          <Button
            key="test"
            type="text"
            icon={<ExperimentOutlined />}
            onClick={() => handleTestConnection(integration)}
            disabled={integration.status !== 'connected'}
          >
            Test
          </Button>,
          <Switch
            key="toggle"
            checked={integration.status === 'connected'}
            onChange={() => handleToggleIntegration(integration)}
            size="small"
          />
        ]}
      >
        <div className="text-center">
          <div className="text-4xl mb-3">{integration.icon}</div>
          <Title level={4} className="mb-2">{integration.name}</Title>
          <Text className="text-gray-500 text-sm mb-3 block">
            {integration.description}
          </Text>
          
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Tag 
              color={getStatusColor(integration.status)}
              icon={getStatusIcon(integration.status)}
            >
              {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
            </Tag>
            <Tag>{integration.type}</Tag>
          </div>
          
          {integration.lastSync && (
            <Text className="text-xs text-gray-400">
              Last sync: {integration.lastSync.toLocaleString()}
            </Text>
          )}
        </div>
      </Card>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="integrations-settings"
    >
      <Card>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Title level={2} className="mb-2">
              <ThunderboltOutlined className="mr-3" />
              Integrations
            </Title>
            <Text className="text-gray-500">
              Connect and manage third-party services and APIs
            </Text>
          </div>
          
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={loadIntegrations}
              loading={loading}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                // TODO: Implement add new integration
                message.info('Add new integration feature coming soon');
              }}
            >
              Add Integration
            </Button>
          </Space>
        </div>

        {/* Statistics */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={6}>
            <Card size="small" className="text-center">
              <Badge count={integrations.filter(i => i.status === 'connected').length} showZero>
                <CheckCircleOutlined className="text-2xl text-green-500" />
              </Badge>
              <div className="mt-2">
                <Text strong>Connected</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card size="small" className="text-center">
              <Badge count={integrations.filter(i => i.status === 'error').length} showZero>
                <ExclamationCircleOutlined className="text-2xl text-red-500" />
              </Badge>
              <div className="mt-2">
                <Text strong>Errors</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card size="small" className="text-center">
              <Badge count={integrations.filter(i => i.status === 'disconnected').length} showZero>
                <ApiOutlined className="text-2xl text-gray-400" />
              </Badge>
              <div className="mt-2">
                <Text strong>Available</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card size="small" className="text-center">
              <Badge count={integrations.length} showZero>
                <ThunderboltOutlined className="text-2xl text-blue-500" />
              </Badge>
              <div className="mt-2">
                <Text strong>Total</Text>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Integrations Grid */}
        <Row gutter={[16, 16]}>
          {integrations.map(integration => (
            <Col xs={24} sm={12} lg={6} key={integration.id}>
              {renderIntegrationCard(integration)}
            </Col>
          ))}
        </Row>
      </Card>

      {/* Configuration Modal */}
      <Modal
        title={`Configure ${selectedIntegration?.name}`}
        open={configModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setConfigModalVisible(false);
          setSelectedIntegration(null);
          form.resetFields();
        }}
        width={600}
      >
        {selectedIntegration && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSaveConfig}
            initialValues={selectedIntegration.config}
          >
            {/* Dynamic configuration fields based on integration type */}
            {selectedIntegration.type === 'analytics' && (
              <>
                <Form.Item
                  name="trackingId"
                  label="Google Analytics Tracking ID"
                  rules={[{ required: true, message: 'Please enter tracking ID' }]}
                >
                  <Input placeholder="GA-XXXXX-X" />
                </Form.Item>
                <Form.Item
                  name="enableEcommerce"
                  label="Enable E-commerce Tracking"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </>
            )}

            {selectedIntegration.type === 'email' && (
              <>
                <Form.Item
                  name="apiKey"
                  label="SendGrid API Key"
                  rules={[{ required: true, message: 'Please enter API key' }]}
                >
                  <Input.Password placeholder="SG.***" />
                </Form.Item>
                <Form.Item
                  name="fromEmail"
                  label="From Email Address"
                  rules={[
                    { required: true, message: 'Please enter from email' },
                    { type: 'email', message: 'Please enter valid email' }
                  ]}
                >
                  <Input placeholder="noreply@example.com" />
                </Form.Item>
              </>
            )}

            {selectedIntegration.type === 'payment' && (
              <>
                <Form.Item
                  name="publishableKey"
                  label="Stripe Publishable Key"
                  rules={[{ required: true, message: 'Please enter publishable key' }]}
                >
                  <Input placeholder="pk_***" />
                </Form.Item>
                <Form.Item
                  name="secretKey"
                  label="Stripe Secret Key"
                  rules={[{ required: true, message: 'Please enter secret key' }]}
                >
                  <Input.Password placeholder="sk_***" />
                </Form.Item>
                <Form.Item
                  name="webhookSecret"
                  label="Webhook Endpoint Secret"
                >
                  <Input.Password placeholder="whsec_***" />
                </Form.Item>
              </>
            )}

            {selectedIntegration.type === 'communication' && (
              <>
                <Form.Item
                  name="webhookUrl"
                  label="Slack Webhook URL"
                  rules={[
                    { required: true, message: 'Please enter webhook URL' },
                    { type: 'url', message: 'Please enter valid URL' }
                  ]}
                >
                  <Input placeholder="https://hooks.slack.com/***" />
                </Form.Item>
                <Form.Item
                  name="channel"
                  label="Default Channel"
                >
                  <Input placeholder="#general" />
                </Form.Item>
              </>
            )}
          </Form>
        )}
      </Modal>
    </motion.div>
  );
};

export default IntegrationsSettings;