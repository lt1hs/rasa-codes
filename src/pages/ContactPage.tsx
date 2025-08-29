import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
// import Layout from '../components/layout/Layout';
import ParticleBackground from '../components/ui/ParticleBackground';
import SectionWrapper from '../components/ui/SectionWrapper';

// TypeScript interfaces
interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
  subject: string;
  phone?: string;
  preferredContact: 'email' | 'phone';
}

interface ContactInfo {
  icon: string;
  title: string;
  content: string;
  link?: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

const ContactPage = () => {
  // Enhanced form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    subject: 'استعلام عمومی',
    phone: '',
    preferredContact: 'email'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [activeField, setActiveField] = useState<keyof FormData | null>(null);
  
  // Animation controls
  const formControls = useAnimation();
  const successControls = useAnimation();
  
  // Form validation
  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'نام الزامی است';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'ایمیل الزامی است';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'ایمیل نامعتبر است';
    }
    
    if (formData.preferredContact === 'phone' && !formData.phone?.trim()) {
      errors.phone = 'شماره تلفن الزامی است';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'پیام الزامی است';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Enhanced form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      await formControls.start({
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await formControls.start({ opacity: 0, y: 20 });
      setSubmitted(true);
      await successControls.start({ opacity: 1, y: 0 });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        subject: 'استفسار عام',
        phone: '',
        preferredContact: 'email'
      });
      
      // Reset success message after delay
      setTimeout(() => {
        setSubmitted(false);
        formControls.set({ opacity: 1, y: 0 });
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle field focus
  const handleFieldFocus = (field: keyof FormData) => {
    setActiveField(field);
    // Clear error when field is focused
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle field blur
  const handleFieldBlur = () => {
    setActiveField(null);
  };

  // Contact information data
  const contactInfo: ContactInfo[] = [
    {
      icon: 'location',
      title: 'آدرس',
      content: 'ریاض، عربستان سعودی، محله التخصصی، خیابان التحلیه'
    },
    {
      icon: 'email',
      title: 'ایمیل',
      content: 'info@techno-rasa.com<br/>support@techno-rasa.com',
      link: 'mailto:info@techno-rasa.com'
    },
    {
      icon: 'phone',
      title: 'تلفن',
      content: '+966 12 345 6789<br/>+966 12 345 6780',
      link: 'tel:+966123456789'
    },
    {
      icon: 'time',
      title: 'ساعات کاری',
      content: 'یکشنبه - پنجشنبه: 9:00 صبح - 5:00 عصر<br/>جمعه - شنبه: تعطیل'
    }
  ];

  // Social media links
  const socialLinks: SocialLink[] = [
    {
      name: 'twitter',
      icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
      url: 'https://twitter.com/techno_rasa'
    },
    {
      name: 'linkedin',
      icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
      url: 'https://linkedin.com/company/techno-rasa'
    },
    {
      name: 'facebook',
      icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
      url: 'https://facebook.com/techno.rasa'
    },
    {
      name: 'instagram',
      icon: 'M17.5 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM6 12a6 6 0 1 1 12 0 6 6 0 0 1-12 0zm6-8a8 8 0 1 0 0 16 8 8 0 0 0 0-16z',
      url: 'https://instagram.com/techno.rasa'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center pt-20 pb-16 relative overflow-hidden">
        <ParticleBackground />
        
        <div className="container relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-8">
              تماس با <span className="gradient-text">رسا</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              ما آماده شنیدن ایده‌های شما هستیم
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <SectionWrapper className="bg-secondary-dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-display font-bold mb-8">
              راه‌های ارتباطی
            </h2>
            
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">آدرس</h3>
                  <p className="text-gray-400 leading-relaxed">
                    تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج نگار، طبقه ۱۲
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">تلفن تماس</h3>
                  <p className="text-gray-400">۰۲۱-۸۸۶۶۵۵۴۴</p>
                  <p className="text-gray-400">۰۹۱۲۳۴۵۶۷۸۹</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">ایمیل</h3>
                  <p className="text-gray-400">info@rasa.co.ir</p>
                  <p className="text-gray-400">support@rasa.co.ir</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">ساعات کاری</h3>
                  <p className="text-gray-400">شنبه تا چهارشنبه: ۹ صبح تا ۶ عصر</p>
                  <p className="text-gray-400">پنجشنبه: ۹ صبح تا ۲ بعد از ظهر</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl border border-white/10">
              <h2 className="text-3xl font-display font-bold mb-8">
                فرم تماس
              </h2>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="نام خود را وارد کنید"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="example@domain.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    شماره تماس
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    موضوع
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="موضوع پیام خود را وارد کنید"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    پیام
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="پیام خود را بنویسید..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full btn btn-primary py-4 text-lg relative overflow-hidden group disabled:opacity-50"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                {/* Status Messages */}
                {submitted && (
                  <motion.p
                    className="text-green-400 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Map Section */}
      <SectionWrapper>
        <div className="relative h-[500px] rounded-2xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.9627430847677!2d51.41053931561882!3d35.759570780175445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0728f1486ee3%3A0x7c4b9e9c46a30e6f!2z2KjYsdisINmG2q_Yp9ix!5e0!3m2!1sen!2s!4v1647856732553!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </SectionWrapper>
    </>
  );
};

export default ContactPage;
