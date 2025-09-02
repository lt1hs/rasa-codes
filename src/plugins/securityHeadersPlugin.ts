import { Plugin } from 'vite';
import { generateSecurityHeaders, injectSecurityHeaders } from '../utils/security';

/**
 * Vite plugin to inject security headers into HTML files
 */
export function securityHeadersPlugin(): Plugin {
  let isDevelopment = false;

  return {
    name: 'vite-plugin-security-headers',
    
    configResolved(config) {
      isDevelopment = config.mode === 'development';
    },

    transformIndexHtml(html) {
      // Inject security headers into HTML
      return injectSecurityHeaders(html, isDevelopment);
    },

    configureServer(server) {
      // Add security headers to dev server responses
      server.middlewares.use((req, res, next) => {
        const headers = generateSecurityHeaders(isDevelopment);
        
        // Set security headers
        Object.entries(headers).forEach(([key, value]) => {
          res.setHeader(key, value);
        });

        next();
      });
    },

    // Add security headers to preview server
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const headers = generateSecurityHeaders(false); // Production headers for preview
        
        // Set security headers
        Object.entries(headers).forEach(([key, value]) => {
          res.setHeader(key, value);
        });

        next();
      });
    }
  };
}