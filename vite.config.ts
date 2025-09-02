import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { securityHeadersPlugin } from './src/plugins/securityHeadersPlugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    securityHeadersPlugin() // Add security headers plugin
  ],
  
  // Build optimization
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'antd-vendor': ['antd'],
          'antd-icons': ['@ant-design/icons'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'animation-vendor': ['framer-motion'],
          'chart-vendor': ['recharts'],
          
          // Admin chunks
          'admin-core': [
            './src/admin/contexts/AuthContext',
            './src/admin/layouts/AdminLayout',
            './src/admin/layouts/AdminSidebar'
          ],
          'admin-components': [
            './src/admin/components/common/ProtectedRoute',
            './src/admin/components/charts/AnalyticsCharts',
            './src/admin/components/charts/RealTimeMetrics'
          ],
          'admin-services': [
            './src/admin/services/auth.service',
            './src/admin/services/content.service',
            './src/admin/services/user.service',
            './src/admin/services/media.service',
            './src/admin/services/settings.service'
          ]
        },
        
        // Optimize chunk naming
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name.includes('vendor')) {
            return 'assets/vendor/[name]-[hash].js';
          }
          if (chunkInfo.name.includes('admin')) {
            return 'assets/admin/[name]-[hash].js';
          }
          return 'assets/[name]-[hash].js';
        },
        
        // Optimize asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash].[ext]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash].[ext]';
          }
          if (ext === 'css') {
            return 'assets/css/[name]-[hash].[ext]';
          }
          
          return 'assets/[name]-[hash].[ext]';
        }
      }
    },
    
    // Enable tree shaking
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        dead_code: true,
        unused: true
      },
      mangle: {
        safari10: true
      }
    },
    
    // Source maps for production debugging
    sourcemap: false, // Set to true for debugging
    
    // Target modern browsers
    target: 'esnext'
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'antd',
      '@ant-design/icons',
      'react-hook-form',
      'zod',
      'framer-motion',
      'dayjs'
    ],
    exclude: [
      // Exclude large dependencies that should be loaded separately
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ]
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@admin': resolve(__dirname, 'src/admin'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@services': resolve(__dirname, 'src/services'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@types': resolve(__dirname, 'src/types'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  },
  
  // Development server optimization
  server: {
    hmr: {
      overlay: true
    },
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..', '.']
    }
  },
  
  // CSS optimization
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
});
