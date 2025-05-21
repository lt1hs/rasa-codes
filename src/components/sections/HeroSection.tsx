import { motion } from 'framer-motion';
import logoVertical from '../../assets/main-r-logo-ver.png';

const HeroSection = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Circuit line animation variants with smoother transitions
  const circuitLineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.4,
      transition: { 
        duration: 3.5,
        ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for smoother animation
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-40">
      {/* Circuit board background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f172a] via-[#10192b] to-[#0f1f38] overflow-hidden">
        {/* Circuit grid lines - more optimized with CSS */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #57DCDA 0.5px, transparent 0.5px),
              linear-gradient(to bottom, #57DCDA 0.5px, transparent 0.5px)
            `,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Animated circuit paths - optimized for better performance */}
        <svg className="absolute inset-0 w-full h-full" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
          {/* Horizontal lines - reduced complexity for stability */}
          <motion.path
            d="M0,20 L30,20 C32,20 32,22 34,22 L66,22 C68,22 68,20 70,20 L100,20"
            stroke="#57DCDA"
            strokeWidth="0.08"
            fill="none"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { 
                pathLength: 1, 
                opacity: 0.3,
                transition: { 
                  duration: 3.5,
                  ease: [0.43, 0.13, 0.23, 0.96],
                  repeat: Infinity,
                  repeatType: "reverse" as const
                }
              }
            }}
          />
          
          {/* The rest of the horizontal paths with reduced opacity */}
          <motion.path
            d="M0,40 L20,40 C22,40 22,38 24,38 L76,38 C78,38 78,40 80,40 L100,40"
            stroke="#57DCDA"
            strokeWidth="0.08"
            fill="none"
            initial="hidden"
            animate="visible"
            variants={circuitLineVariants}
            transition={{ 
              delay: 0.6,
              duration: 4,
              ease: [0.43, 0.13, 0.23, 0.96],
              repeat: Infinity,
              repeatType: "reverse" as const
            }}
          />
          <motion.path
            d="M0,60 L40,60 C42,60 42,62 44,62 L56,62 C58,62 58,60 60,60 L100,60"
            stroke="#57DCDA"
            strokeWidth="0.08"
            fill="none"
            initial="hidden"
            animate="visible"
            variants={circuitLineVariants}
            transition={{ 
              delay: 1.2,
              duration: 4.5,
              ease: [0.43, 0.13, 0.23, 0.96],
              repeat: Infinity,
              repeatType: "reverse" as const
            }}
          />
          <motion.path
            d="M0,80 L50,80 C52,80 52,78 54,78 L66,78 C68,78 68,80 70,80 L100,80"
            stroke="#57DCDA"
            strokeWidth="0.08"
            fill="none"
            initial="hidden"
            animate="visible"
            variants={circuitLineVariants}
            transition={{ 
              delay: 1.8,
              duration: 5,
              ease: [0.43, 0.13, 0.23, 0.96],
              repeat: Infinity,
              repeatType: "reverse" as const
            }}
          />

          {/* Vertical lines - optimized paths */}
          <motion.path
            d="M30,0 L30,30 C30,32 32,32 32,34 L32,66 C32,68 30,68 30,70 L30,100"
            stroke="#57DCDA"
            strokeWidth="0.08"
            fill="none"
            initial="hidden"
            animate="visible"
            variants={circuitLineVariants}
            transition={{ 
              delay: 0.4,
              duration: 4.2,
              ease: [0.43, 0.13, 0.23, 0.96],
              repeat: Infinity,
              repeatType: "reverse" as const
            }}
          />
          <motion.path
            d="M70,0 L70,20 C70,22 68,22 68,24 L68,76 C68,78 70,78 70,80 L70,100"
            stroke="#57DCDA"
            strokeWidth="0.08"
            fill="none"
            initial="hidden"
            animate="visible"
            variants={circuitLineVariants}
            transition={{ 
              delay: 1.6,
              duration: 3.8,
              ease: [0.43, 0.13, 0.23, 0.96],
              repeat: Infinity,
              repeatType: "reverse" as const
            }}
          />

          {/* Diagonal connecting line for added complexity */}
          <motion.path
            d="M25,25 L75,75"
            stroke="#57DCDA"
            strokeWidth="0.08"
            strokeDasharray="0.5,1.5"
            fill="none"
            initial="hidden"
            animate="visible"
            variants={circuitLineVariants}
            transition={{ 
              delay: 2.2,
              duration: 3,
              ease: [0.43, 0.13, 0.23, 0.96],
              repeat: Infinity,
              repeatType: "reverse" as const
            }}
          />

          {/* Connection dots - optimized with custom variants */}
          {Array.from({ length: 12 }).map((_, i) => {
            // More deliberate placement of dots at intersections
            const positions = [
              {x: 30, y: 20}, {x: 70, y: 20}, 
              {x: 20, y: 40}, {x: 80, y: 40},
              {x: 40, y: 60}, {x: 60, y: 60},
              {x: 50, y: 80}, {x: 70, y: 80},
              {x: 25, y: 25}, {x: 75, y: 75},
              {x: 50, y: 35}, {x: 35, y: 65}
            ];
            return (
              <motion.circle
                key={i}
                cx={positions[i].x}
                cy={positions[i].y}
                r="0.25"
                fill="#57DCDA"
                initial={{ opacity: 0.05 }}
                custom={i}
                animate="pulse"
                variants={{
                  pulse: (i: number) => ({
                    opacity: [0.05, 0.25, 0.05],
                    r: [0.15, 0.25, 0.15],
                    transition: {
                      duration: 4 + (i % 3),
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse" as const,
                      delay: i * 0.2
                    }
                  })
                }}
              />
            );
          })}
        </svg>

        {/* Enhanced glow effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[150px] opacity-30" />
        <div className="absolute top-2/3 right-1/3 w-64 h-64 bg-accent/3 rounded-full blur-[100px] opacity-20" />
      </div>

      <div className="container relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-block px-4 py-2 mb-6 border border-primary/30 rounded-full bg-primary/5 backdrop-blur-sm text-sm">
              <span className="text-primary">هوشمند بساز، حرفه‌ای بدرخش</span>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            فناوری هوشمند<br />
            <span className="gradient-text">رسا تکنولوژی</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            جایی که فناوری، هنر و نوآوری با هم تلاقی می‌کنند
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            
          </motion.div>
        </motion.div>

        {/* Central RASA Logo with glow effects - enhanced stability */}
        <div className="relative mx-auto my-10 max-w-2xl">
          {/* Animated glowing border effects */}
          <div className="absolute -inset-[4px] z-0 rounded-lg overflow-hidden">
            {/* Clean border container */}
            <div className="absolute inset-0 rounded-lg border-2 border-[#57DCDA]/30 backdrop-blur-sm" />
            
            {/* Animated corner highlights */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M0,0 L20,0 C25,0 30,5 30,10 L30,20"
                stroke="#57DCDA"
                strokeWidth="1.5"
                fill="none"
                filter="drop-shadow(0 0 3px #57DCDA)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{ 
                  pathLength: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 2
                  },
                  opacity: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              />
              <motion.path
                d="M100,0 L80,0 C75,0 70,5 70,10 L70,20"
                stroke="#FF8301"
                strokeWidth="1.5"
                fill="none"
                filter="drop-shadow(0 0 3px #FF8301)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{ 
                  pathLength: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 2,
                    delay: 0.5
                  },
                  opacity: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                  }
                }}
              />
              <motion.path
                d="M100,100 L80,100 C75,100 70,95 70,90 L70,80"
                stroke="#57DCDA"
                strokeWidth="1.5"
                fill="none"
                filter="drop-shadow(0 0 3px #57DCDA)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{ 
                  pathLength: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 2,
                    delay: 1
                  },
                  opacity: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }
                }}
              />
              <motion.path
                d="M0,100 L20,100 C25,100 30,95 30,90 L30,80"
                stroke="#FF8301"
                strokeWidth="1.5"
                fill="none"
                filter="drop-shadow(0 0 3px #FF8301)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{ 
                  pathLength: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 2,
                    delay: 1.5
                  },
                  opacity: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1.5
                  }
                }}
              />
            </svg>
            
            {/* Accent dots at corners */}
            <motion.div 
              className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#57DCDA]"
              animate={{
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  '0 0 5px 2px rgba(87, 220, 218, 0.3)',
                  '0 0 8px 3px rgba(87, 220, 218, 0.7)',
                  '0 0 5px 2px rgba(87, 220, 218, 0.3)'
                ]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
            <motion.div 
              className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#FF8301]"
              animate={{
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  '0 0 5px 2px rgba(255, 131, 1, 0.3)',
                  '0 0 8px 3px rgba(255, 131, 1, 0.7)',
                  '0 0 5px 2px rgba(255, 131, 1, 0.3)'
                ]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.5
              }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#57DCDA]"
              animate={{
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  '0 0 5px 2px rgba(87, 220, 218, 0.3)',
                  '0 0 8px 3px rgba(87, 220, 218, 0.7)',
                  '0 0 5px 2px rgba(87, 220, 218, 0.3)'
                ]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-[#FF8301]"
              animate={{
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  '0 0 5px 2px rgba(255, 131, 1, 0.3)',
                  '0 0 8px 3px rgba(255, 131, 1, 0.7)',
                  '0 0 5px 2px rgba(255, 131, 1, 0.3)'
                ]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.5
              }}
            />
            
            {/* Animated edge traces */}
            <motion.div
              className="absolute top-0 h-[2px] bg-[#57DCDA] rounded-full"
              style={{ filter: 'drop-shadow(0 0 2px #57DCDA)' }}
              animate={{
                left: ['-20%', '120%'],
                width: ['20%', '30%', '20%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                left: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1
                },
                width: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1
                },
                opacity: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1
                }
              }}
            />
            <motion.div
              className="absolute bottom-0 h-[2px] bg-[#FF8301] rounded-full"
              style={{ filter: 'drop-shadow(0 0 2px #FF8301)' }}
              animate={{
                right: ['-20%', '120%'],
                width: ['20%', '30%', '20%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                right: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 1.5
                },
                width: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 1.5
                },
                opacity: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 1.5
                }
              }}
            />
            <motion.div
              className="absolute left-0 w-[2px] bg-[#57DCDA] rounded-full"
              style={{ filter: 'drop-shadow(0 0 2px #57DCDA)' }}
              animate={{
                top: ['-20%', '120%'],
                height: ['20%', '30%', '20%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                top: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 0.5
                },
                height: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 0.5
                },
                opacity: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 0.5
                }
              }}
            />
            <motion.div
              className="absolute right-0 w-[2px] bg-[#FF8301] rounded-full"
              style={{ filter: 'drop-shadow(0 0 2px #FF8301)' }}
              animate={{
                bottom: ['-20%', '120%'],
                height: ['20%', '30%', '20%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                bottom: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 2
                },
                height: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 2
                },
                opacity: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 2
                }
              }}
            />
          </div>
          
          {/* Main background panel - improved with will-change for better performance */}
          <motion.div 
            className="relative aspect-video bg-secondary-dark/60 backdrop-blur-md rounded-lg border border-accent/20 overflow-hidden shadow-2xl"
            style={{ willChange: 'opacity, transform' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo container - smoother animation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ willChange: 'transform' }}
              animate={{ 
                y: [0, -8, 0]
              }}
              transition={{ 
                duration: 8,
                ease: [0.43, 0.13, 0.23, 0.96],
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <img 
                src={logoVertical} 
                alt="RASA Logo" 
                className="w-auto h-auto max-h-[280px] drop-shadow-[0_0_60px_rgba(255,131,1,0.5)]" 
              />
            </motion.div>

            {/* Additional circuit elements within the logo panel */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <svg className="absolute bottom-0 left-0 w-full h-1/3">
                <motion.path
                  d="M0,40 C10,40 20,10 30,10 L70,10 C80,10 90,40 100,40"
                  stroke="#57DCDA"
                  strokeWidth="0.2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ 
                    duration: 4,
                    ease: [0.43, 0.13, 0.23, 0.96],
                    repeat: Infinity,
                    repeatType: "reverse" as const,
                    delay: 0.5
                  }}
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Featured image */}
        <motion.div 
          className="mt-[290px] max-w-5xl mx-auto relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.8, 
            duration: 0.8,
            type: "spring",
            stiffness: 50
          }}
        >
          <div className="relative">
            {/* Main image grid */}
            <div className="relative z-10 rounded-2xl overflow-hidden">
              <div className="bg-transparent rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                  {/* Teal card */}
                  <motion.div 
                    className="relative rounded-xl overflow-hidden"
                    transition={{ duration: 0.3 }}
                  >
                    {/* Enhanced Teal glow effects */}
                    <motion.div 
                      className="absolute -inset-[2px] rounded-xl opacity-70 blur-[2px]"
                      animate={{
                        boxShadow: [
                          '0 0 8px 2px rgba(87, 220, 218, 0.4)', 
                          '0 0 16px 6px rgba(87, 220, 218, 0.6)', 
                          '0 0 8px 2px rgba(87, 220, 218, 0.4)'
                        ],
                        opacity: [0.7, 0.9, 0.7]
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    
                    {/* Background glow patterns */}
                    <div className="absolute -inset-[4px] z-[-1] bg-[#57DCDA] blur-xl opacity-20 rounded-xl" />
                    <div className="absolute inset-0 rounded-xl border border-[#57DCDA]/60" />
                    
                    {/* Animated background pattern */}
                    <motion.div 
                      className="absolute inset-0 z-[-2] opacity-10"
                      style={{
                        background: `
                          radial-gradient(circle at 20% 30%, rgba(87, 220, 218, 0.4) 0%, transparent 50%),
                          radial-gradient(circle at 80% 70%, rgba(87, 220, 218, 0.4) 0%, transparent 50%)
                        `
                      }}
                      animate={{
                        opacity: [0.1, 0.2, 0.1]
                      }}
                      transition={{
                        duration: 5,
                        ease: "easeInOut",
                        repeat: Infinity
                      }}
                    />
                    
                    <div className="glass-card aspect-[3/4] overflow-hidden rounded-lg border border-[#57DCDA]/30 bg-[#57DCDA]/5 p-3 backdrop-blur-sm">
                      <div className="relative h-full flex flex-col justify-between">
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-[#57DCDA]/10 backdrop-blur-sm border border-[#57DCDA]/30">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                                className="w-8 h-8 border-2 border-[#57DCDA] border-t-transparent rounded-full"
                              />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">طراحی و نورپردازی</h3>
                            <div className="w-12 h-1 bg-[#57DCDA]/40 mx-auto rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          {/* Inner highlight effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#57DCDA]/30 to-transparent opacity-40 rounded-lg" />
                          
                          {/* Icon effect */}
                          <div className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-[#57DCDA]/10 backdrop-blur-sm border border-[#57DCDA]/40 z-10">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                              className="w-5 h-5 border-2 border-[#57DCDA] border-t-transparent rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Orange card */}
                  <motion.div 
                    className="relative rounded-xl overflow-hidden"
                    transition={{ duration: 0.3 }}
                  >
                    {/* Enhanced Orange glow effects */}
                    <motion.div 
                      className="absolute -inset-[2px] rounded-xl opacity-70 blur-[2px]"
                      animate={{
                        boxShadow: [
                          '0 0 8px 2px rgba(255, 131, 1, 0.4)', 
                          '0 0 16px 6px rgba(255, 131, 1, 0.6)', 
                          '0 0 8px 2px rgba(255, 131, 1, 0.4)'
                        ],
                        opacity: [0.7, 0.9, 0.7]
                      }}
                      transition={{
                        duration: 3.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    
                    {/* Background glow patterns */}
                    <div className="absolute -inset-[4px] z-[-1] bg-[#FF8301] blur-xl opacity-20 rounded-xl" />
                    <div className="absolute inset-0 rounded-xl border border-[#FF8301]/60" />
                    
                    {/* Animated background pattern */}
                    <motion.div 
                      className="absolute inset-0 z-[-2] opacity-10"
                      style={{
                        background: `
                          radial-gradient(circle at 70% 20%, rgba(255, 131, 1, 0.4) 0%, transparent 50%),
                          radial-gradient(circle at 30% 80%, rgba(255, 131, 1, 0.4) 0%, transparent 50%)
                        `
                      }}
                      animate={{
                        opacity: [0.1, 0.2, 0.1]
                      }}
                      transition={{
                        duration: 5.5,
                        ease: "easeInOut",
                        repeat: Infinity
                      }}
                    />
                    
                    <div className="glass-card aspect-[3/4] overflow-hidden rounded-lg border border-[#FF8301]/30 bg-[#FF8301]/5 p-3 backdrop-blur-sm">
                      <div className="relative h-full flex flex-col justify-between">
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-[#FF8301]/10 backdrop-blur-sm border border-[#FF8301]/30">
                              <motion.div
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  opacity: [0.7, 1, 0.7]
                                }}
                                transition={{ 
                                  duration: 3, 
                                  ease: "easeInOut", 
                                  repeat: Infinity
                                }}
                                className="w-8 h-8 bg-[#FF8301] rounded-full"
                              />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">تابلو رسا</h3>
                            <div className="w-12 h-1 bg-[#FF8301]/40 mx-auto rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          {/* Inner highlight effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#FF8301]/30 to-transparent opacity-40 rounded-lg" />
                          
                          {/* Icon effect */}
                          <div className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-[#FF8301]/10 backdrop-blur-sm border border-[#FF8301]/40 z-10">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 1, 0.7]
                              }}
                              transition={{ 
                                duration: 3, 
                                ease: "easeInOut", 
                                repeat: Infinity
                              }}
                              className="w-5 h-5 bg-[#FF8301] rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Green card */}
                  <motion.div 
                    className="relative rounded-xl overflow-hidden"
                    transition={{ duration: 0.3 }}
                  >
                    {/* Enhanced Green glow effects */}
                    <motion.div 
                      className="absolute -inset-[2px] rounded-xl opacity-70 blur-[2px]"
                      animate={{
                        boxShadow: [
                          '0 0 8px 2px rgba(45, 238, 89, 0.4)', 
                          '0 0 16px 6px rgba(45, 238, 89, 0.6)', 
                          '0 0 8px 2px rgba(45, 238, 89, 0.4)'
                        ],
                        opacity: [0.7, 0.9, 0.7]
                      }}
                      transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    
                    {/* Background glow patterns */}
                    <div className="absolute -inset-[4px] z-[-1] bg-[#2DEE59] blur-xl opacity-20 rounded-xl" />
                    <div className="absolute inset-0 rounded-xl border border-[#2DEE59]/60" />
                    
                    {/* Animated background pattern */}
                    <motion.div 
                      className="absolute inset-0 z-[-2] opacity-10"
                      style={{
                        background: `
                          radial-gradient(circle at 40% 40%, rgba(45, 238, 89, 0.4) 0%, transparent 50%),
                          radial-gradient(circle at 60% 60%, rgba(45, 238, 89, 0.4) 0%, transparent 50%)
                        `
                      }}
                      animate={{
                        opacity: [0.1, 0.2, 0.1]
                      }}
                      transition={{
                        duration: 4.5,
                        ease: "easeInOut",
                        repeat: Infinity
                      }}
                    />
                    
                    <div className="glass-card aspect-[3/4] overflow-hidden rounded-lg border border-[#2DEE59]/30 bg-[#2DEE59]/5 p-3 backdrop-blur-sm">
                      <div className="relative h-full flex flex-col justify-between">
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-[#2DEE59]/10 backdrop-blur-sm border border-[#2DEE59]/30">
                              <motion.div
                                animate={{ 
                                  y: [0, -4, 0],
                                  x: [0, 2, 0, -2, 0],
                                }}
                                transition={{ 
                                  duration: 2, 
                                  ease: "easeInOut", 
                                  repeat: Infinity
                                }}
                                className="w-8 h-8 border-2 border-[#2DEE59] rounded"
                              />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">سلول خورشیدی و انرژی‌های نو</h3>
                            <div className="w-12 h-1 bg-[#2DEE59]/40 mx-auto rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          {/* Inner highlight effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#2DEE59]/30 to-transparent opacity-40 rounded-lg" />
                          
                          {/* Icon effect */}
                          <div className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-[#2DEE59]/10 backdrop-blur-sm border border-[#2DEE59]/40 z-10">
                            <motion.div
                              animate={{ 
                                y: [0, -4, 0],
                                x: [0, 2, 0, -2, 0],
                              }}
                              transition={{ 
                                duration: 2, 
                                ease: "easeInOut", 
                                repeat: Infinity
                              }}
                              className="w-5 h-5 border-2 border-[#2DEE59] rounded"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Purple card */}
                  <motion.div 
                    className="relative rounded-xl overflow-hidden"
                    transition={{ duration: 0.3 }}
                  >
                    {/* Enhanced Purple glow effects */}
                    <motion.div 
                      className="absolute -inset-[2px] rounded-xl opacity-70 blur-[2px]"
                      animate={{
                        boxShadow: [
                          '0 0 8px 2px rgba(157, 78, 221, 0.4)', 
                          '0 0 16px 6px rgba(157, 78, 221, 0.6)', 
                          '0 0 8px 2px rgba(157, 78, 221, 0.4)'
                        ],
                        opacity: [0.7, 0.9, 0.7]
                      }}
                      transition={{
                        duration: 3.2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    
                    {/* Background glow patterns */}
                    <div className="absolute -inset-[4px] z-[-1] bg-[#9D4EDD] blur-xl opacity-20 rounded-xl" />
                    <div className="absolute inset-0 rounded-xl border border-[#9D4EDD]/60" />
                    
                    {/* Animated background pattern */}
                    <motion.div 
                      className="absolute inset-0 z-[-2] opacity-10"
                      style={{
                        background: `
                          radial-gradient(circle at 60% 30%, rgba(157, 78, 221, 0.4) 0%, transparent 50%),
                          radial-gradient(circle at 20% 70%, rgba(157, 78, 221, 0.4) 0%, transparent 50%)
                        `
                      }}
                      animate={{
                        opacity: [0.1, 0.2, 0.1]
                      }}
                      transition={{
                        duration: 6,
                        ease: "easeInOut",
                        repeat: Infinity
                      }}
                    />
                    
                    <div className="glass-card aspect-[3/4] overflow-hidden rounded-lg border border-[#9D4EDD]/30 bg-[#9D4EDD]/5 p-3 backdrop-blur-sm">
                      <div className="relative h-full flex flex-col justify-between">
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-[#9D4EDD]/10 backdrop-blur-sm border border-[#9D4EDD]/30">
                              <motion.div
                                animate={{ 
                                  rotate: [0, 180, 180, 0],
                                  scale: [1, 0.8, 1.2, 1]
                                }}
                                transition={{ 
                                  duration: 4, 
                                  ease: "easeInOut", 
                                  repeat: Infinity
                                }}
                                className="w-8 h-8 bg-[#9D4EDD] rounded-sm"
                              />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">هوشمندسازی و اتوماسیون</h3>
                            <div className="w-12 h-1 bg-[#9D4EDD]/40 mx-auto rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          {/* Inner highlight effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#9D4EDD]/30 to-transparent opacity-40 rounded-lg" />
                          
                          {/* Icon effect */}
                          <div className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-[#9D4EDD]/10 backdrop-blur-sm border border-[#9D4EDD]/40 z-10">
                            <motion.div
                              animate={{ 
                                rotate: [0, 180, 180, 0],
                                scale: [1, 0.8, 1.2, 1]
                              }}
                              transition={{ 
                                duration: 4, 
                                ease: "easeInOut", 
                                repeat: Infinity
                              }}
                              className="w-5 h-5 bg-[#9D4EDD] rounded-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 