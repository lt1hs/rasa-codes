import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomePageSection, SectionContent, HomePageSettings, NavbarSettings, FooterSettings } from '../../types/homepage.types';
import { SectionsOverview } from './SectionsOverview';
import { SectionEditor } from './SectionEditor';
import { NavbarEditor } from './NavbarEditor';
import { FooterEditor } from './FooterEditor';
import HomePageService from '../../services/homepage.service';

type ViewMode = 'overview' | 'editor' | 'navbar' | 'footer' | 'settings' | 'preview';

export const HomePageManager: React.FC = () => {
  const [sections, setSections] = useState<HomePageSection[]>([]);
  const [currentSection, setCurrentSection] = useState<HomePageSection | null>(null);
  const [settings, setSettings] = useState<HomePageSettings | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [sectionsData, settingsData] = await Promise.all([
        HomePageService.getAllSections(),
        HomePageService.getSettings()
      ]);
      setSections(sectionsData);
      setSettings(settingsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSection = (section: HomePageSection) => {
    setCurrentSection(section);
    setViewMode('editor');
  };

  const handleSaveSection = async (content: SectionContent) => {
    if (!currentSection) return;

    try {
      setSaveStatus('saving');
      const updatedSection = await HomePageService.updateSection(currentSection.id, content);
      setSections(prev => prev.map(s => s.id === updatedSection.id ? updatedSection : s));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
      setViewMode('overview');
    } catch (error) {
      console.error('Failed to save section:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleSaveNavbar = async (navbar: NavbarSettings) => {
    if (!settings) return;

    try {
      setSaveStatus('saving');
      const updatedSettings = await HomePageService.updateSettings({
        ...settings,
        navbar
      });
      setSettings(updatedSettings);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
      setViewMode('overview');
    } catch (error) {
      console.error('Failed to save navbar:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleSaveFooter = async (footer: FooterSettings) => {
    if (!settings) return;

    try {
      setSaveStatus('saving');
      const updatedSettings = await HomePageService.updateSettings({
        ...settings,
        footer
      });
      setSettings(updatedSettings);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
      setViewMode('overview');
    } catch (error) {
      console.error('Failed to save footer:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleToggleSection = async (sectionId: string) => {
    try {
      const updatedSection = await HomePageService.toggleSection(sectionId);
      setSections(prev => prev.map(s => s.id === updatedSection.id ? updatedSection : s));
    } catch (error) {
      console.error('Failed to toggle section:', error);
    }
  };

  const handleReorderSections = async (sectionIds: string[]) => {
    try {
      const reorderedSections = await HomePageService.reorderSections(sectionIds);
      setSections(reorderedSections);
    } catch (error) {
      console.error('Failed to reorder sections:', error);
    }
  };

  const handlePreview = async (content: SectionContent) => {
    if (!currentSection) return;
    
    try {
      const previewUrl = await HomePageService.previewChanges(currentSection.id, content);
      window.open(previewUrl, '_blank');
    } catch (error) {
      console.error('Failed to generate preview:', error);
    }
  };

  const renderStatusIndicator = () => {
    if (saveStatus === 'idle') return null;
    
    const statusConfig = {
      saving: { text: 'در حال ذخیره...', color: 'bg-blue-500' },
      saved: { text: 'ذخیره شد ✓', color: 'bg-green-500' },
      error: { text: 'خطا در ذخیره', color: 'bg-red-500' }
    };

    const config = statusConfig[saveStatus];
    
    return (
      <motion.div
        className={`fixed top-4 right-4 ${config.color} text-white px-4 py-2 rounded-lg shadow-lg z-50`}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
      >
        {config.text}
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="admin-text-light">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold admin-title-primary">مدیریت صفحه اصلی</h1>
            <p className="admin-text-light opacity-70 mt-2">
              مدیریت کامل محتوا، نوار ناوبری و فوتر وب‌سایت
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'overview' 
                  ? 'bg-orange-500 text-white' 
                  : 'admin-card admin-text-light hover:bg-orange-500/20'
              }`}
            >
              بخش‌ها
            </button>
            <button
              onClick={() => setViewMode('navbar')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'navbar' 
                  ? 'bg-orange-500 text-white' 
                  : 'admin-card admin-text-light hover:bg-orange-500/20'
              }`}
            >
              نوار ناوبری
            </button>
            <button
              onClick={() => setViewMode('footer')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'footer' 
                  ? 'bg-orange-500 text-white' 
                  : 'admin-card admin-text-light hover:bg-orange-500/20'
              }`}
            >
              فوتر
            </button>
            <button
              onClick={() => setViewMode('settings')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'settings' 
                  ? 'bg-orange-500 text-white' 
                  : 'admin-card admin-text-light hover:bg-orange-500/20'
              }`}
            >
              تنظیمات
            </button>
            <button
              onClick={() => window.open('/', '_blank')}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              مشاهده سایت
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {viewMode === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <SectionsOverview
                sections={sections}
                onEditSection={handleEditSection}
                onToggleSection={handleToggleSection}
                onReorderSections={handleReorderSections}
              />
            </motion.div>
          )}

          {viewMode === 'editor' && currentSection && (
            <motion.div
              key="editor"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <SectionEditor
                section={currentSection}
                onSave={handleSaveSection}
                onCancel={() => setViewMode('overview')}
                onPreview={handlePreview}
              />
            </motion.div>
          )}

          {viewMode === 'navbar' && settings && (
            <motion.div
              key="navbar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <NavbarEditor
                navbar={settings.navbar}
                onSave={handleSaveNavbar}
                onCancel={() => setViewMode('overview')}
              />
            </motion.div>
          )}

          {viewMode === 'footer' && settings && (
            <motion.div
              key="footer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <FooterEditor
                footer={settings.footer}
                onSave={handleSaveFooter}
                onCancel={() => setViewMode('overview')}
              />
            </motion.div>
          )}

          {viewMode === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="admin-card rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold admin-title-accent mb-6">تنظیمات عمومی</h2>
              <div className="text-center py-8">
                <p className="admin-text-light opacity-70">بخش تنظیمات عمومی در حال توسعه است</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Indicator */}
        <AnimatePresence>
          {renderStatusIndicator()}
        </AnimatePresence>
      </div>
    </div>
  );
};
