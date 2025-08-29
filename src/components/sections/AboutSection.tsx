import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '+100', label: 'پروژه موفق', icon: '🚀', color: 'from-[#57DCDA] to-[#3AADAB]' },
    { number: '+50', label: 'مشتری راضی', icon: '✨', color: 'from-[#FF8301] to-[#FFB21A]' },
    { number: '+10', label: 'سال تجربه', icon: '⚡', color: 'from-[#9D4EDD] to-[#6C3BBB]' },
    { number: '+20', label: 'متخصص فنی', icon: '💡', color: 'from-[#2DEE59] to-[#1AB83C]' }
  ];

  const achievements = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 15l-2 5l9-9l-9-9l2 5l-5 4l5 4z" />
        </svg>
      ),
      title: 'توسعه +30 اپلیکیشن هوش مصنوعی',
      description: 'راهکارهای نوآورانه در حوزه هوش مصنوعی'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      title: '98% نرخ موفقیت',
      description: 'در اجرا و تحویل پروژه‌ها'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      title: 'امتیاز 4.9/5',
      description: 'میانگین رضایت مشتریان'
    }
  ];

  const techCapabilities = [
    { 
      title: 'هوش مصنوعی', 
      description: 'راهکارهای هوشمند پیشرفته', 
      progress: 95,
      color: 'from-[#57DCDA] to-[#3AADAB]'
    },
    { 
      title: 'تحلیل داده', 
      description: 'بینش‌های تحلیلی عمیق', 
      progress: 90,
      color: 'from-[#FF8301] to-[#FFB21A]'
    },
    { 
      title: 'امنیت سایبری', 
      description: 'حفاظت پیشرفته', 
      progress: 88,
      color: 'from-[#9D4EDD] to-[#6C3BBB]'
    },
    { 
      title: 'رایانش ابری', 
      description: 'راهکارهای ابری انعطاف‌پذیر', 
      progress: 92,
      color: 'from-[#2DEE59] to-[#1AB83C]'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0c1525] via-[#0c1a2e] to-[#0f1f38]">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Refined Particle Effect */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(87, 220, 218, 0.08) 0%, transparent 70%)`,
          }}
        />
        
        {/* Enhanced Digital Circuit Pattern */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `
              linear-gradient(to right, rgba(87, 220, 218, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(87, 220, 218, 0.05) 1px, transparent 1px),
              radial-gradient(circle, rgba(87, 220, 218, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px, 30px 30px, 30px 30px'
          }} />
        </div>

        {/* Enhanced Data Streams */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-[#57DCDA]/20 to-transparent"
              style={{
                top: `${15 * i}%`,
                x: -1000,
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "linear",
              }}
            />
          ))}
        </div>
        
        {/* Enhanced Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#57DCDA]/5 rounded-full blur-[150px]"
          style={{ y: backgroundY }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-[#FF8301]/5 rounded-full blur-[150px]"
          style={{ y: backgroundY }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Enhanced Tech Grid Pattern */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#57DCDA]/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
                boxShadow: [
                  '0 0 0px rgba(87, 220, 218, 0.2)',
                  '0 0 4px rgba(87, 220, 218, 0.4)',
                  '0 0 0px rgba(87, 220, 218, 0.2)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Content Container */}
      <motion.div 
        className="container relative z-10"
        style={{ opacity, scale }}
      >
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block relative">
            {/* Enhanced Glowing Border */}
            <motion.span
              className="absolute -inset-1 bg-gradient-to-r from-[#57DCDA]/20 to-[#3AADAB]/20 blur-lg"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Enhanced Tech Lines */}
            <motion.span
              className="absolute -inset-4 opacity-30"
              style={{
                background: `
                  linear-gradient(90deg, transparent, rgba(87, 220, 218, 0.1), transparent),
                  linear-gradient(180deg, transparent, rgba(87, 220, 218, 0.1), transparent)
                `,
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '200% 200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <h2 className="relative text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="text-white">درباره </span>
              <span className="relative">
                <span className="bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">رسا</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#57DCDA]/50 to-transparent"
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-300/90 max-w-2xl mx-auto">
            مهندسی آینده با نگاهی نو
          </p>
        </motion.div>

        {/* Enhanced Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Vision & Mission */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Enhanced Vision Card */}
            <motion.div
              className="group relative bg-white/[0.03] backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-300"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(45deg, rgba(87, 220, 218, 0.1), rgba(58, 173, 171, 0.1))',
                  filter: 'blur(8px)',
                }}
              />
              
              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#57DCDA]/20 to-[#3AADAB]/20 flex items-center justify-center group-hover:from-[#57DCDA]/30 group-hover:to-[#3AADAB]/30 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-6 h-6 text-[#57DCDA]" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </motion.svg>
                </motion.div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                  چشم‌انداز ما
                </h3>
              </div>
              <p className="text-gray-300/90 leading-relaxed">
                رسا در مسیر تبدیل‌شدن به یکی از پیشروترین شرکت‌های فناوری و طراحی در خاورمیانه گام برمی‌دارد؛ با هدف توسعه راهکارهای هوشمند، پایدار و خلاقانه که سبک زندگی و صنعت را متحول می‌سازند.
              </p>
            </motion.div>

            {/* Enhanced Mission Card - Similar structure to Vision */}
            <motion.div
              className="group relative bg-white/[0.03] backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-300"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              {/* Similar enhanced structure as Vision card */}
            </motion.div>

            {/* Enhanced Tech Capabilities */}
            <motion.div
              className="bg-white/[0.03] backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                توانمندی‌های فنی
              </h3>
              <div className="space-y-4">
                {techCapabilities.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="group p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold text-[#57DCDA]">{tech.title}</h4>
                      <span className="text-sm text-gray-400">{tech.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${tech.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{tech.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced Stats & Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: `linear-gradient(45deg, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})`,
                      filter: 'blur(12px)',
                    }}
                  />
                  <div className="relative text-center">
                    <motion.div 
                      className="text-3xl mb-2"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-300">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Achievements Section */}
            <motion.div
              className="bg-white/[0.03] backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
               دستاوردهای ما
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#57DCDA]/20 to-[#3AADAB]/20 flex items-center justify-center text-[#57DCDA] group-hover:from-[#57DCDA]/30 group-hover:to-[#3AADAB]/30 transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      {achievement.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-[#57DCDA] transition-colors duration-300">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-400">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.a
            href="/contact"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-full text-white font-semibold overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Enhanced Button Glow */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-[#3AADAB] to-[#57DCDA]"
              animate={{
                opacity: [0, 0.5, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            
            {/* Enhanced Cyber Lines */}
            <motion.span
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transform: 'skewX(-15deg)',
                width: '60%',
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
            
            <span className="relative">تماس با ما</span>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="relative w-5 h-5" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection; 