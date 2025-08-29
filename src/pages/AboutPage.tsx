import { motion, useScroll, useTransform } from 'framer-motion';
// import Layout from '../components/layout/Layout';
import ParticleBackground from '../components/ui/ParticleBackground';
import SectionWrapper from '../components/ui/SectionWrapper';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const timeline: TimelineItem[] = [
  {
    year: '۱۳۹۶',
    title: 'آغاز فعالیت رسا',
    description: 'شروع فعالیت در حوزه الکترونیک و نورپردازی با تیمی کوچک اما متخصص'
  },
  {
    year: '۱۳۹۷',
    title: 'گسترش خدمات',
    description: 'ورود به حوزه هوشمندسازی و اجرای اولین پروژه‌های تجاری موفق'
  },
  {
    year: '۱۳۹۸',
    title: 'توسعه بین‌المللی',
    description: 'آغاز فعالیت در بازار عراق و اجرای پروژه‌های بزرگ تبلیغاتی'
  },
  {
    year: '۱۳۹۹',
    title: 'نوآوری در تکنولوژی',
    description: 'توسعه راهکارهای هوشمند و پیاده‌سازی سیستم‌های مدیریت انرژی'
  },
  {
    year: '۱۴۰۰',
    title: 'گسترش تیم',
    description: 'جذب نیروهای متخصص جدید و افزایش ظرفیت اجرای پروژه‌ها'
  },
  {
    year: '۱۴۰۱',
    title: 'دانش‌بنیان شدن',
    description: 'کسب مجوز دانش‌بنیان و شروع همکاری با مراکز تحقیقاتی'
  },
  {
    year: '۱۴۰۲',
    title: 'توسعه محصولات',
    description: 'طراحی و تولید محصولات جدید با تمرکز بر نیازهای بازار'
  }
];

interface Achievement {
  number: string;
  title: string;
  description: string;
}

const achievements: Achievement[] = [
  {
    number: '+۱۰۰',
    title: 'پروژه موفق',
    description: 'اجرای بیش از صد پروژه موفق در ایران و عراق'
  },
  {
    number: '+۵۰',
    title: 'مشتری راضی',
    description: 'همکاری با بیش از پنجاه سازمان و شرکت معتبر'
  },
  {
    number: '+۲۰',
    title: 'متخصص خبره',
    description: 'تیمی متشکل از متخصصان با تجربه در حوزه‌های مختلف'
  },
  {
    number: '+۵',
    title: 'سال تجربه',
    description: 'بیش از پنج سال تجربه در صنعت تکنولوژی و نوآوری'
  }
];

const AboutPage = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'احمد الشمری',
      role: 'بنیانگذار و مدیرعامل',
      bio: 'متخصص هوش مصنوعی با بیش از 15 سال تجربه در رهبری شرکت‌های فناوری',
      image: 'https://i.pravatar.cc/300?img=11'
    },
    {
      name: 'ساره العبدالله',
      role: 'مدیر فناوری',
      bio: 'متخصص در توسعه الگوریتم‌های یادگیری ماشین، دارای مدرک دکترا از دانشگاه استنفورد',
      image: 'https://i.pravatar.cc/300?img=5'
    },
    {
      name: 'محمد القحطانی',
      role: 'رئیس بخش تحقیق و توسعه',
      bio: 'بیش از 10 سال تجربه در توسعه مدل‌های هوش مصنوعی و راه‌حل‌های تحلیل داده',
      image: 'https://i.pravatar.cc/300?img=3'
    },
    {
      name: 'نوره الدوسری',
      role: 'مدیر محصولات',
      bio: 'متخصص در توسعه محصولات نوآورانه با تمرکز بر تجربه کاربری و عملکرد بالا',
      image: 'https://i.pravatar.cc/300?img=9'
    }
  ];

  // Company milestones
  const milestones = [
    {
      year: '2018',
      title: 'تأسیس شرکت',
      description: 'ما به عنوان یک استارتاپ کوچک با دیدگاهی بزرگ برای تغییر نحوه تعامل شرکت‌ها با داده‌ها شروع کردیم.'
    },
    {
      year: '2020',
      title: 'راه‌اندازی اولین پلتفرم',
      description: 'ما اولین پلتفرم تحلیل داده مبتنی بر هوش مصنوعی را راه‌اندازی کردیم که انقلابی در این بخش ایجاد کرد.'
    },
    {
      year: '2021',
      title: 'توسعه منطقه‌ای ما',
      description: 'ما دفاتری در دبی و ریاض افتتاح کردیم و دامنه خدمات خود را در منطقه خاورمیانه گسترش دادیم.'
    },
    {
      year: '2022',
      title: 'دور بزرگ تامین مالی',
      description: 'ما 50 میلیون دلار سرمایه برای توسعه فناوری‌های جدید و گسترش تیم خود دریافت کردیم.'
    },
    {
      year: '2023',
      title: 'راه‌اندازی نسل جدید',
      description: 'ما نسل جدید پلتفرم خود را با ویژگی‌های پیشرفته و عملکرد بی‌سابقه راه‌اندازی کردیم.'
    }
  ];

  return (
    <>
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
              درباره <span className="gradient-text">رسا</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              مهندسی آینده با نگاهی نو
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              رسا یک شرکت دانش‌بنیان فعال در حوزه الکترونیک، نورپردازی و برندینگ دیجیتال است که از سال ۱۳۹۶ فعالیت خود را آغاز کرده. با ترکیب خلاقیت، تکنولوژی و تجربه، پروژه‌هایی متمایز و کارآمد را برای مشتریان خود طراحی و اجرا می‌کنیم.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <SectionWrapper className="bg-secondary-dark">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision */}
          <motion.div
            className="glass-card p-8 rounded-2xl border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h2 className="text-3xl font-display font-bold mb-4">چشم‌انداز ما</h2>
            <p className="text-gray-400 leading-relaxed">
              رسا در مسیر تبدیل‌شدن به یکی از پیشروترین شرکت‌های مهندسی فناوری در خاورمیانه حرکت می‌کند؛ با هدف ارائه راهکارهایی هوشمند، پایدار و تحول‌ساز در صنعت و زندگی روزمره.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            className="glass-card p-8 rounded-2xl border border-white/10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-3xl font-display font-bold mb-4">ماموریت ما</h2>
            <p className="text-gray-400 leading-relaxed">
              ارائه خدمات نوآورانه در حوزه الکترونیک، نورپردازی، طراحی سه‌بعدی، هوشمندسازی و تبلیغات محیطی با تمرکز بر کیفیت، خلاقیت و رضایت کامل مشتریان.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper>
        <motion.div
          className="max-w-4xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
            مسیر <span className="gradient-text">پیشرفت</span> ما
          </h2>
          <p className="text-lg text-gray-400">
            نگاهی به مهم‌ترین دستاوردها و نقاط عطف رسا از ابتدای فعالیت
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-white/10" />

          {/* Timeline Items */}
          <div className="relative">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className={`flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="glass-card p-6 rounded-xl border border-white/10">
                    <span className="text-primary text-lg font-semibold">{item.year}</span>
                    <h3 className="text-xl font-semibold mt-2 mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>

                {/* Timeline Point */}
                <div className="relative flex-shrink-0 w-4">
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full" />
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary/20 rounded-full animate-ping" />
                </div>

                {/* Empty Space for Layout */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Call to Action */}
      <SectionWrapper className="bg-secondary-dark">
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
            برای آشنایی بیشتر با خدمات و محصولات ما با ما در تماس باشید
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
    </>
  );
};

export default AboutPage;
