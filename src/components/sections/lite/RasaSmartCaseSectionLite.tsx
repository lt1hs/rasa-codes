import { motion } from 'framer-motion';
import { useOptimizedAnimation, optimizedAnimations } from '../../../hooks/useOptimizedAnimation';
import OptimizedImage from '../../ui/OptimizedImage';

const RasaSmartCaseSectionLite = () => {
  const containerAnimation = useOptimizedAnimation(optimizedAnimations.fadeIn);
  const textAnimation = useOptimizedAnimation(optimizedAnimations.slideUp);
  const imageAnimation = useOptimizedAnimation(optimizedAnimations.scale);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          {...containerAnimation}
        >
          {/* Text Content */}
          <motion.div {...textAnimation}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              کیسهوشمند <span className="gradient-text">رسا</span>
            </h2>
            <p className="text-gray-400 mb-8">
              کیسهوشمند رسا، ترکیبی از تکنولوژی و طراحی مدرن برای محافظت از دارایی‌های شما.
              با قابلیت‌های پیشرفته امنیتی و ردیابی GPS، همیشه از امنیت کیسخود مطمئن باشید.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'سیستم قفل هوشمند با اثر انگشت',
                'ردیابی GPS در زمان واقعی',
                'اعلان سرقت و هشدار صوتی',
                'باتری با دوام طولانی',
                'طراحی ضد آب و ضربه'
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-3"
                  variants={optimizedAnimations.slideUp}
                >
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </motion.li>
              ))}
            </ul>
            <button className="btn btn-primary">اطلاعات بیشتر</button>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            {...imageAnimation}
          >
            <OptimizedImage
              src="/images/products/smart-case.jpg"
              alt="کیسهوشمند رسا"
              className="rounded-2xl shadow-lg"
              width={600}
              height={400}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RasaSmartCaseSectionLite; 