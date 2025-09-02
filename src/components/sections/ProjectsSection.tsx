import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0);
  const mouseY = useSpring(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const projects: Project[] = [
    {
      id: 1,
      title: 'پلتفرم هوش مصنوعی تحلیل داده',
      description: 'سیستم پیشرفته تحلیل داده‌های کسب‌وکار با قابلیت‌های یادگیری ماشین و تجسم داده‌های بلادرنگ',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      category: 'ai',
      link: '/projects/ai-dashboard'
    },
    {
      id: 2,
      title: 'سیستم مدیریت محتوای هوشمند',
      description: 'پلتفرم CMS پیشرفته با قابلیت‌های بهینه‌سازی خودکار محتوا و توصیه‌های SEO',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      category: 'web',
      link: '/projects/smart-cms'
    },
    {
      id: 3,
      title: 'پایپ‌لاین یادگیری ماشین',
      description: 'زیرساخت مقیاس‌پذیر ML برای آموزش خودکار مدل‌ها و استقرار در محیط تولید',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1200&auto=format&fit=crop',
      category: 'ml',
      link: '/projects/ml-pipeline'
    },
    {
      id: 4,
      title: 'اپلیکیشن موبایل بانکداری',
      description: 'اپلیکیشن بانکداری امن چندپلتفرمه با احراز هویت بیومتریک و تراکنش‌های بلادرنگ',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop',
      category: 'mobile',
      link: '/projects/mobile-banking'
    },
    {
      id: 5,
      title: 'پلتفرم تجارت الکترونیک',
      description: 'راه‌حل مدرن فروشگاه آنلاین با سیستم‌های پرداخت یکپارچه و مدیریت موجودی',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop',
      category: 'web',
      link: '/projects/ecommerce'
    },
    {
      id: 6,
      title: 'سیستم نظارت IoT',
      description: 'سیستم جمع‌آوری و تحلیل داده‌های IoT بلادرنگ با محاسبات لبه و نگهداری پیش‌بینانه',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
      category: 'iot',
      link: '/projects/iot-monitoring'
    }
  ];

  const categories = [
    { id: 'all', name: 'همه پروژه‌ها' },
    { id: 'ai', name: 'هوش مصنوعی' },
    { id: 'web', name: 'وب اپلیکیشن' },
    { id: 'mobile', name: 'موبایل' },
    { id: 'ml', name: 'یادگیری ماشین' },
    { id: 'iot', name: 'اینترنت اشیا' },
  ];

  const filteredProjects = projects.filter(
    project => activeCategory === 'all' || project.category === activeCategory
  );

  const handleNext = () => {
    if (filteredProjects.length <= 1) return;
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;
      return nextIndex >= filteredProjects.length ? 0 : nextIndex;
    });
  };

  const handlePrev = () => {
    if (filteredProjects.length <= 1) return;
    setCurrentIndex(prev => {
      const prevIndex = prev - 1;
      return prevIndex < 0 ? filteredProjects.length - 1 : prevIndex;
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory, filteredProjects.length]);

  // Ensure currentIndex is within bounds
  const safeCurrentIndex = Math.min(currentIndex, Math.max(0, filteredProjects.length - 1));

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-secondary via-secondary/95 to-secondary"
      onMouseMove={handleMouseMove}
    >
      {/* Background Effects - Matching other sections */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(circle at var(--x) var(--y), rgba(87,220,218,0.06), transparent 70%)',
          '--x': mouseX,
          '--y': mouseY
        } as any}
      />

      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #57DCDA 0.5px, transparent 0.5px),
              linear-gradient(to bottom, #57DCDA 0.5px, transparent 0.5px)
            `,
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#57DCDA] opacity-[0.03] rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3AADAB] opacity-[0.03] rounded-full blur-[128px] animate-pulse" />
      </div>

      <motion.div 
        className="container mx-auto px-4 max-w-7xl"
        style={{ y, opacity }}
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-[#57DCDA]/10 to-[#3AADAB]/10 backdrop-blur-sm border border-[#57DCDA]/20"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">نمونه کارها</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            پروژه‌های <span className="bg-gradient-to-r from-[#57DCDA] via-[#4ABEBC] to-[#3AADAB] bg-clip-text text-transparent">برجسته</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300/80 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            نمونه‌ای از پروژه‌های موفق ما در زمینه هوش مصنوعی، توسعه وب و اپلیکیشن‌های موبایل
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                activeCategory === category.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 -z-10 rounded-lg"
                initial={false}
                animate={{
                  background: activeCategory === category.id
                    ? 'linear-gradient(135deg, rgba(87,220,218,0.2), rgba(58,173,171,0.15))'
                    : 'rgba(255,255,255,0.03)'
                }}
                transition={{ duration: 0.3 }}
              />
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Professional Slider */}
        <div className="relative w-full" dir="ltr">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(${safeCurrentIndex * -100}%)` }}
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="min-w-full px-4"
                >
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-500" dir="rtl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#57DCDA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20">
                        <div className="max-w-2xl">
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4 group-hover:text-[#57DCDA] transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-gray-200/90 text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
                            {project.description}
                          </p>
                          <motion.a
                            href={project.link}
                            className="inline-flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-xl text-white font-medium hover:shadow-lg hover:shadow-[#57DCDA]/25 transition-all duration-300 text-sm md:text-base"
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            مشاهده پروژه
                            <svg className="w-4 h-4 md:w-5 md:h-5 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          {!isMobile && filteredProjects.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/30 backdrop-blur-xl flex items-center justify-center text-white/90 hover:text-white hover:bg-black/50 transition-all border border-white/10 z-10 hover:scale-110 active:scale-95 group"
              >
                <svg className="w-6 h-6 transform transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/30 backdrop-blur-xl flex items-center justify-center text-white/90 hover:text-white hover:bg-black/50 transition-all border border-white/10 z-10 hover:scale-110 active:scale-95 group"
              >
                <svg className="w-6 h-6 transform transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Progress Indicators */}
          {filteredProjects.length > 1 && (
            <div className="flex justify-center gap-3 mt-12">
              {filteredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="group relative"
                >
                  <div className="w-12 h-1.5 rounded-full bg-white/10 overflow-hidden backdrop-blur-sm border border-white/10">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#57DCDA] to-[#3AADAB]"
                      initial={false}
                      animate={{
                        scaleX: safeCurrentIndex === index ? 1 : 0,
                        opacity: safeCurrentIndex === index ? 1 : 0.3
                      }}
                      transition={{ duration: 0.5 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
