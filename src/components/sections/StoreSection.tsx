import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const StoreSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const featuredProducts = [
    {
      id: 'ai-assistant',
      title: 'دستیار هوش مصنوعی راسا',
      description: 'هوش مصنوعی شخصی که زندگی شما را آسان‌تر می‌کند',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop',
      price: '۲,۵۰۰,۰۰۰ تومان',
      color: '#57DCDA'
    },
    {
      id: 'smart-home',
      title: 'سیستم خانه هوشمند',
      description: 'کنترل کامل خانه با یک لمس',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop',
      price: '۱۵,۰۰۰,۰۰۰ تومان',
      color: '#3AADAB'
    },
    {
      id: 'analytics-platform',
      title: 'پلتفرم تحلیل داده',
      description: 'تحلیل پیشرفته داده‌های کسب‌وکار',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
      price: '۸,۰۰۰,۰۰۰ تومان',
      color: '#2A8A88'
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-secondary via-secondary/95 to-secondary/50"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #57DCDA 0.5px, transparent 0.5px),
              linear-gradient(to bottom, #57DCDA 0.5px, transparent 0.5px)
            `,
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#57DCDA] opacity-[0.02] rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3AADAB] opacity-[0.02] rounded-full blur-[128px] animate-pulse" />
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
            <span className="text-sm font-medium bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">فروشگاه راسا</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            محصولات <span className="bg-gradient-to-r from-[#57DCDA] via-[#4ABEBC] to-[#3AADAB] bg-clip-text text-transparent">انقلابی</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300/80 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            محصولاتی که آینده را امروز به شما می‌آورند
          </motion.p>
        </div>

        {/* Featured Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/store/${product.id}`}>
                <motion.div 
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10 group-hover:border-[#57DCDA]/30 transition-all duration-500"
                  whileHover={{ y: -8 }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${product.color}08, transparent)`
                    }}
                  />
                  
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[#57DCDA] transition-colors duration-300">
                      {product.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#57DCDA]">
                        {product.price}
                      </span>
                      <motion.span 
                        className="text-xs text-gray-400 group-hover:text-[#57DCDA] transition-colors"
                        whileHover={{ x: 3 }}
                      >
                        مشاهده →
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/store">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-xl text-white font-medium hover:shadow-lg hover:shadow-[#57DCDA]/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              مشاهده همه محصولات
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StoreSection;
