import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import { ADMIN_ROUTES } from './constants/routes';


// Lazy load components for better performance
const AdminLogin = lazy(() => import('./pages/auth/AdminLogin'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const ContentManagement = lazy(() => import('./pages/content/ContentManagement'));
const ContentEditor = lazy(() => import('./pages/content/ContentEditor'));
const UserManagement = lazy(() => import('./pages/users/UserManagement'));
const UserEditor = lazy(() => import('./pages/users/UserEditor'));
const MediaLibrary = lazy(() => import('./pages/media/MediaLibrary'));
const Analytics = lazy(() => import('./pages/analytics/Analytics'));
const SettingsManagement = lazy(() => import('./pages/settings/SettingsManagement'));
const PerformanceDashboard = lazy(() => import('./components/performance/PerformanceDashboard'));
const QRCodeManager = lazy(() => import('./pages/QRCodeManager'));
const SignboardManagement = lazy(() => import('./pages/SignboardManagement'));
const HomePageManagement = lazy(() => import('./pages/HomePageManagement'));
const BlogManagement = lazy(() => import('./components/blog/BlogManagement'));
const BlogEditor = lazy(() => import('./components/blog/BlogEditor'));

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <Spin size="large" />
      <p className="mt-4 text-gray-600">Loading admin panel...</p>
    </div>
  </div>
);

// Admin Router Component
const AdminRouter: React.FC = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Admin Routes */}
          <Route path="/login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard */}
            <Route 
              index 
              element={<Navigate to="dashboard" replace />} 
            />
            <Route 
              path="dashboard" 
              element={
                <ProtectedRoute permission="admin.dashboard.view">
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Content Management Routes */}
            <Route path="content/*" element={
              <ProtectedRoute permission="content.view">
                <Routes>
                  <Route index element={<ContentManagement />} />
                  <Route path="new" element={<ContentEditor />} />
                  <Route path="edit/:id" element={<ContentEditor />} />
                  <Route path="posts" element={<BlogManagement />} />
                  <Route path="pages" element={<ContentManagement />} />
                  <Route path="categories" element={<ContentManagement />} />
                </Routes>
              </ProtectedRoute>
            } />
            
            {/* Blog Management Routes */}
            <Route path="blog/*" element={
              <ProtectedRoute permission="content.view">
                <Routes>
                  <Route index element={<BlogManagement />} />
                  <Route path="new" element={<BlogEditor />} />
                  <Route path="edit/:id" element={<BlogEditor />} />
                </Routes>
              </ProtectedRoute>
            } />
            
            {/* User Management Routes */}
            <Route path="users/*" element={
              <ProtectedRoute permission="users.view">
                <Routes>
                  <Route index element={<UserManagement />} />
                  <Route path="new" element={<UserEditor />} />
                  <Route path="edit/:id" element={<UserEditor />} />
                  <Route path="all" element={<UserManagement />} />
                  <Route path="roles" element={<UserManagement />} />
                </Routes>
              </ProtectedRoute>
            } />
            
            {/* Media Management Routes */}
            <Route path="media/*" element={
              <ProtectedRoute permission="media.view">
                <Routes>
                  <Route index element={<MediaLibrary />} />
                  <Route path="upload" element={<MediaLibrary />} />
                </Routes>
              </ProtectedRoute>
            } />
            
            {/* Analytics Routes */}
            <Route path="analytics/*" element={
              <ProtectedRoute permission="analytics.view">
                <Routes>
                  <Route index element={<Analytics />} />
                  <Route path="overview" element={<Analytics />} />
                  <Route path="reports" element={<Analytics />} />
                </Routes>
              </ProtectedRoute>
            } />
            
            {/* QR Code Management Routes */}
            <Route path="qr-codes" element={<QRCodeManager />} />
            
            {/* Signboard Management Routes */}
            <Route path="signboard" element={<SignboardManagement />} />
            
            {/* Home Page Management Routes */}
            <Route path="homepage" element={<HomePageManagement />} />
            
            {/* Settings Routes */}
            <Route path="settings/*" element={
              <ProtectedRoute permission="settings.view">
                <SettingsManagement />
              </ProtectedRoute>
            } />
            
            {/* Profile Routes - will be added in Phase 6 */}
            <Route path="profile" element={
              <div className="text-center p-8">
                <h3 className="text-lg font-medium mb-2">Profile Settings</h3>
                <p className="text-gray-600">Coming in Phase 6 - Enhanced UI Components</p>
              </div>
            } />
            
            {/* Performance Monitoring */}
            <Route path="performance" element={
              <ProtectedRoute permission="admin.performance.view">
                <PerformanceDashboard />
              </ProtectedRoute>
            } />
            
            {/* 404 Handler */}
            <Route path="*" element={
              <div className="text-center p-8">
                <h3 className="text-lg font-medium mb-2">Page Not Found</h3>
                <p className="text-gray-600">The requested admin page could not be found.</p>
              </div>
            } />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default AdminRouter;