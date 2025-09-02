# Rasa Codes - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Project Architecture](#project-architecture)
4. [Website Pages & Features](#website-pages--features)
5. [Admin Panel System](#admin-panel-system)
6. [Database Schema](#database-schema)
7. [API Services](#api-services)
8. [Authentication System](#authentication-system)
9. [Deployment & Configuration](#deployment--configuration)
10. [Development Guide](#development-guide)

---

## 🚀 Project Overview

**Rasa Codes** is a comprehensive React-based web application built with modern technologies, featuring a complete content management system, admin panel, and user-facing website. The project emphasizes performance, security, and user experience with Persian (RTL) language support.

### Key Features
- ✅ **Modern React Application** with TypeScript
- ✅ **Complete Admin Panel** with real-time data management
- ✅ **Blog Management System** with rich text editor
- ✅ **User Management** with role-based permissions
- ✅ **Media Library** with image management
- ✅ **Analytics Dashboard** with real-time metrics
- ✅ **Persian/RTL Support** throughout the application
- ✅ **Responsive Design** for all devices
- ✅ **Real-time Database** integration with Supabase
- ✅ **Authentication System** with secure login
- ✅ **Performance Monitoring** and optimization
- ✅ **SEO Optimized** with meta tags and structured data

---

## 🛠 Technologies Used

### Frontend Framework
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Sass/SCSS** - Enhanced CSS with variables and mixins
- **Framer Motion** - Animation library for smooth transitions
- **Ant Design** - UI component library for admin panel
- **Heroicons** - Beautiful SVG icons
- **Class Variance Authority** - Component styling variants
- **Tailwind Merge** - Intelligent class merging

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **PostgreSQL** - Relational database
- **Row Level Security (RLS)** - Database security policies
- **Real-time Subscriptions** - Live data updates

### State Management & Data
- **React Context API** - Global state management
- **Custom Hooks** - Reusable logic encapsulation
- **React Query** - Server state management (planned)

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Vitest** - Unit testing framework
- **Git** - Version control
- **GitHub** - Code repository

### Deployment & Hosting
- **Netlify** - Static site hosting with CI/CD
- **Environment Variables** - Secure configuration management
- **Custom Domain** - Professional domain setup

### Performance & Monitoring
- **Web Vitals** - Performance metrics tracking
- **Image Optimization** - Lazy loading and compression
- **Code Splitting** - Dynamic imports for better performance
- **Bundle Analysis** - Build optimization

---

## 🏗 Project Architecture

### Directory Structure
```
src/
├── admin/                      # Admin panel system
│   ├── components/            # Admin UI components
│   │   ├── auth/             # Authentication components
│   │   ├── blog/             # Blog management
│   │   ├── charts/           # Analytics charts
│   │   ├── common/           # Shared admin components
│   │   ├── content/          # Content management
│   │   ├── dashboard/        # Dashboard components
│   │   ├── forms/            # Form components
│   │   ├── homepage/         # Homepage management
│   │   ├── media/            # Media library
│   │   ├── performance/      # Performance monitoring
│   │   ├── signboard/        # Signboard designer
│   │   ├── ui/               # UI primitives
│   │   └── users/            # User management
│   ├── contexts/             # React contexts
│   ├── hooks/                # Custom hooks
│   ├── layouts/              # Layout components
│   ├── lib/                  # Third-party integrations
│   ├── pages/                # Admin pages
│   ├── services/             # API services
│   ├── styles/               # SCSS stylesheets
│   ├── types/                # TypeScript definitions
│   └── utils/                # Utility functions
├── components/               # Public website components
│   ├── auth/                # Authentication forms
│   ├── layout/              # Layout components
│   ├── sections/            # Page sections
│   ├── signboard/           # Signboard designer
│   ├── ui/                  # UI components
│   └── user/                # User dashboard
├── contexts/                # Global contexts
├── hooks/                   # Custom hooks
├── pages/                   # Public pages
├── services/                # API services
├── styles/                  # Global styles
├── types/                   # Type definitions
└── utils/                   # Utility functions
```

### Component Architecture
- **Atomic Design Pattern** - Components organized by complexity
- **Compound Components** - Complex UI patterns
- **Render Props** - Flexible component composition
- **Custom Hooks** - Logic separation and reusability
- **Context Providers** - Global state management

### Data Flow
1. **User Interaction** → Component Event Handler
2. **Event Handler** → Service Layer (API calls)
3. **Service Layer** → Supabase Database
4. **Database Response** → State Update
5. **State Update** → UI Re-render

---

## 🌐 Website Pages & Features

### Public Website Pages

#### 1. Home Page (`/`)
- **Hero Section** - Main banner with call-to-action
- **About Section** - Company introduction
- **Services Section** - Service offerings
- **Features Section** - Key features showcase
- **Tech Stack Section** - Technologies used
- **Gallery Section** - Project showcase
- **Blog Section** - Latest articles
- **Contact Section** - Contact information and form
- **Footer** - Links and company information

#### 2. About Page (`/about`)
- **Company Story** - History and mission
- **Team Section** - Team members
- **Values Section** - Core values
- **Timeline** - Company milestones

#### 3. Features Page (`/features`)
- **Feature Grid** - Detailed feature descriptions
- **Comparison Table** - Feature comparisons
- **Use Cases** - Real-world applications

#### 4. Projects Page (`/projects`)
- **Project Gallery** - Portfolio showcase
- **Project Details** - Individual project pages
- **Technologies Used** - Tech stack per project
- **Live Demos** - Working examples

#### 5. Blog Pages (`/blog`, `/blog/:slug`)
- **Blog List** - Article listings with pagination
- **Blog Post** - Individual article view
- **Categories** - Content categorization
- **Tags** - Content tagging system
- **Search** - Article search functionality
- **Comments** - User engagement (planned)

#### 6. Contact Page (`/contact`)
- **Contact Form** - Message submission
- **Contact Information** - Address, phone, email
- **Map Integration** - Location display
- **Social Links** - Social media connections

#### 7. Gallery Page (`/gallery`)
- **Image Grid** - Photo gallery
- **Lightbox** - Full-size image viewing
- **Categories** - Image categorization
- **Filtering** - Content filtering

#### 8. Pricing Page (`/pricing`)
- **Pricing Plans** - Service packages
- **Feature Comparison** - Plan comparisons
- **FAQ** - Common questions

#### 9. Store Page (`/store`)
- **Product Catalog** - Product listings
- **Product Details** - Individual product pages
- **Shopping Cart** - Cart functionality (planned)
- **Checkout** - Purchase process (planned)

#### 10. Signboard Designer (`/signboard`)
- **AI-Powered Design** - Intelligent design suggestions
- **Drag & Drop Interface** - Visual design tools
- **Template Library** - Pre-made designs
- **Export Options** - Multiple format support
- **Real-time Preview** - Live design preview

### User Authentication Pages

#### 11. Login Page (`/login`)
- **User Authentication** - Secure login
- **Password Recovery** - Reset functionality
- **Social Login** - OAuth integration (planned)

#### 12. Sign Up Page (`/signup`)
- **User Registration** - Account creation
- **Email Verification** - Account activation
- **Terms & Conditions** - Legal agreements

#### 13. User Dashboard (`/dashboard`)
- **Profile Management** - User settings
- **Order History** - Purchase history
- **Saved Designs** - Signboard designs
- **Account Settings** - Preferences

---

## 🔧 Admin Panel System

### Admin Authentication (`/admin/login`)
- **Secure Login** - Admin authentication
- **Role-based Access** - Permission system
- **Session Management** - Secure sessions
- **Multi-factor Authentication** - Enhanced security (planned)

### Dashboard (`/admin/dashboard`)
- **Real-time Metrics** - Live statistics
- **User Analytics** - User behavior data
- **Content Statistics** - Content performance
- **System Health** - Performance monitoring
- **Quick Actions** - Common tasks
- **Recent Activity** - System activity log

### Content Management

#### Blog Management (`/admin/blog`)
- **Article Editor** - Rich text editing with TinyMCE
- **Draft System** - Save and publish workflow
- **Media Integration** - Image and file uploads
- **SEO Optimization** - Meta tags and descriptions
- **Category Management** - Content organization
- **Tag System** - Content tagging
- **Publishing Schedule** - Scheduled publishing
- **Analytics Integration** - Performance tracking

#### Page Management (`/admin/pages`)
- **Page Editor** - Visual page builder
- **Template System** - Reusable templates
- **Component Library** - Drag & drop components
- **SEO Settings** - Page optimization
- **URL Management** - Custom URLs

### User Management (`/admin/users`)
- **User List** - All registered users
- **User Profiles** - Detailed user information
- **Role Management** - Permission assignment
- **Activity Logs** - User activity tracking
- **Bulk Actions** - Mass user operations
- **User Statistics** - Registration analytics

### Media Library (`/admin/media`)
- **File Upload** - Drag & drop file uploads
- **Image Optimization** - Automatic compression
- **Gallery Management** - Image organization
- **File Browser** - Easy file navigation
- **Bulk Operations** - Mass file management
- **Storage Analytics** - Usage statistics

### Analytics (`/admin/analytics`)
- **Traffic Analytics** - Visitor statistics
- **Content Performance** - Popular content
- **User Behavior** - Interaction patterns
- **Conversion Tracking** - Goal completion
- **Real-time Data** - Live visitor tracking
- **Custom Reports** - Tailored analytics

### Settings (`/admin/settings`)
- **General Settings** - Site configuration
- **SEO Settings** - Search optimization
- **Security Settings** - Access control
- **Integration Settings** - Third-party services
- **Backup Management** - Data backup
- **System Maintenance** - Maintenance mode

### Performance Monitoring (`/admin/performance`)
- **Page Speed** - Loading time analysis
- **Core Web Vitals** - Google metrics
- **Error Tracking** - Bug monitoring
- **Resource Usage** - Server performance
- **Optimization Suggestions** - Performance tips

---

## 🗄 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  role VARCHAR(50) DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Blogs Table
```sql
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_id UUID REFERENCES users(id),
  category VARCHAR(100),
  tags TEXT[],
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP,
  view_count INTEGER DEFAULT 0,
  read_time INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Gallery Table
```sql
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category VARCHAR(100),
  tags TEXT[],
  alt_text VARCHAR(255),
  is_featured BOOLEAN DEFAULT false,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2),
  sale_price DECIMAL(10,2),
  sku VARCHAR(100),
  stock_quantity INTEGER DEFAULT 0,
  featured_image TEXT,
  gallery_images TEXT[],
  category VARCHAR(100),
  tags TEXT[],
  status VARCHAR(20) DEFAULT 'active',
  is_featured BOOLEAN DEFAULT false,
  specifications JSONB,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Admin Logs Table
```sql
CREATE TABLE admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(100),
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔌 API Services

### Authentication Service (`auth.service.ts`)
- **Login/Logout** - User authentication
- **Token Management** - JWT handling
- **Permission Checks** - Role-based access
- **Session Management** - User sessions

### Blog Service (`blog.service.ts`)
- **CRUD Operations** - Create, read, update, delete
- **Search & Filter** - Content discovery
- **Category Management** - Content organization
- **Analytics Tracking** - Performance metrics

### User Service (`user.service.ts`)
- **User Management** - Profile operations
- **Role Assignment** - Permission management
- **Activity Logging** - User tracking
- **Statistics** - User analytics

### Gallery Service (`gallery.service.ts`)
- **Image Upload** - File management
- **Image Processing** - Optimization
- **Gallery Organization** - Content structure
- **Metadata Management** - Image information

### Product Service (`product.service.ts`)
- **Product Management** - Inventory operations
- **Category Management** - Product organization
- **Price Management** - Pricing operations
- **Stock Tracking** - Inventory monitoring

---

## 🔐 Authentication System

### User Roles & Permissions
- **Super Admin** - Full system access
- **Admin** - Administrative access
- **Editor** - Content management
- **Viewer** - Read-only access
- **User** - Public access

### Security Features
- **JWT Tokens** - Secure authentication
- **Role-based Access Control** - Permission system
- **Session Management** - Secure sessions
- **Password Hashing** - Secure storage
- **Rate Limiting** - Brute force protection
- **CSRF Protection** - Cross-site request forgery prevention

### Authentication Flow
1. **User Login** → Credentials validation
2. **Token Generation** → JWT creation
3. **Permission Check** → Role verification
4. **Access Grant** → Resource access
5. **Session Refresh** → Token renewal

---

## 🚀 Deployment & Configuration

### Environment Variables
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration
VITE_API_BASE_URL=your_api_base_url

# Third-party Services
VITE_HUGGINGFACE_API_TOKEN=your_huggingface_token
```

### Build Configuration
- **Vite Config** - Build optimization
- **Tailwind Config** - Styling configuration
- **TypeScript Config** - Type checking
- **ESLint Config** - Code quality

### Deployment Process
1. **Code Push** → GitHub repository
2. **Automatic Build** → Netlify CI/CD
3. **Environment Setup** → Variable injection
4. **Build Process** → Asset optimization
5. **Deployment** → Live site update

### Performance Optimization
- **Code Splitting** - Dynamic imports
- **Image Optimization** - Lazy loading
- **Bundle Analysis** - Size optimization
- **Caching Strategy** - Browser caching
- **CDN Integration** - Content delivery

---

## 👨‍💻 Development Guide

### Getting Started
```bash
# Clone repository
git clone https://github.com/your-username/rasa-codes.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

### Development Workflow
1. **Feature Branch** - Create feature branch
2. **Development** - Implement features
3. **Testing** - Unit and integration tests
4. **Code Review** - Peer review process
5. **Merge** - Merge to main branch
6. **Deployment** - Automatic deployment

### Code Standards
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Conventional Commits** - Commit standards
- **Component Documentation** - JSDoc comments

### Testing Strategy
- **Unit Tests** - Component testing
- **Integration Tests** - Feature testing
- **E2E Tests** - User flow testing
- **Performance Tests** - Speed testing

---

## 📊 Project Statistics

### Codebase Metrics
- **Total Files**: 200+ files
- **Lines of Code**: 50,000+ lines
- **Components**: 100+ React components
- **Services**: 15+ API services
- **Pages**: 25+ pages
- **Admin Features**: 50+ admin features

### Performance Metrics
- **Build Time**: ~6-8 seconds
- **Bundle Size**: ~1MB (optimized)
- **Page Load Speed**: <3 seconds
- **Lighthouse Score**: 90+ (Performance)

### Browser Support
- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile**: iOS Safari, Chrome Mobile

---

## 🔮 Future Enhancements

### Planned Features
- **Multi-language Support** - Internationalization
- **PWA Features** - Offline functionality
- **Real-time Chat** - Customer support
- **Advanced Analytics** - Detailed insights
- **E-commerce Integration** - Online store
- **Mobile App** - React Native version
- **API Documentation** - Swagger/OpenAPI
- **Automated Testing** - CI/CD testing

### Technical Improvements
- **GraphQL Integration** - Efficient data fetching
- **Micro-frontends** - Modular architecture
- **Server-side Rendering** - SEO optimization
- **Edge Computing** - Performance enhancement
- **AI Integration** - Smart features
- **Blockchain Features** - Web3 integration

---

## 📞 Support & Contact

### Development Team
- **Lead Developer**: Rasa Technology Team
- **UI/UX Designer**: Design Team
- **Backend Developer**: Backend Team
- **DevOps Engineer**: Infrastructure Team

### Documentation
- **API Documentation**: Available in `/docs/api`
- **Component Library**: Storybook documentation
- **User Manual**: Available in `/docs/user-manual`
- **Developer Guide**: This documentation

### Support Channels
- **GitHub Issues**: Bug reports and feature requests
- **Email Support**: support@rasatech.com
- **Documentation**: Comprehensive guides
- **Community**: Developer community

---

*This documentation is maintained by the Rasa Technology development team and is updated regularly to reflect the latest project changes and improvements.*

**Last Updated**: January 2025
**Version**: 2.0.0
**License**: MIT License
