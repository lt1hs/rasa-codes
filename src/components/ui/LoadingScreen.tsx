import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + Math.random() * 10, 100));
      } else {
        setIsComplete(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-dark"
      animate={{
        opacity: isComplete ? 0 : 1,
        display: isComplete ? 'none' : 'flex',
      }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="relative">
        {/* Central Logo */}
        <motion.div
          className="w-24 h-24 mb-8 relative"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Animated border */}
          <svg className="absolute inset-0" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="#57DCDA"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.5 }}
            />
          </svg>

          {/* Logo placeholder - replace with your actual logo */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary to-accent opacity-80" />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-2xl font-bold text-white mb-2">RASA</div>
          <div className="text-primary/80 text-sm">جاري التحميل... {Math.round(progress)}%</div>
        </motion.div>

        {/* Tech decoration */}
        <div className="absolute -inset-8">
          {/* Animated particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl opacity-30" />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 