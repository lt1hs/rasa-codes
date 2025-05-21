import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'ai' | 'web' | 'mobile' | 'data';
  image: string;
  technologies: string[];
  link?: string;
}

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | Project['category']>('all');
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const projects: Project[] = [
    {
      id: 1,
      title: 'سیستم تحلیل داده هوشمند',
      description: 'پلتفرم پیشرفته تحلیل داده با استفاده از هوش مصنوعی و یادگیری ماشین',
      category: 'ai',
      image: '/projects/ai-analytics.svg',
      technologies: ['TensorFlow', 'Python', 'React', 'AWS'],
      link: '#'
    },
    {
      id: 2,
      title: 'اپلیکیشن مدیریت پروژه',
      description: 'اپلیکیشن وب یکپارچه برای مدیریت پروژه‌ها و تیم‌ها با قابلیت‌های پیشرفته همکاری',
      category: 'web',
      image: '/projects/project-management.svg',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      link: '#'
    },
    {
      id: 3,
      title: 'ربات گفتگوی هوشمند',
      description: 'ربات گفتگوی هوشمند با پشتیبانی از زبان فارسی و قابلیت‌های پردازش زبان طبیعی',
      category: 'ai',
      image: '/projects/chatbot.svg',
      technologies: ['OpenAI', 'Node.js', 'MongoDB', 'WebSocket'],
      link: '#'
    },
    {
      id: 4,
      title: 'پلتفرم فروشگاه آنلاین',
      description: 'پلتفرم جامع تجارت الکترونیک با پشتیبانی از پرداخت و ارسال',
      category: 'mobile',
      image: '/projects/ecommerce.svg',
      technologies: ['React Native', 'Firebase', 'Stripe', 'Redux'],
      link: '#'
    }
  ];

  const categories = [
    { id: 'all', label: 'همه پروژه‌ها' },
    { id: 'ai', label: 'هوش مصنوعی' },
    { id: 'web', label: 'وب اپلیکیشن' },
    { id: 'mobile', label: 'اپلیکیشن موبایل' },
    { id: 'data', label: 'تحلیل داده' }
  ];

  const filteredProjects = projects.filter(
    project => activeCategory === 'all' || project.category === activeCategory
  );

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0f1f38] via-[#0c1a2e] to-[#0c1525]">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#57DCDA]/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Animated Lines */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-[#57DCDA]/20 to-transparent"
              style={{
                top: `${30 * i}%`,
                x: -1000,
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <motion.div 
        className="container relative z-10"
        style={{ opacity }}
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block relative">
            <motion.span
              className="absolute -inset-1 bg-gradient-to-r from-[#57DCDA]/20 to-[#3AADAB]/20 blur-lg"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <h2 className="relative text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                پروژه‌های ما
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-300/90 max-w-2xl mx-auto">
            ارائه راهکارهای نوآورانه و پروژه‌های برجسته در حوزه فناوری
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
              onClick={() => setActiveCategory(category.id as typeof activeCategory)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          layout
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1525]/80 z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                  {project.title}
                </h3>
                <p className="text-gray-300/90 mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-white/5 rounded-full text-[#57DCDA]/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Link */}
                {project.link && (
                  <motion.a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-[#57DCDA] hover:text-[#3AADAB] transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span>عرض المشروع</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                )}
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#57DCDA]/10 to-[#3AADAB]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ y: backgroundY }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection; 