import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: 'ai' | 'rasa' | 'nlp' | 'chatbots';
  image: string;
  date: string;
  readTime: string;
}

const BlogsSection = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | BlogPost['category']>('all');
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'توسعه اپلیکیشن‌های هوش مصنوعی با رسا',
      excerpt: 'راهنمای جامع ساخت ربات‌های گفتگوی هوشمند با فریم‌ورک رسا',
      category: 'rasa',
      image: '/blog/rasa-dev.jpg',
      date: '۱۴۰۲/۱۲/۲۵',
      readTime: '۱۰ دقیقه'
    },
    {
      id: 2,
      title: 'پردازش زبان طبیعی در اپلیکیشن‌های رسا',
      excerpt: 'چگونه درک زبان طبیعی را در ربات‌های گفتگو بهبود دهیم',
      category: 'nlp',
      image: '/blog/nlp-rasa.jpg',
      date: '۱۴۰۲/۱۲/۲۰',
      readTime: '۸ دقیقه'
    },
    {
      id: 3,
      title: 'آموزش مدل‌های هوش مصنوعی',
      excerpt: 'بهترین روش‌ها برای آموزش مدل‌های هوش مصنوعی در رسا',
      category: 'ai',
      image: '/blog/ai-training.jpg',
      date: '۱۴۰۲/۱۲/۱۵',
      readTime: '۱۲ دقیقه'
    },
    {
      id: 4,
      title: 'توسعه ربات‌های گفتگوی پیشرفته',
      excerpt: 'راهنمای پیشرفته ساخت ربات‌های گفتگوی هوشمند برای کسب و کارها',
      category: 'chatbots',
      image: '/blog/chatbots.jpg',
      date: '۱۴۰۲/۱۲/۱۰',
      readTime: '۱۵ دقیقه'
    }
  ];

  const categories = [
    { id: 'all', label: 'همه مقالات', icon: '📚' },
    { id: 'rasa', label: 'توسعه رسا', icon: '🤖' },
    { id: 'nlp', label: 'پردازش زبان', icon: '🔤' },
    { id: 'ai', label: 'هوش مصنوعی', icon: '🧠' },
    { id: 'chatbots', label: 'ربات‌های گفتگو', icon: '💬' }
  ];

  const filteredPosts = blogPosts.filter(
    post => activeCategory === 'all' || post.category === activeCategory
  );

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0c1525] via-[#0c1a2e] to-[#0f1f38]">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-[#57DCDA]/10 via-transparent to-[#3AADAB]/10" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #57DCDA 1px, transparent 1px),
                linear-gradient(to bottom, #57DCDA 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
            }}
          />
        </div>

        {/* Floating Elements */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'linear-gradient(135deg, #57DCDA 0%, #3AADAB 100%)',
              borderRadius: '50%',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <motion.div 
        className="container relative z-10 px-4"
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
          <div className="inline-block relative mb-4">
            <motion.div
              className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[#57DCDA]/20 to-[#3AADAB]/20 blur-lg"
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
            <h2 className="relative text-4xl md:text-6xl font-display font-bold">
              <span className="bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                وبلاگ رسا
              </span>
            </h2>
          </div>
          <motion.p 
            className="text-xl text-gray-300/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            آخرین مقالات و اخبار در مورد توسعه اپلیکیشن‌های هوش مصنوعی
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`
                px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300
                flex items-center gap-2 backdrop-blur-sm
                ${activeCategory === category.id
                  ? 'bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] text-white shadow-lg shadow-[#57DCDA]/20'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:shadow-lg hover:shadow-[#57DCDA]/10'
                }
              `}
              onClick={() => setActiveCategory(category.id as typeof activeCategory)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <span className="text-lg">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          layout
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredPost(post.id)}
              onHoverEnd={() => setHoveredPost(null)}
            >
              {/* Glass Card Container */}
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                {/* Image Container */}
                <div className="relative w-full pb-[56.25%]">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: hoveredPost === post.id ? 1.1 : 1 
                    }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1525]/90 via-[#0c1525]/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-[#57DCDA]/20 text-[#57DCDA] px-3 py-1 rounded-full text-sm">
                      {categories.find(cat => cat.id === post.category)?.label}
                    </span>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#57DCDA] transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-gray-300 mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <motion.div
                    className="inline-flex items-center gap-2 text-[#57DCDA] font-medium"
                    initial={{ x: 0 }}
                    animate={{ 
                      x: hoveredPost === post.id ? 5 : 0 
                    }}
                  >
                    <span>اقرأ المزيد</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.div>
                </div>

                {/* Hover Effects */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#57DCDA]/0 rounded-2xl pointer-events-none"
                  animate={{ 
                    borderColor: hoveredPost === post.id ? 'rgba(87, 220, 218, 0.5)' : 'rgba(87, 220, 218, 0)'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">لا توجد مقالات</h3>
            <p className="text-gray-400">
              لم يتم العثور على مقالات في هذه الفئة. الرجاء تحديد فئة أخرى.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default BlogsSection; 