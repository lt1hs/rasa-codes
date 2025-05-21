import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import FeaturesSection from '../components/sections/FeaturesSection';
import TechStackSection from '../components/sections/TechStackSection';
import AboutSection from '../components/sections/AboutSection';

const FeaturesPage = () => {
  return (
    <Layout>
      {/* Hero Banner */}
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
              ميزات <span className="gradient-text">متقدمة</span> للذكاء الاصطناعي
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              استكشف إمكانيات لا حدود لها مع منصتنا المتطورة وحلولنا المبتكرة في مجال الذكاء الاصطناعي
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a href="#features" className="btn btn-primary px-8">استكشف الميزات</a>
              <a href="/contact" className="btn btn-outline px-8">تواصل معنا</a>
            </div>
          </motion.div>
          
          {/* Decorative elements */}
          <motion.div 
            className="mt-16 relative h-16 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              animate={{ 
                y: [0, 40, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent top-[30px]"
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ 
                duration: 3.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </div>
      </section>
      
      {/* Feature details - reuse existing components */}
      <div id="features">
        <AboutSection />
        <FeaturesSection />
        <TechStackSection />
      </div>
      
      {/* CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary to-secondary-dark -z-10" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-5">
          <motion.div
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-[80px]"
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
            className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-[80px]"
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
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              هل أنت مستعد لاستخدام <span className="gradient-text">الذكاء الاصطناعي</span> في أعمالك؟
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              ابدأ رحلتك الآن واكتشف كيف يمكن للذكاء الاصطناعي تحويل مشروعك ورفع كفاءته
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <a href="/demo" className="btn btn-primary px-8 py-4">طلب عرض توضيحي</a>
              <a href="/pricing" className="btn btn-outline px-8 py-4">اطلع على الأسعار</a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FeaturesPage; 