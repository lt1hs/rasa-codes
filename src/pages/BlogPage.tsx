import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Blog categories
  const categories = [
    { id: 'all', name: 'جميع المقالات' },
    { id: 'ai', name: 'الذكاء الاصطناعي' },
    { id: 'ml', name: 'التعلم الآلي' },
    { id: 'nlp', name: 'معالجة اللغة' },
    { id: 'data', name: 'تحليل البيانات' }
  ];
  
  // Blog articles data
  const articles = [
    {
      id: 1,
      title: 'كيف يغير الذكاء الاصطناعي مستقبل الأعمال',
      excerpt: 'استكشف كيف تستفيد الشركات من تقنيات الذكاء الاصطناعي لتحسين العمليات واتخاذ قرارات أفضل.',
      imageUrl: 'https://picsum.photos/seed/ai1/800/600',
      category: 'ai',
      author: 'أحمد الشمري',
      date: '15 يونيو 2023',
      readTime: '7 دقائق',
      featured: true
    },
    {
      id: 2,
      title: 'تقنيات التعلم العميق وتطبيقاتها في الرؤية الحاسوبية',
      excerpt: 'تعرف على أحدث التقنيات في مجال التعلم العميق وكيفية تطبيقها في أنظمة الرؤية الحاسوبية.',
      imageUrl: 'https://picsum.photos/seed/ml2/800/600',
      category: 'ml',
      author: 'سارة العبدالله',
      date: '22 مايو 2023',
      readTime: '5 دقائق'
    },
    {
      id: 3,
      title: 'معالجة اللغة العربية الطبيعية: التحديات والحلول',
      excerpt: 'نظرة عميقة على التحديات الفريدة في معالجة اللغة العربية والتقنيات المبتكرة للتغلب عليها.',
      imageUrl: 'https://picsum.photos/seed/nlp3/800/600',
      category: 'nlp',
      author: 'محمد القحطاني',
      date: '10 أبريل 2023',
      readTime: '8 دقائق',
      featured: true
    },
    {
      id: 4,
      title: 'تحليل البيانات الضخمة: استراتيجيات للشركات الصغيرة والمتوسطة',
      excerpt: 'كيف يمكن للشركات الصغيرة والمتوسطة الاستفادة من تحليل البيانات الضخمة بميزانية محدودة.',
      imageUrl: 'https://picsum.photos/seed/data4/800/600',
      category: 'data',
      author: 'نورة الدوسري',
      date: '3 مارس 2023',
      readTime: '6 دقائق'
    },
    {
      id: 5,
      title: 'التعلم المعزز: الجيل القادم من الذكاء الاصطناعي',
      excerpt: 'استكشاف كيفية استخدام تقنيات التعلم المعزز لتطوير نماذج ذكاء اصطناعي أكثر تقدماً وقدرة على التكيف.',
      imageUrl: 'https://picsum.photos/seed/ai5/800/600',
      category: 'ai',
      author: 'أحمد الشمري',
      date: '19 فبراير 2023',
      readTime: '9 دقائق'
    },
    {
      id: 6,
      title: 'نظرة على مستقبل التفاعل بين الإنسان والآلة',
      excerpt: 'كيف ستغير واجهات المستخدم الذكية طريقة تفاعلنا مع التكنولوجيا في المستقبل القريب.',
      imageUrl: 'https://picsum.photos/seed/ml6/800/600',
      category: 'ml',
      author: 'سارة العبدالله',
      date: '7 يناير 2023',
      readTime: '5 دقائق'
    }
  ];

  // Filter articles based on search query and active category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Featured articles
  const featuredArticles = articles.filter(article => article.featured);

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
              المدونة <span className="gradient-text">التقنية</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              استكشف أحدث المقالات والرؤى حول تقنيات الذكاء الاصطناعي وتحليل البيانات
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-12 relative">
          <div className="container">
            <motion.h2 
              className="text-2xl font-display font-semibold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              مقالات <span className="gradient-text">مميزة</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  className="glass-card rounded-2xl border border-white/10 overflow-hidden group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Category tag */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                  </div>
                  
                  {/* Image */}
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 to-transparent opacity-70" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 relative">
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <span>{article.author}</span>
                      <span className="mx-2">•</span>
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{article.excerpt}</p>
                    
                    <Link 
                      to={`/blog/${article.id}`} 
                      className="inline-flex items-center text-primary hover:text-primary-light transition-colors"
                    >
                      قراءة المزيد
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Search and Filter */}
      <section className="py-8">
        <div className="container">
          <div className="glass-card p-6 rounded-2xl border border-white/10">
            <div className="flex flex-col md:flex-row gap-5">
              {/* Search */}
              <div className="flex-grow">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="بحث في المقالات..."
                    className="w-full px-4 py-3 pr-12 bg-secondary-dark border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary text-white'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Articles Grid */}
      <section className="py-12">
        <div className="container">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  className="glass-card rounded-xl border border-white/10 overflow-hidden group relative h-full flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Category tag */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                  </div>
                  
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/90 to-transparent opacity-60" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center text-xs text-gray-400 mb-2">
                      <span>{article.author}</span>
                      <span className="mx-2">•</span>
                      <span>{article.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{article.excerpt}</p>
                    
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-xs text-gray-400">{article.readTime}</span>
                      <Link 
                        to={`/blog/${article.id}`} 
                        className="inline-flex items-center text-primary hover:text-primary-light transition-colors text-sm"
                      >
                        قراءة المزيد
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Hover decoration */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent scale-x-0 origin-left"
                    transition={{ duration: 0.3 }}
                    variants={{
                      hover: { scaleX: 1 }
                    }}
                    animate={['hover']}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">لا توجد نتائج</h3>
              <p className="text-gray-400">
                لم يتم العثور على مقالات تطابق معايير البحث. حاول تغيير كلمات البحث أو تصفية فئة مختلفة.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Subscribe Section */}
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
          <div className="max-w-3xl mx-auto text-center glass-card p-10 rounded-2xl border border-white/10">
            <motion.h2 
              className="text-3xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              اشترك في <span className="gradient-text">النشرة البريدية</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              احصل على أحدث المقالات والتحديثات والرؤى مباشرة في بريدك الإلكتروني
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <form className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow">
                  <input
                    type="email"
                    placeholder="بريدك الإلكتروني"
                    className="w-full px-4 py-3 bg-secondary-dark border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn btn-primary py-3 px-6 relative overflow-hidden group whitespace-nowrap"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">اشترك الآن</span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-l from-primary to-accent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage; 