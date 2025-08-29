import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import Layout from '../components/layout/Layout';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '1');
  
  // This would typically come from an API or CMS, hardcoded for demo
  const post = {
    id: postId,
    title: 'هوش مصنوعی چگونه آینده کسب‌وکار را تغییر می‌دهد',
    content: `
      <p>در دنیایی با توسعه پرشتاب، فناوری‌های هوش مصنوعی به عنوان یک محرک اصلی تغییر در صنایع و بخش‌های مختلف برجسته می‌شوند. این مقاله به بررسی تأثیر هوش مصنوعی بر آینده کسب‌وکار و فرصت‌هایی که برای شرکت‌ها فراهم می‌کند، می‌پردازد.</p>
      
      <h2>بهبود کارایی عملیاتی</h2>
      <p>فناوری‌های هوش مصنوعی با خودکارسازی وظایف روتین و ساده‌سازی فرآیندها به بهبود کارایی عملیاتی شرکت‌ها کمک می‌کنند. ربات‌های نرم‌افزاری و سیستم‌های یادگیری ماشین می‌توانند وظایف تکراری را با دقت و سرعت بالاتری انجام دهند، که این امر کارکنان را برای تمرکز بر وظایف خلاقانه و با ارزش افزوده بالا آزاد می‌کند.</p>
      
      <h2>ارتقاء تجربه مشتری</h2>
      <p>فناوری‌های هوش مصنوعی فرصت‌های بی‌سابقه‌ای برای بهبود تجربه مشتری فراهم می‌کنند. با تحلیل داده‌های کاربران و الگوهای رفتاری، شرکت‌ها می‌توانند تجربیات شخصی‌سازی شده و توصیه‌های دقیقی ارائه دهند که نیازهای مشتریان را بهتر برآورده سازد. همچنین چت‌بات‌ها و دستیاران مجازی به ارائه پشتیبانی فوری و 24 ساعته کمک می‌کنند.</p>
      
      <h2>بهبود تصمیم‌گیری</h2>
      <p>فناوری‌های هوش مصنوعی به تبدیل داده‌های بزرگ به بینش‌های قابل اجرا کمک می‌کنند، که این امر تصمیم‌گیرندگان را قادر می‌سازد تا تصمیمات آگاهانه‌تر و مؤثرتری بگیرند. الگوریتم‌های یادگیری ماشین می‌توانند حجم عظیمی از داده‌ها را تحلیل کرده و الگوها و روندهایی را کشف کنند که ممکن است از چشم انسان پنهان بماند.</p>
      
      <h2>توسعه محصولات و خدمات جدید</h2>
      <p>هوش مصنوعی افق‌های جدیدی برای نوآوری و توسعه محصولات و خدماتی که قبلاً امکان‌پذیر نبودند، می‌گشاید. از خودروهای خودران گرفته تا سیستم‌های پیشرفته تشخیص پزشکی، این فناوری‌ها به شرکت‌ها امکان می‌دهند تا مدل‌های کسب‌وکار خود را بازتعریف کرده و ارزش جدیدی برای مشتریان ایجاد کنند.</p>
      
      <h2>چالش‌ها و ملاحظات اخلاقی</h2>
      <p>با فرصت‌های عظیمی که هوش مصنوعی فراهم می‌کند، چالش‌ها و ملاحظات اخلاقی مهمی نیز همراه است. این مسائل شامل حفظ حریم خصوصی و امنیت داده‌ها، سوگیری در الگوریتم‌ها، و تأثیر اتوماسیون بر مشاغل می‌شوند. شرکت‌ها باید با دقت با این مسائل برخورد کرده و رویکردی مسئولانه در به‌کارگیری فناوری‌های هوش مصنوعی اتخاذ کنند.</p>
      
      <h2>نتیجه‌گیری</h2>
      <p>در پایان مقاله، مشخص می‌شود که هوش مصنوعی به ایجاد تحولات ریشه‌ای در آینده کسب‌وکار ادامه خواهد داد. شرکت‌هایی که این فناوری‌ها را به کار می‌گیرند و به صورت استراتژیک در مدل‌های کسب‌وکار خود ادغام می‌کنند، در آینده موفق‌تر خواهند بود. با این حال، مهم است که این کار به شیوه‌ای مسئولانه و پایدار انجام شود که ملاحظات اخلاقی و اجتماعی را در نظر بگیرد.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/ai1/1200/600',
    category: { id: 'ai', name: 'هوش مصنوعی' },
    author: {
      name: 'احمد الشمری',
      role: 'بنیانگذار و مدیرعامل',
      image: 'https://i.pravatar.cc/300?img=11',
      bio: 'کارشناس هوش مصنوعی با بیش از 15 سال تجربه در رهبری شرکت‌های فناوری'
    },
    date: '15 ژوئن 2023',
    readTime: '7 دقیقه',
    tags: ['هوش مصنوعی', 'اتوماسیون کسب‌وکار', 'تحول دیجیتال', 'آینده']
  };
  
  // Related posts (in a real app, these would be fetched based on tags or categories)
  const relatedPosts = [
    {
      id: 5,
      title: 'یادگیری تقویتی: نسل بعدی هوش مصنوعی',
      excerpt: 'کاوش در نحوه استفاده از تکنیک‌های یادگیری تقویتی برای توسعه مدل‌های هوش مصنوعی پیشرفته‌تر و سازگارتر.',
      imageUrl: 'https://picsum.photos/seed/ai5/800/600',
      category: 'ai',
      author: 'احمد الشمری',
      date: '19 فوریه 2023',
    },
    {
      id: 2,
      title: 'تکنیک‌های یادگیری عمیق و کاربردهای آن در بینایی کامپیوتری',
      excerpt: 'با جدیدترین تکنیک‌ها در زمینه یادگیری عمیق و نحوه کاربرد آن‌ها در سیستم‌های بینایی کامپیوتری آشنا شوید.',
      imageUrl: 'https://picsum.photos/seed/ml2/800/600',
      category: 'ml',
      author: 'ساره العبدالله',
      date: '22 مه 2023',
    }
  ];

  return (
    <>
      {/* Hero Section with Featured Image */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] opacity-50" />
        </div>
        
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-400 mb-6">
              <Link to="/" className="hover:text-primary transition-colors">صفحه اصلی</Link>
              <span className="mx-2">/</span>
              <Link to="/blog" className="hover:text-primary transition-colors">وبلاگ</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-300">{post.category.name}</span>
            </div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {post.title}
            </motion.h1>
            
            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center">
                <img 
                  src={post.author.image} 
                  alt={post.author.name} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                />
                <div className="mr-3">
                  <span className="block text-sm font-medium">{post.author.name}</span>
                  <span className="block text-xs text-gray-400">{post.author.role}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <div className="ml-auto">
                <Link 
                  to={`/blog?category=${post.category.id}`} 
                  className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  {post.category.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Image */}
      <section className="relative mb-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="rounded-2xl overflow-hidden h-[500px] relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/50 to-transparent opacity-60" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Post Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <motion.div 
                className="prose prose-invert max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <h3 className="text-lg font-semibold mb-4">برچسب‌ها:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Link 
                      key={index}
                      to={`/blog?tag=${tag}`}
                      className="bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Share Section */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-lg font-semibold mb-4">مقاله را به اشتراک بگذارید:</h3>
                <div className="flex gap-3">
                  {['twitter', 'facebook', 'linkedin', 'whatsapp'].map((social) => (
                    <motion.a 
                      key={social}
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-primary/20 hover:text-white transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        {social === 'twitter' && (
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        )}
                        {social === 'facebook' && (
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        )}
                        {social === 'linkedin' && (
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        )}
                        {social === 'whatsapp' && (
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        )}
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Author Card */}
              <div className="glass-card p-6 rounded-xl border border-white/10 mb-8">
                <h3 className="text-lg font-semibold mb-4">درباره نویسنده</h3>
                <div className="flex items-center mb-4">
                  <img 
                    src={post.author.image} 
                    alt={post.author.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div className="mr-3">
                    <span className="block font-medium">{post.author.name}</span>
                    <span className="block text-sm text-gray-400">{post.author.role}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{post.author.bio}</p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Link 
                    to={`/author/${post.author.name.replace(/\s+/g, '-').toLowerCase()}`}
                    className="text-primary hover:text-primary-light transition-colors text-sm font-medium"
                  >
                    مشاهده همه مقالات نویسنده
                  </Link>
                </div>
              </div>
              
              {/* Related Posts */}
              <div className="glass-card p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold mb-4">مقالات مرتبط</h3>
                <div className="space-y-6">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="flex gap-4">
                      <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg">
                        <img 
                          src={relatedPost.imageUrl} 
                          alt={relatedPost.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <Link 
                          to={`/blog/${relatedPost.id}`} 
                          className="font-medium hover:text-primary transition-colors line-clamp-2 text-sm"
                        >
                          {relatedPost.title}
                        </Link>
                        <p className="text-gray-400 text-xs mt-1">{relatedPost.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link 
                    to="/blog"
                    className="text-primary hover:text-primary-light transition-colors text-sm font-medium"
                  >
                    مشاهده همه مقالات
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Next/Prev Post Navigation */}
      <section className="py-12 border-t border-white/10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/2">
              <span className="block text-sm text-gray-400 mb-2">مقاله قبلی</span>
              <Link 
                to={`/blog/${postId - 1 > 0 ? postId - 1 : 1}`} 
                className="flex items-center text-lg font-semibold hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                یادگیری تقویتی: نسل بعدی هوش مصنوعی
              </Link>
            </div>
            
            <div className="md:w-1/2 text-left">
              <span className="block text-sm text-gray-400 mb-2">مقاله بعدی</span>
              <Link 
                to={`/blog/${postId + 1}`} 
                className="flex items-center justify-end text-lg font-semibold hover:text-primary transition-colors"
              >
                تکنیک‌های یادگیری عمیق و کاربردهای آن در بینایی کامپیوتری
                <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPostPage;
