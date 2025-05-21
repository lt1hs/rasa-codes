import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Project categories
  const filters = [
    { id: 'all', name: 'جميع المشاريع' },
    { id: 'analytics', name: 'تحليل البيانات' },
    { id: 'ai', name: 'الذكاء الاصطناعي' },
    { id: 'ml', name: 'التعلم الآلي' },
    { id: 'nlp', name: 'معالجة اللغة' }
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
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] opacity-50" />
          
          {/* Grid lines */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(to right, #FF8301 1px, transparent 1px), linear-gradient(to bottom, #FF8301 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>
        
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              مشاريعنا <span className="gradient-text">الناجحة</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              استكشف مجموعة متنوعة من المشاريع التي قمنا بتنفيذها لعملائنا في مختلف الصناعات
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-16 relative">
          <div className="container">
            <motion.h2 
              className="text-3xl font-display font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              مشاريع <span className="gradient-text">مميزة</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="glass-card rounded-2xl border border-white/10 overflow-hidden group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/90 to-transparent opacity-70" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {filters.find(f => f.id === project.category)?.name}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <span>{project.client}</span>
                      <span className="mx-2">•</span>
                      <span>{project.year}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-6 line-clamp-3">{project.description}</p>
                    
                    <Link 
                      to={`/projects/${project.id}`} 
                      className="inline-flex items-center text-primary hover:text-primary-light transition-colors"
                    >
                      عرض التفاصيل
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                  
                  {/* Decorative elements */}
                  <motion.div 
                    className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-accent"
                    animate={{ 
                      y: [0, 5, 0],
                      opacity: [0.5, 1, 0.5]
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
      
      {/* Projects Section */}
      <section className="py-16 relative">
        <div className="container">
          {/* Filters */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-primary text-white'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300'
                }`}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.name}
              </motion.button>
            ))}
          </div>
          
          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/70 to-transparent opacity-70" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
                        {filters.find(f => f.id === project.category)?.name}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center text-xs text-gray-400 mb-2">
                      <span>{project.client}</span>
                      <span className="mx-2">•</span>
                      <span>{project.year}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
                    
                    <Link 
                      to={`/projects/${project.id}`} 
                      className="inline-flex items-center text-primary hover:text-primary-light transition-colors text-sm mt-auto"
                    >
                      عرض التفاصيل
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                  
                  {/* Hover decoration */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">لا توجد مشاريع</h3>
              <p className="text-gray-400">
                لم يتم العثور على مشاريع في هذه الفئة. الرجاء تحديد فئة أخرى.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary to-secondary-dark" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-5 overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[100px]"
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
            className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-accent/5 blur-[100px]"
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
          <motion.h2 
            className="text-3xl font-display font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            ماذا يقول <span className="gradient-text">عملاؤنا</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-primary/20">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                
                <div className="mb-6 pt-6">
                  <p className="text-gray-300 italic relative z-10">{testimonial.quote}</p>
                </div>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div className="mr-3">
                    <span className="block font-medium">{testimonial.name}</span>
                    <span className="block text-sm text-gray-400">{testimonial.title}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center glass-card p-10 rounded-2xl border border-white/10">
            <motion.h2 
              className="text-3xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              هل أنت جاهز <span className="gradient-text">لمشروعك التالي</span>؟
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              دعنا نساعدك في تحويل أفكارك إلى واقع باستخدام أحدث تقنيات الذكاء الاصطناعي وتحليل البيانات
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <a href="/contact" className="btn btn-primary px-8 py-4">تواصل معنا</a>
              <a href="/services" className="btn btn-outline px-8 py-4">استكشف خدماتنا</a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage; 