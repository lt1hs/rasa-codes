import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

export const UserDashboard: React.FC = () => {
  const { user, getUserDesigns, logout } = useAuth();
  const designs = getUserDesigns();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* User Info */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">خوش آمدید، {user?.name}!</h1>
            <p className="text-gray-300">
              تولید روزانه: {user?.dailyGenerationsUsed || 0} / {user?.maxDailyGenerations || 2}
            </p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            خروج
          </button>
        </div>
      </motion.div>

      {/* Saved Designs */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">طرح‌های ذخیره شده</h2>
        
        {designs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-gray-400 mb-4">هنوز طرحی ایجاد نشده</p>
            <a
              href="/signboard"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-xl text-white font-semibold hover:shadow-lg transition-all duration-300"
            >
              اولین طرح خود را بسازید
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((design) => (
              <motion.div
                key={design.id}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-white mb-2">{design.storeName}</h3>
                <p className="text-gray-400 text-sm mb-3">{design.businessType}</p>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{design.aiPrompt}</p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {design.generatedImages.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`طرح ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    {new Date(design.createdAt).toLocaleDateString('fa-IR')}
                  </span>
                  {design.ordered && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                      سفارش داده شده
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
