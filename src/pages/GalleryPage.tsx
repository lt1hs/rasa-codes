import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Layout from '../components/layout/Layout';
import ParticleBackground from '../components/ui/ParticleBackground';
import SectionWrapper from '../components/ui/SectionWrapper';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'تابلوهای فرودگاه امام خمینی',
    description: 'طراحی و اجرای تابلوهای راهنما و تبلیغاتی با تکنولوژی LED برای ترمینال‌های فرودگاه',
    image: '/images/projects/airport-1.jpg',
    category: 'تابلوهای تبلیغاتی',
    location: 'تهران',
    year: '۱۴۰۱'
  },
  {
    id: 2,
    title: 'مجتمع تجاری کارآفرین',
    description: 'هوشمندسازی کامل سیستم روشنایی و مدیریت انرژی مجتمع تجاری',
    image: '/images/projects/mall-1.jpg',
    category: 'هوشمندسازی',
    location: 'تهران',
    year: '۱۴۰۰'
  },
  {
    id: 3,
    title: 'ویلای هوشمند لواسان',
    description: 'طراحی و اجرای سیستم خانه هوشمند با قابلیت کنترل صوتی و مدیریت انرژی',
    image: '/images/projects/villa-1.jpg',
    category: 'هوشمندسازی',
    location: 'لواسان',
    year: '۱۴۰۱'
  },
  {
    id: 4,
    title: 'پروژه تجاری بغداد',
    description: 'طراحی و اجرای نورپردازی نمای ساختمان و تابلوهای تبلیغاتی',
    image: '/images/projects/baghdad-1.jpg',
    category: 'نورپردازی',
    location: 'بغداد، عراق',
    year: '۱۴۰۲'
  },
  {
    id: 5,
    title: 'نیروگاه خورشیدی کاشان',
    description: 'طراحی و اجرای سیستم انرژی خورشیدی برای مجتمع صنعتی',
    image: '/images/projects/solar-1.jpg',
    category: 'انرژی خورشیدی',
    location: 'کاشان',
    year: '۱۴۰۱'
  },
  {
    id: 6,
    title: 'مدل‌سازی سه‌بعدی پروژه مسکونی',
    description: 'طراحی و ارائه مدل سه‌بعدی تعاملی برای پروژه برج مسکونی',
    image: '/images/projects/3d-1.jpg',
    category: 'طراحی سه‌بعدی',
    location: 'مشهد',
    year: '۱۴۰۲'
  }
];

const categories = ['همه', 'تابلوهای تبلیغاتی', 'هوشمندسازی', 'نورپردازی', 'انرژی خورشیدی', 'طراحی سه‌بعدی'];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'همه' || project.category === selectedCategory
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center pt-20 pb-16 relative overflow-hidden">
        <ParticleBackground />
        
        <div className="container relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-8">
              نمونه <span className="gradient-text">پروژه‌ها</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              نگاهی به برخی از پروژه‌های موفق ما در حوزه‌های مختلف
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <SectionWrapper className="bg-secondary-dark">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`px-6 py-3 rounded-full border ${
                selectedCategory === category
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'border-white/10 hover:border-primary/30'
              } transition-colors duration-300`}
              onClick={() => setSelectedCategory(category)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              {/* Project Card */}
              <div className="glass-card rounded-2xl border border-white/10 overflow-hidden group-hover:border-primary/30 transition-colors duration-300">
                {/* Project Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gray-900"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={hoveredProject === project.id ? { opacity: 1 } : { opacity: 0 }}
                  >
                    <div className="text-center p-6">
                      <p className="text-lg text-gray-300 mb-4">{project.description}</p>
                      <div className="flex items-center justify-center gap-4">
                        <span className="text-primary">{project.location}</span>
                        <span className="w-1 h-1 bg-primary/50 rounded-full" />
                        <span className="text-primary">{project.year}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-sm text-primary/80">{project.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Call to Action */}
      <SectionWrapper>
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
            آماده شروع <span className="gradient-text">پروژه جدید</span> هستید؟
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            با ما تماس بگیرید تا درباره ایده‌های شما صحبت کنیم
          </p>
          <motion.a
            href="/contact"
            className="btn btn-primary px-12 py-4 text-lg inline-flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>شروع گفتگو</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </SectionWrapper>
    </Layout>
  );
};

export default GalleryPage; 