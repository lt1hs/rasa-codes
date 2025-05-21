import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Placeholder from '../ui/Placeholder';

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#FF830180_1px,transparent_1px)] bg-[size:20px_20px] opacity-10" />
        <motion.div 
          className="absolute top-1/4 left-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse" as const,
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div 
          className="glass-card glow p-8 md:p-12 lg:p-16 rounded-3xl max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2 
                className="text-3xl md:text-4xl font-display font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                جاهز <span className="gradient-text">لتعزيز</span>
                <br />رحلة بحثك؟
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                انضم لأكثر من 10,000 باحث يستخدمون منصتنا لتحسين أبحاثهم والحصول على نتائج أفضل بوقت أقل.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link to="/signup" className="btn btn-primary">
                  ابدأ الآن مجاناً
                </Link>
                <Link to="/demo" className="btn btn-outline">
                  طلب عرض توضيحي
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.4,
                type: "spring",
                stiffness: 50 
              }}
              viewport={{ once: true }}
            >
              <div className="relative z-10 bg-secondary-dark/80 backdrop-blur-sm p-4 rounded-xl">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <Placeholder 
                    width={600} 
                    height={450} 
                    text="لوحة تحكم تكنوراسا"
                    bgColor="var(--secondary-dark)" 
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/30 rounded-full blur-lg" />
              <div className="absolute bottom-0 right-4 transform translate-y-1/3 w-40 h-40 bg-accent/20 rounded-full blur-xl -z-10" />
              
              {/* Stats card */}
              <motion.div 
                className="absolute -bottom-6 -left-6 glass-card p-4 rounded-lg shadow-lg flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col items-center justify-center w-12 h-12 bg-primary/20 rounded-full">
                  <span className="text-xl font-bold text-primary">2x</span>
                </div>
                <div>
                  <h4 className="font-medium">سرعة مضاعفة</h4>
                  <p className="text-sm text-gray-400">في انجاز المشاريع البحثية</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection; 