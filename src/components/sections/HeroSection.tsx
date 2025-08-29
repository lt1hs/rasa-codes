import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import logoVertical from '../../assets/main-r-logo-ver.png';
import OptimizedImage from '../ui/OptimizedImage';
import { useInView } from '../../hooks/useInView';

const HeroSection = () => {
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const [backgroundRef, inView] = useInView({ threshold: 0.1 }); // Load when 10% visible
  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Load background when in view
  useEffect(() => {
    if (inView && !prefersReducedMotion) {
      // Add a small delay to ensure other critical assets load first
      const timer = setTimeout(() => {
        setIsBackgroundLoaded(true);
      }, 500); // Reduced delay from 1000ms to 500ms
      return () => clearTimeout(timer);
    }
  }, [inView, prefersReducedMotion]);

  // Refined animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.8
      }
    }
  };

  return (
    <section 
      ref={backgroundRef} // Attach ref to the section
      className="relative overflow-hidden min-h-screen flex items-center justify-center pt-24 pb-32 lg:pt-32 lg:pb-40 bg-secondary"
    >
      {/* Optimized Background */}
      {inView && !prefersReducedMotion && ( // Load only when in view
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://my.spline.design/retrofuturisticcircuitloop-ejlJpJAewVvJgEkK2cUajKzb/"
            frameBorder="0"
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              opacity: isBackgroundLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
            onLoad={() => setIsBackgroundLoaded(true)}
            loading="lazy" // Add lazy loading attribute
          />
          {/* Optimized overlay with reduced blur */}
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/60 to-secondary/80" />
        </div>
      )}

      {/* Loading state */}
      {inView && !isBackgroundLoaded && !prefersReducedMotion && ( // Show loading only when in view and not loaded
        <div className="absolute inset-0 flex items-center justify-center bg-secondary">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Fallback background for reduced motion */}
      {prefersReducedMotion && (
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-secondary" />
      )}

      {/* Main content with enhanced animations */}
      <motion.div 
        className="container relative z-10"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-block px-6 py-2 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm">
              <span className="text-primary font-medium tracking-wide">هوشمند بساز، حرفه‌ای بدرخش</span>
            </div>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight tracking-tight"
          >
            فناوری هوشمند
            <br />
            <span className="bg-gradient-to-r from-[#57DCDA] via-[#FF8301] to-[#57DCDA] text-transparent bg-clip-text bg-[length:200%_100%] animate-gradient">
              رسا تکنولوژی
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            جایی که فناوری، هنر و نوآوری با هم تلاقی می‌کنند
          </motion.p>
        </motion.div>

        {/* Enhanced logo container */}
        <div className="relative mx-auto my-16 max-w-2xl">
          <motion.div 
            className="relative aspect-video bg-secondary-dark/40 backdrop-blur-md rounded-xl border border-accent/10 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ 
                y: [0, -6, 0],
                filter: [
                  'drop-shadow(0 0 20px rgba(87,220,218,0.2))',
                  'drop-shadow(0 0 30px rgba(255,131,1,0.3))',
                  'drop-shadow(0 0 20px rgba(87,220,218,0.2))'
                ]
              }}
              transition={{ 
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <img 
                src={logoVertical} 
                alt="RASA Logo" 
                className="w-auto h-auto max-h-[280px]" 
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <motion.div 
          className="mt-24 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
            {[
              {
                title: " نورپردازی",
                color: "#57DCDA",
                delay: 0
              },
              {
                title: "تابلو رسا",
                color: "#FF8301",
                delay: 0.2
              },
              {
                title: "سلول خورشیدی و انرژی‌های نو",
                color: "#2DEE59",
                delay: 0.4
              },
              {
                title: "هوشمندسازی و اتوماسیون",
                color: "#9D4EDD",
                delay: 0.6
              },
              {
                title: "طراحی",
                color: "#FFC107",
                delay: 0.8
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                className="relative rounded-xl overflow-hidden"
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="glass-card aspect-[3/4] rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <motion.div
                      className="w-16 h-16 mb-6 rounded-full flex items-center justify-center"
                      style={{ background: `${card.color}10` }}
                      animate={{
                        boxShadow: [
                          `0 0 20px ${card.color}20`,
                          `0 0 30px ${card.color}30`,
                          `0 0 20px ${card.color}20`
                        ]
                      }}
                      transition={{
                        duration: 3,
                        delay: card.delay,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <motion.div
                        className="w-8 h-8 rounded-full"
                        style={{ border: `2px solid ${card.color}` }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          ease: "linear",
                          repeat: Infinity
                        }}
                      />
                    </motion.div>
                    
                    <h3 className="text-xl font-medium text-white mb-4">{card.title}</h3>
                    <motion.div 
                      className="w-12 h-0.5 rounded-full"
                      style={{ background: card.color }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
