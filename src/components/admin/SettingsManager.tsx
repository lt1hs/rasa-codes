import React, { useState, useEffect } from 'react';
import '../../styles/admin/SettingsManager.scss';

interface SettingsGroup {
  id: string;
  title: string;
  description: string;
  settings: Setting[];
}

interface Setting {
  id: string;
  type: 'text' | 'textarea' | 'checkbox' | 'select' | 'color' | 'number';
  label: string;
  description?: string;
  value: string | boolean | number;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

const SettingsManager: React.FC = () => {
  const [settingsGroups, setSettingsGroups] = useState<SettingsGroup[]>([]);
  const [activeTab, setActiveTab] = useState<string>('general');
  const [isLoading, setIsLoading] = useState(true);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    // Simulate fetching settings from an API
    const fetchSettings = () => {
      setIsLoading(true);

      // In a real application, you would fetch this data from your API
      setTimeout(() => {
        const mockSettingsGroups: SettingsGroup[] = [
          {
            id: 'general',
            title: 'تنظیمات عمومی',
            description: 'تنظیمات پایه برای وبسایت شما.',
            settings: [
              {
                id: 'site_title',
                type: 'text',
                label: 'عنوان سایت',
                value: 'راسا - راهکارهای مدرن وب',
                placeholder: 'عنوان سایت خود را وارد کنید'
              },
              {
                id: 'site_description',
                type: 'textarea',
                label: 'توضیحات سایت',
                value: 'یک وبسایت مدرن برای نمایش خدمات و راهکارهای ما.',
                placeholder: 'توضیحات سایت خود را وارد کنید'
              },
              {
                id: 'site_logo',
                type: 'text',
                label: 'آدرس لوگوی سایت',
                value: '/logo.png',
                placeholder: 'آدرس لوگوی خود را وارد کنید'
              },
              {
                id: 'enable_maintenance_mode',
                type: 'checkbox',
                label: 'فعال‌سازی حالت تعمیر و نگهداری',
                value: false
              }
            ]
          },
          {
            id: 'appearance',
            title: 'ظاهر',
            description: 'سفارشی‌سازی ظاهر و احساس وبسایت شما.',
            settings: [
              {
                id: 'color_primary',
                type: 'color',
                label: 'رنگ اصلی',
                value: '#3498db'
              },
              {
                id: 'color_secondary',
                type: 'color',
                label: 'رنگ ثانویه',
                value: '#2ecc71'
              },
              {
                id: 'font_family',
                type: 'select',
                label: 'فونت',
                value: 'Inter',
                options: [
                  { value: 'Vazirmatn', label: 'وزیر متن' },
                  { value: 'Inter', label: 'اینتر' },
                  { value: 'Roboto', label: 'روبوتو' },
                  { value: 'Open Sans', label: 'اوپن سنس' }
                ]
              },
              {
                id: 'enable_dark_mode',
                type: 'checkbox',
                label: 'فعال‌سازی حالت تاریک',
                value: true
              }
            ]
          },
          {
            id: 'content',
            title: 'تنظیمات محتوا',
            description: 'تنظیمات مدیریت محتوا.',
            settings: [
              {
                id: 'posts_per_page',
                type: 'number',
                label: 'پست‌ها در هر صفحه',
                value: 10
              },
              {
                id: 'default_category',
                type: 'select',
                label: 'دسته‌بندی پیش‌فرض',
                value: 'general',
                options: [
                  { value: 'general', label: 'عمومی' },
                  { value: 'technology', label: 'تکنولوژی' },
                  { value: 'design', label: 'طراحی' },
                  { value: 'business', label: 'کسب و کار' }
                ]
              },
              {
                id: 'comment_moderation',
                type: 'checkbox',
                label: 'فعال‌سازی مدیریت نظرات',
                value: true
              }
            ]
          },
          {
            id: 'advanced',
            title: 'تنظیمات پیشرفته',
            description: 'گزینه‌های پیشرفته پیکربندی.',
            settings: [
              {
                id: 'google_analytics_id',
                type: 'text',
                label: 'شناسه گوگل آنالیتیکس',
                value: 'UA-XXXXX-Y',
                placeholder: 'شناسه ردیابی خود را وارد کنید'
              },
              {
                id: 'custom_css',
                type: 'textarea',
                label: 'CSS سفارشی',
                value: '/* CSS سفارشی خود را اینجا اضافه کنید */',
                placeholder: 'CSS سفارشی را وارد کنید'
              },
              {
                id: 'enable_caching',
                type: 'checkbox',
                label: 'فعال‌سازی کش صفحه',
                value: true
              },
              {
                id: 'robots_txt',
                type: 'textarea',
                label: 'محتوای Robots.txt',
                value: 'User-agent: *\nAllow: /',
                placeholder: 'محتوای robots.txt را وارد کنید'
              }
            ]
          }
        ];

        setSettingsGroups(mockSettingsGroups);
        setIsLoading(false);
      }, 800);
    };

    fetchSettings();
  }, []);

  const handleSettingChange = (groupId: string, settingId: string, newValue: string | boolean | number) => {
    const updatedGroups = settingsGroups.map(group => {
      if (group.id === groupId) {
        const updatedSettings = group.settings.map(setting => {
          if (setting.id === settingId) {
            return { ...setting, value: newValue };
          }
          return setting;
        });
        return { ...group, settings: updatedSettings };
      }
      return group;
    });
    
    setSettingsGroups(updatedGroups);
    setUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    // In a real application, you would call your API to save the settings
    console.log('Saving settings:', settingsGroups);
    
    // Simulate saving
    setTimeout(() => {
      setUnsavedChanges(false);
      setShowSaveModal(true);
      
      // Auto-hide the save message after 3 seconds
      setTimeout(() => {
        setShowSaveModal(false);
      }, 3000);
    }, 800);
  };

  const renderSettingInput = (group: SettingsGroup, setting: Setting) => {
    switch (setting.type) {
      case 'text':
        return (
          <input
            type="text"
            id={setting.id}
            value={setting.value as string}
            placeholder={setting.placeholder}
            onChange={(e) => handleSettingChange(group.id, setting.id, e.target.value)}
          />
        );
      case 'textarea':
        return (
          <textarea
            id={setting.id}
            value={setting.value as string}
            placeholder={setting.placeholder}
            rows={4}
            onChange={(e) => handleSettingChange(group.id, setting.id, e.target.value)}
          />
        );
      case 'checkbox':
        return (
          <label className="toggle-switch">
            <input
              type="checkbox"
              id={setting.id}
              checked={setting.value as boolean}
              onChange={(e) => handleSettingChange(group.id, setting.id, e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        );
      case 'select':
        return (
          <select
            id={setting.id}
            value={setting.value as string}
            onChange={(e) => handleSettingChange(group.id, setting.id, e.target.value)}
          >
            {setting.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'color':
        return (
          <div className="color-picker">
            <input
              type="color"
              id={setting.id}
              value={setting.value as string}
              onChange={(e) => handleSettingChange(group.id, setting.id, e.target.value)}
            />
            <input
              type="text"
              value={setting.value as string}
              onChange={(e) => handleSettingChange(group.id, setting.id, e.target.value)}
            />
          </div>
        );
      case 'number':
        return (
          <input
            type="number"
            id={setting.id}
            value={setting.value as number}
            onChange={(e) => handleSettingChange(group.id, setting.id, parseInt(e.target.value, 10))}
          />
        );
      default:
        return null;
    }
  };

  const activeGroup = settingsGroups.find(group => group.id === activeTab);

  return (
    <div className="settings-manager">
      <div className="settings-header">
        <h2>تنظیمات</h2>
        <div className="settings-actions">
          <button 
            className="save-button" 
            onClick={handleSaveSettings}
            disabled={!unsavedChanges}
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>

      <div className="settings-container">
        {isLoading ? (
          <div className="loading-indicator">در حال بارگذاری تنظیمات...</div>
        ) : (
          <>
            <div className="settings-tabs">
              {settingsGroups.map(group => (
                <button
                  key={group.id}
                  className={`settings-tab ${activeTab === group.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(group.id)}
                >
                  {group.title}
                </button>
              ))}
            </div>
            
            <div className="settings-content">
              {activeGroup && (
                <>
                  <div className="settings-group-header">
                    <h3>{activeGroup.title}</h3>
                    <p className="settings-group-description">{activeGroup.description}</p>
                  </div>
                  
                  <div className="settings-list">
                    {activeGroup.settings.map(setting => (
                      <div key={setting.id} className="setting-item">
                        <div className="setting-info">
                          <label htmlFor={setting.id} className="setting-label">{setting.label}</label>
                          {setting.description && (
                            <p className="setting-description">{setting.description}</p>
                          )}
                        </div>
                        <div className="setting-control">
                          {renderSettingInput(activeGroup, setting)}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Save Confirmation Modal */}
      {showSaveModal && (
        <div className="save-notification">
          <div className="save-notification-content">
            <span className="save-icon">✓</span>
            <span className="save-message">تنظیمات با موفقیت ذخیره شد!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsManager;