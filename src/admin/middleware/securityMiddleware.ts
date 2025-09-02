import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAuth } from '../hooks/useAuth';

/**
 * Security middleware for admin system
 * Provides runtime security checks and protections
 */

interface SecurityConfig {
  maxSessionDuration?: number; // in milliseconds
  inactivityTimeout?: number; // in milliseconds
  maxFailedAttempts?: number;
  lockoutDuration?: number; // in milliseconds
  enableXSSProtection?: boolean;
  enableCSRFProtection?: boolean;
  enableClickjackingProtection?: boolean;
}

interface SecurityState {
  failedAttempts: number;
  lastActivity: number;
  isLocked: boolean;
  lockoutEndTime: number | null;
}

const defaultSecurityConfig: SecurityConfig = {
  maxSessionDuration: 8 * 60 * 60 * 1000, // 8 hours
  inactivityTimeout: 30 * 60 * 1000, // 30 minutes
  maxFailedAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes
  enableXSSProtection: true,
  enableCSRFProtection: true,
  enableClickjackingProtection: true
};

class AdminSecurityManager {
  private static instance: AdminSecurityManager;
  private config: SecurityConfig;
  private state: SecurityState;
  private activityTimer: NodeJS.Timeout | null = null;
  private sessionTimer: NodeJS.Timeout | null = null;
  private observers: MutationObserver[] = [];

  private constructor(config: SecurityConfig = defaultSecurityConfig) {
    this.config = config;
    this.state = {
      failedAttempts: 0,
      lastActivity: Date.now(),
      isLocked: false,
      lockoutEndTime: null
    };
    
    this.initializeSecurity();
  }

  public static getInstance(config?: SecurityConfig): AdminSecurityManager {
    if (!AdminSecurityManager.instance) {
      AdminSecurityManager.instance = new AdminSecurityManager(config);
    }
    return AdminSecurityManager.instance;
  }

  private initializeSecurity() {
    // Set up activity tracking
    this.setupActivityTracking();
    
    // Set up session management
    this.setupSessionManagement();
    
    // Set up DOM security monitoring
    this.setupDOMSecurity();
    
    // Set up network security
    this.setupNetworkSecurity();
  }

  private setupActivityTracking() {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const updateActivity = () => {
      this.state.lastActivity = Date.now();
      this.state.failedAttempts = 0; // Reset failed attempts on activity
    };

    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    // Periodic activity check
    this.activityTimer = setInterval(() => {
      const now = Date.now();
      const inactiveTime = now - this.state.lastActivity;
      
      // Check for inactivity timeout
      if (inactiveTime > (this.config.inactivityTimeout || 0)) {
        this.handleInactivityTimeout();
      }
      
      // Check for lockout expiration
      if (this.state.isLocked && this.state.lockoutEndTime && now > this.state.lockoutEndTime) {
        this.clearLockout();
      }
    }, 60000); // Check every minute
  }

  private setupSessionManagement() {
    if (!this.config.maxSessionDuration) return;
    
    this.sessionTimer = setTimeout(() => {
      this.handleSessionTimeout();
    }, this.config.maxSessionDuration);
  }

  private setupDOMSecurity() {
    // Monitor for DOM modifications that could indicate XSS
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              
              // Check for potentially dangerous attributes
              ['onload', 'onerror', 'onclick', 'onmouseover'].forEach(attr => {
                if (element.hasAttribute(attr)) {
                  console.warn(`Potentially dangerous attribute detected: ${attr}`);
                  // In production, you might want to remove or sanitize
                }
              });
              
              // Check for script tags
              if (element.tagName === 'SCRIPT') {
                console.warn('Script tag detected in DOM');
                // In production, you might want to remove
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    this.observers.push(observer);
  }

  private setupNetworkSecurity() {
    // Intercept fetch requests for security checks
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      // Add CSRF protection if enabled
      if (this.config.enableCSRFProtection) {
        const [url, options = {}] = args;
        
        // Add CSRF token to requests that modify data
        if (options.method && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method.toUpperCase())) {
          const csrfToken = this.getCSRFToken();
          if (csrfToken) {
            options.headers = {
              ...options.headers,
              'X-CSRF-Token': csrfToken
            };
          }
        }
      }
      
      return originalFetch(...args);
    };

