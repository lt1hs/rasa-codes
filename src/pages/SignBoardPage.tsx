import React from 'react';
import { motion } from 'framer-motion';
import { AuthGuard } from '../components/ui/AuthGuard';
import { AISignboardDesigner } from '../components/signboard/AISignboardDesigner';

const SignBoardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-secondary/95 to-secondary/50">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-[#57DCDA] via-transparent to-[#3AADAB]" />
        
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

      {/* Header Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-[#57DCDA]/10 to-[#3AADAB]/10 backdrop-blur-sm border border-[#57DCDA]/20">
              <span className="text-sm font-medium bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                طراح هوشمند تابلو
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              طراحی <span className="bg-gradient-to-r from-[#57DCDA] via-[#4ABEBC] to-[#3AADAB] bg-clip-text text-transparent">تابلوی</span> ایده‌آل
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300/80 max-w-3xl mx-auto font-light">
              با کمک هوش مصنوعی تابلوهای حرفه‌ای بسازید. روزانه ۴ پیش‌نمایش منحصربه‌فرد دریافت کنید و با تیم ما برای تحقق ایده‌تان ارتباط برقرار کنید.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="pb-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <AuthGuard>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <AISignboardDesigner />
            </motion.div>
          </AuthGuard>
        </div>
      </section>
    </div>
  );
};

export default SignBoardPage;
