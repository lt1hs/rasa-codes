import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: string;
  category: string;
  featured: boolean;
  story: string;
  color: string;
}

const StorePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0);
  const mouseY = useSpring(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const products: Product[] = [
    {
      id: 'ai-assistant',
      title: 'دستیار هوش مصنوعی راسا',
      subtitle: 'هوش مصنوعی شخصی شما',
      description: 'دستیار هوشمند که زندگی شما را آسان‌تر می‌کند',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
      price: '۲,۵۰۰,۰۰۰ تومان',
      category: 'ai',
      featured: true,
      story: 'داستان خلق دستیاری که می‌تواند زندگی شما را متحول کند',
      color: '#57DCDA'
    },
    {
      id: 'smart-home',
      title: 'سیستم خانه هوشمند',
      subtitle: 'خانه‌ای از آینده',
      description: 'کنترل کامل خانه با یک لمس',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
      price: '۱۵,۰۰۰,۰۰۰ تومان',
      category: 'iot',
      featured: true,
      story: 'تجربه زندگی در خانه‌ای که با شما فکر می‌کند',
      color: '#3AADAB'
    },
    {
      id: 'analytics-platform',
      title: 'پلتفرم تحلیل داده',
      subtitle: 'قدرت داده در دستان شما',
      description: 'تحلیل پیشرفته داده‌های کسب‌وکار',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      price: '۸,۰۰۰,۰۰۰ تومان',
      category: 'analytics',
      featured: false,
      story: 'چگونه داده‌ها می‌توانند آینده کسب‌وکار شما را بسازند',
      color: '#2A8A88'
    },
    {
      id: 'mobile-app',
      title: 'اپلیکیشن موبایل راسا',
      subtitle: 'همه چیز در جیب شما',
      description: 'دسترسی به تمام خدمات از موبایل',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
      price: '۱,۲۰۰,۰۰۰ تومان',
      category: 'mobile',
      featured: false,
      story: 'اپلیکیشنی که تجربه کاربری را بازتعریف می‌کند',
      color: '#1F6F6E'
    }
  ];

  const categories = [
    { id: 'all', name: 'همه محصولات', icon: '🎯' },
    { id: 'ai', name: 'هوش مصنوعی', icon: '🤖' },
    { id: 'iot', name: 'اینترنت اشیا', icon: '🏠' },
    { id: 'analytics', name: 'تحلیل داده', icon: '📊' },
    { id: 'mobile', name: 'موبایل', icon: '📱' }
  ];

  const filteredProducts = products.filter(
    product => activeCategory === 'all' || product.category === activeCategory
  );

  const featuredProducts = products.filter(product => product.featured);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-secondary via-secondary/95 to-secondary/50">
      {/* Simple Working Background */}
      <div className="fixed inset-0 -z-10">
        {/* Static Gradient */}
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-[#57DCDA] via-transparent to-[#3AADAB]" />
        
        {/* Simple Grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #57DCDA 1px, transparent 1px),
              linear-gradient(to bottom, #57DCDA 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Simple Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#57DCDA] opacity-10 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${25 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-4 py-32 max-w-7xl"
        style={{ y, opacity }}
      >
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-[#57DCDA]/10 to-[#3AADAB]/10 backdrop-blur-sm border border-[#57DCDA]/20"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">فروشگاه راسا</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            محصولات <span className="bg-gradient-to-r from-[#57DCDA] via-[#4ABEBC] to-[#3AADAB] bg-clip-text text-transparent">انقلابی</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300/80 max-w-4xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            هر محصول داستانی دارد. هر داستان تجربه‌ای منحصربه‌فرد خلق می‌کند
          </motion.p>
        </div>

        {/* Featured Products */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            محصولات <span className="text-[#57DCDA]">ویژه</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
              >
                <Link to={`/store/${product.id}`}>
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 group-hover:border-[#57DCDA]/30 transition-all duration-700">
                    {/* Animated Border Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: `linear-gradient(45deg, ${product.color}20, transparent, ${product.color}10)`,
                        filter: 'blur(2px)'
                      }}
                    />
                    
                    {/* Floating Elements on Hover */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            background: product.color,
                            left: `${20 + i * 15}%`,
                            top: `${10 + i * 10}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.3, 1],
                          }}
                          transition={{
                            duration: 2 + i * 0.2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </motion.div>
                    
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {/* Image with Parallax Effect */}
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Animated Overlay */}
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(135deg, ${product.color}00, ${product.color}20, transparent)`
                          }}
                          animate={{
                            opacity: hoveredProduct === product.id ? 0.8 : 0.3,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Content with Advanced Animations */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: hoveredProduct === product.id ? 1 : 0.9,
                            y: hoveredProduct === product.id ? 0 : 10
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.span 
                            className="text-sm font-medium mb-2 block"
                            style={{ color: product.color }}
                            animate={{
                              textShadow: hoveredProduct === product.id 
                                ? `0 0 20px ${product.color}50` 
                                : 'none'
                            }}
                          >
                            {product.subtitle}
                          </motion.span>
                          
                          <motion.h3 
                            className="text-2xl md:text-3xl font-bold text-white mb-3 transition-colors duration-300"
                            whileHover={{ 
                              color: product.color,
                              textShadow: `0 0 30px ${product.color}80`
                            }}
                          >
                            {product.title}
                          </motion.h3>
                          
                          <p className="text-gray-200/90 text-base leading-relaxed mb-4">
                            {product.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <motion.span 
                              className="text-xl font-bold"
                              style={{ color: product.color }}
                              animate={{
                                scale: hoveredProduct === product.id ? 1.05 : 1,
                                textShadow: hoveredProduct === product.id 
                                  ? `0 0 15px ${product.color}60` 
                                  : 'none'
                              }}
                            >
                              {product.price}
                            </motion.span>
                            
                            <motion.div
                              className="flex items-center gap-2 text-white/80 group-hover:text-[#57DCDA] transition-colors"
                              whileHover={{ x: 8, scale: 1.05 }}
                              animate={{
                                textShadow: hoveredProduct === product.id 
                                  ? '0 0 10px rgba(87,220,218,0.5)' 
                                  : 'none'
                              }}
                            >
                              <span className="text-sm">مشاهده داستان</span>
                              <motion.svg 
                                className="w-4 h-4 transform rotate-180" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                                animate={{
                                  x: hoveredProduct === product.id ? 5 : 0,
                                }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </motion.svg>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Ripple Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl pointer-events-none"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: hoveredProduct === product.id ? 1.5 : 0,
                        opacity: hoveredProduct === product.id ? [0, 0.3, 0] : 0,
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      style={{
                        background: `radial-gradient(circle, ${product.color}30, transparent 70%)`,
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 ${
                activeCategory === category.id
                  ? 'text-white bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] shadow-lg shadow-[#57DCDA]/25'
                  : 'text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* All Products Grid with Enhanced Effects */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
              whileHover={{ y: -12 }}
            >
              <Link to={`/store/${product.id}`}>
                <motion.div 
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10 group-hover:border-[#57DCDA]/30 transition-all duration-500"
                >
                  {/* Animated Background Glow */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${product.color}08, transparent, ${product.color}05)`
                    }}
                  />
                  
                  {/* Floating Particles on Hover */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-60"
                        style={{
                          background: product.color,
                          left: `${25 + i * 20}%`,
                          top: `${20 + i * 15}%`,
                        }}
                        animate={{
                          y: [0, -15, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ filter: 'brightness(1.1)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(45deg, transparent 30%, ${product.color}20 50%, transparent 70%)`,
                      }}
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                  </div>
                  
                  <div className="p-6 relative">
                    {/* Animated Accent Line */}
                    <motion.div
                      className="absolute top-0 left-6 right-6 h-0.5 opacity-0 group-hover:opacity-100"
                      style={{ background: product.color }}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    <motion.span 
                      className="text-xs font-medium mb-2 block uppercase tracking-wider transition-colors duration-300"
                      style={{ color: product.color }}
                      animate={{
                        textShadow: '0 0 10px rgba(87,220,218,0.3)'
                      }}
                    >
                      {product.subtitle}
                    </motion.span>
                    
                    <motion.h3 
                      className="text-lg font-bold mb-2 group-hover:text-[#57DCDA] transition-colors duration-300"
                      whileHover={{
                        textShadow: '0 0 15px rgba(87,220,218,0.5)'
                      }}
                    >
                      {product.title}
                    </motion.h3>
                    
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <motion.span 
                        className="text-lg font-bold"
                        style={{ color: product.color }}
                        whileHover={{
                          scale: 1.05,
                          textShadow: `0 0 10px ${product.color}60`
                        }}
                      >
                        {product.price}
                      </motion.span>
                      
                      <motion.div
                        className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-[#57DCDA] transition-colors"
                        whileHover={{ x: 5, scale: 1.05 }}
                      >
                        <span>داستان محصول</span>
                        <motion.svg 
                          className="w-3 h-3 transform rotate-180" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                      </motion.div>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100"
                    style={{ background: product.color }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl font-bold mb-4">
              محصول مورد نظرتان را پیدا نکردید؟
            </h3>
            <p className="text-gray-400 mb-6">
              ما می‌توانیم محصولی منحصربه‌فرد برای شما بسازیم
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-xl text-white font-medium hover:shadow-lg hover:shadow-[#57DCDA]/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              درخواست محصول سفارشی
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StorePage;
