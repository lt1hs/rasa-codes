import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';

const AboutPage = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'أحمد الشمري',
      role: 'المؤسس والرئيس التنفيذي',
      bio: 'خبير في الذكاء الاصطناعي مع أكثر من 15 عامًا من الخبرة في قيادة شركات التكنولوجيا',
      image: 'https://i.pravatar.cc/300?img=11'
    },
    {
      name: 'سارة العبدالله',
      role: 'مديرة التكنولوجيا',
      bio: 'متخصصة في تطوير خوارزميات التعلم الآلي، حاصلة على دكتوراه من جامعة ستانفورد',
      image: 'https://i.pravatar.cc/300?img=5'
    },
    {
      name: 'محمد القحطاني',
      role: 'رئيس قسم البحث والتطوير',
      bio: 'أكثر من 10 سنوات من الخبرة في تطوير نماذج الذكاء الاصطناعي وحلول تحليل البيانات',
      image: 'https://i.pravatar.cc/300?img=3'
    },
    {
      name: 'نورة الدوسري',
      role: 'مديرة المنتجات',
      bio: 'خبيرة في تطوير المنتجات المبتكرة مع التركيز على تجربة المستخدم والأداء العالي',
      image: 'https://i.pravatar.cc/300?img=9'
    }
  ];

  // Company milestones
  const milestones = [
    {
      year: '2018',
      title: 'تأسيس الشركة',
      description: 'بدأنا كشركة ناشئة صغيرة مع رؤية كبيرة لتغيير كيفية تعامل الشركات مع البيانات'
    },
    {
      year: '2020',
      title: 'إطلاق المنصة الأولى',
      description: 'أطلقنا أول منصة لتحليل البيانات المدعومة بالذكاء الاصطناعي، مما أحدث ثورة في القطاع'
    },
    {
      year: '2021',
      title: 'توسعنا إقليمياً',
      description: 'فتحنا مكاتب في دبي والرياض، موسعين نطاق خدماتنا في منطقة الشرق الأوسط'
    },
    {
      year: '2022',
      title: 'جولة التمويل الكبرى',
      description: 'حصلنا على تمويل بقيمة 50 مليون دولار لتطوير تقنيات جديدة وتوسيع فريقنا'
    },
    {
      year: '2023',
      title: 'إطلاق الجيل الجديد',
      description: 'أطلقنا الجيل الجديد من منصتنا بميزات متقدمة وأداء غير مسبوق'
    }
  ];

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
              من <span className="gradient-text">نحن</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              نحن شركة رائدة في مجال الذكاء الاصطناعي وتحليل البيانات، نسعى لتمكين الشركات من اتخاذ قرارات أفضل من خلال حلول مبتكرة
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16 relative">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="glass-card p-8 rounded-2xl border border-white/10 h-full relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-[50px] -z-5" />
                
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-display font-semibold mb-4">رؤيتنا</h2>
                  <p className="text-gray-300 mb-6 flex-grow">
                    نسعى لأن نكون الشركة الرائدة عالمياً في مجال الحلول الذكية المدعومة بالذكاء الاصطناعي، ملهمين صناعة جديدة من الابتكار التقني المستدام.
                  </p>
                  
                  <motion.div 
                    className="w-full h-1 bg-gradient-to-l from-primary/50 to-accent/50 rounded-full opacity-50"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="glass-card p-8 rounded-2xl border border-white/10 h-full relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-accent/10 blur-[50px] -z-5" />
                
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-display font-semibold mb-4">مهمتنا</h2>
                  <p className="text-gray-300 mb-6 flex-grow">
                    تمكين الشركات من تحقيق أقصى استفادة من بياناتها من خلال تقديم حلول ذكاء اصطناعي متقدمة، سهلة الاستخدام وفعالة، تساعد في اتخاذ قرارات أفضل وتحقيق نتائج استثنائية.
                  </p>
                  
                  <motion.div 
                    className="w-full h-1 bg-gradient-to-l from-accent/50 to-primary/50 rounded-full opacity-50"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Company History Timeline */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary to-secondary-dark opacity-50" />
        
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              مسيرة <span className="gradient-text">النجاح</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              منذ تأسيسنا، حققنا إنجازات كبيرة في رحلتنا نحو تحويل عالم البيانات
            </p>
          </motion.div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <motion.div 
              className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/10 -translate-x-1/2"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />
            
            <div className="space-y-24">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative">
                  {/* Year badge */}
                  <motion.div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      {milestone.year}
                    </div>
                  </motion.div>
                  
                  {/* Content */}
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 relative ${index % 2 === 0 ? 'md:text-right' : 'md:text-left md:flex-row-reverse'}`}>
                    <motion.div 
                      className={`md:col-start-${index % 2 === 0 ? 1 : 2} md:col-span-1 glass-card p-6 rounded-xl border border-white/10`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.2 + 0.3 }}
                    >
                      <h3 className="text-xl font-semibold gradient-text mb-2">{milestone.title}</h3>
                      <p className="text-gray-300">{milestone.description}</p>
                    </motion.div>
                    
                    <div className="md:col-span-1">
                      {/* This column is intentionally left empty for layout purposes */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 relative">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              فريق <span className="gradient-text">القيادة</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              نضم نخبة من المتخصصين ذوي الخبرة في مجالات الذكاء الاصطناعي وعلوم البيانات وتطوير البرمجيات
            </p>
          </motion.div>
          
          {/* Team grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="glass-card relative p-6 rounded-2xl border border-white/10 overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Hover effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 -z-5"
                  transition={{ duration: 0.3 }}
                />
                
                {/* Profile image */}
                <div className="relative mb-6 perspective-1000">
                  <div className="h-48 overflow-hidden rounded-xl">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Decorative elements */}
                  <motion.div 
                    className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-primary"
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
                </div>
                
                {/* Info */}
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
                
                {/* Social links */}
                <div className="flex gap-3 mt-4">
                  {['linkedin', 'twitter'].map((social) => (
                    <a 
                      key={social}
                      href="#" 
                      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-primary/20 hover:text-white transition-all"
                      aria-label={`${member.name} ${social}`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        {social === 'linkedin' ? (
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        ) : (
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        )}
                      </svg>
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary to-secondary-dark" />
        
        <div className="container">
          <div className="max-w-3xl mx-auto text-center glass-card p-10 rounded-2xl border border-white/10 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-[80px] -z-5" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-accent/10 blur-[80px] -z-5" />
            
            <motion.h2 
              className="text-3xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              هل أنت جاهز <span className="gradient-text">للانضمام إلينا</span>؟
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              نحن دائمًا نبحث عن المواهب المتميزة للانضمام إلى فريقنا. تفقد الوظائف المتاحة لدينا أو تواصل معنا مباشرة.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <a href="/careers" className="btn btn-primary px-8 py-4">الوظائف المتاحة</a>
              <a href="/contact" className="btn btn-outline px-8 py-4">تواصل معنا</a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage; 