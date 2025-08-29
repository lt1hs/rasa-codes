import { useReducedMotion } from 'framer-motion';
import { lazy, Suspense } from 'react';
// Remove this import since Layout is already provided by App.tsx
// import Layout from '../components/layout/Layout';
import HeroSectionLite from '../components/sections/lite/HeroSectionLite';
import AboutSectionLite from '../components/sections/lite/AboutSectionLite';
import FeaturesSectionLite from '../components/sections/lite/FeaturesSectionLite';
import RasaSignsSectionLite from '../components/sections/lite/RasaSignsSectionLite';
import RasaAppSectionLite from '../components/sections/lite/RasaAppSectionLite';
import TechStackSectionLite from '../components/sections/lite/TechStackSectionLite';
import GallerySectionLite from '../components/sections/lite/GallerySectionLite';
import BlogsSectionLite from '../components/sections/lite/BlogsSectionLite';
import ContactSectionLite from '../components/sections/lite/ContactSectionLite';

// Lazy load sections to improve initial load time
const RasaSmartCaseSectionLite = lazy(() => import('../components/sections/lite/RasaSmartCaseSectionLite'));
const ProjectsSectionLite = lazy(() => import('../components/sections/lite/ProjectsSectionLite'));

// Simple loading component
const SectionLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const LiteHomePage = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    // Remove the Layout wrapper here
    <div className="min-h-screen bg-secondary text-white">
      <main>
        <HeroSectionLite />
        <AboutSectionLite />
        <FeaturesSectionLite />
        <RasaSignsSectionLite />
        <RasaAppSectionLite />
        <TechStackSectionLite />
        <GallerySectionLite />
        <BlogsSectionLite />
        <ContactSectionLite />
      </main>
    </div>
  );
};

export default LiteHomePage;