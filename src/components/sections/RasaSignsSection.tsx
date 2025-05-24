import { motion } from 'framer-motion';
import React from 'react';

const RasaSignsSection: React.FC = () => {
  return (
    <section className="relative min-h-screen py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="container">
        {/* Text Content */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            تابلو <span className="gradient-text">رسا</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            طراحی و تولید تابلوهای تبلیغاتی مدرن و خلاقانه با تکنولوژی پیشرفته
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Model Display */}
          <motion.div
            className="relative h-[600px] glass-card rounded-2xl border border-white/10 overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <iframe 
              src='https://my.spline.design/monsterdrink-iW9nO2gfWyOovYUWkk3dI96I/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              title="Rasa Signs 3D Model"
            />
          </motion.div>

          {/* Features List */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Feature 1 */}
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">طراحی خلاقانه</h3>
                  <p className="text-gray-400">ترکیب هنر و تکنولوژی برای خلق تابلوهای منحصر به فرد و چشم‌نواز</p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">تکنولوژی LED پیشرفته</h3>
                  <p className="text-gray-400">استفاده از جدیدترین تکنولوژی‌های LED با مصرف انرژی بهینه و عمر طولانی</p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">کیفیت ساخت بی‌نظیر</h3>
                  <p className="text-gray-400">استفاده از مواد اولیه مرغوب و تکنیک‌های پیشرفته در ساخت و نصب</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.a
              href="/contact"
              className="btn btn-primary px-8 py-4 text-lg inline-flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>درخواست مشاوره رایگان</span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RasaSignsSection; 