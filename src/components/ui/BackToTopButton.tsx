import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const BackToTopButton = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ 
        opacity: showBackToTop ? 1 : 0,
        scale: showBackToTop ? 1 : 0,
        rotate: showBackToTop ? 0 : -180
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Multiple Pulsing Rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 w-14 h-14 flex items-center justify-center"
          animate={{
            scale: [1, 1.4 + i * 0.2, 1],
            opacity: [0.4 - i * 0.1, 0, 0.4 - i * 0.1],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        >
          <div 
            className="w-0 h-0 border-l-[14px] border-r-[14px] border-b-[24px] border-l-transparent border-r-transparent"
            style={{ borderBottomColor: i % 2 === 0 ? '#57DCDA' : '#3AADAB' }}
          />
        </motion.div>
      ))}
      
      {/* Orbiting Particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 bg-[#57DCDA] rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transformOrigin: '0 0'
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.2
          }}
          transform={`translate(-50%, -50%) translateX(${25 + i * 3}px)`}
        />
      ))}
      
      {/* Main Triangle Button */}
      <motion.button
        className="relative w-14 h-14 flex items-center justify-center overflow-hidden group"
        onClick={scrollToTop}
        whileHover={{ scale: 1.2, rotate: 10, y: -3 }}
        whileTap={{ scale: 0.85, rotate: -5 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      >
        {/* Base Triangle with Gradient */}
        <div className="relative">
          <motion.div 
            className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[34px] border-l-transparent border-r-transparent"
            style={{
              borderBottomColor: '#57DCDA',
              filter: 'drop-shadow(0 4px 8px rgba(87,220,218,0.3))'
            }}
            whileHover={{
              filter: 'drop-shadow(0 8px 16px rgba(87,220,218,0.6)) drop-shadow(0 0 20px rgba(87,220,218,0.4))'
            }}
          />
          
          {/* Animated Gradient Overlay */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(135deg, #57DCDA 0%, #3AADAB 50%, #57DCDA 100%)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              width: '40px',
              height: '34px',
              top: '0px',
              left: '-20px'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Inner Glow Triangle */}
          <motion.div
            className="absolute opacity-0 group-hover:opacity-60"
            style={{
              background: 'radial-gradient(circle, rgba(87,220,218,0.8) 0%, transparent 70%)',
              clipPath: 'polygon(50% 10%, 10% 90%, 90% 90%)',
              width: '32px',
              height: '28px',
              top: '3px',
              left: '-16px'
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Animated Icon */}
        <motion.svg 
          className="absolute w-5 h-5 text-white z-20" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          whileHover={{ 
            y: -4, 
            scale: 1.1,
            filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))'
          }}
          transition={{ type: "spring", stiffness: 600, damping: 15 }}
        >
          <motion.path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={3} 
            d="M5 10l7-7m0 0l7 7m-7-7v18"
            animate={{
              strokeWidth: [3, 4, 3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.svg>
        
        {/* Energy Burst Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          whileHover={{ scale: 2 }}
          transition={{ duration: 0.3 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: '0 0'
              }}
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 20],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 20],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.1
              }}
            />
          ))}
        </motion.div>
        
        {/* Ripple Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(circle, rgba(87,220,218,0.3) 0%, transparent 70%)',
            borderRadius: '50%'
          }}
          animate={{
            scale: [0, 3],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        />
      </motion.button>
      
      {/* Floating Text Indicator */}
      <motion.div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        whileHover={{ y: -2 }}
      >
        <span className="text-xs text-[#57DCDA] font-medium whitespace-nowrap bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
          بازگشت به بالا
        </span>
      </motion.div>
    </motion.div>
  );
};

export default BackToTopButton;
