import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      // Redirect will be handled by the auth context
      window.location.href = '/signboard';
    } catch (error) {
      alert('ورود با خطا مواجه شد. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">ورود</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ایمیل
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57DCDA]"
              placeholder="ایمیل خود را وارد کنید"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57DCDA]"
              placeholder="رمز عبور خود را وارد کنید"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-[#57DCDA]/25 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
        
        {/* Demo Account Button */}
        <div className="mt-4">
          <button
            onClick={() => {
              setEmail('demo@test.com');
              setPassword('demo123');
              const form = document.querySelector('form') as HTMLFormElement;
              form?.requestSubmit();
            }}
            className="w-full px-4 py-3 bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-yellow-300 font-semibold hover:bg-yellow-500/30 transition-all duration-300"
          >
            🎯 ورود با حساب آزمایشی
          </button>
          <p className="text-xs text-gray-400 mt-2 text-center">
            ایمیل: demo@test.com | رمز: demo123
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            حساب کاربری ندارید؟{' '}
            <a href="/signup" className="text-[#57DCDA] hover:underline">
              ثبت نام
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
