/**
 * Security Configuration and CSP Utilities
 * Implements Content Security Policy and other security headers
 */

interface CSPConfig {
  defaultSrc: string[];
  scriptSrc: string[];
  styleSrc: string[];
  imgSrc: string[];
  fontSrc: string[];
  connectSrc: string[];
  frameSrc: string[];
  mediaSrc: string[];
  objectSrc: string[];
  baseUri: string[];
  formAction: string[];
  upgradeInsecureRequests: boolean;
  blockAllMixedContent: boolean;
}

interface SecurityHeaders {
  'Content-Security-Policy': string;
  'X-Content-Type-Options': string;
  'X-Frame-Options': string;
  'X-XSS-Protection': string;
  'Referrer-Policy': string;
  'Permissions-Policy': string;
  'Strict-Transport-Security': string;
}

// Default CSP configuration for the admin system
export const defaultCSPConfig: CSPConfig = {
  defaultSrc: ["'self'"],
  scriptSrc: [
    "'self'",
    "'unsafe-inline'", // Required for Vite in development
    "'unsafe-eval'", // Required for Vite in development
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://connect.facebook.net"
  ],
  styleSrc: [
    "'self'",
    "'unsafe-inline'", // Required for styled-components and Ant Design
    "https://fonts.googleapis.com",
    "https://cdn.jsdelivr.net"
  ],
  imgSrc: [
    "'self'",
    "data:",
    "blob:",
    "https:",
    "https://images.unsplash.com",
    "https://via.placeholder.com",
    "https://www.google-analytics.com"
  ],
  fontSrc: [
    "'self'",
    "data:",
    "https://fonts.gstatic.com",
    "https://cdn.jsdelivr.net"
  ],
  connectSrc: [
    "'self'",
    "https://api.example.com", // Replace with your API domain
    "https://www.google-analytics.com",
    "https://api.openai.com",
    "https://api-inference.huggingface.co",
    "wss:", // WebSocket connections
    "ws:" // WebSocket connections (development)
  ],
  frameSrc: [
    "'self'",
    "https://www.youtube.com",
    "https://player.vimeo.com"
  ],
  mediaSrc: [
    "'self'",
    "data:",
    "blob:",
    "https:"
  ],
  objectSrc: ["'none'"],
  baseUri: ["'self'"],
  formAction: ["'self'"],
  upgradeInsecureRequests: process.env.NODE_ENV === 'production',
  blockAllMixedContent: process.env.NODE_ENV === 'production'
};

// Production CSP configuration (more restrictive)
export const productionCSPConfig: CSPConfig = {
  ...defaultCSPConfig,
  scriptSrc: [
    "'self'",
    // Remove unsafe-inline and unsafe-eval for production
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com"
  ],
  styleSrc: [
    "'self'",
    // Use nonce or hash for production instead of unsafe-inline
    "https://fonts.googleapis.com"
  ]
};

/**
 * Generate CSP header string from configuration
 */
export function generateCSP(config: CSPConfig): string {
  const directives: string[] = [];

  // Add each directive
  if (config.defaultSrc.length) {
    directives.push(`default-src ${config.defaultSrc.join(' ')}`);
  }
  
  if (config.scriptSrc.length) {
    directives.push(`script-src ${config.scriptSrc.join(' ')}`);
  }
  
  if (config.styleSrc.length) {
    directives.push(`style-src ${config.styleSrc.join(' ')}`);
  }
  
  if (config.imgSrc.length) {
    directives.push(`img-src ${config.imgSrc.join(' ')}`);
  }
  
  if (config.fontSrc.length) {
    directives.push(`font-src ${config.fontSrc.join(' ')}`);
  }
  
  if (config.connectSrc.length) {
    directives.push(`connect-src ${config.connectSrc.join(' ')}`);
  }
  
  if (config.frameSrc.length) {
    directives.push(`frame-src ${config.frameSrc.join(' ')}`);
  }
  
  if (config.mediaSrc.length) {
    directives.push(`media-src ${config.mediaSrc.join(' ')}`);
  }
  
  if (config.objectSrc.length) {
    directives.push(`object-src ${config.objectSrc.join(' ')}`);
  }
  
  if (config.baseUri.length) {
    directives.push(`base-uri ${config.baseUri.join(' ')}`);
  }
  
  if (config.formAction.length) {
    directives.push(`form-action ${config.formAction.join(' ')}`);
  }

  // Add security directives
  if (config.upgradeInsecureRequests) {
    directives.push('upgrade-insecure-requests');
  }
  
  if (config.blockAllMixedContent) {
    directives.push('block-all-mixed-content');
  }

  return directives.join('; ');
}

