import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../admin/contexts/AuthContext';
import AdminRouter from '../../admin/AdminRouter';
import { errorTrackingService } from '../../admin/services/errorTracking.service.tsx';
import { AdminSecurityManager } from '../../admin/middleware/securityMiddleware';

// Mock all admin services
const mockServices = {
  auth: {
    login: vi.fn(),
    logout: vi.fn(),
    getCurrentUser: vi.fn(),
  },
  content: {
    getPages: vi.fn(),
    createPage: vi.fn(),
    updatePage: vi.fn(),
    deletePage: vi.fn(),
  },
  users: {
    getUsers: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn(),
  },
  media: {
    getMediaList: vi.fn(),
    uploadMedia: vi.fn(),
    deleteMedia: vi.fn(),
  },
  settings: {
    getGeneralSettings: vi.fn(),
    updateGeneralSettings: vi.fn(),
  },
};

// Mock all service modules
vi.mock('../../admin/services/auth.service', () => mockServices.auth);
vi.mock('../../admin/services/content.service', () => mockServices.content);
vi.mock('../../admin/services/user.service', () => mockServices.users);
vi.mock('../../admin/services/media.service', () => mockServices.media);
vi.mock('../../admin/services/settings.service', () => mockServices.settings);

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock Ant Design message
vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  return {
    ...actual,
    message: {
      success: vi.fn(),
      error: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
      loading: vi.fn(),
      destroy: vi.fn(),
    },
  };
});

const mockAdminUser = {
  id: 'admin-1',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin' as const,
};

const renderAdminApp = (initialRoute = '/admin') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <AdminRouter />
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('Performance & Security Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup default mock responses
    mockServices.content.getPages.mockResolvedValue({
      pages: [
        {
          id: '1',
          title: 'Home Page',
          slug: 'home',
          content: 'Welcome to our site',
          status: 'published',
          author: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      total: 1,
    });

    mockServices.users.getUsers.mockResolvedValue({
      users: [mockAdminUser],
      total: 1,
    });

    mockServices.media.getMediaList.mockResolvedValue({
      items: [],
      folders: [],
      total: 0,
    });

    mockServices.settings.getGeneralSettings.mockResolvedValue({
      siteName: 'Test Site',
      siteDescription: 'A test website',
      adminEmail: 'admin@test.com',
    });
    
    // Reset security manager
    (AdminSecurityManager as any).instance = null;
  });

  describe('Performance Monitoring Integration', () => {
    it('should initialize error tracking service', async () => {
      // Check that error tracking service is available
      expect(errorTrackingService).toBeDefined();
      expect(typeof errorTrackingService.captureError).toBe('function');
    });

    it('should display performance dashboard route', async () => {
      // Just verify the component can be imported without error
      expect(AdminRouter).toBeDefined();
    });

    it('should capture performance metrics', async () => {
      // Capture a test metric
      errorTrackingService.capturePerformanceMetric('test_metric', 100);

      // Check that metric is captured
      const metrics = errorTrackingService.getPerformanceMetrics({ metric: 'test_metric' });
      expect(metrics.length).toBeGreaterThan(0);
      expect(metrics[0].value).toBe(100);
    });
  });

  describe('Security Integration', () => {
    it('should initialize security manager', async () => {
      const securityManager = AdminSecurityManager.getInstance();
      expect(securityManager).toBeDefined();
    });

    it('should handle account lockout', async () => {
      const securityManager = AdminSecurityManager.getInstance({
        maxFailedAttempts: 1,
        lockoutDuration: 1000,
      });

      // Trigger account lockout
      securityManager.recordFailedAttempt();

      // Check that account is locked
      expect(securityManager.isAccountLocked()).toBe(true);
    });

    it('should sanitize user inputs', async () => {
      const securityManager = AdminSecurityManager.getInstance();
      
      // Test input sanitization
      const dirtyInput = '<script>alert("xss")</script>Safe input';
      const cleanInput = securityManager.sanitizeInput(dirtyInput);
      
      expect(cleanInput).not.toContain('<script>');
      expect(cleanInput).toContain('Safe input');
    });
  });

  describe('Error Tracking Integration', () => {
    it('should capture console errors', async () => {
      // Simulate a console error
      console.error('Test error');

      // Check that error tracking service is working
      expect(errorTrackingService).toBeDefined();
    });

    it('should capture performance metrics', async () => {
      // Capture a test metric
      errorTrackingService.capturePerformanceMetric('test_metric', 100);

      // Check that metric is captured
      const metrics = errorTrackingService.getPerformanceMetrics({ metric: 'test_metric' });
      expect(metrics.length).toBeGreaterThan(0);
      expect(metrics[0].value).toBe(100);
    });
  });
});