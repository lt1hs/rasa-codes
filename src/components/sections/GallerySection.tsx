import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { useState, useRef, useCallback, useEffect } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  category: 'office' | 'events' | 'team' | 'tech' | 'education';
  image: string;
  description: string;
  size: 'small' | 'medium' | 'large';
}

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | GalleryItem['category']>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0);
  const mouseY = useSpring(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'محیط کار خلاقانه',
      category: 'office',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
      description: 'فضای کار مدرن و پویا برای تیم ما با امکانات پیشرفته',
      size: 'large'
    },
    {
      id: 2,
      title: 'جلسات تیمی',
      category: 'team',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
      description: 'همکاری و تبادل نظر در جلسات تیمی برای بهبود پروژه‌ها',
      size: 'medium'
    },
    {
      id: 3,
      title: 'رویدادهای تکنولوژی',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
      description: 'حضور در رویدادهای مهم صنعت تکنولوژی و نوآوری',
      size: 'large'
    },
    {
      id: 4,
      title: 'کارگاههای آموزشی',
      category: 'education',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
      description: 'برگزاری کارگاههای تخصصی و دورههای آموزشی پیشرفته',
      size: 'small'
    },
    {
      id: 5,
      title: 'تیم توسعه',
      category: 'team',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
      description: 'تیم متخصص توسعه نرم‌افزار در حال کار روی پروژه‌های جدید',
      size: 'medium'
    },
    {
      id: 6,
      title: 'تجهیزات فناوری',
      category: 'tech',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=800&auto=format&fit=crop',
      description: 'آخرین تجهیزات و فناوری‌های مورد استفاده در پروژه‌ها',
      size: 'small'
    },
    {
      id: 7,
      title: 'نمایشگاه فناوری',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop',
      description: 'حضور در نمایشگاه‌های بین‌المللی فناوری و ارائه محصولات',
      size: 'medium'
    },
    {
      id: 8,
      title: 'فضای کار باز',
      category: 'office',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop',
      description: 'محیط کار باز و مشارکتی برای افزایش خلاقیت تیم',
      size: 'large'
    }
  ];

  const categories = [
    { id: 'all', label: 'همه تصاویر', icon: '🎯' },
    { id: 'office', label: 'دفتر کار', icon: '🏢' },
    { id: 'team', label: 'تیم', icon: '👥' },
    { id: 'events', label: 'رویدادها', icon: '🎉' },
    { id: 'tech', label: 'فناوری', icon: '💻' },
    { id: 'education', label: 'آموزش', icon: '📚' }
  ];

  const filteredItems = galleryItems.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  const handleImageError = useCallback((id: number) => {
    setImageErrors(prev => new Set(prev).add(id));
  }, []);

  const handleImageLoad = useCallback((id: number) => {
    setImageErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 overflow-hidden bg-gradient-to-b from-secondary via-secondary/95 to-secondary"
    >
      {/* Highly Visible Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              background: i % 2 === 0 ? '#57DCDA' : '#3AADAB',
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
            animate={{
              rotate: [0, 360],
              y: [0, -40, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            {i % 3 === 0 ? (
              <div className="w-4 h-4 bg-[#57DCDA] opacity-60 rounded-full" />
            ) : i % 3 === 1 ? (
              <div className="w-3 h-3 bg-[#3AADAB] opacity-50 rotate-45 transform" />
            ) : (
              <div className="w-6 h-1 bg-[#57DCDA] opacity-40 rounded-full" />
            )}
          </motion.div>
        ))}

        {/* Animated Wave Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <motion.path
            d="M0,200 Q250,100 500,200 T1000,200"
            stroke="#57DCDA"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.path
            d="M0,400 Q250,300 500,400 T1000,400"
            stroke="#3AADAB"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
          <motion.path
            d="M0,700 Q250,600 500,700 T1000,700"
            stroke="#57DCDA"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 2 }}
          />
        </svg>

        {/* Large Pulsing Orbs */}
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-[#57DCDA] opacity-20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-40 h-40 bg-[#3AADAB] opacity-15 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-[#57DCDA] opacity-25 rounded-full blur-lg transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.5, 0.25],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Moving Grid */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #57DCDA 1px, transparent 1px),
              linear-gradient(to bottom, #57DCDA 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Interactive Mouse Gradient */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at var(--x) var(--y), rgba(87,220,218,0.15), transparent 60%)',
            '--x': mouseX,
            '--y': mouseY
          } as any}
        />
      </div>

      <motion.div 
        className="container mx-auto px-4 max-w-7xl"
        style={{ opacity, y }}
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-[#57DCDA]/10 to-[#3AADAB]/10 backdrop-blur-sm border border-[#57DCDA]/20"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">گالری تصاویر</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            لحظات <span className="bg-gradient-to-r from-[#57DCDA] via-[#4ABEBC] to-[#3AADAB] bg-clip-text text-transparent">ماندگار</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300/80 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            نگاهی به مسیر رشد، دستاوردها و لحظات خاص تیم ما در دنیای تکنولوژی
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
              onClick={() => setActiveCategory(category.id as typeof activeCategory)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden flex items-center gap-2 ${
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
              <span className="text-base">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Fixed Grid Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid mb-6 group cursor-pointer"
              onClick={() => setSelectedImage(item)}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <motion.div 
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10 group-hover:border-[#57DCDA]/30 transition-all duration-500"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#57DCDA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`relative overflow-hidden ${
                  item.size === 'large' ? 'aspect-[4/5]' :
                  item.size === 'medium' ? 'aspect-[3/4]' :
                  'aspect-square'
                }`}>
                  {!imageErrors.has(item.id) ? (
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => handleImageError(item.id)}
                      onLoad={() => handleImageLoad(item.id)}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">تصویر در دسترس نیست</p>
                      </div>
                    </div>
                  )}
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: hoveredItem === item.id ? 1 : 0,
                      y: hoveredItem === item.id ? 0 : 20
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-[#57DCDA] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-200/90 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg">هیچ تصویری در این دسته‌بندی یافت نشد</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
              
              <motion.button
                className="absolute top-6 right-6 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
