import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoHorizontal from '../../assets/main-r-wed.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('خانه');
  const headerRef = useRef(null);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.9, 1]);
  const headerBackdrop = useTransform(scrollY, [0, 100], ['blur(8px)', 'blur(16px)']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'خانه', href: '/' },
    { name: 'درباره ما', href: '/about' },
    { name: 'ویژگی‌ها', href: '/features' },
    { name: 'پروژه‌ها', href: '/projects' },
    { name: 'گالری', href: '/gallery' },
    { name: 'وبلاگ', href: '/blog' },
    { name: 'قیمت‌ها', href: '/pricing' },
    { name: 'تماس با ما', href: '/contact' }
  ];

  return (
    <motion.header 
      ref={headerRef}
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Enhanced background with gradient and blur */}
      <motion.div 
        className={`absolute inset-0 ${isScrolled ? 'border-b border-white/10' : ''}`}
        style={{
          opacity: headerOpacity,
          backdropFilter: headerBackdrop,
          background: isScrolled 
            ? 'linear-gradient(to right, rgba(13, 13, 20, 0.85), rgba(20, 20, 35, 0.9))'
            : 'linear-gradient(to right, rgba(13, 13, 20, 0.7), rgba(20, 20, 35, 0.75))',
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(87, 220, 218, 0.1), transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <div className="container relative z-10 flex items-center justify-between py-3.5">
        {/* Enhanced Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 relative group"
          whileHover={{ scale: 1.02 }}
        >
          <Link to="/" className="relative">
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
            />
            <img src={logoHorizontal} alt="RASA Logo" className="h-9 md:h-10 relative" />
          </Link>
        </motion.div>

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <motion.div
            className="flex items-center bg-white/5 backdrop-blur-md rounded-full px-1.5 py-1.5 border border-white/10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ boxShadow: '0 0 20px rgba(87, 220, 218, 0.1)' }}
          >
            <motion.ul 
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              {navItems.map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Link 
                    to={item.href} 
                    className={`font-medium py-1.5 px-4 transition-all duration-300 relative rounded-full ${
                      activeItem === item.name 
                        ? 'text-white bg-gradient-to-r from-primary to-accent shadow-lg' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setActiveItem(item.name)}
                  >
                    {item.name}
                    {activeItem === item.name && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-50 blur-sm -z-10"
                        layoutId="activeBackground"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          {/* Enhanced Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex gap-3"
          >
            <Link 
              to="/login" 
              className="relative group px-5 py-2 overflow-hidden rounded-full border border-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-white/90 group-hover:text-white transition-colors duration-300">
                ورود
              </span>
            </Link>
            
            <Link 
              to="/signup" 
              className="relative group px-5 py-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-white font-medium">
                شروع رایگان
              </span>
            </Link>
          </motion.div>
        </nav>

        {/* Enhanced Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button 
            className="relative p-2 overflow-hidden rounded-full group bg-gradient-to-r from-primary/10 to-accent/10 border border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-white">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full right-0 left-0 backdrop-blur-xl border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'linear-gradient(to bottom, rgba(13, 13, 20, 0.95), rgba(20, 20, 35, 0.9))',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div className="container py-5">
              <motion.ul 
                className="flex flex-col gap-3"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
              >
                {navItems.map((item) => (
                  <motion.li 
                    key={item.name}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -10 }
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      to={item.href} 
                      className={`block py-2 px-4 font-medium transition-all duration-300 rounded-full relative overflow-hidden ${
                        activeItem === item.name 
                          ? 'text-white bg-gradient-to-r from-primary to-accent shadow-md' 
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => {
                        setActiveItem(item.name);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      />
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  </motion.li>
                ))}

                {/* Mobile Action Buttons */}
                <div className="flex flex-col gap-3 mt-4">
                  <motion.div
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -10 }
                    }}
                  >
                    <Link 
                      to="/login" 
                      className="block py-2 px-4 text-center rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ورود
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -10 }
                    }}
                  >
                    <Link 
                      to="/signup" 
                      className="block py-2 px-4 text-center rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      شروع رایگان
                    </Link>
                  </motion.div>
                </div>
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 