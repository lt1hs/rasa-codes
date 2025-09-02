import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SignboardUserManager } from '../components/signboard/SignboardUserManager';
import { SignboardDesignManager } from '../components/signboard/SignboardDesignManager';
import { SignboardOrderManager } from '../components/signboard/SignboardOrderManager';

type TabType = 'users' | 'designs' | 'orders';

const SignboardManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('users');

  const tabs = [
    { id: 'users' as TabType, label: 'کاربران', icon: '👥' },
    { id: 'designs' as TabType, label: 'طرح‌ها', icon: '🎨' },
    { id: 'orders' as TabType, label: 'سفارشات', icon: '📋' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <SignboardUserManager />;
      case 'designs':
        return <SignboardDesignManager />;
      case 'orders':
        return <SignboardOrderManager />;
      default:
        return <SignboardUserManager />;
    }
  };

  return (
    <div className="admin-layout min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold admin-title-primary mb-2">مدیریت سیستم تابلوساز هوشمند</h1>
          <p className="admin-text-light opacity-70">مدیریت کاربران، طرح‌ها و سفارشات سیستم AI</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="admin-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="admin-text-light opacity-70 text-sm">کل کاربران</p>
                <p className="text-2xl font-bold admin-text-light">2</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="admin-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="admin-text-light opacity-70 text-sm">کل طرح‌ها</p>
                <p className="text-2xl font-bold admin-text-light">2</p>
              </div>
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="admin-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="admin-text-light opacity-70 text-sm">سفارشات فعال</p>
                <p className="text-2xl font-bold admin-text-light">1</p>
              </div>
              <div className="w-12 h-12 bg-lime-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 admin-card rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-orange-500 admin-text-light shadow-lg'
                    : 'admin-text-light opacity-70 hover:opacity-100 hover:bg-white/5'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default SignboardManagement;
