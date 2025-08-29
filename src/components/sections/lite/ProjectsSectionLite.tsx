import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useOptimizedAnimation, optimizedAnimations, createStaggeredAnimation } from '../../../hooks/useOptimizedAnimation';
import OptimizedImage from '../../ui/OptimizedImage';

interface Project {
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

const ProjectsSectionLite = () => {
  const projects: Project[] = [
    {
      title: 'سیستم روشنایی هوشمند',
      description: 'طراحی و پیاده‌سازی سیستم روشنایی هوشمند برای ساختمان تجاری',
      image: '/images/projects/smart-lighting.jpg',
      category: 'اتوماسیون',
      link: '/projects/smart-lighting'
    },
    {
      title: 'تابلو LED شهری',
      description: 'نصب و راه‌اندازی تابلو LED تبلیغاتی در میدان اصلی شهر',
      image: '/images/projects/led-billboard.jpg',
      category: 'تابلو LED',
      link: '/projects/led-billboard'
    },
    {
      title: 'کیسهوشمند نسل دوم',
      description: 'طراحی و تولید نسل دوم کیسهوشمند با قابلیت‌های پیشرفته',
      image: '/images/projects/smart-case-v2.jpg',
      category: 'محصولات',
      link: '/projects/smart-case-v2'
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
            پروژه‌های <span className="gradient-text">اخیر</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            نمونه‌ای از پروژه‌های موفق ما در زمینه‌های مختلف
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          {...staggerAnimation}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-xl overflow-hidden group"
              variants={optimizedAnimations.slideUp}
            >
              <div className="relative h-48">
                <OptimizedImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 to-transparent" />
              </div>
              <div className="p-6">
                <span className="text-sm text-primary mb-2 inline-block">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <Link
                  to={project.link}
                  className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2"
                >
                  مشاهده جزئیات
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          variants={optimizedAnimations.slideUp}
        >
          <Link to="/projects" className="btn btn-primary">
            مشاهده همه پروژه‌ها
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSectionLite; 