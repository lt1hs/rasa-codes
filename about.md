# Rasa Codes - Comprehensive Project Documentation
## Project Overview
### Purpose and Objectives
Rasa Codes is a comprehensive React-based web application designed to showcase advanced AI-powered signboard design capabilities, content management, and interactive business solutions. The project serves as both a portfolio platform and a functional business application with features including:

- AI-Powered Signboard Designer : Interactive tool for creating custom business signboards using AI image generation
- Admin Dashboard : Complete content management system for managing users, media, and website content
- Performance-Optimized Architecture : Adaptive rendering system that switches between full-featured and lite versions based on device capabilities
- Multi-language Support : Primarily Persian (Farsi) interface with English technical documentation
### Key Features
- 🤖 AI Integration : Google Gemini API for text suggestions and image generation
- 🎨 Interactive Design Tools : Real-time signboard preview with customizable options
- 📊 Admin Panel : Complete CMS with user management, content editing, and media handling
- ⚡ Performance Optimization : Automatic lite mode for low-end devices and slow connections
- 🎭 Advanced Animations : Framer Motion-powered smooth animations with performance considerations
- 📱 Responsive Design : Mobile-first approach with adaptive layouts
- 🔒 Authentication System : Login/signup functionality with role-based access
### Technologies Used Frontend Framework & Build Tools
- React 18.2.0 : Modern React with hooks and concurrent features
- TypeScript 5.0.2 : Type-safe development with strict configuration
- Vite 4.4.5 : Fast build tool and development server
- React Router DOM 6.18.0 : Client-side routing Styling & UI
- Tailwind CSS 3.3.0 : Utility-first CSS framework with custom configuration
- Sass 1.89.0 : SCSS preprocessing for complex styling
- Framer Motion 10.16.4 : Advanced animations and transitions
- Styled Components 6.1.18 : CSS-in-JS styling solution 3D Graphics & Visualization
- Three.js 0.176.0 : 3D graphics library
- @react-three/fiber 9.1.2 : React renderer for Three.js
- @react-three/drei 10.0.8 : Useful helpers for React Three Fiber
- @react-three/postprocessing 3.0.4 : Post-processing effects AI & External Services
- Google Gemini AI : Text generation and image creation
- Hugging Face API : Alternative image generation using Stable Diffusion XL
- Canvas 3.1.0 : Server-side image processing Development Tools
- ESLint : Code linting with TypeScript support
- PostCSS : CSS processing with Autoprefixer
- Netlify : Deployment and hosting platform
### Installation Instructions Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Git for version control Environment Setup
1. 1.
   Clone the repository:
   
   ```
   git clone [repository-url]
   cd rasa-codes
   ```
2. 2.
   Install dependencies:
   
   ```
   npm install
   ```
3. 3.
   Environment Variables: Create a .env file in the root directory with the following variables:
   
   ```
   # Google Gemini AI API Key
   API_KEY=your_gemini_api_key_here
   
   # Hugging Face API Token
   VITE_HUGGINGFACE_API_TOKEN=your_huggingface_toke
   n_here
   ```
4. 4.
   Start the development server:
   
   ```
   npm run dev
   ```
   The application will be available at http://localhost:5173
5. 5.
   Build for production:
   
   ```
   npm run build
   ```
6. 6.
   Preview production build:
   
   ```
   npm run preview
   ```
## Function Documentation
### Core Services Gemini AI Service ( src/services/geminiService.ts )
generateSignTextSuggestion(userPrompt, storeType, storeName, signType)

- Purpose : Generates AI-powered text suggestions for signboards
- Parameters :
  - userPrompt (string): Style/vibe description from user
  - storeType (string): Type of business (restaurant, retail, etc.)
  - storeName (string): Name of the business
  - signType (SignType): Type of sign (neon, LED, etc.)
- Returns : Promise
  - Generated sign text
- Dependencies : Google Gemini API, API_KEY environment variable
generateSignImage(aiStylePrompt, storeType, storeName, signConfig)

- Purpose : Creates photorealistic mockup images of signboards
- Parameters :
  - aiStylePrompt (string): Style description
  - storeType (string): Business type
  - storeName (string): Business name
  - signConfig (SignConfig): Complete sign configuration object
- Returns : Promise
  - Base64 encoded image data
- Dependencies : Google Gemini Image API Signboard Service ( src/services/signboardService.ts )
generateSignBoardPreview(config)

- Purpose : Generates signboard preview using Hugging Face Stable Diffusion
- Parameters : config (SignBoardConfig) - Complete signboard configuration
- Returns : Promise
  - Generated image URL
- Dependencies : Hugging Face API token
uploadLogo(file)

- Purpose : Handles logo file uploads for signboard designs
- Parameters : file (File) - Logo image file
- Returns : Promise
  - Uploaded file URL
submitOrder(orderDetails)

