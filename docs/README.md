# Modern Admin Dashboard System

A comprehensive, professional-grade admin dashboard built with React 18, TypeScript, and Ant Design. This system provides a complete content management solution with advanced features for user management, media handling, analytics, and system configuration.

## 🚀 Features

### Core Features
- **Modern Authentication System** with JWT and role-based access control
- **Content Management** for pages, blog posts, and projects
- **User Management** with permissions and role management
- **Media Library** with advanced file organization and metadata
- **Analytics Dashboard** with real-time metrics and reporting
- **Settings Management** for system configuration and security
- **Responsive Design** that works on desktop, tablet, and mobile

### Technical Features
- **TypeScript** for type safety and better development experience
- **Ant Design** for consistent, professional UI components
- **React Hook Form** with Zod validation for robust form handling
- **Framer Motion** for smooth animations and transitions
- **React Query** for efficient data fetching and caching
- **Comprehensive Testing** with Vitest and React Testing Library
- **Performance Optimized** with code splitting and lazy loading

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd new-rasa-copy-6
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_HUGGINGFACE_API_TOKEN=your_token_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Main site: `http://localhost:5173`
   - Admin panel: `http://localhost:5173/admin`

## 🏗️ Project Structure

```
src/
├── admin/                      # Admin dashboard module
│   ├── components/             # Reusable admin components
│   │   ├── charts/            # Analytics and chart components
│   │   ├── common/            # Common UI components
│   │   ├── content/           # Content management components
│   │   ├── media/             # Media library components
│   │   └── users/             # User management components
│   ├── contexts/              # React contexts for state management
│   ├── hooks/                 # Custom React hooks
│   ├── layouts/               # Layout components
│   ├── pages/                 # Page components
│   │   ├── analytics/         # Analytics pages
│   │   ├── content/           # Content management pages
│   │   ├── settings/          # Settings pages
│   │   └── users/             # User management pages
│   ├── services/              # API service layer
│   ├── types/                 # TypeScript type definitions
│   ├── schemas/               # Zod validation schemas
│   └── constants/             # Constants and configuration
├── components/                # Main site components
├── pages/                     # Main site pages
├── contexts/                  # Global contexts
├── services/                  # Shared services
├── types/                     # Shared type definitions
├── utils/                     # Utility functions
└── test/                      # Test files and utilities
```

## 🎯 Usage

### Accessing the Admin Panel

1. Navigate to `/admin` in your browser
2. Log in with admin credentials:
   - Email: `admin@example.com`
   - Password: `admin123` (change this in production!)

### Main Features

#### Dashboard
- Overview of site metrics and analytics
- Quick access to common tasks
- Recent activity feed
- System status indicators

#### Content Management
- Create and edit pages, blog posts, and projects
- Rich text editor with media embedding
- SEO optimization tools
- Content scheduling and versioning

#### User Management
- Add, edit, and manage user accounts
- Role-based permissions system
- User activity monitoring
- Bulk user operations

#### Media Library
- Upload and organize media files
- Advanced search and filtering
- Bulk operations and metadata editing
- CDN integration support

#### Analytics
- Real-time visitor tracking
- Content performance metrics
- Custom report generation
- Export capabilities

#### Settings
- General site configuration
- Security and authentication settings
- Third-party integrations
- System maintenance tools

## 🧪 Testing

The project includes comprehensive test coverage:

### Running Tests
```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Individual components and functions
- **Integration Tests**: Complete user workflows
- **API Tests**: Service layer and data handling
- **E2E Tests**: Full application workflows

### Test Files
- `src/test/` - Test utilities and setup
- `*.test.ts` - Unit test files
- `*.test.tsx` - Component test files
- `integration/` - Integration test suites

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options

#### Static Hosting (Netlify, Vercel, GitHub Pages)
1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting provider
3. Configure redirects for React Router (if needed)

#### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

#### Server Deployment
- Build the project locally or in CI/CD
- Upload build files to web server
- Configure web server for SPA routing
- Set up SSL certificates
- Configure environment variables

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# External Services
VITE_HUGGINGFACE_API_TOKEN=your_token_here
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXX-X

# Features
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false

# Security
VITE_SESSION_TIMEOUT=3600000
VITE_MAX_LOGIN_ATTEMPTS=5
```

### Build Configuration
The project uses Vite for building and bundling:
- `vite.config.ts` - Main Vite configuration
- `vitest.config.ts` - Test configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

### Customization
You can customize the admin system by:
- Modifying theme colors in `tailwind.config.js`
- Adding new routes in `admin/constants/routes.ts`
- Creating custom components in `admin/components/`
- Extending the API services in `admin/services/`

## 📚 Documentation

### Available Documentation
- **[API Documentation](./API_Documentation.md)** - Complete API reference
- **[User Manual](./User_Manual.md)** - End-user guide
- **[Component Documentation](./components/)** - Component API reference
- **[Testing Guide](./testing/)** - Testing strategies and examples

### Code Documentation
- All components include JSDoc comments
- TypeScript interfaces are fully documented
- Complex functions include inline comments
- README files in major directories

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Permission-level granular control
- Session management and timeout

### Security Measures
- Input validation and sanitization
- XSS protection
- CSRF protection
- File upload security
- Rate limiting (when backend supports)

### Best Practices
- Secure password policies
- Two-factor authentication support
- Audit logging
- IP whitelisting/blacklisting
- Regular security updates

## 🎨 Theming and Customization

### UI Customization
The admin system uses Ant Design with custom theming:

```typescript
// Customize theme in your configuration
const theme = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorError: '#ff4d4f',
    borderRadius: 6,
  },
  components: {
    Button: {
      colorPrimary: '#1890ff',
    },
  },
};
```

### Custom Components
Create custom admin components by extending the base components:

```typescript
import { AdminCard } from '../components/common/AdminCard';

const CustomCard = ({ children, ...props }) => {
  return (
    <AdminCard className="custom-card" {...props}>
      {children}
    </AdminCard>
  );
};
```

## 📊 Performance

### Optimization Features
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo and useMemo optimizations
- **Bundle Analysis**: Regular bundle size monitoring
- **Caching**: API response caching with React Query

### Performance Monitoring
- Built-in performance metrics
- Real-time performance tracking
- Bundle size analysis tools
- Loading time optimization

## 🐛 Troubleshooting

### Common Issues

#### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Clear build cache
rm -rf dist .vite
```

#### Development Issues
```bash
# Reset development server
npm run dev -- --force

# Check for port conflicts
lsof -ti:5173
```

#### Test Issues
```bash
# Clear test cache
npm test -- --clearCache

# Run tests in watch mode
npm test -- --watch
```

### Getting Help
1. Check the [documentation](./docs/)
2. Review [common issues](./docs/troubleshooting.md)
3. Search existing issues in the repository
4. Create a new issue with detailed information

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines:

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Standards
- Follow TypeScript strict mode
- Use ESLint and Prettier for code formatting
- Write tests for new features
- Document public APIs
- Follow existing code patterns

### Pull Request Process
1. Update documentation if needed
2. Add tests for new functionality
3. Ensure CI/CD passes
4. Request review from maintainers
5. Address feedback promptly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Ant Design** for the comprehensive UI library
- **Vite** for the lightning-fast build tool
- **TypeScript** for type safety
- **Open Source Community** for inspiration and tools

## 📞 Support

- **Documentation**: Check the docs/ directory
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact the development team

---

Built with ❤️ using modern web technologies. Happy coding!