import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HomePageSection } from '../../types/homepage.types';

interface SectionsOverviewProps {
  sections: HomePageSection[];
  onEditSection: (section: HomePageSection) => void;
  onToggleSection: (sectionId: string) => void;
  onReorderSections: (sectionIds: string[]) => void;
}

export const SectionsOverview: React.FC<SectionsOverviewProps> = ({
  sections,
  onEditSection,
  onToggleSection,
  onReorderSections
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedItem(sectionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = sections.findIndex(s => s.id === draggedItem);
    const targetIndex = sections.findIndex(s => s.id === targetId);
    
    const newSections = [...sections];
    const [draggedSection] = newSections.splice(draggedIndex, 1);
    newSections.splice(targetIndex, 0, draggedSection);
    
    onReorderSections(newSections.map(s => s.id));
    setDraggedItem(null);
  };

  const getSectionIcon = (sectionId: string) => {
    const icons: Record<string, string> = {
      hero: '🏠',
      features: '⭐',
      about: '👥',
      projects: '💼',
      gallery: '🖼️',
      blogs: '📝',
      store: '🛍️',
      techStack: '⚙️',
      rasaApp: '📱',
      rasaSigns: '🪧',
      rasaSmartCase: '💼'
    };
    return icons[sectionId] || '📄';
  };

  const getLastModified = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'همین الان';
    if (diffInHours < 24) return `${diffInHours} ساعت پیش`;
    return date.toLocaleDateString('fa-IR');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold admin-title-accent">مدیریت بخش‌های صفحه اصلی</h2>
        <div className="text-sm admin-text-light opacity-70">
          {sections.filter(s => s.enabled).length} از {sections.length} بخش فعال
        </div>
      </div>

      <div className="grid gap-4">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className={`admin-card rounded-xl p-6 cursor-move transition-all duration-200 ${
              draggedItem === section.id ? 'opacity-50' : ''
            } ${section.enabled ? '' : 'opacity-60'}`}
            draggable
            onDragStart={(e) => handleDragStart(e, section.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, section.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getSectionIcon(section.id)}</span>
                  <div>
                    <h3 className="text-lg font-semibold admin-text-light">{section.title}</h3>
                    <p className="text-sm admin-text-light opacity-70">{section.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm admin-text-light opacity-60">ترتیب: {section.order}</span>
                  <span className="text-xs admin-text-light opacity-50">
                    آخرین تغییر: {getLastModified(section.lastModified)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={section.enabled}
                    onChange={() => onToggleSection(section.id)}
                    className="w-4 h-4 text-orange-500 bg-transparent border-2 border-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm admin-text-light">فعال</span>
                </label>

                <button
                  onClick={() => onEditSection(section)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  ویرایش
                </button>
              </div>
            </div>

            {/* Section Preview */}
            <div className="mt-4 p-4 bg-white/5 rounded-lg">
              <div className="text-sm admin-text-light opacity-80">
                {section.id === 'hero' && section.content.hero && (
                  <div>
                    <strong>عنوان:</strong> {section.content.hero.title}<br/>
                    <strong>زیرعنوان:</strong> {section.content.hero.subtitle}
                  </div>
                )}
                {section.id === 'features' && section.content.features && (
                  <div>
                    <strong>عنوان:</strong> {section.content.features.title}<br/>
                    <strong>تعداد ویژگی‌ها:</strong> {section.content.features.features.length}
                  </div>
                )}
                {section.id === 'about' && section.content.about && (
                  <div>
                    <strong>عنوان:</strong> {section.content.about.title}<br/>
                    <strong>تعداد آمار:</strong> {section.content.about.stats.length}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="admin-card rounded-xl p-6">
        <h3 className="text-lg font-semibold admin-text-light mb-4">راهنمای استفاده</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm admin-text-light opacity-80">
          <div>
            <h4 className="font-medium mb-2">🔄 تغییر ترتیب</h4>
            <p>بخش‌ها را با کشیدن و رها کردن مرتب کنید</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">✏️ ویرایش محتوا</h4>
            <p>روی دکمه ویرایش کلیک کنید تا محتوا را تغییر دهید</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">👁️ فعال/غیرفعال</h4>
            <p>چک‌باکس را برای نمایش یا مخفی کردن بخش استفاده کنید</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">🔍 پیش‌نمایش</h4>
            <p>قبل از انتشار، تغییرات را پیش‌نمایش کنید</p>
          </div>
        </div>
      </div>
    </div>
  );
};
