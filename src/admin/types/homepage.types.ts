export interface HomePageSection {
  id: string;
  name: string;
  title: string;
  enabled: boolean;
  order: number;
  lastModified: string;
  content: SectionContent;
}

export interface SectionContent {
  hero?: HeroContent;
  features?: FeaturesContent;
  about?: AboutContent;
  projects?: ProjectsContent;
  gallery?: GalleryContent;
  blogs?: BlogsContent;
  store?: StoreContent;
  techStack?: TechStackContent;
  rasaApp?: RasaAppContent;
  rasaSigns?: RasaSignsContent;
  rasaSmartCase?: RasaSmartCaseContent;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  primaryButton: ButtonContent;
  secondaryButton: ButtonContent;
  backgroundImage?: string;
  heroImage?: string;
}

export interface FeaturesContent {
  title: string;
  subtitle: string;
  features: FeatureItem[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: StatItem[];
  highlights: string[];
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface ProjectsContent {
  title: string;
  subtitle: string;
  projects: ProjectItem[];
  viewAllButton: ButtonContent;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
}

export interface GalleryContent {
  title: string;
  subtitle: string;
  images: GalleryImage[];
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
}

export interface BlogsContent {
  title: string;
  subtitle: string;
  posts: BlogPost[];
  viewAllButton: ButtonContent;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export interface StoreContent {
  title: string;
  subtitle: string;
  products: ProductItem[];
  viewAllButton: ButtonContent;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  featured: boolean;
}

export interface TechStackContent {
  title: string;
  subtitle: string;
  categories: TechCategory[];
}

export interface TechCategory {
  id: string;
  name: string;
  technologies: TechItem[];
}

export interface TechItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
}

export interface RasaAppContent {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  downloadButton: ButtonContent;
}

export interface RasaSignsContent {
  title: string;
  subtitle: string;
  description: string;
  services: ServiceItem[];
  ctaButton: ButtonContent;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface RasaSmartCaseContent {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  specifications: SpecItem[];
  orderButton: ButtonContent;
}

export interface SpecItem {
  id: string;
  label: string;
  value: string;
}

export interface ButtonContent {
  text: string;
  link: string;
  variant: 'primary' | 'secondary' | 'outline';
}

export interface ContentVersion {
  id: string;
  sectionId: string;
  content: SectionContent;
  createdAt: string;
  createdBy: string;
  description: string;
  published: boolean;
}

export interface HomePageSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  socialLinks: SocialLink[];
  seoSettings: SEOSettings;
  navbar: NavbarSettings;
  footer: FooterSettings;
}

export interface NavbarSettings {
  logo: string;
  logoAlt: string;
  menuItems: MenuItem[];
  ctaButton?: ButtonContent;
  mobileMenuEnabled: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  href: string;
  icon?: string;
  enabled: boolean;
  order: number;
  isExternal?: boolean;
  children?: MenuItem[];
}

export interface FooterSettings {
  logo: string;
  logoAlt: string;
  description: string;
  copyright: string;
  sections: FooterSection[];
  newsletter: NewsletterSettings;
  socialLinks: SocialLink[];
  bottomLinks: FooterLink[];
}

export interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
  enabled: boolean;
  order: number;
}

export interface FooterLink {
  id: string;
  name: string;
  href: string;
  icon?: string;
  enabled: boolean;
  isExternal?: boolean;
}

export interface NewsletterSettings {
  enabled: boolean;
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}

export type SectionType = 
  | 'hero'
  | 'features' 
  | 'about'
  | 'projects'
  | 'gallery'
  | 'blogs'
  | 'store'
  | 'techStack'
  | 'rasaApp'
  | 'rasaSigns'
  | 'rasaSmartCase';
