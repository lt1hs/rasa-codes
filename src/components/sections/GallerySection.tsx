import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionTemplate } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  category: 'office' | 'events' | 'team' | 'tech' | 'education';
  image: string;
  description: string;
  size: 'small' | 'medium' | 'large';
  color: string;
}

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | GalleryItem['category']>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'محیط کار خلاقانه',
      category: 'office',
      image: '/gallery/workspace.svg',
      description: 'فضای کار مدرن و پویا برای تیم ما',
      size: 'large',
      color: '#57DCDA'
    },
    {
      id: 2,
      title: 'جلسات تیمی',
      category: 'team',
      image: '/gallery/team-meeting.svg',
      description: 'همکاری و تبادل نظر در جلسات تیمی',
      size: 'medium',
      color: '#3AADAB'
    },
    {
      id: 3,
      title: 'رویدادهای تکنولوژی',
      category: 'events',
      image: '/gallery/tech-event.svg',
      description: 'حضور در رویدادهای مهم صنعت تکنولوژی',
      size: 'large',
      color: '#2A8A88'
    },
    {
      id: 4,
      title: 'کارگاه‌های آموزشی',
      category: 'education',
      image: '/gallery/workshop.svg',
      description: 'برگزاری کارگاه‌های تخصصی و دوره‌های آموزشی',
      size: 'medium',
      color: '#1F6F6E'
    },
    {
      id: 5,
      title: 'کارگاه هوش مصنوعی',
      category: 'events',
      image: '/gallery/event-ai.jpg',
      description: 'کارگاه آموزشی در حوزه هوش مصنوعی',
      size: 'small',
      color: '#57DCDA'
    },
    {
      id: 6,
      title: 'تیم مدیریت',
      category: 'team',
      image: '/gallery/team-management.jpg',
      description: 'تیم مدیریت اجرایی',
      size: 'medium',
      color: '#3AADAB'
    }
  ];

  const categories = [
    { id: 'all', label: 'همه تصاویر', icon: '🎯' },
    { id: 'office', label: 'دفتر کار', icon: '🏢' },
    { id: 'team', label: 'تیم', icon: '👥' },
    { id: 'events', label: 'رویدادها', icon: '🎉' },
    { id: 'education', label: 'آموزش', icon: '📚' }
  ];

  const filteredItems = galleryItems.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  const gradientPosition = useMotionTemplate`${mouseX}% ${mouseY}%`;

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden bg-gradient-to-b from-[#0c1525] via-[#0c1a2e] to-[#0f1f38]">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Interactive Gradient Background */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at var(--x) var(--y), rgba(87,220,218,0.15), transparent 80%)',
            '--x': gradientPosition,
            '--y': gradientPosition
          } as any}
        />

        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #57DCDA 1px, transparent 1px),
                linear-gradient(to bottom, #57DCDA 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
            }}
          />
        </div>

        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: `linear-gradient(135deg, 
                rgba(87,220,218,${Math.random() * 0.5}) 0%, 
                rgba(58,173,171,${Math.random() * 0.5}) 100%
              )`,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, scale }}
      >
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute -inset-4 rounded-2xl"
              style={{
                background: 'radial-gradient(circle at center, rgba(87,220,218,0.15), transparent 70%)',
                filter: 'blur(20px)'
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <h2 className="relative text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                گالری تصاویر
              </span>
            </h2>
          </div>
          <motion.p 
            className="text-xl text-gray-300/90 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            نگاهی به لحظات و دستاوردهای ما در مسیر نوآوری
          </motion.p>
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`
                px-6 py-3 rounded-xl text-sm font-medium
                backdrop-blur-lg transition-all duration-300
                flex items-center gap-2 relative overflow-hidden
                ${activeCategory === category.id
                  ? 'bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] text-white shadow-lg shadow-[#57DCDA]/20'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:shadow-lg hover:shadow-[#57DCDA]/10'
                }
              `}
              onClick={() => setActiveCategory(category.id as typeof activeCategory)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.label}</span>
              {activeCategory === category.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#57DCDA]/20 to-[#3AADAB]/20"
                  layoutId="activeCategory"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${
                item.size === 'large' ? 'lg:col-span-2 lg:row-span-2' :
                item.size === 'medium' ? 'lg:row-span-2' :
                ''
              }`}
            >
              <motion.div
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(item)}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                {/* Image Container */}
                <div className={`relative ${
                  item.size === 'large' ? 'pb-[66.67%]' :
                  item.size === 'medium' ? 'pb-[125%]' :
                  'pb-[100%]'
                }`}>
                  <motion.div
                    className="absolute inset-0 z-10"
                    style={{
                      background: `linear-gradient(to bottom, 
                        transparent,
                        ${item.color}20,
                        ${item.color}40
                      )`
                    }}
                    initial={{ opacity: 0.5 }}
                    animate={{ 
                      opacity: hoveredItem === item.id ? 0.8 : 0.5 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: hoveredItem === item.id ? 1.1 : 1 
                    }}
                    transition={{ duration: 0.7 }}
                  />

                  {/* Content Overlay */}
                  <motion.div
                    className="absolute inset-0 z-20 p-8 flex flex-col justify-end"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: hoveredItem === item.id ? 1 : 0.8,
                      y: hoveredItem === item.id ? 0 : 20
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h3 
                      className="text-2xl font-bold mb-3"
                      style={{
                        color: item.color
                      }}
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-200 text-sm leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredItem === item.id ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.description}
                    </motion.p>
                  </motion.div>

                  {/* Enhanced Hover Effects */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      boxShadow: `inset 0 0 0 2px ${item.color}00`
                    }}
                    animate={{ 
                      boxShadow: hoveredItem === item.id 
                        ? `inset 0 0 0 2px ${item.color}80`
                        : `inset 0 0 0 2px ${item.color}00`
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Modal */}
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
                className="relative max-w-6xl w-full bg-gradient-to-b from-[#0c1525]/90 to-[#0c1525] rounded-2xl overflow-hidden border border-[#57DCDA]/20"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="relative">
                  <motion.img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-auto"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, 
                        transparent,
                        ${selectedImage.color}20,
                        ${selectedImage.color}40,
                        #0c1525
                      )`
                    }}
                  />
                </div>
                <div className="p-8">
                  <motion.h3 
                    className="text-3xl font-bold mb-4"
                    style={{
                      color: selectedImage.color
                    }}
                  >
                    {selectedImage.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-300 text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedImage.description}
                  </motion.p>
                </div>
                <motion.button
                  className="absolute top-6 right-6 text-white p-3 rounded-full backdrop-blur-xl transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${selectedImage.color}40, ${selectedImage.color}20)`
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedImage(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default GallerySection; 