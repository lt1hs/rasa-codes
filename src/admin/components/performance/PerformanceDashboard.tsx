import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Progress, Table, Typography, Button, Space, Tag, Timeline } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  BarChartOutlined, 
  BugOutlined, 
  WarningOutlined, 
  CheckCircleOutlined,
  ReloadOutlined,
  ExportOutlined,
  ClockCircleOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { usePerformance } from '../../hooks/usePerformance';
import { useErrorTracking } from '../../services/errorTracking.service.tsx';
import type { ErrorReport, PerformanceMetric } from '../../services/errorTracking.service.tsx';

const { Title, Text } = Typography;

interface PerformanceSummary {
  totalErrors: number;
  totalWarnings: number;
  totalPerformanceMetrics: number;
  totalUserActivities: number;
  criticalErrors: number;
  sessionDuration: number;
}

const PerformanceDashboard: React.FC = () => {
  const { getMetrics, getMemoryUsage, measureWebVitals, exportPerformanceData } = usePerformance();
  const { errorTracker } = useErrorTracking();
  const [summary, setSummary] = useState<PerformanceSummary>({
    totalErrors: 0,
    totalWarnings: 0,
    totalPerformanceMetrics: 0,
    totalUserActivities: 0,
    criticalErrors: 0,
    sessionDuration: 0
  });
  const [errors, setErrors] = useState<ErrorReport[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [memoryUsage, setMemoryUsage] = useState<ReturnType<typeof getMemoryUsage>>(null);

  // Load initial data
  useEffect(() => {
    refreshData();
    
    // Set up interval for periodic updates
    const interval = setInterval(() => {
      refreshData();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    // Get error tracking summary
    const errorSummary = errorTracker.getSummary();
    setSummary(errorSummary);
    
    // Get recent errors
    const recentErrors = errorTracker.getErrorReports({ limit: 10 });
    setErrors(recentErrors);
    
    // Get recent performance metrics
    const recentMetrics = errorTracker.getPerformanceMetrics({ limit: 20 });
    setPerformanceMetrics(recentMetrics);
    
    // Get memory usage
    const memory = getMemoryUsage();
    setMemoryUsage(memory);
    
    // Measure web vitals
    measureWebVitals();
  };

  const exportData = () => {
    const data = exportPerformanceData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-data-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'gold';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  const columns: ColumnsType<ErrorReport> = [
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: number) => new Date(timestamp).toLocaleTimeString(),
      sorter: (a: ErrorReport, b: ErrorReport) => a.timestamp - b.timestamp,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag icon={type === 'error' ? <BugOutlined /> : <WarningOutlined />} color={type === 'error' ? 'error' : 'warning'}>
          {type}
        </Tag>
      ),
      filters: [
        { text: 'Error', value: 'error' },
        { text: 'Warning', value: 'warning' },
      ],
      onFilter: (value: boolean | React.Key, record: ErrorReport) => record.type === value,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (message: string) => (
        <Text ellipsis={{ tooltip: message }} style={{ width: 300 }}>
          {message}
        </Text>
      ),
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => (
        <Tag color={getSeverityColor(severity)}>{severity}</Tag>
      ),
      filters: [
        { text: 'Critical', value: 'critical' },
        { text: 'High', value: 'high' },
        { text: 'Medium', value: 'medium' },
        { text: 'Low', value: 'low' },
      ],
      onFilter: (value: boolean | React.Key, record: ErrorReport) => record.severity === value,
    },
    {
      title: 'Component',
      dataIndex: 'componentStack',
      key: 'component',
      render: (componentStack: string) => {
        if (!componentStack) return 'N/A';
        const lines = componentStack.split('\n');
        const componentLine = lines.find(line => line.includes('at ')) || lines[0];
        return componentLine.replace('at ', '').trim();
      },
    },
  ];

  const metricColumns: ColumnsType<PerformanceMetric> = [
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: number) => new Date(timestamp).toLocaleTimeString(),
    },
    {
      title: 'Metric',
      dataIndex: 'metric',
      key: 'metric',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value: number, record: PerformanceMetric) => {
        if (record.metric.includes('web_vital')) {
          return `${value.toFixed(2)}ms`;
        }
        if (record.metric.includes('operation') && record.metric.includes('error')) {
          return <Tag color="error">Failed</Tag>;
        }
        if (record.metric.includes('operation')) {
          return `${value.toFixed(2)}ms`;
        }
        return value.toString();
      },
    },
    {
      title: 'Metadata',
      dataIndex: 'metadata',
      key: 'metadata',
      render: (metadata: Record<string, any>) => {
        if (!metadata) return 'N/A';
        return Object.entries(metadata).map(([key, value]) => (
          <div key={key}>
            <Text strong>{key}:</Text> {String(value)}
          </div>
        ));
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="performance-dashboard"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title level={2}>
            <DashboardOutlined className="mr-3" />
            Performance Dashboard
          </Title>
          <Text className="text-gray-500">
            Monitor application performance, errors, and user activities
          </Text>
        </div>
        
        <Space>
          <Button 
            icon={<ReloadOutlined />} 
            onClick={refreshData}
          >
            Refresh
          </Button>
          <Button 
            icon={<ExportOutlined />} 
            onClick={exportData}
            type="primary"
          >
            Export Data
          </Button>
        </Space>
      </div>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={4}>
          <Card size="small">
            <Statistic
              title="Errors"
              value={summary.totalErrors}
              prefix={<BugOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={4}>
          <Card size="small">
            <Statistic
              title="Warnings"
              value={summary.totalWarnings}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={4}>
          <Card size="small">
            <Statistic
              title="Critical"
              value={summary.criticalErrors}
              prefix={<BugOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={4}>
          <Card size="small">
            <Statistic
              title="Metrics"
              value={summary.totalPerformanceMetrics}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={4}>
          <Card size="small">
            <Statistic
              title="Activities"
              value={summary.totalUserActivities}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={4}>
          <Card size="small">
            <Statistic
              title="Session"
              value={Math.floor(summary.sessionDuration / 60000)}
              suffix="min"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Memory Usage */}
      {memoryUsage && (
        <Card className="mb-6">
          <Title level={4} className="mb-4">Memory Usage</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <div className="text-center">
                <Text strong>Used Memory</Text>
                <div className="text-2xl font-bold">
                  {(memoryUsage.used! / 1024 / 1024).toFixed(1)} MB
                </div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="text-center">
                <Text strong>Total Memory</Text>
                <div className="text-2xl font-bold">
                  {(memoryUsage.total! / 1024 / 1024).toFixed(1)} MB
                </div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="text-center">
                <Text strong>Usage Percentage</Text>
                <Progress 
                  percent={Math.round(memoryUsage.percentage!)} 
                  status={memoryUsage.percentage! > 80 ? 'exception' : 'normal'}
                  className="mt-2"
                />
              </div>
            </Col>
          </Row>
        </Card>
      )}

      {/* Recent Errors */}
      <Card className="mb-6">
        <Title level={4} className="mb-4">Recent Errors & Warnings</Title>
        <Table
          dataSource={errors}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Performance Metrics */}
      <Card className="mb-6">
        <Title level={4} className="mb-4">Performance Metrics</Title>
        <Table
          dataSource={performanceMetrics}
          columns={metricColumns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Route Performance */}
      <Card>
        <Title level={4} className="mb-4">Route Performance</Title>
        {Object.entries(getMetrics().all).map(([route, metrics]) => (
          <div key={route} className="mb-4">
            <Text strong>{route}</Text>
            {metrics.length > 0 && (
              <div className="mt-2">
                <Text type="secondary">
                  Average Load Time: {metrics[metrics.length - 1].loadTime.toFixed(2)}ms
                </Text>
                <br />
                <Text type="secondary">
                  Average Render Time: {metrics[metrics.length - 1].renderTime.toFixed(2)}ms
                </Text>
              </div>
            )}
          </div>
        ))}
      </Card>
    </motion.div>
  );
};

export default PerformanceDashboard;