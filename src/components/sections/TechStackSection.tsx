import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TechStackSection = () => {
  const technologies = [
    {
      name: 'هوش مصنوعی',
      icon: 'brain',
      color: '#FF8301',
      gradient: 'from-amber-500 to-orange-500',
      description: 'استفاده از جدیدترین الگوریتم‌های هوش مصنوعی برای تحلیل داده‌ها و استخراج بینش‌های ارزشمند.'
    },
    {
      name: 'یادگیری ماشین',
      icon: 'code',
      color: '#57DCDA', 
      gradient: 'from-cyan-400 to-teal-500',
      description: 'مدل‌های یادگیری ماشین پیشرفته که با نیازهای شما تطبیق می‌یابند و با گذر زمان بهبود می‌یابند.'
    },
    {
      name: 'پردازش زبان',
      icon: 'document',
      color: '#57DCDA',
      gradient: 'from-blue-400 to-cyan-500',
      description: 'درک و تحلیل متون به چندین زبان برای استخراج اطلاعات مهم.'
    },
    {
      name: 'تحلیل داده',
      icon: 'chart',
      color: '#FF8301',
      gradient: 'from-amber-400 to-yellow-500',
      description: 'پردازش حجم عظیمی از داده‌ها با سرعت و کارایی بالا.'
    }
  ];

  // Track card hover state for 3D effect
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Section reference for animations
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  // Render icon based on type
  const renderIcon = (iconType: string, color: string) => {
    const iconStyle = { color };
    
    switch (iconType) {
      case 'brain':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2.025a7 7 0 0 1 5 0M9.5 22.025a7 7 0 0 0 5 0M3 10.025c0-3.314 2.386-6 5.5-6M21 10.025c0-3.314-2.386-6-5.5-6M8.5 22.025c-3.114 0-5.5-2.686-5.5-6M15.5 22.025c3.114 0 5.5-2.686 5.5-6M12 19.025a1 1 0 1 0 0-2a1 1 0 0 0 0 2zM12 6.025a2 2 0 1 0 0-4a2 2 0 0 0 0 4zM7 9.025a1 1 0 1 0 0-2a1 1 0 0 0 0 2zM17 9.025a1 1 0 1 0 0-2a1 1 0 0 0 0 2zM12 15.025a3 3 0 1 0 0-6a3 3 0 0 0 0 6zM19 15.025a1 1 0 1 0 0-2a1 1 0 0 0 0 2zM5 15.025a1 1 0 1 0 0-2a1 1 0 0 0 0 2z" />
          </svg>
        );
      case 'code':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
            <line x1="19" y1="4" x2="5" y2="20"></line>
          </svg>
        );
      case 'document':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
    }
  };

  // 3D card animation
  const getCardTransform = (index: number) => {
    if (hoveredCard === index) {
      return {
        scale: 1.05,
        rotateX: 0,
        rotateY: 0,
        transition: { duration: 0.3 }
      };
    }
    return {};
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, type: "spring", stiffness: 100 }
    }
  };

  // Render circuit pattern
  const renderCircuitPattern = (index: number) => {
    const patterns = [
      <svg key="circuit-1" className="absolute bottom-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,30 L40,30 L40,10" stroke="currentColor" strokeWidth="1" />
        <path d="M50,10 L50,40 L90,40" stroke="currentColor" strokeWidth="1" />
        <circle cx="40" cy="30" r="3" fill="currentColor" />
        <circle cx="50" cy="40" r="3" fill="currentColor" />
      </svg>,
      <svg key="circuit-2" className="absolute bottom-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,20 L30,20 L30,50 L60,50 L60,80 L90,80" stroke="currentColor" strokeWidth="1" />
        <path d="M10,80 L30,80 L30,50" stroke="currentColor" strokeWidth="1" />
        <circle cx="30" cy="50" r="3" fill="currentColor" />
        <circle cx="60" cy="50" r="3" fill="currentColor" />
      </svg>,
      <svg key="circuit-3" className="absolute bottom-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20,10 L20,40 L50,40 L50,70 L80,70" stroke="currentColor" strokeWidth="1" />
        <path d="M80,10 L80,40 L50,40" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="40" r="3" fill="currentColor" />
        <circle cx="20" cy="40" r="3" fill="currentColor" />
      </svg>,
      <svg key="circuit-4" className="absolute bottom-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,10 L90,10 L90,90" stroke="currentColor" strokeWidth="1" />
        <path d="M10,90 L90,90" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="10" r="3" fill="currentColor" />
        <circle cx="90" cy="50" r="3" fill="currentColor" />
      </svg>
    ];
    
    return patterns[index % patterns.length];
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0c1525] via-[#0c1a2e] to-[#0f1f38]">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 z-0">
        {/* Digital grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(87, 220, 218, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(87, 220, 218, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Tech circuit lines */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path 
              d="M0,30 Q25,20 50,30 T100,30 V100 H0 Z" 
              fill="none" 
              stroke="rgba(87, 220, 218, 0.03)" 
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: isInView ? 1 : 0,
                transition: { duration: 2.5, ease: "easeInOut" }
              }}
            />
            <motion.path 
              d="M0,60 Q25,50 50,60 T100,60 V100 H0 Z" 
              fill="none" 
              stroke="rgba(255, 131, 1, 0.03)" 
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: isInView ? 1 : 0,
                transition: { duration: 2.5, ease: "easeInOut", delay: 0.5 }
              }}
            />
          </svg>
        </div>
        
        {/* Main background circuit paths - enhanced */}
        <svg className="absolute inset-0 w-full h-full" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          {/* Horizontal line */}
          <motion.path
            d="M0,50 L100,50"
            stroke="#57DCDA"
            strokeWidth="0.1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: isInView ? 1 : 0, 
              opacity: isInView ? 0.2 : 0,
              transition: { 
                duration: 4,
                ease: "easeInOut",
              }
            }}
          />
          
          {/* Vertical line */}
          <motion.path
            d="M50,0 L50,100"
            stroke="#57DCDA"
            strokeWidth="0.1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: isInView ? 1 : 0, 
              opacity: isInView ? 0.2 : 0,
              transition: { 
                duration: 4,
                ease: "easeInOut",
                delay: 0.5
              }
            }}
          />
          
          {/* Diagonal line */}
          <motion.path
            d="M25,25 L75,75"
            stroke="#FF8301"
            strokeWidth="0.1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: isInView ? 1 : 0, 
              opacity: isInView ? 0.2 : 0,
              transition: { 
                duration: 4,
                ease: "easeInOut",
                delay: 1
              }
            }}
          />
          
          {/* Central connection node */}
          <motion.circle
            cx="50"
            cy="50"
            r="0.6"
            fill="#57DCDA"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isInView ? [0.2, 0.6, 0.2] : 0,
              r: isInView ? [0.5, 0.7, 0.5] : 0.5,
              transition: {
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.5
              }
            }}
          />
        </svg>
        
        {/* Animated particles */}
        <div className="hidden lg:block">
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.5,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Digital data streams */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`stream-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-[#57DCDA] to-transparent"
              style={{
                top: `${20 + i * 30}%`,
                left: 0,
                right: 0,
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        
        {/* Enhanced gradient accents */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#57DCDA]/5 to-transparent opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FF8301]/5 to-transparent opacity-40" />
        
        {/* Enhanced accent glow effects */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#57DCDA]/5 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#FF8301]/5 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="container relative z-10">
        {/* Enhanced section header */}
        <div className="text-center mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-[#57DCDA]/30" />
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-block mb-3 px-4 py-1.5 bg-[#57DCDA]/10 rounded-full backdrop-blur-sm border border-[#57DCDA]/20 relative"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Tech decoration */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#57DCDA] rounded-full" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#57DCDA] rounded-full" />
              
              <h2 className="text-sm font-medium tracking-wider text-[#57DCDA] uppercase">التقنيات المستخدمة</h2>
            </motion.div>
            
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 relative inline-block rtl">
              <span className="text-white">بناء المستقبل</span> <span className="bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">بتقنيات متطورة</span>
              
              {/* Futuristic underline */}
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#57DCDA]/50 to-transparent"
                animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </h3>
            
            <motion.p 
              className="mt-4 text-gray-300/90 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              نستخدم أحدث التقنيات والأدوات لتقديم تجربة فريدة وحلول مبتكرة تلبي احتياجاتك البحثية
            </motion.p>
            
            {/* Tech radar animation */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-40 h-40 opacity-10 pointer-events-none">
              <motion.div 
                className="absolute inset-0 border-2 border-[#57DCDA] rounded-full"
                animate={{ scale: [0, 1], opacity: [1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Enhanced 3D Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              className="relative group perspective-1000"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              {/* Gradient background glow */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r ${tech.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300 -z-10`}
              />
              
              <div className="glass-card p-8 rounded-2xl h-full border border-white/10 backdrop-blur-md bg-white/5 relative z-10 overflow-hidden shadow-lg">
                {/* Tech border effect */}
                <motion.div 
                  className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none"
                  animate={{ 
                    boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 10px rgba(255,255,255,0.2)', '0 0 0px rgba(255,255,255,0)']
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                />
                
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-10 -z-10" />
                
                {/* Digital circuit pattern */}
                {renderCircuitPattern(index)}
                
                {/* Icon with gradient background and tech effect */}
                <div className="relative">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center text-white mb-6 shadow-lg relative mx-auto`}>
                    {/* Pulsing effect */}
                    <motion.div 
                      className="absolute inset-0 rounded-xl"
                      animate={{ 
                        boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 15px rgba(255,255,255,0.4)', '0 0 0px rgba(255,255,255,0)']
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                    />
                    {renderIcon(tech.icon, 'white')}
                  </div>
                  
                  {/* Tech connector lines */}
                  <div className="absolute top-8 -left-4 w-4 h-px bg-gradient-to-l from-white/30 to-transparent" />
                  <div className="absolute top-8 -right-4 w-4 h-px bg-gradient-to-r from-white/30 to-transparent" />
                </div>
                
                <h4 className="text-2xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">{tech.name}</h4>
                <p className="text-gray-300/80 leading-relaxed text-center">{tech.description}</p>
                
                {/* Tech data indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1 opacity-30">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <motion.div 
                    className="w-1 h-1 bg-white rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  />
                </div>
                
                {/* 3D floating elements */}
                <motion.div 
                  className="absolute -top-3 -right-3 w-6 h-6 rounded-full"
                  style={{ background: tech.color }}
                  animate={{ 
                    opacity: hoveredCard === index ? 0.8 : 0.2,
                    y: hoveredCard === index ? -2 : 0,
                    x: hoveredCard === index ? 2 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div 
                  className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full"
                  style={{ background: tech.color }}
                  animate={{ 
                    opacity: hoveredCard === index ? 0.8 : 0.2,
                    y: hoveredCard === index ? 2 : 0,
                    x: hoveredCard === index ? -2 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Tech data points */}
        <div className="mt-16 flex justify-center gap-8 opacity-30">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i}
              className="flex items-center gap-1"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              <div className="w-1 h-1 bg-[#57DCDA] rounded-full"></div>
              <div className="w-6 h-px bg-[#57DCDA]"></div>
              <div className="w-1 h-1 bg-[#57DCDA] rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection; 