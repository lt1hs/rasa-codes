import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';

const TechStackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Enhanced parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  const technologies = [
    {
      name: 'هوش مصنوعی',
      icon: 'brain',
      color: '#FF8301',
      gradient: 'from-[#FF8301] to-[#FFB21A]',
      glowColor: 'rgba(255, 131, 1, 0.3)',
      description: 'استفاده از جدیدترین الگوریتم‌های هوش مصنوعی برای تحلیل داده‌ها و استخراج بینش‌های ارزشمند.'
    },
    {
      name: 'یادگیری ماشین',
      icon: 'code',
      color: '#57DCDA',
      gradient: 'from-[#57DCDA] to-[#2B95D3]',
      glowColor: 'rgba(87, 220, 218, 0.3)',
      description: 'مدل‌های یادگیری ماشین پیشرفته که با نیازهای شما تطبیق می‌یابند و با گذر زمان بهبود می‌یابند.'
    },
    {
      name: 'پردازش زبان',
      icon: 'document',
      color: '#57DCDA',
      gradient: 'from-[#00D4FF] to-[#0095B3]',
      glowColor: 'rgba(0, 212, 255, 0.3)',
      description: 'درک و تحلیل متون به چندین زبان برای استخراج اطلاعات مهم.'
    },
    {
      name: 'تحلیل داده',
      icon: 'chart',
      color: '#FF8301',
      gradient: 'from-[#9D4EDD] to-[#6C3BBB]',
      glowColor: 'rgba(157, 78, 221, 0.3)',
      description: 'پردازش حجم عظیمی از داده‌ها با سرعت و کارایی بالا.'
    }
  ];

  // Track card hover state for 3D effect
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Use the existing sectionRef for animations
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

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

  // Render icon based on type with enhanced effects
  const renderIcon = (iconType: string, color: string) => {
    const iconStyle = { color };
    const iconBaseProps = {
      className: "w-10 h-10 transform transition-transform duration-300 group-hover:scale-110",
      style: iconStyle,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const
    };
    
    switch (iconType) {
      case 'brain':
        return (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            {...iconBaseProps}
            whileHover={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <path d="M9.5 2.025a7 7 0 0 1 5 0M9.5 22.025a7 7 0 0 0 5 0M3 10.025c0-3.314 2.386-6 5.5-6M21 10.025c0-3.314-2.386-6-5.5-6M8.5 22.025c-3.114 0-5.5-2.686-5.5-6M15.5 22.025c3.114 0 5.5-2.686 5.5-6M12 19.025a1 1 0 1 0 0-2a1 1 0 0 0 0 2zM12 6.025a2 2 0 1 0 0-4a2 2 0 0 0 0 4zM7 9.025a1 1 0 1 0 0-2a1 1 0 0 0 0 2zM17 9.025a1 1 0 1 0 0-2a1 1 0 0 0 0 2zM12 15.025a3 3 0 1 0 0-6a3 3 0 0 0 0 6zM19 15.025a1 1 0 1 0 0-2a1 1 0 0 0 0 2zM5 15.025a1 1 0 1 0 0-2a1 1 0 0 0 0 2z" />
          </motion.svg>
        );
      case 'code':
        return (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            {...iconBaseProps}
            whileHover={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
            <line x1="19" y1="4" x2="5" y2="20"></line>
          </motion.svg>
        );
      case 'document':
        return (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            {...iconBaseProps}
            whileHover={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </motion.svg>
        );
      case 'chart':
        return (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            {...iconBaseProps}
            whileHover={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </motion.svg>
        );
      default:
        return (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            {...iconBaseProps}
            whileHover={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </motion.svg>
        );
    }
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0c1525] via-[#0c1a2e] to-[#0f1f38]">
      {/* Enhanced background elements */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        {/* Refined digital grid */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(87, 220, 218, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(87, 220, 218, 0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        {/* Enhanced glow effects */}
        <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#57DCDA]/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-[#FF8301]/5 rounded-full blur-[150px] animate-pulse" />
        
        {/* Enhanced data streams */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute h-px"
            style={{
              top: `${10 + i * 12}%`,
              left: 0,
              right: 0,
              background: 'linear-gradient(90deg, transparent, rgba(87, 220, 218, 0.2), transparent)',
              width: '100%',
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.8,
            }}
          />
        ))}

        {/* Main background circuit paths - enhanced */}
        <svg className="absolute inset-0 w-full h-full" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          {/* Enhanced circuit paths */}
          <motion.path
            d="M0,50 Q25,50 50,50 T100,50"
            stroke="#57DCDA"
            strokeWidth="0.1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: isInView ? 1 : 0, 
              opacity: isInView ? 0.2 : 0,
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          
          <motion.path
            d="M50,0 Q50,25 50,50 T50,100"
            stroke="#FF8301"
            strokeWidth="0.1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: isInView ? 1 : 0, 
              opacity: isInView ? 0.2 : 0,
            }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
          />
          
          {/* Connection nodes with enhanced animations */}
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={i}
              cx={25 + i * 12.5}
              cy="50"
              r="0.3"
              fill="#57DCDA"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isInView ? [0.2, 0.6, 0.2] : 0,
                r: isInView ? [0.2, 0.4, 0.2] : 0.2,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </svg>
      </motion.div>

      <motion.div 
        className="container relative z-10"
        style={{ opacity, scale }}
      >
        {/* Enhanced section header */}
        <div className="text-center mb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Tech indicator lights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-[#57DCDA]"
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
              className="inline-block mb-4 px-6 py-2 bg-[#57DCDA]/10 rounded-full backdrop-blur-sm border border-[#57DCDA]/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-sm font-medium tracking-wider text-[#57DCDA] uppercase">التقنيات المستخدمة</h2>
            </motion.div>
            
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="text-white">بناء المستقبل</span>{" "}
              <span className="bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                بتقنيات متطورة
              </span>
            </h3>
            
            <motion.p 
              className="mt-6 text-lg text-gray-300/90 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              نستخدم أحدث التقنيات والأدوات لتقديم تجربة فريدة وحلول مبتكرة تلبي احتياجاتك البحثية
            </motion.p>
          </motion.div>
        </div>

        {/* Enhanced 3D Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              className="relative group perspective-1000"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Enhanced glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${tech.glowColor}, transparent 70%)`,
                  filter: 'blur(20px)',
                }}
              />
              
              <motion.div
                className="glass-card p-8 rounded-2xl h-full border border-white/10 bg-white/[0.03] backdrop-blur-lg relative overflow-hidden"
                whileHover={{ 
                  y: -8,
                  rotateX: 5,
                  rotateY: -5,
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
                    className={`w-20 h-20 rounded-xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center text-white relative mx-auto group`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${tech.glowColor}, transparent 70%)`,
                        filter: 'blur(8px)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="relative z-10">
                      {renderIcon(tech.icon, 'white')}
                    </div>
                  </motion.div>

                  {/* Enhanced tech connector lines */}
                  <motion.div
                    className="absolute top-10 -right-4 w-4 h-px"
                    style={{ background: `linear-gradient(to right, ${tech.glowColor}, transparent)` }}
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

                <h4 className="text-2xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-br from-white to-white/80">
                  {tech.name}
                </h4>
                
                <p className="text-gray-300/80 leading-relaxed text-center">
                  {tech.description}
                </p>

                {/* Tech data indicators */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  {[...Array(2)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 rounded-full"
                      style={{ background: tech.glowColor }}
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

                {/* Enhanced 3D floating elements */}
                <motion.div 
                  className="absolute -top-3 -right-3 w-6 h-6 rounded-full"
                  style={{ background: tech.color }}
                  animate={{ 
                    opacity: hoveredCard === index ? [0.4, 0.8, 0.4] : 0.2,
                    y: hoveredCard === index ? [-2, 2, -2] : 0,
                    x: hoveredCard === index ? [2, -2, 2] : 0,
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div 
                  className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full"
                  style={{ background: tech.color }}
                  animate={{ 
                    opacity: hoveredCard === index ? [0.4, 0.8, 0.4] : 0.2,
                    y: hoveredCard === index ? [2, -2, 2] : 0,
                    x: hoveredCard === index ? [-2, 2, -2] : 0,
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TechStackSection;