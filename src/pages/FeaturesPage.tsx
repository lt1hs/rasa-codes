import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import ParticleBackground from '../components/ui/ParticleBackground';
import SectionWrapper from '../components/ui/SectionWrapper';
import ServiceCard from '../components/ui/ServiceCard';
import RasaSignsSection from '../components/sections/RasaSignsSection';

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: 'primary' | 'accent';
}

const services: Service[] = [
  {
    id: 1,
    title: 'طراحی و نورپردازی حرفه‌ای',
    subtitle: 'خلق فضاهایی الهام‌بخش با مهندسی نور',
    description: 'طراحی روشنایی تخصصی برای فضاهای مسکونی، تجاری و شهری با تأکید بر زیبایی‌شناسی، عملکرد و تجربه بصری.',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    color: 'primary'
  },
  {
    id: 2,
    title: 'هوشمندسازی ساختمان و فضاهای مدرن',
    subtitle: 'زندگی هوشمند، راحتی بی‌نهایت',
    description: 'طراحی و اجرای سیستم‌های خانه هوشمند با کنترل صوتی، روشنایی خودکار و مدیریت انرژی برای آینده‌ای متصل و مدرن.',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    color: 'accent'
  },
  {
    id: 3,
    title: 'طراحی و ساخت تابلوهای تبلیغاتی',
    subtitle: 'برند شما، درخشان‌تر از همیشه',
    description: 'طراحی و اجرای تابلوهای تبلیغاتی مدرن، هنری و اثرگذار برای فضاهای شهری، تجاری و نمایشگاهی در ایران و عراق.',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    color: 'primary'
  },
  {
    id: 4,
    title: 'مهندسی محصولات الکترونیکی خاص',
    subtitle: 'از ایده تا محصول نهایی، سفارشی‌سازی کامل',
    description: 'طراحی و تولید قطعات و تجهیزات الکترونیکی با قالب‌سازی اختصاصی برای پروژه‌های صنعتی، خانگی و تجاری.',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    color: 'accent'
  },
  {
    id: 5,
    title: 'فناوری انرژی خورشیدی و سیستم‌های پایدار',
    subtitle: 'قدرت خورشید در خدمت آینده پاک‌تر',
    description: 'راهکارهای هوشمند برای استفاده از انرژی‌های تجدیدپذیر و بهینه‌سازی مصرف انرژی در پروژه‌های مختلف.',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    color: 'primary'
  },
  {
    id: 6,
    title: 'طراحی سه‌بعدی و واقعیت افزوده',
    subtitle: 'ایده‌ها را قبل از اجرا لمس کنید',
    description: 'مدل‌سازی سه‌بعدی پیشرفته و طراحی تعاملی با استفاده از فناوری VR/AR برای ارائه تجربه‌ای واقع‌گرایانه پیش از اجرا.',
    icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
    color: 'accent'
  }
];

const FeaturesPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center pt-20 pb-16 relative overflow-hidden">
        <ParticleBackground />
        
        <div className="container relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-8">
              خدمات <span className="gradient-text">رسا</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              پیوند فناوری با خلاقیت
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              در رسا، هر خدمت ترکیبی است از مهندسی، طراحی و نوآوری. ما راه‌حل‌هایی ارائه می‌دهیم که تکنولوژی را در خدمت زیبایی و کارایی قرار می‌دهند.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <SectionWrapper className="bg-secondary-dark">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              {...service}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Rasa Signs Section */}
      <RasaSignsSection />

      {/* Call to Action */}
      <SectionWrapper>
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
            آماده همکاری با <span className="gradient-text">شما</span> هستیم
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            برای دریافت مشاوره رایگان و آشنایی با خدمات ما با ما تماس بگیرید
          </p>
          <motion.a
            href="/contact"
            className="btn btn-primary px-12 py-4 text-lg inline-flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>تماس با ما</span>
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
      </SectionWrapper>
    </Layout>
  );
};

export default FeaturesPage; 