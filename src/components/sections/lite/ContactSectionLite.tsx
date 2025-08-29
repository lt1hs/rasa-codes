import { motion, Variants } from 'framer-motion';
import { useOptimizedAnimation, optimizedAnimations } from '../../../hooks/useOptimizedAnimation';
import OptimizedImage from '../../ui/OptimizedImage';

const ContactSectionLite = () => {
  const containerAnimation = useOptimizedAnimation(optimizedAnimations.fadeIn);
  const textAnimation = useOptimizedAnimation(optimizedAnimations.slideUp);
  const formAnimation = useOptimizedAnimation(optimizedAnimations.scale);

  const slideUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const contactInfo = [
    {
      title: 'آدرس دفتر مرکزی',
      value: 'تهران، خیابان ولیعصر، برج رسا، طبقه ۱۰',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      title: 'شماره تماس',
      value: '۰۲۱-۸۸۸۸۸۸۸۸',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
    },
    {
      title: 'ایمیل',
      value: 'info@rasa.com',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    {
      title: 'ساعات کاری',
      value: 'شنبه تا چهارشنبه ۹ الی ۱۷',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div {...textAnimation}>
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-6"
              variants={slideUpVariant}
            >
              با ما در <span className="gradient-text">تماس</span> باشید
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 mb-12 leading-relaxed"
              variants={slideUpVariant}
            >
              برای دریافت مشاوره رایگان و اطلاع از خدمات و محصولات ما، با ما در تماس باشید.
              کارشناسان ما آماده پاسخگویی به سوالات شما هستند.
            </motion.p>

            {/* Contact Info Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={slideUpVariant}
            >
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-all duration-500 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info.icon} />
                    </svg>
                  </div>
                  <h3 className="text-sm text-gray-400 mb-2">{info.title}</h3>
                  <p className="font-semibold group-hover:text-primary transition-colors">{info.value}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="glass-card p-8 rounded-2xl border border-white/10"
            {...formAnimation}
          >
            <form className="space-y-6">
              <motion.div variants={slideUpVariant}>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                  placeholder="نام خود را وارد کنید"
                />
              </motion.div>

              <motion.div variants={slideUpVariant}>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  ایمیل
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </motion.div>

              <motion.div variants={slideUpVariant}>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  شماره تماس
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                />
              </motion.div>

              <motion.div variants={slideUpVariant}>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  پیام شما
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors resize-none"
                  placeholder="پیام خود را بنویسید..."
                />
              </motion.div>

              <motion.div variants={slideUpVariant}>
                <button
                  type="submit"
                  className="w-full btn-primary py-4 rounded-xl text-lg"
                >
                  ارسال پیام
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSectionLite; 