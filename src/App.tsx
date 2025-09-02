import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import LoadingScreen from './components/ui/LoadingScreen';
import ScrollToTop from './components/ui/ScrollToTop';
import BackToTopButton from './components/ui/BackToTopButton';
import ModeSwitcher from './components/ui/ModeSwitcher';
import Layout from './components/layout/Layout';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import TechStackSection from './components/sections/TechStackSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import GallerySection from './components/sections/GallerySection';
import StoreSection from './components/sections/StoreSection';
import BlogsSection from './components/sections/BlogsSection';
import RasaAppSection from './components/sections/RasaAppSection';
import RasaSmartCaseSection from './components/sections/RasaSmartCaseSection';
import RasaSignsSection from './components/sections/RasaSignsSection';
// import CTASection from './components/sections/CTASection';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import GalleryPage from './pages/GalleryPage';
import ProjectsPage from './pages/ProjectsPage';
import StorePage from './pages/StorePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
// Admin import - new professional admin system
import AdminRouter from './admin/AdminRouter';
import LiteHomePage from './pages/LiteHomePage';
import { PerformanceProvider } from './contexts/PerformanceContext';
import { AuthProvider } from './contexts/AuthContext';
import { usePerformanceContext } from './contexts/PerformanceContext';
import './index.css';
import SignBoardPage from './pages/SignBoardPage';

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLiteVersion, supportsWebGL, supportsWebP, isSlowConnection } = usePerformanceContext();

  useEffect(() => {
    // Add performance-related classes to body
    document.body.classList.toggle('lite-version', isLiteVersion);
    document.body.classList.toggle('no-webgl', !supportsWebGL);
    document.body.classList.toggle('no-webp', !supportsWebP);
    document.body.classList.toggle('slow-connection', isSlowConnection);

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, isLiteVersion ? 1000 : 2000); // Shorter loading time for lite version

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('lite-version', 'no-webgl', 'no-webp', 'slow-connection');
    };
  }, [isLiteVersion, supportsWebGL, supportsWebP, isSlowConnection]);

  const HomeContent = isLiteVersion ? (
    <LiteHomePage />
  ) : (
    <>
      <HeroSection />
      <FeaturesSection />
      <RasaSmartCaseSection />
      <RasaSignsSection />
      <TechStackSection />
      <AboutSection />
      <ProjectsSection />
      <GallerySection />
      <StoreSection />
      <BlogsSection />
      <RasaAppSection />
      {/* <CTASection /> */}
    </>
  );

  return (
    <Router>
      <ScrollToTop />
      {isLoading ? (
        <LoadingScreen isLite={isLiteVersion} />
      ) : (
        <>
          <Routes>
            {/* Admin Routes - New Professional Admin System */}
            <Route path="/admin/*" element={<AdminRouter />} />

            {/* Other Routes with Header/Footer */}
            <Route path="/*" element={
              <>
                <Header />
                <Layout>
                  <Routes>
                    {/* Auth Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />

                    {/* Main Routes */}
                    <Route path="/" element={HomeContent} />
                    <Route path="/lite" element={<LiteHomePage />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:id" element={<BlogPostPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/store" element={<StorePage />} />
                    <Route path="/store/:productId" element={<ProductDetailPage />} />
                    <Route path="/signboard" element={<SignBoardPage />} />
                  </Routes>
                </Layout>
                <BackToTopButton />
                <ModeSwitcher />
              </>
            } />
          </Routes>
        </>
      )}
    </Router>
  );
};

const App = () => {
  return (
    <PerformanceProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </PerformanceProvider>
  );
};

export default App;
