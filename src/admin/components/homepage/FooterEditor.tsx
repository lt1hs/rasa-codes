import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FooterSettings, FooterSection, FooterLink } from '../../types/homepage.types';

interface FooterEditorProps {
  footer: FooterSettings;
  onSave: (footer: FooterSettings) => void;
  onCancel: () => void;
}

export const FooterEditor: React.FC<FooterEditorProps> = ({
  footer,
  onSave,
  onCancel
}) => {
  const [footerData, setFooterData] = useState<FooterSettings>(footer);

  const updateFooter = (field: string, value: any) => {
    const keys = field.split('.');
    const newFooter = { ...footerData };
    let current: any = newFooter;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setFooterData(newFooter);
  };

  const addFooterSection = () => {
    const newSection: FooterSection = {
      id: Date.now().toString(),
      title: 'بخش جدید',
      enabled: true,
      order: footerData.sections.length + 1,
      links: []
    };
    updateFooter('sections', [...footerData.sections, newSection]);
  };

  const updateFooterSection = (sectionIndex: number, field: string, value: any) => {
    const newSections = [...footerData.sections];
    (newSections[sectionIndex] as any)[field] = value;
    updateFooter('sections', newSections);
  };

  const removeFooterSection = (sectionIndex: number) => {
    const newSections = footerData.sections.filter((_, i) => i !== sectionIndex);
    updateFooter('sections', newSections);
  };

  const addLinkToSection = (sectionIndex: number) => {
    const newLink: FooterLink = {
      id: Date.now().toString(),
      name: 'لینک جدید',
      href: '/',
      enabled: true
    };
    const newSections = [...footerData.sections];
    newSections[sectionIndex].links.push(newLink);
    updateFooter('sections', newSections);
  };

  const updateSectionLink = (sectionIndex: number, linkIndex: number, field: string, value: any) => {
    const newSections = [...footerData.sections];
    (newSections[sectionIndex].links[linkIndex] as any)[field] = value;
    updateFooter('sections', newSections);
  };

  const removeSectionLink = (sectionIndex: number, linkIndex: number) => {
    const newSections = [...footerData.sections];
    newSections[sectionIndex].links = newSections[sectionIndex].links.filter((_, i) => i !== linkIndex);
    updateFooter('sections', newSections);
  };

  const updateSocialLink = (index: number, field: string, value: any) => {
    const newLinks = [...footerData.socialLinks];
    (newLinks[index] as any)[field] = value;
    updateFooter('socialLinks', newLinks);
  };

  return (
    <motion.div
      className="admin-card rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold admin-title-accent">ویرایش فوتر</h2>
        <div className="flex gap-3">
          <button
            onClick={() => onSave(footerData)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            ذخیره
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            لغو
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="admin-card p-4 rounded-lg">
          <h3 className="text-lg font-semibold admin-text-light mb-4">اطلاعات پایه</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium admin-text-light mb-2">لوگو</label>
              <input
                type="text"
                value={footerData.logo}
                onChange={(e) => updateFooter('logo', e.target.value)}
                className="admin-input w-full px-4 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium admin-text-light mb-2">متن جایگزین لوگو</label>
              <input
                type="text"
                value={footerData.logoAlt}
                onChange={(e) => updateFooter('logoAlt', e.target.value)}
                className="admin-input w-full px-4 py-2 rounded-lg"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium admin-text-light mb-2">توضیحات</label>
            <textarea
              value={footerData.description}
              onChange={(e) => updateFooter('description', e.target.value)}
              rows={3}
              className="admin-input w-full px-4 py-2 rounded-lg resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium admin-text-light mb-2">متن کپی‌رایت</label>
            <input
              type="text"
              value={footerData.copyright}
              onChange={(e) => updateFooter('copyright', e.target.value)}
              className="admin-input w-full px-4 py-2 rounded-lg"
            />
          </div>
        </div>

        {/* Newsletter */}
        <div className="admin-card p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={footerData.newsletter.enabled}
              onChange={(e) => updateFooter('newsletter.enabled', e.target.checked)}
              className="w-4 h-4 text-orange-500"
            />
            <h3 className="text-lg font-semibold admin-text-light">خبرنامه</h3>
          </div>
          {footerData.newsletter.enabled && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">عنوان</label>
                <input
                  type="text"
                  value={footerData.newsletter.title}
                  onChange={(e) => updateFooter('newsletter.title', e.target.value)}
                  className="admin-input w-full px-4 py-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">توضیحات</label>
                <input
                  type="text"
                  value={footerData.newsletter.description}
                  onChange={(e) => updateFooter('newsletter.description', e.target.value)}
                  className="admin-input w-full px-4 py-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">متن placeholder</label>
                <input
                  type="text"
                  value={footerData.newsletter.placeholder}
                  onChange={(e) => updateFooter('newsletter.placeholder', e.target.value)}
                  className="admin-input w-full px-4 py-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">متن دکمه</label>
                <input
                  type="text"
                  value={footerData.newsletter.buttonText}
                  onChange={(e) => updateFooter('newsletter.buttonText', e.target.value)}
                  className="admin-input w-full px-4 py-2 rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Sections */}
        <div className="admin-card p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold admin-text-light">بخش‌های فوتر</h3>
            <button
              onClick={addFooterSection}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              افزودن بخش
            </button>
          </div>

          <div className="space-y-6">
            {footerData.sections.map((section, sectionIndex) => (
              <div key={section.id} className="admin-card p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={section.enabled}
                      onChange={(e) => updateFooterSection(sectionIndex, 'enabled', e.target.checked)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateFooterSection(sectionIndex, 'title', e.target.value)}
                      className="admin-input px-3 py-2 rounded font-semibold"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addLinkToSection(sectionIndex)}
                      className="px-3 py-1 bg-teal-500 text-white rounded text-sm hover:bg-teal-600"
                    >
                      افزودن لینک
                    </button>
                    <button
                      onClick={() => removeFooterSection(sectionIndex)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      حذف بخش
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <div key={link.id} className="grid md:grid-cols-5 gap-2 items-center">
                      <input
                        type="text"
                        value={link.name}
                        onChange={(e) => updateSectionLink(sectionIndex, linkIndex, 'name', e.target.value)}
                        className="admin-input px-3 py-2 rounded text-sm"
                        placeholder="نام لینک"
                      />
                      <input
                        type="text"
                        value={link.href}
                        onChange={(e) => updateSectionLink(sectionIndex, linkIndex, 'href', e.target.value)}
                        className="admin-input px-3 py-2 rounded text-sm"
                        placeholder="آدرس لینک"
                      />
                      <input
                        type="text"
                        value={link.icon || ''}
                        onChange={(e) => updateSectionLink(sectionIndex, linkIndex, 'icon', e.target.value)}
                        className="admin-input px-3 py-2 rounded text-sm"
                        placeholder="آیکون"
                      />
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={link.enabled}
                          onChange={(e) => updateSectionLink(sectionIndex, linkIndex, 'enabled', e.target.checked)}
                          className="w-4 h-4 text-orange-500"
                        />
                        <span className="text-sm admin-text-light">فعال</span>
                      </label>
                      <button
                        onClick={() => removeSectionLink(sectionIndex, linkIndex)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        حذف
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="admin-card p-4 rounded-lg">
          <h3 className="text-lg font-semibold admin-text-light mb-4">شبکه‌های اجتماعی</h3>
          <div className="space-y-4">
            {footerData.socialLinks.map((social, index) => (
              <div key={social.id} className="grid md:grid-cols-4 gap-4 items-center">
                <input
                  type="text"
                  value={social.platform}
                  onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                  className="admin-input px-3 py-2 rounded"
                  placeholder="نام پلتفرم"
                />
                <input
                  type="text"
                  value={social.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  className="admin-input px-3 py-2 rounded"
                  placeholder="آدرس لینک"
                />
                <input
                  type="text"
                  value={social.icon}
                  onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                  className="admin-input px-3 py-2 rounded"
                  placeholder="آیکون"
                />
                <div className="text-2xl">{social.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
