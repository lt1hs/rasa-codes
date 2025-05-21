import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import LoadingScreen from './components/ui/LoadingScreen';
import Layout from './components/layout/Layout';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import TechStackSection from './components/sections/TechStackSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import GallerySection from './components/sections/GallerySection';
import BlogsSection from './components/sections/BlogsSection';
import RasaAppSection from './components/sections/RasaAppSection';
// import CTASection from './components/sections/CTASection';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import GalleryPage from './pages/GalleryPage';
import ProjectsPage from './pages/ProjectsPage';
import './index.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={
                <>
                  <HeroSection />
                  <FeaturesSection />
                  <TechStackSection />
                  <AboutSection />
                  <RasaAppSection />
                  <ProjectsSection />
                  <GallerySection />
                  <BlogsSection />
                  {/* <CTASection /> */}
                </>
              } />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
            </Routes>
          </Layout>
        </>
      )}
    </Router>
  );
};

export default App;
