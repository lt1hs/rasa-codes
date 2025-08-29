import { motion, Variants } from 'framer-motion';
import { useOptimizedAnimation, optimizedAnimations } from '../../../hooks/useOptimizedAnimation';
import OptimizedImage from '../../ui/OptimizedImage';

const RasaAppSectionLite = () => {
  const containerAnimation = useOptimizedAnimation(optimizedAnimations.fadeIn);
  const textAnimation = useOptimizedAnimation(optimizedAnimations.slideUp);
  const imageAnimation = useOptimizedAnimation(optimizedAnimations.scale);

  const slideUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const features = [
    {
      title: 'کنترل تمامی محصولات رسا',
      description: 'تمامی محصولات هوشمند رسا را از طریق یک اپلیکیشن واحد کنترل کنید'
    },
    {
      title: 'مانیتورینگ لحظه‌ای',
      description: 'وضعیت محصولات خود را به صورت لحظه‌ای مشاهده و کنترل کنید'
    },
    {
      title: 'گزارش‌گیری پیشرفته',
      description: 'گزارش‌های دقیق از عملکرد و وضعیت محصولات دریافت کنید'
    },
    {
      title: 'اعلان‌های هوشمند',
      description: 'از رویدادهای مهم از طریق اعلان‌های هوشمند مطلع شوید'
    },
    {
      title: 'پشتیبانی ۲۴/۷',
      description: 'در هر زمان به پشتیبانی متخصص دسترسی داشته باشید'
    }
  ];

  const stats = [
    { value: '+۱۰۰K', label: 'دانلود فعال' },
    { value: '۴.۸', label: 'امتیاز کاربران' },
    { value: '۲۴/۷', label: 'پشتیبانی' }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
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
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          {...containerAnimation}
        >
          {/* Text Content */}
          <motion.div {...textAnimation}>
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-6"
              variants={slideUpVariant}
            >
              اپلیکیشن <span className="gradient-text">رسا</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 mb-8 leading-relaxed"
              variants={slideUpVariant}
            >
              با اپلیکیشن رسا، کنترل تمامی محصولات هوشمند خود را در دستان خود داشته باشید.
              رابط کاربری ساده و امکانات پیشرفته، تجربه‌ای لذت‌بخش را برای شما فراهم می‌کند.
            </motion.p>

            {/* Features List */}
            <motion.div 
              className="space-y-6 mb-8"
              variants={slideUpVariant}
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 mb-8"
              variants={slideUpVariant}
            >
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-4 rounded-xl border border-white/10 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Download Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={slideUpVariant}
            >
              <a
                href="#"
                className="glass-card flex items-center gap-3 px-6 py-3 rounded-xl border border-white/10 hover:border-primary/30 transition-colors"
              >
                <img
                  src="/images/app-store.svg"
                  alt="App Store"
                  className="w-6 h-6"
                />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="glass-card flex items-center gap-3 px-6 py-3 rounded-xl border border-white/10 hover:border-primary/30 transition-colors"
              >
                <img
                  src="/images/play-store.svg"
                  alt="Play Store"
                  className="w-6 h-6"
                />
                <div className="text-left">
                  <div className="text-xs text-gray-400">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* App Screenshots */}
          <motion.div
            className="relative"
            {...imageAnimation}
          >
            <div className="relative z-10 grid grid-cols-2 gap-6">
              {[1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  className={`relative rounded-3xl overflow-hidden shadow-2xl ${
                    index === 3 ? 'col-span-2 w-2/3 mx-auto' : ''
                  }`}
                  variants={slideUpVariant}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <OptimizedImage
                    src={`/images/app/app-screen-${index}.png`}
                    alt={`اسکرین‌شات ${index}`}
                    className="w-full h-auto"
                    width={400}
                    height={800}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 to-transparent" />
                </motion.div>
              ))}
            </div>

            {/* Background Pattern */}
            <div className="absolute -inset-4 -z-10">
              <OptimizedImage
                src="/images/patterns/circuit-board.svg"
                alt=""
                className="w-full h-full object-cover opacity-5"
                width={700}
                height={1000}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RasaAppSectionLite; 