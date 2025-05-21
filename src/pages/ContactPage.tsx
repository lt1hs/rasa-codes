import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    subject: 'استفسار عام'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        subject: 'استفسار عام'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] opacity-50" />
        </div>
        
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              تواصل <span className="gradient-text">معنا</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              نحن هنا للإجابة على استفساراتك ومساعدتك في اختيار الحل المناسب لاحتياجاتك
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 relative">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="glass-card relative p-8 rounded-2xl border border-white/10 overflow-hidden">
                {/* Background elements */}
                <div className="absolute -z-10 inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
                </div>
                
                <h2 className="text-2xl font-display font-semibold mb-6">أرسل رسالة</h2>
                
                {submitted ? (
                  <motion.div
                    className="bg-primary/20 text-primary p-4 rounded-lg border border-primary/30 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    تم إرسال رسالتك بنجاح. سنقوم بالتواصل معك قريبًا.
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">الاسم</label>
                        <motion.div
                          whileFocus={{ scale: 1.01 }}
                          className="relative"
                        >
                          <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-secondary-dark border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition"
                            placeholder="أدخل اسمك"
                          />
                          <motion.div 
                            className="absolute inset-0 -z-10 opacity-0 group-focus-within:opacity-100 border border-primary/50 rounded-lg blur-[2px]"
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                        <motion.div
                          whileFocus={{ scale: 1.01 }}
                          className="relative"
                        >
                          <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-secondary-dark border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition"
                            placeholder="example@company.com"
                          />
                        </motion.div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">الشركة (اختياري)</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary-dark border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition"
                        placeholder="اسم شركتك"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">الموضوع</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary-dark border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition"
                      >
                        <option value="استفسار عام">استفسار عام</option>
                        <option value="الدعم الفني">الدعم الفني</option>
                        <option value="المبيعات">المبيعات</option>
                        <option value="فرص العمل">فرص العمل</option>
                        <option value="أخرى">أخرى</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">الرسالة</label>
                      <textarea
                        required
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 bg-secondary-dark border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition"
                        placeholder="اكتب رسالتك هنا..."
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="btn btn-primary w-full py-4 relative overflow-hidden group"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                    >
                      <span className="relative z-10">
                        {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                      </span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-l from-primary to-accent opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="glass-card p-8 rounded-2xl border border-white/10 h-full">
                <h2 className="text-2xl font-display font-semibold mb-6">معلومات التواصل</h2>
                
                <div className="space-y-8">
                  {[
                    {
                      icon: 'location',
                      title: 'العنوان',
                      content: 'الرياض، المملكة العربية السعودية<br/>حي التخصصي، شارع التحلية'
                    },
                    {
                      icon: 'email',
                      title: 'البريد الإلكتروني',
                      content: 'info@techno-rasa.com<br/>support@techno-rasa.com'
                    },
                    {
                      icon: 'phone',
                      title: 'الهاتف',
                      content: '+966 12 345 6789<br/>+966 12 345 6780'
                    },
                    {
                      icon: 'time',
                      title: 'ساعات العمل',
                      content: 'الأحد - الخميس: 9:00 ص - 5:00 م<br/>الجمعة - السبت: مغلق'
                    }
                  ].map((item, i) => (
                    <motion.div 
                      key={item.title}
                      className="flex gap-4 items-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
                        {item.icon === 'location' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                        {item.icon === 'email' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                        {item.icon === 'phone' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        )}
                        {item.icon === 'time' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: item.content }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Social media links */}
                <div className="mt-10">
                  <h3 className="text-lg font-semibold mb-4">تابعنا على</h3>
                  
                  <div className="flex gap-4">
                    {[
                      { name: 'twitter', icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
                      { name: 'linkedin', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' },
                      { name: 'facebook', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                      { name: 'instagram', icon: 'M17.5 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM6 12a6 6 0 1 1 12 0 6 6 0 0 1-12 0zm6-8a8 8 0 1 0 0 16 8 8 0 0 0 0-16z' },
                    ].map((social, i) => (
                      <motion.a
                        key={social.name}
                        href={`https://${social.name}.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-primary/20 hover:text-white transition-all"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + (i * 0.1) }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Map Section */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden">
              <h2 className="text-2xl font-display font-semibold mb-6">موقعنا على الخريطة</h2>
              
              <div className="aspect-[16/9] bg-secondary-dark rounded-lg overflow-hidden relative">
                {/* Placeholder for map - in a real app, you would integrate Google Maps or similar */}
                <div className="absolute inset-0 bg-secondary-dark flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-400">هنا ستظهر الخريطة التفاعلية</p>
                  </div>
                </div>
                
                {/* Grid overlay for 3D effect */}
                <div 
                  className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #FF8301 1px, transparent 1px), linear-gradient(to bottom, #FF8301 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                  }}
                />
                
                {/* Location marker */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 space-y-1 flex flex-col items-center">
                    <div className="w-1 h-3 bg-primary rounded-full" />
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <div className="w-3 h-3 bg-primary rounded-full opacity-50" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary to-secondary-dark -z-10" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center glass-card p-10 rounded-2xl border border-white/10">
            <motion.h2 
              className="text-3xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              هل لديك <span className="gradient-text">أسئلة أخرى</span>؟
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              راجع صفحة الأسئلة الشائعة للحصول على إجابات لمعظم الاستفسارات، أو تواصل معنا مباشرة
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <a href="/faq" className="btn btn-primary px-8 py-4">الأسئلة الشائعة</a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage; 