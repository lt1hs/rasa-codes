import { Link } from 'react-router-dom';
import OptimizedImage from '../../ui/OptimizedImage';

const FooterLite = () => {
  const links = {
    company: [
      { label: 'درباره ما', href: '/about' },
      { label: 'تماس با ما', href: '/contact' },
      { label: 'همکاری با ما', href: '/careers' },
      { label: 'وبلاگ', href: '/blog' }
    ],
    products: [
      { label: 'تابلو LED', href: '/products/led-signs' },
      { label: 'کیسهوشمند', href: '/products/smart-case' },
      { label: 'اتوماسیون', href: '/products/automation' },
      { label: 'نورپردازی', href: '/products/lighting' }
    ],
    support: [
      { label: 'راهنمای خرید', href: '/support/buying-guide' },
      { label: 'سوالات متداول', href: '/support/faq' },
      { label: 'گارانتی محصولات', href: '/support/warranty' },
      { label: 'ارتباط با پشتیبانی', href: '/support/contact' }
    ],
    social: [
      { label: 'اینستاگرام', href: 'https://instagram.com/rasa', icon: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z' },
      { label: 'تلگرام', href: 'https://t.me/rasa', icon: 'M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zM8.89 13.17l.07.04L12 15.33l3.04-2.12.07-.04c.15-.1.15-.33-.01-.43l-2.97-2.08a.37.37 0 00-.42 0l-2.97 2.08c-.16.1-.16.33-.01.43z' },
      { label: 'لینکدین', href: 'https://linkedin.com/company/rasa', icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' }
    ]
  };

  return (
    <footer className="relative pt-24 pb-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-dark to-secondary-dark opacity-95" />
        <OptimizedImage
          src="/images/patterns/circuit-board.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-5 mix-blend-overlay"
          width={1920}
          height={1080}
        />
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <OptimizedImage
                src="/images/logo.png"
                alt="رسا"
                className="h-12 w-auto"
                width={128}
                height={48}
              />
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed">
              شرکت رسا با بیش از یک دهه تجربه در زمینه تولید محصولات هوشمند و ارائه راهکارهای نوآورانه،
              همواره در تلاش برای ارتقای کیفیت زندگی و کسب‌وکار مشتریان خود بوده است.
            </p>
            <div className="flex items-center gap-4">
              {links.social.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-primary/10 flex items-center justify-center transition-colors group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d={link.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">شرکت</h3>
            <ul className="space-y-4">
              {links.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">محصولات</h3>
            <ul className="space-y-4">
              {links.products.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">پشتیبانی</h3>
            <ul className="space-y-4">
              {links.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-right">
              © ۱۴۰۲ رسا. تمامی حقوق محفوظ است.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-sm text-gray-400 hover:text-primary transition-colors"
              >
                حریم خصوصی
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-400 hover:text-primary transition-colors"
              >
                قوانین و مقررات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLite; 