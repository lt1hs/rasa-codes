import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useOptimizedAnimation, optimizedAnimations } from '../../../hooks/useOptimizedAnimation';
import OptimizedImage from '../../ui/OptimizedImage';

const HeroSectionLite = () => {
  const containerAnimation = useOptimizedAnimation(optimizedAnimations.fadeIn, true);
  const textAnimation = useOptimizedAnimation(optimizedAnimations.slideUp);
  const statsAnimation = useOptimizedAnimation(optimizedAnimations.slideInRight);

  const stats = [
    { value: '+۱۰۰۰', label: 'پروژه موفق' },
    { value: '+۵۰۰', label: 'مشتری راضی' },
    { value: '۲۴/۷', label: 'پشتیبانی' },
    { value: '۹۹٪', label: 'رضایت مشتری' }
  ];

  const slideUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary-dark to-secondary-dark opacity-90" />
        <OptimizedImage
          src="/images/hero/hero-bg.jpg"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
          priority
          quality={60}
        />
      </div>

      {/* Content */}
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div {...textAnimation}>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6"
              variants={slideUpVariant}
            >
              راهکارهای <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">هوشمند</span>
              <br />
              برای آینده‌ای روشن
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-400 mb-8 leading-relaxed"
              variants={slideUpVariant}
            >
              شرکت رسا با ارائه محصولات هوشمند و نوآورانه، به شما کمک می‌کند تا در دنیای دیجیتال امروز پیشرو باشید.
              از تابلوهای LED پیشرفته تا راهکارهای اتوماسیون هوشمند، ما همراه شما هستیم.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4 mb-12"
              variants={slideUpVariant}
            >
              <Link
                to="/contact"
                className="btn-primary px-8 py-4 rounded-xl text-lg"
              >
                شروع همکاری
              </Link>
              <Link
                to="/products"
                className="btn-secondary px-8 py-4 rounded-xl text-lg"
              >
                محصولات ما
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
              {...statsAnimation}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-4 rounded-xl border border-white/10 text-center"
                  variants={slideUpVariant}
                >
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative"
            {...containerAnimation}
          >
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
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/90 via-transparent to-transparent" />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -bottom-8 left-8 right-8 glass-card p-6 rounded-xl border border-white/10 shadow-2xl"
                variants={slideUpVariant}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-semibold mb-2">تابلو LED هوشمند</div>
                    <div className="text-sm text-gray-400">کیفیت 4K با کنترل هوشمند</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-gray-400">آنلاین</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionLite; 