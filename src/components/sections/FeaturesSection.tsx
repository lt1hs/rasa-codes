import { motion } from 'framer-motion';
import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: 'sparkles',
      title: 'طراحی و نورپردازی حرفه‌ای',
      description: 'خلق فضاهایی الهام‌بخش با مهندسی نور',
      color: 'from-blue-500 to-cyan-400',
      techPattern: 'circuit-1',
    },
    {
      icon: 'chart',
      title: 'هوشمندسازی ساختمان و خانه‌های مدرن',
      description: 'زندگی هوشمند، راحتی بی‌نهایت.',
      color: 'from-purple-500 to-indigo-500',
      techPattern: 'circuit-2',
    },
    {
      icon: 'shield',
      title: 'طراحی و ساخت تابلوهای تبلیغات',
      description: 'برند شما، درخشان‌تر از همیشه.',
      color: 'from-green-500 to-emerald-400',
      techPattern: 'circuit-3',
    },
    {
      icon: 'chat',
      title: 'مهندسی محصولات الکترونیکی خاص',
      description: 'از ایده تا محصول نهایی، سفارشی‌سازی کامل.',
      color: 'from-amber-500 to-orange-400',
      techPattern: 'circuit-4',
    },
    {
      icon: 'bolt',
      title: 'فناوری انرژی خورشیدی و سیستم‌های پایدار',
      description: 'قدرت خورشید در خدمت آینده پاک‌تر.',
      color: 'from-red-500 to-pink-500',
      techPattern: 'circuit-5',
    },
    {
      icon: 'user',
      title: 'طراحی سه‌بعدی و واقعیت افزوده',
      description: 'ایده‌ها را قبل از اجرا لمس کنی.',
      color: 'from-teal-500 to-cyan-400',
      techPattern: 'circuit-6',
    },
  ];

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

  // Digital circuit patterns
  const renderCircuitPattern = (type: string) => {
    switch (type) {
      case 'circuit-1':
        return (
          <svg className="absolute bottom-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,30 L40,30 L40,10" stroke="currentColor" strokeWidth="1" />
            <path d="M50,10 L50,40 L90,40" stroke="currentColor" strokeWidth="1" />
            <path d="M90,50 L60,50 L60,90" stroke="currentColor" strokeWidth="1" />
            <circle cx="40" cy="30" r="3" fill="currentColor" />
            <circle cx="50" cy="40" r="3" fill="currentColor" />
            <circle cx="60" cy="50" r="3" fill="currentColor" />
          </svg>
        );
      case 'circuit-2':
        return (
          <svg className="absolute bottom-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,20 L30,20 L30,50 L60,50 L60,80 L90,80" stroke="currentColor" strokeWidth="1" />
            <path d="M10,80 L30,80 L30,50" stroke="currentColor" strokeWidth="1" />
            <circle cx="30" cy="50" r="3" fill="currentColor" />
            <circle cx="60" cy="50" r="3" fill="currentColor" />
          </svg>
        );
      case 'circuit-3':
        return (
          <svg className="absolute bottom-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,10 L20,40 L50,40 L50,70 L80,70" stroke="currentColor" strokeWidth="1" />
            <path d="M80,10 L80,40 L50,40" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="40" r="3" fill="currentColor" />
            <circle cx="20" cy="40" r="3" fill="currentColor" />
            <circle cx="80" cy="40" r="3" fill="currentColor" />
          </svg>
        );
      case 'circuit-4':
        return (
          <svg className="absolute bottom-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,10 L90,10 L90,90" stroke="currentColor" strokeWidth="1" />
            <path d="M10,90 L90,90" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="10" r="3" fill="currentColor" />
            <circle cx="90" cy="50" r="3" fill="currentColor" />
            <circle cx="50" cy="90" r="3" fill="currentColor" />
          </svg>
        );
      case 'circuit-5':
        return (
          <svg className="absolute bottom-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,10 L50,90" stroke="currentColor" strokeWidth="1" />
            <path d="M10,50 L90,50" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
            <circle cx="30" cy="30" r="3" fill="currentColor" />
            <circle cx="70" cy="70" r="3" fill="currentColor" />
          </svg>
        );
      default:
        return (
          <svg className="absolute bottom-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,50 C30,30 70,30 90,50 C70,70 30,70 10,50 Z" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
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
      {/* Enhanced background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-secondary-dark to-transparent opacity-60" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-[100px]" />
        
        {/* Digital grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Tech circuit lines */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M0,30 Q25,20 50,30 T100,30 V100 H0 Z" 
              fill="none" 
              stroke="rgba(255,255,255,0.03)" 
              strokeWidth="0.5"
            />
            <path 
              d="M0,60 Q25,50 50,60 T100,60 V100 H0 Z" 
              fill="none" 
              stroke="rgba(255,255,255,0.03)" 
              strokeWidth="0.5"
            />
          </svg>
        </div>
        
        {/* Animated particles */}
        <div className="hidden lg:block">
          {[...Array(12)].map((_, index) => (
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
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`stream-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{
                top: `${15 + i * 20}%`,
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
      </div>

      <div className="container relative z-10">
        {/* Enhanced section header with tech elements */}
        <div className="text-center mb-20 mt-[140px] relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-primary/30" />
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-block mb-3 px-4 py-1.5 bg-primary/10 rounded-full backdrop-blur-sm border border-primary/20 relative"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Tech decoration */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
              
              <h2 className="text-sm font-medium tracking-wider text-primary uppercase">خدمات ما</h2>
            </motion.div>
            
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 relative inline-block rtl">
              <span className="text-white">پیوند فناوری</span>{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">با خلاقیت</span>
              
              {/* Futuristic underline */}
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"
                animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </h3>
            
            <motion.p 
              className="mt-4 text-lg text-gray-300/90 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              با استفاده از جدیدترین فناوری‌ها، راهکارهای هوشمند و خلاقانه برای کسب و کار شما ارائه می‌دهیم
            </motion.p>
            
            {/* Tech radar animation */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-40 h-40 opacity-10 pointer-events-none">
              <motion.div 
                className="absolute inset-0 border-2 border-primary rounded-full"
                animate={{ scale: [0, 1], opacity: [1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Enhanced features grid with tech elements */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r rounded-2xl blur-lg opacity-30 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
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
                {renderCircuitPattern(feature.techPattern)}
                
                {/* Icon with gradient background and tech effect */}
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg relative`}>
                    {/* Pulsing effect */}
                    <motion.div 
                      className="absolute inset-0 rounded-xl"
                      animate={{ 
                        boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 15px rgba(255,255,255,0.4)', '0 0 0px rgba(255,255,255,0)']
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                    />
                {renderIcon(feature.icon)}
                  </div>
                  
                  {/* Tech connector line */}
                  <div className="absolute top-7 -right-4 w-4 h-px bg-gradient-to-r from-white/30 to-transparent" />
                </div>
                
                <h4 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">{feature.title}</h4>
                <p className="text-gray-300/80 leading-relaxed">{feature.description}</p>
                
                {/* Tech data indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1 opacity-30">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <motion.div 
                    className="w-1 h-1 bg-primary rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  />
                </div>
                
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br opacity-10 rounded-full" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced action button with tech elements */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative inline-block">
            {/* Tech connector lines */}
            <div className="absolute top-1/2 -left-10 w-10 h-px bg-gradient-to-r from-transparent to-primary/30" />
            <div className="absolute top-1/2 -right-10 w-10 h-px bg-gradient-to-l from-transparent to-primary/30" />
            
            <a href="/features" className="btn btn-primary inline-flex items-center gap-2 px-8 py-3 text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              {/* Tech scanner effect */}
              <motion.div 
                className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              
              <span className="relative z-10">استكشف جميع الميزات</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></div>
            </a>
          </div>
          
          {/* Tech data points */}
          <div className="mt-6 flex justify-center gap-8 opacity-30">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                className="flex items-center gap-1"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <div className="w-1 h-1 bg-primary rounded-full"></div>
                <div className="w-6 h-px bg-primary"></div>
                <div className="w-1 h-1 bg-primary rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection; 