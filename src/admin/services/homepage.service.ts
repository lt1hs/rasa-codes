import { HomePageSection, SectionContent, ContentVersion, HomePageSettings } from '../types/homepage.types';

class HomePageService {
  private static instance: HomePageService;
  private sections: HomePageSection[] = [];
  private versions: ContentVersion[] = [];
  private settings: HomePageSettings | null = null;

  static getInstance(): HomePageService {
    if (!HomePageService.instance) {
      HomePageService.instance = new HomePageService();
    }
    return HomePageService.instance;
  }

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.sections = [
      {
        id: 'hero',
        name: 'Hero Section',
        title: 'بخش اصلی',
        enabled: true,
        order: 1,
        lastModified: new Date().toISOString(),
        content: {
          hero: {
            title: 'فناوری هوشمند رسا تکنولوژی',
            subtitle: 'فناوری هوشمند',
            description: 'جایی که فناوری، هنر و نوآوری با هم تلاقی میکنند',
            primaryButton: { text: 'شروع کنید', link: '/contact', variant: 'primary' },
            secondaryButton: { text: 'نمونه کارها', link: '/projects', variant: 'secondary' },
            backgroundImage: '/images/hero-bg.jpg',
            heroImage: '/src/assets/main-r-logo-ver.png'
          }
        }
      },
      {
        id: 'features',
        name: 'Features Section',
        title: 'بخش ویژگی‌ها',
        enabled: true,
        order: 2,
        lastModified: new Date().toISOString(),
        content: {
          features: {
            title: 'خدمات ما',
            subtitle: 'راه‌حل‌های نوآورانه برای نیازهای شما',
            features: [
              {
                id: '1',
                title: 'طراحی و نورپردازی حرفهای',
                description: 'خلق فضاهایی الهامبخش با مهندسی نور',
                icon: '✨',
                color: '#57DCDA'
              },
              {
                id: '2',
                title: 'هوشمندسازی ساختمان و خانههای مدرن',
                description: 'زندگی هوشمند، راحتی بینهایت.',
                icon: '📊',
                color: '#9D4EDD'
              },
              {
                id: '3',
                title: 'طراحی و ساخت تابلوهای تبلیغات',
                description: 'برند شما، درخشانتر از همیشه.',
                icon: '🛡️',
                color: '#2DEE59'
              },
              {
                id: '4',
                title: 'مهندسی محصولات الکترونیکی خاص',
                description: 'از ایده تا محصول نهایی، سفارشیسازی کامل.',
                icon: '💬',
                color: '#FF8301'
              },
              {
                id: '5',
                title: 'فناوری انرژی خورشیدی و سیستمهای پایدار',
                description: 'قدرت خورشید در خدمت آینده پاکتر.',
                icon: '⚡',
                color: '#FF4D4D'
              }
            ]
          }
        }
      },
      {
        id: 'rasaSmartCase',
        name: 'Rasa Smart Case Section',
        title: 'بخش کیس هوشمند راسا',
        enabled: true,
        order: 3,
        lastModified: new Date().toISOString(),
        content: {
          rasaSmartCase: {
            title: 'کیس هوشمند راسا',
            subtitle: 'نسل جدید کیس‌های کامپیوتر',
            description: 'کیسی که با شما زندگی می‌کند',
            features: [
              'نورپردازی RGB هوشمند',
              'کنترل دما و فن‌ها',
              'مانیتورینگ سیستم',
              'اتصال وای‌فای'
            ],
            image: '/images/smart-case.jpg',
            specifications: [
              { id: '1', label: 'ابعاد', value: '45 × 20 × 40 سانتی‌متر' },
              { id: '2', label: 'وزن', value: '8.5 کیلوگرم' },
              { id: '3', label: 'مواد', value: 'آلومینیوم و شیشه' }
            ],
            orderButton: { text: 'سفارش دهید', link: '/order', variant: 'primary' }
          }
        }
      },
      {
        id: 'rasaSigns',
        name: 'Rasa Signs Section',
        title: 'بخش تابلوهای راسا',
        enabled: true,
        order: 4,
        lastModified: new Date().toISOString(),
        content: {
          rasaSigns: {
            title: 'تابلوهای هوشمند راسا',
            subtitle: 'تبلیغات دیجیتال نسل جدید',
            description: 'تابلوهایی که توجه همه را جلب می‌کنند',
            services: [
              {
                id: '1',
                title: 'تابلو LED',
                description: 'تابلوهای LED با کیفیت بالا',
                icon: '💡',
                features: ['رنگ‌های زنده', 'مقاوم در برابر آب و هوا', 'کنترل از راه دور']
              },
              {
                id: '2',
                title: 'تابلو دیجیتال',
                description: 'نمایشگرهای دیجیتال تعاملی',
                icon: '📺',
                features: ['صفحه لمسی', 'محتوای پویا', 'اتصال اینترنت']
              }
            ],
            ctaButton: { text: 'مشاوره رایگان', link: '/consultation', variant: 'primary' }
          }
        }
      },
      {
        id: 'techStack',
        name: 'Tech Stack Section',
        title: 'بخش تکنولوژی‌ها',
        enabled: true,
        order: 5,
        lastModified: new Date().toISOString(),
        content: {
          techStack: {
            title: 'تکنولوژی‌های ما',
            subtitle: 'ابزارها و فناوری‌های پیشرفته',
            categories: [
              {
                id: '1',
                name: 'فرانت‌اند',
                technologies: [
                  { id: '1', name: 'React', icon: '⚛️', color: '#61DAFB' },
                  { id: '2', name: 'TypeScript', icon: '📘', color: '#3178C6' },
                  { id: '3', name: 'Tailwind CSS', icon: '🎨', color: '#06B6D4' }
                ]
              },
              {
                id: '2',
                name: 'بک‌اند',
                technologies: [
                  { id: '4', name: 'Node.js', icon: '🟢', color: '#339933' },
                  { id: '5', name: 'Python', icon: '🐍', color: '#3776AB' },
                  { id: '6', name: 'MongoDB', icon: '🍃', color: '#47A248' }
                ]
              }
            ]
          }
        }
      },
      {
        id: 'about',
        name: 'About Section',
        title: 'بخش درباره ما',
        enabled: true,
        order: 6,
        lastModified: new Date().toISOString(),
        content: {
          about: {
            title: 'درباره راسا تکنولوژی',
            subtitle: 'تیمی از متخصصان و نوآوران',
            description: 'ما در راسا تکنولوژی، با ترکیب دانش فنی و خلاقیت، راه‌حل‌های نوآورانه ارائه می‌دهیم',
            image: '/images/about-team.jpg',
            stats: [
              { id: '1', value: '100+', label: 'پروژه موفق', icon: '📊' },
              { id: '2', value: '50+', label: 'مشتری راضی', icon: '😊' },
              { id: '3', value: '5+', label: 'سال تجربه', icon: '⏰' },
              { id: '4', value: '24/7', label: 'پشتیبانی', icon: '🛠️' }
            ],
            highlights: ['تجربه بالا', 'کیفیت عالی', 'پشتیبانی ۲۴/۷', 'نوآوری مداوم']
          }
        }
      },
      {
        id: 'projects',
        name: 'Projects Section',
        title: 'بخش پروژه‌ها',
        enabled: true,
        order: 7,
        lastModified: new Date().toISOString(),
        content: {
          projects: {
            title: 'نمونه کارهای ما',
            subtitle: 'پروژه‌هایی که با افتخار انجام داده‌ایم',
            projects: [
              {
                id: '1',
                title: 'سیستم هوشمند ساختمان',
                description: 'طراحی و پیاده‌سازی سیستم هوشمند برای مجتمع مسکونی',
                image: '/images/project1.jpg',
                category: 'هوشمندسازی',
                technologies: ['IoT', 'React', 'Node.js'],
                link: '/projects/smart-building'
              },
              {
                id: '2',
                title: 'تابلو LED شهری',
                description: 'نصب تابلوهای LED در سطح شهر',
                image: '/images/project2.jpg',
                category: 'تبلیغات',
                technologies: ['LED', 'Control System'],
                link: '/projects/city-led'
              }
            ],
            viewAllButton: { text: 'مشاهده همه پروژه‌ها', link: '/projects', variant: 'primary' }
          }
        }
      },
      {
        id: 'gallery',
        name: 'Gallery Section',
        title: 'بخش گالری',
        enabled: true,
        order: 8,
        lastModified: new Date().toISOString(),
        content: {
          gallery: {
            title: 'گالری تصاویر',
            subtitle: 'نگاهی به کارهای انجام شده',
            images: [
              { id: '1', url: '/images/gallery1.jpg', alt: 'پروژه نورپردازی', category: 'نورپردازی' },
              { id: '2', url: '/images/gallery2.jpg', alt: 'تابلو LED', category: 'تبلیغات' },
              { id: '3', url: '/images/gallery3.jpg', alt: 'سیستم هوشمند', category: 'هوشمندسازی' }
            ]
          }
        }
      },
      {
        id: 'store',
        name: 'Store Section',
        title: 'بخش فروشگاه',
        enabled: true,
        order: 9,
        lastModified: new Date().toISOString(),
        content: {
          store: {
            title: 'فروشگاه آنلاین',
            subtitle: 'محصولات و خدمات ما',
            products: [
              {
                id: '1',
                name: 'کیس هوشمند راسا',
                description: 'کیس کامپیوتر با قابلیت‌های هوشمند',
                price: '2,500,000 تومان',
                image: '/images/smart-case.jpg',
                category: 'سخت‌افزار',
                featured: true
              },
              {
                id: '2',
                name: 'تابلو LED سفارشی',
                description: 'تابلو LED با طراحی دلخواه شما',
                price: 'قیمت بر اساس سایز',
                image: '/images/led-sign.jpg',
                category: 'تبلیغات',
                featured: false
              }
            ],
            viewAllButton: { text: 'مشاهده فروشگاه', link: '/store', variant: 'primary' }
          }
        }
      },
      {
        id: 'blogs',
        name: 'Blogs Section',
        title: 'بخش وبلاگ',
        enabled: true,
        order: 10,
        lastModified: new Date().toISOString(),
        content: {
          blogs: {
            title: 'آخرین مطالب',
            subtitle: 'مقالات و اخبار فناوری',
            posts: [
              {
                id: '1',
                title: 'آینده هوشمندسازی خانه',
                excerpt: 'نگاهی به تکنولوژی‌های نوین در هوشمندسازی منازل',
                image: '/images/blog1.jpg',
                author: 'تیم راسا',
                date: '1403/06/15',
                category: 'فناوری',
                readTime: '5 دقیقه'
              },
              {
                id: '2',
                title: 'مزایای انرژی خورشیدی',
                excerpt: 'چرا انرژی خورشیدی انتخاب آینده است؟',
                image: '/images/blog2.jpg',
                author: 'تیم راسا',
                date: '1403/06/10',
                category: 'انرژی',
                readTime: '7 دقیقه'
              }
            ],
            viewAllButton: { text: 'مشاهده همه مقالات', link: '/blog', variant: 'primary' }
          }
        }
      },
      {
        id: 'rasaApp',
        name: 'Rasa App Section',
        title: 'بخش اپلیکیشن راسا',
        enabled: true,
        order: 11,
        lastModified: new Date().toISOString(),
        content: {
          rasaApp: {
            title: 'اپلیکیشن راسا',
            subtitle: 'کنترل هوشمند در دستان شما',
            description: 'با اپلیکیشن راسا، تمام دستگاه‌های هوشمند خود را کنترل کنید',
            features: [
              'کنترل از راه دور',
              'مانیتورینگ لحظه‌ای',
              'تنظیمات شخصی‌سازی',
              'اعلان‌های هوشمند'
            ],
            image: '/images/rasa-app.jpg',
            downloadButton: { text: 'دانلود اپلیکیشن', link: '/download', variant: 'primary' }
          }
        }
      }
    ];

