import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GlobeAltIcon,
  PhotoIcon,
  CogIcon,
  LanguageIcon,
  ClockIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '../../utils/cn';

const GeneralSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: 'شرکت رسا',
    siteDescription: 'ارائه‌دهنده خدمات فناوری اطلاعات',
    siteUrl: 'https://rasa.com',
    adminEmail: 'admin@rasa.com',
    supportEmail: 'support@rasa.com',
    phone: '+98 21 1234 5678',
    address: 'تهران، خیابان ولیعصر',
    timezone: 'Asia/Tehran',
    language: 'fa',
    dateFormat: 'YYYY/MM/DD',
    currency: 'IRR',
    maintenanceMode: false,
    userRegistration: true,
    emailVerification: true,
    seoEnabled: true
  });

  const timezones = [
    { value: 'Asia/Tehran', label: 'تهران (UTC+3:30)' },
    { value: 'UTC', label: 'UTC (UTC+0)' },
    { value: 'Europe/London', label: 'لندن (UTC+0)' },
    { value: 'America/New_York', label: 'نیویورک (UTC-5)' }
  ];

  const languages = [
    { value: 'fa', label: 'فارسی', flag: '🇮🇷' },
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'ar', label: 'العربية', flag: '🇸🇦' }
  ];

  const currencies = [
    { value: 'IRR', label: 'ریال ایران', symbol: '﷼' },
    { value: 'USD', label: 'دلار آمریکا', symbol: '$' },
    { value: 'EUR', label: 'یورو', symbol: '€' }
  ];

  const handleSave = () => {
    // Save settings logic
    console.log('Settings saved:', settings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold admin-text-light">تنظیمات عمومی</h1>
          <p className="admin-text-light/70 mt-1">تنظیمات کلی سیستم و وب‌سایت</p>
        </div>
        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">
          ذخیره تغییرات
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="admin-text-light flex items-center space-x-2 space-x-reverse">
                <GlobeAltIcon className="w-5 h-5 admin-text-primary" />
                <span>اطلاعات سایت</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">نام سایت</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">توضیحات سایت</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">آدرس سایت</label>
                <input
                  type="url"
                  value={settings.siteUrl}
                  onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="admin-text-light flex items-center space-x-2 space-x-reverse">
                <EnvelopeIcon className="w-5 h-5 admin-text-primary" />
                <span>اطلاعات تماس</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">ایمیل مدیر</label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">ایمیل پشتیبانی</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">شماره تماس</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">آدرس</label>
                <textarea
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50 resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Localization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="admin-text-light flex items-center space-x-2 space-x-reverse">
                <LanguageIcon className="w-5 h-5 admin-text-primary" />
                <span>زبان و منطقه</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">زبان پیش‌فرض</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light"
                >
                  {languages.map(lang => (
                    <option key={lang.value} value={lang.value}>
                      {lang.flag} {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">منطقه زمانی</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light"
                >
                  {timezones.map(tz => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">واحد پول</label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings({...settings, currency: e.target.value})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light"
                >
                  {currencies.map(curr => (
                    <option key={curr.value} value={curr.value}>
                      {curr.symbol} {curr.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">فرمت تاریخ</label>
                <input
                  type="text"
                  value={settings.dateFormat}
                  onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="admin-text-light flex items-center space-x-2 space-x-reverse">
                <CogIcon className="w-5 h-5 admin-text-primary" />
                <span>تنظیمات سیستم</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { key: 'maintenanceMode', label: 'حالت تعمیر و نگهداری', description: 'سایت در حالت تعمیر قرار گیرد' },
                { key: 'userRegistration', label: 'ثبت‌نام کاربران', description: 'امکان ثبت‌نام کاربران جدید' },
                { key: 'emailVerification', label: 'تایید ایمیل', description: 'الزامی بودن تایید ایمیل' },
                { key: 'seoEnabled', label: 'بهینه‌سازی سئو', description: 'فعال‌سازی ابزارهای سئو' }
              ].map((setting, index) => (
                <div key={setting.key} className="flex items-center justify-between p-4 glass border border-primary/10 rounded-lg">
                  <div>
                    <h4 className="font-medium admin-text-light">{setting.label}</h4>
                    <p className="text-sm admin-text-light/70">{setting.description}</p>
                  </div>
                  <button
                    onClick={() => setSettings({...settings, [setting.key]: !settings[setting.key as keyof typeof settings]})}
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors duration-200",
                      settings[setting.key as keyof typeof settings] ? "bg-orange-500" : "bg-gray-600"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200",
                      settings[setting.key as keyof typeof settings] ? "translate-x-7" : "translate-x-1"
                    )} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default GeneralSettings;
