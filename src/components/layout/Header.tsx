import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logoHorizontal from '../../assets/main-r-wed.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('خانه');
  const headerRef = useRef(null);
  const location = useLocation();

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const headerBackdrop = useTransform(scrollY, [0, 100], ['blur(10px)', 'blur(20px)']);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const currentNavItem = navItems.find(item => item.href === currentPath);
    if (currentNavItem) {
      setActiveItem(currentNavItem.name);
    }
  }, [location]);

  const navItems = [
    { name: 'خانه', href: '/' },
    { name: 'درباره ما', href: '/about' },
    { name: 'ویژگی‌ها', href: '/features' },
    { name: 'پروژه‌ها', href: '/projects' },
    { name: 'فروشگاه', href: '/store' },    { name: 'گالری', href: '/gallery' },
    { name: 'وبلاگ', href: '/blog' },
    // { name: 'قیمت‌ها', href: '/pricing' },
    { name: 'تماس با ما', href: '/contact' }
  ];

  return (
    <motion.header 
      ref={headerRef}
      className="fixed top-0 right-0 left-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ scale: headerScale }}
    >
      {/* Enhanced background with gradient and blur */}
      <motion.div 
        className={`absolute inset-0 ${isScrolled ? 'border-b border-white/5' : ''}`}
        style={{
          opacity: headerOpacity,
          backdropFilter: headerBackdrop,
          background: isScrolled 
            ? 'rgba(17, 23, 31, 0.95)'
            : 'rgba(17, 23, 31, 0.85)',
        }}
      >
        {/* Subtle overlay */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'rgba(47, 214, 234, 0.01)',
          }}
        />
      </motion.div>

      <div className="container relative z-10 flex items-center justify-between py-4">
        {/* Enhanced Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 relative group"
          whileHover={{ scale: 1.02 }}
        >
          <Link to="/" className="relative">
            <motion.div
              className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <img src={logoHorizontal} alt="RASA Logo" className="h-10 md:h-11 relative" />
          </Link>
        </motion.div>

        {/* Ultra Professional Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <motion.div
            className="relative flex items-center bg-gradient-to-r from-white/[0.08] via-white/[0.05] to-white/[0.08] backdrop-blur-3xl rounded-2xl px-2 py-2 border border-white/[0.12] shadow-2xl shadow-black/10"
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ 
              boxShadow: '0 0 40px rgba(87, 220, 218, 0.15), 0 0 80px rgba(87, 220, 218, 0.05)',
              borderColor: 'rgba(87, 220, 218, 0.2)'
            }}
          >
            {/* Animated Background Glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(90deg, rgba(87,220,218,0.03), rgba(58,173,171,0.03), rgba(87,220,218,0.03))',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            <motion.ul 
              className="flex items-center relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, staggerChildren: 0.08, delayChildren: 0.3 }}
            >
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={item.href} 
                    className={`relative font-medium py-3 px-5 transition-all duration-400 rounded-xl group overflow-hidden ${
                      activeItem === item.name 
                        ? 'text-white' 
                        : 'text-white/75 hover:text-white'
                    }`}
                    onClick={() => setActiveItem(item.name)}
                  >
                    {/* Active Background with Gradient */}
                    {activeItem === item.name && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] shadow-lg shadow-[#57DCDA]/20"
                        layoutId="activeNavBackground"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Hover Background */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-white/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.02 }}
                    />
                    
                    {/* Text with Glow Effect */}
                    <span className={`relative z-10 transition-all duration-300 ${
                      activeItem === item.name 
                        ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' 
                        : 'group-hover:drop-shadow-[0_0_6px_rgba(87,220,218,0.4)]'
                    }`}>
                      {item.name}
                    </span>
                    
                    {/* Animated Underline */}
                    <motion.div
                      className="absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-full opacity-0 group-hover:opacity-100"
                      initial={{ width: 0, x: '-50%' }}
                      whileHover={{ width: '80%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            {/* Navigation Accent Dots */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#57DCDA] rounded-full opacity-60 animate-pulse" />
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#3AADAB] rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.div>
          
          {/* Ultra Enhanced Action Buttons */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: -15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Login Button */}
            <motion.div className="relative group">
              <Link to="/login">
                <motion.button
                  className="relative px-6 py-2.5 bg-white/[0.08] backdrop-blur-xl rounded-xl text-white/90 font-medium border border-white/[0.12] overflow-hidden group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/[0.1] to-white/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                  
                  <span className="relative z-10">ورود</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* CTA Button */}
            <motion.div className="relative group">
              <Link to="/contact">
                <motion.button
                  className="relative px-8 py-2.5 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-xl text-white font-semibold overflow-hidden group shadow-lg shadow-[#57DCDA]/20"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    boxShadow: '0 10px 25px rgba(87,220,218,0.3), 0 0 30px rgba(87,220,218,0.2)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Animated Gradient Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#3AADAB] to-[#57DCDA] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  {/* Pulse Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(87,220,218,0.4)',
                        '0 0 0 8px rgba(87,220,218,0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    تماس با ما
                    <motion.svg 
                      className="w-4 h-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      whileHover={{ x: 2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </nav>

        {/* Enhanced Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button 
            className="relative p-2.5 overflow-hidden rounded-full group bg-white/[0.02] border border-white/[0.05]"
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
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full right-0 left-0 backdrop-blur-2xl border-t border-white/[0.08]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'linear-gradient(to bottom, rgba(10, 10, 18, 0.98), rgba(15, 15, 30, 0.95))',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="container py-6">
              <motion.ul 
                className="flex flex-col gap-3"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
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
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link 
                      to={item.href} 
                      className={`block py-2.5 px-4 font-medium transition-all duration-300 rounded-full relative overflow-hidden ${
                        activeItem === item.name 
                          ? 'text-white bg-[#2FD6EA] shadow-sm shadow-[#2FD6EA]/10' 
                          : 'text-white/80 hover:text-white hover:bg-white/[0.02]'
                      }`}
                      onClick={() => {
                        setActiveItem(item.name);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-[#2FD6EA] opacity-0 hover:opacity-100 transition-opacity duration-500"
                      />
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  </motion.li>
                ))}

                {/* Mobile Action Buttons */}
                <div className="flex flex-col gap-3 mt-5">
                  <motion.div
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -10 }
                    }}
                  >
                    <Link 
                      to="/login" 
                      className="block py-2.5 px-4 text-center rounded-full border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300 bg-white/[0.02]"
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
                      className="block py-2.5 px-4 text-center rounded-full bg-[#2FD6EA] hover:shadow-md shadow-[#2FD6EA]/10 transition-all duration-300"
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
