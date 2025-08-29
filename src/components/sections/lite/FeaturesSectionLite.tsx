import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useOptimizedAnimation, optimizedAnimations, createStaggeredAnimation } from '../../../hooks/useOptimizedAnimation';
import OptimizedImage from '../../ui/OptimizedImage';

interface Feature {
  title: string;
  description: string;
  icon: string;
  image: string;
  stats?: {
    value: string;
    label: string;
  };
}

const FeaturesSectionLite = () => {
  const features: Feature[] = [
    {
      title: 'تابلوهای LED هوشمند',
      description: 'تابلوهای LED با کیفیت 4K و قابلیت کنترل از راه دور برای تبلیغات شهری و اطلاع‌رسانی',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      image: '/images/features/feature-1.jpg',
      stats: {
        value: '4K',
        label: 'کیفیت تصویر'
      }
    },
    {
      title: 'کیسهوشمند رسا',
      description: 'کیسهوشمند با قابلیت ردیابی GPS و سیستم امنیتی پیشرفته برای محافظت از وسایل با ارزش',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      image: '/images/features/feature-2.jpg',
      stats: {
        value: '۹۹٪',
        label: 'امنیت'
      }
    },
    {
      title: 'اتوماسیون هوشمند',
      description: 'سیستم‌های اتوماسیون هوشمند برای مدیریت بهینه ساختمان‌ها و کاهش مصرف انرژی',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      image: '/images/features/feature-3.jpg',
      stats: {
        value: '۵۰٪',
        label: 'صرفه‌جویی'
      }
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
            محصولات <span className="gradient-text">هوشمند</span> رسا
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400"
            variants={slideUpVariant}
          >
            با استفاده از تکنولوژی‌های نوین، راه‌حل‌های هوشمند برای زندگی مدرن ارائه می‌دهیم
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          {...staggerAnimation}
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-colors group"
              variants={slideUpVariant}
            >
              <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                <OptimizedImage
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 to-transparent" />
              </div>
              
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                </svg>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-400 mb-6">{feature.description}</p>

              {feature.stats && (
                <div className="flex items-center gap-3 text-primary">
                  <span className="text-2xl font-bold">{feature.stats.value}</span>
                  <span className="text-sm text-gray-400">{feature.stats.label}</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-12"
          variants={slideUpVariant}
        >
          <Link
            to="/products"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg"
          >
            مشاهده همه محصولات
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSectionLite; 