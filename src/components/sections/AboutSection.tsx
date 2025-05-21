import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '+100', label: 'پروژه موفق', icon: '🚀' },
    { number: '+50', label: 'مشتری راضی', icon: '✨' },
    { number: '+10', label: 'سال تجربه', icon: '⚡' },
    { number: '+20', label: 'متخصص فنی', icon: '💡' }
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
    { title: 'هوش مصنوعی', description: 'راهکارهای هوشمند پیشرفته', progress: 95 },
    { title: 'تحلیل داده', description: 'بینش‌های تحلیلی عمیق', progress: 90 },
    { title: 'امنیت سایبری', description: 'حفاظت پیشرفته', progress: 88 },
    { title: 'رایانش ابری', description: 'راهکارهای ابری انعطاف‌پذیر', progress: 92 }
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0c1525] via-[#0c1a2e] to-[#0f1f38]">
      {/* Particle Effect Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(87, 220, 218, 0.1) 0%, transparent 70%)`,
          }}
        />
        
        {/* Digital Circuit Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `
              linear-gradient(to right, rgba(87, 220, 218, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(87, 220, 218, 0.05) 1px, transparent 1px),
              radial-gradient(circle, rgba(87, 220, 218, 0.05) 1px, transparent 1px),
              repeating-linear-gradient(45deg, rgba(87, 220, 218, 0.02) 0px, rgba(87, 220, 218, 0.02) 1px, transparent 1px, transparent 10px)
            `,
            backgroundSize: '40px 40px, 40px 40px, 40px 40px, 20px 20px'
          }} />
        </div>

        {/* Animated Cyber Lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-[#57DCDA]/20 to-transparent"
              style={{
                top: `${20 * i}%`,
                x: -1000,
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear",
              }}
            />
          ))}
        </div>
        
        {/* Enhanced Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -right-20 w-96 h-96 bg-[#57DCDA]/10 rounded-full blur-[120px]"
          style={{ y: backgroundY }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#FF8301]/10 rounded-full blur-[120px]"
          style={{ y: backgroundY }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Tech Grid Pattern */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#57DCDA]/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
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

      {/* Content Container with Glass Effect */}
      <motion.div 
        className="container relative z-10"
        style={{ opacity }}
      >
        {/* Enhanced Section Header with Cyber Effect */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block relative">
            {/* Glowing Border Effect */}
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
            {/* Cyber Lines */}
            <motion.span
              className="absolute -inset-4 opacity-30"
              style={{
                background: `
                  linear-gradient(90deg, transparent, rgba(87, 220, 218, 0.1), transparent),
                  linear-gradient(180deg, transparent, rgba(87, 220, 218, 0.1), transparent)
                `,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <h2 className="relative text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="text-white">درباره </span>{" "}
              <span className="bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">رسا</span>
            </h2>
          </div>
          <p className="text-xl text-gray-300/90 max-w-2xl mx-auto">
          مهندسی آینده با نگاهی نو
          </p>
        </motion.div>

        {/* Enhanced Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Vision & Mission */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Vision with enhanced design */}
            <motion.div
              className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#57DCDA]/20 to-[#3AADAB]/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#57DCDA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                چشم‌انداز ما
                </h3>
              </div>
              <p className="text-gray-300/90 leading-relaxed">
              رسا در مسیر تبدیل‌شدن به یکی از پیشروترین شرکت‌های فناوری و طراحی در خاورمیانه گام برمی‌دارد؛ با هدف توسعه راهکارهای هوشمند، پایدار و خلاقانه که سبک زندگی و صنعت را متحول می‌سازند.
              </p>
            </motion.div>

            {/* Mission with enhanced design */}
            <motion.div
              className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#57DCDA]/20 to-[#3AADAB]/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#57DCDA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                ماموریت ما
                </h3>
              </div>
              <p className="text-gray-300/90 leading-relaxed">
              ماموریت ما ارائه خدمات نوآورانه در حوزه الکترونیک، نورپردازی، برندینگ دیجیتال و هوشمندسازی است؛ با تمرکز بر کیفیت، طراحی هدفمند و پاسخ‌گویی دقیق به نیازهای پروژه‌های مدرن.
              </p>
            </motion.div>

            {/* Enhanced Tech Capabilities */}
            <motion.div
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                توانمندی‌های فنی
              </h3>
              <div className="space-y-4">
                {techCapabilities.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold text-[#57DCDA]">{tech.title}</h4>
                      <span className="text-sm text-gray-400">{tech.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#57DCDA] to-[#3AADAB]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
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
                  className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-[#57DCDA]/20 to-[#3AADAB]/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"
                    initial={false}
                  />
                  <div className="relative text-center">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-300">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Achievements */}
            <motion.div
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                إنجازاتنا
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#57DCDA]/20 to-[#3AADAB]/20 flex items-center justify-center text-[#57DCDA] group-hover:from-[#57DCDA]/30 group-hover:to-[#3AADAB]/30 transition-all duration-300">
                      {achievement.icon}
                    </div>
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

        {/* Enhanced Call to Action with Cyber Effect */}
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
            {/* Button Glow Effect */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-[#3AADAB] to-[#57DCDA] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            {/* Cyber Lines */}
            <motion.span
              className="absolute inset-0 opacity-30"
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
            <svg xmlns="http://www.w3.org/2000/svg" className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection; 