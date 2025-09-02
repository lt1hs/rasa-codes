import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Lazy load sections for performance
const TechStackSectionLite = lazy(() => import('../components/sections/lite/TechStackSectionLite'));
const GallerySectionLite = lazy(() => import('../components/sections/lite/GallerySectionLite'));
const BlogsSectionLite = lazy(() => import('../components/sections/lite/BlogsSectionLite'));
const ContactSectionLite = lazy(() => import('../components/sections/lite/ContactSectionLite'));

// Professional loading component
const SectionLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="relative">
      <div className="w-16 h-16 border-2 border-[#57DCDA]/20 rounded-full animate-spin">
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#57DCDA] rounded-full animate-pulse" />
      </div>
      <div className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-[#57DCDA] rounded-full animate-spin" 
           style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
    </div>
  </div>
);

const LiteHomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0);
  const mouseY = useSpring(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mouseX, mouseY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#0d1421] to-[#111827] text-white overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="fixed inset-0 -z-10">
        {/* Static Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#57DCDA]/5 via-transparent to-[#3AADAB]/5" />
        
        {/* Tech Grid */}
        <motion.div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #57DCDA 1px, transparent 1px),
              linear-gradient(to bottom, #57DCDA 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            y: backgroundY
          }}
        />

        {/* Floating Tech Elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            {i % 4 === 0 ? (
              <div className="w-3 h-3 border border-[#57DCDA] opacity-40 rotate-45" />
            ) : i % 4 === 1 ? (
              <div className="w-2 h-2 bg-[#57DCDA] opacity-30 rounded-full" />
            ) : i % 4 === 2 ? (
              <div className="w-4 h-0.5 bg-[#57DCDA] opacity-25" />
            ) : (
              <div className="w-1 h-4 bg-gradient-to-b from-[#57DCDA] to-transparent opacity-20" />
            )}
          </motion.div>
        ))}
      </div>

      <main className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 relative">
          {/* Hero Background Effects */}
          <div className="absolute inset-0">
            {/* Animated Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#57DCDA] opacity-10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#3AADAB] opacity-15 rounded-full blur-2xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.15, 0.25, 0.15],
                x: [0, -40, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />

            {/* Floating Geometric Elements */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`geo-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  rotate: [0, 360],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              >
                {i % 4 === 0 ? (
                  <div className="w-4 h-4 border-2 border-[#57DCDA] opacity-30 rotate-45" />
                ) : i % 4 === 1 ? (
                  <div className="w-3 h-3 bg-[#57DCDA] opacity-25 rounded-full" />
                ) : i % 4 === 2 ? (
                  <div className="w-6 h-1 bg-[#3AADAB] opacity-20 rounded-full" />
                ) : (
                  <div className="w-2 h-6 bg-gradient-to-b from-[#57DCDA] to-transparent opacity-25" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-8"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#57DCDA]/20 to-[#3AADAB]/20 blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#57DCDA]/10 to-[#3AADAB]/10 backdrop-blur-sm border border-[#57DCDA]/30">
                <motion.span 
                  className="text-sm font-medium bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  ⚡ نسخه سبک و پرسرعت راسا
                </motion.span>
              </div>
            </motion.div>
            
            {/* Main Title with Advanced Animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  آینده
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-[#57DCDA] via-[#4ABEBC] to-[#3AADAB] bg-clip-text text-transparent relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  فناوری
                  {/* Animated Underline */}
                  <motion.div
                    className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 1.5 }}
                  />
                </motion.span>
              </h1>
            </motion.div>
            
            {/* Enhanced Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mb-12"
            >
              <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                تجربه‌ای <span className="text-[#57DCDA] font-semibold">سریع</span> و 
                <span className="text-[#3AADAB] font-semibold"> بهینه</span> از دنیای 
                هوش مصنوعی و فناوری‌های نوین
              </p>
              
              {/* Typing Animation Effect */}
              <motion.div
                className="mt-6 text-lg text-gray-500 font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  _
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Enhanced Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/">
                <motion.button
                  className="group relative px-10 py-5 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-2xl text-white font-semibold text-lg overflow-hidden"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#3AADAB] to-[#57DCDA] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    نسخه کامل
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </span>
                  
                  {/* Button Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                      boxShadow: '0 0 30px rgba(87,220,218,0.4)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
              
              <motion.button
                className="group px-10 py-5 bg-white/5 backdrop-blur-sm rounded-2xl text-white font-semibold text-lg border border-white/20 hover:border-[#57DCDA]/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-[#57DCDA] rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  کشف محصولات
                </span>
              </motion.button>
            </motion.div>

            {/* Stats Counter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {[
                { number: '100+', label: 'پروژه موفق' },
                { number: '50+', label: 'مشتری راضی' },
                { number: '24/7', label: 'پشتیبانی' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div
                    className="text-2xl md:text-3xl font-bold text-[#57DCDA] mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <motion.div
                className="flex flex-col items-center gap-2 text-gray-400"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm">ادامه مطالب</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                ویژگی‌های <span className="text-[#57DCDA]">کلیدی</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                فناوری‌های پیشرفته در خدمت نیازهای شما
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🤖',
                  title: 'هوش مصنوعی پیشرفته',
                  description: 'الگوریتم‌های یادگیری عمیق برای حل مسائل پیچیده',
                  color: '#57DCDA'
                },
                {
                  icon: '⚡',
                  title: 'عملکرد بالا',
                  description: 'پردازش سریع و بهینه با کمترین مصرف منابع',
                  color: '#3AADAB'
                },
                {
                  icon: '🔒',
                  title: 'امنیت تضمینی',
                  description: 'حفاظت کامل از داده‌ها با بالاترین استانداردها',
                  color: '#2A8A88'
                },
                {
                  icon: '🌐',
                  title: 'یکپارچگی کامل',
                  description: 'اتصال آسان به تمام سیستم‌ها و پلتفرم‌ها',
                  color: '#1F6F6E'
                },
                {
                  icon: '📊',
                  title: 'تحلیل هوشمند',
                  description: 'بینش‌های عمیق از داده‌ها با تجسم پیشرفته',
                  color: '#57DCDA'
                },
                {
                  icon: '🚀',
                  title: 'مقیاس‌پذیری',
                  description: 'رشد همراه با نیازهای کسب‌وکار شما',
                  color: '#3AADAB'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    className="relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-500"
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${feature.color}08, transparent)`
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-[#57DCDA] transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <motion.div
                      className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100"
                      style={{ background: feature.color }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Showcase */}
        <section className="py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                محصولات <span className="text-[#57DCDA]">انقلابی</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                راه‌حل‌های هوشمند برای آینده‌ای بهتر
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {[
                {
                  title: 'دستیار هوش مصنوعی راسا',
                  description: 'دستیار هوشمند که با شما رشد می‌کند و نیازهایتان را پیش‌بینی می‌کند',
                  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop',
                  price: '۲,۵۰۰,۰۰۰ تومان',
                  features: ['یادگیری هوشمند', 'پردازش زبان طبیعی', 'امنیت بالا']
                },
                {
                  title: 'سیستم خانه هوشمند',
                  description: 'تبدیل خانه به فضایی هوشمند با کنترل کامل از راه دور',
                  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop',
                  price: '۱۵,۰۰۰,۰۰۰ تومان',
                  features: ['کنترل صوتی', 'اتوماسیون کامل', 'صرفه‌جویی انرژی']
                }
              ].map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group"
                >
                  <Link to={`/store`}>
                    <motion.div
                      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 group-hover:border-[#57DCDA]/30 transition-all duration-700"
                      whileHover={{ y: -12 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#57DCDA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <motion.img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.7 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-[#57DCDA] transition-colors duration-300">
                          {product.title}
                        </h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                          {product.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {product.features.map((feature, i) => (
                            <span key={i} className="px-3 py-1 bg-[#57DCDA]/20 text-[#57DCDA] rounded-full text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-[#57DCDA]">
                            {product.price}
                          </span>
                          <motion.div
                            className="flex items-center gap-2 text-white/80 group-hover:text-[#57DCDA] transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            <span>مشاهده</span>
                            <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lazy Loaded Sections */}
        <Suspense fallback={<SectionLoader />}>
          <TechStackSectionLite />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <GallerySectionLite />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <BlogsSectionLite />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ContactSectionLite />
        </Suspense>
      </main>

      {/* Ultra Cool Triangle Back to Top Button */}
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
    </div>
  );
};

export default LiteHomePage;
