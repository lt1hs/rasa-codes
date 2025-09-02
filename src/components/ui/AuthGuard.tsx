import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return fallback || <LoginPrompt />;
  }

  return <>{children}</>;
};

const LoginPrompt: React.FC = () => {
  return (
    <motion.div
      className="max-w-2xl mx-auto text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
        <div className="w-20 h-20 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">ورود الزامی است</h2>
        <p className="text-gray-300 mb-8 text-lg">
          لطفاً برای دسترسی به طراح هوشمند تابلو و پیگیری طرح‌هایتان وارد شوید.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/login"
            className="px-8 py-3 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-[#57DCDA]/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            ورود
          </motion.a>
          
          <motion.a
            href="/signup"
            className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            ایجاد حساب
          </motion.a>
        </div>
        
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <h3 className="font-semibold text-blue-300 mb-2">چرا ورود کنم؟</h3>
          <ul className="text-sm text-blue-200 space-y-1">
            <li>• تولید تا ۲ طراحی هوشمند در روز</li>
            <li>• ذخیره و پیگیری طرح‌هایتان</li>
            <li>• مدیریت آسان سفارشات</li>
            <li>• ارتباط با تیم طراحی ما</li>
          </ul>
        </div>
        
        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <h3 className="font-semibold text-yellow-300 mb-2">🎯 حساب آزمایشی</h3>
          <p className="text-sm text-yellow-200">
            ایمیل: <code className="bg-yellow-500/20 px-1 rounded">demo@test.com</code><br/>
            رمز: <code className="bg-yellow-500/20 px-1 rounded">demo123</code>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
