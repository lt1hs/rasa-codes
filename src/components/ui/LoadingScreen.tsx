import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  isLite?: boolean;
  onLoadingComplete?: () => void;
  duration?: number;
}

const LoadingScreen = ({ isLite = false, onLoadingComplete, duration = 3000 }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, duration / 100);

    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const texts = ['Initializing', 'Configuring', 'Optimizing', 'Finalizing'];
        const currentIndex = texts.indexOf(prev);
        return texts[(currentIndex + 1) % texts.length];
      });
    }, duration / 4);

    const timeout = setTimeout(() => {
      if (onLoadingComplete) onLoadingComplete();
    }, duration);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
      clearTimeout(timeout);
    };
  }, [duration, onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-secondary-dark flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: isLite ? 0.3 : 0.5,
          ease: "easeOut"
        }}
        className="text-center"
      >
        <div className="w-24 h-24 mb-8 mx-auto">
          {/* Simple loading spinner for lite version */}
          {isLite ? (
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <motion.svg
              viewBox="0 0 100 100"
              className="w-full h-full text-primary"
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity
              }}
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray="180 260"
              />
            </motion.svg>
          )}
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: isLite ? 0.3 : 0.5
          }}
          className="text-2xl font-display font-bold mb-4"
        >
          در حال بارگذاری
        </motion.h2>
        {!isLite && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400"
          >
            لطفاً صبور باشید...
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default LoadingScreen;