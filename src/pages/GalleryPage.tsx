import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/layout/Layout';

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  
  // Gallery categories
  const filters = [
    { id: 'all', name: 'جميع الصور' },
    { id: 'ai', name: 'الذكاء الاصطناعي' },
    { id: 'interface', name: 'واجهات المستخدم' },
    { id: 'product', name: 'المنتجات' },
    { id: 'team', name: 'فريق العمل' }
  ];
  
  // Gallery images
  const images = [
    {
      id: 1,
      src: 'https://picsum.photos/seed/gal1/800/800',
      alt: 'واجهة رسومية لنظام ذكاء اصطناعي',
      category: 'interface',
      description: 'واجهة مستخدم متطورة لنظام ذكاء اصطناعي يساعد في تحليل البيانات'
    },
    {
      id: 2,
      src: 'https://picsum.photos/seed/gal2/800/800',
      alt: 'نموذج للذكاء الاصطناعي',
      category: 'ai',
      description: 'رسم توضيحي لكيفية عمل نماذج الذكاء الاصطناعي في تحليل البيانات'
    },
    {
      id: 3,
      src: 'https://picsum.photos/seed/gal3/800/800',
      alt: 'منتج تحليل البيانات',
      category: 'product',
      description: 'لوحة معلومات تحليلية تظهر قدرات منتجنا في عرض البيانات المعقدة'
    },
    {
      id: 4,
      src: 'https://picsum.photos/seed/gal4/800/800',
      alt: 'فريق التطوير',
      category: 'team',
      description: 'فريق المطورين أثناء جلسة عصف ذهني لتطوير ميزات جديدة'
    },
    {
      id: 5,
      src: 'https://picsum.photos/seed/gal5/800/800',
      alt: 'نظام معالجة اللغة',
      category: 'ai',
      description: 'رسم بياني يوضح كيفية عمل نظام معالجة اللغة الطبيعية الخاص بنا'
    },
    {
      id: 6,
      src: 'https://picsum.photos/seed/gal6/800/800',
      alt: 'واجهة تطبيق الهاتف',
      category: 'interface',
      description: 'نظرة على واجهة تطبيق الهاتف المحمول الخاصة بمنصتنا'
    },
    {
      id: 7,
      src: 'https://picsum.photos/seed/gal7/800/800',
      alt: 'منتج التنبؤ بالبيانات',
      category: 'product',
      description: 'نموذج توضيحي لقدرات منتجنا في التنبؤ بالاتجاهات المستقبلية'
    },
    {
      id: 8,
      src: 'https://picsum.photos/seed/gal8/800/800',
      alt: 'ورشة عمل للفريق',
      category: 'team',
      description: 'فريقنا أثناء ورشة عمل تدريبية حول أحدث تقنيات الذكاء الاصطناعي'
    },
    {
      id: 9,
      src: 'https://picsum.photos/seed/gal9/800/800',
      alt: 'نموذج للتعلم العميق',
      category: 'ai',
      description: 'تصور لكيفية عمل خوارزميات التعلم العميق في تحليل الصور'
    }
  ];

  // Filter images
  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(image => image.category === activeFilter);
  
  // Open lightbox
  const openLightbox = (src: string) => {
    setCurrentImage(src);
    setLightboxOpen(true);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  };
  
  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 -z-10">
          {/* Primary gradient orb */}
          <motion.div 
            className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-[#57DCDA]/10 rounded-full blur-[120px] opacity-60"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Secondary gradient orb */}
          <motion.div 
            className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#3AADAB]/10 rounded-full blur-[100px] opacity-50"
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
          
          {/* Enhanced grid lines */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(to right, #57DCDA 1px, transparent 1px),
                linear-gradient(to bottom, #57DCDA 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />

          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#57DCDA]/20"
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
        
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              معرض <span className="gradient-text">الصور</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              استكشف مجموعة من الصور التوضيحية والتصاميم لمنتجاتنا وعملنا في مجال الذكاء الاصطناعي
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Enhanced Filters Section */}
      <section className="py-8">
        <div className="container">
          <motion.div 
            className="flex justify-center flex-wrap gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filters.map((filter, index) => (
              <motion.button
                key={filter.id}
                className={`
                  px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${activeFilter === filter.id
                    ? 'bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] text-white shadow-lg shadow-primary/25'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-[#57DCDA]/30'
                  }
                `}
                onClick={() => setActiveFilter(filter.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{filter.name}</span>
                {activeFilter === filter.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-20 blur"
                    layoutId="filter-background"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              },
              hidden: {}
            }}
          >
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                className="glass-card rounded-xl border border-white/10 overflow-hidden group relative cursor-pointer h-full"
                onClick={() => openLightbox(image.src)}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 30 }
                }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Enhanced gradient background */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-[#57DCDA]/20 to-[#3AADAB]/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300 -z-10"
                />
                
                {/* Animated border glow */}
                <motion.div 
                  className="absolute -inset-[1px] bg-gradient-to-r from-[#57DCDA]/30 to-[#3AADAB]/30 rounded-xl opacity-0 group-hover:opacity-100 blur-[2px] transition-all duration-300"
                  animate={{
                    boxShadow: [
                      '0 0 8px 2px rgba(87, 220, 218, 0.2)',
                      '0 0 16px 6px rgba(87, 220, 218, 0.3)',
                      '0 0 8px 2px rgba(87, 220, 218, 0.2)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />

                {/* Image container with enhanced overlay */}
                <div className="relative w-full pb-[100%]">
                  <div className="absolute inset-0">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Enhanced overlay with gradient and content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/95 via-secondary-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 backdrop-blur-sm">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-semibold mb-2 text-white">{image.alt}</h3>
                        <p className="text-gray-300 text-sm line-clamp-3">{image.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                            {filters.find(f => f.id === image.category)?.name}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Empty state */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">لا توجد صور</h3>
              <p className="text-gray-400">
                لم يتم العثور على صور في هذه الفئة. الرجاء تحديد فئة أخرى.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {lightboxOpen && currentImage && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Background overlay with animated gradient */}
            <motion.div 
              className="absolute inset-0 bg-secondary-dark/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#57DCDA]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#3AADAB]/5 rounded-full blur-[120px]" />
              </div>
            </motion.div>

            {/* Close button with enhanced styling */}
            <motion.button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-10 border border-white/20 hover:bg-white/20 transition-colors duration-300"
              onClick={closeLightbox}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            
            {/* Image container with enhanced glass effect */}
            <motion.div 
              className="relative max-w-5xl w-full mx-auto glass-card rounded-2xl overflow-hidden border border-white/10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Loading animation */}
              <motion.div
                className="absolute inset-0 bg-white/5 backdrop-blur-sm flex items-center justify-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </motion.div>

              {/* Image with enhanced presentation */}
              <div className="relative w-full">
                <div className="relative pb-[56.25%]">
                  <img 
                    src={currentImage} 
                    alt="Lightbox image" 
                    className="absolute inset-0 w-full h-full object-contain bg-black/50"
                    style={{ opacity: 0 }}
                    onLoad={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transition = 'opacity 0.5s ease-in-out';
                    }}
                  />
                </div>
              </div>

              {/* Image info overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm">
                <div className="p-6">
                  {images.find(img => img.src === currentImage)?.description && (
                    <p className="text-gray-200 text-sm">
                      {images.find(img => img.src === currentImage)?.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary to-secondary-dark" />
        
        <div className="container">
          <div className="max-w-3xl mx-auto text-center glass-card p-10 rounded-2xl border border-white/10">
            <motion.h2 
              className="text-3xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              هل تريد <span className="gradient-text">معرفة المزيد</span>؟
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              اكتشف كيف يمكن لحلولنا تحويل أعمالك وتمكينك من اتخاذ قرارات أفضل مدعومة بالبيانات
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <a href="/contact" className="btn btn-primary px-8 py-4">تواصل معنا</a>
              <a href="/demo" className="btn btn-outline px-8 py-4">طلب عرض توضيحي</a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GalleryPage; 