import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: 'ai' | 'rasa' | 'nlp' | 'chatbots';
  image: string;
  date: string;
  readTime: string;
  author: string;
  featured: boolean;
}

const BlogsSection = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | BlogPost['category']>('all');
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0);
  const mouseY = useSpring(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'آینده هوش مصنوعی در توسعه نرم‌افزار',
      excerpt: 'بررسی تأثیر هوش مصنوعی بر صنعت توسعه نرم‌افزار و چشم‌انداز آینده این فناوری',
      category: 'ai',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
      date: '۱۴۰۲/۱۲/۲۵',
      readTime: '۱۰ دقیقه',
      author: 'تیم راسا',
      featured: true
    },
    {
      id: 2,
      title: 'راهنمای کامل پردازش زبان طبیعی',
      excerpt: 'آموزش جامع تکنیک‌های پردازش زبان طبیعی و کاربردهای عملی آن در پروژه‌های واقعی',
      category: 'nlp',
      image: 'https://images.unsplash.com/photo-1655720406100-3f1eda0a4519?q=80&w=800&auto=format&fit=crop',
      date: '۱۴۰۲/۱۲/۲۰',
      readTime: '۱۵ دقیقه',
      author: 'علی احمدی',
      featured: true
    },
    {
      id: 3,
      title: 'بهترین روش‌های آموزش مدل‌های یادگیری ماشین',
      excerpt: 'تکنیک‌های پیشرفته برای بهبود عملکرد مدل‌های یادگیری ماشین و جلوگیری از overfitting',
      category: 'ai',
      image: 'https://images.unsplash.com/photo-1673187735167-a6cf3142e1f4?q=80&w=800&auto=format&fit=crop',
      date: '۱۴۰۲/۱۲/۱۵',
      readTime: '۱۲ دقیقه',
      author: 'سارا محمدی',
      featured: false
    },
    {
      id: 4,
      title: 'طراحی رباتهای گفتگوی هوشمند',
      excerpt: 'راهنمای عملی ساخت چت‌بات‌های پیشرفته با قابلیت درک زبان طبیعی و پاسخ‌دهی هوشمند',
      category: 'chatbots',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
      date: '۱۴۰۲/۱۲/۱۰',
      readTime: '۸ دقیقه',
      author: 'محمد رضایی',
      featured: false
    },
    {
      id: 5,
      title: 'معماری سیستم‌های توزیع‌شده مدرن',
      excerpt: 'بررسی الگوهای طراحی و بهترین شیوه‌های پیاده‌سازی سیستم‌های توزیع‌شده مقیاس‌پذیر',
      category: 'rasa',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=800&auto=format&fit=crop',
      date: '۱۴۰۲/۱۲/۰۵',
      readTime: '۲۰ دقیقه',
      author: 'حسین کریمی',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'همه مقالات', icon: '📚', count: blogPosts.length },
    { id: 'ai', label: 'هوش مصنوعی', icon: '🧠', count: blogPosts.filter(p => p.category === 'ai').length },
    { id: 'nlp', label: 'پردازش زبان', icon: '🔤', count: blogPosts.filter(p => p.category === 'nlp').length },
    { id: 'chatbots', label: 'چت‌بات', icon: '💬', count: blogPosts.filter(p => p.category === 'chatbots').length },
    { id: 'rasa', label: 'فناوری', icon: '⚡', count: blogPosts.filter(p => p.category === 'rasa').length }
  ];

  const filteredPosts = blogPosts.filter(
    post => activeCategory === 'all' || post.category === activeCategory
  );

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 overflow-hidden bg-gradient-to-b from-secondary via-secondary/95 to-secondary/50"
    >
      {/* Enhanced Background */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(circle at var(--x) var(--y), rgba(87,220,218,0.06), transparent 70%)',
          '--x': mouseX,
          '--y': mouseY
        } as any}
      />

      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #57DCDA 0.5px, transparent 0.5px),
              linear-gradient(to bottom, #57DCDA 0.5px, transparent 0.5px)
            `,
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
          }}
        />

        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#57DCDA] rounded-full opacity-20"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-4 max-w-7xl"
        style={{ opacity, y }}
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-[#57DCDA]/10 to-[#3AADAB]/10 backdrop-blur-sm border border-[#57DCDA]/20"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">وبلاگ راسا</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            مقالات <span className="bg-gradient-to-r from-[#57DCDA] via-[#4ABEBC] to-[#3AADAB] bg-clip-text text-transparent">تخصصی</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300/80 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            آخرین مقالات و بینش‌های تخصصی در زمینه هوش مصنوعی و فناوری
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id as typeof activeCategory)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 -z-10 rounded-lg"
                initial={false}
                animate={{
                  background: activeCategory === category.id
                    ? 'linear-gradient(135deg, rgba(87,220,218,0.2), rgba(58,173,171,0.15))'
                    : 'rgba(255,255,255,0.03)'
                }}
                transition={{ duration: 0.3 }}
              />
              <span className="text-base">{category.icon}</span>
              {category.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeCategory === category.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {category.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">
              مقالات <span className="text-[#57DCDA]">ویژه</span>
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="group relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredPost(post.id)}
                  onHoverEnd={() => setHoveredPost(null)}
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 group-hover:border-[#57DCDA]/30 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#57DCDA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <motion.img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.7 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Featured Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-[#57DCDA] text-white text-xs font-medium rounded-full">
                            ویژه
                          </span>
                        </div>
                        
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs text-[#57DCDA] font-medium">
                              {categories.find(cat => cat.id === post.category)?.label}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-400">{post.readTime}</span>
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#57DCDA] transition-colors duration-300">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-200/90 text-sm leading-relaxed mb-4">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              نویسنده: {post.author}
                            </span>
                            <motion.div
                              className="flex items-center gap-1 text-[#57DCDA] text-xs"
                              whileHover={{ x: 3 }}
                            >
                              <span>ادامه مطلب</span>
                              <svg className="w-3 h-3 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/blog/${post.id}`}>
                  <motion.div 
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10 group-hover:border-[#57DCDA]/30 transition-all duration-500"
                    whileHover={{ y: -8 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#57DCDA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-[#57DCDA] font-medium">
                          {categories.find(cat => cat.id === post.category)?.label}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 group-hover:text-[#57DCDA] transition-colors duration-300">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {post.readTime}
                        </span>
                        <motion.span 
                          className="text-xs text-gray-400 group-hover:text-[#57DCDA] transition-colors"
                          whileHover={{ x: 3 }}
                        >
                          مطالعه →
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* View All CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/blog">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-xl text-white font-medium hover:shadow-lg hover:shadow-[#57DCDA]/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              مشاهده همه مقالات
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BlogsSection;