    this.settings = {
      siteName: 'راسا تکنولوژی',
      siteDescription: 'فناوری هوشمند، نوآوری بی‌پایان',
      logo: '/src/assets/main-r-logo-ver.png',
      favicon: '/favicon.ico',
      socialLinks: [
        { id: '1', platform: 'Instagram', url: 'https://instagram.com/rasatech', icon: 'instagram' },
        { id: '2', platform: 'Telegram', url: 'https://t.me/rasatech', icon: 'telegram' },
        { id: '3', platform: 'LinkedIn', url: 'https://linkedin.com/company/rasatech', icon: 'linkedin' }
      ],
      seoSettings: {
        title: 'راسا تکنولوژی - فناوری هوشمند و نوآوری',
        description: 'راسا تکنولوژی ارائه‌دهنده خدمات هوشمندسازی، نورپردازی، تابلوسازی و محصولات الکترونیکی',
        keywords: ['هوشمندسازی', 'نورپردازی', 'تابلو LED', 'انرژی خورشیدی', 'راسا تکنولوژی'],
        ogImage: '/images/og-rasa-tech.jpg'
      },
      navbar: {
        logo: '/src/assets/main-r-wed.png',
        logoAlt: 'راسا تکنولوژی',
        mobileMenuEnabled: true,
        ctaButton: { text: 'تماس با ما', link: '/contact', variant: 'primary' },
        menuItems: [
          { id: '1', name: 'خانه', href: '/', enabled: true, order: 1 },
          { id: '2', name: 'درباره ما', href: '/about', enabled: true, order: 2 },
          { id: '3', name: 'ویژگیها', href: '/features', enabled: true, order: 3 },
          { id: '4', name: 'پروژهها', href: '/projects', enabled: true, order: 4 },
          { id: '5', name: 'فروشگاه', href: '/store', enabled: true, order: 5 },
          { id: '6', name: 'گالری', href: '/gallery', enabled: true, order: 6 },
          { id: '7', name: 'وبلاگ', href: '/blog', enabled: true, order: 7 },
          { id: '8', name: 'تماس با ما', href: '/contact', enabled: true, order: 8 }
        ]
      },
      footer: {
        logo: '/src/assets/main-r-logo-ver.png',
        logoAlt: 'راسا تکنولوژی',
        description: 'راسا تکنولوژی، پیشرو در ارائه راه‌حل‌های فناوری هوشمند، نورپردازی حرفه‌ای و سیستم‌های پایدار انرژی.',
        copyright: `© ${new Date().getFullYear()} راسا تکنولوژی. تمامی حقوق محفوظ است.`,
        newsletter: {
          enabled: true,
          title: 'عضویت در خبرنامه',
          description: 'از آخرین اخبار و محصولات ما باخبر شوید',
          placeholder: 'ایمیل خود را وارد کنید',
          buttonText: 'عضویت'
        },
        socialLinks: [
          { id: '1', platform: 'Instagram', url: 'https://instagram.com/rasatech', icon: 'instagram' },
          { id: '2', platform: 'Telegram', url: 'https://t.me/rasatech', icon: 'telegram' },
          { id: '3', platform: 'LinkedIn', url: 'https://linkedin.com/company/rasatech', icon: 'linkedin' },
          { id: '4', platform: 'WhatsApp', url: 'https://wa.me/989123456789', icon: 'whatsapp' }
        ],
        sections: [
          {
            id: '1',
            title: 'شرکت',
            enabled: true,
            order: 1,
            links: [
              { id: '1', name: 'درباره ما', href: '/about', icon: '🏢', enabled: true },
              { id: '2', name: 'تیم ما', href: '/team', icon: '👥', enabled: true },
              { id: '3', name: 'وبلاگ', href: '/blog', icon: '📝', enabled: true },
              { id: '4', name: 'فرصتهای شغلی', href: '/careers', icon: '💼', enabled: true }
            ]
          },
          {
            id: '2',
            title: 'محصولات',
            enabled: true,
            order: 2,
            links: [
              { id: '5', name: 'ویژگیها', href: '/features', icon: '⚡', enabled: true },
              { id: '6', name: 'نظرات مشتریان', href: '/testimonials', icon: '⭐', enabled: true },
              { id: '7', name: 'گالری', href: '/gallery', icon: '🖼️', enabled: true },
              { id: '8', name: 'فروشگاه', href: '/store', icon: '🛍️', enabled: true }
            ]
          },
          {
            id: '3',
            title: 'منابع',
            enabled: true,
            order: 3,
            links: [
              { id: '9', name: 'مستندات', href: '/docs', icon: '📚', enabled: true },
              { id: '10', name: 'پروژهها', href: '/projects', icon: '🚀', enabled: true },
              { id: '11', name: 'سوالات متداول', href: '/faq', icon: '❓', enabled: true },
              { id: '12', name: 'پشتیبانی', href: '/support', icon: '🛠️', enabled: true }
            ]
          },
          {
            id: '4',
            title: 'خدمات',
            enabled: true,
            order: 4,
            links: [
              { id: '13', name: 'هوشمندسازی', href: '/smart-home', icon: '🏠', enabled: true },
              { id: '14', name: 'نورپردازی', href: '/lighting', icon: '💡', enabled: true },
              { id: '15', name: 'تابلوسازی', href: '/signboard', icon: '🪧', enabled: true },
              { id: '16', name: 'انرژی خورشیدی', href: '/solar', icon: '☀️', enabled: true }
            ]
          }
        ],
        bottomLinks: [
          { id: '1', name: 'حریم خصوصی', href: '/privacy', enabled: true },
          { id: '2', name: 'شرایط استفاده', href: '/terms', enabled: true },
          { id: '3', name: 'سیاست کوکی', href: '/cookies', enabled: true }
        ]
      }
    };
  }

  async getAllSections(): Promise<HomePageSection[]> {
    return this.sections.sort((a, b) => a.order - b.order);
  }

  async getSectionById(id: string): Promise<HomePageSection | null> {
    return this.sections.find(section => section.id === id) || null;
  }

  async updateSection(id: string, content: SectionContent): Promise<HomePageSection> {
    const sectionIndex = this.sections.findIndex(section => section.id === id);
    if (sectionIndex === -1) {
      throw new Error('Section not found');
    }

    // Create version backup
    const version: ContentVersion = {
      id: Date.now().toString(),
      sectionId: id,
      content: { ...this.sections[sectionIndex].content },
      createdAt: new Date().toISOString(),
      createdBy: 'admin',
      description: 'Auto backup before update',
      published: true
    };
    this.versions.push(version);

    // Update section
    this.sections[sectionIndex] = {
      ...this.sections[sectionIndex],
      content,
      lastModified: new Date().toISOString()
    };

    return this.sections[sectionIndex];
  }

  async toggleSection(id: string): Promise<HomePageSection> {
    const sectionIndex = this.sections.findIndex(section => section.id === id);
    if (sectionIndex === -1) {
      throw new Error('Section not found');
    }

    this.sections[sectionIndex].enabled = !this.sections[sectionIndex].enabled;
    this.sections[sectionIndex].lastModified = new Date().toISOString();

    return this.sections[sectionIndex];
  }

  async reorderSections(sectionIds: string[]): Promise<HomePageSection[]> {
    const reorderedSections = sectionIds.map((id, index) => {
      const section = this.sections.find(s => s.id === id);
      if (section) {
        return { ...section, order: index + 1 };
      }
      return null;
    }).filter(Boolean) as HomePageSection[];

    this.sections = reorderedSections;
    return this.sections;
  }

  async uploadImage(file: File, category: string): Promise<string> {
    // Simulate image upload
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        resolve(url);
      }, 1000);
    });
  }

  async getVersionHistory(sectionId: string): Promise<ContentVersion[]> {
    return this.versions.filter(version => version.sectionId === sectionId);
  }

  async restoreVersion(versionId: string): Promise<HomePageSection> {
    const version = this.versions.find(v => v.id === versionId);
    if (!version) {
      throw new Error('Version not found');
    }

    return this.updateSection(version.sectionId, version.content);
  }

  async getSettings(): Promise<HomePageSettings> {
    return this.settings!;
  }

  async updateSettings(settings: HomePageSettings): Promise<HomePageSettings> {
    this.settings = settings;
    return this.settings;
  }

  async previewChanges(sectionId: string, content: SectionContent): Promise<string> {
    // Generate preview URL
    return `/preview/${sectionId}?timestamp=${Date.now()}`;
  }
}

export default HomePageService.getInstance();
