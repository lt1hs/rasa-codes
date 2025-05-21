import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

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
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'محیط کار خلاقانه',
      category: 'office',
      image: '/gallery/workspace.svg',
      description: 'فضای کار مدرن و پویا برای تیم ما',
      size: 'large'
    },
    {
      id: 2,
      title: 'جلسات تیمی',
      category: 'team',
      image: '/gallery/team-meeting.svg',
      description: 'همکاری و تبادل نظر در جلسات تیمی',
      size: 'medium'
    },
    {
      id: 3,
      title: 'رویدادهای تکنولوژی',
      category: 'events',
      image: '/gallery/tech-event.svg',
      description: 'حضور در رویدادهای مهم صنعت تکنولوژی',
      size: 'large'
    },
    {
      id: 4,
      title: 'کارگاه‌های آموزشی',
      category: 'education',
      image: '/gallery/workshop.svg',
      description: 'برگزاری کارگاه‌های تخصصی و دوره‌های آموزشی',
      size: 'medium'
    },
    {
      id: 5,
      title: 'ورشة عمل الذكاء الاصطناعي',
      category: 'events',
      image: '/gallery/event-ai.jpg',
      description: 'ورشة عمل تدريبية حول الذكاء الاصطناعي',
      size: 'small'
    },
    {
      id: 6,
      title: 'فريق الإدارة',
      category: 'team',
      image: '/gallery/team-management.jpg',
      description: 'فريق الإدارة التنفيذية',
      size: 'medium'
    }
  ];

  const categories = [
    { id: 'all', label: 'همه تصاویر' },
    { id: 'office', label: 'دفتر کار' },
    { id: 'team', label: 'تیم' },
    { id: 'events', label: 'رویدادها' },
    { id: 'education', label: 'آموزش' }
  ];

  const filteredItems = galleryItems.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0c1525] via-[#0c1a2e] to-[#0f1f38]">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-[#57DCDA]/10 via-transparent to-[#3AADAB]/10" />
        </div>

        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #57DCDA 1px, transparent 1px),
                linear-gradient(to bottom, #57DCDA 1px, transparent 1px),
                radial-gradient(circle, #57DCDA 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px, 50px 50px, 100px 100px',
              maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
            }}
          />
        </div>

        {/* Floating Elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'linear-gradient(135deg, #57DCDA 0%, #3AADAB 100%)',
              borderRadius: '50%',
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
        className="container relative z-10 px-4"
        style={{ opacity }}
      >
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block relative mb-4">
            <motion.div
              className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[#57DCDA]/20 to-[#3AADAB]/20 blur-lg"
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
            <h2 className="relative text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                گالری تصاویر
              </span>
            </h2>
          </div>
          <motion.p 
            className="text-xl text-gray-300/90 max-w-2xl mx-auto"
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
                px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300
                flex items-center gap-2 backdrop-blur-sm
                ${activeCategory === category.id
                  ? 'bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] text-white shadow-lg shadow-[#57DCDA]/20'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:shadow-lg hover:shadow-[#57DCDA]/10'
                }
              `}
              onClick={() => setActiveCategory(category.id as typeof activeCategory)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <span className="text-lg">{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`group relative rounded-2xl cursor-pointer ${
                  item.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                  item.size === 'medium' ? 'md:col-span-1 md:row-span-2' :
                  'md:col-span-1 md:row-span-1'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                onClick={() => setSelectedImage(item)}
              >
                {/* Enhanced Image Container */}
                <div className="relative w-full">
                  <div className={`relative ${
                    item.size === 'large' ? 'pb-[66.67%]' : // 3:2 aspect ratio for large images
                    item.size === 'medium' ? 'pb-[125%]' : // 4:5 aspect ratio for medium images
                    'pb-[100%]' // 1:1 aspect ratio for small images
                  }`}>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"
                      initial={{ opacity: 0.5 }}
                      animate={{ 
                        opacity: hoveredItem === item.id ? 0.7 : 0.5 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: hoveredItem === item.id ? 1.1 : 1 
                      }}
                      transition={{ duration: 0.7 }}
                    />
                    
                    {/* Enhanced Content Overlay */}
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
                        className="text-2xl font-bold text-white mb-3"
                        layout
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

                    {/* Hover Border Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-[#57DCDA]/0"
                      animate={{ 
                        borderColor: hoveredItem === item.id ? 'rgba(87, 220, 218, 0.5)' : 'rgba(87, 220, 218, 0)'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-lg"
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
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1525] to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent mb-4">
                    {selectedImage.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>
                <button
                  className="absolute top-6 right-6 text-white p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                  onClick={() => setSelectedImage(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default GallerySection; 