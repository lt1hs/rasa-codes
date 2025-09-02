import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Progress, Typography, Space, Badge } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, Area, AreaChart } from 'recharts';

const { Title, Text } = Typography;

interface MetricData {
  value: number;
  change: number;
  trend: number[];
}

const RealTimeMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState({
    activeUsers: { value: 1247, change: 12.5, trend: [100, 120, 115, 140, 135, 160, 155, 180] },
    pageViews: { value: 8392, change: -2.3, trend: [200, 180, 220, 210, 250, 240, 280, 270] },
    conversions: { value: 156, change: 8.7, trend: [10, 12, 11, 15, 14, 18, 17, 20] },
    revenue: { value: 24567, change: 15.2, trend: [1000, 1200, 1100, 1400, 1300, 1600, 1500, 1800] }
  });

  const [serverMetrics, setServerMetrics] = useState({
    cpuUsage: 67,
    memoryUsage: 82,
    diskUsage: 45,
    networkTraffic: 78
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeUsers: {
          ...prev.activeUsers,
          value: prev.activeUsers.value + Math.floor(Math.random() * 10 - 5),
          trend: [...prev.activeUsers.trend.slice(1), prev.activeUsers.value + Math.floor(Math.random() * 20 - 10)]
        },
        pageViews: {
          ...prev.pageViews,
          value: prev.pageViews.value + Math.floor(Math.random() * 50 - 25),
          trend: [...prev.pageViews.trend.slice(1), prev.pageViews.value + Math.floor(Math.random() * 40 - 20)]
        },
        conversions: {
          ...prev.conversions,
          value: Math.max(0, prev.conversions.value + Math.floor(Math.random() * 4 - 2)),
          trend: [...prev.conversions.trend.slice(1), prev.conversions.value + Math.floor(Math.random() * 3 - 1)]
        },
        revenue: {
          ...prev.revenue,
          value: prev.revenue.value + Math.floor(Math.random() * 200 - 100),
          trend: [...prev.revenue.trend.slice(1), prev.revenue.value + Math.floor(Math.random() * 300 - 150)]
        }
      }));

      setServerMetrics(prev => ({
        cpuUsage: Math.max(0, Math.min(100, prev.cpuUsage + Math.floor(Math.random() * 10 - 5))),
        memoryUsage: Math.max(0, Math.min(100, prev.memoryUsage + Math.floor(Math.random() * 6 - 3))),
        diskUsage: Math.max(0, Math.min(100, prev.diskUsage + Math.floor(Math.random() * 4 - 2))),
        networkTraffic: Math.max(0, Math.min(100, prev.networkTraffic + Math.floor(Math.random() * 8 - 4)))
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const MetricCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    data: MetricData;
    prefix?: string;
    suffix?: string;
    color: string;
  }> = ({ title, icon, data, prefix = '', suffix = '', color }) => {
    const trendData = data.trend.map((value, index) => ({ value, index }));
    
    return (
      <Card hoverable className="h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg bg-${color}-100`}>
              <span className={`text-${color}-600`}>{icon}</span>
            </div>
            <Text className="text-gray-500 text-sm">{title}</Text>
          </div>
          <Badge status="processing" text="Live" />
        </div>
        
        <div className="mb-3">
          <Statistic
            value={data.value}
            precision={0}
            prefix={prefix}
            suffix={suffix}
            valueStyle={{ fontSize: '24px', fontWeight: 'bold' }}
          />
          <div className="flex items-center space-x-1 mt-1">
            {data.change > 0 ? (
              <ArrowUpOutlined className="text-green-500 text-xs" />
            ) : (
              <ArrowDownOutlined className="text-red-500 text-xs" />
            )}
            <Text
              className={`text-xs ${data.change > 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {Math.abs(data.change)}% from last hour
            </Text>
          </div>
        </div>

        <div className="h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <Area
                type="monotone"
                dataKey="value"
                stroke={color === 'blue' ? '#3b82f6' : color === 'green' ? '#10b981' : color === 'orange' ? '#f59e0b' : '#ef4444'}
                fill={color === 'blue' ? '#3b82f6' : color === 'green' ? '#10b981' : color === 'orange' ? '#f59e0b' : '#ef4444'}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Real-time Business Metrics */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <Title level={4} className="mb-0">Real-time Metrics</Title>
          <Badge status="processing" text="Auto-refreshing every 3s" />
        </div>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <MetricCard
              title="Active Users"
              icon={<UserOutlined />}
              data={metrics.activeUsers}
              color="blue"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <MetricCard
              title="Page Views"
              icon={<EyeOutlined />}
              data={metrics.pageViews}
              color="green"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <MetricCard
              title="Conversions"
              icon={<ShoppingCartOutlined />}
              data={metrics.conversions}
              color="orange"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <MetricCard
              title="Revenue"
              icon={<DollarOutlined />}
              data={metrics.revenue}
              prefix="$"
              color="purple"
            />
          </Col>
        </Row>
      </motion.div>

      {/* Server Health Metrics */}
      <motion.div variants={itemVariants}>
        <Card>
          <Title level={4} className="mb-4">Server Health</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <div className="text-center">
                <Progress
                  type="circle"
                  percent={serverMetrics.cpuUsage}
                  strokeColor={serverMetrics.cpuUsage > 80 ? '#ef4444' : serverMetrics.cpuUsage > 60 ? '#f59e0b' : '#10b981'}
                  size={80}
                />
                <div className="mt-2">
                  <Text strong>CPU Usage</Text>
                  <br />
                  <Text className="text-gray-500 text-sm">{serverMetrics.cpuUsage}%</Text>
                </div>
              </div>
            </Col>
            
            <Col xs={24} sm={12} lg={6}>
              <div className="text-center">
                <Progress
                  type="circle"
                  percent={serverMetrics.memoryUsage}
                  strokeColor={serverMetrics.memoryUsage > 80 ? '#ef4444' : serverMetrics.memoryUsage > 60 ? '#f59e0b' : '#10b981'}
                  size={80}
                />
                <div className="mt-2">
                  <Text strong>Memory Usage</Text>
                  <br />
                  <Text className="text-gray-500 text-sm">{serverMetrics.memoryUsage}%</Text>
                </div>
              </div>
            </Col>
            
            <Col xs={24} sm={12} lg={6}>
              <div className="text-center">
                <Progress
                  type="circle"
                  percent={serverMetrics.diskUsage}
                  strokeColor={serverMetrics.diskUsage > 80 ? '#ef4444' : serverMetrics.diskUsage > 60 ? '#f59e0b' : '#10b981'}
                  size={80}
                />
                <div className="mt-2">
                  <Text strong>Disk Usage</Text>
                  <br />
                  <Text className="text-gray-500 text-sm">{serverMetrics.diskUsage}%</Text>
                </div>
              </div>
            </Col>
            
            <Col xs={24} sm={12} lg={6}>
              <div className="text-center">
                <Progress
                  type="circle"
                  percent={serverMetrics.networkTraffic}
                  strokeColor={serverMetrics.networkTraffic > 80 ? '#ef4444' : serverMetrics.networkTraffic > 60 ? '#f59e0b' : '#10b981'}
                  size={80}
                />
                <div className="mt-2">
                  <Text strong>Network Traffic</Text>
                  <br />
                  <Text className="text-gray-500 text-sm">{serverMetrics.networkTraffic}%</Text>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default RealTimeMetrics;