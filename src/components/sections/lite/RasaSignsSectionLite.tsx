import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';
import OptimizedImage from '../../ui/OptimizedImage';
import { ReactNode, useRef, useState, useEffect } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
  stats?: {
    value: string;
    label: string;
  };
}

const RasaSignsSectionLite = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const imagePaths = [
    '/images/logo-light.png',
    '/images/patterns/circuit-board.svg',
    '/images/products/led-sign.jpg',
    '/images/products/led-sign-1.jpg',
    '/images/products/led-sign-2.jpg',
    '/images/products/led-sign-3.jpg'
  ];

  const handleImageLoad = (src: string) => () => {
    console.log('Image loaded:', src); // Debug log
    setLoadedImages(prev => {
      const newImages = [...prev, src];
      console.log('Total images loaded:', newImages.length, 'of', imagePaths.length); // Debug log
      return newImages;
    });
  };

  useEffect(() => {
    if (loadedImages.length === imagePaths.length) {
      console.log('All images loaded, hiding loader'); // Debug log
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loadedImages, imagePaths.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setLoadedImages([]);
      setIsLoading(true);
    };
  }, []);

  // Force hide loader after timeout (fallback)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        console.log('Force hiding loader after timeout'); // Debug log
        setIsLoading(false);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

  // Animation variants
  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const features: Feature[] = [
    {
      title: 'کیفیت تصویر فوق‌العاده',
      description: 'رزولوشن 4K با رنگ‌های زنده و کنتراست بالا برای نمایش محتوای شما با بهترین کیفیت',
      stats: { value: '4K', label: 'رزولوشن' },
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      )
    },
    {
      title: 'مصرف انرژی بهینه',
      description: 'با استفاده از تکنولوژی LED پیشرفته، مصرف برق را تا ۵۰٪ کاهش می‌دهیم',
      stats: { value: '۵۰٪', label: 'صرفه‌جویی' },
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'کنترل هوشمند',
      description: 'کنترل آسان تابلو از طریق اپلیکیشن موبایل با رابط کاربری ساده و کاربردی',
      stats: { value: '۲۴/۷', label: 'دسترسی' },
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'نصب حرفه‌ای',
      description: 'نصب و راه‌اندازی توسط تیم متخصص در کمتر از ۲۴ ساعت',
      stats: { value: '۲۴h', label: 'نصب سریع' },
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      )
    },
    {
      title: 'پشتیبانی ۲۴/۷',
      description: 'پشتیبانی شبانه‌روزی و رفع مشکلات احتمالی در کمترین زمان ممکن',
      stats: { value: '۹۹٪', label: 'رضایت مشتری' },
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: 'گارانتی معتبر',
      description: '۲ سال گارانتی و ۵ سال خدمات پس از فروش برای اطمینان خاطر شما',
      stats: { value: '۲+۵', label: 'سال گارانتی' },
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative min-h-[90vh] py-24 lg:py-32 overflow-hidden" ref={containerRef}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 z-50 bg-secondary-dark/90 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="text-center space-y-6">
              <motion.div
                className="w-20 h-20 relative mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 border-4 border-primary/30 rounded-full" />
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </motion.div>
              <div className="space-y-2">
                <p className="text-xl font-display">در حال بارگذاری</p>
                <p className="text-sm text-gray-400">
                  {Math.round((loadedImages.length / imagePaths.length) * 100)}٪ تکمیل شده
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-dark via-secondary/90 to-secondary-dark opacity-95" />
        <OptimizedImage
          src="/images/patterns/circuit-board.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-5 mix-blend-overlay"
          width={1920}
          height={1080}
          onLoad={handleImageLoad('/images/patterns/circuit-board.svg')}
          priority={true}
        />
      </div>

      {/* Content */}
      <div className="container relative">
        {/* Logo and Header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-8"
            variants={fadeInUpVariants}
          >
            <OptimizedImage
              src="/images/logo-light.png"
              alt="رسا"
              className="w-full h-full object-contain"
              width={128}
              height={128}
              onLoad={handleImageLoad('/images/logo-light.png')}
              priority={true}
            />
          </motion.div>
          <motion.h2
            className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6"
            variants={fadeInUpVariants}
          >
            تابلوهای <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">رسا</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 leading-relaxed"
            variants={fadeInUpVariants}
          >
            تابلوهای LED هوشمند رسا، راه‌حلی مدرن برای تبلیغات شهری و اطلاع‌رسانی.
            با کیفیت تصویر عالی و قابلیت کنترل از راه دور، تجربه‌ای متفاوت را رقم بزنید.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group glass-card p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
                variants={fadeInUpVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <div className="text-primary group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                {feature.stats && (
                  <div className="flex items-center gap-3 text-primary">
                    <span className="text-3xl font-bold">{feature.stats.value}</span>
                    <span className="text-sm text-gray-400">{feature.stats.label}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Images */}
          <motion.div
            className="relative"
            variants={imageVariants}
          >
            {/* Main Image */}
            <div className="relative z-10">
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <OptimizedImage
                  src="/images/products/led-sign.jpg"
                  alt="تابلو LED رسا"
                  className="w-full h-auto"
                  width={800}
                  height={600}
                  onLoad={handleImageLoad('/images/products/led-sign.jpg')}
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/90 via-transparent to-transparent" />
              </motion.div>

              {/* Stats Overlay */}
              <motion.div
                className="absolute -bottom-8 left-8 right-8 glass-card p-8 rounded-2xl border border-white/10 shadow-2xl"
                variants={fadeInUpVariants}
              >
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">۹۹٪</div>
                    <div className="text-sm text-gray-400">وضوح تصویر</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">۵۰٪</div>
                    <div className="text-sm text-gray-400">صرفه‌جویی انرژی</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">۲۴/۷</div>
                    <div className="text-sm text-gray-400">پشتیبانی</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-6 mt-20">
              {[1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  className="relative rounded-xl overflow-hidden shadow-lg"
                  variants={fadeInUpVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <OptimizedImage
                    src={`/images/products/led-sign-${index}.jpg`}
                    alt={`نمونه تابلو ${index}`}
                    className="w-full h-40 object-cover"
                    width={300}
                    height={200}
                    onLoad={handleImageLoad(`/images/products/led-sign-${index}.jpg`)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/60 to-transparent" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RasaSignsSectionLite; 