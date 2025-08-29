import { motion, Variants } from 'framer-motion';
import { useOptimizedAnimation, optimizedAnimations } from '../../../hooks/useOptimizedAnimation';
import OptimizedImage from '../../ui/OptimizedImage';

const AboutSectionLite = () => {
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

  const stats = [
    { value: '+۱۰', label: 'سال تجربه' },
    { value: '+۵۰', label: 'متخصص خبره' },
    { value: '+۱۰۰۰', label: 'پروژه موفق' },
    { value: '+۵۰۰', label: 'مشتری راضی' }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          {...containerAnimation}
        >
          {/* Image */}
          <motion.div
            className="relative"
            {...imageAnimation}
          >
            <div className="relative z-10">
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <OptimizedImage
                  src="/images/about/team.jpg"
                  alt="تیم رسا"
                  className="w-full h-auto"
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/90 via-transparent to-transparent" />
              </motion.div>

              {/* Floating Stats Card */}
              <motion.div
                className="absolute -bottom-8 left-8 right-8 glass-card p-6 rounded-xl border border-white/10 shadow-2xl"
                variants={slideUpVariant}
              >
                <div className="grid grid-cols-2 gap-6">
                  {stats.slice(0, 2).map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Background Pattern */}
            <div className="absolute -inset-4 -z-10">
              <OptimizedImage
                src="/images/patterns/circuit-board.svg"
                alt=""
                className="w-full h-full object-cover opacity-5"
                width={700}
                height={500}
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div {...textAnimation}>
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-6"
              variants={slideUpVariant}
            >
              درباره <span className="gradient-text">رسا</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 mb-8 leading-relaxed"
              variants={slideUpVariant}
            >
              شرکت رسا با بیش از یک دهه تجربه در زمینه تولید محصولات هوشمند و ارائه راهکارهای نوآورانه،
              همواره در تلاش برای ارتقای کیفیت زندگی و کسب‌وکار مشتریان خود بوده است.
            </motion.p>

            {/* Features List */}
            <motion.div 
              className="space-y-6 mb-8"
              variants={slideUpVariant}
            >
              {[
                'تیم متخصص و با تجربه',
                'استفاده از تکنولوژی‌های روز دنیا',
                'تعهد به کیفیت و نوآوری',
                'پشتیبانی ۲۴/۷ از محصولات'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-6"
              variants={slideUpVariant}
            >
              {stats.slice(2).map((stat, index) => (
                <div key={index} className="glass-card p-4 rounded-xl border border-white/10 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSectionLite; 