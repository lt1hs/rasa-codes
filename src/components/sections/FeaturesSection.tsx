import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import SectionWrapper from '../ui/SectionWrapper';

const FeaturesSection = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 1]);
  
  const features = [
    {
      icon: 'sparkles',
      title: 'طراحی و نورپردازی حرفه‌ای',
      description: 'خلق فضاهایی الهام‌بخش با مهندسی نور',
      color: 'from-[#57DCDA] to-[#2B95D3]',
      glowColor: 'rgba(87, 220, 218, 0.3)',
      techPattern: 'circuit-1',
    },
    {
      icon: 'chart',
      title: 'هوشمندسازی ساختمان و خانه‌های مدرن',
      description: 'زندگی هوشمند، راحتی بی‌نهایت.',
      color: 'from-[#9D4EDD] to-[#6C3BBB]',
      glowColor: 'rgba(157, 78, 221, 0.3)',
      techPattern: 'circuit-2',
    },
    {
      icon: 'shield',
      title: 'طراحی و ساخت تابلوهای تبلیغات',
      description: 'برند شما، درخشان‌تر از همیشه.',
      color: 'from-[#2DEE59] to-[#1AB83C]',
      glowColor: 'rgba(45, 238, 89, 0.3)',
      techPattern: 'circuit-3',
    },
    {
      icon: 'chat',
      title: 'مهندسی محصولات الکترونیکی خاص',
      description: 'از ایده تا محصول نهایی، سفارشی‌سازی کامل.',
      color: 'from-[#FF8301] to-[#D95D04]',
      glowColor: 'rgba(255, 131, 1, 0.3)',
      techPattern: 'circuit-4',
    },
    {
      icon: 'bolt',
      title: 'فناوری انرژی خورشیدی و سیستم‌های پایدار',
      description: 'قدرت خورشید در خدمت آینده پاک‌تر.',
      color: 'from-[#FF4D4D] to-[#D93030]',
      glowColor: 'rgba(255, 77, 77, 0.3)',
      techPattern: 'circuit-5',
    },
    {
      icon: 'user',
      title: 'طراحی سه‌بعدی و واقعیت افزوده',
      description: 'ایده‌ها را قبل از اجرا لمس کنی.',
      color: 'from-[#00D4FF] to-[#0095B3]',
      glowColor: 'rgba(0, 212, 255, 0.3)',
      techPattern: 'circuit-6',
    },
  ];

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Enhanced circuit patterns with smoother animations
  const renderCircuitPattern = (type: string) => {
    const baseProps = {
      className: "absolute bottom-0 right-0 w-24 h-24",
      style: { opacity: 0.12 },
      initial: { pathLength: 0, opacity: 0 },
      animate: { pathLength: 1, opacity: 0.12 },
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        delay: Math.random() * 0.5,
      }
    };

    switch (type) {
      case 'circuit-1':
        return (
          <svg {...baseProps} viewBox="0 0 100 100" fill="none">
            <motion.path
              d="M10,30 Q25,30 40,30 T70,30 L70,10"
              stroke="currentColor"
              strokeWidth="1"
              {...baseProps}
            />
            <motion.path
              d="M50,10 L50,40 Q50,55 65,55 L90,55"
              stroke="currentColor"
              strokeWidth="1"
              {...baseProps}
            />
            <motion.circle cx="70" cy="30" r="2" fill="currentColor">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </motion.circle>
            <motion.circle cx="50" cy="55" r="2" fill="currentColor">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.5s" repeatCount="indefinite" />
            </motion.circle>
          </svg>
        );
      case 'circuit-2':
        return (
          <svg {...baseProps} viewBox="0 0 100 100" fill="none">
            <motion.path
              d="M10,20 L30,20 L30,50 L60,50 L60,80 L90,80"
              stroke="currentColor"
              strokeWidth="1"
              {...baseProps}
            />
            <motion.path
              d="M10,80 L30,80 L30,50"
              stroke="currentColor"
              strokeWidth="1"
              {...baseProps}
            />
            <motion.circle cx="30" cy="50" r="2" fill="currentColor">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </motion.circle>
            <motion.circle cx="60" cy="50" r="2" fill="currentColor">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </motion.circle>
          </svg>
        );
      case 'circuit-3':
        return (
          <svg {...baseProps} viewBox="0 0 100 100" fill="none">
            <motion.path
              d="M20,10 L20,40 L50,40 L50,70 L80,70"
              stroke="currentColor"
              strokeWidth="1"
              {...baseProps}
            />
            <motion.path
              d="M80,10 L80,40 L50,40"
              stroke="currentColor"
              strokeWidth="1"
              {...baseProps}
            />
            <motion.circle cx="50" cy="40" r="2" fill="currentColor">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </motion.circle>
            <motion.circle cx="20" cy="40" r="2" fill="currentColor">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </motion.circle>
            <motion.circle cx="80" cy="40" r="2" fill="currentColor">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </motion.circle>
          </svg>
        );
      case 'circuit-4':
        return (
          <svg {...baseProps} viewBox="0 0 100 100" fill="none">
            <motion.path
              d="M10,10 L90,10 L90,90"
              stroke="currentColor"
              strokeWidth="1"
              {...baseProps}
            />
            <motion.path
              d="M10,90 L90,90"
              stroke="currentColor"
              strokeWidth="1"
              {...baseProps}
            />
            <motion.circle cx="50" cy="10" r="2" fill="currentColor">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </motion.circle>
            <motion.circle cx="90" cy="50" r="2" fill="currentColor">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </motion.circle>
            <motion.circle cx="50" cy="90" r="2" fill="currentColor">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </motion.circle>
          </svg>
        );
      case 'circuit-5':
        return (
          <svg {...baseProps} viewBox="0 0 100 100" fill="none">
            <motion.path
              d="M50,10 L50,90"
              stroke="currentColor"
              strokeWidth="1"
              {...baseProps}
            />
            <motion.path
              d="M10,50 L90,50"
              stroke="currentColor"
              strokeWidth="1"
              {...baseProps}
            />
            <motion.circle cx="50" cy="50" r="5" fill="currentColor">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </motion.circle>
            <motion.circle cx="30" cy="30" r="2" fill="currentColor">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </motion.circle>
            <motion.circle cx="70" cy="70" r="2" fill="currentColor">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </motion.circle>
          </svg>
        );
      default:
        return (
          <svg {...baseProps} viewBox="0 0 100 100" fill="none">
            <motion.path
              d="M10,50 C30,30 70,30 90,50 C70,70 30,70 10,50 Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              {...baseProps}
            />
            <motion.circle cx="50" cy="50" r="2" fill="currentColor">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </motion.circle>
          </svg>
        );
    }
  };

  // Render icon based on type
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'sparkles':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'shield':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'chat':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'bolt':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
    }
  };

  return (
    <section className="py-24 bg-secondary relative overflow-hidden mt-[-300px]">
      {/* Enhanced background with dynamic elements */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-dark via-secondary to-secondary-dark" />
        
        {/* Enhanced glow effects */}
        <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] animate-pulse" />
        
        {/* Refined digital grid */}
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>

        {/* Enhanced data streams */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute h-px"
            style={{
              top: `${10 + i * 12}%`,
              left: 0,
              right: 0,
              background: 'linear-gradient(90deg, transparent, rgba(87, 220, 218, 0.3), transparent)',
              width: '100%',
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.8,
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        className="container relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Enhanced section header */}
        <div className="text-center mb-20 mt-[140px] relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Tech indicator lights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-primary"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            <motion.div
              className="inline-block mb-4 px-6 py-2 bg-primary/10 rounded-full backdrop-blur-sm border border-primary/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-sm font-medium tracking-wider text-primary uppercase">خدمات ما</h2>
            </motion.div>
            
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="text-white">پیوند فناوری</span>{" "}
              <span className="bg-gradient-to-r from-[#FF8301] to-[#FFB21A] bg-clip-text text-transparent">
                با خلاقیت
              </span>
            </h3>
            
            <motion.p 
              className="mt-6 text-lg text-gray-300/90 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              با استفاده از جدیدترین فناوری‌ها، راهکارهای هوشمند و خلاقانه برای کسب و کار شما ارائه می‌دهیم
            </motion.p>
          </motion.div>
        </div>

        {/* Enhanced features grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${feature.glowColor}, transparent 70%)`,
                  filter: 'blur(20px)',
                }}
              />

              <motion.div
                className="glass-card p-8 rounded-2xl h-full border border-white/20 bg-white/[0.05] backdrop-blur-lg relative overflow-hidden"
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
                }}
              >
                {/* Animated border effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ background: 'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1), transparent 50%)' }}
                  whileHover={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1), transparent 50%)',
                      'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1), transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 1.5, ease: "linear" }}
                />

                {/* Icon container with enhanced effects */}
                <div className="relative mb-6">
                  <motion.div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white relative`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${feature.glowColor}, transparent 70%)`,
                        filter: 'blur(8px)',
                      }}
                    />
                    
                    <div className="relative z-10">
                      {renderIcon(feature.icon)}
                    </div>
                  </motion.div>

                  {/* Tech connector lines */}
                  <motion.div
                    className="absolute top-8 -right-4 w-4 h-px"
                    style={{ background: `linear-gradient(to right, ${feature.glowColor}, transparent)` }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      width: ['16px', '24px', '16px'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                </div>

                <h4 className="text-2xl font-bold mb-3 text-white">
                  {feature.title}
                </h4>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Enhanced circuit pattern */}
                <div className="absolute bottom-0 right-0 opacity-30">
                  {renderCircuitPattern(feature.techPattern)}
                </div>

                {/* Tech data indicators */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  {[...Array(2)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 rounded-full"
                      style={{ background: feature.glowColor }}
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/features"
            className="inline-flex items-center gap-3 px-8 py-3 text-base font-medium rounded-full relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-80"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '200% 100%' }}
            />
            
            
            
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;