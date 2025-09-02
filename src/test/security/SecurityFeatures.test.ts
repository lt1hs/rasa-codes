import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  useAdminSecurity, 
  AdminSecurityManager,
  withAdminSecurity
} from '../../admin/middleware/securityMiddleware';
import { 
  generateCSP, 
  generateSecurityHeaders, 
  SecurityUtils 
} from '../../utils/security';

// Mock React hooks
const mockUseEffect = vi.fn();
const mockUseCallback = vi.fn();
const mockUseNavigate = vi.fn();

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useEffect: mockUseEffect,
    useCallback: mockUseCallback,
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: mockUseNavigate,
  };
});

// Mock Ant Design message
const mockMessage = {
  error: vi.fn(),
  success: vi.fn(),
  warning: vi.fn(),
};

vi.mock('antd', () => ({
  message: mockMessage,
}));

// Mock useAuth hook
const mockUseAuth = vi.fn();

vi.mock('../../admin/hooks/useAuth', () => ({
  useAuth: mockUseAuth,
}));

describe('Security Features', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock useEffect to call the callback immediately
    mockUseEffect.mockImplementation((callback) => {
      callback();
    });
    
    // Mock useCallback to return the function as-is
    mockUseCallback.mockImplementation((fn) => fn);
    
    // Mock useNavigate
    mockUseNavigate.mockReturnValue(vi.fn());
    
    // Mock useAuth
    mockUseAuth.mockReturnValue({
      logout: vi.fn(),
    });
    
    // Clean up any security manager instances
    (AdminSecurityManager as any).instance = null;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Security Utilities', () => {
    it('should generate CSP correctly', () => {
      const config = {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        frameSrc: ["'self'"],
        mediaSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: true,
        blockAllMixedContent: true
      };
      
      const csp = generateCSP(config);
      expect(csp).toContain('default-src \'self\'');
      expect(csp).toContain('script-src \'self\' \'unsafe-inline\'');
      expect(csp).toContain('upgrade-insecure-requests');
    });

    it('should generate security headers', () => {
      const headers = generateSecurityHeaders(false);
      expect(headers['Content-Security-Policy']).toBeDefined();
      expect(headers['X-Content-Type-Options']).toBe('nosniff');
      expect(headers['X-Frame-Options']).toBe('DENY');
    });

    it('should sanitize HTML input', () => {
      const dirtyHtml = '<script>alert("xss")</script><p>Safe content</p>';
      const cleanHtml = SecurityUtils.sanitizeHtml(dirtyHtml);
      expect(cleanHtml).not.toContain('<script>');
      expect(cleanHtml).toContain('Safe content');
    });

    it('should validate redirect URLs', () => {
      // Test valid same-origin URL
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'http://localhost:3000',
        },
        writable: true,
      });
      
      expect(SecurityUtils.isValidRedirectUrl('/dashboard')).toBe(true);
      expect(SecurityUtils.isValidRedirectUrl('http://localhost:3000/admin')).toBe(true);
    });

    it('should generate nonce', () => {
      const nonce = SecurityUtils.generateNonce();
      expect(nonce).toBeDefined();
      expect(typeof nonce).toBe('string');
      expect(nonce.length).toBeGreaterThan(0);
    });

    it('should check secure context', () => {
      Object.defineProperty(window, 'location', {
        value: {
          protocol: 'https:',
        },
        writable: true,
      });
      
      expect(SecurityUtils.isSecureContext()).toBe(true);
    });
  });

  describe('Admin Security Manager', () => {
    it('should be a singleton', () => {
      const instance1 = AdminSecurityManager.getInstance();
      const instance2 = AdminSecurityManager.getInstance();
      expect(instance1).toBe(instance2);
    });

    it('should record failed attempts', () => {
      const securityManager = AdminSecurityManager.getInstance({
        maxFailedAttempts: 1,
        lockoutDuration: 1000,
      });
      
      securityManager.recordFailedAttempt();
      expect(securityManager.isAccountLocked()).toBe(true);
    });

    it('should sanitize input', () => {
      const securityManager = AdminSecurityManager.getInstance();
      const dirtyInput = '<script>alert("xss")</script>Safe input';
      const cleanInput = securityManager.sanitizeInput(dirtyInput);
      expect(cleanInput).not.toContain('<script>');
      expect(cleanInput).toContain('Safe input');
    });
  });

  describe('Admin Security Hook', () => {
    it('should provide security functions', () => {
      const {
        recordFailedAttempt,
        sanitizeInput,
        isAccountLocked,
        getLockoutTimeRemaining,
        handleSecurityViolation
      } = useAdminSecurity();
      
      expect(typeof recordFailedAttempt).toBe('function');
      expect(typeof sanitizeInput).toBe('function');
      expect(typeof isAccountLocked).toBe('function');
      expect(typeof getLockoutTimeRemaining).toBe('function');
      expect(typeof handleSecurityViolation).toBe('function');
    });
  });
});