- Purpose : Processes signboard orders
- Parameters : orderDetails (object) - Complete order information
- Returns : Promise<{orderId: string, estimatedDelivery: string}>
### Performance Optimization Performance Context ( src/contexts/PerformanceContext.tsx )
PerformanceProvider

- Purpose : Provides performance-related state throughout the application
- Features : Device capability detection, connection speed monitoring, lite mode management Performance Utilities ( src/utils/performance.ts )
shouldUseLiteVersion()

- Purpose : Determines if the application should use lite mode
- Returns : boolean - True if lite mode should be enabled
- Factors : User preference, device capabilities, connection speed, reduced motion preference
debounce(func, wait)

- Purpose : Limits function call frequency
- Parameters : Function to debounce, wait time in milliseconds
- Returns : Debounced function
throttle(func, limit)

- Purpose : Ensures function is called at most once per time period
- Parameters : Function to throttle, time limit in milliseconds
- Returns : Throttled function
browserCapabilities

- webGL() : Detects WebGL support
- webP() : Detects WebP image format support
- intersectionObserver() : Detects Intersection Observer API support
### Animation System Optimized Animation Hook ( src/hooks/useOptimizedAnimation.ts )
useOptimizedAnimation(variants, priority)

- Purpose : Provides performance-optimized animations
- Parameters :
  - variants (AnimationVariants): Framer Motion animation variants
  - priority (boolean): Whether animation should run even in lite mode
- Returns : Optimized animation configuration
- Features : Automatic animation disabling for reduced motion, performance-based optimization
Pre-defined Animation Variants:

- fadeIn : Simple opacity transition
- slideUp : Slide up with fade
- slideInRight : Slide from right with fade
- scale : Scale with opacity
- stagger : Staggered children animations
### Image Optimization Image Optimization Utilities ( src/utils/imageOptimization.ts )
getOptimizedImageUrl(originalUrl, options)

- Purpose : Generates optimized image URLs based on device capabilities
- Parameters : Original image URL, optimization options (width, height, quality, format)
- Returns : Promise
  - Optimized image URL
getResponsiveSrcSet(originalUrl, widths, options)

- Purpose : Creates responsive image srcSet for different screen sizes
- Returns : Promise
  - Complete srcSet string
preloadCriticalImages(urls)

- Purpose : Preloads important images for better performance
- Parameters : Array of image URLs to preload
### Admin System Content Manager ( src/components/admin/ContentManager.tsx )
- Purpose : Manages website content (pages, posts, projects)
- Features : CRUD operations, filtering, sorting, bulk actions User Manager ( src/components/admin/UserManager.tsx )
- Purpose : Handles user account management
- Features : User creation, role assignment, account status management Media Manager ( src/components/admin/MediaManager.tsx )
- Purpose : Manages uploaded media files
- Features : File upload, organization, thumbnail generation
## Project Structure
### Directory Layout
```
├── public/                     # Static assets
├── src/
│   ├── App.tsx                # Main application 
component
│   ├── main.tsx               # Application entry 
point
│   ├── assets/                # Static assets 
used in source code
│   │   ├── main-r-logo-ver.png
│   │   ├── main-r-wed.png
│   │   └── react.svg
│   ├── components/            # Reusable React 
components
│   │   ├── admin/            # Admin dashboard 
components
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── ContentManager.tsx
│   │   │   ├── BlogContentManager.tsx
│   │   │   ├── UserManager.tsx
│   │   │   ├── MediaManager.tsx
│   │   │   ├── SettingsManager.tsx
│   │   │   └── StatisticsPanel.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── AuthLayout.tsx
│   │   ├── sections/         # Page section 
components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── TechStackSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── BlogsSection.tsx
│   │   │   ├── RasaAppSection.tsx
│   │   │   ├── RasaSmartCaseSection.tsx
│   │   │   ├── RasaSignsSection.tsx
│   │   │   ├── lite/          # Lite versions for 
performance
│   │   │   └── utils/         # Section utilities
│   │   ├── signboard/        # Signboard designer 
components
│   │   │   └── constants.ts   # Signboard-related 
constants
│   │   └── ui/               # Generic UI 
components
│   │       ├── LoadingScreen.tsx
│   │       ├── ModeSwitcher.tsx
│   │       ├── ProjectCard.tsx
│   │       ├── ServiceCard.tsx
│   │       ├── OptimizedImage.tsx
│   │       ├── ParticleBackground.tsx
│   │       └── SectionWrapper.tsx
│   ├── contexts/             # React Context 
providers
│   │   └── PerformanceContext.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useInView.ts
│   │   ├── useOptimizedAnimation.ts
│   │   └── usePerformance.ts
│   ├── pages/                # Route components
│   │   ├── AboutPage.tsx
│   │   ├── AdminDashboardPage.tsx
│   │   ├── BlogPage.tsx
│   │   ├── BlogPostPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── FeaturesPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── LiteHomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── PricingPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── SignBoardPage.tsx
│   │   └── SignUpPage.tsx
│   ├── services/             # External API 
integrations
│   │   ├── geminiService.ts
│   │   ├── huggingFaceService.ts
│   │   └── signboardService.ts
│   ├── styles/               # SCSS stylesheets
│   │   └── admin/           # Admin-specific 
styles
│   ├── types/                # TypeScript type 
definitions
│   │   ├── admin.ts
│   │   ├── signboard.ts
│   │   └── spline-viewer.d.ts
│   └── utils/                # Utility functions
│       ├── animations.ts
│       ├── imageOptimization.ts
│       └── performance.ts
├── scripts/                  # Build and utility 
scripts
│   ├── generate-all-images.js
│   ├── generate-placeholder-images.js
│   └── setup-test-images.sh
├── package.json              # Project 
dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.cjs      # Tailwind CSS 
configuration
├── tsconfig.json            # TypeScript 
configuration
├── netlify.toml             # Netlify deployment 
configuration
└── README.md                # Project 
documentation
```
### Important File Descriptions Configuration Files
- vite.config.ts : Vite build tool configuration with React plugin
- tailwind.config.cjs : Tailwind CSS configuration with custom colors, fonts, and animations
- tsconfig.json : TypeScript compiler configuration with strict settings
- netlify.toml : Netlify deployment configuration with SPA routing support Core Application Files
- src/App.tsx : Main application component with routing configuration
- src/main.tsx : Application entry point with React 18 concurrent features
- src/index.css : Global CSS styles and Tailwind imports Type Definitions
- src/types/signboard.ts : Complete type definitions for signboard system
- src/types/admin.ts : Admin panel type definitions
- src/types/spline-viewer.d.ts : 3D viewer component types
## Additional Information
### Contribution Guidelines Development Workflow
1. 1.
   Fork the repository and create a feature branch
