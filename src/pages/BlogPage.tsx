import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

// Define TypeScript interfaces
interface Author {
  name: string;
  avatar: string;
  role: string;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  author: Author;
  date: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
  likes: number;
  comments: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSubscribeHovered, setIsSubscribeHovered] = useState(false);
  
  // Blog categories with proper typing
  const categories: Category[] = [
    { 
      id: 'all', 
      name: 'جميع المقالات',
      icon: '🌟',
      description: 'عرض جميع المقالات المتاحة'
    },
    { 
      id: 'ai', 
      name: 'الذكاء الاصطناعي',
      icon: '🤖',
      description: 'أحدث التطورات في مجال الذكاء الاصطناعي'
    },
    { 
      id: 'ml', 
      name: 'التعلم الآلي',
      icon: '🧠',
      description: 'تقنيات وتطبيقات التعلم الآلي'
    },
    { 
      id: 'nlp', 
      name: 'معالجة اللغة',
      icon: '💬',
      description: 'تطورات معالجة اللغات الطبيعية'
    },
    { 
      id: 'data', 
      name: 'تحليل البيانات',
      icon: '📊',
      description: 'تحليل وتفسير البيانات الضخمة'
    }
  ];
  
  // Blog articles with proper typing
  const articles: Article[] = [
    {
      id: 1,
      title: 'كيف يغير الذكاء الاصطناعي مستقبل الأعمال',
      excerpt: 'استكشف كيف تستفيد الشركات من تقنيات الذكاء الاصطناعي لتحسين العمليات واتخاذ قرارات أفضل.',
      imageUrl: 'https://picsum.photos/seed/ai1/800/600',
      category: 'ai',
      author: {
        name: 'أحمد الشمري',
        avatar: 'https://i.pravatar.cc/150?u=ahmed',
        role: 'خبير الذكاء الاصطناعي'
      },
      date: '15 يونيو 2023',
      readTime: '7 دقائق',
      featured: true,
      tags: ['ذكاء-اصطناعي', 'أعمال', 'تقنية'],
      likes: 245,
      comments: 28
    },
    {
      id: 2,
      title: 'تقنيات التعلم العميق وتطبيقاتها في الرؤية الحاسوبية',
      excerpt: 'تعرف على أحدث التقنيات في مجال التعلم العميق وكيفية تطبيقها في أنظمة الرؤية الحاسوبية.',
      imageUrl: 'https://picsum.photos/seed/ml2/800/600',
      category: 'ml',
      author: {
        name: 'سارة العبدالله',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
        role: 'باحثة في التعلم الآلي'
      },
      date: '22 مايو 2023',
      readTime: '5 دقائق',
      tags: ['تعلم-عميق', 'رؤية-حاسوبية', 'تقنية'],
      likes: 189,
      comments: 15
    },
    {
      id: 3,
      title: 'معالجة اللغة العربية الطبيعية: التحديات والحلول',
      excerpt: 'نظرة عميقة على التحديات الفريدة في معالجة اللغة العربية والتقنيات المبتكرة للتغلب عليها.',
      imageUrl: 'https://picsum.photos/seed/nlp3/800/600',
      category: 'nlp',
      author: {
        name: 'محمد القحطاني',
        avatar: 'https://i.pravatar.cc/150?u=mohammed',
        role: 'مهندس معالجة لغات طبيعية'
      },
      date: '10 أبريل 2023',
      readTime: '8 دقائق',
      featured: true,
      tags: ['معالجة-لغات', 'لغة-عربية', 'ذكاء-اصطناعي'],
      likes: 312,
      comments: 45
    },
    {
      id: 4,
      title: 'تحليل البيانات الضخمة: استراتيجيات للشركات الصغيرة والمتوسطة',
      excerpt: 'كيف يمكن للشركات الصغيرة والمتوسطة الاستفادة من تحليل البيانات الضخمة بميزانية محدودة.',
      imageUrl: 'https://picsum.photos/seed/data4/800/600',
      category: 'data',
      author: {
        name: 'نورة الدوسري',
        avatar: 'https://i.pravatar.cc/150?u=noura',
        role: 'محللة بيانات'
      },
      date: '3 مارس 2023',
      readTime: '6 دقائق',
      tags: ['تحليل-بيانات', 'شركات', 'تقنية'],
      likes: 156,
      comments: 19
    },
    {
      id: 5,
      title: 'التعلم المعزز: الجيل القادم من الذكاء الاصطناعي',
      excerpt: 'استكشاف كيفية استخدام تقنيات التعلم المعزز لتطوير نماذج ذكاء اصطناعي أكثر تقدماً وقدرة على التكيف.',
      imageUrl: 'https://picsum.photos/seed/ai5/800/600',
      category: 'ai',
      author: {
        name: 'أحمد الشمري',
        avatar: 'https://i.pravatar.cc/150?u=ahmed',
        role: 'خبير الذكاء الاصطناعي'
      },
      date: '19 فبراير 2023',
      readTime: '9 دقائق',
      tags: ['تعلم-معزز', 'ذكاء-اصطناعي', 'تقنية'],
      likes: 278,
      comments: 32
    },
    {
      id: 6,
      title: 'نظرة على مستقبل التفاعل بين الإنسان والآلة',
      excerpt: 'كيف ستغير واجهات المستخدم الذكية طريقة تفاعلنا مع التكنولوجيا في المستقبل القريب.',
      imageUrl: 'https://picsum.photos/seed/ml6/800/600',
      category: 'ml',
      author: {
        name: 'سارة العبدالله',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
        role: 'باحثة في التعلم الآلي'
      },
      date: '7 يناير 2023',
      readTime: '5 دقائق',
      tags: ['تفاعل-إنسان-آلة', 'واجهات-مستخدم', 'تقنية'],
      likes: 198,
      comments: 23
    }
  ];

  // Enhanced filtering with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      // Additional filtering logic can be added here
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter articles with proper typing
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Featured articles with proper typing
  const featuredArticles = articles
    .filter(article => article.featured)
    .sort((a, b) => b.likes - a.likes);

  // Enhanced Subscribe Section
  const SubscribeSection = () => (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Enhanced Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25px 25px, #FF8301 2px, transparent 0),
              radial-gradient(circle at 75px 75px, #FF8301 2px, transparent 0)
            `,
            backgroundSize: '100px 100px'
          }}
        />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -30, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <div className="container relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto glass-card p-12 rounded-2xl border border-white/10 relative overflow-hidden"
          whileHover={{
            boxShadow: '0 0 50px rgba(87, 220, 218, 0.1)'
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-br-full blur-xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/20 to-transparent rounded-tl-full blur-xl" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center relative z-10"
          >
            <motion.div
              animate={{
                scale: isSubscribeHovered ? 1.02 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                اشترك في <span className="gradient-text">النشرة البريدية</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                احصل على أحدث المقالات والتحديثات والرؤى مباشرة في بريدك الإلكتروني. نرسل محتوى حصري لمشتركينا.
              </p>
            </motion.div>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className="flex-grow relative">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 text-lg"
                  required
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <motion.button
                type="submit"
                className="btn btn-primary py-4 px-8 text-lg font-medium relative overflow-hidden group"
                onHoverStart={() => setIsSubscribeHovered(true)}
                onHoverEnd={() => setIsSubscribeHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">اشترك الآن</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light to-accent"
                  animate={{
                    x: isSubscribeHovered ? ['0%', '100%'] : '0%'
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity
                  }}
                />
              </motion.button>
            </form>
            
            {/* Benefits */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
              {[
                { icon: '🚀', text: 'محتوى حصري' },
                { icon: '⚡️', text: 'تحديثات فورية' },
                { icon: '🎯', text: 'نصائح احترافية' },
                { icon: '🔒', text: 'خصوصية تامة' }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-3xl mb-2">{benefit.icon}</div>
                  <div className="text-sm text-gray-400">{benefit.text}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );

  return (
    <Layout>
      {/* Enhanced Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center pt-20 pb-16 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 -z-10">
          {/* Primary Gradient Orb */}
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
          
          {/* Secondary Gradient Orb */}
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
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-6xl md:text-7xl font-display font-bold mb-8">
                المدونة <span className="gradient-text">التقنية</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                استكشف أحدث المقالات والرؤى حول تقنيات الذكاء الاصطناعي وتحليل البيانات
              </p>
            </motion.div>

            {/* Blog Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { number: articles.length, label: 'مقال', icon: '📝' },
                { number: categories.length - 1, label: 'فئة', icon: '🏷️' },
                { number: articles.reduce((acc, curr) => acc + curr.likes, 0), label: 'إعجاب', icon: '❤️' },
                { number: articles.reduce((acc, curr) => acc + curr.comments, 0), label: 'تعليق', icon: '💬' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                <input
                  type="text"
                  placeholder="ابحث عن المقالات..."
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 pr-14 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{
                      scale: isSearchFocused ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
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
      
      {/* Enhanced Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 relative">
          <div className="container">
            <motion.div 
              className="flex items-center justify-between mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
                <span className="text-2xl">✨</span>
                مقالات <span className="gradient-text">مميزة</span>
              </h2>
              <Link 
                to="/blog/featured" 
                className="text-primary hover:text-primary-light transition-colors flex items-center gap-2 group"
              >
                عرض المزيد
                <motion.svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </Link>
            </motion.div>
            
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
                  {/* Enhanced Category Tag */}
                  <div className="absolute top-4 right-4 z-10">
                    <motion.span 
                      className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      {categories.find(cat => cat.id === article.category)?.icon}
                      {categories.find(cat => cat.id === article.category)?.name}
                    </motion.span>
                  </div>
                  
                  {/* Enhanced Image Container */}
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    <motion.img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    {/* Enhanced Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/95 via-secondary-dark/70 to-transparent opacity-90" />
                  </div>
                  
                  {/* Enhanced Content */}
                  <div className="p-8 relative">
                    {/* Author Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={article.author.avatar} 
                        alt={article.author.name} 
                        className="w-12 h-12 rounded-full border-2 border-primary/20"
                      />
                      <div>
                        <h4 className="font-medium text-white">{article.author.name}</h4>
                        <p className="text-sm text-gray-400">{article.author.role}</p>
                      </div>
                    </div>
                    
                    {/* Article Meta */}
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {article.likes}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {article.comments}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-semibold mb-4 line-clamp-2 hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 mb-6 line-clamp-2">{article.excerpt}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {article.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Enhanced Read More Link */}
                    <Link 
                      to={`/blog/${article.id}`} 
                      className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors group"
                    >
                      قراءة المزيد
                      <motion.svg 
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Enhanced Categories and Search */}
      <section className="py-16">
        <div className="container">
          <div className="glass-card p-8 rounded-2xl border border-white/10">
            <div className="grid md:grid-cols-[1fr,auto] gap-8">
              {/* Enhanced Search */}
              <div className="relative">
                <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
                  <input
                    type="text"
                    placeholder="بحث في المقالات..."
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 pr-14 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <div className="absolute left-5 top-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{
                        scale: isSearchFocused ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
                
                {/* Search Results Count */}
                <motion.div 
                  className="absolute -bottom-6 right-2 text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: searchQuery ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {filteredArticles.length} نتيجة
                </motion.div>
              </div>
              
              {/* Enhanced Categories */}
              <div className="flex flex-wrap gap-3 items-center">
                <AnimatePresence mode="wait">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      className={`
                        px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300
                        flex items-center gap-2 relative overflow-hidden
                        ${activeCategory === category.id
                          ? 'bg-primary text-white scale-105 shadow-lg shadow-primary/25'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
                        }
                      `}
                      onClick={() => setActiveCategory(category.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      layout
                    >
                      <span className="relative z-10 text-lg">{category.icon}</span>
                      <span className="relative z-10">{category.name}</span>
                      {category.id !== 'all' && (
                        <span className="relative z-10 bg-white/20 px-2 py-0.5 rounded-md text-xs">
                          {articles.filter(article => article.category === category.id).length}
                        </span>
                      )}
                      
                      {/* Hover Effect */}
                      {activeCategory === category.id && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light"
                          layoutId="category-background"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Category Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6 text-gray-400 text-sm"
              >
                {categories.find(cat => cat.id === activeCategory)?.description}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
      
      {/* Enhanced Articles Grid */}
      <section className="py-16">
        <div className="container">
          {filteredArticles.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  className="group"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="glass-card rounded-xl border border-white/10 overflow-hidden relative h-full flex flex-col transform transition-transform duration-300 hover:-translate-y-2">
                    {/* Enhanced Category Tag */}
                    <div className="absolute top-4 right-4 z-10">
                      <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                          {categories.find(cat => cat.id === article.category)?.icon}
                          {categories.find(cat => cat.id === article.category)?.name}
                        </span>
                      </motion.div>
                    </div>
                    
                    {/* Enhanced Image Container */}
                    <div className="relative h-52 overflow-hidden">
                      <motion.img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/95 via-secondary-dark/70 to-transparent opacity-90" />
                    </div>
                    
                    {/* Enhanced Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Author Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <img 
                          src={article.author.avatar} 
                          alt={article.author.name} 
                          className="w-10 h-10 rounded-full border-2 border-primary/20"
                        />
                        <div>
                          <h4 className="font-medium text-white text-sm">{article.author.name}</h4>
                          <p className="text-xs text-gray-400">{article.author.role}</p>
                        </div>
                      </div>
                      
                      {/* Article Meta */}
                      <div className="flex items-center text-xs text-gray-400 mb-3">
                        <span>{article.date}</span>
                        <span className="mx-2">•</span>
                        <span>{article.readTime}</span>
                      </div>
                      
                      <Link to={`/blog/${article.id}`} className="group">
                        <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                      </Link>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags?.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Article Stats */}
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {article.likes}
                          </span>
                          <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {article.comments}
                          </span>
                        </div>
                        
                        <Link 
                          to={`/blog/${article.id}`} 
                          className="text-primary hover:text-primary-light transition-colors flex items-center gap-1 text-sm group"
                        >
                          قراءة المزيد
                          <motion.svg 
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </motion.svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">لا توجد نتائج</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                لم يتم العثور على مقالات تطابق معايير البحث. حاول تغيير كلمات البحث أو تصفية فئة مختلفة.
              </p>
            </motion.div>
          )}
        </div>
      </section>
      
      <SubscribeSection />
    </Layout>
  );
};

export default BlogPage; 