    // Intercept XMLHttpRequest for security checks
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(...args) {
      const method = args[0];
      
      // Add CSRF protection if enabled
      if (this.config.enableCSRFProtection && 
          typeof method === 'string' && 
          ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method.toUpperCase())) {
        const csrfToken = this.getCSRFToken();
        if (csrfToken) {
          this.setRequestHeader('X-CSRF-Token', csrfToken);
        }
      }
      
      return originalXHROpen.apply(this, args);
    };
  }

  private getCSRFToken(): string | null {
    // In a real implementation, this would retrieve the CSRF token
    // from a secure storage mechanism
    return localStorage.getItem('csrf-token');
  }

  public recordFailedAttempt() {
    this.state.failedAttempts++;
    
    if (this.state.failedAttempts >= (this.config.maxFailedAttempts || 5)) {
      this.lockAccount();
    }
  }

  private lockAccount() {
    this.state.isLocked = true;
    this.state.lockoutEndTime = Date.now() + (this.config.lockoutDuration || 900000);
    
    // Clear any existing session
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    message.error('Account locked due to too many failed attempts. Try again later.');
  }

  public clearLockout() {
    this.state.isLocked = false;
    this.state.lockoutEndTime = null;
    this.state.failedAttempts = 0;
    
    message.success('Account unlocked. You can now try logging in again.');
  }

  public isAccountLocked(): boolean {
    return this.state.isLocked;
  }

  public getLockoutTimeRemaining(): number | null {
    if (!this.state.lockoutEndTime) return null;
    return Math.max(0, this.state.lockoutEndTime - Date.now());
  }

  private handleInactivityTimeout() {
    message.warning('Session expired due to inactivity. Please log in again.');
    this.logoutUser();
  }

  private handleSessionTimeout() {
    message.warning('Session expired. Please log in again.');
    this.logoutUser();
  }

  private logoutUser() {
    // Clear all storage
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Redirect to login
    window.location.href = '/admin/login';
  }

  public sanitizeInput(input: string): string {
    if (!this.config.enableXSSProtection) return input;
    
    // Basic XSS sanitization
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/<iframe\b[^>]*>/gi, '')
      .replace(/<object\b[^>]*>/gi, '')
      .replace(/<embed\b[^>]*>/gi, '');
  }

  public destroy() {
    if (this.activityTimer) {
      clearInterval(this.activityTimer);
    }
    
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
    }
    
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

/**
 * React hook for admin security
 */
export function useAdminSecurity(config?: SecurityConfig) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const securityManager = AdminSecurityManager.getInstance(config);

  // Handle account lockout
  useEffect(() => {
    const interval = setInterval(() => {
      if (securityManager.isAccountLocked()) {
        const remaining = securityManager.getLockoutTimeRemaining();
        if (remaining === 0) {
          securityManager.clearLockout();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [securityManager]);

  const recordFailedAttempt = useCallback(() => {
    securityManager.recordFailedAttempt();
  }, [securityManager]);

  const sanitizeInput = useCallback((input: string): string => {
    return securityManager.sanitizeInput(input);
  }, [securityManager]);

  const isAccountLocked = useCallback((): boolean => {
    return securityManager.isAccountLocked();
  }, [securityManager]);

  const getLockoutTimeRemaining = useCallback((): number | null => {
    return securityManager.getLockoutTimeRemaining();
  }, [securityManager]);

  const handleSecurityViolation = useCallback((violationType: string) => {
    console.warn(`Security violation detected: ${violationType}`);
    message.error('Security violation detected. Action blocked.');
    
    // Log the violation (in production, send to security monitoring service)
    // For now, we'll just log to console
  }, []);

  return {
    recordFailedAttempt,
    sanitizeInput,
    isAccountLocked,
    getLockoutTimeRemaining,
    handleSecurityViolation
  };
}

/**
 * Higher-order component for securing admin routes
 */
export function withAdminSecurity<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function SecuredComponent(props: P) {
    const { isAccountLocked } = useAdminSecurity();
    
    if (isAccountLocked) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
            <h2 className="text-xl font-bold mb-4">Account Locked</h2>
            <p className="text-gray-600 mb-4">
              Your account has been temporarily locked due to multiple failed login attempts.
            </p>
            <p className="text-gray-500 text-sm">
              Please try again later or contact your administrator.
            </p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}

// Export the security manager for direct use if needed
export { AdminSecurityManager };

// Export types
export type { SecurityConfig, SecurityState };