2. 2.
   Follow TypeScript strict mode - all code must be properly typed
3. 3.
   Use the established folder structure - place components in appropriate directories
4. 4.
   Write performance-conscious code - consider lite mode compatibility
5. 5.
   Test on multiple devices - ensure responsive design works correctly
6. 6.
   Follow the existing code style - use ESLint configuration Code Standards
- TypeScript : Strict mode enabled, no any types allowed
- React : Use functional components with hooks
- Styling : Prefer Tailwind classes, use SCSS for complex styling
- Performance : Always consider performance implications
- Accessibility : Follow WCAG guidelines for accessibility Commit Message Format
```
type(scope): description

feat(signboard): add AI-powered text generation
fix(performance): resolve memory leak in animation 
system
docs(readme): update installation instructions
```
### Known Issues Current Limitations
1. 1.
   Missing Constants File : The src/constants.ts file referenced in geminiService.ts is missing and needs to be created with Gemini model definitions
2. 2.
   API Key Management : Environment variables need proper validation and error handling
3. 3.
   Image Generation : Hugging Face API may have rate limiting issues
4. 4.
   Mobile Performance : Some 3D animations may be too intensive for older mobile devices
5. 5.
   Persian Font Loading : Custom Persian fonts may cause layout shifts during loading Browser Compatibility
- Modern Browsers : Full feature support (Chrome 90+, Firefox 88+, Safari 14+)
- Older Browsers : Automatic fallback to lite mode
- Mobile Browsers : Optimized experience with reduced animations
### Future Development Plans Short-term Goals (Next 3 months)
1. 1.
   Complete AI Integration : Fix missing constants and improve error handling
2. 2.
   Enhanced Admin Panel : Add more content management features
3. 3.
   Performance Optimization : Implement more aggressive code splitting
4. 4.
   Mobile App : React Native version for mobile platforms
5. 5.
   Testing Suite : Comprehensive unit and integration tests Long-term Vision (6-12 months)
1. 1.
   Multi-language Support : Full internationalization system
2. 2.
   Advanced AI Features : Custom AI model training for better signboard generation
3. 3.
   E-commerce Integration : Complete ordering and payment system
4. 4.
   Real-time Collaboration : Multi-user design collaboration features
5. 5.
   Analytics Dashboard : Comprehensive usage and performance analytics
6. 6.
   API Development : Public API for third-party integrations Technical Debt
- Refactor Animation System : Consolidate animation utilities
- Improve Type Safety : Add more specific type definitions
- Optimize Bundle Size : Implement better tree shaking
- Database Integration : Replace mock data with real database
- Security Audit : Comprehensive security review and improvements
### Performance Considerations
The application implements a sophisticated performance optimization system:

- Adaptive Rendering : Automatically switches to lite mode based on device capabilities
- Lazy Loading : Components and images are loaded on demand
- Animation Optimization : Animations are disabled or simplified on low-end devices
- Image Optimization : Automatic format selection and responsive sizing
- Code Splitting : Route-based code splitting for faster initial loads
### Security Notes
- API Keys : Store sensitive keys in environment variables
- Input Validation : All user inputs are validated before processing
- CORS Configuration : Proper CORS setup for API endpoints
- Content Security Policy : Implement CSP headers for production