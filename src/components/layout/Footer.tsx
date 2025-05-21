import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoVertical from '../../assets/main-r-logo-ver.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const footerLinks = [
    {
      title: 'شرکت',
      links: [
        { name: 'درباره ما', href: '/about' },
        { name: 'تیم ما', href: '/team' },
        { name: 'وبلاگ', href: '/blog' },
        { name: 'فرصت‌های شغلی', href: '/careers' },
      ],
    },
    {
      title: 'محصولات',
      links: [
        { name: 'ویژگی‌ها', href: '/features' },
        { name: 'قیمت‌ها', href: '/pricing' },
        { name: 'نظرات مشتریان', href: '/testimonials' },
        { name: 'گالری', href: '/gallery' },
      ],
    },
    {
      title: 'منابع',
      links: [
        { name: 'مستندات', href: '/docs' },
        { name: 'پروژه‌ها', href: '/projects' },
        { name: 'سوالات متداول', href: '/faq' },
        { name: 'اخبار', href: '/news' },
      ],
    },
    {
      title: 'پشتیبانی',
      links: [
        { name: 'تماس با ما', href: '/contact' },
        { name: 'مرکز راهنمایی', href: '/help' },
        { name: 'حریم خصوصی', href: '/privacy' },
        { name: 'شرایط و ضوابط', href: '/terms' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'twitter', href: '#' },
    { name: 'Facebook', icon: 'facebook', href: '#' },
    { name: 'Instagram', icon: 'instagram', href: '#' },
    { name: 'LinkedIn', icon: 'linkedin', href: '#' },
    { name: 'GitHub', icon: 'github', href: '#' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3,
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setSubscribed(true);
        setEmail('');
        
        // Reset subscribed state after 5 seconds
        setTimeout(() => {
          setSubscribed(false);
        }, 5000);
      }, 1000);
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary to-secondary-dark" />
      
      {/* Decorative grid */}
      <div 
        className="absolute inset-0 opacity-5 -z-5"
        style={{
          backgroundImage: 'linear-gradient(to right, #FF8301 1px, transparent 1px), linear-gradient(to bottom, #FF8301 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[100px]"
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
          className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-accent/5 blur-[100px]"
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
      
      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-white/10">
        <div className="container py-16">
          <div className="glass-card rounded-2xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-5" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -z-5" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2 
                  className="text-3xl md:text-4xl font-display font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  عضویت در <span className="gradient-text">خبرنامه</span>
                </motion.h2>
                <motion.p 
                  className="text-gray-300 mb-0 max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  آخرین اخبار و به‌روزرسانی‌های محصولات و فناوری هوش مصنوعی را مستقیماً در ایمیل خود دریافت کنید.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subscribed ? (
                  <div className="bg-primary/20 text-primary p-4 rounded-lg border border-primary/30">
                    با موفقیت در خبرنامه عضو شدید!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-grow">
                      <input
                        type="email"
                        placeholder="ایمیل شما"
                        className="w-full px-4 py-3 bg-secondary-dark border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="btn btn-primary py-3 px-6 relative overflow-hidden group whitespace-nowrap"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">عضویت</span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-l from-primary to-accent opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Logo and about */}
            <div className="lg:col-span-2">
              <Link to="/" className="block">
                <img src={logoVertical} alt="RASA Logo" className="h-20 mb-4" />
              </Link>
              <p className="text-gray-400 mb-4">
                پلتفرم پیشرفته ارائه راهکارهای هوشمند کسب و کار، با پشتیبانی از جدیدترین فناوری‌های هوش مصنوعی و یادگیری ماشین.
              </p>
              
              {/* Social links */}
              <div className="flex flex-wrap gap-3 mt-6">
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-primary/20 hover:text-white transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {social.icon === 'twitter' && (
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      )}
                      {social.icon === 'facebook' && (
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      )}
                      {social.icon === 'instagram' && (
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      )}
                      {social.icon === 'linkedin' && (
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      )}
                      {social.icon === 'github' && (
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      )}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:col-span-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {footerLinks.map((column) => (
                <motion.div key={column.title} variants={itemVariants}>
                  <h3 className="text-lg font-semibold mb-5 gradient-text">{column.title}</h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.name}>
                        <Link 
                          to={link.href} 
                          className="text-gray-400 hover:text-primary transition-colors flex items-center group"
                        >
                          <motion.span 
                            className="w-0 h-0.5 rounded-full bg-primary ml-0 opacity-0 group-hover:w-2 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300"
                          />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 mt-12 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © {currentYear} رسا. تمامی حقوق محفوظ است.
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <Link to="/privacy" className="hover:text-primary transition-colors">حریم خصوصی</Link>
                <Link to="/terms" className="hover:text-primary transition-colors">شرایط و ضوابط</Link>
                <Link to="/sitemap" className="hover:text-primary transition-colors">نقشه سایت</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 