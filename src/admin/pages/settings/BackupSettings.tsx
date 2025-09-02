import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudArrowUpIcon,
  CloudArrowDownIcon,
  ClockIcon,
  DocumentIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  TrashIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../utils/cn';

const BackupSettings: React.FC = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [settings, setSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    backupTime: '02:00',
    retentionDays: 30,
    includeMedia: true,
    includeDatabase: true,
    includeSettings: true,
    compressionEnabled: true
  });

  const backupHistory = [
    { 
      id: 1, 
      date: '1402/12/20', 
      time: '02:00', 
      size: '2.5 MB', 
      type: 'auto', 
      status: 'completed',
      duration: '45 ثانیه',
      includes: ['database', 'media', 'settings']
    },
    { 
      id: 2, 
      date: '1402/12/19', 
      time: '02:00', 
      size: '2.4 MB', 
      type: 'auto', 
      status: 'completed',
      duration: '42 ثانیه',
      includes: ['database', 'media', 'settings']
    },
    { 
      id: 3, 
      date: '1402/12/18', 
      time: '14:30', 
      size: '2.3 MB', 
      type: 'manual', 
      status: 'completed',
      duration: '38 ثانیه',
      includes: ['database', 'settings']
    },
    { 
      id: 4, 
      date: '1402/12/17', 
      time: '02:00', 
      size: '0 MB', 
      type: 'auto', 
      status: 'failed',
      duration: '0 ثانیه',
      includes: []
    }
  ];

  const frequencies = [
    { value: 'hourly', label: 'ساعتی' },
    { value: 'daily', label: 'روزانه' },
    { value: 'weekly', label: 'هفتگی' },
    { value: 'monthly', label: 'ماهانه' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-lime-500';
      case 'failed': return 'bg-red-500';
      case 'running': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'موفق';
      case 'failed': return 'ناموفق';
      case 'running': return 'در حال اجرا';
      default: return 'نامشخص';
    }
  };

  const getTypeLabel = (type: string) => {
    return type === 'auto' ? 'خودکار' : 'دستی';
  };

  const handleBackup = async () => {
    setIsBackingUp(true);
    setBackupProgress(0);

    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSave = () => {
    console.log('Backup settings saved:', settings);
  };

  const downloadBackup = (backupId: number) => {
    console.log('Downloading backup:', backupId);
  };

  const deleteBackup = (backupId: number) => {
    console.log('Deleting backup:', backupId);
  };

  const restoreBackup = (backupId: number) => {
    console.log('Restoring backup:', backupId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold admin-text-light">پشتیبان‌گیری</h1>
          <p className="admin-text-light/70 mt-1">مدیریت پشتیبان‌گیری و بازیابی اطلاعات</p>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <Button onClick={handleBackup} disabled={isBackingUp} className="bg-teal-500 hover:bg-teal-600 text-white">
            <CloudArrowUpIcon className="w-4 h-4 ml-2" />
            {isBackingUp ? 'در حال پشتیبان‌گیری...' : 'پشتیبان‌گیری فوری'}
          </Button>
          <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">
            ذخیره تنظیمات
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backup Progress */}
        {isBackingUp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto">
                    <ArrowPathIcon className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold admin-text-light">در حال پشتیبان‌گیری...</h3>
                    <p className="admin-text-light/70">لطفا صبر کنید تا فرآیند تکمیل شود</p>
                  </div>
                  <div className="w-full bg-primary/10 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${backupProgress}%` }}
                      className="h-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                    />
                  </div>
                  <p className="text-sm admin-text-light/70">{backupProgress}% تکمیل شده</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Backup Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="admin-text-light flex items-center space-x-2 space-x-reverse">
                <ClockIcon className="w-5 h-5 admin-text-primary" />
                <span>تنظیمات خودکار</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 glass border border-primary/10 rounded-lg">
                <div>
                  <h4 className="font-medium admin-text-light">پشتیبان‌گیری خودکار</h4>
                  <p className="text-sm admin-text-light/70">فعال‌سازی پشتیبان‌گیری برنامه‌ریزی شده</p>
                </div>
                <button
                  onClick={() => setSettings({...settings, autoBackup: !settings.autoBackup})}
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors duration-200",
                    settings.autoBackup ? "bg-orange-500" : "bg-gray-600"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200",
                    settings.autoBackup ? "translate-x-7" : "translate-x-1"
                  )} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">تناوب پشتیبان‌گیری</label>
                <select
                  value={settings.backupFrequency}
                  onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light"
                >
                  {frequencies.map(freq => (
                    <option key={freq.value} value={freq.value}>{freq.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">زمان پشتیبان‌گیری</label>
                <input
                  type="time"
                  value={settings.backupTime}
                  onChange={(e) => setSettings({...settings, backupTime: e.target.value})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light"
                />
              </div>

              <div>
                <label className="block text-sm font-medium admin-text-light mb-2">مدت نگهداری (روز)</label>
                <input
                  type="number"
                  value={settings.retentionDays}
                  onChange={(e) => setSettings({...settings, retentionDays: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 glass border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 admin-text-light"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Backup Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="admin-text-light flex items-center space-x-2 space-x-reverse">
                <DocumentIcon className="w-5 h-5 admin-text-primary" />
                <span>محتوای پشتیبان</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { key: 'includeDatabase', label: 'پایگاه داده', description: 'تمام اطلاعات کاربران و محتوا' },
                { key: 'includeMedia', label: 'فایل‌های رسانه', description: 'تصاویر، ویدیوها و اسناد' },
                { key: 'includeSettings', label: 'تنظیمات سیستم', description: 'پیکربندی‌ها و تنظیمات' },
                { key: 'compressionEnabled', label: 'فشرده‌سازی', description: 'کاهش حجم فایل پشتیبان' }
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

      {/* Backup History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass border-primary/20 bg-secondary/60 backdrop-blur-lg">
          <CardHeader className="border-b border-primary/10">
            <CardTitle className="admin-text-light flex items-center space-x-2 space-x-reverse">
              <CalendarIcon className="w-5 h-5 admin-text-primary" />
              <span>تاریخچه پشتیبان‌گیری</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {backupHistory.map((backup, index) => (
                <div key={backup.id} className="flex items-center justify-between p-4 hover:bg-primary/5 transition-colors duration-200 border-b border-primary/5 last:border-b-0">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                      {backup.status === 'completed' ? (
                        <CheckCircleIcon className="w-5 h-5 text-lime-500" />
                      ) : (
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <h4 className="font-medium admin-text-light text-sm">{backup.date} - {backup.time}</h4>
                        <Badge className="bg-gray-500 text-white text-xs">
                          {getTypeLabel(backup.type)}
                        </Badge>
                        <Badge className={cn("text-white text-xs", getStatusColor(backup.status))}>
                          {getStatusLabel(backup.status)}
                        </Badge>
                      </div>
                      <p className="text-xs admin-text-light/60">
                        حجم: {backup.size} • مدت: {backup.duration}
                      </p>
                      {backup.includes.length > 0 && (
                        <div className="flex items-center space-x-1 space-x-reverse mt-1">
                          {backup.includes.map(include => (
                            <span key={include} className="px-2 py-1 bg-primary/10 admin-text-light/70 text-xs rounded-full">
                              {include}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {backup.status === 'completed' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadBackup(backup.id)}
                          className="admin-text-light/70 hover:admin-text-light"
                        >
                          <CloudArrowDownIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => restoreBackup(backup.id)}
                          className="admin-text-light/70 hover:admin-text-light"
                        >
                          <ArrowPathIcon className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteBackup(backup.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BackupSettings;
