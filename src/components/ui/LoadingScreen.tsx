import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete, 
  duration = 3000 
}) => {
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
    <motion.div 
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md px-4">
        {/* Hexagon Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-6 h-full">
            {[...Array(60)].map((_, i) => (
              <motion.div 
                key={i}
                className="border border-cyan-500 aspect-square"
                initial={{ opacity: 0 }}
                animate={{ opacity: Math.random() }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Logo or Brand */}
        <motion.div 
          className="text-4xl font-bold text-center mb-8 text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          RASA
        </motion.div>
        
        {/* Loading Text */}
        <motion.div 
          className="text-cyan-400 text-sm mb-3 font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {loadingText}...
        </motion.div>
        
        {/* Progress Bar Container */}
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden mb-2 relative">
          {/* Glowing Effect */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            animate={{ 
              x: ['-100%', '100%'],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ opacity: 0.5 }}
          />
          
          {/* Actual Progress */}
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
            style={{ width: `${progress}%` }}
            initial={{ width: '0%' }}
          />
        </div>
        
        {/* Percentage Text */}
        <div className="flex justify-between text-xs text-gray-400 font-mono">
          <span>SYS.INIT</span>
          <span>{progress}%</span>
        </div>
        
        {/* Tech Details */}
        <div className="mt-8 text-gray-500 text-xs font-mono max-w-xs mx-auto">
          <motion.div 
            className="overflow-hidden h-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 + 0.5 }}
                className="mb-1"
              >
                &gt; {['Loading modules', 'Initializing components', 'Configuring interface', 'Optimizing performance', 'System ready'][i]}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;