/**
 * Generate all security headers
 */
export function generateSecurityHeaders(isDevelopment = false): SecurityHeaders {
  const cspConfig = isDevelopment ? defaultCSPConfig : productionCSPConfig;
  
  return {
    'Content-Security-Policy': generateCSP(cspConfig),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': [
      'accelerometer=()',
      'camera=()',
      'geolocation=()',
      'gyroscope=()',
      'magnetometer=()',
      'microphone=()',
      'payment=()',
      'usb=()'
    ].join(', '),
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
  };
}

/**
 * Validate CSP configuration
 */
export function validateCSPConfig(config: CSPConfig): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check for unsafe directives in production
  if (process.env.NODE_ENV === 'production') {
    if (config.scriptSrc.includes("'unsafe-inline'")) {
      errors.push("unsafe-inline in script-src should be avoided in production");
    }
    
    if (config.scriptSrc.includes("'unsafe-eval'")) {
      errors.push("unsafe-eval in script-src should be avoided in production");
    }
    
    if (config.styleSrc.includes("'unsafe-inline'")) {
      errors.push("Consider using nonce or hash instead of unsafe-inline for styles in production");
    }
  }

  // Check for overly permissive directives
  if (config.defaultSrc.includes('*')) {
    errors.push("Wildcard (*) in default-src is too permissive");
  }
  
  if (config.scriptSrc.includes('*')) {
    errors.push("Wildcard (*) in script-src is dangerous");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Apply security headers to HTML
 */
export function injectSecurityHeaders(html: string, isDevelopment = false): string {
  const headers = generateSecurityHeaders(isDevelopment);
  
  let updatedHtml = html;
  
  // Inject CSP meta tag if not present
  if (!html.includes('http-equiv="Content-Security-Policy"')) {
    const cspMeta = `<meta http-equiv="Content-Security-Policy" content="${headers['Content-Security-Policy']}">`;
    updatedHtml = updatedHtml.replace('<head>', `<head>\n    ${cspMeta}`);
  }
  
  // Inject other security meta tags
  const securityMetas = [
    `<meta http-equiv="X-Content-Type-Options" content="${headers['X-Content-Type-Options']}">`,
    `<meta http-equiv="X-Frame-Options" content="${headers['X-Frame-Options']}">`,
    `<meta http-equiv="X-XSS-Protection" content="${headers['X-XSS-Protection']}">`,
    `<meta http-equiv="Referrer-Policy" content="${headers['Referrer-Policy']}">`
  ];
  
  securityMetas.forEach(meta => {
    if (!updatedHtml.includes(meta)) {
      updatedHtml = updatedHtml.replace('<head>', `<head>\n    ${meta}`);
    }
  });
  
  return updatedHtml;
}

/**
 * Security utilities for runtime
 */
export const SecurityUtils = {
  /**
   * Sanitize HTML content to prevent XSS
   */
  sanitizeHtml: (html: string): string => {
    // Basic HTML sanitization - in production, use a library like DOMPurify
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/style\s*=/gi, '')
      .replace(/<iframe\b[^>]*>/gi, '')
      .replace(/<object\b[^>]*>/gi, '')
      .replace(/<embed\b[^>]*>/gi, '');
  },

  /**
   * Validate URL to prevent open redirects
   */
  isValidRedirectUrl: (url: string): boolean => {
    try {
      const parsed = new URL(url, window.location.origin);
      
      // Only allow same-origin redirects or relative URLs
      return parsed.origin === window.location.origin || url.startsWith('/');
    } catch {
      return false;
    }
  },

  /**
   * Generate a random nonce for inline scripts/styles
   */
  generateNonce: (): string => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Check if the current context is secure (HTTPS)
   */
  isSecureContext: (): boolean => {
    return window.location.protocol === 'https:' || 
           window.location.hostname === 'localhost' ||
           window.location.hostname === '127.0.0.1';
  },

  /**
   * Implement rate limiting for API calls
   */
  createRateLimiter: (maxRequests: number, timeWindow: number) => {
    const requests: number[] = [];
    
    return {
      isAllowed: (): boolean => {
        const now = Date.now();
        const windowStart = now - timeWindow;
        
        // Remove old requests
        while (requests.length > 0 && requests[0] < windowStart) {
          requests.shift();
        }
        
        if (requests.length < maxRequests) {
          requests.push(now);
          return true;
        }
        
        return false;
      },
      
      reset: (): void => {
        requests.length = 0;
      }
    };
  }
};

// Export types for external use
export type { CSPConfig, SecurityHeaders };