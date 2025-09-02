import React, { useState, useEffect } from 'react';
import { Spin, Progress, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Text } = Typography;

interface AdminLoadingSpinnerProps {
  message?: string;
  showProgress?: boolean;
  timeout?: number;
  size?: 'small' | 'default' | 'large';
}

const AdminLoadingSpinner: React.FC<AdminLoadingSpinnerProps> = ({
  message = 'Loading admin panel...',
  showProgress = true,
  timeout = 10000,
  size = 'large'
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState(message);
  const [isTimeout, setIsTimeout] = useState(false);

  const loadingMessages = [
    'Loading admin panel...',
    'Initializing components...',
    'Fetching data...',
    'Almost ready...'
  ];

  useEffect(() => {
    if (!showProgress) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
        // Update loading message based on progress
        if (newProgress < 25) {
          setLoadingMessage(loadingMessages[0]);
        } else if (newProgress < 50) {
          setLoadingMessage(loadingMessages[1]);
        } else if (newProgress < 75) {
          setLoadingMessage(loadingMessages[2]);
        } else {
          setLoadingMessage(loadingMessages[3]);
        }

        return Math.min(newProgress, 95); // Never reach 100% automatically
      });
    }, 200);

    // Timeout handler
    const timeoutHandler = setTimeout(() => {
      setIsTimeout(true);
      setLoadingMessage('Loading is taking longer than expected...');
    }, timeout);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutHandler);
    };
  }, [showProgress, timeout, loadingMessages]);

  const customIcon = <LoadingOutlined style={{ fontSize: size === 'large' ? 40 : 24 }} spin />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen bg-gray-50"
    >
      <div className="text-center max-w-md mx-auto p-8">
        {/* Loading Spinner */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Spin indicator={customIcon} size={size} />
        </motion.div>

        {/* Loading Message */}
        <motion.div
          key={loadingMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <Text className={`text-gray-600 ${size === 'large' ? 'text-lg' : 'text-base'}`}>
            {loadingMessage}
          </Text>
        </motion.div>

        {/* Progress Bar */}
        {showProgress && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xs mx-auto"
          >
            <Progress
              percent={Math.round(progress)}
              showInfo={false}
              strokeColor={{
                '0%': '#1890ff',
                '100%': '#52c41a',
              }}
              trailColor="#f0f0f0"
              strokeWidth={4}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>0%</span>
              <span>{Math.round(progress)}%</span>
              <span>100%</span>
            </div>
          </motion.div>
        )}

        {/* Timeout Warning */}
        {isTimeout && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
          >
            <Text className="text-yellow-700 text-sm">
              If loading continues, please check your internet connection or try refreshing the page.
            </Text>
          </motion.div>
        )}

        {/* Performance Hint */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="mt-6 text-xs text-gray-400"
          >
            Development mode - Performance monitoring enabled
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminLoadingSpinner;