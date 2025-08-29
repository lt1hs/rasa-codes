import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useOptimizedAnimation, optimizedAnimations, createStaggeredAnimation } from '../../../hooks/useOptimizedAnimation';
import OptimizedImage from '../../ui/OptimizedImage';

interface GalleryItem {
  title: string;
  image: string;
  category: string;
  location?: string;
  date?: string;
}

const GallerySectionLite = () => {
  const galleryItems: GalleryItem[] = [
    {
      title: 'پروژه نورپردازی هتل اسپیناس',
      image: '/images/gallery/hotel-lighting.jpg',
      category: 'نورپردازی',
      location: 'تهران',
      date: '۱۴۰۲'
    },
    {
      title: 'تابلو LED مرکز خرید پالادیوم',
      image: '/images/gallery/mall-led.jpg',
      category: 'تابلو LED',
      location: 'تهران',
      date: '۱۴۰۲'
    },
    {
      title: 'اتوماسیون ساختمان اداری آسمان',
      image: '/images/gallery/office-automation.jpg',
      category: 'اتوماسیون',
      location: 'مشهد',
      date: '۱۴۰۱'
    },
    {
      title: 'کیسهوشمند رسا نسل دوم',
      image: '/images/gallery/smart-case.jpg',
      category: 'محصولات',
      date: '۱۴۰۲'
    }
  ];

  const containerAnimation = useOptimizedAnimation(optimizedAnimations.fadeIn);
  const staggerAnimation = createStaggeredAnimation(optimizedAnimations.slideUp, 0.1);

  const slideUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-dark via-secondary to-secondary-dark opacity-95" />
        <OptimizedImage
          src="/images/patterns/circuit-board.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-5 mix-blend-overlay"
          width={1920}
          height={1080}
        />
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          {...containerAnimation}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-display font-bold mb-6"
            variants={slideUpVariant}
          >
            گالری <span className="gradient-text">پروژه‌ها</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400"
            variants={slideUpVariant}
          >
            نمونه‌ای از پروژه‌های اجرا شده و محصولات تولیدی شرکت رسا
          </motion.p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          {...staggerAnimation}
          viewport={{ once: true, margin: "-100px" }}
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-500 group"
              variants={slideUpVariant}
            >
              {/* Image */}
              <div className="relative h-64 rounded-t-2xl overflow-hidden">
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  {item.location && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{item.location}</span>
                    </div>
                  )}
                  {item.date && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{item.date}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-12"
          variants={slideUpVariant}
        >
          <Link
            to="/gallery"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg"
          >
            مشاهده همه پروژه‌ها
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySectionLite; 