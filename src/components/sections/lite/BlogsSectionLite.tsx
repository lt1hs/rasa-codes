import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useOptimizedAnimation, optimizedAnimations, createStaggeredAnimation } from '../../../hooks/useOptimizedAnimation';
import OptimizedImage from '../../ui/OptimizedImage';

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  slug: string;
  readTime: string;
}

const BlogsSectionLite = () => {
  const blogPosts: BlogPost[] = [
    {
      title: 'آینده روشنایی هوشمند',
      excerpt: 'بررسی تکنولوژی‌های نوین در صنعت روشنایی هوشمند و تاثیر آن بر زندگی روزمره. چگونه LED های هوشمند می‌توانند مصرف انرژی را کاهش دهند؟',
      image: '/images/blog/smart-lighting-future.jpg',
      date: '۱۴۰۲/۱۲/۱۵',
      author: 'علی محمدی',
      category: 'تکنولوژی',
      slug: 'future-of-smart-lighting',
      readTime: '۵ دقیقه'
    },
    {
      title: 'امنیت در دنیای دیجیتال',
      excerpt: 'راهکارهای حفظ امنیت در استفاده از محصولات هوشمند و اینترنت اشیاء. چگونه از اطلاعات خود در برابر تهدیدات سایبری محافظت کنیم؟',
      image: '/images/blog/digital-security.jpg',
      date: '۱۴۰۲/۱۲/۱۰',
      author: 'سارا احمدی',
      category: 'امنیت',
      slug: 'digital-security',
      readTime: '۷ دقیقه'
    },
    {
      title: 'تحول در تبلیغات شهری',
      excerpt: 'چگونه تابلوهای LED دیجیتال صنعت تبلیغات شهری را متحول کرده‌اند؟ بررسی مزایا و چالش‌های استفاده از تابلوهای هوشمند در فضای شهری.',
      image: '/images/blog/digital-advertising.jpg',
      date: '۱۴۰۲/۱۲/۰۵',
      author: 'رضا کریمی',
      category: 'تبلیغات',
      slug: 'digital-advertising-revolution',
      readTime: '۴ دقیقه'
    }
  ];

  const containerAnimation = useOptimizedAnimation(optimizedAnimations.fadeIn);
  const staggerAnimation = createStaggeredAnimation(optimizedAnimations.slideUp, 0.1);

  const slideUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-dark via-secondary to-secondary-dark opacity-95" />
        <OptimizedImage
          src="/images/patterns/circuit-board.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-5 mix-blend-overlay"
          width={1920}
          height={1080}
        />
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          {...containerAnimation}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-display font-bold mb-6"
            variants={slideUpVariant}
          >
            آخرین <span className="gradient-text">مقالات</span> ما
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400"
            variants={slideUpVariant}
          >
            جدیدترین اخبار و مقالات در حوزه تکنولوژی و محصولات هوشمند
          </motion.p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          {...staggerAnimation}
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              className="glass-card rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-500 group"
              variants={slideUpVariant}
            >
              {/* Image */}
              <div className="relative h-48 rounded-t-2xl overflow-hidden">
                <OptimizedImage
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm">{post.author}</span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    ادامه مطلب
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-12"
          variants={slideUpVariant}
        >
          <Link
            to="/blog"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg"
          >
            مشاهده همه مقالات
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogsSectionLite; 