import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
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
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  const projects: Project[] = [
    {
      id: 1,
      title: 'هوش مصنوعی پیشرفته',
      description: 'سیستم هوش مصنوعی برای تحلیل داده‌های کسب و کار',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
      category: 'ai',
      link: '/projects/ai'
    },
    {
      id: 2,
      title: 'پردازش زبان طبیعی',
      description: 'سیستم پردازش متن و تحلیل احساسات',
      image: 'https://images.unsplash.com/photo-1655720406100-3f1eda0a4519?q=80&w=800&auto=format&fit=crop',
      category: 'nlp',
      link: '/projects/nlp'
    },
    {
      id: 3,
      title: 'یادگیری ماشین',
      description: 'الگوریتم‌های یادگیری ماشین برای پیش‌بینی',
      image: 'https://images.unsplash.com/photo-1673187735167-a6cf3142e1f4?q=80&w=800&auto=format&fit=crop',
      category: 'ml',
      link: '/projects/ml'
    },
    // Add more projects as needed
  ];

  const categories = [
    { id: 'all', name: 'همه' },
    { id: 'ai', name: 'هوش مصنوعی' },
    { id: 'nlp', name: 'پردازش زبان طبیعی' },
    { id: 'ml', name: 'یادگیری ماشین' },
  ];

  const filteredProjects = projects.filter(
    project => activeCategory === 'all' || project.category === activeCategory
  );

  const handleNext = () => {
    if (filteredProjects.length <= 1) return;
    setCurrentIndex(prev => {
      const nextIndex = (prev + 1) % filteredProjects.length;
      return nextIndex;
    });
  };

  const handlePrev = () => {
    if (filteredProjects.length <= 1) return;
    setCurrentIndex(prev => {
      const prevIndex = (prev - 1 + filteredProjects.length) % filteredProjects.length;
      return prevIndex;
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Reset currentIndex when category changes or filtered projects change
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory, filteredProjects.length]);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-secondary via-secondary/95 to-secondary"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Background Effects */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(circle at var(--x) var(--y), rgba(87,220,218,0.06), transparent 70%)',
          '--x': mouseX,
          '--y': mouseY
        } as any}
      />

      <div className="absolute inset-0 -z-10">
        {/* Refined Grid Pattern */}
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

        {/* Ambient Light Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#57DCDA] opacity-[0.03] rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3AADAB] opacity-[0.03] rounded-full blur-[128px] animate-pulse" />
      </div>

      <motion.div 
        className="container mx-auto px-4 max-w-6xl"
        style={{ y, opacity, scale }}
      >
        {/* Enhanced Header Section */}
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
            نمونه‌ای از پروژه‌های موفق ما در زمینه هوش مصنوعی و یادگیری ماشین
          </motion.p>
        </div>

        {/* Enhanced Category Filter */}
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

        {/* Projects Slider */}
        <div className="relative px-8">
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              ref={sliderRef}
              className="flex"
              initial={false}
              animate={{ 
                x: `${-currentIndex * 100}%`
              }}
              transition={{
                duration: 0.7,
                ease: [0.32, 0.72, 0, 1]
              }}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="w-full shrink-0"
                  style={{ width: '100%' }}
                >
                  <div className="mx-4">
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm border border-white/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#57DCDA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative aspect-[4/1] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                          draggable="false"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center p-3 z-20">
                          <div className="flex items-center justify-between gap-3 w-full">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-white group-hover:text-[#57DCDA] transition-colors duration-300 truncate">
                                {project.title}
                              </h3>
                              <p className="text-gray-200/80 text-xs max-w-2xl truncate mt-0.5">
                                {project.description}
                              </p>
                            </div>
                            <motion.a
                              href={project.link}
                              className="shrink-0 inline-flex items-center gap-1 text-[#57DCDA] text-xs font-medium group/link bg-white/5 px-2 py-1 rounded-md hover:bg-white/10 transition-all duration-300"
                              whileHover={{ x: 5 }}
                            >
                              مشاهده
                              <svg
                                className="w-3 h-3 transform rotate-180 transition-transform group-hover/link:translate-x-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          {!isMobile && filteredProjects.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/30 backdrop-blur-xl flex items-center justify-center text-white/90 hover:text-white hover:bg-black/50 transition-all border border-white/10 z-10 hover:scale-110 active:scale-95 group"
              >
                <svg className="w-6 h-6 transform transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/30 backdrop-blur-xl flex items-center justify-center text-white/90 hover:text-white hover:bg-black/50 transition-all border border-white/10 z-10 hover:scale-110 active:scale-95 group"
              >
                <svg className="w-6 h-6 transform transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Progress Indicators */}
          {filteredProjects.length > 1 && (
            <div className="flex justify-center gap-4 mt-10">
              {filteredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="group relative"
                >
                  <div className="w-12 h-1.5 rounded-full bg-white/5 overflow-hidden backdrop-blur-sm border border-white/10">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] transition-all duration-500 ${
                        currentIndex === index ? 'opacity-100 scale-x-100' : 'opacity-30 scale-x-0'
                      }`}
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