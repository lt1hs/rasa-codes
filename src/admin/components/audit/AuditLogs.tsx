import React, { useState } from 'react';
import {
  Table,
  Card,
  Tag,
  Space,
  Button,
  Input,
  Select,
  DatePicker,
  Badge,
  Tooltip,
  Typography,
  Row,
  Col,
  Statistic
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  DownloadOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { AuditLog, AuditAction, AuditSeverity } from '../../types/audit.types';
import { useQuery } from '../../hooks/useApi';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

interface AuditLogsProps {
  userId?: string;
  showStats?: boolean;
}

const AuditLogs: React.FC<AuditLogsProps> = ({ userId, showStats = true }) => {
  const [filters, setFilters] = useState<any>({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 50
  });

  // Fetch audit logs
  const {
    data: logsData,
    loading,
    refetch
  } = useQuery(`/audit/logs${userId ? `?userId=${userId}` : ''}`, {
    enabled: true
  });

  // Fetch audit stats
  const {
    data: statsData,
    loading: statsLoading
  } = useQuery('/audit/stats', {
    enabled: showStats
  });

  const logs = logsData?.items || [];
  const stats = statsData || {};

  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Get severity color
  const getSeverityColor = (severity: AuditSeverity): string => {
    const colors = {
      low: 'blue',
      medium: 'orange', 
      high: 'red',
      critical: 'purple'
    };
    return colors[severity];
  };

  // Get action color
  const getActionColor = (action: AuditAction): string => {
    const colors = {
      create: 'green',
      read: 'blue',
      update: 'orange',
      delete: 'red',
      login: 'cyan',
      logout: 'gray'
    } as any;
    return colors[action] || 'default';
  };

  // Table columns
  const columns: ColumnsType<AuditLog> = [
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 150,
      render: (timestamp: Date) => (
        <Tooltip title={dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')}>
          <Text className="text-sm">
            {dayjs(timestamp).format('MMM D, HH:mm')}
          </Text>
        </Tooltip>
      )
    },
    {
      title: 'User',
      key: 'user',
      width: 200,
      render: (_, record: AuditLog) => (
        <div>
          <div className="font-medium text-sm">{record.userName}</div>
          <div className="text-xs text-gray-500">{record.userEmail}</div>
          <Tag size="small" color="blue">{record.userRole}</Tag>
        </div>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (action: AuditAction) => (
        <Tag color={getActionColor(action)} className="capitalize">
          {action.replace('_', ' ')}
        </Tag>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (description: string) => (
        <Tooltip title={description}>
          <Text className="text-sm">{description}</Text>
        </Tooltip>
      )
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      width: 100,
      render: (severity: AuditSeverity) => (
        <Tag color={getSeverityColor(severity)} className="uppercase">
          {severity}
        </Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'success',
      key: 'success',
      width: 80,
      render: (success: boolean) => (
        <Badge 
          status={success ? 'success' : 'error'}
          text={success ? 'Success' : 'Failed'}
        />
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      render: (_, record: AuditLog) => (
        <Tooltip title="View Details">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => console.log('View details:', record)}
          />
        </Tooltip>
      )
    }
  ];

  return (
    <div className="audit-logs">
      {/* Statistics Cards */}
      {showStats && (
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <Statistic
                  title="Total Logs"
                  value={stats.totalLogs || 0}
                  loading={statsLoading}
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
                  title="Today's Activity"
                  value={stats.todayLogs || 0}
                  loading={statsLoading}
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
        transition={{ delay: 0.3 }}
      >
        <Card>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <Title level={3} className="mb-1">
                Audit Logs
              </Title>
              <Text className="text-gray-500">
                Track all system activities and user actions
              </Text>
            </div>
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => refetch()}
                loading={loading}
              >
                Refresh
              </Button>
              <Button
                icon={<DownloadOutlined />}
                onClick={() => console.log('Export logs')}
              >
                Export
              </Button>
            </Space>
          </div>

          {/* Filters */}
          <div className="mb-4">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={8}>
                <Search
                  placeholder="Search logs..."
                  allowClear
                  onSearch={(value) => handleFilterChange('search', value)}
                  prefix={<SearchOutlined />}
                />
              </Col>
              
              <Col xs={24} sm={12} lg={4}>
                <Select
                  placeholder="Action"
                  allowClear
                  className="w-full"
                  onChange={(value) => handleFilterChange('actions', value ? [value] : undefined)}
                >
                  <Option value="create">Create</Option>
                  <Option value="read">Read</Option>
                  <Option value="update">Update</Option>
                  <Option value="delete">Delete</Option>
                  <Option value="login">Login</Option>
                  <Option value="logout">Logout</Option>
                </Select>
              </Col>
            </Row>
          </div>

          {/* Table */}
          <Table
            columns={columns}
            dataSource={logs}
            rowKey="id"
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: logsData?.total || 0,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} logs`,
              onChange: (page, pageSize) => {
                setPagination({ current: page, pageSize: pageSize || 50 });
              }
            }}
            scroll={{ x: 1200 }}
            size="small"
          />
        </Card>
      </motion.div>
    </div>
  );
};

export default AuditLogs;