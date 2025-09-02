import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface ProductDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  price: string;
  originalPrice?: string;
  category: string;
  color: string;
  story: {
    title: string;
    chapters: {
      title: string;
      content: string;
      image: string;
    }[];
  };
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  specs: {
    label: string;
    value: string;
  }[];
}

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [isStoryMode, setIsStoryMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0);
  const mouseY = useSpring(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Mock product data - in real app, fetch based on productId
  const product: ProductDetail = {
    id: 'ai-assistant',
    title: 'دستیار هوش مصنوعی راسا',
    subtitle: 'هوش مصنوعی شخصی شما',
    description: 'دستیار هوشمند که زندگی شما را آسان‌تر می‌کند',
    longDescription: 'دستیار هوش مصنوعی راسا با استفاده از پیشرفته‌ترین الگوریتم‌های یادگیری ماشین طراحی شده است. این محصول قادر است تا با درک عمیق از نیازهای شما، کارهای روزمره را خودکار کند و تجربه‌ای بی‌نظیر از تعامل با فناوری ارائه دهد.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1655720406100-3f1eda0a4519?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1673187735167-a6cf3142e1f4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop'
    ],
    price: '۲,۵۰۰,۰۰۰ تومان',
    originalPrice: '۳,۰۰۰,۰۰۰ تومان',
    category: 'ai',
    color: '#57DCDA',
    story: {
      title: 'داستان خلق دستیاری که زندگی را متحول می‌کند',
      chapters: [
        {
          title: 'آغاز رویا',
          content: 'همه چیز از یک سوال ساده شروع شد: چگونه می‌توانیم فناوری را انسانی‌تر کنیم؟ تیم ما سال‌ها روی این سوال کار کرد تا دستیار هوش مصنوعی راسا متولد شود.',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'
        },
        {
          title: 'فناوری پیشرفته',
          content: 'با استفاده از آخرین دستاوردهای علم داده و یادگیری عمیق، راسا قادر است الگوهای پیچیده رفتاری شما را درک کند و پیش‌بینی‌های دقیقی از نیازهایتان ارائه دهد.',
          image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop'
        },
        {
          title: 'تجربه کاربری منحصربه‌فرد',
          content: 'راسا نه تنها یک ابزار، بلکه یک همراه هوشمند است که با شما رشد می‌کند. هر روز از تعاملات شما یاد می‌گیرد و خدمات بهتری ارائه می‌دهد.',
          image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop'
        }
      ]
    },
    features: [
      {
        icon: '🧠',
        title: 'یادگیری هوشمند',
        description: 'الگوریتم‌های پیشرفته که از رفتار شما یاد می‌گیرند'
      },
      {
        icon: '🔒',
        title: 'امنیت بالا',
        description: 'رمزگذاری end-to-end و حفاظت کامل از داده‌های شخصی'
      },
      {
        icon: '⚡',
        title: 'پردازش سریع',
        description: 'پاسخ‌دهی فوری و پردازش بلادرنگ درخواست‌ها'
      },
      {
        icon: '🌐',
        title: 'یکپارچگی',
        description: 'اتصال به تمام دستگاه‌ها و سرویس‌های مورد استفاده'
      }
    ],
    specs: [
      { label: 'پردازنده', value: 'Neural Processing Unit (NPU)' },
      { label: 'حافظه', value: '16GB RAM + 512GB Storage' },
      { label: 'اتصالات', value: 'WiFi 6, Bluetooth 5.2, USB-C' },
      { label: 'سیستم عامل', value: 'RasaOS 2.0' },
      { label: 'پشتیبانی زبان', value: 'فارسی، انگلیسی، عربی' },
      { label: 'گارانتی', value: '۲ سال گارانتی بین‌المللی' }
    ]
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-secondary via-secondary/95 to-secondary">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at var(--x) var(--y), ${product.color}15, transparent 60%)`,
            '--x': mouseX,
            '--y': mouseY
          } as any}
        />
        
        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              background: product.color,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <Link 
            to="/store" 
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            بازگشت به فروشگاه
          </Link>
          
          <motion.button
            onClick={() => setIsStoryMode(!isStoryMode)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              isStoryMode 
                ? 'bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] text-white' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isStoryMode ? 'نمای محصول' : 'داستان محصول'}
          </motion.button>
        </div>
      </motion.nav>

      {!isStoryMode ? (
        /* Product View */
        <div className="pt-24">
          {/* Hero Section */}
          <motion.section 
            className="relative py-20"
            style={{ y: heroY }}
          >
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Product Images */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10">
                    <motion.img
                      src={product.gallery[activeImage]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      key={activeImage}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                      style={{ background: `linear-gradient(to top, ${product.color}20, transparent)` }}
                    />
                  </div>
                  
                  {/* Gallery Thumbnails */}
                  <div className="flex gap-4 mt-6 justify-center">
                    {product.gallery.map((img, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          activeImage === index 
                            ? 'border-[#57DCDA] scale-110' 
                            : 'border-white/20 hover:border-white/40'
                        }`}
                        whileHover={{ scale: activeImage === index ? 1.1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Product Info */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="text-[#57DCDA] font-medium mb-2 block">
                    {product.subtitle}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {product.title}
                  </h1>
                  <p className="text-xl text-gray-300/90 leading-relaxed mb-8">
                    {product.longDescription}
                  </p>
                  
                  {/* Price */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl font-bold text-[#57DCDA]">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mb-12">
                    <motion.button
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-xl text-white font-medium hover:shadow-lg hover:shadow-[#57DCDA]/25 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      خرید محصول
                    </motion.button>
                    <motion.button
                      className="px-8 py-4 bg-white/10 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      افزودن به سبد
                    </motion.button>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <div className="text-2xl mb-2">{feature.icon}</div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-400">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Specifications */}
          <motion.section 
            className="py-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl font-bold text-center mb-12">
                مشخصات <span className="text-[#57DCDA]">فنی</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.specs.map((spec, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="font-medium text-gray-300">{spec.label}</span>
                    <span className="text-[#57DCDA] font-semibold">{spec.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      ) : (
        /* Enhanced Story Mode */
        <div className="pt-24">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Story Header */}
            <motion.div 
              className="text-center mb-24"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative inline-block mb-8">
                <motion.div
                  className="absolute -inset-8 rounded-3xl opacity-20"
                  style={{ background: `radial-gradient(circle, ${product.color}30, transparent 70%)` }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <h1 className="relative text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {product.story.title}
                </h1>
              </div>
              
              <motion.div
                className="w-24 h-1 mx-auto mb-8 rounded-full"
                style={{ background: `linear-gradient(90deg, ${product.color}, transparent)` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              
              <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                هر محصول داستانی دارد. این داستان {product.title} است
              </p>
            </motion.div>

            {/* Story Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <motion.div
                className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-600 to-transparent transform md:-translate-x-1/2"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />

              {/* Story Chapters */}
              {product.story.chapters.map((chapter, index) => (
                <motion.section
                  key={index}
                  className="relative mb-24 last:mb-0"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-4 border-gray-800 transform -translate-x-1/2 z-10"
                    style={{ background: product.color }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: product.color }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                  </motion.div>

                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                    {/* Chapter Image */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} pl-16 md:pl-0`}>
                      <motion.div
                        className="relative group"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                          <img
                            src={chapter.image}
                            alt={chapter.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div 
                            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                            style={{ 
                              background: `linear-gradient(to top, ${product.color}20, transparent 60%)` 
                            }}
                          />
                          
                          {/* Chapter Number */}
                          <motion.div
                            className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm"
                            style={{ background: `${product.color}80` }}
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                          >
                            {index + 1}
                          </motion.div>
                        </div>

                        {/* Decorative Elements */}
                        <motion.div
                          className="absolute -top-4 -right-4 w-8 h-8 rounded-full opacity-60"
                          style={{ background: product.color }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5,
                          }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Chapter Content */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} pl-16 md:pl-0`}>
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <motion.span 
                          className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
                          style={{ 
                            background: `${product.color}20`,
                            color: product.color 
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          فصل {index + 1}
                        </motion.span>
                        
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                          {chapter.title}
                        </h2>
                        
                        <div className="prose prose-lg prose-invert max-w-none">
                          <p className="text-gray-300 leading-relaxed text-lg">
                            {chapter.content}
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <motion.div
                          className="mt-8 h-1 bg-gray-800 rounded-full overflow-hidden"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${product.color}, ${product.color}80)` }}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: (index + 1) / product.story.chapters.length }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.8 }}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.section>
              ))}
            </div>

            {/* Story Conclusion */}
            <motion.div 
              className="text-center py-20 mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative inline-block p-12 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10">
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-20"
                  style={{ background: `linear-gradient(135deg, ${product.color}20, transparent)` }}
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />
                
                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                    style={{ background: `${product.color}20` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <svg className="w-8 h-8" style={{ color: product.color }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    آماده تجربه این داستان هستید؟
                  </h3>
                  <p className="text-gray-400 mb-8 text-lg">
                    {product.title} را همین امروز سفارش دهید و بخشی از این داستان شوید
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      className="px-8 py-4 rounded-xl text-white font-medium hover:shadow-lg transition-all duration-300"
                      style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}80)` }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsStoryMode(false)}
                    >
                      مشاهده محصول و خرید
                    </motion.button>
                    
                    <motion.button
                      className="px-8 py-4 bg-white/10 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      اشتراک‌گذاری داستان
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
