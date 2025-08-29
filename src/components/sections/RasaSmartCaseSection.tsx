import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const RasaSmartCaseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  const handleModelLoad = () => {
    setIsModelLoading(false);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-secondary via-secondary/95 to-secondary"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #57DCDA 0.5px, transparent 0.5px),
              linear-gradient(to bottom, #57DCDA 0.5px, transparent 0.5px)
            `,
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
          }}
        />

        {/* Ambient Light Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#57DCDA] opacity-[0.03] rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3AADAB] opacity-[0.03] rounded-full blur-[128px] animate-pulse" />
      </div>

      <motion.div
        className="container mx-auto px-4 max-w-6xl"
        style={{ y, opacity, scale }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-[#57DCDA]/10 to-[#3AADAB]/10 backdrop-blur-sm border border-[#57DCDA]/20"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
              محصول جدید
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-[#57DCDA] via-[#4ABEBC] to-[#3AADAB] bg-clip-text text-transparent">
              RASA SMART CASE
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300/80 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            کیس هوشمند راسا، ترکیبی از تکنولوژی و طراحی مدرن
          </motion.p>
        </div>

        {/* 3D Model Display */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm border border-white/10">
          {isModelLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 backdrop-blur-sm z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#57DCDA]/20 border-t-[#57DCDA] rounded-full animate-spin" />
                <p className="text-[#57DCDA]">در حال بارگذاری مدل سه بعدی...</p>
              </div>
            </div>
          )}
          
          <div style={{ width: '100%', height: '100%', minHeight: '500px' }}>
            <iframe
              src="https://my.spline.design/core-PMDTiwTOFRtL3fj32ETQ5u7o/"
              frameBorder="0"
              width="100%"
              height="100%"
              style={{ minHeight: '500px' }}
              title="Rasa Smart Case 3D Model"
              onLoad={handleModelLoad}
            />
          </div>
          
          {!isModelLoading && (
            <>
              {/* Interactive Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Interaction Hint */}
              <motion.div 
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                برای مشاهده بهتر، ماوس را حرکت دهید
              </motion.div>
            </>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              title: 'طراحی هوشمند',
              description: 'طراحی مدرن و کاربردی با استفاده از مواد با کیفیت و فناوری پیشرفته',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              ),
            },
            {
              title: 'امنیت پیشرفته',
              description: 'سیستم قفل هوشمند با رمزنگاری پیشرفته و کنترل دسترسی چند مرحله‌ای',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
            },
            {
              title: 'اتصال هوشمند',
              description: 'قابلیت اتصال به اپلیکیشن موبایل برای کنترل و مدیریت از راه دور',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              ),
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group p-6 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:bg-white/[0.05] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-12 h-12 mb-4 rounded-lg bg-[#57DCDA]/10 flex items-center justify-center text-[#57DCDA] group-hover:bg-[#57DCDA]/20 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#57DCDA] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-300/80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] text-white font-medium hover:opacity-90 transition-opacity duration-300"
          >
            سفارش محصول
            <svg
              className="w-5 h-5 transform rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default RasaSmartCaseSection; 