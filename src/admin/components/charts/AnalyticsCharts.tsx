import React from 'react';
import { Card, Row, Col, Typography, Space, Tag } from 'antd';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

// Mock data for charts
const userGrowthData = [
  { month: 'Jan', users: 1200, newUsers: 200, activeUsers: 950 },
  { month: 'Feb', users: 1400, newUsers: 250, activeUsers: 1100 },
  { month: 'Mar', users: 1650, newUsers: 300, activeUsers: 1300 },
  { month: 'Apr', users: 1900, newUsers: 280, activeUsers: 1500 },
  { month: 'May', users: 2200, newUsers: 350, activeUsers: 1750 },
  { month: 'Jun', users: 2500, newUsers: 400, activeUsers: 2000 },
];

const contentPerformanceData = [
  { category: 'Blog Posts', views: 12500, engagement: 85 },
  { category: 'Projects', views: 8900, engagement: 92 },
  { category: 'Pages', views: 15600, engagement: 78 },
  { category: 'Media', views: 6700, engagement: 88 },
  { category: 'News', views: 4300, engagement: 81 },
];

const deviceDistributionData = [
  { name: 'Desktop', value: 45, color: '#3b82f6' },
  { name: 'Mobile', value: 35, color: '#10b981' },
  { name: 'Tablet', value: 20, color: '#f59e0b' },
];

const trafficSourcesData = [
  { source: 'Direct', sessions: 3200, percentage: 42 },
  { source: 'Organic Search', sessions: 2800, percentage: 37 },
  { source: 'Social Media', sessions: 980, percentage: 13 },
  { source: 'Referral', sessions: 420, percentage: 5 },
  { source: 'Email', sessions: 200, percentage: 3 },
];

const revenueData = [
  { month: 'Jan', revenue: 12500, cost: 8900, profit: 3600 },
  { month: 'Feb', revenue: 14200, cost: 9800, profit: 4400 },
  { month: 'Mar', revenue: 16800, cost: 11200, profit: 5600 },
  { month: 'Apr', revenue: 15600, cost: 10400, profit: 5200 },
  { month: 'May', revenue: 18900, cost: 12600, profit: 6300 },
  { month: 'Jun', revenue: 21400, cost: 13800, profit: 7600 },
];

const AnalyticsCharts: React.FC = () => {
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
      {/* User Growth Analytics */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="mb-4">
            <Title level={4} className="mb-2">User Growth Analytics</Title>
            <Text className="text-gray-500">
              Track user acquisition and engagement over time
            </Text>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="users"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                name="Total Users"
              />
              <Area
                type="monotone"
                dataKey="activeUsers"
                stackId="2"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
                name="Active Users"
              />
              <Line
                type="monotone"
                dataKey="newUsers"
                stroke="#f59e0b"
                strokeWidth={3}
                name="New Users"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <Row gutter={[16, 16]}>
        {/* Content Performance */}
        <Col xs={24} lg={12}>
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <div className="mb-4">
                <Title level={4} className="mb-2">Content Performance</Title>
                <Text className="text-gray-500">Views and engagement by content type</Text>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={contentPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#3b82f6" name="Views" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>

        {/* Device Distribution */}
        <Col xs={24} lg={12}>
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <div className="mb-4">
                <Title level={4} className="mb-2">Device Distribution</Title>
                <Text className="text-gray-500">User sessions by device type</Text>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={deviceDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Traffic Sources */}
        <Col xs={24} lg={14}>
          <motion.div variants={itemVariants}>
            <Card>
              <div className="mb-4">
                <Title level={4} className="mb-2">Traffic Sources</Title>
                <Text className="text-gray-500">Where your visitors are coming from</Text>
              </div>
              <div className="space-y-3">
                {trafficSourcesData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded"
                        style={{
                          backgroundColor: [
                            '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'
                          ][index]
                        }}
                      />
                      <Text strong>{item.source}</Text>
                    </div>
                    <Space>
                      <Text>{item.sessions.toLocaleString()} sessions</Text>
                      <Tag color="blue">{item.percentage}%</Tag>
                    </Space>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </Col>

        {/* Revenue Analytics */}
        <Col xs={24} lg={10}>
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <div className="mb-4">
                <Title level={4} className="mb-2">Revenue Analytics</Title>
                <Text className="text-gray-500">Monthly revenue and profit trends</Text>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, '']} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Profit"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
};

export default AnalyticsCharts;