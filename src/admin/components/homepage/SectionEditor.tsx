import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HomePageSection, SectionContent } from '../../types/homepage.types';

interface SectionEditorProps {
  section: HomePageSection;
  onSave: (content: SectionContent) => void;
  onCancel: () => void;
  onPreview: (content: SectionContent) => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  onSave,
  onCancel,
  onPreview
}) => {
  const [content, setContent] = useState<SectionContent>(section.content);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File, field: string) => {
    setIsUploading(true);
    try {
      const url = URL.createObjectURL(file);
      updateContent(field, url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const updateContent = (field: string, value: any) => {
    const keys = field.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  const renderHeroEditor = () => {
    const hero = content.hero!;
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium admin-text-light mb-2">عنوان اصلی</label>
            <input
              type="text"
              value={hero.title}
              onChange={(e) => updateContent('hero.title', e.target.value)}
              className="admin-input w-full px-4 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium admin-text-light mb-2">زیرعنوان</label>
            <input
              type="text"
              value={hero.subtitle}
              onChange={(e) => updateContent('hero.subtitle', e.target.value)}
              className="admin-input w-full px-4 py-2 rounded-lg"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium admin-text-light mb-2">توضیحات</label>
          <textarea
            value={hero.description}
            onChange={(e) => updateContent('hero.description', e.target.value)}
            rows={3}
            className="admin-input w-full px-4 py-2 rounded-lg resize-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium admin-text-light mb-2">دکمه اصلی</label>
            <input
              type="text"
              value={hero.primaryButton.text}
              onChange={(e) => updateContent('hero.primaryButton.text', e.target.value)}
              className="admin-input w-full px-4 py-2 rounded-lg mb-2"
              placeholder="متن دکمه"
            />
            <input
              type="text"
              value={hero.primaryButton.link}
              onChange={(e) => updateContent('hero.primaryButton.link', e.target.value)}
              className="admin-input w-full px-4 py-2 rounded-lg"
              placeholder="لینک دکمه"
            />
          </div>
          <div>
            <label className="block text-sm font-medium admin-text-light mb-2">دکمه ثانویه</label>
            <input
              type="text"
              value={hero.secondaryButton.text}
              onChange={(e) => updateContent('hero.secondaryButton.text', e.target.value)}
              className="admin-input w-full px-4 py-2 rounded-lg mb-2"
              placeholder="متن دکمه"
            />
            <input
              type="text"
              value={hero.secondaryButton.link}
              onChange={(e) => updateContent('hero.secondaryButton.link', e.target.value)}
              className="admin-input w-full px-4 py-2 rounded-lg"
              placeholder="لینک دکمه"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium admin-text-light mb-2">تصویر پس‌زمینه</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'hero.backgroundImage')}
              className="admin-input w-full px-4 py-2 rounded-lg"
            />
            {hero.backgroundImage && (
              <img src={hero.backgroundImage} alt="Background" className="mt-2 w-full h-32 object-cover rounded-lg" />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium admin-text-light mb-2">تصویر اصلی</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'hero.heroImage')}
              className="admin-input w-full px-4 py-2 rounded-lg"
            />
            {hero.heroImage && (
              <img src={hero.heroImage} alt="Hero" className="mt-2 w-full h-32 object-cover rounded-lg" />
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderFeaturesEditor = () => {
    const features = content.features!;
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium admin-text-light mb-2">عنوان بخش</label>
            <input
              type="text"
              value={features.title}
              onChange={(e) => updateContent('features.title', e.target.value)}
              className="admin-input w-full px-4 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium admin-text-light mb-2">زیرعنوان</label>
            <input
              type="text"
              value={features.subtitle}
              onChange={(e) => updateContent('features.subtitle', e.target.value)}
              className="admin-input w-full px-4 py-2 rounded-lg"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold admin-text-light">ویژگی‌ها</h3>
            <button
              onClick={() => {
                const newFeature = {
                  id: Date.now().toString(),
                  title: 'ویژگی جدید',
                  description: 'توضیحات ویژگی',
                  icon: '⭐',
                  color: '#FF8301'
                };
                updateContent('features.features', [...features.features, newFeature]);
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              افزودن ویژگی
            </button>
          </div>
          
          <div className="space-y-4">
            {features.features.map((feature, index) => (
              <div key={feature.id} className="admin-card p-4 rounded-lg">
                <div className="grid md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => {
                      const newFeatures = [...features.features];
                      newFeatures[index].title = e.target.value;
                      updateContent('features.features', newFeatures);
                    }}
                    className="admin-input px-3 py-2 rounded"
                    placeholder="عنوان ویژگی"
                  />
                  <input
                    type="text"
                    value={feature.description}
                    onChange={(e) => {
                      const newFeatures = [...features.features];
                      newFeatures[index].description = e.target.value;
                      updateContent('features.features', newFeatures);
                    }}
                    className="admin-input px-3 py-2 rounded"
                    placeholder="توضیحات"
                  />
                  <input
                    type="text"
                    value={feature.icon}
                    onChange={(e) => {
                      const newFeatures = [...features.features];
                      newFeatures[index].icon = e.target.value;
                      updateContent('features.features', newFeatures);
                    }}
                    className="admin-input px-3 py-2 rounded"
                    placeholder="آیکون"
                  />
                  <button
                    onClick={() => {
                      const newFeatures = features.features.filter((_, i) => i !== index);
                      updateContent('features.features', newFeatures);
                    }}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAboutEditor = () => {
    const about = content.about!;
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium admin-text-light mb-2">عنوان بخش</label>
            <input
              type="text"
              value={about.title}
              onChange={(e) => updateContent('about.title', e.target.value)}
              className="admin-input w-full px-4 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium admin-text-light mb-2">زیرعنوان</label>
            <input
              type="text"
              value={about.subtitle}
              onChange={(e) => updateContent('about.subtitle', e.target.value)}
              className="admin-input w-full px-4 py-2 rounded-lg"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium admin-text-light mb-2">توضیحات</label>
          <textarea
            value={about.description}
            onChange={(e) => updateContent('about.description', e.target.value)}
            rows={3}
            className="admin-input w-full px-4 py-2 rounded-lg resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium admin-text-light mb-2">تصویر تیم</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'about.image')}
            className="admin-input w-full px-4 py-2 rounded-lg"
          />
          {about.image && (
            <img src={about.image} alt="Team" className="mt-2 w-full h-32 object-cover rounded-lg" />
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold admin-text-light">آمارها</h3>
            <button
              onClick={() => {
                const newStat = {
                  id: Date.now().toString(),
                  value: '0',
                  label: 'آمار جدید',
                  icon: '📊'
                };
                updateContent('about.stats', [...about.stats, newStat]);
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              افزودن آمار
            </button>
          </div>
          
          <div className="space-y-4">
            {about.stats.map((stat, index) => (
              <div key={stat.id} className="admin-card p-4 rounded-lg">
                <div className="grid md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const newStats = [...about.stats];
                      newStats[index].value = e.target.value;
                      updateContent('about.stats', newStats);
                    }}
                    className="admin-input px-3 py-2 rounded"
                    placeholder="مقدار"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const newStats = [...about.stats];
                      newStats[index].label = e.target.value;
                      updateContent('about.stats', newStats);
                    }}
                    className="admin-input px-3 py-2 rounded"
                    placeholder="برچسب"
                  />
                  <input
                    type="text"
                    value={stat.icon}
                    onChange={(e) => {
                      const newStats = [...about.stats];
                      newStats[index].icon = e.target.value;
                      updateContent('about.stats', newStats);
                    }}
                    className="admin-input px-3 py-2 rounded"
                    placeholder="آیکون"
                  />
                  <button
                    onClick={() => {
                      const newStats = about.stats.filter((_, i) => i !== index);
                      updateContent('about.stats', newStats);
                    }}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderRasaSmartCaseEditor = () => {
    const smartCase = content.rasaSmartCase!;
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium admin-text-light mb-2">عنوان</label>
            <input
              type="text"
              value={smartCase.title}
              onChange={(e) => updateContent('rasaSmartCase.title', e.target.value)}
              className="admin-input w-full px-4 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium admin-text-light mb-2">زیرعنوان</label>
            <input
              type="text"
              value={smartCase.subtitle}
              onChange={(e) => updateContent('rasaSmartCase.subtitle', e.target.value)}
              className="admin-input w-full px-4 py-2 rounded-lg"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium admin-text-light mb-2">توضیحات</label>
          <textarea
            value={smartCase.description}
            onChange={(e) => updateContent('rasaSmartCase.description', e.target.value)}
            rows={3}
            className="admin-input w-full px-4 py-2 rounded-lg resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium admin-text-light mb-2">تصویر محصول</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'rasaSmartCase.image')}
            className="admin-input w-full px-4 py-2 rounded-lg"
          />
          {smartCase.image && (
            <img src={smartCase.image} alt="Smart Case" className="mt-2 w-full h-32 object-cover rounded-lg" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium admin-text-light mb-2">ویژگی‌ها (هر خط یک ویژگی)</label>
          <textarea
            value={smartCase.features.join('\n')}
            onChange={(e) => updateContent('rasaSmartCase.features', e.target.value.split('\n').filter(f => f.trim()))}
            rows={4}
            className="admin-input w-full px-4 py-2 rounded-lg resize-none"
            placeholder="ویژگی اول&#10;ویژگی دوم&#10;..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium admin-text-light mb-2">دکمه سفارش</label>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={smartCase.orderButton.text}
              onChange={(e) => updateContent('rasaSmartCase.orderButton.text', e.target.value)}
              className="admin-input px-4 py-2 rounded-lg"
              placeholder="متن دکمه"
            />
            <input
              type="text"
              value={smartCase.orderButton.link}
              onChange={(e) => updateContent('rasaSmartCase.orderButton.link', e.target.value)}
              className="admin-input px-4 py-2 rounded-lg"
              placeholder="لینک دکمه"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderEditor = () => {
    switch (section.id) {
      case 'hero':
        return renderHeroEditor();
      case 'features':
        return renderFeaturesEditor();
      case 'about':
        return renderAboutEditor();
      case 'rasaSmartCase':
        return renderRasaSmartCaseEditor();
      default:
        return (
          <div className="text-center py-8">
            <p className="admin-text-light opacity-70">ویرایشگر برای بخش "{section.title}" در حال توسعه است</p>
            <p className="admin-text-light opacity-50 text-sm mt-2">
              شناسه بخش: {section.id}
            </p>
          </div>
        );
    }
  };

  return (
    <motion.div
      className="admin-card rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold admin-title-accent">ویرایش {section.title}</h2>
        <div className="flex gap-3">
          <button
            onClick={() => onPreview(content)}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
            disabled={isUploading}
          >
            پیش‌نمایش
          </button>
          <button
            onClick={() => onSave(content)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            disabled={isUploading}
          >
            {isUploading ? 'در حال آپلود...' : 'ذخیره'}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            لغو
          </button>
        </div>
      </div>

      {renderEditor()}
    </motion.div>
  );
};
