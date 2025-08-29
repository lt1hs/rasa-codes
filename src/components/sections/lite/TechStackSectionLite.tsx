import { motion } from 'framer-motion';
import { useOptimizedAnimation, optimizedAnimations, createStaggeredAnimation } from '../../../hooks/useOptimizedAnimation';
import OptimizedImage from '../../ui/OptimizedImage';

interface Technology {
  name: string;
  icon: string;
  description: string;
}

const TechStackSectionLite = () => {
  const technologies: Technology[] = [
    {
      name: 'React',
      icon: '/images/tech/react.svg',
      description: 'کتابخانه‌ای قدرتمند برای ساخت رابط کاربری'
    },
    {
      name: 'TypeScript',
      icon: '/images/tech/typescript.svg',
      description: 'زبان برنامه‌نویسی امن و قابل اطمینان'
    },
    {
      name: 'Node.js',
      icon: '/images/tech/nodejs.svg',
      description: 'پلتفرم اجرای جاوااسکریپت در سمت سرور'
    },
    {
      name: 'TailwindCSS',
      icon: '/images/tech/tailwind.svg',
      description: 'فریم‌ورک CSS برای طراحی سریع و انعطاف‌پذیر'
    }
  ];

  const containerAnimation = useOptimizedAnimation(optimizedAnimations.fadeIn);
  const staggerAnimation = createStaggeredAnimation(optimizedAnimations.slideUp, 0.1);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          {...containerAnimation}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            تکنولوژی‌های <span className="gradient-text">مورد استفاده</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            از جدیدترین و بهترین تکنولوژی‌ها برای توسعه محصولات و خدمات خود استفاده می‌کنیم
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          {...staggerAnimation}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 rounded-xl text-center"
              variants={optimizedAnimations.slideUp}
            >
              <div className="w-16 h-16 mx-auto mb-4">
                <OptimizedImage
                  src={tech.icon}
                  alt={tech.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
              <p className="text-gray-400">{tech.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSectionLite; 