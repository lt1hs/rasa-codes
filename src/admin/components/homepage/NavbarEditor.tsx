import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavbarSettings, MenuItem } from '../../types/homepage.types';

interface NavbarEditorProps {
  navbar: NavbarSettings;
  onSave: (navbar: NavbarSettings) => void;
  onCancel: () => void;
}

export const NavbarEditor: React.FC<NavbarEditorProps> = ({
  navbar,
  onSave,
  onCancel
}) => {
  const [navbarData, setNavbarData] = useState<NavbarSettings>(navbar);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const updateNavbar = (field: string, value: any) => {
    const keys = field.split('.');
    const newNavbar = { ...navbarData };
    let current: any = newNavbar;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setNavbarData(newNavbar);
  };

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: 'آیتم جدید',
      href: '/',
      enabled: true,
      order: navbarData.menuItems.length + 1
    };
    updateNavbar('menuItems', [...navbarData.menuItems, newItem]);
  };

  const updateMenuItem = (index: number, field: string, value: any) => {
    const newItems = [...navbarData.menuItems];
    (newItems[index] as any)[field] = value;
    updateNavbar('menuItems', newItems);
  };

  const removeMenuItem = (index: number) => {
    const newItems = navbarData.menuItems.filter((_, i) => i !== index);
    updateNavbar('menuItems', newItems);
  };

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = navbarData.menuItems.findIndex(item => item.id === draggedItem);
    const targetIndex = navbarData.menuItems.findIndex(item => item.id === targetId);
    
    const newItems = [...navbarData.menuItems];
    const [draggedMenuItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedMenuItem);
    
    // Update order
    newItems.forEach((item, index) => {
      item.order = index + 1;
    });
    
    updateNavbar('menuItems', newItems);
    setDraggedItem(null);
  };

  return (
    <motion.div
      className="admin-card rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold admin-title-accent">ویرایش نوار ناوبری</h2>
        <div className="flex gap-3">
          <button
            onClick={() => onSave(navbarData)}
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
        {/* Logo Settings */}
        <div className="admin-card p-4 rounded-lg">
          <h3 className="text-lg font-semibold admin-text-light mb-4">تنظیمات لوگو</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium admin-text-light mb-2">مسیر لوگو</label>
              <input
                type="text"
                value={navbarData.logo}
                onChange={(e) => updateNavbar('logo', e.target.value)}
                className="admin-input w-full px-4 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium admin-text-light mb-2">متن جایگزین لوگو</label>
              <input
                type="text"
                value={navbarData.logoAlt}
                onChange={(e) => updateNavbar('logoAlt', e.target.value)}
                className="admin-input w-full px-4 py-2 rounded-lg"
              />
            </div>
          </div>
          {navbarData.logo && (
            <div className="mt-4">
              <img src={navbarData.logo} alt={navbarData.logoAlt} className="h-12 object-contain" />
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="admin-card p-4 rounded-lg">
          <h3 className="text-lg font-semibold admin-text-light mb-4">دکمه فراخوان</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium admin-text-light mb-2">متن دکمه</label>
              <input
                type="text"
                value={navbarData.ctaButton?.text || ''}
                onChange={(e) => updateNavbar('ctaButton.text', e.target.value)}
                className="admin-input w-full px-4 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium admin-text-light mb-2">لینک دکمه</label>
              <input
                type="text"
                value={navbarData.ctaButton?.link || ''}
                onChange={(e) => updateNavbar('ctaButton.link', e.target.value)}
                className="admin-input w-full px-4 py-2 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="admin-card p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold admin-text-light">آیتم‌های منو</h3>
            <button
              onClick={addMenuItem}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              افزودن آیتم
            </button>
          </div>

          <div className="space-y-4">
            {navbarData.menuItems.map((item, index) => (
              <div
                key={item.id}
                className={`admin-card p-4 rounded-lg cursor-move ${
                  draggedItem === item.id ? 'opacity-50' : ''
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, item.id)}
              >
                <div className="grid md:grid-cols-5 gap-4 items-center">
                  <div>
                    <label className="block text-xs admin-text-light opacity-70 mb-1">نام</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateMenuItem(index, 'name', e.target.value)}
                      className="admin-input w-full px-3 py-2 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs admin-text-light opacity-70 mb-1">لینک</label>
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => updateMenuItem(index, 'href', e.target.value)}
                      className="admin-input w-full px-3 py-2 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs admin-text-light opacity-70 mb-1">آیکون</label>
                    <input
                      type="text"
                      value={item.icon || ''}
                      onChange={(e) => updateMenuItem(index, 'icon', e.target.value)}
                      className="admin-input w-full px-3 py-2 rounded text-sm"
                      placeholder="🏠"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.enabled}
                        onChange={(e) => updateMenuItem(index, 'enabled', e.target.checked)}
                        className="w-4 h-4 text-orange-500"
                      />
                      <span className="text-sm admin-text-light">فعال</span>
                    </label>
                  </div>
                  <div>
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Menu Settings */}
        <div className="admin-card p-4 rounded-lg">
          <h3 className="text-lg font-semibold admin-text-light mb-4">تنظیمات موبایل</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={navbarData.mobileMenuEnabled}
              onChange={(e) => updateNavbar('mobileMenuEnabled', e.target.checked)}
              className="w-4 h-4 text-orange-500"
            />
            <span className="admin-text-light">فعال‌سازی منوی موبایل</span>
          </label>
        </div>
      </div>
    </motion.div>
  );
};
