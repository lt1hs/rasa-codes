import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  // Project categories with icons
  const filters = [
    { id: 'all', name: 'جميع المشاريع', icon: '🎯' },
    { id: 'analytics', name: 'تحليل البيانات', icon: '📊' },
    { id: 'ai', name: 'الذكاء الاصطناعي', icon: '🤖' },
    { id: 'ml', name: 'التعلم الآلي', icon: '🧠' },
    { id: 'nlp', name: 'معالجة اللغة', icon: '💬' }
  ];
  
  // Projects data
  const projects = [
    {
      id: 1,
      title: 'نظام تحليل البيانات الذكي لشركة المالية المتحدة',
      description: 'تطوير نظام متكامل لتحليل البيانات المالية باستخدام تقنيات الذكاء الاصطناعي، مما ساعد الشركة في تحسين دقة التنبؤات المالية بنسبة 35%.',
      image: 'https://picsum.photos/seed/proj1/800/600',
      category: 'analytics',
      client: 'شركة المالية المتحدة',
      year: '2023',
      featured: true
    },
    {
      id: 2,
      title: 'منصة معالجة اللغة العربية الطبيعية',
      description: 'تطوير منصة متخصصة في معالجة اللغة العربية الطبيعية لتحليل المشاعر وتصنيف النصوص، مع دقة تصل إلى 92% في فهم اللهجات المختلفة.',
      image: 'https://picsum.photos/seed/proj2/800/600',
      category: 'nlp',
      client: 'مؤسسة الأبحاث اللغوية',
      year: '2022',
      featured: true
    },
    {
      id: 3,
      title: 'نظام التنبؤ بالصيانة الوقائية',
      description: 'تطوير نماذج التعلم الآلي للتنبؤ بأعطال المعدات قبل حدوثها، مما ساهم في تقليل وقت التوقف عن العمل بنسبة 45% وتوفير ملايين الريالات سنوياً.',
      image: 'https://picsum.photos/seed/proj3/800/600',
      category: 'ml',
      client: 'شركة البترول الوطنية',
      year: '2023'
    },
    {
      id: 4,
      title: 'روبوت المحادثة الذكي للخدمات المصرفية',
      description: 'تطوير روبوت محادثة ذكي قادر على فهم استفسارات العملاء ومعالجة الطلبات المصرفية الأساسية، مما أدى إلى تقليل وقت الانتظار بنسبة 60%.',
      image: 'https://picsum.photos/seed/proj4/800/600',
      category: 'ai',
      client: 'بنك الخليج المركزي',
      year: '2022'
    },
    {
      id: 5,
      title: 'منصة تحليل بيانات المبيعات والتنبؤ بالطلب',
      description: 'تطوير منصة لتحليل بيانات المبيعات والتنبؤ بالطلب المستقبلي، مما ساعد في تحسين إدارة المخزون وزيادة المبيعات بنسبة 28%.',
      image: 'https://picsum.photos/seed/proj5/800/600',
      category: 'analytics',
      client: 'مجموعة الفيصل التجارية',
      year: '2021'
    },
    {
      id: 6,
      title: 'نظام التعرف على الصور الطبية',
      description: 'تطوير نظام للتعرف على الأنماط في الصور الطبية باستخدام تقنيات التعلم العميق، مما ساعد في تشخيص الحالات بدقة تصل إلى 95%.',
      image: 'https://picsum.photos/seed/proj6/800/600',
      category: 'ml',
      client: 'مستشفى الملك فهد التخصصي',
      year: '2021'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "لقد ساعدنا نظام تحليل البيانات الذكي في اتخاذ قرارات استثمارية أكثر استنارة، مما أدى إلى زيادة العائد على الاستثمار بشكل ملحوظ.",
      name: "محمد السعدي",
      title: "المدير المالي، شركة المالية المتحدة",
      image: "https://i.pravatar.cc/300?img=11"
    },
    {
      id: 2,
      quote: "كانت منصة معالجة اللغة العربية الطبيعية ثورة في مجال بحوثنا اللغوية، وقد مكنتنا من تحليل كميات هائلة من النصوص العربية بدقة عالية.",
      name: "د. ليلى الحسيني",
      title: "مديرة الأبحاث، مؤسسة الأبحاث اللغوية",
      image: "https://i.pravatar.cc/300?img=5"
    },
    {
      id: 3,
      quote: "ساهم نظام التنبؤ بالصيانة الوقائية في تقليل التكاليف بشكل كبير وتحسين عمليات الإنتاج. إنه استثمار يستحق كل ريال.",
      name: "فهد الشمري",
      title: "مدير العمليات، شركة البترول الوطنية",
      image: "https://i.pravatar.cc/300?img=12"
    }
  ];

  // Filter projects
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  // Featured projects
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <Layout>
      {/* Enhanced Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center pt-20 pb-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.div 
            className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
              x: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Enhanced Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #FF8301 1px, transparent 1px),
                linear-gradient(to bottom, #FF8301 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
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
        
        <div className="container relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            style={{ y, opacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-6xl md:text-7xl font-display font-bold mb-8">
                مشاريعنا <span className="gradient-text">الناجحة</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                استكشف مجموعة متنوعة من المشاريع التي قمنا بتنفيذها لعملائنا في مختلف الصناعات
              </p>
            </motion.div>

            {/* Project Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { number: '50+', label: 'مشروع ناجح' },
                { number: '95%', label: 'رضا العملاء' },
                { number: '40+', label: 'عميل' },
                { number: '4', label: 'سنوات خبرة' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card p-6 rounded-xl border border-white/10"
                >
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity
          }}
        >
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>
      
      {/* Enhanced Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-24 relative">
          <div className="container">
            <motion.h2 
              className="text-4xl font-display font-bold mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              مشاريع <span className="gradient-text">مميزة</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="glass-card rounded-2xl border border-white/10 overflow-hidden group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Image with Parallax Effect */}
                  <div className="relative h-72 overflow-hidden">
                    <motion.img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/90 via-secondary-dark/50 to-transparent" />
                    
                    {/* Enhanced Category Badge */}
                    <div className="absolute top-4 right-4">
                      <motion.span 
                        className="bg-primary/20 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        {filters.find(f => f.id === project.category)?.icon}
                        {filters.find(f => f.id === project.category)?.name}
                      </motion.span>
                    </div>
                  </div>
                  
                  {/* Enhanced Content */}
                  <div className="p-8">
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {project.client}
                      </span>
                      <span className="mx-3">•</span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {project.year}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-6 line-clamp-3">{project.description}</p>
                    
                    <Link 
                      to={`/projects/${project.id}`} 
                      className="inline-flex items-center text-primary hover:text-primary-light transition-colors group/link"
                    >
                      عرض التفاصيل
                      <motion.svg 
                        className="w-5 h-5 mr-2 transform group-hover/link:translate-x-1 transition-transform" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </motion.svg>
                    </Link>
                  </div>
                  
                  {/* Enhanced Decorative Elements */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div 
                    className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full bg-accent"
                    animate={{ 
                      y: [0, 5, 0],
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.2
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Enhanced Projects Section */}
      <section className="py-24 relative">
        <div className="container">
          {/* Enhanced Filters */}
          <div className="flex justify-center flex-wrap gap-4 mb-16">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? 'bg-primary text-white scale-110'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300'
                }`}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{filter.icon}</span>
                {filter.name}
              </motion.button>
            ))}
          </div>
          
          {/* Enhanced Projects Grid */}
          {filteredProjects.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="glass-card rounded-xl border border-white/10 overflow-hidden group relative h-full flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Enhanced Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/90 via-secondary-dark/50 to-transparent" />
                    
                    {/* Enhanced Category Badge */}
                    <div className="absolute top-4 right-4">
                      <motion.span 
                        className="bg-primary/20 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        {filters.find(f => f.id === project.category)?.icon}
                        {filters.find(f => f.id === project.category)?.name}
                      </motion.span>
                    </div>
                  </div>
                  
                  {/* Enhanced Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-xs text-gray-400 mb-3">
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {project.client}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {project.year}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
                    
                    <Link 
                      to={`/projects/${project.id}`} 
                      className="inline-flex items-center text-primary hover:text-primary-light transition-colors text-sm mt-auto group/link"
                    >
                      عرض التفاصيل
                      <motion.svg 
                        className="w-4 h-4 mr-1 transform group-hover/link:translate-x-1 transition-transform" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </motion.svg>
                    </Link>
                  </div>
                  
                  {/* Enhanced Hover Effects */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">لا توجد مشاريع</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                لم يتم العثور على مشاريع في هذه الفئة. الرجاء تحديد فئة أخرى.
              </p>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Enhanced Testimonials Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary to-secondary-dark opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,131,1,0.1),transparent_50%)]" />
        </div>
        
        {/* Enhanced Decorative Elements */}
        <div className="absolute inset-0 -z-5 overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[100px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[100px]"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-6">
              ماذا يقول <span className="gradient-text">عملاؤنا</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              نفخر بثقة عملائنا وشهاداتهم حول تجربتهم معنا
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                {/* Enhanced Quote Icon */}
                <div className="absolute top-6 right-6 text-primary/20">
                  <svg className="w-16 h-16 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                
                <div className="mb-8 pt-8">
                  <p className="text-gray-300 text-lg leading-relaxed relative z-10">{testimonial.quote}</p>
                </div>
                
                <div className="flex items-center">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/30 group-hover:border-primary/60 transition-colors duration-300"
                    />
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-primary/20"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </div>
                  <div className="mr-4">
                    <span className="block font-medium text-lg mb-1">{testimonial.name}</span>
                    <span className="block text-sm text-gray-400">{testimonial.title}</span>
                  </div>
                </div>

                {/* Enhanced Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="absolute -bottom-2 -right-2 w-20 h-20 bg-primary/10 rounded-full blur-[20px]"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.2
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage; 