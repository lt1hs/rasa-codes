import { motion } from 'framer-motion';
import { usePerformanceContext } from '../../contexts/PerformanceContext';

const ModeSwitcher = () => {
  const { isLiteVersion, setIsLiteVersion } = usePerformanceContext();

  const handleModeSwitch = () => {
    console.log('Current mode:', isLiteVersion ? 'Lite' : 'Full');
    console.log('Switching to:', !isLiteVersion ? 'Lite' : 'Full');
    setIsLiteVersion(!isLiteVersion);
  };

  return (
    <motion.button
      onClick={handleModeSwitch}
      className="fixed bottom-6 left-6 z-50 bg-secondary/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/10 flex items-center gap-2 hover:bg-secondary transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isLiteVersion ? (
        <>
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>حالت کامل</span>
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>حالت سبک</span>
        </>
      )}
    </motion.button>
  );
};

export default ModeSwitcher; 