import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

// Bundle analyzer configuration
export default defineConfig({
  plugins: [
    react(),
    // Add bundle analyzer
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap' // Options: treemap, sunburst, network
    })
  ],
  
  build: {
    // Enhanced bundle analysis
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React chunks
          'react-core': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          
          // UI Library chunks
          'antd-core': ['antd'],
          'antd-icons': ['@ant-design/icons'],
          
          // Form handling
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          
          // Animation and charts
          'animation': ['framer-motion'],
          'charts': ['recharts'],
          
          // Utilities
          'utils': ['dayjs', 'axios'],
          
          // Admin specific chunks
          'admin-auth': [
            './src/admin/contexts/AuthContext',
            './src/admin/hooks/useAuth',
            './src/admin/services/auth.service'
          ],
          'admin-components': [
            './src/admin/components/common/ProtectedRoute',
            './src/admin/components/common/AdminLoadingSpinner'
          ],
          'admin-layouts': [
            './src/admin/layouts/AdminLayout',
            './src/admin/layouts/AdminSidebar'
          ],
          'admin-pages': [
            './src/admin/pages/dashboard/Dashboard',
            './src/admin/pages/analytics/Analytics'
          ],
          'admin-content': [
            './src/admin/pages/content/ContentManagement',
            './src/admin/components/content/ContentEditor'
          ],
          'admin-users': [
            './src/admin/pages/users/UserManagement',
            './src/admin/components/users/UserForm'
          ],
          'admin-media': [
            './src/admin/pages/media/MediaManagement',
            './src/admin/components/media/MediaLibrary'
          ],
          'admin-settings': [
            './src/admin/pages/settings/SettingsManagement',
            './src/admin/pages/settings/GeneralSettings',
            './src/admin/pages/settings/SecuritySettings',
            './src/admin/pages/settings/IntegrationsSettings'
          ]
        }
      }
    },
    
    // Performance optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        dead_code: true,
        unused: true,
        // Keep function names for better debugging
        keep_fnames: false,
        // Remove comments
        keep_comments: false
      },
      mangle: {
        // Keep class names for debugging
        keep_classnames: false,
        // Keep function names for debugging
        keep_fnames: false
      },
      format: {
        // Remove comments
        comments: false
      }
    },
    
    // Report file sizes
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500, // Warn for chunks larger than 500kb
    
    // Source maps for production debugging (can be disabled for smaller bundles)
    sourcemap: false
  },
  
  // Resolve aliases for cleaner imports
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@admin': resolve(__dirname, 'src/admin'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@services': resolve(__dirname, 'src/services'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@types': resolve(__dirname, 'src/types'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@contexts': resolve(__dirname, 'src/contexts'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  }
});