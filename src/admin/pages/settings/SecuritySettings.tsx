import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  KeyIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UserIcon,
  EyeIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../utils/cn';

const SecuritySettings: React.FC = () => {
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    ipWhitelist: '',
    bruteForceProtection: true,
    emailNotifications: true,
    loginAlerts: true,
    passwordComplexity: true,
    sslRequired: true
  });

  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: 'Chrome - Windows', ip: '192.168.1.100', location: 'تهران، ایران', lastActive: '5 دقیقه پیش', current: true },
    { id: 2, device: 'Safari - iPhone', ip: '192.168.1.101', location: 'تهران، ایران', lastActive: '2 ساعت پیش', current: false },
    { id: 3, device: 'Firefox - Linux', ip: '10.0.0.50', location: 'اصفهان، ایران', lastActive: '1 روز پیش', current: false }
  ]);

  const securityLogs = [
    { id: 1, type: 'login', message: 'ورود موفق از IP: 192.168.1.100', time: '10 دقیقه پیش', severity: 'info' },
    { id: 2, type: 'failed_login', message: 'تلاش ناموفق ورود از IP: 203.0.113.1', time: '1 ساعت پیش', severity: 'warning' },
    { id: 3, type: 'password_change', message: 'تغییر رمز عبور توسط کاربر admin', time: '2 روز پیش', severity: 'info' },
    { id: 4, type: 'suspicious', message: 'فعالیت مشکوک از IP: 198.51.100.1', time: '3 روز پیش', severity: 'danger' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'bg-blue-500';
      case 'warning': return 'bg-orange-500';
      case 'danger': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'info': return 'اطلاع';
      case 'warning': return 'هشدار';
      case 'danger': return 'خطر';
      default: return 'عادی';
    }
  };

  const handleSave = () => {
    console.log('Security settings saved:', settings);
  };

  const terminateSession = (sessionId: number) => {
    setActiveSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold admin-text-light">تنظیمات امنیتی</h1>
          <p className="admin-text-light/70 mt-1">مدیریت امنیت و حفاظت سیستم</p>
        </div>
        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">
          ذخیره تغییرات
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Authentication Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="admin-text-light flex items-center space-x-2 space-x-reverse">
                <KeyIcon className="w-5 h-5 admin-text-primary" />
                <span>تنظیمات احراز هویت</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 glass border border-primary/10 rounded-lg">
                <div>
                  <h4 className="font-medium admin-text-light">احراز هویت دو مرحله‌ای</h4>
                  <p className="text-sm admin-text-light/70">افزایش امنیت با کد تایید پیامکی</p>
                </div>
                <button
                  onClick={() => setSettings({...settings, twoFactorAuth: !settings.twoFactorAuth})}
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors duration-200",
                    settings.twoFactorAuth ? "bg-orange-500" : "bg-gray-600"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200",
                    settings.twoFactorAuth ? "translate-x-7" : "translate-x-1"
                  )} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">انقضای رمز عبور (روز)</label>
                <input
                  type="number"
                  value={settings.passwordExpiry}
                  onChange={(e) => setSettings({...settings, passwordExpiry: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light"
                />
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">حداکثر تلاش ورود</label>
                <input
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => setSettings({...settings, maxLoginAttempts: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light"
                />
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">مهلت جلسه (دقیقه)</label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Policies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="admin-text-light flex items-center space-x-2 space-x-reverse">
                <ShieldCheckIcon className="w-5 h-5 admin-text-primary" />
                <span>سیاست‌های امنیتی</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { key: 'bruteForceProtection', label: 'محافظت از حملات Brute Force', description: 'مسدود کردن IP های مشکوک' },
                { key: 'passwordComplexity', label: 'پیچیدگی رمز عبور', description: 'الزام رعایت قوانین رمز عبور قوی' },
                { key: 'sslRequired', label: 'الزام SSL', description: 'اجباری بودن اتصال امن HTTPS' },
                { key: 'emailNotifications', label: 'اعلان‌های ایمیل', description: 'ارسال اعلان فعالیت‌های امنیتی' },
                { key: 'loginAlerts', label: 'هشدار ورود', description: 'اطلاع‌رسانی ورودهای جدید' }
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

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">لیست سفید IP</label>
                <textarea
                  value={settings.ipWhitelist}
                  onChange={(e) => setSettings({...settings, ipWhitelist: e.target.value})}
                  placeholder="192.168.1.0/24&#10;10.0.0.0/8"
                  rows={3}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light placeholder-admin-text-light/50 resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="admin-text-light flex items-center space-x-2 space-x-reverse">
                <DevicePhoneMobileIcon className="w-5 h-5 admin-text-primary" />
                <span>جلسات فعال</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {activeSessions.map((session, index) => (
                  <div key={session.id} className="flex items-center justify-between p-4 hover:bg-primary/5 transition-colors duration-200 border-b border-primary/5 last:border-b-0">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                        <DevicePhoneMobileIcon className="w-5 h-5 admin-text-light" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <h4 className="font-medium admin-text-light text-sm">{session.device}</h4>
                          {session.current && (
                            <Badge className="bg-lime-500 text-white text-xs">فعلی</Badge>
                          )}
                        </div>
                        <p className="text-xs admin-text-light/60">{session.ip} • {session.location}</p>
                        <p className="text-xs admin-text-light/50">{session.lastActive}</p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => terminateSession(session.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        قطع
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="admin-text-light flex items-center space-x-2 space-x-reverse">
                <EyeIcon className="w-5 h-5 admin-text-primary" />
                <span>گزارش‌های امنیتی</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {securityLogs.map((log, index) => (
                  <div key={log.id} className="flex items-center space-x-4 space-x-reverse p-4 hover:bg-primary/5 transition-colors duration-200 border-b border-primary/5 last:border-b-0">
                    <div className={cn("w-3 h-3 rounded-full", getSeverityColor(log.severity))}></div>
                    <div className="flex-1">
                      <p className="text-sm admin-text-light">{log.message}</p>
                      <p className="text-xs admin-text-light/60">{log.time}</p>
                    </div>
                    <Badge className={cn("text-white text-xs", getSeverityColor(log.severity))}>
                      {getSeverityLabel(log.severity)}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-primary/10">
                <Button variant="ghost" className="w-full admin-text-light/70 hover:admin-text-light text-sm">
                  مشاهده همه گزارش‌ها
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SecuritySettings;
