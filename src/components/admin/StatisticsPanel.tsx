import React, { useState, useEffect } from 'react';
import '../../styles/admin/StatisticsPanel.scss';

// Mock data for the statistics
interface StatData {
  title: string;
  value: number;
  change: number;
  icon: string;
}

// Mock data for the activity feed
interface ActivityItem {
  id: number;
  type: 'user' | 'content' | 'system';
  message: string;
  timestamp: string;
}

// Mock data for the chart
interface ChartData {
  labels: string[];
  values: number[];
}

const StatisticsPanel: React.FC = () => {
  const [statsData, setStatsData] = useState<StatData[]>([]);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      // In a real application, you would fetch this data from your API
      setTimeout(() => {
        // Generate mock statistics data
        setStatsData([
          { title: 'تعداد کاربران', value: 1254, change: 12.5, icon: '👥' },
          { title: 'بازدیدها', value: 8547, change: 23.7, icon: '👁️' },
          { title: 'موارد محتوا', value: 245, change: 5.3, icon: '📝' },
          { title: 'فایل‌های رسانه', value: 782, change: -2.8, icon: '🖼️' },
        ]);
        
        // Generate mock activity feed
        setActivityFeed([
          { id: 1, type: 'user', message: 'کاربر جدید ثبت نام کرد: امیر محمدی', timestamp: '10 دقیقه پیش' },
          { id: 2, type: 'content', message: 'پست بلاگ "شروع کار با ری‌اکت" منتشر شد', timestamp: '2 ساعت پیش' },
          { id: 3, type: 'system', message: 'بروزرسانی سیستم با موفقیت انجام شد', timestamp: '5 ساعت پیش' },
          { id: 4, type: 'content', message: 'صفحه "درباره ما" بروزرسانی شد', timestamp: '1 روز پیش' },
          { id: 5, type: 'user', message: 'کاربر سارا احمدی پروفایل خود را بروزرسانی کرد', timestamp: '2 روز پیش' },
        ]);
        
        // Generate chart data based on timeRange
        generateChartData(timeRange);
        
        setIsLoading(false);
      }, 800);
    };
    
    fetchDashboardData();
  }, [timeRange]);
  
  const generateChartData = (range: 'day' | 'week' | 'month') => {
    let labels: string[] = [];
    let values: number[] = [];
    
    switch (range) {
      case 'day':
        labels = ['12ق.ظ', '4ق.ظ', '8ق.ظ', '12ب.ظ', '4ب.ظ', '8ب.ظ'];
        values = [15, 8, 23, 45, 38, 27];
        break;
      case 'week':
        labels = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
        values = [65, 72, 86, 95, 112, 68, 53];
        break;
      case 'month':
        labels = ['هفته 1', 'هفته 2', 'هفته 3', 'هفته 4'];
        values = [280, 325, 347, 290];
        break;
    }
    
    setChartData({ labels, values });
  };
  
  const handleTimeRangeChange = (range: 'day' | 'week' | 'month') => {
    setTimeRange(range);
  };
  
  return (
    <div className="statistics-panel">
      {isLoading ? (
        <div className="loading-indicator">در حال بارگذاری اطلاعات داشبورد...</div>
      ) : (
        <>
          <div className="stats-grid">
            {statsData.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <h3>{stat.title}</h3>
                  <div className="stat-value">{stat.value.toLocaleString()}</div>
                  <div className={`stat-change ${stat.change >= 0 ? 'positive' : 'negative'}`}>
                    {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="dashboard-row">
            <div className="chart-section">
              <div className="chart-header">
                <h2>فعالیت کاربران</h2>
                <div className="time-range-selector">
                  <button 
                    className={timeRange === 'day' ? 'active' : ''} 
                    onClick={() => handleTimeRangeChange('day')}
                  >
                    روز
                  </button>
                  <button 
                    className={timeRange === 'week' ? 'active' : ''} 
                    onClick={() => handleTimeRangeChange('week')}
                  >
                    هفته
                  </button>
                  <button 
                    className={timeRange === 'month' ? 'active' : ''} 
                    onClick={() => handleTimeRangeChange('month')}
                  >
                    ماه
                  </button>
                </div>
              </div>
              
              {chartData && (
                <div className="chart-container">
                  <div className="chart-visualization">
                    {chartData.values.map((value, index) => (
                      <div 
                        key={index} 
                        className="chart-bar" 
                        style={{ 
                          height: `${(value / Math.max(...chartData.values)) * 100}%` 
                        }}
                        title={`${chartData.labels[index]}: ${value}`}
                      />
                    ))}
                  </div>
                  <div className="chart-labels">
                    {chartData.labels.map((label, index) => (
                      <div key={index} className="chart-label">{label}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="activity-feed">
              <h2>فعالیت‌های اخیر</h2>
              <ul>
                {activityFeed.map(activity => (
                  <li key={activity.id} className={`activity-item ${activity.type}`}>
                    <div className="activity-content">
                      <p>{activity.message}</p>
                      <span className="activity-time">{activity.timestamp}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="quick-actions">
            <h2>دسترسی‌های سریع</h2>
            <div className="action-buttons">
              <button className="action-button">
                <span className="action-icon">📝</span>
                <span className="action-label">پست جدید</span>
              </button>
              <button className="action-button">
                <span className="action-icon">👤</span>
                <span className="action-label">افزودن کاربر</span>
              </button>
              <button className="action-button">
                <span className="action-icon">📊</span>
                <span className="action-label">آمار</span>
              </button>
              <button className="action-button">
                <span className="action-icon">⚙️</span>
                <span className="action-label">تنظیمات</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatisticsPanel;